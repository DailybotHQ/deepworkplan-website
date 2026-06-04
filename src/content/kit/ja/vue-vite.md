---
title: Vue + Vite
description: "Vue + Vite プロジェクト向けのオンボーディングプリセット。単一ファイルコンポーネント、Composition API、Pinia ストア、Vitest によるテストについての推論の手がかりを備える。"
kind: preset
lang: ja
order: 2
stack: Vue + Vite
---

# Vue + Vite プリセット

onboard フローが Vue + Vite プロジェクトに用いる推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## 手がかり

- 依存関係に `vite.config.*` と `vue`（Vue 3、`<script setup>`）。
- `@vitejs/plugin-vue`、`vue-tsc`、`vue-router`、`pinia`。
- パッケージマネージャーは、存在するロックファイルから推測する。

## 推論すべきこと

- 実際のリント、型チェック（`vue-tsc --noEmit`）、テスト（Vitest／Jest）、ビルドのスクリプト。原文どおりに捕捉する。
- テスト規約（`*.spec.ts` / `*.test.ts`）と `@vue/test-utils` のパターン。
- スタックに合ったスキル。`component`、`store-module`、`composable`、`view`/`route`。

## 補足

依存関係に `vue` ではなく `react` がある場合は、同じ推論を React の形のスキルで再利用します。
