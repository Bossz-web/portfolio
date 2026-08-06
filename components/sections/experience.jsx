"use client";

import { Briefcase } from "lucide-react";
import { experience } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section id="experience" className="section border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've made an impact"
          description="Roles that shaped how I build — from client work to owning a product's front-end platform."
        />

        <div className="mt-14 max-w-3xl">
          <ol className="relative border-l border-border">
            {experience.map((item, index) => (
              <li key={`${item.company}-${index}`} className="mb-12 ml-8 last:mb-0">
                {/* Timeline node */}
                <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card">
                  <Briefcase className="h-3 w-3 text-accent" />
                </span>

                <Reveal>
                  <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {item.role}
                        </h3>
                        <p className="text-accent">{item.company}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{item.duration}</p>
                        {item.location && <p>{item.location}</p>}
                      </div>
                    </div>

                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                          {resp}
                        </li>
                      ))}
                    </ul>

                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mt-4 rounded-xl bg-accent-subtle/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                          Key achievements
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {item.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="text-sm leading-relaxed text-foreground/80"
                            >
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
