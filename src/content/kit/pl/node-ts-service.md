---
title: Node / TS service
description: "Preset onboardingowy dla usług Node i TypeScript oraz API serverless, z wskazówkami do rozumowania o cyklu życia żądania, integracjach i testach."
kind: preset
lang: pl
order: 4
stack: Node / TS service
---

# Preset Node / TS service

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla usług Node/TypeScript i API serverless. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `tsconfig.json` wraz z frameworkiem serwerowym (`express`, `fastify`, `@nestjs/*`) lub handlerami serverless (`serverless.yml`, `template.yaml`, katalog `functions/`).
- Menedżer pakietów wywnioskowany z istniejącego pliku lock.

## O czym należy rozumować

- Rzeczywiste skrypty lint, sprawdzania typów (`tsc --noEmit`), testów (Jest/Vitest) i builda — zapisane dosłownie.
- Czy jest to długo działająca usługa, czy serverless — to kształtuje dokumentację architektury i wydajności.
- Skille odpowiednie dla stacku: `endpoint`/`handler`, `service`, `middleware`, `integration` lub `lambda-fn`.

## Uwagi

Uchwyć cykl życia żądania lub zdarzenia, punkty integracji oraz miejsce przechowywania sekretów i konfiguracji.
