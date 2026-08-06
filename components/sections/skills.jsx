"use client";

import { skillCategories } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function Skills() {
  return (
    <section id="skills" className="section bg-muted/40 border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Tools and technologies I reach for"
          description="A focused toolkit built around the modern front-end. Grouped by where they fit in the workflow."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <RevealItem key={category.name}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.name}
                    </h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="cursor-default rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:border-accent/50 hover:bg-accent-subtle hover:text-accent"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
