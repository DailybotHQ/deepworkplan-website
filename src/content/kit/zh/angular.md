---
title: Angular
description: "面向 Angular 项目的接入预设，包含组件、模块或独立 API、服务、RxJS 与测试运行器的推理提示。"
kind: preset
lang: zh
order: 15
stack: Angular
---

# Angular 预设

onboard 流程用于 Angular 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `angular.json` 与依赖项中的 `@angular/core`；`src/app/` 下包含 `@Component`/`@NgModule` 或独立组件。
- 带有 `@Injectable` 的服务、RxJS Observable，以及依赖注入。
- 包管理器从已存在的锁文件中推断。

## 需要推理的内容

- 真实的测试（`ng test` / Karma+Jasmine 的 `*.spec.ts` 或 Jest）、代码检查（`ng lint` / `@angular-eslint`）与构建（`ng build`）命令——原样捕获。
- 应用使用的是 NgModule 还是独立组件 API，以及路由与依赖注入约定。
- 适合该技术栈的技能：`component`、`service`、`module`/`standalone`、`guard`/`resolver`。

## 备注

适用于遵循 CLI 项目结构的 Angular 应用。从已存在的配置文件中确认使用的是 Karma/Jasmine 还是 Jest。
