---
title: "Deep Work Plan のキット"
description: "スキルとその八つのサブスキル、コマンド、エージェントアダプター、オンボーディングプリセット、オプトイン式アドオン、そして Deep Work Plan をどこでも実行可能にする事例。"
lastUpdated: 2026-06-05
---

## Deep Work Plan のキット

キットは、この方法論を実際に実行するために必要なものすべてです。`DailybotHQ/deepworkplan-skill` からインストールします。

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### スキルとそのサブスキル

Deep Work Plan スキルは、ルーターと八つのサブスキルです。

- **create** — 目標を構造化された計画へと分解する（`/dwp-create`)。
- **execute** — 計画をタスクごとに実行し、各ゲートを検証する（`/dwp-execute`)。
- **refine** — 完了済みの作業を保持しながら、タスクを追加、削除、並べ替える（`/dwp-refine`)。
- **resume** — 状態を再構築し、中断された計画を続行する（`/dwp-resume`)。
- **status** — 変更を加えずに進捗を報告する（`/dwp-status`)。
- **verify** — リポジトリと計画の適合性を客観的に確認する（`/dwp-verify`)。
- **onboard** — リポジトリを AI-first にする（`/deepworkplan-onboard`)。
- **author** — リポジトリ自身のスキル、エージェント、コマンドを作成または進化させる（`/skill-create`、`/agent-create`)。

### コマンド

薄いスラッシュコマンドが、サブスキルとアドオンへ委譲します。

- `dwp-create`、`dwp-execute`、`dwp-refine`、`dwp-resume`、`dwp-status`、`dwp-verify` — 計画・実行・検証のループ。
- `skill-create`、`agent-create` — author サブスキルへ委譲する。
- `lib-upgrade` — dependency-upgrade アドオンへ委譲する（そのアドオンが受け入れられたときにのみインストールされる)。

### アダプター

Claude Code、Cursor、OpenAI Codex、GitHub Copilot、Google Gemini、OpenCode、Windsurf、Cline、Antigravity、OpenClaw、Hermes、そしてクラウド／バックグラウンドエージェント（Claude Code リモートタスク、Codex クラウド、Jules クラス）のための、エージェントごとの薄い統合。OpenClaw と Hermes は、ハートビートまたはクロンスケジューリングで駆動される、無人実行プロファイルのもとで計画を実行する自律エージェントプラットフォームです。

### オンボーディングプリセット

onboard フローがドキュメント、スキル、検証コマンドを適応させるために用いる、スタックごとの推論ガイドです。テンプレートではありません。六つのプリセット。Django、Vue + Vite、Astro/Svelte、Node/TS service、Python package/CLI、そして汎用のフォールバック。

### アドオン（オプトイン)

onboard フローがリポジトリに重ねられる任意の機能です。AI-first の基本構成には決して含まれません。

- **Devcontainer** — 永続的な AI CLI 認証を備えた、再現可能で隔離された開発コンテナ。
- **Dailybot** — Dailybot を使うチームのための、最善努力での進捗とマイルストーンの報告。
- **Dependency upgrade** — パッケージマネージャー非依存で、バッチ化され、検証され、取り消し可能な更新。
- **Design system** — インターフェイスに限定された `DESIGN.md`（`docs/DESIGN.md` に置かれ、`AGENTS.md` から参照される）で、リポジトリの実際のデザインソースから推論され、ビジュアル UI、スタイルづけされた CLI 出力、会話のメッセージングのプロファイルを備え、エージェントがオンブランドのインターフェイス出力を生成できるようにします。デザインシステムが検出されたときはビジュアルのプロファイルがデフォルトでオンであり、CLI と会話のプロファイルは検出されたとき推奨され、必ず尋ねられます。

### 事例

実例つきの、ビフォー・アフターのウォークスルー。

- [キットを見る](/kit)
- [クイックスタート](/quickstart)
- [事例を見る](/examples)
