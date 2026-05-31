---
title: Vue + Vite
description: "Un preset de incorporación para proyectos Vue + Vite, con pistas de razonamiento para componentes de un solo archivo, la Composition API, stores de Pinia, el router y las pruebas de componentes con Vitest."
kind: preset
lang: es
order: 2
stack: Vue + Vite
---

# Preset de Vue + Vite

Una guía de razonamiento que el flujo de onboard usa para proyectos Vue + Vite. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `vite.config.*` y `vue` en las dependencias (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Gestor de paquetes inferido del lockfile que existe.

## Qué razonar

- Los scripts reales de lint, verificación de tipos (`vue-tsc --noEmit`), prueba (Vitest/Jest) y compilación — capturados al pie de la letra.
- La convención de pruebas (`*.spec.ts` / `*.test.ts`) y los patrones de `@vue/test-utils`.
- Skills adaptadas: `component`, `store-module`, `composable`, `view`/`route`.

## Notas

Si en las dependencias está `react` en vez de `vue`, reutiliza el mismo razonamiento con skills con forma de React.
