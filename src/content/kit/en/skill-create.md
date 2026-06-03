---
title: skill-create
description: "Create a new reusable skill in the current repository — a parameterized, in-session procedure — via the author sub-skill, keeping the catalog in sync."
kind: command
lang: en
order: 7
usage: /skill-create
---

# skill-create

Create a new skill in the current repository. A thin delegator to the Deep Work Plan **author** sub-skill.

## What it does

`skill-create` routes to the author sub-skill's skill-creation flow. A skill is a reusable, parameterized procedure run in-session (for example, `/fix-lint`). It encodes "how to do X" and lives under `.agents/skills/<name>/SKILL.md`.

## Usage

```
/skill-create
```

## Behavior

1. Detect the repo's `.agents/` layout and local conventions.
2. Confirm a real, repeatable workflow exists; name it kebab-case.
3. Scaffold and fill `SKILL.md` (Goal, When-to-use, Steps, Validation).
4. Add a thin command delegator if needed.
5. Update the `.agents/docs/` catalog to match.

## Notes

For agents use `/agent-create`. Logic lives in the skill; the command stays thin.
