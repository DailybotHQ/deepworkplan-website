---
title: Flutter
description: "An onboarding preset for Flutter and Dart projects, with reasoning cues for widgets, the analyzer, state management, code generation, and flutter test."
kind: preset
lang: en
order: 17
stack: Flutter (Dart)
---

# Flutter preset

A reasoning guide the onboard flow uses for Flutter and Dart projects. It is a checklist, not a template — detected reality wins.

## Signals

- `pubspec.yaml` with a `flutter` dependency and `lib/main.dart` with a `runApp`/`MaterialApp` entry.
- Widgets (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml`, and `test/` with `flutter test`.
- State management (Provider, Riverpod, or Bloc) and code generation (`build_runner`, `json_serializable`) if present.

## What to reason about

- The real test (`flutter test`), analyze (`flutter analyze`), format (`dart format`), and build (`flutter build <target>`) commands — captured verbatim.
- The state-management approach in use and the widget/feature folder conventions under `lib/`.
- Whether code generation is used (`dart run build_runner build`) and which targets exist.

## Notes

Confirm the state-management library and any `build_runner` step from `pubspec.yaml`; both shape the generated skills.
