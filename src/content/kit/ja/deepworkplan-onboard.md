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
7. オプトイン式のアドオンを提案し、その後セルフチェックする。

## 補足

リポジトリはアドオンがゼロでも完全に適合します。検出された現実は、常にプリセットの前提に優先します。
