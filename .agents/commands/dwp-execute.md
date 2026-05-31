---
description: Execute an existing deep work plan
---

# /dwp-execute

Delegate to the **deepworkplan** skill (execute flow).

**Skill:** `.agents/skills/deepworkplan/SKILL.md`

## What to do

1. Read `.agents/skills/deepworkplan/SKILL.md` and route to the **execute** sub-skill.
2. Follow that sub-skill's procedure exactly. Do not improvise.
3. Plans live under `.dwp/plans/`. Use the repo's conventional-commit + gate rules.

## Notes

- Executes tasks one at a time with validation gates.
- To resume an interrupted plan use `/dwp-resume`.
