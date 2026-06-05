---
title: Flutter
description: "Preset di onboarding per progetti Flutter e Dart, con spunti di ragionamento per widget, l'analyzer, la gestione dello stato, la code generation e flutter test."
kind: preset
lang: it
order: 17
stack: Flutter (Dart)
---

# Preset Flutter

Una guida di ragionamento che il flusso di onboard usa per i progetti Flutter e Dart. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `pubspec.yaml` con una dipendenza `flutter` e `lib/main.dart` con un entry point `runApp`/`MaterialApp`.
- Widget (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` e `test/` con `flutter test`.
- Gestione dello stato (Provider, Riverpod o Bloc) e code generation (`build_runner`, `json_serializable`) se presenti.

## Su cosa ragionare

- I comandi reali di test (`flutter test`), analisi (`flutter analyze`), formattazione (`dart format`) e build (`flutter build <target>`) — catturati alla lettera.
- L'approccio di gestione dello stato in uso e le convenzioni di cartelle widget/feature sotto `lib/`.
- Se viene usata la code generation (`dart run build_runner build`) e quali target esistono.

## Note

Verificare la libreria di gestione dello stato e l'eventuale passaggio `build_runner` da `pubspec.yaml`; entrambi condizionano le skill generate.
