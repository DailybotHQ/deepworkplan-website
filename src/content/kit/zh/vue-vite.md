---
title: Vue + Vite
description: "面向 Vue + Vite 项目的接入预设，附有关于单文件组件、Composition API、Pinia store 与 Vitest 测试的推理提示。"
kind: preset
lang: zh
order: 2
stack: Vue + Vite
---

# Vue + Vite 预设

onboard 流程用于 Vue + Vite 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `vite.config.*` 且依赖中含 `vue`（Vue 3、`<script setup>`）。
- `@vitejs/plugin-vue`、`vue-tsc`、`vue-router`、`pinia`。
- 包管理器从存在的锁文件推断而来。

## 需要推理的内容

- 真实的 lint、type-check（`vue-tsc --noEmit`）、test（Vitest/Jest）与 build 脚本——原样捕获。
- 测试约定（`*.spec.ts` / `*.test.ts`）与 `@vue/test-utils` 模式。
- 与技术栈相适配的技能：`component`、`store-module`、`composable`、`view`/`route`。

## 备注

若依赖中是 `react` 而非 `vue`，则以同样的推理搭配 React 形态的技能复用之。
