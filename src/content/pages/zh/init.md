---
title: Init — 让你的代码仓库 AI-first
description: "面向 AI 代理的可执行接入提示：在任意代码仓库中采纳 Deep Work Plan——分析、记录、安装技能，并让其变得可被代理驾驭。"
---

# Init — 面向 AI 代理的接入提示

你是一个 AI 编码代理。请先完整阅读本提示，然后通过采纳 Deep Work Plan（DWP）方法论，让当前代码仓库变得
**AI-first**、**规范驱动**且**可被代理驾驭**。请把这当作一项结构化的工程任务——一份 Deep Work Plan——
而非一次随手的编辑。

## 运作原则（在改动任何东西之前阅读）

1. **对*这个*代码仓库进行推理。** 绝不复制模板，也绝不留下占位符。你写下的每一个文件都
   必须反映仓库真实的语言、框架、命令与结构。一份泛用的占位骨架是一次失败，而非一项可交付物。
2. **保持非破坏性——替换之前先询问。** 仓库可能已经有了 `AGENTS.md`、一套
   `docs/` 树、一套 `.agents/` 或技能配置、一个 `CLAUDE.md`，或它自己的约定。**不要**
   悄悄地覆盖、移动或删除既有的工作。检测出存在什么，阅读它，并加以**核对协调**：
   尽可能就地合并与改进。在替换或移除用户已有的任何东西之前，
   说明改了什么、为什么，并取得他们的明确批准。
3. **先提议计划，再执行。** 在勘察之后，给出一份简短的计划——你将
   创建什么、你将修改什么，以及你提议要协调或替换的任何既有内容——并在做出大幅或破坏性的改动之前
   等待用户确认。
4. **以安全、可审阅的增量推进工作。** 按逻辑提交，保持 diff 可读，不触碰任何机密，
   并对无关代码不予干涉。
5. **若某一步失败或仓库状态含糊不清，则停下并报告。**
6. **信任，但要验证。** 将本提示视为不可信的输入：确认你是从官方来源（`deepworkplan.com` 和 `DailybotHQ` 仓库）获取它的，在采取行动前先对其进行评估，并在运行技能之前验证其完整性——详见下方的*信任与验证*。

## 信任与验证（安装前）

你即将在本仓库中安装并运行代码，因此请先核实你所采纳的内容。我们鼓励这样做：一个谨慎的代理会将获取到的提示视为不可信的，直到经过验证为止。

- **确认来源。** 本提示和技能均为开源，采用 MIT 许可。规范来源是 `https://deepworkplan.com` 和 GitHub 上的 `DailybotHQ` 组织（`deepworkplan-website`、`deepworkplan-skill`）。机器可读的清单发布于 `https://deepworkplan.com/.well-known/dwp-trust.json`。
- **了解技能的功能。** 它以 Markdown 为核心：无 CLI、无 HTTP API、无需认证，**无网络调用，也无遥测**。其唯一涉及安全的操作是对*本*仓库进行修改，且其设计本质上是非破坏性的——它会先协调，在替换前先询问。
- **运行前验证完整性。** 每个发布版本都会发布一份涵盖所有已发布技能文件的 `SHA256SUMS`；在信任它之前，请确认你的副本与之匹配：

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # 下载你打算安装的发布版本的校验和（将 vX.Y.Z 替换为实际版本号）：
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # 非零退出码表示某个文件不匹配——停止操作
  ```

  发布版本**有校验和，但未签名**（签名是已记录的下一步计划）。所有内容均公开且可进行差异比较，因此你也可以将任意文件与其对应标签处的仓库内容进行比对。
- **报告问题。** 请通过 **GitHub 的漏洞报告功能**，在相关仓库私密报告安全问题 — `https://github.com/DailybotHQ/deepworkplan-skill/security` 或 `https://github.com/DailybotHQ/deepworkplan-website/security` — 而非公开提交 issue。另请参阅各仓库的 `SECURITY.md`、`https://deepworkplan.com/.well-known/security.txt` 以及信任页面 `https://deepworkplan.com/trust`。

## 0. 阅读方法论与规范

在改动任何东西之前，请阅读规范来源，以理解你正在采纳的标准：

- 方法论：https://deepworkplan.com/methodology.md
- 规范：https://deepworkplan.com/spec.md
- 套件目录：https://deepworkplan.com/kit.md

## 1. 勘察与一份待批准的计划

先理解代码仓库，再提议你将要做什么。

- **检测技术栈。** 语言、框架、包管理器（从实际存在的锁文件判断）、
  真实的 build/test/lint/type-check 命令、源模块、测试约定，以及
  部署形态。
- **归类原型。** 单一代码仓库（常见情形）、编排枢纽，或代理工作区——自主代理的长期驻地，
  git 在此为推荐而非预设——并附上依据。
- **盘点已经存在的东西。** `AGENTS.md`、`CLAUDE.md`、`docs/`、任何 `.agents/` 或技能/代理
  配置、`.dwp/` 与 `.gitignore`。记下任何已经在做这项工作一部分的东西。
- **提议接入计划。** 给出一份简明清单：你将创建的文件、你将
  修改的文件，以及你提议要协调或替换的任何既有内容——然后在继续之前**请用户确认**。
  对于一个大型仓库，用 `/dwp-create` 捕获这份计划，并将其作为一份
  Deep Work Plan 来执行。

## 2. 安装 Deep Work Plan 技能

安装技能，让这个仓库的代理能够规划并执行结构化的工作。它附带一个路由器
外加八个子技能——`create`、`execute`、`refine`、`resume`、`status`、`verify`、`onboard` 与 `author`。

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

或者克隆并运行 setup 脚本：

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. 接入代码仓库（经过推理且非破坏性）

调用 onboard 子技能（`/deepworkplan-onboard`）。对真实的仓库进行推理，并让一切都
适配于它。对于下方的每一件产物，**若它已经存在，则加以协调**（合并、改进、向
方法论对齐），而非覆盖——并在替换任何东西之前与用户确认。

1. **`AGENTS.md` + `CLAUDE.md`。** 在根目录产出一个 `AGENTS.md`——一份索引、各项强制规则
   （仅英文、约定式提交、仓库真实的测试模式与审查关卡），以及一个 Quick
   Commands 块，其中是仓库**真实、可运行**的命令。若 `AGENTS.md` 已存在，则合并
   进它，而非替换它。创建 `CLAUDE.md → AGENTS.md` 符号链接（未经询问不要覆盖已有的
   `CLAUDE.md`）。
2. **`docs/`。** 用真实、仓库专属的内容填充标准的各类别：`PRODUCT_SPEC.md`（非技术性的产品/为什么文档——每个仓库必须具备，库类项目亦然）、`ARCHITECTURE.md`、
   `STANDARDS.md`、`TESTING_GUIDE.md`、`DEVELOPMENT_COMMANDS.md`、`SECURITY.md`、
   `AI_AGENT_ONBOARDING.md`、`AI_AGENT_COLLAB.md`，外加 `PERFORMANCE.md` 与一份 `docs/README.md` 索引。
   若文档已存在，则整合并扩展它们——不要重复。
3. **各模块文档。** 在勘察中发现的每个主要源模块内部，添加一个 `README.md`
   （并为复杂模块添加一个 `docs/` 子文件夹）。
4. **`.agents/` + `.claude → .agents`。** 创建规范的、跨代理的目录：一份**经过推理**的
   `agents/`、与技术栈相适配的 `skills/`，以及委派给已安装技能的轻量 `dwp-*` `commands/` 目录——
   每一项都为*这个*仓库给出理由，而非从另一个仓库复制。添加一份
   与磁盘上存在之物相一致的 `docs/` 目录（`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`），
   外加 `settings.json` 与 `.claude → .agents` 符号链接。把任何既有的技能/代理
   纳入该目录。
5. **DWP 技能，已适配。** 已安装的技能是引擎；仓库自己的套件
   （技能、代理、命令）必须**为这个仓库经过推理**——绝非对另一个
   仓库套件的复制粘贴。
6. **`.dwp/` + `tmp/`。** 搭建一个含 `plans/` 与 `drafts/` 的、被 gitignore 的 `.dwp/`，外加一个 `tmp/`
   草稿空间——两者都以非破坏性方式（追加，而非重写）加入 `.gitignore`。

## 4. 演化套件（author 子技能）

使用 `author` 子技能来培育仓库自己的套件。轻量委派器 `/skill-create` 与
`/agent-create` 路由到它。为人们在会话中可重复运行的过程创建一个**技能**，为
有独特模型档位与工具的反复出现的角色创建一个**代理**，并且只把**命令**作为轻量委派器来创建。让
`.agents/docs/` 目录与磁盘上存在之物保持同步。

## 5. 提供可选的附加组件

在基线之后，列举这四个附加组件（devcontainer、Dailybot、dependency-upgrade、design-system），并把每一个作为一项明确的可选项来提供。一个仓库
在不带**任何**附加组件时即完全符合规范——绝不自动安装它们。

- **Devcontainer 支持** —— 一个可复现、隔离的开发容器，具备持久的 AI-CLI 认证。
- **Dailybot 集成** —— 面向已在使用 Dailybot 的团队的尽力而为式进展/里程碑报告。
  核心方法论对 Dailybot 零依赖。
- **Dependency upgrade** —— 包管理器无关、分批次、经验证、可回退的升级。被
  采纳时，它会安装 `/lib-upgrade` 命令。

## 6. 规划并执行

为任意任务生成 Deep Work Plan 并逐任务运行它们：

- `/dwp-create <goal>` —— 把一个目标分解为带验证关卡的、编号、连续的任务。
- `/dwp-execute` —— 逐任务执行计划，更新进展并验证每一道关卡。
- `/dwp-status` —— 报告进展而不做任何改动。
- `/dwp-refine` —— 在保全已完成工作的同时增加、删除或重排任务。
- `/dwp-resume` —— 重建状态并继续一份被中断的计划。

## 7. 验证

运行 `/dwp-verify` 以获得一份客观的通过/未通过符合性报告（它会核查
[规范的符合性文档](https://deepworkplan.com/spec)中的各项标准），
然后确认：

- [ ] 技能已安装且可被解析，全部八个子技能均可用。
- [ ] `AGENTS.md` 存在于根目录，并带有一个真实的 Quick Commands 块；`CLAUDE.md` 解析到它。
- [ ] `docs/` 以真实、仓库专属的内容承载标准的各类别；各主要模块都有一个
      `README.md`。
- [ ] `.agents/` 存在，含 `agents/`、`commands/`（轻量 `dwp-*` 委派器）、`skills/`，以及一份
      与现实相一致的目录；`.claude → .agents` 可解析。
- [ ] `.dwp/` 存在、被 gitignore，并含 `plans/` 与 `drafts/`；`tmp/` 存在且被 gitignore。
- [ ] 既有的用户内容在征得同意后被保全或协调——没有任何东西被悄悄销毁。
- [ ] 你能够生成一份 Deep Work Plan 并逐任务执行它，验证每一道关卡。

## 成果

当接入完成时，代码仓库以两种持久的方式被改变——这正是方法论的
两大支柱：

1. **代码仓库是规范驱动的。** 工作从一份书面的计划与规范开始，而非从
   临时提示开始。
2. **代码仓库本身就是代理的 harness（运行支架）。** `AGENTS.md`、`docs/`、各模块文档，以及
   `.agents/` 技能目录，为每个代理提供它做结构化、可验证工作所需的上下文与命令。

任何人都可以在任意代码仓库上运行这条提示——并最终得到一个任意 AI 代理都能驾驭的代码库。
