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

> **Dated snapshot:** This table records the pins in the checked-out source when it
> was last updated. A herdr-peers release and a pin update are being handled separately; use
> `src/lib/ecosystem-pins.ts` and `/init.md` for the committed installation
> state. This page is not a substitute for those pin surfaces.

Versions are the release each surface pins today; the site may only claim a
released tag (`tests/unit/lib/install-surface-pins.test.ts` guards the
deepworkplan-skill pins). The pins last moved on 2026-11-16 with DWP 8.0.0: pack `v8.0.2`
(DWP standard 8.0.0 — new plans default to `plan-contract/v8`, with the
`autonomy` block, structured blockers in `journal-event/v8` and
`plan-snapshot/v8`, and the `dwp-queue-v1` plan queue written by
`shared/queue.py`; v7, v6 and v5 plans keep their recorded generation; the
7.x line ended at 7.12.2),
herdr-peers `v2.2.0` (1.1.0 adds native debates, 1.2.x adds autopilot, an
optional daemon only a human starts; 1.3.0 adds the loop — `autopilot
--loop` keeps every open plan running to its end on every machine — plus
the fleet UI and the read-only `plans`/`fleet` verbs; 2.0.0 moves the
wire to protocol 2 — lead appointment on the human's explicit word,
the autopilot brain, the plan queue; 2.0.2 accepts the trailing `--ask` of
an ask-mode pick-v2 launch; 2.1.0 adds the fleet UI views, denies
permissions the daemon cannot accept and reads the v8 blockers; 2.2.0 adds
revive, `autopilot --loop --revive`),
coding-agents-kit `v1.5.0` (pick-v2: `ak pick --kinds` with per-kind model
override and `--json` launch contracts; `--model` as a head flag; `ak
last`, and Herdr pane restore through `ak`; 1.4.0 adds `ak update`, the
verified vendor updater, human-invoked only; 1.5.0 adds reported-only token
metering and forces each CLI's ask mode under the opt-out; interface 1
unchanged),
deepworkplan-vim `v1.1.0`,
ai-diff-reviewer `v3.3.16` and agent-skill `v3.23.20`, with the pack, the
reviewer and the Dailybot skill vendored at those tags. The pack `v8.0.2`
addon descriptors record herdr-peers `v2.2.0`, coding-agents-kit `v1.5.0`,
devcontainer-kit 1.4.0 and deepworkplan-vim `v1.1.0`; the site pins the same
releases, except devcontainer-kit `v1.4.1`, the patch that bakes herdr-peers
2.2.0 and pack 8.0.2. devcontainer-kit 1.4.0 (interface 2 unchanged; 1.3.0 added the opt-in
`[compose] container_only` key) bakes herdr-peers 2.1.0, coding-agents-kit
1.5.0 and deepworkplan-vim 1.1.0 into its image and dogfoods pack 8.0.1; `v1.4.1`
moves the image to herdr-peers 2.2.0 and dogfoods pack 8.0.2.

| Repository | Role | Visibility | Released tag the site pins | Where the site makes the claim | Consumed by this repo as |
|------------|------|------------|----------------------------|--------------------------------|--------------------------|
| deepworkplan-skill | Pack (source of truth for the methodology, spec and kit) | Public | `v8.0.2` | `/init.md`, `/quickstart`, kit pages, spec reader | Vendored skill `.agents/skills/deepworkplan/` (repo-adapted, refreshed only by a reviewed change) |
| ai-diff-reviewer | Required local review: reviews a change set locally and in CI; every Final Review runs it | Public | `v3.3.16` | `/kit/ai-diff-reviewer`, `/init.md` | Vendored skill (auto-refreshed on every site release) and the CI self-review action |
| agent-skill | Addon (dailybot): progress reports, check-ins, chat and more | Public | `v3.23.20` | `/kit/dailybot` | Vendored `dailybot` skill (auto-refreshed on every site release); **also owned by the Dailybot hub** |
| cli | Consumer: the Dailybot CLI | Public | auto-release on merge | — | Reference production consumer of the full DWP stack (pack, every addon, dck container); **also owned by the Dailybot hub** |
| devcontainer-kit | Addon (devcontainer): a reproducible dev container per repository, wired to Herdr and the host's accounts | Public | `v1.4.1` | `/kit/devcontainer`, `/init.md` | Documented only |
| coding-agents-kit | Addon (agentkit): one `ak` command for every coding agent — accounts, quota, `ak pick`, headless runs | Public | `v1.5.0` | `/kit/agentkit`, `/init.md` | Documented only |
| deepworkplan-vim | Addon (vim): the terminal editor for plans — plan browser, lanes view, Markdown viewer | Public | `v1.1.0` (the product page, the kit plate, `/init.md` and the installer mirror) | `/init.md`, the kit plate and `/kit/vim` | Documented and served (installer mirror) |
| herdr-peers | Addon (herdr): ask an agent in another Herdr pane, on any machine, and get one authorized reply | Public | `v2.2.0` | `/kit/herdr`, `/init.md` | Vendored skill `.agents/skills/herdr-peers/` (pinned; moves only with the site's pin) |

## Stable interfaces (1.0)

The products move from 0.x to **1.0.0** once their public interface is stable:
from then on an incompatible change ships only in a new major version, and
additions arrive in minor versions. herdr-peers `v2.2.0` (CLI verbs, exit
codes, protocol 1, the `lanes-v1` and `lead-v1` contracts),
coding-agents-kit `v1.5.0` (the `ak` command surface, interface 1, the JSON
schemas), deepworkplan-vim `v1.1.0` (installer, addon surface, editor
commands, `dwpvim.json`, keybindings) and devcontainer-kit `v1.4.1` (the `dck`
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
With coding-agents-kit `v1.5.0` and herdr-peers `v2.2.0` its lanes hand work on
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
