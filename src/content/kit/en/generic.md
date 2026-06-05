---
title: Generic
description: "The fallback onboarding preset for any project, with stack-agnostic reasoning cues that detect build and test commands from the repository."
kind: preset
lang: en
order: 100
stack: Generic
---

# Generic preset

The fallback reasoning guide the onboard flow uses when no stack-specific preset applies. It is a checklist, not a template — detected reality wins.

## What to reason about

- Detect the real build and test commands from the manifest, Makefile, or CI — captured verbatim.
- Apply general conventions; make no stack-specific assumptions.
- Generate only the skills, agents, and docs that match the repo's actual workflows.

## Notes

The fallback when none of Django, Vue + Vite, Astro/Svelte, Node/TS service, or Python package/CLI matches.
