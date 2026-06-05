---
title: React Native
description: "React Native और Expo प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें navigation, native config, test runner और bare बनाम managed के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 16
stack: React Native (Expo)
---

# React Native preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह React Native और Expo प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- Dependencies में `react-native`; managed प्रोजेक्ट के लिए `app.json`/`app.config.ts` और `expo`, या bare RN के लिए `ios/`+`android/` फ़ोल्डर।
- `metro.config.*`, React Navigation या `expo-router` (एक `app/` डायरेक्टरी), और एक Jest setup।
- Package manager को मौजूद lockfile से अनुमानित किया जाता है।

## किस बारे में तर्क करें

- क्या यह Expo managed है या bare React Native — इससे build और run कमांड तय होते हैं।
- वास्तविक test (`jest` + `@testing-library/react-native`), lint (`eslint`), और run/build (`expo start`, `eas build`, या `npx react-native run-*`) कमांड — हूबहू दर्ज किए गए।
- Navigation style (React Navigation बनाम `expo-router`) और screen/component परिपाटियाँ।

## टिप्पणियाँ

Bare RN बनाम Expo managed जल्दी पता लगाएं; native-बनाम-managed विभाजन लगभग हर कमांड बदल देता है।
