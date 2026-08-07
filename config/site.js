/**
 * Site-wide SEO and metadata configuration.
 *
 * `url` is the canonical production origin (no trailing slash). It drives
 * canonical tags, Open Graph URLs, the sitemap, and robots.txt.
 *
 * IMPORTANT: use your STABLE production domain here, not a per-deployment URL.
 * Vercel gives every build a unique hashed URL (…-cqyoivs1p-…) that changes on
 * each deploy; the stable alias is the one shown as "Domains" in the project
 * dashboard. Swap it in below when you confirm it (or add a custom domain).
 *
 * @type {import('@/types').SeoConfig}
 */
export const siteConfig = {
  siteName: " — Frontend Engineer",
  title: "Ololade · Frontend Engineer",
  description:
    "Frontend Engineer specializing in React, Next.js, and fintech interfaces — digital payments, biometric authentication, and fast, accessible UIs.",
  url: "https://portfolio-cqyoivs1p-bossz-webs-projects.vercel.app",
  ogImage: "/opengraph-image",
  twitterHandle: "@Ololade_dev",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Fintech",
    "WebAuthn",
    "UI Engineer",
    "Portfolio",
  ],
};

/** Feature flags for optional sections — flip to show/hide without deleting code. */
export const features = Object.freeze({
  blog: false,
  testimonials: false,
  scrollProgress: true,
  scrollToTop: true,
});
