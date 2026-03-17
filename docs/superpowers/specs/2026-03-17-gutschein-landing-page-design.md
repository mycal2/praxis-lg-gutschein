# Gutschein Landing Page — Design Spec

## Overview

A single-page voucher landing page for Praxis Lebensgefühl, a holistic coaching practice in Kiel. Users fill in a form to receive a 10% discount voucher via email. The practice is notified via email and Telegram.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 with CI custom properties
- **Email:** Resend + React Email for HTML voucher template
- **Validation:** Zod
- **Deployment:** Railway via Docker (same pattern as julia-messer.de)
- **Font:** Nunito Sans (Google Fonts)

## Architecture

```
src/
├── app/
│   ├── page.tsx                 # Landing page with voucher form
│   ├── layout.tsx               # Root layout (fonts, metadata, OG tags)
│   ├── globals.css              # Tailwind + CI custom properties
│   └── api/
│       └── gutschein/
│           └── route.ts         # POST: validate → generate code → send emails + Telegram
├── components/
│   ├── GutscheinForm.tsx        # Client component — the form
│   ├── Header.tsx               # Logo + brand name
│   └── Footer.tsx               # Impressum/Datenschutz links, address
├── lib/
│   ├── email.ts                 # Resend integration
│   ├── telegram.ts              # Telegram bot notification
│   └── voucher-code.ts          # Code generation (LG-YYYY-XXXX)
└── emails/
    └── gutschein.tsx            # React Email template for the HTML voucher
```

### Key Decision: No Database

Vouchers are stateless — generated, emailed, done. No storage needed. The unique code serves as a reference for the practice to identify the voucher when the client contacts them. If verification/tracking is needed later, a database can be added then.

### Assets

- Logo SVGs in `ci-styleguide/assets/` (logo-mit-text.svg, logo-mit-text-dark.svg, knoten.svg)
- Copy knoten.svg to `public/` for email embedding
- CI custom properties defined in `ci-styleguide/index.html` — extract into `globals.css`

## Landing Page Structure

Top to bottom:

1. **Header** — Dark bar with knoten icon + "Praxis Lebensgefühl" text
2. **Hero** — Dark gradient background, large knoten symbol, "GUTSCHEIN" heading, subtitle "Schenken Sie ein neues Lebensgefühl"
3. **Intro** — Short centered paragraph explaining the 10% voucher offer
4. **Form Card** — White card with subtle shadow containing all form fields
5. **Footer** — Sand-colored bar with address, Impressum + Datenschutz links

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Vorname | text | yes | min 2 chars |
| Nachname | text | yes | min 2 chars |
| E-Mail | email | yes | valid email format |
| Telefon | tel | no | optional, min 6 digits if provided |
| Bevorzugte/r Therapeut/in | checkbox group | yes (min 1) | Julia, Nina, Tatjana |
| Persönliche Nachricht | textarea | no | max 500 chars |
| Datenschutz | checkbox | yes | must be checked |

### Practitioner Selection

Pill-shaped toggle buttons (not standard checkboxes). Selected state: teal border + light teal background + checkmark. Multiple selection allowed.

## Form Submission Flow

1. **Client-side:** Zod validation, show inline errors, disable button + show spinner during submit
2. **POST `/api/gutschein`:**
   - Server-side Zod validation
   - Generate code: `LG-YYYY-XXXX` (year + 6 random alphanumeric uppercase chars — ~2B combinations, collisions negligible without DB)
   - Calculate expiry: current date + 3 months
   - Send voucher email to user (Resend + React Email template) — **this is the critical step; if it fails, return error**
   - Send notification email + Telegram — **fire-and-forget** (failures logged but don't block the user response)
   - Return success response
3. **Success state:** Replace form with animated check icon + "Ihr Gutschein wurde an [email] gesendet!" + "Prüfen Sie auch Ihren Spam-Ordner." User can click "Weiteren Gutschein anfordern" to reset the form.

### Error Handling

- **Resend failure:** Return 500 to user with "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
- **Telegram failure:** Log error, don't affect user experience
- **Validation failure:** Return 400 with field-specific errors

### Spam Protection

- **Honeypot field:** Hidden input that bots fill in but humans don't — reject if filled
- **Rate limiting:** In-memory store, max 5 requests per IP per hour (resets on deploy — acceptable for this scale)
- **Origin check:** Validate `Origin` / `Referer` header matches the site domain

## Voucher Email Design

HTML email sent to the user containing:

- **Header:** Dark background with knoten icon + "Praxis Lebensgefühl"
- **Discount:** Large "10%" in teal, "Rabatt auf eine Sitzung" subtitle
- **Details table:** Name, preferred practitioner(s), expiry date
- **Code box:** Sand background with monospace code (e.g. LG-2026-A7X3)
- **Personal message:** (if provided) Teal left-border quote block
- **Redemption info:** "Nennen Sie Ihren Code bei der Terminvereinbarung" + contact info
- **Footer:** Dark background with practice address + website

Built with React Email for reliable cross-client rendering.

## Notification Email

Plain-text-style email to practice staff containing:
- Name, email, phone (if provided)
- Preferred practitioner(s)
- Personal message (if provided)
- Generated voucher code
- Expiry date

## Telegram Notification

Message format:
```
🎫 Neuer Gutschein angefordert!

Name: Julia Muster
E-Mail: julia@beispiel.de
Tel: 0431 123 456
Therapeut/in: Julia
Code: LG-2026-A7X3
Gültig bis: 17.06.2026
```

## CI / Branding

All design follows the CI styleguide at `ci-styleguide/index.html`:

- **Primary color:** #74B4AF (teal)
- **Dark:** #2C2C2C
- **Sand:** #F5F0EB
- **Font:** Nunito Sans (300, 400, 500, 600, 700)
- **Buttons:** Pill shape (border-radius: 9999px), teal primary
- **Inputs:** 8px radius, teal focus glow
- **Cards:** 16px radius, subtle shadow

## Email Configuration

- **From:** `Praxis Lebensgefühl <noreply@praxis-lebensgefuehl.com>` (requires Resend domain verification)
- **Voucher email subject:** "Ihr Gutschein — Praxis Lebensgefühl"
- **Notification email subject:** "Neuer Gutschein: [Vorname Nachname]"
- **Date format:** German written form — "17. Juni 2026"

## Environment Variables

```
RESEND_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NOTIFICATION_EMAILS=julia@breathwork-kiel.com,michael.mollath@gmail.com
```

## Pages Required

- `/` — Landing page (the voucher form)
- `/impressum` — Legal notice (static page, content scraped from praxis-lebensgefuehl.com/impressum)
- `/datenschutz` — Privacy policy (static page, content scraped from praxis-lebensgefuehl.com/datenschutz)

## Out of Scope

- Payment integration (lead-gen only)
- User accounts / authentication
- Database / voucher storage
- CMS functionality (planned for later phase)
- Multi-language support
