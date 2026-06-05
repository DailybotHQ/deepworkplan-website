---
title: SvelteKit
description: "An onboarding preset for SvelteKit projects, with reasoning cues for routes, load functions, server endpoints, the chosen adapter, and testing."
kind: preset
lang: en
order: 13
stack: SvelteKit
---

# SvelteKit preset

A reasoning guide the onboard flow uses for SvelteKit projects. It is a checklist, not a template — detected reality wins.

## Signals

- `svelte.config.js` and a `vite.config.*`, with `@sveltejs/kit` in dependencies.
- `src/routes/` with `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte`, and `+server.ts` endpoints.
- Package manager inferred from the lockfile that exists (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## What to reason about

- The real lint (`eslint`), type-check (`svelte-check`), test (Vitest, plus Playwright e2e), and build (`vite build`) scripts — captured verbatim.
- The routing and `load` model (server vs universal loads), form actions, and `+server.ts` API endpoints; the configured adapter.
- Stack-appropriate skills: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Notes

Note the configured adapter (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — it shapes the build and deploy story.
