---
title: OpenAI Codex
description: "Adapter DWP cho OpenAI Codex, hỗ trợ một phần qua các quy trình lệnh markdown và tiền tố dấu thăng; các tính năng team agent chưa khả dụng."
kind: adapter
lang: vi
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex adapter

OpenAI Codex hỗ trợ DWP thông qua các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Một phần** — các lệnh cốt lõi hoạt động; các tính năng nâng cao (team agent) chưa khả dụng.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc khi được gọi.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Các tính năng team agent chỉ dành cho Claude; Codex hỗ trợ luồng làm việc tuần tự.
