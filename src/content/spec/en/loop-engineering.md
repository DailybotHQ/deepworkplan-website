---
title: Loop engineering
description: "Normative v8 loop semantics: recorded authority, human-started continuation, lead succession, blockers, queue behavior, notifications, and fleet visibility."
order: 12
lang: en
section: Loop engineering
---

# Loop engineering

This page defines the plan contract for loop engineering. The **plan** remains the authority; the loop supplies continuity and visibility. Add-ons can amplify the method, but cannot widen a plan's recorded authority.

## 1. The v8 rule

An approved plan runs to its end without a human. Autonomy is the default **inside the plan's recorded authority**; the human is notified, never waited on—except logins and credentials, and the plan's own C1–C7 gates (such as publication, pushing, or external messages) still stop unless the plan records pre-authorization. The v7 rule remains: the methodology works alone; add-ons only amplify.

## Loop semantics

### Registration and observation

With the Herdr add-on enabled, the v8 pack's `execute` flow claims a lead record and records the plan's succession. A plan is watched only when it has a lead record and its state is readable. The human starts `herdr-peers autopilot --loop`; it is a daemon, not a login item or a system service. One daemon can observe plans reported by every enabled Herdr machine. A plan without a lead record is not watched.

### Continuation, stalling, and failover

For an open plan, the daemon prompts only the lead and only after its idle-state guards pass: the lead has been idle or done for five minutes, no lane is working, no reply is pending, the pane is in scope and not excluded, and there is no dialog, login, usage-limit screen, or human draft on the input line. The prompt is fixed and asks the lead to continue to the plan's end while respecting its gates and recorded authority. A prompt grants no authority. After three prompts without progress in plan state, the daemon records `plan_stalled` and leaves the plan until its state changes. A blocked plan is reported, not prompted.

When a lead is gone, the daemon asks the first reachable listed successor to run `herdr-peers lead takeover --plan <id>`. The helper verifies the succession and advances the epoch; the daemon does not write the lead record or select an unlisted pane. A usage limit alone is not proof that a lead is gone. Protocol 2 also supports appointment from a plan's lanes, but only when a human explicitly records the grant with `lead claim --allow-appointment` and starts the daemon with `--appoint`. Before any merge, tag, or release, the acting lead runs `herdr-peers lead verify --plan <id>`.

### Brain, events, and fleet

The optional `--brain` starts a dedicated decision agent for cases the daemon's rules cannot decide. It may choose only from a closed action list. The daemon remains the only actor: it validates a permitted choice and performs the action; it never executes free-form brain text. The plan must also allow the brain in its `autonomy` block.

The loop records plan events for conditions such as stalls, blockers, lost leads, completion, and queue outcomes. With the optional `--notify` integration, the daemon sends a `plan-event-v1` object to the configured notifier; the pack's Dailybot notifier turns supported events into team updates. A notification does not approve work or change the plan record. The fleet map and `herdr-peers fleet ui` show agents and plans across machines. The UI is read-only: it changes no plan state and prompts no agent. Tagged behavior is documented in [herdr-peers v2.0.0 autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md) and its [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md).

## 2. The `autonomy` block (plan-contract/v8)

The optional top-level `autonomy` object is closed: unknown keys are invalid. Its field names and types are canonical in the [plan-contract/v8 schema](https://deepworkplan.com/schema/plan-contract/v8.json). When the block is absent, all defaults apply. When the block exists, each omitted field keeps its own default; a consumer MUST NOT guess.

| Field | Type and allowed values | Default when omitted |
|---|---|---|
| `stall_budget` | Integer from 1 through 10 | `3` loop prompts without progress |
| `promptable` | Non-empty array of Herdr pane addresses | The plan's lead only |
| `notify` | Non-empty array; currently `dailybot` | No target; loop events are still recorded |
| `brain` | Boolean | `false`; no brain may act on this plan |
| `queue` | `prompt-lead`, `launch`, or `none` | `none`; the plan is not queued |

A pane address uses Herdr's exact form: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. A machine ID cannot begin with `-`. These settings bound who may be prompted, who receives events, whether a brain may act, and how the plan participates in a queue. They never change the plan's acceptance criteria or gates.

## 3. Structured blockers and progress

A blocked plan records a C-class and an optional `resolver` field in `state.json`'s `blocked` or `blocker` record. `resolver` is either `lead` or `human`; when absent, it means `human`. `lead` means the blocker can be resolved within the plan's recorded authority without a credential, login, consent, payment, push to main, release, or deletion. The loop, including its brain, may ask a lead to resolve only a blocker marked `lead`. Other blockers are reported for the human and are not prompted around.

The tagged herdr-peers fleet map may display up to 14 lines of a plan's own `PROGRESS.md` as a cleaned summary. That display is observational data, not an authority grant or a published schema for a machine-readable progress header. The pack's v8 line and its planned header shape must be checked against the 8.0.0 tag before being treated as normative.

## 4. The plan queue

The plan queue is `.dwp/queue.json` with schema `dwp-queue-v1`. The pack is its only writer: `create` appends on approval, the human or lead reorders through the plan workflow, `execute` marks `started` when it claims the lead (with the lead address), finalization marks `done`, and `create` or `refine` can mark an item `skipped` with a one-line note. Queue items have a plan, an optional `after` dependency naming a plan already in the queue, state, lead, and start mode. A repository runs one plan at a time unless the queue explicitly sets `parallel: true`.

The daemon is a bounded, read-only consumer. It rejects an unusable queue as empty without breaking plan execution. A queued plan can start only when its dependency is complete (or absent), it is approved, it names a lead, and the repository has no other running plan unless parallelism is enabled. The `prompt-lead` mode sends the named lead one fixed prompt: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” The daemon does not write queue state. `launch` mode is not performed by this loop unless the released contract explicitly adds that behavior.

## 5. What v8 keeps

V8 keeps the v7 contract for `tasks[].parallel_safe`, delegation, and the journal. The v8 journal-event set remains the v7 set; the generation ladder is ordered, so features gated as v7 remain available to v8 and later. In the record layer, v8 retains the v7 manifest and journal-event schema URLs and adds only the `plan-contract/v8` URL for the new generation. Existing v5, v6, and v7 plans keep their recorded generation and are not silently migrated.

The v8 contract does not make add-ons mandatory. Without Herdr, plans still execute under their recorded authority through the core methodology. With Herdr, registration, bounded continuation, succession, notifications, the queue, and the read-only fleet view extend that same plan lifecycle.
