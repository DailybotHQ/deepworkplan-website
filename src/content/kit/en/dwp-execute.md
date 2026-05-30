---
title: dwp-execute
description: "Execute an existing Deep Work Plan task by task. The agent reads the full plan, runs each task in order, updates progress, and marks completion accurately."
kind: command
lang: en
order: 2
usage: /dwp-execute [plan]
aliases:
  - dwp:execute
---

# dwp-execute

Execute an existing Deep Work Plan.

## What it does

`dwp-execute` runs an existing plan task by task. It reads the full plan, executes each task in order, updates `PROGRESS.md`, and marks each task's completion status.

## Usage

```
/dwp-execute [plan]
```

## Behavior

1. Read the full plan before starting.
2. Execute tasks in order.
3. Update `PROGRESS.md` after each task.
4. Mark task status accurately.
5. Stop and ask when blocked.

## Aliases

- `dwp:execute`
