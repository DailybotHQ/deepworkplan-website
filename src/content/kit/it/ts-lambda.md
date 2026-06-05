---
title: TypeScript Lambda
description: "Preset di onboarding per progetti serverless TypeScript Lambda, con spunti di ragionamento per handler, il toolchain Serverless/SAM/CDK e il principio del minimo privilegio IAM."
kind: preset
lang: it
order: 22
stack: TS Lambda (Serverless)
---

# Preset TypeScript Lambda

Una guida di ragionamento che il flusso di onboard usa per i progetti serverless TypeScript Lambda. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- Un descrittore di deploy: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) o `cdk.json` (AWS CDK), insieme a `tsconfig.json`.
- Funzioni handler che esportano `handler`, spesso sotto `src/functions/` o `src/handlers/`, con un unico entrypoint per funzione.

## Su cosa ragionare

- Il gate reale: lint (`eslint`), type-check (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc) e synth/package (`sls package`, `sam build`, `cdk synth`) — catturati alla lettera.
- Struttura per funzione, le event source (API Gateway, SQS, EventBridge) e il budget per cold start e dimensione del bundle.
- Scope IAM — minimo privilegio per funzione — e dove risiedono segreti e configurazione (SSM, Secrets Manager, env).

## Note

Enfatizzare il minimo privilegio IAM nei documenti SECURITY. Synth/package è il gate sicuro; deploy modifica l'account e non deve essere eseguito come validazione.
