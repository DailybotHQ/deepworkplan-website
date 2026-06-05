---
title: Flutter
description: "Preset onboardingowy dla projektów Flutter i Dart, ze wskazówkami do rozumowania o widgetach, analizatorze, zarządzaniu stanem, generowaniu kodu i flutter test."
kind: preset
lang: pl
order: 17
stack: Flutter (Dart)
---

# Preset Flutter

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Flutter i Dart. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `pubspec.yaml` z zależnością `flutter` oraz `lib/main.dart` z wejściem `runApp`/`MaterialApp`.
- Widgety (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` oraz `test/` z `flutter test`.
- Zarządzanie stanem (Provider, Riverpod lub Bloc) i generowanie kodu (`build_runner`, `json_serializable`), jeśli obecne.

## O czym należy rozumować

- Rzeczywiste polecenia testowe (`flutter test`), analizy (`flutter analyze`), formatowania (`dart format`) i budowania (`flutter build <target>`) — zapisane dosłownie.
- Stosowane podejście do zarządzania stanem i konwencje folderów widgetów/funkcji pod `lib/`.
- Czy generowanie kodu jest używane (`dart run build_runner build`) i jakie cele istnieją.

## Uwagi

Potwierdź bibliotekę zarządzania stanem i wszelkie kroki `build_runner` z `pubspec.yaml`; oba kształtują generowane skille.
