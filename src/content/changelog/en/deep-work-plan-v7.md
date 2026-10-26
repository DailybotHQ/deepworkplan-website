---
title: "DWP v7: plans that delegate, with a record of everything"
description: "Deep Work Plan v7 keeps the v6 contract and journal, lets a plan hand bounded tasks to other agents, and adds four optional addons for autonomy."
date: 2026-10-09
version: "v7 · Delegation with evidence"
kind: release
lang: en
order: 0
featured: true
sourceLabel: "Published v7 schema set"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
---

Deep Work Plan v7 keeps the v6 method: the contract is the authority, the append-only journal is the memory, the scheduler decides what runs next, and a task closes only when recorded evidence satisfies its criteria. v7 adds the ability to delegate, and keeps the same discipline around the result.

A plan that grants `agent_delegation` can mark a task `parallel_safe` and hand it to another agent. The delegate's reply is recorded as data, never as instructions, and stays `asserted` until the plan's own gate runner observes the outcome. Only the runner mints `observed` evidence, so delegation adds reach without lowering the bar for completion.

Four optional addons turn delegation into practical autonomy. Herdr hands a task to an agent in a pane, on any machine. Agentkit puts one `ak` command over every terminal coding agent, with autonomy by default and an opt-out, and runs bounded tasks headless in a git worktree. Devcontainer gives each repository a reproducible container with no SSH key inside by default (git over SSH through the host agent; key files only on an explicit `[ssh] copy_keys` opt-in). DeepWorkPlan Vim is a terminal editor with a plan browser and Markdown viewer. Each is pinned by tag to a product with its own repository and works without Deep Work Plan. A repository is fully conformant with none of them, and the registry in `.dwp/config.json` records which are enabled.

Benchmark and learnings mode records what each plan teaches, so findings can be analysed afterwards. An audit of the whole ecosystem, run as a v7 orchestrator plan with one agent per repository, found no behavioural regression against v6: the pack suite passes 807 of 807 on a clean environment, and instruction load grew 0.1% to 3.9% per flow (4.6% for the whole pack), measured in bytes on both tags rather than estimated as tokens.

v7 is a step change in orchestration and auditability, not yet fully hands-off autonomy. Release 7.2.0 closes the gaps that audit found: benchmark and learnings now measure v7 plans, starting a task before its prerequisites are complete is refused, and the test suite runs hermetically (815 of 815 on a clean environment). Agent outcome non-inferiority has not been measured. Existing plans keep their recorded generation and are never migrated implicitly; new plans use the v7 contract by default.

Release 7.6.0 (2026-10-11) introduced orchestration at scale: one lane per repository or workstream, accounts chosen by headroom (`ak usage`, `ak pick`), unattended launch, and onboarding that detects every addon, upgrades the ones in use and offers the ones that fit.

Release 7.7.0 (2026-10-12) delivered swarm autonomy (Guide §17): the capacity loop (`shared/swarm.py`), handoff packets (`dwp-handoff-v1`), lead succession with epochs and fencing, lane-to-lane asks, the AGENT_PROTOCOL §7.5 escalation taxonomy (C1–C7: decide and record everything else), the quality bar (gates are hypotheses, verified not asserted), and methodology learnings from 313 executed plans across 23 repositories. Known limit: the v7 journal has no dedicated event for a lane handoff or a lead succession (they are recorded as a cancelled delegation plus an observation).

Release 7.8.0 (2026-10-13) established Ecosystem 1.0: every product the pack integrates reached its first stable release and is pinned at v1.0.0 under semantic versioning (coding-agents-kit, herdr-peers, devcontainer-kit and deepworkplan-vim, each with a verified `SHA256SUMS` digest), alongside the AI Diff Reviewer v3.3.14 and Dailybot agent-skill v3.23.17 pins; 7.8.1 (2026-10-14) then pinned the coding-agents-kit and devcontainer-kit v1.0.1 patch releases.

Release 7.9.0 (2026-10-25) pins the Herdr addon to herdr-peers v1.1.0, whose native debate sub-skill lets a lead run a panel of peers through rounds and close with a decision record, and pins the AI Diff Reviewer at v3.3.16; the pack's CI now runs its Python 3.9 floor job on ubuntu-24.04.

Installed skill release: **7.9.0**, stable since 7.0.0.
