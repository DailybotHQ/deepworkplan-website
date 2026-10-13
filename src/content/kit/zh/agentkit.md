---
title: Agentkit
description: "一条命令驱动所有终端编码代理：每个配置档对应一个账户，ak pick 选出剩余配额最多的账户，默认完全自主且可退出，并支持无头运行。"
kind: addon
lang: zh
order: 8
---

# Agentkit 附加组件

每个终端编码代理都有自己的一套参数用于继续会话，有自己的方式隔离第二个账户，有自己的无头模式，也有自己用于跳过权限提示的开关。**[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** 在它们之上提供统一的命令界面：`ak <kind> [@profile]`。

这个附加组件把该工具包集成进 **DWP v7**（技能包 `v7.8.0`），作为**无头**委派传输方式。它是可选的：没有它，每项任务都在当前会话中运行，与以往完全一样。工具包本身是一个 MIT 产品，脱离 Deep Work Plan 也能使用。

## 工具包为你提供什么

- **所有 CLI 共用一套语法。** `ak claude`、`ak codex`、`ak cursor`、`ak opencode`、`ak pi`、`ak cline`、`ak grok` 和 `ak antigravity`，以及各提供方路由（Z.AI GLM、Azure OpenAI、xAI 和 Gemini API），使用相同的会话参数：`-c` 继续，`-r <id>` 恢复。
- **配置档。** `ak claude @work` 在独立的主目录中运行第二个账户，与第一个账户相互隔离。
- **无头运行。** `ak run <kind> -- "<prompt>"` 以非交互方式运行一条提示，并返回有文档说明的退出码，也可选择以单个 JSON 对象返回。
- **诊断工具。** `ak doctor --json` 报告已安装哪些 CLI、有哪些配置档，以及已设置的密钥的名称——绝不报告其值。
- **经校验的安装。** `ak install <cli>` 从供应商的官方渠道以固定版本安装缺失的 CLI，并对照固定的 sha256 或 npm 注册表的完整性信息进行校验。
- **熟悉的名称。** 两个别名预设，在你启用之前保持关闭：`classic`（`claudex`、`codexx`、`cursorx`、`opencodex`、`pix`、`clinex`、`grokx`）和 `providers`（`claude-glm`、`codex-azure`、`codex-xai`、`pi-glm`、…），每个都对应一个 `ak <kind>`。

## 账户、配额与账户选择

工具包把你持有的每个登录或密钥都视为一个**账户**：一个 CLI × 一个配置文件。`@default`（或 `@1`）是 CLI 自己的 home；`@2`、`@work` 或 `@client-x` 是独立的登录，各自位于配置文件根目录下的单独目录中，可同时运行。`ak profiles` 列出它们及其登录状态和密钥名称；`ak profiles --json` 为工具提供同一份列表（schema `profiles-v1`）。自 `v0.5.1` 起，它会报告 Claude Code 令牌的实际位置——`file`、`keychain`（macOS）、`none` 或 `unknown`——仅检测其是否存在，从不读取机密；并且能识别 Linux 上的 Cursor 登录，无论是在容器中还是在 Linux 主机上。自 `v0.5.2` 起，`AGENTKIT_DEFAULT_PROFILE_<CLI>` 指定不带参数的 `ak <cli>` 所使用的账户（位置参数 `@profile` 仍然优先），开发容器正是借此选择它所共享的主机账户。自 `v0.5.3` 起，当与另一台机器共享的 Codex home 记录了一个不在本机上的后台守护进程时，`ak codex` 会添加 `--no-daemon`。

`ak usage`（也可用 `ak status`）列出工具包所知的每个 CLI 的每个账户，在其所属 CLI 下每个账户和配置文件一行：Claude Code 订阅（5 小时、每周和按模型的窗口）、通过 ChatGPT 登录的 Codex、Z.AI 编程套餐密钥，以及自 `v0.7.0` 起在 Linux 和容器中通过 Google 登录的 Antigravity（agy 自身 `/usage` 面板中的五小时和每周窗口）均显示实时配额。无法读取配额的账户仍有自己的一行：显示 `n/d` 并附上其连接方式和原因——Cursor、Grok、xAI、Azure OpenAI、Gemini API 密钥，或保存在 macOS 钥匙串中的 Antigravity 登录——或者显示 `no login` 并附上用于登录的命令，因此该表也能显示每个 CLI 的哪些账户已连接。该命令只读：从不刷新登录、从不打印令牌，也从不在配置文件中写入任何内容。`--json` 为工具提供同一份列表（schema `usage-v1`）。这些用量端点属于厂商内部接口，并非官方接口。

`ak pick <kind>` 读取同样的行，选出余量最多的账户。`--count N` 返回最多 N 个账户，按优劣排序；`--exclude @<profile>` 排除一个忙碌的账户；`--model` 计算单个模型的每周窗口；`--need 5h:40` 在余量不足时拒绝选择。`--json` 输出 schema `pick-v1`。

```bash
ak usage                   # 每个账户和配置文件的配额
ak pick claude --count 3   # 余量最多的三个 Claude 账户
ak claude @work --trust-cwd  # 第二个账户，文件夹已预先信任
ak profiles --json         # profiles-v1，供工具使用
ak setup verify            # 按顺序的检查，每项附带修复命令
```

`--trust-cwd`（或 `AGENTKIT_TRUST_CWD=1`）预先信任代理启动时所在的文件夹，使 Claude Code 与 Codex 打开时不再出现文件夹信任界面。`ak setup probe | verify | docker` 是由 `agentkit-setup` 技能驱动的只读助手，用于检查机器、验证安装，并生成按标签固定且经过校验的容器配方。

## 多个代理，多个账户

`agentkit-orchestrate` 技能（`ak --skill orchestrate`）教代理把工作分摊到多个代理、账户和厂商上：批次开始前执行一次 `ak usage`，用 `ak pick --count N` 选择账户，每个账户一个委派对象，对每个结果运行仓库自己的验证关卡，并在某个账户触及限额时切换到下一个账户。工具包负责观察、计算和运行；它从不调度。由主导者——你，或你委托的代理——做决定，只使用你自己的账户，并遵守每个厂商的条款。

对于长时间的交互式通道，每条通道在 [Herdr](/kit/herdr) 窗格中以自己的账户运行。方法论章节[运行多个代理](/methodology/06-orchestration)描述了完整的模型：主导者与其通道、按余量选择的账户、herdr-peers 协调，以及每个仓库一个分支、一次发布；[集群自主](/zh/methodology/07-swarm-autonomy)则补充了容量检查、交接与主导者继任。

## 容量与租约

自 `v0.6.0` 起，代理可以在每个任务边界以低成本查询自己的账户还剩多少余量——正是这一信号，让代理集群能在账户耗尽之前把工作交接出去（[集群自主](/zh/methodology/07-swarm-autonomy)）。

- **`ak capacity --self --json`**（schema `capacity-v1`）给出正在运行的账户的 `headroom_pct`、其 `binding_window`、`resets_at` 以及一个 `verdict`：`ok`、`low`（25 % 或更低）、`critical`（10 % 或更低，或已被限流）或 `unknown`（没有配额来源：Cursor、Grok，或 macOS 上的 Antigravity）。它使用与 `ak pick` 相同的算法，因此两者从不矛盾；它读取保留 300 秒的用量缓存（`--max-age`），因此在每个任务边界检查一次的成本依然很低。`--self` 解析出由 `ak` 启动的那个账户；不在 `ak` 启动的环境中时，它以退出码 3 退出，从不猜测。`ak usage` 仍然实时读取并刷新缓存。
- **阈值与演练。** `AGENTKIT_CAPACITY_LOW` 和 `AGENTKIT_CAPACITY_CRITICAL`（或 `--low` 和 `--critical`）用于调整阈值。`AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` 只能调低读数——演练正是借此让一个账户显得余量不足——绝不能让账户显得余量更多。
- **`ak lease <kind> @<profile> --owner <addr>`** 为一条通道占用一个账户；继任者接受交接后，`ak lease release …` 将其释放，`ak lease ls` 列出各租约（schema `leases-v1`）。一个 Codex 配置档只接受一个租约——每个认证文件一个写入者——并且只有租约所有者才能释放租约。租约会过期，它们只是记录数字、配置档名称和窗格地址的建议性记录，绝不是凭据。
- **`ak pick <kind> --owner <lead>`** 计入每个有效租约，包括所有者自己的租约：它按 `headroom / (1 + leases)` 对候选账户排序，并且从不提供已被租用的 Codex 账户，即使对其持有者也不提供。`--reuse @<profile>` 将所有者自己的某个租约转交出去，例如交给某条通道的继任者。不带 `--owner` 时，排序不变。

```bash
ak capacity --self --json                        # 本代理自身的余量与判定
ak lease claude @work --owner local:w2:p1        # 为一条通道占用一个账户
ak pick codex --owner local:w1:p1 --count 2      # 跳过已租给他人的账户
```

工作只在你为计划声明的账户之间转移，并遵守每个厂商的条款：任何代理都不会创建账户、续期登录或使用 Codex 的重置额度。Deep Work Plan 技能包通过自己的辅助程序读取判定结果，并把它转化为继续、准备或交接；没有该工具包，或工具包版本较旧时，容量报告为未知（unknown），绝不报告为 ok。

## 安装

```bash
git clone --branch v1.0.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

要求：macOS 或 Linux 上的 `bash`，以及 `python3` 3.9 或更新版本；仅此而已。Windows 使用 `install.ps1`。请固定 `v1.0.0`：`v0.2.0` 和 `v0.2.1` 不受支持。可使用发布版本的 `SHA256SUMS` 资产对其进行校验。

| 项目 | 值 |
|---|---|
| 产品 | `DailybotHQ/coding-agents-kit`，标签 `v1.0.0`，接口 1 |
| 注册表键 | `.dwp/config.json` 中的 `agentkit` |
| 传输方式 | 无头：每个被委派者在专用的 git worktree 中执行一次 `ak run` |
| 提供 | `subagents`、`cancel_children`、`model_routing` |
| 要求 | 计划契约中的 `agent_delegation` 授权 |

**自 `v1.0.0` 起稳定。** 工具包的公共接口遵循语义化版本，仅在新的主版本中才会发生不兼容的变更：命令面（`providers.toml` 中每种类型对应的 `ak <kind> [@profile]`，以及每个动词及其文档化的参数）、权限姿态、接口 1（`ak doctor --json`、`ak env`、`ak run` 的语法与信封）、JSON 模式（`doctor-v1`、`usage-v1`、`pick-v1`、`capacity-v1`、`leases-v1`、`profiles-v1`、`setup-probe-v1`、`setup-verify-v1`），以及安装布局和 env 文件中的变量名。`v1.0.0` 相对 `v0.7.1` 没有改动任何命令、参数、键或模式。

## 默认自主运行，退出选项始终优先

自 `v0.2.0` 起，`ak <kind>` 以**自主模式**启动每个代理：它会添加 CLI 自身的自主参数，该参数只保存在工具包的 `providers.toml` 中。自主模式面向可丢弃或沙箱化的环境，例如开发容器。

**退出选项始终优先**：在单条命令上使用 `--ask`，或在环境或工具包的 env 文件中设置 `AGENTKIT_PERMISSIONS=ask`，即可抑制该参数，即使同一条命令带有 `--auto` 也是如此。已选择退出的会话会把退出选项传递给它启动的代理。在主机上，请设置退出选项。

该附加组件不写入任何自主参数，也从不传递 `--auto`。当计划记录了退出选项时，它会传递 `--ask`。在主机上授予 `agent_delegation` 的计划，即接受被限制在各自 worktree 中的自主被委派者，而 worktree 并不是沙箱。

## 它为计划添加了什么

在契约授予 `agent_delegation` 的 v7 计划中，`execute` 可以把一项 `parallel_safe` 任务交给另一个 CLI：它创建一个专用的 git worktree，在其中带超时地运行 `ak run`，并把结果收集到计划的 `analysis_results/delegations/` 中。在计划自身的门控运行器观察到之前，该结果都属于 `asserted` 证据。取消一个被委派者会停止其整个进程树。

## Agentkit 还是 Herdr

| 情形 | 使用 |
|---|---|
| 一项有边界、声明了输出的 `parallel_safe` 任务 | Agentkit（无头） |
| 任务需要交互、运行时间长，或位于另一台机器上 | [Herdr](/kit/herdr)（窗格中的一个对等方） |

二者可以组合：herdr-peers 可以使用 `ak env <kind> @profile` 输出的环境，在窗格中启动一个对等方。同时运行多条通道时，请参阅[运行多个代理](/methodology/06-orchestration)。

## 备注

可选且绝非必需。API 密钥的值绝不会被打印、记录到日志或写入配置文件；有文档说明的例外是 Cline，它通过命令行接收密钥。OpenCode、Pi、Cline 和 Grok 的结果提取依据供应商文档构建，尚未在真实账户上实际运行过；无法识别的输出会回退为原始文本。
