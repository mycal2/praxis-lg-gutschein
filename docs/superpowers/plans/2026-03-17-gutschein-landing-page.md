# Gutschein Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page voucher landing page where users request a 10% discount voucher and receive it via email.

**Architecture:** Next.js App Router with a single page (`/`), one API route (`/api/gutschein`), and React Email for the HTML voucher template. No database — voucher codes are generated and emailed statelessly. Notifications go to email + Telegram.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Resend, React Email, Zod 4, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-17-gutschein-landing-page-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout — Nunito Sans font, metadata, OG tags |
| `src/app/globals.css` | Tailwind v4 imports + CI custom properties |
| `src/app/page.tsx` | Landing page — assembles Header, Hero, Form, Footer |
| `src/app/api/gutschein/route.ts` | POST handler — validate, generate code, send email + Telegram |
| `src/app/impressum/page.tsx` | Static Impressum page |
| `src/app/datenschutz/page.tsx` | Static Datenschutz page |
| `src/components/Header.tsx` | Dark nav bar with knoten + brand name |
| `src/components/Footer.tsx` | Sand footer with address + legal links |
| `src/components/GutscheinForm.tsx` | Client component — form with validation + submission |
| `src/lib/voucher-code.ts` | Generates `LG-YYYY-XXXXXX` codes |
| `src/lib/telegram.ts` | Sends Telegram notifications |
| `src/lib/email.ts` | Sends emails via Resend |
| `src/lib/validation.ts` | Shared Zod schema for form data |
| `src/lib/rate-limit.ts` | In-memory IP rate limiter |
| `src/emails/gutschein.tsx` | React Email template — the HTML voucher |
| `src/emails/notification.tsx` | React Email template — staff notification |
| `public/knoten.svg` | Knoten icon for emails |
| `Dockerfile` | Multi-stage Railway deployment |
| `.dockerignore` | Exclude node_modules, .env, .git from Docker context |
| `vitest.config.ts` | Test runner config with path aliases |
| `.env.local` | Local env vars (not committed) |

---

## Chunk 1: Project Setup & Utilities

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --skip-install --skip-git
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install resend @react-email/components react-email zod
npm install -D vitest
```

- [ ] **Step 3: Configure next.config.ts**

Set `output: "standalone"` and `images.unoptimized: true` for Railway deployment:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Set up globals.css with CI custom properties**

Replace contents of `src/app/globals.css` with Tailwind v4 imports and all CI design tokens from `ci-styleguide/index.html`:

```css
@import "tailwindcss";

@theme {
  --color-teal: #74B4AF;
  --color-teal-light: #A3CFC9;
  --color-teal-dark: #5A9A94;
  --color-dark: #2C2C2C;
  --color-gray-700: #4A4A4A;
  --color-gray-500: #7A7A7A;
  --color-gray-300: #B8B8B8;
  --color-gray-100: #F0F0F0;
  --color-warm-sand: #F5F0EB;
  --color-warm-beige: #E8DDD3;
  --color-error: #C25B56;
  --color-warning: #D4A853;
  --font-sans: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

- [ ] **Step 5: Set up layout.tsx with Nunito Sans**

```typescript
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Gutschein — Praxis Lebensgefühl",
  description: "Verschenken Sie 10% Rabatt auf eine Sitzung bei Praxis Lebensgefühl in Kiel.",
  openGraph: {
    title: "Gutschein — Praxis Lebensgefühl",
    description: "Verschenken Sie 10% Rabatt auf eine Sitzung bei Praxis Lebensgefühl in Kiel.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder page.tsx**

```typescript
export default function Home() {
  return <div>Gutschein — coming soon</div>;
}
```

- [ ] **Step 7: Copy knoten.svg to public/**

Run:
```bash
cp ci-styleguide/assets/knoten.svg public/knoten.svg
```

- [ ] **Step 8: Create vitest.config.ts**

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 9: Create .env.local**

```
RESEND_API_KEY=re_placeholder
TELEGRAM_BOT_TOKEN=<your-token>
TELEGRAM_CHAT_ID=<your-chat-id>
NOTIFICATION_EMAILS=julia@breathwork-kiel.com,michael.mollath@gmail.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Note: Fill in real Telegram credentials from memory/env. Never commit this file.

- [ ] **Step 10: Verify .env.local is in .gitignore**

Run: `grep -q '.env' .gitignore && echo "OK" || echo ".env* >> .gitignore"`

Ensure `.env*` appears in `.gitignore` (create-next-app should add it, but verify).

- [ ] **Step 11: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts on localhost:3000, placeholder page renders.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json vitest.config.ts src/ public/knoten.svg
git commit -m "feat: initialize Next.js project with Tailwind and CI tokens"
```

---

### Task 2: Voucher code generator

**Files:**
- Create: `src/lib/voucher-code.ts`
- Test: `src/lib/__tests__/voucher-code.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/__tests__/voucher-code.test.ts
import { describe, it, expect } from "vitest";
import { generateVoucherCode } from "../voucher-code";

describe("generateVoucherCode", () => {
  it("returns code in format LG-YYYY-XXXXXX", () => {
    const code = generateVoucherCode();
    expect(code).toMatch(/^LG-\d{4}-[A-Z0-9]{6}$/);
  });

  it("includes current year", () => {
    const code = generateVoucherCode();
    const year = new Date().getFullYear().toString();
    expect(code).toContain(year);
  });

  it("generates different codes on successive calls", () => {
    const codes = new Set(Array.from({ length: 100 }, () => generateVoucherCode()));
    expect(codes.size).toBe(100);
  });
});
```

- [ ] **Step 2: Install vitest and run test to verify it fails**

Run:
```bash
npm install -D vitest
npx vitest run src/lib/__tests__/voucher-code.test.ts
```
Expected: FAIL — module not found

- [ ] **Step 3: Implement voucher-code.ts**

```typescript
// src/lib/voucher-code.ts
import { randomBytes } from "crypto";

export function generateVoucherCode(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
  const random = Array.from(randomBytes(6), (b) => chars[b % chars.length]).join("");
  return `LG-${year}-${random}`;
}

export function calculateExpiry(): Date {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 3);
  return expiry;
}

export function formatDateGerman(date: Date): string {
  return date.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/lib/__tests__/voucher-code.test.ts`
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/voucher-code.ts src/lib/__tests__/voucher-code.test.ts
git commit -m "feat: add voucher code generator with tests"
```

---

### Task 3: Validation schema

**Files:**
- Create: `src/lib/validation.ts`
- Test: `src/lib/__tests__/validation.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/__tests__/validation.test.ts
import { describe, it, expect } from "vitest";
import { gutscheinSchema } from "../validation";

describe("gutscheinSchema", () => {
  const validData = {
    firstName: "Julia",
    lastName: "Muster",
    email: "julia@beispiel.de",
    phone: "",
    practitioners: ["julia"],
    message: "",
    privacy: true,
    honeypot: "",
  };

  it("accepts valid data", () => {
    const result = gutscheinSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects missing first name", () => {
    const result = gutscheinSchema.safeParse({ ...validData, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = gutscheinSchema.safeParse({ ...validData, email: "not-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty practitioners", () => {
    const result = gutscheinSchema.safeParse({ ...validData, practitioners: [] });
    expect(result.success).toBe(false);
  });

  it("rejects unchecked privacy", () => {
    const result = gutscheinSchema.safeParse({ ...validData, privacy: false });
    expect(result.success).toBe(false);
  });

  it("rejects filled honeypot", () => {
    const result = gutscheinSchema.safeParse({ ...validData, honeypot: "bot-value" });
    expect(result.success).toBe(false);
  });

  it("accepts optional phone", () => {
    const result = gutscheinSchema.safeParse({ ...validData, phone: "0431 123456" });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/validation.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement validation.ts**

```typescript
// src/lib/validation.ts
import { z } from "zod";

export const practitioners = ["julia", "nina", "tatjana"] as const;
export type Practitioner = (typeof practitioners)[number];

export const practitionerNames: Record<Practitioner, string> = {
  julia: "Julia Messer-Blohm",
  nina: "Nina Bartoli",
  tatjana: "Tatjana Müller",
};

export const gutscheinSchema = z.object({
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().refine((val) => !val || val.replace(/\D/g, "").length >= 6, {
    message: "Bitte geben Sie eine gültige Telefonnummer ein",
  }).optional().default(""),
  practitioners: z
    .array(z.enum(practitioners))
    .min(1, "Bitte wählen Sie mindestens eine/n Therapeut/in"),
  message: z.string().max(500, "Maximal 500 Zeichen").optional().default(""),
  privacy: z.literal(true, { errorMap: () => ({ message: "Bitte stimmen Sie der Datenschutzerklärung zu" }) }),
  honeypot: z.string().max(0, "Invalid submission"),
});

export type GutscheinFormData = z.infer<typeof gutscheinSchema>;
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/lib/__tests__/validation.test.ts`
Expected: 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts src/lib/__tests__/validation.test.ts
git commit -m "feat: add Zod validation schema with tests"
```

---

### Task 4: Telegram notification

**Files:**
- Create: `src/lib/telegram.ts`
- Test: `src/lib/__tests__/telegram.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/__tests__/telegram.test.ts
import { describe, it, expect } from "vitest";
import { formatTelegramMessage } from "../telegram";

describe("formatTelegramMessage", () => {
  it("formats message correctly", () => {
    const msg = formatTelegramMessage({
      name: "Julia Muster",
      email: "julia@beispiel.de",
      phone: "0431 123 456",
      practitioners: ["Julia Messer-Blohm"],
      code: "LG-2026-A7X3BC",
      expiry: "17. Juni 2026",
    });
    expect(msg).toContain("Julia Muster");
    expect(msg).toContain("julia@beispiel.de");
    expect(msg).toContain("0431 123 456");
    expect(msg).toContain("Julia Messer-Blohm");
    expect(msg).toContain("LG-2026-A7X3BC");
    expect(msg).toContain("17. Juni 2026");
  });

  it("omits phone when empty", () => {
    const msg = formatTelegramMessage({
      name: "Julia Muster",
      email: "julia@beispiel.de",
      phone: "",
      practitioners: ["Julia Messer-Blohm"],
      code: "LG-2026-A7X3BC",
      expiry: "17. Juni 2026",
    });
    expect(msg).not.toContain("Tel:");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/telegram.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement telegram.ts**

```typescript
// src/lib/telegram.ts
type TelegramMessageData = {
  name: string;
  email: string;
  phone: string;
  practitioners: string[];
  code: string;
  expiry: string;
};

export function formatTelegramMessage(data: TelegramMessageData): string {
  const lines = [
    "🎫 Neuer Gutschein angefordert!",
    "",
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
  ];
  if (data.phone) lines.push(`Tel: ${data.phone}`);
  lines.push(`Therapeut/in: ${data.practitioners.join(", ")}`);
  lines.push(`Code: ${data.code}`);
  lines.push(`Gültig bis: ${data.expiry}`);
  return lines.join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram not configured, skipping notification");
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/lib/__tests__/telegram.test.ts`
Expected: 2 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/telegram.ts src/lib/__tests__/telegram.test.ts
git commit -m "feat: add Telegram notification with tests"
```

---

### Task 5: Rate limiter

**Files:**
- Create: `src/lib/rate-limit.ts`
- Test: `src/lib/__tests__/rate-limit.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
// src/lib/__tests__/rate-limit.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { RateLimiter } from "../rate-limit";

describe("RateLimiter", () => {
  let limiter: RateLimiter;

  beforeEach(() => {
    limiter = new RateLimiter(3, 60_000); // 3 requests per minute for testing
  });

  it("allows requests under the limit", () => {
    expect(limiter.check("1.2.3.4")).toBe(true);
    expect(limiter.check("1.2.3.4")).toBe(true);
    expect(limiter.check("1.2.3.4")).toBe(true);
  });

  it("blocks requests over the limit", () => {
    limiter.check("1.2.3.4");
    limiter.check("1.2.3.4");
    limiter.check("1.2.3.4");
    expect(limiter.check("1.2.3.4")).toBe(false);
  });

  it("tracks IPs independently", () => {
    limiter.check("1.2.3.4");
    limiter.check("1.2.3.4");
    limiter.check("1.2.3.4");
    expect(limiter.check("5.6.7.8")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/rate-limit.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement rate-limit.ts**

```typescript
// src/lib/rate-limit.ts
type Entry = { count: number; resetAt: number };

export class RateLimiter {
  private store = new Map<string, Entry>();

  constructor(
    private maxRequests: number = 5,
    private windowMs: number = 60 * 60 * 1000, // 1 hour
  ) {}

  check(ip: string): boolean {
    const now = Date.now();
    const entry = this.store.get(ip);

    if (!entry || now > entry.resetAt) {
      this.store.set(ip, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (entry.count < this.maxRequests) {
      entry.count++;
      return true;
    }

    return false;
  }
}

export const gutscheinLimiter = new RateLimiter(5, 60 * 60 * 1000);
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/lib/__tests__/rate-limit.test.ts`
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/rate-limit.ts src/lib/__tests__/rate-limit.test.ts
git commit -m "feat: add in-memory rate limiter with tests"
```

---

## Chunk 2: Email Templates

### Task 6: Voucher email template (React Email)

**Files:**
- Create: `src/emails/gutschein.tsx`

- [ ] **Step 1: Create the voucher email template**

Build the HTML voucher email using React Email components. Match the mockup exactly: dark header with knoten, big "10%" in teal, details table, code in sand box, optional personal message, redemption info, dark footer.

```typescript
// src/emails/gutschein.tsx
import {
  Html, Head, Body, Container, Section, Row, Column,
  Text, Img, Hr,
} from "@react-email/components";

type GutscheinEmailProps = {
  firstName: string;
  lastName: string;
  practitioners: string[];
  code: string;
  expiryDate: string;
  message?: string;
};

export default function GutscheinEmail({
  firstName = "Julia",
  lastName = "Muster",
  practitioners = ["Julia Messer-Blohm"],
  code = "LG-2026-A7X3BC",
  expiryDate = "17. Juni 2026",
  message = "",
}: GutscheinEmailProps) {
  return (
    <Html lang="de">
      <Head />
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#F0F0F0", fontFamily: "'Nunito Sans', -apple-system, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#FFFFFF" }}>
          {/* Header */}
          <Section style={{ backgroundColor: "#2C2C2C", padding: "28px 32px", textAlign: "center" }}>
            <Img src={`${process.env.NEXT_PUBLIC_BASE_URL || "https://praxis-lg-gutschein.up.railway.app"}/knoten.svg`} width="48" height="48" alt="Praxis Lebensgefühl" style={{ margin: "0 auto 8px" }} />
            <Text style={{ fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>Praxis Lebensgefühl</Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "32px 32px", textAlign: "center" }}>
            <Text style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#5A9A94", margin: "0 0 8px 0" }}>Ihr Gutschein</Text>
            <Text style={{ fontSize: 52, fontWeight: 300, color: "#74B4AF", lineHeight: "1", margin: "12px 0 4px" }}>10%</Text>
            <Text style={{ fontSize: 16, fontWeight: 300, color: "#2C2C2C", margin: "0 0 20px" }}>Rabatt auf eine Sitzung</Text>

            <Hr style={{ borderColor: "#E8DDD3", width: 50, margin: "20px auto" }} />

            {/* Details */}
            <Section style={{ textAlign: "left" }}>
              <Row><Column style={{ width: 120, padding: "6px 0", color: "#7A7A7A", fontSize: 13 }}>Name</Column><Column style={{ padding: "6px 0", color: "#2C2C2C", fontSize: 13, fontWeight: 500 }}>{firstName} {lastName}</Column></Row>
              <Row><Column style={{ width: 120, padding: "6px 0", color: "#7A7A7A", fontSize: 13, borderTop: "1px solid #F0F0F0" }}>Therapeut/in</Column><Column style={{ padding: "6px 0", color: "#2C2C2C", fontSize: 13, fontWeight: 500, borderTop: "1px solid #F0F0F0" }}>{practitioners.join(", ")}</Column></Row>
              <Row><Column style={{ width: 120, padding: "6px 0", color: "#7A7A7A", fontSize: 13, borderTop: "1px solid #F0F0F0" }}>Gültig bis</Column><Column style={{ padding: "6px 0", color: "#2C2C2C", fontSize: 13, fontWeight: 500, borderTop: "1px solid #F0F0F0" }}>{expiryDate}</Column></Row>
            </Section>

            {/* Code box */}
            <Section style={{ backgroundColor: "#F5F0EB", borderRadius: 10, padding: "16px", margin: "20px 0", textAlign: "center" }}>
              <Text style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#7A7A7A", margin: "0 0 6px 0" }}>Gutschein-Code</Text>
              <Text style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: "#2C2C2C", letterSpacing: "0.15em", margin: 0 }}>{code}</Text>
            </Section>

            {/* Optional personal message */}
            {message && (
              <Section style={{ backgroundColor: "rgba(116,180,175,0.06)", borderLeft: "3px solid #74B4AF", borderRadius: "0 6px 6px 0", padding: "12px 16px", margin: "20px 0", textAlign: "left" }}>
                <Text style={{ fontSize: 11, fontWeight: 600, color: "#5A9A94", margin: "0 0 4px 0" }}>Persönliche Nachricht</Text>
                <Text style={{ fontSize: 13, color: "#4A4A4A", fontStyle: "italic", margin: 0 }}>„{message}"</Text>
              </Section>
            )}

            <Hr style={{ borderColor: "#E8DDD3", width: 50, margin: "20px auto" }} />

            <Text style={{ fontSize: 12, color: "#7A7A7A", lineHeight: "1.7", margin: 0 }}>
              Zur Einlösung nennen Sie Ihren Code bei der Terminvereinbarung.{"\n"}
              Kontakt: info@praxis-lebensgefuehl.com · 0431 - 301 499 42
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#2C2C2C", padding: "16px 32px", textAlign: "center" }}>
            <Text style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0 }}>Praxis Lebensgefühl · Holtenauer Str. 82 · 24105 Kiel · praxis-lebensgefuehl.com</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: Preview the email**

Run: `npx react-email dev --dir src/emails`
Expected: Opens browser preview at localhost:3001 showing the voucher email.

- [ ] **Step 3: Commit**

```bash
git add src/emails/gutschein.tsx
git commit -m "feat: add voucher email template with React Email"
```

---

### Task 7: Notification email template

**Files:**
- Create: `src/emails/notification.tsx`

- [ ] **Step 1: Create the notification email**

Simpler template for staff notifications — clean, informative, no fancy design.

```typescript
// src/emails/notification.tsx
import { Html, Head, Body, Container, Section, Text, Hr } from "@react-email/components";

type NotificationEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  practitioners: string[];
  message?: string;
  code: string;
  expiryDate: string;
};

export default function NotificationEmail({
  firstName = "Julia",
  lastName = "Muster",
  email = "julia@beispiel.de",
  phone = "",
  practitioners = ["Julia Messer-Blohm"],
  message = "",
  code = "LG-2026-A7X3BC",
  expiryDate = "17. Juni 2026",
}: NotificationEmailProps) {
  const labelStyle = { fontSize: 12, color: "#7A7A7A", margin: "0 0 2px 0" };
  const valueStyle = { fontSize: 14, color: "#2C2C2C", margin: "0 0 16px 0" };

  return (
    <Html lang="de">
      <Head />
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#F0F0F0", fontFamily: "'Nunito Sans', sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "0 auto", backgroundColor: "#FFFFFF", padding: "32px" }}>
          <Text style={{ fontSize: 18, fontWeight: 600, color: "#2C2C2C", margin: "0 0 4px 0" }}>🎫 Neuer Gutschein angefordert</Text>
          <Text style={{ fontSize: 13, color: "#7A7A7A", margin: "0 0 24px 0" }}>Code: {code}</Text>

          <Hr style={{ borderColor: "#F0F0F0" }} />

          <Text style={labelStyle}>Name</Text>
          <Text style={valueStyle}>{firstName} {lastName}</Text>

          <Text style={labelStyle}>E-Mail</Text>
          <Text style={valueStyle}>{email}</Text>

          {phone && (<><Text style={labelStyle}>Telefon</Text><Text style={valueStyle}>{phone}</Text></>)}

          <Text style={labelStyle}>Therapeut/in</Text>
          <Text style={valueStyle}>{practitioners.join(", ")}</Text>

          {message && (<><Text style={labelStyle}>Persönliche Nachricht</Text><Text style={valueStyle}>„{message}"</Text></>)}

          <Text style={labelStyle}>Gültig bis</Text>
          <Text style={valueStyle}>{expiryDate}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: Preview both emails**

Run: `npx react-email dev --dir src/emails`
Expected: Both templates visible in preview.

- [ ] **Step 3: Commit**

```bash
git add src/emails/notification.tsx
git commit -m "feat: add notification email template"
```

---

### Task 8: Email sending utility

**Files:**
- Create: `src/lib/email.ts`

- [ ] **Step 1: Implement email.ts**

```typescript
// src/lib/email.ts
import { Resend } from "resend";
import GutscheinEmail from "@/emails/gutschein";
import NotificationEmail from "@/emails/notification";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendVoucherEmailParams = {
  to: string;
  firstName: string;
  lastName: string;
  practitioners: string[];
  code: string;
  expiryDate: string;
  message?: string;
};

export async function sendVoucherEmail(params: SendVoucherEmailParams) {
  const { data, error } = await resend.emails.send({
    from: "Praxis Lebensgefühl <noreply@praxis-lebensgefuehl.com>",
    to: params.to,
    subject: "Ihr Gutschein — Praxis Lebensgefühl",
    react: GutscheinEmail({
      firstName: params.firstName,
      lastName: params.lastName,
      practitioners: params.practitioners,
      code: params.code,
      expiryDate: params.expiryDate,
      message: params.message,
    }),
  });

  if (error) throw new Error(`Failed to send voucher email: ${error.message}`);
  return data;
}

export async function sendNotificationEmail(params: SendVoucherEmailParams & { phone?: string }) {
  const notificationEmails = (process.env.NOTIFICATION_EMAILS || "").split(",").filter(Boolean);
  if (notificationEmails.length === 0) return;

  try {
    await resend.emails.send({
      from: "Praxis Lebensgefühl <noreply@praxis-lebensgefuehl.com>",
      to: notificationEmails,
      subject: `Neuer Gutschein: ${params.firstName} ${params.lastName}`,
      react: NotificationEmail({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.to,
        phone: params.phone,
        practitioners: params.practitioners,
        message: params.message,
        code: params.code,
        expiryDate: params.expiryDate,
      }),
    });
  } catch (error) {
    console.error("Notification email failed:", error);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: add Resend email sending utilities"
```

---

## Chunk 3: UI Components & API Route

### Task 9: Header and Footer components

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Footer.tsx`

- [ ] **Step 1: Create Header.tsx**

```typescript
// src/components/Header.tsx
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-dark px-6 py-4 flex items-center">
      <Image src="/knoten.svg" alt="" width={28} height={28} className="mr-3" />
      <span className="text-white text-xs font-light tracking-widest uppercase">
        Praxis Lebensgefühl
      </span>
    </header>
  );
}
```

- [ ] **Step 2: Create Footer.tsx**

```typescript
// src/components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-warm-sand border-t border-warm-beige px-6 py-5 text-center">
      <p className="text-xs text-gray-500">
        Praxis Lebensgefühl · Holtenauer Straße 82 · 24105 Kiel
      </p>
      <p className="text-xs mt-1">
        <Link href="/impressum" className="text-teal hover:text-teal-dark">Impressum</Link>
        {" · "}
        <Link href="/datenschutz" className="text-teal hover:text-teal-dark">Datenschutz</Link>
      </p>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx src/components/Footer.tsx
git commit -m "feat: add Header and Footer components"
```

---

### Task 10: GutscheinForm component

**Files:**
- Create: `src/components/GutscheinForm.tsx`

- [ ] **Step 1: Build the form component**

Client component with all form fields, Zod validation, submission handling, loading state, success state, and error display. Match the mockup: pill-shaped practitioner toggles, teal focus states, honeypot hidden field.

Key behaviors:
- `"use client"` directive
- Local state for form values, errors, loading, success
- Client-side Zod validation before fetch
- POST to `/api/gutschein`
- Show spinner on button during submit
- On success: show animated check + confirmation message + "Weiteren Gutschein anfordern" link
- On error: show banner message

The full component implementation should follow the mockup layout: name row (2 cols), email, phone, practitioners (pill toggles), message textarea, privacy checkbox, submit button.

- [ ] **Step 2: Verify it renders**

Update `src/app/page.tsx` temporarily to render only `<GutscheinForm />` and check it in the browser.

Run: `npm run dev` — verify form renders at localhost:3000

- [ ] **Step 3: Commit**

```bash
git add src/components/GutscheinForm.tsx
git commit -m "feat: add GutscheinForm component with validation and states"
```

---

### Task 11: Assemble landing page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build the full landing page**

Assemble all components: Header → Hero → Intro → Form → Footer. Match the mockup structure.

```typescript
// src/app/page.tsx
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GutscheinForm } from "@/components/GutscheinForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-dark to-[#3a3a3a] py-16 text-center">
        <Image src="/knoten.svg" alt="" width={72} height={72} className="mx-auto mb-5 opacity-85" />
        <h1 className="text-3xl md:text-4xl font-light text-white tracking-widest uppercase">
          Gutschein
        </h1>
        <p className="text-teal-light text-base font-light mt-2 tracking-wide">
          Schenken Sie ein neues Lebensgefühl
        </p>
      </section>

      {/* Intro */}
      <section className="px-6 py-8 text-center max-w-xl mx-auto">
        <p className="text-gray-700 leading-relaxed">
          Verschenken Sie <strong>10% Rabatt</strong> auf eine Sitzung bei einer unserer
          Therapeutinnen. Füllen Sie das Formular aus und Sie erhalten Ihren persönlichen
          Gutschein direkt per E-Mail.
        </p>
      </section>

      {/* Form */}
      <section className="px-6 pb-12 max-w-lg mx-auto w-full flex-1">
        <GutscheinForm />
      </section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify full page in browser**

Run: `npm run dev` — verify complete page matches the mockup at localhost:3000

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble landing page with all components"
```

---

### Task 12: API route

**Files:**
- Create: `src/app/api/gutschein/route.ts`

- [ ] **Step 1: Implement the POST handler**

```typescript
// src/app/api/gutschein/route.ts
import { NextRequest, NextResponse } from "next/server";
import { gutscheinSchema, practitionerNames } from "@/lib/validation";
import { generateVoucherCode, calculateExpiry, formatDateGerman } from "@/lib/voucher-code";
import { sendVoucherEmail, sendNotificationEmail } from "@/lib/email";
import { formatTelegramMessage, sendTelegramMessage } from "@/lib/telegram";
import { gutscheinLimiter } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Origin check
  const origin = request.headers.get("origin") || "";
  const host = request.headers.get("host") || "";
  if (origin && !origin.includes(host)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!gutscheinLimiter.check(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429 },
    );
  }

  // Parse & validate
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = gutscheinSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validierungsfehler", fields: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = result.data;
  const code = generateVoucherCode();
  const expiry = calculateExpiry();
  const expiryFormatted = formatDateGerman(expiry);
  const practitionerList = data.practitioners.map((p) => practitionerNames[p]);

  // Send voucher email (critical — must succeed)
  try {
    await sendVoucherEmail({
      to: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      practitioners: practitionerList,
      code,
      expiryDate: expiryFormatted,
      message: data.message || undefined,
    });
  } catch (error) {
    console.error("Voucher email failed:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }

  // Fire-and-forget: notification email + Telegram
  sendNotificationEmail({
    to: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    practitioners: practitionerList,
    code,
    expiryDate: expiryFormatted,
    message: data.message || undefined,
  });

  sendTelegramMessage(
    formatTelegramMessage({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone || "",
      practitioners: practitionerList,
      code,
      expiry: expiryFormatted,
    }),
  );

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Test manually with curl**

Run:
```bash
curl -X POST http://localhost:3000/api/gutschein \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"firstName":"Test","lastName":"User","email":"your-email@example.com","phone":"","practitioners":["julia"],"message":"Test","privacy":true,"honeypot":""}'
```

Expected: `{"success":true}` — check your email and Telegram for the voucher.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/gutschein/route.ts
git commit -m "feat: add API route for voucher generation and delivery"
```

---

## Chunk 4: Legal Pages & Deployment

### Task 13: Impressum and Datenschutz pages

**Files:**
- Create: `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx`

- [ ] **Step 1: Scrape content from existing website**

Fetch the Impressum and Datenschutz content from praxis-lebensgefuehl.com and create static pages that use the Header/Footer components with the text content in between.

- [ ] **Step 2: Create both pages**

Both follow the same pattern: Header → content section (max-w-2xl, prose styling) → Footer. Use the CI typography and spacing.

- [ ] **Step 3: Verify both pages**

Run: `npm run dev` — check `/impressum` and `/datenschutz` render correctly.

- [ ] **Step 4: Commit**

```bash
git add src/app/impressum/ src/app/datenschutz/
git commit -m "feat: add Impressum and Datenschutz pages"
```

---

### Task 14: Dockerfile and deployment config

**Files:**
- Create: `Dockerfile`

- [ ] **Step 1: Create Dockerfile (matching julia-messer pattern)**

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 2: Create .dockerignore**

```
node_modules
.next
.git
.env*
.superpowers
ci-styleguide
docs
```

- [ ] **Step 3: Test Docker build locally**

Run:
```bash
docker build -t praxis-lg-gutschein .
docker run -p 3000:3000 --env-file .env.local praxis-lg-gutschein
```
Expected: App runs in Docker at localhost:3000

- [ ] **Step 4: Commit**

```bash
git add Dockerfile .dockerignore
git commit -m "feat: add Dockerfile and .dockerignore for Railway deployment"
```

---

### Task 15: Create GitHub repo and push

- [ ] **Step 1: Create public repo under mycal2**

Run:
```bash
gh repo create mycal2/praxis-lg-gutschein --public --source=. --push
```

- [ ] **Step 2: Verify repo exists**

Run: `gh repo view mycal2/praxis-lg-gutschein`
Expected: Shows the repo with all commits.

---

### Task 16: End-to-end manual test

- [ ] **Step 1: Start dev server and submit a real voucher**

Run: `npm run dev` — fill in the form with a real email address and submit.

- [ ] **Step 2: Verify all three notifications arrive**

Check:
- [ ] Voucher email received with correct code, name, practitioner, expiry date, design matches mockup
- [ ] Notification email received at both configured addresses
- [ ] Telegram message received in the bot chat

- [ ] **Step 3: Verify error states**

- Submit with empty fields → inline validation errors
- Submit with invalid email → field error
- Submit 6 times quickly → rate limit error on 6th

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A && git commit -m "fix: address issues found in e2e testing"
git push
```
