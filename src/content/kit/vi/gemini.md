---
title: Google Gemini
description: "Adapter DWP cho Google Gemini, với hỗ trợ đầy đủ qua các quy trình lệnh markdown và tiền tố dấu thăng điều khiển toàn bộ vòng lặp Deep Work Plan."
kind: adapter
lang: vi
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Google Gemini adapter

Gemini hỗ trợ DWP thông qua các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Đầy đủ** (Đã kiểm thử cài đặt) — mọi lệnh dwp-* đều chạy từ tệp quy trình của nó. Tuyến đường được xác nhận bởi các bộ kiểm thử tự động; quy trình làm việc hành vi chạy trên đường cơ sở tuần tự. Yêu cầu thực thi công cụ và quyền truy cập tệp trong không gian làm việc.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc khi được gọi.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Gemini đọc các file quy trình và thực thi toàn bộ vòng lặp Deep Work Plan tuần tự.
