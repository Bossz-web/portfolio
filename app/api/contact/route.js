import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";
import { personalInfo } from "@/content";

/**
 * Contact form handler.
 *
 * Validates the payload with the shared Zod schema, checks the honeypot, then
 * sends an email via Resend. If RESEND_API_KEY is not configured, it responds
 * with a clear message instead of crashing — so the form works end-to-end in
 * development before you add credentials.
 *
 * Required env vars (see .env.example):
 *   RESEND_API_KEY   — your Resend API key
 *   CONTACT_TO_EMAIL — where messages are delivered (defaults to your email)
 *   CONTACT_FROM     — a verified Resend sender, e.g. "Portfolio <hi@yourdomain.dev>"
 *
 * @param {Request} request
 */
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const { name, email, message, honeypot } = parsed.data;

  // Silently accept honeypot hits so bots don't learn they were caught.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — log for local dev and return a helpful error.
    console.warn(
      "[contact] RESEND_API_KEY is not set. Message received but not sent:",
      { name, email },
    );
    return NextResponse.json(
      {
        error:
          "Email service isn't configured yet. Add RESEND_API_KEY to enable sending.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || personalInfo.email;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
