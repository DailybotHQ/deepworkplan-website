---
title: "Розробникам — агентне API Deep Work Plan"
description: "Поверхня Deep Work Plan для агентів: версіонований read-only API без автентифікації, специфікація OpenAPI, MCP-сервер і Markdown для кожної сторінки 17 мовами."
---

## Свідомо без авторизації

Тут немає API-ключів для генерації, жодних OAuth-танців і жодної пісочниці, відокремленої від продакшену, — сама продакшен-поверхня і є пісочницею. Це свідома властивість методології: агенти не вміють заповнювати форми «зв’яжіться з відділом продажів», тож сайт ніколи про це не просить.

- **Лише читання** — кожна операція є безпечним GET, що кешується, крім кінцевої точки MCP (POST). Операцій запису не існує взагалі.
- **Без API-ключів** — без реєстрації, токенів і рівнів лімітів запитів. Анонімний доступ — це документований контракт, заявлений у [/auth.md](https://deepworkplan.com/auth.md).
- **Безкоштовно і з відкритим кодом** — вміст сайту та навичка DWP ліцензовані під MIT.
- **Спершу машини** — структуровані JSON-помилки на `/api/*`, Markdown-тіла відновлення 404, каталог API RFC 9727 і маніфест можливостей ARD.

## Плануйте та виконуйте за допомогою skill

API вище дозволяє агенту читати цей сайт. Skill DWP — це те, що дозволяє агенту виконувати методологію: встановіть її один раз у репозиторії, і вона принесе роутер плюс дев'ять sub-skills, які викликаються як слеш-команди.

- **Lite** — записи завдань прямо в README плану, для невеликої, обмеженої роботи.
- **Full** — один файл на завдання, для роботи на довгу перспективу або з реальними залежностями між завданнями.
- **Guided (за замовчуванням)** — агент матеріалізує план, готовий до рев'ю, і запитує перед початком продуктової роботи.
- **Trust (або auto)** — пропускає раунд рев'ю і одразу виконує заздалегідь схвалений план.

| Команда | Опис |
|---------|------|
| `/dwp-create <goal>` | Перетворює ціль на план — Lite за замовчуванням, Full для більшої роботи. |
| `/dwp-execute` | Виконує наявний план завдання за завданням: читає його повністю, виконує кожне завдання по порядку, валідує його gate, оновлює прогрес. |
| `/dwp-refine` | Додає, видаляє чи переупорядковує завдання в наявному плані, зберігаючи завершену роботу та її зафіксовані докази. |
| `/dwp-resume` | Відновлює стан із власних файлів плану та продовжує перерваний план із першого незавершеного завдання. |
| `/dwp-status` | Повідомляє про прогрес плану — завершені, поточні, очікувані — не вносячи жодних змін. |
| `/dwp-verify` | Механічно перевіряє, чи є репозиторій AI-first і чи добре сформовані його плани. Нічого не змінює; повідомляє pass чи fail. |
| `/deepworkplan-onboard` | Робить репозиторій AI-first: аналізує його стек, потім генерує адаптований AGENTS.md, docs/, .agents/ і ігнорований git .dwp/. |
| `/skill-create`, `/agent-create` | Sub-skill для авторства: розвиває власний кіт репозиторію — skill або агента. |
| `/dwp-upgrade` | Перевіряє наявність новішого релізу skill і, лише після схвалення, встановлює його та заново запускає onboarding. |

Маленьке, обмежене виправлення — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Робота на довгу перспективу — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

Вивід кожного плану — маніфест, лог прогресу, записи завдань, докази gate — живе під ігнорованою git директорією `.dwp/` у самому репозиторії. Нічого не надсилається на deepworkplan.com і не зберігається ним; skill взагалі не робить мережевих викликів.

## Кінцеві точки

| Метод | Шлях | Призначення |
|--------|------|---------|
| GET | `/openapi.json` | Специфікація OpenAPI 3.1 усього агентного API. |
| GET | `/llms.txt` | Упорядкований індекс настанов для LLM — рекомендована точка входу. |
| GET | `/init.md` | Канонічний промт прийняття DWP. |
| GET | `/{page}.md` | Будь-яка сторінка як вихідний Markdown, усіма 17 мовами. |
| GET | `/api/health.json` | Статичний маркер стану. |
| GET | `/api/v1/index.json` | Версіонований каталог сімейства v1: шляхи кінцевих точок, версія сайту та посилання на специфікацію. |
| GET | `/api/v1/sections.json` | Мапа сайту як типізований JSON — назва, шлях та опис для кожного розділу. |
| GET | `/api/v1/pages.json` | Кожна Markdown-кінцева точка кожною мовою, згруповані за кодом мови. |
| GET | `/api/v1/health.json` | Версіонований маркер стану — v1-дзеркало `/api/health.json`. |
| POST | `/api/mcp` | MCP-сервер (Streamable HTTP, безстановий). |
| GET | `/.well-known/ai-catalog.json` | Маніфест можливостей ARD (агентмапа). |

Невідомі шляхи `/api/*` повертають структуровану JSON-помилку з підказкою вирішення, а не HTML-сторінку помилки.

## Версіонування та виведення з експлуатації

Версіоноване JSON-сімейство живе під `/api/v1/` — index, sections, pages і health — а канонічні шляхи без версії (`/llms.txt`, `/{page}.md`, `/api/mcp`) належать до того ж контракту v1. Зміни, що ламають сумісність, виходять лише в новому сімействі `/api/v{N+1}/` і ніколи всередині v1. Коли кінцеву точку виводять з експлуатації, її відповіді несуть `Deprecation: true` і дату `Sunset` щонайменше за 180 днів до вилучення, а заголовок `Link` указує на наступника.

## Ліміти запитів

Відповіді на `/api/*` несуть заголовки лімітів RFC 9331 — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` і `RateLimit-Policy` — щоб агенти могли самостійно регулювати темп у реальному часі; відповідь `429` додає `Retry-After`. Застосування — best-effort на мережевому краю (120 запитів за 60 секунд на відвідувача), а доступ залишається анонімним: без ключів, без реєстрації, без рівнів.

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
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

Навичка вбудовується (vendoring) у `.agents/skills/deepworkplan/` всередині вашого репозиторію, тож кожен агент, що торкається репозиторію, ділить ту саму методологію. Офіційна консольна утиліта `deepworkplan` CLI — клієнт без залежностей поверх того самого API (`init`, `sections`, `read`, `open`, `mcp`) — підготовлена до публікації в npm і до виходу живе в каталозі [cli/](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) репозиторія сайту.

## Машиночитні ресурси

- [Специфікація OpenAPI](https://deepworkplan.com/openapi.json)
- [Декларація доступу й авторизації агентів](https://deepworkplan.com/auth.md)
- [Каталог API, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [Маніфест MCP](https://deepworkplan.com/.well-known/mcp.json)
- [Контакт безпеки](https://deepworkplan.com/.well-known/security.txt)
- [Дескриптор репозиторію сайту](https://deepworkplan.com/.well-known/dwp.json)
