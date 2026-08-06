"use client";

import { Button } from "@/components/ui/button";

/**
 * Global error boundary for the app. Next.js renders this when an uncaught
 * error occurs in a route segment. Must be a client component.
 *
 * @param {Object} props
 * @param {Error & { digest?: string }} props.error
 * @param {() => void} props.reset
 */
export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-accent">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        An unexpected error occurred
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Sorry about that. You can try again, and if the problem persists,
        please reach out.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <a href="/">Go home</a>
        </Button>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs text-muted-foreground">
          Error reference: {error.digest}
        </p>
      )}
    </div>
  );
}
