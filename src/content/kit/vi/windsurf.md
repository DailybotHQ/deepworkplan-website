---
title: Windsurf
description: "Adapter DWP cho Windsurf, với hỗ trợ đầy đủ qua hệ thống quy tắc và các quy trình lệnh markdown được gọi bằng tiền tố dấu thăng với xác minh đầy đủ."
kind: adapter
lang: vi
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf adapter

Windsurf hỗ trợ DWP thông qua hệ thống quy tắc và các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Đầy đủ** (Đã kiểm thử cài đặt) — Windsurf đọc các quy tắc của dự án và chạy mọi lệnh dwp-* từ tệp quy trình của nó. Tuyến đường được xác nhận bởi các bộ kiểm thử tự động.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc qua hệ thống quy tắc của Windsurf.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Windsurf đọc các file quy trình và thực thi toàn bộ vòng lặp Deep Work Plan tuần tự.
