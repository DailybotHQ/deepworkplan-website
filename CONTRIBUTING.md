# Contributing to deepworkplan-website

Thanks for helping. This repository is the source of
[deepworkplan.com](https://deepworkplan.com): a static Astro site in 17
languages that documents the Deep Work Plan methodology. Changes to the
methodology itself — the skill, the specification text it ships, the kit — start
in [DailybotHQ/deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill).

## Development setup

You need Node.js 24 (CI uses 24.20.0) and pnpm through Corepack, or the dev
container described in [docker/local/README.md](docker/local/README.md).

```bash
git clone https://github.com/DailybotHQ/deepworkplan-website
cd deepworkplan-website
corepack enable
pnpm install
pnpm run dev            # http://localhost:5555
```

## The gate

Run these before you open a pull request; CI runs the same checks:

```bash
pnpm run biome:check                 # lint and format
pnpm run astro:check                 # types
pnpm run test                        # unit tests
pnpm run build                       # production build
pnpm run md:check:strict             # every HTML page has its agent Markdown endpoint
pnpm run i18n:check                  # 17-language parity
bash scripts/check-public-hygiene.sh # nothing private or secret-shaped in tracked files
```

Scoped commands and the map from source to tests are in
[docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md). A behavior change comes with a
test.

Rules that reviews enforce (the full list is in [AGENTS.md](AGENTS.md)):

- Every content change ships in all 17 active languages, with correct
  orthography, and updates the matching `src/content/pages/<lang>/*.md`
  endpoint.
- No hardcoded user-visible strings; approved WCAG AA colors only; the lightest
  hydration that works.
- Never spell a fetch-piped-to-shell install line in a page, translation or doc
  — show download, verify, run.
- Never commit a real credential, a personal absolute path or private context.
  Secret-shaped test data must say it is fake and be listed in
  `.public-hygiene-allow` with a reason.
- Claims about a product or a release trace to a tagged file.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `ci:` — for example
`fix(kit): correct the herdr install line`. Write in English. A Developer
Certificate of Origin sign-off is **not** required.

## Pull requests

1. Branch from `main` (`fix/…`, `feat/…`, `docs/…`).
2. Keep one change per pull request; fill in the template, including the test
   evidence.
3. CI (`ci` — public hygiene, lint and test — and `Code Check`) must be green,
   and one maintainer review is required before merge. The `ready` label runs
   the AI Diff Reviewer self-review.
4. User-visible changes add a line under `[Unreleased]` in
   [CHANGELOG.md](CHANGELOG.md).

Report vulnerabilities privately — see [SECURITY.md](SECURITY.md), never a
public issue. Everyone taking part follows the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Working with AI agents

Coding agents working on this repository start at [AGENTS.md](AGENTS.md)
(`CLAUDE.md` points to it): layout, conventions, the gate and the rules above.
Structured work runs as Deep Work Plans through the vendored `deepworkplan`
skill; plan output lives in the gitignored `.dwp/`.
