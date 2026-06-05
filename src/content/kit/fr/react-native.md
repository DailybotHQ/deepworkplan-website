---
title: React Native
description: "Un preset d'onboarding pour les projets React Native et Expo, avec des indices de raisonnement sur la navigation, la configuration native, le test runner et bare vs managed."
kind: preset
lang: fr
order: 16
stack: React Native (Expo)
---

# Preset React Native

Un guide de raisonnement que le flux d'onboarding utilise pour les projets React Native et Expo. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `react-native` dans les dépendances ; `app.json`/`app.config.ts` et `expo` pour les projets managed, ou les dossiers `ios/`+`android/` pour RN bare.
- `metro.config.*`, React Navigation ou `expo-router` (un répertoire `app/`), et une configuration Jest.
- Le gestionnaire de paquets est déduit depuis le lockfile présent.

## Sur quoi raisonner

- S'il s'agit d'Expo managed ou de React Native bare — cela détermine les commandes de build et d'exécution.
- Les commandes réelles de test (`jest` + `@testing-library/react-native`), de lint (`eslint`) et d'exécution/build (`expo start`, `eas build` ou `npx react-native run-*`) — capturées verbatim.
- Le style de navigation (React Navigation vs `expo-router`) et les conventions d'écrans et de composants.

## Notes

Détecter RN bare vs Expo managed tôt ; la séparation natif/managed change presque chaque commande.
