---
title: AI Diff Reviewer
description: "自标准 2.3.0 起每份 DWP Final Review 中必备、由接入安装的本地审查；Flow B CI 门控与 apply-review 保持可选。"
kind: addon
lang: zh
order: 5
---

# AI Diff Reviewer 附加组件

每一份 Deep Work Plan 都以同样的方式收尾：一项强制的 **Final Review**，它会在工作被判定为完成之前，通读该计划累积的全部变更。其中的安全审查环节是最后一道能够发现问题的关口。若无外援，此刻唯一的阅读者就是写下这些代码的同一个 agent。

这个附加组件为那份 diff 引入了第二位阅读者。它把 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（在 marketplace 上的名称为 "AI Diff Reviewer"，当前版本 **v2.3.1**）接入安全审查环节，让它给出结构化的结果而非散文：一个裁决、一张结果表，以及每条结果的严重程度。一条 `critical` 结果会阻断收尾，直到它被修复或被明确接受为止。这份审查是一道门控，而不是一条评论。

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
| **B — 双层面** | Flow A 加上 `setup` 写入 `.github/workflows/pr-review.yml`（Action `@v2`），本地和 CI 使用相同的扩展文件。CI 发布结果后可选 `apply-review` 伴随工具。 |

本地审查的检测需要**skill + 扩展文件**，位于以下之一：`.review/extension.md`、`.github/ai-diff-reviewer/extension.md` 或 `.github/ai-pr-reviewer/extension.md`。仅 skill 本身是不够的。

## 此附加组件连接的内容（有意限制范围）

DWP 附加组件**不**重新发明审查器。它将安装、方法论、CI 向导、扩展创作、PR 草稿及 CI 后遍历委托给上游 skill 的五个子技能（父级默认流、`generate-extension`、`setup`、`open-pr`、`apply-review`）。

### 必备的本地审查

`create` 会向每份 Final Review 的安全审查环节添加本地审查步骤，`execute` 运行它。输出追加在计划本地的 `analysis_results/SECURITY_REVIEW.md`（位于计划自身的文件夹内，绝不在仓库根目录）的 `## AI Diff Reviewer local review` 下。

- **审查器缺失——记录在案，绝不静默跳过：** skill 或扩展缺失会成为一项 `local reviewer not installed` 发现；Final Review 在 skill 存在时运行本地审查，否则将该发现带入完成报告——安装属于接入授权或一次显式的 addon 调用，绝不是意外引导安装。
- **软失败（仅调用）：** 能够启动但出错的审查 → 警告一次、记录、继续；绝不因此使任务失败。
- **完整通道后的门控：** `critical` 结果仍然阻止 Final Review 完成，直到修复或明确接受。`warning` / `info` 已记录但不阻塞。
- **Flow A 不需要 CI 密钥。** 未设置的 `CURSOR_API_KEY` 不得抑制本地通道。

### Flow B CI 门控（可选）

Action `DailybotHQ/ai-diff-reviewer@v2`，通常由标签门控（`ready`），带有用于分支保护的稳定命名 **AI review gate** 作业，以及可选跳过标签 `skip-review-label: skip-ai-review`。共享的 `prompt.md` + 扩展对齐方法论和严重程度；在迭代感知审查下，CI 第 2+ 轮可能更短，而本地通道保持完整。

### 可选 `apply-review` 伴随工具

CI 发布审查后，开发者可以在 `execute` 期间调用 `apply-review` 逐项遍历结果（应用 / 延迟 / 跳过），需获得同意。默认只读；绝不作为计划任务文件（会破坏强制性最终任务顺序）。自 v2.3.1 起，审查正文中写有 `Recommendation: approve` 并不能证明检查已通过——应先阅读跟踪标记中的 Highest severity / Strictness gate / Check status 区块。

## 自 v2.0.1 以来的变化

在 v2.0.1 与 v2.3.1 之间上游发布了四个版本。它们都没有改变本附加组件接入审查器的方式——Flow A、三条检测路径和阻断契约均保持不变——但确实改变了采用者所获得的能力。

| 变化 | 对 DWP 仓库意味着什么 |
|------|------------------------|
| **runner 与 backend 是彼此独立的输入**（v2.1.0） | `provider` 指定 *runner*，即由谁运行审查循环；新增的 `api-base` 指定 *backend*，即模型所在之处。留空的 `api-base` 与 v2.0.x 逐字节一致，因此既有安装的行为与之前完全相同。 |
| **新增两个 runner**（v2.1.0） | `openai`（进程内，无需安装）与 `grok`（CLI）加入现有集合。 |
| **成本由一个单词的档位控制，且默认值经过实测**（v2.1.0、v2.3.0） | 成本由档位关键字与裁剪后的 diff 控制，并按每次审查报告。在 xAI 上，`balanced` 与 `economy` 均解析为 `grok-4.5`，`deep` 解析为 `grok-4.6`。 |
| **后续轮次审查真正的新增 diff**（v2.1.0、v2.2.0、v2.3.1） | 未决结果会向后传递。`prior-findings-resolution` 默认为 `advisory`：模型给出的"已解决"裁定会被报告，但该结果仍持续阻断，直到维护者关闭该讨论串。自 v2.3.1 起，当 `collapse-previous` 已将该讨论串最小化后，一项经证实的修复（该结果未被再次发出**且**自提出以来文件已变更，或文件已被删除）会将其撤销，从而使卡住的 PR 可以变为绿色。 |
| **不完整的审查绝不算通过**（v2.2.0） | 未写出结果便退出的运行会被发布为明确的不完整审查。任何具阻断性的严格度都会判定其失败，不会标记"已审查"标签，空轮次也不会撤销任何未决结果。 |
| **经校验和验证的安装程序**（v2.2.0） | 当厂商制品的哈希与所配置的固定值不符时，`cursor-installer-sha256` 与 `grok-installer-sha256` 会拒绝运行它。 |
| **检查、审查正文与跟踪评论保持一致**（v2.3.1） | 通过/失败的判定在审查发布之前只计算一次。每次审查都以运行时写入的 Check status 区块结束。当门控判定失败时，模型给出的 `Recommendation: approve` 会被改写为 `request-changes`，因此 `apply-review` 必须读取跟踪标记，而不是模型的最后一行。 |
| **一条无效的行内锚点不再拖垮全部评论**（v2.3.1） | 遇到 GitHub 422 时，Action 会仅用锚点位于 diff hunk 内的评论重试，最后才退回到仅摘要。 |

其中有两项对方法论的意义尤为重大。

**不完整审查门控堵上了安全审查环节中一个真实的漏洞。** Final Review 绝不应当基于一次从未发生的审查而收尾。在 v2.2.0 之前，退出时未产出结果的 runner 与一次干净的通过无法区分。现在它是一个有明确名称且非绿色的状态，因此"无结果"意味着审查器看过但一无所获，而不是它从未看过。

**`economy` 是有意不更便宜的。** 上游 2026-09-16 的基准测试测得 `grok-4.3` 在 5 个已知缺陷中命中 0 个——它不审查就直接批准——而 `grok-4.5` 以 3/5 的成绩与 `grok-4.6` 持平且无误报，成本相同而耗时仅为四分之一。由于不存在更便宜且仍会真正审查的 xAI 模型，`economy` 解析为与 `balanced` 相同的模型，而不是沦为一个什么都找不到的档位。因此通过 CLI 时，xAI 路径的成本从约 \$0.07 升至约 \$0.40–0.75 每次审查；仍可显式固定 `model: grok-4.3` 以保留此前的行为。这些数字是上游公布的测量结果，而非 Deep Work Plan 自行得出。

**审查正文写着 approve 并不能证明检查已通过。** 自 v2.3.1 起，运行时在计算门控之后写入 Check status 区块，并在门控失败时将模型给出的 `Recommendation: approve` 改写。这就是 `apply-review`——以及读取 CI 审查的 Final Review——必须遵循的契约。

## 行为

- **Flow A 是基线；Flow B 是询问出来的，绝非猜测。** 未经请求安装工作流的代价大于保持在 Flow A。
- **调和，不覆盖。** 现有 skill、扩展或 `pr-review.yml` 均被保留；仅填补空缺。
- **认证延后。** CI 的提供商密钥由维护者配置；此附加组件绝不存储凭据。
- **供应商中立。** 绝不要求商业服务、CI 提供商或机密；CI 层面是唯一触及提供商的部分。

## 注意事项

自标准 2.3.0 起本地审查为必备；CI 层面可选。上游 skill：[DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)。规格页面：[Add-ons](/spec/addons)。
