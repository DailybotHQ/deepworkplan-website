---
title: "Deep Work Plan v3: the repository becomes the harness"
description: "Deep Work Plan v3 strengthens the lifecycle, conformance floor, and review guarantees behind long-horizon agent work."
date: 2026-09-10
version: "v3 · DWP standard 2.3.0"
kind: release
lang: en
order: 1
featured: true
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Today we are releasing Deep Work Plan v3. The goal is to keep Deep Work Plan working the way it does today while making it faster to use, clearer to navigate, and valuable for small tasks as well as long-horizon work. The command surface stays familiar, but the contract becomes stronger: new plans end with one mandatory Final Review, the local AI Diff Reviewer joins the baseline, and conformance starts from zero optional addons.

The goal of this release is straightforward: make spec-driven development portable by turning the repository itself into the harness. The repository carries the context, guardrails, validation contract, and resumable state that any compatible coding agent can read, without making a focused change feel heavier than the work itself.

This release follows DWP standard `2.3.0`. It is a skill release: the website and other adopters can carry it independently as they update their own packages.

## What changed

- One Final Review replaces the three closing tasks for new plans.
- The AI Diff Reviewer local review is a required baseline component.
- `GUIDE.md` becomes a routing index, so agents load only the relevant guidance.
- `AGENTS.md` records the repository's DWP standard provenance.
- Legacy plans keep their recorded shape and receive an explicit migration path instead of being silently rewritten.

## Why it matters

This release makes reliability and cost efficiency part of the methodology rather than informal promises. Plans should avoid unnecessary loops, repeated context loading, and validation work that does not match the touched surface, while remaining inspectable in plain files and enforceable through gates. A long-running plan and a small focused task should both get the right amount of structure for the work at hand.

Read the [normative specification](https://deepworkplan.com/spec), explore the [kit](https://deepworkplan.com/kit/), or start adoption from [`/init`](https://deepworkplan.com/init).
