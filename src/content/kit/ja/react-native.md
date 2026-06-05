---
title: React Native
description: "React Native および Expo プロジェクト向けのオンボーディングプリセット。ナビゲーション、ネイティブ設定、テストランナー、ベアと管理下の違いに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 16
stack: React Native (Expo)
---

# React Native プリセット

onboard フローが React Native および Expo プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- 依存関係に `react-native`。管理下プロジェクトには `app.json`／`app.config.ts` と `expo`、ベア RN には `ios/`＋`android/` フォルダ。
- `metro.config.*`、React Navigation または `expo-router`（`app/` ディレクトリ）、および Jest セットアップ。
- パッケージマネージャーは、存在するロックファイルから推論する。

## 推論すべきこと

- Expo 管理下かベア React Native かを判断する。ビルドと実行のコマンドが変わるため重要。
- 実際のテスト（`jest` ＋ `@testing-library/react-native`）、リント（`eslint`）、実行／ビルド（`expo start`、`eas build`、または `npx react-native run-*`）コマンドを原文どおりに捕捉する。
- ナビゲーションのスタイル（React Navigation か `expo-router` か）とスクリーン／コンポーネントの規約。

## 補足

ベア RN か Expo 管理下かを早期に検出する。ネイティブ側か管理側かの分岐がほぼすべてのコマンドを変えるため。
