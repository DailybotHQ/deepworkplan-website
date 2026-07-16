---
title: "The Deep Work Plan Kit"
description: "The skill and its eight sub-skills, commands, agent adapters, onboarding presets, opt-in add-ons, and examples that make Deep Work Plan runnable anywhere."
lastUpdated: 2026-07-16
---

## The Deep Work Plan Kit

The kit is everything you need to run the methodology in practice. It is installed from
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### The skill and its sub-skills

The Deep Work Plan skill is a router plus eight sub-skills:

- **create** — decompose a goal into a structured plan (`/dwp-create`).
- **execute** — run a plan task by task, validating each gate (`/dwp-execute`).
- **refine** — add, remove, or reorder tasks while preserving completed work (`/dwp-refine`).
- **resume** — reconstruct state and continue an interrupted plan (`/dwp-resume`).
- **status** — report progress without making changes (`/dwp-status`).
- **verify** — objectively check repository and plan conformance (`/dwp-verify`).
- **onboard** — make a repository AI-first (`/deepworkplan-onboard`).
- **author** — create or evolve the repo's own skills, agents, and commands (`/skill-create`, `/agent-create`).

### Commands

Thin slash commands delegate to the sub-skills and addons:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — the plan-execute-verify loop.
- `skill-create`, `agent-create` — delegate to the author sub-skill.
- `lib-upgrade` — delegates to the dependency-upgrade addon (installed only when that addon is accepted).

### Adapters

Thin per-agent integrations for Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes, and cloud/background agents (Claude Code remote tasks, Codex cloud, Jules-class). OpenClaw and Hermes are autonomous agent platforms that run plans under the unattended execution profile, driven by heartbeat or cron scheduling.

### Onboarding presets

Per-stack reasoning guides the onboard flow uses to adapt docs, skills, and validation commands —
never templates. Six presets: Django, Vue + Vite, Astro/Svelte, Node/TS service, Python package/CLI,
and a generic fallback.

### Addons (opt-in)

Optional capabilities the onboard flow can layer onto a repo — never part of the AI-first baseline:

- **Devcontainer** — a reproducible, isolated dev container with persistent AI-CLI auth.
- **Dailybot** — plan-lifecycle reporting (kickoff, significant task, blocked, completion) for teams using Dailybot, plus access to the full Dailybot agent skill (3.10.3: chat, check-ins, forms, ask AI, per-repo API keys, and more).
- **Dependency upgrade** — package-manager-agnostic, batched, validated, revertible upgrades.
- **Design system** — an interface-scoped `DESIGN.md` (at `docs/DESIGN.md`, referenced from `AGENTS.md`) reasoned from the repo's real design source, with profiles for visual UI, styled CLI output, and conversational messaging, so agents generate on-brand interface output; the visual profile is default-on when a design system is detected, the CLI and conversational profiles are recommended when detected and always asked about.
- **AI Diff Reviewer** — augments Security Review with a structured local review ([AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v2 + required `.review/extension.md`); optional Flow B adds a CI PR merge gate sharing the same extension. Always ask Flow A vs Flow B; never auto-install.

### Examples

Worked, before-and-after walkthroughs.

- [Browse the kit](/kit)
- [Quickstart](/quickstart)
- [See examples](/examples)
