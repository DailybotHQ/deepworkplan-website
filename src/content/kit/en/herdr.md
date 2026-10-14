---
title: Herdr
description: "Hand work to another coding agent in a Herdr pane, on any machine, and take back one authorized reply. Plans that delegate, with a record of every exchange."
kind: addon
lang: en
order: 7
---

# Herdr addon

[Herdr](https://herdr.dev) puts coding agents in panes, on your machine and on machines it reaches over SSH. This addon lets a Deep Work Plan use those agents as **peers**: a plan can hand a bounded task to an agent in another pane, receive exactly one authorized reply, and keep a record of the exchange.

It is an optional addon of **DWP v7** (`v7.0.0`). The methodology works the same without it: with the addon absent or disabled, every task runs in the current session, exactly as before.

## What it integrates

The addon is a thin integrator. The work is done by **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, a standalone MIT skill pinned at **`v1.0.0`** that is useful without Deep Work Plan. It defines what Herdr itself leaves open: who may answer, how the answer finds its way back across machines, how two agents avoid answering each other forever, and where the record of "I asked, it answered" lives.

| Item | Value |
|---|---|
| Product | `DailybotHQ/herdr-peers`, tag `v1.0.0`, protocol 1 |
| Registry key | `herdr` in `.dwp/config.json` |
| Transport | interactive: a peer in a Herdr pane |
| Provides | `subagents`, `cancel_children` |
| Requires | the plan contract's `agent_delegation` grant |

**Stable since `v1.0.0`.** The public interface follows semantic versioning: the CLI verbs and their documented flags, exit codes `0`–`7`, the documented `HERDR_PEERS_*`, `DWP_PLAN` and `DWP_TASK` variables, protocol 1, and the JSON contracts `herdr-peers/lanes-v1`, `herdr-peers/lead-v1` and the delegation record. A breaking change to any of them bumps the major version, and a wire-format change also bumps the protocol number. `v1.0.0` changes no behavior from `v0.3.3`, and 0.x releases are no longer supported.

## Install

Install herdr-peers and Herdr's official skill, which it depends on. Every machine whose agents should answer needs the skill too.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.0.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
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

## Containers and the host

With the [devcontainer](/kit/devcontainer) addon on devcontainer-kit `v1.0.1`, every dck container ships herdr-peers and joins the mesh at `dck up`: its agents can ask agents on the host, in the other containers and in the host's other loopback containers, and get the reply back. `dck setup` installs a verified herdr-peers on the host, so host agents reply too. The host listener and the extra keys that let other containers in are your decisions in the kit's host profile; this addon never sets them. Since herdr-peers (`v0.2.3`), each machine keeps its own state (`$XDG_STATE_HOME/herdr-peers/<server>/`), so a checkout shared by the host and a container no longer mixes their records, and since devcontainer-kit (`v0.3.3`) the container exports `HERDR_PEERS_SELF` itself, so Codex agents inside reach other machines with no hand step.

## Herdr or agentkit

Both addons implement the same delegation interface — `launch`, `observe`, `collect`, `cancel` — with different transports.

| Situation | Use |
|---|---|
| A bounded `parallel_safe` task with a declared output | [agentkit](/kit/agentkit) (headless `ak run` in a worktree) |
| The task needs interaction, runs long, or lives on another machine | Herdr (a peer in a pane) |

For a lead running many lanes at once — panes on the host, in containers and on other machines, each on its own account — `herdr-peers lanes` lists every lane with its state, `herdr-peers status <pane>` classifies the screen a blocked lane is on, and every delegation record names the account and vendor that carried it. See [Running many agents](/methodology/06-orchestration).

**Codex lanes name their pane.** Codex runs a lane's commands from a background server shared by every session on that account, so the pane id it inherits can belong to another lane. A Codex lane passes its own pane, from the lead's brief, with `--pane <pane>` on every herdr-peers verb (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Notices and leadership

herdr-peers (`v0.3.2`) adds what lets a swarm outlive its lead ([Swarm autonomy](/methodology/07-swarm-autonomy)):

- **Notices.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` sends a one-way message stamped `reply=no`. The receiver's `check` classifies it as a notice, records it as data and never answers. Notices cost no fan-out slot and may be sent while an ask is open; use them for handoff announcements, lead changes and release broadcasts.
- **A lead record per plan.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` makes an agent the lead of one plan; `lead show` prints the record (schema `herdr-peers/lead-v1`: plan, lead, epoch, succession, lanes, updated time). `lead handover <addr> --plan <P>` passes the leadership on, `lead takeover --plan <P>` lets the first reachable deputy take it when the lead is gone, and `lead release --plan <P>` ends it. Each change raises the epoch and notifies every lane. Claim the plan before launching its lanes: `lead` resolves only once a record exists. From `v0.3.2` the record keeps the claiming repository locally and refuses a claim of the same plan id from another repository; name that plan `--plan <repo>/<id>`.
- **Fencing.** A lane accepts a lead notice only from the agent that briefed it (first claim), from the current lead at the next epoch (handover), or from the first reachable succession entry at the next epoch (takeover). Anything else is recorded and ignored, and a returning lead that sees a higher epoch steps down.
- **The `lead` address.** `ask lead …` and `notify lead …` resolve to the current lead of `--plan` (else `$DWP_PLAN`), so no lane brief hard-codes the lead's pane.
- **`usage_limit` screens.** `status` and `lanes` recognize a CLI's usage-limit message as the screen class `usage_limit`, whose next step is a handoff. It is never keyed. `lanes --json` adds the plan, its lead, the epoch and each lane's last reported capacity.

Lanes may also ask each other for information and coordination — an interface, a flag name, a branch state — but only the lead assigns work. Depth 1 and the fan-out cap still hold. With `v0.2.x` there are no notices or lead records: lanes ask the lead's address from their brief, and a lead change is relayed by the developer.

## Notes

Optional and never required. A repository is fully conformant with zero optional addons, and no flow depends on this one. The two-pane, cross-machine round trip is covered by tests against a simulated Herdr; plan a supervised first run.
