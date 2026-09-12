---
title: "DWP v5: những lời hứa, giờ được đảm bảo"
description: "Deep Work Plan v5 biến tám lời hứa lâu nay thành các hợp đồng đã được kiểm thử — trình kiểm chứng trung thực, một quy tắc phê duyệt, điều phối không gây hỏng và đường nâng cấp an toàn."
date: 2026-09-12
version: "v5 · Đảm bảo bằng kiểm thử"
kind: release
lang: vi
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Hôm nay chúng tôi phát hành Deep Work Plan v5. Tóm tắt trung thực của bản phát hành này: phương pháp luận đã từng hứa tất cả những điều này — giờ đây nó đảm bảo chúng. Trước v5, một agent đi theo tài liệu từng chữ vẫn có thể rơi vào các kịch bản thất bại thực; mỗi kịch bản như vậy giờ đã được đóng lại và ghim bằng một kiểm thử có thể thực thi. Bộ hợp đồng của skill đã tăng từ 132 lên 258 kiểm thử trong chu kỳ này, và mỗi đảm bảo dưới đây đã được xác thực trực tiếp trên tag đã phát hành — cài vào một kho sạch và đưa qua chính các luồng của nó trước khi mục này được viết.

**Một trình kiểm chứng không bao giờ tuyên bố thành công chưa được xác minh.** Các kiểm tra tuân thủ trước đây xuống cấp trong im lặng: không có trình thông dịch đủ khả năng, chúng bỏ qua mọi bước xác minh mà vẫn in ra phán quyết tuân thủ, và chữ in đậm bên trong một trường có thể bị nhầm là trường bị thiếu. Giờ đây trình kiểm chứng kết thúc bằng phán quyết `UNVERIFIED` rõ ràng mỗi khi nó không thể xác minh thật sự. Một trình kiểm chứng không bao giờ báo cáo một thành công mà nó chưa kiểm tra — niềm tin vào các cổng validation là toàn bộ đề xuất, và một cổng có thể bỏ qua chính bước kiểm tra của mình thì phá vỡ chuỗi niềm tin đó.

**Một hợp đồng phê duyệt duy nhất cho các kế hoạch Lite.** Ba bề mặt từng trả lời ba cách khác nhau cho câu hỏi "khởi động kế hoạch này có phê duyệt phạm vi hiện tại của nó không?", và một agent có thể rơi vào bế tắc hoặc chạy mà không có quyền đúng ở ranh giới nguy hiểm nhất. v5 định một hợp đồng duy nhất ở mọi nơi: một lệnh execute hoặc resume tường minh phê duyệt phạm vi ready hiện tại và ghi lại sự phê duyệt đó trước khi làm bất kỳ việc gì; một đề nghị đang chờ tự nó không cấp quyền cho điều gì; một lần thăng cấp bị gián đoạn được khôi phục trước khi bất kỳ công việc sản phẩm nào chạy.

**Điều phối đa kho không thể gây hỏng.** Biến môi trường của một hub điều phối trước đây rò rỉ xuống các kho con — một kho con có thể ghi trạng thái kế hoạch vào chính thư mục của hub. Các mẫu điều phối cũng in `FAIL` nhưng thoát với mã thành công, và một bước kiểm tra hoàn chỉnh chỉ grep một chuỗi trạng thái có thể đọc một tác vụ hoàn thành thành một kế hoạch hoàn thành. Giờ đây gốc của hub được lưu trước khi đi vào các kho con, mỗi kho con phân giải `.dwp/` riêng của mình một cách cô lập, mỗi nhánh thất bại thoát với lỗi, tình trạng hoàn chỉnh được phân tích từ trạng thái tầng cao nhất của kế hoạch, và điểm vào devcontainer lan truyền lỗi sao chép trước khi xóa bất cứ thứ gì.

**Một ma trận đồng ý duy nhất cho các addon.** Addon nào cài mặc định, addon nào chỉ được đề nghị, và bài review nào là bắt buộc — các bề mặt trước đây trả lời khác nhau. v5 tuyên bố một ma trận: AI Diff Reviewer là bắt buộc cho review cục bộ, ghim vào một bản phát hành đã xác minh, với review trên CI là opt-in tường minh không bao giờ tự cài mình; addon design-system là một đề nghị bắt buộc khi phát hiện công việc UI nhưng chỉ cài khi được chấp nhận tường minh; addon dependency-upgrade đến như một delegator vô tác dụng gần như mặc định với khả năng hoàn tác theo ảnh chụp chính xác; dailybot chỉ báo cáo ở nơi được ủy quyền. Một diff trống không còn được tính là một bài review hoàn tất.

**Cỗ máy thực sự cho các kế hoạch dài.** Một cuộc kiểm toán 108 kế hoạch thực tế cho thấy công việc có thể song song hóa là phổ biến nhưng quyết định tuần tự hầu như không bao giờ được tuyên bố, và các cổng giai đoạn chỉ tồn tại như thực hành ứng biến. v5 khiến quyết định thực thi luôn được tuyên bố — tuần tự với lý do được ghi khi song song hóa không phù hợp — thêm Stage Gates tùy chọn cho các kế hoạch hai mươi tác vụ trở lên, và làm giàu Plan Variables với mức nghiêm ngặt, chuẩn bằng chứng và các hành động bị cấm. Tất cả những điều này tải tiến triển và không bao giờ đè nặng một kế hoạch Lite.

**Context bắt buộc, một mục tiêu mỗi tác vụ.** Các kế hoạch có thể trượt thành các danh sách tác vụ không ngữ cảnh, và một tác vụ có thể gói ba mục tiêu sau một cổng xanh duy nhất. v5 yêu cầu cặp Goal và Context ở cấp kế hoạch, một Context cho mỗi tác vụ — những gì một phiên mới cần để khởi động tác vụ đó một mình — trên mỗi bản ghi mới (các bản ghi đã hoàn thành giữ nguyên như đã viết), và biến một mục tiêu mỗi tác vụ thành quy tắc chuẩn mực với một bộ phận canh chống suy thoái.

**Một đường nâng cấp an toàn.** `/dwp-upgrade` là mới. Giai đoạn kiểm tra của nó chỉ đọc và không cài đặt gì; một lần nâng cấp chỉ bắt đầu từ sự chấp nhận tường minh, với các thích nghi cục bộ được so sánh và bộc lộ trước khi ghi đè bất cứ thứ gì; việc cài đặt nhắm vào một tag chính xác và tự xác minh; onboarding chạy lại như một init mới. Một lần nâng cấp không bao giờ động vào `.dwp/` — không kế hoạch, tệp trạng thái, bản ghi cổng hay bằng chứng nào bị di chuyển, viết lại hoặc vô hiệu hóa.

**Bằng chứng trung thực và đo lường được.** Các tuyên bố hiệu suất giờ được đo lại trên ba baseline — v3.0.0, v4.0.3 và cây cuối cùng — với script đo lường được commit vào kho. Kết quả được báo cáo theo byte hệ thống tệp và không bao giờ chuyển đổi thành số token hay chi phí mà chúng tôi không thể đứng sau lưng; mọi tuyên bố không thể xác minh đều bị cách ly như vậy trong hồ sơ đánh giá.

Deep Work Plan v5 tuân theo tiêu chuẩn DWP 4.0.0. Đọc [đặc tả chuẩn mực](https://deepworkplan.com/spec), xem [kho của skill](https://github.com/DailybotHQ/deepworkplan-skill), hoặc bắt đầu áp dụng từ [`/init`](https://deepworkplan.com/init).
