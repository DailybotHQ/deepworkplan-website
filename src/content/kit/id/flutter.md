---
title: Flutter
description: "Preset onboarding untuk proyek Flutter dan Dart, dengan petunjuk penalaran untuk widget, analyzer, manajemen state, code generation, dan flutter test."
kind: preset
lang: id
order: 17
stack: Flutter (Dart)
---

# Preset Flutter

Panduan penalaran yang dipakai alur onboard untuk proyek Flutter dan Dart. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `pubspec.yaml` dengan dependensi `flutter` dan `lib/main.dart` berisi `runApp`/`MaterialApp` sebagai titik masuk.
- Widget (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml`, dan `test/` dengan `flutter test`.
- Manajemen state (Provider, Riverpod, atau Bloc) dan code generation (`build_runner`, `json_serializable`) jika ada.

## Yang perlu dipertimbangkan

- Command test (`flutter test`), analyze (`flutter analyze`), format (`dart format`), dan build (`flutter build <target>`) yang sebenarnya — dicatat apa adanya.
- Pendekatan manajemen state yang digunakan dan konvensi widget/folder fitur di bawah `lib/`.
- Apakah code generation digunakan (`dart run build_runner build`) dan target apa yang ada.

## Catatan

Konfirmasi library manajemen state dan langkah `build_runner` apa pun dari `pubspec.yaml`; keduanya membentuk skill yang dihasilkan.
