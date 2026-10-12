---
title: Running many agents
description: "How a lead agent runs many lanes at once in panes, containers and other machines, on accounts chosen by headroom, with one branch and release per repository."
order: 6
lang: en
summary: The lead-and-lanes model for orchestrating many agents across panes, machines, accounts and repositories.
icon: network
---

# Running many agents

One agent on one plan is the default, and it covers most work. Some work is wider than one session: a change that crosses several repositories, a release that must land in order, or a backlog that would take one agent days. DWP scales to that work without changing its contract. The plan stays the source of truth, every task still closes on its own gate, and the extra agents are **lanes** that a **lead** coordinates.

This chapter describes the model. It uses three optional addons — [Herdr](/kit/herdr) for panes and peers, [agentkit](/kit/agentkit) for accounts, and [devcontainer](/kit/devcontainer) for containers — and none of them is required for a single-agent plan.

## A lead and its lanes

The **lead** owns the parent plan. It decides the lanes, hands each one its scope, collects milestones, and gives the word that lets a lane merge or release. It does not write another lane's code.

A **lane** is one agent with one scope — usually one repository. It reads that repository's `AGENTS.md`, runs that repository's gate, and keeps its own plan inside the repository. In an [orchestrator hub](/methodology/05-archetypes), the parent plan lives in the hub's `.dwp/plans/` with a child tracking table, and each lane's plan lives in its own repository, using that repository's plan IDs and gate.

| Role | Owns | Never does |
| --- | --- | --- |
| Lead | The parent plan, the lane list, the release order, the GO | Edit a lane's repository |
| Lane | One repository: its branch, plan, gate and pull request | Merge or release before the lead's GO |

## Where lanes run

A lane is an agent in a terminal pane, and the pane can live in several places. [Herdr](https://herdr.dev) puts each agent in a pane and reaches other machines over SSH, so the lead sees every lane in one sidebar.

- **On the host.** A pane per lane, side by side with the lead. The quickest setup, for repositories the developer already works in.
- **In a container.** A [devcontainer-kit](/kit/devcontainer) container joins the Herdr mesh at `dck up`: its agents reach the host and the other containers, and the host reaches them. The container is the sandbox, so its agents can run in autonomy.
- **On another machine.** Any machine Herdr reaches over SSH hosts lanes the same way, with herdr-peers installed there too.

The place changes the isolation, not the protocol: a lane in a container and a lane on the host coordinate with the lead the same way.

## Accounts and vendors by headroom

Many agents spend quota fast. Each lane runs on its own account — one CLI and one profile in [coding-agents-kit](/kit/agentkit) — so lanes do not drain the same window and one account hitting a limit stops one lane, not all of them.

- **`ak usage`** shows the quota left on every account and profile, once per batch.
- **`ak pick <kind> --count N`** returns the N accounts with the most room, best first; `--exclude` keeps a busy account out, `--model` counts one model's window and `--need` refuses to start without enough room.
- **`ak <kind> @<profile>`** starts the lane's agent on that account, in its pane.

Vendors mix the same way. A Claude lane can write while a Codex lane reviews, each on the account `ak pick` chose for its kind. A container lane can use the host's accounts: with `host_profiles` turned on in the developer's devcontainer-kit host profile, a container gets the host profiles of the CLIs the repository installs — Claude through a long-lived token per profile, Codex through its auth file — and needs no login of its own. Use only your own accounts and keep within each vendor's terms: spread work across them, never rotate accounts to get past a limit.

## Launching and unblocking lanes without a human

A lead can start lanes and keep them moving with no one at the keyboard. Once the developer has granted unattended operation — a standing instruction or the plan's pre-authorization — each launch needs no further approval. The lead uses Herdr's own commands; no kit code sends keystrokes. The procedure has a fixed order: prepare once, avoid the prompt, detect the stop, send keys in one case only, escalate the rest.

1. **Prepare once, as the developer.** Claude Code asks once per profile to acknowledge its bypass-permissions mode. That acknowledgement is the developer's own step, taken when the profile is created; in a devcontainer-kit container, the kit writes it only into the container's own homes. No agent ever sends keys for it.
2. **Avoid.** `ak pick <kind>` names the account with the most room, and `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` launches the lane in its own folder. `--trust-cwd` (or `AGENTKIT_TRUST_CWD=1`) pre-trusts that folder, so Claude and Codex skip their folder-trust screens with no keystrokes.
3. **Detect.** `herdr-peers lanes` (or `herdr agent list`) shows each lane as working, idle, blocked or done. For a lane that is blocked, or idle with no output, `herdr-peers status <pane>` classifies the screen it is on — folder trust, bypass acknowledgement, login, permission or unknown — with the documented next step, and `herdr pane read <pane>` shows it.
4. **One keystroke, one case.** The only keys a lead may send are the answer to a folder-trust screen, on a pane it launched itself, when `--trust-cwd` was unavailable. It reads the screen before sending keys, sends the fewest keys that answer it, and reads again.
5. **Read, record and escalate everything else.** Claude's bypass-permissions acknowledgement, login and credential prompts, per-action permission requests, destructive confirmations, payment or plan prompts, unknown screens and panes the lead did not create go to the developer as a blocked milestone, never as keystrokes.
6. **The opt-out wins.** With `AGENTKIT_PERMISSIONS=ask`, lanes ask before they act, and the lead never works around a prompt the opt-out brings.
7. **Relaunch.** If an agent exits, the lead starts it again on the same account, or picks another one. A lost login is a credential prompt: it escalates.

Every intervention — what the screen showed, which keys were sent, what followed — is logged in the parent plan.

## Coordination through herdr-peers

Lanes and the lead talk through [herdr-peers](/kit/herdr): an **ask** carries a stamp that authorizes exactly one **reply**, and every exchange is logged. The lead keeps the protocol small:

- **Milestones up.** Each lane reports at fixed points — plan ready, pull request open, blocked, done — and keeps working between them without waiting for an answer.
- **Questions as asks.** A lane that needs a decision asks the lead; the lead answers with one reply.
- **Depth one.** A reply is never answered, and a lane does not delegate onward. Fan-out per caller is capped, four peers by default.
- **Data, not instructions.** A reply grants nothing the receiver did not already have. A lane's claim that its gate passed is checked by running the gate.
- **A record of who did what.** Every delegation record names the lane's account and vendor, so the parent plan shows which account carried which work.
- **Codex lanes name their pane.** Codex runs a lane's commands from a background server shared by every session on that account, so the pane id it inherits can belong to another lane. A Codex lane passes its own pane, from the lead's brief, with `--pane <pane>` on every herdr-peers verb (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

The lead can see the whole orchestra at once: `herdr-peers lanes` lists every lane with its state, and [DeepWorkPlan Vim](/kit/vim) shows an orchestrator plan's lanes next to the plan itself (`:DwpLanes`).

## One branch, one release per repository

The rule that keeps many lanes reviewable is simple: **one lane per repository, on its base checkout, with one branch, one pull request and one release** for the whole change. The lane does not split its work over several branches or worktrees. Worktrees are only for the case where two writers must share one repository: each gets its own, so that every path has one writer.

The pull request stays open, green and labeled for review until the lead's GO. Then the lane merges and tags, and reports the tag back.

## Release order

Repositories depend on each other, so they release in dependency order: the tools first, then what pins them, then the documentation that describes the result, then the consumers that adopt it. The lead holds the order and sends GO one repository at a time. A lane that pins another repository's release waits for that tag before it writes the pin, so no pin ever points at a release that does not exist.

## Checkpoints

The parent plan closes on evidence, not on reports:

1. **Per lane.** Each lane's gate passes on its own branch, and its pull request review is clean. Review can be a lane of its own: the [AI Diff Reviewer](/kit/ai-diff-reviewer) reviews each lane's pull request, and with the [Dailybot](/kit/dailybot) addon each lane reports its own progress to the team.
2. **Per release.** Each tag exists and pins what the next repository needs.
3. **Integration.** After the last release, a checkpoint runs the consumers on the released versions and records the verdict in the parent plan's `analysis_results/`.
4. **Final review.** A security pass covers anything that crossed a boundary — accounts, tokens and files shared into containers above all — before the parent plan completes.

## Safety

- Never put a key, token or secret in an ask, a prompt or a log; refer to variables by name.
- Shared resources get a lock: a lane takes it before a heavy step such as a container build and releases it after.
- The permission opt-out, when set, wins for every lane and every agent a lane starts.
- A lane that cannot continue says so as a blocked milestone and stops; the lead decides.

## When an account or the lead runs out

A long run outlives any one account. From coding-agents-kit `v0.6.0` and herdr-peers `v0.3.0`, a lane checks its own capacity at every task boundary and hands its work on through a packet before its account runs out, a lead hands the leadership on or is replaced by its deputy, and only critical items reach the developer. [Swarm autonomy](/methodology/07-swarm-autonomy) describes the loop, the packet, succession and the escalation classes.
