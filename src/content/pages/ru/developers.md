---
title: "Разработчикам — агентное API Deep Work Plan"
description: "Поверхность Deep Work Plan для агентов: версионируемый read-only API без аутентификации, спецификация OpenAPI, MCP-сервер и Markdown для каждой страницы на 17 языках."
---

## Без авторизации по замыслу

Здесь не нужно генерировать API-ключи, нет OAuth-танцев и нет песочницы, отделённой от продакшена, — сама продакшен-поверхность и есть песочница. Это сознательное свойство методологии: агенты не умеют заполнять формы «свяжитесь с отделом продаж», поэтому сайт никогда такого не просит.

- **Только чтение** — каждая операция является безопасным кешируемым GET, кроме конечной точки MCP (POST). Операций записи не существует вовсе.
- **Без API-ключей** — без регистрации, токенов и уровней лимитов запросов. Анонимный доступ — это документированный контракт, объявленный в [/auth.md](https://deepworkplan.com/auth.md).
- **Бесплатно и open source** — контент сайта и навык DWP лицензированы под MIT.
- **Сначала машины** — структурированные JSON-ошибки на `/api/*`, Markdown-тела восстановления 404, каталог API RFC 9727 и манифест возможностей ARD.

## Конечные точки

| Метод | Путь | Назначение |
|--------|------|---------|
| GET | `/openapi.json` | Спецификация OpenAPI 3.1 всего агентного API. |
| GET | `/llms.txt` | Курируемый индекс наставлений для LLM — рекомендуемая точка входа. |
| GET | `/init.md` | Канонический промпт принятия DWP. |
| GET | `/{page}.md` | Любая страница как исходный Markdown, на всех 17 языках. |
| GET | `/api/health.json` | Статический маркер состояния. |
| GET | `/api/v1/index.json` | Версионируемый каталог семейства v1: пути конечных точек, версия сайта и ссылки на спецификацию. |
| GET | `/api/v1/sections.json` | Карта сайта в виде типизированного JSON — имя, путь и описание для каждого раздела. |
| GET | `/api/v1/pages.json` | Каждая Markdown-конечная точка на каждом языке, сгруппированные по коду языка. |
| GET | `/api/v1/health.json` | Версионируемый маркер состояния — v1-зеркало `/api/health.json`. |
| POST | `/api/mcp` | MCP-сервер (Streamable HTTP, без состояния). |
| GET | `/.well-known/ai-catalog.json` | Манифест возможностей ARD (агентмапа). |

Неизвестные пути `/api/*` возвращают структурированную JSON-ошибку с подсказкой решения, а не HTML-страницу ошибки.

## Версионирование и устаревание

Версионируемое JSON-семейство живёт под `/api/v1/` — index, sections, pages и health — а канонические пути без версии (`/llms.txt`, `/{page}.md`, `/api/mcp`) принадлежат тому же контракту v1. Ломающие изменения выходят только в новом семействе `/api/v{N+1}/` и никогда внутри v1. Когда конечная точка устаревает, её ответы несут `Deprecation: true` и дату `Sunset` не менее чем за 180 дней до удаления, а заголовок `Link` указывает на преемника.

## Лимиты запросов

Ответы на `/api/*` несут заголовки лимитов RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` и `RateLimit-Policy` — чтобы агенты могли регулировать себя в реальном времени; ответ `429` добавляет `Retry-After`. Применение — best-effort на границе сети (120 запросов за 60 секунд на посетителя), а доступ остаётся анонимным: без ключей, без регистрации, без уровней.

## MCP-сервер

Не имеющий состояния сервер Model Context Protocol поверх Streamable HTTP на `https://deepworkplan.com/api/mcp`. Три инструмента только для чтения:

- `get_init_prompt` — канонический промпт принятия /init.md.
- `list_site_sections` — карта сайта с однострочными описаниями.
- `read_page` — любая страница как нативный исходный Markdown, напр. `/init` или `/es/methodology/01-manifesto`.

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

Поддерживаются версии протокола 2025-03-26 и 2025-06-18; сессия не требуется. Манифест: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Карточка сервера: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown для агентов

Каждая отрисованная страница публикуется как нативный исходный Markdown — не HTML-конвертация:

```bash
# Согласование содержимого на любом URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Или запросите .md-зеркало напрямую — каждая страница, каждый язык
curl -s https://deepworkplan.com/es/developers.md
```

## Установите набор

Официальный путь установки навыка Deep Work Plan — та же команда, которую конечная точка /init даёт агентам. Работает с любым совместимым со skills агентом для кода (Claude Code, Cursor, Codex, Gemini и другие):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Навык вендорится (vendoring) в `.agents/skills/deepworkplan/` внутри вашего репозитория, поэтому каждый агент, работающий с репозиторием, разделяет ту же методологию. Официальная консольная утилита `deepworkplan` CLI — клиент без зависимостей поверх того же API (`init`, `sections`, `read`, `open`, `mcp`) — подготовлена к публикации на npm и до выхода живёт в каталоге [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) репозитория сайта.

## Машиночитаемые ресурсы

- [Спецификация OpenAPI](https://deepworkplan.com/openapi.json)
- [Декларация доступа и авторизации агентов](https://deepworkplan.com/auth.md)
- [Каталог API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Манифест MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Контакт безопасности](https://deepworkplan.com/.well-known/security.txt)
- [Дескриптор репозитория сайта](https://deepworkplan.com/.well-known/dwp.json)
