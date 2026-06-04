---
title: Service Node / TS
description: "Un preset d’onboarding pour les services Node et TypeScript et les API serverless, avec des indices de raisonnement pour le cycle de vie des requêtes, les intégrations et les tests."
kind: preset
lang: fr
order: 4
stack: Node / TS service
---

# Preset service Node / TS

Un guide de raisonnement que le flux onboard utilise pour les services Node/TypeScript et les API serverless. C’est une liste de contrôle, pas un modèle — la réalité détectée l’emporte.

## Signaux

- `tsconfig.json` accompagné d’un framework serveur (`express`, `fastify`, `@nestjs/*`) ou de handlers serverless (`serverless.yml`, `template.yaml`, un répertoire `functions/`).
- Gestionnaire de paquets déduit du fichier de verrouillage existant.

## Ce sur quoi raisonner

- Les vrais scripts de lint, de vérification de types (`tsc --noEmit`), de test (Jest/Vitest) et de build — capturés verbatim.
- S’il s’agit d’un service à exécution longue ou serverless — cela façonne la doc d’architecture et de performance.
- Des skills adaptés à la stack : `endpoint`/`handler`, `service`, `middleware`, `integration`, ou `lambda-fn`.

## Notes

Capturez le cycle de vie des requêtes ou des événements, les points d’intégration, et l’endroit où résident les secrets et la configuration.
