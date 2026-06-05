---
title: React Native
description: "Пресет онбординга для проектов React Native и Expo с подсказками для рассуждений о навигации, нативной конфигурации, тест-раннере и bare vs managed."
kind: preset
lang: ru
order: 16
stack: React Native (Expo)
---

# Пресет React Native

Руководство-рассуждение, которое процесс onboard использует для проектов React Native и Expo. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `react-native` в зависимостях; `app.json`/`app.config.ts` и `expo` для managed-проектов или папки `ios/`+`android/` для bare RN.
- `metro.config.*`, React Navigation или `expo-router` (директория `app/`) и настройка Jest.
- Менеджер пакетов определяется из существующего lockfile.

## О чём рассуждать

- Expo managed или bare React Native — это определяет команды сборки и запуска.
- Реальные команды тестирования (`jest` + `@testing-library/react-native`), линтинга (`eslint`) и запуска/сборки (`expo start`, `eas build` или `npx react-native run-*`) — захваченные дословно.
- Стиль навигации (React Navigation или `expo-router`) и соглашения для экранов и компонентов.

## Примечания

Определить bare RN или Expo managed как можно раньше: разделение нативного и managed меняет практически каждую команду.
