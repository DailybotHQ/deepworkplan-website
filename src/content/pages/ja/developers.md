---
title: "開発者 — Deep Work Plan のエージェント API"
description: "deepworkplan.com の開発者と AI エージェント向けサーフェス: OpenAPI 仕様で記述された読み取り専用・認証不要 API、/api/mcp のステートレスな MCP サーバー、17 言語のページ単位 Markdown、npx skills インストール CLI。"
---

## 認証ゼロの設計

生成すべき API キーも、OAuth の手順も、本番とは別のサンドボックスもありません——本番のサーフェス自体がサンドボックスです。これは方法論の意図的な性質です。エージェントは「営業に問い合わせる」フォームに記入できないため、このサイトがそのようなものを要求することは決してありません。

- **読み取り専用** — すべての操作は安全でキャッシュ可能な GET です。唯一の例外は MCP エンドポイント（POST）です。書き込み操作はどこにも存在しません。
- **API キー不要** — 登録、トークン、レート制限ティアはありません。匿名アクセスが文書化された契約であり、[/auth.md](https://deepworkplan.com/auth.md) で宣言されています。
- **無料かつオープンソース** — サイトのコンテンツと DWP スキルは MIT ライセンスです。
- **マシンファースト** — `/api/*` での構造化 JSON エラー、Markdown の 404 リカバリーボディ、RFC 9727 API カタログ、ARD 能力マニフェスト。

## エンドポイント

| メソッド | パス | 用途 |
|--------|------|---------|
| GET | `/openapi.json` | エージェント API 全体の OpenAPI 3.1 仕様。 |
| GET | `/llms.txt` | 厳選された LLM ガイドインデックス——推奨入口。 |
| GET | `/init.md` | 正規の DWP 採用プロンプト。 |
| GET | `/{page}.md` | 任意のページをソース Markdown で。全 17 言語。 |
| GET | `/api/health.json` | 静的ヘルスマーカー。 |
| POST | `/api/mcp` | MCP サーバー（Streamable HTTP、ステートレス）。 |
| GET | `/.well-known/ai-catalog.json` | ARD 能力マニフェスト（agentmap）。 |

不明な `/api/*` パスは解決ヒント付きの構造化 JSON エラーを返し、HTML エラーページは決して返しません。

## MCP サーバー

`https://deepworkplan.com/api/mcp` にある、Streamable HTTP 上のステートレスな Model Context Protocol サーバーです。読み取り専用の 3 つのツール:

- `get_init_prompt` — 正規の /init.md 採用プロンプト。
- `list_site_sections` — 一行説明付きのサイトマップ。
- `read_page` — 任意のページをネイティブのソース Markdown で。例: `/init` や `/es/methodology/01-manifesto`。

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

プロトコルバージョン 2025-03-26 と 2025-06-18 をサポートしており、セッションは不要です。マニフェスト: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json)。サーバーカード: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json)。

## エージェントのための Markdown

レンダリングされるすべてのページは、HTML 変換ではなくネイティブのソース Markdown として公開されます:

```bash
# 任意の URL でコンテンツネゴシエーション
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# または .md ミラーを直接取得——すべてのページ、すべての言語
curl -s https://deepworkplan.com/es/developers.md
```

## キットをインストール

Deep Work Plan スキルの公式インストールパスです——/init エンドポイントがエージェントに与えるのと同じコマンドです。skills 互換の任意のコーディングエージェント（Claude Code、Cursor、Codex、Gemini など）で動作します:

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

スキルはリポジトリ内の `.agents/skills/deepworkplan/` にベンダーされるため、リポジトリを扱うすべてのエージェントが同じ方法論を共有します。

## 機械可読リソース

- [OpenAPI 仕様](https://deepworkplan.com/openapi.json)
- [エージェントアクセスと認証宣言](https://deepworkplan.com/auth.md)
- [API カタログ、RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP マニフェスト](https://deepworkplan.com/.well-known/mcp.json)
- [セキュリティ連絡先](https://deepworkplan.com/.well-known/security.txt)
- [サイトリポジトリ記述子](https://deepworkplan.com/.well-known/dwp.json)
