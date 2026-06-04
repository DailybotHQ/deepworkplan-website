---
name: add-language
description: Add a new language to the site end-to-end (scaffold → translate → native review → QA). Use when adding a locale beyond the active set.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
# === Documentation (ignored by tools, useful for humans) ===
tier: 2
intent: create
max-files: 60
max-loc: 5000
---

# Skill: Add Language

## Objective

Add a brand-new language to deepworkplan.com to full parity with English —
UI strings + all content collections (methodology, spec, kit, pages) + agent `.md`
endpoints — at native, professional quality. The site's i18n architecture is
N-language ready: availability is derived from file presence, and routing,
middleware, hreflang, sitemap, and the switcher all derive from the registry, so
**no route/middleware/registry plumbing is needed per language**.

## Non-Goals

- Does NOT change the i18n architecture (registry, routing, middleware).
- Does NOT translate the canonical agent layer: `/init.md`, the skill, and the
  spec source stay English; the bootstrap URL is never localized.

## Procedure

1. **Register the code** (only for a language not already in the 17-entry
   registry): add it to `src/lib/language-codes.ts` and add a `LANGUAGES` entry in
   `src/lib/i18n.ts` (name, nativeName, hreflang, ogLocale [underscore, e.g.
   `pt_BR`], dateLocale [hyphen, e.g. `pt-BR`], urlPrefix `/<code>`, flag).
2. **Scaffold** the English-seeded skeleton:
   `pnpm run i18n:scaffold <code>` — creates `src/lib/translations/<code>.ts` and
   `src/content/{methodology,spec,kit,pages}/<code>/` (49 files, English slugs).
3. **Translate (pass 1)** every string value in `<code>.ts` and the full prose of
   each content file, following the translation style guide: brand "Broadsheet"
   voice, the canonical-English glossary, the do-not-translate list (brand, code,
   paths, tool names, the `https://deepworkplan.com/init.md` URL, English slugs),
   and the language's locale conventions (quotes, script, punctuation, casing).
   Translate only `title`/`description`/`summary` frontmatter; keep keys and
   `order`/`lang`/`kind`/`section`/`icon`.
4. **Native review (pass 2)** — delegate to the `i18n-guardian` agent to fix
   naturalness, register, technical fidelity, and glossary consistency. Never ship
   a single-pass machine translation.
5. **Validate (all must pass):**
   ```bash
   pnpm run i18n:check       # content parity + script sanity
   pnpm run astro:check      # string-key parity (SiteTranslations interface)
   pnpm run md:check:strict  # agent .md endpoints
   pnpm run biome:check
   pnpm run build
   ```
6. **Commit:** `feat(i18n): add full <Language> (<code>) translation`.

## Notes

- For many languages at once, fan out one agent per language (each writes only its
  own disjoint files) — see the i18n expansion plan's Team Agents Configuration.
- RTL languages (e.g. Arabic) additionally need RTL layout work — out of scope for
  this skill's baseline.

## References

- `docs/I18N_GUIDE.md` — the N-language model + add-a-language flow.
- `scripts/i18n/scaffold-language.mjs`, `scripts/i18n/check.mjs` — tooling.
- `i18n-guardian` agent — the native-review pass.
- `translate-sync` skill — keeping existing languages in sync when EN changes.
