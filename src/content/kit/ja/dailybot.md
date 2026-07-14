---
title: Dailybot
description: "オプトインの DWP アドオン：プランライフサイクルを Dailybot チームに接続し、オプションのフック強制と、完全な Dailybot エージェントスキル 3.10.3（チャット、チェックイン、フォーム、Ask AI など）を提供します。"
kind: addon
lang: ja
order: 2
---

# Dailybot アドオン

Deep Work Plan の実行を **Dailybot チーム**に接続し、エージェントが何を構築しているかを人間が把握できるようにします——キックオフ、プラン途中の進捗、ブロッカー、完了——ミーティングや第二のツールチェーンを追加することなく。[Dailybot](https://www.dailybot.com) を既に利用しているチーム向けの**オプトイン**アドオンです。

コアの Deep Work Plan 方法論は Dailybot への依存が**ゼロ**です。アドオンがゼロのリポジトリも完全に適合します。開発者またはチームが既に Dailybot を利用している場合にのみこのアドオンを提供し、全員に自動インストールしてはいけません。

## いつ使うか

| シグナル | アクション |
|----------|------------|
| チームが既に Dailybot を利用（Slack、Teams、Discord、Google Chat、またはダッシュボード） | オンボーディング中に**推奨** |
| 開発者がエージェントの進捗可視化やスタンドアップ形式の更新を求める | アドオンを**提供** |
| Dailybot アカウントのないグリーンフィールドリポジトリ | **スキップ**——ベンダーニュートラルなベースラインで十分 |
| 進捗をリポジトリ外に出してはいけない NDA 下のクライアント作業 | **スキップ**、または `.dailybot/disabled` をコミットしてローカルキルスイッチに |

## このアドオンが接続するもの（意図的に狭い設計）

DWP Dailybot アドオンは Dailybot を**再発明しません**。プラン実行を dailybot **`report`** サブスキルに接続し、オプションで harness フックをコミットします。それ以外——インストール、同意、認証、文体——はすべて公式 [Dailybot エージェントスキル](https://github.com/DailybotHQ/agent-skill)（現在 **3.10.3**）に**委譲**されます。

### 4 つのライフサイクルイベント

DWP `create` / `execute` 中、アドオンは**4 つのベストエフォートのエージェント更新**を接続します。各イベントは条件付き（Dailybot が存在し認証済み）、非ブロッキングで、`.dailybot/disabled` を尊重します。

| イベント | トリガー | レベル | 要件 |
|----------|----------|--------|------|
| **Kickoff** | プランが具体化・承認されたとき、または最初の `execute` ターン | regular | SHOULD |
| **Significant task** | 機能、バグ修正、または大規模リファクタが完了——セットアップの雑務ではない | regular | MAY |
| **Blocked** | プランが停止；`state.json.blocked` が設定（`reason`、`needs`） | regular + blockers | SHOULD |
| **Completion** | 全タスク完了；プラン終了 | **milestone** | SHOULD |

プレゼンスがある場合、ペイロードはプランの状態レイヤー（`state.json`）から派生：`completed` は成果（タスク番号ではない）、`in_progress` は現在のタスクから、`blockers` は `state.json.blocked` から。メッセージは**何を構築し、なぜか**を記述——ファイルパス、git 統計、ブランチ名、プラン ID は決して含めない。

### オプションのフック強制

`dailybot-cli >= 3.7.0` で、アドオンはリポジトリレベルの harness フック（`dailybot hook session-start | activity | post-commit | stop | dismiss`）を**コミットしてもよい**。ローカルのリポジトリごとの台帳で支えられる。ライフサイクルイベントを見逃したとき、harness がターン終了時にエージェントにリマインド——プロンプト指示が薄れる長時間の無人セッションで重要。

成功したライフサイクルレポートはフック台帳を**リセット**するため、二重レポートは起きない。フックコマンドはローカル状態のみを読み、常に `0` で終了。

### リポジトリ ID とレポートポリシー

オプションで `.dailybot/profile.json`（またはテンプレートとして `.dailybot_example/profile.json`）をコミットし、全コントリビューターとエージェントが同じ方法でレポートに署名する。そのファイルに認証情報を**決して**入れない——`key` フィールドはハードエラー。

同じファイルにフックが尊重するレポートポリシーを載せられる：

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` は研究型やドキュメント重視のリポジトリに特に有用：コミット以外の作業（分析、設計ドキュメント、プラン）がより早くナッジされる。

## インストール（すべてオプトイン）

アドオンはインストールパスを**提供**する。Dailybot スキルが同意と検証を所有する。

| コンポーネント | コマンド / パス |
|----------------|-----------------|
| **Dailybot エージェントスキル**（推奨） | `npx skills add DailybotHQ/agent-skill` |
| **既存スキルの更新** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git クローン** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI**（最低 `>= 3.7.0`） | 初回利用時にスキルが検証済み `shared/auth.md` 経由でインストール；または `pip install 'dailybot-cli>=3.7.0'`、Homebrew、または [cli.dailybot.com](https://cli.dailybot.com) のチェックサム検証インストーラー |

バージョン確認：`dailybot --version` と `dailybot version --check`。アップグレード：`dailybot upgrade`。

## 認証——委譲

このアドオンはメール、OTP、API キーを**決して**求めず、認証情報を**決して**保存しない。認証は Dailybot スキルの [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) が所有：

- `dailybot login`（メール OTP）、
- `DAILYBOT_API_KEY` / `dailybot config key=...`、または
- オプトインで gitignore された `.dailybot/env.json` のリポジトリごとのキーファイル（`dailybot env add/use`、CLI `>= 3.7.0`）——開発者はリポジトリごとに異なる組織にサインインできる。

認証解決は **Bearer 優先**：セッショントークンが優先され、`401`/`403` 時に透過的な Bearer→API キーのリトライを行うため、古いトークンが有効なキーをブロックすることはない。認証が拒否または利用不可の場合、レポートは静かにスキップ——作業は継続。

## ペアの Dailybot スキル——14 の能力（3.10.3）

Dailybot エージェントスキルのインストールは、DWP アドオンが接続する以上のものをもたらす。公式スキルパック（スキル **3.10.3**、CLI ベースライン **>= 3.7.0**、現在の公開 **3.7.3**）は**14 の協調サブスキル**を公開：

| サブスキル | 機能 |
|------------|------|
| **Progress reports** | Dailybot ダッシュボードへのスタンドアップ形式のエージェント更新 |
| **Ask the AI** | Dailybot AI アシスタントへのワンショット・ヘッドレスクエリ |
| **Message polling** | セッション開始時またはアイドル時にチーム指示を確認 |
| **Email** | 送信前の必須安全チェック付きメール送信 |
| **Chat** | Slack、Microsoft Teams、Discord、Google Chat での送信・編集——チャンネル、DM、チーム、レポート形式スレッド、ユーザーとして送信（Slack、管理者） |
| **Conversations** | ボットと指定チームメイトとの Slack グループ DM を開くか再利用；同一呼び出しでレポート投稿 |
| **Health and status** | 長時間セッション向けのエージェントオンライン/オフライン告知 |
| **Check-ins** | スタンドアップ完了；チェックインの**作成**（スケジュール、参加者、質問、リマインダー、AI 設定） |
| **Kudos** | チームメイトまたはチーム全体を表彰；認識フィード、組織フィード、殿堂を閲覧 |
| **Teams** | チーム一覧、メンバー確認、名前から UUID 解決；`me`、`org`、ユーザープロフィール |
| **Forms** | フォームの一覧（デフォルトで**組織スコープ**、`--mine` と `--owner` で絞り込み）、送信、更新、遷移；フォームの**作成**（ワークフロー状態、権限、ChatOps）；ページネーション、検索、日付フィルター |
| **Workflows** | 組織ワークフローの読み取り（`workflow list` / `workflow get`；読み取り専用） |
| **Report channels** | フォームやチェックイン用のチャンネル UUID を発見 |
| **Per-repo API keys** | `.dailybot/env.json` を管理——環境ごとの API キー + URL のオプトインで gitignore されたファイル（`dailybot env add / use / show / list / remove / off / on`、CLI `>= 3.7.0`） |

**DWP アドオンは `report` のみをプラン実行に接続。** それ以外は Dailybot スキルを直接呼び出す——例：`#releases` にデプロイ概要を投稿、スタンドアップ完了、Dailybot AI にチェックイントレンドの要約を依頼。

公開リファレンス：[dailybot.com/skill.md](https://www.dailybot.com/skill.md)。ソース：[DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)。信頼モデル：スキルパック内の [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md)。

## 動作——委譲し、決してブロックしない

| ルール | 詳細 |
|--------|------|
| **委譲** | Dailybot スキルがインストール、同意、認証、フックテンプレート、文体を所有 |
| **決してブロックしない** | CLI 不在、認証失敗、ネットワークエラー → 一度警告し、主要作業を継続 |
| **リトライしない** | 診断ループに入らない；レポートはベストエフォート |
| **調和** | 既存のスキル、CLI、プロファイル、フック、レポート配線を保持——ギャップのみ埋める |
| **ベンダーニュートラル** | DWP は Dailybot を要求しない；このアドオンは追加のチーム可視性 |

## オンボーディングフロー

DWP `onboard` **フェーズ 7b** で、コア AI-first スキャフォールディングの後、4 つのオプトインアドオンを提供。開発者が Dailybot を受け入れた場合：

1. 既存セットアップを検出（スキル、CLI、`.dailybot/profile.json`、フック、レポートステップ）。
2. Dailybot の同意フロー経由でスキル/CLI インストールを提供。
3. 認証を `shared/auth.md` に委譲。
4. 4 つのライフサイクルイベントを `AGENTS.md` / `docs/AI_AGENT_COLLAB.md` に接続。
5. オプションでフック強制と `.dailybot/profile.json` を提供。
6. 検証を実行（スキルの `addons/dailybot/SPEC.md` の SPEC §8）。

Deep Work Plan スキル内の規範契約：`addons/dailybot/SPEC.md`（バージョン **2.3.0**）。

## 関連キットエントリ

- [Devcontainer](/kit/devcontainer)——Dailybot CLI 永続化付きの再現可能な開発環境（第 1 アドオン）
- [Dependency upgrade](/kit/dependency-upgrade)——バッチ化・検証済みの依存関係アップグレード（第 3 アドオン）
- [Design system](/kit/design-system)——インターフェース表面向けのエージェント向け `DESIGN.md`（第 4 アドオン）
- [Deep Work Plan onboard](/kit/deepworkplan-onboard)——アドオンを提供するオンボーディングサブスキル
