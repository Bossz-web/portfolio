/**
 * Work history, newest first — renders as a vertical timeline.
 *
 * @type {import('@/types').ExperienceItem[]}
 */
export const experience = [
  {
    company: "MSME Labs",
    role: "Frontend Engineer",
    duration: "2025 — Present",
    location: "Lagos, Nigeria",
    description:
      "Core frontend engineer on a fintech web application for a Lagos-based startup, building and maintaining user-facing modules from design to deployment.",
    responsibilities: [
      "Engineered end-to-end digital payment flows — P2P wallet transfers and bank payouts — covering recipient lookup, beneficiary management, PIN confirmation, and real-time balance updates",
      "Implemented a full authentication system: biometric login (WebAuthn), 2FA token lifecycle, first-login routing, and one-time device registration via Capacitor Preferences",
      "Built a Notifications module with optimistic UI updates and a Profile Settings page handling multiple concurrent API update flows",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Capacitor"],
    achievements: [
      "Delivered Account Statement downloads with fully client-side PDF, CSV, and XLSX generation — removing server dependency and improving load times",
      "Established API integration standards (custom auth hooks, shared success/error handling) that accelerated team development velocity",
      "Deployed builds to iOS and Android via Capacitor, resolving platform-specific native bridge edge cases",
    ],
  },
  {
    company: "LiveSense · Personal Project",
    role: "Software Developer",
    duration: "2024",
    location: "Lagos, Nigeria",
    description:
      "Sole developer of LiveSense, a browser-native facial liveness detection system built to prevent identity spoofing in remote KYC verification flows.",
    responsibilities: [
      "Designed and implemented four real-time liveness checks (Blink, Turn Left, Turn Right, Smile) using MediaPipe Face Landmarker tracking",
      "Optimized the flow from six checks to four for a smoother UX without sacrificing detection accuracy",
      "Built it as a fully client-side, reusable Next.js component with no external API dependency for inference",
    ],
    technologies: ["Next.js", "TypeScript", "MediaPipe", "Tailwind CSS"],
    achievements: [
      "Runs entirely in the browser — deployable across web and mobile contexts with zero backend inference cost",
    ],
  },
];

/**
 * Education, certifications, and courses — renders as a timeline with icons
 * keyed off the `type` field.
 *
 * @type {import('@/types').EducationItem[]}
 */
export const education = [
  {
    institution: "University of Ilorin",
    qualification: "B.Sc. Agriculture",
    duration: "2025",
    description:
      "Kwara, Nigeria. Transitioned into software engineering, self-teaching modern frontend development alongside my degree.",
    type: "degree",
  },
];
