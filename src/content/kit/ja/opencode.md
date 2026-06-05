---
title: OpenCode
description: "オープンソースエージェント OpenCode 向けの DWP アダプター。ネイティブの AGENTS.md と Markdown のコマンド手順を通じた完全なサポートを備え、ハッシュプレフィックスで呼び出します。"
kind: adapter
lang: ja
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode アダプター

オープンソースのコーディングエージェント OpenCode は、ネイティブの AGENTS.md と Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全** — OpenCode は AGENTS.md をネイティブに読み込み、すべての dwp-* コマンドをその手順ファイルから実行します。

## インストール

DWP は AGENTS.md とコマンド手順をリポジトリに配置します。OpenCode はそれらをプロジェクトのコンテキストとして発見します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

OpenCode は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
