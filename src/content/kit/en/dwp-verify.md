---
title: dwp-verify
description: "Verify that a repository is DeepWorkPlan-conformant (AI-first) and that its plans are well-formed, producing an objective pass/fail report against the specification's Conformance criteria."
kind: command
lang: en
order: 5.5
usage: /dwp-verify [plan <name> | all]
aliases:
  - dwp:verify
---

# dwp-verify

Objectively check repository and plan conformance — read-only.

## What it does

`dwp-verify` checks, mechanically, whether a repository is AI-first (DeepWorkPlan-conformant) and whether its plans are well-formed, then reports pass/fail. It changes nothing.

## Usage

```
/dwp-verify            # verify the repository
/dwp-verify plan auth  # also verify a specific plan
/dwp-verify all        # repository + every plan
```

## Behavior

1. Check the repository: `AGENTS.md` with real, runnable commands; `CLAUDE.md` resolution; `docs/` categories; `.agents/` catalog matching disk; thin `dwp-*` delegators; gitignored `.dwp/` and `tmp/`; a resolvable skill.
2. Check a plan (when requested): every task has acceptance criteria and a validation gate, progress is persisted, the two mandatory final tasks are present, and tasks re-anchor to the goal.
3. Report **CONFORMANT** or **NOT CONFORMANT** with each failure listed.
4. Offer to capture gaps as a Deep Work Plan; never fix silently.

## Aliases

- `dwp:verify`
