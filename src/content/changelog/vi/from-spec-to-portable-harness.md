---
title: "DWP v1: từ vòng lặp lập kế hoạch đến harness có thể di chuyển"
description: "Deep Work Plan phát triển từ một vòng lặp viết kế hoạch đơn lẻ thành một bộ công cụ áp dụng có thể di chuyển — có xác thực nguồn gốc và độ tin cậy, hỗ trợ nhiều nền tảng tác nhân hơn, cùng một bộ kiểm tra tuân thủ mà bất kỳ kho mã nào cũng có thể chạy."
date: 2026-06-12
version: "v1 · Nền tảng"
kind: foundation
lang: vi
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Cho đến nay, Deep Work Plan vẫn là một vòng lặp viết kế hoạch mà một tác nhân thực hiện trong một phiên làm việc duy nhất. Loạt bản phát hành này biến nó thành thứ mà một kho mã có thể áp dụng theo cách riêng của mình — phiên bản đầu tiên hướng đến việc vượt ra ngoài một tác nhân và một phiên làm việc duy nhất.

Skill có thêm một tuyên bố tin cậy với nguồn gốc được xác minh bằng checksum, để nhà phát triển có thể thấy chính xác những gì được đọc và ghi trước khi cài đặt. Các cấu hình sẵn cho việc thiết lập ban đầu và các nền tảng tác nhân được hỗ trợ mở rộng đáng kể, kỷ luật kiểm thử trở thành một phần cốt lõi của mọi tác vụ thay vì một ý tưởng bổ sung sau cùng, và một bộ kiểm tra tuân thủ cho phép kho mã xác minh — một cách khách quan, không phải dựa trên giả định — rằng nó đáp ứng tiêu chuẩn. Giao thức trạng thái và tiếp tục nghĩa là một kế hoạch bị gián đoạn có thể tiếp tục từ nơi nó dừng lại thay vì phải bắt đầu lại từ đầu. Phía sau hậu trường, khả năng tương thích `.claude` và `.cursor` hội tụ về một thư mục `.agents` chuẩn duy nhất, để mọi tác nhân được hỗ trợ đều đọc cùng một bộ công cụ.

Cùng nhau, các bản phát hành này đặt nền móng cho giai đoạn tiếp theo: kho mã không còn chỉ là nơi lưu trữ kế hoạch, mà bắt đầu trở thành harness làm việc của tác nhân.

Xem [lịch sử phát hành của skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) để biết toàn bộ trình tự.
