---
title: Python package / CLI
description: "Python パッケージと CLI ツール向けのオンボーディングプリセット。パッケージのレイアウト、コンソールのエントリーポイント、pytest による検証ゲートについての推論の手がかりを備える。"
kind: preset
lang: ja
order: 5
stack: Python package / CLI
---

# Python package / CLI プリセット

onboard フローが Python パッケージと CLI ツールに用いる推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## 手がかり

- `[project.scripts]` エントリーポイントを備えた `pyproject.toml`（インストール可能な CLI）。
- 依存関係の中の CLI フレームワーク。`click`、`typer`、または標準ライブラリの `argparse`。
- src レイアウト（`src/<pkg>/`)、または `__init__.py`、`cli.py`/`__main__.py`、`commands/` を備えたルートパッケージ。

## 推論すべきこと

- 実際の検証ゲート（`ruff check`、`mypy`、`pytest`)。あらゆる Makefile／tox／hatch のラッパーを含め、原文どおりに捕捉する。
- コンソールスクリプトのエントリー名と、コマンド／サブコマンドの構造。
- スタックに合ったスキル。`command-add`、`subcommand`、`option`/`flag`、そして PyPI に配布するなら `release`。

## 補足

公開 API の安定性、ヘルプテキスト、終了コードはユーザーに面する要素です。標準として扱います。
