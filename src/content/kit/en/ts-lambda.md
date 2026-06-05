---
title: TypeScript Lambda
description: "An onboarding preset for serverless TypeScript Lambda projects, with reasoning cues for handlers, the Serverless/SAM/CDK toolchain, and IAM least privilege."
kind: preset
lang: en
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda preset

A reasoning guide the onboard flow uses for serverless TypeScript Lambda projects. It is a checklist, not a template — detected reality wins.

## Signals

- A deploy descriptor: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM), or `cdk.json` (AWS CDK), alongside `tsconfig.json`.
- Handler functions exporting `handler`, often under `src/functions/` or `src/handlers/`, with one entry point per function.

## What to reason about

- The real gate: lint (`eslint`), type-check (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc), and synth/package (`sls package`, `sam build`, `cdk synth`) — captured verbatim.
- Per-function structure, the event sources (API Gateway, SQS, EventBridge), and the cold-start/bundle-size budget.
- IAM scope — least privilege per function — and where secrets and config live (SSM, Secrets Manager, env).

## Notes

Emphasize least-privilege IAM in SECURITY docs. Synth/package is the safe gate; deploy mutates the account and must not run as validation.
