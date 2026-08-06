/**
 * Featured projects. Each entry powers a project card plus its case-study
 * detail. The `tech` array feeds the technology filter on the Projects section,
 * so keep tech names consistent across projects for clean filtering.
 *
 * Images use Unsplash placeholders — swap `image` for your own screenshots in
 * /public/images/projects and update next.config.mjs if you use remote hosts.
 *
 * @type {import('@/types').Project[]}
 */
export const projects = [
  {
    slug: "fintech-payments-app",
    title: "Fintech Payments Web App",
    description:
      "A full-featured digital payments app with wallet transfers, bank payouts, biometric login, and real-time transaction history.",
    overview:
      "The production fintech product I build daily at MSME Labs for a Lagos-based startup — spanning payments, security, and account management across web and mobile.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    tech: ["React Native", "Next.js", "TypeScript", "Tailwind CSS", "Capacitor"],
    featured: true,
    year: 2025,
    caseStudy: {
      challenge:
        "Financial users need flows that are both effortless and secure — payments, authentication, and account data all have to be fast, trustworthy, and correct on web and mobile alike.",
      solution:
        "I engineered end-to-end payment flows (P2P transfers, bank payouts), a full auth system with biometric login and 2FA, and client-side account-statement generation — all deployed to iOS and Android via Capacitor.",
      results: [
        "P2P and bank payout flows with real-time balance updates",
        "Biometric (WebAuthn) login, 2FA, and PIN lifecycle management",
        "Client-side PDF/CSV/XLSX statements with no server dependency",
      ],
    },
  },
  {
    slug: "livesense",
    title: "LiveSense — Facial Liveness Detection",
    description:
      "A real-time, browser-based KYC liveness tool with four-challenge detection (blink, head turns, smile), built entirely client-side.",
    overview:
      "A browser-native facial liveness detection system designed to prevent identity spoofing in remote KYC verification — no backend required for inference.",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
    tech: ["Next.js", "TypeScript", "MediaPipe", "Tailwind CSS"],
    repoUrl: "https://github.com/Bossz-web/L-I-N-K",
    featured: true,
    year: 2024,
    caseStudy: {
      challenge:
        "Remote KYC flows are vulnerable to spoofing with static photos or videos — verifying a real, live person in the browser without a heavy backend is hard.",
      solution:
        "I built four real-time liveness challenges (blink, turn left, turn right, smile) with MediaPipe Face Landmarker, running fully client-side, and streamlined the flow from six checks to four for a better experience.",
      results: [
        "Four-challenge liveness detection entirely in the browser",
        "No external API dependency for inference",
        "Reusable Next.js component deployable across web and mobile",
      ],
    },
  },
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio Site",
    description:
      "This portfolio — project case studies, motion-driven UI, light/dark theming, and a working contact form powered by Resend.",
    overview:
      "A personal portfolio built to feel crafted rather than templated: fast, accessible, and with a contact form that actually reaches my inbox.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Resend API"],
    repoUrl: "https://github.com/Bossz-web/v0-next-js-tailwind-website",
    year: 2025,
    caseStudy: {
      challenge:
        "I needed a portfolio that felt intentional, stayed fast and accessible, and let visitors reach me directly.",
      solution:
        "I built it with Next.js and Tailwind, added motion-safe animations with Framer Motion, a monochrome design-token system with light/dark modes, and a contact form wired to Resend.",
      results: [
        "Accessible, motion-safe UI with reduced-motion support",
        "Single-token theming across light and dark modes",
        "Working contact form via Resend email integration",
      ],
    },
  },
];
