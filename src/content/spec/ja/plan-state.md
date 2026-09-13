---
title: 計画の状態
description: "機械可読な計画状態レイヤーの仕様。manifest.json と state.json、ゲートレコード、エピソード記憶としてのアウトカムレコード、照合、そして必須となるタイミング。"
order: 8
lang: ja
section: State
---

# 計画の状態

**バージョン 5.0.0。状態: 安定。** この文書は Deep Work Plan 方法論の機械可読な計画状態レイヤーを規定するもので、いまや DWP 標準自身のバージョンと整合しています——この番号の付け替えによって既存の要件が弱められることはありません。この改訂はまた、ガードされた状態アップデーター、検証済みの計画公開、そして完了した計画が満たさなければならない証拠の真実性に関するルール(下記参照)を文書化します。キーワード MUST、MUST NOT、SHOULD、SHOULD NOT、MAY は、RFC 2119 に記述されたとおりに解釈されます。

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

`state.json` は、エージェントによってこれらのプロトコルポイントの各々で MUST 上書きされなければなりません。すなわち、計画のマテリアライゼーション（すべてのタスクが `pending`）、タスクの開始（`in_progress`）、各バリデーションゲートの実行（ゲートレコードが追加または更新される）、タスクの完了（`completed`、[DWP 仕様](/spec/dwp-specification#task-completion-protocol) のタスク完了プロトコルの一部として）、計画された中断の前のチェックポイント、そして `blocked` 停止。

両ファイルはアトミックに MUST 書き込まれなければなりません。同じディレクトリ内の一時ファイルに書き込み、その後ターゲットの上にリネームします。クラッシュした書き込みは、切り詰められた JSON ファイルを残してはなりません（MUST NOT）。

## レイヤーが必須となるタイミング

- git リポジトリでの **インタラクティブ** な実行では、状態レイヤーは新しい計画に対して RECOMMENDED であり、v1.2 以前の計画に対しては OPTIONAL です。状態レイヤーを持たない計画も適合したままです。
- **無人** 実行では、状態レイヤーは REQUIRED です。
- git を持たない **エージェントワークスペース** では、状態レイヤーは REQUIRED です。`state.json` が、リポジトリにおいて git ログが担う回復情報を担います。

## `manifest.json` — 計画の識別情報

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`、`spec_version`、`name`、`archetype`、`rigor`、`created_at`、`task_count`、そして `plan_format` は REQUIRED です。

`archetype` は `individual`、`orchestrator-hub`、`agent-workspace` のいずれかでなければなりません（MUST）。

`rigor` は `micro`、`standard`、`deep` のいずれかでなければなりません（MUST）（[比例したリゴー](/spec/dwp-specification#proportional-rigor) を参照）。

`plan_format` は `lite`、`full` のいずれかでなければなりません（MUST） — 作成時に選択された表現形式です（[Lite 計画](/spec/lite-plans) を参照）。これはマニフェストのレベルでは不変です。後からの Lite から Full への昇格は `state.json` に記録され、マニフェストを書き換えることでは決して記録されません。

`parent_plan` は子計画をそのオーケストレーター計画へリンクします（`{repo}:{plan_name}`、または `null`）。

`created_by` は作成エージェントとモデルを識別すべきです（SHOULD）。シークレット、トークン、または表示名を超えるユーザー識別子を含んではなりません（MUST NOT）。

## `state.json` — ライブ実行状態

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
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
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
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

Lite 計画のタスクエントリーは、別個のファイルの代わりに、`README.md` 内のタスクのアンカーを指す `inline` ロケーターを使用します — エントリーのそれ以外の部分（ゲート、アウトカム、状態）はまったく同じように機能します。

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### format、materialization、approval、promotion

`format` は `lite`、`full` のいずれかでなければならず（MUST）、マニフェストの `plan_format` を反映します — ただしマニフェストとは異なりここでは可変です。Lite 計画は後から Full へ昇格することが MAY あるためです。`materialization` は `materializing`（計画フォルダーが書き込まれている最中）、`ready`（マテリアライゼーションが完了している）、または `promoting`（Lite から Full への昇格が進行中）のいずれかでなければなりません（MUST）。`approval` は `pending`、`approved`、`pre_approved` のいずれかでなければならず（MUST）、このスキーマでは OPTIONAL です。それが記録される前に書かれた計画も引き続き検証を通るようにするためです — それが存在しない場合、README の `Approval` 行をその値として扱い、どちらも存在しない場合は `pending` として扱います。`promotion` は、昇格の外では `null` であり、`materialization` が `promoting` である間は、昇格の意図と移行先タスクを記録するオブジェクトです。これらのフィールドが符号化する完全なライフサイクルについては [Lite 計画](/spec/lite-plans) を参照してください。

### タスクエントリー

すべてのタスク — Full 計画では別個のファイル、Lite 計画ではインラインの `{#task-N}` レコード — は、`tasks` 内に正確に一つのエントリーを持たなければなりません（MUST）。エントリーはタスクの番号（`id`）とその `locator` をキーとします。`locator.kind` は `file`（Full — `value` はタスクのファイル名）または `inline`（Lite — `value` はタスクのアンカー、`#task-N`）のいずれかでなければなりません（MUST）。

`status` は `pending`、`in_progress`、`completed`、`blocked`、`skipped` のいずれかでなければなりません（MUST）。`skipped` は、ユーザーが `refine` を通じてスコープからタスクを明示的に除外した場合にのみ有効です。作業を黙って飛ばすために `state.json` を使用してはなりません（MUST NOT）。

`completed` エントリーは `completed_at` を持たなければならず（MUST）、計画がコミットする場合には短い `commit` ハッシュも持たなければなりません（MUST）。これが計画とコードのトレーサビリティリンクです。

### ゲートレコード

バリデーションコマンドの各実行は、ゲートレコードとして記録すべきです（SHOULD）。`command`、`passes`（ブール値）、`exit_code`、`last_run`、そして短い人間が読める `evidence` 文字列（要約行またはプラン自体の `analysis_results/`（プラン自身のフォルダー内であり、リポジトリルートではない）以下のパス。コマンドの全出力は含めない）です。

タスクのゲートレコードのいずれかが `passes: false` を持ち、その後のパスする実行がない間は、`state.json` でタスクを `completed` としてはなりません（MUST NOT）。ゲートレコードは「証拠なしに完了とマークしない」というパターンの機械版です — 項目ごとの `passes` フラグが早期完了を防ぐパターンです。

### エピソード記憶としてのアウトカムレコード

`completed` タスクは `outcome` レコードを持つべきです（SHOULD）。`tried`（試みたこと）、`failed`（失敗したこと）、`worked`（うまくいったこと）、そして自由形式の `notes` です。各エントリーは一行に収めます。

アウトカムレコードは、完成した計画を取り出し可能な **エピソード記憶** にします。エージェント（またはメモリーインデックスプラットフォーム）は後から、問題が解決されたことだけでなく、どのように解決されたかを想起できます。これらはタスク内スキル処分と Final Review のスキル突き合わせを支え、後者はパターンを採掘する際にアウトカムレコードを読みます。Hermes のようにエージェントメモリーをインデックスするプラットフォームでは、`state.json` のアウトカムレコードにより完成した計画が将来のセッションをまたいで直接取り出し可能になります。

### チェックポイントとブロック状態

`checkpoint` は現在のタスク内の最も細かい再開ポイントを記録します。タスクの `id`、自由形式の `step` ロケーター、タイムスタンプ、そして一行のメモです。エージェントはタスクの途中で一時停止するたびに更新すべきであり（SHOULD）、無人モードでの計画的な中断の前には MUST 更新しなければなりません。

`blocked` は `null` か `{ "task": N, "reason": "...", "since": "...", "needs": "..." }` です。停止条件に達した無人エージェントは、停止する前に `blocked` を MUST 設定しなければなりません。これが、デーモンの次のハートビートや人間に対して、計画が停止した理由を知らせる手段です。

## 投影と照合

Markdown がすべての不一致に MUST 勝たなければなりません。`state.json` がタスク 4 を `completed` としているが、計画の README でチェックされていないボックスがある場合、状態ファイルは古くなっています。

再開するエージェントは、続行する前に README のチェックボックスリストを `state.json` と照合しなければなりません（MUST）。デシンクがある場合は、Markdown から `state.json` を再生成し（利用可能な場合は git ログも参照して）、照合を `PROGRESS.md` に記録してから進まなければなりません（MUST）。

`verify` サブスキルはデシンクを適合性の発見として MUST 扱わなければなりません。どのタスクがどの方向で不一致かを報告します。

実行エージェント以外のツールは、両 JSON ファイルを読み取り専用として MUST 扱わなければなりません。

## ガードされた状態の更新

通常の進捗の書き込みは、フルファイルの書き換えではなく、出荷済みの的を絞ったアップデーターを経由します。これは不正な形式の状態を即座に拒否し、また、空でないゲート証拠が添付されていない限り、タスクを `completed` としてマークすることを拒否します——コマンド自身の出力にパイプ文字が含まれる場合には `--gate-json` 形式が用意されており、アップデーターは上述と同じ閉じたゲートオブジェクトを受け入れます。リトライは自身のコマンドのみを置き換えます。異なるコマンドは、それぞれ独自の別のレコードを保持します。`--block-reason` はブロッカーを記録します。`--resolve-blocker` は現在のタスクのブロッカーのみを解決し、他のタスクのブロッカーを解決することは決してありません。スキップされた作業が計画を `completed` にすることは決してありません。`--reopen-reason` は、呼び出し側が `refine` を通じて計画を修正する意図を記録します——その修正、および無効化される証拠は、まずタスクログに記録されなければなりません(MUST)。`--expected-sha256` は、それ以降に移り変わった状態スナップショットに対する書き込みを拒否します。協調的な `.lock` ディレクトリが同時書き込みを直列化します。クラッシュした書き込み側のロックは、削除する前に調査されなければならず(MUST)、ロックを完全に迂回するエディターに対する保護は主張されません。これらのレコードは結果を主張するものであり、コマンドが実際に実行されたこと、あるいはその出力が意味的に受け入れられたことをそれ自体で証明するものではありません。

## 検証済みの計画公開

完了を発表する前に、完了したタスクログ(それぞれが **スキル処分** を、また Final Review では **ドキュメント決定** も担う)、README の索引、そして `PROGRESS.md` は、獲得された出典と受け入れ結果から著されていなければなりません(MUST)。計画の最終タスクは、その後、出荷済みのファイナライザーを通じて締めくくられます。その終端遷移は、状態を書き込む前に完了候補をすべての計画成果物に照らして検証し、その後にファイルを検証し、`analysis_results/FINALIZATION.json` の受領票を記録します。捏造された合格ゲートがこの遷移を裏付けてはなりません(MUST NOT)——受領票は実際に何が検査されたかについての外部的な証拠であり、それ自体の前提条件では決してありません。次に `bash ../verify/conformance.sh --plan PLAN_name` が、ディスク上の実際の成果物に対して実行されます。

中断された公開は `.finalizing.json` マーカーを残したままにします。証拠が検査され、復旧ヘルパーが同じ候補に対して成功するまで、通常の検証は失敗し続けます——推測によって公開が再開されることはありません。古びた協調ロックは、削除の前にアクティブな書き込み側が残っていないことの確認を必要とします。このレイヤーの何も、コミットしたり、プッシュしたり、保存されたゲートコマンドを実行したり、計画の Markdown を黙って修復したりしません。Python インタープリターが見つからない場合は `UNVERIFIED` となり、決して `completed` にはなりません。

## 証拠の真実性と修正

タスクのスコープ、受け入れ基準、または繰り延べへのあらゆる変更は、一つの永続的な修正レコードを伴います。元の基準の逐語的な記録、観察された内容、処分、理由、その背後にある権限(ユーザー、開発者、または証拠)、影響を受けるタスク、そしてどの証拠が無効化されたか保持されたかです。修正は追記されるものであり、遡って日付を付けられることは決してありません。`manifest.json` はその作成時の来歴を保持し、変化した現行スコープに合わせて書き換えられることは決してありません。

タスクレコードが締めくくることのできる五つの証拠状態があります。

- **完了した調査** — 実際に記録された作業。それを名指しする改訂された基準に対してのみタスクを締めくくり、書かれたままの元の基準に対して締めくくることは決してありません。
- **未実行のシナリオ** — 実施されなかったものとして記録されます。いかなる時代においても合格の証拠には寄与しません。
- **繰り延べられた要件** — 基準は、記録された権限とともに、指名された移行先タスクへ移されます。その修正のみが元のタスクを締めくくります。
- **失敗したゲート** — 同じ受け入れの意図が再実行され合格するまで、失敗のままです。リトライは自身のコマンドのみを置き換えます。
- **達成されたプロダクトの成果** — 書かれたままの基準が、それ自身のゲートによって検証されます。タスクを変更なしに完了させる唯一の状態です。

強制は、記録が許す限り機械的に行われます。「refine により無効化」とマークされたゲート証拠は保持された履歴であり、決して合格の証拠ではなく、それに依然として依存する完了済みタスクはチェッカーによって報告されます。チェックが実際には実行されなかったことをその文章自身が認めている合格レコード(たとえば「一度も入らなかった」「実行されなかった」「測定できない」)は矛盾であり、同じように報告されます——それ自身のログがまだ `Status: pending` と読める完了状態のタスクも同様です。これを超えるナラティブな矛盾——結論が自身のチェックリストと食い違う報告——は人間のレビュアーを必要とします。チェッカーが報告するのは記録が述べていることであり、散文が意味することではありません。ユーザーは、記録された権限とともに、限定された例外を明示的に受け入れることが MAY あります。無人での事前承認が、中核目標を放棄する包括的な許可になることは決してなく、満たすことのできない必須基準はブロッカーであり、完了した作業では決してありません。

## スキーマのバージョニング

両スキーマは URL でバージョン管理されます。バージョン内での追加フィールドは許可されます。フィールドの名前変更または型変更には新しいスキーマバージョンと仕様の変更ログへの移行メモが必要です。この改訂では両スキーマに `/v2.json` を導入します。タスクエントリーの `file` フィールドは型付きの `locator`（`{"kind": "file" | "inline", "value": ...}`）になり、マニフェストは `plan_format` を獲得し、状態ファイルは `format`、`materialization`、`approval`、`promotion` を獲得します — これらは合わせて Lite 計画が必要とするフィールドです（[Lite 計画](/spec/lite-plans) を参照）。`/v1.json` のマニフェストと状態ファイルは引き続き有効であり、静かに v2 へ書き換えられることは決してありません。`refine` セッションが意図的にそれを移行することは MAY あります。マニフェストの `spec_version` フィールドは、計画が作成された DWP 仕様のバージョンを固定します。インストール済みの仕様より新しい計画に遭遇したエージェントは、推測するのではなく、その旨を述べるべきです（SHOULD）。
