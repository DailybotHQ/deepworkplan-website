---
title: NestJS
description: "面向 NestJS 应用的接入预设，包含模块、控制器、提供者、DTO、装饰器模型与测试运行器的推理提示。"
kind: preset
lang: zh
order: 8
stack: NestJS
---

# NestJS 预设

onboard 流程用于 NestJS 应用的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- `nest-cli.json`、`package.json` 中的 `@nestjs/*` 包，以及调用 `NestFactory.create` 的 `main.ts`。
- 装饰器模型：`@Module`、`@Controller`、`@Injectable`，以及包含模块、控制器、服务与 DTO 的功能目录。
- 包管理器从锁文件（`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json`）中推断。

## 需要推理的内容

- 真实的测试命令（Jest 单元测试 `*.spec.ts` 与端对端测试 `*.e2e-spec.ts`）、代码检查关卡（`eslint`）以及构建脚本——原样捕获。
- 模块边界、依赖注入、提供者、守卫/管道/拦截器，以及配置的存放位置（`@nestjs/config`）。
- 适合该技术栈的模块、控制器、提供者与 DTO 相关技能。

## 备注

捕获功能模块如何接入根模块，以及应用是否使用 TypeORM/Prisma、微服务或 GraphQL。
