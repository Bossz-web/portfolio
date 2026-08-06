import { siteConfig } from "@/config/site";

/**
 * robots.txt served at /robots.txt. Allows all crawlers and points them at
 * the sitemap.
 *
 * @returns {import('next').MetadataRoute.Robots}
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
