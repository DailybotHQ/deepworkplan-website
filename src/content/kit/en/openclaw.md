---
title: OpenClaw
description: "The DWP adapter for OpenClaw: native .agents/skills scanning, unattended execution mapping, and cron-driven plan continuation for autonomous agent workspaces."
kind: adapter
lang: en
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw adapter

OpenClaw is an autonomous agent platform that runs long-lived workspaces with scheduled turns. It natively scans `<workspace>/.agents/skills/` for installed skill packs, which means the DWP skill loads without any adapter shim — install it there and OpenClaw picks it up automatically.

## Support level

**Full** — OpenClaw reads `AGENTS.md` and loads the skill via the AgentSkills standard. All DWP sub-skills (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) are available.

## Installation

```bash
openclaw skills install deepworkplan
```

Or manually: clone `DailybotHQ/deepworkplan-skill` into `<workspace>/.agents/skills/deepworkplan/`.

## Invocation

Plain text — OpenClaw does not use a slash-command prefix:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Unattended execution mapping

OpenClaw's scheduling primitives map directly to DWP's continuation model:

| OpenClaw primitive | DWP role |
|--------------------|----------|
| Workspace root | [Agent workspace](/spec/archetypes) archetype: `AGENTS.md`, `.agents/`, `.dwp/` at the workspace root |
| `<workspace>/.agents/skills/` (native tier-2 scan) | Where this pack lives — no adapter shim needed |
| Heartbeat or cron turn | One [scheduled continuation](/spec/agent-protocol#scheduled-continuation) turn: wake → DWP Resume Protocol → next atomic task → update state → yield |
| `HEARTBEAT.md` checks | Add one line: "If `.dwp/plans/` has an open plan, resume it for one task." |
| Standing orders | The plan-approval boundary and the bounded authority of the unattended profile |

Operationally:

1. A human creates and approves a plan interactively. Approval is the control point — unattended turns never create-and-execute in one turn.
2. The plan must carry the machine-readable state layer (`manifest.json` + `state.json`). In a workspace without git, `state.json` is what makes crash-safe resume possible. See [Plan state](/spec/plan-state).
3. Each heartbeat or cron turn executes at most one task, passes its validation gate, updates `state.json` atomically, and yields.
4. On any stop condition the agent writes `state.json`'s `blocked` field and reports through the workspace's normal channel. The next human glance — or heartbeat report — sees exactly what is needed.

The result: a multi-day plan that survives restarts, model changes, and session boundaries, executed overnight by the daemon — with the same gates a human-supervised run would have.

## Notes

OpenClaw's workspace is the canonical example of the [agent workspace](/spec/archetypes) archetype. The DWP skill pack's `HEARTBEAT.md` integration and `state.json` requirement were designed with this platform in mind.
