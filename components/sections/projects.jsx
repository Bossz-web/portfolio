"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { projects } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectModal } from "@/components/sections/project-modal";

export function Projects() {
  /** @type {[import('@/types').Project | null, (p: import('@/types').Project | null) => void]} */
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique technologies from all projects
  const allTech = useMemo(() => {
    /** @type {Set<string>} */
    const techSet = new Set();
    projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return ["All", ...Array.from(techSet).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <section id="projects" className="section bg-muted/40">
        <div className="container">
          <SectionHeading
            eyebrow="Projects"
            title="Recent work and case studies"
            description="A selection of projects I've built, the challenges they solved, and the impact they delivered."
          />

          {/* Filter bar */}
          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Filter:
              </span>
              {allTech.map((tech) => {
                const isActive = tech === activeFilter;
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setActiveFilter(tech)}
                    className="inline-block"
                  >
                    <Badge
                      variant={isActive ? "accent" : "default"}
                      className="cursor-pointer transition-all duration-200 hover:scale-105"
                    >
                      {tech}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <div
              key={activeFilter}
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onOpen={setSelectedProject}
                />
              ))}
            </div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <Reveal className="mt-12 text-center">
              <p className="text-muted-foreground">
                No projects match that filter. Try another one.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
