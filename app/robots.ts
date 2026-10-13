import type { MetadataRoute } from "next";

/** Demo site must not be indexed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: undefined,
  };
}
