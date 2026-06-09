---
title: Hermes
description: "The DWP adapter for Hermes: AgentSkills-standard skill loading, episodic memory synergy via outcome records in state.json, and cron-driven plan continuation."
kind: adapter
lang: en
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes adapter

Hermes is an autonomous agent platform that loads skills via the AgentSkills standard and maintains episodic memory across sessions. DWP integrates with both surfaces: the skill pack loads from `.agents/skills/` the same way as any other AgentSkills-compatible pack, and `state.json`'s outcome records feed directly into Hermes's memory index.

## Support level

**Full** — Hermes reads `AGENTS.md` and loads the skill via AgentSkills-standard loading. All DWP sub-skills are available.

## Installation

Install the skill pack into the workspace's `.agents/skills/` directory, or use the platform's skill manager if available.

## Invocation

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Episodic memory synergy

Hermes indexes agent memory to make past work retrievable across future sessions. DWP's `state.json` outcome records are designed for exactly this use: each completed task carries what was `tried`, what `failed`, what `worked`, and free-form notes in a structured JSON field. When Hermes indexes the workspace's `.dwp/plans/` state files, completed plans become retrievable episodic memory — an agent can later recall how a specific problem was solved, not just that a plan ran.

This means DWP plans on Hermes are durable in two ways: the markdown files are the human-readable record, and the `state.json` outcome records are the machine-indexable memory. See [Plan state](/spec/plan-state#outcome-records-as-episodic-memory).

## Cron-driven continuation

On platforms with cron scheduling, continuation follows the same pattern as other autonomous platforms: each scheduled turn wakes, runs the DWP Resume Protocol, executes at most one task, updates `state.json`, and yields. The plan, not the session, is the unit of continuity.

The machine-readable state layer (`manifest.json` + `state.json`) is REQUIRED for unattended execution. See [Agent protocol](/spec/agent-protocol#execution-profiles) for the full stop-condition and escalation protocol.

## Notes

Hermes and OpenClaw are both autonomous agent platforms in the supported-agents table in [Agent protocol](/spec/agent-protocol). Both run under the unattended execution profile and both benefit from the agent workspace archetype's `state.json`-as-git-log equivalence.
