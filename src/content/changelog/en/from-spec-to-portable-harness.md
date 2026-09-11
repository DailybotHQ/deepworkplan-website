---
title: "DWP v1: from a plan loop to a portable harness"
description: "Deep Work Plan grows from a single written-plan loop into a portable adoption kit — trust and provenance, broader agent-host coverage, and a conformance checker any repository can run."
date: 2026-06-12
version: "v1 · Foundation"
kind: foundation
lang: en
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Until now, Deep Work Plan has been a plan-writing loop that one agent follows inside a single session. This run of releases turns it into something a repository can adopt on its own terms — the first version dedicated to reach beyond a single agent and a single sitting.

The skill gains a trust statement with checksummed provenance, so a developer can see exactly what it reads and writes before installing it. Onboarding presets and supported agent hosts broaden considerably, testing discipline becomes a first-class part of every task instead of an afterthought, and a conformance checker lets a repository verify — objectively, not by assumption — that it meets the standard. A state-and-resume protocol means an interrupted plan can pick up where it left off instead of starting over. Under the hood, `.claude` and `.cursor` compatibility converge on one canonical `.agents` directory, so every supported agent reads the same kit.

Together, these releases lay the foundation for what comes next: the repository stops being just where the plan is stored, and starts becoming the agent's working harness.

Review the [skill's release history](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) for the full sequence.
