---
title: "DWP v8：spec-first と閉じたループ"
description: "Deep Work Plan v8 は spec-first、リポジトリ harness、Loop engineering、測定効率で計画完了を支えます。"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: ja
order: 0
featured: true
sourceLabel: "タグ付きリリースと v8 契約ドラフト"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 は spec-first 開発、エージェントの harness としてのリポジトリ、Loop engineering、測定可能な効率をまとめます。作業文は「Spec-first、ループを閉じる：リポジトリが harness となり、計画は完了まで自走する」です。

## 4つの柱

1. **Spec-first**：計画と仕様を永続的な情報源とし、明確な受け入れ基準と検証ゲートを設けます。2. **リポジトリが harness**：コンテキスト、ツール、制御ルール、再開可能な状態をコードと共に置きます。3. **Loop engineering**：承認済み計画は記録されたライフサイクルに沿って完了まで進みます。4. **測定可能な効率**：フローごとの指示バイト数と公開測定手順を示し、トークン割合は推定しません。

## Loop engineering とは

計画にはリードと順序付き後継者を登録します。人が任意の Herdr daemon を herdr-peers autopilot --loop で起動します。通知は新しい権限を与えず続行を促し、リード不在時は登録済み後継者に引き継ぎを求めます。計画イベントはパックの Dailybot 通知機能に送れ、fleet は有効なマシンのエージェントと計画を示します。起動は人が行い、Herdr addon は任意です。

## 機能を担うリリース

パック v7.11.0 の強化と v7.12.x の計画登録・通知が計画側の機能を提供します。herdr-peers v1.3.x はループ、レポート、fleet を追加し、v2.0.0 は protocol 2 brain とキュー読み取り機能を追加します。coding-agents-kit v1.3.0 は pick-v2、v1.4.0 は検証済み更新機能を提供します。タグ付きリンクは上記のとおりです。addon は任意です。

## v8 契約 — RE-VERIFY AT 8.0.0

origin/feat/v8-line のドラフトは plan-contract/v8 に autonomy を追加し、停滞上限、通知可能な pane、通知先、brain の実行可否、キュー動作を記録します。また .dwp/queue.json 向けに dwp-queue-v1 を定義します。パックがキュー状態を書き、Herdr が読み取ります。公開前にタグ付き 8.0.0 成果物で再確認します。
