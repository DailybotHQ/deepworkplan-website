---
title: dwp-create
description: "Create a new Deep Work Plan from a high-level goal. The agent analyzes the goal, decomposes the work into sequential tasks, and writes the plan files under .dwp."
kind: command
lang: en
order: 1
usage: /dwp-create <goal>
aliases:
  - dwp:create
---

# dwp-create

Create a new Deep Work Plan from a high-level goal.

## What it does

`dwp-create` takes a high-level goal and turns it into a structured plan. It analyzes the goal, asks clarifying questions if needed, decomposes the work into sequential tasks, and writes the plan files.

## Usage

```
/dwp-create <goal>
```

## Behavior

1. Analyze the goal and repository context.
2. Ask clarifying questions if ambiguous.
3. Decompose into sequential tasks.
4. Write README, task files, and PROGRESS.
5. End with the two mandatory final tasks.

## Aliases

- `dwp:create`
