---
title: Angular
description: "Un preset d'onboarding pour les projets Angular, avec des indices de raisonnement sur les composants, les modules ou APIs standalone, les services, RxJS et le test runner."
kind: preset
lang: fr
order: 15
stack: Angular
---

# Preset Angular

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Angular. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `angular.json` et `@angular/core` dans les dépendances ; `src/app/` avec `@Component`/`@NgModule` ou des composants standalone.
- Des services avec `@Injectable`, des observables RxJS et l'injection de dépendances.
- Le gestionnaire de paquets est déduit depuis le lockfile présent.

## Sur quoi raisonner

- Les commandes réelles de test (`ng test` / Karma+Jasmine `*.spec.ts` ou Jest), de lint (`ng lint` / `@angular-eslint`) et de build (`ng build`) — capturées verbatim.
- Si l'application utilise NgModules ou l'API de composants standalone, et les conventions de routage et d'injection de dépendances.
- Les skills adaptés à la stack : `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Notes

Utile pour les applications Angular suivant la structure de projet CLI. Confirmer Karma/Jasmine vs Jest depuis la configuration présente.
