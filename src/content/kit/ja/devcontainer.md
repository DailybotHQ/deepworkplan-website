---
title: Devcontainer
description: "全リポジトリに再現可能な開発コンテナを一つのテンプレートから。エージェントは ak でホストのアカウントを使い、Herdr は双方向、SSH 鍵はオプトイン時のみ。"
kind: addon
lang: ja
order: 1
---

# Devcontainer アドオン

リポジトリに、再現可能で隔離された開発コンテナを用意します。人、エディター、コーディングエージェントのいずれもが使えるコンテナです。**DWP v7**（パック `v7.6.2`）では、このアドオンが **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)** を統合します。これは Deep Work Plan がなくても動作する MIT のプロダクトです。任意のアドオンであり、リポジトリはこれがなくても完全に適合します。

## devcontainer-kit が提供するもの

- **テンプレート。** [Dev Containers](https://containers.dev) 仕様に基づき、`dck init` が一つの固定レイアウトでリポジトリに展開します：`.devcontainer/devcontainer.json`、`docker/local/<service>/Dockerfile`、`docker/local/docker-compose.yaml`、`dev.sh`。後から再実行すると調整を行い、あなたの編集を上書きすることはありません。既存ファイルへの変更はすべて事前に提示され、同意が必要です。
- **リポジトリ専用のコンテナ。** Dockerfile はランタイムの公式イメージ（`node-24`、`python-3.13`、`debian`）をダイジェストで固定して起点とし、キットのビルド手順を `docker/local/<service>/dck/` にコピーします。共有ベースイメージは一切使いません。
- **`dev.sh` と `dck`。** `bash dev.sh up` は素のターミナルからコンテナをビルドし、起動し、アタッチします。`shell`、`rebuild`、`doctor` などのコマンドは、VS Code や Cursor の有無を問わず動作します。
- **Herdr は双方向。** ホストの [Herdr](https://herdr.dev) は、ループバック専用の SSH サーバーを通じて各コンテナを一台のマシンとしてアタッチし、コンテナは標準のサイドバー（App、Editor、Development、Agents）付きで開きます。すべてのワークスペースとペイン（後から開いたものも含む）は、アプリのパス（既定では `/app`）で起動します。コンテナ内では [herdr-peers](/kit/herdr) により、エージェントがホストや他のコンテナにいるエージェントに問い合わせられます。
- **`dck-dockerfile` スキル。** エージェントが依頼に応じてリポジトリのコンテナを作成または再生成し、実際のビルドでそれを証明します。

## インストール

```bash
git clone --branch v0.3.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

要件：Linux または macOS ホスト上の `bash` 3.2 以降と `python3` 3.11 以降、そしてコンテナコマンド用の Docker と Compose v2。リリースは、その `SHA256SUMS` アセットで検証してください。`v0.3.2` に固定してください。`v0.2.0` はサポート対象外です。

| 項目 | 値 |
|---|---|
| プロダクト | `DailybotHQ/devcontainer-kit`、タグ `v0.3.2`、インターフェース 2 |
| レジストリキー | `.dwp/config.json` 内の `devcontainer` |
| リポジトリごとの設定 | `.devcontainer/dck.toml` |
| 検出 | `dck doctor --json` |

## レイヤー

どのコンテナにも開発ツール（git、gh、ripgrep、SSH サーバー、Herdr、herdr-peers）が含まれ、[ホストのアカウント](#コンテナ内のホストアカウント)をオプトインしない限り、シークレットは一切含まれません。それ以外は、`dck.toml` で選ぶレイヤーです：

| レイヤー | デフォルト | 追加されるもの |
|---|---|---|
| `agents` | オフ | 検証済みリリースから取得する [coding-agents-kit](/kit/agentkit) と、指定した CLI。各 CLI は専用の永続ボリュームを持ち、さらに `classic`（`claudex`、`codexx`、…）と `providers`（`claude-glm`、`codex-azure`、…）のプリセットが加わります。エージェントはデフォルトで自律モードで動作します。コンテナそのものがサンドボックスです。オプトアウト：サービスの `.env` に `AGENTKIT_PERMISSIONS=ask`。 |
| `editor` | オン | タグで固定した [DeepWorkPlan Vim](/kit/vim) 入りの Neovim。オフにすると素のエディターになります。 |
| `dailybot` | オフ | dailybot アドオン用の Dailybot CLI。 |

ログイン、`gh`、Herdr の設定、git の ID は `bash dev.sh rebuild` の後も保持されます。`agents` レイヤーを有効にすると、イメージには coding-agents-kit の三つのスキル（`agentkit`、`agentkit-setup`、`agentkit-orchestrate`）も含まれます。これらは起動のたびに各エージェントのスキルディレクトリへリンクされるため、再作成したコンテナでも保持されます。

状態ボリューム（SSH ホスト鍵、`~/.ssh`、`gh` のログイン、Herdr クライアントの状態、履歴）の名前は `state` です。複数のサービスが一つの compose プロジェクトを共有する場合は、`dck.toml` の `[compose] state_volume`（または `dck init --state-volume NAME`）でそれぞれに固有の名前を付けてください。そうしないとすべてのサービスが同じボリュームをマウントし、`dck doctor` がその旨を報告します。

## マシンをまたぐエージェント

`v0.2.3` 以降、Docker Desktop 上では `dck up` が手作業なしで双方向のメッシュを構成します。

- **コンテナとホスト。** コンテナ内のエージェントは、ホスト上、他のすべての dck コンテナ内、そしてホストの Herdr がすでに管理している他のループバックコンテナ内の Herdr エージェントに到達でき、逆方向にも到達できます。すべてのピアは固定されたホスト鍵を持ち、初回利用時に信頼されるものはありません。
- **任意のホストリスナー。** `dck setup` は一度だけ、`127.0.0.1` 上のユーザーレベルの SSH サーバーを提案します。このサーバーは dck の鍵のみを受け付け、launchd（macOS）によって稼働し続けます。すでにループバックのリスナーを動かしている場合は、代わりにホストプロファイルをそちらに向けてください。`dck host listener disable` で削除できます。
- **再構築後も保持。** コンテナの Herdr マシンカタログはボリューム上にあるため、`bash dev.sh rebuild` の後も内部に登録されたすべてのマシンが保持されます。`v0.3.2` 以降、`rebuild`、`start`、`restart` は `up` と同じ手順を実行します。コンテナはホストの Herdr に再登録され、ホスト鍵は再固定され、メッシュが再配布されるため、ゼロからビルドしたコンテナもすぐにホストとそのピアに到達できます。
- **コンテナ内の Codex ペイン。** `v0.3.2` では、コンテナ内の Codex エージェントは、他のマシン上のピアに問い合わせる前に、`HERDR_PEERS_SELF` をホストに保存されたコンテナのマシン ID に設定します。この ID はリードの指示に記載されています。キットの今後のリリースでは、キットがこれを設定します。
- **ホストからも返信。** `dck setup` はホストに検証済みの [herdr-peers](/kit/herdr) をインストールするため、ホストでも `dck agents` と `dck ask` が使え、ホストのエージェントは `herdr-peers reply` で応答します。
- **キットが作成していないコンテナ。** それらがログインに使う公開鍵をホストプロファイルの `[ssh] authorized_extra` に列挙すれば、それらのコンテナも dck コンテナに到達できます。

ホストとコンテナの両方で [coding-agents-kit](/kit/agentkit) と組み合わせれば、同じ `ak` で両側のエージェントを起動できます。

## コンテナ内のホストアカウント

コンテナは、ホストですでに持っているアカウントを使えます。git がすでにホストの SSH エージェントを通じて動いているのと同じように、コンテナ内でのログインは不要です。これはオプトインで、設定はあなたの**ホストプロファイル**に置き、リポジトリの `dck.toml` には決して置きません。

```toml
[agents]
host_profiles = true          # 既定は false
host_env_keys = ["ZAI_CODING_API_KEY"]   # 共有する環境変数名の許可リスト
```

`host_profiles` を有効にすると、`dck up` はリポジトリがインストールする CLI のプロファイルだけを共有します。

- **Claude Code** はプロファイルごとの長期トークンで共有します。`@default` には `CLAUDE_CODE_OAUTH_TOKEN`、`@name` には `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` を使います（接尾辞は大文字にし、`A-Z`、`0-9`、`_` 以外の文字は `_` に置き換えます）。
- **Codex** は認証ファイルで、`@default` と各プロファイルについて共有します。
- **キットの env ファイル**は読み取り専用で、`host_env_keys` にある名前だけに絞り込みます。

agentkit の home 全体がマウントされることはなく、ホストの絶対パスを含むプロファイルはスキップされます。読み書き可能で共有した Codex のログインは、二つの書き手から同時に更新される可能性があります。Codex アカウントごとに動かすエージェントは一つにしてください。コンテナ内では、同じ `ak <kind> @<profile>` がホスト上と同じアカウントで動きます。これにより、リードは `ak pick` が選んだアカウントをコンテナのレーンに渡せます。詳しくは[多数のエージェントを動かす](/methodology/06-orchestration)を参照してください。

## コンテナ内のホストの SSH 鍵

一部のツールは鍵ファイルだけを読み、転送されたエージェントを無視します。たとえば `gh auth login` は新しい鍵の生成を提案します。`v0.3.2` 以降はオプトインできます。設定できるのは**ホストプロファイル**のみです（リポジトリの `dck.toml` では設定できません。`dck setup` が一度だけ尋ね、デフォルトは「いいえ」です）：

```toml
[ssh]
copy_keys = true              # default false
```

有効な間、`dck up` はホストの `~/.ssh` を読み取り専用で `~/.ssh_host` にバインドし、起動のたびにその `id_*` 鍵をコンテナの `~/.ssh` にコピーして（秘密鍵は `0600`）、ホストと同期させます。エージェント転送は変わらず、無効にすると次回の起動時にコピーは削除されます。代償として、ホストの `~/.ssh` 全体がコンテナ内から読み取り可能になり、秘密鍵は状態ボリュームに保存されます。

## セキュリティのデフォルト

- 公開されるポートはすべて、`dck.toml` が `bind` を設定しない限り `127.0.0.1` にバインドされます。
- SSH 経由の git はホストの SSH エージェントを通ります。使うのはそのソケットであり、鍵ファイルも、マウントした `~/.ssh` や `~/.gitconfig` も使いません（ホストプロファイルで [`copy_keys`](#コンテナ内のホストの-ssh-鍵) を有効にした場合を除きます）。git の ID は `dck setup` が埋める `DCK_GIT_*` の値から取得します。
- SSH ホスト鍵は実行時にプロジェクトごとのボリュームへ生成され、イメージに焼き込まれることはありません。サーバーは公開鍵のみを受け付け、root ログインもパスワードも許可しません。
- テンプレートは `cap_add`、`privileged` モード、Docker ソケットのいずれも追加しません。
- すべてのダウンロードはバージョンで固定され、チェックサムで検証されます。ベースイメージはダイジェストで固定されます。
- あるコンテナのエージェントが他のコンテナに到達できる Herdr メッシュはデフォルトで有効であり、その無効化の方法はキットの脅威モデルに記載されています。ホストリスナーは、実行中のコンテナ内のコードがあなたとしてホスト上でシェルを開くことを可能にします。これはオプトインで、ループバック限定であり、dck の鍵のみを受け付け、`dck host listener disable` で削除できます。

## 補足

任意であり、必須となることはありません。リポジトリはオプションアドオンがゼロでも完全に適合します。v0.2 は Linux と macOS のホストをサポートします。コンテナ間のメッシュには Docker Desktop が必要です。
