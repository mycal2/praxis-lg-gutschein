You are now working within the Praxis Lebensgefühl Corporate Identity. Apply these design rules to all UI and content you produce.

## Brand

- **Name:** Praxis Lebensgefühl
- **Tagline:** Wir begleiten Sie ganzheitlich auf dem Weg zu einem neuen Lebensgefühl
- **Core values:** Empathisch — Klar — Mit ganzem Herzen — Ganzheitlich — Freiheit
- **Location:** Holtenauer Straße 82, 24105 Kiel

## Color Palette

```css
:root {
  /* Primary */
  --teal: #74B4AF;
  --teal-light: #A3CFC9;
  --teal-dark: #5A9A94;

  /* Neutrals */
  --black: #000000;
  --dark: #2C2C2C;
  --gray-700: #4A4A4A;
  --gray-500: #7A7A7A;
  --gray-300: #B8B8B8;
  --gray-100: #F0F0F0;
  --white: #FFFFFF;

  /* Warm accents */
  --warm-sand: #F5F0EB;
  --warm-beige: #E8DDD3;

  /* Functional */
  --success: #74B4AF;
  --error: #C25B56;
  --warning: #D4A853;
}
```

## Typography

- **Font family:** `'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Weights:** 300 (Light — headings), 400 (Regular — body), 500 (Medium), 600 (Semibold — labels, buttons), 700 (Bold — uppercase labels)
- **H1:** clamp(2rem, 4vw, 3rem), weight 300, uppercase, letter-spacing 0.08em
- **H2:** clamp(1.5rem, 3vw, 2.2rem), weight 300, letter-spacing 0.04em
- **H3:** 1.2rem, weight 600
- **Body:** 1rem, weight 400, line-height 1.6
- **Labels:** 0.75rem, weight 700, uppercase, letter-spacing 0.12em, color teal-dark

## Spacing

8px base unit: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 80px

## Components

### Buttons
- **Primary:** teal background, white text, pill shape (border-radius: 9999px)
- **Secondary:** transparent background, teal border + text, pill shape
- **Dark:** dark background, white text, pill shape
- **Ghost:** transparent, gray border, dark text
- All buttons: padding 12px 28px, font-weight 600, 0.2s transition

### Cards
- White background, border-radius 16px, subtle shadow
- Optional teal accent bar (4px height) at top
- Hover: elevated shadow + slight translateY(-2px)

### Form inputs
- Border: 1px solid gray-300, border-radius 8px
- Focus: teal border + teal glow (box-shadow: 0 0 0 3px rgba(116, 180, 175, 0.15))
- Padding: 12px 16px

## Logo

- **Full logo:** Organic knot symbol + "PRAXIS LEBENSGEFÜHL" in geometric sans-serif capitals
- **Icon/mark:** Knot symbol standalone, teal (#74B4AF)
- **Variants:** White on dark, dark on light, white on teal
- **Assets:** `ci-styleguide/assets/` — logo-mit-text.svg, logo-mit-text-dark.svg, knoten.svg

## Tone of Voice

- **Warm and personal** — first person, sharing stories and motivations
- **Empathetic and inviting** — not clinical or medical-distancing
- **Empowering** — emphasis on self-determination and personal agency
- **Everyday language** — no jargon; emotions in plain German (Wut, Scham, Selbstzweifel)
- **Gentle humor** — norddeutsche Gelassenheit ("Lass mal schnacken")
- **Holistic framing** — body-mind connection, "ganzheitlich", inner wisdom
- **Never:** clinical, condescending, overly commercial, bureaucratic, or kitsch-esoteric

## Visual Style

- Minimalist, calm, generous whitespace
- Organic flow — tilt-shaped section dividers, flowing curves
- Natural photography — warm, approachable, not staged
- Subtle animations (300ms fade-in, hover effects)
- Overall: "safe space" aesthetic — natural, grounded, human
