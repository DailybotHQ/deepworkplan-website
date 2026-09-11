---
title: "DWP v4: kế hoạch vừa vặn với khối lượng công việc"
description: "Deep Work Plan v4 khiến định dạng kế hoạch đi theo khối lượng công việc, chứ không phải ngược lại — một kế hoạch Lite giờ đây là một đề xuất hoàn chỉnh, có thể thực thi ngay cho các tác vụ có giới hạn rõ ràng, và bước soạn nháp riêng biệt đã được loại bỏ."
date: 2026-09-11
version: "v4 · Ưu tiên kế hoạch Lite"
kind: release
lang: vi
order: 1
featured: true
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Hôm nay chúng tôi phát hành Deep Work Plan v4. Bản phát hành này nói về sự linh hoạt và tính đa năng: cùng một phương pháp luận cần phải nhẹ nhàng cho một bản sửa lỗi có giới hạn rõ ràng, đồng thời vẫn vững vàng cho công việc kéo dài hàng giờ hoặc hàng ngày, mà không buộc nhà phát triển phải chọn định dạng "nghiêm túc" chỉ để có được các cổng kiểm soát thực sự.

Tạo một kế hoạch cho công việc có giới hạn rõ ràng giờ đây không còn đồng nghĩa với việc viết một bản nháp dùng một lần để xem xét rồi sau đó soạn một kế hoạch cuối cùng riêng biệt. `create` giờ đây hiện thực hóa trực tiếp một **kế hoạch Lite**: một đề xuất gọn nhẹ, có thể thực thi hoàn toàn với các bản ghi tác vụ nằm ngay trong tài liệu, mỗi bản ghi mang theo tiêu chí nghiệm thu, cổng xác thực và nhật ký hoàn thành của riêng nó. Không còn bước soạn nháp `.dwp/drafts/` nữa — bản nháp và kế hoạch giờ là cùng một hiện vật, có thể xem xét và chạy được ngay từ thời điểm được viết ra.

Các kế hoạch Full với tệp riêng cho từng tác vụ vẫn giữ đúng vị trí của chúng: công việc dài hơn, rủi ro cao hơn vẫn nhận được một tệp cho mỗi tác vụ, một bản ghi phân tích riêng và cùng một lớp trạng thái có thể tiếp tục. Một kế hoạch Lite có thể được nâng cấp lên Full bất cứ khi nào một yêu cầu hoặc một cổng xác thực không còn vừa với một bản ghi gọn nhẹ, và việc chọn bắt đầu từ định dạng nào tuân theo các tín hiệu rõ ràng, đã được ghi nhận — số lượng tác vụ, bề mặt bị ảnh hưởng, rủi ro, khả năng đảo ngược — chứ không phải một sự phỏng đoán.

Bản phát hành này tuân theo chuẩn DWP `2.4.0`. Đọc [đặc tả chuẩn](https://deepworkplan.com/spec), khám phá [bộ công cụ](https://deepworkplan.com/kit/), hoặc bắt đầu áp dụng từ [`/init`](https://deepworkplan.com/init).
