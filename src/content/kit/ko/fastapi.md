---
title: FastAPI
description: "FastAPI 서비스를 위한 온보딩 프리셋으로, 라우터, Pydantic 모델, 비동기 엔드포인트, 의존성 주입, 테스트 러너에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 7
stack: FastAPI
---

# FastAPI 프리셋

onboard 흐름이 FastAPI 서비스에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `pyproject.toml` / `requirements.txt`의 `fastapi`, ASGI 서버(`uvicorn`, `gunicorn`과 `uvicorn.workers`), 그리고 `app = FastAPI()` 인스턴스.
- `APIRouter` 모듈, `async def` 경로 연산, Pydantic 모델 또는 `pydantic-settings`.
- 매니페스트와 락파일에서 패키지 관리자와 테스트 러너를 추론합니다.

## 추론할 사항

- 실제 테스트 명령(종종 `httpx`/`TestClient`와 함께 `pytest`)과 린트/타입 검사 게이트(`ruff`, `mypy`) — 그대로 포착합니다.
- 라우터 구조, 요청 → 의존성 → 핸들러 → 응답 모델 흐름, 설정과 시크릿의 위치.
- 동기 대 비동기 엔드포인트, 이벤트 루프의 블로킹 호출, 라우터·스키마·의존성에 적합한 스킬.

## 참고

앱이 조립되는 방식(`include_router`), 실행 명령(`uvicorn app.main:app`), Alembic이 마이그레이션을 관리하는지 여부를 포착합니다.
