---
title: Dailybot
description: "Một addon tùy chọn kết nối repo AI-first với một team Dailybot: báo cáo tiến độ và cột mốc ở mức nỗ-lực-tốt-nhất trong thực thi kế hoạch, cùng lớp hook tự hành tùy chọn."
kind: addon
lang: vi
order: 2
---

# Dailybot addon

Đưa tiến độ của Deep Work Plan lên một team Dailybot. Một addon tùy chọn dành cho các team đã dùng Dailybot.

## Addon này bổ sung gì

- Tùy chọn cài đặt skill agent của Dailybot (hiện tại 1.7.x, cũng bổ sung trò chuyện nhóm trên Slack, Microsoft Teams, Discord và Google Chat) và/hoặc Dailybot CLI, thông qua các luồng xin phép riêng của chúng.
- Một báo cáo tiến độ/cột mốc ở mức nỗ-lực-tốt-nhất được gắn vào quá trình thực thi kế hoạch, để khi hoàn thành một kế hoạch, kết quả hiển thị tới team.
- Một lớp hook xác định tùy chọn (skill agent của Dailybot 1.6.0+, CLI 1.12.0+): các hook của harness được commit phát hiện công việc chưa báo cáo từ một sổ cái cục bộ và nhắc agent ở cuối lượt, để việc báo cáo vẫn tự hành ngay cả trong các phiên dài không giám sát, nơi chỉ dẫn trong prompt phai dần.

## Hành vi

Addon này **ủy thác** — nó không phát minh lại. Skill agent của Dailybot tự quản lý việc cài đặt, xin phép, xác thực, các mẫu hook và phong cách viết; addon này chỉ đề nghị cài đặt nó, gắn thêm bước báo cáo tùy chọn và đề xuất cấu hình hook ở cấp repo. Báo cáo hoàn toàn ở mức nỗ-lực-tốt-nhất và không bao giờ chặn công việc nếu Dailybot vắng mặt, chưa xác thực, hoặc không thể kết nối.

Hai lớp này phối hợp mà không báo cáo trùng: một báo cáo vòng đời thành công sẽ đặt lại sổ cái của hook, nên các hook im lặng sau một báo cáo và chỉ đóng vai trò chốt chặn xác định khi một sự kiện vòng đời bị bỏ lỡ. Các lệnh hook chỉ đọc trạng thái cục bộ và luôn thoát với mã không, nên chúng cũng không bao giờ có thể chặn công việc.

## Ghi chú

Phương pháp luận cốt lõi của Deep Work Plan **không** phụ thuộc chút nào vào Dailybot. Chỉ đề nghị nó khi nhà phát triển hoặc team đã dùng Dailybot; không bao giờ tự động cài cho tất cả mọi người.
