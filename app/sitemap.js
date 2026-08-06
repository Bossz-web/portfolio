import { siteConfig } from "@/config/site";

/**
 * Dynamic sitemap. Next.js serves this at /sitemap.xml. For a single-page
 * portfolio this is one entry; add routes here if you introduce more pages
 * (e.g. individual project or blog pages).
 *
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
