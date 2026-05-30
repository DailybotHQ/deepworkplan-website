---
title: dwp-status
description: "Report the status of a Deep Work Plan without executing it. The agent reads the plan and progress log, then summarizes completed, in-progress, and pending tasks."
kind: command
lang: en
order: 5
usage: /dwp-status [plan]
aliases:
  - dwp:status
---

# dwp-status

Report Deep Work Plan status without executing.

## What it does

`dwp-status` summarizes plan progress without making changes. It reports completed, in-progress, and pending tasks.

## Usage

```
/dwp-status [plan]
```

## Behavior

1. Read the plan and `PROGRESS.md`.
2. Summarize completed tasks.
3. Summarize in-progress tasks.
4. Summarize pending tasks.
5. Report without modifying anything.

## Aliases

- `dwp:status`
