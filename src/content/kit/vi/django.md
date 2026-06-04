---
title: Django
description: "Preset onboarding cho các dự án Django, với gợi ý suy luận về app, migration, settings, lệnh quản trị và trình chạy test."
kind: preset
lang: vi
order: 1
stack: Django
---

# Django preset

Một hướng dẫn suy luận mà luồng onboard sử dụng cho các dự án Django. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu

- `manage.py` và `settings.py`; các app với `models.py`, `views.py`, `migrations/`.
- Trình quản lý gói và trình chạy test được suy ra từ manifest và lockfile đang tồn tại.

## Cần suy luận về điều gì

- Lệnh test thực (thường là `python manage.py test` hoặc `pytest`) và mọi gate lint/kiểm tra kiểu — ghi lại nguyên văn.
- Các quy ước về app và migration, cách bố trí settings và môi trường, cùng các mẫu lệnh quản trị.
- Các skill phù hợp với stack cho app, model, view và migration.

## Ghi chú

Hữu ích cho các app Django tuân theo cách bố trí dự án tiêu chuẩn.
