---
title: Python package / CLI
description: "Python 패키지와 CLI 도구를 위한 온보딩 프리셋으로, 패키지 구성, 콘솔 진입점, pytest 검증 게이트에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 5
stack: Python package / CLI
---

# Python package / CLI 프리셋

onboard 흐름이 Python 패키지와 CLI 도구에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `[project.scripts]` 진입점을 갖춘 `pyproject.toml`(설치 가능한 CLI).
- 의존성의 CLI 프레임워크: `click`, `typer`, 또는 stdlib `argparse`.
- src 레이아웃(`src/<pkg>/`) 또는 `__init__.py`, `cli.py`/`__main__.py`, `commands/`를 갖춘 루트 패키지.

## 무엇을 추론할 것인가

- 실제 검증 게이트(`ruff check`, `mypy`, `pytest`) — Makefile/tox/hatch 래퍼를 포함해 그대로 포착합니다.
- 콘솔 스크립트 진입 이름과 명령/하위 명령 구조.
- 스택에 맞는 스킬: `command-add`, `subcommand`, `option`/`flag`, 그리고 PyPI로 배포한다면 `release`.

## 참고

공개 API 안정성, 도움말 텍스트, 종료 코드는 사용자 대면 표면입니다 — 표준으로 다루세요.
