---
title: Astro / Svelte
description: "Un preset di onboarding per siti Astro, facoltativamente con island Svelte, con spunti di ragionamento per content collection, validazione degli schemi e idratazione delle island."
kind: preset
lang: it
order: 3
stack: Astro / Svelte
---

# Preset Astro / Svelte

Una guida di ragionamento che il flusso di onboard usa per i siti Astro, facoltativamente con island Svelte. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `astro.config.*`; facoltativamente `@astrojs/svelte` e componenti `.svelte`.
- Content Collection sotto `src/content/` con schemi Zod.

## Su cosa ragionare

- Gli script reali di lint, type-check (`astro check`), test e build — catturati alla lettera.
- Gli schemi delle content collection e le convenzioni di idratazione delle island (`client:visible` invece di `client:load`).
- Skill adatte allo stack per componenti, pagine e voci di contenuto.

## Note

Utile per siti guidati dai contenuti che usano l’architettura a island di Astro con interattività selettiva.
