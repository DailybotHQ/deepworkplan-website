---
title: dwp-resume
description: "Resume an interrupted Deep Work Plan by reconstructing state from the progress log and task files, then continuing from the first incomplete task without redoing work."
kind: command
lang: en
order: 4
usage: /dwp-resume [plan]
aliases:
  - dwp:resume
---

# dwp-resume

Resume an interrupted Deep Work Plan.

## What it does

`dwp-resume` continues an interrupted plan. It reconstructs state from `PROGRESS.md` and the task files, then continues from the first incomplete task.

## Usage

```
/dwp-resume [plan]
```

## Behavior

1. Read `PROGRESS.md` and the task files.
2. Reconstruct execution state.
3. Continue from the first incomplete task.
4. Update progress as it goes.

## Aliases

- `dwp:resume`
