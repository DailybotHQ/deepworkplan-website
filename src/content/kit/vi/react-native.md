---
title: React Native
description: "Preset onboarding cho dự án React Native và Expo, với gợi ý suy luận về navigation, native config, test runner và bare vs managed."
kind: preset
lang: vi
order: 16
stack: React Native (Expo)
---

# React Native preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án React Native và Expo. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `react-native` trong dependencies; `app.json`/`app.config.ts` và `expo` cho dự án managed, hoặc thư mục `ios/`+`android/` cho bare RN.
- `metro.config.*`, React Navigation hoặc `expo-router` (thư mục `app/`), và một cấu hình Jest.
- Package manager được suy luận từ lockfile hiện có.

## Cần suy luận về điều gì

- Liệu đây là Expo managed hay bare React Native — quyết định lệnh build và run.
- Các lệnh test (`jest` + `@testing-library/react-native`), lint (`eslint`) và run/build (`expo start`, `eas build`, hoặc `npx react-native run-*`) thực tế — ghi lại nguyên văn.
- Kiểu navigation (React Navigation vs `expo-router`) và các quy ước screen/component.

## Ghi chú

Phát hiện bare RN vs Expo managed sớm; sự phân chia native-vs-managed ảnh hưởng đến hầu hết mọi lệnh.
