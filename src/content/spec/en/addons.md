---
title: Add-ons
description: "DWP addons: four opt-in extensions (devcontainer, Dailybot, dependency-upgrade, design-system), the required AI Diff Reviewer local review with its optional CI surface, addon contract, and kit concepts."
order: 5
lang: en
section: Addons
---

# Add-ons

**Version 4.0.0.** Add-ons are extensions to the core Deep Work Plan methodology. Four of the five are optional and **never required for conformance** — a repository with zero optional addons is fully AI-first and DWP-conformant. Each optional addon is offered during onboarding, accepted or declined explicitly, and — when accepted — **reconciles** with existing setup instead of clobbering it. One component is the declared exception: since standard 2.3.0 the **AI Diff Reviewer local review** is part of the required baseline — onboarding installs it and every Final Review runs it — while its CI surface stays opt-in.

## The addon contract

Every shipping addon ships four mandatory components:

| Component | Purpose |
|-----------|---------|
| **Spec** | Normative RFC-2119 description of what the addon provides and what "conformant to this addon" means |
| **Reasoning templates** | Guides the agent fills by reasoning about the target repo's stack — not copy-paste |
| **Onboarding hook** | `SKILL.md` entry point the `onboard` flow calls when the developer accepts |
| **Validation step** | Checklist confirming the addon was applied correctly |

Discovery: the `onboard` flow enumerates `skills/deepworkplan/addons/` and presents each addon as an opt-in step in **Phase 7b**, after core scaffolding.

## Shipping addons (five)

Five addons ship today — four opt-in plus the required local review. Each has a **kit catalog page** with user-facing detail and a **normative spec** inside the Deep Work Plan skill.

### Devcontainer (first addon)

A compose-based `.devcontainer/` + `docker/` setup reasoned from the detected stack.

- **Kit page:** [Devcontainer](/kit/devcontainer)
- **What it adds:** persistent AI-CLI auth volumes (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, validation aliases (`codecheck`, `check`, `fix`, `test`), public-OSS secret hygiene
- **Behavior:** ~85% stable skeleton; ~15% reasoned per stack. Existing devcontainers are reconciled, never clobbered
- **When offered:** most repos with Docker or services that benefit from an isolated dev container

### Dailybot (second addon)

An opt-in connection to the developer's **Dailybot team** for agent progress visibility.

- **Kit page:** [Dailybot](/kit/dailybot) — full capability reference
- **What the DWP addon wires:** four plan-lifecycle reports (kickoff, significant task, blocked, completion) via the dailybot `report` sub-skill; optional deterministic hook enforcement (`dailybot hook`, CLI `>= 3.7.0`)
- **Paired skill:** installing [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (currently **3.10.3**) exposes **14 capabilities** — chat on Slack/Teams/Discord/Google Chat, check-ins, forms authoring, ask AI, kudos, per-repo API keys (`.dailybot/env.json`), email, and more. The DWP addon wires only **report**; other capabilities are invoked through the Dailybot skill directly
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

The **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, current **v2.0.1**) gives the mandatory Final Review security pass a structured local review, and optionally gates pull requests in CI. Since standard 2.3.0 the **local review is part of the baseline**; only the CI surface is opt-in.

- **Kit page:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — full capability reference
- **Required at onboarding (Phase 7a):** tag-pinned install of the vendored skill (`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.1 --skill ai-diff-reviewer -y`) plus a repo-tailored `.review/extension.md` (via `generate-extension`), under the onboarding consent; a targeted harness upgrade reconciles both when missing; a decline is recorded as a declared exception and reported by `verify` until installed
- **Required in every Final Review:** the security pass runs the upstream parent default flow over the accumulated change set and appends its output to the plan-local `analysis_results/SECURITY_REVIEW.md` (inside the plan's own folder, never the repository root); a missing skill or extension is a recorded `local reviewer not installed` finding — never a silent skip, and never a surprise bootstrap: installation belongs to the onboarding consent or an explicit addon invocation; `critical` findings from a completed pass block completion until fixed or explicitly accepted
- **Optional CI surface (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) via the upstream `setup` sub-skill, plus `apply-review` as a developer-invoked companion — offered explicitly, never installed unrequested, never the default, never a plan task
- **Never-block (invocation only):** a local review that could start but errors is warn-once-record-and-continue; it never fails the task
- **Parity (Flow B):** shared `prompt.md` + extension align methodology/severity; CI Iteration-Aware Review may shorten round 2+ while local stays a full pass
- **Vendor-neutral guardrail:** no Deep Work Plan flow requires a commercial service, CI provider or secret — the reviewer is an MIT, tag-pinned skill run by the developer's own coding agent
- **Conformance:** `verify` reports a missing local reviewer as a failure for repositories declaring standard 2.3.0 or newer and as a harness-version finding for legacy repositories

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
