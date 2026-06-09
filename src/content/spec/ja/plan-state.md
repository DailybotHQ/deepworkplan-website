---
title: 計画の状態
description: "機械可読な計画状態レイヤーの仕様。manifest.json と state.json、ゲートレコード、エピソード記憶としてのアウトカムレコード、照合、そして必須となるタイミング。"
order: 7
lang: ja
section: State
---

# 計画の状態

**バージョン 1.0。状態: 安定。** この文書は Deep Work Plan 方法論の機械可読な計画状態レイヤーを規定します。キーワード MUST、MUST NOT、SHOULD、SHOULD NOT、MAY は、RFC 2119 に記述されたとおりに解釈されます。

二つの JSON 成果物 — `manifest.json`（計画の静的な識別情報）と `state.json`（バリデーションゲートの結果を含む、タスクごとのライブ実行状態）— を、すべての計画は Markdown ファイルとあわせて MAY 携えることができます。無人実行（[エージェントプロトコル](/spec/agent-protocol#execution-profiles) を参照）および git を持たないワークスペース（[アーキタイプ](/spec/archetypes) §3 を参照）では MUST 携えなければなりません。

Markdown の計画が **人間が読める信頼できる情報源** であり続けます。JSON レイヤーは **導出された投影** です。すなわち、エージェントが定義されたプロトコルポイントで再生成し、手で編集することなく、Markdown との無言の不一致を生じさせません。その目的は相互運用性です — リンティング、適合性チェック、差分比較、ダッシュボード、レジストリの探索、および外部セッションインフラとの同期。これらはいずれも散文では信頼して構築できません。

## この仕様が存在する理由

v1.1 まで、計画は Markdown のみの散文でした。それにより監査しやすくエージェント非依存でしたが、ツールが検証、差分比較、あるいは消費できるものは何も残りませんでした。適合性ゲートがなく、`README.md` と `PROGRESS.md` のデシンクを検出する手段がなく、デーモンやクラウドセッションが散文を解析せずに計画の状態を把握する方法もありませんでした。v1.2 では、Markdown を降格させることなく JSON の投影を追加します。投影は Markdown から導出されます — ロックファイルがマニフェストから導出されるのと同じように。

## 配置

状態レイヤーを使用する計画のレイアウトは次のとおりです。

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← 人間が読める信頼できる情報源（変更なし）
├── PROGRESS.md          ← ナラティブログ（変更なし）
├── PROMPTS.md           ← 変更なし
├── manifest.json        ← 静的な識別情報（マテリアライゼーション時に書き込まれる）
├── state.json           ← ライブ状態（プロトコルポイントで上書きされる）
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` は、`create` フローが計画をマテリアライズするときに正確に一度 MUST 書き込まれ、`PROGRESS.md` に記録された仕様バージョンの移行を除き、その後 MUST NOT 変更されてはなりません。

`state.json` は、エージェントによってこれらのプロトコルポイントの各々で MUST 上書きされなければなりません。すなわち、計画のマテリアライゼーション（すべてのタスクが `pending`）、タスクの開始（`in_progress`）、各バリデーションゲートの実行（ゲートレコードが追加または更新される）、そしてタスクの完了（`completed`、[DWP 仕様](/spec/dwp-specification#task-completion-protocol) のタスク完了プロトコルの一部として）。

両ファイルはアトミックに MUST 書き込まれなければなりません。同じディレクトリ内の一時ファイルに書き込み、その後ターゲットの上にリネームします。クラッシュした書き込みは、切り詰められた JSON ファイルを残してはなりません（MUST NOT）。

## レイヤーが必須となるタイミング

- git リポジトリでの **インタラクティブ** な実行では、状態レイヤーは新しい計画に対して RECOMMENDED であり、v1.2 以前の計画に対しては OPTIONAL です。状態レイヤーを持たない計画も適合したままです。
- **無人** 実行では、状態レイヤーは REQUIRED です。
- git を持たない **エージェントワークスペース** では、状態レイヤーは REQUIRED です。`state.json` が、リポジトリにおいて git ログが担う回復情報を担います。

## `manifest.json` — 計画の識別情報

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v1.json",
  "spec_version": "2.2.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`、`spec_version`、`name`、`archetype`、`rigor`、`created_at`、`task_count` は REQUIRED です。

`archetype` は `individual`、`orchestrator-hub`、`agent-workspace` のいずれかでなければなりません（MUST）。

`rigor` は `micro`、`standard`、`deep` のいずれかでなければなりません（MUST）（[比例したリゴー](/spec/dwp-specification#proportional-rigor) を参照）。

`parent_plan` は子計画をそのオーケストレーター計画へリンクします（`{repo}:{plan_name}`、または `null`）。

`created_by` は作成エージェントとモデルを識別すべきです（SHOULD）。シークレット、トークン、または表示名を超えるユーザー識別子を含んではなりません（MUST NOT）。

## `state.json` — ライブ実行状態

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v1.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "tasks": [
    {
      "id": 1,
      "file": "1.task_webhook_endpoint.md",
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "file": "3.task_retry_queue.md",
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

### タスクエントリー

計画内のすべてのタスクファイルは、`tasks` 内に正確に一つのエントリーを持たなければなりません（MUST）。エントリーはタスクの番号（`id`）とファイル名（`file`）をキーとします。

`status` は `pending`、`in_progress`、`completed`、`blocked`、`skipped` のいずれかでなければなりません（MUST）。`skipped` は、ユーザーが `refine` を通じてスコープからタスクを明示的に除外した場合にのみ有効です。作業を黙って飛ばすために `state.json` を使用してはなりません（MUST NOT）。

`completed` エントリーは `completed_at` を持たなければならず（MUST）、計画がコミットする場合には短い `commit` ハッシュも持たなければなりません（MUST）。これが計画とコードのトレーサビリティリンクです。

### ゲートレコード

バリデーションコマンドの各実行は、ゲートレコードとして記録すべきです（SHOULD）。`command`、`passes`（ブール値）、`exit_code`、`last_run`、そして短い人間が読める `evidence` 文字列（要約行または `analysis_results/` 以下のパス。コマンドの全出力は含めない）です。

タスクのゲートレコードのいずれかが `passes: false` を持ち、その後のパスする実行がない間は、`state.json` でタスクを `completed` としてはなりません（MUST NOT）。ゲートレコードは「証拠なしに完了とマークしない」というパターンの機械版です — 項目ごとの `passes` フラグが早期完了を防ぐパターンです。

### エピソード記憶としてのアウトカムレコード

`completed` タスクは `outcome` レコードを持つべきです（SHOULD）。`tried`（試みたこと）、`failed`（失敗したこと）、`worked`（うまくいったこと）、そして自由形式の `notes` です。各エントリーは一行に収めます。

アウトカムレコードは、完成した計画を取り出し可能な **エピソード記憶** にします。エージェント（またはメモリーインデックスプラットフォーム）は後から、問題が解決されたことだけでなく、どのように解決されたかを想起できます。これらは必須のスキル＆エージェント探索タスクを支えます。このタスクはパターンを採掘する際にアウトカムレコードを読むべきです（SHOULD）。Hermes のようにエージェントメモリーをインデックスするプラットフォームでは、`state.json` のアウトカムレコードにより完成した計画が将来のセッションをまたいで直接取り出し可能になります。

### チェックポイントとブロック状態

`checkpoint` は現在のタスク内の最も細かい再開ポイントを記録します。タスクの `id`、自由形式の `step` ロケーター、タイムスタンプ、そして一行のメモです。エージェントはタスクの途中で一時停止するたびに更新すべきであり（SHOULD）、無人モードでの計画的な中断の前には MUST 更新しなければなりません。

`blocked` は `null` か `{ "task": N, "reason": "...", "since": "...", "needs": "..." }` です。停止条件に達した無人エージェントは、停止する前に `blocked` を MUST 設定しなければなりません。これが、デーモンの次のハートビートや人間に対して、計画が停止した理由を知らせる手段です。

## 投影と照合

Markdown がすべての不一致に MUST 勝たなければなりません。`state.json` がタスク 4 を `completed` としているが、計画の README でチェックされていないボックスがある場合、状態ファイルは古くなっています。

再開するエージェントは、続行する前に README のチェックボックスリストを `state.json` と照合しなければなりません（MUST）。デシンクがある場合は、Markdown から `state.json` を再生成し（利用可能な場合は git ログも参照して）、照合を `PROGRESS.md` に記録してから進まなければなりません（MUST）。

`verify` サブスキルはデシンクを適合性の発見として MUST 扱わなければなりません。どのタスクがどの方向で不一致かを報告します。

実行エージェント以外のツールは、両 JSON ファイルを読み取り専用として MUST 扱わなければなりません。

## スキーマのバージョニング

両スキーマは URL でバージョン管理されます（`/v1.json`）。バージョン内での追加フィールドは許可されます。フィールドの名前変更または型変更には `/v2.json` と仕様の変更ログへの移行メモが必要です。マニフェストの `spec_version` フィールドは、計画が作成された DWP 仕様のバージョンを固定します。インストール済みの仕様より新しい計画に遭遇したエージェントは、推測するのではなく、その旨を述べるべきです（SHOULD）。
