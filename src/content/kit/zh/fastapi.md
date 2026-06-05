---
title: FastAPI
description: "面向 FastAPI 服务的接入预设，包含路由、Pydantic 模型、异步端点、依赖注入与测试运行器的推理提示。"
kind: preset
lang: zh
order: 7
stack: FastAPI
---

# FastAPI 预设

onboard 流程用于 FastAPI 服务的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `pyproject.toml` 或 `requirements.txt` 中包含 `fastapi`、一个 ASGI 服务器（`uvicorn`、带 `uvicorn.workers` 的 `gunicorn`），以及一个 `app = FastAPI()` 实例。
- `APIRouter` 模块、`async def` 路径操作，以及 Pydantic 模型或 `pydantic-settings`。
- 包管理器与测试运行器从已存在的清单文件与锁文件中推断。

## 需要推理的内容

- 真实的测试命令（通常是带 `httpx`/`TestClient` 的 `pytest`）以及代码检查与类型检查关卡（`ruff`、`mypy`）——原样捕获。
- 路由结构、请求 → 依赖 → 处理器 → 响应模型的流转，以及配置与密钥的存放位置。
- 同步与异步端点的区别、事件循环中的阻塞调用，以及适合该技术栈的路由、模式与依赖相关技能。

## 备注

捕获应用的组装方式（`include_router`）、运行命令（`uvicorn app.main:app`），以及是否使用 Alembic 管理数据库迁移。
