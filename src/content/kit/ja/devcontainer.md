---
title: Devcontainer
description: "devcontainer-kit 基盤の任意アドオン。dck init の Dev Containers テンプレート、エージェントなしのイメージ、コンテナ別 Herdr マシン。"
kind: addon
lang: ja
order: 1
---

# Devcontainer アドオン

リポジトリに、再現可能で隔離された開発コンテナを用意します。人、エディター、コーディングエージェントのいずれもが使えるコンテナです。**DWP v7 beta**（`v7.0.0-beta.1`、プレリリース）では、このアドオンが **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** を統合します。これは Deep Work Plan がなくても動作する MIT のプロダクトで、パックが以前同梱していたテンプレートを置き換えます。任意のアドオンであり、リポジトリはこれがなくても完全に適合します。

## devcontainer-kit が提供するもの

- **テンプレート。** [Dev Containers](https://containers.dev) 仕様に基づき、`dck init` がリポジトリに展開します：`devcontainer.json`、compose ファイル、`docker/local/`。後から再実行すると調整を行い、あなたの編集を上書きすることはありません。既存ファイルへの変更はすべて事前に提示され、同意が必要です。
- **`dck`**。素のターミナルからコンテナを動かすランチャーです（`setup`、`up`、`shell`、`ssh`、`rebuild`、`doctor`）。VS Code や Cursor の有無は問いません。
- **ベースイメージ。** `python-3.13`、`node-24`、`debian` の三種類があり、コーディングエージェントを**含みません**。
- **エントリポイントライブラリ。** 永続ボリューム、SSH、SSH セッションの環境を扱い、リポジトリごとに手作業でコピーするエントリポイントの代わりになります。
- **Herdr マシン。** 各コンテナはループバック専用の SSH サーバー経由で [Herdr](https://herdr.dev) に参加でき、その中のエージェントは到達可能なピアになります。

## インストール

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

要件：Linux または macOS ホスト上の `bash` 3.2 以降と `python3` 3.11 以降、そしてコンテナコマンド用の Docker と Compose v2。リリースは、その `SHA256SUMS` アセットで検証してください。

| 項目 | 値 |
|---|---|
| プロダクト | `DailybotHQ/devcontainer-kit`、タグ `v0.1.4`、インターフェース 1 |
| レジストリキー | `.dwp/config.json` 内の `devcontainer` |
| リポジトリごとの設定 | `.devcontainer/dck.toml` |
| 検出 | `dck doctor --json` |

## レイヤーはオプトイン

ベースイメージには開発ツール（git、gh、ripgrep、SSH サーバー、Herdr、そしてタグで固定した DeepWorkPlan Vim 入りの Neovim）が含まれ、コーディングエージェント、レポート用 CLI、シークレットは一切含まれません。それ以外はすべて、`dck.toml` で有効にするレイヤーです：

| レイヤー | デフォルト | 追加されるもの |
|---|---|---|
| `agents` | オフ | [coding-agents-kit](/kit/agentkit) と、指定した CLI をインストールします。各 CLI は専用の永続ボリュームを持ちます。権限をバイパスするフラグは設定されません。 |
| `editor` | オン | DeepWorkPlan Vim 入りの Neovim。オフにすると素のエディターになります。 |

## セキュリティのデフォルト

- 公開されるポートはすべて、`dck.toml` が `bind` を設定しない限り `127.0.0.1` にバインドされます。
- SSH エージェントはホストから転送されます。ホストの秘密鍵がコンテナにコピーされることはありません。
- SSH ホスト鍵は実行時にプロジェクトごとのボリュームへ生成され、イメージに焼き込まれることはありません。サーバーは公開鍵のみを受け付け、root ログインもパスワードも許可しません。
- テンプレートは `cap_add`、`privileged` モード、Docker ソケットのいずれも追加しません。
- ベースイメージとツールはバージョンで固定され、チェックサムで検証されます。compose は、ダイジェストを解決できる場合は常にダイジェストでベースイメージを参照します。

## 補足

任意であり、必須となることはありません。リポジトリはオプションアドオンがゼロでも完全に適合します。v0.1 は Linux と macOS のホストをサポートします。
