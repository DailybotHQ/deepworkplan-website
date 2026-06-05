---
title: Flutter
description: "Flutter और Dart प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें widgets, analyzer, state management, code generation और flutter test के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 17
stack: Flutter (Dart)
---

# Flutter preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह Flutter और Dart प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `flutter` dependency के साथ `pubspec.yaml` और `runApp`/`MaterialApp` entry के साथ `lib/main.dart`।
- Widgets (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml`, और `flutter test` के साथ `test/`।
- यदि मौजूद हो तो State management (Provider, Riverpod, या Bloc) और code generation (`build_runner`, `json_serializable`)।

## किस बारे में तर्क करें

- वास्तविक test (`flutter test`), analyze (`flutter analyze`), format (`dart format`), और build (`flutter build <target>`) कमांड — हूबहू दर्ज किए गए।
- उपयोग में आने वाला state-management तरीका और `lib/` के अंतर्गत widget/feature फ़ोल्डर परिपाटियाँ।
- क्या code generation उपयोग में है (`dart run build_runner build`) और कौन-से targets मौजूद हैं।

## टिप्पणियाँ

`pubspec.yaml` से state-management library और कोई भी `build_runner` चरण की पुष्टि करें; दोनों उत्पन्न skills को आकार देते हैं।
