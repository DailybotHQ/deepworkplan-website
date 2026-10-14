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

v6 および v7 プランでは、状態ファイルを手動で書き換えるのではなく、追記専用ジャーナル（`journal.ndjson`）から `ledger.py project` を介して状態を投影します。

## サポートレベル

**完全**（文書化済み）— Hermes は `AGENTS.md` を読み込み、AgentSkills 標準のローディングでスキルをロードします。すべての DWP サブスキルが利用可能です。

## インストール

スキルパックをワークスペースの `.agents/skills/` ディレクトリにインストールします。または、プラットフォームのスキルマネージャーが利用可能であればそれを使用します。

## 呼び出し方

プレーンテキスト：

```
create a plan for <goal>
resume the open plan
```

## エピソード記憶のシナジー

v6 および v7 プランでは、DWP の決定論的検証レシート（`outcomes.py receipt`）と結果レコードが Hermes のメモリインデックスに直接供給されます。完了した各タスクには、試行されたこと、失敗したこと、成功したことが構造化された JSON スキーマで記録されます。完了したプランは検索可能なエピソード記憶となり、エージェントは問題がどのように解決されたかを思い出すことができます。

エフェメラルセッションはイベントを `journal.ndjson` に追記し、状態ファイルを手動で書き換えるのではなく `ledger.py project` を介して `state.json` を投影します。[プラン状態](/spec/plan-state#outcome-records-as-episodic-memory)を参照してください。

## クロン駆動な継続

クロンスケジューリングを持つプラットフォームでは、継続は他の自律プラットフォームと同じパターンに従います。スケジュールされた各ターンは起動し、DWP 再開プロトコルを実行し、最大一タスクを実行し、`state.json` を更新し、終了します。セッションではなく計画が、継続性の単位です。

機械可読な状態レイヤー（`manifest.json` + `state.json`）は無人実行に REQUIRED です。停止条件とエスカレーションプロトコル全体については、[エージェントプロトコル](/spec/agent-protocol#execution-profiles) を参照してください。

## 備考

Hermes と OpenClaw はどちらも、[エージェントプロトコル](/spec/agent-protocol) のサポートエージェント表に掲載された自律エージェントプラットフォームです。どちらも無人実行プロファイルで動作し、どちらもエージェントワークスペースアーキタイプの `state.json`-as-git-log 等価性から恩恵を受けます。
