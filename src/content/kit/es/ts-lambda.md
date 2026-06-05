---
title: TypeScript Lambda
description: "Preset de incorporación para proyectos serverless TypeScript Lambda, con pistas de razonamiento para handlers, la cadena de herramientas Serverless/SAM/CDK y el principio de mínimo privilegio IAM."
kind: preset
lang: es
order: 22
stack: TS Lambda (Serverless)
---

# Preset TypeScript Lambda

Guía de razonamiento que el flujo de onboard usa para proyectos serverless TypeScript Lambda. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- Un descriptor de despliegue: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) o `cdk.json` (AWS CDK), junto a `tsconfig.json`.
- Funciones handler que exportan `handler`, habitualmente bajo `src/functions/` o `src/handlers/`, con un punto de entrada por función.

## Qué razonar

- La compuerta real: lint (`eslint`), verificación de tipos (`tsc --noEmit`), pruebas (Jest/Vitest), empaquetado (esbuild/tsc) y synth/empaquetado (`sls package`, `sam build`, `cdk synth`) — capturados al pie de la letra.
- Estructura por función, las fuentes de eventos (API Gateway, SQS, EventBridge) y el presupuesto de cold-start/tamaño del bundle.
- Alcance IAM — mínimo privilegio por función — y dónde viven los secretos y la configuración (SSM, Secrets Manager, env).

## Notas

Enfatiza el IAM de mínimo privilegio en los documentos SECURITY. Synth/empaquetado es la compuerta segura; el despliegue muta la cuenta y no debe ejecutarse como validación.
