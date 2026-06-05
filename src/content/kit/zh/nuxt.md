---
title: Nuxt
description: "面向 Nuxt 项目的接入预设，包含页面、服务端 API 路由、composable、Nitro 服务引擎与测试的推理提示。"
kind: preset
lang: zh
order: 14
stack: Nuxt (Vue)
---

# Nuxt 预设

onboard 流程用于 Nuxt 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `nuxt.config.ts` 与依赖项中的 `nuxt`，以及 `app.vue` 入口点。
- `pages/`（基于文件的路由）、`server/api/`（Nitro 端点）、`composables/`，以及自动导入的 `components/`。
- 包管理器从已存在的锁文件（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）中推断。

## 需要推理的内容

- 真实的代码检查（`eslint`）、类型检查（`nuxi typecheck`）、测试（带 `@nuxt/test-utils` 的 Vitest）与构建（`nuxt build`）脚本——原样捕获。
- 路由与数据获取（`useFetch`/`useAsyncData`）、Nitro 的 `server/api/` 路由、composable 与自动导入约定；渲染模式（SSR/SSG/SPA）。
- 适合该技术栈的技能：`page`/`route`、`server-route`（`server/api`）、`composable`、`component`。

## 备注

自动导入（组件、composable、工具函数）是 Nuxt 的约定——应将其纳入考量，而非在所有地方添加显式导入。
