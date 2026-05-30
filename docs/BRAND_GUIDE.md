# Brand & Style Guide

This is the **single source of truth** for the Deep Work Plan visual identity. All AI agents, designers, and developers should reference this document when making UI, color, typography, or brand decisions.

## Brand Identity

**Deep Work Plan (DWP)** is a methodology for planning and executing focused, high-quality work with AI agents. The brand is **calm, deliberate, focused, and serious** — the look of a tool you reach for when the work matters and you want a clear plan before you start.

### Brand Principles

- **Calm** — Generous whitespace, restrained color, no visual noise. The interface stays out of the way of the work.
- **Deliberate** — Every element earns its place. Structure over decoration.
- **Focused** — One clear path through each page. Strong hierarchy, minimal distractions.
- **Serious / neutral** — Professional and trustworthy, not playful or hyped. The methodology speaks for itself.

There is **no mascot, no character, and no personal brand**. The identity is typographic and systemic: ink on paper, with a single indigo accent for action.

### Naming

| Form | Usage |
|------|-------|
| **Deep Work Plan** | Full name — titles, first mention, formal contexts |
| **DWP** | Short form — repeated mentions, compact UI, monogram |
| **deepworkplan.com** | Domain |

Spanish content uses the same product name, "Deep Work Plan" (do not translate the product name).

---

## Color Palette

The system is **Ink & Paper + Indigo**: a near-black ink, a warm off-white paper, neutral muted tones for secondary text and hairlines, and a single indigo accent for interactive elements. Dark mode inverts to paper-on-ink with a brighter indigo.

### Light Mode

| Swatch | Name | Spanish | Hex | Token | Usage |
|:------:|------|---------|-----|-------|-------|
| ![#FAFAF7](https://readme-swatches.vercel.app/FAFAF7) | **Paper** | Papel | `#FAFAF7` | `--color-paper` | Page background, surfaces |
| ![#14171C](https://readme-swatches.vercel.app/14171C) | **Ink** | Tinta | `#14171C` | `--color-ink` | Primary body text |
| ![#5B6470](https://readme-swatches.vercel.app/5B6470) | **Muted** | Apagado | `#5B6470` | `--color-muted` | Secondary text (WCAG AA) |
| ![#4F46E5](https://readme-swatches.vercel.app/4F46E5) | **Indigo** | Índigo | `#4F46E5` | `--color-secondary` / `--color-accent` | Accent, links, CTAs, focus |
| ![#E4E2DB](https://readme-swatches.vercel.app/E4E2DB) | **Line** | Línea | `#E4E2DB` | `--color-line` | Hairline borders, dividers |

### Dark Mode

| Swatch | Name | Spanish | Hex | Token | Usage |
|:------:|------|---------|-----|-------|-------|
| ![#0E1116](https://readme-swatches.vercel.app/0E1116) | **Ink (base)** | Tinta (base) | `#0E1116` | `--color-main` | Page background, branded surfaces |
| ![#E8E8E3](https://readme-swatches.vercel.app/E8E8E3) | **Paper (text)** | Papel (texto) | `#E8E8E3` | — | Primary body text on dark |
| ![#9AA3AF](https://readme-swatches.vercel.app/9AA3AF) | **Muted** | Apagado | `#9AA3AF` | `--color-muted` | Secondary text (WCAG AA) |
| ![#818CF8](https://readme-swatches.vercel.app/818CF8) | **Indigo (bright)** | Índigo (claro) | `#818CF8` | `--color-secondary` / `--color-accent` | Accent, links, CTAs, focus |
| ![#232831](https://readme-swatches.vercel.app/232831) | **Line** | Línea | `#232831` | `--color-line` | Hairline borders, dividers |

### Contrast (WCAG AA)

All defined pairings meet WCAG 2.1 AA:

| Pairing | Ratio | Result |
|---------|-------|--------|
| Ink `#14171C` on Paper `#FAFAF7` | ~15:1 | Pass (body) |
| Muted `#5B6470` on Paper `#FAFAF7` | ~5.3:1 | Pass (body) |
| Indigo `#4F46E5` on Paper `#FAFAF7` | ~5.9:1 | Pass (body + large) |
| Paper text `#E8E8E3` on Ink `#0E1116` | ~14:1 | Pass (body) |
| Muted `#9AA3AF` on Ink `#0E1116` | ~7:1 | Pass (body) |
| Indigo bright `#818CF8` on Ink `#0E1116` | ~6.9:1 | Pass (body + large) |

The dark accent `#818CF8` clears AA for body text on the ink base, but it is intended primarily for **links and large/interactive elements**; keep long-form body copy in paper/muted tones.

### Color Do's and Don'ts

**Do:**
- Use indigo sparingly, for interaction only (links, buttons, focus rings, active states).
- Keep the canvas calm: paper in light mode, ink in dark mode.
- Use muted tones for secondary text and line tones for borders.

**Don't:**
- Use indigo as a large background for body text — it is an accent, not a surface.
- Introduce off-brand reds, crimsons, or navies.
- Use low-contrast greys for body text (`text-gray-400/500` are forbidden).

---

## CSS Design Tokens

### Current Implementation

In `src/styles/global.css`, the palette is registered as Tailwind theme tokens. The token **API surface is backward-compatible** — `--color-main` and `--color-secondary` keep their names so existing `bg-main` / `text-secondary` / `bg-secondary` classes keep resolving; only their values changed.

```css
@theme {
  --color-main: #0e1116;      /* Ink — dark base / branded surfaces */
  --color-secondary: #4f46e5; /* Indigo — accent (light mode) */
  --color-accent: #4f46e5;    /* Alias for the accent */
  --color-ink: #14171c;       /* Near-black body text (light mode) */
  --color-paper: #fafaf7;     /* Warm paper — light background */
  --color-line: #e4e2db;      /* Hairline borders (light mode) */
  --color-muted: #5b6470;     /* Secondary text (light mode, WCAG AA) */
  --color-gray-50: #fafaf7;   /* Elevated light surface = paper */
}

.dark {
  --color-secondary: #818cf8; /* Indigo, brighter for dark surfaces */
  --color-accent: #818cf8;
  --color-line: #232831;      /* Hairline borders (dark mode) */
  --color-muted: #9aa3af;     /* Secondary text (dark mode, WCAG AA) */
}
```

### Token Mapping

| Token | Tailwind Class | Role | Light | Dark |
|-------|---------------|------|-------|------|
| `--color-main` | `bg-main`, `text-main` | Ink base / branded surface | `#0E1116` | `#0E1116` |
| `--color-secondary` | `bg-secondary`, `text-secondary`, `border-secondary` | Indigo accent | `#4F46E5` | `#818CF8` |
| `--color-accent` | (alias) | Indigo accent | `#4F46E5` | `#818CF8` |
| `--color-ink` | — | Body text (light) | `#14171C` | — |
| `--color-paper` / `--color-gray-50` | `bg-gray-50` | Paper surface | `#FAFAF7` | — |
| `--color-line` | — | Hairline border | `#E4E2DB` | `#232831` |
| `--color-muted` | — | Secondary text | `#5B6470` | `#9AA3AF` |

### Accent Tone Strategy (Light vs Dark)

The accent token is intentionally theme-aware:

- **Light mode** uses indigo `#4F46E5` for strong, legible action color on warm paper.
- **Dark mode** lifts the accent to `#818CF8` so it stays vivid and AA-compliant on the ink base.
- The class API is unchanged (`text-secondary`, `bg-secondary`, `border-secondary`), so components stay simple and the visual system is enforced globally rather than per-component.

### Using Brand Colors in Components

```html
<!-- Ink branded surface -->
<div class="bg-main text-white">

<!-- Accent / interactive -->
<button class="bg-secondary text-white hover:opacity-90">
<a class="text-secondary hover:underline">

<!-- Calm card with hairline border -->
<div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
```

---

## Typography

### Font Family — Atkinson Hyperlegible (kept)

The brand **keeps Atkinson Hyperlegible** for body and headings.

**Rationale:**
- **Accessibility-first.** Atkinson Hyperlegible was designed by the Braille Institute specifically to maximize character distinction for low-vision readers — a natural fit for a calm, serious, focus-oriented product.
- **Already self-hosted.** The woff files ship in `public/fonts/` and are preloaded in `BaseHead.astro`. Keeping them means no new network requests, no layout shift, and no added build weight.
- **Neutral and legible.** It reads as professional rather than playful, matching the deliberate brand voice without drawing attention to itself.

Code blocks use the system monospace stack.

| Font | Weight | Usage | File |
|------|--------|-------|------|
| **Atkinson Hyperlegible** | 400 (Regular) | Body text, paragraphs | `public/fonts/atkinson-regular.woff` |
| **Atkinson Hyperlegible** | 700 (Bold) | Headings, emphasis | `public/fonts/atkinson-bold.woff` |
| System sans-serif | — | Fallback | — |
| Monospace | — | Code blocks, inline code | System default |

Fonts are preloaded in `BaseHead.astro` for performance.

### Heading Scale

Headings use **sentence case** (see Brand Voice).

| Level | Tailwind | Usage |
|-------|----------|-------|
| h1 | `text-4xl font-extrabold` | Page titles |
| h2 | `text-2xl font-bold` or `text-3xl font-bold` | Section headings |
| h3 | `text-xl font-semibold` | Subsection headings |
| h4 | `text-lg font-semibold` | Card titles, minor headings |

### Text Colors

| Context | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Primary text | `text-gray-900` | `dark:text-gray-100` or `dark:text-white` |
| Secondary text | `text-gray-600` | `dark:text-gray-300` |
| Links / accent | `text-secondary` (`#4F46E5`) | `text-secondary` (`#818CF8` via dark override) |

**Never** use `text-gray-400`, `text-gray-500`, `dark:text-gray-400`, or `dark:text-gray-500` for body text — they fail WCAG AA.

---

## Logo & Monogram

The identity is typographic. The primary mark is a clean **DWP monogram** on the indigo accent, plus the **"Deep Work Plan"** wordmark set in Atkinson Hyperlegible bold.

### Assets

| Asset | File | Usage |
|-------|------|-------|
| **Favicon / monogram** | `public/favicon.svg` | Browser tab, app icon, small contexts — neutral DWP monogram on indigo |
| **Favicon (legacy)** | `public/favicon.ico` | Fallback 32×32 favicon |
| **OG default** | `public/images/og-default.png` | Default social share card |
| **Header / full / iso logos** | `public/images/logo_*.svg`, `public/images/isologo.svg` | Header and large-display marks |

> **Asset status:** `favicon.svg` ships as a neutral DWP monogram. The remaining raster/large logo files (`og-default.png`, `logo_full.svg`, `logo_small_version_white.svg`, `isologo.svg`, `favicon.ico`) are placeholders pending final DWP artwork; they resolve so the build is green, but they do not yet carry final brand art. Replace them with finished DWP marks in a later pass.

### Logo Usage Rules

**Do:**
- Keep clear space around the monogram and wordmark.
- Use the wordmark "Deep Work Plan" set in Atkinson Hyperlegible bold.
- Maintain aspect ratio at all times.

**Don't:**
- Stretch, distort, or recolor the monogram outside the brand palette.
- Add drop shadows, gradients, or outlines.
- Place a light mark on a light background without a dark/indigo container.

---

## Dark Mode Integration

The site uses class-based dark mode (`dark` class on `<html>`).

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Page background | Paper (`bg-white` / `#FAFAF7`) | Ink (`bg-main` / `#0E1116`) |
| Primary text | `text-gray-900` | `text-white` / `text-gray-100` |
| Accent | `text-secondary` / `bg-secondary` (indigo) | Same tokens (brighter indigo via `.dark`) |
| Cards | `bg-white` | `bg-gray-800` / `bg-gray-900` |
| Borders | `border-gray-200` (line) | `border-gray-700` (line) |

### Browser Chrome (`theme-color`)

- Light: `#ffffff`
- Dark: `#0e1116` (ink base)

Set in `BaseHead.astro`.

---

## Brand Voice (for Content)

The Deep Work Plan voice is **serious, neutral, and instructive** — the tone of clear documentation. It explains the methodology plainly and lets the substance carry the message.

### Rules

- **Sentence-case headings.** "Plan before you execute", not "Plan Before You Execute".
- **No hype.** Avoid superlatives, marketing adjectives, and growth-speak ("revolutionary", "game-changing", "supercharge").
- **No exclamation marks in body copy.** Keep the register calm and measured.
- **Plain, direct sentences.** Prefer the imperative and the present tense ("Define the goal", "Split the work into tasks").
- **Neutral and impersonal.** Write about the methodology and the work, not a personal narrator. Avoid first-person personal anecdotes.
- **Precise over persuasive.** State what to do and why; skip the cheerleading.

| Do | Don't |
|----|-------|
| "Define the goal before you start." | "Crush your goals like never before!" |
| "This plan splits the work into tasks." | "This revolutionary plan will supercharge your output!" |
| "Each task has clear acceptance criteria." | "Amazing results, guaranteed!" |
| Sentence-case headings | Title-Case Headings With Every Word Capitalized |

---

## Quick Reference for AI Agents

### Colors to Use

```
Accent (light):  #4F46E5 (Indigo)  → bg-secondary, text-secondary
Accent (dark):   #818CF8 (Indigo)  → auto-applied in `.dark`
Ink base:        #0E1116 (Ink)     → bg-main
Body text:       #14171C (Ink) light / #E8E8E3 (Paper) dark
Secondary text:  #5B6470 light / #9AA3AF dark (muted)
Borders:         #E4E2DB light / #232831 dark (line)
Background:      #FAFAF7 (Paper) light / #0E1116 (Ink) dark
```

### Always Remember

- Indigo is the only accent — use it for interaction, sparingly.
- Use `bg-secondary` / `text-secondary` / `border-secondary` instead of hardcoding hex.
- Every UI element needs both light and dark styles (`dark:` prefix).
- Use `text-gray-600 dark:text-gray-300` for secondary text — never `gray-400/500`.
- Headings are sentence case; body copy has no hype and no exclamation marks.
- Content must exist in both English and Spanish.

### Checklist for New UI Work

- [ ] Uses the indigo accent token for interactive elements (`bg-secondary` / `text-secondary`)
- [ ] Supports dark mode with appropriate `dark:` variants
- [ ] Text meets WCAG AA contrast in both modes
- [ ] Borders use line tones; secondary text uses muted/approved greys
- [ ] Font hierarchy follows the established heading scale (sentence case)
- [ ] Copy follows the calm, neutral brand voice

---

## Related Documentation

- [Product Spec](PRODUCT_SPEC.md) — Brand positioning and messaging
- [Standards](STANDARDS.md) — Coding conventions including styling
- [Accessibility](ACCESSIBILITY.md) — Contrast and WCAG requirements
- [Styling Guide](../src/styles/README.md) — CSS and Tailwind technical reference
- [Content Writer Agent](../.agents/agents/content-writer.md) — Brand voice guidelines for content
