---
title: GitHub Copilot
description: "GitHub Copilot 向けの DWP アダプター。AGENTS.md と Markdown のコマンド手順を通じた完全なサポートを備え、ハッシュコマンドプレフィックスで呼び出します。"
kind: adapter
lang: ja
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot アダプター

GitHub Copilot は、AGENTS.md と Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全** — Copilot は AGENTS.md と dwp-* の手順ファイルを読み込み、すべてのコマンドをそれらから実行します。

## インストール

DWP は AGENTS.md とコマンド手順をリポジトリに配置します。Copilot はそれらをリポジトリのコンテキストとして読み込みます。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Copilot は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
