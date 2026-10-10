---
title: 附加组件
description: "DWP 附加组件：七个可选扩展、必备的 AI Diff Reviewer 本地审查及其可选 CI 层面、附加组件合约与套件概念。"
order: 6
lang: zh
section: Addons
---

# 附加组件

> **版本范围：** 本文档是保留的 v5.0.0 基础文档。当前标准 DWP 7.0.0 还要求遵循[规范索引](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/skills/deepworkplan/spec/README.md)中适用的 `V6_*.md` 与 `V7_*.md` 扩展。现有 v5 与 v6 计划保留其记录的规则。

**版本 2.1.0。** 附加组件是对核心 Deep Work Plan 方法论的扩展。八个之中有七个是可选的，且**绝非符合性所必需**——零可选附加组件的仓库完全符合 AI-first 与 DWP 规范。每个可选附加组件在接入期间提供，由开发者明确接受或拒绝，且——接受后——**调和**现有设置而非覆盖。一个组件是声明的例外：自标准 2.3.0 起，**AI Diff Reviewer 本地审查**属于必备基线——接入时安装它，每份 Final Review 都运行它——而其 CI 层面保持可选。

## 附加组件合约

每个已发布的附加组件提供四个强制组件：

| 组件 | 用途 |
|------|------|
| **Spec** | 规范性 RFC-2119 描述，说明附加组件提供什么以及「符合此附加组件」的含义 |
| **Reasoning templates** | 代理根据目标仓库技术栈推理填写的指南——非复制粘贴 |
| **Onboarding hook** | `SKILL.md` 入口点，`onboard` 流程在开发者接受时调用 |
| **Validation step** | 确认附加组件已正确应用的检查清单 |

发现机制：`onboard` 流程枚举 `skills/deepworkplan/addons/`，并在核心脚手架完成后的 **第 7b 阶段**将每个附加组件作为可选步骤呈现。

## 已发布的附加组件（八个）

当前发布八个附加组件——七个可选，外加必备的本地审查。每个都有**套件目录页**（面向用户的详情）以及 Deep Work Plan 技能内的**规范性规格**。其中四个——devcontainer、Herdr、DeepWorkPlan Vim 与 Agentkit——是按 tag 固定到某个产品的轻量集成器，该产品拥有自己的仓库与发布周期；每个产品都能脱离 Deep Work Plan 独立运行。被接受的附加组件会记录在 `.dwp/config.json` 附加组件注册表中（DWP 7.0.0），该注册表只能提供或增强能力——绝不为符合性或计划设置门控。

### Devcontainer（第一个附加组件）

[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)（`dck`，固定为 `v0.2.2`，接口 `2`）的轻量集成器：一个由 `dck init` 渲染到仓库中、作为仓库自有容器的 Dev Containers 模板，外加 `dck-dockerfile` 技能。

- **套件页：** [Devcontainer](/kit/devcontainer)
- **新增内容：** 基于按 digest 固定的运行时官方镜像生成的 `docker/local/<service>/Dockerfile`（`python-3.13`、`node-24` 或 `debian`，无共享基础镜像）、构建在 `dck` 启动器（`up`、`shell`、`rebuild`、`doctor`）之上的 `dev.sh`、作为可选启用层的编码代理、仅限回环地址的端口、经由宿主机 agent 通过 SSH 使用的 git（容器内不放任何密钥），以及每个容器采用标准布局的 Herdr 机器
- **行为：** 通过 `dck doctor --json`（接口 2）检测；`dck init` 仅在其 diff 被接受后才调和现有 devcontainer，并先备份该文件——绝不覆盖
- **何时提供：** 大多数使用 Docker 或受益于隔离开发容器的服务的仓库

### Dailybot（第二个附加组件）

与开发者 **Dailybot 团队**的可选连接，用于代理进展可见性。

- **套件页：** [Dailybot](/kit/dailybot)——完整能力参考
- **DWP 附加组件接入的内容：** 通过 dailybot `report` 子技能的四个计划生命周期报告（kickoff、significant task、blocked、completion）；可选确定性钩子强制层（`dailybot hook`，CLI `>= 3.9.0`）
- **配套技能：** 安装 [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill)（当前 **3.23.3**）暴露 **17 项能力**——在 Slack/Teams/Discord/Google Chat 上聊天、签到、表单编写、Ask AI、kudos、Plan 看板与任务、组织标签、每仓库 API 密钥（`.dailybot/env.json`）、电子邮件等。DWP 附加组件仅接入 **report**；其他能力通过 Dailybot 技能直接调用
- **认证：** 完全延后至 Dailybot 技能（`dailybot login` 或 `DAILYBOT_API_KEY`）；此附加组件从不存储凭据
- **供应商中立护栏：** 核心 DWP 对 Dailybot **零**依赖；切勿为所有人自动安装
- **何时提供：** 开发者或团队已在使用 Dailybot，或明确要求团队报告

### Dependency upgrade（第三个附加组件）

与包管理器无关、分批、经验证、可回退的依赖升级。

- **套件页：** [Dependency upgrade](/kit/dependency-upgrade)
- **新增内容：** 检测仓库的**真实**管理器（npm/pnpm/yarn + ncu、pip/poetry/uv、cargo、go mod、bundler、composer……），按 semver 分类批次升级，每批后运行仓库验证关卡，回退失败批次，总结但不自动提交
- **命令：** 仅在接受时向 `.agents/commands/` 安装 `/lib-upgrade`
- **何时提供：** 为每个声明了依赖的仓库提供；惰性的 `/lib-upgrade` 委托命令在接入授权下安装，除非明确拒绝——安装本身不执行任何升级

### Design system（第四个附加组件）

限定于界面表面的 `DESIGN.md`，任何编码代理读取它以生成一致的 UI、CLI 或对话输出。

- **套件页：** [Design system](/kit/design-system)
- **新增内容：** `docs/DESIGN.md`（由 `AGENTS.md` 引用），最多三个**配置档**叠加于同一文件：**visual-ui**（渲染 UI 令牌与组件）、**cli-output**（语义化终端样式、TTY/`NO_COLOR` 降级）、**conversational**（语态、消息结构、按平台渲染及纯文本回退）
- **配置档强度：** 检测使提供该提案成为必须，而安装以明确接受为前提（引导模式与信任模式一视同仁）——检测到 visual-ui 时**受到强烈推荐**；检测到 cli-output 与 conversational 时**推荐、始终询问、绝不自动应用**
- **何时提供：** 仅当检测到面向用户的界面表面时——不适用于纯库、无头服务或纯基础设施仓库

### AI Diff Reviewer（第五个附加组件——必备本地审查、可选 CI 层面）

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（marketplace **"AI Diff Reviewer"**）为强制的 Final Review 安全审查环节提供结构化的本地审查，并可选地在 CI 中对拉取请求设置门控。自标准 2.3.0 起，**本地审查属于基线的一部分**；只有 CI 层面是可选的。此附加组件会随每次发布自动刷新，因此下方展示的标签是撰写本文时的当前标签，可能落后于实际 vendored 的副本——该附加组件自身的 `SKILL.md` 及其 GitHub 发布记录才是实际所装标签的权威来源。安装始终固定到已发布的标签，绝不指向移动的分支。

- **套件页：** [AI Diff Reviewer](/kit/ai-diff-reviewer) — 完整能力参考
- **接入时必备（第 7a 阶段）：** 在接入授权之下，标签锁定安装 vendored skill（`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`），外加按仓库定制的 `.review/extension.md`（通过 `generate-extension`）；缺失时由定向 harness 升级调和二者；拒绝会被记录为一项声明的例外，并由 `verify` 持续报告，直至安装完成
- **每份 Final Review 中必备：** 安全审查环节在累计变更集上运行上游父级默认流，并将输出追加到计划本地的 `analysis_results/SECURITY_REVIEW.md`（位于计划自身的文件夹内，绝不在仓库根目录）；缺少 skill 或扩展会作为一项 `local reviewer not installed` 发现被记录——绝不静默跳过，也绝不意外引导安装：安装属于接入授权或一次显式的 addon 调用；已完成通道中的**经验证的 `critical` 发现**在修复或被明确接受之前会阻止完成（v3，BC-07——未经验证的关键发现断言会以带注解的警告出现，而 `incomplete`/`timeout` 的审查不算干净的通过，BC-04）
- **可选 CI 层面（Flow B）：** 通过上游 `setup` 子技能提供 `pr-review.yml`（`DailybotHQ/ai-diff-reviewer@v3`），并将 `apply-review`（只读）与 `address-review`（执行提交、推送并重新武装审查器；v3.1.1 新增）作为开发者调用的便利工具——明确提供、绝不未经请求安装、绝不作为默认、绝不作为计划任务
- **绝不阻塞（仅限调用）：** 能够启动但出错的本地审查按「警告一次、记录后继续」处理；它绝不使任务失败
- **奇偶性（Flow B）：** 共享 `prompt.md` + 扩展对齐方法论/严重程度；CI 迭代感知审查可缩短第 2+ 轮，而本地通道保持完整
- **供应商中立护栏：** 没有任何 Deep Work Plan 流程需要商业服务、CI 提供商或机密——该审查器是一个由开发者自己的编码代理运行的 MIT 授权、标签锁定的 skill
- **符合性：** 对声明标准 2.3.0 或更新版本的仓库，`verify` 将缺失的本地审查器报告为一项失败；对旧版仓库则报告为一项 harness 版本发现

### Herdr（第六个附加组件）

[herdr-peers](https://github.com/DailybotHQ/herdr-peers)（固定为 `v0.1.0`，协议 `1`）的轻量集成器，是 v7 计划的**交互式**委托传输。

- **套件页：** [Herdr](/kit/herdr)
- **新增内容：** 计划可以把一项有界任务交给另一个 [Herdr](https://herdr.dev) 窗格中的编码代理——位于同一台机器，或 Herdr 通过 SSH 可达的机器——并在日志中记录其唯一一次获授权的回复
- **行为：** 对等协议（stamp、grant、reply、循环防护、深度与扇出上限）位于 herdr-peers 中，绝不在技能包中；任何使用都需要契约授权 `agent_delegation`，且受托代理的结果在计划自己的运行器观察到之前始终只是断言
- **何时提供：** 第 7b 阶段中明确的可选项；对 `herdr` 与 `herdr-peers` 进行只读检测；该传输仅能在 Herdr 会话内使用

### DeepWorkPlan Vim（第七个附加组件）

[DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim)（固定为 `v0.5.1`，接口 `1`）的轻量集成器，是 Deep Work Plan 的终端编辑器（Neovim 0.12+）。

- **套件页：** [DeepWorkPlan Vim](/kit/vim)
- **新增内容：** 一个可选的、机器级的编辑器层面，供代理与人类使用——生成的命令索引、只读计划浏览器和 Markdown 查看器；每一项说明都读取自该产品固定版本的机器可读层面
- **行为：** 未经明确同意，绝不覆盖现有的 Neovim 配置；检测是只读的
- **何时提供：** 第 7b 阶段中明确的可选项；缺少 Neovim 0.12+ 时仅作提示

### Agentkit（第八个附加组件）

[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)（`ak`，固定为 `v0.3.0`，接口 `1`）的轻量集成器，是 v7 计划的**无头**委托传输。

- **套件页：** [Agentkit](/kit/agentkit)
- **新增内容：** 一个覆盖各终端编码代理的 `ak` 命令层面，用于以无头方式运行有界的计划任务；仅在运行时、且已启用、已检测到并处于兼容接口时，才提供 `subagents`、`cancel_children` 与 `model_routing` 能力
- **行为：** 任何使用都需要契约授权 `agent_delegation`；该 kit 默认以自主模式启动代理，其退出选项（`--ask` 或 `AGENTKIT_PERMISSIONS=ask`）始终优先——该附加组件不写入任何自主标志，在计划记录了退出选项时传递 `--ask`，对只读委托方则始终传递；它绝不自行安装编码代理 CLI，也绝不读取提供商密钥的值
- **何时提供：** 第 7b 阶段中明确的可选项；通过 `ak doctor --json` 进行只读检测

## 技能

技能是按名称调用的可复用过程。一项技能将可重复的工作流打包（运行测试、修复 lint、创建组件）。

方法论附带一小组核心子技能。其中，**author** 子技能让仓库**培育自己的套件**：通过 `/skill-create` 与 `/agent-create` 调用，它推理仓库现有的 `.agents/` 布局与约定，然后撰写与之匹配的新技能、代理或轻量命令委派器，并保持目录同步。同一子技能支撑 Final Review 的 skills 决策核对环节。

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
