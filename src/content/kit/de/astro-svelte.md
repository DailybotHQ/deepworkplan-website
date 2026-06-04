---
title: Astro / Svelte
description: "Ein Onboarding-Preset für Astro-Sites, optional mit Svelte-Islands, mit Reasoning-Hinweisen für Content Collections, Schema-Validierung und Island-Hydration."
kind: preset
lang: de
order: 3
stack: Astro / Svelte
---

# Astro / Svelte Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Astro-Sites nutzt, optional mit Svelte-Islands. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `astro.config.*`; optional `@astrojs/svelte` und `.svelte`-Komponenten.
- Content Collections unter `src/content/` mit Zod-Schemas.

## Worüber nachzudenken ist

- Die echten Lint-, Type-Check- (`astro check`), Test- und Build-Skripte — wortwörtlich erfasst.
- Die Content-Collection-Schemas und die Island-Hydration-Konventionen (`client:visible` statt `client:load`).
- Stack-passende Skills für Komponenten, Seiten und Content-Einträge.

## Hinweise

Nützlich für content-getriebene Sites, die Astros Island-Architektur mit selektiver Interaktivität nutzen.
