# Changelog

All notable changes to this website are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases use
[Semantic Versioning](https://semver.org/). Each release is an annotated
`vX.Y.Z` tag with a GitHub release carrying `SHA256SUMS` (from the release after
this file was introduced). Sections before `[Unreleased]` were generated from the
existing GitHub release notes.

## [Unreleased]

### Changed

- The site vendors the stable Deep Work Plan skill `7.0.0` (verified against its release `SHA256SUMS`); the addon registry `.dwp/config.json` is tracked; pages that described the v7 addons as part of a beta now name the stable `v7.0.0` release.

### Security

- The DeepWorkPlan Vim install chains download, checksum and run with `&&`, so a mismatched SHA-256 stops a pasted install before the script runs.

## [5.0.31] - 2026-10-09

### Added

- Kit pages for the optional v7 addons: `/kit/herdr` (herdr-peers) and `/kit/agentkit` (coding-agents-kit), in 17 languages.
- An ecosystem plate on the kit index: the methodology works alone, and each addon is pinned to a product with its own release.
- Public repository standard: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, this changelog, issue and pull-request templates, `CODEOWNERS`, Dependabot, and `scripts/check-public-hygiene.sh` in a new `ci.yml`.

### Changed

- `/kit/devcontainer` rewritten for devcontainer-kit; `/kit/vim` refreshed for DeepWorkPlan Vim v0.4.2 (installer served byte-identical with its `install.sh.sha256`) and the optional v7 `vim` addon.
- The site vendors the Deep Work Plan skill `7.0.0-beta.1` (a pre-release) to field-test it; `/trust` explains how to verify a pre-release.

### Security

- No page shows a fetch-piped-to-shell install line any more: the DeepWorkPlan Vim install is download, verify the SHA-256, run.
- Private context removed from the container tooling; the public-hygiene check runs on every pull request.

## [5.0.30] - 2026-10-09

### Fixed

- fix(vim): serve the v0.4.2 installer and its sha256 at /vim/ (#97)

## [5.0.29] - 2026-10-09

### Fixed

- fix(vim): serve the v0.4.1 installer and its sha256 at /vim/ (#95)

### Changed

- chore: dogfood vendored skills to dailybot v3.23.3, ai-diff-reviewer v3.3.0

## [5.0.28] - 2026-10-01

### Fixed

- fix(i18n): use 'create' wording for authoring in de/es/fr/pt kit tables
- fix(i18n): correct 'forms authoring' translations in the Dailybot copy
- fix: restamp public/api/v1 to the current package version

### Changed

- docs: correct the vendored ai-diff-reviewer version in provenance (v3.2.2)
- docs: point ai-diff-reviewer pins and kit page at v3.2.2
- chore(skill): vendor deepworkplan v6.0.2 and update docs
- docs: update Dailybot addon docs to skill 3.23.2 across all languages
- chore(addon): bump vendored dailybot skill to v3.23.2

## [5.0.27] - 2026-09-28

### Added

- feat(dev): public herdr/mu-vim local stack with opt-in CLIs

### Fixed

- fix(dev): create missing .env files from .env.example
- fix(dev): install DeepWorkPlan Vim in the container image

### Changed

- docs(home): sharpen resource-efficiency narrative
- chore: refresh generated public indexes
- docs(changelog): clarify Russian reviewer headline
- docs(methodology): remove repeated plan guidance
- docs(spec): remove duplicate state version scope
- docs(kit): place generation checks under behavior
- chore(addon): bump vendored dailybot skill to v3.16.1
- chore: regenerate derived public artifacts left stale by the v5.5.4 skill bump
- Update docker

## [5.0.26] - 2026-09-28

### Fixed

- fix(docs): align website API stamps with package version

### Changed

- chore: dogfood vendored skills to dailybot v3.16.1, ai-diff-reviewer v3.2.2
- docs: align website with DeepWorkPlan v6.0.1
- docs(v6): finish Vietnamese v5 state scope
- chore(dwp): vendor DeepWorkPlan skill v6.0.0
- docs(v6): scope translated state guidance to v5 plans
- docs(v6): close quickstart schema and legacy state gaps
- docs(v6): clarify retained spec and release ordering
- docs(spec): mark v6 current in every locale
- docs(v6): publish current release guidance across website
- docs(changelog): finish aligning the ru reviewer terminology
- docs(changelog): align the ru update section on the established reviewer term

## [5.0.25] - 2026-09-25

### Fixed

- fix(api): re-stamp v1 files to 5.0.24 after syncing with main

### Changed

- chore: dogfood vendored skills to dailybot v3.15.0
- docs(changelog): fix reviewer sourceLinks URLs and translation nits (16 languages)
- docs(changelog): document the AI Diff Reviewer v3 upgrade in the v5 changelog (17 languages)

## [5.0.24] - 2026-09-25

### Fixed

- fix(api): re-stamp v1 files to 5.0.23

### Changed

- chore: dogfood vendored skills to dailybot v3.14.1
- docs: init.md reviewer bullet on v3 with verified criticals; vi migration wording; workflow non-fork guard
- docs(pages): move the zh BC-07 aside to the verified-criticals sentence
- docs(pages): full-width punctuation and correct placement for ja/zh BC-07 asides
- docs(pages): reposition the BC-07 parentheticals to their sentences (7 quickstarts)
- docs(pages): land the parenthetical repositions and workflow concurrency fixes; dedupe header citation
- docs: vendor-neutral meta descriptions (17 languages), init.md pin to v3.1.1, ARCHITECTURE.md reviewer section current
- docs(pages): verified criticals + BC-04 timeout in quickstart for the remaining 10 languages
- docs(pages): verified criticals + BC-04 timeout in quickstart (17 languages); fr meta gender; workflow note
- chore(skills): dogfood vendored skills to latest (deepworkplan 5.5.3, ai-diff-reviewer 3.1.1, dailybot 3.14.0)
- docs(kit): correct the grok-4.3 sentence under the v3.0 prompt (exp-grok-4-3 re-measurement)
- docs: mirror the reviewer workflow update in AGENTS.md
- ci: complete task 14 - add the label-gated grok self-review workflow
- docs(pages): complete task 13 - bring the agent Markdown endpoints to AI Diff Reviewer v3
- docs(kit,spec): complete task 11 - sync the AI Diff Reviewer v3 content across all 16 languages
- docs(spec): complete task 10 - bring the addons spec page's reviewer section to v3
- docs(kit): complete task 9 - rewrite the AI Diff Reviewer kit page for v3

## [5.0.23] - 2026-09-21

### Added

- feat(docker): add dev.sh launcher and unify .env/PATH across shells

### Fixed

- fix: stamp public/api/v1 version to 5.0.22

## [5.0.22] - 2026-09-17

### Added

- feat: upgrade the skill to v5.5.1 and teach the v2.3.1 check-status contract

### Fixed

- fix: stamp public/api/v1 version to 5.0.21

### Changed

- Update host and docker changes
- docs: pin AI Diff Reviewer to v2.3.1

## [5.0.21] - 2026-09-17

### Added

- feat: upgrade the skill to v5.5.0 and reconcile working principles

## [5.0.20] - 2026-09-17

### Added

- feat: carry the v5.4.0 rules into the adoption prompt, and retire the launch bar

### Fixed

- fix(dev): serve Markdown endpoints as UTF-8 in the dev server
- fix: resolve local review findings on this branch
- fix: restamp API v1 artifacts for v5.0.19
- fix(docker): remove claude-xai support and add SSH server for herdr remote access

### Changed

- docs(changelog): record the v5.4.0 point release on the v5 entry
- chore: upgrade vendored deepworkplan skill to v5.4.0 and reconcile the harness
- docs: rewrite the AI Diff Reviewer kit page opening in all 17 languages
- docs: refresh stale evidence strings in the gate registry
- chore: scope plan analysis output to the plan folder and ignore build symlinks
- docs: re-adapt vendored deepworkplan skill for AI Diff Reviewer v2.3.0
- docs(i18n): sync AI Diff Reviewer v2.3.0 content across 16 languages
- docs: document AI Diff Reviewer v2.3.0 in English content
- chore: dogfood vendored ai-diff-reviewer to v2.3.0

## [5.0.19] - 2026-09-15

### Fixed

- fix: restamp API v1 artifacts for v5.0.18
- fix: restamp API v1 artifacts for current release
- fix: declare Deprecation/Sunset header schemas in OpenAPI v1 responses
- fix: remove claude-xai command (xAI lacks Anthropic-compatible endpoint)

### Changed

- test: add biome-ignore for intentional template placeholder checks
- test: suppress biome noTemplateCurlyInString warnings in navigation test

## [5.0.18] - 2026-09-15

### Fixed

- fix(api): restamp versioned artifacts for current release
- fix(footer): use full content width for footer sections

## [5.0.17] - 2026-09-15

### Fixed

- fix: restamp API v1 artifacts for current release
- fix: support Codex continue wrapper flag

## [5.0.16] - 2026-09-15

### Fixed

- fix: stamp api v1 artifacts for v5.0.15
- fix: rename Cline Azure wrapper command

## [5.0.15] - 2026-09-15

### Fixed

- fix: resolve Thai language build errors and update lint issues

### Changed

- chore: update docker files and Vietnamese FAQ after AI wrappers improvements
- chore: improve AI assistant wrappers in custom_commands.sh

## [5.0.14] - 2026-09-14

### Changed

- copy: change the homepage primary CTA from "view the quickstart" to "see how it works"
- chore: re-stamp public API artifacts to v5.0.13

## [5.0.13] - 2026-09-14

### Added

- feat: re-enable the Product Hunt launch announcement bar

### Changed

- style: drop the pill badge from the announcement bar, align copy to "by design"
- chore: re-stamp public API artifacts to v5.0.12

## [5.0.12] - 2026-09-14

### Fixed

- fix: serve real single-hop 301 redirects for /init, /setup, /onboarding, /docs

## [5.0.11] - 2026-09-14

### Fixed

- fix: close is-agentic.com agent-readiness gaps (RFC 9727, MCP surface, auth.md, JSON .md twins)

### Changed

- chore: re-stamp public API artifacts to v5.0.10

## [5.0.10] - 2026-09-14

### Fixed

- fix(init.md): route to the upgrade sub-skill when DWP is already installed

### Changed

- chore: re-stamp public API artifacts to v5.0.9

## [5.0.9] - 2026-09-13

### Fixed

- fix: eliminate horizontal scroll on /developers (mobile)

### Changed

- chore: re-stamp public API artifacts to v5.0.8

## [5.0.8] - 2026-09-13

### Added

- feat: extend /developers with skill commands and plan-format guidance

### Changed

- chore: re-stamp public API artifacts to v5.0.7

## [5.0.7] - 2026-09-13

### Changed

- docs: fix stale bilingual EN/ES claims in product spec and agent onboarding

## [5.0.6] - 2026-09-13

### Added

- feat(routing): consolidate /init, /setup, /onboarding into /quickstart

### Fixed

- fix(i18n): translate remaining English strings in th.ts quickstartPage
- fix(i18n): align Touched Surface terminology within ko/pl quickstart.md

### Changed

- docs(spec): sync spec docs, efficiency wording, and claims to skill v5.3.0
- chore(trust): stamp dwp-trust.json's skill version from the vendored pack

## [5.0.5] - 2026-09-13

### Added

- feat(footer): regroup sitemap links into labeled columns
- feat(seo): Organization sameAs for GitHub/npm entities + external indexing ledger - Task 5 of PLAN_is_agentic_100_round2
- feat(header): add Developers link to Resources dropdown
- feat(agents): 404 recovery Link headers + markdown full-credit hardening - Task 3 of PLAN_is_agentic_100_round2
- feat(api): OpenAPI named component schemas + JSON content for negotiated ops - Task 2 of PLAN_is_agentic_100_round2
- feat(api): JSON content negotiation envelope for page mirrors - Task 1 of PLAN_is_agentic_100_round2

### Fixed

- fix(agents): restore missing /developers, /init, /privacy links in agent-facing Markdown site navigation - Task 7 of PLAN_is_agentic_100_round2

### Changed

- chore: regenerate api/v1 artifacts at v5.0.4
- chore(skill): upgrade vendored deepworkplan to v5.3.0
- docs(changelog): translate-sync the v5 narrative refinement across 16 languages
- test(nav): update Resources dropdown contract for the Developers link
- test(agents): round-2 surface prober rows + live verification evidence - Task 6 of PLAN_is_agentic_100_round2
- docs(changelog): name the v5 contract and reinforce the maturity narrative - Task 1 of PLAN_changelog_v5_narrative_refinement

## [5.0.4] - 2026-09-13

### Changed

- chore: regenerate api/v1 artifacts at v5.0.3
- chore(skill): upgrade vendored deepworkplan to v5.2.0

## [5.0.3] - 2026-09-13

### Added

- feat(schema): publish v2 and v5 plan schemas with a resolve-guard test — Task 17 of PLAN_v5_superiority_guarantee
- feat(seo): canonical brand identity + external SEO ledger — Task 8 of PLAN_is_agentic_100
- feat(cli): official zero-dependency deepworkplan CLI package — Task 6 of PLAN_is_agentic_100
- feat(openapi): typed inline schemas, v1 ops, header contracts — Task 5 of PLAN_is_agentic_100
- feat(api): RFC 9331 rate-limit headers + best-effort edge limiter — Task 4 of PLAN_is_agentic_100
- feat(api): /api/v1 versioned agent API + deprecation contract — Task 3 of PLAN_is_agentic_100
- feat(agents): markdown 404 recovery for non-HTML clients — Task 2 of PLAN_is_agentic_100

### Fixed

- fix(cli): keep the unscoped package name; org listing via the publishing account

### Changed

- docs(cli): record the npm namespace strategy — bare name for the website client, @deepworkplan scope for future methodology tooling
- test(schema): assert the four published schema files exist — Task 17 of PLAN_v5_superiority_guarantee
- docs(content): align public claims with the v5 fresh-agent evaluation across 17 locales — Task 17 of PLAN_v5_superiority_guarantee
- ci(cli): publish the deepworkplan CLI with website releases
- chore(review): final review fixes — Task 10 of PLAN_is_agentic_100
- test(agents): agent-surface verification suite + live re-scan runbook — Task 9 of PLAN_is_agentic_100
- docs(developers): v1 API, versioning, rate limits, CLI across 17 locales — Task 7 of PLAN_is_agentic_100
- docs(agents): crawler reachability runbook + probe script — Task 1 of PLAN_is_agentic_100

## [5.0.2] - 2026-09-12

### Added

- feat(faq): audit and refresh FAQ for DWP v5 across 17 locales — Task 14 of PLAN_v5_phase2_validation
- feat(changelog): add DWP v5 entry across 17 locales — Task 12 of PLAN_v5_phase2_validation

### Changed

- chore(skill): upgrade vendored deepworkplan to v5.1.0
- docs(skill): teach translate-sync to derive md endpoints from edited ts — Task 15 of PLAN_v5_phase2_validation
- docs(site): align every public claim with DWP v5 facts — Task 13 of PLAN_v5_phase2_validation

## [5.0.1] - 2026-09-12

### Fixed

- fix(docs): correct catalog rows for the design-system and ai-diff-reviewer add-ons
- fix(spec): align Lite approval contract and plan-local analysis_results evidence in all 17 locales
- fix(kit): align addon consent matrix across spec, kit and methodology in all 17 locales
- fix(faq): correct stale gate-failure, Lite-default and upgrade answers in all 17 locales

### Changed

- chore(release): bump site version to 5.0.0
- chore(harness): vendor deepworkplan skill v5.0.0 (released final-hardening tag)
- chore(harness): re-vendor deepworkplan to skill HEAD 199ec1b (author hardening + plan-local analysis_results)
- chore(harness): vendor the final-hardened deepworkplan skill (pre-release sync)

## [4.0.5] - 2026-09-11

### Fixed

- fix(ci): re-baseline the mobile Lighthouse floor and vendor the skill at v4.0.3
- fix(harness): close both conformance findings and vendor the skill at v4.0.2

## [4.0.4] - 2026-09-11

### Changed

- docs(readme): tell the full methodology narrative and correct the dogfood claim

## [4.0.3] - 2026-09-11

### Fixed

- fix(init): align the adoption prompt with DWP 2.4.0 across all 17 languages

### Changed

- chore(skills): vendor the Deep Work Plan skill at v4.0.1
- perf(images): optimize OG default images to documented spec

## [4.0.2] - 2026-09-11

### Fixed

- fix(lighthouse): create .lighthouseci/ before lhci autorun

### Changed

- docs(performance): document the mobile Lighthouse score's CPU-throttle noise

## [4.0.1] - 2026-09-11

### Added

- feat(aeo): add md/html content-parity audit tool and run it - Task 6 of PLAN_site_v4_seo_aeo_audit
- feat(seo): add site-wide SEO audit tool and run it - Task 2 of PLAN_site_v4_seo_aeo_audit
- feat(home): represent Lite-first plans in the homepage narrative - Task 7 of PLAN_dwp_v4_site_alignment
- feat(compare): add capability rows where alternatives lead, not DWP - Tasks 3-4 of PLAN_compare_page_fact_audit

### Fixed

- fix(aeo): create output directory before writing content-parity report
- fix(aeo): resolve confirmed md/html content-parity gaps - Task 7 of PLAN_site_v4_seo_aeo_audit
- fix(aeo): resolve confirmed AEO surface findings - Task 5 of PLAN_site_v4_seo_aeo_audit
- fix(diagrams): remove refined-draft references from create/output-workspace figures - Task 6 of PLAN_dwp_v4_site_alignment
- fix(faq): correct Turkish aorist grammar error in FAQ - Task 6 follow-up of PLAN_faq_content_audit
- fix(faq): apply accuracy and writing corrections to English FAQ source - Task 3 of PLAN_faq_content_audit
- fix(nav): reorder Resources dropdown to Examples, Trust, FAQ, Compare
- fix(compare): resolve generator paths from script location, not cwd
- fix(compare): restore agent-markdown endpoint parity across 17 languages - Task 5 of PLAN_compare_page_fact_audit
- fix(compare): apply fact-audit corrections and surface alternatives' strengths - Task 2 of PLAN_compare_page_fact_audit

### Changed

- chore(og): refresh localized default OG images across all 17 languages
- docs(aeo): run site-wide AEO surface audit - Task 4 of PLAN_site_v4_seo_aeo_audit
- chore(release): bump site version to 4.0.0 - Task 1 of PLAN_site_v4_seo_aeo_audit
- Product hun link
- docs(kit): describe Lite-first create and refine promote - Task 5 of PLAN_dwp_v4_site_alignment
- docs(methodology): describe Lite-first create flow - Task 4 of PLAN_dwp_v4_site_alignment
- docs(spec): fix stale version banner and draft-flow references - Task 3 of PLAN_dwp_v4_site_alignment
- docs(spec): introduce Lite-first plans into the spec reader - Task 2 of PLAN_dwp_v4_site_alignment
- test(faq): validate FAQ parity, links and mirror content across 17 languages - Task 6 of PLAN_faq_content_audit
- i18n(faq): sync FAQ corrections across locale batch B - Task 5 of PLAN_faq_content_audit
- i18n(faq): sync FAQ corrections across locale batch A - Task 4 of PLAN_faq_content_audit
- test(compare): assert DWP isn't structurally the leader on every row
- docs(changelog): tell the DWP v1-v4 story and complete missing translations
- chore: dogfood vendored deepworkplan skill to v4.0.0
- Merge branch 'main' into chore/prepare-v3.0.0

## [3.0.1] - 2026-09-10

### Changed

- chore(ci): remove AI reviewer workflow
- chore(release): prepare v3.0.0

## [2.0.1] - 2026-09-10

### Added

- feat(faq): expand adoption and execution guidance
- feat(compare): ship full comparison and FAQ experience
- feat(nav): Resources disclosure in the header, Compare and FAQ in footer and mobile menu - Task 5 of PLAN_compare_and_faq_pages
- feat(pages): objective comparison page with capability matrix and Markdown endpoint - Task 4 of PLAN_compare_and_faq_pages
- feat(pages): FAQ page with FAQPage JSON-LD and agent Markdown endpoint - Task 3 of PLAN_compare_and_faq_pages
- feat(i18n): translation keys and English copy for FAQ, compare and navigation - Task 2 of PLAN_compare_and_faq_pages
- feat(content): comparison policy, FAQ source and compare data model - Task 1 of PLAN_compare_and_faq_pages

### Fixed

- fix(perf): prevent duplicate hero image loads
- fix(perf): prioritize hero artwork
- fix(perf): optimize assets for lighthouse
- fix(review): align task anatomy and navigation
- fix(i18n): align init HowTo step with single Final Review - Task 33 of PLAN_dwp_token_efficiency_upgrade
- fix(content): align Final Review copy, diagram lang props and ten-section anatomy - Task 32 of PLAN_dwp_token_efficiency_upgrade
- fix(a11y): TaskAnatomy aria-labels list all ten sections; correct nine-to-ten captions (id/pl/uk) - Task 25 follow-up of PLAN_dwp_token_efficiency_upgrade

### Changed

- docs(init): align adoption prompt with current standard
- docs(site): clarify AI-native SDLC source positioning - Task 8 of PLAN_compare_and_faq_pages
- docs(site): document compare and FAQ pages and AI-native SDLC - Task 8 of PLAN_compare_and_faq_pages
- i18n: translate FAQ and Compare pages across all 16 non-EN locales - Tasks 6-7 of PLAN_compare_and_faq_pages
- i18n(ja,th): complete the Tasks 24-26/31 change set - Task 29 of PLAN_dwp_token_efficiency_upgrade
- i18n(id,hi): complete the Tasks 24-26/31 change set - Task 30 of PLAN_dwp_token_efficiency_upgrade
- i18n(pl,ru): complete the Tasks 24-26/31 change set - Task 28 of PLAN_dwp_token_efficiency_upgrade
- i18n(pt,fr): complete the Tasks 24-26/31 change set - Task 27 of PLAN_dwp_token_efficiency_upgrade
- i18n: mirror the required-local-review amendment strings into all 16 locales - Task 31 follow-up of PLAN_dwp_token_efficiency_upgrade
- chore(skill): re-mirror vendored deepworkplan from upstream 69b03ea (resumable materialization) - dogfood of PLAN_dwp_token_efficiency_upgrade Task 23
- Update readme
- i18n: sync Final Review, Touched Surface and AI Diff Reviewer baseline across remaining locales
- i18n: complete ten-section anatomy in core-loop across en/es/pt/fr/it/ru - Tasks 27-28 of PLAN_dwp_token_efficiency_upgrade
- i18n(ru): insert Touched Surface item and renumber - Task 28 of PLAN_dwp_token_efficiency_upgrade
- i18n(ru): insert Touched Surface item and renumber - Task 28 of PLAN_dwp_token_efficiency_upgrade

## [1.0.86] - 2026-09-08

### Fixed

- fix: strip Agentmap from robots.txt for Lighthouse (SEO 100)

## [1.0.85] - 2026-09-08

### Fixed

- fix: re-stamp versioned artifacts in the release commit
- fix: llms.txt follows recommendations (markdown links), harden robots rewrite

## [1.0.84] - 2026-09-08

### Added

- feat: agent readiness surface — OpenAPI spec, MCP server, JSON errors, /developers + /privacy

### Fixed

- fix: address AI review findings on PR #53

## [1.0.83] - 2026-09-08

### Changed

- chore(dogfood): update vendored deepworkplan skill to v2.17.1

## [1.0.82] - 2026-09-08

### Fixed

- fix(kit): pin Dailybot skill install paths, drop unpinned git clone row

## [1.0.81] - 2026-09-08

### Added

- feat(aeo): publish ARD ai-catalog manifest for agent resource discovery

## [1.0.80] - 2026-09-07

### Added

- feat(docker): quiet astro build logs and auto-retry virtiofs flake
- feat(docker): add Z.AI GLM wrappers and bump Node to 24.20.0

### Changed

- chore: dogfood vendored skills to dailybot v3.13.0, ai-diff-reviewer v2.0.1
- chore(deps): full upgrade to astro 7.3.1, mdx 8, vitest 5, satteri 0.10.5

## [1.0.79] - 2026-07-16

### Changed

- ci(release): stop auto-refreshing repo-adapted deepworkplan skill

## [1.0.78] - 2026-07-16

### Added

- feat: upgrade to Astro 7 with Sätteri markdown pipeline

## [1.0.77] - 2026-07-16

### Added

- feat(aeo): add Markdown access hint after Canonical in agent .md

### Fixed

- fix(content): address AI review on fifth-addon docs
- fix(content): remove invalid YAML escape in FR kit frontmatter
- fix(i18n): escape Ukrainian apostrophe in five-addons strings

### Changed

- UPdate
- perf(docker): cache git dirty check in bash prompt
- docs: document AI Diff Reviewer as fifth shipping addon

## [1.0.76] - 2026-07-16

### Added

- feat(review): upgrade AI Diff Reviewer to v2 with skip-ai-review

### Changed

- chore: dogfood deepworkplan v2.17.0 with ai-diff-reviewer addon
- chore: complete plan executive report
- chore: skills & agents discovery for ai-diff-reviewer plan
- chore: complete plan security review
- docs: describe pr-review workflow and three-skill vendoring
- chore(release): dogfood ai-diff-reviewer alongside deepworkplan and dailybot on every release
- chore(review): add Cursor-based pr-review workflow gated on ready label
- chore(review): add repo-tailored .review/extension.md for website
- chore(review): install ai-diff-reviewer v1.7.0 vendored

## [1.0.75] - 2026-07-15

### Added

- feat(ci): dogfood vendored skills on every website release

### Changed

- chore: dogfood vendored skills to deepworkplan v2.16.3

## [1.0.74] - 2026-07-14

### Added

- feat: upgrade Dailybot skill to 3.10.3 and refresh addon docs

### Changed

- chore: dogfood deepworkplan skill v2.16.1
- Update docker dailybot cli vversion

## [1.0.73] - 2026-07-11

### Added

- feat: install deepworkplan skill v2.16.0 with .cursor → .agents symlink support

### Changed

- docs: align init page with deepworkplan skill v2.15.1
- chore: pin deepworkplan skill to v2.15.1
- docs: upgrade Dailybot skill to 3.4.0 and expand addon documentation
- Update dockerfile version

## [1.0.72] - 2026-06-19

### Changed

- chore: retire Product Hunt launch surfaces, make announcement bar toggleable

## [1.0.71] - 2026-06-17

### Added

- feat: add Product Hunt launch bar and footer badge (i18n, temporary)

### Fixed

- fix: self-host Product Hunt footer badge to keep best-practices at 1.0

## [1.0.70] - 2026-06-17

### Changed

- chore: vendor deepworkplan and dailybot agent skills into the repo

## [1.0.69] - 2026-06-12

### Added

- feat: update design-system addon narrative to interface-surface profiles + dogfood DWP 2.15.0

## [1.0.68] - 2026-06-12

### Changed

- chore: pin dailybot agent skill 1.7.1 in skills-lock.json (dogfood via DWP dailybot addon)
- chore: re-pin deepworkplan skill to 2.14.1 (dogfood latest release)

## [1.0.67] - 2026-06-12

### Fixed

- fix(docker): pin /usr/local/bin first in PATH for all shell types

### Changed

- content: note current Dailybot agent skill (1.7.x) + team chat in the addon doc (17 languages)
- content: elevate security to a first-class methodology pillar (17 languages)

## [1.0.66] - 2026-06-10

### Changed

- content: sync the /init agent prompt with addon reality (hooks + missing design-system bullet, 17 languages)

## [1.0.65] - 2026-06-10

### Changed

- content: document the Dailybot addon's autonomous hook enforcement in the kit catalog (17 languages)

## [1.0.64] - 2026-06-10

### Added

- feat: wire Dailybot deterministic hook enforcement for autonomous agent reporting

## [1.0.63] - 2026-06-10

### Added

- feat(docker): install the Dailybot CLI in the dev container with persistent auth
- feat(agents): wire the DWP Dailybot addon — lifecycle reporting for dogfooding

### Changed

- ci(lighthouse): audit the 2 distinct layout templates instead of 4 URLs
- perf(header): stop bundling all 17 locale files into the header island
- chore(agents): set dailybot repo identity name to deepworkplan.com
- chore(aeo): reference deepworkplan-skill v2.12.0 in dwp-trust.json

## [1.0.62] - 2026-06-09

### Changed

- docs(init): include the agent-workspace archetype in the adoption prompt (17 languages)

## [1.0.61] - 2026-06-09

### Added

- feat(aeo): publish /.well-known/dwp.json descriptor and versioned plan schemas
- feat(spec): methodology spec v1.2 — plan state, rigor tiers, resume protocol, agent workspace (17 languages)

### Changed

- chore(aeo): reference deepworkplan-skill v2.11.0 in dwp-trust.json

## [1.0.60] - 2026-06-09

### Changed

- test(analytics): cover src/lib/analytics.ts (trackEvent, scroll depth, outbound)

## [1.0.59] - 2026-06-09

### Added

- feat(spec): make test & validation discipline a first-class part of the loop

### Changed

- docs(spec): bump changed spec docs to Version 1.1

## [1.0.58] - 2026-06-07

### Added

- feat(analytics): track home hero CTAs - Task 2 of PLAN_analytics_event_coverage
- feat(analytics): track copy init.md (home + /init) - Task 1 of PLAN_analytics_event_coverage

### Fixed

- fix(home): show section illustrations on mobile and equalize pitch paragraph sizing

### Changed

- ci(lighthouse): lower mobile performance floor to 0.95 (desktop stays 1.00)
- chore: gitignore .wrangler local cache
- docs(analytics): unify + document the event taxonomy - Task 5 of PLAN_analytics_event_coverage
- refactor(analytics): wire scroll_depth, curate dead events - Task 3 of PLAN_analytics_event_coverage

## [1.0.57] - 2026-06-07

### Added

- feat(design): add root DESIGN.md (Broadsheet) via design-system addon - Task 3 of PLAN_design_system_addon

### Changed

- docs(agents): add design-system add-on to the skills & agents catalog
- docs(site): document the design-system addon across all 17 languages
- refactor(design): move DESIGN.md to docs/ and index it in AGENTS.md

## [1.0.56] - 2026-06-06

### Added

- feat(init): copy-paste full init.md into agent + visible endpoint URL

## [1.0.55] - 2026-06-06

### Fixed

- fix(agent-ready): point agent_auth.skill to own /auth.md per auth.md spec

## [1.0.54] - 2026-06-06

### Fixed

- fix(agent-ready): non-empty scopes_supported so auth.md PRM validator passes

## [1.0.53] - 2026-06-06

### Changed

- chore(dwp): pin reference skill to v2.5.0 (skills-lock.json)

## [1.0.52] - 2026-06-06

### Changed

- chore: sync references to skill v2.5.0 (PRODUCT_SPEC.md now required)

## [1.0.51] - 2026-06-05

### Changed

- ci(lighthouse): lower mobile performance floor to 0.96 (desktop stays 1.00)
- perf(markdown): adopt Sätteri (Rust) processor + refresh dependencies

## [1.0.50] - 2026-06-05

### Added

- feat: expand agent matrix to 3×3, restore presets section, broaden kit catalog
- feat(methodology): strengthen archetypes page narrative + add comparison diagram
- feat(home): remove stacks/presets section from the homepage
- feat(home): copy button copies the canonical English command in every language

## [1.0.49] - 2026-06-05

### Added

- feat(trust): route security disclosure to the repo Security tab; no email, no SLA, no bounty
- feat(trust): cross-link + verify trust surface, footer/nav link - Task 7 of PLAN_trust_and_security
- feat(trust): ship skill TRUST.md + align spec safety section (17 langs) - Task 6 of PLAN_trust_and_security
- feat(trust): add multilingual /trust security page - Task 5 of PLAN_trust_and_security
- feat(trust): harden /init with provenance + verify-before-run guidance - Task 4 of PLAN_trust_and_security
- feat(trust): add security policy + security.txt disclosure - Task 3 of PLAN_trust_and_security
- feat(trust): provenance & integrity model + trust manifest - Task 2 of PLAN_trust_and_security
- feat(trust): repo selector in header + central repo-URL constants - Task 1 of PLAN_trust_and_security

### Fixed

- fix(home): refine copy-button feedback states (cursor, disabled, aria-label)

### Changed

- chore(trust): bump skill version reference to v2.3.0 in trust manifest
- chore(trust): skills & agents discovery - Task 8 of PLAN_trust_and_security

## [1.0.48] - 2026-06-05

### Changed

- docs(audit): align README, AGENTS, docs/, .agents/, internal hub with current site state

## [1.0.47] - 2026-06-04

### Fixed

- fix(compat): cross-browser audit — Safari Private mode, iOS notch, color-mix fallback

## [1.0.46] - 2026-06-04

### Changed

- Maintenance release

## [1.0.45] - 2026-06-04

### Fixed

- fix(ui): style language-switcher scrollbar to match paper palette
- fix(ui): match language switcher dropdown to editorial paper palette

## [1.0.44] - 2026-06-04

### Added

- feat(og): localize Open Graph images for 15 new languages

### Changed

- style(og): biome formatter wrap in resolveDefaultOgImage

## [1.0.43] - 2026-06-04

### Added

- feat(diagrams): translate all 21 editorial diagrams into 15 new languages
- feat(visuals): add not-found offmap engraving + visual inventory updates
- feat(i18n): translate full site into 15 languages (pt,zh,ja,de,fr,ko,ru,it,tr,id,vi,hi,pl,uk,th) - Tasks 8-22 of PLAN_i18n_global_expansion
- feat(i18n): add translation style guide, scaffolding and QA tooling - Task 7 of PLAN_i18n_global_expansion
- feat(ui): show full language name with code in switcher dropdown - Task 6 of PLAN_i18n_global_expansion
- feat(init): pin bootstrap to canonical English /init.md across locales - Task 3 of PLAN_i18n_global_expansion
- feat(i18n): register 16 languages and derive availability - Task 1 of PLAN_i18n_global_expansion

### Fixed

- fix(routing): strip any registered-language prefix from entry id (slugOf)

### Changed

- ci(lighthouse): relax mobile performance to 0.97 (others stay 1.00)
- chore: silence Astro 6.4 markdown deprecation + bump biome schema
- i18n: translate bootstrap instruction prose (URL stays canonical English)
- perf(dev): Vite warmup + explicit per-language Tailwind exclusion
- perf(dev): upgrade Astro 6.4.4 + MDX 6 + scope Tailwind + Vite watch ignores
- chore(agents): add add-language skill + N-language catalog updates - Task 24 of PLAN_i18n_global_expansion
- refactor(middleware): derive route allowlist from language registry - Task 5 of PLAN_i18n_global_expansion
- refactor(routing): collapse per-language wrappers into dynamic [lang] routes - Task 4 of PLAN_i18n_global_expansion
- Merge remote-tracking branch 'origin/main' into feat/i18n-global-expansion
- refactor(i18n): derive SEO/agent/redirect output from registry - Task 2 of PLAN_i18n_global_expansion

## [1.0.42] - 2026-06-04

### Added

- feat(seo): align home meta title with context-first narrative

## [1.0.41] - 2026-06-03

### Added

- feat(seo): serve Spanish OG image on /es pages
- feat(seo): refresh OG image with context-first narrative
- feat(seo,aeo): context-first narrative across meta + shorten all collection descriptions

## [1.0.40] - 2026-06-03

### Fixed

- fix(agent-ready): satisfy auth.md check — PRM bearer_methods=[header] + agent_auth anonymous method (skill, register_uri, claim_uri)

## [1.0.39] - 2026-06-03

### Added

- feat(agent-ready): add auth.md + agent_auth metadata, WebMCP runtime tools, fix MCP card/api-catalog (isitagentready) - PLAN_interactive_diagram_components
- feat(home): add HP-06 final-CTA ornament (compass rose, light/dark) - PLAN_interactive_diagram_components
- feat(home): pitch nautical-chart illustration in two-column layout (light/dark, bilingual alt); drop old inline mark - PLAN_interactive_diagram_components
- feat(home): add HP-02 pitch mark (chaos -> ordered plan, light/dark) + clearer prompt - PLAN_interactive_diagram_components
- feat(home): wire HP-01 hero lighthouse illustration (light/dark, lazy, bilingual alt) - PLAN_interactive_diagram_components
- feat(diagrams): homepage diagram components - Task 7 of PLAN_interactive_diagram_components
- feat(diagrams): kit feature diagram components - Task 6 of PLAN_interactive_diagram_components
- feat(diagrams): kit command diagram family - Task 5 of PLAN_interactive_diagram_components
- feat(diagrams): spec diagram components - Task 4 of PLAN_interactive_diagram_components
- feat(diagrams): methodology diagram components - Task 3 of PLAN_interactive_diagram_components
- feat(diagrams): editorial-asset primitives + embedding + CoreLoop reference - Task 2 of PLAN_interactive_diagram_components

### Fixed

- fix(diagrams): non-heading labels inside role=img figures (a11y 1.0) + finalize embedding decision - PLAN_interactive_diagram_components

### Changed

- chore(home): update HP-02 chart + force exact page-color background (feathered composite) - PLAN_interactive_diagram_components
- chore(home): update HP-02 pitch nautical-chart illustration (light/dark) - PLAN_interactive_diagram_components
- revert(home): remove final-CTA ornament (HP-06) — added little; scrub from docs - PLAN_interactive_diagram_components
- docs(visuals): remove HP-06/07/08 icon sets entirely; renumber ornament HP-09 → HP-06; update all coverage/counts - PLAN_interactive_diagram_components
- docs(visuals): clarify illustrations are wordless; mark HP-03/04/05 as built diagram components (not image-gen) - PLAN_interactive_diagram_components
- chore(home): update pitch nautical-chart illustration (corrected backgrounds) - PLAN_interactive_diagram_components
- docs(visuals): make exact background fill (#F7F4EC / #14140F) unmistakable in illustration prompts + STYLE_GUIDE - PLAN_interactive_diagram_components
- docs(visuals): bake 'no frame, feather into background, nothing clipped' into all illustration prompts + STYLE_GUIDE - PLAN_interactive_diagram_components
- chore(home): update hero faro illustration (light + dark) - PLAN_interactive_diagram_components
- style(home): full-viewport-height hero on desktop (centered), tighter spacing - PLAN_interactive_diagram_components
- style(home): responsive hero — tighter rhythm (CTAs above fold), larger faro on desktop, shown md+ - PLAN_interactive_diagram_components
- chore(skills): add add-diagram-component skill (skills & agents discovery) - Task 10 of PLAN_interactive_diagram_components
- refactor(diagrams): embed all diagrams in-body via MDX at narrative anchors; drop reader lead-injection - PLAN_interactive_diagram_components
- refactor(diagrams): embed onboard diagram in-body via MDX (placement fix) - PLAN_interactive_diagram_components
- docs(diagrams): multi-language readiness (pt proof) + catalog built - Task 8 of PLAN_interactive_diagram_components
- docs(diagrams): feasibility verdict + editorial interactive asset standard - Task 1 of PLAN_interactive_diagram_components
- chore(skills): skills & agents discovery - Task 7 of PLAN_site_visual_prompt_pack

## [1.0.38] - 2026-06-02

### Added

- feat(brand): replace default OG card with on-brand Deep Work Plan design
- feat(brand): regenerate all logo assets from the editorial serif monogram
- feat(kit,init): surface the verify sub-skill (/dwp-verify) across the site
- feat(brand): give Dailybot visibility (footer + origin), engineering-as-marketing
- feat(home): drop the manual-install box; frame the skill as engine, repo as adapted
- feat(init): point the instruction at /init.md and harden the onboarding prompt
- feat(home): center the homepage on the single /init instruction

### Fixed

- fix(pages): responsive reader tables + contact heading order - Task 5 of PLAN_responsive_quality_audit
- fix(home): verify homepage sections responsive across breakpoints - Task 4 of PLAN_responsive_quality_audit
- fix(layout): resolve label-content-name-mismatch across brand links - Task 3 of PLAN_responsive_quality_audit
- fix(theme): default to light on first visit, ignore device prefers-color-scheme
- fix(quality): confirm green baseline (lint/types/tests/parity/build) - Task 2 of PLAN_responsive_quality_audit
- fix(brand): keep favicon light-tile + ink glyph in all themes, enlarge glyph
- fix(ci): point Lighthouse at live URLs and assert 100 across categories

### Changed

- ci(lighthouse): split base (CI, 4 core URLs) vs full (manual, 14 URLs)
- ci(code-check): drop deleted search:budgets step, add desktop Lighthouse
- chore(skill): add responsive-lighthouse-audit skill - Task 8 of PLAN_responsive_quality_audit
- chore: remove dormant blog engine
- perf(layout): lazy-load below-fold footer logos - Task 6 of PLAN_responsive_quality_audit
- chore(audit): baseline responsive + lighthouse inventory - Task 1 of PLAN_responsive_quality_audit
- seo: bring all meta descriptions into the 130-160 policy (EN/ES)
- docs(kit): document dwp-create guided vs trust modes (EN/ES)
- polish(methodology): tie chapters 3-5 to the sharpened narrative (EN/ES)
- polish(methodology,examples): add verify to the core loop; reframe the dogfood case study
- chore(skill): re-pin to deepworkplan-skill v2.2.0 (verify sub-skill released)
- refactor(i18n): remove dead xergioalex-era translation blocks (hero, homeSections)
- polish(home): add a conformance outcome + verify/author to the skill enumeration
- content(examples): flesh out /examples with substantive walkthroughs (EN/ES)
- docs: make the sub-skill count consistent (seven -> eight, with verify)
- docs(spec): add a normative Conformance chapter (EN/ES)
- chore(skill): re-pin DeepWorkPlan skill to the published v2.1.0
- docs(methodology): explain the two pillars clearly — direction, SDD, and the harness
- copy(init): make the one-line agent instruction more professional
- chore(public): remove unused legacy xergioalex.com assets
- chore(agents): remove legacy blog skills + content-writer agent
- docs(catalog): note dependency-upgrade add-on backs /lib-upgrade (Task 8 discovery)
- docs: remove residual external-author reference from AGENTS.md dogfooding overview
- docs,content: complete the dogfooding narrative (Task 6 remainder)
- content(aeo): sync .md endpoints with the living-kit narrative (Task 6 follow-up)
- docs,content: narrate the author sub-skill, maintenance addon, and DWP dogfooding

[Unreleased]: https://github.com/DailybotHQ/deepworkplan-website/compare/v5.0.31...HEAD
[5.0.31]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.31
[5.0.30]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.30
[5.0.29]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.29
[5.0.28]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.28
[5.0.27]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.27
[5.0.26]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.26
[5.0.25]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.25
[5.0.24]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.24
[5.0.23]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.23
[5.0.22]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.22
[5.0.21]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.21
[5.0.20]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.20
[5.0.19]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.19
[5.0.18]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.18
[5.0.17]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.17
[5.0.16]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.16
[5.0.15]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.15
[5.0.14]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.14
[5.0.13]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.13
[5.0.12]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.12
[5.0.11]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.11
[5.0.10]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.10
[5.0.9]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.9
[5.0.8]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.8
[5.0.7]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.7
[5.0.6]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.6
[5.0.5]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.5
[5.0.4]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.4
[5.0.3]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.3
[5.0.2]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.2
[5.0.1]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v5.0.1
[4.0.5]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v4.0.5
[4.0.4]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v4.0.4
[4.0.3]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v4.0.3
[4.0.2]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v4.0.2
[4.0.1]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v4.0.1
[3.0.1]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v3.0.1
[2.0.1]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v2.0.1
[1.0.86]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.86
[1.0.85]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.85
[1.0.84]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.84
[1.0.83]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.83
[1.0.82]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.82
[1.0.81]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.81
[1.0.80]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.80
[1.0.79]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.79
[1.0.78]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.78
[1.0.77]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.77
[1.0.76]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.76
[1.0.75]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.75
[1.0.74]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.74
[1.0.73]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.73
[1.0.72]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.72
[1.0.71]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.71
[1.0.70]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.70
[1.0.69]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.69
[1.0.68]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.68
[1.0.67]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.67
[1.0.66]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.66
[1.0.65]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.65
[1.0.64]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.64
[1.0.63]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.63
[1.0.62]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.62
[1.0.61]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.61
[1.0.60]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.60
[1.0.59]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.59
[1.0.58]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.58
[1.0.57]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.57
[1.0.56]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.56
[1.0.55]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.55
[1.0.54]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.54
[1.0.53]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.53
[1.0.52]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.52
[1.0.51]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.51
[1.0.50]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.50
[1.0.49]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.49
[1.0.48]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.48
[1.0.47]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.47
[1.0.46]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.46
[1.0.45]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.45
[1.0.44]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.44
[1.0.43]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.43
[1.0.42]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.42
[1.0.41]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.41
[1.0.40]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.40
[1.0.39]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.39
[1.0.38]: https://github.com/DailybotHQ/deepworkplan-website/releases/tag/v1.0.38
