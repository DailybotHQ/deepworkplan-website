---
name: responsive-lighthouse-audit
description: Audit the site's responsiveness across breakpoints and drive Lighthouse to near-100 on mobile AND desktop. Use proactively for responsive/performance/accessibility audits.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
# === Documentation (ignored by tools, useful for humans) ===
tier: 2
intent: audit
max-files: 20
max-loc: 300
---

# Skill: Responsive & Lighthouse Audit

## Objective

Verify the site looks correct at every breakpoint (mobile/tablet/desktop, en + es)
and that Lighthouse scores near-100 (≥ 0.99, target 1.0) across Performance,
Accessibility, Best Practices, and SEO on **both mobile and desktop**. Fix what
falls short without lowering any assertion.

## Non-Goals

- Does NOT add product features or rewrite content.
- Does NOT change the Broadsheet brand (palette, serif, hairlines, oxblood).
- Does NOT lower Lighthouse thresholds to make a gate pass.

## Tier Classification

**Tier: 2** — Standard. Spans several components + config; needs build + Lighthouse
runs and careful, behavior-preserving edits.

## Key Concepts

### Lighthouse: test BOTH form factors

LHCI defaults to **mobile** emulation. `lighthouserc.cjs` (mobile) asserts 1.0 on
core URLs; `lighthouserc.desktop.cjs` (`preset: 'desktop'`) asserts 1.0 on the full
URL set. Both **skip `robots-txt`** on purpose — the site's `robots.txt` carries the
IETF Content-Signal directive, which Lighthouse's RFC-9309 audit rejects, dropping
SEO to ~0.92. That is a **config artifact, not a defect**; never "fix" it by editing
robots.txt or lowering SEO.

```bash
pnpm run build           # Lighthouse audits dist/ — always build first
pnpm run lighthouse      # mobile (lighthouserc.cjs)
pnpm run lighthouse:desktop  # desktop (lighthouserc.desktop.cjs)
```

Lighthouse asserts on the **median** of N runs — a single bad run (e.g. a TBT/FID
spike) does not fail the gate. Parse `.lighthouseci/lhr-*.json` for per-URL,
per-category scores and per-audit detail.

> **Concurrency caveat:** two `lhci` runs sharing `.lighthouseci/` delete each
> other's `flags-*.json` → `ENOENT unlink` crashes. Ensure no other `lhci`/dev
> server is running before a sweep; this is a process race, not a score failure.

### Breakpoints to walk (en + es)

320 / 375 / 414 (mobile) · 768 / 820 / 1024 (tablet) · 1280 / 1440 / 1920 (desktop).
Check: no horizontal overflow, no clipped/illegible text, tap targets ≥ 44px, stable
layout (no CLS), sensible wide-screen behavior.

## Common fixes (battle-tested in this repo)

1. **Reader Markdown tables overflow on mobile** → wrap every `<table>` in
   `<div class="table-responsive">` via a rehype plugin
   (`src/lib/rehype-responsive-tables.mjs`, wired in `astro.config.mjs`); the
   `.table-responsive` mobile-scroll CSS lives in `src/styles/global.css`.
2. **`label-content-name-mismatch`** on a labeled link (logo / CTA): an `aria-label`
   must *contain* the link's visible text. Causes seen here: a child `<img>` with
   non-empty `alt` inside a labeled link (set `alt=""` — it's decorative there); a
   decorative `→`/strapline counted as visible text (wrap in `aria-hidden="true"`);
   a hardcoded English `aria-label` vs localized visible text (localize the label,
   e.g. `${t.footer.poweredBy} Dailybot`).
3. **`heading-order`**: never skip a level. A decorative `Kicker` is **not** a
   heading, so cards under it must not jump to `<h3>` — use `<h2>` (style with
   `text-lg` to keep the visual).
4. **`offscreen-images` / perf**: add `loading="lazy"` to below-fold images (e.g.
   footer logos); keep above-fold/LCP images `loading="eager" fetchpriority="high"`.
   Every `<img>` needs correct intrinsic `width`/`height` (match the real asset to
   avoid aspect-ratio/CLS flags).
5. **Wide screens**: `.main-container` caps at `max-w-7xl` by design (editorial
   measure) — centered gutters at 1920px are intentional, not overflow.
6. **Hydration**: prefer the laziest `client:*`. (Global nav is deliberately
   `client:load` for instant interactivity — leave it unless perf demands otherwise.)

## Procedure

1. **Baseline (no fixes).** Run `biome:check`, `astro:check`, `test`, `md:check`,
   `build`. Add/confirm `lighthouserc.desktop.cjs` + `lighthouse:desktop`. Run mobile
   + desktop Lighthouse; record per-URL scores and failing audits.
2. **Fix** the failing audits + responsive defects (see Common fixes). Mirror any UI
   string change across `en.ts`/`es.ts` + `src/content/pages/{en,es}` endpoints; keep
   dark-mode parity.
3. **Re-verify** after each change: `build`, then re-run the relevant Lighthouse
   config; parse the median scores.
4. **Final sweep.** With no concurrent `lhci`, run mobile + desktop gates (both exit
   0) and confirm ≥ 0.99 (target 1.0) on every category/URL.

## Validation

```bash
pnpm run biome:check && pnpm run astro:check && pnpm run test && pnpm run md:check && pnpm run build
pnpm run lighthouse          # mobile gate — must exit 0
pnpm run lighthouse:desktop  # desktop gate — must exit 0
```

## Related

- `/update-styles` — for the Tailwind/dark-mode edits this skill drives.
- `reviewer` agent — quality review of the layout diff.
- `i18n-guardian` agent — en/es parity when copy/markup changes.
</content>
