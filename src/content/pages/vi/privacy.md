---
title: "Chính sách quyền riêng tư"
description: "Chính sách quyền riêng tư của deepworkplan.com: trang web tĩnh không tài khoản, không quảng cáo, phân tích tổng hợp không dùng cookie, và giải thích thẳng thắn chính xác biểu mẫu liên hệ thu thập những gì."
---

## Trang web này là gì

deepworkplan.com là một tập hợp các trang tĩnh được phục vụ qua CDN. Không có đăng nhập, không có cơ sở dữ liệu người dùng, và không có cách nào để trang web lưu hồ sơ cá nhân. Nội dung được phát triển trong các repository GitHub công khai dưới tổ chức DailybotHQ, và mọi thứ bạn đọc ở đây đều được phục vụ đúng như đã xây dựng.

## Phân tích

Trang web dùng Umami, một dịch vụ phân tích không cookie, đặt quyền riêng tư lên trước, để đếm lượt xem trang một cách tổng hợp. Umami không đặt cookie theo dõi và không xây hồ sơ xuyên trang. Vì các trình thu thập AI không chạy JavaScript, một hàm edge phía máy chủ còn ghi lại user agent và đường dẫn của các lượt ghé thăm bot tự động dưới dạng sự kiện phân tích ẩn danh — điều này nhận diện phần mềm thu thập (ví dụ "GPTBot đã ghé /init"), không bao giờ nhận diện khách truy cập là người.

## Cookie và bộ nhớ cục bộ

Trang web không đặt cookie theo dõi. Điều duy nhất được lưu trong trình duyệt của bạn là tùy chọn giao diện (chế độ sáng hoặc tối) giữ trong localStorage, vốn không bao giờ rời khỏi thiết bị của bạn và không được truyền đi đâu. Nếu bạn xóa bộ nhớ trình duyệt, trang web đơn giản quay về giao diện mặc định của hệ thống.

## Dịch vụ bên thứ ba

Việc lưu trữ và phân phối chạy trên Cloudflare Pages, vốn xử lý nhật ký yêu cầu và địa chỉ IP tại edge như một phần vận hành CDN và chặn lạm dụng, theo chính sách quyền riêng tư của chính Cloudflare. Phân tích tổng hợp chạy trên Umami (cloud.umami.is). Nếu bạn tự nguyện gửi biểu mẫu liên hệ, câu trả lời của bạn được gửi qua Google Forms đến đội ngũ của chúng tôi — đó là nơi duy nhất thông tin bạn gõ được thu thập, và nó chỉ được dùng để trả lời bạn.

## Những gì chúng tôi không làm

Chúng tôi không bán hay chia sẻ dữ liệu cá nhân, không chạy quảng cáo hay pixel tiếp thị lại, không lấy dấu vân tay trình duyệt, và không gửi email tiếp thị. Trang web không có đăng ký bản tin và không có telemetry nào vượt quá các phép đếm tổng hợp, không cookie đã mô tả ở trên.

## Lựa chọn của bạn

Vì phân tích ở đây mang tính tổng hợp và không dùng cookie, không có hồ sơ cá nhân nào để xuất hay xóa. Bạn có thể chặn tập lệnh phân tích bằng bất kỳ trình chặn nội dung nào mà không ảnh hưởng đến cách trang web hoạt động. Nếu bạn đã gửi biểu mẫu liên hệ và muốn xóa tin nhắn của mình, hãy viết đến địa chỉ liên hệ bên dưới và chúng tôi sẽ xóa nó.

## Thay đổi chính sách

Nếu chính sách này thay đổi đáng kể, ngày cập nhật trên [trang chính sách](https://deepworkplan.com/privacy) thay đổi theo, và các chỉnh sửa thực chất được commit vào repository trang web công khai, nơi bất kỳ ai cũng có thể xem lại lịch sử.

## Liên hệ và bảo mật

Về câu hỏi quyền riêng tư, hãy viết đến [security@dailybot.com](mailto:security@dailybot.com). Để báo cáo lỗ hổng bảo mật, hãy ưu tiên tính năng báo cáo lỗ hổng riêng tư của GitHub cho các repository trang web và skill — xem [security.txt](https://deepworkplan.com/.well-known/security.txt) để biết địa chỉ chính xác.
