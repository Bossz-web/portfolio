import { Button } from "@/components/ui/button";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Page not found",
};

/**
 * Custom 404 page.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-6xl font-semibold tracking-tight text-accent sm:text-7xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
        This page wandered off
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <a href="/">Back to home</a>
      </Button>
    </div>
  );
}
