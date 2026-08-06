import { Github, Twitter, Mail, ShieldCheck, Wallet, Zap } from "lucide-react";

/**
 * Core personal information and identity.
 * Update this file to change name, bio, contact details, and hero content.
 *
 * @type {import('@/types').PersonalInfo}
 */
export const personalInfo = {
  name: "Lolade Kolawole",
  headline: "I build fast, secure interfaces for fintech.",
  role: "Frontend Engineer",
  summary:
    "Frontend Engineer with 1+ years shipping complex fintech features — digital payments, biometric authentication, and real-time interfaces. I care about clean, accessible UIs and integrations that make financial tools simpler and safer.",
  bio: "A frontend engineer focused on fintech — where clean code, secure authentication, and thoughtful interfaces make financial tools people can actually trust.",
  story: [
    "I'm a frontend engineer at MSME Labs, where I build and maintain user-facing modules for a fintech web application — from end-to-end payment flows and biometric authentication to real-time notifications and account statements. I gravitate toward problems where the interface has to be both effortless to use and genuinely secure.",
    "I'm largely self-taught and I learn fast. I picked up WebAuthn, MediaPipe's ML APIs, and Capacitor native deployment on my own while shipping features on tight deadlines — including LiveSense, a browser-native facial liveness detection system I built solo to fight identity spoofing in remote KYC.",
    "Right now I'm expanding into backend development with Node.js, advanced TypeScript patterns, and system design, on the way to becoming a more complete engineer. When I'm heads-down, I'm usually chasing a subtle UI bug that everyone else walked past.",
  ],
  location: "Lagos, Nigeria",
  email: "kolawolepsalmson@gmail.com",
  avatar: "/images/Lolade_PP.png",
  aboutImage: "/images/Lolade_PP.png",
  resumeUrl: "/resume.pdf",
  availability: "Available for freelance",
};

/**
 * Strengths displayed in the About section.
 *
 * @type {import('@/types').Strength[]}
 */
export const strengths = [
  {
    title: "Secure Authentication",
    description:
      "WebAuthn biometric login, 2FA token lifecycle, and PIN management built to the security bar financial products demand.",
    icon: ShieldCheck,
  },
  {
    title: "Payment Engineering",
    description:
      "End-to-end payment flows — P2P wallet transfers, bank payouts, beneficiary management, and real-time balance updates.",
    icon: Wallet,
  },
  {
    title: "Performance & Craft",
    description:
      "Optimistic UI, client-side PDF/CSV/XLSX generation, and the attention to detail that catches bugs others overlook.",
    icon: Zap,
  },
];

/**
 * Navigation items for the sticky header.
 *
 * @type {import('@/types').NavItem[]}
 */
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/**
 * Social/professional links displayed in footer and contact section.
 *
 * @type {import('@/types').SocialLink[]}
 */
export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Bossz-web",
    icon: Github,
  },
  {
    label: "X",
    href: "https://x.com/Ololade_dev",
    icon: Twitter,
  },
  {
    label: "Email",
    href: "mailto:kolawolepsalmson@gmail.com",
    icon: Mail,
  },
];
