// Unified next-auth getServerSession shim — try common import paths at runtime.
export async function getServerSession(...args: any[]) {
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
}
