---
title: Angular
description: "An onboarding preset for Angular projects, with reasoning cues for components, modules or standalone APIs, services, RxJS, and the test runner."
kind: preset
lang: en
order: 15
stack: Angular
---

# Angular preset

A reasoning guide the onboard flow uses for Angular projects. It is a checklist, not a template — detected reality wins.

## Signals

- `angular.json` and `@angular/core` in dependencies; `src/app/` with `@Component`/`@NgModule` or standalone components.
- Services with `@Injectable`, RxJS observables, and dependency injection.
- Package manager inferred from the lockfile that exists.

## What to reason about

- The real test (`ng test` / Karma+Jasmine `*.spec.ts` or Jest), lint (`ng lint` / `@angular-eslint`), and build (`ng build`) commands — captured verbatim.
- Whether the app uses NgModules or the standalone-components API, and the routing and DI conventions.
- Stack-appropriate skills: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Notes

Useful for Angular apps following the CLI project layout. Confirm Karma/Jasmine vs Jest from the config that exists.
