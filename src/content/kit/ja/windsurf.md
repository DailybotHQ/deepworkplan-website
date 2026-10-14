---
title: Windsurf
description: "Windsurf 向けの DWP アダプター。ルールシステムと Markdown のコマンド手順を通じた完全なサポートを備え、ハッシュコマンドプレフィックスで呼び出します。"
kind: adapter
lang: ja
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf アダプター

Windsurf は、ルールシステムと Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全**（インストールテスト済み）— Windsurf はプロジェクトルールを読み取り、手順ファイルからすべての dwp-* コマンドを実行します。自動テストスイートによりルートが確認されています。

## インストール

DWP コマンドは、エージェントが Windsurf のルールシステムを通じて読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Windsurf は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
