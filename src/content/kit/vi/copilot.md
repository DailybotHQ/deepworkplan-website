---
title: GitHub Copilot
description: "Adapter DWP cho GitHub Copilot, hỗ trợ một phần qua các quy trình lệnh markdown và tiền tố dấu thăng; một số khâu tự động hóa phải làm thủ công."
kind: adapter
lang: vi
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot adapter

GitHub Copilot hỗ trợ DWP thông qua các quy trình lệnh dạng markdown.

## Mức độ hỗ trợ

**Một phần** — các lệnh cốt lõi hoạt động thông qua các file quy trình; một số khâu tự động hóa phải làm thủ công.

## Cài đặt

Các lệnh DWP tồn tại dưới dạng quy trình markdown trong repository.

## Cách gọi

Dùng tiền tố `#`:

```
#dwp-create <goal>
#dwp-execute
```

## Ghi chú

Copilot đọc các file quy trình nhưng khả năng thực thi tự chủ kém hơn Claude Code.
