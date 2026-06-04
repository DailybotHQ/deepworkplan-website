---
title: Python package / CLI
description: "面向 Python 包与 CLI 工具的接入预设，附有关于包布局、控制台入口点与 pytest 验证关卡的推理提示。"
kind: preset
lang: zh
order: 5
stack: Python package / CLI
---

# Python package / CLI 预设

onboard 流程用于 Python 包与 CLI 工具的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 带 `[project.scripts]` 入口点的 `pyproject.toml`（一个可安装的 CLI）。
- 依赖中的一个 CLI 框架：`click`、`typer` 或标准库 `argparse`。
- 一个 src 布局（`src/<pkg>/`）或带 `__init__.py`、`cli.py`/`__main__.py` 与 `commands/` 的根级包。

## 需要推理的内容

- 真实的验证关卡（`ruff check`、`mypy`、`pytest`）——原样捕获，包括任何 Makefile/tox/hatch 封装。
- 控制台脚本的入口名称，以及命令/子命令的结构。
- 与技术栈相适配的技能：`command-add`、`subcommand`、`option`/`flag`，以及若它发布到 PyPI 则含 `release`。

## 备注

公开 API 的稳定性、帮助文本与退出码都是面向用户的对象面——把它们当作标准来对待。
