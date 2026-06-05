---
title: Laravel
description: "面向 Laravel 项目的接入预设，包含 Eloquent 模型、控制器、路由、数据库迁移、Artisan 命令与测试运行器的推理提示。"
kind: preset
lang: zh
order: 11
stack: Laravel (PHP)
---

# Laravel 预设

onboard 流程用于 Laravel 项目的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 包含 `laravel/framework` 的 `composer.json`、`artisan` 控制台脚本，以及 `app/` 目录树（`Models`、`Http/Controllers`、`Providers`）。
- `routes/web.php` 与 `routes/api.php`、`database/migrations/`，以及 Eloquent 模型。
- 测试运行器与代码检查工具从已存在的 `composer.json` 与配置文件中推断。

## 需要推理的内容

- 真实的测试命令（`php artisan test`、`vendor/bin/phpunit` 或 `vendor/bin/pest`），以及任何代码检查与格式化关卡（Pint、PHP-CS-Fixer、PHPStan/Larastan）——原样捕获。
- 路由、控制器与 Eloquent 约定；迁移工作流；环境与配置结构（`.env`、`config/`）。
- 适合该技术栈的模型、控制器、迁移与 Artisan 命令相关技能。

## 备注

适用于遵循标准项目结构的 Laravel 应用。如果仓库使用 Sail/Docker，则需捕获测试与代码检查关卡是否在容器内运行。
