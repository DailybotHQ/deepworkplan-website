---
title: deepworkplan-onboard
description: "Biến một repository thành AI-first bằng cách suy luận về stack và archetype của nó, rồi sinh ra AGENTS.md, docs/, .agents/ và một .dwp/ được gitignore phù hợp."
kind: command
lang: vi
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Biến một repository thành codebase AI-first, hướng spec. Đây là sub-skill onboard của skill Deep Work Plan.

## Tác dụng

`deepworkplan-onboard` khảo sát repository **thực** — ngôn ngữ, framework, trình quản lý gói, các lệnh build/test/lint, module, quy ước test, hình thức triển khai — và sinh ra các artifact phù hợp với nó. Nó suy luận; nó không bao giờ sao chép khuôn mẫu hay để lại chỗ trống.

## Cách dùng

```
/deepworkplan-onboard
```

## Hành vi

1. Trinh sát — phát hiện stack thực và các lệnh kiểm chứng; khớp với preset onboarding gần nhất.
2. Archetype — phân loại là repo độc lập hay orchestrator hub.
3. Sinh ra `AGENTS.md` + symlink `CLAUDE.md` với một khối Quick Commands thật.
4. Sinh ra `docs/` (kiến trúc, tiêu chuẩn, kiểm thử, bảo mật, và nhiều hơn) cùng tài liệu cho từng module.
5. Sinh ra `.agents/` (các agent, các lệnh `dwp-*` gọn nhẹ, các skill phù hợp với stack, catalog) + `.claude → .agents`.
6. Cài đặt skill và dựng khung một `.dwp/` được gitignore (kế hoạch, bản nháp) cùng một không gian nháp `tmp/`.
7. Đề nghị các addon tùy chọn, rồi tự kiểm tra.

## Ghi chú

Một repository hoàn toàn tuân thủ ngay cả khi không có addon nào. Thực tế phát hiện được luôn thắng các giả định của preset.
