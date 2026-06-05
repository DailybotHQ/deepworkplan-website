---
title: Flutter
description: "Un preset d'onboarding pour les projets Flutter et Dart, avec des indices de raisonnement sur les widgets, l'analyseur, la gestion d'état, la génération de code et flutter test."
kind: preset
lang: fr
order: 17
stack: Flutter (Dart)
---

# Preset Flutter

Un guide de raisonnement que le flux d'onboarding utilise pour les projets Flutter et Dart. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `pubspec.yaml` avec une dépendance `flutter` et `lib/main.dart` avec un point d'entrée `runApp`/`MaterialApp`.
- Des widgets (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` et `test/` avec `flutter test`.
- La gestion d'état (Provider, Riverpod ou Bloc) et la génération de code (`build_runner`, `json_serializable`) si présentes.

## Sur quoi raisonner

- Les commandes réelles de test (`flutter test`), d'analyse (`flutter analyze`), de formatage (`dart format`) et de build (`flutter build <target>`) — capturées verbatim.
- L'approche de gestion d'état utilisée et les conventions de dossiers widgets/fonctionnalités sous `lib/`.
- Si la génération de code est utilisée (`dart run build_runner build`) et quelles cibles existent.

## Notes

Confirmer la bibliothèque de gestion d'état et toute étape `build_runner` depuis `pubspec.yaml` ; les deux influencent les skills générés.
