---
title: Claude Code
description: "Claude Code 向けの DWP アダプター。ネイティブのスラッシュコマンドとスキルを通じた完全なサポートを備え、機能一式のためのサブエージェントとチームエージェントを含む。"
kind: adapter
lang: ja
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code アダプター

Claude Code は、ネイティブのスラッシュコマンドとスキルを通じて **完全な** DWP サポートを備えます。

## サポートレベル

**完全** — 五つの DWP コマンドはすべて、ネイティブの Claude Code スラッシュコマンドに対応します。

## インストール

DWP は `.agents/skills/` 配下のスキルとして配布されます（`.claude/` シンボリックリンクを通じて解決されます）。Claude Code はそれらを自動的に発見します。

## 呼び出し

`/` プレフィックスを使います。

```
/dwp-create <goal>
/dwp-execute
```

## 補足

Claude Code はスキル、サブエージェント、チームエージェントをサポートします。DWP の機能一式です。
