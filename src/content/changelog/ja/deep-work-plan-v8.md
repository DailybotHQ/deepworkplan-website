---
title: "DWP v8：spec-first と閉じたループ"
description: "Deep Work Plan v8 は spec-first、リポジトリ harness、Loop engineering、測定効率で計画完了を支えます。"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: ja
order: 0
featured: true
sourceLabel: "Skill リリース v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill リリース v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Skill リリース v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Skill リリース v8.0.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.3"
  - label: "LOOP_ENGINEERING.md（v8 規範）"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "仕様リーダーの Loop engineering"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "plan-contract/v8 スキーマ"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "journal-event/v8 スキーマ"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "plan-snapshot/v8 スキーマ"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "計画キューの書き込み元（shared/queue.py）"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill リリース v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill リリース v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill リリース v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 は、spec-first 開発、エージェント harness としてのリポジトリ、Loop engineering、測定可能な効率という4つの考え方をまとめます。作業文は「Spec-first, loop-closed: リポジトリが harness となり、計画は完了まで自走する」です。

## 4つの柱

1. **Spec-first。** 計画と仕様を永続的な情報源とし、明確な受け入れ基準と検証ゲートを設けます。
2. **リポジトリが harness。** コンテキスト、ツール、制御ルール、再開可能な状態をコードと共に置き、異なるエージェントが同じリポジトリで作業できるようにします。
3. **Loop engineering。** 承認済み計画は、記録されたライフサイクルに沿って完了まで進められます。
4. **測定可能な効率。** フローごとの指示バイト数と公開された測定手順で効率を示し、トークン割合は推定しません。

## Loop engineering とは

計画にはリードと順序付き後継者を登録します。人が任意の Herdr daemon を `herdr-peers autopilot --loop` で起動します。通知は新しい権限を与えず、リードに続行を促します。リードが不在の場合、登録済み後継者に引き継ぎを求められます。計画イベントはパックの Dailybot 通知機能に送信でき、fleet ビューは有効なマシンのエージェントと計画を表示します。daemon は人が起動し、Herdr addon は任意です。

## 機能を担うリリース

パック v7.11.0 の強化と、v7.12.x の計画登録・通知リリースが計画側の機能を提供します。herdr-peers v1.3.x はループ、レポート、fleet ビューを追加し、v2.0.0 は protocol 2 の brain とキューコンシューマーを追加します。coding-agents-kit v1.3.0 は pick-v2 起動契約を提供し、v1.4.0 は検証済みアップデーターを追加します。herdr-peers v2.1.0 は v8 の構造化 blocker を読み取り、coding-agents-kit v1.5.0 は報告された値だけを扱うトークン計測を追加します。パック 8.0.0 の addon 記述子は herdr-peers v2.1.0、coding-agents-kit v1.5.0、devcontainer-kit v1.3.0 を固定します。タグ付きリリースは上にリンクしています。これらの任意 addon がなくてもパックを利用できます。

## v8 契約

リリース 8.0.0 は DWP 標準 8.0.0 を実装します。新しい計画は `plan-contract/v8` で作成します。v7、v6、v5 の計画は記録済み世代を保持し、明示的な `refine migrate` でのみ移行します。v8 計画でも `plan-manifest/v7` の系列を維持し、既存計画向けの `journal-event/v7` を引き続きサポートします。規範となる文書は `LOOP_ENGINEERING.md` で、公開済みスキーマが3つあります。

- **`autonomy` ブロック。** `plan-contract/v8` の任意かつ閉じたブロックで、計画のループ権限を記録します。`stall_budget`（1–10、既定値3）、`promptable` pane（既定値はリードのみ）、`notify` 先（既定値なし）、`brain`（既定値 `false`）、`queue`（`prompt-lead`、`launch`、`none`、既定値 `none`）を含みます。ブロックがない場合はすべて既定値となり、解決者は人です。
- **構造化 blocker。** blocker は `journal-event/v8` の `blocker` イベントで、ledger helper を介してのみ起票・解決します。タスク、理由、1行の `needs`、必須の C1〜C7 クラス、任意の resolver を含みます。C1、C2、C5、C6 では `resolver: lead` を拒否し、計画自身が `resolver: lead` と記録した blocker だけをリードに解決依頼します。`state.json` は `plan-snapshot/v8` となり、アクティブな blocker と派生した `blocked` 状態を含みます。`PROGRESS.md` は目標、現在のタスク、次のアクション、必要事項の4行ヘッダーで始まります。
- **計画キュー。** `.dwp/queue.json`（`dwp-queue-v1`）を書き込めるのはパックの `shared/queue.py` または人だけです。承認時に `create` が計画を追加し、Herdr daemon は読み取りのみです。キューは最大64計画を保持し、`parallel: true` の指定がなければリポジトリごとに一度に1計画を実行します。キューが破損してもライフサイクルは中断しません。

v7 の最終リリースは **7.12.2** です。

インストール済みスキルのリリースは **8.0.3** です。
