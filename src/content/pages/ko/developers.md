---
title: "개발자 — Deep Work Plan 에이전트 API"
description: "deepworkplan.com의 개발자와 AI 에이전트용 표면: OpenAPI 스펙으로 기술된 읽기 전용 무인증 API, /api/mcp의 스테이트리스 MCP 서버, 17개 언어의 페이지별 Markdown, npx skills 설치 CLI."
---

## 설계부터 무인증

생성할 API 키도, OAuth 절차도, 프로덕션과 분리된 샌드박스도 없습니다 — 프로덕션 표면 자체가 샌드박스입니다. 이는 방법론의 의도적인 속성입니다. 에이전트는 "영업 문의" 양식을 작성할 수 없기에, 이 사이트는 그런 것을 절대 요구하지 않습니다.

- **읽기 전용** — 모든 작업은 안전하고 캐시 가능한 GET입니다. 유일한 예외는 MCP 엔드포인트(POST)입니다. 쓰기 작업은 어디에도 존재하지 않습니다.
- **API 키 불필요** — 등록, 토큰, 속도 제한 티어가 없습니다. 익명 접근이 문서화된 계약이며, [/auth.md](https://deepworkplan.com/auth.md)에 선언되어 있습니다.
- **무료 및 오픈 소스** — 사이트 콘텐츠와 DWP 스킬은 MIT 라이선스입니다.
- **머신 퍼스트** — `/api/*`의 구조화된 JSON 오류, Markdown 404 복구 본문, RFC 9727 API 카탈로그, ARD 역량 매니페스트.

## 엔드포인트

| 메서드 | 경로 | 용도 |
|--------|------|---------|
| GET | `/openapi.json` | 전체 에이전트 API의 OpenAPI 3.1 스펙. |
| GET | `/llms.txt` | 엄선된 LLM 안내 인덱스 — 권장 진입점. |
| GET | `/init.md` | 정식 DWP 채택 프롬프트. |
| GET | `/{page}.md` | 모든 페이지를 소스 Markdown으로. 17개 언어 모두. |
| GET | `/api/health.json` | 정적 헬스 마커. |
| POST | `/api/mcp` | MCP 서버(Streamable HTTP, 스테이트리스). |
| GET | `/.well-known/ai-catalog.json` | ARD 역량 매니페스트(agentmap). |

알 수 없는 `/api/*` 경로는 해결 힌트를 포함한 구조화된 JSON 오류를 반환하며, HTML 오류 페이지는 결코 반환하지 않습니다.

## MCP 서버

`https://deepworkplan.com/api/mcp`에 있는, Streamable HTTP 위의 스테이트리스 Model Context Protocol 서버입니다. 세 가지 읽기 전용 도구:

- `get_init_prompt` — 정식 /init.md 채택 프롬프트.
- `list_site_sections` — 한 줄 설명이 붙은 사이트맵.
- `read_page` — 모든 페이지를 네이티브 소스 Markdown으로. 예: `/init` 또는 `/es/methodology/01-manifesto`.

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

프로토콜 버전 2025-03-26과 2025-06-18을 지원하며 세션은 필요하지 않습니다. 매니페스트: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). 서버 카드: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## 에이전트를 위한 Markdown

렌더링되는 모든 페이지는 HTML 변환이 아니라 네이티브 소스 Markdown으로 게시됩니다:

```bash
# 모든 URL에서 콘텐츠 협상
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# 또는 .md 미러를 직접 가져오기 — 모든 페이지, 모든 언어
curl -s https://deepworkplan.com/es/developers.md
```

## 키트 설치

Deep Work Plan 스킬의 공식 설치 경로입니다 — /init 엔드포인트가 에이전트에게 주는 것과 같은 명령입니다. skills 호환 코딩 에이전트(Claude Code, Cursor, Codex, Gemini 등)라면 무엇이든 작동합니다:

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

스킬은 리포지토리 내 `.agents/skills/deepworkplan/`에 벤더되므로, 리포지토리를 다루는 모든 에이전트가 같은 방법론을 공유합니다.

## 기계 판독 가능 리소스

- [OpenAPI 스펙](https://deepworkplan.com/openapi.json)
- [에이전트 접근 및 인증 선언](https://deepworkplan.com/auth.md)
- [API 카탈로그, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP 매니페스트](https://deepworkplan.com/.well-known/mcp.json)
- [보안 연락처](https://deepworkplan.com/.well-known/security.txt)
- [사이트 리포지토리 디스크립터](https://deepworkplan.com/.well-known/dwp.json)
