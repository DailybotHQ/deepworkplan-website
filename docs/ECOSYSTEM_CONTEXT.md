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
| deepworkplan-skill | Pack (source of truth for the methodology, spec and kit) | Public | `v7.8.1` | `/init.md`, `/quickstart`, kit pages, spec reader | Vendored skill `.agents/skills/deepworkplan/` (repo-adapted, refreshed only by a reviewed change) |
| ai-diff-reviewer | Required local review: reviews a change set locally and in CI; every Final Review runs it | Public | `v3.3.14` | `/kit/ai-diff-reviewer`, `/init.md` | Vendored skill (auto-refreshed on every site release) and the CI self-review action |
| agent-skill | Addon (dailybot): progress reports, check-ins, chat and more | Public | `v3.23.17` | `/kit/dailybot` | Vendored `dailybot` skill (auto-refreshed on every site release); **also owned by the Dailybot hub** |
| cli | Consumer: the Dailybot CLI | Public | auto-release on merge | — | Reference production consumer of the full DWP stack (pack, every addon, dck container); **also owned by the Dailybot hub** |
| devcontainer-kit | Addon (devcontainer): a reproducible dev container per repository, wired to Herdr and the host's accounts | Public | `v1.0.1` | `/kit/devcontainer`, `/init.md` | Documented only |
| coding-agents-kit | Addon (agentkit): one `ak` command for every coding agent — accounts, quota, `ak pick`, headless runs | Public | `v1.0.1` | `/kit/agentkit`, `/init.md` | Documented only |
| deepworkplan-vim | Addon (vim): the terminal editor for plans — plan browser, lanes view, Markdown viewer | Public | `v1.0.0` (the product page, the kit plate, `/init.md` and the installer mirror) | `/init.md`, the kit plate and `/kit/vim` | Documented and served (installer mirror) |
| herdr-peers | Addon (herdr): ask an agent in another Herdr pane, on any machine, and get one authorized reply | Public | `v1.0.0` | `/kit/herdr`, `/init.md` | Documented only |

## Stable interfaces (1.0)

The products move from 0.x to **1.0.0** once their public interface is stable:
from then on an incompatible change ships only in a new major version, and
additions arrive in minor versions. herdr-peers `v1.0.0` (CLI verbs, exit
codes, protocol 1, the `lanes-v1` and `lead-v1` contracts),
coding-agents-kit `v1.0.1` (the `ak` command surface, interface 1, the JSON
schemas), deepworkplan-vim `v1.0.0` (installer, addon surface, editor
commands, `dwpvim.json`, keybindings) and devcontainer-kit `v1.0.1` (the `dck`
verbs, flags and exit codes, the `dck.toml`, host-profile and doctor schemas,
interface 2, the render contract) are released; each 1.0.0 changes no
behavior from its last 0.x release beyond what its CHANGELOG lists. The pack,
ai-diff-reviewer, agent-skill and cli were already past 1.0 and keep their
lines. The site names a 1.0.0 only after its tag exists, and moves each pin
with its verified `SHA256SUMS` digest (`src/lib/ecosystem-pins.ts`).

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
With coding-agents-kit `v1.0.1` and herdr-peers `v1.0.0` its lanes hand work on
before an account runs out and the leadership survives the lead
([Swarm autonomy](https://deepworkplan.com/methodology/07-swarm-autonomy)).

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
