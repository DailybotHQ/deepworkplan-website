---
title: アドオン
description: "DWP アドオン：4 つのオプトイン拡張機能（devcontainer、Dailybot、dependency-upgrade、design-system）、必須となった AI Diff Reviewer ローカルレビューとそのオプションの CI サーフェス、アドオン契約、およびキットの基本概念（skills・agents・presets）を説明します。"
order: 6
lang: ja
section: Addons
---

# アドオン

**バージョン 4.0.0。** アドオンはコア Deep Work Plan 方法論への拡張機能です。5 つのうち 4 つはオプションであり、**適合に決して不要**——オプションアドオンがゼロのリポジトリも完全に AI-first で DWP 適合です。各オプションアドオンはオンボーディング中に提供され、明示的に受け入れまたは拒否され、——受け入れた場合——既存セットアップを上書きせず**調和**します。1 つのコンポーネントだけが明言された例外です：標準 2.3.0 以降、**AI Diff Reviewer ローカルレビュー**は必須ベースラインの一部であり——オンボーディングがそれをインストールし、すべての Final Review がそれを実行します——CI サーフェスのみがオプトインのままです。

## アドオン契約

出荷済みの各アドオンは 4 つの必須コンポーネントを提供します：

| コンポーネント | 目的 |
|----------------|------|
| **Spec** | アドオンが提供するものと「このアドオンに適合」の意味を RFC-2119 で規範的に記述 |
| **Reasoning templates** | エージェントが対象リポジトリのスタックについて推論して埋めるガイド——コピペではない |
| **Onboarding hook** | 開発者が受け入れたとき `onboard` フローが呼ぶ `SKILL.md` エントリポイント |
| **Validation step** | アドオンが正しく適用されたことを確認するチェックリスト |

発見：`onboard` フローは `skills/deepworkplan/addons/` を列挙し、コアスキャフォールディング後の**フェーズ 7b**で各アドオンをオプトインステップとして提示。

## 出荷済みアドオン（5 つ）

現在 5 つのアドオンが出荷されています——4 つのオプションと、必須のローカルレビューです。各々に**キットカタログページ**（ユーザー向け詳細）と Deep Work Plan スキル内の**規範スペック**があります。

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
- **提供タイミング：** 宣言された依存関係を持つすべてのリポジトリに提供；不活性な `/lib-upgrade` デリゲーターは、明示的に拒否されない限りオンボーディングの同意の下でインストールされる — インストール自体はアップグレードを実行しない

### Design system（第 4 アドオン）

インターフェース表面にスコープされた `DESIGN.md`。任意のコーディングエージェントが一貫した UI、CLI、会話出力のために読む。

- **キットページ：** [Design system](/kit/design-system)
- **追加内容：** `docs/DESIGN.md`（`AGENTS.md` から参照）、1 ファイルに最大 3 **プロファイル**を積み重ね：**visual-ui**（レンダリング UI トークンとコンポーネント）、**cli-output**（セマンティック端末スタイル、TTY/`NO_COLOR` 劣化）、**conversational**（声、メッセージ構造、プラットフォーム別レンダリングとプレーンテキストフォールバック）
- **プロファイル強度：** 検出で提供が必須となり、インストールは受け入れでゲート（ガイドモードでもトラストモードでも同様）— visual-ui は検出時**強く推奨**；cli-output と conversational は検出時**推奨、常に確認、自動適用しない**
- **提供タイミング：** ユーザー向けインターフェース表面が検出された場合のみ——純ライブラリ、ヘッドレスサービス、インフラのみのリポジトリには提供しない

### AI Diff Reviewer（第 5 アドオン——必須ローカルレビュー、オプション CI サーフェス）

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（marketplace **"AI Diff Reviewer"**、現在のバージョン **v2.0.1**）は、必須の Final Review セキュリティパスに構造化されたローカルレビューを与え、オプションで CI 内の pull request をゲートします。標準 2.3.0 以降、**ローカルレビューはベースラインの一部**です；オプションなのは CI サーフェスだけです。

- **キットページ：** [AI Diff Reviewer](/kit/ai-diff-reviewer) — 完全な機能リファレンス
- **オンボーディングで必須（フェーズ 7a）：** オンボーディングの同意の下で、タグ固定の vendored スキル（`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.1 --skill ai-diff-reviewer -y`）と、`generate-extension` 経由のリポジトリ調整 `.review/extension.md` をインストール；欠落時は対象を絞ったハーネスアップグレードが両方を調和；拒否は明言された例外として記録され、インストールされるまで `verify` が報告し続ける
- **すべての Final Review で必須：** セキュリティパスが累積変更セットに対して upstream 親デフォルトフローを実行し、その出力をプランローカルの `analysis_results/SECURITY_REVIEW.md`（プラン自身のフォルダー内であり、リポジトリルートではない）に追記；スキルまたは拡張の欠落は `local reviewer not installed` の発見として記録され——黙ってスキップされることは決してなく、決してサプライズブートストラップでもない：インストールはオンボーディングの同意または明示的なアドオン呼び出しに属する；完了したパスからの `critical` 結果は、修正または明示的に受け入れられるまで完了を阻止する
- **オプションの CI サーフェス（Flow B）：** upstream `setup` サブスキル経由の `pr-review.yml`（`DailybotHQ/ai-diff-reviewer@v2`）に加え、開発者が呼び出すコンパニオンとしての `apply-review`——明示的に提供され、無断ではインストールされず、デフォルトにされることなく、プランタスクには決してならない
- **決してブロックしない（呼び出しのみ）：** 開始できたにもかかわらずエラーになったローカルレビューは、一度警告して記録し、続行；その失敗でタスクを落とすことは決してない
- **同等性（Flow B）：** 共有 `prompt.md` + 拡張が方法論/深刻度を整合；CI のイテレーション認識レビューでローカルパスを完全に保ちながらラウンド 2+ を短縮できる
- **ベンダー中立ガードレール：** どの Deep Work Plan フローも商用サービス、CI プロバイダー、シークレットを一切必要としない——レビューアーは開発者自身のコーディングエージェントが実行する、MIT ライセンスのタグ固定スキルである
- **適合性：** 標準 2.3.0 以降を宣言するリポジトリでは `verify` はローカルレビューアーの欠落を失敗として報告し、レガシーリポジトリではハーネスバージョンの発見として報告する

## スキル

スキルは名前で呼び出す再利用可能な手順。スキルは反復可能なワークフロー（テスト実行、lint 修正、コンポーネント作成）をパッケージ化します。

方法論は少数のコアサブスキルを出荷。うち **author** サブスキルはリポジトリが**独自のキットを育てる**ことを可能に：`/skill-create` と `/agent-create` 経由で呼び出され、既存の `.agents/` レイアウトと規約について推論し、それに合う新スキル、エージェント、または薄いコマンド委譲を作成し、カタログを同期。同じサブスキルが Final Review のスキルの決定の突き合わせを支える。

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
