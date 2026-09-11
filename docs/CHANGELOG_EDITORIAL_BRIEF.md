# Changelog Editorial Brief

This brief is the source-backed editorial inventory for the public Deep Work
Plan changelog. The primary evidence repository is the read-only checkout at
`tmp/repositories/deepworkplan-skill`.

## Version map

| Label | Meaning | Evidence |
|---|---|---|
| DWP v4 | Lite-first plan lifecycle; the draft-staging step is retired | Skill commit `3daab90`, tag `v4.0.0` |
| DWP standard 2.4.0 | Normative specification implemented by v4 | `skills/deepworkplan/spec/LITE_PLANS.md` in the skill repository |
| DWP v3 | Major release policy and lifecycle change for the skill, with the command surface preserved | Skill commit `d050474`, tag `v3.0.0` |
| DWP standard 2.3.0 | Normative specification implemented by v3 | `skills/deepworkplan/spec/` in the skill repository |
| DWP v2 | First official Deep Work Plan release; the repository becomes the harness | Skill changelog `2.17.0` |
| DWP v1 | Foundational adoption-kit releases: trust, testing discipline, conformance | Skill changelog `2.3.0`–`2.16.0` |
| Website 3.0.0 | Website/package release being prepared on this repository | Root `package.json`, release commit `076396f` |

The public changelog uses `v1`–`v4` as a coarser, storytelling-facing
generation label for the website timeline. It does not claim a 1:1 mapping to
the skill package's own semver history (which stayed in the `2.x` line for
most of that period) — each entry cites its underlying skill commit or
changelog range as the evidence of record, and the DWP standard number (when
one applies) is always spelled out separately in the entry body.

## Canonical entry slate

### `deep-work-plan-v4.md`

- Date: 2026-09-11
- Label: v4 · Lite-first plans
- Status: release-day major-release commit
- Summary: `create` now materializes a Lite plan directly — a complete,
  executable proposal with inline task records — and retires the separate
  `.dwp/drafts/` staging step entirely. Full task-file plans remain available
  for longer or higher-risk work.
- Evidence: `3daab90`, `skills/deepworkplan/spec/LITE_PLANS.md`,
  `skills/deepworkplan/shared/dwp-paths.md`
- Core points: Lite is the default, reviewable-and-runnable representation
  for bounded work; no draft artifact; promotion to Full stays available when
  a requirement or gate would not fit a compact record; format choice follows
  recorded signals (task count, touched surface, risk, reversibility), not
  guesswork.

### `deep-work-plan-v3.md`

- Date: 2026-09-10
- Label: v3 · Token efficiency
- Status: release-day major-release commit
- Summary: The harness is rebuilt around context cost — progressive
  disclosure, affected-only validation, bounded working context, and direct
  trust-mode creation — while raising the trust and conformance floor (one
  Final Review, the AI Diff Reviewer local review as baseline, zero optional
  addons).
- Evidence: `d050474`, `skills/deepworkplan/spec/DWP_SPECIFICATION.md`,
  `AGENTS.md`, `docs/adr/0001-token-efficiency-architecture.md`,
  `docs/evaluations/token-efficiency.md`
- Core points: `GUIDE.md` becomes a routing index; gates are selected from
  the touched surface instead of a blanket full-suite run; one Final Review
  replaces the three former closing tasks; AI Diff Reviewer local review is a
  required baseline component; legacy plans keep their recorded shape with an
  explicit migration path; measured, ledger-backed efficiency claims only —
  never an invented percentage.

### `repository-becomes-the-harness.md`

- Date: 2026-07-16
- Label: v2 · Official release
- Status: first official release
- Summary: The repository becomes the harness for reliable, long-horizon
  agent work.
- Evidence: `CHANGELOG.md` entry for `2.17.0`, `TRUST.md`, and the initial
  adoption kit.
- Core points: repository-native context, guardrails, validation, and
  resumable state.

### `from-spec-to-portable-harness.md`

- Date: 2026-06-12
- Label: v1 · Foundation
- Status: selected historical milestone
- Summary: DWP grew from a plan loop into a portable kit for onboarding
  repositories, checking conformance, and adapting to multiple stacks and
  agent hosts.
- Evidence: `CHANGELOG.md` entries for `2.3.0`, `2.4.0`, `2.8.0`, `2.11.0`,
  `2.14.0`, `2.16.0`
- Core points: trust statement and checksums, broader presets/hosts,
  validation discipline, conformance checker, state/resume protocol,
  `.cursor → .agents` compatibility.

## Superseded entries (folded into `deep-work-plan-v3.md`, 2026-09-10)

Three narrower entries — `reviewable-conformance-floor`,
`token-efficiency-by-construction`, and `resumable-plan-materialization` —
were published and then intentionally consolidated into `deep-work-plan-v3.md`
rather than kept as separate timeline stops: all three described facets of
the same v3 release (trust/conformance floor, the token-efficiency
architecture, and resumable plan materialization) and read as three
near-simultaneous entries for one release rather than three distinct
milestones. Their content is preserved in `deep-work-plan-v3.md`'s body; the
files themselves are not restored.

## Editorial guardrails

- Write each post from the perspective of its publication date. Do not import
  later website versions, current dogfood state, or retrospective labels into
  an earlier entry.
- Do not publish internal branch names, task numbers, evaluation traces, or
  private session URLs as user-facing changelog copy.
- Use measured token-efficiency evidence from the public ledger, never invented
  percentage savings.
- Detail pages should explain why each update matters to a repository owner and
  an agent maintainer, then point to the public source or specification.
- Changelog titles lead with the short "DWP" form (e.g. "DWP v4: …"), not the
  full "Deep Work Plan" name — the full name still appears naturally in body
  copy and descriptions.
