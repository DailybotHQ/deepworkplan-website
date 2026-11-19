---
title: "DWP v8: spec-first, khép kín vòng lặp"
description: "Deep Work Plan v8 kết hợp kế hoạch spec-first, kho mã làm harness, Loop engineering và hiệu quả đo lường; vòng lặp hoàn tất kế hoạch đã duyệt."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: vi
order: 0
featured: true
sourceLabel: "Bản phát hành skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Bản phát hành skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Bản phát hành skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Bản phát hành skill v8.0.6"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.6"
  - label: "LOOP_ENGINEERING.md (chuẩn tắc, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering trong trình đọc đặc tả"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Lược đồ plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Lược đồ journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Lược đồ plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Bộ ghi hàng đợi kế hoạch (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Bản phát hành skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Bản phát hành skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Bản phát hành skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.2"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.2"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 kết hợp bốn ý tưởng: phát triển spec-first, kho mã là harness của tác nhân, Loop engineering và hiệu quả được đo lường. Câu định hướng là: “Spec-first, loop-closed: kho mã là harness và kế hoạch tự chạy đến khi hoàn tất.”

## Bốn trụ cột

1. **Spec-first.** Kế hoạch và đặc tả là nguồn sự thật bền vững, với tiêu chí chấp nhận và cổng xác thực rõ ràng.
2. **Kho mã là harness.** Ngữ cảnh, công cụ, quy tắc điều khiển và trạng thái có thể tiếp tục nằm cùng mã để các tác nhân khác nhau làm việc trên cùng kho mã.
3. **Loop engineering.** Kế hoạch đã được phê duyệt có thể đi theo vòng đời đã ghi nhận cho đến khi hoàn tất.
4. **Hiệu quả được đo lường.** Hiệu quả được báo cáo bằng byte chỉ dẫn trên mỗi luồng, kèm đường dẫn đo lường công khai; không suy ra phần trăm token.

## Loop engineering nghĩa là gì

Kế hoạch đăng ký người dẫn dắt và danh sách kế nhiệm theo thứ tự. Một người khởi chạy daemon Herdr tùy chọn bằng `herdr-peers autopilot --loop`; lời nhắc yêu cầu người dẫn dắt tiếp tục mà không cấp thêm quyền. Nếu người dẫn dắt không còn, vòng lặp có thể yêu cầu người kế nhiệm đã liệt kê tiếp quản. Sự kiện kế hoạch có thể gửi đến bộ thông báo Dailybot của gói, còn chế độ xem fleet hiển thị tác nhân và kế hoạch trên các máy đã bật. Người dùng vẫn chịu trách nhiệm khởi chạy daemon; addon Herdr là tùy chọn.

## Các bản phát hành mang đến cơ chế

Các cải tiến độ bền vững của gói v7.11.0 và các bản v7.12.x về đăng ký kế hoạch, thông báo cung cấp cơ chế phía kế hoạch. herdr-peers v1.3.x bổ sung vòng lặp, báo cáo và chế độ xem fleet; v2.0.0 bổ sung brain protocol 2 và bộ tiêu thụ hàng đợi. coding-agents-kit v1.3.0 cung cấp hợp đồng khởi chạy pick-v2, còn v1.4.0 bổ sung trình cập nhật đã xác minh. herdr-peers v2.1.0 đọc blocker có cấu trúc của v8; coding-agents-kit v1.5.0 bổ sung đo token chỉ khi giá trị được báo cáo. Bộ mô tả addon của gói 8.0.0 ghim herdr-peers v2.1.0, coding-agents-kit v1.5.0 và devcontainer-kit v1.3.0. Các bản phát hành có tag được liên kết phía trên. Gói vẫn hoạt động khi không có các addon tùy chọn này.

## Hợp đồng v8

Bản phát hành 8.0.0 triển khai tiêu chuẩn DWP 8.0.0. Kế hoạch mới được tạo theo `plan-contract/v8`; kế hoạch v7, v6 và v5 giữ nguyên thế hệ đã ghi và chỉ chuyển đổi bằng thao tác `refine migrate` rõ ràng. Kế hoạch v8 tiếp tục dùng dòng `plan-manifest/v7`, còn `journal-event/v7` vẫn được hỗ trợ cho kế hoạch hiện có. Nguồn chuẩn tắc là `LOOP_ENGINEERING.md`, cùng ba lược đồ đã công bố.

- **Khối `autonomy`.** Khối tùy chọn, đóng trong `plan-contract/v8`, ghi lại quyền của vòng lặp: `stall_budget` (1–10, mặc định 3), pane `promptable` (mặc định chỉ người dẫn dắt), đích `notify` (mặc định không có), `brain` (mặc định `false`) và `queue` (`prompt-lead`, `launch` hoặc `none`, mặc định `none`). Nếu không có khối này, mọi giá trị mặc định được áp dụng và con người vẫn là người giải quyết.
- **Blocker có cấu trúc.** Blocker là sự kiện `blocker` trong `journal-event/v8`, chỉ được tạo và giải quyết qua helper ledger, gồm tác vụ, lý do, một dòng `needs`, lớp bắt buộc C1–C7 và resolver tùy chọn. `resolver: lead` bị từ chối với C1, C2, C5 và C6; vòng lặp chỉ yêu cầu người dẫn dắt giải quyết blocker mà chính kế hoạch đánh dấu `resolver: lead`. `state.json` trở thành `plan-snapshot/v8`, có blocker đang hoạt động và trạng thái `blocked` được suy ra; `PROGRESS.md` mở đầu bằng header bốn dòng: mục tiêu, tác vụ hiện tại, hành động tiếp theo và nhu cầu.
- **Hàng đợi kế hoạch.** Chỉ `shared/queue.py` của gói hoặc con người được ghi `.dwp/queue.json` (`dwp-queue-v1`); khi được phê duyệt, `create` thêm kế hoạch và daemon Herdr chỉ đọc hàng đợi. Hàng đợi chứa tối đa 64 kế hoạch, chạy từng kế hoạch một cho mỗi kho mã trừ khi kế hoạch đặt `parallel: true`. Hàng đợi hỏng không làm gián đoạn vòng đời.

Bản phát hành v7 cuối cùng là **7.12.2**.

Bản phát hành skill đã cài đặt: **8.0.6**.
