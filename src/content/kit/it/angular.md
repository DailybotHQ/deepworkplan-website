---
title: Angular
description: "Preset di onboarding per progetti Angular, con spunti di ragionamento per component, moduli o API standalone, service, RxJS e il test runner."
kind: preset
lang: it
order: 15
stack: Angular
---

# Preset Angular

Una guida di ragionamento che il flusso di onboard usa per i progetti Angular. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `angular.json` e `@angular/core` nelle dipendenze; `src/app/` con `@Component`/`@NgModule` o component standalone.
- Service con `@Injectable`, observable RxJS e dependency injection.
- Package manager dedotto dal lockfile presente.

## Su cosa ragionare

- I comandi reali di test (`ng test` / Karma+Jasmine `*.spec.ts` o Jest), lint (`ng lint` / `@angular-eslint`) e build (`ng build`) — catturati alla lettera.
- Se l'applicazione usa NgModule o l'API dei component standalone, e le convenzioni di routing e DI.
- Skill adatte allo stack: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Note

Utile per applicazioni Angular che seguono il layout dei progetti CLI. Verificare Karma/Jasmine vs Jest dalla configurazione presente.
