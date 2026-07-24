import type { Session } from "next-auth";

type NextAuthGetServerSession = typeof import("next-auth/next").getServerSession;
type GetServerSessionArgs = Parameters<NextAuthGetServerSession>;

// Compatibility shim for getServerSession import paths.
// Uses dynamic import to avoid build-time resolution errors with different next-auth versions.
export async function getServerSession(
  ...args: GetServerSessionArgs
): Promise<Session | null> {
  try {
    // Preferred path used by many examples
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = await import("next-auth/next");
    if (mod && typeof mod.getServerSession === "function") {
      return (mod.getServerSession as unknown as NextAuthGetServerSession)(...args);
    }
  } catch (err) {
    // ignore and try fallback
  }

  try {
    const mod = await import("next-auth");
    if (mod && typeof mod.getServerSession === "function") {
      return (mod.getServerSession as unknown as NextAuthGetServerSession)(...args);
    }
  } catch (err) {
    // rethrow original error
    throw new Error("next-auth getServerSession not available: " + String(err));
  }

  return null;
}
