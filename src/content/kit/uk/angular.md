---
title: Angular
description: "Пресет онбордингу для Angular-проєктів із підказками для компонентів, модулів або standalone API, сервісів, RxJS та тест-раннера."
kind: preset
lang: uk
order: 15
stack: Angular
---

# Пресет Angular

Орієнтир для міркувань, який процес онбордингу використовує для Angular-проєктів. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `angular.json` і `@angular/core` у залежностях; `src/app/` з `@Component`/`@NgModule` або standalone-компонентами.
- Сервіси з `@Injectable`, RxJS observables та ін'єкція залежностей.
- Менеджер пакетів виводиться з наявного lockfile.

## Про що міркувати

- Справжні команди тестування (`ng test` / Karma+Jasmine `*.spec.ts` або Jest), лінтингу (`ng lint` / `@angular-eslint`) і збірки (`ng build`) — зафіксувати дослівно.
- Чи використовує застосунок NgModules або standalone-components API, а також конвенції маршрутизації та DI.
- Відповідні стеку скіли: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Примітки

Підходить для Angular-застосунків зі структурою CLI-проєкту. Підтвердити Karma/Jasmine vs Jest із наявної конфігурації.
