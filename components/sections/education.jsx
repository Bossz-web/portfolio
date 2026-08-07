"use client";

import { GraduationCap, Award, BookOpen, Rocket } from "lucide-react";
import { education } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Maps each credential type to its icon.
 *
 * @type {Record<import('@/types').CredentialType, typeof GraduationCap>}
 */
const iconByType = {
  degree: GraduationCap,
  bootcamp: Rocket,
  certificate: Award,
  course: BookOpen,
};

export function Education() {
  return (
    <section id="education" className="section bg-muted/40 border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title="Learning that got me here"
          description="Formal study and the continuous learning that keeps my craft current."
        />

        <RevealGroup className="mt-14 grid max-w-3xl gap-4">
          {education.map((item, index) => {
            const Icon = iconByType[item.type];
            return (
              <RevealItem key={`${item.institution}-${index}`}>
                <div className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-soft">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-semibold text-foreground">
                        {item.qualification}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-accent">{item.institution}</p>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
