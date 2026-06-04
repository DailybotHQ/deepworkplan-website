---
title: Node / TS service
description: "Пресет онбордингу для сервісів на Node і TypeScript та serverless-API з підказками щодо життєвого циклу запиту, інтеграцій і тестів."
kind: preset
lang: uk
order: 4
stack: Node / TS service
---

# Пресет Node / TS service

Орієнтир для міркувань, який процес онбордингу використовує для сервісів на Node/TypeScript і serverless-API. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `tsconfig.json` плюс серверний фреймворк (`express`, `fastify`, `@nestjs/*`) або serverless-обробники (`serverless.yml`, `template.yaml`, тека `functions/`).
- Менеджер пакетів виводиться з наявного lock-файла.

## Про що міркувати

- Справжні скрипти лінтингу, перевірки типів (`tsc --noEmit`), тестування (Jest/Vitest) і збірки — фіксуються дослівно.
- Це тривалий сервіс чи serverless — це визначає документацію з архітектури та продуктивності.
- Доречні для стека скіли: `endpoint`/`handler`, `service`, `middleware`, `integration` або `lambda-fn`.

## Примітки

Зафіксуйте життєвий цикл запиту чи події, точки інтеграції та місце зберігання секретів і конфігурації.
