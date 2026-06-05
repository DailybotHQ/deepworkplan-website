---
title: TypeScript Lambda
description: "Пресет онбординга для бессерверных TypeScript Lambda проектов с подсказками для рассуждений об обработчиках, инструментах Serverless/SAM/CDK и принципе минимальных привилегий IAM."
kind: preset
lang: ru
order: 22
stack: TS Lambda (Serverless)
---

# Пресет TypeScript Lambda

Руководство-рассуждение, которое процесс onboard использует для бессерверных TypeScript Lambda проектов. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- Дескриптор деплоя: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) или `cdk.json` (AWS CDK), рядом с `tsconfig.json`.
- Функции-обработчики, экспортирующие `handler`, обычно в `src/functions/` или `src/handlers/`, с одной точкой входа на функцию.

## О чём рассуждать

- Реальный шлюз: линтинг (`eslint`), проверка типов (`tsc --noEmit`), тестирование (Jest/Vitest), бандлинг (esbuild/tsc) и синтез/пакетирование (`sls package`, `sam build`, `cdk synth`) — захваченные дословно.
- Структура на функцию, источники событий (API Gateway, SQS, EventBridge) и бюджет cold-start/размера бандла.
- Область IAM — минимальные привилегии на функцию — и где хранятся секреты и конфигурация (SSM, Secrets Manager, env).

## Примечания

Подчеркнуть принцип минимальных привилегий IAM в документации SECURITY. Synth/package — безопасный шлюз; deploy изменяет аккаунт и не должен выполняться в качестве валидации.
