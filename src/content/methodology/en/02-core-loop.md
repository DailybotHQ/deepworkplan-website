---
title: The core loop
description: "The create, execute, refine, resume, and status workflow, the gitignored .dwp output directory, the nine-section task anatomy, and how validation and resumption work."
order: 2
lang: en
summary: How the five DWP operations drive a plan from goal to completion.
icon: refresh
---

# The core loop

DWP defines five operations that move a plan from a goal to completed, reviewable work: **create → execute → refine → resume → status**. Together they form the loop an agent follows throughout a plan's life. Agents execute one task at a time, validating each step before moving on.

## The five operations

- **create** — Generate a new plan from a goal. The agent analyzes the goal, decomposes it into sequential tasks, and writes the plan files. It should ask clarifying questions before writing when the goal is ambiguous.
- **execute** — Run the plan task by task. The agent updates the progress log after each task and marks the task's completion status. It must not skip tasks without recording why.
- **refine** — Modify an existing plan. The agent may add, remove, or reorder tasks, but it must preserve completed work and update the task table.
- **resume** — Continue an interrupted plan. The agent reads the progress log and the task files to reconstruct state, then continues from the first incomplete task.
- **status** — Report progress without executing. The agent summarizes completed, in-progress, and pending tasks and changes nothing.

## The `.dwp/` output directory

All DWP artifacts live under a gitignored `.dwp/` directory at the repository root. Keeping the workspace out of version control means a plan's working state never pollutes the project history.

```
.dwp/
├── plans/
│   └── PLAN_<slug>/
│       ├── README.md
│       ├── PROGRESS.md
│       └── <n>.task_<slug>.md
└── config.yaml
```

## The nine-section task anatomy

Every task file contains these nine sections, in order. The structure guarantees that each unit of work is self-contained and reviewable:

1. **Goal** — one paragraph stating what the task achieves.
2. **Context** — background, links, and why this task exists.
3. **Steps** — ordered, concrete actions to perform.
4. **Acceptance criteria** — a checklist of conditions that define done.
5. **Validation** — commands or tests to run to verify the work.
6. **Files** — paths expected to be created or modified.
7. **Dependencies** — other tasks or external prerequisites.
8. **Risks** — what could go wrong, and mitigations.
9. **Completion & Log** — a status marker plus chronological notes.

## Validation, completion, and resumption

Validation is part of the task, not an afterthought: each task names the commands or tests that prove it is done, and the agent runs them before marking completion. Completion is recorded with an explicit status marker (`[ ]` not started, `[~]` in progress, `[x]` done, `[!]` blocked) in the Completion & Log section. Resumption relies on these markers and the progress log — an agent can reconstruct exactly where the plan stopped and continue from the first incomplete task without redoing finished work.
