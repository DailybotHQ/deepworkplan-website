---
title: OpenClaw
description: "DWP の OpenClaw アダプター。ネイティブな .agents/skills スキャン、無人実行のマッピング、そして自律エージェントワークスペース向けのクロン駆動な計画継続。"
kind: adapter
lang: ja
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw アダプター

OpenClaw は、スケジュールされたターンで長期的なワークスペースを実行する自律エージェントプラットフォームです。インストール済みのスキルパックを探すために `<workspace>/.agents/skills/` をネイティブにスキャンします。つまり、DWP スキルはアダプターシムなしでロードされます。そこにインストールすれば、OpenClaw が自動的に読み込みます。

## サポートレベル

**フル** — OpenClaw は `AGENTS.md` を読み込み、AgentSkills 標準でスキルをロードします。すべての DWP サブスキル（`onboard`、`create`、`execute`、`refine`、`resume`、`status`、`verify`）が利用可能です。

## インストール

```bash
openclaw skills install deepworkplan
```

または手動で：`DailybotHQ/deepworkplan-skill` を `<workspace>/.agents/skills/deepworkplan/` にクローンします。

## 呼び出し方

プレーンテキスト — OpenClaw はスラッシュコマンドのプレフィックスを使用しません。

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## 無人実行のマッピング

OpenClaw のスケジューリングプリミティブは、DWP の継続モデルに直接対応します。

| OpenClaw プリミティブ | DWP での役割 |
|-----------------------|-------------|
| ワークスペースルート | [エージェントワークスペース](/spec/archetypes) アーキタイプ：`AGENTS.md`、`.agents/`、`.dwp/` がワークスペースルートに存在する |
| `<workspace>/.agents/skills/`（ネイティブ tier-2 スキャン） | このパックが置かれる場所 — アダプターシム不要 |
| ハートビートまたはクロンターン | 一つの[スケジュールされた継続](/spec/agent-protocol#scheduled-continuation)ターン：起動 → DWP 再開プロトコル → 次のアトミックタスク → 状態を更新 → 終了 |
| `HEARTBEAT.md` チェック | 一行追加：「`.dwp/plans/` にオープンな計画があれば、一タスク分再開する。」 |
| スタンディングオーダー | 計画承認の境界と無人プロファイルの制限された権限 |

実際の運用では：

1. 人間がインタラクティブに計画を作成・承認します。承認がコントロールポイントです — 無人ターンは一ターンで計画を作成・実行しません。
2. 計画は機械可読な状態レイヤー（`manifest.json` + `state.json`）を持たなければなりません。git のないワークスペースでは、`state.json` がクラッシュセーフな再開を可能にします。[計画の状態](/spec/plan-state) を参照してください。
3. ハートビートまたはクロンの各ターンは最大一タスクを実行し、バリデーションゲートを通過し、`state.json` をアトミックに更新し、終了します。
4. 停止条件が発生した場合、エージェントは `state.json` の `blocked` フィールドに記録し、ワークスペースの通常のチャネルで報告します。次の人間の確認 — またはハートビートレポート — で、必要なことが正確にわかります。

結果として：デーモンによって一晩かけて実行される、再起動、モデル変更、セッション境界をまたいで生き残る複数日にわたる計画が、人間が監督する実行と同じゲートをもって実現します。

## 備考

OpenClaw のワークスペースは [エージェントワークスペース](/spec/archetypes) アーキタイプの代表的な例です。DWP スキルパックの `HEARTBEAT.md` 統合と `state.json` 要件は、このプラットフォームを念頭において設計されました。
