---
title: Next.js
description: "Next.js プロジェクト向けのオンボーディングプリセット。App Router と Pages Router の違い、サーバーコンポーネントとクライアントコンポーネント、ルートハンドラー、テストに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 12
stack: Next.js (React)
---

# Next.js プリセット

onboard フローが Next.js プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `package.json` に `next` と `react`、さらに `next.config.js`／`next.config.mjs`／`next.config.ts`。
- `app/`（App Router、サーバー／クライアントコンポーネント、ルートハンドラー）または `pages/`（Pages Router、API ルート）— どちらが使われているかを検出する。
- パッケージマネージャーは、存在するロックファイル（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）から推論する。

## 推論すべきこと

- 実際のリント（`next/core-web-vitals` を用いた `eslint`）、テスト（Jest／Vitest、さらに Playwright／Cypress の e2e）、ビルド（`next build`）スクリプトを原文どおりに捕捉する。
- ルーターモデル（App Router か Pages Router か）、サーバーコンポーネントとクライアントコンポーネントの分割、データフェッチとルートハンドラーの置き場所。
- スタック別スキル：`page`／`route`、`server-component`、`route-handler`、`component`。

## 補足

スキルを生成する前にルーターを検出する。App Router と Pages Router はファイルの規約とデータフェッチのモデルが異なる。
