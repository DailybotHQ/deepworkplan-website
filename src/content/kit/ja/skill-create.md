---
title: skill-create
description: "author サブスキルを通じて、現在のリポジトリに新しい再利用可能なスキル、すなわちパラメーター化されたセッション内の手順を作成し、カタログを同期し続ける。"
kind: command
lang: ja
order: 7
usage: /skill-create
---

# skill-create

現在のリポジトリに新しいスキルを作成します。Deep Work Plan の **author** サブスキルへの薄い委譲です。

## 何をするか

`skill-create` は author サブスキルのスキル作成フローへ振り分けます。スキルは、セッション内で実行される再利用可能でパラメーター化された手順です（たとえば `/fix-lint`）。「X をどう行うか」を符号化し、`.agents/skills/<name>/SKILL.md` の配下に存在します。

## 使い方

```
/skill-create
```

## 振る舞い

1. リポジトリの `.agents/` レイアウトとローカルの規約を検出する。
2. 実際の繰り返し可能なワークフローが存在することを確認し、ケバブケースで名づける。
3. `SKILL.md`（Goal、When-to-use、Steps、Validation）を整備し記入する。
4. 必要なら薄いコマンド委譲を追加する。
5. `.agents/docs/` のカタログを一致するよう更新する。

## 補足

エージェントには `/agent-create` を使います。ロジックはスキルの中に存在し、コマンドは薄いままです。
