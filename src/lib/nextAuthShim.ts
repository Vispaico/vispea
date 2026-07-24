// Compatibility shim for getServerSession import paths.
// Uses dynamic import to avoid build-time resolution errors with different next-auth versions.
export async function getServerSession(...args: any[]) {
  try {
    // Preferred path used by many examples
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = await import("next-auth/next");
    if (mod && typeof mod.getServerSession === "function") {
      return mod.getServerSession(...args);
    }
  } catch (err) {
    // ignore and try fallback
  }

  try {
    const mod = await import("next-auth");
    if (mod && typeof mod.getServerSession === "function") {
      return mod.getServerSession(...args);
    }
  } catch (err) {
    // rethrow original error
    throw new Error("next-auth getServerSession not available: " + String(err));
  }
}
