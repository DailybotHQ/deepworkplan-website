---
title: OpenCode
description: "オープンソースエージェント OpenCode 向けの DWP アダプター。ネイティブの AGENTS.md と Markdown のコマンド手順を通じた完全なサポートを備え。"
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

**完全**（インストールテスト済み）— OpenCode は AGENTS.md をネイティブに読み取り、手順ファイルからすべての dwp-* コマンドを実行します。自動テストスイートによりルートが確認されています。

## インストール

DWP は AGENTS.md とコマンド手順をリポジトリに配置します。OpenCode はそれらをプロジェクトのコンテキストとして発見します。

任意：[coding-agents-kit](/kit/agentkit) はこの CLI をインストールし、`ak opencode` で起動できます。ベンダー公式のインストーラーでも同様に使えます。

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

OpenCode は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
