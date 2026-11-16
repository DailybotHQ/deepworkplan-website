---
title: Loop engineering
description: "Cách daemon do con người khởi động giữ các Deep Work Plan đã duyệt tiếp tục chạy qua đăng ký, kế nhiệm, lời nhắc, sự kiện và thông báo trong quyền hạn đã ghi."
order: 8
lang: vi
summary: Vòng đời trọn vẹn giữ cho kế hoạch đã duyệt tiếp tục chạy trong phạm vi quyền hạn đã ghi.
icon: repeat
---

# Loop engineering

**Đặc tả trước, vòng lặp khép kín: repository là harness và kế hoạch tự chạy đến khi hoàn thành.** Chương này mô tả cơ chế tùy chọn giữ cho kế hoạch tiếp tục chạy sau lượt thực thi đầu tiên. Kế hoạch vẫn là đặc tả bền vững; vòng lặp mang lại tính liên tục, không phải quyền hạn mới.

## Đăng ký kế hoạch

Khi addon Herdr được bật, luồng `execute` của gói skill nhận bản ghi lead của kế hoạch (và `resume` nhận lại bản ghi đó), đồng thời thêm danh sách kế nhiệm khi kế hoạch nêu tên người kế nhiệm; việc chuyển giao chỉ hoạt động khi có danh sách kế nhiệm đã được ghi. Bản ghi đó cho vòng lặp một kế hoạch cụ thể, lead hiện tại, epoch và thứ tự người kế nhiệm để theo dõi. Kế hoạch không có bản ghi lead sẽ không được theo dõi. Addon vẫn là tùy chọn: không có nó, phương pháp cốt lõi vẫn hoạt động trong một phiên hoặc qua bàn giao do con người điều phối.

Đăng ký kế hoạch không phê duyệt công việc và không mở rộng quyền hạn của kế hoạch. Trong v8, một kế hoạch đã duyệt chạy đến cùng trong phạm vi quyền hạn ghi trong chính kế hoạch đó. Tiêu chí chấp nhận và các cổng của nó vẫn ràng buộc suốt quá trình thực thi.

## Khởi động daemon bằng tay

Con người khởi động `herdr-peers autopilot --loop` trong môi trường Herdr. Đây là daemon nền cục bộ, không phải mục đăng nhập hay dịch vụ hệ thống. Nó theo dõi các kế hoạch đã đăng ký trên các máy được bật và nhắc lead đang rảnh tiếp tục khi kế hoạch còn mở, không lane nào đang làm việc và không có phản hồi nào đang chờ. Lời nhắc là cố định: tiếp tục kế hoạch đã duyệt đến cùng, tuân thủ các cổng và quyền hạn đã ghi của nó.

Daemon không đụng đến đăng nhập, màn hình yêu cầu thông tin xác thực hay xác nhận bypass-permissions của Claude. Nó không bao giờ chọn một lựa chọn từ chối, một lựa chọn văn bản tự do, hay một dòng mở rộng quyền của agent. Lời nhắc chỉ yêu cầu agent tiếp tục; nó không thêm quyền hạn. Lead vẫn ghi lại các trở ngại và tuân thủ các cổng của kế hoạch. Sau ba lời nhắc không có tiến triển, daemon ngừng nhắc và báo `plan_stalled`.

## Giữ vai trò lead trong hàng rào

Nếu lead không còn, daemon yêu cầu người kế nhiệm đầu tiên liên lạc được trong danh sách chạy quy trình tiếp quản. Bản ghi lead tiến theo epoch, và bên nhận thực thi thứ tự kế nhiệm. Giao thức 2 cũng hỗ trợ chỉ định lead, nhưng chỉ khi con người đã ghi quyền đó vào kế hoạch (`lead claim --allow-appointment`) và khởi động daemon với `--appoint`; daemon không thể tự cấp quyền đó. Trước mọi lần merge, gắn tag hay phát hành, lead hiện tại chạy `herdr-peers lead verify --plan <id>` để kiểm tra bản ghi trên các máy của kế hoạch.

Người kế nhiệm thừa hưởng kế hoạch và các cổng của nó. Cả kế nhiệm lẫn chỉ định đều không thay đổi tiêu chí chấp nhận hay cho phép làm việc ngoài quyền hạn đã ghi. Nếu kế hoạch tới một cổng cần con người hành động theo quy tắc C1–C7 của nó, vòng lặp báo nhu cầu đó và dừng tại cổng ấy. Thông tin xác thực và đăng nhập cũng vẫn là việc của con người. Với các tiến triển khác, con người được thông báo thay vì phải trông chừng từng bước.

## Bộ não và hàng đợi tùy chọn

Tùy chọn `--brain` khởi chạy một agent quyết định chuyên trách cho những trường hợp mà quy tắc của daemon không giải quyết được. Nó cần coding-agents-kit 1.3.0 trở lên; nếu không có, daemon được khởi động với `--brain` sẽ từ chối khởi động. Bộ não chỉ được chọn từ một danh sách hành động đóng mà daemon cố định cho từng trường hợp: thêm một lời nhắc, một yêu cầu cố định gửi lead để gỡ một trở ngại mà kế hoạch đánh dấu là lead tự gỡ được, báo cho con người, hoặc để nguyên. Daemon vẫn là tác nhân duy nhất: nó xác thực lựa chọn và thực hiện hành động hợp lệ; văn bản tự do của bộ não không bao giờ được thực thi. Trong v8, kế hoạch còn ghi trong khối tự chủ của mình liệu bộ não có được phép hành động trên nó hay không.

Hàng đợi kế hoạch dùng tài liệu `dwp-queue-v1` tại `.dwp/queue.json`. Công cụ kế hoạch ghi tài liệu này; daemon là bên tiêu thụ có giới hạn, chỉ đọc. Một kế hoạch trong hàng đợi đủ điều kiện khi phụ thuộc `after` của nó đã hoàn tất (hoặc không có) và phê duyệt vẫn còn hiệu lực. Daemon chỉ bắt đầu kế hoạch đó bằng cách gửi một lời nhắc cố định tới lead mà hàng đợi chỉ định: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Mục `launch` không được vòng lặp này khởi chạy. Trạng thái hàng đợi do gói skill duy trì trong suốt quá trình thực thi và hoàn tất.

## Báo cáo và quan sát

Sự kiện kế hoạch bao gồm một kế hoạch bị đình trệ, bị chặn, mất lead hoặc hoàn thành, và một kế hoạch trong hàng đợi bắt đầu hoặc không thể bắt đầu. Lệnh `--notify` tùy chọn nhận một đối tượng `plan-event-v1` cho các sự kiện được hỗ trợ; trình thông báo Dailybot của gói skill chuyển chúng thành cập nhật cho nhóm. Thông báo chỉ báo cáo tiến độ hoặc trở ngại; chúng không cấp quyền cho hành động nào và không thay thế bản ghi kế hoạch.

Báo cáo đội máy và `herdr-peers fleet ui` hiển thị agent và kế hoạch trên nhiều máy, kể cả công việc cần chú ý. Giao diện chỉ đọc: nó không ghi trạng thái kế hoạch và không nhắc agent nào. Nó giúp con người thấy trạng thái của vòng lặp mà không trở thành một mặt phẳng điều khiển khác.

## Ranh giới

Loop engineering khép kín vòng thực thi quanh một đặc tả đã duyệt. Nó biến việc tiếp tục, kế nhiệm và báo cáo thành thường lệ, trong khi kế hoạch vẫn là nguồn quyền hạn và daemon vẫn bị giới hạn. Con người khởi động daemon, xử lý thông tin xác thực và đăng nhập, và chỉ giải quyết các cổng C1–C7 của chính kế hoạch hoặc những nhu cầu khác mà quyền hạn đã ghi không đáp ứng được. Mục tiêu của vòng lặp là một kế hoạch đã duyệt đạt tới điểm kết thúc xác định mà không cần con người trông chừng.
