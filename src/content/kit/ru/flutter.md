---
title: Flutter
description: "Пресет онбординга для проектов Flutter и Dart с подсказками для рассуждений о виджетах, анализаторе, управлении состоянием, генерации кода и flutter test."
kind: preset
lang: ru
order: 17
stack: Flutter (Dart)
---

# Пресет Flutter

Руководство-рассуждение, которое процесс onboard использует для проектов Flutter и Dart. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `pubspec.yaml` с зависимостью `flutter` и `lib/main.dart` с точкой входа `runApp`/`MaterialApp`.
- Виджеты (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` и `test/` с `flutter test`.
- Управление состоянием (Provider, Riverpod или Bloc) и генерация кода (`build_runner`, `json_serializable`), если используются.

## О чём рассуждать

- Реальные команды тестирования (`flutter test`), анализа (`flutter analyze`), форматирования (`dart format`) и сборки (`flutter build <target>`) — захваченные дословно.
- Применяемый подход к управлению состоянием и соглашения о виджетах и структуре папок в `lib/`.
- Используется ли генерация кода (`dart run build_runner build`) и какие таргеты существуют.

## Примечания

Определить библиотеку управления состоянием и шаг `build_runner` из `pubspec.yaml` — оба влияют на генерируемые навыки.
