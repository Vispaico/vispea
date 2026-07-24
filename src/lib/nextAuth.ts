import type { Session } from "next-auth";

type GetServerSessionParams = Parameters<typeof import("next-auth/next").getServerSession>;

// Unified next-auth getServerSession shim — try common import paths at runtime.
export async function getServerSession(...args: GetServerSessionParams): Promise<Session | null> {
  // Try preferred path first
  try {
    const mod = await import("next-auth/next");
    if (mod && typeof mod.getServerSession === "function") {
      return mod.getServerSession(...args);
    }
  } catch {
    // ignore
  }

  // Try fallback
  try {
    const mod = await import("next-auth");
    if (mod && typeof mod.getServerSession === "function") {
      return mod.getServerSession(...args);
    }
  } catch (err) {
    throw new Error("next-auth getServerSession not available: " + String(err));
  }

  return null;
}
