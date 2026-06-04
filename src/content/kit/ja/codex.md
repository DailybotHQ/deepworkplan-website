---
title: OpenAI Codex
description: "OpenAI Codex 向けの DWP アダプター。Markdown のコマンド手順とハッシュプレフィックスを通じた部分的なサポートを備える。チームエージェント機能は利用できない。"
kind: adapter
lang: ja
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex アダプター

OpenAI Codex は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**部分的** — 中核となるコマンドは機能します。高度な機能（チームエージェント）は利用できません。

## インストール

DWP コマンドは、エージェントが呼び出し時に読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

チームエージェント機能は Claude 専用です。Codex は逐次的なワークフローをサポートします。
