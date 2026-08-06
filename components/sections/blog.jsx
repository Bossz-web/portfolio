"use client";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";

/**
 * Format an ISO date as e.g. "Jul 18, 2026".
 *
 * @param {string} iso
 * @returns {string}
 */
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Blog() {
  if (blogPosts.length === 0) return null;

  return (
    <section id="blog" className="section bg-muted/40 border-t border-border">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Writing"
            title="From the blog"
            description="I write about modern CSS, UI patterns, and front-end craft. Here are a few recent pieces."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <a
                href="https://yourblog.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit blog
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <RevealItem key={post.url}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{post.tag}</Badge>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime}
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
