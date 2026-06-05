---
title: Angular
description: "Preset de incorporación para proyectos Angular, con pistas de razonamiento para componentes, módulos o APIs standalone, servicios, RxJS y el test runner."
kind: preset
lang: es
order: 15
stack: Angular
---

# Preset Angular

Guía de razonamiento que el flujo de onboard usa para proyectos Angular. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `angular.json` y `@angular/core` en las dependencias; `src/app/` con `@Component`/`@NgModule` o componentes standalone.
- Servicios con `@Injectable`, observables RxJS e inyección de dependencias.
- El gestor de paquetes se infiere del lockfile que exista.

## Qué razonar

- Los comandos reales de prueba (`ng test` / Karma+Jasmine `*.spec.ts` o Jest), lint (`ng lint` / `@angular-eslint`) y compilación (`ng build`) — capturados al pie de la letra.
- Si la aplicación usa NgModules o la API de componentes standalone, y las convenciones de enrutamiento e inyección de dependencias.
- Skills adecuadas al stack: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Notas

Útil para aplicaciones Angular con la estructura de proyecto de la CLI. Confirma Karma/Jasmine vs Jest a partir de la configuración que exista.
