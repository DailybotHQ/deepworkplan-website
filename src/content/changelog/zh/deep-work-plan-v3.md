---
title: "DWP v3：构造出的令牌效率"
description: "Deep Work Plan v3 围绕上下文成本重构运行框架——渐进式披露、仅针对受影响范围的验证，以及单一的强制性 Final Review——同时提高了信任与合规的最低门槛。"
date: 2026-09-10
version: "v3 · 令牌效率"
kind: release
lang: zh
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

今天，我们发布 Deep Work Plan v3。上下文是代理最稀缺的资源，这次发布将其当作一个工程问题来对待，而不是一句非正式的承诺：压缩的是脚手架，而不是指令本身。

`GUIDE.md` 不再是每个代理都要通读的文档，而成为一份路由索引，让代理只加载某个步骤实际需要的指导内容。验证关卡现在根据每个任务的触及范围来选择，而不是每次改动都重新运行整套测试；当开发者已经明确知道自己想要什么时，创建计划也可以直接进入信任模式，跳过中间的审查环节。这些改动都没有削弱关卡本身：它们消除的是重复的阅读、冗余的上下文加载，以及与实际改动不匹配的验证工作。

在推进效率工作的同时，这次发布也提高了信任的最低门槛。曾经用来收尾一份计划的三个收尾任务，被单一的强制性 Final Review 取代；AI Diff Reviewer 的本地审查成为基线中的必需组件；合规性现在从零个可选插件开始计算——安全与溯源是硬性要求，而不是可选的润色。`AGENTS.md` 会记录代码仓库所遵循的 DWP 标准溯源信息，遗留计划则保留其原有记录形态，并获得明确的迁移路径，而不会被悄悄改写。

本次发布遵循 DWP 标准 `2.3.0`。指令负载与重放行为都依据公开的评估台账来衡量，绝不会以凭空捏造的节省百分比来呈现。

阅读[令牌效率架构](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md)及其[评估记录](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md)，或探索[规范文档](https://deepworkplan.com/spec)与[工具包](https://deepworkplan.com/kit/)。
