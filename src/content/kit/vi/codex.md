---
title: OpenAI Codex
description: "Adapter DWP cho OpenAI Codex, với hỗ trợ đầy đủ qua các quy trình lệnh markdown và tiền tố dấu thăng điều khiển toàn bộ vòng lặp Deep Work Plan."
kind: adapter
lang: vi
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# OpenAI Codex adapter

Codex hỗ trợ DWP thông qua các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Đầy đủ** — mọi lệnh dwp-* đều chạy từ file quy trình của nó.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown mà agent đọc khi được gọi; quy tắc được cài dưới `.codex/`.

Tùy chọn: [coding-agents-kit](/kit/agentkit) có thể cài đặt CLI này và khởi chạy nó bằng `ak codex`. Trình cài đặt chính thức của nhà cung cấp cũng hoạt động tốt như vậy.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Codex đọc các file quy trình và thực thi toàn bộ vòng lặp Deep Work Plan tuần tự.
