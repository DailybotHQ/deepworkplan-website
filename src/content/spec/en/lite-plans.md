---
title: Lite plans
description: "Lite plans: compact, fully executable task records inline in README.md, their creation and format selection, and promotion to a Full plan."
order: 3
lang: en
section: Workflow
---

# Lite plans

**Version 2.4.0. Status: Stable.** This document specifies the Lite plan representation introduced alongside the [DWP specification](/spec/dwp-specification): a plan format for small-to-medium bounded work that is materialized directly, with no non-executable draft stage. The keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

## Representation and lifecycle

A plan MUST be one of two representations, recorded once in `manifest.json` as `plan_format`: **Full** stores one file per task under `<n>.task_<slug>.md`; **Lite** stores compact, executable task records inline in `README.md`, each behind a stable `{#task-N}` anchor. A Lite plan is not a partial or informal Full plan: every task record MUST still carry a goal, a Touched Surface, acceptance criteria, a validation gate, and a completion log, in the same normative shape [Task anatomy](/spec/dwp-specification#task-anatomy) defines for Full.

Four axes describe a plan's state, and MUST be tracked independently rather than conflated:

| Axis | Values | Meaning |
|------|--------|---------|
| Format | `lite`, `full` | Where task records live |
| Materialization | `materializing`, `ready`, `promoting` | Whether the plan folder is being written, complete, or mid-promotion |
| Approval | `pending`, `approved`, `pre_approved` | Whether a human reviewed the plan, or trust mode pre-approved it |
| Execution | `pending`, `in_progress`, `blocked`, `completed` | Per-task and overall progress |

Guided create writes a **reviewable pending proposal** — Lite or Full, already the real plan, never a throwaway draft. Trust materializes a **ready, pre-approved** plan and returns control immediately. `create` and a promotion never execute product work; `execute` MUST reject a `pending` proposal awaiting approval and MUST reject a plan with an unresolved promotion in progress.

## Creation and format selection

`/dwp-create` serves planning intent at every scale, not only large work. Small, bounded work — a single concern, roughly one sitting, no coordination — is the Lite plan's target; multi-step work with real scope defaults to Full, per [Proportional rigor](/spec/dwp-specification#proportional-rigor). A direct edit, an explanation, a status check, a resume, or an explicit no-plan request keeps its own route and never becomes a plan.

`lite` and `full` are **format preferences**; `trust` and `auto` are separate **interaction options**, and either kind of option MAY appear at either end of the request, in any order:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Repeating the same option is idempotent; requesting `lite` and `full` together is an error. `--` ends option parsing.

When no format preference is given, `create` recommends one and explains why. An explicit **Full** request always wins. An explicit **Lite** request is honored unless the work's requirements or validation gates would not fit in compact inline records — in that case `create` records why Full is required instead. The selection MUST record the observed scope, dependencies, required instruction detail, and unknowns behind the choice — an auditable judgment call, not a guarantee that holds across every model or agent.

## Promotion and compatibility

A Lite plan MAY be **promoted** to Full at any point, via `/dwp-refine promote {plan_name}` (see [dwp-refine](/kit/dwp-refine)). Promotion is **representation-only**: it records intent, writes the destination task files, validates that every requirement and gate the Lite record carried is still covered, switches the authoritative copy from the inline README records to the task files, then clears the in-progress marker. `execute` and `resume` MUST refuse to proceed while a promotion marker remains set. Task IDs and completion evidence already recorded MUST NOT be rewritten by a promotion; new scope discovered during promotion goes through `refine` instead and invalidates only the evidence it affects.

Promotion never runs the other way automatically: a Full plan is not silently collapsed back to Lite. A plan authored under an earlier spec version — including a v1 Full plan with no `plan_format` field at all — keeps its recorded shape and remains conformant; a `refine` session MAY migrate it deliberately, but nothing does so implicitly.

`manifest.json`'s `plan_format` is immutable once written; a promotion changes `state.json`'s `format` and clears its `promotion` marker, and never rewrites the manifest. See [Plan state](/spec/plan-state) for the exact `plan_format`, `format`, `materialization`, `approval`, `promotion`, and `locator` fields, and their v2 schema URLs.
