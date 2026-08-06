"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Displays an email address with a copy-to-clipboard button that confirms the
 * copy with a brief checkmark state.
 *
 * @param {Object} props
 * @param {string} props.email
 * @param {string} [props.className]
 */
export function CopyEmail({ email, className }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable; ignore */
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2",
        className,
      )}
    >
      <a
        href={`mailto:${email}`}
        className="text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
      >
        {copied ? (
          <Check className="h-4 w-4 text-accent" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
