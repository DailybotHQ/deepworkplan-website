---
title: Devcontainer
description: "検出されたスタックから compose ベースの devcontainer を追加または調整するオプトイン式のアドオン。再ビルドを生き延びる永続的な AI CLI 認証を備える。"
kind: addon
lang: ja
order: 1
---

# Devcontainer アドオン

再現可能で隔離された開発コンテナをリポジトリに追加します。一つめのオプトイン式 Deep Work Plan アドオンです。

## 追加するもの

- 検出されたスタックから推論された、ベースイメージと補助サービスを備えた compose ベースの devcontainer。
- 再ビルドを生き延びる、永続的な AI CLI 認証ボリューム（Claude、Codex、Cursor、gh、Dailybot）。
- `dailybot-project-network`、`DOCKER_DEV_ENV=vscode` の規約、そして検証のエイリアス（`codecheck`、`check`、`fix`、`test`）。
- 公開リポジトリ向けには、シークレットを除外する `.dockerignore` と、シークレットを含まない `.env.example`。

## 振る舞い

devcontainer のおよそ 85% は安定した共通の骨格です。残りの 15%、すなわちベースイメージ、ユーザー、ワークスペースフォルダ、サービス、ポート、シークレットは、リポジトリの実際のスタックから推論されます。既存の devcontainer は調整され、決して上書きされません。

## 補足

オプトインで、必須となることはありません。リポジトリはアドオンがゼロでも完全に適合します。
