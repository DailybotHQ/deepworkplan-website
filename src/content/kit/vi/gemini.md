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

**Đầy đủ** — mọi lệnh dwp-* đều chạy từ file quy trình của nó. Yêu cầu Gemini 2.5 Pro trở lên để dùng WebFetch bản địa.

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
