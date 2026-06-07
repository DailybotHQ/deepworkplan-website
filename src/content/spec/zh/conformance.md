---
title: 符合性
description: "对一个符合 DWP、AI-first 代码仓库的规范性定义：它 MUST 与 SHOULD 拥有的产物、什么使一份计划结构良好，以及如何验证它。"
order: 6
lang: zh
section: Conformance
---

# 符合性

**版本 1.0。状态：稳定。** 本文档界定了一个代码仓库*符合 Deep Work Plan*——也就是 AI-first、可被代理驾驭——意味着什么。关键词 MUST、MUST NOT、SHOULD、SHOULD NOT 与 MAY 应按 RFC 2119 中所述加以解释。

符合性之所以存在，是为了让“AI-first”成为一项客观、可核查的属性，而非一种印象。一个仓库要么满足下述标准，要么不满足。[`verify` 子技能](/kit)（`/dwp-verify`）会以机械方式核查它们。

## 一个符合规范的代码仓库

一个符合 DWP 的代码仓库 MUST 满足以下全部要点。每一件产物都 MUST **为该仓库经过推理**——适配于它真实的语言、框架与命令。一份泛用的占位骨架、一个占位符，或从另一个仓库复制来的内容，都不满足任何一项标准。

1. **根目录的 `AGENTS.md`。** 仓库 MUST 包含一个根级 `AGENTS.md`，其中含有（a）文档索引、（b）该仓库的强制规则，以及（c）一个 Quick Commands 块，其命令在本仓库中**真实且可运行**。占位命令（例如在一个不使用 npm 的仓库中出现 `npm test`）MUST NOT 出现。
2. **`CLAUDE.md` 解析到 `AGENTS.md`。** MUST 存在一个 `CLAUDE.md` 并解析到 `AGENTS.md`（一个符号链接，或保证单一事实来源的等价方式）。两者 MUST NOT 相互背离。
3. **一套 `docs/` 层级结构。** 仓库 MUST 包含一个 `docs/` 目录，涵盖标准的各类别（架构、规范、测试、开发命令、安全与代理接入），并具备真实、仓库专属的内容。复杂模块 SHOULD 携带各自的 `README.md`。
4. **一个 `.agents/` 目录。** 仓库 MUST 包含一个 `.agents/` 目录，含 `agents/`、`commands/` 与 `skills/`，外加 `.agents/docs/` 之下一份**与磁盘上一致**的目录。`dwp-*` 命令 MUST 是委派给已安装技能的轻量委派器。一个 `.claude` 路径 MUST 解析到 `.agents`。
5. **一个被 gitignore 的 `.dwp/` 工作区。** 仓库 MUST 包含一个含 `plans/` 与 `drafts/` 的 `.dwp/` 目录，且 `.dwp/` MUST 被 gitignore。一个 `tmp/` 草稿空间 SHOULD 存在，并 SHOULD 被 gitignore。
6. **方法论技能可被解析。** Deep Work Plan 技能 MUST 被安装或被引用，使得仓库中的代理能够调用其各子技能。

一个仓库**在不带任何附加组件时即完全符合规范**。附加组件（devcontainer、Dailybot、dependency-upgrade、design-system）是可选的，MUST NOT 作为符合性的必要条件。

## 一份结构良好的计划

`.dwp/plans/` 中的一份 Deep Work Plan 在满足以下条件时即为结构良好：

1. 每项任务 MUST 声明一个明确的**范围**、**验收标准**，以及至少一个**验证关卡**（一个客观地非通过即失败的命令或核查）。
2. 计划 MUST 持久化进展，使工作能在中断中存续，并能被另一个代理恢复。
3. 计划 MUST 包含两项强制收尾任务——Skills & Agents Discovery 与 Executive Report。
4. 任务 SHOULD 在执行之前重新锚定到计划的目标，以防止在长周期中发生漂移。

## 验证符合性

符合性 SHOULD 以机械方式验证，而非靠人工检查。运行 `/dwp-verify` 会针对上述标准生成一份通过/未通过报告：`AGENTS.md` 的存在与真实内容、`CLAUDE.md` 的解析、`docs/` 的各类别、`.agents/` 目录与磁盘的一致性、`.dwp/` 与 `tmp/` 的 gitignore 状态，以及——对一份计划而言——每项任务都带有验收标准与验证关卡。

一个仓库 SHOULD 在接入之后、以及每份计划完成之后重新验证，使符合性得以持续维护，而非只声称一次。
