---
title: GitHub Copilot
description: "GitHub Copilot 向けの DWP アダプター。Markdown のコマンド手順とハッシュプレフィックスを通じた部分的なサポートを備える。一部の自動化は手作業で行う。"
kind: adapter
lang: ja
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot アダプター

GitHub Copilot は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**部分的** — 中核となるコマンドは手順ファイルを通じて機能します。一部の自動化は手作業です。

## インストール

DWP コマンドは、リポジトリ内の Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Copilot は手順ファイルを読みますが、自律的な実行は Claude Code より劣ります。
