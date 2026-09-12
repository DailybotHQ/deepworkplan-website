---
description: Check for a newer DeepWorkPlan skill and, only on explicit acceptance, install it and re-run onboarding
---

# /dwp-upgrade

Delegate to the **deepworkplan** skill (upgrade flow).

**Skill:** `.agents/skills/deepworkplan/SKILL.md`

## What to do

1. Read `.agents/skills/deepworkplan/SKILL.md` and route to the **upgrade** sub-skill (`upgrade/SKILL.md`).
2. Follow that sub-skill's procedure exactly. Do not improvise.
3. The check phase is read-only; the download and re-onboarding run only after explicit acceptance.
4. Plans under `.dwp/` are never migrated or rewritten by an upgrade.

## Notes

- Re-runs onboarding as if executing `https://deepworkplan.com/init.md` fresh, preserving local adaptations.
- This repository's vendored `deepworkplan` copy is repo-adapted: the consent phase must surface the adaptation diff before anything is overwritten.
- First-time onboarding and plan work route through their own sub-skills (`onboard`, `create`, `execute`).
