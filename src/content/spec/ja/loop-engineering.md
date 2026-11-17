---
title: ループエンジニアリング (loop engineering)
description: "v8 ループの規範的な意味：記録された権限、人間が起動する継続実行、後継、ブロッカー、キュー、通知、フリート表示と権限境界。"
order: 12
lang: ja
section: ループエンジニアリング
---

# ループエンジニアリング (loop engineering)

このページでは、ループエンジニアリングに関する計画の契約を定義します。権限の根拠は引き続き**計画**です。ループは継続性と可視性を提供します。アドオンは方法を強化できますが、計画に記録された権限を広げることはできません。

## 1. v8 のルール

承認済み計画は、人間が逐次監督しなくても完了まで実行されます。自律動作の既定範囲は**計画に記録された権限内**です。人間には通知し、通常の進行の判断待ちにはしません。ただしログインと認証情報は人間が扱い、計画独自の C1–C7 gates（公開、push、外部メッセージなど）は、計画に事前承認が記録されていない限り停止条件です。v7 のルールは維持されます。方法論は単独で機能し、アドオンは強化のみ行います。

### 1.1. ループの意味

#### 登録と監視
Herdr アドオンを有効にすると、v8 pack の `execute` が lead レコードを取得し、計画の後継を記録します。lead レコードがあり、状態を読み取れる計画のみ監視対象です。人間が `herdr-peers autopilot --loop` を起動します。これは daemon であり、ログイン項目やシステムサービスではありません。一つの daemon が有効な Herdr マシンから報告される計画を監視できます。lead レコードがない計画は監視されません。

#### 継続、停滞、フェイルオーバー

未完了の計画では、daemon は lead にのみ促します。lead が5分間 idle または done で、lane が作業中でなく、返信待ちがなく、pane が範囲内かつ除外されておらず、ダイアログ、ログイン、使用上限、入力欄の人間の下書きもない場合に限ります。固定プロンプトは gates と記録済み権限を守り、計画を最後まで実行するよう求めます。促しは権限を追加しません。計画状態に進展のない促しが3回続くと `plan_stalled` を記録し、状態が変わるまで放置します。ブロック中の計画には促さず、報告します。

lead がいなくなると、daemon は一覧の最初の到達可能な後継に `herdr-peers lead takeover --plan <id>` の実行を依頼します。helper が後継順を検証して epoch を進めます。daemon は lead レコードを書かず、一覧外の pane を選びません。使用上限だけでは lead が消えた証拠になりません。Protocol 2 は計画の lane から lead を任命できますが、人間が `lead claim --allow-appointment` で明示的な許可を記録し、`--appoint` 付きで daemon を起動した場合に限ります。merge、tag、release の前には、作業中の lead が `herdr-peers lead verify --plan <id>` を実行します。

#### brain、イベント、フリート

任意の `--brain` は daemon のルールで決められないケースのために専用の判断 agent を起動します。閉じたアクション一覧からのみ選べます。実行主体は daemon だけです。許可された選択を検証して実行し、brain の自由文は実行しません。計画の `autonomy` ブロックも brain を許可する必要があります。

ループは停滞、ブロック、lead の喪失、完了、キュー結果などを計画イベントとして記録します。任意の `--notify` 統合を使うと、daemon は設定済み notifier に `plan-event-v1` オブジェクトを送り、pack の Dailybot notifier が対応イベントをチーム通知に変換します。通知は作業を承認せず、計画レコードも変えません。フリートマップと `herdr-peers fleet ui` は複数マシンの agent と計画を表示します。UI は読み取り専用で、計画状態を変更せず agent に促しません。タグ付きの仕様は[herdr-peers v2.1.0 autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md)と[protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md)を参照してください。

## 2. `autonomy` ブロック（plan-contract/v8）

任意のトップレベル `autonomy` オブジェクトは閉じた形式で、未知のキーは無効です。正規のフィールド名と型は[plan-contract/v8 schema](https://deepworkplan.com/schema/plan-contract/v8.json)で定義されます。ブロックがない場合は全既定値が適用されます。ブロックがある場合、省略された各フィールドにはそれぞれの既定値が適用され、consumer が推測してはなりません。

| フィールド | 型と許容値 | 省略時の既定値 |
|---|---|---|
| `stall_budget` | 1〜10 の整数 | 進展のない促し `3` 回 |
| `promptable` | 空でない Herdr pane アドレス配列 | 計画の lead のみ |
| `notify` | 空でない宛先リスト | 宛先なし。ループはイベントを記録する |
| `brain` | Boolean | `false`。brain は計画に作用しない |
| `queue` | `prompt-lead`、`launch`、`none` | `none`。計画はキューに入らない |

pane アドレスは Herdr の正確な形式です：`(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`。machine ID は `-` で始まりません。これらの設定は、促しの対象、イベント通知先、brain の動作可否、キュー参加方法を制限します。受け入れ基準や gates は変更しません。

## 3. 構造化ブロッカー

v8 計画は継続できない理由をデータとして記録し、ループ、フリート、再開するエージェントが同じフィールドを参照できるようにします。

### 3.1. ブロッカーレコード

ledger の `ledger.py block` で起票し、`ledger.py unblock` で解消します。`journal-event/v8` の `blocker` イベントとして記録され、生の追加は拒否され、拒否も記録されます。

| フィールド | 規則 |
|---|---|
| `task` | contract のブロック中タスク。証拠で完了済みのタスクはブロックしません。 |
| `reason` | 必須、空でなく最大1000文字。停止理由。 |
| `needs` | 必須、空でない1行、最大500文字。継続に必要なもの。 |
| `class` | 必須、[`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5 の `C1`–`C7`。 |
| `resolver` | 任意の `lead` または `human`。省略時は `human`。 |

`lead` は記録済み権限内で、認証、ログイン、同意、支払い、main への push、公開、削除なしに解決できることです。`C1`、`C2`、`C5`、`C6` では `resolver: "lead"` を拒否します。有効なブロッカーは計画ごとに最大1件。別タスクへの起票は解消まで拒否。同じタスクの再起票は `reason`、`needs`、`class`、`resolver` を更新できますが、最初の `since` を保持します。解消記録はタスクと任意メモのみ。未解消中の完了は拒否され、新しい証拠も閉じません。

### 3.2. 参照場所

`state.json` は `plan-snapshot/v8`。`plan-snapshot/v6` の形に従い、`blocker` は `{task, reason, since, needs, class, resolver?}` または `null`、`blocked` は未解消中に優先される派生状態です。ledger が投影し、手入力しません。

`PROGRESS.md` はタイトル直下に固定4行を置くことが推奨されます。create が書き、各遷移で更新します（`shared/progress_header.py`）：

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` と `Needs` は snapshot から導出（ブロック中タスク、なければ最初の未完了）。`Goal` と `Next action` は実行エージェントが記述します。

### 3.3. ループができること

ループ（brain 含む）は `resolver: "lead"` の指定があるブロッカーだけ lead に解決を依頼できます。それ以外は人間を待ちます。v6/v7 は `blocker` イベントを記録せず、`plan-snapshot/v6`（`blocker` は常に `null`）を維持し、ブロッカーは人間が扱います。
## 4. 計画キュー

キューは `.dwp/queue.json` にある `dwp-queue-v1` です。書き込むのは pack のみです。`create` は承認時に追加し、人間または lead は計画フローで順序を変更し、`execute` は lead の claim 時に lead アドレスとともに `started` にし、finalize は `done` にします。`create` または `refine` は1行の理由を添えて `skipped` にできます。各項目には計画、キュー内の既存計画を指す任意の `after`、状態、lead、開始モードがあります。キューが明示的に `parallel: true` を指定しない限り、リポジトリでは一度に一計画を実行します。

daemon は上限付きの読み取り専用 consumer です。使えないキューは空として扱い、計画の実行を止めません。依存先の完了（または依存なし）、有効な承認、指定済み lead、同じリポジトリの実行中計画なし（並列許可時を除く）が揃った場合に開始できます。`prompt-lead` は指定 lead に固定のメッセージを一度だけ送ります：「計画 P はこのリポジトリのキューの次であり、承認済みです。gates を守って最後まで実行してください。」daemon はキュー状態を書きません。このループは公開契約で明示されない限り `launch` モードを実行しません。

## 5. v8 が維持するもの

v8 は `tasks[].parallel_safe`、委譲、v7 の全イベントを含む v7 の内容を維持し、v7 機能は後続世代でも利用できます。v8 は v7 イベント集合に `blocker` を加えたものを `journal-event/v8` に記録し `plan-snapshot/v8` に投影します。世代混在 journal は拒否します。`plan-manifest/v7` の形とポインターを保ち、検証器は v7 manifest と v8 contract を組み合わせます。v6/v7 の記録はバイト単位で保持されます。
