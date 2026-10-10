---
title: Add-ons
description: "DWP addons: seven opt-in extensions, the required AI Diff Reviewer local review with its optional CI surface, the addon contract, and kit concepts."
order: 5
lang: en
section: Addons
---

# Add-ons

> **Version scope:** This is a retained v5.0.0 base document. The current standard, DWP 7.0.0, also requires the applicable `V6_*.md` and `V7_*.md` extensions listed in the [specification index](/spec). Existing v5 and v6 plans keep their recorded rules.

**Version 2.1.0.** Add-ons are extensions to the core Deep Work Plan methodology. Seven of the eight are optional and **never required for conformance** — a repository with zero optional addons is fully AI-first and DWP-conformant. Each optional addon is offered during onboarding, accepted or declined explicitly, and — when accepted — **reconciles** with existing setup instead of clobbering it. One component is the declared exception: since standard 2.3.0 the **AI Diff Reviewer local review** is part of the required baseline — onboarding installs it and every Final Review runs it — while its CI surface stays opt-in.

## The addon contract

Every shipping addon ships four mandatory components:

| Component | Purpose |
|-----------|---------|
| **Spec** | Normative RFC-2119 description of what the addon provides and what "conformant to this addon" means |
| **Reasoning templates** | Guides the agent fills by reasoning about the target repo's stack — not copy-paste |
| **Onboarding hook** | `SKILL.md` entry point the `onboard` flow calls when the developer accepts |
| **Validation step** | Checklist confirming the addon was applied correctly |

Discovery: the `onboard` flow enumerates `skills/deepworkplan/addons/` and presents each addon as an opt-in step in **Phase 7b**, after core scaffolding.

## Shipping addons (eight)

Eight addons ship today — seven opt-in plus the required local review. Each has a **kit catalog page** with user-facing detail and a **normative spec** inside the Deep Work Plan skill. Four of them — devcontainer, Herdr, DeepWorkPlan Vim, and Agentkit — are thin integrators pinned by tag to a product with its own repository and release cycle; every product works without Deep Work Plan. An accepted addon is recorded in the `.dwp/config.json` addon registry (DWP 7.0.0), which can only offer or amplify — it never gates conformance or a plan.

### Devcontainer (first addon)

A thin integrator of [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, pinned `v0.2.2`, interface `2`): a Dev Containers template that `dck init` renders into the repository as its own container, plus the `dck-dockerfile` skill.

- **Kit page:** [Devcontainer](/kit/devcontainer)
- **What it adds:** `docker/local/<service>/Dockerfile` from the runtime's official image pinned by digest (`python-3.13`, `node-24` or `debian`, no shared base image), `dev.sh` over the `dck` launcher (`up`, `shell`, `rebuild`, `doctor`), coding agents as an opt-in layer, loopback-only ports, git over SSH through the host's agent with no key inside, and Herdr machines per container with the standard layout
- **Behavior:** detected through `dck doctor --json` (interface 2); `dck init` reconciles an existing devcontainer only after its diff is accepted, and backs the file up first — never clobbered
- **When offered:** most repos with Docker or services that benefit from an isolated dev container

### Dailybot (second addon)

An opt-in connection to the developer's **Dailybot team** for agent progress visibility.

- **Kit page:** [Dailybot](/kit/dailybot) — full capability reference
- **What the DWP addon wires:** four plan-lifecycle reports (kickoff, significant task, blocked, completion) via the dailybot `report` sub-skill; optional deterministic hook enforcement (`dailybot hook`, CLI `>= 3.9.0`)
- **Paired skill:** installing [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (currently **3.23.3**) exposes **17 capabilities** — chat on Slack/Teams/Discord/Google Chat, check-ins, forms authoring, ask AI, kudos, Plan boards and tasks, organization labels, per-repo API keys (`.dailybot/env.json`), email, and more. The DWP addon wires only **report**; other capabilities are invoked through the Dailybot skill directly
- **Auth:** fully deferred to the Dailybot skill (`dailybot login` or `DAILYBOT_API_KEY`); this addon never stores credentials
- **Vendor-neutral guardrail:** core DWP has **zero** Dailybot dependency; never auto-install for everyone
- **When offered:** developer or team already uses Dailybot, or explicitly asks for team reporting

### Dependency upgrade (third addon)

Package-manager-agnostic, batched, validated, revertible dependency upgrades.

- **Kit page:** [Dependency upgrade](/kit/dependency-upgrade)
- **What it adds:** detects the repo's **real** manager (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), upgrades in semver-classified batches, runs the repo's validation gate after each batch, reverts failures, summarizes without auto-committing
- **Command:** installs `/lib-upgrade` into `.agents/commands/` only when accepted
- **When offered:** offered for every repository with declared dependencies; the inert `/lib-upgrade` delegator installs under the onboarding consent unless explicitly declined — an install runs no upgrade

### Design system (fourth addon)

An interface-surface-scoped `DESIGN.md` any coding agent reads for consistent UI, CLI, or conversational output.

- **Kit page:** [Design system](/kit/design-system)
- **What it adds:** `docs/DESIGN.md` (referenced from `AGENTS.md`) with up to three **profiles** stacked in one file: **visual-ui** (rendered UI tokens and components), **cli-output** (semantic terminal styles, TTY/`NO_COLOR` degradation), **conversational** (voice, message anatomy, per-platform rendering with plain-text fallbacks)
- **Profile strength:** detection makes the offer mandatory; installation is acceptance-gated in guided and trust mode alike — visual-ui is **strongly recommended when detected**; cli-output and conversational are **recommended when detected, always asked, never auto-applied**
- **When offered:** only when a user-facing interface surface is detected — not for pure libraries, headless services, or infra-only repos

### AI Diff Reviewer (fifth addon — required local review, optional CI surface)

The **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**) gives the mandatory Final Review security pass a structured local review, and optionally gates pull requests in CI. Since standard 2.3.0 the **local review is part of the baseline**; only the CI surface is opt-in. This addon is release-auto-refreshed, so the tag shown below is the one current at the time of writing and may lag the vendored copy — the addon's own `SKILL.md` and its GitHub releases are authoritative for the tag actually installed. The install is always pinned to a published tag, never to a moving branch.

- **Kit page:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — full capability reference
- **Required at onboarding (Phase 7a):** tag-pinned install of the vendored skill (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) plus a repo-tailored `.review/extension.md` (via `generate-extension`), under the onboarding consent; a targeted harness upgrade reconciles both when missing; a decline is recorded as a declared exception and reported by `verify` until installed
- **Required in every Final Review:** the security pass runs the upstream parent default flow over the accumulated change set and appends its output to the plan-local `analysis_results/SECURITY_REVIEW.md` (inside the plan's own folder, never the repository root); a missing skill or extension is a recorded `local reviewer not installed` finding — never a silent skip, and never a surprise bootstrap: installation belongs to the onboarding consent or an explicit addon invocation; **verified** `critical` findings from a completed pass block completion until fixed or explicitly accepted (v3, BC-07 — unverified critical claims arrive as annotated warnings, and an `incomplete`/`timeout` review is not a clean pass, BC-04)
- **Optional CI surface (Flow B):** the review workflow (`DailybotHQ/ai-diff-reviewer@v3`) via the upstream `setup` sub-skill, plus the `apply-review` (read-only) and `address-review` (commits, pushes, and re-arms; new in v3.1.1) companions as developer-invoked conveniences — offered explicitly, never installed unrequested, never the default, never a plan task
- **Never-block (invocation only):** a local review that could start but errors is warn-once-record-and-continue; it never fails the task
- **Parity (Flow B):** shared `prompt.md` + extension align methodology/severity; CI Iteration-Aware Review may shorten round 2+ while local stays a full pass
- **Vendor-neutral guardrail:** no Deep Work Plan flow requires a commercial service, CI provider or secret — the reviewer is an MIT, tag-pinned skill run by the developer's own coding agent
- **Conformance:** `verify` reports a missing local reviewer as a failure for repositories declaring standard 2.3.0 or newer and as a harness-version finding for legacy repositories

### Herdr (sixth addon)

A thin integrator of [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (pinned `v0.1.0`, protocol `1`), the **interactive** delegation transport of v7 plans.

- **Kit page:** [Herdr](/kit/herdr)
- **What it adds:** a plan can hand a bounded task to a coding agent in another [Herdr](https://herdr.dev) pane, on the same machine or one Herdr reaches over SSH, and record its single authorized reply in the journal
- **Behavior:** the peer protocol (stamp, grant, reply, loop guard, depth and fan-out limits) lives in herdr-peers, never in the pack; any use needs the contract grant `agent_delegation`, and a delegate's result stays asserted until the plan's own runner observes it
- **When offered:** explicit opt-in during Phase 7b; read-only detection of `herdr` and `herdr-peers`; the transport is usable only inside a Herdr session

### DeepWorkPlan Vim (seventh addon)

A thin integrator of [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (pinned `v0.5.1`, interface `1`), the terminal editor for Deep Work Plan (Neovim 0.12+).

- **Kit page:** [DeepWorkPlan Vim](/kit/vim)
- **What it adds:** an optional, machine-level editor surface for agents and humans — a generated command index, a read-only plan browser, and a Markdown viewer; every claim is read from the product's pinned machine-readable surface
- **Behavior:** an existing Neovim configuration is never overwritten without explicit consent; detection is read-only
- **When offered:** explicit opt-in during Phase 7b; informational only when Neovim 0.12+ is missing

### Agentkit (eighth addon)

A thin integrator of [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, pinned `v0.3.0`, interface `1`), the **headless** delegation transport of v7 plans.

- **Kit page:** [Agentkit](/kit/agentkit)
- **What it adds:** one `ak` command surface over terminal coding agents, used to run a bounded plan task headlessly; it contributes the `subagents`, `cancel_children`, and `model_routing` abilities only at runtime, when enabled, detected, and on a compatible interface
- **Behavior:** any use needs the contract grant `agent_delegation`; the kit launches agents in autonomy by default and its opt-out (`--ask` or `AGENTKIT_PERMISSIONS=ask`) always wins — the addon spells no autonomy flag, passes `--ask` when the plan records the opt-out and always for read-only delegates; it never installs coding-agent CLIs on its own and never reads provider key values
- **When offered:** explicit opt-in during Phase 7b; read-only detection through `ak doctor --json`

## Skills

Skills are reusable procedures invoked by name. A skill packages a repeatable workflow (running tests, fixing lint, creating a component).

The methodology ships a small set of core sub-skills. Among them, the **author** sub-skill lets a repository **grow its own kit**: invoked through `/skill-create` and `/agent-create`, it reasons about the repository's existing `.agents/` layout and conventions, then authors a new skill, agent, or thin command delegator that matches them, and keeps the catalog in sync. The same sub-skill backs the skills reconciliation pass of the Final Review.

Kit entry: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agents

Agents are specialized workers with a defined role (reviewer, executor, architect). They live under `.agents/agents/` and are cataloged in `.agents/docs/`.

## Maintenance add-ons

The **dependency-upgrade** add-on (above) is the primary maintenance addon. It reasons about the repository's actual package manager rather than assuming npm, classifies upgrades by semver, upgrades in safe batches, runs validation after each batch, and reverts any batch that fails.

## Design-system add-on

See [Design system](/kit/design-system) under shipping addons. The repo-level `DESIGN.md` is distinct from a per-feature technical design document: DWP's plan README, task acceptance criteria, and validation gates already cover per-feature design. The design-system addon fills durable, repo-native **interface** design context.

## Presets

Presets adapt DWP to a specific tech stack (Django, React, Go, Astro + Svelte, and more). Browse the [kit catalog](/kit).

## Adapters

Adapters map DWP commands to a specific agent's command system (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw, and others). Adapter entries live in the kit under each agent name.

## Examples

Examples demonstrate DWP in practice: before/after comparisons, sample plans, case studies. See [Examples](/examples) and [Dogfood this site](/kit/dogfood-this-site).

## Conformance reminder

A repository **MUST** be fully conformant with **zero** addons. Addons are layered opt-in capabilities — never preconditions. See [Conformance](/spec/conformance).
