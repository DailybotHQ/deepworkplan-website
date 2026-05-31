---
title: "Deep Work Plan — turn any repository into an AI-first codebase"
description: "Deep Work Plan turns any repository into an AI-first, agent-pilotable codebase. An open, MIT-licensed methodology and reference kit for structured, validated, resumable agent execution."
lastUpdated: 2026-05-30
---

## Turn any repository into an AI-first codebase

Deep Work Plan (DWP) is an open, MIT-licensed methodology and kit for planning and executing complex software work with AI agents. It documents your repository — AGENTS.md, docs, and an `.agents/` skills home — and produces long-horizon plans any agent can pilot, validate, and resume.

> Deep Work Plan is spec-driven development where the repository itself becomes the harness.

- [Quickstart](/quickstart)
- [Read the methodology](/methodology)

---

## The problem and the answer

AI coding agents are remarkably effective in short bursts. On long-horizon work — a migration, a new subsystem, a refactor across dozens of files — they drift: context fills up, decisions are forgotten, and multi-hour tasks are abandoned halfway through.

Deep Work Plan answers with **spec-driven development**: the plan is the durable source of truth, and agents execute against explicit acceptance criteria and validation gates. Drift drops, the work stays verifiable, and any agent can resume it across sessions. Unlike spec-driven tools tied to one IDE or vendor (GitHub Spec Kit, Amazon Kiro, Tessl), DWP is tool-agnostic and repo-native.

It is also **harness engineering** made portable. An agent harness is the scaffolding around a model — context, tools, control loop, guardrails, resumable state — that makes it reliable. Deep Work Plan installs that harness into the repository itself, so any agent can pilot any repo.

---

## What you get

- AGENTS.md at the repository root, reasoned from your real stack and commands.
- Categorized `docs/` and per-module documentation.
- An `.agents/` directory (skills, agents, commands) with the `.claude` to `.agents` symlink.
- The Deep Work Plan skill, installed once for every agent.
- Long-horizon, resumable plans in a gitignored `.dwp/` folder.

---

## How to adopt

1. Install the skill from `DailybotHQ/deepworkplan-skill`.
2. Generate a plan from your initiative.
3. Execute with any agent — Claude Code, Cursor, Codex, Gemini, or Copilot.

```
npx skills add DailybotHQ/deepworkplan-skill
```

---

## The methodology, specification, and kit

- [Read the methodology](/methodology) — what DWP is, the principles, the workflow, and how to adopt it.
- [Read the specification](/spec) — task anatomy, validation gates, the completion protocol, archetypes, and addons.
- [Explore the kit](/kit) — presets, adapters, and commands for installing DWP into a repository.
- [See examples](/examples) — before-and-after walkthroughs of real engineering work.

---

## Who builds it

Deep Work Plan grew out of real engineering work at [Dailybot](https://www.dailybot.com) and is maintained by Dailybot together with the open-source community.

- [About the methodology](/about)
- [Community & contact](/contact)
- [GitHub repository](https://github.com/DailybotHQ/deepworkplan-website)
