# Ecosystem context

This repository has two roles:

1. **The site.** It builds and publishes [deepworkplan.com](https://deepworkplan.com):
   the methodology, the readable specification, the kit catalog, the
   `/quickstart` page and the machine-executable `/init.md`.
2. **The ecosystem hub.** It coordinates work across the public DeepWorkPlan
   repositories, cloned under `repositories/` by `scripts/repositories.sh`
   (index: `repositories/README.md`, data:
   `repositories/manifest.json`). It plans
   cross-repository work as orchestrator Deep Work Plans and verifies that what
   the site says matches what each repository released.

The hub follows the DeepWorkPlan **orchestrator hub** archetype
(`.agents/skills/deepworkplan/spec/ARCHETYPES.md` §3). The site toolchain never
reads `repositories/` (pinned by `tests/unit/lib/hub-isolation.test.ts`).

## Posture

Versions are the release each surface pins today; the site may only claim a
released tag (`tests/unit/lib/install-surface-pins.test.ts` guards the
deepworkplan-skill pins).

| Repository | Role | Visibility | Released tag the site pins | Where the site makes the claim | Consumed by this repo as |
|------------|------|------------|----------------------------|--------------------------------|--------------------------|
| deepworkplan-skill | Pack (source of truth for the methodology, spec and kit) | Public | `v7.1.4` | `/init.md`, `/quickstart`, kit pages, spec reader | Vendored skill `.agents/skills/deepworkplan/` (repo-adapted, refreshed only by a reviewed change) |
| ai-diff-reviewer | Addon: pull-request review | Public | `v3.3.0` | `/kit/ai-diff-reviewer`, `/init.md` | Vendored skill (auto-refreshed on every site release) and the CI self-review action |
| agent-skill | Addon: Dailybot reporting | Public | `v3.23.3` | `/kit/dailybot` | Vendored `dailybot` skill (auto-refreshed on every site release); **also owned by the Dailybot hub** |
| devcontainer-kit | Addon: development containers | Public | `v0.2.2` | `/kit/devcontainer`, `/init.md` | Documented only |
| coding-agents-kit | Addon: coding-agent installer | Public | `v0.3.0` | `/kit/agentkit`, `/init.md` | Documented only |
| deepworkplan-vim | Addon: DeepWorkPlan Vim | Public | `v0.5.1` (the pack's addon pin, the product page and the installer mirror) | `/init.md`, the kit plate and `/kit/vim` | Documented and served (installer mirror) |
| herdr-peers | Addon: peer coordination | Public | `v0.1.0` | `/kit/herdr`, `/init.md` | Documented only |

## Pack, addons and site claims

- **The pack is the source of truth.** The specification, kit, onboarding and
  plan contract are defined in `deepworkplan-skill`. The site explains and
  links them; it never defines methodology the pack does not ship. A site
  change that contradicts the vendored pack is a defect in the site.
- **Addons declare their contract with the pack.** Each addon documents the
  pack version it targets in its own repository. The kit page for an addon
  describes the released tag only, and its install line pins that tag.
- **Claims follow releases.** The site never names an unreleased version, an
  unpinned install line or a default-branch install for a released product.
  Pre-releases appear only in an explicitly labelled pre-release block.

## Release order

Cross-repository changes release bottom-up, so every surface only points at
something that already exists:

1. **deepworkplan-skill** (the pack) — tag, release assets and `SHA256SUMS`.
2. **Addons** that adopt the new pack (ai-diff-reviewer, agent-skill,
   devcontainer-kit, coding-agents-kit, deepworkplan-vim, herdr-peers) — each
   in its own repository, in any order unless one depends on another.
3. **This site last** — vendor the released pack (reviewed change), point every
   install and adoption surface at the released tags, merge to `main`; the
   release workflow then refreshes the two auto-refreshed addon skills and
   publishes.

An orchestrator plan in this hub sequences those steps; see
[Cross-project standards](CROSS_PROJECT_STANDARDS.md#orchestrator-plans).

## Hub boundaries

- The hub **never commits code for another repository**. Work for
  `repositories/<name>` is branched, committed, pushed and reviewed inside that
  clone, under that repository's own `AGENTS.md`.
- The hub tracks only its own site, docs, coordination files,
  `repositories/README.md` and `repositories/manifest.json`. Clones and their
  `.dwp/` plan history stay git-ignored.
- **Only public repositories** belong in the manifest, and nothing private
  (internal names, personal paths, secrets) enters a tracked file
  (`scripts/check-public-hygiene.sh`, CI job `public hygiene`).
- **agent-skill is shared** with the Dailybot hub: pull before editing, never
  leave unpushed work in the clone.
- The sync script never deletes, never touches a dirty tree or a feature
  branch, and never rewrites a remote; cleaning up a clone is a manual,
  literal-path decision by the developer.
