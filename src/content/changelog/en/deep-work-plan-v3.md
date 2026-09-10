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

Deep Work Plan v3 is a major release of the skill's methodology and lifecycle. The command surface stays familiar, but the contract around long-horizon work becomes stronger: new plans end with one mandatory Final Review, the local AI Diff Reviewer becomes part of the baseline, and conformance starts from zero optional addons.

This is the direction of the project: spec-driven development where the repository itself becomes the harness. The repository carries the context, guardrails, validation contract, and resumable state that any compatible coding agent can read.

The website's `3.0.0` release and the skill repository's v3 release are related but distinct. This page documents the skill's v3 milestone on DWP standard `2.3.0`; the website currently carries a `2.17.1` dogfood mirror while preparing its own `3.0.0` release.

## What changed

- One Final Review replaces the three closing tasks for new plans.
- The AI Diff Reviewer local review is a required baseline component.
- `GUIDE.md` becomes a routing index, so agents load only the relevant guidance.
- `AGENTS.md` records the repository's DWP standard provenance.
- Legacy plans keep their recorded shape and receive an explicit migration path instead of being silently rewritten.

## Why it matters

The release makes reliability part of the methodology rather than an informal promise. A plan can be long-running, cross-agent, and resumable while remaining inspectable in plain files and enforceable through gates.

Read the [normative specification](https://deepworkplan.com/spec), explore the [kit](https://deepworkplan.com/kit/), or start adoption from [`/init`](https://deepworkplan.com/init).
