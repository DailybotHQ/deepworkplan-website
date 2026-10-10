---
title: Devcontainer
description: "devcontainer-kit 基盤の任意アドオン。一つのテンプレートでリポジトリ専用の開発コンテナ。エージェントは ak 経由、Herdr は双方向、SSH 鍵なし。"
kind: addon
lang: ja
order: 1
---

# Devcontainer アドオン

リポジトリに、再現可能で隔離された開発コンテナを用意します。人、エディター、コーディングエージェントのいずれもが使えるコンテナです。**DWP v7**（パック `v7.1.0`）では、このアドオンが **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** を統合します。これは Deep Work Plan がなくても動作する MIT のプロダクトです。任意のアドオンであり、リポジトリはこれがなくても完全に適合します。

## devcontainer-kit が提供するもの

- **テンプレート。** [Dev Containers](https://containers.dev) 仕様に基づき、`dck init` が一つの固定レイアウトでリポジトリに展開します：`.devcontainer/devcontainer.json`、`docker/local/<service>/Dockerfile`、`docker/local/docker-compose.yaml`、`dev.sh`。後から再実行すると調整を行い、あなたの編集を上書きすることはありません。既存ファイルへの変更はすべて事前に提示され、同意が必要です。
- **リポジトリ専用のコンテナ。** Dockerfile はランタイムの公式イメージ（`node-24`、`python-3.13`、`debian`）をダイジェストで固定して起点とし、キットのビルド手順を `docker/local/<service>/dck/` にコピーします。共有ベースイメージは一切使いません。
- **`dev.sh` と `dck`。** `bash dev.sh up` は素のターミナルからコンテナをビルドし、起動し、アタッチします。`shell`、`rebuild`、`doctor` などのコマンドは、VS Code や Cursor の有無を問わず動作します。
- **Herdr は双方向。** ホストの [Herdr](https://herdr.dev) は、ループバック専用の SSH サーバーを通じて各コンテナを一台のマシンとしてアタッチし、コンテナは標準のサイドバー（Home、Editor、Development、Agents）付きで開きます。コンテナ内では [herdr-peers](/kit/herdr) により、エージェントがホストや他のコンテナにいるエージェントに問い合わせられます。
- **`dck-dockerfile` スキル。** エージェントが依頼に応じてリポジトリのコンテナを作成または再生成し、実際のビルドでそれを証明します。

## インストール

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

要件：Linux または macOS ホスト上の `bash` 3.2 以降と `python3` 3.11 以降、そしてコンテナコマンド用の Docker と Compose v2。リリースは、その `SHA256SUMS` アセットで検証してください。`v0.2.2` に固定してください。`v0.2.0` はサポート対象外です。

| 項目 | 値 |
|---|---|
| プロダクト | `DailybotHQ/devcontainer-kit`、タグ `v0.2.2`、インターフェース 2 |
| レジストリキー | `.dwp/config.json` 内の `devcontainer` |
| リポジトリごとの設定 | `.devcontainer/dck.toml` |
| 検出 | `dck doctor --json` |

## レイヤー

どのコンテナにも開発ツール（git、gh、ripgrep、SSH サーバー、Herdr、herdr-peers）が含まれ、シークレットは一切含まれません。それ以外は、`dck.toml` で選ぶレイヤーです：

| レイヤー | デフォルト | 追加されるもの |
|---|---|---|
| `agents` | オフ | 検証済みリリースから取得する [coding-agents-kit](/kit/agentkit) と、指定した CLI。各 CLI は専用の永続ボリュームを持ち、さらに `classic`（`claudex`、`codexx`、…）と `providers`（`claude-glm`、`codex-azure`、…）のプリセットが加わります。エージェントはデフォルトで自律モードで動作します。コンテナそのものがサンドボックスです。オプトアウト：サービスの `.env` に `AGENTKIT_PERMISSIONS=ask`。 |
| `editor` | オン | タグで固定した [DeepWorkPlan Vim](/kit/vim) 入りの Neovim。オフにすると素のエディターになります。 |
| `dailybot` | オフ | dailybot アドオン用の Dailybot CLI。 |

ログイン、`gh`、Herdr の設定、git の ID は `bash dev.sh rebuild` の後も保持されます。

## セキュリティのデフォルト

- 公開されるポートはすべて、`dck.toml` が `bind` を設定しない限り `127.0.0.1` にバインドされます。
- SSH 経由の git はホストの SSH エージェントを通ります。使うのはそのソケットであり、鍵ファイルも、マウントした `~/.ssh` や `~/.gitconfig` も使いません。git の ID は `dck setup` が埋める `DCK_GIT_*` の値から取得します。
- SSH ホスト鍵は実行時にプロジェクトごとのボリュームへ生成され、イメージに焼き込まれることはありません。サーバーは公開鍵のみを受け付け、root ログインもパスワードも許可しません。
- テンプレートは `cap_add`、`privileged` モード、Docker ソケットのいずれも追加しません。
- すべてのダウンロードはバージョンで固定され、チェックサムで検証されます。ベースイメージはダイジェストで固定されます。
- あるコンテナのエージェントが他のコンテナに到達できる Herdr メッシュはデフォルトで有効であり、その無効化の方法はキットの脅威モデルに記載されています。

## 補足

任意であり、必須となることはありません。リポジトリはオプションアドオンがゼロでも完全に適合します。v0.2 は Linux と macOS のホストをサポートします。コンテナ間のメッシュには Docker Desktop が必要です。
