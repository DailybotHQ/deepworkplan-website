---
title: "Deep Work Plan — structured execution for AI coding agents"
description: "Context matters more than models. Deep Work Plan turns any repository into a structured environment where any coding agent finishes long-horizon work."
lastUpdated: 2026-09-10
---

## Models matter. Context matters more.

Deep Work Plan turns any repository into a structured environment — context, guardrails, and a durable plan — where any coding agent executes with precision and finishes long-horizon work.

Deep Work Plan (DWP) is an open, MIT-licensed methodology and kit for planning and executing complex software work with AI agents. You do not pick an install method or copy a template — you copy the init.md prompt and paste it into your agent:

> Copy the init.md prompt and paste it into your coding agent — Claude Code, Cursor, Codex, or any other — to make any repository AI-first.

> Deep Work Plan is spec-driven development where the repository itself becomes the harness.

- [Open the /init prompt](/init)
- [Read the methodology](/methodology)

---

## The problem and the answer

A coding agent performs beautifully on short tasks. But hand it a long-horizon mission — a migration, a new subsystem, a refactor at scale — and drift sets in: the context window fills, earlier decisions fade, and hours of work stall halfway through.

Deep Work Plan answers with spec-driven development: a durable plan, atomic tasks, and validation gates the agent must pass. Work stays verifiable — and any agent can resume it across sessions.

And because context is the scarcest resource your agent has, the harness is engineered for token efficiency: instructions load progressively, validation touches only what changed, and every task learns locally — so long-horizon work stays affordable.
---

## Humans steer. Agents execute.

You decide what done means and where the lines are. The plan carries your intent; the agents do the hours — no babysitting, no correcting every twenty minutes.

- You: intent, acceptance criteria, review
- Agents: execution, task by task
- The plan: the contract between them

[Read the methodology](/methodology)

---

## A plan agents can't drift from.

Long tasks fill any model's context. Details fall away and the agent drifts. A written plan — atomic tasks, validation gates, resumable state — is what it returns to, lap after lap.

1. Plan
2. Atomic tasks
3. Validation gates
4. Completion
5. Resumable state

[See the core loop](/methodology)

---

## Done is a contract, not a vibe.

Each task names its acceptance criteria and the checks that must pass. The agent doesn't get to feel finished — it has to pass, or the task stays open.

- Tests pass
- Types check
- Acceptance criteria met
- Or the task stays open

[Read the specification](/spec)

---

## The repository is the harness.

Context, tools, guardrails, and state live in your repository as plain files any agent can read. No lock-in, no external brain — it survives context resets.

- Durable spec on disk
- Validation gates, not vibes
- Survives context resets

**PE · ASK · HECK · TAT · OOL**

[See what onboarding generates](/quickstart)
---

## What you get

- AGENTS.md at the repository root, reasoned from your real stack and commands.
- Categorized `docs/` and per-module documentation.
- An `.agents/` directory (skills, agents, commands) with the `.claude` to `.agents` symlink.
- The Deep Work Plan skill, installed once for every agent — including the author sub-skill, so the repository can grow its own skills, agents, and commands, plus opt-in add-ons such as dependency-upgrade and the design-system add-on for any user-facing interface surface.
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
