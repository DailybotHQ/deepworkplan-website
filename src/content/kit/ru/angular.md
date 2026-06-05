---
title: Angular
description: "Пресет онбординга для проектов Angular с подсказками для рассуждений о компонентах, модулях и standalone API, сервисах, RxJS и тест-раннере."
kind: preset
lang: ru
order: 15
stack: Angular
---

# Пресет Angular

Руководство-рассуждение, которое процесс onboard использует для проектов Angular. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `angular.json` и `@angular/core` в зависимостях; `src/app/` с `@Component`/`@NgModule` или standalone-компонентами.
- Сервисы с `@Injectable`, RxJS-наблюдаемые и внедрение зависимостей.
- Менеджер пакетов определяется из существующего lockfile.

## О чём рассуждать

- Реальные команды тестирования (`ng test` / Karma+Jasmine `*.spec.ts` или Jest), линтинга (`ng lint` / `@angular-eslint`) и сборки (`ng build`) — захваченные дословно.
- Использует ли приложение NgModules или API standalone-компонентов, а также соглашения маршрутизации и DI.
- Стек-специфичные навыки: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Примечания

Подходит для Angular-приложений, следующих структуре проекта CLI. Определить Karma/Jasmine или Jest из существующей конфигурации.
