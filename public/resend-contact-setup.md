# Wiring a Resend contact form into a new Next.js (App Router) project

A complete, follow-along guide to reproduce the contact-email flow from the
portfolio in a brand-new project, using a **new Resend account**. Everything
below is the same architecture: browser form → your own API route → Resend,
with server-side validation, a honeypot, and graceful failure.

---

## 0. The mental model (read this first)

The API key is a **secret**. It must never appear in client-side code, in the
git repo, or in the browser network tab. That is the single reason this needs a
server route (`app/api/contact/route.js`) instead of calling Resend from a
React component: the route runs on the server, so the key stays there.

The flow, end to end:

```
Contact form (client)
   │  POST /api/contact  { name, email, message, honeypot }
   ▼
Route handler (server)
   ├─ re-validate with Zod          (never trust the client)
   ├─ check honeypot                (silently drop bots)
   ├─ read RESEND_API_KEY from env  (secret stays server-side)
   └─ resend.emails.send(...)       (from = you, replyTo = visitor)
   ▼
Your inbox
```

---

## 1. Create the new Resend account and API key

1. Sign up at https://resend.com with the account you want this project billed to.
2. Go to **API Keys → Create API Key**.
3. Give it a project-specific name (e.g. `newproject-contact`) so you can revoke
   it later without touching anything else.
4. Set permission to **Sending access** only — it never needs full access.
5. Copy the key now (`re_...`). Resend shows it **once**. Paste it straight into
   `.env.local` (step 4) — never into a file that git tracks.

> One API key per project. Sharing a key across projects means revoking it
> breaks all of them at once.

---

## 2. Verify a sending domain (DNS)

You can skip this to test — Resend's shared sender `onboarding@resend.dev` works
with just the key, but it can **only deliver to your own account email** and is
rate-limited. For a real public form you must verify a domain.

In Resend: **Domains → Add Domain**, enter your domain (or a subdomain like
`mail.yourdomain.dev`). Resend generates the exact records — add them at your DNS
provider (Cloudflare, Namecheap, etc.). You'll add three kinds:

| Record | Purpose | Typical value |
|--------|---------|---------------|
| **SPF** (TXT) + **MX** | Authorizes Resend's SES servers to send as you, and handles bounces | `v=spf1 include:amazonses.com ~all` on a `send.` subdomain |
| **DKIM** (TXT) | Public key; Resend signs each message so receivers can prove it wasn't forged | at `resend._domainkey` |
| **DMARC** (TXT) | Policy for what to do when SPF/DKIM fail, plus where to send reports | at `_dmarc`, e.g. `v=DMARC1; p=none;` |

Then: back in Resend, click **Verify**. DNS can take minutes to hours to
propagate. Once it's green, you can send from any address at that domain.

> Start DMARC at `p=none` (monitor only). Tighten to `quarantine` or `reject`
> later, once you've confirmed legitimate mail is passing.

---

## 3. Install the packages

```bash
npm install resend zod
# if you want the same client form as the portfolio:
npm install react-hook-form @hookform/resolvers
```

---

## 4. Environment variables

Create **`.env.local`** in the project root (it's gitignored by default in
Next.js — confirm it's in `.gitignore`):

```bash
RESEND_API_KEY=re_your_new_key_here
CONTACT_TO_EMAIL=you@yourdomain.dev          # where messages land
CONTACT_FROM=Website <hi@yourdomain.dev>     # must be on a VERIFIED domain
```

Also create **`.env.example`** — committed, but with **no real values** — so the
next person knows which vars exist:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM=
```

Until your domain is verified, you can leave `CONTACT_FROM` unset — the route
falls back to `onboarding@resend.dev`.

---

## 5. The shared validation schema

Create **`lib/validations.js`**. Using the same schema on client and server
means one source of truth for what "valid" is.

```js
import { z } from "zod";

/** Contact form payload. Shared by the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(100),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "A little more detail, please.").max(5000),
  // Honeypot: real users leave this empty; bots fill it in.
  honeypot: z.string().optional(),
});
```

---

## 6. The API route

Create **`app/api/contact/route.js`**. This is the portfolio handler, adapted —
it validates, checks the honeypot, degrades gracefully if the key is missing,
and maps failures to sensible status codes.

```js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

/**
 * Contact form handler.
 *
 * Required env vars:
 *   RESEND_API_KEY   — your Resend API key
 *   CONTACT_TO_EMAIL — where messages are delivered
 *   CONTACT_FROM     — a verified Resend sender, e.g. "Website <hi@domain.dev>"
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

  // Re-validate server-side — never trust the client.
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
    console.warn("[contact] RESEND_API_KEY is not set. Message not sent:", {
      name,
      email,
    });
    return NextResponse.json(
      { error: "Email service isn't configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM || "Website <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // reply goes to the visitor; the mail is SENT as you
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
```

**Why `from` is you and `replyTo` is the visitor:** the message is *sent* from
your verified domain, so it passes SPF/DKIM and lands in the inbox. Setting
`from` to the visitor's address would fail authentication and look like
spoofing. `replyTo` means hitting "Reply" still goes to them.

---

## 7. The client form

Create **`components/contact-form.jsx`**. Minimal but complete: RHF + the shared
schema, a visually-hidden honeypot, and states for sending/sent/error.

```jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values) => {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send.");
      }
      setStatus("sent");
      reset();
    } catch (err) {
      setServerError(err.message);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <p role="status">Thanks — your message is on its way.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="name">Name</label>
      <input id="name" {...register("name")} aria-invalid={!!errors.name} />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="message">Message</label>
      <textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
      {errors.message && <p>{errors.message.message}</p>}

      {/* Honeypot — hidden from real users, tempting to bots.
          Do NOT use display:none if you want some bots to still see it;
          off-screen positioning is the usual compromise. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && <p role="alert">{serverError}</p>}
    </form>
  );
}
```

Drop `<ContactForm />` into any page.

---

## 8. Test locally

```bash
npm run dev
```

- **Before adding the key:** the form submits and you get a clean `503` "not
  configured" message — proving the flow works before credentials exist.
- **With the key, domain unverified:** set only `RESEND_API_KEY`, leave
  `CONTACT_FROM` unset. Resend sends from `onboarding@resend.dev` but **only to
  your own account email** — set `CONTACT_TO_EMAIL` to that address to see it
  arrive.
- **With the key + verified domain:** set `CONTACT_FROM` to your domain address.
  Mail now delivers to any recipient.

Check the Resend dashboard's **Logs** tab to see each send, its status, and any
bounce.

---

## 9. Deploy to Vercel

1. Push the project to GitHub (confirm `.env.local` is gitignored — it should
   never be in a commit).
2. In the Vercel project: **Settings → Environment Variables**, add
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM` for the Production (and
   Preview) environments.
3. Redeploy so the new vars are picked up.

---

## 10. Before you call it done

- **Rate-limit the route.** It's a public POST that sends email; the honeypot
  stops naive bots, not a deliberate flood. The standard pairing on Vercel is
  **Upstash Redis** with `@upstash/ratelimit`, keyed on the caller's IP
  (`request.headers.get("x-forwarded-for")`). Return `429` when the limit trips.
- **Never commit the key.** If a key ever lands in git history, treat it as
  burned: revoke it in the Resend dashboard and issue a new one. Rotating the
  visible value isn't enough — git history keeps the old one.
- **Keep `.env.example` value-free.** It documents the *names* of the vars, not
  the secrets.
- **Add a Reply-To display name** if you want replies to show the visitor's name
  nicely: `replyTo: \`${name} <${email}>\``.

---

## Quick checklist

- [ ] New Resend account + sending-only API key
- [ ] Domain added and SPF / DKIM / DMARC verified (or using `resend.dev` for now)
- [ ] `resend` + `zod` (+ `react-hook-form`) installed
- [ ] `.env.local` filled, `.env.example` committed empty
- [ ] `lib/validations.js`, `app/api/contact/route.js`, `components/contact-form.jsx`
- [ ] Tested: 503 without key → send with key → delivered
- [ ] Env vars set in Vercel, redeployed
- [ ] Rate limiting added for production
