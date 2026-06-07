# DESIGN.md — Deep Work Plan design system ("The Broadsheet")

> Design-system context for AI coding agents. When generating or editing UI in this
> repo, follow this file. Prefer the named tokens below over ad-hoc values.
> Source of truth: `src/styles/global.css` (`@theme` + `.dark`), `docs/BRAND_GUIDE.md`,
> editorial primitives in `src/components/editorial/`. Stack: Astro + Svelte 5 +
> Tailwind CSS 4 (CSS-first `@theme`), with a `.dark` class theme.

## Overview

"The Broadsheet" — a serious, neutral, editorial/newsprint identity: **warm paper,
ink serif, hairline rules, and a single restrained oxblood accent**. Monochrome-first
— it should read like a quality printed journal, not a web app. No hype, no gradients,
no large color fills; the page is ink on warm paper with one accent reserved for
links and small marks. Dark mode is a warm "ink" ground, like reading off dark paper,
never a cold terminal black.

## Colors

Two warm neutrals (paper + ink) plus **one** oxblood accent. The accent is the only
chroma — reserve it for inline links, the short rule under a kicker, focus rings, and
small emphasis marks; **never** large backgrounds or block buttons.

| Token (`var(--…)`) | Light | Dark | Role / usage |
|--------------------|-------|------|--------------|
| `--color-paper` | `#F7F4EC` | `#14140F` | Page background |
| `--color-ink` | `#1B1A17` | `#ECE7DA` | Primary body text |
| `--color-muted` | `#57534B` | `#A8A296` | Secondary text (WCAG AA) |
| `--color-line` | `#D9D3C5` | `#2A2820` | Hairline rules / borders |
| `--color-main` | `#14140F` | `#14140F` | Branded / dark surfaces (masthead) |
| `--color-secondary` / `--color-accent` | `#7A1F1F` | `#C2554D` | Oxblood accent (links, kicker rule, focus, marks) |
| `--color-gray-50` | `#F7F4EC` | `#1C1B15` | Elevated surface |
| `--color-gray-100` | `#EFEADD` | `#232118` | Slightly raised surface |

- Tailwind utilities map to these tokens: `text-ink`, `text-muted`, `bg-paper`,
  `border-line`, `text-secondary`, etc.
- **Amber `#C44A1F`** is used *only* for the hurricane-lamp theme-toggle flame — it
  is physical "fire," deliberately warmer than the oxblood accent. Not interchangeable
  with `--color-secondary`; never use it as a UI accent.

## Typography

Serif-led for **both** headings and body (the editorial direction). A self-contained
**system serif stack** ships — no webfont download (no FOUT/layout shift). Body sits
at a comfortable measure (~66ch); kickers are small caps; data uses tabular figures.

| Token | Stack |
|-------|-------|
| `--font-serif` | Iowan Old Style, Newsreader, Source Serif 4, Charter, Spectral, Georgia, Times New Roman, serif |
| `--font-sans` | Atkinson, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif (legible UI fallback) |
| `--font-mono` | ui-monospace, SFMono-Regular, Menlo, Consolas, monospace |

| Level | Size / weight / line-height | Used for |
|-------|------------------------------|----------|
| Masthead / display | serif 700, `letter-spacing -0.012em`, `line-height 1.08` | site title / hero |
| h1 | `clamp(2rem, 1.4rem + 2.6vw, 2.85rem)` 700 | page title |
| h2 | `clamp(1.5rem, 1.2rem + 1.4vw, 1.9rem)` 700 | section |
| h3 | `clamp(1.2rem, 1.05rem + 0.7vw, 1.4rem)` 600 | subsection |
| Kicker / eyebrow | serif 600, `0.78rem`, uppercase, `letter-spacing 0.14em` | eyebrow above headings |
| Lead | `1.25rem`, `line-height 1.55` | intro paragraph |
| Body | serif, `line-height ~1.5`, measure ~66ch | paragraphs |
| Drop cap | `3.4em`, `line-height 0.82` | optional lead initial |
| Code / mono | `--font-mono`, `0.875rem` | inline + block code |

## Layout & spacing

- Spacing follows **Tailwind's default scale** (`0.25rem` base step). Use Tailwind
  spacing utilities; do not introduce ad-hoc pixel values.
- Container: `.main-container` = `max-w-7xl` (80rem / 1280px), centered, with
  notch-safe inline padding `max(1rem, env(safe-area-inset-left))` (→ `2rem` at ≥768px).
- Whitespace principle: generous, calm, single-column reading; hairline rules — not
  boxes or shadows — separate sections.

## Elevation & depth

**Flat by design.** Depth is expressed with **1px hairline rules** (`--color-line`),
not drop shadows. Elevated surfaces use `--color-gray-50` / `--color-gray-100` tints
rather than shadow. Avoid `box-shadow` for structure; the masthead uses a hairline
bottom rule.

## Shapes

- **Border radius: `4px`** (cards, images, code blocks). Keep corners subtle — this
  is print, not rounded "app" UI.
- Borders are hairline `1px solid var(--color-line)`.

## Components

Editorial primitives live in `src/components/editorial/` — reuse them rather than
re-inventing:

- **Kicker** (`Kicker.astro`) — small-caps eyebrow with a short oxblood rule beneath.
- **Lead** (`Lead.astro`) — intro paragraph, optional drop cap.
- **Rule** (`Rule.astro`) — hairline section divider (`--color-line`).
- **Figure** (`Figure.astro`) — `<figure>` + caption; images carry explicit `width`/`height`, `border-radius: 4px`.
- **Reference** (`Reference.astro`) — footnote-style references.
- **Links:** ink-colored or oxblood (`--color-secondary`); underlined inline links.
- **Focus state:** `:focus-visible` ring in `--color-secondary` on a `--color-paper`
  offset (`ring-2 ring-secondary ring-offset-2 ring-offset-paper`).
- **Masthead header** (`src/components/layout/Header.svelte`) with a hairline bottom
  rule and the hurricane-lamp dark-mode toggle.

## Responsive behavior

- Breakpoints follow **Tailwind defaults** — `sm 640`, `md 768`, `lg 1024`,
  `xl 1280`, `2xl 1536` (px). The global stylesheet uses `md` (768px) as the main
  container breakpoint.
- Fluid type via `clamp()` (headings scale with viewport).
- Touch targets ≥ 44px; respect `prefers-reduced-motion` (the lamp toggle and dotted
  textures are reduced-motion safe).

## Do's and Don'ts

- **DO** use the tokens above (`--color-*`, `--font-*`) and their Tailwind utilities.
- **DO** keep text contrast at **WCAG AA** (4.5:1 normal, 3:1 large). All Broadsheet
  pairings already meet AA.
- **DO** use `--color-muted` (or `text-gray-600 dark:text-gray-300`) for secondary text.
- **DO** support dark mode with Tailwind's `dark:` variant.
- **DON'T** use `text-gray-400`, `text-gray-500`, `dark:text-gray-400`, or
  `dark:text-gray-500` for text — they fail WCAG AA.
- **DON'T** use the oxblood accent for large fills, block buttons, or multiple
  competing elements — it is for links, the kicker rule, focus rings, and small marks.
- **DON'T** add drop shadows for structure (use hairline rules), introduce new
  colors/fonts outside this file, or add a webfont download.
- **DON'T** confuse the lamp amber (`#C44A1F`) with the oxblood accent (`#7A1F1F`).

## Agent prompt guide

**For coding agents working in this repo:** this `DESIGN.md` is the source of truth
for UI. Before generating or editing any UI:

1. **Use the named tokens** here (`--color-ink`, `--color-paper`, `--color-secondary`,
   `--font-serif`, …) — do not introduce ad-hoc hex values, new fonts, or new colors.
2. **Respect roles** — pick a color by role (oxblood `--color-secondary` only for
   links / kicker rule / focus / small marks), not by eyeballing.
3. **Keep accessibility** — WCAG AA contrast; never use `text-gray-400/500` for text.
4. **Match the editorial patterns** — reuse the `src/components/editorial/` primitives,
   hairline rules over shadows, `4px` radius, serif type, ~66ch measure.
5. **When something isn't covered**, choose the option most consistent with these
   tokens and note the gap rather than inventing an unrelated style.

> Suggested instruction: *"Follow `DESIGN.md` strictly. Build [the UI] using its
> tokens, roles, and editorial primitives; ink on warm paper, one oxblood accent,
> hairline rules, serif type; keep text contrast at WCAG AA and support dark mode."*

---

*Generated by the DeepWorkPlan `design-system` addon by reasoning about this repo's
real design source (`src/styles/global.css`, `docs/BRAND_GUIDE.md`). MIT.*
