---
title: "Deep Work Plan — structured execution for AI coding agents"
description: "Spec-first, loop-closed: Deep Work Plan makes your repository the harness for AI coding agents, and each plan runs to done under a human-started loop."
lastUpdated: 2026-11-17
---

*Spec-first · closed-loop*

## Turn your repo into one any AI agent can finish work in.

Your repository holds the plan, the context and the checks, so the work survives restarts, moves between agents and keeps looping until every gate passes — within the authority you grant.

Deep Work Plan (DWP) is an open, MIT-licensed methodology and kit for planning and executing complex software work with AI agents. You do not pick an install method or copy a template — you copy the init.md prompt and paste it into your agent:

> Copy the init.md prompt and paste it into your coding agent — Claude Code, Cursor, Codex, or any other — to make any repository AI-first.


- [Open the /init prompt](/quickstart)
- [Read the methodology](/methodology)

---

## What the methodology stands on.

1. **Spec-first** — the plan is the durable source of truth: atomic tasks, acceptance criteria, and validation gates the agent must pass.
2. **The repository is the harness** — context, tools, guardrails, and state live in the repository as plain files any agent can read.

3. **Loop engineering** — Plans run to their end: registration, a human-started daemon, nudges that add no authority, failover, and plan events.
4. **Measured efficiency** — instruction bytes per flow, measured and published with their method — never invented token percentages.

---

## The problem and the answer

A coding agent performs beautifully on short tasks. But hand it a long-horizon mission — a migration, a new subsystem, a refactor at scale — and drift sets in: the context window fills, earlier decisions fade, and hours of work stall halfway through.



Context is your agent’s scarcest resource, so the harness keeps its own instructions lean and auditable. Instructions load progressively, validation follows the changes, and each task gets the context relevant to its work. We publish the instruction load for each flow in bytes, making that overhead visible. Plans scale to the work too: Lite for a bounded fix, Full for work that spans hours. The format follows the scope, keeping the process focused and traceable.

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

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[See what onboarding generates](/quickstart)

---

## Plans run to their end. Authority stays with people.

Loop engineering is how a plan finishes without a human polling it. Rows below describe released contracts in the loop: most come from herdr-peers, while the plan queue is a pack contract. Herdr is optional; the methodology works without it.

> Spec-first says what; the harness says where; loop engineering says how it finishes.

**The loop:** Register (`lead claim`, lead and succession) → Daemon (`autopilot --loop`, started by a human) → Nudge (`idle ≥ 5 min`, adds no authority) → Failover (`lead takeover`, first reachable successor) → Notify (`plan-event-v1`, to the human's command) → Done (`plan_completed`, gates passed). Every open plan with a lead record, until its own state says done.



| Contract | What it guarantees | Source (herdr-peers v2.2.1) |
| --- | --- | --- |
| Plan registration (`herdr-peers lead claim`) | A plan the loop watches has a lead record with an epoch and a succession. Only the holder of the highest epoch acts as its lead. | `skills/herdr-peers/protocol.md` §12 |
| Human-only start (`herdr-peers autopilot start --loop`) | Only a human starts the daemon, in their own words. No ask, reply, or notice can start it, stop it, or change what it does. | `skills/herdr-peers/autopilot.md` §1 |
| Nudges add no authority (`plan_stalled`) | The idle lead of an open plan gets one fixed prompt to continue. Gates, stop conditions, and escalations bind as before; three prompts without progress mark the plan stalled. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Failover to successors (`herdr-peers lead takeover`) | When the lead is gone, the first reachable successor is asked to take over, and the helper checks the evidence again. A lane takes the lead only under a grant the human recorded in advance. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Plan events (`plan-event-v1`) | When a plan stalls, blocks, loses its lead, starts from the queue, or completes, a command the human chose receives one plan-event-v1 object. The pack ships a Dailybot notifier for it. | `docs/schema/plan-event-v1.json` |
| Fleet map (`plans-v1` · `fleet-v1`) | Each machine reports its plans as plans-v1; the daemon keeps the fleet-v1 map of every machine, agent, repository, and plan, and fleet ui shows it read-only. | `docs/schema/fleet-v1.json` |
| Plan queue (`dwp-queue-v1`) | The pack validates and writes the queue; the daemon reads it to continue queued plans. | `skills/deepworkplan/shared/queue.py` |
| Lead verify (`herdr-peers lead verify`) | Before any merge, tag, or release, the lead confirms it still holds the plan on every machine. A newer lead refuses it; an unreachable machine stops it unless that risk is accepted on record. | `skills/herdr-peers/protocol.md` §12 |

The decision brain (`--brain`) and lead appointment (`--appoint`) are opt-in flags of the same daemon, each switched on by a human. The daemon never merges, releases, signs in, or changes a permission.

[Read the Herdr addon](/kit/herdr)

---

## Instruction bytes per flow, measured.

The harness publishes what each flow must read before it starts: the router, the sub-skill, and the shared resources it links. These are the compulsory read sets of the released pack.

| Flow | Entry bundle (bytes) |
| --- | ---: |
| `create` | 74,974|
| `execute` | 55,136|
| `resume` | 32,023|
| `refine` | 77,014|
| `onboard` | 82,051|
| `status` | 27,311|
| `verify` | 36,701|

Unit: filesystem bytes. Measured on the released pack with the command below: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.4).

Provider tokens, cost, and loop-closure statistics are not shown: no tagged source measures them yet, so they have no row. The script’s bytes ÷ 4 token figure is a labeled estimate, never a measurement.

[Read the evaluation ledger](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.4/docs/EVALUATION.md)

---

## What you get

- AGENTS.md at the repository root, reasoned from your real stack and commands.
- Categorized `docs/` and per-module documentation.
- An `.agents/` directory (skills, agents, commands) with the `.claude` to `.agents` symlink.
- The Deep Work Plan skill, installed once for every agent — including the author sub-skill, so the repository can grow its own skills, agents, and commands, plus opt-in add-ons such as dependency-upgrade and the design-system add-on for any user-facing interface surface.
- Long-horizon, resumable plans in a gitignored `.dwp/` folder. The methodology itself needs no daemon and no external state; the optional loop daemon adds continuity, never a dependency.
- Multi-agent delegation and Ecosystem 1.0 — coordinate parallel agents safely with isolated worktrees, asserted-until-gated evidence, capacity handoff, and optional pinned ecosystem addons (agentkit, Herdr, devcontainer, Vim, AI Diff Reviewer).

---

## What happens when you run it

1. **Your agent opens [/init.md](/init.md)** — it reads the onboarding prompt and the methodology, spec, and kit it links to.
2. **It installs the Deep Work Plan skill** — the engine, identical in every repository: the router plus its sub-skills (create, execute, refine, resume, status, verify, onboard, author, upgrade), for Claude Code, Cursor, Codex, Gemini, and Copilot.
3. **It adapts your repository** — reasoning about your real stack (never copy-pasting), it writes AGENTS.md, `docs/`, per-module READMEs, a reasoned `.agents/` kit, and a gitignored `.dwp/`. Your repository becomes the harness.
4. **You plan and execute** — long-horizon Deep Work Plans, run step by step against explicit acceptance criteria and validation gates, autonomously for hours.
5. **A human starts the loop** — optional, with the Herdr addon: you — never an agent — run `herdr-peers autopilot start --loop`. Every open plan with a lead record keeps running to its end, and your notifier hears when one stalls, blocks, or completes.

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
