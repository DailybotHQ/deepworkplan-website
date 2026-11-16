---
title: Kỹ thuật vòng lặp
description: "Cách daemon do con người khởi động duy trì Deep Work Plan đã duyệt qua đăng ký, kế nhiệm, nhắc việc và thông báo trong phạm vi quyền hạn ghi nhận."
order: 8
lang: vi
summary: Vòng đời đầy đủ giúp kế hoạch đã duyệt tiếp tục trong phạm vi quyền hạn đã ghi.
icon: repeat
---

# Kỹ thuật vòng lặp

**Đặc tả trước, vòng lặp khép kín: kho mã là harness và kế hoạch tự chạy đến hoàn tất.** Chương này mô tả cơ chế tùy chọn giúp kế hoạch tiếp tục sau lượt thực thi đầu tiên. Kế hoạch vẫn là đặc tả bền vững; vòng lặp tạo tính liên tục, không tạo thêm quyền hạn.

## Đăng ký kế hoạch

Khi addon Herdr được bật, luồng `execute` của pack nhận quyền lead của kế hoạch và ghi lại danh sách kế nhiệm. Bản ghi xác định kế hoạch, lead hiện tại, epoch và thứ tự người kế nhiệm mà vòng lặp theo dõi. Kế hoạch không có bản ghi lead sẽ không được giám sát. Addon là tùy chọn; phương pháp cốt lõi vẫn hoạt động trong một phiên hoặc qua bàn giao do con người điều phối. Đăng ký không phê duyệt công việc hay mở rộng quyền hạn. Trong v8, kế hoạch đã duyệt chạy đến cùng trong phạm vi quyền hạn ghi trong kế hoạch; tiêu chí chấp nhận và gates vẫn ràng buộc.

## Con người khởi động daemon

Con người chạy `herdr-peers autopilot --loop` trong môi trường Herdr. Đây là daemon nền cục bộ, không phải mục đăng nhập hay dịch vụ hệ thống. Nó theo dõi các kế hoạch đã đăng ký trên máy được bật và nhắc lead nhàn rỗi tiếp tục khi kế hoạch còn mở, không lane nào đang làm việc và không có phản hồi chờ. Lời nhắc cố định yêu cầu hoàn tất kế hoạch đã duyệt, tuân thủ gates và quyền hạn đã ghi.

Daemon không đụng đến đăng nhập, thông tin xác thực hay xác nhận bypass-permissions của Claude. Nó không chọn mục từ chối, chạy văn bản tự do trên màn hình hoặc tạo quyền. Lời nhắc chỉ yêu cầu agent tiếp tục, không thêm quyền hạn. Lead vẫn ghi lại blocker và tuân thủ gates. Sau ba lời nhắc không có tiến triển, daemon dừng nhắc và báo `plan_stalled`.

## Bảo vệ vai trò lead

Nếu lead biến mất, daemon yêu cầu người kế nhiệm đầu tiên có thể liên lạc trong danh sách chạy quy trình takeover. Epoch của bản ghi tăng và bên nhận thực thi thứ tự kế nhiệm. Protocol 2 cũng hỗ trợ bổ nhiệm lead, nhưng chỉ sau khi con người cho phép rõ ràng trong kế hoạch; daemon không thể tự cấp quyền đó. Trước mọi merge, tag hoặc release, lead hiện tại chạy `herdr-peers lead verify --plan <id>` để kiểm tra bản ghi trên các máy của kế hoạch. Người kế nhiệm tiếp nhận kế hoạch và gates, không có thêm quyền. Nếu kế hoạch gặp gate cần con người xử lý theo quy tắc C1–C7, vòng lặp báo nhu cầu và dừng tại đó. Thông tin xác thực và đăng nhập cũng do con người xử lý. Với tiến độ khác, con người được thông báo thay vì phải theo dõi từng bước.

## Brain và hàng đợi tùy chọn

`--brain` tùy chọn khởi chạy agent quyết định riêng cho trường hợp quy tắc daemon không giải quyết được. Brain chỉ chọn từ danh sách hành động đóng mà kế hoạch cho phép. Daemon vẫn là tác nhân duy nhất: nó xác thực lựa chọn và thực hiện hành động đủ điều kiện; không bao giờ chạy văn bản tự do của brain. Nếu kế hoạch không cho phép rõ ràng, brain không hành động thay kế hoạch.

Hàng đợi sử dụng tài liệu `dwp-queue-v1` tại `.dwp/queue.json`. Chỉ pack được ghi; daemon là bộ đọc có giới hạn. Kế hoạch đủ điều kiện khi phụ thuộc `after` đã hoàn tất hoặc không tồn tại và phê duyệt còn hiệu lực. Daemon chỉ bắt đầu bằng cách gửi một lời nhắc cố định cho lead đã đăng ký: “Kế hoạch P là mục tiếp theo trong hàng đợi của kho này và đã được duyệt; hãy thực thi đến cùng, tuân thủ gates.” Vòng lặp không khởi chạy mục `launch`. Pack quản lý trạng thái hàng đợi trong lúc thực thi và hoàn tất.

## Báo cáo và quan sát

Sự kiện kế hoạch ghi lại trạng thái xếp hàng, bắt đầu, bị chặn, đình trệ, mất lead và hoàn tất. Lệnh `--notify` tùy chọn nhận đối tượng `plan-event-v1` cho các sự kiện được hỗ trợ; notifier Dailybot của pack chuyển chúng thành cập nhật cho nhóm. Thông báo báo tiến độ hoặc blocker, không cấp quyền và không thay thế bản ghi kế hoạch. Báo cáo fleet và `herdr-peers fleet ui` hiển thị agent cùng kế hoạch trên nhiều máy. Giao diện chỉ đọc, không ghi trạng thái hoặc nhắc agent.

## Ranh giới

Kỹ thuật vòng lặp khép kín việc thực thi quanh đặc tả đã duyệt. Việc tiếp tục, kế nhiệm và báo cáo trở thành quy trình thường lệ, trong khi kế hoạch vẫn là nguồn quyền hạn và daemon vẫn bị giới hạn. Con người khởi động daemon, xử lý thông tin xác thực và đăng nhập, đồng thời chỉ giải quyết gates C1–C7 của kế hoạch hoặc nhu cầu vượt ngoài quyền hạn đã ghi. Mục tiêu là kế hoạch đã duyệt đạt điểm kết thúc xác định mà không cần con người giám sát liên tục.
