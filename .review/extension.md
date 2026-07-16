# Review overrides for deepworkplan-website

This repo is the DeepWorkPlan website at [deepworkplan.com](https://deepworkplan.com) —
a serious, neutral, technical documentation-and-marketing site in the
Broadsheet editorial design system (warm paper, ink serif display, hairline
rules, restrained oxblood accent). It ships static content in 17 active
languages via Astro SSG on Cloudflare Pages, dogfoods the DWP methodology it
documents, and hosts the canonical adoption endpoint `/init`. Every user-
facing change ripples across 17 language surfaces + agent-friendly Markdown
mirrors + a search index — the review bar is calibrated to that reach.

Trust is **two-sided** (see [`docs/SECURITY.md`](../docs/SECURITY.md)
"Provenance & Integrity"): this website and the installable skill
([`DailybotHQ/deepworkplan-skill`](https://github.com/DailybotHQ/deepworkplan-skill)).
Users decide whether to adopt DWP from what they read here **and** from the
skill's public security audits on skills.sh:

<https://www.skills.sh/dailybothq/deepworkplan-skill/deepworkplan>

Target posture on that listing: **Gen Agent Trust Hub = Pass**, **Socket =
Pass** (or at worst a residual Warn that is not a delivery-vector hit),
**Snyk = Pass**. This site MUST NOT teach, mirror, or normalize patterns that
would FAIL those audits (especially remote-installer pipes), MUST NOT
overstate trust claims beyond the skill repo's SECURITY.md, and MUST keep
`/trust`, `/.well-known/dwp-trust.json`, and `security.txt` honest. skills.sh
re-scans on a delay after skill releases — a stale FAIL on the dashboard is
not permission to add more risk in website copy.

The load-bearing rules live in [`AGENTS.md`](../AGENTS.md); this file
overrides the base prompt for the patterns most likely to slip a review in
this codebase.

## Severity overrides for our codebase

- **Always `critical`:** reintroducing `PUBLIC_GOOGLE_SITE_VERIFICATION` or
  any `google-site-verification` meta tag in templates or components.
  Analytics verification is DNS-only (Domain-property TXT); AGENTS.md §10
  is explicit. Reintroducing the env var or the meta tag is a directly-
  reverted policy decision.
- **Always `critical`:** reintroducing any REMOVED surface — the blog
  engine, slides/tech-talks, or the personal pages (`cv`, `portfolio`,
  `dailybot`, `foodie`, `hobbies`, `trading`, `entrepreneur`). AGENTS.md
  DON'T #18. Flag any new file under `src/pages/{blog,slides,talks,cv,
  portfolio,dailybot,foodie,hobbies,trading,entrepreneur}/` OR
  reintroduced references from public pages.
- **Always `critical`:** adding a new top-level page WITHOUT adding its
  slug to `KNOWN_BASE_PATHS` in `src/middleware.ts`. AGENTS.md DON'T #19.
  Symptom: dev log shows `[404] (rewrite) /<path>` — the `(rewrite)` is
  the smoking gun (comes from `context.rewrite()` in the middleware,
  NOT from Astro routing). Multi-segment paths (`/foo/bar`) and paths
  containing `.` bypass the rule. Every new page slug MUST be added to
  the set exactly once — it covers all 17 languages automatically.
- **Always `critical`:** non-English slug in ANY content collection under
  `src/content/{methodology,spec,kit,pages}/<lang>/`. AGENTS.md DON'T
  #17. All slugs MUST be English across every language folder (e.g.,
  `src/content/methodology/es/getting-started.md`, not
  `src/content/methodology/es/comenzando.md`); only the title/description/
  body get translated. Non-English slugs break shared-slug parity and
  the `pnpm run md:check` cross-reference.
- **Always `critical`:** placeholder content in any file under
  `src/content/**` — `[AUTHOR:`, `[AUTOR:`, `[TODO:`, `[TBD]`, `[FIXME]`
  or any bracketed "fill in later" text. AGENTS.md DON'T #16 is zero-
  tolerance. Regression guard: `grep -rn '\[AUTHOR:\|\[AUTOR:\|\[TODO:\|
  \[TBD\]\|\[FIXME\]' src/content/` MUST return zero matches.
- **Always `critical`:** `role="menu"` on any nav dropdown (should be the
  disclosure pattern — button + `aria-expanded` + hidden panel). AGENTS.md
  DON'T #9. `role="menu"` implies keyboard-arrow navigation and specific
  focus semantics that our dropdowns don't implement; the disclosure
  pattern is the correct primitive.
- **Always `critical`:** a new page missing translations in any of the 17
  active languages (en, es, pt, zh, ja, de, fr, ko, ru, it, tr, id, vi,
  hi, pl, uk, th) — verified by `pnpm run i18n:check`. Includes: new
  translation key added to only one locale file under
  `src/lib/translations/*.ts`, methodology/spec/kit document missing in
  a language folder, a new page component without its `[lang]/`
  wrapper. AGENTS.md §7.
- **Always `critical`:** a new UI string hardcoded in a component or
  `.astro` template instead of going through `getTranslations(lang)`.
  AGENTS.md DON'T #4. Break the multilingual contract at the source and
  it silently ships in only the default language.
- **Always `critical`:** `MainLayout` imported in a page wrapper under
  `src/pages/`. Wrappers MUST be 3-line files that render a component
  from `src/components/pages/*Page.astro`; the component handles
  `MainLayout` internally. AGENTS.md DON'T #3 + Architecture §4.
- **Always `critical`:** `MainLayout` used on any file under
  `src/pages/internal/**`. Internal-hub pages use `InternalLayout` or
  `ShowcaseLayout` — never `MainLayout`. AGENTS.md DON'T #12. Same
  applies in reverse — public pages MUST NOT reference `InternalLayout`.
- **Always `critical`:** a public page under `src/pages/` (any file
  outside `src/pages/internal/`) that references, links to, or imports
  from `/internal/`. AGENTS.md DON'T #14. Internal hub is dev-only and
  automatically excluded from production builds via three layers (post-
  build deletion, sitemap filter, `noindex` meta) — a public reference
  breaks that isolation.
- **Always `critical` (user trust / skills.sh Snyk E005 / Socket W012):**
  any fetch-and-execute installer pipeline as a literal string in
  user-facing or agent-facing content — translations
  (`src/lib/translations/**`), methodology/spec/kit/pages collections
  (`src/content/**`), page components, `/init` copy, `/trust` copy,
  `AGENTS.md`, or `docs/**`. Banned shapes: POSIX `curl … | bash` /
  `curl … | sh` / `wget … | sh`, PowerShell `irm … | iex` / `iwr … | iex`,
  and any single-line `download → pipe → shell`. Scanners (and users who
  copy-paste from this site into agents) are lexical; "don't do this"
  examples that still spell the pipe still poison trust. Prefer
  `npx skills add …`, package managers (`pip` / `brew` / `npm`), or a
  verified multi-step flow without the pipe. **Allowed:** `curl -fsSL -o
  FILE URL` that only downloads a checksum or artifact (as on `/trust`)
  — download-only is fine; pipe-to-shell is not. Precedent on the skill
  side: `fix(security): eliminate remote-installer pipes` (`6a05ed9`)
  — that string is what moved Snyk to Fail on
  [skills.sh](https://www.skills.sh/dailybothq/deepworkplan-skill/deepworkplan).
- **Always `critical` (user trust / overclaim):** asserting that releases
  are cryptographically **signed**, that the skill phones home, or any
  trust claim stronger than the skill repo's SECURITY.md / this repo's
  `docs/SECURITY.md`. Current honest posture: releases are
  **checksummed, not signed**; signing is planned. `/trust`,
  `/.well-known/dwp-trust.json`, and related copy MUST stay aligned —
  `signing` stays `"planned"` until a real signature ships.
- **Always `critical` (user trust / trust surface regression):** removing,
  gutting, or making inaccurate the public trust surfaces — `/trust`
  (and its 17-language mirrors), `public/.well-known/dwp-trust.json`,
  `public/.well-known/security.txt`, or the Provenance section of
  `docs/SECURITY.md` — without an intentional, documented replacement
  that preserves disclosure channels and verifiable-install guidance.
- **Always `critical`:** committing secrets, API keys, tokens, or
  provider credentials (e.g. `CURSOR_API_KEY`, Dailybot keys, Cloudflare
  tokens) into the tree, sample env files that are not placeholders, or
  workflow logs. Env-based secrets stay in GitHub Actions secrets /
  local `.env` (gitignored).
- **Always `critical`:** an `npx skills add` / `skills update` invocation
  in a new workflow or script that omits either `--yes` or `-y`. Missing
  either hangs non-TTY runners; `release_and_publish.yml` Step 1a must
  keep both on every dogfood install.
- **Always `critical`:** a hand-edit under `.agents/skills/**` that
  reintroduces a remote-installer pipe, strips a Trust-boundary section
  from a write-capable `SKILL.md`, or otherwise diverges the dogfood
  copy from upstream security posture. Vendored skills are refreshed on
  release — hand edits are almost always wrong; if a PR must touch them,
  security regressions are merge-blocking.

- **Always `warning`:** any use of `text-gray-400`, `text-gray-500`,
  `dark:text-gray-400`, or `dark:text-gray-500` for BODY text. All fail
  WCAG AA 4.5:1 contrast. AGENTS.md §9.2. Approved secondary text is
  exactly `text-gray-600 dark:text-gray-300`. (These utilities MAY be
  fine for icon/decoration colors where the 3:1 large-text ratio holds;
  flag body-text uses.)
- **Always `warning`:** any `<img>` element missing `width` or `height`
  attributes. AGENTS.md §9.3. Missing dimensions cause CLS on lazy-
  loaded images; every `<img>` in this repo MUST have both.
- **Always `warning`:** skipping a heading level in a page (e.g., an
  `h3` following an `h1` with no `h2`; an `h4` following an `h2` with
  no `h3`). AGENTS.md DON'T #10. Screen-reader outlines break.
- **Always `warning`:** interactive logic (event handlers, mutable
  state, DOM manipulation) inside a `.astro` file's `<script>` block.
  `.astro` script blocks run at build time only; interactive behavior
  belongs in a Svelte component. AGENTS.md DON'T #1.
- **Always `warning`:** a Svelte component reference in `.astro` without
  a `client:*` directive. `<MySvelteThing />` renders server-only with
  no hydration; interactivity silently breaks. AGENTS.md DON'T #2.
- **Always `warning`:** `client:load` used where `client:visible` or
  `client:idle` would suffice (e.g., a below-fold Svelte component
  loading eagerly). Performance §8.2 + AGENTS.md DON'T #6. `client:load`
  is only correct for above-fold interactive elements.
- **Always `warning`:** hardcoded translatable text in an `.astro`
  template or Svelte component. AGENTS.md DON'T #4. Route through
  `getTranslations(lang)` — even if it's just one string, adding it now
  is cheaper than backporting across 17 locale files after a designer
  ships the change.
- **Always `warning`:** non-English content missing the correct
  diacritics, script, or punctuation for its language. AGENTS.md DON'T
  #15 lists specific Spanish cases (`pequeno`/`espanol`/`analisis`/
  `codigo`/`version`/`ejecucion`/`numero`/`pagina`/`titulo` — all missing
  a tilde or accent), and CJK content must use full-width punctuation.
  `pnpm run i18n:check` catches most of these; a reviewer catches the
  rest.
- **Always `warning`:** multilingual variants added to `src/pages/internal/`
  (an internal-hub page mirrored under a `[lang]/` tree). Internal hub is
  English-only, dev-only, no Page Wrapper Pattern. AGENTS.md DON'T #13.
- **Always `warning`:** a new component that lists interactive Svelte
  behavior but ships as `.astro`. Astro is the foundation; Svelte is
  ONLY for interactive components. Look for `onClick` / `onmount` /
  reactive `$` inside an `.astro` file — that logic belongs in
  `Something.svelte` with an appropriate `client:*` directive.
- **Always `warning`:** meta description outside 130–160 characters (for
  pages in translations, or in collection-doc frontmatter). Pre-Commit
  Checklist. Long descriptions get truncated in SERPs; short ones lose
  the space budget.
- **Always `warning`:** any new step in `.github/workflows/*.yml` that
  interpolates attacker-controlled PR content
  (`github.event.pull_request.title`, `.body`, `.head.ref`, `.head.label`)
  directly into a `run:` shell block via `${{ ... }}`. Route through
  `env:` and reference `"$VAR"` in the script. The AI Diff Reviewer
  workflow is specifically at risk if edited carelessly.
- **Always `warning`:** a workflow using `pull_request_target` combined
  with `actions/checkout@vN` on `github.head_ref` without
  `if: github.event.pull_request.head.repo.full_name == github.repository`.
  Most-exploited GitHub Actions RCE pattern — do not introduce it.
- **Always `warning`:** install / onboarding copy that drifts from the
  companion skill's safe paths (package manager or `npx skills add` first;
  verified download-then-execute as separate steps) or that omits the
  "verify before you run" checksum story when teaching install. Keep
  `/init` and `/trust` in sync with the skill repo's TRUST.md promises.

- **Always `info`:** import order not matching the canonical convention.
  AGENTS.md §3. Order is: (1) Node native (`node:*`), (2) third-party
  (`astro/config`, `astro:content`, etc.), (3) internal via `@/` alias,
  (4) type-only imports as a separate group. Biome's organizer does most
  of this — flag human-added imports that break the sequence.
- **Always `info`:** missing `alt=""` on a decorative image, or missing
  `aria-label` on an icon-only link. AGENTS.md DON'T #11. Marked info
  rather than warning because a reviewer often can't tell decorative vs
  informative from context — surface, don't block.

## Don't comment on

- Anything under `.dwp/**` — this is DWP working state (`.dwp/plans/`,
  `.dwp/drafts/`), git-ignored except when a plan is intentionally
  committed. Changes there reflect the current plan lifecycle.
- Anything under `tmp/**` — scratch space, git-ignored except `.gitkeep`.
  Ephemeral by design (see AGENTS.md "Temporary Workspace").
- Anything under `.agents/skills/**` — vendored skills managed by
  `npx skills add` and refreshed by `.github/workflows/release_and_publish.yml`
  Step 1a on every release. Hand-editing them is a bug — the real source
  is upstream.
- Content in `.claude/**` or `.cursor/**`. Both are symlinks to `.agents/`;
  any real edit belongs at the canonical target.
- Formatting inside `src/content/pages/<lang>/*.md`. These are agent-
  Markdown endpoints that MIRROR the rendered HTML pages; the mirror
  intentionally preserves quirks of the source. Substance changes are
  fine to review; formatting nitpicks aren't.
- Line length inside `AGENTS.md` or long-form docs under `docs/**`.
  These files prioritize prose flow over strict wrap. Line-length
  suggestions here are noise.
- `text-gray-400` / `text-gray-500` when used for icon/decoration colors
  where 3:1 large-text ratio holds (icons ≥18pt bold or ≥24pt regular).
  Only flag when they're used for BODY text (see warning above).

## Repo-specific context

- **User-trust invariant (website ↔ skill ↔ skills.sh).** This site is
  the public face of DWP trust. Keep three things aligned: (1) `/trust` +
  well-known manifests tell the truth; (2) adoption copy never teaches
  `curl|sh` / `irm|iex`; (3) the installable skill's
  [skills.sh Security Audits](https://www.skills.sh/dailybothq/deepworkplan-skill/deepworkplan)
  stay Pass. After a skill-side security fix, the skills.sh dashboard
  can lag — that lag is not a green light to weaken website guidance.
  Before merging install/trust/security copy changes, confirm they match
  `docs/SECURITY.md` and do not reintroduce known FAIL vectors.
- **Astro SSG + Svelte islands.** `.astro` is the foundation and default;
  Svelte is for interactive components only, always with a `client:*`
  directive (prefer `client:visible` / `client:idle` over `client:load`).
- **17 active languages, hard-synced.** en (default) + 16 others under
  `[lang]/` dynamic tree. Adding a `<code>.ts` file to
  `src/lib/translations/` auto-registers a language via
  `getActiveLanguages()` — no per-language edits in `src/pages/` needed.
  ALL content changes MUST cover every active language; `pnpm run i18n:check`
  is the gate.
- **Page Wrapper Pattern (MANDATORY).** Every page is exactly THREE files
  regardless of language count: (1) `src/components/pages/<Name>Page.astro`
  (owns the layout + translations), (2) `src/pages/<name>.astro`
  (3-line default-lang wrapper: `<NamePage lang="en" />`), (3)
  `src/pages/[lang]/<name>.astro` (dynamic wrapper enumerating
  `getActiveNonDefaultLanguages()`). Add the slug to `KNOWN_BASE_PATHS`
  in `src/middleware.ts`.
- **Broadsheet editorial voice.** Serious, neutral, technical. No hype,
  no exclamation marks in body copy, sentence-case headings. This is a
  specification-and-methodology site, not a marketing landing page.
- **Two-pillar positioning.** Every user-facing text should reinforce
  either "spec-driven development" (SDD) or "harness engineering — the
  repository is the harness." Watch for copy that drifts into "tool-
  bound" framing.
- **Vendor-neutrality of the DWP name.** The DWP name stands on its own;
  never attribute it to any external author, popular-productivity
  source, or commercial framework. Dailybot appears only where paired
  (companion skill repo, addon-related copy).
- **Agent-friendly Markdown mirrors.** Every rendered HTML page has a
  matching `src/content/pages/<lang>/*.md` endpoint kept in sync
  (`pnpm run md:check`). Content changes to a page MUST update its
  Markdown mirror in every active language.
- **Biome-only lint/format.** No ESLint, no Prettier. `pnpm run biome:check`
  is the gate; `pnpm run biome:fix` for auto-fixes.

## PR hygiene

- PR title in Conventional Commits format (`type(scope): description` —
  `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`).
- If a new page was added → verify: (a) `src/components/pages/<Name>Page.astro`
  exists; (b) `src/pages/<name>.astro` is the 3-line wrapper;
  (c) `src/pages/[lang]/<name>.astro` uses `getActiveNonDefaultLanguages()`;
  (d) `KNOWN_BASE_PATHS` in `src/middleware.ts` includes the slug;
  (e) `pnpm run i18n:check` and `pnpm run md:check` pass.
- If a new translation key was added → verify it exists in EVERY
  `src/lib/translations/*.ts` file (all 17), `types.ts` includes any
  new interface keys, `pnpm run i18n:check` passes.
- If `.review/extension.md` itself changed → confirm the change is
  intentional (this file shapes review severity across every PR going
  forward).
- If any vendored skill was hand-edited (`.agents/skills/*/`) → this is
  almost certainly a bug; the vendored copies are refreshed by
  `release_and_publish.yml` Step 1a on release, not by contributors.
- If install, `/init`, `/trust`, or security docs changed → trust
  checklist: (1) no `curl … | sh` / `wget … | sh` / `irm … | iex` literals
  in the diff; (2) no claim that releases are signed unless signing
  actually shipped; (3) `/trust` + `dwp-trust.json` + `security.txt` still
  point at live disclosure/verify paths; (4) copy stays consistent with
  the skill's Pass posture on
  [skills.sh](https://www.skills.sh/dailybothq/deepworkplan-skill/deepworkplan).
