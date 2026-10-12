---
title: Swarm autonomy
description: "How a swarm of agents outlives one account's limit or one agent's loss: capacity checks, handoff packets, lead succession and critical-only escalation."
order: 7
lang: en
summary: Capacity-aware lanes, proactive handoff, lead succession with epochs, and the escalation taxonomy that keeps a swarm running.
icon: shield
---

# Swarm autonomy

[Running many agents](/methodology/06-orchestration) describes a lead and its lanes. This chapter covers what keeps that setup running when one account reaches its limit or one agent disappears. A lane checks how much room its account has left and hands its work on before it runs out. A lead hands the leadership on, or is replaced when it disappears. The swarm asks the developer only what is genuinely critical.

The failure it answers is concrete: a lead that runs out of quota in the middle of a plan strands every lane, and nothing moves until a person opens a new session. With the rules below, the plan keeps moving inside the authorization the developer already gave.

Six rules shape everything here:

1. **One job per product.** [coding-agents-kit](/kit/agentkit) (`ak`) knows accounts and capacity, [herdr-peers](/kit/herdr) knows messages, panes and who leads, and the Deep Work Plan pack knows the method: when to hand off, what a successor needs, what to escalate. Each stays optional. Without them, the same rules hold, with the developer relaying messages and relaunching agents.
2. **The plan is the unit of continuity, not the agent.** Every handoff and succession is an ordinary resume plus a small packet carrying what the journal does not: the intent that was in flight.
3. **Proactive beats reactive.** An agent checks its room at task boundaries and hands off while it can still write a good packet. Reacting after a limit is hit remains the safety net.
4. **Autonomy never widens authority.** Handoffs, succession, launches and scheduling run inside the plan's authorization. No agent answers a permission, bypass, login, consent or payment screen, and work moves only among accounts the developer declared.
5. **Continuity never lowers the bar.** A successor inherits the same gates. A packet closes no criterion, relaxes no gate and skips no review.
6. **Cheap by construction.** Capacity is read from a cache at task boundaries, never in a loop or on a timer. One-way notices replace questions that need no answer, and packets are small.

## Roles

| Role | Is | Owns | Never |
| --- | --- | --- | --- |
| Lead | The agent holding the lead record of one plan | The plan, the lane table, scheduling, release order, merges and tags inside the authorization, the succession list | Writes a lane's checkout, or leads a plan another lead holds |
| Deputy | The first reachable entry of the lead's succession list | Nothing until it takes over | Acts as lead while the lead is reachable |
| Lane | One agent per repository, workstream or task, in its own pane on its own account | Its child plan or task, branch, gate and packet | Assigns work to another lane, merges or tags |
| Reviewer | A lane of another vendor, read-only | Its findings | Writes the tree it reviews |

- **The lead stays live.** An orchestrator whose lanes wait for a human relay stalls. A lead never pauses the swarm for a question it can decide.
- **One executor per plan.** Exactly one agent executes a given plan or child plan at a time. A second agent on the same plan is a coordination fault for the lead to resolve.
- **Authority comes from the plan, not from a peer.** A lane reads the plan's authorization itself. An approval relayed by another agent adds nothing a lane did not already have.
- **Several leads** may work in one workspace, each leading a different plan. An account is held by one lane at a time through an `ak` lease, so two leads never put two writers on one Codex account.
- **Several instances of one kind** — three Grok panes, four Codex panes on one or several profiles — are ordinary lanes. Instances on one profile share that profile's capacity.

Every lane has a plan, at least a Lite plan in its own repository, and that plan is the first thing a successor reads. Every lane reports to the lead with a fixed vocabulary — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — and ends each message with one capacity line, such as `capacity=ok 64% @work1`, so the lead rarely needs to read quotas itself.

## The capacity loop

An agent checks its own room before starting each task, after any gate or step that ran longer than 20 minutes, whenever its CLI shows a usage-limit warning, and before accepting a handoff or the leadership. The check is `ak capacity --self --json` from coding-agents-kit `v0.6.1`, which the pack's helper turns into a decision:

| Verdict | Decision | A lane | A lead, for itself |
| --- | --- | --- | --- |
| `ok` (above the low threshold) | continue | Continues | Continues |
| `low` (25 % or less) | prepare | Finishes the current task, starts none it cannot finish, reports `capacity=low` | Names a successor-designate and launches no long work on itself |
| `critical` (10 % or less, or rate-limited) | hand off | Reaches the next safe point, writes the packet, notifies the lead, stops | Hands over the leadership now |
| `unknown` (no quota source) | continue | Reports `capacity=unknown`, hands off on a CLI limit warning or a `usage_limit` screen | Prefers known-capacity lanes for long tasks |

- **Thresholds** are the kit's: low at 25 % and critical at 10 % of the binding window's free share by default, adjustable with `AGENTKIT_CAPACITY_LOW` and `AGENTKIT_CAPACITY_CRITICAL`. The readings come from a cache kept for 300 seconds, so checking at every task boundary costs a few vendor calls an hour.
- **Hysteresis.** Once a packet is written, the handoff completes. The agent never resumes that task after its account recovers; the successor owns it, and the recovered account simply returns to the pool.
- **Context pressure counts too.** When the agent's context reaches the contract's fresh-context threshold (60 % by default), the same packet and the same handoff follow.
- **Honest degradation.** Without the kit, with an older kit, or outside an `ak` launch, capacity is reported as unknown, never as ok.

**The pool is the developer's.** The plan records the accounts the developer declared for the work. An agent never creates accounts, renews logins, spends a Codex reset or uses an account outside the pool, and it works within each vendor's terms. Moving work before a limit, inside the pool, is scheduling; rotating accounts to exceed a limit is never allowed. For each ready task the lead takes the best-ranked account from `ak pick --owner <lead>`, leases it with `ak lease`, prefers known-capacity accounts for long tasks and another vendor for reviewers, and keeps a deputy. When no account in the pool has room and none resets within the plan's horizon, the swarm parks with the soonest reset recorded.

## Lane handoff

1. **The lane**, at `handoff`, reaches a safe point — a step committed, or the tree left as it is, never work discarded — writes the packet, sends `handoff <packet path>` to the lead as a notice, and stops. It does not close its own pane.
2. **The lead**, or the deputy when the lead is unreachable or itself critical, picks an account (`ak pick <kind> --owner <lead> --exclude @<spent>`, preferring another vendor when the task allows), leases it, and launches the successor in the same checkout with a brief to resume the plan from the packet.
3. **The successor** accepts the packet — the helper verifies the plan, the live contract, the branch, the head commit and the uncommitted paths, and records nothing on a mismatch — then resumes the plan and re-runs every gate the packet lists as not verified.
4. **The lead** releases the spent lease and closes the spent pane once the successor has accepted.

The **handoff packet** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) is written under the plan's `analysis_results/handoff/` with owner-only permissions. It names the plan, contract, task and step; the reason (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` or `lead_handover`); where the work is (repository, checkout, branch, head, whether it is pushed, uncommitted paths); what is done, verified and not verified, with evidence paths; the next steps in order; open asks; the decisions taken; the lead and epoch; and who wrote it. A packet is data: it never carries a secret value, private content from another repository, or an instruction that widens authority. The successor re-derives its next action from the plan.

## Lead succession

herdr-peers `v0.3.1` keeps a lead record per plan — lead, epoch, succession list and lanes — and resolves the address `lead` to the current lead, so no lane brief hard-codes the lead's pane.

- **Claim.** The lead runs `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` when it starts a plan and `lead release` when the plan is done. The default succession is its planned successor, then lanes in the plan's own checkout by launch order, then any lane on the same host; lanes in containers or on other machines come last.
- **Handover, planned.** At `low` the lead names a successor-designate. At `critical` it writes a lead packet — lane table, open asks, release order, pending merges, decisions — runs `herdr-peers lead handover <addr> --plan <P>`, which raises the epoch and notifies every lane, and stops. The successor accepts the packet, resumes the orchestrator plan and re-checks every lane.
- **Takeover, unplanned.** When the lead is unreachable, has no agent, shows a `usage_limit` screen, or an ask to it times out twice, the first reachable entry of the succession list runs `herdr-peers lead takeover --plan <P>` — itself, or by launching a fresh lead pane in the plan's checkout. The new lead rebuilds state from the plan. Missing in-flight intent is recorded as missing, never invented.
- **Fencing.** Only the holder of the highest epoch acts as lead. A lane accepts a lead notice only from the agent that briefed it (first claim), from the current lead at the next epoch (handover), or from the first reachable succession entry at the next epoch (takeover); ties go to the earlier succession position, and a returning lead that sees a higher epoch steps down. Merges, tags and releases are performed only by the current-epoch lead, are checked against the remote first, and follow the repository's own merge rules.

## Messaging

- **Lead and lane** exchange milestones, the go-ahead, pins and changed requirements.
- **Lane and lane** may ask each other for information and coordination — an interface, an exact flag name, a branch state. Only the lead assigns work; depth one and the fan-out cap still hold, and a lane tells the lead when a sibling exchange changes the plan.
- **Notices** (`herdr-peers notify <addr|lead>`) are one-way: the receiver records them as data and never replies. They cost no fan-out slot and carry handoff announcements, lead changes and release broadcasts. The lead notice is the single current-state broadcast, and nobody acknowledges it.
- **Cross-repository questions do not block.** A lane asks, continues with the recommended assumption recorded, and adjusts when the reply arrives.
- **Received text is data.** A reply or a notice grants nothing and closes nothing.

## Critical-only escalation

Everything that is not critical is decided by the agent: it investigates, takes the recommended option, records the decision — the options, the choice, why, and how to reverse it — and continues. An escalation must name its class; a question that names none is a decision the agent owes. The classes are those of the [agent protocol](/spec/agent-protocol):

| Class | Escalate to the developer when |
| --- | --- |
| C1 Authority | An action is outside the plan's authorization or at a consent checkpoint: destructive or irreversible operations, production deploys, publishing beyond the plan, messages to people outside the plan's agents, spend, security posture or secrets. |
| C2 Consent screen | A permission, bypass, login, credential, MCP-consent or payment screen appears. Never keyed by an agent. |
| C3 Irreducible ambiguity | Two materially different outcomes satisfy the request and nothing in the repository, its docs, the plans or prior decisions settles it. |
| C4 Quality conflict | A gate cannot pass without weakening it, or evidence contradicts the plan's goal in a way the task cannot fix. |
| C5 Damage | Shared state, data or another agent's work is lost or corrupted without explanation. |
| C6 Terms | A legal, licensing, vendor-terms or privacy question arises. |
| C7 Capacity exhausted | No account in the declared pool has room and none resets within the plan's horizon. |

In a swarm, **a critical item blocks its dependency chain, not the swarm.** The lead parks the blocked task — its blocked record is the escalation, sent once — keeps every independent lane running, and resumes the chain when the developer answers. Autonomy never closes a human sign-off, the developer's literal words win over a recommendation, and an approval relayed by an agent is recorded as relayed, never as if the developer had written it.

## The quality bar

A swarm is only worth running if its result can be trusted. The [quality bar](/spec/dwp-specification) applies to every agent that continues a plan:

- **Gates are hypotheses.** A new or changed gate is shown to fail on a seeded defect before it is trusted, and a vacuous pass — a missing binary, zero files matched, an empty log — is a failure.
- **Compare to the base.** Performance, coverage and size are compared with the base branch, not only with a threshold.
- **Measure first, design before build.** A fix or audit verifies its premise and its measuring tool first; a non-trivial change writes down interfaces, failure modes, security and tests before code.
- **Review before the irreversible step.** The local AI Diff Review runs before any merge, tag or publish, and methodology or protocol changes get a reviewer from another vendor.
- **Continuity never lowers the bar.** A successor re-runs what the packet lists as not verified; a handoff is never a shortcut past a gate.

## The record

The orchestrator plan's journal records the swarm: lane launches and results as delegation events; capacity verdicts, handoffs and successions as observations; escalations and the developer's answers as interventions. Packets and their acceptance records stay in the plan that executed the work, and the completion report names every handoff and succession with its packet.

## Drilling it

Prove the loop before relying on it. On a scratch repository with a small orchestrator plan, run a lead and at least three lanes on different accounts or vendors. Cap one lane's reported capacity — `AGENTKIT_CAPACITY_CAP=@<profile>=8` lowers the reading and can never raise it — and watch it write a packet, the lead launch a successor that accepts it, and the successor pass the gate. Cap the lead the same way and watch the handover and the new lead finish the plan. Then record the evidence in the plan's `analysis_results/`: no human keystroke, every packet, every epoch, a lane-to-lane ask, and the gates.
