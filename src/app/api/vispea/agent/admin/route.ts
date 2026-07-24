import { NextResponse } from "next/server";
import agentStore from "@/lib/agentStore";

const ADMIN_TOKEN = process.env.AGENT_ADMIN_TOKEN ?? "";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const telemetry = await agentStore.getTelemetry();
  return NextResponse.json({ telemetry });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // clearing cache is intentionally simple: set empty keys in Redis or clear in-memory maps via a simple helper
  // agentStore doesn't expose a clear function for safety; instead return guidance.
  return NextResponse.json({ ok: true, note: "To clear caches, restart the app or set REDIS_URL and use redis CLI. For safety no direct clear implemented." });
}
