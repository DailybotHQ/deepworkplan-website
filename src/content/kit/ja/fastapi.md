---
title: FastAPI
description: "FastAPI サービス向けのオンボーディングプリセット。ルーター、Pydantic モデル、非同期エンドポイント、依存性注入、テストランナーに関する推論の手がかりを備える。"
kind: preset
lang: ja
order: 7
stack: FastAPI
---

# FastAPI プリセット

onboard フローが FastAPI サービスに対して使う推論ガイドです。テンプレートではなくチェックリストであり、検出された現実が優先します。

## シグナル

- `pyproject.toml` / `requirements.txt` に `fastapi`、ASGI サーバー（`uvicorn`、`uvicorn.workers` を用いた `gunicorn`）、そして `app = FastAPI()` インスタンス。
- `APIRouter` モジュール、`async def` パス操作、および Pydantic モデルまたは `pydantic-settings`。
- パッケージマネージャーとテストランナーは、存在するマニフェストとロックファイルから推論する。

## 推論すべきこと

- 実際のテストコマンド（多くの場合 `httpx`／`TestClient` を伴う `pytest`）と、リント／型チェックのゲート（`ruff`、`mypy`）を原文どおりに捕捉する。
- ルーター構成、リクエスト → 依存関係 → ハンドラー → レスポンスモデルのフロー、そして設定とシークレットの置き場所。
- 同期と非同期のエンドポイント、イベントループ内のブロッキング呼び出し、ルーター・スキーマ・依存関係に適したスタック別スキル。

## 補足

アプリの組み立て方（`include_router`）、起動コマンド（`uvicorn app.main:app`）、および Alembic がマイグレーションを管理しているかどうかを捕捉する。
