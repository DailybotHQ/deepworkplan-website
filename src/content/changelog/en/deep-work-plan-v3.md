---
title: "DWP v3: token efficiency by construction"
description: "Deep Work Plan v3 rebuilds the harness around context cost — progressive disclosure, affected-only validation, and a single mandatory Final Review — while raising the trust and conformance floor."
date: 2026-09-10
version: "v3 · Token efficiency"
kind: release
lang: en
order: 2
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Today we are releasing Deep Work Plan v3. Context is an agent's scarcest resource, and this release treats that as an engineering problem rather than an informal promise: compress the scaffolding, never the instructions.

`GUIDE.md` becomes a routing index instead of a document every agent reads in full, so an agent loads only the guidance a given step actually needs. Validation gates are now selected from each task's touched surface instead of re-running the full suite on every change, and creating a plan can go straight to trust mode when a developer already knows what they want, skipping the intermediate review. None of this weakens the gates: it removes repeated reading, redundant context loading, and validation work that does not match what actually changed.

Alongside the efficiency work, this release raises the trust floor. One mandatory Final Review replaces the three closing tasks that used to end a plan, the AI Diff Reviewer local review becomes a required baseline component, and conformance now starts from zero optional addons — security and provenance are requirements, not optional polish. `AGENTS.md` records the repository's DWP standard provenance, and legacy plans keep their recorded shape with an explicit migration path instead of being silently rewritten.

This release follows DWP standard `2.3.0`. Instruction-load and replay behavior are measured against a public evaluation ledger, never reported as an invented savings percentage.

Read the [token-efficiency architecture](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) and its [evaluation record](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), or explore the [normative specification](https://deepworkplan.com/spec) and the [kit](https://deepworkplan.com/kit/).
