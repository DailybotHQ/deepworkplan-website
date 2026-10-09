---
title: OpenCode
description: "Adapter DWP cho OpenCode, agent mã nguồn mở, với hỗ trợ đầy đủ qua AGENTS.md bản địa và các quy trình lệnh markdown được gọi bằng tiền tố dấu thăng."
kind: adapter
lang: vi
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode adapter

OpenCode, agent lập trình mã nguồn mở, hỗ trợ DWP thông qua AGENTS.md bản địa và các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Đầy đủ** — OpenCode đọc AGENTS.md bản địa và chạy mọi lệnh dwp-* từ file quy trình của nó.

## Cài đặt

DWP cung cấp AGENTS.md và các quy trình lệnh trong repository; OpenCode phát hiện chúng như ngữ cảnh dự án.

Tùy chọn: [coding-agents-kit](/kit/agentkit) có thể cài đặt CLI này và khởi chạy nó bằng `ak opencode`. Trình cài đặt chính thức của nhà cung cấp cũng hoạt động tốt như vậy.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

OpenCode đọc các file quy trình và thực thi toàn bộ vòng lặp Deep Work Plan tuần tự.
