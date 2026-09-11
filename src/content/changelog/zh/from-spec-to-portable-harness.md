---
title: "DWP v1：从计划循环到可移植的运行框架"
description: "Deep Work Plan 从单一的计划编写循环，成长为一套可移植的采用工具包——具备信任与溯源、更广泛的代理主机覆盖，以及任何代码仓库都能运行的合规检查器。"
date: 2026-06-12
version: "v1 · 基础"
kind: foundation
lang: zh
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

在此之前，Deep Work Plan 一直是单个代理在单次会话内遵循的计划编写循环。这一系列发布，让它变成了代码仓库可以按照自身条件采用的东西——这是第一个致力于超越单个代理与单次会话的版本。

该 skill 获得了带校验和溯源信息的信任声明，让开发者在安装之前就能准确看到它会读取和写入什么。入门预设与受支持的代理主机大幅扩展，测试纪律成为每个任务不可或缺的一部分，而不再是事后补充；合规检查器让代码仓库能够——客观地，而非凭假设——验证自己是否符合标准。状态与恢复协议意味着被中断的计划可以从中断处继续，而不必从头再来。在底层，`.claude` 与 `.cursor` 的兼容性收敛到统一的规范目录 `.agents`，让每一个受支持的代理读取同一套工具包。

这些发布共同为下一阶段奠定基础：代码仓库不再只是存放计划的地方，而开始成为代理的工作运行框架。

完整的发布序列请参见[该 skill 的发布历史](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md)。
