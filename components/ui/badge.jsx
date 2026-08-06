import { cn } from "@/lib/utils";

/**
 * Small pill label, used for tech tags, availability, and blog categories.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {"default" | "accent" | "outline"} [props.variant="default"]
 * @param {string} [props.className]
 */
export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    accent: "bg-accent-subtle text-accent",
    outline: "border border-border text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
