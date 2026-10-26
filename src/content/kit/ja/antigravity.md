---
title: Antigravity
description: "Antigravity 向けの DWP アダプター。Markdown のコマンド手順とハッシュコマンドプレフィックスを通じた完全なサポートを備え、Deep Work Plan。"
kind: adapter
lang: ja
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Antigravity アダプター

Antigravity は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全**（インストールテスト済み）— すべての dwp-* コマンドが手順ファイルから実行されます。自動テストスイートによりルートが確認されており、動作ワークフローは逐次ベースラインで動作します。

## インストール

DWP コマンドは、エージェントが呼び出し時に読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Antigravity は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
