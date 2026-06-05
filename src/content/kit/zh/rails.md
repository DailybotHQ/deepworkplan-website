---
title: Ruby on Rails
description: "面向 Ruby on Rails 应用的接入预设，包含 MVC 结构、数据库迁移、测试框架以及资产与配置流水线的推理提示。"
kind: preset
lang: zh
order: 10
stack: Ruby on Rails
---

# Ruby on Rails 预设

onboard 流程用于 Ruby on Rails 应用的推理指南。它是一份清单，而非模板——检测到的现实优先。

## 信号

- 包含 `rails` 的 `Gemfile`、`bin/rails` 可执行文件，以及 `app/{models,controllers,views}` 的 MVC 目录结构。
- `config/routes.rb`、`db/migrate/` 迁移文件，以及 `db/schema.rb`。
- 测试框架从已存在的文件中推断：RSpec（`spec/`、`.rspec`）或 Minitest（`test/`）。

## 需要推理的内容

- 真实的测试命令（`bin/rails test` 或 `bundle exec rspec`）以及代码检查关卡（`rubocop`）——原样捕获。
- 请求 → 路由 → 控制器 → 模型 → 视图的流转、迁移工作流，以及凭证与配置的存放位置。
- 适合该技术栈的模型、控制器、迁移，以及（如有）Job 与 Mailer 相关技能。

## 备注

捕获是否使用了 Active Job/Sidekiq 与 Hotwire/Turbo，以及加密凭证（`config/credentials`）的管理方式。
