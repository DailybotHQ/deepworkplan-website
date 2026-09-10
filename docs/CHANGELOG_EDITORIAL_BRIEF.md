# Changelog Editorial Brief

This brief is the source-backed editorial inventory for the public Deep Work
Plan changelog. The primary evidence repository is the read-only checkout at
`tmp/repositories/deepworkplan-skill`.

## Version map

| Label | Meaning | Evidence |
|---|---|---|
| Deep Work Plan v3 | Major release policy and lifecycle change for the skill, with the command surface preserved | Skill commit `d050474` |
| DWP standard 2.3.0 | Normative specification implemented by v3 | `skills/deepworkplan/spec/` in the skill repository |
| Skill v2.17.1 | Previous tagged skill line and baseline for the token-efficiency work | Tag `v2.17.1`, `CHANGELOG.md`, ADR 0001 |
| Website 3.0.0 | Website/package release being prepared on this repository | Root `package.json`, release commit `076396f` |
| Resumable materialization amendment | Follow-up in the v3 line, not a separate major release | Skill commit `69b03ea` |

The public changelog must keep these labels separate. The website release is a
distribution and storytelling milestone; the skill repository's v3 commit is
the methodology/skill major release.

## Canonical entry slate

### `deep-work-plan-v3`

- Date: 2026-09-10
- Label: Deep Work Plan v3 · DWP standard 2.3.0
- Status: release-day major-release commit
- Summary: Today's major release keeps DWP's current behavior while making it more agile, improving the user experience, and extending structured execution to small tasks with token-efficient defaults.
- Evidence: `d050474`, `skills/deepworkplan/spec/DWP_SPECIFICATION.md`, `AGENTS.md`
- Core points: one Final Review for new plans; AI Diff Reviewer local review as baseline; zero optional addons as the conformance floor; guide routing index; standard provenance in AGENTS.md; explicit legacy-plan compatibility and migration path; progressive disclosure, affected validation, and fewer unnecessary loops.

### `repository-becomes-the-harness`

- Date: 2026-07-16
- Label: Official release · foundation
- Status: first official release
- Summary: The repository becomes the harness for reliable, long-horizon agent work.
- Evidence: `CHANGELOG.md` entry for `2.17.0`, `TRUST.md`, and the initial adoption kit.
- Core points: repository-native context, guardrails, validation, and resumable state.

### `from-spec-to-portable-harness`

- Date: 2026-06-12
- Label: Foundation · adoption
- Status: selected historical milestone
- Summary: DWP grew from a plan loop into a portable kit for onboarding repositories, checking conformance, and adapting to multiple stacks and agent hosts.
- Evidence: `CHANGELOG.md` entries for `2.3.0`, `2.4.0`, `2.8.0`, `2.11.0`, `2.14.0`, `2.16.0`
- Core points: trust statement and checksums, broader presets/hosts, validation discipline, conformance checker, state/resume protocol, `.cursor → .agents` compatibility.

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
