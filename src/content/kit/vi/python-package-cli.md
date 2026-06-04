---
title: Python package / CLI
description: "Preset onboarding cho các gói Python và công cụ CLI, với gợi ý suy luận về bố cục gói, các entry point console và validation gate pytest."
kind: preset
lang: vi
order: 5
stack: Python package / CLI
---

# Python package / CLI preset

Một hướng dẫn suy luận mà luồng onboard sử dụng cho các gói Python và công cụ CLI. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu

- `pyproject.toml` với một entry point `[project.scripts]` (một CLI có thể cài đặt).
- Một CLI framework trong dependency: `click`, `typer`, hoặc `argparse` của thư viện chuẩn.
- Bố cục src (`src/<pkg>/`) hoặc gói ở gốc với `__init__.py`, `cli.py`/`__main__.py`, và `commands/`.

## Cần suy luận về điều gì

- Validation gate thực (`ruff check`, `mypy`, `pytest`) — ghi lại nguyên văn, bao gồm mọi lớp bọc Makefile/tox/hatch.
- Tên của console-script entry và cấu trúc command/subcommand.
- Các skill phù hợp với stack: `command-add`, `subcommand`, `option`/`flag`, và `release` nếu gói được phát hành lên PyPI.

## Ghi chú

Tính ổn định của public API, văn bản trợ giúp, và mã thoát là các bề mặt hướng người dùng — hãy coi chúng như những tiêu chuẩn.
