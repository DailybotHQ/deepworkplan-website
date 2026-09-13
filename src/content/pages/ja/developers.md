---
title: "開発者 — Deep Work Plan のエージェント API"
description: "Deep Work Plan のエージェントサーフェス：読み取り専用・認証不要・バージョン付きの API——OpenAPI 仕様、MCP サーバー、17 言語のページ単位 Markdown、公式 CLI。"
---

## 認証ゼロの設計

生成すべき API キーも、OAuth の手順も、本番とは別のサンドボックスもありません——本番のサーフェス自体がサンドボックスです。これは方法論の意図的な性質です。エージェントは「営業に問い合わせる」フォームに記入できないため、このサイトがそのようなものを要求することは決してありません。

- **読み取り専用** — すべての操作は安全でキャッシュ可能な GET です。唯一の例外は MCP エンドポイント（POST）です。書き込み操作はどこにも存在しません。
- **API キー不要** — 登録、トークン、レート制限ティアはありません。匿名アクセスが文書化された契約であり、[/auth.md](https://deepworkplan.com/auth.md) で宣言されています。
- **無料かつオープンソース** — サイトのコンテンツと DWP スキルは MIT ライセンスです。
- **マシンファースト** — `/api/*` での構造化 JSON エラー、Markdown の 404 リカバリーボディ、RFC 9727 API カタログ、ARD 能力マニフェスト。

## スキルで計画し、実行する

上記の API はエージェントがこのサイトを読み取ることを可能にします。DWP スキルは、エージェントが方法論を実行することを可能にするものです——リポジトリに一度インストールすれば、ルーターと九つのサブスキルが提供され、スラッシュコマンドとして（または名前で、スラッシュを傍受するエージェントの場合はほとんどが代わりに `#` を使います。例：`#dwp-execute`）呼び出せます。

すべての計画は、二つの独立した軸からそれぞれ一つの値を選びます。

- **Lite** — タスク記録は計画の README 内に、安定した `#task-N` アンカーの下でインラインに存在します。小さく範囲の定まった作業向けです:一つの関心事を、おおよそ一回の作業時間で。
- **Full** — `N.task_<slug>.md` の下にタスクごとに一つのファイルを持ちます。数時間から数日にわたる長期的な作業や、タスク間に実際の依存関係がある場合向けです。Lite の計画は後から `/dwp-refine promote` で Full に昇格できます。
- **Guided (default)** — `dwp-create` は目標を分析し、レビュー可能な計画を具体化してから、そのまま採用するか、Lite を Full に昇格するか、編集するか、停止するかを尋ねます。実際のプロダクト作業が始まる前に、人間がループに留まります。
- **Trust (or auto)** — 最後の単語として `trust`（または `auto`）を付け加えると、エージェントはレビューの段階を省略し、事前承認済みの計画を具体化して、実行コマンドを直接返します。

九つのサブスキル:

| コマンド | 内容 |
|---------|------|
| `/dwp-create <goal>` | 目標を計画に変えます——デフォルトは Lite、より大きな作業には Full。 |
| `/dwp-execute` | 既存の計画をタスクごとに実行します:計画全体を読み、各タスクを順番に実行し、そのゲートを検証し、進捗を更新します。 |
| `/dwp-refine` | 完了した作業とその記録された証拠を保持したまま、既存の計画のタスクを追加・削除・並べ替えます。 |
| `/dwp-resume` | 計画自身のファイルから状態を再構築し、中断された計画を最初の未完了タスクから継続します。 |
| `/dwp-status` | 計画の進捗——完了・進行中・保留中のタスク——を、何も変更せずに報告します。 |
| `/dwp-verify` | リポジトリが AI-first であるか、その計画群が適切な形式であるかを機械的にチェックします。 |
| `/deepworkplan-onboard` | リポジトリを AI-first にします:適応した `AGENTS.md`、`docs/`、`.agents/`、そして gitignore された `.dwp/` を生成します。 |
| `/skill-create`、`/agent-create` | 作者向けのサブスキルです:リポジトリ自身のキットを育てます。 |
| `/dwp-upgrade` | 公開されている新しいスキルのリリースを確認し、承認後にのみインストールしてオンボーディングを再実行します。 |

小さく範囲の定まった修正——Lite、trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

長期にわたる作業——Full、guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

すべての計画の出力——マニフェスト、進捗ログ、タスク記録、ゲートの証拠——は、リポジトリ自体の中にある gitignore された `.dwp/` ディレクトリの下に置かれます。deepworkplan.com に送信されたり保存されたりすることは一切ありません。

## エンドポイント

| メソッド | パス | 用途 |
|--------|------|---------|
| GET | `/openapi.json` | エージェント API 全体の OpenAPI 3.1 仕様。 |
| GET | `/llms.txt` | 厳選された LLM ガイドインデックス——推奨入口。 |
| GET | `/init.md` | 正規の DWP 採用プロンプト。 |
| GET | `/{page}.md` | 任意のページをソース Markdown で。全 17 言語。 |
| GET | `/api/health.json` | 静的ヘルスマーカー。 |
| GET | `/api/v1/index.json` | v1 ファミリーのバージョン付きカタログ：エンドポイントのパス、サイトのバージョン、仕様へのリンク。 |
| GET | `/api/v1/sections.json` | 型付き JSON によるサイトマップ——セクションごとの名前・パス・説明。 |
| GET | `/api/v1/pages.json` | すべての言語のすべての Markdown エンドポイントを、言語コードごとにグループ化した一覧。 |
| GET | `/api/v1/health.json` | バージョン付きのヘルスマーカー——`/api/health.json` の v1 ミラー。 |
| POST | `/api/mcp` | MCP サーバー（Streamable HTTP、ステートレス）。 |
| GET | `/.well-known/ai-catalog.json` | ARD 能力マニフェスト（agentmap）。 |

不明な `/api/*` パスは解決ヒント付きの構造化 JSON エラーを返し、HTML エラーページは決して返しません。

## バージョニングと廃止

バージョン付き JSON ファミリーは `/api/v1/` 配下に存在します——index、sections、pages、health——そして、バージョンなしの正規パス（`/llms.txt`、`/{page}.md`、`/api/mcp`）も同じ v1 契約に属します。破壊的変更は新しい `/api/v{N+1}/` ファミリーとしてのみ提供され、v1 の内部で行われることはありません。エンドポイントが廃止されると、そのレスポンスは `Deprecation: true` と、削除の少なくとも 180 日前を示す `Sunset` 日付を伴い、`Link` ヘッダーが後継を指します。

## レート制限

`/api/*` のレスポンスは RFC 9331 のレート制限ヘッダー——`RateLimit-Limit`、`RateLimit-Remaining`、`RateLimit-Reset`、`RateLimit-Policy`——を伴うため、エージェントはリアルタイムに自分のペースを調整できます。`429` レスポンスには `Retry-After` が追加されます。実施はエッジでのベストエフォート（訪問者あたり 60 秒につき 120 リクエスト）で、アクセスは匿名のままです：キーも登録も階層もありません。

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
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

スキルはリポジトリ内の `.agents/skills/deepworkplan/` にベンダーされるため、リポジトリを扱うすべてのエージェントが同じ方法論を共有します。公式 `deepworkplan` CLI——同じ API の上に作られた依存関係ゼロのクライアント（`init`、`sections`、`read`、`open`、`mcp`）——は npm に向けて準備済みで、公開までサイトリポジトリの [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) ディレクトリにあります。

## 機械可読リソース

- [OpenAPI 仕様](https://deepworkplan.com/openapi.json)
- [エージェントアクセスと認証宣言](https://deepworkplan.com/auth.md)
- [API カタログ、RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP マニフェスト](https://deepworkplan.com/.well-known/mcp.json)
- [セキュリティ連絡先](https://deepworkplan.com/.well-known/security.txt)
- [サイトリポジトリ記述子](https://deepworkplan.com/.well-known/dwp.json)
