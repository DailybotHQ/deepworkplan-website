---
title: React Native
description: "Preset onboarding untuk proyek React Native dan Expo, dengan petunjuk penalaran untuk navigasi, konfigurasi native, test runner, serta bare vs managed."
kind: preset
lang: id
order: 16
stack: React Native (Expo)
---

# Preset React Native

Panduan penalaran yang dipakai alur onboard untuk proyek React Native dan Expo. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `react-native` di dependensi; `app.json`/`app.config.ts` dan `expo` untuk proyek managed, atau folder `ios/`+`android/` untuk bare RN.
- `metro.config.*`, React Navigation atau `expo-router` (direktori `app/`), dan pengaturan Jest.
- Package manager disimpulkan dari lockfile yang ada.

## Yang perlu dipertimbangkan

- Apakah ini Expo managed atau bare React Native — menentukan command build dan run.
- Command test (`jest` + `@testing-library/react-native`), lint (`eslint`), dan run/build (`expo start`, `eas build`, atau `npx react-native run-*`) yang sebenarnya — dicatat apa adanya.
- Gaya navigasi (React Navigation vs `expo-router`) dan konvensi layar/komponen.

## Catatan

Deteksi bare RN vs Expo managed lebih awal; pemisahan native-vs-managed mengubah hampir setiap command.
