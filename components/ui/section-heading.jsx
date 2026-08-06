import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * Consistent section header: small accent eyebrow, large title, optional
 * description. Keeps typographic rhythm identical across every section.
 *
 * @param {Object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {"left" | "center"} [props.align="left"]
 * @param {string} [props.className]
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
