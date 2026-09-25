---
title: AI Diff Reviewer
description: "Đánh giá cục bộ các phát hiện nghiêm trọng đã xác minh trong mọi Final Review kể từ chuẩn 2.3.0; cổng CI với grok và vòng lặp address-review vẫn tùy chọn."
kind: addon
lang: vi
order: 5
---

# Tiện ích bổ sung AI Diff Reviewer

Mọi Deep Work Plan đều khép lại theo cùng một cách: một **Final Review** bắt buộc, đọc toàn bộ tập thay đổi mà kế hoạch đã tích lũy trước khi công việc được coi là xong. Bước rà soát bảo mật bên trong nó là điểm cuối cùng còn có thể phát hiện ra điều gì đó. Nếu không có trợ giúp, người đọc duy nhất ở thời điểm ấy chính là agent đã viết đoạn mã đó.

Tiện ích này đặt thêm một người đọc thứ hai lên bản diff ấy. Nó nối **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — được liệt kê trên marketplace là "AI Diff Reviewer", bản phát hành hiện tại **v3.1.1** — vào bước rà soát bảo mật, nơi nó trả về thứ có cấu trúc thay vì văn xuôi: một phán quyết, một bảng phát hiện, và mức độ nghiêm trọng cho từng phát hiện. Kể từ v3, một phát hiện `critical` có nghĩa là trình xác minh của tiện ích đã xác nhận nó bằng một lần gọi mô hình thứ hai dựa trên mã; chỉ những phát hiện nghiêm trọng đã xác minh mới chặn việc hoàn tất cho tới khi được sửa hoặc được chấp nhận một cách tường minh. Bản đánh giá này là một cánh cổng, không phải một lời bình.

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
| **B — hai bề mặt** | Flow A cộng thêm `setup` ghi quy trình đánh giá (Action `@v3`), cùng tệp mở rộng cho cục bộ và CI. Các trợ lý `apply-review` và `address-review` tùy chọn sau khi CI đăng phát hiện. |

Việc phát hiện cho đánh giá cục bộ yêu cầu **skill + tệp mở rộng** tại một trong các vị trí: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` hoặc `.github/ai-pr-reviewer/extension.md`. Skill đơn lẻ là chưa đủ.

## Tiện ích bổ sung này kết nối gì (giới hạn theo thiết kế)

Tiện ích bổ sung DWP **không** tái tạo trình đánh giá. Nó ủy quyền cài đặt, phương pháp luận, trình hướng dẫn CI, soạn thảo mở rộng, tạo bản nháp PR và các vòng lặp đánh giá sau CI cho sáu kỹ năng con của skill thượng nguồn (luồng mặc định gốc, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### Đánh giá cục bộ bắt buộc

`create` thêm bước đánh giá cục bộ vào bước rà soát bảo mật của mọi Final Review và `execute` chạy nó. Đầu ra được thêm vào bên dưới `## AI Diff Reviewer local review` trong `analysis_results/SECURITY_REVIEW.md` nội bộ của plan (bên trong thư mục riêng của plan, không bao giờ ở thư mục gốc của repo).

- **Reviewer bị thiếu — được ghi lại, không bao giờ bị bỏ qua âm thầm:** một skill hoặc tệp mở rộng bị thiếu trở thành một phát hiện `local reviewer not installed`; Final Review chạy lượt rà soát cục bộ khi skill hiện diện, nếu không thì mang phát hiện đó vào báo cáo hoàn tất — việc cài đặt thuộc về sự chấp thuận của onboarding hoặc một lời gọi addon rõ ràng, không bao giờ là một bootstrap bất ngờ.
- **Thất bại nhẹ (chỉ gọi):** một đánh giá có thể khởi động nhưng gặp lỗi → cảnh báo một lần, ghi lại, tiếp tục; không bao giờ làm thất bại tác vụ vì điều này.
- **Cổng sau khi lượt kiểm tra hoàn tất:** các **phát hiện nghiêm trọng đã xác minh** chặn việc hoàn thành Final Review cho đến khi được sửa hoặc chấp nhận rõ ràng (BC-07). Các xác nhận nghiêm trọng chưa xác minh xuất hiện dưới dạng cảnh báo có chú thích — nhìn thấy được, không chặn, trừ phi `strict-unverified-criticals: true` khôi phục việc chặn theo xác nhận. Một lượt đánh giá đã dùng hết giới hạn vòng (`incomplete`) hay đồng hồ treo tường (`timeout`) không phải là một lượt sạch dưới mức nghiêm ngặt có tính chặn (BC-04). `warning` / `info` được ghi lại nhưng không chặn.
- **Flow A không cần secret CI.** Một khóa nhà cung cấp chưa đặt không được ức chế lượt kiểm tra cục bộ.

### Cổng CI Flow B (tùy chọn)

Action `DailybotHQ/ai-diff-reviewer@v3`, thường bị kiểm soát bởi nhãn (`ready`), với công việc **AI review gate** có tên ổn định để bảo vệ nhánh và nhãn bỏ qua tùy chọn `skip-review-label: skip-ai-review`. Kể từ v3, ngân sách đánh giá theo mức độ rủi ro tất định của thay đổi — 8/20/30/40 vòng từ `low` tới `critical` dưới `budget-profile: auto` (`fixed` khôi phục các hằng số trước v3 trong thời gian chuyển tiếp) — và một push không thay đổi mã sẽ chạy một vòng chỉ có trình xác minh. `prompt.md` dùng chung + mở rộng căn chỉnh phương pháp luận và mức độ nghiêm trọng; cục bộ và CI vẫn giống hệt nhau về phương pháp luận, trong khi các vòng CI thứ 2 trở đi có thể ngắn hơn trong Đánh giá Nhận thức Lặp lại và lượt kiểm tra cục bộ vẫn đầy đủ.

### Các trợ lý đánh giá tùy chọn

Hai kỹ năng con do nhà phát triển gọi sẽ khép vòng lặp sau khi CI đăng đánh giá; không kỹ năng nào bao giờ là một tệp nhiệm vụ kế hoạch (điều đó sẽ phá vỡ thứ tự nhiệm vụ cuối bắt buộc).

- `apply-review` xem xét từng phát hiện (áp dụng / trì hoãn / bỏ qua) với sự đồng ý. Chỉ đọc theo mặc định; không bao giờ commit hay push.
- `address-review` (mới trong v3.1.1) là vòng lặp một lần gọi: tìm các PR đang mở của nhánh, kiểm tra đánh giá đã phủ head hiện tại chưa, trình bày các phát hiện với một kế hoạch áp dụng/trì hoãn/bỏ qua, rồi — sau một lời "có" duy nhất — áp dụng, commit theo các lô Conventional Commits nhỏ, push, và kích hoạt lại trình đánh giá theo cách kho đó kích hoạt nó (chặn bằng nhãn → bật/tắt nhãn; kích hoạt bằng push → xác nhận vòng chạy mới). Khác với `apply-review`, nó commit và push; đó chính là ý nghĩa của vòng lặp này. Trên các đánh giá ensemble đã tổng hợp, nó đọc tài liệu tổng hợp và dấu `ai-pr-reviewer-aggregate`.
- Đường dành cho máy là đầu ra có cấu trúc, không phải nội dung đánh giá: tài liệu `review-output/3.0` (`.aiprr/review-output.json`, định vị qua các đầu ra `structured-output-path` và `structured-output-sha256`) mang theo hồ sơ chạy, các phát hiện kèm bằng chứng và xác minh, các phát hiện bị bác bỏ, và cổng. Nội dung đánh giá ghi `Recommendation: approve` không phải bằng chứng cuộc kiểm tra đã đạt — hãy đọc trước khối Highest severity / Strictness gate / Check status của dấu theo dõi.

## Những gì v3 thay đổi

Ba bản phát hành ra mắt ngày 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) và v3.1.1 theo sau với kỹ năng con `address-review`. Không bản nào thay đổi cách tiện ích này kết nối trình đánh giá — Flow A, ba đường phát hiện và chiếc thang "không bao giờ chặn" vẫn giữ nguyên — nhưng chúng thay đổi những gì người áp dụng nhận được.

| Thay đổi | Ý nghĩa đối với một kho DWP |
|----------|------------------------------|
| **`critical` chỉ được đăng khi đã xác minh** (v3.0.0) | Mỗi xác nhận nghiêm trọng — cộng thêm mẫu 30 % các cảnh báo — được một lần gọi mô hình riêng thực hiện lần kiểm tra thứ hai ngắn gọn dựa trên mã (≈ 3 k token, 10 giây và $0.009 mỗi phát hiện đã xác minh). Phát hiện nghiêm trọng đã xác minh mới giữ cổng cho bước rà soát bảo mật; các xác nhận bị bác bỏ vẫn hiển thị dưới dạng cảnh báo có chú thích và được liệt kê trong đầu ra có cấu trúc, không bao giờ đăng nội dòng. |
| **Ngân sách theo mức độ rủi ro** (v3.0.0) | 8/20/30/40 vòng từ `low` tới `critical`, suy ra từ danh mục thay đổi (`budget-profile: auto`). Một push không thay đổi mã chạy một vòng chỉ có trình xác minh với chi phí −93 %. `budget-profile: fixed` khôi phục hằng số 30 vòng trước v3. |
| **Lượt đánh giá dở dang là màu đỏ** (v3.0.0) | `incomplete` (giới hạn vòng) và `timeout` (đồng hồ treo tường) đăng các phát hiện một phần và đánh trượt dưới mức nghiêm ngặt có tính chặn — "không có phát hiện" giờ luôn nghĩa là trình đánh giá đã xem và không thấy gì. |
| **Đầu ra có cấu trúc là đường dành cho máy** (v3.0.0) | Tài liệu `review-output/3.0` mang theo hồ sơ chạy, danh mục thay đổi, các phát hiện kèm bằng chứng có kiểu và xác minh, các phát hiện bị bác bỏ, và cổng. Hãy đọc tài liệu đó, thay vì cào nội dung đánh giá. |
| **Sáu kỹ năng con** (v3.1.1) | `address-review` gia nhập bộ định tuyến: một lần gọi là áp dụng, commit, push và kích hoạt lại trình đánh giá. |
| **Ensemble tùy chọn** (v3.0.0) | Các chân `mode: emit` chỉ đọc cộng một công việc `aggregate` xác minh các phát hiện hợp nhất một lần và đăng một đánh giá duy nhất. |
| **`@v2` vẫn hoạt động** | Dòng v2 bị đóng băng tại `release/v2` với sáu tháng bảo trì bảo mật và danh mục. v3 là khuyến nghị, không bao giờ là di cứng bắt buộc. |

Hai trong số này quan trọng hơn cả đối với phương pháp luận.

**Cổng chặn phát hiện nghiêm trọng đã xác minh làm cứng bước rà soát bảo mật.** Trước v3, một mô hình có thể tự do xác nhận `critical` và cổng đi theo xác nhận đó. Giờ đây, một phát hiện nghiêm trọng trong Final Review nghĩa là một lần gọi mô hình thứ hai đã xác nhận nó dựa trên mã, và chiến dịch phát hành đã đo khoảng cách đó: 771 lượt chạy đánh giá trả phí qua mười chiến dịch với tổng chi phí khoảng $83, bậc nghiêm trọng đạt 63/63 recall với độ chính xác khi xét duyệt 1.0, và các vòng gia tăng cắt 62–76 % token đầu vào. Đây là các số đo do upstream công bố, không phải của Deep Work Plan.

**`economy` cố ý không rẻ hơn.** Phép đo chuẩn của upstream ngày 2026-09-16 cho thấy `grok-4.3` phát hiện 0 trên 5 lỗi đã biết — nó phê duyệt mà không đánh giá — trong khi `grok-4.5` ngang bằng `grok-4.6` với 3 trên 5 và không có dương tính giả, cùng mức chi phí và chỉ tốn một phần tư thời gian. Vì không có mô hình xAI nào rẻ hơn mà vẫn thực sự đánh giá, `economy` phân giải về cùng mô hình với `balanced` thay vì trở thành một bậc không tìm ra gì; trên runner grok, thứ làm chi phí tăng theo quy mô là ngân sách vòng của mức rủi ro, không phải lựa chọn mô hình. Do đó đường xAI qua CLI tăng từ khoảng $0,07 lên khoảng $0,40–0,75 mỗi lượt đánh giá; vẫn có thể ghim `model: grok-4.3` một cách tường minh để giữ hành vi trước đây. Đây là các số đo do upstream công bố, không phải của Deep Work Plan.

## Hành vi

- **Flow A là chuẩn cơ sở; Flow B được hỏi, không bao giờ đoán.** Cài đặt quy trình không được yêu cầu có dấu ấn lớn hơn so với ở lại Flow A.
- **Hòa giải, không ghi đè.** Skill, mở rộng hoặc quy trình đánh giá hiện có được bảo toàn; chỉ lấp đầy khoảng trống.
- **Xác thực được trì hoãn.** Secret của nhà cung cấp cho CI được cấu hình bởi người bảo trì; tiện ích bổ sung này không bao giờ lưu thông tin đăng nhập.
- **Trung lập với nhà cung cấp.** Không bao giờ yêu cầu dịch vụ thương mại, nhà cung cấp CI hay secret; bề mặt CI là mảnh duy nhất chạm tới một nhà cung cấp.

## Ghi chú

Đánh giá cục bộ bắt buộc kể từ chuẩn 2.3.0; bề mặt CI tùy chọn. Skill thượng nguồn: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Hướng dẫn di chuyển upstream: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Trang spec: [Add-ons](/spec/addons).
