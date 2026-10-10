---
title: Claude Code
description: "Adapter DWP cho Claude Code, hỗ trợ đầy đủ qua slash command và skill gốc, bao gồm cả subagent và team agent cho trọn bộ tính năng."
kind: adapter
lang: vi
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code adapter

Claude Code có hỗ trợ DWP **đầy đủ** thông qua các slash command và skill gốc.

## Mức độ hỗ trợ

**Đầy đủ** — cả năm lệnh DWP đều ánh xạ tới các slash command gốc của Claude Code.

## Cài đặt

DWP được phân phối dưới dạng skill nằm trong `.agents/skills/` (được phân giải qua symlink `.claude/`). Claude Code tự động phát hiện chúng.

Tùy chọn: [coding-agents-kit](/kit/agentkit) có thể cài đặt CLI này và khởi chạy nó bằng `ak claude`. Trình cài đặt chính thức của nhà cung cấp cũng hoạt động tốt như vậy.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Cách gọi

Dùng tiền tố `/`:

```
/dwp-create <goal>
/dwp-execute
```

## Ghi chú

Claude Code hỗ trợ skill, subagent và team agent — trọn bộ tính năng của DWP.
