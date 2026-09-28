---
title: "DWP v6：同じ方法論、より厳格な契約"
description: "Deep Work Plan v6 は v5 の方法論を維持し、より厳格な実行構造を加えます。エージェント成果の非劣性は測定されていません。"
date: 2026-09-28
version: "v6 · より厳格な構造"
kind: release
lang: ja
order: 0
featured: true
sourceLabel: "公開済み v6 スキーマ一式"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 は v5 の方法論、コマンド面、`.dwp/plans/` の配置を維持します。計画の権限、実行証拠、タスクごとのコンテキスト、スケジューリング、ライブ状態を表す構造を厳格化します。

v6 スキーマ一式は、識別マニフェスト、成果と権限の契約、追記専用ジャーナルイベント、タスクごとのコンテキストマニフェスト、ライブスナップショットを定義します。v6 のライブ投影はスナップショットなので、`plan-state/v5.json` は v5 計画の state スキーマとして維持されます。`plan-state/v6.json` はありません。既存計画は記録済みの世代を保ち、暗黙に書き換えられません。

アーキテクチャ判断は GO です。v6 は同じ方法論を維持し、より厳格なエンジニアリング構造を採用します。これは経験的な優越性の主張ではありません。エージェント成果の非劣性は測定されていません。

新しい計画には、3桁以上の単調増加する数値 ID を付けます（例：`PLAN_001_add_payment_webhooks/`）。凍結された v5 スキーマでは数値 ID も1語として数えるため、v5 の slug は2〜4語、v6 の slug は2〜5語です。既存の番号なし `PLAN_<slug>/` フォルダーは引き続き読み取り可能で、名前は変更しません。番号付き計画がある場合、`latest` は数値 ID が最も大きい計画を指します。

インストール済みスキルのリリースは **6.0.1** です。6.x パックは新しい計画を既定で v6 として作成します。既存の計画は記録された世代を維持し、移行には明示的な事前確認付き依頼が必要です。
