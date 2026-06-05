---
title: React Native
description: "React Native ve Expo projeleri için navigasyon, yerel yapılandırma, test koşucusu ve bare ile managed arasındaki farka yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 16
stack: React Native (Expo)
---

# React Native ön ayarı

Onboarding akışının React Native ve Expo projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- Bağımlılıklarda `react-native`; managed projeler için `app.json`/`app.config.ts` ve `expo`, ya da bare RN için `ios/`+`android/` klasörleri.
- `metro.config.*`, React Navigation veya `expo-router` (bir `app/` dizini) ve bir Jest kurulumu.
- Paket yöneticisi, var olan kilit dosyasından çıkarılır.

## Neyin üzerine akıl yürütülmeli

- Expo managed mi yoksa bare React Native mi olduğu — derleme ve çalıştırma komutlarını belirler.
- Gerçek test (`jest` + `@testing-library/react-native`), lint (`eslint`) ve çalıştırma/derleme (`expo start`, `eas build` veya `npx react-native run-*`) komutları — birebir kaydedilir.
- Navigasyon stili (React Navigation ile `expo-router` arası) ve ekran/bileşen kuralları.

## Notlar

Bare RN ile Expo managed arasındaki farkı erken saptayın; yerel-managed ayrımı neredeyse her komutu değiştirir.
