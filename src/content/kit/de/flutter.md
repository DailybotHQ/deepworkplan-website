---
title: Flutter
description: "Ein Onboarding-Preset für Flutter- und Dart-Projekte mit Reasoning-Hinweisen zu Widgets, dem Analyzer, State-Management, Code-Generierung und flutter test."
kind: preset
lang: de
order: 17
stack: Flutter (Dart)
---

# Flutter-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Flutter- und Dart-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `pubspec.yaml` mit einer `flutter`-Abhängigkeit und `lib/main.dart` mit einem `runApp`/`MaterialApp`-Einstiegspunkt.
- Widgets (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` und `test/` mit `flutter test`.
- State-Management (Provider, Riverpod oder Bloc) und Code-Generierung (`build_runner`, `json_serializable`), falls vorhanden.

## Worüber nachzudenken ist

- Die echten Test- (`flutter test`), Analyze- (`flutter analyze`), Format- (`dart format`) und Build-Befehle (`flutter build <target>`) — wortwörtlich erfasst.
- Der im Einsatz befindliche State-Management-Ansatz und die Widget/Feature-Ordnerkonventionen unter `lib/`.
- Ob Code-Generierung verwendet wird (`dart run build_runner build`) und welche Targets existieren.

## Hinweise

Die State-Management-Bibliothek und etwaige `build_runner`-Schritte aus `pubspec.yaml` bestätigen; beides prägt die generierten Skills.
