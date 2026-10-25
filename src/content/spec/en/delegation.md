---
title: Delegation
description: "How a v7 plan hands parallel_safe tasks to other coding agents under the agent_delegation grant, with delegation records and gated, observed evidence."
order: 11
lang: en
section: Record layer
---

# Delegation

> **Version scope:** This page restates the v7 contract generation at release `v7.8.1`. Canonical sources: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) and the execute flow's [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md). Where this page and those files differ, the files win.

**Version 7.0.0. Status: Stable.** v7 is a new contract generation of the [record layer](/spec/record-layer), not a new lifecycle: everything in the v6 contract, lifecycle, context and resources documents applies unless this page says otherwise. Not delegating is always correct. The keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

## What v7 adds

v7 adds exactly two things to the record layer:

1. **One optional task field in the contract**, `parallel_safe`, published in [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **One journal event type**, `delegation`, published in [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

The v1, v2, v5 and v6 schema bytes are unchanged. A plan that never delegates is indistinguishable from a v6 plan except for its schema URLs.

## `parallel_safe`

`parallel_safe` (boolean, default `false`) asserts that a task can run in a delegate without interleaving with sibling work. It is set by `create`, never inferred during execution, and only when all of these hold:

- the repository enables a delegation addon (agentkit or Herdr) in its [addon registry](/spec/resources-and-abilities#the-configuration-file-and-addon-registry);
- the task's touched surface does not overlap a sibling task that could be in progress at the same time;
- the task declares a bounded output;
- the task's gates run in this plan.

Marking a task changes no authority: a contract without the `agent_delegation` grant may carry markers, and they authorize nothing.

## The `delegation` event

One event is recorded per state transition of one delegate:

| Field | Meaning |
| --- | --- |
| `task` | the `T-*` task the delegate works for |
| `delegation_id` | correlates a launch with its terminal transition |
| `transport` | `headless` (agentkit) or `interactive` (Herdr) |
| `via` | the addon key that carried it |
| `state` | `launched`, then exactly one of `completed`, `failed`, `cancelled` |
| `kind`, `profile` | optional: the coding-agent kind and profile |
| `target` | optional: the working directory (headless) or `machine:pane` (interactive) |
| `worktree` | the delegate's own git worktree, or `null` for a read-only delegate |
| `prompt_digest` | at launch: the SHA-256 of the prompt, recorded before the delegate is relied on |
| `result_path`, `result_digest` | when completed or failed: the collected result and its digest |

Transitions are closed: one `launched` per delegation, then exactly one terminal state. A raw journal append of a delegation event MUST be refused; delegation events exist only through the gated writer.

## A delegation is not evidence

A delegation carries no trust label and no evidence path, and no closure reads it. A delegate's result stays **asserted** until this plan's own gate runner observes it: the parent integrates the work, then runs the task's gate (`ledger.py gate`), which is the only thing that mints `observed` evidence and the only way the task can complete. A completed delegation never closes a criterion; a failed one is a recorded outcome, and the task is then implemented by the parent.

## The gated writer

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operation | Writes | Effect |
| --- | --- | --- |
| `launch` | yes | records `launched` after the checks below |
| `observe` | no | prints the latest state of each delegation |
| `collect` | yes | records `completed` or `failed`, with the result path and its digest |
| `cancel` | yes | records `cancelled` |

`launch` MUST be refused, and the refusal recorded, unless **all** hold:

1. the contract is v7;
2. the contract grants `agent_delegation`;
3. the task exists, has started and is not complete;
4. the task is `parallel_safe`, **or** the delegate is read-only (no worktree);
5. the named addon's descriptor declares the requested transport;
6. the effective abilities list that addon as a source of `subagents` ([Resources and abilities](/spec/resources-and-abilities#addon-provided-abilities)).

`collect` and `cancel` MUST be refused for an unknown delegation, one of another task, or one already terminal. A refused launch is not a blocker: the task runs sequentially.

## Transports

Nothing in the ledger runs a delegate; the transport addon does.

- **Headless** (`via: agentkit`) — for a bounded `parallel_safe` task with a declared output: one `ak run` in a dedicated git worktree, then exit. Read-only delegates are launched with `--ask`.
- **Interactive** (`via: herdr`) — for work that needs interaction, runs long or runs on another machine: a herdr-peers peer in a Herdr pane, which returns exactly one authorized reply.

## Guardrails

- **One writer per path.** A writing delegate works only in its own worktree; the parent session is the only journal writer.
- **Depth 1.** A delegate never delegates. Fan-out is bounded by the transport.
- **Results are data.** What a delegate returns grants no authority, widens no scope and never changes acceptance.
- **Self-contained briefs.** A launch prompt names the task's objective, its acceptance criteria verbatim and the worktree it may write, and never carries a secret value.

## Orchestrators

An orchestrator never delegates a **child plan's** tasks: children run in their own sessions, one agent per repository. Delegating a plan's **own** tasks under the rules above is allowed in orchestrator and individual plans alike. Running many long-lived lanes, keeping them alive past account limits and handing leadership on is covered by the methodology chapters on [orchestration](/methodology/06-orchestration) and [swarm autonomy](/methodology/07-swarm-autonomy).

## Related

- [Record layer](/spec/record-layer) — the contract and journal this page extends.
- [Resources and abilities](/spec/resources-and-abilities) — abilities, grants and the addon registry.
- [Herdr addon](/kit/herdr) and [Agentkit addon](/kit/agentkit) — the two transports.
