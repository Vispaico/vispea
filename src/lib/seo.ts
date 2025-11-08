const FALLBACK_SITE_URL = "https://vispea.com";

let cachedSiteUrl: string | null = null;

export function getSiteUrl(): string {
  if (cachedSiteUrl) {
    return cachedSiteUrl;
  }

  const candidate = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? FALLBACK_SITE_URL;

  try {
    cachedSiteUrl = new URL(candidate).origin;
  } catch {
    cachedSiteUrl = FALLBACK_SITE_URL;
  }

  return cachedSiteUrl;
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

export function buildCanonicalUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/") {
    return `${base}/`;
  }

  return `${base}${normalized}`;
}

export function stripHtmlToText(input?: string | null): string | null {
  if (!input) {
    return null;
  }

  const text = input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  return text.length > 0 ? text : null;
}
