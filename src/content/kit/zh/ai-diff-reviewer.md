---
title: AI Diff Reviewer
description: "自标准 2.3.0 起每份 DWP Final Review 中必备、由接入安装的本地审查；Flow B CI 门控（v2）、共享扩展文件与 apply-review 伴随工具保持可选。"
kind: addon
lang: zh
order: 5
---

# AI Diff Reviewer 附加组件

将 Deep Work Plan 的执行连接到 **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)**（marketplace 上的 **"AI Diff Reviewer"**，当前版本 **v2.0.1**），使强制的 **Final Review** 的安全审查环节运行结构化的本地审查——裁决、结果表和严重程度——并且在选择 Flow B 时，每个 pull request 都可以在 CI 中受到同样审查的门控。自标准 2.3.0 起，**本地审查属于基线的一部分**：接入时安装它，且每份 Final Review 都运行它。只有 CI 层面是可选的。

保持供应商中立的是那条真正要紧的边界：该审查器是一个由你**自己的**编码代理运行的 MIT 授权、标签锁定的 skill——没有任何 Deep Work Plan 流程需要商业服务、CI 提供商或机密。Flow A（仅本地）是每个已接入仓库都会获得的基线；Flow B（CI Action）被明确提供，绝不未经请求安装。开发者可以拒绝本地审查器；该拒绝会被记录为一项声明的例外，且在它被安装之前，`verify` 会将仓库在该点上报告为不符合规范。

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

CI 发布审查后，开发者可以在 `execute` 期间调用 `apply-review` 逐项遍历结果（应用 / 延迟 / 跳过），需获得同意。默认只读；绝不作为计划任务文件（会破坏强制性最终任务顺序）。

## 行为

- **Flow A 是基线；Flow B 是询问出来的，绝非猜测。** 未经请求安装工作流的代价大于保持在 Flow A。
- **调和，不覆盖。** 现有 skill、扩展或 `pr-review.yml` 均被保留；仅填补空缺。
- **认证延后。** CI 的提供商密钥由维护者配置；此附加组件绝不存储凭据。
- **供应商中立。** 绝不要求商业服务、CI 提供商或机密；CI 层面是唯一触及提供商的部分。

## 注意事项

自标准 2.3.0 起本地审查为必备；CI 层面可选。上游 skill：[DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)。规格页面：[Add-ons](/spec/addons)。
