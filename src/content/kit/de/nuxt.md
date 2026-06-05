---
title: Nuxt
description: "Ein Onboarding-Preset für Nuxt-Projekte mit Reasoning-Hinweisen zu Pages, Server-API-Routen, Composables, der Nitro-Server-Engine und Testing."
kind: preset
lang: de
order: 14
stack: Nuxt (Vue)
---

# Nuxt-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Nuxt-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `nuxt.config.ts` und `nuxt` in den Abhängigkeiten sowie ein `app.vue`-Einstiegspunkt.
- `pages/` (dateibasiertes Routing), `server/api/` (Nitro-Endpunkte), `composables/` und automatisch importierte `components/`.
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Worüber nachzudenken ist

- Die echten Lint- (`eslint`), Type-Check- (`nuxi typecheck`), Test- (Vitest mit `@nuxt/test-utils`) und Build-Skripte (`nuxt build`) — wortwörtlich erfasst.
- Routing und Datenabruf (`useFetch`/`useAsyncData`), Nitro-`server/api/`-Routen, Composables und Auto-Import-Konventionen; der Rendering-Modus (SSR/SSG/SPA).
- Stack-passende Skills: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Hinweise

Auto-Imports (Komponenten, Composables, Utils) sind eine Nuxt-Konvention — sie berücksichtigen, anstatt überall explizite Imports hinzuzufügen.
