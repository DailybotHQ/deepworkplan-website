---
title: Node / TS Service
description: "Ein Onboarding-Preset für Node- und TypeScript-Services und Serverless-APIs, mit Reasoning-Hinweisen für den Request-Lebenszyklus, Integrationen und Tests."
kind: preset
lang: de
order: 4
stack: Node / TS service
---

# Node / TS Service Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Node-/TypeScript-Services und Serverless-APIs nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `tsconfig.json` plus ein Server-Framework (`express`, `fastify`, `@nestjs/*`) oder Serverless-Handler (`serverless.yml`, `template.yaml`, ein `functions/`-Verzeichnis).
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet.

## Worüber nachzudenken ist

- Die echten Lint-, Type-Check- (`tsc --noEmit`), Test- (Jest/Vitest) und Build-Skripte — wortwörtlich erfasst.
- Ob es ein dauerhaft laufender Service oder Serverless ist — dies prägt die Architektur- und Performance-Dokumentation.
- Stack-passende Skills: `endpoint`/`handler`, `service`, `middleware`, `integration` oder `lambda-fn`.

## Hinweise

Erfassen Sie den Request- oder Event-Lebenszyklus, die Integrationspunkte und wo Geheimnisse und Konfiguration liegen.
