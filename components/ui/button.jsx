import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Button primitive with variant + size options. Set `asChild` to render as a
 * child element (e.g. an <a> or <Link>) while keeping button styling.
 *
 * @typedef {"primary" | "secondary" | "outline" | "ghost"} ButtonVariant
 * @typedef {"sm" | "md" | "lg" | "icon"} ButtonSize
 */

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

/** @type {Record<ButtonVariant, string>} */
const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-subtle hover:shadow-card hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-foreground text-background hover:opacity-90 active:scale-[0.98]",
  outline:
    "border border-border bg-transparent text-foreground hover:border-accent/50 hover:text-accent active:scale-[0.98]",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

/** @type {Record<ButtonSize, string>} */
const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10",
};

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {ButtonVariant} [props.variant="primary"]
 * @param {ButtonSize} [props.size="md"]
 * @param {boolean} [props.asChild=false] Render as the child element instead of a <button>.
 */
export const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
Button.displayName = "Button";
