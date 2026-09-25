---
title: AI Diff Reviewer
description: "自标准 2.3.0 起每份 Final Review 中经验证的关键发现本地审查；grok CI 门控与 address-review 保持可选。"
kind: addon
lang: zh
order: 5
---

# AI Diff Reviewer 附加组件

每一份 Deep Work Plan 都以同样的方式收尾：一项强制的 **Final Review**，它会在工作被判定为完成之前，通读该计划累积的全部变更。其中的安全审查环节是最后一道能够发现问题的关口。若无外援，此刻唯一的阅读者就是写下这些代码的同一个 agent。

这个附加组件为那份 diff 引入了第二位阅读者。它把 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（在 marketplace 上的名称为 "AI Diff Reviewer"，当前版本 **v3.1.1**）接入安全审查环节，让它给出结构化的结果而非散文：一个裁决、一张结果表，以及每条结果的严重程度。自 v3 起，一条 `critical` 结果意味着附加组件的验证器已通过第二次基于代码的模型调用对其加以确认；只有经验证的关键发现会在修复或被明确接受之前阻止收尾。这份审查是一道门控，而不是一条评论。

自标准 2.3.0 起，该本地审查**属于基线的一部分，而非额外选项**。接入时安装它，每份 Final Review 都会运行它。仍然可选的是 CI 层面——Flow B，在那里同一份审查通过 GitHub Action 对拉取请求进行门控。

让它可以放心采用的边界是刻意收窄的。该审查器是一个采用 MIT 许可、按标签固定版本的 skill，由你本就在使用的编码 agent 执行，因此没有任何 Deep Work Plan 流程依赖商业服务、CI 提供方或密钥。**Flow A**（仅本地）是每个完成接入的仓库都会获得的；**Flow B** 只会被明确提出，绝不会在未经请求时安装。开发者也可以完全拒绝该审查器——这一拒绝会被记录为一项声明的例外，并且 `verify` 会在该项上将该仓库报告为不合规，直到它被安装为止。

## 何时使用

| 信号 | 操作 |
|--------|--------|
| 每个已接入的仓库 | 在接入 **第 7a 阶段**安装 **Flow A**（vendored skill + `.review/extension.md`）；定向 harness 升级会把它添加到更早接入的仓库 |
| 团队希望在 CI 中有结构化结果的 PR 合并门控 | **提供 Flow B** —— 显式可选，绝非默认 |
| 个人或实验性仓库；本地审查已足够 | **保持 Flow A** —— 基线已是完整的 |

## 两种采用流程

| 流程 | 获得内容 |
|------|----------------|
| **A — 仅本地（基线）** | vendored skill + 必需的 `.review/extension.md`（通过 `generate-extension`）。在每份 Final Review 的安全审查环节内运行本地审查。无 GitHub Actions 工作流。 |
| **B — 双层面** | Flow A 加上 `setup` 写入审查工作流（Action `@v3`），本地和 CI 使用相同的扩展文件。CI 发布结果后可选 `apply-review` 与 `address-review` 伴随工具。 |

本地审查的检测需要**skill + 扩展文件**，位于以下之一：`.review/extension.md`、`.github/ai-diff-reviewer/extension.md` 或 `.github/ai-pr-reviewer/extension.md`。仅 skill 本身是不够的。

## 此附加组件连接的内容（有意限制范围）

DWP 附加组件**不**重新发明审查器。它将安装、方法论、CI 向导、扩展创作、PR 草稿及 CI 后的审查循环委托给上游 skill 的六个子技能（父级默认流、`generate-extension`、`setup`、`open-pr`、`apply-review`、`address-review`）。

### 必备的本地审查

`create` 会向每份 Final Review 的安全审查环节添加本地审查步骤，`execute` 运行它。输出追加在计划本地的 `analysis_results/SECURITY_REVIEW.md`（位于计划自身的文件夹内，绝不在仓库根目录）的 `## AI Diff Reviewer local review` 下。

- **审查器缺失——记录在案，绝不静默跳过：** skill 或扩展缺失会成为一项 `local reviewer not installed` 发现；Final Review 在 skill 存在时运行本地审查，否则将该发现带入完成报告——安装属于接入授权或一次显式的 addon 调用，绝不是意外引导安装。
- **软失败（仅调用）：** 能够启动但出错的审查 → 警告一次、记录、继续；绝不因此使任务失败。
- **完整通道后的门控：** **经验证的关键发现**会阻止 Final Review 完成，直到修复或明确接受（BC-07）。未经验证的关键发现断言会以带注解的警告出现——可见且不阻塞，除非 `strict-unverified-criticals: true` 恢复按断言门控。一次耗尽轮次上限（`incomplete`）或墙钟时限（`timeout`）的审查在阻断性严格度下不算干净的通道（BC-04）。`warning` / `info` 已记录但不阻塞。
- **Flow A 不需要 CI 密钥。** 未设置的提供商密钥不得抑制本地通道。

### Flow B CI 门控（可选）

Action `DailybotHQ/ai-diff-reviewer@v3`，通常由标签门控（`ready`），带有用于分支保护的稳定命名 **AI review gate** 作业，以及可选跳过标签 `skip-review-label: skip-ai-review`。自 v3 起，审查预算遵循该变更的确定性风险等级——在 `budget-profile: auto` 下从 `low` 到 `critical` 为 8/20/30/40 轮（`fixed` 会在过渡期内恢复 v3 之前的常量）——并且不改变任何代码的推送会运行一轮仅验证器的审查。共享的 `prompt.md` + 扩展对齐方法论和严重程度；本地与 CI 在方法论上保持一致，而在迭代感知审查下 CI 第 2+ 轮可能更短，本地通道则始终保持完整。

### 可选的审查伴随工具

CI 发布审查后，有两个由开发者调用的子技能可以闭合循环；二者都绝不是计划任务文件（那会破坏强制性最终任务顺序）。

- `apply-review` 在获得同意后逐项遍历结果（应用 / 延迟 / 跳过）。默认只读；绝不提交或推送。
- `address-review`（v3.1.1 新增）是单次调用的循环：找到该分支打开的 PR，确认审查已覆盖当前 head，给出带应用/延迟/跳过计划的结果清单，然后——在一句"好"之后——应用、以小型 Conventional Commits 批次提交、推送，并按该仓库触发审查的方式重新武装审查器（标签门控 → 切换标签；推送触发 → 确认新一轮运行）。与 `apply-review` 不同，它会提交并推送；这正是这个循环的意义所在。在聚合式 ensemble 审查中，它会读取聚合文档与 `ai-pr-reviewer-aggregate` 标记。
- 面向机器的路径是结构化输出，而非审查正文：`review-output/3.0` 文档（`.aiprr/review-output.json`，通过 `structured-output-path` 与 `structured-output-sha256` 输出定位）承载运行记录、带证据与验证的结果、被驳回的结果以及门控判定。审查正文中写有 `Recommendation: approve` 并不能证明检查已通过——应先阅读跟踪标记中的 Highest severity / Strictness gate / Check status 区块。

## v3 有什么变化

三个版本于 2026-09-24 发布（v3.0.0、v3.0.1、v3.1.0），随后 v3.1.1 带来了 `address-review` 子技能。它们都没有改变本附加组件接入审查器的方式——Flow A、三条检测路径和"从不阻塞"的阶梯均保持不变——但确实改变了采用者所获得的能力。

| 变化 | 对 DWP 仓库意味着什么 |
|------|------------------------|
| **`critical` 只有在验证之后才会发布**（v3.0.0） | 每条被断言的关键发现——外加 30 % 的警告样本——都会由一次独立的模型调用进行第二次简短的、基于代码的核查（约 3 k token、10 秒、每条经验证发现 $0.009）。经验证的关键发现为安全审查环节把关；被驳回的断言仍以带注解的警告保持可见，并列入结构化输出，绝不内联发布。 |
| **预算跟随风险等级**（v3.0.0） | 在 `budget-profile: auto` 下依据变更清单推导出从 `low` 到 `critical` 的 8/20/30/40 轮。不改变代码的推送以 −93 % 的成本运行一轮仅验证器的审查。`budget-profile: fixed` 恢复 v3 之前 30 轮的常量。 |
| **未完成的审查是红色**（v3.0.0） | `incomplete`（轮次上限）与 `timeout`（墙钟）会发布部分结果并在阻断性严格度下判定失败——"无结果"如今总是意味着审查器看过而一无所获。 |
| **结构化输出是面向机器的路径**（v3.0.0） | `review-output/3.0` 文档承载运行记录、变更清单、带类型化证据与验证的结果、被驳回的结果以及门控判定。请阅读该文档，而不是去刮取审查正文。 |
| **六个子技能**（v3.1.1） | `address-review` 加入路由：一次调用即可应用、提交、推送并重新武装审查器。 |
| **可选 ensemble**（v3.0.0） | 只读的 `mode: emit` 腿加上一个 `aggregate` 作业，对合并后的结果只验证一次并发布单一审查。 |
| **`@v2` 继续可用** | v2 线冻结在 `release/v2`，享有六个月的安全与目录维护。v3 是建议，绝不是强制迁移。 |

其中有两项对方法论的意义尤为重大。

**经验证关键发现的门控强化了安全审查环节。** 在 v3 之前，模型可以随意断言一条 `critical`，而门控跟随的是断言本身。如今，Final Review 中的一条关键发现意味着第二次模型调用已对照代码对其加以确认，而该版本的发布战役测量出了差异：十场战役共 771 次付费评估运行、总花费约 $83，关键等级达到 63/63 召回且裁决精确率为 1.0，增量轮次将输入 token 削减了 62–76 %。这些数字是上游公布的测量结果，而非 Deep Work Plan 自行得出。

**`economy` 是有意不更便宜的。** 上游 2026-09-16 的基准测试测得 `grok-4.3` 在 5 个已知缺陷中命中 0 个——它不审查就直接批准——而 `grok-4.5` 以 3/5 的成绩与 `grok-4.6` 持平且无误报，成本相同而耗时仅为四分之一。由于不存在更便宜且仍会真正审查的 xAI 模型，`economy` 解析为与 `balanced` 相同的模型，而不是沦为一个什么都找不到的档位；在 grok 运行器上，真正决定成本规模的是风险等级的轮次预算，而不是模型选择。因此通过 CLI 时，xAI 路径的成本从约 $0.07 升至约 $0.40–0.75 每次审查；仍可显式固定 `model: grok-4.3` 以保留此前的行为。这些数字是上游公布的测量结果，而非 Deep Work Plan 自行得出。

## 行为

- **Flow A 是基线；Flow B 是询问出来的，绝非猜测。** 未经请求安装工作流的代价大于保持在 Flow A。
- **调和，不覆盖。** 现有 skill、扩展或审查工作流均被保留；仅填补空缺。
- **认证延后。** CI 的提供商密钥由维护者配置；此附加组件绝不存储凭据。
- **供应商中立。** 绝不要求商业服务、CI 提供商或机密；CI 层面是唯一触及提供商的部分。

## 注意事项

自标准 2.3.0 起本地审查为必备；CI 层面可选。上游 skill：[DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)。上游迁移指南：[docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md)。规格页面：[Add-ons](/spec/addons)。
