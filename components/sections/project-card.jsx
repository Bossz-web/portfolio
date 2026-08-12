"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Github } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

/**
 * A single project card.
 *
 * If the project has a `liveUrl`, the cover + title link out to the live site
 * in a new tab, and a footer "Case study" button opens the detailed write-up.
 * If there's no `liveUrl` (e.g. the fintech app), the cover + title open the
 * case study directly, since there's nowhere else to send the visitor.
 *
 * @param {Object} props
 * @param {import('@/types').Project} props.project
 * @param {(project: import('@/types').Project) => void} props.onOpen
 */
export function ProjectCard({ project, onOpen }) {
  const hasLive = Boolean(project.liveUrl);

  const cover = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute left-3 top-3">
            <Badge variant="accent">Featured</Badge>
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
          {project.title}
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>
    </>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated"
    >
      {/* Cover + body: opens the live site in a new tab when there is one,
          otherwise opens the case study. */}
      {hasLive ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Open the live ${project.title} site in a new tab`}
        >
          {cover}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View case study for ${project.title}`}
        >
          {cover}
        </button>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 px-6 pb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-border px-6 py-3">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <FileText className="h-3.5 w-3.5" />
          Case study
        </button>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            Live site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        )}
      </div>
    </motion.article>
  );
}
