"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { personalInfo, socialLinks } from "@/content";
import { contactSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/ui/copy-email";
import { Reveal } from "@/components/ui/reveal";

/** @typedef {"idle" | "submitting" | "success" | "error"} Status */

export function Contact() {
  /** @type {[Status, (s: Status) => void]} */
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  /** @param {import('@/lib/validations').ContactFormValues} values */
  const onSubmit = async (values) => {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  /** @param {boolean} hasError */
  const fieldClass = (hasError) =>
    cn(
      "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring",
      hasError ? "border-red-400/60" : "border-input",
    );

  return (
    <section id="contact" className="section border-t border-border">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left: invitation + direct contact */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something"
              description="Have a project in mind, a role to fill, or just want to say hi? I'd love to hear from you."
            />

            <Reveal delay={0.15} className="mt-8">
              <p className="text-sm font-medium text-muted-foreground">
                Prefer email? Reach me directly:
              </p>
              <CopyEmail email={personalInfo.email} className="mt-3" />
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <ul className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Right: form / success state */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[360px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-subtle text-accent"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.span>
                    <h3 className="mt-6 text-xl font-semibold text-foreground">
                      Message sent!
                    </h3>
                    <p className="mt-2 max-w-sm text-muted-foreground">
                      Thanks for reaching out. I&apos;ll get back to you as soon
                      as I can.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setStatus("idle")}
                    >
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Honeypot — visually hidden, off the a11y tree */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                      {...register("honeypot")}
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Jane Doe"
                          className={fieldClass(!!errors.name)}
                          aria-invalid={!!errors.name}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="jane@company.com"
                          className={fieldClass(!!errors.email)}
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell me about your project…"
                        className={cn(fieldClass(!!errors.message), "resize-none")}
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {status === "error" && serverError && (
                      <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500">
                        {serverError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
