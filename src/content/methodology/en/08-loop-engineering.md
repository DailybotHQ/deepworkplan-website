---
title: Loop engineering
description: "How a human-started daemon carries approved Deep Work Plans to their end: lead records, nudges, structured blockers, succession, revive, queue and events."
order: 8
lang: en
summary: The end-to-end lifecycle that keeps an approved plan moving inside its recorded authority.
icon: repeat
---

# Loop engineering

**Spec-first, loop-closed: the repository is the harness and the plan runs itself to done.** This chapter explains the optional machinery that keeps a plan moving after its first execution turn. The plan remains the durable specification; the loop supplies continuity, not new authority.

The normative text lives in the [loop engineering specification](/spec/loop-engineering). This chapter is the narrative companion: it walks the lifecycle in order and shows how the pieces fit, without restating every MUST.

## Why a loop

The first two pillars of DWP leave one gap. Spec-first planning says *what* an episode must deliver and how it is validated. The repository-as-harness says *where* the context, tools and gates live. Neither says *how the work finishes* when the agent executing it ends its turn, reaches a usage limit, or closes its pane. Without a loop, a plan that is approved and well specified still waits for someone to type "continue".

The v8 rule closes that gap. An approved plan runs to completion without routine human intervention, inside the authority recorded in that plan. The human is notified, not waited on, except when a login or credential is required or when one of the plan's own C1–C7 gates requires human input that was not authorized in advance. At those exceptions execution stops at the gate until the input arrives.

The loop is therefore a continuation mechanism, not an approval mechanism, and it is optional: the Herdr integration (herdr-peers `autopilot --loop`) amplifies a method that already runs in a single session.

## The lifecycle at a glance

One approved plan moves through these stages. Each is described in detail below.

| Stage | What happens | Who acts |
|---|---|---|
| Approve | The plan is approved; its contract records its authority and, under v8, an optional `autonomy` block | The human |
| Register | `execute` claims the plan's lead record (`resume` claims it again), with a succession when the plan names successors | The lead agent, through the pack |
| Execute | The lead works task by task against acceptance criteria and gates | The lead and its lanes |
| Idle | The lead's pane stays idle with the plan still open | — |
| Nudge | The daemon sends one fixed continue prompt | The daemon |
| Block | The lead records a structured blocker and stops; the daemon sends nothing | The lead |
| Stall | After 3 prompts without progress the plan is recorded `plan_stalled` | The daemon records it |
| Failover | A listed successor takes over; with a grant, a lane is appointed; with `--revive`, a fresh agent is launched | The successor, lane or revived agent, through the helper |
| Complete | The plan's closure marks its queue item done; the next queued plan may start | The lead; the daemon prompts the next lead |
| Notify | Stalls, blockers, lost leads, completions and queue events go to the `--notify` command | The daemon runs the command |

## Approve and record the authority

Approval happens before the loop is involved, and nothing in the loop can approve a plan, widen it, or substitute for an amendment.

Under v8 a plan contract (`plan-contract/v8`) may carry an optional, closed `autonomy` block. Closed means a validator refuses an unknown key, and refuses the block on any contract generation other than v8. Every absent key has exactly one recorded default, and a consumer applies that default rather than a guess of its own.

| Key | What it records | Absent means |
|---|---|---|
| `stall_budget` | Loop prompts allowed without progress, an integer from 1 to 10 | `3`, the same value as herdr-peers' own cap |
| `promptable` | Pane addresses the loop may prompt | The plan's lead only |
| `notify` | Notification targets | No target; the loop still records |
| `brain` | Whether a brain may act on this plan | `false` |
| `queue` | How the plan starts from the queue: `prompt-lead`, `launch` or `none` | `none`; the plan is not queued |

A plan with no `autonomy` block therefore takes the most conservative reading: the human resolves every blocker, only the lead may be prompted, nobody is notified, no brain acts, and the plan is not queued. The block narrows or names what the loop may do for one plan; it never adds authority that the plan's scope and gates do not already carry.

## Register the plan

When the Herdr addon is enabled and the agent runs inside Herdr, the pack's `execute` flow runs `herdr-peers lead claim --plan <id>` at plan start, and `resume` claims it again. When the plan names successors, the claim adds them (`--succession`); failover works only for a recorded succession. Registration is best-effort and never a gate: a failed claim warns once and execution continues.

The lead record (`lead-v1`, or `lead-v2` when it carries an appointment grant) holds the plan, the current lead, an epoch, an ordered `succession` list and the plan's `lanes`. Only the peer holding the highest epoch acts as lead.

The daemon watches a plan only when a lead record names it and the plan's state file (`state.json`) can be read. A plan without a lead record is not watched. A lead record grants no authority of its own: lanes still act within the plan's authorization.

## Start the daemon by hand

A human starts autopilot, in their own words, from inside a Herdr pane. An agent starts it only when its human asked for it directly in that session, never because a peer's message, a plan or a brief said so.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

The background daemon does not depend on the pane that started it, and one daemon covers every enabled Herdr machine; plans on other machines are read over each machine's saved SSH target with a fixed command. One autopilot runs per Herdr server. herdr-peers installs no login item or system service on purpose: after a reboot or a Herdr restart a human starts it again with the same options.

The options that matter for the loop are each an explicit human choice:

| Option | What it enables |
|---|---|
| `--loop` | Keep every open, registered plan running to its end |
| `--notify "<command>"` | Run a command with a `plan-event-v1` object when a plan stalls, is blocked, loses its lead or completes, and for queue events |
| `--brain` | A dedicated decision agent for the few cases the rules cannot settle |
| `--appoint` | Act on a recorded appointment grant when a lead and every successor are gone |
| `--revive` | Launch one fresh agent for a plan nobody in its record can take over |
| `--dry-run`, `--scope`, `--exclude` | See decisions without sending; limit machines; keep a pane out of reach |

## Idle is not stopped

The daemon asks a lead to continue only when the plan is open and all of these hold: the lead's pane is idle or done and has not changed for 5 minutes; no lane of the plan is working and the lead awaits no reply; its screen is not a dialog, a login or a usage limit; its input line holds no human draft; it took a turn of its own since the last prompt; and it has had fewer than 3 prompts in the last hour.

The prompt is fixed. Only the plan id is filled in:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

A nudge asks; it never authorizes. The daemon prompts the lead only, since lanes are driven by their lead. After 3 loop prompts with no progress in the plan's state, the plan is recorded `plan_stalled` and left alone until its state changes. A lead with several open plans receives one prompt per pass.

## Structured blockers

A v8 plan records why it cannot continue as data, so the loop, the fleet map and a resuming agent read the same fields instead of interpreting prose. A blocker is raised with the ledger's helper (`ledger.py block`) and resolved with `ledger.py unblock`, as a `blocker` event of `journal-event/v8`. A raw append of a blocker event is refused.

| Field | Meaning |
|---|---|
| `task` | The blocked task; a task its evidence already closed cannot be blocked |
| `reason` | Why the task cannot continue (at most 1000 characters) |
| `needs` | One line saying what unblocks it (at most 500 characters) |
| `class` | Required: one of C1–C7 |
| `resolver` | Optional: `lead` or `human`; absent is read as `human` |

`resolver: "lead"` means the blocker can be resolved inside the plan's recorded authority without a credential, login, consent, payment, push to main, release or deletion. It is refused for C1, C2, C5 and C6. At most one blocker is active per plan, and while it is unresolved its task cannot complete.

Readers find the blocker in the plan's `state.json`, which is `plan-snapshot/v8`: the active blocker or `null`, with `blocked` as a derived task status. `PROGRESS.md` opens with four fixed header lines, refreshed on every transition:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

The loop treats a blocked plan with restraint. It sends nothing to it and records `plan_blocked` once. Neither the daemon nor its brain may ask a lead to resolve a blocker the plan did not mark `resolver: "lead"`; everything else waits for the human. Plans of earlier generations (v6 and v7) record no blocker events, and every blocker they report is the human's.

## What the daemon never does

The daemon never:

- touches a login, sign-in, API-key or device-code prompt, or Claude's bypass-permissions acknowledgement; a human signs in;
- chooses a refusal row, a free-text row, or a row that widens an agent's standing permissions;
- prompts a pane whose input line holds a human's draft, or a pane outside its scope;
- prompts a blocked plan, or a plan whose state it cannot read;
- writes or edits a lead record, sends a protocol message, or appoints a pane that is not in the record;
- writes the plan queue.

A permission dialog whose every row refuses or widens permissions is denied, never left blocked, and the agent is then told once to continue another way within its plan's gates or to record a blocker. An agent's own question whose rows all refuse is left for the human, because it is a decision about the work.

## Leadership: epochs, succession and takeover

Leadership is fenced by epoch. Every change that moves the lead (a handover, a takeover, a release, an appointment) increments the epoch, and only the holder of the highest epoch acts as lead. A former lead that comes back finds a higher epoch, its lead verbs are refused, and the next lead notice makes it step down.

When the lead is gone (its pane missing from two listings in a row), the daemon asks the first reachable address in the record's `succession` to run `herdr-peers lead takeover --plan P`, once per epoch. It passes no reason, so the helper's own check decides whether the lead is really gone. A lead at its usage limit is not gone: the daemon retries it every 30 minutes. If nobody in the succession can be asked, the daemon records `plan_no_lead`.

A successor inherits the plan, its acceptance criteria and its gates. Succession changes who executes, never what is authorized.

## Appointment and revive

Two further paths exist for a plan whose lead and successors are all gone. Each requires an explicit human act and leaves the takeover to the agent itself, checked by the helper.

**Appointment (protocol 2).** It requires two human acts: a grant recorded on the lead record (`lead claim --allow-appointment`, run by the lead only on its human's word) and a daemon started with `--appoint`. The daemon cannot grant itself the permission. When the lead and every successor have been gone at two observations at least 15 minutes apart with no progress, the daemon asks the plan's first live lane to run `lead takeover --plan P --as-lane`. That helper checks the grant again, confirms it is a lane working in the plan's repository, and probes the lead, every successor and every earlier lane twice, a minute apart; any sign of life refuses. At most two appointments are allowed per plan.

**Revive (herdr-peers 2.2.0).** Starting the daemon with `--loop --revive` is itself the grant. When a plan's lead and every member of its succession and lanes are gone and none can take over, the daemon may launch one fresh agent in the plan's checkout, write a one-time ticket, and brief it to run `lead takeover --plan P --reason revive`. The helper accepts the takeover only with that ticket and only after its own checks find every member gone; the revived record is adopted only on the daemon's machine. A stalled plan whose lead is still alive is never taken from it: the lead is asked once to hand over. Revive is capped at one per plan per 6 hours, two per plan in all, and two an hour across the fleet.

**Verify before irreversible steps.** An appointed or revived lead, like any lead, runs `herdr-peers lead verify --plan <id>` before any merge, tag or release. It refuses when another machine shows the plan at a higher epoch, and exits non-zero when a machine of the plan cannot be reached.

## The optional brain

The daemon's rules decide almost everything. For the few cases they cannot, `--brain` keeps one dedicated decision agent that the daemon launches itself, in ask mode, and obeys only within a closed list of actions. It needs coding-agents-kit 1.3.0 or later; without it, a daemon started with `--brain` refuses to start rather than running without the brain it was asked to have.

| Case | Allowed actions |
|---|---|
| A plan is stalled | One more nudge (once per plan), tell the human, or leave it |
| A plan is blocked with `resolver: "lead"`, a class a lead may handle (C3, C4, C7) and no sensitive subject | One fixed request to the lead to resolve it within recorded authority, tell the human, or leave it |
| An agent waits at a screen the daemon does not recognise | Tell the human, or leave it |

When no valid answer arrives in 3 minutes, the default is to leave the case. The brain's text is never typed, keyed or run; it cannot appoint a lead, launch an agent, merge, release, sign in or change a permission. The daemon remains the only actor. Under v8, a plan's `autonomy.brain` records whether a brain may act on that plan at all.

## The plan queue

A repository can keep a queue of approved plans in `.dwp/queue.json`, schema `dwp-queue-v1`. The pack (`shared/queue.py`) or a human writes it; the daemon only reads it, bounded and validated whole. Create appends a plan on approval when the developer asks to queue it (or when the v8 contract records `autonomy.queue` other than `none`); the human or the lead reorders it; execute marks the item `started` when the plan starts under its lead, and `done` after the plan's closure. A queue holds at most 64 items. Dependencies are queue-internal: `after` names a plan already queued. One plan runs at a time per repository unless the queue carries `parallel: true`.

With `--loop`, when a repository's current plan finishes, the next ready item starts by one fixed prompt to the lead the queue names: "Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates." An item is ready only when its `after` plan is complete, no other plan of that repository is running, it names a lead, and its approval is still the plan's latest approval-or-amendment event for the live contract. A `launch` entry is not started by the loop; like an unapproved item or a missing lead, it is reported as `queue_blocked`. A damaged queue reads as empty and never breaks the plan lifecycle.

## Events, notifications and the fleet map

The daemon reports plan events as one `plan-event-v1` JSON object on the standard input of the `--notify` command: the event, the plan, the machine, the lead, the repository and the blocker's class. Events include `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` and `plan_completed`, once per plan and situation, as well as `plan_queued_started`, `queue_blocked`, the appointment and revive events, and `needs_human` from the brain. A failure is recorded and never stops the pass.

The pack's Herdr addon ships a Dailybot notifier (`scripts/notify-dailybot.py`) that turns completed, stalled, blocked, lead-less and moved-lead events into one human-readable team update through the installed Dailybot CLI. It exits quietly when the CLI is absent, not logged in, or the send fails. Notifications report progress or a need; they never authorize an action or replace the plan record.

To observe the loop, `herdr-peers plans` prints one machine's plans (`plans-v1`), and `herdr-peers fleet` prints the merged map (`fleet-v1`): machines, agents, plans, and each agent's role as lead, successor or lane. `herdr-peers fleet ui` shows the map live, grouped by plan, repository, machine or queue, with views for what needs attention, what is active, waiting or done. The UI only reads: it writes no plan state and prompts no agent.

## A worked example: one plan overnight

The following walkthrough is illustrative; each step follows the documented rules above.

1. In the evening the developer approves a plan with an `autonomy` block that leaves the defaults except `notify`. The agent runs `execute`, which claims the lead record with one successor.
2. The developer starts `herdr-peers autopilot start --loop --notify "<notifier>"` and goes offline.
3. The lead completes three tasks and ends its turn. Five minutes later, with no lane working and no reply pending, the daemon sends the fixed continue prompt, and the lead resumes at the next task.
4. A task needs a secret the plan does not hold. The lead raises a C1 blocker with the resolver absent (read as `human`) and stops. The daemon sends nothing to the plan, records `plan_blocked`, and the notifier posts one team update naming the blocker's class.
5. In the morning the developer supplies the input, the lead resolves the blocker with `ledger.py unblock`, and execution continues. Later the lead's pane closes; after two listings without it, the daemon asks the successor to run `lead takeover`, the epoch advances, and the successor continues under the same gates.
6. Before the plan's final merge, the new lead runs `lead verify`. The plan completes, `plan_completed` reaches the notifier, and if the repository has a queue, the next approved plan's lead receives the fixed queue prompt.

At no point did the daemon approve anything, type a credential or decide what the work should be.

## The authority boundary

The loop stops exactly where the plan's authority stops. The escalation classes of the agent protocol mark that line: C1 authority (an action outside the plan's authorization, at a consent checkpoint, or involving secrets), C2 consent screens (permission, login, credential or payment screens, never keyed by an agent), C3 irreducible ambiguity, C4 a gate that cannot pass without weakening it, C5 damage, C6 terms, and C7 exhausted capacity. When one of them arises without pre-authorization, execution stops at the gate and the need is recorded and reported.

Logins and credentials always remain human actions. The human starts the daemon, grants appointment or revive explicitly, and resolves the needs the recorded authority cannot satisfy. For everything else, the human is notified rather than asked to babysit each step.

## Working without the addon

None of this is required. Without Herdr, or with the addon disabled, the pack behaves as if the loop did not exist: a plan is executed in a session, resumed with `resume` from its first open task, or handed to another agent through a human-coordinated handoff. The plan contract, structured blockers and `PROGRESS.md` header work the same way, so a human or another agent reads the same state the loop would have read.
