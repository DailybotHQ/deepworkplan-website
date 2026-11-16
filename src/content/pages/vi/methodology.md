---
title: "Phương pháp luận Deep Work Plan"
description: "Tám chương từ tuyên ngôn tới loop engineering: nguyên tắc, vòng lặp lõi, mẫu, skill, kiểu hình, nhiều agent, bầy agent và vòng lặp của Deep Work Plan."
lastUpdated: 2026-11-16
---

## Phương pháp luận Deep Work Plan

Gói v8 mặc định tạo kế hoạch mới bằng `plan-contract/v8`. Kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận; việc di chuyển cần lệnh `refine migrate` rõ ràng.
Deep Work Plan (DWP) là một phương pháp luận mở, độc lập với framework, để chạy công việc kỹ thuật tự chủ, có cấu trúc cùng các agent lập trình AI. Nó biến một mục tiêu mơ hồ thành một kế hoạch rà soát được mà agent có thể thực thi, tạm dừng, tiếp tục và báo cáo — mà không đánh mất ngữ cảnh.

DWP đứng trên bốn trụ cột — đặc tả trước, repository là harness, loop engineering và hiệu quả đo được. Tóm gọn trong một câu: *Đặc tả trước, vòng lặp khép kín: repository là harness và kế hoạch tự chạy đến khi hoàn thành.*

**Đặc tả trước.** Thay vì coi một bản chép cuộc chat là nguồn chân lý, trước hết bạn viết ra *điều gì* phải đúng — mục tiêu, phạm vi, tiêu chí chấp nhận, và các bước kiểm tra chứng minh nó đã xong — và agent thực thi dựa trên đặc tả đó. Trong DWP, kế hoạch *chính là* đặc tả: kế hoạch → tác vụ nguyên tử → cổng kiểm chứng → hoàn tất. Viết đặc tả trước giúp giảm trôi dạt (agent được đo lường so với các tiêu chí được nêu), làm công việc kiểm chứng được (mỗi cổng hoặc đạt hoặc không đạt), và làm nó tiếp tục được (đặc tả sống lâu hơn bất kỳ phiên hay agent nào). Độc lập với công cụ và thuần repo, nó khác với các hệ thống dựa trên đặc tả bị ràng buộc vào công cụ như GitHub Spec Kit, Amazon Kiro và Tessl.

**Repository là harness.** Một mô hình ngôn ngữ, tự thân nó, chỉ là một bộ dự đoán văn bản; thứ biến nó thành một kỹ sư đáng tin cậy là *harness* bao quanh nó — ngữ cảnh, công cụ, một vòng điều khiển, các hàng rào bảo vệ và trạng thái bền vững. Kỹ thuật harness là việc thiết kế khung giàn đó một cách có chủ đích. Lập trường của DWP là nó nên sống trong repository, không phải trong một công cụ: ngữ cảnh là `AGENTS.md` + `docs/`, công cụ là bộ kit `.agents/`, vòng điều khiển là kế hoạch, hàng rào bảo vệ là các cổng kiểm chứng, và trạng thái là `.dwp/` được gitignore. Vì mỗi phần là một tệp trong repo, harness có tính di động — nên mọi agent đều có thể điều khiển mọi repo.

**Loop engineering.** Một bản đặc tả và một harness làm cho công việc đúng và di động được; loop engineering làm cho nó hoàn thành. Với addon Herdr tùy chọn, một kế hoạch đăng ký lead của nó và, khi kế hoạch nêu tên, những người kế nhiệm; một daemon chỉ do con người khởi động sẽ nhắc lead đang rảnh tiếp tục, đề nghị người kế nhiệm đầu tiên liên lạc được tiếp quản một lead đã không còn, và báo cáo khi kế hoạch đình trệ, bị chặn hoặc hoàn thành. Lời nhắc không thêm quyền hạn — các cổng và việc leo thang của kế hoạch vẫn ràng buộc như trước. Phương pháp luận vẫn hoạt động khi không có vòng lặp; vòng lặp chỉ khuếch đại nó.

**Hiệu quả đo được.** Ngữ cảnh là tài nguyên khan hiếm nhất mà một agent lập trình có, và một phương pháp luận lãng phí nó sẽ thất bại đúng lúc công việc trở nên dài. DWP nạp hướng dẫn theo kiểu tiệm tiến — mỗi phần hướng dẫn được nạp khi tín hiệu kích hoạt của nó phát — chọn kiểm chứng từ những gì mỗi tác vụ thực sự chạm tới, và quyết định skill ngay trong tác vụ. Số byte hướng dẫn mà mỗi luồng cần được đo lường và công bố; không có phần trăm token bịa ra.

Phương pháp luận được trình bày qua tám chương:

1. **Tuyên ngôn** — Deep Work Plan là gì và vì sao thực thi có cấu trúc lại quan trọng.
2. **Vòng lặp lõi** — chu trình lập kế hoạch–thực thi–kiểm chứng dẫn dắt mọi tác vụ.
3. **Mẫu** — các cấu trúc kế hoạch và tác vụ mà agent và con người chia sẻ.
4. **Skill và agent** — cách các command và vai trò agent ăn khớp với nhau, bộ kit sống (cách một repository nuôi lớn skill của riêng nó qua sub-skill author), và các addon tự nguyện như dependency-upgrade và addon design-system cho bất kỳ bề mặt giao diện hướng tới người dùng nào (UI trực quan, đầu ra CLI, hay hội thoại).
5. **Các kiểu hình** — thích ứng phương pháp luận cho repo độc lập và trung tâm điều phối.
6. **Chạy nhiều agent** — một lead và các lane của nó qua pane, container, máy và tài khoản, với một nhánh và một bản phát hành cho mỗi repository.
7. **Tự chủ của bầy agent** — kiểm tra năng lực tại các ranh giới tác vụ, gói bàn giao, kế nhiệm lead theo epoch và chỉ leo thang việc nghiêm trọng, để một bầy agent vượt qua giới hạn của một tài khoản hay sự mất đi của một agent.
8. **Loop engineering** — đăng ký kế hoạch, daemon do con người khởi động, lời nhắc không thêm quyền hạn, chuyển giao cho người kế nhiệm, sự kiện kế hoạch, hàng đợi kế hoạch và bản đồ đội agent.

- [Đọc phương pháp luận](/methodology)
- [Đọc đặc tả](/spec)
- [Duyệt bộ kit](/kit)
