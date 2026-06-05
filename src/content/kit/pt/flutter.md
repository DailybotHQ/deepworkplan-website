---
title: Flutter
description: "Um preset de onboarding para projetos Flutter e Dart, com pistas de raciocínio para widgets, o analyzer, gerenciamento de estado, geração de código e flutter test."
kind: preset
lang: pt
order: 17
stack: Flutter (Dart)
---

# Preset Flutter

Um guia de raciocínio que o fluxo de onboarding usa para projetos Flutter e Dart. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `pubspec.yaml` com uma dependência `flutter` e `lib/main.dart` com um entry point `runApp`/`MaterialApp`.
- Widgets (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` e `test/` com `flutter test`.
- Gerenciamento de estado (Provider, Riverpod ou Bloc) e geração de código (`build_runner`, `json_serializable`) se presentes.

## Sobre o que raciocinar

- Os comandos reais de teste (`flutter test`), análise (`flutter analyze`), formatação (`dart format`) e build (`flutter build <target>`) — capturados literalmente.
- A abordagem de gerenciamento de estado em uso e as convenções de pasta de widgets/features em `lib/`.
- Se a geração de código é usada (`dart run build_runner build`) e quais targets existem.

## Notas

Confirmar a biblioteca de gerenciamento de estado e qualquer etapa com `build_runner` a partir de `pubspec.yaml`; ambas moldam as skills geradas.
