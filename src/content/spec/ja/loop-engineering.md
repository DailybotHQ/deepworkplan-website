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

## ループの意味

### 登録と監視

Herdr アドオンを有効にすると、v8 pack の `execute` が lead レコードを取得し、計画の後継を記録します。lead レコードがあり、状態を読み取れる計画のみ監視対象です。人間が `herdr-peers autopilot --loop` を起動します。これは daemon であり、ログイン項目やシステムサービスではありません。一つの daemon が有効な Herdr マシンから報告される計画を監視できます。lead レコードがない計画は監視されません。

### 継続、停滞、フェイルオーバー

未完了の計画では、daemon は lead にのみ促します。lead が5分間 idle または done で、lane が作業中でなく、返信待ちがなく、pane が範囲内かつ除外されておらず、ダイアログ、ログイン、使用上限、入力欄の人間の下書きもない場合に限ります。固定プロンプトは gates と記録済み権限を守り、計画を最後まで実行するよう求めます。促しは権限を追加しません。計画状態に進展のない促しが3回続くと `plan_stalled` を記録し、状態が変わるまで放置します。ブロック中の計画には促さず、報告します。

lead がいなくなると、daemon は一覧の最初の到達可能な後継に `herdr-peers lead takeover --plan <id>` の実行を依頼します。helper が後継順を検証して epoch を進めます。daemon は lead レコードを書かず、一覧外の pane を選びません。使用上限だけでは lead が消えた証拠になりません。Protocol 2 は計画の lane から lead を任命できますが、人間が `lead claim --allow-appointment` で明示的な許可を記録し、`--appoint` 付きで daemon を起動した場合に限ります。merge、tag、release の前には、作業中の lead が `herdr-peers lead verify --plan <id>` を実行します。

### brain、イベント、フリート

任意の `--brain` は daemon のルールで決められないケースのために専用の判断 agent を起動します。閉じたアクション一覧からのみ選べます。実行主体は daemon だけです。許可された選択を検証して実行し、brain の自由文は実行しません。計画の `autonomy` ブロックも brain を許可する必要があります。

ループは停滞、ブロック、lead の喪失、完了、キュー結果などを計画イベントとして記録します。任意の `--notify` 統合を使うと、daemon は設定済み notifier に `plan-event-v1` オブジェクトを送り、pack の Dailybot notifier が対応イベントをチーム通知に変換します。通知は作業を承認せず、計画レコードも変えません。フリートマップと `herdr-peers fleet ui` は複数マシンの agent と計画を表示します。UI は読み取り専用で、計画状態を変更せず agent に促しません。タグ付きの仕様は[herdr-peers v2.0.0 autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md)と[protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md)を参照してください。

## 2. `autonomy` ブロック（plan-contract/v8）

任意のトップレベル `autonomy` オブジェクトは閉じた形式で、未知のキーは無効です。正規のフィールド名と型は[plan-contract/v8 schema](https://deepworkplan.com/schema/plan-contract/v8.json)で定義されます。ブロックがない場合は全既定値が適用されます。ブロックがある場合、省略された各フィールドにはそれぞれの既定値が適用され、consumer が推測してはなりません。

| フィールド | 型と許容値 | 省略時の既定値 |
|---|---|---|
| `stall_budget` | 1〜10 の整数 | 進展のない促し `3` 回 |
| `promptable` | 空でない Herdr pane アドレス配列 | 計画の lead のみ |
| `notify` | 空でない宛先配列。現在は `dailybot` | 宛先なし。ループはイベントを記録する |
| `brain` | Boolean | `false`。brain は計画に作用しない |
| `queue` | `prompt-lead`、`launch`、`none` | `none`。計画はキューに入らない |

pane アドレスは Herdr の正確な形式です：`(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`。machine ID は `-` で始まりません。これらの設定は、促しの対象、イベント通知先、brain の動作可否、キュー参加方法を制限します。受け入れ基準や gates は変更しません。

## 3. 構造化ブロッカーと進捗

ブロックされた計画は、`state.json` の `blocked` または `blocker` レコードに C クラスと任意の `resolver` を記録します。`resolver` は `lead` または `human` で、省略時は `human` です。`lead` は、認証情報、ログイン、同意、支払い、main への push、release、削除なしで、記録済み権限内に解決できることを意味します。brain を含むループは `lead` と記録されたブロッカーのみ lead に解決を頼めます。それ以外は人間に通知し、促しで迂回しません。

タグ付き herdr-peers のフリートマップは、計画自身の `PROGRESS.md` 最大14行を整理済み要約として表示できます。これは観測情報であり、権限付与でも機械可読ヘッダーの公開 schema でもありません。pack v8 ラインで予定されるヘッダー形式は、規範とする前に 8.0.0 tag で確認する必要があります。

## 4. 計画キュー

キューは `.dwp/queue.json` にある `dwp-queue-v1` です。書き込むのは pack のみです。`create` は承認時に追加し、人間または lead は計画フローで順序を変更し、`execute` は lead の claim 時に lead アドレスとともに `started` にし、finalize は `done` にします。`create` または `refine` は1行の理由を添えて `skipped` にできます。各項目には計画、キュー内の既存計画を指す任意の `after`、状態、lead、開始モードがあります。キューが明示的に `parallel: true` を指定しない限り、リポジトリでは一度に一計画を実行します。

daemon は上限付きの読み取り専用 consumer です。使えないキューは空として扱い、計画の実行を止めません。依存先の完了（または依存なし）、有効な承認、指定済み lead、同じリポジトリの実行中計画なし（並列許可時を除く）が揃った場合に開始できます。`prompt-lead` は指定 lead に固定のメッセージを一度だけ送ります：「計画 P はこのリポジトリのキューの次であり、承認済みです。gates を守って最後まで実行してください。」daemon はキュー状態を書きません。このループは公開契約で明示されない限り `launch` モードを実行しません。

## 5. v8 が維持するもの

v8 は `tasks[].parallel_safe`、delegation、journal について v7 契約を維持します。v8 の journal-event 集合は v7 と同じです。世代は順序立っており、v7 として指定された機能は v8 以降でも使用できます。record layer では v7 の manifest と journal-event schema URL を保ち、新世代には `plan-contract/v8` URL だけを追加します。既存の v5、v6、v7 計画は記録済み世代を保ち、暗黙に移行されません。

v8 は add-on を必須にしません。Herdr がなくても、計画は中核手法によって記録済み権限内で実行されます。Herdr があれば、登録、制限付き継続、後継、通知、キュー、読み取り専用フリート表示で同じ計画ライフサイクルが強化されます。
