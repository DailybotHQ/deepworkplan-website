---
title: deepworkplan-onboard
description: "Make a repository AI-first by reasoning about its stack and archetype, then generating an adapted AGENTS.md, docs/, .agents/, and a gitignored .dwp/."
kind: command
lang: en
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Turn a repository into an AI-first, spec-driven codebase. This is the onboard sub-skill of the Deep Work Plan skill.

## What it does

`deepworkplan-onboard` inspects the **real** repository — languages, frameworks, package manager, build/test/lint commands, modules, test convention, deployment shape — and generates artifacts adapted to it. It reasons; it never copies a template or leaves a placeholder.

## Usage

```
/deepworkplan-onboard
```

## Behavior

1. Reconnaissance — detect the real stack and validation commands; match the closest onboarding preset.
2. Archetype — classify as individual repo or orchestrator hub.
3. Generate `AGENTS.md` + the `CLAUDE.md` symlink with a real Quick Commands block.
4. Generate `docs/` (architecture, standards, testing, security, and more) and per-module docs.
5. Generate `.agents/` (agents, thin `dwp-*` commands, stack-appropriate skills, catalog) + `.claude → .agents`.
6. Install the skill and scaffold a gitignored `.dwp/` (plans, drafts) and a `tmp/` scratch space.
7. Install the required AI Diff Reviewer local review, offer the opt-in addons, then self-check.

## Notes

A repository is fully conformant with zero optional addons; the AI Diff Reviewer local review is part of the baseline since standard 2.3.0. Detected reality always wins over preset assumptions.

## v7 schema references

For v7 plans — the default of the current 7.x pack — the machine-readable schema catalog is published at these stable URLs. The live projection is a snapshot shared with v6; there is no `plan-state/v6.json` or `plan-state/v7.json`.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v7.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v7.json (the v6 contract plus an optional `parallel_safe` task marker)
- **Journal event:** https://deepworkplan.com/schema/journal-event/v7.json (adds the `delegation` event)
- **Plan snapshot (live projection, shared with v6):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Context manifest (shared with v6):** https://deepworkplan.com/schema/context-manifest/v6.json

v6 plans keep their v6 schemas ([manifest](https://deepworkplan.com/schema/plan-manifest/v6.json), [contract](https://deepworkplan.com/schema/plan-contract/v6.json), [journal event](https://deepworkplan.com/schema/journal-event/v6.json)); existing v5 plans continue to use the v5 state schema, and old plans are never silently rewritten.

The current 7.x pack creates new plans with v7 by default. Existing plans retain their recorded generation; migration requires an explicit request. New plans receive monotonically increasing numeric IDs with at least three digits (for example, `PLAN_001_add_payment_webhooks/`). Because the frozen v5 schemas count the numeric ID as a word, v5 slugs contain 2–4 words; v7 slugs contain 2–5 words. Existing unnumbered `PLAN_<slug>/` folders remain readable and are never renamed. When numbered plans exist, `latest` resolves to the plan with the highest numeric ID.
