---
title: Documentation standard
description: "Normative standard for how Deep Work Plans document their structure, tasks, and progress: README rules, status markers, and the three mandatory final tasks."
order: 1
lang: en
section: Standard
---

# Documentation standard

**Version 1.0.** This standard defines how Deep Work Plans document their structure, tasks, and progress. It applies to every plan created under the DWP methodology. The keywords MUST, SHOULD, and MAY are used as defined in RFC 2119.

## Plan README

Every plan MUST have a `README.md` containing:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — a prose statement of the plan's objective.
- **Source material** — links or paths to canonical inputs (optional).
- **Tasks** — a markdown table with the task number, name, and a status checkbox.
- **Status** — a line in the form `<n>/<total> tasks complete`.

## Task files

Each task file MUST be named `<n>.task_<slug>.md` and contain the nine-section anatomy.

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

## Three mandatory final tasks

Every plan MUST end with three standard tasks:

1. **Security Review** — audit the plan's full change set for secrets, injection risks, and new attack surface, and verify `docs/SECURITY.md` still reflects reality. A critical finding blocks completion.
2. **Skills & Agents Discovery** — identify reusable skills and agents created.
3. **Executive Report** — a summary of outcomes for stakeholders.
