---
title: "Розробникам — агентне API Deep Work Plan"
description: "Агентна поверхня deepworkplan.com для розробників і AI-агентів: API лише для читання без авторизації, описане через OpenAPI, безстановий MCP-сервер на /api/mcp, Markdown для кожної сторінки 17 мовами та CLI npx skills."
---

## Свідомо без авторизації

Тут немає API-ключів для генерації, жодних OAuth-танців і жодної пісочниці, відокремленої від продакшену, — сама продакшен-поверхня і є пісочницею. Це свідома властивість методології: агенти не вміють заповнювати форми «зв’яжіться з відділом продажів», тож сайт ніколи про це не просить.

- **Лише читання** — кожна операція є безпечним GET, що кешується, крім кінцевої точки MCP (POST). Операцій запису не існує взагалі.
- **Без API-ключів** — без реєстрації, токенів і рівнів лімітів запитів. Анонімний доступ — це документований контракт, заявлений у [/auth.md](https://deepworkplan.com/auth.md).
- **Безкоштовно і з відкритим кодом** — вміст сайту та навичка DWP ліцензовані під MIT.
- **Спершу машини** — структуровані JSON-помилки на `/api/*`, Markdown-тіла відновлення 404, каталог API RFC 9727 і маніфест можливостей ARD.

## Кінцеві точки

| Метод | Шлях | Призначення |
|--------|------|---------|
| GET | `/openapi.json` | Специфікація OpenAPI 3.1 усього агентного API. |
| GET | `/llms.txt` | Упорядкований індекс настанов для LLM — рекомендована точка входу. |
| GET | `/init.md` | Канонічний промт прийняття DWP. |
| GET | `/{page}.md` | Будь-яка сторінка як вихідний Markdown, усіма 17 мовами. |
| GET | `/api/health.json` | Статичний маркер стану. |
| POST | `/api/mcp` | MCP-сервер (Streamable HTTP, безстановий). |
| GET | `/.well-known/ai-catalog.json` | Маніфест можливостей ARD (агентмапа). |

Невідомі шляхи `/api/*` повертають структуровану JSON-помилку з підказкою вирішення, а не HTML-сторінку помилки.

## MCP-сервер

Безстановий сервер Model Context Protocol через Streamable HTTP на `https://deepworkplan.com/api/mcp`. Три інструменти лише для читання:

- `get_init_prompt` — канонічний промт прийняття /init.md.
- `list_site_sections` — карта сайту з однорядковими описами.
- `read_page` — будь-яка сторінка як нативний вихідний Markdown, напр. `/init` або `/es/methodology/01-manifesto`.

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

Підтримуються версії протоколу 2025-03-26 і 2025-06-18; сесія не потрібна. Маніфест: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Картка сервера: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown для агентів

Кожна відрендерена сторінка публікується як нативний вихідний Markdown — не конвертація з HTML:

```bash
# Узгодження вмісту на будь-якому URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Або прямий запит .md-дзеркала — кожна сторінка, кожна мова
curl -s https://deepworkplan.com/es/developers.md
```

## Встановити набір

Офіційний шлях встановлення навички Deep Work Plan — та сама команда, яку кінцева точка /init дає агентам. Працює з будь-яким сумісним зі skills агентом для коду (Claude Code, Cursor, Codex, Gemini та інші):

```bash
npx skills add DailybotHQ/deepworkplan-skill@latest
```

Навичка вбудовується (vendoring) у `.agents/skills/deepworkplan/` всередині вашого репозиторію, тож кожен агент, що торкається репозиторію, ділить ту саму методологію.

## Машиночитні ресурси

- [Специфікація OpenAPI](https://deepworkplan.com/openapi.json)
- [Декларація доступу й авторизації агентів](https://deepworkplan.com/auth.md)
- [Каталог API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Маніфест MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Контакт безпеки](https://deepworkplan.com/.well-known/security.txt)
- [Дескриптор репозиторію сайту](https://deepworkplan.com/.well-known/dwp.json)
