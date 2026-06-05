---
title: Generic
description: "面向任意项目的兜底接入预设，以技术栈无关的推理提示从仓库中检测构建与测试命令。"
kind: preset
lang: zh
order: 100
stack: Generic
---

# Generic 预设

当没有任何技术栈专属的预设适用时，onboard 流程所使用的兜底推理指南。它是一份清单，而非模板——检测到的现实优先。

## 需要推理的内容

- 从清单文件、Makefile 或 CI 中检测真实的构建与测试命令——原样捕获。
- 应用通用约定；不做任何技术栈专属的假设。
- 只生成与仓库实际工作流相匹配的技能、代理与文档。

## 备注

当 Django、Vue + Vite、Astro/Svelte、Node/TS 服务或 Python 包/CLI 都不匹配时的兜底方案。
