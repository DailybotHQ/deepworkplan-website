---
title: Laravel
description: "Preset onboarding cho dự án Laravel, với gợi ý suy luận về Eloquent model, controller, route, migration, lệnh Artisan và test runner."
kind: preset
lang: vi
order: 11
stack: Laravel (PHP)
---

# Laravel preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Laravel. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `composer.json` có `laravel/framework`, script console `artisan`, và cây thư mục `app/` (`Models`, `Http/Controllers`, `Providers`).
- `routes/web.php` và `routes/api.php`, `database/migrations/`, và các Eloquent model.
- Test runner và công cụ lint/format được suy luận từ `composer.json` và các file cấu hình hiện có.

## Cần suy luận về điều gì

- Lệnh test thực tế (`php artisan test`, `vendor/bin/phpunit`, hoặc `vendor/bin/pest`) và cổng lint/format bất kỳ (Pint, PHP-CS-Fixer, PHPStan/Larastan) — ghi lại nguyên văn.
- Các quy ước routing, controller và Eloquent; quy trình migration; bố cục biến môi trường và config (`.env`, `config/`).
- Các skill phù hợp với stack cho model, controller, migration và lệnh Artisan.

## Ghi chú

Hữu ích cho ứng dụng Laravel theo bố cục dự án chuẩn. Nếu repo sử dụng Sail/Docker, ghi lại liệu các cổng test và lint có chạy bên trong container hay không.
