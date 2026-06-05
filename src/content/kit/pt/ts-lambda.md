---
title: TypeScript Lambda
description: "Um preset de onboarding para projetos serverless TypeScript Lambda, com pistas de raciocínio para handlers, o toolchain Serverless/SAM/CDK e o princípio do menor privilégio no IAM."
kind: preset
lang: pt
order: 22
stack: TS Lambda (Serverless)
---

# Preset TypeScript Lambda

Um guia de raciocínio que o fluxo de onboarding usa para projetos serverless TypeScript Lambda. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- Um descritor de deploy: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) ou `cdk.json` (AWS CDK), junto a `tsconfig.json`.
- Funções handler exportando `handler`, geralmente em `src/functions/` ou `src/handlers/`, com um entry point por função.

## Sobre o que raciocinar

- O gate real: lint (`eslint`), verificação de tipos (`tsc --noEmit`), teste (Jest/Vitest), bundle (esbuild/tsc) e synth/package (`sls package`, `sam build`, `cdk synth`) — capturados literalmente.
- Estrutura por função, as fontes de evento (API Gateway, SQS, EventBridge) e o orçamento de cold-start/tamanho do bundle.
- Escopo do IAM — menor privilégio por função — e onde ficam segredos e configurações (SSM, Secrets Manager, env).

## Notas

Enfatizar o IAM com menor privilégio nos docs de SECURITY. Synth/package é o gate seguro; deploy altera a conta e não deve ser executado como validação.
