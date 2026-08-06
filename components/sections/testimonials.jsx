"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/content";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (testimonials.length === 0) return null;

  /** @param {number} dir */
  const paginate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Kind words from teammates and clients I've collaborated with."
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-2xl">
          <Quote className="mx-auto h-10 w-10 text-accent/30" aria-hidden />

          <div className="relative mt-4 min-h-[220px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < current.rating
                          ? "h-4 w-4 fill-accent text-accent"
                          : "h-4 w-4 text-border"
                      }
                    />
                  ))}
                </div>

                <p className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border bg-muted">
                    <Image
                      src={current.avatar}
                      alt={current.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      {current.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {current.role}, {current.company}
                    </p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={
                      i === index
                        ? "h-2 w-6 rounded-full bg-accent transition-all"
                        : "h-2 w-2 rounded-full bg-border transition-all hover:bg-accent/50"
                    }
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
