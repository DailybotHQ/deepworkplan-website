---
title: Loop engineering
description: "How a human-started daemon keeps approved Deep Work Plans moving through registration, succession, nudges, events, and notifications within recorded authority."
order: 8
lang: en
summary: The end-to-end lifecycle that keeps an approved plan moving inside its recorded authority.
icon: repeat
---

# Loop engineering

**Spec-first, loop-closed: the repository is the harness and the plan runs itself to done.** This chapter describes the optional machinery that keeps a plan moving after its first execution turn. The plan remains the durable specification; the loop supplies continuity, not new authority.

## Register the plan

When the Herdr addon is enabled, the pack's `execute` flow claims the plan's lead record and records a succession. That record gives the loop a precise plan, current lead, epoch, and ordered successors to observe. Plans without a lead record are not watched. The addon remains optional: without it, the core methodology still works in a session or through a human-coordinated handoff.

Plan registration does not approve the work or widen the plan's authorization. Under v8, an approved plan runs to its end within the authority recorded in that plan. Its acceptance criteria and gates remain binding throughout execution.

## Start the daemon by hand

A human starts `herdr-peers autopilot --loop` in a Herdr environment. It is a local background daemon, not a login item or system service. It watches registered plans across enabled machines and nudges an idle lead to continue when its plan remains open, no lane is working, and no reply is pending. The prompt is fixed: continue the approved plan to its end while respecting its gates and recorded authority.

The daemon does not touch a login, credential prompt, or Claude's bypass-permissions acknowledgement. It does not choose a refusal, run free text from a screen, or create permissions. A nudge only asks an agent to continue; it adds no authority. The lead still records blockers and follows the plan's gates. After three prompts without progress, the daemon stops nudging and reports `plan_stalled`.

## Keep leadership fenced

If the lead is gone, the daemon asks the first reachable listed successor to run the takeover procedure. The lead record advances by epoch, and receivers enforce the succession order. Protocol 2 also supports lead appointment, but only after the human explicitly grants it on the plan; the daemon cannot grant that permission itself. Before any merge, tag, or release, the current lead runs `herdr-peers lead verify --plan <id>` to check the record across the plan's machines.

A successor inherits the plan and its gates. Neither succession nor appointment changes acceptance criteria or permits work outside the recorded authority. If the plan reaches a gate that requires human action under its C1–C7 rules, the loop reports the need and stops at that gate. Credentials and logins also remain human actions. For other progress, the human is notified rather than asked to babysit each step.

## Optional brain and queue

The optional `--brain` starts a dedicated decision agent for cases the daemon's rules cannot settle. The brain may choose only from a closed action list allowed by the plan. The daemon remains the only actor: it validates a choice and performs an eligible action; free-form brain text is never executed. Without explicit plan authorization, the brain does not act on the plan.

The plan queue uses the `dwp-queue-v1` document at `.dwp/queue.json`. The pack is its only writer; the daemon is a bounded, read-only consumer. A queued plan becomes eligible when its `after` dependency is complete (or absent) and its approval remains valid. The daemon starts it only by sending one fixed prompt to its already-registered lead: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” A `launch` entry is not launched by this loop. Queue state is maintained by the pack as execution and finalization proceed.

## Report and observe

Plan events record states such as queued, started, blocked, stalled, lead loss, and completion. The optional `--notify` command receives a `plan-event-v1` object for supported events; the pack's Dailybot notifier turns those into team updates. Notifications report progress or a blocker; they do not authorize an action or replace the plan record.

The fleet report and `herdr-peers fleet ui` show agents and plans across machines, including work that needs attention. The UI is read-only: it writes no plan state and prompts no agent. It helps a human see the loop's state without becoming another control plane.

## The boundary

Loop engineering closes the execution loop around an approved specification. It makes continuation, succession, and reporting routine, while the plan remains the authority and the daemon remains bounded. The human starts the daemon, handles credentials and logins, and resolves only the plan's own C1–C7 gates or other needs the recorded authority cannot satisfy. The loop's goal is an approved plan that reaches its defined end without human babysitting.
