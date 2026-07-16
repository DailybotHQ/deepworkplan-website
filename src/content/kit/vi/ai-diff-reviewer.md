---
title: AI Diff Reviewer
description: "Tiện ích bổ sung DWP tùy chọn: tăng cường Đánh giá Bảo mật bằng lượt kiểm tra cục bộ AI Diff Reviewer, cổng hợp nhất CI Flow B tùy chọn (v2), tệp mở rộng dùng chung và trợ lý apply-review."
kind: addon
lang: vi
order: 5
---

# Tiện ích bổ sung AI Diff Reviewer

Kết nối quá trình thực thi Deep Work Plan với **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (được liệt kê trên marketplace là **"AI Diff Reviewer"**, phiên bản hiện tại **v2.0.0**) để nhiệm vụ cuối bắt buộc **Đánh giá Bảo mật** có thêm một đánh giá cục bộ có cấu trúc — phán quyết, bảng phát hiện và mức độ nghiêm trọng — và khi chọn Flow B, mọi pull request đều có thể được kiểm soát bởi cùng một đánh giá trên CI. Đây là tiện ích bổ sung **tùy chọn**; không bao giờ bắt buộc để đạt chuẩn AI-first.

Phương pháp luận cốt lõi của Deep Work Plan có **không** phụ thuộc vào AI Diff Reviewer. Kho lưu trữ không có tiện ích bổ sung vẫn hoàn toàn tuân thủ. Chỉ cung cấp tiện ích bổ sung này khi nhà phát triển hoặc nhóm muốn chất lượng đánh giá có cấu trúc; không bao giờ cài đặt tự động cho tất cả mọi người. Luôn hỏi Flow A hay Flow B — không bao giờ đặt mặc định.

## Khi nào sử dụng

| Tín hiệu | Hành động |
|--------|--------|
| Nhóm muốn cổng hợp nhất CI với các phát hiện có cấu trúc | **Đề xuất Flow B** trong quá trình giới thiệu |
| Kho lưu trữ cá nhân hoặc thử nghiệm; đánh giá cục bộ trước khi đẩy là đủ | **Cung cấp Flow A** |
| Không muốn thêm bề mặt đánh giá | **Bỏ qua** — Đánh giá Bảo mật cơ sở vẫn áp dụng |

## Hai luồng áp dụng

| Luồng | Bạn nhận được gì |
|------|----------------|
| **A — chỉ cục bộ** | Skill tích hợp sẵn + `.review/extension.md` bắt buộc (qua `generate-extension`). Tăng cường Đánh giá Bảo mật bằng lượt kiểm tra cục bộ. Không có quy trình GitHub Actions. |
| **B — hai bề mặt** | Flow A cộng thêm `setup` ghi `.github/workflows/pr-review.yml` (Action `@v2`), cùng tệp mở rộng cho cục bộ và CI. Trợ lý `apply-review` tùy chọn sau khi CI đăng phát hiện. |

Việc phát hiện để tăng cường Đánh giá Bảo mật yêu cầu **skill + tệp mở rộng** tại một trong các vị trí: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` hoặc `.github/ai-pr-reviewer/extension.md`. Skill đơn lẻ là chưa đủ.

## Tiện ích bổ sung này kết nối gì (giới hạn theo thiết kế)

Tiện ích bổ sung DWP **không** tái tạo trình đánh giá. Nó ủy quyền cài đặt, phương pháp luận, trình hướng dẫn CI, soạn thảo mở rộng, tạo bản nháp PR và hướng dẫn sau CI cho năm kỹ năng con của skill thượng nguồn (luồng mặc định gốc, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Tăng cường Đánh giá Bảo mật

Khi được phát hiện, `create` / `execute` thêm bước đánh giá cục bộ vào nhiệm vụ Đánh giá Bảo mật bắt buộc. Đầu ra được thêm vào bên dưới `## AI Diff Reviewer local review` trong `analysis_results/SECURITY_REVIEW.md`.

- **Thất bại nhẹ (chỉ gọi):** thiếu skill, thiếu mở rộng hoặc lỗi gọi → cảnh báo một lần và tiếp tục; không bao giờ làm thất bại nhiệm vụ vì điều này.
- **Cổng sau khi lượt kiểm tra hoàn tất:** các phát hiện `critical` vẫn chặn việc hoàn thành Đánh giá Bảo mật cho đến khi được sửa hoặc chấp nhận rõ ràng (hợp đồng SR hiện có). `warning` / `info` được ghi lại nhưng không chặn.
- **Flow A không cần secret CI.** `CURSOR_API_KEY` chưa được đặt không được ức chế lượt kiểm tra cục bộ.

### Cổng CI Flow B (tùy chọn)

Action được ghim `DailybotHQ/ai-diff-reviewer@v2`, thường bị kiểm soát bởi nhãn (`ready`), với công việc **AI review gate** có tên ổn định để bảo vệ nhánh và nhãn bỏ qua tùy chọn `skip-review-label: skip-ai-review`. `prompt.md` dùng chung + mở rộng căn chỉnh phương pháp luận và mức độ nghiêm trọng; trong Đánh giá Nhận thức Lặp lại, các vòng CI thứ 2 trở đi có thể ngắn hơn trong khi lượt kiểm tra cục bộ vẫn đầy đủ.

### Trợ lý `apply-review` tùy chọn

Sau khi CI đăng đánh giá, nhà phát triển có thể gọi `apply-review` trong `execute` để xem xét từng phát hiện (áp dụng / trì hoãn / bỏ qua) với sự đồng ý. Chỉ đọc theo mặc định; không bao giờ là tệp nhiệm vụ kế hoạch (sẽ phá vỡ thứ tự nhiệm vụ cuối bắt buộc).

## Hành vi

- **Hỏi luồng; không bao giờ đoán.** Cài đặt quy trình không được yêu cầu có dấu ấn lớn hơn so với ở lại Flow A.
- **Hòa giải, không ghi đè.** Skill, mở rộng hoặc `pr-review.yml` hiện có được bảo toàn; chỉ lấp đầy khoảng trống.
- **Xác thực được trì hoãn.** Secret của nhà cung cấp cho CI được cấu hình bởi người bảo trì; tiện ích bổ sung này không bao giờ lưu thông tin đăng nhập.
- **Trung lập với nhà cung cấp.** Từ chối vẫn để lại kho lưu trữ hoàn toàn AI-first.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Skill thượng nguồn: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Trang spec: [Add-ons](/spec/addons).
