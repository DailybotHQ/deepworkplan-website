---
title: Hệ thống thiết kế
description: "Một addon tự nguyện trao cho bất kỳ repo nào có bề mặt giao diện hướng tới người dùng một DESIGN.md (dưới docs/, được lập chỉ mục từ AGENTS.md) — bao quát các profile UI trực quan, đầu ra CLI và hội thoại trong một tệp duy nhất."
kind: addon
lang: vi
order: 4
---

# Addon design-system

Trao cho một repository có **bề mặt giao diện hướng tới người dùng** một `DESIGN.md` — một tệp hệ thống thiết kế dạng Markdown mà bất kỳ coding agent nào cũng đọc để sinh ra đầu ra giao diện nhất quán với các quy ước **của riêng** repo, thay vì các giá trị mặc định không có phong cách, phổ biến về mặt thống kê mà một agent rơi về khi không có chỉ dẫn. Addon tự nguyện thứ tư của Deep Work Plan.

Một "bề mặt giao diện" mang nghĩa số nhiều: một **UI trực quan** được render, **đầu ra CLI** có phong cách, và một bề mặt **hội thoại** (sản phẩm trò chuyện qua chat hay email) đều được tính. Addon phát hiện từng bề mặt một cách độc lập như một **profile**, và các profile được chấp nhận xếp chồng vào cùng một `DESIGN.md` duy nhất.

## Nó thêm những gì

- Một `DESIGN.md` tại `docs/DESIGN.md` (đặt cạnh các đặc tả khác của repo; chỉ đặt tại gốc repo khi không có cây thư mục `docs/`), **được tham chiếu từ `AGENTS.md`** để agent khám phá ra nó như phần còn lại của tài liệu. Một repo, một tệp — không bao giờ là các tệp anh em theo từng bề mặt.
- **Profile `visual-ui`** — các phần trực quan chuẩn tắc: tổng quan/bầu không khí, bảng màu & vai trò màu (sáng + tối), kiểu chữ, bố cục & khoảng cách, độ nâng & chiều sâu, hình khối, component, hành vi responsive, nên & không nên (gồm cả các quy tắc khả truy cập của repo).
- **Profile `cli-output`** — các giao diện terminal có phong cách: giọng đầu ra, màu sắc & phong cách ngữ nghĩa (success/error/warning/info/dim ánh xạ tới theme thực), các thành phần đầu ra (panel, bảng, spinner, prompt tương tác — được đặt tên theo các helper thực của repo), quy ước bố cục, và các quy tắc xuống cấp (TTY so với pipe, `NO_COLOR`, kỷ luật stdout/stderr, mã thoát).
- **Profile `conversational`** — bề mặt nhắn tin của sản phẩm: giọng nói & sắc thái (tông, độ ngắn gọn, quy tắc đặt tên thương hiệu), giải phẫu thông điệp (DM, bài đăng kênh, trả lời thread, chỉnh sửa tại chỗ), và cách render theo từng nền tảng (mrkdwn của Slack, markdown của Discord, adaptive card của Teams, email) với các phương án dự phòng văn bản thuần.
- Một hướng dẫn prompt cho agent dùng chung, cùng một bước kiểm chứng kiểm tra tính toàn vẹn của từng profile: độ tương phản văn bản được tài liệu hóa đạt WCAG AA (trực quan), màu sắc không bao giờ là phương tiện duy nhất mang nghĩa (CLI), các bản render giàu định dạng ghi chú phương án dự phòng văn bản thuần (hội thoại), và các tham chiếu token phân giải được.

## Hành vi

- **Suy luận, đừng sao chép.** Mỗi giá trị được suy ra từ nguồn thiết kế thực của repo — stylesheet, các CSS custom property, cấu hình Tailwind, các tệp token, style của component, module hiển thị/theme CLI của nó, hay các helper soạn thông điệp của nó. Nó không bao giờ dán `DESIGN.md` của một thương hiệu bên thứ ba hay nhập nguyên khối các quy ước của một sản phẩm khác; các catalog tham chiếu là nguồn cảm hứng cho cấu trúc, không bao giờ cho nội dung.
- **Hòa giải, đừng đè bừa.** Một `DESIGN.md` hay nguồn token đã có được hòa giải theo cách bổ sung, không bao giờ bị ghi đè; việc thêm một profile mới được chấp nhận sẽ nối thêm các phần của nó mà không viết lại phần còn lại; các thay đổi phá hủy đòi hỏi sự chấp thuận.
- **Khám phá bằng tham chiếu.** Dù `DESIGN.md` nằm ở đâu, `AGENTS.md` (và `CLAUDE.md`) cũng tham chiếu tới nó — con trỏ, chứ không phải vị trí vật lý, mới là thứ bảo đảm agent nạp nó.
- **Thực dụng, không ràng buộc cứng.** Nó tham chiếu quy ước `DESIGN.md` đang nổi lên như một hình mẫu để noi theo, mở rộng quy ước đó sang các bề mặt phi trực quan, và vẫn lấy Markdown làm chính mà không ràng buộc vào bất kỳ một lược đồ token đơn lẻ nào.

## Giới hạn ở giao diện, với độ mạnh theo từng profile

Addon này dành cho các repo có ít nhất một bề mặt giao diện thực; nó không bao giờ được đề xuất cho một repo không có bề mặt nào (một thư viện thuần, một dịch vụ headless, một repo chỉ có hạ tầng). Mỗi profile mang độ mạnh khuyến nghị riêng của nó:

- **`visual-ui` bật mặc định khi được phát hiện** — một stylesheet với các CSS custom property, một cấu hình Tailwind hay khối `@theme`, các component UI, hay một hướng dẫn thương hiệu/phong cách. Quá trình khởi tạo áp dụng nó ở chế độ tin cậy và mạnh mẽ khuyến nghị nó ở chế độ có hướng dẫn.
- **`cli-output` và `conversational` được khuyến nghị khi được phát hiện — và luôn được hỏi, không bao giờ tự động áp dụng**, kể cả ở chế độ tin cậy. Một thư viện render CLI cộng với một lớp hiển thị có chủ đích báo hiệu profile thứ nhất; một SDK nền tảng chat hay một lớp soạn thông điệp báo hiệu profile thứ hai. Một trình phân tích đối số trần với các lệnh in thô không đủ điều kiện.

Nó không bao giờ bắt buộc — một repository với không có addon nào vẫn hoàn toàn tuân thủ, và bạn luôn có thể từ chối bất kỳ profile nào hay toàn bộ addon. Một `DESIGN.md` được tạo trước khi các profile tồn tại là một tệp trực quan đơn-profile hợp lệ: không cần di trú.

## Command tùy chọn

Khi được chấp nhận, addon có thể cài một bộ ủy thác `/design-system` vào `.agents/commands/` của repo để tái sinh hay làm mới `DESIGN.md` về sau. Việc cài command là tùy chọn; một addon bị từ chối không cài gì cả.

## Quan hệ với các tài liệu thiết kế theo tính năng

Đây là một tệp hệ thống thiết kế **cấp repo, bền vững** — khác với một tài liệu thiết kế kỹ thuật theo tính năng (`design.md` kiểu "requirements → design → tasks" của các quy trình spec-driven gắn với công cụ). Deep Work Plan chủ ý không đi kèm một archetype tài liệu thiết kế theo tính năng riêng: README của một kế hoạch, tiêu chí chấp nhận của mỗi tác vụ, và các cổng kiểm chứng đã bao quát vai trò đó. Addon này lấp đúng một khoảng trống mà vai trò đó không lấp: ngữ cảnh thiết kế giao diện bền vững, gốc-repo.
