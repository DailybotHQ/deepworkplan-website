---
title: 附加组件
description: "可选的DWP扩展：五个已发布附加组件（devcontainer、Dailybot、dependency-upgrade、design-system、AI Diff Reviewer）、附加组件合约，以及套件相关概念（skills、agents、presets）说明。"
order: 5
lang: zh
section: Addons
---

# 附加组件

**版本 2.0。** 附加组件是对核心 Deep Work Plan 方法论的可选扩展。它们**从不要求符合性**——零附加组件的仓库完全符合 AI-first 与 DWP 规范。每个附加组件在接入期间提供，由开发者明确接受或拒绝，且——接受后——**调和**现有设置而非覆盖。

## 附加组件合约

每个已发布的附加组件提供四个强制组件：

| 组件 | 用途 |
|------|------|
| **Spec** | 规范性 RFC-2119 描述，说明附加组件提供什么以及「符合此附加组件」的含义 |
| **Reasoning templates** | 代理根据目标仓库技术栈推理填写的指南——非复制粘贴 |
| **Onboarding hook** | `SKILL.md` 入口点，`onboard` 流程在开发者接受时调用 |
| **Validation step** | 确认附加组件已正确应用的检查清单 |

发现机制：`onboard` 流程枚举 `skills/deepworkplan/addons/`，并在核心脚手架完成后的 **第 7b 阶段**将每个附加组件作为可选步骤呈现。

## 已发布的附加组件（五个）

当前发布五个附加组件。每个都有**套件目录页**（面向用户的详情）以及 Deep Work Plan 技能内的**规范性规格**。

### Devcontainer（第一个附加组件）

基于 compose 的 `.devcontainer/` + `docker/` 设置，根据检测到的技术栈推理生成。

- **套件页：** [Devcontainer](/kit/devcontainer)
- **新增内容：** 持久化 AI-CLI 认证卷（Claude、Codex、Cursor、gh、Dailybot）、`dailybot-project-network`、`DOCKER_DEV_ENV=vscode`、验证别名（`codecheck`、`check`、`fix`、`test`）、公开 OSS 密钥卫生
- **行为：** 约 85% 稳定骨架；约 15% 按技术栈推理。现有 devcontainer 被调和，绝不覆盖
- **何时提供：** 大多数使用 Docker 或受益于隔离开发容器的服务的仓库

### Dailybot（第二个附加组件）

与开发者 **Dailybot 团队**的可选连接，用于代理进展可见性。

- **套件页：** [Dailybot](/kit/dailybot)——完整能力参考
- **DWP 附加组件接入的内容：** 通过 dailybot `report` 子技能的四个计划生命周期报告（kickoff、significant task、blocked、completion）；可选确定性钩子强制层（`dailybot hook`，CLI `>= 3.7.0`）
- **配套技能：** 安装 [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)（当前 **3.10.3**）暴露 **14 项能力**——在 Slack/Teams/Discord/Google Chat 上聊天、签到、表单编写、Ask AI、kudos、每仓库 API 密钥（`.dailybot/env.json`）、电子邮件等。DWP 附加组件仅接入 **report**；其他能力通过 Dailybot 技能直接调用
- **认证：** 完全延后至 Dailybot 技能（`dailybot login` 或 `DAILYBOT_API_KEY`）；此附加组件从不存储凭据
- **供应商中立护栏：** 核心 DWP 对 Dailybot **零**依赖；切勿为所有人自动安装
- **何时提供：** 开发者或团队已在使用 Dailybot，或明确要求团队报告

### Dependency upgrade（第三个附加组件）

与包管理器无关、分批、经验证、可回退的依赖升级。

- **套件页：** [Dependency upgrade](/kit/dependency-upgrade)
- **新增内容：** 检测仓库的**真实**管理器（npm/pnpm/yarn + ncu、pip/poetry/uv、cargo、go mod、bundler、composer……），按 semver 分类批次升级，每批后运行仓库验证关卡，回退失败批次，总结但不自动提交
- **命令：** 仅在接受时向 `.agents/commands/` 安装 `/lib-upgrade`
- **何时提供：** 存在锁文件且依赖密集型技术栈；仅在相关时推荐

### Design system（第四个附加组件）

限定于界面表面的 `DESIGN.md`，任何编码代理读取它以生成一致的 UI、CLI 或对话输出。

- **套件页：** [Design system](/kit/design-system)
- **新增内容：** `docs/DESIGN.md`（由 `AGENTS.md` 引用），最多三个**配置档**叠加于同一文件：**visual-ui**（渲染 UI 令牌与组件）、**cli-output**（语义化终端样式、TTY/`NO_COLOR` 降级）、**conversational**（语态、消息结构、按平台渲染及纯文本回退）
- **配置档强度：** 检测到 visual-ui 时**默认开启**；检测到 cli-output 与 conversational 时**推荐、始终询问、绝不自动应用**
- **何时提供：** 仅当检测到面向用户的界面表面时——不适用于纯库、无头服务或纯基础设施仓库

### AI Diff Reviewer（第五个附加组件）

与 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（marketplace **"AI Diff Reviewer"**，当前版本 **v2.0.0**）的可选连接，通过结构化的本地审查增强强制性安全审查，并可选地在 CI 中对拉取请求设置门控。

- **套件页：** [AI Diff Reviewer](/kit/ai-diff-reviewer) — 完整能力参考
- **DWP 附加组件接入的内容：** 通过上游 skill 父级默认流的本地安全审查增强；需要 `.review/extension.md`（仅 skill 不完整）；Flow B 可选安装 `pr-review.yml`（`DailybotHQ/ai-diff-reviewer@v2`）并将 `apply-review` 作为开发者调用的伴随工具公开——绝不作为计划任务
- **流程：** **A — 仅本地**（skill + 扩展）或 **B — 双层面**（skill + 扩展 + CI Action）。附加组件**必须询问**哪个流程；绝不默认
- **软失败 vs 门控：** 缺少 skill/扩展/调用错误绝不阻塞；来自**已完成**本地通道的 `critical` 结果仍遵循安全审查合同
- **奇偶性（Flow B）：** 共享 `prompt.md` + 扩展对齐方法论/严重程度；CI 迭代感知审查可缩短第 2+ 轮，而本地通道保持完整
- **供应商中立护栏：** 核心 DWP 对 AI Diff Reviewer **零**依赖；切勿为所有人自动安装
- **何时提供：** 开发者或团队想要结构化本地审查和/或 CI PR 合并门控

## 技能

技能是按名称调用的可复用过程。一项技能将可重复的工作流打包（运行测试、修复 lint、创建组件）。

方法论附带一小组核心子技能。其中，**author** 子技能让仓库**培育自己的套件**：通过 `/skill-create` 与 `/agent-create` 调用，它推理仓库现有的 `.agents/` 布局与约定，然后撰写与之匹配的新技能、代理或轻量命令委派器，并保持目录同步。同一子技能执行强制的 Skills & Agents Discovery 任务。

套件条目：[Skill create](/kit/skill-create)、[Agent create](/kit/agent-create)。

## 代理

代理是带有既定角色的专职工作者（reviewer、executor、architect）。它们位于 `.agents/agents/` 下，并在 `.agents/docs/` 中编目。

## 维护类附加组件

上方的 **dependency-upgrade** 附加组件是主要的维护附加组件。它推理仓库实际的包管理器而非假定 npm，按 semver 分类升级，安全分批升级，每批后运行验证，并回退任何失败的批次。

## Design-system 附加组件

参见已发布附加组件下的 [Design system](/kit/design-system)。仓库级 `DESIGN.md` 与按功能的技术设计文档不同：DWP 的计划 README、任务验收标准与验证关卡已涵盖按功能的设计。design-system 附加组件填补持久的、仓库原生的**界面**设计上下文。

## 预设

预设将 DWP 适配到特定技术栈（Django、React、Go、Astro + Svelte 等）。浏览[套件目录](/kit)。

## 适配器

适配器将 DWP 命令映射到特定代理的命令系统（Claude Code、Cursor、Codex、Gemini、Copilot、OpenClaw 等）。适配器条目位于套件中各代理名称下。

## 示例

示例演示 DWP 实践：前后对比、示例计划、案例研究。参见 [Examples](/examples) 与 [Dogfood this site](/kit/dogfood-this-site)。

## 符合性提醒

仓库**必须**在**零**附加组件下完全符合规范。附加组件为分层可选能力——绝非前提条件。参见 [Conformance](/spec/conformance)。
