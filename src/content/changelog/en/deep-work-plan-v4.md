---
title: "DWP v4: plans that fit the work"
description: "Deep Work Plan v4 makes plan format follow the work, not the other way around — a Lite plan is now a complete, executable proposal for bounded tasks, and the separate draft-staging step is gone."
date: 2026-09-11
version: "v4 · Lite-first plans"
kind: release
lang: en
order: 1
featured: true
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Today we are releasing Deep Work Plan v4. This release is about agility and versatility: the same methodology should feel light for a bounded fix and still hold up for work that runs across hours or days, without asking a developer to choose the "serious" format just to get real gates.

Creating a plan for bounded work no longer means writing a throwaway draft for review and then a separate final plan. `create` now materializes a **Lite plan** directly: a compact, fully executable proposal with inline task records, each carrying its own acceptance criteria, validation gate, and completion log. There is no more `.dwp/drafts/` staging step — the draft and the plan are the same artifact, reviewable and runnable from the moment it is written.

Full task-file plans remain exactly where they belong: longer, higher-risk work still gets one file per task, a dedicated analysis record, and the same resumable state layer. A Lite plan can be promoted to Full at any point a requirement or a validation gate would no longer fit a compact record, and which representation to start from follows explicit, recorded signals — task count, touched surface, risk, reversibility — never a guess.

This release follows DWP standard `2.4.0`. Read the [normative specification](https://deepworkplan.com/spec), explore the [kit](https://deepworkplan.com/kit/), or start adoption from [`/init`](https://deepworkplan.com/init).
