---
title: "DWP v7: plans that delegate, with a record of everything"
description: "Deep Work Plan v7 keeps the v6 contract and journal, lets a plan hand bounded tasks to other agents, and adds four optional addons for autonomy."
date: 2026-10-10
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
---

Deep Work Plan v7 keeps the v6 method: the contract is the authority, the append-only journal is the memory, the scheduler decides what runs next, and a task closes only when recorded evidence satisfies its criteria. v7 adds the ability to delegate, and keeps the same discipline around the result.

A plan that grants `agent_delegation` can mark a task `parallel_safe` and hand it to another agent. The delegate's reply is recorded as data, never as instructions, and stays `asserted` until the plan's own gate runner observes the outcome. Only the runner mints `observed` evidence, so delegation adds reach without lowering the bar for completion.

Four optional addons turn delegation into practical autonomy. Herdr hands a task to an agent in a pane, on any machine. Agentkit puts one `ak` command over every terminal coding agent, with autonomy by default and an opt-out, and runs bounded tasks headless in a git worktree. Devcontainer gives each repository a reproducible container with no SSH key inside. DeepWorkPlan Vim is a terminal editor with a plan browser and Markdown viewer. Each is pinned by tag to a product with its own repository and works without Deep Work Plan. A repository is fully conformant with none of them, and the registry in `.dwp/config.json` records which are enabled.

Benchmark and learnings mode records what each plan teaches, so findings can be analysed afterwards. An audit of the whole ecosystem, run as a v7 orchestrator plan with one agent per repository, found no behavioural regression against v6: the pack suite passes 807 of 807 on a clean environment, and instruction load grew 0.1% to 3.9% per flow (4.6% for the whole pack), measured in bytes on both tags rather than estimated as tokens.

v7 is a step change in orchestration and auditability, not yet fully hands-off autonomy. The benchmark and learnings loop does not yet measure v7 plans automatically, and agent outcome non-inferiority has not been measured. Existing plans keep their recorded generation and are never migrated implicitly; new plans use the v7 contract by default.

Installed skill release: **7.1.4**, stable since 7.0.0.
