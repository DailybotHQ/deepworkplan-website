---
title: "DeepWorkPlan Vim"
description: "Deep Work Plan のターミナルエディタ。生成されるコマンド索引、プランブラウザ、Markdown ビューアを備えた Neovim 0.12+ 設定。"
lastUpdated: 2026-10-03
---

## 概要

ターミナルで暮らす人間とコーディングエージェントのための Neovim 設定——Deep Work Plans も、ドキュメントも、コマンド索引も、キーひとつで届く距離に。

## インストール

一行のコマンドで DeepWorkPlan Vim を Neovim 設定としてインストールします。インストーラは何をするかを説明し、既存の設定に触れる前に確認します。

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

同意が先：既存の Neovim 設定を、明示的な承認なしに上書きすることは決してありません。インストーラは停止して手動の手順を示します。

Windows ではこの一行コマンドは使えません。リポジトリの README に手動の手順が記載されています。 [Windows のインストール手順](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## できること

五つの機能、意図的に小さく限定しています。それぞれが、生成されたコマンド索引で確認できるキーバインドに対応します。

| 機能 | 内容 | マッピング |
|---|---|---|
| 生成されるコマンド索引 | コマンド索引は実際の設定から生成されるため、キーバインドの一覧は常に最新です。 | `SPC h h` |
| VS Code 風の操作 | グラフィカルエディタに倣った編集操作：すべて選択と、システムクリップボードへのコピー。 | `<C-a>`, `y`, `<leader>y` |
| Deep Work Plan ブラウザ | リポジトリ内のプランを閲覧するパネル——エディタを出ずに、プランとタスクと検証ゲートを読めます。 | `SPC P` |
| Markdown ビューア | Markdown をブラウザでプレビュー、またはバッファ内で描画——ドキュメントとプランは、仕事が行われる場所にとどまります。 | `SPC m p`, `SPC m r` |
| 一行インストーラ | macOS と Linux 向けの自己完結的なインストーラ。Windows は文書化された手動の手順を用意しています。 | — |

## 必要要件

- Neovim 0.12 以上。Lua（lua、lua5.4、luajit のいずれか）が利用可能なこと
- macOS と Linux。Windows は文書化された手動の手順でサポート
- GPL-3.0 ライセンス——利用、研究、改変は自由

## 関連情報

- [キットのアドオン文書を読む](/kit/vim)
- [ソースリポジトリを見る](https://github.com/DailybotHQ/deepworkplan-vim)
- DeepWorkPlan Vim をインストールし、Neovim を開けば、エージェントと同じターミナルで Deep Work Plans を読めます。
