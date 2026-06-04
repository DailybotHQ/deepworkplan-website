---
title: Google Gemini
description: "Google Gemini 向けの DWP アダプター。逐次的なワークフローを駆動する Markdown のコマンド手順とハッシュプレフィックスを通じた部分的なサポートを備える。"
kind: adapter
lang: ja
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Google Gemini アダプター

Google Gemini は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**部分的** — 中核となるコマンドは手順ファイルを通じて機能します。

## インストール

DWP コマンドは、エージェントが読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Gemini は手順ファイルを読み、逐次的な DWP ワークフローを実行します。
