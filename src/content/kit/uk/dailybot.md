---
title: Dailybot
description: "Опційний DWP-аддон: підключення життєвого циклу плану до команди Dailybot, опційне примусове виконання хуків і повний агентський скіл Dailybot 3.10.3 (чат, чек-іни, форми, Ask AI тощо)."
kind: addon
lang: uk
order: 2
---

# Аддон Dailybot

Підключіть виконання Deep Work Plan до **команди Dailybot**, щоб люди бачили, що будують агенти — kickoff, прогрес у середині плану, блокери та завершення — без додаткових зустрічей чи другого toolchain. **Опційний** аддон для команд, які вже використовують [Dailybot](https://www.dailybot.com).

Основна методика Deep Work Plan має **нульову** залежність від Dailybot. Репозиторій без аддонів повністю відповідає вимогам. Пропонуйте цей аддон лише коли розробник або команда вже використовує Dailybot; ніколи не встановлюйте автоматично для всіх.

## Коли використовувати

| Сигнал | Дія |
|--------|--------|
| Команда вже використовує Dailybot (Slack, Teams, Discord, Google Chat або панель) | **Рекомендуйте** під час онбордингу |
| Розробник просить видимість прогресу агента або оновлення у стилі standup | **Запропонуйте** аддон |
| Greenfield-репозиторій без облікового запису Dailybot | **Пропустіть** — нейтрального базового рівня достатньо |
| Клієнтська робота під NDA, де прогрес не повинен залишати репозиторій | **Пропустіть** або закомітьте `.dailybot/disabled` як локальний kill-switch |

## Що підключає цей аддон (навмисно вузько)

DWP-аддон Dailybot **не перевинаходжує** Dailybot. Він підключає виконання плану до sub-skill dailybot **`report`** і опційно комітить хуки harness. Усе інше — встановлення, згода, автентифікація, стиль написання — **делегується** офіційному [агентському скілу Dailybot](https://github.com/DailybotHQ/agent-skill) (зараз **3.10.3**).

### Чотири події життєвого циклу

Під час DWP `create` / `execute` аддон підключає **чотири best-effort оновлення агента**. Кожна подія умовна (Dailybot присутній і автентифікований), неблокуюча й поважає `.dailybot/disabled`.

| Подія | Тригер | Рівень | Вимога |
|-------|---------|-------|-------------|
| **Kickoff** | План матеріалізовано й схвалено або перший хід `execute` | regular | SHOULD |
| **Significant task** | Завершено функцію, виправлення бага або великий refactor — не setup chores | regular | MAY |
| **Blocked** | План зупинено; заповнено `state.json.blocked` (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | Усі завдання виконано; план завершено | **milestone** | SHOULD |

Payload походять із шару стану плану (`state.json`), якщо він є: `completed` як результати (не номери завдань), `in_progress` з поточного завдання, `blockers` з `state.json.blocked`. Повідомлення описує **що побудовано і чому** — ніколи шляхів файлів, git stats, назв гілок чи ID планів.

### Опційне примусове виконання хуків

З `dailybot-cli >= 3.7.0` аддон **може** закомітити хуки harness на рівні репозиторію (`dailybot hook session-start | activity | post-commit | stop | dismiss`), підтримані локальним реєстром per-repo. Harness нагадує агенту в кінці ходу, коли подію життєвого циклу пропущено — критично для довгих незахищених сесій, де інструкції промпту слабшають.

Успішний звіт життєвого циклу **скидає** реєстр хуків, тож два шари ніколи не дублюють звіти. Команди хуків читають лише локальний стан і завжди завершуються кодом `0`.

### Ідентичність репозиторію та політика звітів

Опційно закомітьте `.dailybot/profile.json` (або `.dailybot_example/profile.json` як шаблон), щоб кожен учасник і агент підписували звіти однаково. **Ніколи** не кладіть облікові дані в цей файл — поле `key` є жорсткою помилкою.

Той самий файл може містити політику звітів, яку поважають хуки:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` особливо корисний для research- або docs-heavy репозиторіїв: робота без комітів (аналіз, дизайн-документи, плани) нагадується швидше.

## Встановлення (усі опційні)

Аддон **пропонує** шляхи встановлення; скіл Dailybot відповідає за згоду та перевірку.

| Компонент | Команда / шлях |
|-----------|----------------|
| **Агентський скіл Dailybot** (рекомендовано) | `npx skills add DailybotHQ/agent-skill` |
| **Оновлення наявного скілу** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (мінімум `>= 3.7.0`) | Встановлюється скілом при першому використанні через `shared/auth.md`; або `pip install 'dailybot-cli>=3.7.0'`, Homebrew чи installer з перевіркою checksum на [cli.dailybot.com](https://cli.dailybot.com) |

Перевірка версій: `dailybot --version` і `dailybot version --check`. Оновлення: `dailybot upgrade`.

## Автентифікація — делегована

Цей аддон **ніколи** не запитує email, OTP чи API keys і **ніколи** не зберігає облікові дані. Автентифікацією володіє скіл Dailybot [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md):

- `dailybot login` (email OTP), або
- `DAILYBOT_API_KEY` / `dailybot config key=...`, або
- опційний, доданий до gitignore файл ключів per-repo `.dailybot/env.json` (`dailybot env add/use`, CLI `>= 3.7.0`), щоб розробник міг бути залогінений у різні організації в різних репозиторіях.

Розв'язання auth — **Bearer-first**: токен сесії має пріоритет, із прозорим повтором Bearer→API-key на `401`/`403`, тож застарілий токен ніколи не блокує дійсний ключ. Якщо auth відхилено або недоступно, звітування тихо пропускається — робота триває.

## Парний скіл Dailybot — 14 можливостей (3.10.3)

Встановлення агентського скілу Dailybot дає набагато більше, ніж підключає DWP-аддон. Офіційний пакет скілів (скіл **3.10.3**, базовий CLI **>= 3.7.0**, поточна публікація **3.7.3**) надає **14 координованих sub-skill**:

| Sub-skill | Що робить |
|-----------|--------------|
| **Progress reports** | Оновлення агента у стилі standup на панелі Dailybot |
| **Ask the AI** | Одноразові headless-запити до AI-асистента Dailybot |
| **Message polling** | Перевірка інструкцій команди на старті сесії або в простої |
| **Email** | Надсилання email з обов'язковими перевірками безпеки перед відправкою |
| **Chat** | Надсилання або редагування в Slack, Microsoft Teams, Discord чи Google Chat — канали, DM, команди, потоки у стилі звіту, send-as-user (Slack, admin) |
| **Conversations** | Відкриття або повторне використання групового DM Slack з ботом і названими колегами; публікація звіту в тому ж виклику |
| **Health and status** | Оголошення агента online/offline для довгих сесій |
| **Check-ins** | Завершення standup; **авторство** check-in (розклад, учасники, питання, нагадування, налаштування AI) |
| **Kudos** | Визнання колег або цілих команд; перегляд recognition feed, org feed, wall of fame |
| **Teams** | Список команд, перегляд учасників, resolve імен у UUID; `me`, `org`, профілі користувачів |
| **Forms** | Список (тепер **org-scoped** за замовчуванням, з `--mine` і `--owner` для звуження), submit, update, transition форм; **авторство** форм (стани workflow, дозволи, ChatOps); пагінація, пошук і фільтри за датою |
| **Workflows** | Читання org workflows (`workflow list` / `workflow get`; лише read-only) |
| **Report channels** | Виявлення UUID каналів для форм або check-in |
| **Per-repo API keys** | Керування `.dailybot/env.json` — опційним, доданим до gitignore файлом API keys + URL на кожне середовище (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**DWP-аддон підключає лише `report` до виконання плану.** Викликайте скіл Dailybot безпосередньо для всього іншого — наприклад, опублікуйте підсумок деплою в `#releases`, завершіть standup або попросіть AI Dailybot підсумувати тренди check-in.

Публічна довідка: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Джерело: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Модель довіри: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) у пакеті скілів.

## Поведінка — делегуй, ніколи не блокуй

| Правило | Деталь |
|------|--------|
| **Делегуй** | Скіл Dailybot відповідає за встановлення, згоду, auth, шаблони хуків, стиль написання |
| **Ніколи не блокуй** | Відсутній CLI, збій auth, мережева помилка → попередь один раз, продовжуй основну роботу |
| **Без повторів** | Не входь у діагностичні цикли; звітування — best-effort |
| **Узгоджуй** | Наявний скіл, CLI, profile, хуки або wiring звітів зберігається — заповнюй лише прогалини |
| **Vendor-neutral** | DWP не вимагає Dailybot; цей аддон — додаткова видимість для команди |

## Потік онбордингу

Під час DWP `onboard` у **Phase 7b**, після основного AI-first scaffolding, потік пропонує п'ять опційних аддонів. Якщо розробник приймає Dailybot:

1. Виявити наявне налаштування (скіл, CLI, `.dailybot/profile.json`, хуки, крок звіту).
2. Запропонувати встановлення скілу/CLI через потоки згоди Dailybot.
3. Делегувати автентифікацію до `shared/auth.md`.
4. Підключити чотири події життєвого циклу до `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Опційно запропонувати примусове виконання хуків і `.dailybot/profile.json`.
6. Запустити валідацію (SPEC §8 у `addons/dailybot/SPEC.md` скілу).

Нормативний контракт у скілі Deep Work Plan: `addons/dailybot/SPEC.md` (версія **2.3.0**).

## Пов'язані записи kit

- [Devcontainer](/kit/devcontainer) — відтворюване dev-середовище з персистентністю Dailybot CLI (перший аддон)
- [Dependency upgrade](/kit/dependency-upgrade) — пакетні, перевірені оновлення залежностей (третій аддон)
- [Design system](/kit/design-system) — `DESIGN.md` для агентів на поверхнях інтерфейсу (четвертий аддон)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — sub-skill онбордингу, що пропонує аддони
