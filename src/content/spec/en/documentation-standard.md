---
title: Documentation standard
description: "Normative standard for how Deep Work Plans document their structure, tasks, and progress: README rules, status markers, the ten-section task anatomy, and the Final Review."
order: 1
lang: en
section: Standard
---

# Documentation standard

**Version 1.1.** This standard defines how Deep Work Plans document their structure, tasks, and progress. It applies to every plan created under the DWP methodology. The keywords MUST, SHOULD, and MAY are used as defined in RFC 2119.

## Plan README

Every plan MUST have a `README.md` containing:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — a prose statement of the plan's objective.
- **Source material** — links or paths to canonical inputs (optional).
- **Tasks** — a markdown table with the task number, name, and a status checkbox.
- **Status** — a line in the form `<n>/<total> tasks complete`.

## Task files

Each task file MUST be named `<n>.task_<slug>.md` and contain the ten-section anatomy — the nine classic sections plus the **Touched Surface**: the contract between what the task changes and what must be validated (planned vs. actual surface, affected consumers, a risk class of *isolated*, *seam*, *shared/core*, or *unknown*, the test mapping used, and the selected gate with its reason).

## PROGRESS.md

`PROGRESS.md` is an append-only execution log. Each entry MUST record:

- An ISO 8601 timestamp.
- The task number and name.
- What was done.
- Any deviations or skip reasons.

## Status markers

- `[ ]` — not started.
- `[~]` — in progress.
- `[x]` — done.
- `[!]` — blocked.

## Headings

All headings MUST use sentence case. Documents SHOULD avoid marketing language and exclamation marks.

## The Final Review, task-local skills, and the optional report

Every plan authored under this version MUST end with exactly one mandatory task: the **Final Review** — the security pass over the plan's full change set, the final-state validation on the last relevant state, and the reconciliation of skills decisions. A critical security finding blocks completion.

- **Task-local skills decisions.** Every task's Completion & Log carries a **skills disposition** — `none`, an update to an existing skill or agent, a named creation, or a deferral with a reason and owner. Warranted authoring happens inside the owning task, before its validation gate, after a duplicate check against the `.agents/` catalog; warranted entries are recorded as stable candidates (`T{task}-{seq}`) in the plan's skills-candidates ledger.
- **The Executive Report is optional, on request.** Offered once at completion; generated only on explicit request from durable evidence. No answer or an unattended run leaves the plan complete without it.
- **Legacy plans.** Plans authored under earlier versions end with the three mandatory final tasks and remain conformant — a conformance checker MUST accept that shape.
