---
title: Astro / Svelte
description: "面向 Astro 站点（可选搭配 Svelte 岛屿）的接入预设，附有关于内容集合、schema 校验与岛屿水合的推理提示。"
kind: preset
lang: zh
order: 3
stack: Astro / Svelte
---

# Astro / Svelte 预设

onboard 流程用于 Astro 站点（可选搭配 Svelte 岛屿）的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `astro.config.*`；可选地含 `@astrojs/svelte` 与 `.svelte` 组件。
- `src/content/` 之下带 Zod schema 的 Content Collections。

## 需要推理的内容

- 真实的 lint、type-check（`astro check`）、test 与 build 脚本——原样捕获。
- 内容集合的 schema 与岛屿水合约定（`client:visible` 优先于 `client:load`）。
- 面向组件、页面与内容条目的、与技术栈相适配的技能。

## 备注

适用于使用 Astro 岛屿架构、带选择性交互的内容驱动型站点。
