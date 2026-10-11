---
title: Devcontainer
description: "每个仓库一个可复现的开发容器，源自同一模板：代理通过 ak 即开即用，Herdr 双向连通，容器内绝不存放 SSH 密钥。"
kind: addon
lang: zh
order: 1
---

# Devcontainer 附加组件

为仓库提供一个可复现、隔离的开发容器——人、编辑器和编码代理都能使用。在 **DWP v7**（技能包 `v7.4.0`）中，这个附加组件集成了 **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**——一个脱离 Deep Work Plan 也能使用的 MIT 产品。它是可选的：一个仓库不带它也完全符合规范。

## devcontainer-kit 提供什么

- **一个模板**，基于 [Dev Containers](https://containers.dev) 规范构建，由 `dck init` 以固定布局渲染进仓库：`.devcontainer/devcontainer.json`、`docker/local/<service>/Dockerfile`、`docker/local/docker-compose.yaml` 和 `dev.sh`。之后再次运行时，它会进行协调，绝不覆盖你的修改；对既有文件的任何更改都会先展示出来，并需要你的同意。
- **仓库自己的容器。** Dockerfile 从运行时的官方镜像起步，并按摘要固定——`node-24`、`python-3.13` 或 `debian`——再把工具包的构建步骤复制到 `docker/local/<service>/dck/`。不涉及任何共享基础镜像。
- **`dev.sh` 与 `dck`。** `bash dev.sh up` 在普通终端中构建、启动并接入容器；`shell`、`rebuild`、`doctor` 等其余命令有没有 VS Code 或 Cursor 都可以使用。
- **Herdr 双向互通。** 主机上的 [Herdr](https://herdr.dev) 通过一个仅监听回环地址的 SSH 服务器，把每个容器作为一台机器接入；容器打开时带有标准侧栏：App、Editor、Development 和 Agents。每个工作区和窗格（包括之后新打开的）都从应用路径（默认为 `/app`）启动。在容器内部，[herdr-peers](/kit/herdr) 让代理可以向主机上以及其他容器中的代理提问。
- **`dck-dockerfile` 技能。** 代理可按需创建或重新生成仓库的容器，并通过一次真实构建加以验证。

## 安装

```bash
git clone --branch v0.2.9 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

要求：Linux 或 macOS 主机上的 `bash` 3.2 或更新版本和 `python3` 3.11 或更新版本，以及用于容器命令的 Docker 与 Compose v2。可使用发布版本的 `SHA256SUMS` 资产对其进行校验。请固定 `v0.2.9`：`v0.2.0` 不受支持。

| 项目 | 值 |
|---|---|
| 产品 | `DailybotHQ/devcontainer-kit`，标签 `v0.2.9`，接口 2 |
| 注册表键 | `.dwp/config.json` 中的 `devcontainer` |
| 每仓库配置 | `.devcontainer/dck.toml` |
| 检测 | `dck doctor --json` |

## 层

每个容器都携带开发工具——git、gh、ripgrep、一个 SSH 服务器、Herdr 和 herdr-peers——且不含任何机密。其余部分都是你在 `dck.toml` 中选择的层：

| 层 | 默认 | 添加内容 |
|---|---|---|
| `agents` | 关闭 | 来自已校验发布版本的 [coding-agents-kit](/kit/agentkit) 以及你列出的 CLI，每个 CLI 都有自己的持久卷，另含 `classic`（`claudex`、`codexx`、…）和 `providers`（`claude-glm`、`codex-azure`、…）预设。代理默认以自主模式运行——容器本身就是沙箱。退出方式：在服务的 `.env` 中设置 `AGENTKIT_PERMISSIONS=ask`。 |
| `editor` | 开启 | 带按标签固定的 [DeepWorkPlan Vim](/kit/vim) 的 Neovim；关闭时提供一个普通编辑器。 |
| `dailybot` | 关闭 | Dailybot CLI，供 dailybot 附加组件使用。 |

登录状态、`gh`、Herdr 配置和 git 身份在 `bash dev.sh rebuild` 之后依然保留。

## 跨机器的代理

自 `v0.2.3` 起，在 Docker Desktop 上，`dck up` 无需任何手动步骤即可连通一个双向网格：

- **容器与主机。** 容器内的代理可以访问主机上、其他每个 dck 容器中以及主机 Herdr 已管理的其他 loopback 容器中的 Herdr 代理，这些代理也能反向访问。每个对等方都带有固定的主机密钥；不会在首次使用时信任任何对象。
- **可选的主机监听器。** `dck setup` 会一次性提供一个位于 `127.0.0.1` 的用户级 SSH 服务器，它只接受 dck 密钥，并由 launchd（macOS）保持运行。如果你已经在运行一个 loopback 监听器，可改为让主机配置文件指向它。`dck host listener disable` 会将其移除。
- **重建后依然保留。** 容器的 Herdr 机器目录存放在卷中，因此 `bash dev.sh rebuild` 会保留其中注册的每台机器。
- **主机同样可以回复。** `dck setup` 会在主机上安装经过校验的 [herdr-peers](/kit/herdr)，因此 `dck agents` 和 `dck ask` 在主机上同样可用，主机上的代理通过 `herdr-peers reply` 回复。
- **非工具包创建的容器。** 在主机配置文件的 `[ssh] authorized_extra` 下列出它们登录所用的公钥，它们也就能访问 dck 容器。

在主机和容器中都搭配 [coding-agents-kit](/kit/agentkit) 使用，同一个 `ak` 即可在两侧启动代理。

## 安全默认值

- 每个发布的端口都绑定到 `127.0.0.1`，除非 `dck.toml` 设置了 `bind`。
- 通过 SSH 使用 git 时经由主机的 SSH agent——使用其 socket，绝不使用密钥文件，也绝不挂载 `~/.ssh` 或 `~/.gitconfig`。git 身份来自 `dck setup` 填写的 `DCK_GIT_*` 值。
- SSH 主机密钥在运行时生成到每个项目独立的卷中，绝不内置于镜像；服务器只接受公钥，不允许 root 登录，也不使用密码。
- 模板不添加 `cap_add`、不使用 `privileged` 模式，也不挂载 Docker socket。
- 每次下载都按版本固定并经校验和验证；基础镜像按摘要固定。
- 让一个容器中的代理访问其他容器的 Herdr 网格默认开启，其关闭开关记录在工具包的威胁模型中。主机监听器允许运行中容器内的代码以你的身份在主机上打开 shell：它需要主动启用，仅限 loopback，只接受 dck 密钥，并可通过 `dck host listener disable` 移除。

## 备注

可选且绝非必需。一个仓库在不带任何可选附加组件时即完全符合规范。v0.2 支持 Linux 和 macOS 主机；容器之间的网格需要 Docker Desktop。
