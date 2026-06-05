---
title: SvelteKit
description: "面向 SvelteKit 项目的接入预设，包含路由、load 函数、服务端端点、所选适配器与测试的推理提示。"
kind: preset
lang: zh
order: 13
stack: SvelteKit
---

# SvelteKit 预设

onboard 流程用于 SvelteKit 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `svelte.config.js` 与 `vite.config.*`，以及依赖项中的 `@sveltejs/kit`。
- `src/routes/` 下包含 `+page.svelte`、`+page.server.ts`/`+page.ts`、`+layout.svelte` 与 `+server.ts` 端点。
- 包管理器从已存在的锁文件（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）中推断。

## 需要推理的内容

- 真实的代码检查（`eslint`）、类型检查（`svelte-check`）、测试（Vitest，以及 Playwright 端对端测试）与构建（`vite build`）脚本——原样捕获。
- 路由与 `load` 模型（服务端加载还是通用加载）、表单 action，以及 `+server.ts` API 端点；已配置的适配器。
- 适合该技术栈的技能：`route`（`+page` + `load`）、`endpoint`（`+server.ts`）、`component`。

## 备注

记录已配置的适配器（`adapter-auto`、`-node`、`-static`、Cloudflare、Vercel）——它决定了构建与部署方式。
