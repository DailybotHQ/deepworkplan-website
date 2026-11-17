---
title: "DWP v8: spec-first, loop-closed"
description: "Deep Work Plan v8 joins spec-first plans, a repository harness, loop engineering and measured efficiency; the loop runs approved plans to completion."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: en
order: 0
featured: true
sourceLabel: "Skill release v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill release v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Skill release v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Skill release v8.0.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.3"
  - label: "LOOP_ENGINEERING.md (normative, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering in the specification reader"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "plan-contract/v8 schema"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "journal-event/v8 schema"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "plan-snapshot/v8 schema"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "The plan queue writer (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 brings four ideas together: spec-first development, the repository as the agent harness, loop engineering, and measured efficiency. Its working sentence is: “Spec-first, loop-closed: the repository is the harness and the plan runs itself to done.”

## The four pillars

1. **Spec-first.** The plan and its specification are the durable source of truth, with explicit acceptance criteria and validation gates.
2. **The repository is the harness.** Context, tools, control rules, and resumable state live with the code, so different agents can work from the same repository.
3. **Loop engineering.** An approved plan can keep moving through its recorded lifecycle until it is done.
4. **Measured efficiency.** Efficiency is reported in instruction bytes per flow, with a published measurement path; no token percentages are inferred.

## What loop engineering means

The plan registers a lead and an ordered succession. A human starts the optional Herdr daemon with `herdr-peers autopilot --loop`; its nudges ask a lead to continue without granting new authority. If a lead is gone, the loop can ask a listed successor to take over. Plan events can reach the pack's Dailybot notifier, and the fleet view shows agents and plans across enabled machines. The human remains responsible for starting the daemon, and the Herdr addon is optional.

## Releases carrying the machinery

The pack's v7.11.0 hardening and v7.12.x plan registration and notifier releases provide the plan-side machinery. herdr-peers v1.3.x adds the loop, reporting, and fleet view; v2.0.0 adds the protocol-2 brain and queue consumer. coding-agents-kit v1.3.0 provides the pick-v2 launch contract, while v1.4.0 adds the verified vendor updater. herdr-peers v2.1.0 reads the v8 structured blockers, and coding-agents-kit v1.5.0 adds reported-only token metering; the pack 8.0.0 addon descriptors pin herdr-peers v2.1.0, coding-agents-kit v1.5.0 and devcontainer-kit v1.3.0. These releases are tagged and linked above. The pack works without these optional addons.

## The v8 contract

Release 8.0.0 implements DWP standard 8.0.0. New plans are created on `plan-contract/v8`; v7, v6 and v5 plans keep their recorded generation and move only through an explicit `refine migrate`. v8 plans keep the `plan-manifest/v7` line, and `journal-event/v7` stays supported for existing plans. The normative source is `LOOP_ENGINEERING.md`, with three published schemas.

- **The `autonomy` block.** An optional, closed block in `plan-contract/v8` records the plan's loop authority: `stall_budget` (1–10, default 3), `promptable` panes (default: the lead only), `notify` targets (default: none), `brain` (default: `false`) and `queue` (`prompt-lead`, `launch` or `none`, default `none`). An absent block means every default, and the human stays the resolver.
- **Structured blockers.** A blocker is a `blocker` event of `journal-event/v8`, raised and resolved only through the ledger helper, with a task, a reason, one line of `needs`, a required class from C1 to C7 and an optional resolver. `resolver: lead` is refused for C1, C2, C5 and C6, and the loop asks a lead to resolve only a blocker the plan itself marked `resolver: lead`. `state.json` becomes `plan-snapshot/v8`, with the active blocker and a derived `blocked` status, and `PROGRESS.md` opens with a four-line header: goal, current task, next action and needs.
- **The plan queue.** `.dwp/queue.json` (`dwp-queue-v1`) is written only by the pack's `shared/queue.py` or a human; create appends a plan on approval, and the Herdr daemon only reads it. A queue holds at most 64 plans, runs one plan at a time per repository unless it sets `parallel: true`, and a damaged queue never breaks the lifecycle.

The final v7 release was **7.12.2**.

Installed skill release: **8.0.3**.
