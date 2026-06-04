---
title: Serviço Node / TS
description: "Um preset de onboarding para serviços Node e TypeScript e APIs serverless, com pistas de raciocínio para o ciclo de vida da requisição, integrações e testes."
kind: preset
lang: pt
order: 4
stack: Node / TS service
---

# Preset de serviço Node / TS

Um guia de raciocínio que o fluxo de onboarding usa para serviços Node/TypeScript e APIs serverless. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `tsconfig.json` mais um framework de servidor (`express`, `fastify`, `@nestjs/*`) ou handlers serverless (`serverless.yml`, `template.yaml`, um diretório `functions/`).
- Gerenciador de pacotes inferido a partir do lockfile existente.

## Sobre o que raciocinar

- Os scripts reais de lint, verificação de tipos (`tsc --noEmit`), teste (Jest/Vitest) e build — capturados literalmente.
- Se é um serviço de longa duração ou serverless — isso molda os docs de arquitetura e desempenho.
- Skills apropriadas à stack: `endpoint`/`handler`, `service`, `middleware`, `integration` ou `lambda-fn`.

## Notas

Capture o ciclo de vida da requisição ou do evento, os pontos de integração e onde vivem os segredos e a configuração.
