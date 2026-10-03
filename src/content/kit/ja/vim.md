---
title: DeepWorkPlan Vim
description: "DWP の任意アドオン：DeepWorkPlan Vim——DWP 用ターミナルエディタ。コマンド索引、計画の閲覧、Neovim での Markdown 表示。"
kind: addon
lang: ja
order: 6
---

# DeepWorkPlan Vim アドオン

**DeepWorkPlan Vim** は Deep Work Plan のターミナルエディタです。Neovim の設定そのもの（リポジトリ内のファイルではなくエディタ本体）で、方法論の作業面をキーストローク 1 つで手に届く場所に置きます。kit の他のエントリがリポジトリに harness をインストールするのに対し、このアドオンが装備するのは人——そして headless で Neovim を動かす任意のエージェント——です。DWP を基本の言語として扱えるエディタを手に入ります。

必要要件は **Neovim 0.12 以降**。**macOS と Linux** で動作し（Windows はドキュメント化された手動パスでサポート）、**GPL-3.0** でライセンスされています。利用、学習、改変は自由です。

## 何が加わるか

| # | 機能 | 内容 | マッピング |
|---|---------|--------------|---------|
| F1 | **生成されるコマンド索引** | エディタ全体を一覧化：すべてのコマンドにマッピングと一行説明を付け、生きている設定から生成するため、索引がエディタからドリフトしません。 | `SPC h h` |
| F2 | **VS Code 風の操作** | すべて選択、コピー、クリップボードへの yank を、筋肉記憶がすでに知っている同時押しに置きます。 | `<C-a>`, `y`, `<leader>y` |
| F3 | **Deep Work Plan ブラウザ** | リポジトリを駆動する計画——タスク、検証ゲート、完了状態——をエディタを出ずに開きます。 | `SPC P` |
| F4 | **Markdown ビューア** | Markdown をエージェントと同じように読みます：レンダリングされたプレビュー、またはコピー・ペーストの忠実さを保つ生のソース。 | `SPC m p`, `SPC m r` |
| F5 | **一行インストーラ** | macOS と Linux 向けの consent-first な `install.sh`。Windows はドキュメント化された手動パスがカバーします。 | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## インストール

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

インストーラーは **consent-first** です。既存の Neovim 設定は決して上書きしません。端末なしのパイプ実行では何も触れずに案内とともに中止し、対話実行では既存の設定を退ける前に尋ねます。プラグインは初回起動時に headless でインストールされます。終了して起動し直す手間はありません。

Windows は `curl | bash` の対象ではありません。ドキュメント化された手動パス（winget + Git Bash、または WSL）はリポジトリの README にあります。

全容（スクリーンショットなし、契約の範囲のみ）：[/vim ページ](/vim)。

## いつ選ぶか

| 信号 | アクション |
|--------|--------|
| 開発者がターミナルに住み、計画でリポジトリを駆動する | アドオンを**提供**する |
| 長期 DWP 実行で、プランブラウザ（`SPC P`）が状態を見えるままにする | **推奨**する |
| 開発者のエディタはすでに設定済みで交渉の余地がない | **スキップ**する——アドオンは設計上オプションです |
| WSL のない Windows 専用チーム | **スキップ**するか、ドキュメント化された手動パスを案内する |

## 関連する kit エントリ

- [Devcontainer](/kit/devcontainer) — 再現可能な開発環境（最初のアドオン）
- [Dailybot](/kit/dailybot) — チームに見える計画ライフサイクル報告（2 番目のアドオン）
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — 計画の最終レビューでのローカルレビュー（5 番目のアドオン）
