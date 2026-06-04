---
title: Django
description: "面向 Django 项目的接入预设，附有关于应用、迁移、设置、管理命令与测试运行器的推理提示。"
kind: preset
lang: zh
order: 1
stack: Django
---

# Django 预设

onboard 流程用于 Django 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `manage.py` 与 `settings.py`；含 `models.py`、`views.py`、`migrations/` 的应用。
- 包管理器与测试运行器从存在的清单与锁文件推断而来。

## 需要推理的内容

- 真实的测试命令（通常是 `python manage.py test` 或 `pytest`）以及任何 lint/type-check 关卡——原样捕获。
- 应用与迁移约定、设置与环境布局，以及管理命令模式。
- 面向应用、模型、视图与迁移的、与技术栈相适配的技能。

## 备注

适用于遵循标准项目布局的 Django 应用。
