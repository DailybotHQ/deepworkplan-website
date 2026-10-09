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
7. Cài đặt đánh giá cục bộ AI Diff Reviewer bắt buộc, đề nghị các addon tùy chọn, rồi tự kiểm tra.

## Ghi chú

Một repository hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào; đánh giá cục bộ AI Diff Reviewer là một phần của chuẩn cơ sở kể từ chuẩn 2.3.0. Thực tế phát hiện được luôn thắng các giả định của preset.

## Tham chiếu schema v7

Danh mục schema máy đọc được cho kế hoạch v7 — mặc định của gói 7.x hiện tại — được công bố tại các URL ổn định sau. Projection trực tiếp là snapshot dùng chung với v6; không có `plan-state/v6.json` hay `plan-state/v7.json`.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v7.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v7.json (hợp đồng v6 cộng thêm dấu đánh tác vụ `parallel_safe` tùy chọn)
- **Journal event:** https://deepworkplan.com/schema/journal-event/v7.json (bổ sung sự kiện `delegation`)
- **Plan snapshot (projection trực tiếp, dùng chung với v6):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Context manifest (dùng chung với v6):** https://deepworkplan.com/schema/context-manifest/v6.json

Kế hoạch v6 giữ các schema v6 của nó ([manifest](https://deepworkplan.com/schema/plan-manifest/v6.json), [hợp đồng](https://deepworkplan.com/schema/plan-contract/v6.json), [sự kiện nhật ký](https://deepworkplan.com/schema/journal-event/v6.json)); kế hoạch v5 hiện có tiếp tục dùng schema trạng thái v5 và kế hoạch cũ không bao giờ bị viết lại âm thầm.

Gói 7.x hiện tại mặc định tạo kế hoạch mới bằng v7. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận; di chuyển cần yêu cầu rõ ràng. Các kế hoạch mới nhận ID số tăng đơn điệu, có ít nhất ba chữ số (ví dụ `PLAN_001_add_payment_webhooks/`). Schema v5 đã cố định tính ID số là một từ, nên slug v5 có 2–4 từ; slug v7 có 2–5 từ. Các thư mục cũ không đánh số `PLAN_<slug>/` vẫn đọc được và không bao giờ bị đổi tên. Khi có kế hoạch được đánh số, `latest` trỏ đến kế hoạch có ID số cao nhất.
