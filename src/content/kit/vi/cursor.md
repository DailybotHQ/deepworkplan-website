---
title: Cursor
description: "Adapter DWP cho Cursor AI, hỗ trợ đầy đủ qua hệ thống project rules và tiền tố lệnh dấu thăng, vì Cursor đã giữ riêng dấu gạch chéo cho mình."
kind: adapter
lang: vi
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor adapter

Cursor hỗ trợ DWP thông qua project rules và các file lệnh.

## Mức độ hỗ trợ

**Đầy đủ** — các lệnh DWP hoạt động thông qua hệ thống rules của Cursor.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng markdown trong dự án. Cursor đọc chúng qua hệ thống rules của mình.

## Cách gọi

Dùng tiền tố `#` (Cursor chặn `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Hãy dùng `#` vì Cursor giữ riêng `/` cho các lệnh của chính nó.
