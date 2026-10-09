---
title: deepworkplan-onboard
description: "リポジトリのスタックとアーキタイプを推論し、適応された AGENTS.md、docs/、.agents/、そして gitignore された .dwp/ を生成することで、リポジトリを AI-first にする。"
kind: command
lang: ja
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

リポジトリを AI-first で仕様駆動のコードベースに変えます。これは Deep Work Plan スキルの onboard サブスキルです。

## 何をするか

`deepworkplan-onboard` は**実際の**リポジトリ、すなわち言語、フレームワーク、パッケージマネージャー、ビルド／テスト／リントのコマンド、モジュール、テスト規約、デプロイの形を調べ、それに適応した成果物を生成します。推論するのであって、テンプレートをコピーしたりプレースホルダーを残したりすることは決してありません。

## 使い方

```
/deepworkplan-onboard
```

## 振る舞い

1. 偵察 — 実際のスタックと検証コマンドを検出し、最も近いオンボーディングプリセットを照合する。
2. アーキタイプ — 個別リポジトリかオーケストレーターハブかに分類する。
3. 実際の Quick Commands ブロックを備えた `AGENTS.md` と `CLAUDE.md` シンボリックリンクを生成する。
4. `docs/`（アーキテクチャ、規約、テスト、セキュリティなど）とモジュールごとのドキュメントを生成する。
5. `.agents/`（エージェント、薄い `dwp-*` コマンド、スタックに合ったスキル、カタログ）と `.claude → .agents` を生成する。
6. スキルをインストールし、gitignore された `.dwp/`（plans、drafts）と `tmp/` スクラッチ領域を整備する。
7. 必須の AI Diff Reviewer ローカルレビューをインストールし、オプトイン式のアドオンを提案し、その後セルフチェックする。

## 補足

リポジトリはオプションアドオンがゼロでも完全に適合します。標準 2.3.0 以降、AI Diff Reviewer ローカルレビューはベースラインの一部です。検出された現実は、常にプリセットの前提に優先します。

## v6 スキーマ参照

v6 計画の機械可読スキーマ一覧は、次の安定した URL で公開されています。v6 のライブ投影はスナップショットであり、`plan-state/v6.json` はありません。既存の v5 計画は引き続き v5 の state スキーマを使用し、古い計画が暗黙に書き換えられることはありません。

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

現在の 7.x パックは新しい計画を既定で v7 として作成します。既存の計画は記録された世代を維持し、移行には明示的な依頼が必要です。新しい計画には、3桁以上の単調増加する数値 ID を付けます（例：`PLAN_001_add_payment_webhooks/`）。凍結された v5 スキーマでは数値 ID も1語として数えるため、v5 の slug は2〜4語、v7 の slug は2〜5語です。既存の番号なし `PLAN_<slug>/` フォルダーは引き続き読み取り可能で、名前は変更しません。番号付き計画がある場合、`latest` は数値 ID が最も大きい計画を指します。
