---
title: Agentkit
description: "coding-agents-kit を基盤とする任意の v7 アドオン。全ターミナルのコーディングエージェントを一つの ak コマンドで扱い、計画タスクをヘッドレスに委任します。"
kind: addon
lang: ja
order: 8
---

# Agentkit アドオン

ターミナルで動くコーディングエージェントは、それぞれが独自のフラグでセッションを継続し、独自の方法で二つめのアカウントを分離し、独自のヘッドレスモードと、権限プロンプトを飛ばすための独自のスイッチを持っています。**[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** は、それらすべての上に一つのコマンド体系を被せます：`ak <kind> [@profile]`。

このアドオンは、このキットを **DWP v7**（`v7.0.0`）に**ヘッドレス**な委任トランスポートとして統合します。任意のアドオンであり、これがなければ、すべてのタスクはこれまでとまったく同じく現在のセッションで実行されます。キット自体は MIT のプロダクトで、Deep Work Plan がなくても動作します。

## キットが提供するもの

- **すべての CLI に共通の文法。** `ak claude`、`ak codex`、`ak cursor`、`ak opencode`、`ak pi`、`ak cline`、`ak grok`、さらにプロバイダーごとのバリアント（GLM、Azure、xAI）が、同じセッションフラグを使います。`-c` で継続し、`-r <id>` で再開します。
- **プロファイル。** `ak claude @work` は二つめのアカウントを専用のホームで実行し、一つめのアカウントから分離します。
- **ヘッドレス実行。** `ak run <kind> -- "<prompt>"` は一つのプロンプトを非対話で実行し、文書化された終了コードを返します。任意で一つの JSON オブジェクトとして返すこともできます。
- **ドクター。** `ak doctor --json` は、インストール済みの CLI、プロファイル、そして設定済みのキーの名前を報告します。値を報告することはありません。
- **インストール。** `ak install <cli>` は、不足している CLI をベンダーの公式チャネルからインストールします。

## インストール

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

要件：macOS または Linux 上の `bash`、および `python3` 3.9 以降。それ以外は不要です。Windows では `install.ps1` を使います。`v0.1.1` に固定してください。これは `v0.1.0` を置き換えるもので、セキュリティ修正を含みます。リリースは、その `SHA256SUMS` アセットで検証してください。

| 項目 | 値 |
|---|---|
| プロダクト | `DailybotHQ/coding-agents-kit`、タグ `v0.1.1`、インターフェース 1 |
| レジストリキー | `.dwp/config.json` 内の `agentkit` |
| トランスポート | ヘッドレス：委任先ごとに専用の git worktree で `ak run` を一回 |
| 提供するもの | `subagents`、`cancel_children`、`model_routing` |
| 必要なもの | 計画コントラクトの `agent_delegation` 付与 |

## 権限はそのまま引き継がれる

`ak <kind>` は権限をバイパスするフラグを**一切**追加しません。自律実行は明示的なオプトインです。一つのコマンドに `--auto` を付けるか、環境に `AGENTKIT_PERMISSIONS=auto` を設定すると、その起動に限って CLI 自身の自律フラグが追加されます。`claudex` のようなショートカットを再現する `classic` エイリアスプリセットは、無効の状態で提供されます。

このアドオンが自ら自律フラグを追加することはありません。計画が `--auto` を使うのは、開発者による明示的で記録されたオプトインがある場合に限られ、しかも隔離された worktree またはコンテナの中でのみです。

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
