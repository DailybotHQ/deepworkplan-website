---
title: Documentation standard
description: "Normative standard for how Deep Work Plans document their structure, tasks, and progress: README rules, status markers, the ten-section task anatomy, and the Final Review."
order: 1
lang: en
section: Standard
---

# Documentation standard

**Version 5.0.0.** This standard defines how Deep Work Plans document their structure, tasks, and progress, and how a repository documents itself so an agent can act on it safely. It applies to every plan created under the DWP methodology. This version aligns the document's own version with the DWP standard it accompanies — no existing requirement changes — and adds the lean-index budget enforcement and the feature tier described below. The keywords MUST, SHOULD, and MAY are used as defined in RFC 2119.

## AGENTS.md as a compact entry point

The root `AGENTS.md` file SHOULD stay within a 150–500 line budget. When generated or harness-maintained content would exceed it, the agent MUST move the detail into the `docs/` guide (or the module/feature doc) that owns it and link it from the index — nothing is dropped, only relocated, and the index MUST link every doc that received displaced content. An existing handwritten `AGENTS.md` over budget is never rewritten silently: the agent proposes a concrete migration (what moves where, which links get added) and applies it only with the developer's consent. A conformance checker treats the budget as advisory, since a line count is objective but authorship is not — the MUST binds the harness that generates or updates the file, not a checker's guess about who wrote it. `AGENTS.md` MUST NOT link a `docs/` file that does not exist.

Above the per-module documentation tier (below) sits a **feature tier**: a major capability area — bigger than one module — gets its own `docs/` folder next to its code, entered via its own `README.md`. An area qualifies when it spans two or more major modules, owns a self-contained sub-app or subsystem directory, or carries its own contracts (an API surface, event or schema contracts) that multiple consumers depend on. Once an area is recorded as major, its feature `docs/` SHOULD exist, and its most significant entries SHOULD be linked from the modules it spans and from the root `AGENTS.md` index, exactly like per-module docs. An area deliberately left undocumented carries a recorded reason — a decision, not an oversight.

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
