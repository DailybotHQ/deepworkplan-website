---
title: React Native
description: "Ein Onboarding-Preset für React-Native- und Expo-Projekte mit Reasoning-Hinweisen zu Navigation, nativer Konfiguration, dem Test-Runner und Bare vs. Managed."
kind: preset
lang: de
order: 16
stack: React Native (Expo)
---

# React-Native-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für React-Native- und Expo-Projekte nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `react-native` in den Abhängigkeiten; `app.json`/`app.config.ts` und `expo` für Managed-Projekte, oder `ios/`+`android/`-Ordner für Bare-RN.
- `metro.config.*`, React Navigation oder `expo-router` (ein `app/`-Verzeichnis) sowie ein Jest-Setup.
- Paketmanager wird aus der vorhandenen Lockfile abgeleitet.

## Worüber nachzudenken ist

- Ob es sich um Expo Managed oder Bare React Native handelt — dies bestimmt die Build- und Run-Befehle.
- Der echte Test- (`jest` + `@testing-library/react-native`), Lint- (`eslint`) und Run/Build-Befehl (`expo start`, `eas build` oder `npx react-native run-*`) — wortwörtlich erfasst.
- Navigationsstil (React Navigation vs. `expo-router`) und Screen/Komponenten-Konventionen.

## Hinweise

Bare-RN vs. Expo-Managed frühzeitig erkennen; die native-vs.-managed-Aufteilung ändert nahezu jeden Befehl.
