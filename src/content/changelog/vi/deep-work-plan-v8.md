---
title: "DWP v8: spec-first, khép kín vòng lặp"
description: "Deep Work Plan v8 kết hợp kế hoạch spec-first, kho mã làm harness, Loop engineering và hiệu quả đo lường; vòng lặp hoàn tất kế hoạch đã duyệt."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: vi
order: 0
featured: true
sourceLabel: "Bản phát hành có thẻ và bản nháp hợp đồng v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 kết hợp phát triển spec-first, kho mã làm harness cho tác nhân, Loop engineering và hiệu quả đo lường. Câu định hướng: “Spec-first, khép kín vòng lặp: kho mã là harness và kế hoạch tự chạy đến khi hoàn tất.”

## Bốn trụ cột

1. **Spec-first:** kế hoạch và đặc tả là nguồn sự thật lâu dài với tiêu chí nghiệm thu, cổng xác thực rõ ràng. 2. **Kho mã là harness:** ngữ cảnh, công cụ, quy tắc và trạng thái tiếp tục cùng mã nguồn. 3. **Loop engineering:** kế hoạch đã duyệt đi theo vòng đời ghi nhận đến khi hoàn tất. 4. **Hiệu quả đo lường:** byte chỉ dẫn mỗi luồng, có đường đo công khai; không suy đoán tỷ lệ token.

## Loop engineering nghĩa là gì

Kế hoạch đăng ký người dẫn dắt và danh sách kế nhiệm theo thứ tự. Con người khởi động daemon Herdr tùy chọn bằng herdr-peers autopilot --loop; lời nhắc yêu cầu tiếp tục nhưng không cấp thêm thẩm quyền. Người kế nhiệm được ghi tên có thể tiếp quản khi người dẫn dắt vắng mặt. Sự kiện gửi tới notifier Dailybot; fleet hiển thị tác nhân và kế hoạch trên máy đã bật. Con người khởi động daemon; Herdr là tùy chọn.

## Bản phát hành mang cơ chế này

Bản gia cố gói v7.11.0 cùng các bản v7.12.x về đăng ký kế hoạch và thông báo cung cấp cơ chế phía kế hoạch. herdr-peers v1.3.x thêm vòng lặp, báo cáo và fleet; v2.0.0 thêm brain protocol 2 và bộ đọc hàng đợi. coding-agents-kit v1.3.0 cung cấp pick-v2, v1.4.0 bổ sung trình cập nhật đã xác minh. Liên kết bản phát hành có thẻ ở trên; addon tùy chọn.

## Hợp đồng v8 — RE-VERIFY AT 8.0.0

Bản nháp origin/feat/v8-line thêm autonomy vào plan-contract/v8: ngân sách đình trệ, pane nhận lời nhắc, đích thông báo, quyền hành động của brain và hành vi hàng đợi. Bản nháp định nghĩa dwp-queue-v1 cho .dwp/queue.json; gói ghi hàng đợi còn Herdr đọc. Cần xác minh lại các tuyên bố tạm thời với hiện vật gắn thẻ 8.0.0 trước khi công bố.
