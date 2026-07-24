/* Lightweight pluggable store for cache, rate-limiting and telemetry.
   Prefers Redis (ioredis) when REDIS_URL is provided and module is available.
   Falls back to in-memory maps when Redis isn't available.
*/
type TelemetryEvent = { ts: number; ip: string; query: string; results: number };

const REDIS_URL = process.env.REDIS_URL;

let redisClient: any = null;
let usingRedis = false;

async function tryInitRedis() {
  if (!REDIS_URL) return;
  if (redisClient) return;
  try {
    // dynamic import optional dependency — use eval to avoid static bundler resolution
    // when ioredis is not installed, bundlers may still attempt to resolve imports.
    // eslint-disable-next-line no-eval
    const IORedis = await eval("import('ioredis')");
    redisClient = new IORedis.default(REDIS_URL);
    usingRedis = true;
    // simple ping to verify
    await redisClient.ping();
    console.info("[agentStore] connected to Redis");
  } catch (err) {
    console.info("[agentStore] Redis unavailable or ioredis not installed, falling back to memory store");
    redisClient = null;
    usingRedis = false;
  }
}

/* In-memory fallbacks */
const memRate = new Map<string, number[]>(); // ip -> timestamps
const memCache = new Map<string, { expiresAt: number; value: any }>();
const memTelemetry: TelemetryEvent[] = [];

export async function rateLimitCheck(ip: string, windowMs = 60_000, max = 30) {
  await tryInitRedis();
  const now = Date.now();
  if (usingRedis && redisClient) {
    const windowKey = `rate:${ip}:${Math.floor(now / windowMs)}`;
    const count = await redisClient.incr(windowKey);
    if (count === 1) {
      await redisClient.pexpire(windowKey, windowMs + 5000);
    }
    return count <= max;
  }
  const hits = memRate.get(ip) ?? [];
  const recent = hits.filter((t) => t > now - windowMs);
  recent.push(now);
  memRate.set(ip, recent);
  return recent.length <= max;
}

export async function getCachedProduct(id: number) {
  await tryInitRedis();
  const key = `printful:product:${id}`;
  if (usingRedis && redisClient) {
    const raw = await redisClient.get(key);
    return raw ? JSON.parse(raw) : null;
  }
  const entry = memCache.get(String(id));
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    memCache.delete(String(id));
    return null;
  }
  return entry.value;
}

export async function setCachedProduct(id: number, value: any, ttlMs = 60_000) {
  await tryInitRedis();
  const key = `printful:product:${id}`;
  if (usingRedis && redisClient) {
    await redisClient.set(key, JSON.stringify(value), "PX", ttlMs);
    return;
  }
  memCache.set(String(id), { expiresAt: Date.now() + ttlMs, value });
}

export async function logTelemetry(ev: TelemetryEvent, cap = 1000) {
  await tryInitRedis();
  if (usingRedis && redisClient) {
    const key = "vispea:agent:telemetry";
    await redisClient.lpush(key, JSON.stringify(ev));
    await redisClient.ltrim(key, 0, cap - 1);
    return;
  }
  memTelemetry.push(ev);
  if (memTelemetry.length > cap) memTelemetry.splice(0, memTelemetry.length - cap);
}

export async function getTelemetry() {
  await tryInitRedis();
  if (usingRedis && redisClient) {
    const key = "vispea:agent:telemetry";
    const items = await redisClient.lrange(key, 0, -1);
    return items.map((s: string) => JSON.parse(s));
  }
  return [...memTelemetry];
}

export default {
  rateLimitCheck,
  getCachedProduct,
  setCachedProduct,
  logTelemetry,
  getTelemetry,
};
