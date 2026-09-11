---
title: "DWP v3: hiệu quả token được xây dựng ngay từ kiến trúc"
description: "Deep Work Plan v3 tái cấu trúc harness xoay quanh chi phí ngữ cảnh — tiết lộ thông tin theo từng cấp, chỉ xác thực phần bị ảnh hưởng, và một bước đánh giá cuối cùng bắt buộc duy nhất — đồng thời nâng chuẩn tin cậy và tuân thủ."
date: 2026-09-10
version: "v3 · Hiệu quả token"
kind: release
lang: vi
order: 2
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Hôm nay chúng tôi phát hành Deep Work Plan v3. Ngữ cảnh là tài nguyên khan hiếm nhất của một tác nhân, và bản phát hành này xem đó là một bài toán kỹ thuật chứ không phải một lời hứa không chính thức: thứ được nén lại là phần khung hỗ trợ, không bao giờ là các chỉ dẫn.

`GUIDE.md` trở thành một chỉ mục định tuyến thay vì một tài liệu mà mọi tác nhân phải đọc toàn bộ, nhờ đó tác nhân chỉ tải phần hướng dẫn thực sự cần cho một bước cụ thể. Các cổng xác thực giờ đây được chọn dựa trên phần bề mặt bị ảnh hưởng của từng tác vụ, thay vì chạy lại toàn bộ bộ kiểm thử ở mỗi thay đổi, và việc tạo kế hoạch có thể chuyển thẳng sang chế độ tin cậy khi nhà phát triển đã biết rõ điều mình muốn, bỏ qua bước xem xét trung gian. Không điều nào trong số này làm suy yếu các cổng kiểm soát: chúng chỉ loại bỏ việc đọc lặp lại, việc tải ngữ cảnh dư thừa và những công việc xác thực không tương ứng với những gì thực sự đã thay đổi.

Song song với công việc tối ưu hiệu quả, bản phát hành này cũng nâng chuẩn tin cậy. Một bước đánh giá cuối cùng bắt buộc duy nhất thay thế ba tác vụ khép lại từng kết thúc một kế hoạch trước đây, việc đánh giá cục bộ bằng AI Diff Reviewer trở thành thành phần nền tảng bắt buộc, và việc tuân thủ giờ đây bắt đầu từ con số không tiện ích mở rộng tùy chọn — bảo mật và nguồn gốc là yêu cầu bắt buộc, không phải sự trau chuốt tùy ý. `AGENTS.md` ghi lại nguồn gốc chuẩn DWP của kho mã, và các kế hoạch cũ vẫn giữ nguyên hình dạng đã ghi nhận cùng một lộ trình chuyển đổi rõ ràng thay vì bị viết lại một cách âm thầm.

Bản phát hành này tuân theo chuẩn DWP `2.3.0`. Khối lượng chỉ dẫn cần tải và hành vi phát lại được đo lường dựa trên một sổ ghi đánh giá công khai, không bao giờ được báo cáo dưới dạng phần trăm tiết kiệm bịa đặt.

Đọc [kiến trúc hiệu quả token](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) và [ghi nhận đánh giá](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md) của nó, hoặc khám phá [đặc tả chuẩn](https://deepworkplan.com/spec) và [bộ công cụ](https://deepworkplan.com/kit/).
