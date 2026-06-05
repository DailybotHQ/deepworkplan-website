---
title: SvelteKit
description: "Preset de incorporación para proyectos SvelteKit, con pistas de razonamiento para rutas, funciones load, endpoints de servidor, el adaptador elegido y las pruebas."
kind: preset
lang: es
order: 13
stack: SvelteKit
---

# Preset SvelteKit

Guía de razonamiento que el flujo de onboard usa para proyectos SvelteKit. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `svelte.config.js` y un `vite.config.*`, con `@sveltejs/kit` en las dependencias.
- `src/routes/` con `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` y endpoints `+server.ts`.
- El gestor de paquetes se infiere del lockfile que exista (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Qué razonar

- Los scripts reales de lint (`eslint`), verificación de tipos (`svelte-check`), pruebas (Vitest, más Playwright e2e) y compilación (`vite build`) — capturados al pie de la letra.
- El modelo de enrutamiento y `load` (cargas de servidor vs universales), form actions y los endpoints de API `+server.ts`; el adaptador configurado.
- Skills adecuadas al stack: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Notas

Anota el adaptador configurado (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — condiciona la historia de compilación y despliegue.
