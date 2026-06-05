---
title: Google Gemini
description: "Google Gemini 向けの DWP アダプター。Markdown のコマンド手順とハッシュコマンドプレフィックスを通じた完全なサポートを備え、Deep Work Plan の完全なループを実行します。"
kind: adapter
lang: ja
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Google Gemini アダプター

Google Gemini は、Markdown のコマンド手順を通じて DWP をサポートします。

## サポートレベル

**完全** — すべての dwp-* コマンドが手順ファイルから実行されます。ネイティブの WebFetch を利用するには Gemini 2.5 Pro 以降が必要です。

## インストール

DWP コマンドは、エージェントが呼び出し時に読む Markdown の手順として存在します。

## 呼び出し

`#` プレフィックスを使います。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Gemini は手順ファイルを読み、完全な逐次的 Deep Work Plan ループを実行します。
