---
title: "DWP v6: cùng phương pháp, hợp đồng chặt chẽ hơn"
description: "Deep Work Plan v6 giữ nguyên phương pháp v5 và bổ sung cấu trúc thực thi chặt chẽ hơn. Tính không kém hơn của kết quả agent chưa được đo lường."
date: 2026-09-28
version: "v6 · Cấu trúc chặt chẽ hơn"
kind: release
lang: vi
order: 0
featured: true
sourceLabel: "Bộ schema v6 đã công bố"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 giữ nguyên phương pháp v5, bề mặt lệnh và vị trí `.dwp/plans/`. Phiên bản này bổ sung cấu trúc chặt chẽ hơn để biểu diễn quyền hạn của kế hoạch, bằng chứng thực thi, ngữ cảnh tác vụ, lịch chạy và trạng thái trực tiếp.

Bộ schema v6 định nghĩa manifest nhận dạng, hợp đồng kết quả và quyền hạn, sự kiện nhật ký chỉ ghi thêm, manifest ngữ cảnh theo tác vụ và snapshot trực tiếp. Projection trực tiếp v6 là snapshot, vì vậy `plan-state/v5.json` vẫn là schema trạng thái cho kế hoạch v5; không có `plan-state/v6.json`. Kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận và không bị viết lại âm thầm.

Quyết định kiến trúc là GO: v6 giữ nguyên phương pháp với cấu trúc kỹ thuật chặt chẽ hơn. Đây không phải tuyên bố ưu thế thực nghiệm. Tính không kém hơn của kết quả agent chưa được đo lường.

Các kế hoạch mới nhận ID số tăng đơn điệu, có ít nhất ba chữ số (ví dụ `PLAN_001_add_payment_webhooks/`). Schema v5 đã cố định tính ID số là một từ, nên slug v5 có 2–4 từ; slug v6 có 2–5 từ. Các thư mục cũ không đánh số `PLAN_<slug>/` vẫn đọc được và không bao giờ bị đổi tên. Khi có kế hoạch được đánh số, `latest` trỏ đến kế hoạch có ID số cao nhất.

Phiên bản skill đã cài: **6.0.1**. Gói 6.x mặc định tạo kế hoạch mới bằng v6. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận; việc di chuyển cần yêu cầu rõ ràng và xem trước.
