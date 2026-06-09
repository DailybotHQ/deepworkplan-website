---
title: Hermes
description: "DWP の Hermes アダプター。AgentSkills 標準のスキルロード、state.json のアウトカムレコードによるエピソード記憶のシナジー、そしてクロン駆動な計画継続。"
kind: adapter
lang: ja
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes アダプター

Hermes は、AgentSkills 標準でスキルをロードし、セッションをまたいでエピソード記憶を維持する自律エージェントプラットフォームです。DWP は両方のサーフェスと統合します。スキルパックは他の AgentSkills 互換パックと同様に `.agents/skills/` からロードされ、`state.json` のアウトカムレコードは Hermes のメモリーインデックスに直接フィードされます。

## サポートレベル

**フル** — Hermes は `AGENTS.md` を読み込み、AgentSkills 標準のローディングでスキルをロードします。すべての DWP サブスキルが利用可能です。

## インストール

スキルパックをワークスペースの `.agents/skills/` ディレクトリにインストールします。または、プラットフォームのスキルマネージャーが利用可能であればそれを使用します。

## 呼び出し方

プレーンテキスト：

```
create a plan for <goal>
resume the open plan
```

## エピソード記憶のシナジー

Hermes はエージェントメモリーをインデックスして、過去の作業を将来のセッションをまたいで取り出し可能にします。DWP の `state.json` アウトカムレコードは、まさにこの用途のために設計されています。完了した各タスクは、`tried`（試みたこと）、`failed`（失敗したこと）、`worked`（うまくいったこと）、そして自由形式のメモを構造化された JSON フィールドに持ちます。Hermes がワークスペースの `.dwp/plans/` 状態ファイルをインデックスすると、完成した計画が取り出し可能なエピソード記憶になります。エージェントは後から、特定の問題がどのように解決されたかを、単に計画が実行されたことだけでなく、想起できます。

つまり、Hermes 上の DWP 計画は二つの意味で耐久性があります。Markdown ファイルが人間が読める記録であり、`state.json` のアウトカムレコードが機械でインデックス可能なメモリーです。[計画の状態](/spec/plan-state#outcome-records-as-episodic-memory) を参照してください。

## クロン駆動な継続

クロンスケジューリングを持つプラットフォームでは、継続は他の自律プラットフォームと同じパターンに従います。スケジュールされた各ターンは起動し、DWP 再開プロトコルを実行し、最大一タスクを実行し、`state.json` を更新し、終了します。セッションではなく計画が、継続性の単位です。

機械可読な状態レイヤー（`manifest.json` + `state.json`）は無人実行に REQUIRED です。停止条件とエスカレーションプロトコル全体については、[エージェントプロトコル](/spec/agent-protocol#execution-profiles) を参照してください。

## 備考

Hermes と OpenClaw はどちらも、[エージェントプロトコル](/spec/agent-protocol) のサポートエージェント表に掲載された自律エージェントプラットフォームです。どちらも無人実行プロファイルで動作し、どちらもエージェントワークスペースアーキタイプの `state.json`-as-git-log 等価性から恩恵を受けます。
