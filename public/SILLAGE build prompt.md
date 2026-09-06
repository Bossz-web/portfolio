# Build prompt — an editorial niche-perfume storefront

*How to use this: paste everything below the line into Claude Code (or Claude). It's a
complete build brief for a small perfume house's website. It uses a reference brand called
**SILLAGE** so the instructions stay concrete — keep it as-is to get a working demo, or
replace the **bracketed** brand details (name, palette, fonts, the fragrance line) with your
own. The architecture, design system, and features are meant to be reused whole; only the
brand content should change.*

---

You are building a complete, production-quality storefront for a small **niche perfume house**.
This is an editorial shop, not a discount retailer: it leads with scent storytelling and a
distinctive design system, sells a short, curated line of fragrances, and treats each scent as
a piece of writing. Build the whole thing — home page, collection, product pages, a cart, and a
working (payment-free) checkout — as a single, coherent site.

The reference brand is **SILLAGE** (*sillage, n. — the trail a fragrance leaves in a room after
the wearer has left it*). Keep that concept and voice as the default, or swap in your own house.

## 1. The organising idea

The whole site is built around one clever, reusable device: **an accord-colour system.** Every
fragrance belongs to exactly one *accord family* (amber, oud, citrus, iris, tobacco, rose,
vetiver…), and each family owns a single colour. That colour then follows the scent everywhere it
appears — the field behind its bottle, the little bars on its card, the layers of its notes
pyramid, its name on the product page. This is what makes the collection legible at a glance and
gives the site its identity. Nail this system first; everything else hangs off it.

Two rules that must hold throughout:

- **One code path, many palettes.** Components never hardcode a family's colour. They render
  inside a scope class (`.accord-<family>`) that rebinds CSS custom properties, and use *semantic*
  colour utilities (`accord`, `accord-lift`). Adding or recolouring a family is a one-line change
  in the stylesheet — no component edits.
- **Colour is never the only signal.** The family *name* is always printed alongside its colour,
  so the design works for colour-blind users and in greyscale.

## 2. Tech stack & conventions

Build with:

- **Next.js 15** (App Router) + **React 19**. Deploy target is **Vercel**.
- **Tailwind CSS 3.4** for all styling. No CSS-in-JS.
- **Plain JavaScript (JSX), not TypeScript.** Use **JSDoc `@typedef` blocks** for the data model
  and component props so editors still get autocomplete and type-checking, with zero build step and
  nothing for a non-programmer to learn.
- **`clsx` + `tailwind-merge`**, wrapped in a single `cn()` helper, for conditional class names.
- **`next/font/google`** for self-hosted, layout-shift-free fonts.
- **ESLint 9** with `eslint-config-next`.
- Path alias **`@/*`** → project root (set in `jsconfig.json`).
- **No database and no backend.** All content lives in one JavaScript file (see §5); the cart lives
  in memory for the session. This keeps the site a fast, fully static deploy.

Reference `package.json` dependencies (pin similar versions):

```
next 15.5.x · react 19.2.x · react-dom 19.2.x
tailwindcss 3.4.x · autoprefixer · postcss
clsx 2.1.x · tailwind-merge 2.6.x
(dev) eslint 9 · eslint-config-next 15.5.x
```

Scripts: `dev`, `build`, `start`, `lint`. Product pages must be **pre-rendered at build time**
(`generateStaticParams`).

**Accessibility is a first-class requirement, not a polish pass.** Everything below that says
"accessible" is a hard requirement: WCAG AA contrast, full keyboard support, correct ARIA, visible
focus rings, `prefers-reduced-motion` handling, and a skip-to-content link.

## 3. Brand & art direction  *(swap these for your own house)*

**Reference brand:** SILLAGE — *the trail a fragrance leaves behind.* Editorial, material-first,
quietly confident. Founded 2016. Copy voice: an apothecary that writes like a good perfume critic —
it names real materials and never resorts to marketing filler. (House rule: *nothing is ever called
"fresh."*) Prices are whole US dollars, no cents.

**Palette — nocturnal and material.** A near-black aubergine ground, warm bone text, a muted ash
for secondary text, and brass as the single structural accent (hairlines, labels, focus rings).
Define every colour once as **HSL channel values** in `:root` so Tailwind can apply alpha:

```css
:root {
  --ground: 292 20% 8%;    /* #171018  deep aubergine-ink page background */
  --veil:   288 16% 12%;   /* raised panel / card surface                 */
  --bone:   32 33% 91%;    /* #F0E9E1  primary text                       */
  --ash:    287 7% 62%;    /* #A398A6  secondary text                     */
  --brass:  36 36% 52%;    /* #B08D57  hairlines, labels, focus ring      */
  --danger: 6 62% 66%;     /* form errors                                 */
}
```

**Typography.** Two Google fonts via `next/font`: a **display serif** for headings and taglines
(reference uses **Fraunces**, exposed as `--font-display`) and a **grotesque/sans** for body and
labels (reference uses **Karla**, `--font-body`). Provide a **fluid display scale** with `clamp()`
and slightly negative tracking (`display-sm` → `display-xl`), plus small tracked-out **label** sizes
in uppercase for eyebrows. Swap the two fonts to re-voice the whole site.

## 4. The accord-colour system  *(the signature — implement carefully)*

Each family gets **two** colour values:

- **True hue** `--accord-<key>` — used for fills, bars, bottle silhouettes, pyramid slices.
- **Lift** `--accord-<key>-lift` — the same hue pushed to ~**70% lightness** — used only for
  accord-coloured **text**, so even dark families (oud, tobacco) clear **WCAG AA** as type on the
  dark ground.

Define them once, then expose a scope class per family that rebinds the two semantic variables:

```css
:root {
  --accord-amber:   36 65% 48%;   --accord-amber-lift:   36 65% 70%;
  --accord-oud:     295 20% 36%;  --accord-oud-lift:     295 20% 70%;
  --accord-citrus:  65 50% 53%;   --accord-citrus-lift:  65 50% 70%;
  --accord-iris:    231 33% 65%;  --accord-iris-lift:    231 33% 72%;
  --accord-tobacco: 26 46% 38%;   --accord-tobacco-lift: 26 46% 70%;
  --accord-rose:    347 39% 52%;  --accord-rose-lift:    347 39% 70%;
  --accord-vetiver: 111 15% 42%;  --accord-vetiver-lift: 111 15% 70%;
}
.accord-amber   { --accord: var(--accord-amber);   --accord-lift: var(--accord-amber-lift); }
.accord-oud     { --accord: var(--accord-oud);     --accord-lift: var(--accord-oud-lift); }
/* …one class per family… */
```

In `tailwind.config.js`, map `accord` and `accord-lift` (and `ground`/`veil`/`bone`/`ash`/`brass`/
`danger`) to `hsl(var(--…) / <alpha-value>)`. Components then say `bg-accord/10`, `text-accord-lift`,
`border-accord`, etc., and a wrapping `<div className={accordScope(family)}>` picks the palette.
A tiny helper returns the class name:

```js
export const accordScope = (family) => `accord-${family}`;
```

Give the reference **7 families** with the hues above. To change the palette for a whole family,
edit its two values in one place — nothing else moves.

## 5. Content model — the single source of truth

**All content lives in one file: `content/fragrances.js`.** Every page reads from it; nothing about
a scent is defined anywhere else. Adding a fragrance = adding one object. This file is the main
thing the shop owner ever edits, so comment it well.

Define the shape with JSDoc typedefs:

```js
/**
 * @typedef {"amber"|"oud"|"citrus"|"iris"|"tobacco"|"rose"|"vetiver"} AccordFamily
 * @typedef {"eau de toilette"|"eau de parfum"|"extrait"} Concentration
 *
 * @typedef {Object} Size
 * @property {number} ml
 * @property {number} price          // whole units of currency, no cents
 *
 * @typedef {Object} NotePyramid
 * @property {string[]} top          // the first spray
 * @property {string[]} heart        // the body of the scent
 * @property {string[]} base         // what's left on skin and cloth
 *
 * @typedef {Object} Fragrance
 * @property {string} slug           // URL segment + cart line key
 * @property {string} name
 * @property {string} tagline        // one line, shown under the name
 * @property {AccordFamily} family
 * @property {Concentration} concentration
 * @property {number} year
 * @property {string} perfumer
 * @property {string} description    // 2–3 sentences of real copy
 * @property {string} story          // a longer editorial passage
 * @property {NotePyramid} notes
 * @property {Size[]} sizes          // ascending by volume; first is the default
 * @property {number} longevity      // 1–5 (see SCALES)
 * @property {number} sillage        // 1–5 (see SCALES)
 * @property {boolean} featured      // shown in the home-page trio
 * @property {string} releasedAt     // ISO date, used for the "newest" sort
 */
```

Export three reference tables and the scales:

```js
// key also names the colour (.accord-<key> / --accord-<key>); label is what customers read
export const ACCORD_FAMILIES = [ { key, label, note, color }, … ];   // 7 entries
export const CONCENTRATIONS  = [ { key, label, short, note }, … ];   // e.g. EDT / EDP / EXT
export const SCALES = {
  longevity: ["Under 2 hours","2–4 hours","4–6 hours","6–9 hours","9 hours or more"],
  sillage:   ["Skin scent","An arm's length","Fills a room","Follows you out","Announces you"],
};
```

And a small set of selector helpers (the only way pages touch the data):

```js
getFragranceBySlug(slug)   // → Fragrance | undefined
getFeatured()              // → the featured trio for the home page
getFamily(key)             // → the ACCORD_FAMILIES entry
getConcentration(key)      // → the CONCENTRATIONS entry
startingPrice(fragrance)   // → Math.min across sizes; what the grid shows
```

**Write the content to a high bar.** Each fragrance needs a material-led `description` and a longer,
evocative `story` — name real notes and materials, evoke a mood, don't pad. One worked example in
the reference voice (adapt or replace entirely):

```js
{
  slug: "cendre-diris",
  name: "Cendre d'Iris",
  tagline: "Orris in cold ash.",
  family: "iris",
  concentration: "extrait",
  year: 2019,
  perfumer: "Camille Réault",
  description:
    "Orris butter laid over a bed of cooled woodsmoke. Carrot seed and violet leaf keep the root damp and vegetal rather than powdery, and ambrette pulls the drydown close enough to read as warm skin.",
  story:
    "Réault built this one backwards, starting from the ash and working up to the flower. The orris is Florentine, rested three years before distillation, and it arrives smelling less like a cosmetic and more like a root just lifted out of the ground. What follows is the smell of a fireplace the morning after — cold, mineral, faintly sweet. It is the quietest thing the house makes and the one people ask about most.",
  notes: {
    top:   ["Bergamot", "Carrot seed", "Pink pepper"],
    heart: ["Orris butter", "Violet leaf", "Ambrette"],
    base:  ["Birch ash accord", "Benzoin", "White musk"],
  },
  sizes: [
    { ml: 10, price: 95 },
    { ml: 30, price: 265 },
    { ml: 50, price: 370 },
  ],
  longevity: 4,
  sillage: 2,
  featured: true,
  releasedAt: "2019-09-12",
}
```

Reference line = **8 fragrances across the 7 families** (a couple share a family). Replace with your
own line: names, families, notes, prices, and stories. Everything else on the site updates itself.

## 6. Pages & routes

- **`/` — Home.** Four beats, top to bottom:
  1. **Hero** — a type-only treatment of the brand name (see §7).
  2. **Featured trio** — the three `featured` fragrances as cards.
  3. **House note** — a short editorial paragraph on what the house believes about scent.
  4. **Accord key** — the family legend: each family's swatch, name, and one-line description.
- **`/collection` — the browser.** All fragrances in a grid, with accord/format filters and sort
  (see §7).
- **`/collection/[slug]` — the product page.** Pre-rendered for every fragrance via
  `generateStaticParams`. Layout: breadcrumb → two columns (a sticky "accord field" holding the
  bottle on the left; header, price, purchase block, intensity readouts, scent pyramid, story, and a
  details `<dl>` on the right) → a "more from the house" related trio (same family first). Set page
  `metadata` per fragrance in `generateMetadata`.
- **`/checkout` — contact, delivery, and a demo card block** with real validation but no payment
  (see §7), followed by an **order confirmation** with a generated reference.
- **`not-found`** — an on-brand 404.
- **Global chrome** (in the root layout): a skip-to-content link, a site header with the wordmark
  and a cart button showing a live item count, a site footer, the slide-over **cart drawer**, and a
  **toast** region. Wrap the app in the cart provider.

Root layout also sets `metadata` (title template like `"%s · SILLAGE"`, a description, Open Graph,
robots) and a viewport `themeColor` matching the ground.

## 7. Signature interactions & components

Build each of these; they're what make the site feel considered. All are keyboard-accessible.

- **The "sillage" hero.** No photography. Render the wordmark solid, then place **three ghost copies
  behind it** at increasing horizontal offset and decreasing opacity — the name literally leaves a
  trail. Built purely from type + opacity, so it's crisp at any size. Around it: a small eyebrow
  (`Parfums · est. 2016`), the dictionary-definition tagline, two CTAs (*Browse collection* / *Read
  the accord key*), and a small stats `<dl>` (fragrances / accord families / perfumers / since).

- **The scent pyramid** *(the standout component).** Present the top/heart/base notes as
  **WAI-ARIA tabs** (vertical, roving `tabindex`, Arrow/Home/End keys, `aria-selected`). Each tab is
  a **trapezoid slice** (CSS `clip-path` polygon) that **widens as you descend** top → heart → base,
  tinted with the family accord. Selecting a layer reveals that layer's notes as bordered chips;
  inactive panels are removed from the tree. Marquee element — make it feel tactile.

- **The collection browser** *(client component).** Multi-select, **additive** filters by accord
  family and by concentration (selecting none in a group = no filter on that group). Show a live
  **count per facet**. Sort options: house order (featured first), price ↑, price ↓, newest. Use an
  `aria-live` region for the result count, `aria-pressed` on toggle buttons, and a proper empty
  state. Grid is 2-up at `sm`, 3-up at `xl`. Use `useState` + `useMemo`; no URL state needed.

- **The purchase block** *(client component).** Size choices are **real radio inputs** in a
  `<fieldset>` (accessible by default), a quantity stepper (1…**10**), a live line total, and an
  **Add to bag** button that adds the line and opens the drawer.

- **Intensity readouts.** A 1–5 indicator (five bars) for **longevity** and **sillage** — but always
  render the reading **in words** from `SCALES` (e.g. "Fills a room") plus an sr-only "N out of 5".
  Never rely on counting bars or on colour alone.

- **The cart** *(client, React context + `useReducer`).** **In-memory only for the session — no
  `localStorage`; refreshing the page empties it** (intentional for a demo; note it in the README).
  Line key is `` `${slug}:${ml}` ``; adding a duplicate merges quantities; **max 10** per line;
  setting quantity to 0 removes the line. Derive `count` and `subtotal`. Provide a `useCart()` hook
  that throws if used outside the provider. A **slide-over drawer** lists lines with quantity
  steppers, remove buttons, a subtotal, and a checkout link. A self-clearing **toast** (~2.6s)
  announces "added" via `aria-live`.

- **The checkout** *(client).* Fields: contact (email), delivery (name, address…), and a card block.
  Validation is **pure client-side and nothing is ever transmitted or stored** — there is no server
  and no payment processor. Implement:
  - email format check; required-field checks;
  - **card number via the Luhn checksum** + a 13–19 digit length check; input **formatting** into
    groups of four as the user types;
  - **expiry** `MM/YY`, month 1–12, not in the past (current month is valid), with slash formatting;
  - **CVC** length 3–4;
  - a **focus-managed error summary** and clear per-field messages, all screen-reader friendly.

  On success, **clear the cart** and show a confirmation with a generated order reference like
  **`SIL-XXXXXX`** (six chars from an unambiguous alphabet — exclude `I O 0 1`; derive the prefix
  from the brand's initials) and an honest **"nothing was charged"** note. Only ever surface the
  card's last four digits, to make the point that the rest was discarded. State plainly on the form,
  the button, and the confirmation that this is a demo. (The test number `4242 4242 4242 4242`
  passes Luhn.)

- **Order math** — one small module so the drawer, order summary, and confirmation always agree:
  a flat shipping fee (reference: **$15**), **free over a threshold** (reference: **$250**), and a
  `totalsFor(subtotal)` → `{ subtotal, shipping, total }`.

- **The bottle** *(optional but nice).* Since the house uses no stock photography, draw the flacon
  as an **SVG** filled with the accord colour, its proportions varying by concentration
  (toilette → parfum → extrait). Keep it a single component the card and product page share. *(If you
  prefer real product photos, allow an optional `image` field on a fragrance that, when present,
  renders a photo instead — but keep the drawn bottle as the zero-config default.)*

- **Button** — a `buttonStyles({ variant, size, className })` **function** (so a `next/link` can
  borrow the exact styling) plus a `Button` component. Variants: primary / outline / ghost / quiet;
  sizes sm / md / lg with uppercase tracked labels; small radius; brass focus ring.

- **`cn` / `formatPrice`** — `cn` merges class names (`twMerge(clsx(...))`); `formatPrice` uses
  `Intl.NumberFormat` for the currency with **zero fraction digits** (whole units).

## 8. Accessibility & quality bar

- **WCAG AA contrast** for all text, including accord-coloured text (that's what the `-lift`
  variants are for — verify the dark families as type).
- **Visible focus rings** (brass, offset from the ground) on every interactive element; a
  **skip-to-content** link as the first focusable element.
- Full **keyboard support** everywhere (the pyramid tabs, filters, steppers, drawer, checkout).
- Correct **semantic HTML + ARIA**: real `<fieldset>`/radios, tablist/tab/tabpanel for the pyramid,
  `aria-live` for cart/toast/result-count, `aria-current` on breadcrumbs.
- Respect **`prefers-reduced-motion`** — gate the hero/rise-in animations behind it.
- **Family name always accompanies family colour.**
- The finished site should pass a basic automated a11y check and a keyboard-only walkthrough.

## 9. Make it yours — swap checklist

To rebrand from SILLAGE to your own house, change only:

1. **Brand name + thesis** (the wordmark, the tagline/definition, the house note).
2. **Palette** — the six base HSL values in §3, and the seven family hue pairs in §4.
3. **The two fonts** (display + body) in the layout.
4. **The fragrance line** in `content/fragrances.js` — names, families, notes, prices, stories,
   longevity/sillage, featured flags.
5. **Currency + shipping** — the `formatPrice` locale/currency and the shipping fee/threshold.
6. **Order-reference prefix** and all **metadata** (title template, description, Open Graph, domain).

Everything else — the architecture, the accord system, the components, the checkout logic — carries
over unchanged.

## 10. Deliverables

- A complete, runnable **Next.js 15 App Router** project in plain JS + JSDoc, structured roughly as:

  ```
  app/         layout.jsx · globals.css · page.jsx · not-found.jsx
               collection/page.jsx · collection/[slug]/page.jsx · checkout/page.jsx
  components/  home/ · collection/ · product/ · cart/ · checkout/ · layout/ · ui/
  content/     fragrances.js          ← the single source of truth
  lib/         utils.js · order.js · validation.js
  ```

- Config: `tailwind.config.js`, `postcss.config.mjs`, `jsconfig.json` (`@/*` alias), `next.config`,
  `eslint.config`.
- A **README** written for a non-programmer owner: how to run it (`npm install`, `npm run dev`), the
  fact that **`content/fragrances.js` is the one file that matters**, how to add/price/remove a
  scent, an honest note that the checkout takes no payment and the cart doesn't persist, and how to
  deploy free on **Vercel**.
- Verify it builds (`npm run build`) and pre-renders every product page before you hand it over.

Build the reference SILLAGE version end-to-end first so it runs, looks finished, and reads well —
then it's ready to rebrand with the §9 checklist.
