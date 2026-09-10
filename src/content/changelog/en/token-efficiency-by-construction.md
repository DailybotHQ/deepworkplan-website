---
title: "Token efficiency by construction"
description: "The DWP architecture reduces context cost by loading less, repeating less, and validating the surface that actually changed."
date: 2026-09-09
version: "Architecture · token efficiency"
kind: architecture
lang: en
order: 2
featured: false
sourceLabel: "ADR 0001 — token-efficiency architecture"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/feat/token-efficiency-upgrade/docs/adr/0001-token-efficiency-architecture.md"
---

Context is the agent's scarcest resource. The token-efficiency work in Deep Work Plan treats that constraint as an architecture problem: compress the scaffolding, never the instructions.

The design has five levers: progressive disclosure, affected validation, task-local learning, direct trust-mode creation, and bounded working context. Together they reduce repeated reading and unnecessary full-suite work without making plans vaguer or weakening their gates.

The public evaluation ledger measures instruction bytes and replay behavior honestly. It does not turn an estimate into an invented token-saving percentage.

Read the [token-efficiency architecture](https://github.com/DailybotHQ/deepworkplan-skill/blob/feat/token-efficiency-upgrade/docs/adr/0001-token-efficiency-architecture.md) and its [evaluation notes](https://github.com/DailybotHQ/deepworkplan-skill/blob/feat/token-efficiency-upgrade/docs/evaluations/token-efficiency.md).
