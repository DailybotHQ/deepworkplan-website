---
title: Cline
description: "オープンソースエージェント Cline 向けの DWP アダプター。Markdown ルールとコマンド手順を通じた完全なサポートを備え、ハッシュコマンドプレフィックスで呼び出します。"
kind: adapter
lang: ja
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline アダプター

オープンソースのコーディングエージェント Cline は、Markdown ルールとコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全** — Cline は Markdown ルールを読み込み、すべての dwp-* コマンドをその手順ファイルから実行します。

## インストール

DWP コマンドは、エージェントが Cline のルールを通じて読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Cline は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
