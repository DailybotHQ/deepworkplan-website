---
title: Astro / Svelte
description: "Un preset de incorporación para sitios Astro, opcionalmente con islas Svelte, con pistas de razonamiento para colecciones de contenido, validación de esquema, hidratación de islas y salida de sitio estático."
kind: preset
lang: es
order: 3
stack: Astro / Svelte
---

# Preset de Astro / Svelte

Una guía de razonamiento que el flujo de onboard usa para sitios Astro, opcionalmente con islas Svelte. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `astro.config.*`; opcionalmente `@astrojs/svelte` y componentes `.svelte`.
- Colecciones de contenido bajo `src/content/` con esquemas Zod.

## Qué razonar

- Los scripts reales de lint, verificación de tipos (`astro check`), prueba y compilación — capturados al pie de la letra.
- Los esquemas de colecciones de contenido y las convenciones de hidratación de islas (`client:visible` sobre `client:load`).
- Skills adaptadas para componentes, páginas y entradas de contenido.

## Notas

Útil para sitios orientados a contenido que usan la arquitectura de islas de Astro con interactividad selectiva.
