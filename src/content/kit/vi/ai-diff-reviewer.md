---
title: AI Diff Reviewer
description: "Đánh giá cục bộ bắt buộc trong mọi Final Review của DWP kể từ chuẩn 2.3.0, do onboarding cài đặt; cổng CI Flow B (v2), extension dùng chung và trợ lý apply-review vẫn tùy chọn."
kind: addon
lang: vi
order: 5
---

# Tiện ích bổ sung AI Diff Reviewer

Kết nối quá trình thực thi Deep Work Plan với **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (được liệt kê trên marketplace là **"AI Diff Reviewer"**, phiên bản hiện tại **v2.0.1**) để bước rà soát bảo mật của **Final Review** bắt buộc chạy một đánh giá cục bộ có cấu trúc — phán quyết, bảng phát hiện và mức độ nghiêm trọng — và khi chọn Flow B, mọi pull request đều có thể được kiểm soát bởi cùng một đánh giá trên CI. Kể từ chuẩn 2.3.0, **đánh giá cục bộ là một phần của chuẩn cơ sở**: onboarding cài đặt nó và mọi Final Review chạy nó. Chỉ bề mặt CI là tùy chọn.

Điều giữ sự trung lập với nhà cung cấp là ranh giới quan trọng: reviewer là một skill MIT được ghim theo tag, chạy bởi **chính** agent lập trình của bạn — không luồng Deep Work Plan nào yêu cầu một dịch vụ thương mại, nhà cung cấp CI hay secret. Flow A (chỉ cục bộ) là chuẩn cơ sở mà mọi repository đã onboarding đều nhận được; Flow B (CI Action) được đề xuất rõ ràng và không bao giờ được cài khi chưa được yêu cầu. Một nhà phát triển có thể từ chối đánh giá cục bộ; lời từ chối được ghi lại như một ngoại lệ được khai báo và `verify` báo cáo repository là không tuân thủ ở điểm đó cho đến khi nó được cài đặt.

## Khi nào sử dụng

| Tín hiệu | Hành động |
|--------|--------|
| Mọi repository đã onboarding | **Flow A được cài đặt** trong Giai đoạn 7a của onboarding (skill vendored + `.review/extension.md`); một nâng cấp harness có mục tiêu thêm nó vào các repository được onboarding sớm hơn |
| Nhóm muốn cổng hợp nhất CI với các phát hiện có cấu trúc | **Đề xuất Flow B** — opt-in rõ ràng, không bao giờ là mặc định |
| Kho lưu trữ cá nhân hoặc thử nghiệm; đánh giá cục bộ là đủ | **Ở lại Flow A** — chuẩn cơ sở đã hoàn chỉnh |

## Hai luồng áp dụng

| Luồng | Bạn nhận được gì |
|------|----------------|
| **A — chỉ cục bộ (chuẩn cơ sở)** | Skill tích hợp sẵn + `.review/extension.md` bắt buộc (qua `generate-extension`). Chạy đánh giá cục bộ bên trong bước rà soát bảo mật của mọi Final Review. Không có quy trình GitHub Actions. |
| **B — hai bề mặt** | Flow A cộng thêm `setup` ghi `.github/workflows/pr-review.yml` (Action `@v2`), cùng tệp mở rộng cho cục bộ và CI. Trợ lý `apply-review` tùy chọn sau khi CI đăng phát hiện. |

Việc phát hiện cho đánh giá cục bộ yêu cầu **skill + tệp mở rộng** tại một trong các vị trí: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` hoặc `.github/ai-pr-reviewer/extension.md`. Skill đơn lẻ là chưa đủ.

## Tiện ích bổ sung này kết nối gì (giới hạn theo thiết kế)

Tiện ích bổ sung DWP **không** tái tạo trình đánh giá. Nó ủy quyền cài đặt, phương pháp luận, trình hướng dẫn CI, soạn thảo mở rộng, tạo bản nháp PR và hướng dẫn sau CI cho năm kỹ năng con của skill thượng nguồn (luồng mặc định gốc, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Đánh giá cục bộ bắt buộc

`create` thêm bước đánh giá cục bộ vào bước rà soát bảo mật của mọi Final Review và `execute` chạy nó. Đầu ra được thêm vào bên dưới `## AI Diff Reviewer local review` trong `analysis_results/SECURITY_REVIEW.md` nội bộ của plan (bên trong thư mục riêng của plan, không bao giờ ở thư mục gốc của repo).

- **Reviewer bị thiếu — được ghi lại, không bao giờ bị bỏ qua âm thầm:** một skill hoặc tệp mở rộng bị thiếu trở thành một phát hiện `local reviewer not installed`; Final Review chạy lượt rà soát cục bộ khi skill hiện diện, nếu không thì mang phát hiện đó vào báo cáo hoàn tất — việc cài đặt thuộc về sự chấp thuận của onboarding hoặc một lời gọi addon rõ ràng, không bao giờ là một bootstrap bất ngờ.
- **Thất bại nhẹ (chỉ gọi):** một đánh giá có thể khởi động nhưng gặp lỗi → cảnh báo một lần, ghi lại, tiếp tục; không bao giờ làm thất bại tác vụ vì điều này.
- **Cổng sau khi lượt kiểm tra hoàn tất:** các phát hiện `critical` vẫn chặn việc hoàn thành Final Review cho đến khi được sửa hoặc chấp nhận rõ ràng. `warning` / `info` được ghi lại nhưng không chặn.
- **Flow A không cần secret CI.** `CURSOR_API_KEY` chưa được đặt không được ức chế lượt kiểm tra cục bộ.

### Cổng CI Flow B (tùy chọn)

Action `DailybotHQ/ai-diff-reviewer@v2`, thường bị kiểm soát bởi nhãn (`ready`), với công việc **AI review gate** có tên ổn định để bảo vệ nhánh và nhãn bỏ qua tùy chọn `skip-review-label: skip-ai-review`. `prompt.md` dùng chung + mở rộng căn chỉnh phương pháp luận và mức độ nghiêm trọng; trong Đánh giá Nhận thức Lặp lại, các vòng CI thứ 2 trở đi có thể ngắn hơn trong khi lượt kiểm tra cục bộ vẫn đầy đủ.

### Trợ lý `apply-review` tùy chọn

Sau khi CI đăng đánh giá, nhà phát triển có thể gọi `apply-review` trong `execute` để xem xét từng phát hiện (áp dụng / trì hoãn / bỏ qua) với sự đồng ý. Chỉ đọc theo mặc định; không bao giờ là tệp nhiệm vụ kế hoạch (sẽ phá vỡ thứ tự nhiệm vụ cuối bắt buộc).

## Hành vi

- **Flow A là chuẩn cơ sở; Flow B được hỏi, không bao giờ đoán.** Cài đặt quy trình không được yêu cầu có dấu ấn lớn hơn so với ở lại Flow A.
- **Hòa giải, không ghi đè.** Skill, mở rộng hoặc `pr-review.yml` hiện có được bảo toàn; chỉ lấp đầy khoảng trống.
- **Xác thực được trì hoãn.** Secret của nhà cung cấp cho CI được cấu hình bởi người bảo trì; tiện ích bổ sung này không bao giờ lưu thông tin đăng nhập.
- **Trung lập với nhà cung cấp.** Không bao giờ yêu cầu dịch vụ thương mại, nhà cung cấp CI hay secret; bề mặt CI là mảnh duy nhất chạm tới một nhà cung cấp.

## Ghi chú

Đánh giá cục bộ bắt buộc kể từ chuẩn 2.3.0; bề mặt CI tùy chọn. Skill thượng nguồn: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Trang spec: [Add-ons](/spec/addons).
