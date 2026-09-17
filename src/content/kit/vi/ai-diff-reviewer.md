---
title: AI Diff Reviewer
description: "Đánh giá cục bộ bắt buộc trong mọi Final Review của DWP kể từ chuẩn 2.3.0, do onboarding cài đặt; cổng CI Flow B và trợ lý apply-review vẫn tùy chọn."
kind: addon
lang: vi
order: 5
---

# Tiện ích bổ sung AI Diff Reviewer

Mọi Deep Work Plan đều khép lại theo cùng một cách: một **Final Review** bắt buộc, đọc toàn bộ tập thay đổi mà kế hoạch đã tích lũy trước khi công việc được coi là xong. Bước rà soát bảo mật bên trong nó là điểm cuối cùng còn có thể phát hiện ra điều gì đó. Nếu không có trợ giúp, người đọc duy nhất ở thời điểm ấy chính là agent đã viết đoạn mã đó.

Tiện ích này đặt thêm một người đọc thứ hai lên bản diff ấy. Nó nối **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — được liệt kê trên marketplace là "AI Diff Reviewer", hiện ở **v2.3.1** — vào bước rà soát bảo mật, nơi nó trả về thứ có cấu trúc thay vì văn xuôi: một phán quyết, một bảng phát hiện, và mức độ nghiêm trọng cho từng phát hiện. Một phát hiện `critical` chặn việc hoàn tất cho tới khi được sửa hoặc được chấp nhận một cách tường minh. Bản đánh giá này là một cánh cổng, không phải một lời bình.

Kể từ chuẩn 2.3.0, bản đánh giá cục bộ đó **là một phần của chuẩn cơ sở, không phải thứ thêm vào**. Onboarding cài đặt nó; mọi Final Review đều chạy nó. Thứ vẫn còn tùy chọn là bề mặt CI — Flow B, nơi cùng bản đánh giá ấy kiểm soát các pull request thông qua GitHub Action.

Ranh giới khiến việc áp dụng này trở nên an toàn được vạch hẹp một cách có chủ ý. Trình đánh giá là một skill giấy phép MIT, được ghim theo tag, và do chính coding agent bạn đang chạy thực thi, nên không luồng Deep Work Plan nào phụ thuộc vào một dịch vụ thương mại, một nhà cung cấp CI hay một secret. **Flow A** (chỉ cục bộ) là thứ mà mọi kho đã onboarding đều nhận được; **Flow B** được đề nghị một cách tường minh và không bao giờ tự cài khi chưa được yêu cầu. Người phát triển cũng có thể từ chối hẳn trình đánh giá — lời từ chối đó được ghi lại như một ngoại lệ được khai báo, và `verify` báo cáo kho là không tuân thủ ở điểm ấy cho tới khi nó được cài đặt.

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

Sau khi CI đăng đánh giá, nhà phát triển có thể gọi `apply-review` trong `execute` để xem xét từng phát hiện (áp dụng / trì hoãn / bỏ qua) với sự đồng ý. Chỉ đọc theo mặc định; không bao giờ là tệp nhiệm vụ kế hoạch (sẽ phá vỡ thứ tự nhiệm vụ cuối bắt buộc). Kể từ v2.3.1, nội dung đánh giá ghi `Recommendation: approve` không phải bằng chứng cuộc kiểm tra đã đạt — hãy đọc trước khối Highest severity / Strictness gate / Check status của dấu theo dõi.

## Những thay đổi kể từ v2.0.1

Bốn bản phát hành upstream đã ra mắt giữa v2.0.1 và v2.3.1. Không bản nào thay đổi cách addon này kết nối trình đánh giá — Flow A, ba đường phát hiện và hợp đồng chặn vẫn giữ nguyên — nhưng chúng thay đổi những gì người áp dụng nhận được.

| Thay đổi | Ý nghĩa đối với một kho DWP |
|----------|------------------------------|
| **Runner và backend là hai tham số riêng biệt** (v2.1.0) | `provider` chỉ định *runner*: ai chạy vòng lặp đánh giá. `api-base` mới chỉ định *backend*: nơi mô hình được đặt. `api-base` để trống thì giống hệt v2.0.x đến từng byte, nên một bản cài sẵn có sẽ hoạt động y như trước. |
| **Thêm hai runner** (v2.1.0) | `openai` (chạy trong tiến trình, không cần cài đặt) và `grok` (CLI) gia nhập nhóm hiện có. |
| **Chi phí là một bậc gói gọn trong một từ, và giá trị mặc định được đo đạc** (v2.1.0, v2.3.0) | Chi phí được điều khiển bằng từ khóa bậc và diff đã thu hẹp, đồng thời được báo cáo cho từng lượt đánh giá. Trên xAI, `balanced` và `economy` đều phân giải thành `grok-4.5`, còn `deep` thành `grok-4.6`. |
| **Các vòng tiếp theo đánh giá đúng phần diff mới** (v2.1.0, v2.2.0, v2.3.1) | Các phát hiện còn tồn được chuyển tiếp. `prior-findings-resolution` mặc định là `advisory`: phán quyết "đã giải quyết" của mô hình vẫn được báo cáo, nhưng phát hiện đó tiếp tục chặn cho đến khi một người bảo trì đóng luồng thảo luận. Kể từ v2.3.1, khi `collapse-previous` đã thu gọn luồng thảo luận đó, một bản sửa được xác nhận (phát hiện không được phát lại **và** tệp đã thay đổi kể từ lúc phát hiện được nêu, hoặc tệp đã bị xóa) sẽ thu hồi nó để PR bị kẹt có thể chuyển sang xanh. |
| **Một lượt đánh giá dở dang không bao giờ được tính là đạt** (v2.2.0) | Lần chạy kết thúc mà không ghi ra phát hiện nào sẽ được đăng như một lượt đánh giá dở dang tường minh. Mọi mức độ nghiêm ngặt có tính chặn đều đánh trượt nó, nhãn đã-đánh-giá không được đóng, và không vòng rỗng nào thu hồi một phát hiện đang mở. |
| **Trình cài đặt được xác minh bằng checksum** (v2.2.0) | `cursor-installer-sha256` và `grok-installer-sha256` từ chối chạy một tạo phẩm của nhà cung cấp nếu mã băm khác với giá trị đã ghim. |
| **Cuộc kiểm tra, nội dung đánh giá và bình luận theo dõi thống nhất** (v2.3.1) | Quyết định đạt/trượt được tính một lần trước khi đánh giá được đăng. Mọi đánh giá kết thúc bằng khối Check status do runtime ghi. `Recommendation: approve` của mô hình được viết lại thành `request-changes` khi cổng đang thất bại, nên `apply-review` phải đọc dấu theo dõi, không phải dòng cuối của mô hình. |
| **Một neo nội dòng hỏng không còn làm mất mọi bình luận** (v2.3.1) | Khi GitHub trả 422, Action thử lại chỉ với các bình luận có neo nằm trong hunk diff, rồi chỉ tóm tắt như biện pháp cuối cùng. |

Hai trong số này quan trọng hơn cả đối với phương pháp luận.

**Cổng chặn đánh giá dở dang bịt một lỗ hổng có thật trong bước rà soát bảo mật.** Một Final Review không được phép khép lại dựa trên một lượt đánh giá chưa từng diễn ra. Trước v2.2.0, một runner kết thúc mà không tạo ra phát hiện nào là không thể phân biệt với một lượt rà soát sạch. Giờ đây đó là một trạng thái có tên gọi và không phải màu xanh, nên "không có phát hiện" nghĩa là trình đánh giá đã xem và không thấy gì, chứ không phải nó chưa từng xem.

**`economy` cố ý không rẻ hơn.** Phép đo chuẩn của upstream ngày 2026-09-16 cho thấy `grok-4.3` phát hiện 0 trên 5 lỗi đã biết — nó phê duyệt mà không đánh giá — trong khi `grok-4.5` ngang bằng `grok-4.6` với 3 trên 5 và không có dương tính giả, cùng mức chi phí và chỉ tốn một phần tư thời gian. Vì không có mô hình xAI nào rẻ hơn mà vẫn thực sự đánh giá, `economy` phân giải về cùng mô hình với `balanced` thay vì trở thành một bậc không tìm ra gì. Do đó đường xAI qua CLI tăng từ khoảng \$0,07 lên khoảng \$0,40–0,75 mỗi lượt đánh giá; vẫn có thể ghim `model: grok-4.3` một cách tường minh để giữ hành vi trước đây. Đây là các số đo do upstream công bố, không phải của Deep Work Plan.

**Một đánh giá ghi approve không phải bằng chứng cuộc kiểm tra đã đạt.** Kể từ v2.3.1, runtime ghi khối Check status sau khi tính cổng, và viết lại `Recommendation: approve` của mô hình khi cổng đang thất bại. Đó là hợp đồng mà `apply-review` — và một Final Review đọc đánh giá CI — phải tuân theo.

## Hành vi

- **Flow A là chuẩn cơ sở; Flow B được hỏi, không bao giờ đoán.** Cài đặt quy trình không được yêu cầu có dấu ấn lớn hơn so với ở lại Flow A.
- **Hòa giải, không ghi đè.** Skill, mở rộng hoặc `pr-review.yml` hiện có được bảo toàn; chỉ lấp đầy khoảng trống.
- **Xác thực được trì hoãn.** Secret của nhà cung cấp cho CI được cấu hình bởi người bảo trì; tiện ích bổ sung này không bao giờ lưu thông tin đăng nhập.
- **Trung lập với nhà cung cấp.** Không bao giờ yêu cầu dịch vụ thương mại, nhà cung cấp CI hay secret; bề mặt CI là mảnh duy nhất chạm tới một nhà cung cấp.

## Ghi chú

Đánh giá cục bộ bắt buộc kể từ chuẩn 2.3.0; bề mặt CI tùy chọn. Skill thượng nguồn: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Trang spec: [Add-ons](/spec/addons).
