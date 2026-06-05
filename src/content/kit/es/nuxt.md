---
title: Nuxt
description: "Preset de incorporación para proyectos Nuxt, con pistas de razonamiento para páginas, rutas de API del servidor, composables, el motor Nitro y las pruebas."
kind: preset
lang: es
order: 14
stack: Nuxt (Vue)
---

# Preset Nuxt

Guía de razonamiento que el flujo de onboard usa para proyectos Nuxt. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `nuxt.config.ts` y `nuxt` en las dependencias, con un punto de entrada `app.vue`.
- `pages/` (enrutamiento basado en archivos), `server/api/` (endpoints Nitro), `composables/` y `components/` con auto-importación.
- El gestor de paquetes se infiere del lockfile que exista (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Qué razonar

- Los scripts reales de lint (`eslint`), verificación de tipos (`nuxi typecheck`), pruebas (Vitest con `@nuxt/test-utils`) y compilación (`nuxt build`) — capturados al pie de la letra.
- Enrutamiento y obtención de datos (`useFetch`/`useAsyncData`), rutas Nitro `server/api/`, composables y convenciones de auto-importación; el modo de renderizado (SSR/SSG/SPA).
- Skills adecuadas al stack: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Notas

Las auto-importaciones (components, composables, utils) son una convención de Nuxt — tenlas en cuenta en lugar de añadir imports explícitos en todas partes.
