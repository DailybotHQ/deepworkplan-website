---
title: React Native
description: "面向 React Native 与 Expo 项目的接入预设，包含导航、原生配置、测试运行器以及裸工作流与托管工作流区分的推理提示。"
kind: preset
lang: zh
order: 16
stack: React Native (Expo)
---

# React Native 预设

onboard 流程用于 React Native 与 Expo 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 依赖项中包含 `react-native`；托管项目有 `app.json`/`app.config.ts` 与 `expo`，裸 RN 项目则有 `ios/` 与 `android/` 目录。
- `metro.config.*`、React Navigation 或 `expo-router`（一个 `app/` 目录），以及 Jest 配置。
- 包管理器从已存在的锁文件中推断。

## 需要推理的内容

- 是 Expo 托管工作流还是裸 React Native——这决定了构建与运行命令。
- 真实的测试（`jest` + `@testing-library/react-native`）、代码检查（`eslint`）与运行/构建（`expo start`、`eas build` 或 `npx react-native run-*`）命令——原样捕获。
- 导航方式（React Navigation 还是 `expo-router`）以及屏幕与组件约定。

## 备注

尽早检测是裸 RN 还是 Expo 托管工作流；原生与托管的区分几乎影响每一条命令。
