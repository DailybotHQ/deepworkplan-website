---
title: deepworkplan-onboard
description: "Make a repository AI-first by reasoning about its stack and archetype, then generating an adapted AGENTS.md, docs/, per-module docs, .agents/, the .claude to .agents symlink, and a gitignored .dwp/."
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
7. Offer the opt-in addons, then self-check.

## Notes

A repository is fully conformant with zero addons. Detected reality always wins over preset assumptions.
