---
title: アドオン
description: "オプションの DWP 拡張：4 つの出荷済みアドオン（devcontainer、Dailybot、dependency-upgrade、design-system）、アドオン契約、およびキット概念（スキル、エージェント、プリセット、アダプター、例）。"
order: 5
lang: ja
section: Addons
---

# アドオン

**バージョン 2.0。** アドオンはコア Deep Work Plan 方法論へのオプション拡張です。**適合に決して不要**——アドオンがゼロのリポジトリも完全に AI-first で DWP 適合です。各アドオンはオンボーディング中に提供され、明示的に受け入れまたは拒否され、——受け入れた場合——既存セットアップを上書きせず**調和**します。

## アドオン契約

出荷済みの各アドオンは 4 つの必須コンポーネントを提供します：

| コンポーネント | 目的 |
|----------------|------|
| **Spec** | アドオンが提供するものと「このアドオンに適合」の意味を RFC-2119 で規範的に記述 |
| **Reasoning templates** | エージェントが対象リポジトリのスタックについて推論して埋めるガイド——コピペではない |
| **Onboarding hook** | 開発者が受け入れたとき `onboard` フローが呼ぶ `SKILL.md` エントリポイント |
| **Validation step** | アドオンが正しく適用されたことを確認するチェックリスト |

発見：`onboard` フローは `skills/deepworkplan/addons/` を列挙し、コアスキャフォールディング後の**フェーズ 7b**で各アドオンをオプトインステップとして提示。

## 出荷済みアドオン（4 つ）

現在 4 つのアドオンが出荷されています。各々に**キットカタログページ**（ユーザー向け詳細）と Deep Work Plan スキル内の**規範スペック**があります。

### Devcontainer（第 1 アドオン）

検出されたスタックから推論した compose ベースの `.devcontainer/` + `docker/` セットアップ。

- **キットページ：** [Devcontainer](/kit/devcontainer)
- **追加内容：** 永続 AI-CLI 認証ボリューム（Claude、Codex、Cursor、gh、Dailybot）、`dailybot-project-network`、`DOCKER_DEV_ENV=vscode`、検証エイリアス（`codecheck`、`check`、`fix`、`test`）、公開 OSS のシークレット衛生
- **動作：** 約 85% 安定スケルトン；約 15% スタックごとに推論。既存 devcontainer は調和され、上書きされない
- **提供タイミング：** Docker または分離開発コンテナが有益なサービスを持つほとんどのリポジトリ

### Dailybot（第 2 アドオン）

エージェント進捗可視化のための開発者の **Dailybot チーム**へのオプトイン接続。

- **キットページ：** [Dailybot](/kit/dailybot)——完全な能力リファレンス
- **DWP アドオンが接続するもの：** dailybot `report` サブスキル経由の 4 つのプランライフサイクルレポート（kickoff、significant task、blocked、completion）；オプションの決定論的フック強制（`dailybot hook`、CLI `>= 3.7.0`）
- **ペアスキル：** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)（現在 **3.10.3**）のインストールで **14 の能力**——Slack/Teams/Discord/Google Chat チャット、チェックイン、フォーム作成、Ask AI、kudos、リポジトリごとの API キー（`.dailybot/env.json`）、メールなど。DWP アドオンは **report** のみ接続；他の能力は Dailybot スキルを直接呼び出す
- **認証：** Dailybot スキルに完全委譲（`dailybot login` または `DAILYBOT_API_KEY`）；このアドオンは認証情報を保存しない
- **ベンダーニュートラルガードレール：** コア DWP は Dailybot 依存**ゼロ**；全員に自動インストールしない
- **提供タイミング：** 開発者またはチームが既に Dailybot を利用、またはチームレポートを明示的に要求

### Dependency upgrade（第 3 アドオン）

パッケージマネージャー非依存、バッチ化、検証済み、元に戻せる依存関係アップグレード。

- **キットページ：** [Dependency upgrade](/kit/dependency-upgrade)
- **追加内容：** リポジトリの**実際の**マネージャーを検出（npm/pnpm/yarn + ncu、pip/poetry/uv、cargo、go mod、bundler、composer…）、semver 分類バッチでアップグレード、各バッチ後にリポジトリの検証ゲートを実行、失敗バッチを元に戻し、自動コミットせずに要約
- **コマンド：** 受け入れ時のみ `.agents/commands/` に `/lib-upgrade` をインストール
- **提供タイミング：** ロックファイルがあり依存関係が多いスタック；関連時のみ推奨

### Design system（第 4 アドオン）

インターフェース表面にスコープされた `DESIGN.md`。任意のコーディングエージェントが一貫した UI、CLI、会話出力のために読む。

- **キットページ：** [Design system](/kit/design-system)
- **追加内容：** `docs/DESIGN.md`（`AGENTS.md` から参照）、1 ファイルに最大 3 **プロファイル**を積み重ね：**visual-ui**（レンダリング UI トークンとコンポーネント）、**cli-output**（セマンティック端末スタイル、TTY/`NO_COLOR` 劣化）、**conversational**（声、メッセージ構造、プラットフォーム別レンダリングとプレーンテキストフォールバック）
- **プロファイル強度：** visual-ui は検出時**デフォルトオン**；cli-output と conversational は検出時**推奨、常に確認、自動適用しない**
- **提供タイミング：** ユーザー向けインターフェース表面が検出された場合のみ——純ライブラリ、ヘッドレスサービス、インフラのみのリポジトリには提供しない

## スキル

スキルは名前で呼び出す再利用可能な手順。スキルは反復可能なワークフロー（テスト実行、lint 修正、コンポーネント作成）をパッケージ化します。

方法論は少数のコアサブスキルを出荷。うち **author** サブスキルはリポジトリが**独自のキットを育てる**ことを可能に：`/skill-create` と `/agent-create` 経由で呼び出され、既存の `.agents/` レイアウトと規約について推論し、それに合う新スキル、エージェント、または薄いコマンド委譲を作成し、カタログを同期。同じサブスキルが必須の Skills & Agents Discovery タスクを実行。

キットエントリ：[Skill create](/kit/skill-create)、[Agent create](/kit/agent-create)。

## エージェント

エージェントは定義された役割を持つ専門ワーカー（reviewer、executor、architect）。`.agents/agents/` にあり、`.agents/docs/` にカタログ化。

## メンテナンスアドオン

上記の **dependency-upgrade** アドオンが主要なメンテナンスアドオン。npm を仮定せずリポジトリの実際のパッケージマネージャーを推論し、semver でアップグレードを分類、安全なバッチでアップグレード、各バッチ後に検証を実行、失敗したバッチを元に戻す。

## Design-system アドオン

出荷済みアドオンの [Design system](/kit/design-system) を参照。リポジトリレベルの `DESIGN.md` は機能別の技術設計ドキュメントとは異なる：DWP のプラン README、タスク受け入れ基準、検証ゲートが既に機能別設計をカバー。design-system アドオンは永続的なリポジトリネイティブの**インターフェース**設計コンテキストを埋める。

## プリセット

プリセットは DWP を特定の技術スタック（Django、React、Go、Astro + Svelte など）に適応。[キットカタログ](/kit)を参照。

## アダプター

アダプターは DWP コマンドを特定エージェントのコマンドシステム（Claude Code、Cursor、Codex、Gemini、Copilot、OpenClaw など）にマップ。アダプターエントリは各エージェント名の下のキットにあります。

## 例

例は DWP の実践を示す：前後比較、サンプルプラン、ケーススタディ。[Examples](/examples) と [Dogfood this site](/kit/dogfood-this-site) を参照。

## 適合リマインダー

リポジトリはアドオン**ゼロ**で完全適合**しなければならない**（MUST）。アドオンは層状のオプトイン能力——前提条件ではない。[Conformance](/spec/conformance) を参照。
