---
title: Devcontainer
description: "基于 devcontainer-kit 的可选附加组件：由 dck init 渲染的 Dev Containers 模板、不含代理的基础镜像，以及每个容器一台 Herdr 机器。"
kind: addon
lang: zh
order: 1
---

# Devcontainer 附加组件

为仓库提供一个可复现、隔离的开发容器——人、编辑器和编码代理都能使用。在 **DWP v7**（`v7.0.0`）中，这个附加组件集成了 **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**——一个脱离 Deep Work Plan 也能使用的 MIT 产品——并取代了该技能包以前自带的模板。它是可选的：一个仓库不带它也完全符合规范。

## devcontainer-kit 提供什么

- **一个模板**，基于 [Dev Containers](https://containers.dev) 规范构建，由 `dck init` 渲染进仓库：`devcontainer.json`、一个 compose 文件和 `docker/local/`。之后再次运行时，它会进行协调，绝不覆盖你的修改；对既有文件的任何更改都会先展示出来，并需要你的同意。
- **`dck`**，一个在普通终端中运行容器的启动器——`setup`、`up`、`shell`、`ssh`、`rebuild`、`doctor`——有没有 VS Code 或 Cursor 都可以。
- **基础镜像**，提供三种类型：`python-3.13`、`node-24` 和 `debian`，均**不含**编码代理。
- **一个入口点库**，负责持久卷、SSH 以及 SSH 会话的环境，取代每个仓库手工复制的入口点。
- **Herdr 机器。** 每个容器都可以通过一个仅监听回环地址的 SSH 服务器加入 [Herdr](https://herdr.dev)，使其中的代理成为可访问的对等方。

## 安装

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

要求：Linux 或 macOS 主机上的 `bash` 3.2 或更新版本和 `python3` 3.11 或更新版本，以及用于容器命令的 Docker 与 Compose v2。可使用发布版本的 `SHA256SUMS` 资产对其进行校验。

| 项目 | 值 |
|---|---|
| 产品 | `DailybotHQ/devcontainer-kit`，标签 `v0.1.4`，接口 1 |
| 注册表键 | `.dwp/config.json` 中的 `devcontainer` |
| 每仓库配置 | `.devcontainer/dck.toml` |
| 检测 | `dck doctor --json` |

## 各层按需启用

基础镜像携带开发工具——git、gh、ripgrep、一个 SSH 服务器、Herdr，以及按标签固定 DeepWorkPlan Vim 的 Neovim——不含任何编码代理、报告 CLI 或机密。其余一切都是你在 `dck.toml` 中开启的层：

| 层 | 默认 | 添加内容 |
|---|---|---|
| `agents` | 关闭 | 安装 [coding-agents-kit](/kit/agentkit) 以及你列出的 CLI，每个 CLI 都有自己的持久卷。不设置任何绕过权限的参数。 |
| `editor` | 开启 | 带 DeepWorkPlan Vim 的 Neovim；关闭时提供一个普通编辑器。 |

## 安全默认值

- 每个发布的端口都绑定到 `127.0.0.1`，除非 `dck.toml` 设置了 `bind`。
- 从主机转发 SSH agent；主机私钥绝不会被复制进容器。
- SSH 主机密钥在运行时生成到每个项目独立的卷中，绝不内置于镜像；服务器只接受公钥，不允许 root 登录，也不使用密码。
- 模板不添加 `cap_add`、不使用 `privileged` 模式，也不挂载 Docker socket。
- 基础镜像和工具按版本固定并经校验和验证；只要能解析出摘要，compose 就会按摘要引用基础镜像。

## 备注

可选且绝非必需。一个仓库在不带任何可选附加组件时即完全符合规范。v0.1 支持 Linux 和 macOS 主机。
