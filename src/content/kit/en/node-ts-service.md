---
title: Node / TS service
description: "An onboarding preset for Node and TypeScript services and serverless APIs, with reasoning cues for the request lifecycle, integrations, and tests."
kind: preset
lang: en
order: 4
stack: Node / TS service
---

# Node / TS service preset

A reasoning guide the onboard flow uses for Node/TypeScript services and serverless APIs. It is a checklist, not a template — detected reality wins.

## Signals

- `tsconfig.json` plus a server framework (`express`, `fastify`, `@nestjs/*`) or serverless handlers (`serverless.yml`, `template.yaml`, a `functions/` directory).
- Package manager inferred from the lockfile that exists.

## What to reason about

- The real lint, type-check (`tsc --noEmit`), test (Jest/Vitest), and build scripts — captured verbatim.
- Whether it is a long-running service or serverless — this shapes architecture and performance docs.
- Stack-appropriate skills: `endpoint`/`handler`, `service`, `middleware`, `integration`, or `lambda-fn`.

## Notes

Capture the request or event lifecycle, integration points, and where secrets and config live.
