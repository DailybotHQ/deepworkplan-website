# Brand Guide

> Palette and color usage are defined in code: `src/styles/global.css`.
> This guide explains intent; the tokens are the source of truth.

**Deep Work Plan** is a serious, neutral, technical methodology-and-specification brand. The visual
system is **editorial** — it reads like a printed engineering standard, a scientific paper, or a
broadsheet newspaper: warm paper, ink type, hairline rules, serif display headings, and a single
restrained accent used sparingly. No gradients, no decorative shadows, no hype.

## Logo

The logo is a monochrome "DWP" monogram (see `public/images/brand/`). Use the **ink** variant
(`dwp-mark-light.png`) on light/paper backgrounds and the **paper** variant (`dwp-mark-dark.png`) on
dark/ink backgrounds; the site swaps them by color scheme. Keep clear space equal to the cap height;
never recolor, rotate, or add effects. Favicons sit on a rounded paper tile so they remain legible on
both light and dark browser chrome.

## Palette — "The Broadsheet" (Editorial / Newsprint)

Two warm neutrals (paper + ink) plus a single restrained **oxblood** accent. Monochrome-first: the
accent is reserved for links, the kicker rule, and small marks — never large fills.

| Token | Light | Dark | Use |
| :---- | :---- | :--- | :-- |
| `--color-paper` | `#F7F4EC` | `#14140F` | Page background |
| `--color-ink` | `#1B1A17` | `#ECE7DA` | Body text |
| `--color-main` | `#14140F` | `#14140F` | Branded / dark surfaces (masthead) |
| `--color-secondary` / `--color-accent` | `#7A1F1F` | `#C2554D` | Oxblood accent (links, kicker rule, marks) |
| `--color-line` | `#D9D3C5` | `#2A2820` | Hairline rules / borders |
| `--color-muted` | `#57534B` | `#A8A296` | Secondary text (WCAG AA) |
| `--color-gray-50` | `#F7F4EC` | `#1C1B15` | Elevated surface |
| `--color-gray-100` | `#EFEADD` | `#232118` | Slightly raised surface |

**Accent discipline.** The oxblood accent (`#7A1F1F` light / `#C2554D` dark) is the only chroma in
the system. Use it for: inline links, the short rule under a kicker/eyebrow, focus rings, and small
emphasis marks. Do not use it for large backgrounds, buttons-as-blocks, or multiple simultaneous
elements competing for attention. Everything else is ink on paper.

**Dark mode** is a warm "ink" ground (`#14140F`) with paper-colored text — not a cold black. It
should feel like reading off dark paper, not a terminal.

## Typography

The system is **serif-led** to reinforce the editorial / paper character: serif display for the
masthead and headings, and serif for body copy at a comfortable measure (~66ch). Eyebrows/kickers are
set in small caps; data uses tabular figures. (See `src/styles/global.css` for the `@font-face`
declarations, the type scale, and the editorial primitives under `src/components/editorial/`.)

## Editorial primitives

Reusable building blocks that carry the newspaper/journal feel (in `src/components/editorial/`):
kicker/eyebrow with an oxblood rule, hairline section rules, `<figure>` + caption, footnote-style
references, and lead paragraphs with optional drop caps. Headers render as a **masthead** with a
hairline bottom rule.

## Theme toggle — hurricane lamp

Dark mode is toggled by an inline **hurricane-lamp `<button>`** in the masthead (`src/components/layout/Header.svelte`), not a floating control. The lamp is a hand-etched line illustration shipped as four transparent PNGs under `public/images/ui/`: `lamp-off.png` (dark wick, daytime / light theme), `lamp-on.png` (lit flame, night / dark theme), and `lamp-hover.png` (preview state on first hover).

Design discipline:

- **Flame color is amber (`#c44a1f`)**, deliberately warmer than the site oxblood (`--color-secondary` = `#7a1f1f`). The amber reads as physical fire; the oxblood remains the editorial accent. They are not interchangeable.
- **Hover preview** flips the state-displayed image once on first hover (light → lit, dark → dimmed) so the user can preview the destination before clicking. A `justToggled` flag suppresses re-priming until `mouseleave`, so a user who toggles while still inside the lamp does not see the lamp re-light during the click.
- The button uses a `:focus-visible` ring in `--color-secondary` (oxblood); cursor is `pointer`; the lamp respects `prefers-reduced-motion` (no cross-fade).
- In dark mode the PNG silhouette gets a 1px ink-colored `drop-shadow()` filter so the line art doesn't disappear against the dark ground.
- The masthead container itself receives `padding-left: max(2rem, env(safe-area-inset-left))` (and `…-right`) via `.main-container` so the lamp + logo never sit under an iPhone notch in landscape.

## Accessibility

All combinations meet WCAG AA on the paper palette. Never use `text-gray-400`/`text-gray-500` (or
their `dark:` variants) for text — use `--color-muted` / the approved gray tokens. Every image carries
explicit `width`/`height`; heading hierarchy is preserved; focus rings use the oxblood accent on a
paper offset.
