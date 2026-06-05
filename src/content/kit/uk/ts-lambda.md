---
title: TypeScript Lambda
description: "Пресет онбордингу для serverless TypeScript Lambda-проєктів із підказками для обробників, інструментів Serverless/SAM/CDK та мінімальних привілеїв IAM."
kind: preset
lang: uk
order: 22
stack: TS Lambda (Serverless)
---

# Пресет TypeScript Lambda

Орієнтир для міркувань, який процес онбордингу використовує для serverless TypeScript Lambda-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- Дескриптор розгортання: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) або `cdk.json` (AWS CDK) разом із `tsconfig.json`.
- Функції-обробники, що експортують `handler`, зазвичай у `src/functions/` або `src/handlers/`, із однією точкою входу на функцію.

## Про що міркувати

- Справжні ворота: лінтинг (`eslint`), перевірка типів (`tsc --noEmit`), тестування (Jest/Vitest), бандлінг (esbuild/tsc) і synth/package (`sls package`, `sam build`, `cdk synth`) — зафіксувати дослівно.
- Структура кожної функції, джерела подій (API Gateway, SQS, EventBridge) і бюджет холодного старту/розміру бандлу.
- Область IAM — мінімальні привілеї для кожної функції — і місця зберігання секретів та конфігурації (SSM, Secrets Manager, env).

## Примітки

Робити акцент на мінімальних привілеях IAM у документації SECURITY. Synth/package є безпечними воротами; deploy змінює акаунт і не повинен запускатися як валідація.
