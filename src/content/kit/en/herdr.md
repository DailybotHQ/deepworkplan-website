---
title: Herdr
description: "An optional v7 addon that lets a plan hand a task to another coding agent in a Herdr pane, on any machine, and record its single authorized reply."
kind: addon
lang: en
order: 7
---

# Herdr addon

[Herdr](https://herdr.dev) puts coding agents in panes, on your machine and on machines it reaches over SSH. This addon lets a Deep Work Plan use those agents as **peers**: a plan can hand a bounded task to an agent in another pane, receive exactly one authorized reply, and keep a record of the exchange.

It is an optional addon of the **DWP v7 beta** (`v7.0.0-beta.1`, a pre-release). The methodology works the same without it: with the addon absent or disabled, every task runs in the current session, exactly as before.

## What it integrates

The addon is a thin integrator. The work is done by **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, a standalone MIT skill pinned at **`v0.1.0`** that is useful without Deep Work Plan. It defines what Herdr itself leaves open: who may answer, how the answer finds its way back across machines, how two agents avoid answering each other forever, and where the record of "I asked, it answered" lives.

| Item | Value |
|---|---|
| Product | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protocol 1 |
| Registry key | `herdr` in `.dwp/config.json` |
| Transport | interactive: a peer in a Herdr pane |
| Provides | `subagents`, `cancel_children` |
| Requires | the plan contract's `agent_delegation` grant |

## Install

Install herdr-peers and Herdr's official skill, which it depends on. Every machine whose agents should answer needs the skill too.

```bash
npx --yes skills add DailybotHQ/herdr-peers@v0.1.0 --skill herdr-peers -g
npx --yes skills add herdrdev/herdr@v0.9.3 --skill herdr -g
```

Requirements: Herdr 0.9.1 or newer, `bash`, and `python3` 3.9 or newer (standard library only). Onboarding offers the addon and records your answer in the addon registry; it is never enabled without consent.

## What it adds to a plan

- **Delegation to a peer.** On a v7 plan whose contract grants `agent_delegation`, `execute` may hand a `parallel_safe` task, or a read-only question, to an agent in another pane, on this machine or another one.
- **One authorized reply.** The request carries a stamp that authorizes exactly one answer. The peer replies once through the helper, and the reply carries a stamp of its own.
- **A record before reliance.** Every delegation is written to the plan's `analysis_results/delegations.ndjson` before the reply is used, and maps to the v7 `delegation` journal event.
- **Results stay claims until checked.** A peer's answer is `asserted` evidence until the plan's own gate runner observes it. It never closes a task by itself.

## Safety model

| Rule | What it means |
|---|---|
| Grant first | Delegation runs only when the plan contract grants `agent_delegation`. |
| Depth limit 1 | A message stamped `depth=1` or `reply-to=` is never answered, and a delegate never delegates. |
| Fan-out cap | At most four peers per caller by default. |
| Data, not instructions | A reply never grants authority the receiver did not already have. |
| One writer per path | A peer that writes works in its own git worktree. |

herdr-peers does not authenticate the sender: the `from=` field in a stamp is a claim. The mitigation is the `HERDR_PEERS_SCOPE` allow-list, which limits the workspaces and machines a peer accepts.

## Herdr or agentkit

Both addons implement the same delegation interface — `launch`, `observe`, `collect`, `cancel` — with different transports.

| Situation | Use |
|---|---|
| A bounded `parallel_safe` task with a declared output | [agentkit](/kit/agentkit) (headless `ak run` in a worktree) |
| The task needs interaction, runs long, or lives on another machine | Herdr (a peer in a pane) |

## Notes

Optional and never required. A repository is fully conformant with zero optional addons, and no flow depends on this one. The two-pane, cross-machine round trip is covered by tests against a simulated Herdr; plan a supervised first run.
