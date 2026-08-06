import { navItems, personalInfo, socialLinks } from "@/content";

/**
 * Site footer: brand, quick links, animated social icons, and copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#hero"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground text-sm">
                LK
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {personalInfo.summary}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold text-foreground">Navigate</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <ul className="mt-4 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
