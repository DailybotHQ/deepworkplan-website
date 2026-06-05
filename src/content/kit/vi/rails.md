---
title: Ruby on Rails
description: "Preset onboarding cho ứng dụng Ruby on Rails, với gợi ý suy luận về bố cục MVC, migration, framework test và pipeline asset/config."
kind: preset
lang: vi
order: 10
stack: Ruby on Rails
---

# Ruby on Rails preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho ứng dụng Ruby on Rails. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- Một `Gemfile` có `rails`, file thực thi `bin/rails`, và bố cục MVC `app/{models,controllers,views}`.
- `config/routes.rb`, các migration `db/migrate/`, và `db/schema.rb`.
- Framework test được suy luận từ những gì hiện có: RSpec (`spec/`, `.rspec`) hoặc Minitest (`test/`).

## Cần suy luận về điều gì

- Lệnh test thực tế (`bin/rails test` hoặc `bundle exec rspec`) và cổng lint (`rubocop`) — ghi lại nguyên văn.
- Luồng request → route → controller → model → view, quy trình migration, và nơi lưu trữ credential và config.
- Các skill phù hợp với stack cho model, controller, migration, và (nếu có) job và mailer.

## Ghi chú

Ghi lại liệu Active Job/Sidekiq và Hotwire/Turbo có được sử dụng hay không, và cách quản lý encrypted credential (`config/credentials`).
