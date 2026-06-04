---
title: Node / TS service
description: "Un preset di onboarding per servizi Node e TypeScript e API serverless, con spunti di ragionamento per il ciclo di vita della richiesta, le integrazioni e i test."
kind: preset
lang: it
order: 4
stack: Node / TS service
---

# Preset Node / TS service

Una guida di ragionamento che il flusso di onboard usa per servizi Node/TypeScript e API serverless. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `tsconfig.json` più un framework server (`express`, `fastify`, `@nestjs/*`) o handler serverless (`serverless.yml`, `template.yaml`, una directory `functions/`).
- Package manager dedotto dal lockfile esistente.

## Su cosa ragionare

- Gli script reali di lint, type-check (`tsc --noEmit`), test (Jest/Vitest) e build — catturati alla lettera.
- Se si tratta di un servizio long-running o serverless — questo plasma i docs di architettura e prestazioni.
- Skill adatte allo stack: `endpoint`/`handler`, `service`, `middleware`, `integration` o `lambda-fn`.

## Note

Catturi il ciclo di vita della richiesta o dell’evento, i punti di integrazione e dove vivono segreti e configurazione.
