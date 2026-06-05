---
title: Next.js
description: "面向 Next.js 项目的接入预设，包含 App Router 与 Pages Router 的区分、服务端与客户端组件、路由处理器与测试的推理提示。"
kind: preset
lang: zh
order: 12
stack: Next.js (React)
---

# Next.js 预设

onboard 流程用于 Next.js 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `package.json` 中包含 `next` 与 `react`，以及 `next.config.js`/`next.config.mjs`/`next.config.ts`。
- `app/`（App Router，包含服务端/客户端组件与路由处理器）或 `pages/`（Pages Router，包含 API 路由）——检测实际使用的是哪一种。
- 包管理器从已存在的锁文件（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）中推断。

## 需要推理的内容

- 真实的代码检查（带 `next/core-web-vitals` 的 `eslint`）、测试（Jest/Vitest，以及 Playwright/Cypress 端对端测试）与构建（`next build`）脚本——原样捕获。
- 路由模型（App Router 还是 Pages Router）、服务端与客户端组件的拆分，以及数据获取与路由处理器的存放位置。
- 适合该技术栈的技能：`page`/`route`、`server-component`、`route-handler`、`component`。

## 备注

在生成技能前先检测路由模型——App Router 与 Pages Router 有不同的文件约定与数据获取模型。
