---
title: GitHub Copilot
description: "Adapter DWP cho GitHub Copilot, với hỗ trợ đầy đủ qua AGENTS.md và các quy trình lệnh markdown được gọi bằng tiền tố dấu thăng với xác minh đầy đủ."
kind: adapter
lang: vi
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot adapter

Copilot hỗ trợ DWP thông qua AGENTS.md và các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Đầy đủ** (Đã kiểm thử cài đặt) — Copilot đọc AGENTS.md và các tệp quy trình dwp-*, đồng thời chạy mọi lệnh từ đó. Tuyến đường được xác nhận bởi các bộ kiểm thử tự động.

## Cài đặt

DWP cung cấp AGENTS.md và các quy trình lệnh trong repository; Copilot đọc chúng như ngữ cảnh repository.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Copilot đọc các file quy trình và thực thi toàn bộ vòng lặp Deep Work Plan tuần tự.
