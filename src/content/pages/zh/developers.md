---
title: "开发者 — Deep Work Plan 代理 API"
description: "deepworkplan.com 面向开发者与 AI 代理的接口面：只读、零认证的 API（附 OpenAPI 规范）、位于 /api/mcp 的无状态 MCP 服务器、17 种语言的逐页 Markdown，以及 npx skills 安装 CLI。"
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
| POST | `/api/mcp` | MCP 服务器（Streamable HTTP、无状态）。 |
| GET | `/.well-known/ai-catalog.json` | ARD 能力清单（agentmap）。 |

未知的 `/api/*` 路径会返回带解决提示的结构化 JSON 错误，绝不返回 HTML 错误页。

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

该技能会内嵌到你仓库内的 `.agents/skills/deepworkplan/`，因此每个接触该仓库的代理都共享同一套方法论。

## 机器可读资源

- [OpenAPI 规范](https://deepworkplan.com/openapi.json)
- [代理访问与认证声明](https://deepworkplan.com/auth.md)
- [API 目录，RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP 清单](https://deepworkplan.com/.well-known/mcp.json)
- [安全联系](https://deepworkplan.com/.well-known/security.txt)
- [站点仓库描述符](https://deepworkplan.com/.well-known/dwp.json)
