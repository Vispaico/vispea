import { NextResponse } from "next/server";
import { PRODUCT_OVERRIDES } from "@/data/product-overrides";
import { listAllPrintfulProducts, getPrintfulProduct } from "@/lib/printful";
import agentStore from "@/lib/agentStore";
import { z } from "zod";

const BodySchema = z.object({
  sessionId: z.string(),
  message: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = BodySchema.parse(body);

    const query = parsed.message.trim().toLowerCase();

    const getClientIp = (req: Request) => {
      const xf = req.headers.get("x-forwarded-for");
      if (xf) return xf.split(",")[0].trim();
      const xr = req.headers.get("x-real-ip");
      if (xr) return xr;
      return "unknown";
    };
    const ip = getClientIp(request);
    const allowed = await agentStore.rateLimitCheck(ip, 60_000, 30);
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Load local overrides to map to product ids and images
    // Use listAllPrintfulProducts to obtain canonical products (cached)
    const { products } = await listAllPrintfulProducts();

    // Improved matching: token scoring with boosts for name, tags, and overrides
    const tokenize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);

    const baseTokens = tokenize(parsed.message);
    const synonymMap: Record<string, string[]> = {
      edgy: ["dark", "bold", "graffiti"],
      graffiti: ["street", "art"],
      street: ["urban", "graffiti"],
      minimal: ["clean", "tonal"],
      colorful: ["bold", "loud"],
      bright: ["colorful"],
      dark: ["black", "noir"],
    };

    const expandedTokens = new Set(baseTokens);
    for (const token of baseTokens) {
      const synonyms = synonymMap[token];
      if (synonyms) {
        synonyms.forEach((syn) => expandedTokens.add(syn));
      }
    }
    const queryTokens = Array.from(expandedTokens);

    const excludedTokens = new Set<string>();
    baseTokens.forEach((token, idx) => {
      if (token === "no" || token === "without" || token === "not") {
        const nextToken = baseTokens[idx + 1];
        if (nextToken) excludedTokens.add(nextToken);
      }
    });

    const scoreForProduct = (p: any) => {
      const overrideKey = p.externalId ?? String(p.id);
      const override = PRODUCT_OVERRIDES[overrideKey];
      const nameTokens = tokenize(p.name ?? "");
      const tagTokens = (p.tags ?? []).flatMap((t: string) => tokenize(t));
      const overrideTokens = tokenize((override?.descriptionHtml ?? "") + " " + (override?.gallery ?? []).join(" "));

      if (
        excludedTokens.size > 0 &&
        [...excludedTokens].some((token) =>
          [...nameTokens, ...tagTokens, ...overrideTokens].some(
            (candidate) => candidate === token || candidate.includes(token)
          )
        )
      ) {
        return -1;
      }

      let score = 0;

      for (const qt of queryTokens) {
        if (nameTokens.includes(qt)) score += 5;
        else if (tagTokens.includes(qt)) score += 3;
        else if (overrideTokens.includes(qt)) score += 2;
        else {
          // partial token match
          if (nameTokens.some((nt) => nt.startsWith(qt) || nt.includes(qt))) score += 2;
          else if (tagTokens.some((nt: string) => nt.startsWith(qt) || nt.includes(qt))) score += 1;
        }
      }

      // small boost for having an override gallery (curated)
      if (override?.gallery && override.gallery.length > 0) score += 1;

      return score;
    };

    const storeBaseUrl = (process.env.NEXT_PUBLIC_STORE_BASE_URL ?? "").replace(/\/$/, "");
    const buildProductUrl = (id: number) =>
      storeBaseUrl ? `${storeBaseUrl}/shop/${id}` : `/shop/${id}`;

    const scored = products
      .map((p) => ({ p, score: scoreForProduct(p) }))
      .filter((s) => (queryTokens.length === 0 ? true : s.score > 0))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ p }) => {
        const overrideKey = p.externalId ?? String(p.id);
        const override = PRODUCT_OVERRIDES[overrideKey];
        return {
          id: String(p.id),
          name: p.name,
          price: p.variants?.[0]?.retailPrice ? Number.parseFloat(p.variants[0].retailPrice) : null,
          image: override?.gallery?.[0] ?? p.variants?.[0]?.image ?? p.thumbnailUrl ?? null,
          url: buildProductUrl(p.id),
          tags: p.tags ?? [],
        };
      });
    // Merge live pricing/availability from Printful for the top results.
    const parsedTTL = Number.parseInt(process.env.PRINTFUL_CACHE_TTL ?? "60", 10);
    const CACHE_TTL_MS = Number.isFinite(parsedTTL) ? parsedTTL * 1000 : 60_000;

    const fetchLiveProductCached = async (id: number) => {
      const cached = await agentStore.getCachedProduct(id);
      if (cached) return cached;
      const live = await getPrintfulProduct(id);
      await agentStore.setCachedProduct(id, live, CACHE_TTL_MS);
      return live;
    };

    const merged = await Promise.all(
      scored.map(async (item) => {
        try {
          const live = await fetchLiveProductCached(Number(item.id));
          const livePrice =
            live?.variants?.[0]?.retailPrice !== undefined
              ? Number.parseFloat(live.variants[0].retailPrice)
              : item.price;
          const available = Array.isArray(live?.variants) && live.variants.length > 0;
          return {
            ...item,
            price: livePrice,
            available,
          };
        } catch (err) {
          // If live fetch fails, return existing item info without availability
          return {
            ...item,
            available: false,
          };
        }
      })
    );

    await agentStore.logTelemetry({ ts: Date.now(), ip, query: parsed.message, results: merged.length }, 1000);
    console.info("[vispea-agent] telemetry recorded:", { ip, query: parsed.message, results: merged.length });

    const fallbackReply =
      merged.length === 0
        ? "No hits yet — want darker, colorful, or minimal?"
        : queryTokens.length < 2
        ? "Got it. Want darker, colorful, or minimal?"
        : `Found ${merged.length} items matching "${parsed.message}".`;

    const openAiKey = process.env.OPENAI_API_KEY;
    let reply = fallbackReply;

    if (openAiKey) {
      try {
        const productNames = merged.map((item) => item.name).join(", ");
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.6,
            max_tokens: 90,
            messages: [
              {
                role: "system",
                content:
                  "You are Vispea's graffiti streetwear shop assistant. Keep replies under 2 short sentences. Be confident and specific. Never promise stock.",
              },
              {
                role: "user",
                content: `User asked: "${parsed.message}". Curated products: ${productNames || "none"}. Respond with a short helpful sentence and a follow-up question if needed.`,
              },
            ],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content?.trim();
          if (content) reply = content;
        } else {
          console.warn("[vispea-agent] OpenAI response error", await res.text());
        }
      } catch (error) {
        console.error("[vispea-agent] OpenAI failed", error);
      }
    }

    return NextResponse.json({ reply, products: merged });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
