import { Github, Twitter, Mail, ShieldCheck, Wallet, Zap } from "lucide-react";

/**
 * Core personal information and identity.
 * Update this file to change name, bio, contact details, and hero content.
 *
 * @type {import('@/types').PersonalInfo}
 */
export const personalInfo = {
  name: "Lolade Kolawole",
  headline: "I build fast, secure interfaces for a small, medium and large scale companies",
  role: "Frontend Engineer",
  summary:
    "Frontend Engineer with 2+ years working experience. I care about clean, accessible UIs and integrations that make financial tools unque, simpler and safer.",
  bio: "A frontend engineer focused on fintech  where clean code and thoughtful interfaces make financial tools people can definitely trust.",
  story: [
    "I'm a frontend engineer at MSME Labs, where I build and maintain web application for a small, medium and large scale companies.",
    "I'm largely self-taught and I learn fast.",
    "Right now I'm expanding into backend development with Node.js.",
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
      "End-to-end payment flows: P2P wallet transfers, bank payouts, beneficiary management, and real-time balance updates.",
    icon: Wallet,
  },
  {
    title: "Performance & Craft",
    description:
      "Optimistic UI, client-side files generation, and the attention to detail that catches bugs others overlook.",
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
