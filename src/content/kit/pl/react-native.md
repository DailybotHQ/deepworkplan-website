---
title: React Native
description: "Preset onboardingowy dla projektów React Native i Expo, ze wskazówkami do rozumowania o nawigacji, konfiguracji natywnej, narzędziu testowym oraz trybie bare vs managed."
kind: preset
lang: pl
order: 16
stack: React Native (Expo)
---

# Preset React Native

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów React Native i Expo. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `react-native` w zależnościach; `app.json`/`app.config.ts` i `expo` dla projektów managed lub foldery `ios/`+`android/` dla bare RN.
- `metro.config.*`, React Navigation lub `expo-router` (katalog `app/`) oraz konfiguracja Jest.
- Menedżer pakietów wnioskowany z istniejącego pliku blokady.

## O czym należy rozumować

- Czy to Expo managed czy bare React Native — determinuje polecenia budowania i uruchamiania.
- Rzeczywiste polecenia testowe (`jest` + `@testing-library/react-native`), lint (`eslint`) i run/build (`expo start`, `eas build` lub `npx react-native run-*`) — zapisane dosłownie.
- Styl nawigacji (React Navigation vs `expo-router`) i konwencje ekranów/komponentów.

## Uwagi

Wykryj bare RN vs Expo managed wcześnie; podział natywny/managed zmienia niemal każde polecenie.
