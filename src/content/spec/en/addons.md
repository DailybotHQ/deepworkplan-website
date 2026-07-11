---
title: Add-ons
description: "Optional DWP extensions: the four shipping addons (devcontainer, Dailybot, dependency-upgrade, design-system), the addon contract, and kit concepts (skills, agents, presets, adapters, examples)."
order: 5
lang: en
section: Addons
---

# Add-ons

**Version 2.0.** Add-ons are optional extensions to the core Deep Work Plan methodology. They are **never required for conformance** — a repository with zero addons is fully AI-first and DWP-conformant. Each addon is offered during onboarding, accepted or declined explicitly, and — when accepted — **reconciles** with existing setup instead of clobbering it.

## The addon contract

Every shipping addon ships four mandatory components:

| Component | Purpose |
|-----------|---------|
| **Spec** | Normative RFC-2119 description of what the addon provides and what "conformant to this addon" means |
| **Reasoning templates** | Guides the agent fills by reasoning about the target repo's stack — not copy-paste |
| **Onboarding hook** | `SKILL.md` entry point the `onboard` flow calls when the developer accepts |
| **Validation step** | Checklist confirming the addon was applied correctly |

Discovery: the `onboard` flow enumerates `skills/deepworkplan/addons/` and presents each addon as an opt-in step in **Phase 7b**, after core scaffolding.

## Shipping addons (four)

Four addons ship today. Each has a **kit catalog page** with user-facing detail and a **normative spec** inside the Deep Work Plan skill.

### Devcontainer (first addon)

A compose-based `.devcontainer/` + `docker/` setup reasoned from the detected stack.

- **Kit page:** [Devcontainer](/kit/devcontainer)
- **What it adds:** persistent AI-CLI auth volumes (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, validation aliases (`codecheck`, `check`, `fix`, `test`), public-OSS secret hygiene
- **Behavior:** ~85% stable skeleton; ~15% reasoned per stack. Existing devcontainers are reconciled, never clobbered
- **When offered:** most repos with Docker or services that benefit from an isolated dev container

### Dailybot (second addon)

An opt-in connection to the developer's **Dailybot team** for agent progress visibility.

- **Kit page:** [Dailybot](/kit/dailybot) — full capability reference
- **What the DWP addon wires:** four plan-lifecycle reports (kickoff, significant task, blocked, completion) via the dailybot `report` sub-skill; optional deterministic hook enforcement (`dailybot hook`, CLI `>= 3.1.2`)
- **Paired skill:** installing [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (currently **3.4.0**) exposes **13 capabilities** — chat on Slack/Teams/Discord/Google Chat, check-ins, forms authoring, ask AI, kudos, email, and more. The DWP addon wires only **report**; other capabilities are invoked through the Dailybot skill directly
- **Auth:** fully deferred to the Dailybot skill (`dailybot login` or `DAILYBOT_API_KEY`); this addon never stores credentials
- **Vendor-neutral guardrail:** core DWP has **zero** Dailybot dependency; never auto-install for everyone
- **When offered:** developer or team already uses Dailybot, or explicitly asks for team reporting

### Dependency upgrade (third addon)

Package-manager-agnostic, batched, validated, revertible dependency upgrades.

- **Kit page:** [Dependency upgrade](/kit/dependency-upgrade)
- **What it adds:** detects the repo's **real** manager (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), upgrades in semver-classified batches, runs the repo's validation gate after each batch, reverts failures, summarizes without auto-committing
- **Command:** installs `/lib-upgrade` into `.agents/commands/` only when accepted
- **When offered:** lockfile present and dependency-heavy stack; recommend only when relevant

### Design system (fourth addon)

An interface-surface-scoped `DESIGN.md` any coding agent reads for consistent UI, CLI, or conversational output.

- **Kit page:** [Design system](/kit/design-system)
- **What it adds:** `docs/DESIGN.md` (referenced from `AGENTS.md`) with up to three **profiles** stacked in one file: **visual-ui** (rendered UI tokens and components), **cli-output** (semantic terminal styles, TTY/`NO_COLOR` degradation), **conversational** (voice, message anatomy, per-platform rendering with plain-text fallbacks)
- **Profile strength:** visual-ui is **default-on when detected**; cli-output and conversational are **recommended when detected, always asked, never auto-applied**
- **When offered:** only when a user-facing interface surface is detected — not for pure libraries, headless services, or infra-only repos

## Skills

Skills are reusable procedures invoked by name. A skill packages a repeatable workflow (running tests, fixing lint, creating a component).

The methodology ships a small set of core sub-skills. Among them, the **author** sub-skill lets a repository **grow its own kit**: invoked through `/skill-create` and `/agent-create`, it reasons about the repository's existing `.agents/` layout and conventions, then authors a new skill, agent, or thin command delegator that matches them, and keeps the catalog in sync. The same sub-skill executes the mandatory Skills & Agents Discovery task.

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
