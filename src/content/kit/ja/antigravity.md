---
title: Antigravity
description: "Antigravity 向けの DWP アダプター。逐次的なワークフローを駆動する Markdown のコマンド手順とハッシュプレフィックスを通じた部分的なサポートを備える。"
kind: adapter
lang: ja
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Antigravity アダプター

Antigravity は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**部分的** — 中核となるコマンドは手順ファイルを通じて機能します。

## インストール

DWP コマンドは、エージェントが呼び出し時に読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Antigravity は手順ファイルを読み、逐次的な DWP ワークフローを実行します。
