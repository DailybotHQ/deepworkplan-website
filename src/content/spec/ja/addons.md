---
title: アドオン
description: "DWP アドオン：7 つのオプトイン拡張、必須の AI Diff Reviewer ローカルレビューとそのオプションの CI サーフェス、アドオン契約、キットの概念。"
order: 6
lang: ja
section: Addons
---

# アドオン

> **バージョンの適用範囲:** 本文書は保持されている v5.0.0 の基盤文書です。現在の標準である DWP 7.0.0 では、[仕様インデックス](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/skills/deepworkplan/spec/README.md)に記載された該当する `V6_*.md` と `V7_*.md` の拡張も適用されます。既存の v5 計画と v6 計画は記録済みの規則を維持します。

**バージョン 2.1.0。** アドオンはコア Deep Work Plan 方法論への拡張機能です。8 つのうち 7 つはオプションであり、**適合に決して不要**——オプションアドオンがゼロのリポジトリも完全に AI-first で DWP 適合です。各オプションアドオンはオンボーディング中に提供され、明示的に受け入れまたは拒否され、——受け入れた場合——既存セットアップを上書きせず**調和**します。1 つのコンポーネントだけが明言された例外です：標準 2.3.0 以降、**AI Diff Reviewer ローカルレビュー**は必須ベースラインの一部であり——オンボーディングがそれをインストールし、すべての Final Review がそれを実行します——CI サーフェスのみがオプトインのままです。

## アドオン契約

出荷済みの各アドオンは 4 つの必須コンポーネントを提供します：

| コンポーネント | 目的 |
|----------------|------|
| **Spec** | アドオンが提供するものと「このアドオンに適合」の意味を RFC-2119 で規範的に記述 |
| **Reasoning templates** | エージェントが対象リポジトリのスタックについて推論して埋めるガイド——コピペではない |
| **Onboarding hook** | 開発者が受け入れたとき `onboard` フローが呼ぶ `SKILL.md` エントリポイント |
| **Validation step** | アドオンが正しく適用されたことを確認するチェックリスト |

発見：`onboard` フローは `skills/deepworkplan/addons/` を列挙し、コアスキャフォールディング後の**フェーズ 7b**で各アドオンをオプトインステップとして提示。

## 出荷済みアドオン（8 つ）

現在 8 つのアドオンが出荷されています——7 つのオプションと、必須のローカルレビューです。各々に**キットカタログページ**（ユーザー向け詳細）と Deep Work Plan スキル内の**規範スペック**があります。そのうち 4 つ——devcontainer、Herdr、DeepWorkPlan Vim、Agentkit——は、独自のリポジトリとリリースサイクルを持つ製品にタグで固定された薄いインテグレーターです。どの製品も Deep Work Plan なしで動作します。受け入れられたアドオンは `.dwp/config.json` アドオンレジストリ（DWP 7.0.0）に記録されます。このレジストリは提供や増強を行えるだけで、適合や計画をゲートすることは決してありません。

### Devcontainer（第 1 アドオン）

[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)（`dck`、`v0.2.2` に固定、インターフェース `2`）の薄いインテグレーター：`dck init` がリポジトリ自身のコンテナとしてリポジトリにレンダリングする Dev Containers テンプレートと、`dck-dockerfile` スキル。

- **キットページ：** [Devcontainer](/kit/devcontainer)
- **追加内容：** digest で固定したランタイム公式イメージから作る `docker/local/<service>/Dockerfile`（`python-3.13`、`node-24` または `debian`、共有ベースイメージなし）、`dck` ランチャー（`up`、`shell`、`rebuild`、`doctor`）の上に立つ `dev.sh`、オプトインのレイヤーとしてのコーディングエージェント、ループバック限定のポート、コンテナ内に鍵を置かずホストのエージェント経由で SSH を使う git、標準レイアウトによるコンテナごとの Herdr マシン
- **動作：** `dck doctor --json`（インターフェース 2）で検出；`dck init` は diff が承認された後にのみ既存 devcontainer を調和し、先にファイルをバックアップする——上書きされない
- **提供タイミング：** Docker または分離開発コンテナが有益なサービスを持つほとんどのリポジトリ

### Dailybot（第 2 アドオン）

エージェント進捗可視化のための開発者の **Dailybot チーム**へのオプトイン接続。

- **キットページ：** [Dailybot](/kit/dailybot)——完全な能力リファレンス
- **DWP アドオンが接続するもの：** dailybot `report` サブスキル経由の 4 つのプランライフサイクルレポート（kickoff、significant task、blocked、completion）；オプションの決定論的フック強制（`dailybot hook`、CLI `>= 3.9.0`）
- **ペアスキル：** [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)（現在 **3.23.3**）のインストールで **17 の能力**——Slack/Teams/Discord/Google Chat チャット、チェックイン、フォーム作成、Ask AI、kudos、Plan のボードとタスク、組織ラベル、リポジトリごとの API キー（`.dailybot/env.json`）、メールなど。DWP アドオンは **report** のみ接続；他の能力は Dailybot スキルを直接呼び出す
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

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（marketplace **"AI Diff Reviewer"**）は、必須の Final Review セキュリティパスに構造化されたローカルレビューを与え、オプションで CI 内の pull request をゲートします。標準 2.3.0 以降、**ローカルレビューはベースラインの一部**です；オプションなのは CI サーフェスだけです。このアドオンはリリースごとに自動更新されるため、下記に示すタグは本稿執筆時点のものであり、ベンダリング済みのコピーより古い場合があります——実際にインストールされているタグについては、アドオン自身の `SKILL.md` とその GitHub リリースが正となります。インストールは常に公開済みのタグに固定され、移動するブランチを指すことはありません。

- **キットページ：** [AI Diff Reviewer](/kit/ai-diff-reviewer) — 完全な機能リファレンス
- **オンボーディングで必須（フェーズ 7a）：** オンボーディングの同意の下で、タグ固定の vendored スキル（`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`）と、`generate-extension` 経由のリポジトリ調整 `.review/extension.md` をインストール；欠落時は対象を絞ったハーネスアップグレードが両方を調和；拒否は明言された例外として記録され、インストールされるまで `verify` が報告し続ける
- **すべての Final Review で必須：** セキュリティパスが累積変更セットに対して upstream 親デフォルトフローを実行し、その出力をプランローカルの `analysis_results/SECURITY_REVIEW.md`（プラン自身のフォルダー内であり、リポジトリルートではない）に追記；スキルまたは拡張の欠落は `local reviewer not installed` の発見として記録され——黙ってスキップされることは決してなく、決してサプライズブートストラップでもない：インストールはオンボーディングの同意または明示的なアドオン呼び出しに属する；完了したパスからの**検証済み `critical` 結果**は、修正または明示的に受け入れられるまで完了を阻止する（v3、BC-07 —— 未検証のクリティカル主張は注釈付き警告として現れ、`incomplete`/`timeout` のレビューはクリーンなパスではない、BC-04）
- **オプションの CI サーフェス（Flow B）：** upstream `setup` サブスキル経由の `pr-review.yml`（`DailybotHQ/ai-diff-reviewer@v3`）に加え、開発者が呼び出すコンパニオンとしての `apply-review`（読み取り専用）と `address-review`（コミット・プッシュを行いレビュアーを再武装する、v3.1.1 で新登場）——明示的に提供され、無断ではインストールされず、デフォルトにされることなく、プランタスクには決してならない
- **決してブロックしない（呼び出しのみ）：** 開始できたにもかかわらずエラーになったローカルレビューは、一度警告して記録し、続行；その失敗でタスクを落とすことは決してない
- **同等性（Flow B）：** 共有 `prompt.md` + 拡張が方法論/深刻度を整合；CI のイテレーション認識レビューでローカルパスを完全に保ちながらラウンド 2+ を短縮できる
- **ベンダー中立ガードレール：** どの Deep Work Plan フローも商用サービス、CI プロバイダー、シークレットを一切必要としない——レビューアーは開発者自身のコーディングエージェントが実行する、MIT ライセンスのタグ固定スキルである
- **適合性：** 標準 2.3.0 以降を宣言するリポジトリでは `verify` はローカルレビューアーの欠落を失敗として報告し、レガシーリポジトリではハーネスバージョンの発見として報告する

### Herdr（第 6 アドオン）

[herdr-peers](https://github.com/DailybotHQ/herdr-peers)（`v0.1.0` に固定、プロトコル `1`）の薄いインテグレーターで、v7 計画の**対話型**委任トランスポートです。

- **キットページ：** [Herdr](/kit/herdr)
- **追加内容：** 計画は範囲の限られたタスクを、別の [Herdr](https://herdr.dev) ペインにいるコーディングエージェント——同じマシン上、または Herdr が SSH で到達できるマシン上——に渡し、認可された返信を一つだけジャーナルに記録できる
- **動作：** ピアプロトコル（stamp、grant、reply、ループガード、深さとファンアウトの上限）は herdr-peers にあり、パックには決して含まれない；どの利用にも contract の権限付与 `agent_delegation` が必要で、委任先の結果は計画自身のランナーが観測するまで主張にとどまる
- **提供タイミング：** フェーズ 7b での明示的なオプトイン；`herdr` と `herdr-peers` を読み取り専用で検出；このトランスポートは Herdr セッション内でのみ使用可能

### DeepWorkPlan Vim（第 7 アドオン）

[DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim)（`v0.5.1` に固定、インターフェース `1`）の薄いインテグレーターで、Deep Work Plan のためのターミナルエディター（Neovim 0.12+）です。

- **キットページ：** [DeepWorkPlan Vim](/kit/vim)
- **追加内容：** エージェントと人間のための任意のマシンレベルのエディターサーフェス——生成されるコマンドインデックス、読み取り専用の計画ブラウザー、Markdown ビューア；すべての記述は製品の固定された機械可読サーフェスから読み取られる
- **動作：** 既存の Neovim 設定は明示的な同意なしに上書きされない；検出は読み取り専用
- **提供タイミング：** フェーズ 7b での明示的なオプトイン；Neovim 0.12+ がない場合は情報提示のみ

### Agentkit（第 8 アドオン）

[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)（`ak`、`v0.3.0` に固定、インターフェース `1`）の薄いインテグレーターで、v7 計画の**ヘッドレス**委任トランスポートです。

- **キットページ：** [Agentkit](/kit/agentkit)
- **追加内容：** ターミナル型コーディングエージェント全体にわたる一つの `ak` コマンドサーフェスで、範囲の限られた計画タスクをヘッドレスで実行するために使う；`subagents`、`cancel_children`、`model_routing` の能力は、有効化され、検出され、互換性のあるインターフェース上にある場合にのみ、実行時に提供される
- **動作：** どの利用にも contract の権限付与 `agent_delegation` が必要；kit はデフォルトでエージェントを自律モードで起動し、そのオプトアウト（`--ask` または `AGENTKIT_PERMISSIONS=ask`）が常に優先される——アドオンは自律フラグを一切指定せず、計画がオプトアウトを記録している場合と、読み取り専用の委任先には常に `--ask` を渡す；コーディングエージェントの CLI を独自にインストールすることはなく、プロバイダーキーの値を読み取ることもない
- **提供タイミング：** フェーズ 7b での明示的なオプトイン；`ak doctor --json` による読み取り専用の検出

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
