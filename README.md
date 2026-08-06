# Portfolio — Front-End Engineer

A modern, minimal, premium portfolio site built with the Next.js App Router. Fast, accessible, fully responsive, dark-mode-first, and ready to deploy to Vercel in minutes. All copy, projects, skills, and metadata live in structured data files — you customize the site without touching a single component.

> Replace the placeholder identity (`Alex Chen`), copy, images, and links with your own. Everything you need to change lives in `content/` and `config/site.js`. See [Customization](#customization).

---

## Highlights

- **Next.js 15 (App Router) + React 19 + JavaScript** with JSDoc type annotations for editor autocomplete.
- **Tailwind CSS** with a CSS-variable design-token system (single source of truth for color, spacing, and shadows).
- **Light / dark theme** with zero external dependencies and no flash-of-unstyled-content — the theme is resolved before first paint.
- **Framer Motion** animations that automatically respect `prefers-reduced-motion`.
- **Accessible by default** — semantic landmarks, keyboard navigation, focus-visible rings, skip-to-content link, ARIA where it counts, WCAG-minded contrast.
- **SEO complete** — Metadata API, Open Graph + Twitter cards, a dynamically rendered OG image, `sitemap.xml`, `robots.txt`, canonical URL, and Person JSON-LD.
- **Working contact form** — React Hook Form + Zod validation shared client/server, honeypot spam trap, and Resend email delivery that degrades gracefully when unconfigured.
- **Content-driven** — projects, skills, experience, education, testimonials, and blog posts are all structured data, not hardcoded markup.

---

## Tech stack

| Area          | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 15 (App Router)                            |
| Language      | JavaScript (JSDoc-typed)                           |
| UI            | React 19                                           |
| Styling       | Tailwind CSS + CSS variables                       |
| Animation     | Framer Motion                                      |
| Icons         | Lucide React                                       |
| Forms         | React Hook Form + Zod                              |
| Email         | Resend                                             |
| Fonts         | Geist Sans + Geist Mono                            |
| Deployment    | Vercel                                             |

---

## Getting started

**Requirements:** Node.js 18.18+ (Node 20 LTS recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) enable the contact form — see Environment variables below
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>. The dev server hot-reloads as you edit.

### Scripts

| Command         | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start the local dev server                |
| `npm run build` | Production build (run this before deploy) |
| `npm run start` | Serve the production build locally        |
| `npm run lint`  | Run ESLint                                |

---

## Environment variables

The contact form runs **without any configuration** — it validates input and shows a friendly "email isn't set up yet" message instead of sending. To enable real email delivery, set these in `.env.local` (never commit this file):

| Variable           | Required | Purpose                                                        |
| ------------------ | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`   | To send  | Resend API key (starts with `re_`) from <https://resend.com>.  |
| `CONTACT_TO_EMAIL` | No       | Inbox that receives submissions. Defaults to your profile email. |
| `CONTACT_FROM`     | No       | Verified Resend sender. Defaults to `onboarding@resend.dev`.   |

To go live with your own domain, verify it in Resend and set `CONTACT_FROM` to an address on that domain.

---

## Customization

Almost everything is data. Start here:

| Want to change…               | Edit                                             |
| ----------------------------- | ------------------------------------------------ |
| Name, role, bio, avatar, socials | `content/personal.js`                         |
| Skills & categories           | `content/skills.js`                              |
| Projects & case studies       | `content/projects.js`                            |
| Work experience & education   | `content/experience.js`                          |
| Testimonials                  | `content/testimonials.js`                        |
| Blog posts                    | `content/blog.js`                                |
| Site name, URL, SEO keywords, feature flags | `config/site.js`                   |
| Brand colors, radius, shadows | `app/globals.css` (CSS variables) + `tailwind.config.js` |

**Images.** Placeholder avatar and about images live in `public/images/`. Swap them for your own (keep the filenames, or update the paths in `content/personal.js`). Project and testimonial images currently point at Unsplash; replace the URLs with your own screenshots. If you host images on a new remote domain, add it to `remotePatterns` in `next.config.mjs`.

**Résumé.** Drop your `resume.pdf` into `public/` (the Hero and nav link to `/resume.pdf`).

**Toggle sections.** Feature flags in `config/site.js` let you show/hide optional sections.

---

## Project structure

```
portfolio/
├─ app/                     # App Router: pages, layout, metadata routes, API
│  ├─ api/contact/route.js  # Contact form handler (Zod + Resend)
│  ├─ layout.jsx            # Root layout, metadata, fonts, JSON-LD, chrome
│  ├─ page.jsx              # Composes all sections
│  ├─ opengraph-image.jsx   # Dynamic OG image
│  ├─ sitemap.js / robots.js
│  ├─ error.jsx / not-found.jsx / loading.jsx
│  └─ globals.css           # Design tokens + base styles
├─ components/
│  ├─ layout/               # Navbar, footer, scroll progress, scroll-to-top
│  ├─ sections/             # Hero, About, Skills, Projects, … Contact
│  ├─ ui/                   # Button, Badge, Reveal, SectionHeading, …
│  └─ theme-provider.jsx    # Dependency-free theme system
├─ config/site.js           # Site config + feature flags
├─ content/                 # All structured content data (edit these)
├─ hooks/                   # Custom hooks
├─ lib/                     # utils (cn) + Zod validations
├─ types/                   # Shared JSDoc typedefs
├─ public/                  # Images, icons, manifest, resume
├─ next.config.mjs
├─ tailwind.config.js
└─ jsconfig.json
```

---

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it at <https://vercel.com/new>. Vercel auto-detects Next.js — no build config needed.
3. Add your environment variables (from the table above) in **Project → Settings → Environment Variables**.
4. Deploy. Set your production URL in `config/site.js` (`url`) so SEO tags and the sitemap use the right absolute links, then redeploy.

---

## Accessibility & performance notes

- Animations are gated behind `prefers-reduced-motion`; the site is fully usable with motion disabled.
- All interactive elements are keyboard reachable with visible focus states, and a skip link jumps past the nav.
- Fonts are self-hosted via the Geist packages (no layout shift, no third-party font requests).
- Images use `next/image` for automatic sizing and modern formats (AVIF/WebP).

Run a production build (`npm run build`) before measuring Lighthouse — dev mode is intentionally unoptimized.

---

## License

Personal project template — adapt freely for your own portfolio.
