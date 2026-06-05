---
title: TypeScript Lambda
description: "Preset onboardingowy dla bezserwerowych projektów TypeScript Lambda, ze wskazówkami do rozumowania o handlerach, łańcuchu Serverless/SAM/CDK i zasadzie najmniejszych uprawnień IAM."
kind: preset
lang: pl
order: 22
stack: TS Lambda (Serverless)
---

# Preset TypeScript Lambda

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla bezserwerowych projektów TypeScript Lambda. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- Deskryptor wdrożenia: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) lub `cdk.json` (AWS CDK), obok `tsconfig.json`.
- Funkcje handlera eksportujące `handler`, często pod `src/functions/` lub `src/handlers/`, z jednym punktem wejścia na funkcję.

## O czym należy rozumować

- Rzeczywista bramka: lint (`eslint`), type-check (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc) i synth/package (`sls package`, `sam build`, `cdk synth`) — zapisane dosłownie.
- Struktura poszczególnych funkcji, źródła zdarzeń (API Gateway, SQS, EventBridge) oraz budżet czasu zimnego startu i rozmiaru pakietu.
- Zakres IAM — najmniejsze uprawnienia na funkcję — oraz miejsce przechowywania sekretów i konfiguracji (SSM, Secrets Manager, env).

## Uwagi

W dokumentacji SECURITY kładź nacisk na IAM z zasadą najmniejszych uprawnień. Synth/package to bezpieczna bramka; deploy mutuje konto i nie może być uruchamiany jako walidacja.
