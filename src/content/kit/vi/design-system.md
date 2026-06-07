---
title: Hệ thống thiết kế
description: "Một addon tự nguyện, giới hạn ở frontend, trao cho một repo một DESIGN.md (dưới docs/, được lập chỉ mục từ AGENTS.md) để bất kỳ coding agent nào cũng sinh ra UI nhất quán với hệ thống thiết kế của riêng repo."
kind: addon
lang: vi
order: 4
---

# Addon design-system

Trao cho một repository frontend/UI một `DESIGN.md` — một tệp hệ thống thiết kế dạng Markdown mà bất kỳ coding agent nào cũng đọc để sinh ra UI nhất quán với hệ thống thiết kế **của riêng** repo, thay vì các giá trị mặc định không có phong cách, phổ biến về mặt thống kê mà một agent rơi về khi không có chỉ dẫn. Addon tự nguyện thứ tư của Deep Work Plan.

## Nó thêm những gì

- Một `DESIGN.md` tại `docs/DESIGN.md` (đặt cạnh các đặc tả khác của repo; chỉ đặt tại gốc repo khi không có cây thư mục `docs/`), **được tham chiếu từ `AGENTS.md`** để agent khám phá ra nó như phần còn lại của tài liệu.
- Các phần chuẩn tắc: tổng quan/bầu không khí, bảng màu & vai trò màu (sáng + tối), kiểu chữ, bố cục & khoảng cách, độ nâng & chiều sâu, hình khối, component, hành vi responsive, nên & không nên (gồm cả các quy tắc khả truy cập của repo), và một hướng dẫn prompt cho agent.
- Một bước kiểm chứng kiểm tra rằng tệp đã hoàn chỉnh, rằng độ tương phản văn bản được tài liệu hóa đạt WCAG AA, và rằng các tham chiếu token phân giải được.

## Hành vi

- **Suy luận, đừng sao chép.** Mỗi giá trị được suy ra từ nguồn thiết kế thực của repo — stylesheet, các CSS custom property, cấu hình Tailwind, các tệp token, hay style của component. Nó không bao giờ dán `DESIGN.md` của một thương hiệu bên thứ ba; các catalog tham chiếu là nguồn cảm hứng cho cấu trúc, không bao giờ cho nội dung.
- **Hòa giải, đừng đè bừa.** Một `DESIGN.md` hay nguồn token đã có được hòa giải theo cách bổ sung, không bao giờ bị ghi đè; các thay đổi phá hủy đòi hỏi sự chấp thuận.
- **Khám phá bằng tham chiếu.** Dù `DESIGN.md` nằm ở đâu, `AGENTS.md` (và `CLAUDE.md`) cũng tham chiếu tới nó — con trỏ, chứ không phải vị trí vật lý, mới là thứ bảo đảm agent nạp nó.
- **Thực dụng, không ràng buộc cứng.** Nó tham chiếu quy ước `DESIGN.md` đang nổi lên như một hình mẫu để noi theo, nhưng vẫn lấy Markdown làm chính và không ràng buộc vào bất kỳ một lược đồ token đơn lẻ nào.

## Giới hạn ở frontend, bật mặc định khi được phát hiện

Addon này dành cho các repo có một bề mặt UI thực — một stylesheet với các CSS custom property, một cấu hình Tailwind hay khối `@theme`, các component UI, hay một hướng dẫn thương hiệu/phong cách. Nó **không bao giờ** được đề xuất cho một repo chỉ có backend, CLI, hay thư viện. Khi một bề mặt UI **thực sự** được phát hiện, quá trình khởi tạo xem nó là **bật mặc định**: nó áp dụng addon ở chế độ tin cậy và mạnh mẽ khuyến nghị nó ở chế độ có hướng dẫn. Nó không bao giờ bắt buộc — một repository với không có addon nào vẫn hoàn toàn tuân thủ, và bạn luôn có thể từ chối.

## Command tùy chọn

Khi được chấp nhận, addon có thể cài một bộ ủy thác `/design-system` vào `.agents/commands/` của repo để tái sinh hay làm mới `DESIGN.md` về sau. Việc cài command là tùy chọn; một addon bị từ chối không cài gì cả.

## Quan hệ với các tài liệu thiết kế theo tính năng

Đây là một tệp hệ thống thiết kế **cấp repo, bền vững** — khác với một tài liệu thiết kế kỹ thuật theo tính năng (`design.md` kiểu "requirements → design → tasks" của các quy trình spec-driven gắn với công cụ). Deep Work Plan chủ ý không đi kèm một archetype tài liệu thiết kế theo tính năng riêng: README của một kế hoạch, tiêu chí chấp nhận của mỗi tác vụ, và các cổng kiểm chứng đã bao quát vai trò đó. Addon này lấp đúng một khoảng trống mà vai trò đó không lấp: ngữ cảnh thiết kế UI bền vững, gốc-repo.
