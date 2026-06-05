---
title: React Native
description: "Пресет онбордингу для React Native та Expo-проєктів із підказками для навігації, нативної конфігурації, тест-раннера та bare vs managed."
kind: preset
lang: uk
order: 16
stack: React Native (Expo)
---

# Пресет React Native

Орієнтир для міркувань, який процес онбордингу використовує для React Native та Expo-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `react-native` у залежностях; `app.json`/`app.config.ts` і `expo` для керованих проєктів або папки `ios/`+`android/` для bare RN.
- `metro.config.*`, React Navigation або `expo-router` (каталог `app/`) та налаштування Jest.
- Менеджер пакетів виводиться з наявного lockfile.

## Про що міркувати

- Чи це Expo managed або bare React Native — від цього залежать команди збірки та запуску.
- Справжні команди тестування (`jest` + `@testing-library/react-native`), лінтингу (`eslint`) і запуску/збірки (`expo start`, `eas build` або `npx react-native run-*`) — зафіксувати дослівно.
- Стиль навігації (React Navigation vs `expo-router`) і конвенції екранів/компонентів.

## Примітки

Визначити bare RN vs Expo managed якомога раніше — розподіл нативне/кероване змінює майже кожну команду.
