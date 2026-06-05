---
title: Angular
description: "Ein Onboarding-Preset für Angular-Projekte mit Reasoning-Hinweisen zu Komponenten, Modulen oder Standalone-APIs, Services, RxJS und dem Test-Runner."
kind: preset
lang: de
order: 15
stack: Angular
---

# Angular-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Angular-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `angular.json` und `@angular/core` in den Abhängigkeiten; `src/app/` mit `@Component`/`@NgModule` oder Standalone-Komponenten.
- Services mit `@Injectable`, RxJS-Observables und Dependency Injection.
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet.

## Worüber nachzudenken ist

- Die echten Test- (`ng test` / Karma+Jasmine `*.spec.ts` oder Jest), Lint- (`ng lint` / `@angular-eslint`) und Build-Befehle (`ng build`) — wortwörtlich erfasst.
- Ob die App NgModules oder die Standalone-Components-API verwendet, sowie die Routing- und DI-Konventionen.
- Stack-passende Skills: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Hinweise

Geeignet für Angular-Apps, die das CLI-Projektlayout verwenden. Karma/Jasmine vs. Jest aus der vorhandenen Konfiguration bestätigen.
