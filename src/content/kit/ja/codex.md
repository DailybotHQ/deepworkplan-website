---
title: OpenAI Codex
description: "OpenAI Codex 向けの DWP アダプター。Markdown のコマンド手順とハッシュコマンドプレフィックスを通じた完全なサポートを備え、Deep Work Pla。"
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

**完全**（動作テスト済み）— すべての dwp-* コマンドが手順ファイルから実行され、モデル間の双方向の作成・再開引き継ぎベンチマークで実証されています。

## インストール

DWP コマンドは、エージェントが呼び出し時に読む Markdown の手順として存在します。ルールは `.codex/` 配下にインストールされます。

任意：[coding-agents-kit](/kit/agentkit) はこの CLI をインストールし、`ak codex` で起動できます。ベンダー公式のインストーラーでも同様に使えます。

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Codex は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
