---
title: Flutter
description: "Пресет онбордингу для Flutter та Dart-проєктів із підказками для віджетів, аналізатора, керування станом, генерації коду та flutter test."
kind: preset
lang: uk
order: 17
stack: Flutter (Dart)
---

# Пресет Flutter

Орієнтир для міркувань, який процес онбордингу використовує для Flutter та Dart-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `pubspec.yaml` із залежністю `flutter` та `lib/main.dart` із точкою входу `runApp`/`MaterialApp`.
- Віджети (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` і `test/` з `flutter test`.
- Керування станом (Provider, Riverpod або Bloc) і генерація коду (`build_runner`, `json_serializable`) за наявності.

## Про що міркувати

- Справжні команди тестування (`flutter test`), аналізу (`flutter analyze`), форматування (`dart format`) і збірки (`flutter build <target>`) — зафіксувати дослівно.
- Підхід до керування станом і конвенції папок віджетів/функцій у `lib/`.
- Чи використовується генерація коду (`dart run build_runner build`) і які цілі існують.

## Примітки

Підтвердити бібліотеку керування станом і будь-який крок `build_runner` із `pubspec.yaml` — обидва впливають на згенеровані скіли.
