/**
 * Featured projects. Each entry powers a project card plus its case-study
 * detail. The `tech` array feeds the technology filter on the Projects section,
 * so keep tech names consistent across projects for clean filtering.
 *
 * Images live in /public/images and are served locally. The remaining Unsplash
 * placeholder (fintech) is a remote host declared in next.config.mjs — replace
 * it with a real screenshot and the remotePatterns entry can go.
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
      "A real-time, browser-based KYC liveness tool with four randomised challenges (blink, head turns, smile), built entirely client-side.",
    overview:
      "A browser-native facial liveness detection system designed to prevent identity spoofing in remote KYC verification. Inference runs in the page — no frame, landmark or verdict is ever sent to a server.",
    image: "/images/livesense.jpg",
    tech: ["Next.js", "JavaScript", "MediaPipe", "Tailwind CSS"],
    liveUrl: "https://livesense.vercel.app",
    repoUrl: "https://github.com/Bossz-web/livesense",
    featured: true,
    year: 2025,
    caseStudy: {
      challenge:
        "Remote KYC flows are trivially spoofed with a static photo or a replayed video. Proving a real, present person is in front of the camera normally means shipping frames to a server — which is slow, costly, and turns every verification into a privacy liability.",
      solution:
        "I built four liveness challenges on MediaPipe's Face Landmarker, scored from the 478-point mesh and ARKit blendshapes at frame rate. The challenge order is shuffled per session with Fisher-Yates, so the sequence can't be pre-recorded and replayed. The camera stream, detection loop and state machine share a single teardown path, and a monotonic session id invalidates any in-flight work — so retrying never stacks two streams or leaves the camera light on.",
      results: [
        "Four randomised challenges scored entirely on-device",
        "Zero network round-trips for inference — GPU delegate with CPU fallback",
        "Multi-face and out-of-frame rejection with actionable guidance",
      ],
    },
  },
  {
    slug: "sillage",
    title: "SILLAGE — Perfume House",
    description:
      "An editorial storefront for a fragrance house, built around an accord-colour system that drives eight fragrances from one code path.",
    overview:
      "A perfume house of eight fragrances across seven accord families, with every material named and every scent pyramid published. The palette does information work rather than decoration.",
    image: "/images/sillage.jpg",
    tech: ["Next.js", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://sillage-pied-theta.vercel.app",
    repoUrl: "https://github.com/Bossz-web/Sillage",
    featured: true,
    year: 2025,
    caseStudy: {
      challenge:
        "Fragrance is the hardest product to sell online — you can't sample it through a screen. A storefront has to convey what a scent actually smells like using nothing but type, colour and structure, and it has to do that for eight distinct fragrances without collapsing into eight bespoke layouts.",
      solution:
        "I made colour carry meaning: every fragrance belongs to an accord family that owns a colour, bound as CSS custom properties and rebound by an `.accord-<family>` scope. Components never hardcode a family colour, so one code path renders all eight. Because several accords are too dark to read as text, each family carries a second lifted value for type — every combination clears WCAG AA, and the family name is always printed alongside the colour so it's never the sole carrier of meaning. The scent pyramid is a WAI-ARIA tabs pattern with roving tabindex and full keyboard support.",
      results: [
        "One component path serving eight fragrances and seven accord families",
        "AA-contrast colour system with a dual-token scheme for legible accord type",
        "Keyboard-navigable scent pyramid, cart and checkout with Luhn-validated fields",
      ],
    },
  },
  {
    slug: "plumb",
    title: "PLUMB — Made-to-Measure Fit Engine",
    description:
      "A menswear storefront that recommends your size from ease — garment minus body — instead of a generic size chart, with a fit finder and capsule builder.",
    overview:
      "A made-to-measure clothing house where every garment publishes its drafted flat measurements. Enter your body measurements and PLUMB recommends the size whose ease lands closest to how the pattern was drafted — the whole site reasons in ease, not S/M/L.",
    image: "/images/plumb.jpg",
    tech: ["Next.js", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://luxury-home-tau.vercel.app",
    repoUrl: "https://github.com/Bossz-web/Luxury_home",
    featured: true,
    year: 2025,
    caseStudy: {
      challenge:
        "Buying clothes online means guessing. Size charts list body measurements, not the garment's, so a shopper can't tell whether a piece will actually fit — and bad fit is the single biggest driver of returns in online apparel. Sizing needs to answer 'will this fit me?' directly, not 'what's your dress size?'.",
      solution:
        "I built a fit engine that reasons in ease — garment measurement minus body measurement. Every garment publishes the flat measurements it was drafted with; the app takes the shopper's body measurements and recommends the size whose ease at the governing measurement (chest for tops, seat for trousers) lands closest to the drafted intent. It's built on a drafting-paper design system where every measurement is tabular and aligned like a spec sheet, with a keyboard-navigable fit finder and a capsule builder that checks how a coordinated set layers together.",
      results: [
        "Size recommendation from ease at the governing measurement — chest for tops, seat for trousers",
        "Every garment publishes drafted flat measurements, not just a body-size chart",
        "Capsule builder that validates layering across a coordinated outfit",
      ],
    },
  },
  {
    slug: "lagoon-estates",
    title: "Lagoon Estates — Luxury Real Estate",
    description:
      "A multi-page brokerage site for the Lagos luxury property market — filterable listings, property galleries, and agent profiles, all editable from one content folder.",
    overview:
      "A boutique Lagos brokerage with waterfront listings across Ikoyi, Victoria Island, Lekki, and Eko Atlantic. Every property, agent, Naira price, and photo lives in a plain-JavaScript content layer, so a real agency's details drop in without touching component code.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    tech: ["Next.js", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://real-estate-webite-alpha.vercel.app",
    featured: true,
    year: 2026,
    caseStudy: {
      challenge:
        "Most Lagos real-estate agencies run entirely on Instagram and WhatsApp — poor catalogues for serious or diaspora buyers comparing many properties, and invisible on Google. They need a site that reads as premium and can be handed to any agency by editing content, not code.",
      solution:
        "I built a full multi-page brokerage — home, filterable listings, individual property pages with image galleries, agent profiles, an about page, and a working enquiry form — in Next.js and Tailwind. Listings filter by area, type, and price on the client, and every property, agent, price, and photo is defined in a single /content data layer with typedefs, so re-skinning it for a real agency is a content edit rather than a rebuild.",
      results: [
        "Multi-page site: home, listings with live filtering, property galleries, agents, about, contact",
        "Naira pricing and Lagos neighbourhoods (Ikoyi, VI, Lekki, Eko Atlantic) throughout",
        "Fully content-driven — a client's branding and listings swap in from one folder",
      ],
    },
  },
  {
    slug: "scents-by-adeshewa",
    title: "Scents by Adeshewa — Lagos Perfume Shop",
    description:
      "An online storefront for a Lagos fragrance seller — Arabian-inspired perfumes, body mists, and attar oils, each with its notes, longevity, and Naira price.",
    overview:
      "A working shop for a scent business that previously sold only through Instagram and WhatsApp. Every product, price, and note lives in one editable file, so the owner runs the catalogue without touching code.",
    image: "/images/scentsbyadeshewa.jpg",
    tech: ["Next.js", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://scentsbyadeshewa.vercel.app",
    repoUrl: "https://github.com/Bossz-web/scentsbyadeshewa",
    featured: true,
    year: 2026,
    caseStudy: {
      challenge:
        "Most Lagos perfume sellers run entirely on Instagram and WhatsApp. That's fine for a single post, but a buyer can't browse the full range, compare scents, or see notes and prices in one place — and the shop never turns up when someone searches for it. The owner needed a real catalogue they could keep up to date themselves, without learning to code.",
      solution:
        "I built a full storefront on a content-driven architecture — home, a filterable collection, product pages with an interactive scent pyramid, a slide-over bag, and a payment-free demo checkout — with Naira pricing throughout and every scent's notes, longevity, and projection published. All product data lives in a single content file the owner edits, so adding, pricing, or removing a scent is a one-line change. I also added optional per-scent photo support that falls back to a drawn bottle, so the shop looks finished before any product photography exists.",
      results: [
        "Six scents across six accord families, each with published notes, longevity, and Naira pricing",
        "Entire catalogue driven by one editable content file — no code needed to add or price a scent",
        "Interactive scent pyramid, bag, and payment-free demo checkout, all mobile-first",
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
