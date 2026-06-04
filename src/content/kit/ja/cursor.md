---
title: Cursor
description: "Cursor AI 向けの DWP アダプター。プロジェクトルールの仕組みとハッシュのコマンドプレフィックスを通じた完全なサポートを備える。Cursor がスラッシュを自ら予約しているため。"
kind: adapter
lang: ja
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor アダプター

Cursor は、プロジェクトルールとコマンドファイルを通じて DWP をサポートします。

## サポートレベル

**完全** — DWP コマンドは Cursor のルールの仕組みを通じて機能します。

## インストール

DWP コマンドはプロジェクトの配下に Markdown として存在します。Cursor はそのルールの仕組みを通じてそれらを読みます。

## 呼び出し

`#` プレフィックスを使います（Cursor が `/` を横取りするため）。

```
#dwp-create <goal>
#dwp-execute
```

## 補足

Cursor が `/` を自身のコマンドのために予約しているため、`#` を使います。
