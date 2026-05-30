---
title: DWP specification
description: "The normative Deep Work Plan specification covering plan structure, the nine-section task anatomy, the five-operation execution loop, the output workspace, and versioning."
order: 2
lang: en
section: Workflow
---

# DWP specification

**Version 1.0. Status: Stable.** This document is the normative specification for the Deep Work Plan (DWP) methodology. The keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

## Definition

A Deep Work Plan is a structured, markdown-only artifact that describes a complex engineering task decomposed into sequential, reviewable units of work, designed to be created, executed, and maintained by AI coding agents working autonomously.

DWP is spec-driven: the plan is the specification, and agents MUST execute against its explicit acceptance criteria and validation gates rather than improvising. The specification — not a chat transcript — is the durable source of truth, so the work is verifiable and resumable across sessions and agents. It is also harness engineering made portable: the context, control loop, guardrails, and resumable state that make an agent reliable are installed into the repository itself as plain markdown, so any conformant agent MAY pilot the repository without a tool-specific framework.

## Plan structure

A plan MUST be a directory under `.dwp/plans/` named `PLAN_<slug>/`. The directory MUST contain:

- `README.md` — plan overview, goal, task table, and status.
- One file per task, named `<n>.task_<slug>.md`.
- `PROGRESS.md` — a running log of execution.

## Task anatomy

Each task file MUST contain these nine sections, in order:

1. **Goal** — a one-paragraph statement of what the task achieves.
2. **Context** — background, links, and why this task exists.
3. **Steps** — ordered, concrete actions to perform.
4. **Acceptance criteria** — a checklist of conditions that define done.
5. **Validation** — commands or tests to run to verify.
6. **Files** — paths expected to be created or modified.
7. **Dependencies** — other tasks or external prerequisites.
8. **Risks** — what could go wrong, and mitigations.
9. **Completion & Log** — a status marker plus chronological notes.

## The execution loop

DWP defines five operations:

- **create** — Generate a new plan from a goal.
- **execute** — Execute the plan task by task.
- **refine** — Modify an existing plan.
- **resume** — Resume an interrupted plan.
- **status** — Report plan status without executing.

## Output workspace

All DWP artifacts MUST live under a gitignored `.dwp/` directory at the repository root.

## Versioning

This specification follows semantic versioning.
