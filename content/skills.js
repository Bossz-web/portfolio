import {
  Code2,
  Layers,
  Database,
  Wrench,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";

/**
 * Skills grouped by category. Edit freely — each category renders as its own
 * card with an icon, and each skill gets an elegant hover interaction.
 *
 * @type {import('@/types').SkillCategory[]}
 */
export const skillCategories = [
  {
    name: "Languages",
    icon: Code2,
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    name: "Frameworks & Libraries",
    icon: Layers,
    skills: ["React.js", "Next.js", "React Native", "Tailwind CSS", "MediaPipe"],
  },
  {
    name: "State & Data",
    icon: Database,
    skills: [
      "React Context API",
      "Custom Hooks",
      "REST API Integration",
      "localStorage",
    ],
  },
  {
    name: "Tooling",
    icon: Wrench,
    skills: ["Git & GitHub", "Capacitor (iOS/Android)", "Postman", "VS Code"],
  },
  {
    name: "Auth & Security",
    icon: ShieldCheck,
    skills: [
      "WebAuthn / Biometric Login",
      "2FA Flows",
      "PIN Lifecycle Management",
    ],
  },
  {
    name: "File Generation",
    icon: FileText,
    skills: ["Client-side PDF", "CSV Export", "XLSX Export"],
  },
  {
    name: "Currently Learning",
    icon: Sparkles,
    skills: [
      "Node.js (Backend)",
      "Advanced TypeScript Patterns",
      "System Design",
    ],
  },
];
