---
title: Cline
description: "Adapter DWP cho Cline, agent mã nguồn mở, với hỗ trợ đầy đủ qua các quy tắc markdown và quy trình lệnh được gọi bằng tiền tố dấu thăng."
kind: adapter
lang: vi
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline adapter

Cline, agent lập trình mã nguồn mở, hỗ trợ DWP thông qua các quy tắc markdown và quy trình lệnh.

## Mức độ hỗ trợ

**Đầy đủ** — Cline đọc các quy tắc markdown và chạy mọi lệnh dwp-* từ file quy trình của nó.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc qua các quy tắc của Cline.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Cline đọc các file quy trình và thực thi toàn bộ vòng lặp Deep Work Plan tuần tự.
