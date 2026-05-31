---
title: Astro / Svelte
description: "An onboarding preset for Astro sites, optionally with Svelte islands, with reasoning cues for content collections, schema validation, island hydration, and static-site output."
kind: preset
lang: en
order: 3
stack: Astro / Svelte
---

# Astro / Svelte preset

A reasoning guide the onboard flow uses for Astro sites, optionally with Svelte islands. It is a checklist, not a template — detected reality wins.

## Signals

- `astro.config.*`; optionally `@astrojs/svelte` and `.svelte` components.
- Content Collections under `src/content/` with Zod schemas.

## What to reason about

- The real lint, type-check (`astro check`), test, and build scripts — captured verbatim.
- Content-collection schemas and the island-hydration conventions (`client:visible` over `client:load`).
- Stack-appropriate skills for components, pages, and content entries.

## Notes

Useful for content-driven sites using Astro's island architecture with selective interactivity.
