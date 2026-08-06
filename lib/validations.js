import { z } from "zod";

/**
 * Contact form validation schema. Shared between the client form (React Hook
 * Form resolver) and the server API route, so validation rules live in one
 * place and the two can never drift apart.
 *
 * `honeypot` is a hidden field: real users leave it empty, bots tend to fill
 * it. The API route rejects any submission where it's non-empty.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name seems too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Your message should be at least 10 characters.")
    .max(2000, "Your message is a little too long."),
  /** Anti-spam honeypot — must stay empty. */
  honeypot: z.string().max(0).optional(),
});

/**
 * Shape of a validated contact submission.
 *
 * @typedef {z.infer<typeof contactSchema>} ContactFormValues
 */
