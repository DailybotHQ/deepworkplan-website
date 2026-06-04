---
title: "クイックスタート — Deep Work Plan"
description: "スキルをインストールし、リポジトリをオンボーディングし、どのエージェントでも計画して実行する。リポジトリを仕様駆動でエージェントが操縦できる状態にする手順。"
lastUpdated: 2026-05-31
---

## クイックスタート

スキルをインストールし、リポジトリをオンボーディングし、どのエージェントでも計画して実行する。リポジトリを仕様駆動でエージェントが操縦できる状態にする手順です。

## 採用への道のり

### 1. Deep Work Plan スキルをインストールする

スキルをリポジトリに追加します。ルーターと八つのサブスキル、すなわち create、execute、refine、resume、status、verify、onboard、author を備えます。最速の方法には Skills CLI を使います。

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

または、リポジトリをクローンし、git とシェルが使える環境でセットアップを実行します。

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. リポジトリをオンボーディングする

onboard サブスキルを実行し、エージェントに実際のリポジトリ、すなわちスタック、パッケージマネージャー、実際の検証コマンドを推論させます。

```bash
/deepworkplan-onboard
```

`AGENTS.md`、`docs/` のナレッジベース、モジュールごとのドキュメント、そしてエージェント横断の `.agents/` 拠点（`.claude → .agents` シンボリックリンクつき）を生成し、薄い `dwp-*` コマンドを配線し、計画とドラフトのための gitignore された `.dwp/` を整備します。テンプレートは一切なく、すべてがリポジトリに適応されます。

### 3. キットを進化させ、アドオンを受け入れる

`/skill-create` と `/agent-create`（author サブスキル）を使って、スタックに合ったスキル、エージェント、コマンドを育てます。オンボーディングは三つのオプトイン式アドオン（devcontainer、Dailybot、dependency-upgrade）も提案します。適合する場合にのみ受け入れてください。リポジトリはアドオンがゼロでも完全に適合します。

### 4. 計画して実行する

Deep Work Plan を生成し、タスクごとに実行します。

```bash
/dwp-create <goal>
/dwp-execute
```

作業の進行に応じて `/dwp-status`、`/dwp-refine`、`/dwp-resume` を使います。各計画には番号つきのタスク、検証ゲート、完了プロトコルが含まれ、作業は構造化され、セッションをまたいで再開できる状態に保たれます。

## 成果

リポジトリが仕様駆動でエージェントが操縦できる状態になります。計画が永続的な信頼できる情報源となり、リポジトリそのものが、どのエージェントも照らして走るハーネスになります。

- [方法論を読む](/methodology)
- [仕様を見る](/spec)
- [キットを見る](/kit)
