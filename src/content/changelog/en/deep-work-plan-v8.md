---
title: "DWP v8: spec-first, loop-closed"
description: "Deep Work Plan v8 joins spec-first plans, a repository harness, loop engineering and measured efficiency; the loop runs approved plans to completion."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: en
order: 0
featured: true
sourceLabel: "Tagged releases and v8 contract draft"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
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
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
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

The pack's v7.11.0 hardening and v7.12.x plan registration and notifier releases provide the plan-side machinery. herdr-peers v1.3.x adds the loop, reporting, and fleet view; v2.0.0 adds the protocol-2 brain and queue consumer. coding-agents-kit v1.3.0 provides the pick-v2 launch contract, while v1.4.0 adds the verified vendor updater. These releases are tagged and linked above. The pack works without these optional addons.

## V8 contract changes — RE-VERIFY AT 8.0.0

The current `origin/feat/v8-line` draft adds an `autonomy` block to plan-contract/v8. It records the plan's loop authority: stall budget, promptable panes, notification targets, whether a brain may act, and queue behavior. The draft also defines `dwp-queue-v1` for `.dwp/queue.json`; the pack writes queue state, while Herdr consumes it. These two contract claims are provisional and must be checked against the tagged 8.0.0 artifacts before publication.
