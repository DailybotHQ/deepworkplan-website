---
title: "DWP v7: kế hoạch biết ủy quyền, có ghi nhận mọi thứ"
description: "Deep Work Plan v7 giữ hợp đồng và nhật ký của v6, cho phép kế hoạch giao các tác vụ có giới hạn cho agent khác và bổ sung bốn addon tùy chọn."
date: 2026-10-09
version: "v7 · Ủy quyền có bằng chứng"
kind: release
lang: vi
order: 0
featured: true
sourceLabel: "Bộ schema v7 đã công bố"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
---

Deep Work Plan v7 giữ phương pháp của v6: hợp đồng là thẩm quyền, nhật ký chỉ-ghi-thêm là bộ nhớ, bộ lập lịch quyết định việc gì chạy tiếp theo, và một tác vụ chỉ đóng khi bằng chứng đã ghi nhận đáp ứng tiêu chí của nó. v7 bổ sung khả năng ủy quyền và giữ nguyên kỷ luật đó đối với kết quả.

Một kế hoạch cấp `agent_delegation` có thể đánh dấu một tác vụ là `parallel_safe` và giao cho agent khác. Phản hồi của bên được ủy quyền được ghi nhận như dữ liệu, không bao giờ là chỉ dẫn, và giữ trạng thái `asserted` cho đến khi bộ chạy gate của chính kế hoạch quan sát được kết quả. Chỉ bộ chạy mới tạo ra bằng chứng `observed`, nên việc ủy quyền mở rộng phạm vi mà không hạ ngưỡng hoàn thành.

Bốn addon tùy chọn biến việc ủy quyền thành khả năng tự chủ thực dụng. Herdr giao tác vụ cho một agent trong một pane, trên bất kỳ máy nào. Agentkit đặt một lệnh `ak` duy nhất lên trên mọi agent lập trình trong terminal, mặc định tự chủ và có thể tắt, đồng thời chạy các tác vụ có giới hạn ở chế độ headless trong một git worktree. Devcontainer cấp cho mỗi kho mã một container có thể tái tạo, mặc định không chứa khóa SSH nào bên trong (git qua SSH thông qua host agent; các tệp khóa chỉ xuất hiện khi chọn tham gia rõ ràng với `[ssh] copy_keys`). DeepWorkPlan Vim là trình soạn thảo terminal có trình duyệt kế hoạch và trình xem Markdown. Mỗi addon được ghim theo tag vào một sản phẩm có kho mã riêng và hoạt động mà không cần Deep Work Plan. Một kho mã vẫn tuân thủ đầy đủ khi không dùng addon nào, và sổ đăng ký trong `.dwp/config.json` ghi lại addon nào đang được bật.

Chế độ benchmark và bài học ghi lại điều mà mỗi kế hoạch mang lại, để các phát hiện có thể được phân tích sau đó. Một cuộc kiểm toán toàn bộ hệ sinh thái, chạy như một kế hoạch điều phối v7 với mỗi kho mã một agent, không phát hiện hồi quy hành vi nào so với v6: bộ kiểm thử của gói vượt qua 807 trên 807 trong môi trường sạch, và tải chỉ dẫn tăng từ 0.1% đến 3.9% mỗi luồng (4.6% cho toàn gói), được đo bằng byte trên cả hai tag thay vì ước tính theo token.

v7 là một bước tiến về điều phối và khả năng kiểm toán, nhưng chưa phải là khả năng tự chủ hoàn toàn không cần can thiệp. Bản phát hành 7.2.0 khắc phục các khoảng trống mà cuộc kiểm toán đó phát hiện: benchmark và bài học nay đo được các kế hoạch v7, việc bắt đầu một tác vụ trước khi các điều kiện tiên quyết hoàn tất sẽ bị từ chối, và bộ kiểm thử chạy theo cách hermetic (815 trên 815 trong môi trường sạch). Tính không kém hơn của kết quả agent chưa được đo. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận và không bao giờ bị di chuyển ngầm; kế hoạch mới mặc định dùng hợp đồng v7.

Bản phát hành 7.6.0 (2026-10-11) đã giới thiệu khả năng điều phối quy mô lớn: mỗi kho mã hoặc luồng công việc một làn (lane), tài khoản được chọn theo dung lượng còn lại (`ak usage`, `ak pick`), khởi chạy không cần giám sát và quy trình làm quen phát hiện mọi addon, nâng cấp các addon đang dùng và đề xuất các addon phù hợp.

Bản phát hành 7.7.0 (2026-10-12) mang đến khả năng tự chủ theo bầy đàn (Hướng dẫn §17): vòng lặp năng lực (`shared/swarm.py`), các gói bàn giao (`dwp-handoff-v1`), sự kế nhiệm của trưởng nhóm với các kỷ nguyên và rào chắn, yêu cầu giữa các làn, phân loại báo cáo leo thang AGENT_PROTOCOL §7.5 (C1–C7: quyết định và ghi lại mọi việc còn lại), tiêu chuẩn chất lượng (cổng kiểm tra là giả thuyết, được xác minh chứ không chỉ khẳng định) và bài học phương pháp luận từ 313 kế hoạch được thực thi trên 23 kho mã. Hạn chế đã biết: nhật ký v7 không có sự kiện riêng cho việc bàn giao làn hoặc kế nhiệm trưởng nhóm (chúng được ghi nhận là một ủy quyền bị hủy cộng với một quan sát).

Bản phát hành 7.8.0 (2026-10-13) thiết lập Ecosystem 1.0: mọi sản phẩm mà gói tích hợp đều đạt bản phát hành ổn định đầu tiên và được ghim ở v1.0.0 theo quy tắc đánh phiên bản ngữ nghĩa (coding-agents-kit, herdr-peers, devcontainer-kit và deepworkplan-vim, mỗi sản phẩm kèm mã băm `SHA256SUMS` đã xác minh), cùng với các bản ghim AI Diff Reviewer v3.3.14 và Dailybot agent-skill v3.23.17; sau đó 7.8.1 (2026-10-14) ghim các bản vá v1.0.1 của coding-agents-kit và devcontainer-kit.

Phiên bản skill đã cài: **7.9.0**, ổn định từ 7.0.0.
