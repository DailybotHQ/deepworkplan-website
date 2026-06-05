---
title: OpenAI Codex
description: "OpenAI Codex 向けの DWP アダプター。Markdown のコマンド手順とハッシュコマンドプレフィックスを通じた完全なサポートを備え、Deep Work Plan の完全なループを実行します。"
kind: adapter
lang: ja
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# OpenAI Codex アダプター

OpenAI Codex は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全** — すべての dwp-* コマンドが手順ファイルから実行されます。

## インストール

DWP コマンドは、エージェントが呼び出し時に読む Markdown の手順として存在します。ルールは `.codex/` 配下にインストールされます。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Codex は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
