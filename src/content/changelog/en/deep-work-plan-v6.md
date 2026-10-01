---
title: "DWP v6: the same method, a stricter contract"
description: "Deep Work Plan v6 keeps the v5 methodology and adds a stricter execution structure. Agent outcome non-inferiority has not been measured."
date: 2026-09-28
version: "v6 · Stricter structure"
kind: release
lang: en
order: 0
featured: true
sourceLabel: "Published v6 schema set"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 keeps the v5 methodology, command surface, and `.dwp/plans/` location. It adds stricter structure for how plan authority, execution evidence, task context, scheduling, and live state are represented.

The v6 schema set defines the identity manifest, outcome and authority contract, append-only journal events, per-task context manifest, and live snapshot. The v6 live projection is a snapshot, so `plan-state/v5.json` remains the state schema for v5 plans; there is no `plan-state/v6.json`. Existing plans keep their recorded generation and are never silently rewritten.

The architecture decision is GO: v6 keeps the same methodology with stricter engineering structure. This is not an empirical superiority claim. Agent outcome non-inferiority has not been measured.

New plans receive monotonically increasing numeric IDs with at least three digits (for example, `PLAN_001_add_payment_webhooks/`). Because the frozen v5 schemas count the numeric ID as a word, v5 slugs contain 2–4 words; v6 slugs contain 2–5 words. Existing unnumbered `PLAN_<slug>/` folders remain readable and are never renamed. When numbered plans exist, `latest` resolves to the plan with the highest numeric ID.

Installed skill release: **6.0.2**. The current 6.x pack creates new plans with v6 by default; existing plans keep their recorded generation and are never migrated implicitly.
