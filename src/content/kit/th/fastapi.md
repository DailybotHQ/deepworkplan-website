---
title: FastAPI
description: "พรีเซ็ต onboarding สำหรับบริการ FastAPI พร้อมแนวคิดสำหรับ router, Pydantic model, async endpoint, dependency injection และ test runner"
kind: preset
lang: th
order: 7
stack: FastAPI
---

# พรีเซ็ต FastAPI

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับบริการ FastAPI นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `fastapi` ใน `pyproject.toml` / `requirements.txt`, ASGI server (`uvicorn`, `gunicorn` พร้อม `uvicorn.workers`) และ instance `app = FastAPI()`
- โมดูล `APIRouter`, path operation แบบ `async def` และ Pydantic model หรือ `pydantic-settings`
- อนุมาน package manager และ test runner จาก manifest และ lockfile ที่มีอยู่

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (มักเป็น `pytest` ร่วมกับ `httpx`/`TestClient`) และ gate ของ lint/type-check (`ruff`, `mypy`) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- โครงสร้าง router, flow ของ request → dependency → handler → response model และตำแหน่งที่เก็บ setting และ secret
- endpoint แบบ sync กับ async, การเรียก blocking ใน event loop และ skill ที่เหมาะกับสแตกสำหรับ router, schema และ dependency

## หมายเหตุ

บันทึกวิธีที่ app ถูก assemble (`include_router`), คำสั่งรัน (`uvicorn app.main:app`) และว่า Alembic จัดการ migration หรือไม่
