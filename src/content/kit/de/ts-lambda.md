---
title: TypeScript Lambda
description: "Ein Onboarding-Preset für serverlose TypeScript-Lambda-Projekte mit Reasoning-Hinweisen zu Handlern, dem Serverless/SAM/CDK-Toolchain und IAM Least Privilege."
kind: preset
lang: de
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript-Lambda-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für serverlose TypeScript-Lambda-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- Ein Deploy-Deskriptor: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) oder `cdk.json` (AWS CDK), neben einer `tsconfig.json`.
- Handler-Funktionen, die `handler` exportieren, oft unter `src/functions/` oder `src/handlers/`, mit einem Einstiegspunkt je Funktion.

## Worüber nachzudenken ist

- Das echte Gate: Lint (`eslint`), Type-Check (`tsc --noEmit`), Test (Jest/Vitest), Bundle (esbuild/tsc) und Synth/Package (`sls package`, `sam build`, `cdk synth`) — wortwörtlich erfasst.
- Pro-Funktion-Struktur, die Event-Quellen (API Gateway, SQS, EventBridge) und das Budget für Cold-Start/Bundle-Größe.
- IAM-Scope — Least Privilege je Funktion — und der Ort von Geheimnissen und Konfiguration (SSM, Secrets Manager, env).

## Hinweise

Least-Privilege-IAM in SECURITY-Dokumenten betonen. Synth/Package ist das sichere Gate; Deploy verändert den Account und darf nicht als Validierung ausgeführt werden.
