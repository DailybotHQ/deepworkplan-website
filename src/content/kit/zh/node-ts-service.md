---
title: Node / TS service
description: "面向 Node 与 TypeScript 服务及无服务器 API 的接入预设，附有关于请求生命周期、集成与测试的推理提示。"
kind: preset
lang: zh
order: 4
stack: Node / TS service
---

# Node / TS service 预设

onboard 流程用于 Node/TypeScript 服务与无服务器 API 的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `tsconfig.json` 外加一个服务端框架（`express`、`fastify`、`@nestjs/*`）或无服务器处理器（`serverless.yml`、`template.yaml`、一个 `functions/` 目录）。
- 包管理器从存在的锁文件推断而来。

## 需要推理的内容

- 真实的 lint、type-check（`tsc --noEmit`）、test（Jest/Vitest）与 build 脚本——原样捕获。
- 它是一个长时运行的服务还是无服务器——这会塑造架构与性能文档。
- 与技术栈相适配的技能：`endpoint`/`handler`、`service`、`middleware`、`integration` 或 `lambda-fn`。

## 备注

捕获请求或事件的生命周期、集成点，以及机密与配置存放于何处。
