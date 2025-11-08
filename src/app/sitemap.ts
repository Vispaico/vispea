import type { MetadataRoute } from "next";

import { listAllPrintfulProducts } from "@/lib/printful";
import { buildCanonicalUrl } from "@/lib/seo";

export const revalidate = 86_400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generatedAt = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/privacy-policy",
    "/refund-and-returns-policy",
  ].map((path) => ({
    url: buildCanonicalUrl(path || "/"),
    lastModified: generatedAt,
    changefreq: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    const { products } = await listAllPrintfulProducts();
    productRoutes = products.map((product) => ({
      url: buildCanonicalUrl(`/shop/${product.id}`),
      lastModified: generatedAt,
      changefreq: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to build product sitemap entries", error);
  }

  return [...staticRoutes, ...productRoutes];
}
