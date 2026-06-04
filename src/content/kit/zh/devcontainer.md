---
title: Devcontainer
description: "一个可选附加组件，从检测到的技术栈添加或协调一个基于 compose 的 devcontainer，并具备能在重建后存续的持久 AI-CLI 认证。"
kind: addon
lang: zh
order: 1
---

# Devcontainer 附加组件

为仓库添加一个可复现、隔离的开发容器。Deep Work Plan 的第一个可选附加组件。

## 它添加了什么

- 一个基于 compose 的 devcontainer，其基础镜像与支撑服务从检测到的技术栈推理而来。
- 能在重建后存续的持久 AI-CLI 认证卷（Claude、Codex、Cursor、gh、Dailybot）。
- `dailybot-project-network`、`DOCKER_DEV_ENV=vscode` 约定，以及验证别名（`codecheck`、`check`、`fix`、`test`）。
- 对于公开仓库，一个排除机密的 `.dockerignore` 与一个不含机密的 `.env.example`。

## 行为

devcontainer 约 85% 是一套稳定的通用骨架；其余 15%——基础镜像、用户、工作区文件夹、服务、端口、机密——从仓库真实的技术栈推理而来。一个既有的 devcontainer 会被协调，绝不被覆盖。

## 备注

可选且绝非必需。一个仓库在不带任何附加组件时即完全符合规范。
