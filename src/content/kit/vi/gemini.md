---
title: Google Gemini
description: "Adapter DWP cho Google Gemini, với hỗ trợ một phần qua các quy trình lệnh markdown và tiền tố dấu thăng dùng để điều khiển luồng làm việc tuần tự."
kind: adapter
lang: vi
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Google Gemini adapter

Google Gemini hỗ trợ DWP thông qua các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Một phần** — các lệnh cốt lõi hoạt động thông qua các file quy trình.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Gemini đọc các file quy trình và thực thi luồng làm việc tuần tự của DWP.
