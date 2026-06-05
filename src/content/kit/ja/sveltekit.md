---
title: SvelteKit
description: "SvelteKit プロジェクト向けのオンボーディングプリセット。ルート、load 関数、サーバーエンドポイント、選択されたアダプター、テストに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 13
stack: SvelteKit
---

# SvelteKit プリセット

onboard フローが SvelteKit プロジェクトに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `svelte.config.js` と `vite.config.*`、依存関係に `@sveltejs/kit`。
- `src/routes/` 配下の `+page.svelte`、`+page.server.ts`／`+page.ts`、`+layout.svelte`、`+server.ts` エンドポイント。
- パッケージマネージャーは、存在するロックファイル（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）から推論する。

## 推論すべきこと

- 実際のリント（`eslint`）、型チェック（`svelte-check`）、テスト（Vitest、さらに Playwright の e2e）、ビルド（`vite build`）スクリプトを原文どおりに捕捉する。
- ルーティングと `load` モデル（サーバーロードとユニバーサルロードの違い）、フォームアクション、`+server.ts` API エンドポイント、設定されたアダプター。
- スタック別スキル：`route`（`+page` + `load`）、`endpoint`（`+server.ts`）、`component`。

## 補足

設定されたアダプター（`adapter-auto`、`-node`、`-static`、Cloudflare、Vercel）に注目する。ビルドとデプロイの構成を左右するため重要です。
