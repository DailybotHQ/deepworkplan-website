---
title: "开发者 — Deep Work Plan 代理 API"
description: "Deep Work Plan 的代理接口面：只读、零认证、带版本管理的 API，附 OpenAPI 规范、MCP 服务器、17 种语言的逐页 Markdown 与官方 CLI。"
---

## 设计上的零认证

无需生成 API 密钥，没有 OAuth 流程，也没有独立于生产的沙箱——生产接口面本身就是沙箱。这是这套方法论刻意为之的属性：代理无法填写“联系销售”表单，因此本站点绝不会要求你填写。

- **只读** — 每一项操作都是安全、可缓存的 GET，唯一例外是 MCP 端点（POST）。任何地方都不存在写操作。
- **无 API 密钥** — 无需注册、令牌或速率限制层级。匿名访问就是成文的契约，在 [/auth.md](https://deepworkplan.com/auth.md) 中声明。
- **免费且开源** — 站点内容与 DWP 技能均采用 MIT 许可。
- **机器优先** — `/api/*` 返回结构化的 JSON 错误、Markdown 404 恢复响应体、RFC 9727 API 目录，以及 ARD 能力清单。

## 端点

| 方法 | 路径 | 用途 |
|--------|------|---------|
| GET | `/openapi.json` | 整个代理 API 的 OpenAPI 3.1 规范。 |
| GET | `/llms.txt` | 精选的 LLM 指引索引——推荐的入口。 |
| GET | `/init.md` | 权威的 DWP 采纳提示。 |
| GET | `/{page}.md` | 任意页面的源 Markdown，覆盖全部 17 种语言。 |
| GET | `/api/health.json` | 静态健康标记。 |
| GET | `/api/v1/index.json` | v1 家族的版本化目录：端点路径、站点版本与规范链接。 |
| GET | `/api/v1/sections.json` | 以带类型 JSON 呈现的站点地图——每个分区的名称、路径与描述。 |
| GET | `/api/v1/pages.json` | 每种语言下的全部 Markdown 端点，按语言代码分组。 |
| GET | `/api/v1/health.json` | 版本化健康标记——`/api/health.json` 的 v1 镜像。 |
| POST | `/api/mcp` | MCP 服务器（Streamable HTTP、无状态）。 |
| GET | `/.well-known/ai-catalog.json` | ARD 能力清单（agentmap）。 |

未知的 `/api/*` 路径会返回带解决提示的结构化 JSON 错误，绝不返回 HTML 错误页。

## 版本管理与弃用

版本化的 JSON 家族位于 `/api/v1/` 之下——index、sections、pages 与 health——而未加版本的规范路径（`/llms.txt`、`/{page}.md`、`/api/mcp`）属于同一个 v1 契约。破坏性变更只会随新的 `/api/v{N+1}/` 家族发布，绝不会发生在 v1 内部。当某个端点被弃用时，其响应会携带 `Deprecation: true` 与至少早于移除 180 天的 `Sunset` 日期，并由 `Link` 头指向继任者。

## 速率限制

`/api/*` 的响应携带 RFC 9331 速率限制头——`RateLimit-Limit`、`RateLimit-Remaining`、`RateLimit-Reset` 与 `RateLimit-Policy`——让代理能够实时自我节流；`429` 响应额外携带 `Retry-After`。限流在边缘尽力执行（每位访客每 60 秒 120 次请求），访问保持匿名：无密钥、无注册、无层级。

## MCP 服务器

一个基于 Streamable HTTP 的无状态 Model Context Protocol 服务器，位于 `https://deepworkplan.com/api/mcp`。三个只读工具：

- `get_init_prompt` — 权威的 /init.md 采纳提示。
- `list_site_sections` — 带一行描述的站点地图。
- `read_page` — 任意页面的原生源 Markdown，例如 `/init` 或 `/es/methodology/01-manifesto`。

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

支持协议版本 2025-03-26 与 2025-06-18；无需会话。清单位于 [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json)。服务器卡片位于 [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json)。

## 面向代理的 Markdown

每个已渲染的页面都会以原生源 Markdown 发布——而非 HTML 转换：

```bash
# 对任意 URL 进行内容协商
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# 或直接获取 .md 镜像——每个页面、每种语言
curl -s https://deepworkplan.com/es/developers.md
```

## 安装套件

Deep Work Plan 技能的官方安装路径——与 /init 端点交给代理的命令完全相同。它适用于任何兼容 skills 的编码代理（Claude Code、Cursor、Codex、Gemini 等）：

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

该技能会内嵌到你仓库内的 `.agents/skills/deepworkplan/`，因此每个接触该仓库的代理都共享同一套方法论。官方 `deepworkplan` CLI——一个基于同一 API 的零依赖客户端（`init`、`sections`、`read`、`open`、`mcp`）——已为 npm 做好准备，在发布之前存放于站点仓库的 [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) 目录。

## 机器可读资源

- [OpenAPI 规范](https://deepworkplan.com/openapi.json)
- [代理访问与认证声明](https://deepworkplan.com/auth.md)
- [API 目录，RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP 清单](https://deepworkplan.com/.well-known/mcp.json)
- [安全联系](https://deepworkplan.com/.well-known/security.txt)
- [站点仓库描述符](https://deepworkplan.com/.well-known/dwp.json)
