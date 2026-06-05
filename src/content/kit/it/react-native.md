---
title: React Native
description: "Preset di onboarding per progetti React Native ed Expo, con spunti di ragionamento per la navigazione, la config nativa, il test runner e bare vs managed."
kind: preset
lang: it
order: 16
stack: React Native (Expo)
---

# Preset React Native

Una guida di ragionamento che il flusso di onboard usa per i progetti React Native ed Expo. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `react-native` nelle dipendenze; `app.json`/`app.config.ts` e `expo` per i progetti managed, oppure le cartelle `ios/`+`android/` per bare RN.
- `metro.config.*`, React Navigation o `expo-router` (una directory `app/`) e una configurazione Jest.
- Package manager dedotto dal lockfile presente.

## Su cosa ragionare

- Se si tratta di Expo managed o bare React Native — determina i comandi di build e run.
- I comandi reali di test (`jest` + `@testing-library/react-native`), lint (`eslint`) e run/build (`expo start`, `eas build` o `npx react-native run-*`) — catturati alla lettera.
- Stile di navigazione (React Navigation vs `expo-router`) e convenzioni per screen e component.

## Note

Rilevare bare RN vs Expo managed tempestivamente; la distinzione nativo vs managed cambia quasi ogni comando.
