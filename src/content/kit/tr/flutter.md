---
title: Flutter
description: "Flutter ve Dart projeleri için widget'lar, analizör, durum yönetimi, kod üretimi ve flutter test komutuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 17
stack: Flutter (Dart)
---

# Flutter ön ayarı

Onboarding akışının Flutter ve Dart projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `flutter` bağımlılığına sahip `pubspec.yaml` ve `runApp`/`MaterialApp` girişi içeren `lib/main.dart`.
- Widget'lar (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml` ve `flutter test` içeren `test/`.
- Durum yönetimi (Provider, Riverpod veya Bloc) ve kod üretimi (`build_runner`, `json_serializable`) varsa.

## Neyin üzerine akıl yürütülmeli

- Gerçek test (`flutter test`), analiz (`flutter analyze`), biçimleme (`dart format`) ve derleme (`flutter build <target>`) komutları — birebir kaydedilir.
- Kullanılan durum yönetimi yaklaşımı ve `lib/` altındaki widget/özellik klasörü kuralları.
- Kod üretiminin kullanılıp kullanılmadığı (`dart run build_runner build`) ve hangi hedeflerin var olduğu.

## Notlar

Durum yönetimi kütüphanesini ve olası `build_runner` adımını `pubspec.yaml`'dan onaylayın; ikisi de oluşturulan skill'leri şekillendirir.
