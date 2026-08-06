"use client";

import Image from "next/image";
import { personalInfo, strengths } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" className="section border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="A bit about who I am and how I work"
          description={personalInfo.bio}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Portrait */}
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-card">
              <Image
                src={personalInfo.aboutImage}
                alt={`${personalInfo.name} at work`}
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Story + strengths */}
          <div>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {personalInfo.story.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05} as="div">
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
              {strengths.map((strength) => {
                const Icon = strength.icon;
                return (
                  <RevealItem key={strength.title}>
                    <div className="group h-full rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent transition-transform duration-200 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-semibold text-foreground">
                        {strength.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {strength.description}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
