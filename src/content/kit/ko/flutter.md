---
title: Flutter
description: "Flutter 및 Dart 프로젝트를 위한 온보딩 프리셋으로, 위젯, 분석기, 상태 관리, 코드 생성, flutter test에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 17
stack: Flutter (Dart)
---

# Flutter 프리셋

onboard 흐름이 Flutter 및 Dart 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `flutter` 의존성이 있는 `pubspec.yaml`과 `runApp`/`MaterialApp` 진입점이 있는 `lib/main.dart`.
- 위젯(`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml`, `flutter test`가 있는 `test/`.
- 상태 관리(Provider, Riverpod, Bloc)와 코드 생성(`build_runner`, `json_serializable`이 있는 경우).

## 추론할 사항

- 실제 테스트(`flutter test`), 분석(`flutter analyze`), 포맷(`dart format`), 빌드(`flutter build <target>`) 명령 — 그대로 포착합니다.
- 사용 중인 상태 관리 방식과 `lib/` 아래의 위젯/기능 폴더 관례.
- 코드 생성 사용 여부(`dart run build_runner build`)와 존재하는 타겟.

## 참고

`pubspec.yaml`에서 상태 관리 라이브러리와 `build_runner` 단계를 확인하세요 — 둘 다 생성되는 스킬에 영향을 줍니다.
