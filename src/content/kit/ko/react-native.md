---
title: React Native
description: "React Native 및 Expo 프로젝트를 위한 온보딩 프리셋으로, 내비게이션, 네이티브 설정, 테스트 러너, bare 대 managed 방식에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 16
stack: React Native (Expo)
---

# React Native 프리셋

onboard 흐름이 React Native 및 Expo 프로젝트에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- 의존성의 `react-native`; managed 프로젝트의 경우 `app.json`/`app.config.ts`와 `expo`, bare RN의 경우 `ios/`+`android/` 폴더.
- `metro.config.*`, React Navigation 또는 `expo-router`(`app/` 디렉터리), Jest 설정.
- 존재하는 락파일에서 패키지 관리자를 추론합니다.

## 추론할 사항

- Expo managed인지 bare React Native인지 여부 — 빌드와 실행 명령을 결정합니다.
- 실제 테스트(`jest` + `@testing-library/react-native`), 린트(`eslint`), 실행/빌드(`expo start`, `eas build`, 또는 `npx react-native run-*`) 명령 — 그대로 포착합니다.
- 내비게이션 방식(React Navigation 대 `expo-router`)과 화면/컴포넌트 관례.

## 참고

bare RN 대 Expo managed를 일찍 감지하세요 — 네이티브 대 managed 분리가 거의 모든 명령을 바꿉니다.
