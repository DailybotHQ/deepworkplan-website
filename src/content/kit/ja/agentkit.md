---
title: Agentkit
description: "coding-agents-kit 基盤の任意 v7 アドオン。全ターミナルエージェントを一つの ak コマンドで扱い、デフォルトで自律実行（オプトアウト可）とヘッドレス委任。"
kind: addon
lang: ja
order: 8
---

# Agentkit アドオン

ターミナルで動くコーディングエージェントは、それぞれが独自のフラグでセッションを継続し、独自の方法で二つめのアカウントを分離し、独自のヘッドレスモードと、権限プロンプトを飛ばすための独自のスイッチを持っています。**[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** は、それらすべての上に一つのコマンド体系を被せます：`ak <kind> [@profile]`。

このアドオンは、このキットを **DWP v7**（パック `v7.1.4`）に**ヘッドレス**な委任トランスポートとして統合します。任意のアドオンであり、これがなければ、すべてのタスクはこれまでとまったく同じく現在のセッションで実行されます。キット自体は MIT のプロダクトで、Deep Work Plan がなくても動作します。

## キットが提供するもの

- **すべての CLI に共通の文法。** `ak claude`、`ak codex`、`ak cursor`、`ak opencode`、`ak pi`、`ak cline`、`ak grok`、さらにプロバイダーごとのバリアント（GLM、Azure、xAI）が、同じセッションフラグを使います。`-c` で継続し、`-r <id>` で再開します。
- **プロファイル。** `ak claude @work` は二つめのアカウントを専用のホームで実行し、一つめのアカウントから分離します。
- **ヘッドレス実行。** `ak run <kind> -- "<prompt>"` は一つのプロンプトを非対話で実行し、文書化された終了コードを返します。任意で一つの JSON オブジェクトとして返すこともできます。
- **ドクター。** `ak doctor --json` は、インストール済みの CLI、プロファイル、そして設定済みのキーの名前を報告します。値を報告することはありません。
- **検証済みのインストール。** `ak install <cli>` は、不足している CLI をベンダーの公式チャネルから固定バージョンでインストールし、固定された sha256 または npm レジストリの完全性情報と照合します。
- **なじみのある名前。** 二つのエイリアスプリセットがあり、有効にするまではオフです：`classic`（`claudex`、`codexx`、`cursorx`、`opencodex`、`pix`、`clinex`、`grokx`）と `providers`（`claude-glm`、`codex-azure`、`codex-xai`、`pi-glm`、…）。いずれも一つの `ak <kind>` に対応します。

## インストール

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

要件：macOS または Linux 上の `bash`、および `python3` 3.9 以降。それ以外は不要です。Windows では `install.ps1` を使います。`v0.3.0` に固定してください。`v0.2.0` と `v0.2.1` はサポート対象外です。リリースは、その `SHA256SUMS` アセットで検証してください。

| 項目 | 値 |
|---|---|
| プロダクト | `DailybotHQ/coding-agents-kit`、タグ `v0.3.0`、インターフェース 1 |
| レジストリキー | `.dwp/config.json` 内の `agentkit` |
| トランスポート | ヘッドレス：委任先ごとに専用の git worktree で `ak run` を一回 |
| 提供するもの | `subagents`、`cancel_children`、`model_routing` |
| 必要なもの | 計画コントラクトの `agent_delegation` 付与 |

## デフォルトは自律実行、オプトアウトが常に優先

`v0.2.0` 以降、`ak <kind>` はすべてのエージェントを**自律モード**で起動します。CLI 自身の自律フラグを追加し、そのフラグはキットの `providers.toml` にのみ保持されます。自律モードは、開発コンテナのような使い捨ての環境やサンドボックス化された環境を想定しています。

**オプトアウトが常に優先されます**：一つのコマンドに `--ask` を付けるか、環境またはキットの env ファイルに `AGENTKIT_PERMISSIONS=ask` を設定すると、同じコマンドに `--auto` があってもフラグは抑止されます。オプトアウトしたセッションは、自らが起動するエージェントにもオプトアウトを引き継ぎます。ホスト上では、オプトアウトを設定してください。

このアドオンは自律フラグを一切記述せず、`--auto` を渡すこともありません。計画がオプトアウトを記録している場合は `--ask` を渡します。ホスト上で `agent_delegation` を付与する計画は、それぞれの worktree に閉じ込められた自律的な委任先を受け入れることになりますが、worktree はサンドボックスではありません。

## 計画に追加されるもの

コントラクトが `agent_delegation` を付与している v7 の計画では、`execute` が `parallel_safe` なタスクを別の CLI に渡せます。専用の git worktree を作成し、そこでタイムアウト付きで `ak run` を実行し、結果を計画の `analysis_results/delegations/` に収集します。結果は、計画自身のゲートランナーが観測するまで `asserted` な証拠です。委任先をキャンセルすると、そのプロセスツリー全体が停止します。

## Agentkit か Herdr か

| 状況 | 使うもの |
|---|---|
| 出力が宣言された、範囲の限定された `parallel_safe` なタスク | Agentkit（ヘッドレス） |
| タスクに対話が必要、長時間実行される、または別のマシン上にある | [Herdr](/kit/herdr)（ペイン内のピア） |

二つは組み合わせられます。herdr-peers は、`ak env <kind> @profile` が出力する環境を使って、ペイン内にピアを起動できます。

## 補足

任意であり、必須となることはありません。API キーの値が出力されたり、ログに記録されたり、設定ファイルに書き込まれたりすることはありません。文書化された例外は Cline で、コマンドライン上でキーを受け取ります。OpenCode、Pi、Cline、Grok の結果抽出はベンダーのドキュメントに基づいて構築されており、実際のアカウントに対してはまだ検証されていません。認識できない出力は生のテキストにフォールバックします。
