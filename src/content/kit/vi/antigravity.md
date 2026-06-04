---
title: Antigravity
description: "Adapter DWP cho Antigravity, với hỗ trợ một phần qua các quy trình lệnh markdown và tiền tố dấu thăng dùng để điều khiển luồng làm việc tuần tự."
kind: adapter
lang: vi
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Antigravity adapter

Antigravity hỗ trợ DWP thông qua các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Một phần** — các lệnh cốt lõi hoạt động thông qua các file quy trình.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc khi được gọi.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Antigravity đọc các file quy trình và thực thi luồng làm việc tuần tự của DWP.
