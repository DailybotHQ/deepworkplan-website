---
title: GitHub Copilot
description: "Adapter DWP cho GitHub Copilot, với hỗ trợ đầy đủ qua AGENTS.md và các quy trình lệnh markdown được gọi bằng tiền tố dấu thăng."
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

**Đầy đủ** — Copilot đọc AGENTS.md và các file quy trình dwp-*, và chạy mọi lệnh từ chúng.

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
