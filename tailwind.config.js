/**
 * Design system for the portfolio.
 *
 * All colors are driven by CSS custom properties defined in `app/globals.css`,
 * which lets light/dark theming swap values without touching component code.
 * Reference tokens semantically (e.g. `bg-background`, `text-accent`) rather
 * than raw color names so the palette can evolve in one place.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          subtle: "hsl(var(--accent-subtle) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      maxWidth: {
        content: "72rem",
      },
      /* Elevation is driven by `--shadow-color`, `--shadow-boost`, and `--rim`
       * (see globals.css) so shadows stay dark and rims stay subtle in dark
       * mode. Tune the feel per theme there, not here. */
      boxShadow: {
        subtle:
          "0 1px 2px 0 hsl(var(--shadow-color) / calc(0.04 * var(--shadow-boost)))",
        /* Named `soft`, not `card`: a boxShadow key that matches a color key
         * makes Tailwind emit a competing `shadow-<name>` color utility that
         * wins the cascade and repaints the shadow in that color. */
        soft: "0 4px 24px -8px hsl(var(--shadow-color) / calc(0.08 * var(--shadow-boost)))",
        elevated:
          "0 16px 48px -16px hsl(var(--shadow-color) / calc(0.16 * var(--shadow-boost)))",
        /* Directional "raised" shadows: lit top rim + drop below the pill. */
        pop: "inset 0 1px 0 0 hsl(var(--rim)), 0 10px 24px -8px hsl(var(--shadow-color) / calc(0.22 * var(--shadow-boost))), 0 4px 8px -4px hsl(var(--shadow-color) / calc(0.14 * var(--shadow-boost)))",
        "pop-lg":
          "inset 0 1px 0 0 hsl(var(--rim-strong)), 0 20px 44px -12px hsl(var(--shadow-color) / calc(0.30 * var(--shadow-boost))), 0 6px 14px -6px hsl(var(--shadow-color) / calc(0.20 * var(--shadow-boost)))",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
