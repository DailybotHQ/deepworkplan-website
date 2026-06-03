---
title: "Deep Work Plan — turn any repository into an AI-first codebase"
description: "Context matters more than models. Deep Work Plan turns any repository into a structured environment where any coding agent finishes long-horizon work."
lastUpdated: 2026-06-03
---

## Models matter. Context matters more.

Deep Work Plan turns any repository into a structured environment — context, guardrails, and a durable plan — where any coding agent executes with precision and finishes long-horizon work.

Deep Work Plan (DWP) is an open, MIT-licensed methodology and kit for planning and executing complex software work with AI agents. You do not pick an install method or copy a template — you hand your agent one line:

> Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.

Your agent reads the plan, installs the kit, and onboards your repository — reasoning about your actual stack, never pasting a template.

> Deep Work Plan is spec-driven development where the repository itself becomes the harness.

- [Open the /init prompt](/init)
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
- The Deep Work Plan skill, installed once for every agent — including the author sub-skill, so the repository can grow its own skills, agents, and commands, plus opt-in maintenance add-ons such as dependency-upgrade.
- Long-horizon, resumable plans in a gitignored `.dwp/` folder.

---

## What happens when you run it

1. **Your agent opens [/init.md](/init.md)** — it reads the onboarding prompt and the methodology, spec, and kit it links to.
2. **It installs the Deep Work Plan skill** — the engine, identical in every repository: the router plus its sub-skills (create, execute, refine, resume, status, verify, onboard, author), for Claude Code, Cursor, Codex, Gemini, and Copilot.
3. **It adapts your repository** — reasoning about your real stack (never copy-pasting), it writes AGENTS.md, `docs/`, per-module READMEs, a reasoned `.agents/` kit, and a gitignored `.dwp/`. Your repository becomes the harness.
4. **You plan and execute** — long-horizon Deep Work Plans, run step by step against explicit acceptance criteria and validation gates, autonomously for hours.

The skill is the reusable engine, installed the same way everywhere; what gets adapted is your repository. Installation mechanics (Skills CLI, OpenClaw, or git clone) live in the [/init.md](/init.md) prompt and on the [quickstart](/quickstart).

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
