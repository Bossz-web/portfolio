"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Case-study modal. Renders the full detail for a selected project, including
 * the challenge/solution/results narrative. Closes on backdrop click or Escape.
 *
 * @param {Object} props
 * @param {import('@/types').Project | null} props.project
 * @param {() => void} props.onClose
 */
export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    /** @param {KeyboardEvent} e */
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/9] bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {project.year}
                </span>
              </div>

              {project.overview && (
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {project.overview}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="accent">
                    {tech}
                  </Badge>
                ))}
              </div>

              {project.caseStudy && (
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                      The Challenge
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {project.caseStudy.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                      The Solution
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {project.caseStudy.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                      Results
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {project.caseStudy.results.map((result) => (
                        <li
                          key={result}
                          className="flex items-start gap-2 leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live site
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="outline">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      View code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
