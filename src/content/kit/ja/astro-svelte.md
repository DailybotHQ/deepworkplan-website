---
title: Astro / Svelte
description: "Astro サイト（任意で Svelte アイランドを伴う）向けのオンボーディングプリセット。コンテンツコレクション、スキーマ検証、アイランドのハイドレーションについての推論の手がかりを備える。"
kind: preset
lang: ja
order: 3
stack: Astro / Svelte
---

# Astro / Svelte プリセット

onboard フローが Astro サイト（任意で Svelte アイランドを伴う）に用いる推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## 手がかり

- `astro.config.*`。任意で `@astrojs/svelte` と `.svelte` コンポーネント。
- Zod スキーマを伴う `src/content/` 配下のコンテンツコレクション。

## 推論すべきこと

- 実際のリント、型チェック（`astro check`）、テスト、ビルドのスクリプト。原文どおりに捕捉する。
- コンテンツコレクションのスキーマと、アイランドのハイドレーション規約（`client:load` よりも `client:visible`）。
- コンポーネント、ページ、コンテンツエントリのための、スタックに合ったスキル。

## 補足

選択的なインタラクティブ性を伴う Astro のアイランドアーキテクチャを用いる、コンテンツ駆動のサイトに有用です。
