---
title: agent-create
description: "Create a new agent in the current repository — a specialized worker with its own model tier and tools — by delegating to the author sub-skill, following the repo's local conventions and keeping the catalog in sync."
kind: command
lang: en
order: 8
usage: /agent-create
---

# agent-create

Create a new agent in the current repository. A thin delegator to the Deep Work Plan **author** sub-skill.

## What it does

`agent-create` routes to the author sub-skill's agent-creation flow. An agent is a specialized worker definition (role, model tier, tools, system prompt) dispatched to handle a class of tasks. It encodes "who does X" and lives under `.agents/agents/<name>.md`.

## Usage

```
/agent-create
```

## Behavior

1. Detect the repo's `.agents/` layout and local conventions.
2. Confirm a recurring role with distinct model/tools needs; name it kebab-case.
3. Scaffold and fill the agent (Role, Inputs, Process, Output, escalation).
4. Choose a justified model tier — light, standard, or heavy — without hardcoding vendor model IDs.
5. Update the `.agents/docs/` catalog to match.

## Notes

For procedures use `/skill-create`. Keep model tiers abstract and map them in repo config.
