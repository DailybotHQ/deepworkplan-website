---
title: Flutter
description: "Preset de incorporación para proyectos Flutter y Dart, con pistas de razonamiento para widgets, el analizador, la gestión de estado, la generación de código y flutter test."
kind: preset
lang: es
order: 17
stack: Flutter (Dart)
---

# Preset Flutter

Guía de razonamiento que el flujo de onboard usa para proyectos Flutter y Dart. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `pubspec.yaml` con una dependencia `flutter` y `lib/main.dart` con una entrada `runApp`/`MaterialApp`.
- Widgets (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` y `test/` con `flutter test`.
- Gestión de estado (Provider, Riverpod o Bloc) y generación de código (`build_runner`, `json_serializable`) si están presentes.

## Qué razonar

- Los comandos reales de prueba (`flutter test`), análisis (`flutter analyze`), formato (`dart format`) y compilación (`flutter build <target>`) — capturados al pie de la letra.
- El enfoque de gestión de estado en uso y las convenciones de widgets y carpetas de características bajo `lib/`.
- Si se usa generación de código (`dart run build_runner build`) y qué targets existen.

## Notas

Confirma la biblioteca de gestión de estado y cualquier paso de `build_runner` a partir de `pubspec.yaml`; ambos condicionan las skills generadas.
