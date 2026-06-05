---
title: Nuxt
description: "Nuxt プロジェクト向けのオンボーディングプリセット。ページ、サーバー API ルート、コンポーザブル、Nitro サーバーエンジン、テストに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 14
stack: Nuxt (Vue)
---

# Nuxt プリセット

onboard フローが Nuxt プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `nuxt.config.ts` と依存関係の `nuxt`、エントリーポイントとしての `app.vue`。
- `pages/`（ファイルベースルーティング）、`server/api/`（Nitro エンドポイント）、`composables/`、および自動インポートされる `components/`。
- パッケージマネージャーは、存在するロックファイル（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）から推論する。

## 推論すべきこと

- 実際のリント（`eslint`）、型チェック（`nuxi typecheck`）、テスト（`@nuxt/test-utils` を用いた Vitest）、ビルド（`nuxt build`）スクリプトを原文どおりに捕捉する。
- ルーティングとデータフェッチ（`useFetch`／`useAsyncData`）、Nitro の `server/api/` ルート、コンポーザブル、自動インポートの規約、レンダリングモード（SSR／SSG／SPA）。
- スタック別スキル：`page`／`route`、`server-route`（`server/api`）、`composable`、`component`。

## 補足

コンポーネント・コンポーザブル・ユーティリティの自動インポートは Nuxt の規約であり、明示的なインポートを随所に追加するのではなく、その前提を踏まえて対応する。
