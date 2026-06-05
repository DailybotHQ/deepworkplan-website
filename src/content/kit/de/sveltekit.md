---
title: SvelteKit
description: "Ein Onboarding-Preset für SvelteKit-Projekte mit Reasoning-Hinweisen zu Routen, Load-Funktionen, Server-Endpunkten, dem gewählten Adapter und Testing."
kind: preset
lang: de
order: 13
stack: SvelteKit
---

# SvelteKit-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für SvelteKit-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `svelte.config.js` und eine `vite.config.*` mit `@sveltejs/kit` in den Abhängigkeiten.
- `src/routes/` mit `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte` und `+server.ts`-Endpunkten.
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Worüber nachzudenken ist

- Die echten Lint- (`eslint`), Type-Check- (`svelte-check`), Test- (Vitest plus Playwright e2e) und Build-Skripte (`vite build`) — wortwörtlich erfasst.
- Das Routing- und `load`-Modell (Server- vs. universelle Loads), Form-Actions und `+server.ts`-API-Endpunkte; der konfigurierte Adapter.
- Stack-passende Skills: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Hinweise

Den konfigurierten Adapter notieren (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — er prägt das Build- und Deployment-Bild.
