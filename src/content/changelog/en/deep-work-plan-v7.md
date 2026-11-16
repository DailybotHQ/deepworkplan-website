---
title: "DWP v7: plans that delegate, with a record of everything"
description: "Deep Work Plan v7 keeps the v6 contract and journal, lets a plan hand bounded tasks to other agents, and adds four optional addons for autonomy."
date: 2026-10-09
version: "v7 · Delegation with evidence"
kind: release
lang: en
order: 0
featured: false
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
  - label: "Skill release v7.10.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.0"
  - label: "Skill release v7.10.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.1"
  - label: "Skill release v7.10.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.2"
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.1"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
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

Release 7.10.0 (2026-10-26) turns consequential decisions into team decisions: with the Herdr addon enabled and herdr-peers 1.1.0 or later in use, `create` plans each consequential decision — two viable options with materially different outcomes, hard to reverse or cross-cutting, and settled by nothing in the repository — as a listed decision task, and `execute` leads a herdr-peers `decide` debate for it without voting, journaling every seat as a read-only delegation and recording the choice with its decision record. Nothing changes without Herdr: a missing precondition or a failed debate falls back to the agent's own decision record, and `config.py decisions debate off` restores one-agent judgment. The Dailybot addon pin moves to agent-skill v3.23.20, the vendored release.

Release 7.10.1 (2026-11-15) pins the Herdr addon to herdr-peers v1.2.1, whose 1.2.x line adds autopilot: an optional daemon that only a human starts, which accepts the recommended option for every waiting agent, follows multi-step dialogs to their end and never touches a login or a permission-bypass acknowledgement. Protocol 1 is unchanged.

Release 7.10.2 (2026-11-15) moves the ecosystem pins with the day's releases: the Herdr addon to herdr-peers v1.2.2, a fix-only patch whose autopilot now answers a question shown with a preview beside its options and recognises the recommended mark in Spanish, French, German and Italian; agentkit to coding-agents-kit v1.2.0, whose `ak last` resumes the newest session of a working directory in any terminal and whose launches inside a Herdr pane restore that pane after a Herdr restart or a reboot; devcontainer-kit to v1.1.2 and deepworkplan-vim stays v1.0.1; the release workflow now retries the release tag push to absorb transient rejections.

Release 7.11.0 (2026-11-16) lands the developer's v7 hardening series: the durability glossary and the visible control rules enter the guide, `verify` gains a read-only compliance audit of finished plans, the pack docs state durability and token claims precisely, the README tagline is replaced by the comprehension-test winner, and the live create path keeps the Lite bundle inside its instruction budget.

Release 7.12.0 (2026-11-16) registers plans with the herdr-peers loop: a plan claims its lead with a succession list, so `autopilot --loop` and the fleet UI can see every open plan and keep it running to its end, and a Dailybot notifier reports the milestones; the addon descriptors move to herdr-peers v1.3.1 and coding-agents-kit v1.3.0.

Release 7.12.1 (2026-11-16) fixes the Herdr addon's Dailybot notifier: it now accepts the `herdr-peers/plan-event-v1` event name herdr-peers emits, caps the notifier's stdin at 64 KiB and maps `plan_lead_moved`; the addon descriptors move to coding-agents-kit v1.4.0, whose `ak update` is documented as human-invoked only.

Release 7.12.2 (2026-11-16) lets the Herdr addon accept herdr-peers protocol 1 and 2 and pins it to herdr-peers v2.0.0: with a protocol 2 install, detection no longer fails silently and the addon keeps its delegation abilities.

Installed skill release: **7.12.2**, stable since 7.0.0.
