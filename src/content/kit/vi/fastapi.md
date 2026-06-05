---
title: FastAPI
description: "Preset onboarding cho dịch vụ FastAPI, với gợi ý suy luận về router, Pydantic model, endpoint bất đồng bộ, dependency injection và test runner."
kind: preset
lang: vi
order: 7
stack: FastAPI
---

# FastAPI preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dịch vụ FastAPI. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `fastapi` trong `pyproject.toml` / `requirements.txt`, một ASGI server (`uvicorn`, `gunicorn` với `uvicorn.workers`), và một instance `app = FastAPI()`.
- Các module `APIRouter`, path operation `async def`, và Pydantic model hoặc `pydantic-settings`.
- Package manager và test runner được suy luận từ manifest và lockfile hiện có.

## Cần suy luận về điều gì

- Lệnh test thực tế (thường là `pytest` với `httpx`/`TestClient`) và cổng lint/kiểm tra kiểu (`ruff`, `mypy`) — ghi lại nguyên văn.
- Cấu trúc router, luồng request → dependency → handler → response model, và nơi lưu trữ cài đặt cũng như secret.
- Endpoint đồng bộ vs bất đồng bộ, lời gọi blocking trong event loop, và các skill phù hợp với stack cho router, schema và dependency.

## Ghi chú

Ghi lại cách ứng dụng được lắp ráp (`include_router`), lệnh chạy (`uvicorn app.main:app`), và liệu Alembic có quản lý migration hay không.
