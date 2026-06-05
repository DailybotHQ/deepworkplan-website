---
title: Angular
description: "Um preset de onboarding para projetos Angular, com pistas de raciocínio para components, módulos ou APIs standalone, services, RxJS e o test runner."
kind: preset
lang: pt
order: 15
stack: Angular
---

# Preset Angular

Um guia de raciocínio que o fluxo de onboarding usa para projetos Angular. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `angular.json` e `@angular/core` nas dependências; `src/app/` com `@Component`/`@NgModule` ou components standalone.
- Services com `@Injectable`, observables RxJS e injeção de dependência.
- Gerenciador de pacotes inferido a partir do lockfile presente.

## Sobre o que raciocinar

- Os comandos reais de teste (`ng test` / Karma+Jasmine `*.spec.ts` ou Jest), lint (`ng lint` / `@angular-eslint`) e build (`ng build`) — capturados literalmente.
- Se o app usa NgModules ou a API de components standalone, e as convenções de roteamento e DI.
- Skills adequadas à stack: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Notas

Útil para apps Angular que seguem o layout de projeto da CLI. Confirmar Karma/Jasmine vs Jest a partir da configuração existente.
