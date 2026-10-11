---
title: "DWP v7: kế hoạch biết ủy quyền, có ghi nhận mọi thứ"
description: "Deep Work Plan v7 giữ hợp đồng và nhật ký của v6, cho phép kế hoạch giao các tác vụ có giới hạn cho agent khác và bổ sung bốn addon tùy chọn."
date: 2026-10-10
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
---

Deep Work Plan v7 giữ phương pháp của v6: hợp đồng là thẩm quyền, nhật ký chỉ-ghi-thêm là bộ nhớ, bộ lập lịch quyết định việc gì chạy tiếp theo, và một tác vụ chỉ đóng khi bằng chứng đã ghi nhận đáp ứng tiêu chí của nó. v7 bổ sung khả năng ủy quyền và giữ nguyên kỷ luật đó đối với kết quả.

Một kế hoạch cấp `agent_delegation` có thể đánh dấu một tác vụ là `parallel_safe` và giao cho agent khác. Phản hồi của bên được ủy quyền được ghi nhận như dữ liệu, không bao giờ là chỉ dẫn, và giữ trạng thái `asserted` cho đến khi bộ chạy gate của chính kế hoạch quan sát được kết quả. Chỉ bộ chạy mới tạo ra bằng chứng `observed`, nên việc ủy quyền mở rộng phạm vi mà không hạ ngưỡng hoàn thành.

Bốn addon tùy chọn biến việc ủy quyền thành khả năng tự chủ thực dụng. Herdr giao tác vụ cho một agent trong một pane, trên bất kỳ máy nào. Agentkit đặt một lệnh `ak` duy nhất lên trên mọi agent lập trình trong terminal, mặc định tự chủ và có thể tắt, đồng thời chạy các tác vụ có giới hạn ở chế độ headless trong một git worktree. Devcontainer cấp cho mỗi kho mã một container có thể tái tạo, không chứa khóa SSH nào bên trong. DeepWorkPlan Vim là trình soạn thảo terminal có trình duyệt kế hoạch và trình xem Markdown. Mỗi addon được ghim theo tag vào một sản phẩm có kho mã riêng và hoạt động mà không cần Deep Work Plan. Một kho mã vẫn tuân thủ đầy đủ khi không dùng addon nào, và sổ đăng ký trong `.dwp/config.json` ghi lại addon nào đang được bật.

Chế độ benchmark và bài học ghi lại điều mà mỗi kế hoạch mang lại, để các phát hiện có thể được phân tích sau đó. Một cuộc kiểm toán toàn bộ hệ sinh thái, chạy như một kế hoạch điều phối v7 với mỗi kho mã một agent, không phát hiện hồi quy hành vi nào so với v6: bộ kiểm thử của gói vượt qua 807 trên 807 trong môi trường sạch, và tải chỉ dẫn tăng từ 0.1% đến 3.9% mỗi luồng (4.6% cho toàn gói), được đo bằng byte trên cả hai tag thay vì ước tính theo token.

v7 là một bước tiến về điều phối và khả năng kiểm toán, nhưng chưa phải là khả năng tự chủ hoàn toàn không cần can thiệp. Vòng lặp benchmark và bài học chưa tự động đo các kế hoạch v7, và tính không kém hơn của kết quả agent chưa được đo. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận và không bao giờ bị di chuyển ngầm; kế hoạch mới mặc định dùng hợp đồng v7.

Phiên bản skill đã cài: **7.1.4**, ổn định từ 7.0.0.
