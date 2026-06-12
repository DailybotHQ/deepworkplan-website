---
title: Addon
description: "Các phần mở rộng tùy chọn cho phương pháp luận DWP lõi: skill, agent, preset, bộ chuyển đổi và ví dụ, cùng cách mỗi loại mở rộng quy trình mà không bắt buộc."
order: 5
lang: vi
section: Addons
---

# Addon

**Phiên bản 1.0.** Các addon là phần mở rộng tùy chọn cho phương pháp luận DWP lõi. Chúng không bắt buộc để tuân thủ nhưng cung cấp thêm năng lực.

## Skill

Skill là các quy trình tái sử dụng được gọi theo tên. Một skill đóng gói một quy trình lặp lại được (chạy test, sửa lint, tạo một component).

Phương pháp luận đi kèm một tập hợp nhỏ các sub-skill lõi. Trong số đó, sub-skill **author** cho phép một repository **nuôi lớn bộ kit của riêng nó**: được gọi qua `/skill-create` và `/agent-create`, nó suy luận về bố cục và quy ước `.agents/` hiện có của repository, rồi sáng tác một skill, agent, hay bộ ủy thác command mỏng phù hợp với chúng, và giữ catalog đồng bộ. Cùng sub-skill đó thực thi tác vụ Skills & Agents Discovery bắt buộc.

## Agent

Agent là các nhân công chuyên biệt với một vai trò xác định (người rà soát, người thực thi, kiến trúc sư).

## Các addon bảo trì

Các addon bảo trì là các phần mở rộng tự nguyện, không bao giờ bắt buộc để tuân thủ, giúp một repository tự bảo trì. Addon **dependency-upgrade** suy luận về trình quản lý gói thực tế của repository (thay vì giả định npm) và nâng cấp các phụ thuộc theo các lô nhỏ, được kiểm chứng, có thể hoàn nguyên: nó phát hiện trình quản lý từ manifest và lockfile thực, phân loại các nâng cấp theo semver, nâng cấp theo lô, chạy cổng kiểm chứng thực của repository sau mỗi lô, hoàn nguyên bất kỳ lô nào thất bại, và tóm tắt mà không tự động commit. Một addon chỉ được cài khi nó được chấp nhận trong quá trình khởi tạo.

## Addon design-system

Addon **design-system** là một phần mở rộng tự nguyện, giới hạn ở bề mặt giao diện, trao cho một repository một `DESIGN.md` — một tệp hệ thống thiết kế dạng Markdown mà bất kỳ coding agent nào cũng đọc để sinh ra đầu ra giao diện nhất quán với các quy ước của riêng repository. Nó bao quát ba **profile**, được phát hiện độc lập từ các tệp thực và xếp chồng vào cùng một tệp duy nhất: **visual-ui** (UI web/mobile/desktop được render), **cli-output** (đầu ra terminal có phong cách: màu ngữ nghĩa, các thành phần đầu ra như panel và spinner, quy ước bố cục, xuống cấp TTY/`NO_COLOR`), và **conversational** (sản phẩm trò chuyện qua chat hay email: giọng nói và sắc thái, giải phẫu thông điệp, cách render theo từng nền tảng với phương án dự phòng văn bản thuần). Nó suy luận về nguồn thiết kế thực của repository (các CSS custom property, một cấu hình Tailwind, các tệp token, style của component — hay một module hiển thị CLI, hay các helper soạn thông điệp) thay vì sao chép một tệp thương hiệu, và kiểm chứng tính toàn vẹn của từng profile: độ tương phản WCAG AA cho các cặp văn bản trực quan, màu sắc không bao giờ là phương tiện duy nhất mang nghĩa trong đầu ra terminal, phương án dự phòng văn bản thuần cho các thông điệp giàu định dạng, và các tham chiếu token phân giải được. Nó hòa giải một `DESIGN.md` đã có thay vì đè bừa lên nó.

Tệp này nằm tại `docs/DESIGN.md`, đặt cạnh các đặc tả khác của repository, và được tham chiếu từ `AGENTS.md` để agent khám phá ra nó theo cùng cách chúng khám phá phần còn lại của tài liệu (gốc repository chỉ được dùng khi không có cây thư mục `docs/`). Khám phá là bằng tham chiếu, không phải bằng vị trí vật lý. Độ mạnh của các profile khác nhau: **visual-ui bật mặc định khi được phát hiện** — khi một bề mặt UI trực quan hiện diện, quá trình khởi tạo áp dụng nó ở chế độ tin cậy và mạnh mẽ khuyến nghị nó ở chế độ có hướng dẫn — trong khi **cli-output và conversational được khuyến nghị khi được phát hiện và luôn được hỏi, không bao giờ tự động áp dụng**. Addon không bao giờ được đề xuất cho một repository không có bất kỳ bề mặt giao diện nào (một thư viện thuần, một dịch vụ headless, một repository chỉ có hạ tầng), và một repository với không có addon nào vẫn hoàn toàn tuân thủ. Một `DESIGN.md` được tạo trước khi các profile tồn tại là một tệp trực quan đơn-profile hợp lệ — không cần di trú.

Tệp hệ thống thiết kế cấp repository này khác với một tài liệu thiết kế kỹ thuật theo tính năng (`design.md` kiểu "requirements → design → tasks" của các quy trình spec-driven gắn với công cụ). DWP không đi kèm một archetype tài liệu thiết kế theo tính năng riêng: README của một kế hoạch, tiêu chí chấp nhận của mỗi tác vụ, và các cổng kiểm chứng đã bao quát vai trò đó. Addon lấp đúng một khoảng trống mà vai trò đó không lấp: ngữ cảnh thiết kế giao diện bền vững, gốc-repo.

## Preset

Preset thích ứng DWP với một stack công nghệ cụ thể (Django, React, Go).

## Bộ chuyển đổi

Bộ chuyển đổi ánh xạ các command DWP sang hệ thống lệnh của một agent cụ thể (Claude Code, Cursor, Codex).

## Ví dụ

Ví dụ minh họa DWP trong thực tế (so sánh trước/sau, kế hoạch mẫu, nghiên cứu tình huống).
