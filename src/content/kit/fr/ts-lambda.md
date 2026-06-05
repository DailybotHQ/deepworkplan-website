---
title: TypeScript Lambda
description: "Un preset d'onboarding pour les projets Lambda TypeScript serverless, avec des indices de raisonnement sur les handlers, la toolchain Serverless/SAM/CDK et le moindre privilège IAM."
kind: preset
lang: fr
order: 22
stack: TS Lambda (Serverless)
---

# Preset TypeScript Lambda

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Lambda TypeScript serverless. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- Un descripteur de déploiement : `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) ou `cdk.json` (AWS CDK), aux côtés de `tsconfig.json`.
- Des fonctions handlers exportant `handler`, souvent sous `src/functions/` ou `src/handlers/`, avec un point d'entrée par fonction.

## Sur quoi raisonner

- La vraie porte : lint (`eslint`), vérification de types (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc) et synth/package (`sls package`, `sam build`, `cdk synth`) — capturés verbatim.
- La structure par fonction, les sources d'événements (API Gateway, SQS, EventBridge), et le budget de cold-start/taille de bundle.
- La portée IAM — moindre privilège par fonction — et l'endroit où vivent les secrets et la configuration (SSM, Secrets Manager, env).

## Notes

Mettre l'accent sur le moindre privilège IAM dans les docs SECURITY. Synth/package est la porte sûre ; deploy modifie le compte et ne doit pas s'exécuter comme validation.
