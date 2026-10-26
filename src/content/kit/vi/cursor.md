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

**Đầy đủ** (Đã kiểm thử cài đặt) — các lệnh DWP hoạt động thông qua hệ thống quy tắc của Cursor. Các tuyến thư mục được xác minh bởi các bộ kiểm thử tự động; quy trình làm việc hành vi thực thi tuần tự.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng markdown trong dự án. Cursor đọc chúng qua hệ thống rules của mình.

Tùy chọn: [coding-agents-kit](/kit/agentkit) có thể cài đặt CLI này và khởi chạy nó bằng `ak cursor`. Trình cài đặt chính thức của nhà cung cấp cũng hoạt động tốt như vậy.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cursor
```

## Cách gọi

Dùng tiền tố `#` (Cursor chặn `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Hãy dùng `#` vì Cursor giữ riêng `/` cho các lệnh của chính nó.
