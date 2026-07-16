---
title: Add-on
description: "Phần mở rộng DWP tùy chọn: năm addon (devcontainer, Dailybot, dependency-upgrade, design-system, AI Diff Reviewer), hợp đồng addon và khái niệm kit."
order: 5
lang: vi
section: Addons
---

# Add-on

**Phiên bản 2.0.** Add-on là phần mở rộng tùy chọn của phương pháp Deep Work Plan cốt lõi. Chúng **không bao giờ bắt buộc để tuân thủ** — kho lưu trữ không có addon vẫn hoàn toàn AI-first và tuân thủ DWP. Mỗi addon được đề xuất trong onboarding, chấp nhận hoặc từ chối rõ ràng và — khi được chấp nhận — **đối chiếu** với thiết lập hiện có thay vì ghi đè.

## Hợp đồng addon

Mỗi addon đang phát hành cung cấp bốn thành phần bắt buộc:

| Thành phần | Mục đích |
|-----------|---------|
| **Spec** | Mô tả chuẩn RFC-2119 về addon cung cấp gì và "tuân thủ addon này" nghĩa là gì |
| **Reasoning templates** | Hướng dẫn agent điền bằng cách suy luận về stack repo đích — không sao chép |
| **Onboarding hook** | Điểm vào `SKILL.md` mà luồng `onboard` gọi khi nhà phát triển chấp nhận |
| **Validation step** | Checklist xác nhận addon được áp dụng đúng |

Khám phá: luồng `onboard` liệt kê `skills/deepworkplan/addons/` và trình bày mỗi addon như bước opt-in trong **Giai đoạn 7b**, sau scaffolding cốt lõi.

## Addon đang phát hành (năm)

Hôm nay có năm addon. Mỗi addon có **trang danh mục kit** với chi tiết hướng người dùng và **spec chuẩn** bên trong skill Deep Work Plan.

### Devcontainer (addon đầu tiên)

Thiết lập `.devcontainer/` + `docker/` dựa trên compose, suy luận từ stack được phát hiện.

- **Trang kit:** [Devcontainer](/kit/devcontainer)
- **Bổ sung:** volume xác thực AI-CLI bền vững (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, alias xác thực (`codecheck`, `check`, `fix`, `test`), vệ sinh bí mật OSS công khai
- **Hành vi:** ~85% khung ổn định; ~15% suy luận theo stack. Devcontainer hiện có được đối chiếu, không bao giờ ghi đè
- **Khi đề xuất:** hầu hết repo có Docker hoặc dịch vụ hưởng lợi từ dev container cô lập

### Dailybot (addon thứ hai)

Kết nối opt-in tới **nhóm Dailybot** của nhà phát triển để hiển thị tiến độ agent.

- **Trang kit:** [Dailybot](/kit/dailybot) — tham chiếu khả năng đầy đủ
- **Addon DWP kết nối:** bốn báo cáo vòng đời kế hoạch (kickoff, significant task, blocked, completion) qua sub-skill dailybot `report`; thực thi hook xác định tùy chọn (`dailybot hook`, CLI `>= 3.7.0`)
- **Skill đi kèm:** cài [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (hiện tại **3.10.3**) mở **14 khả năng** — chat trên Slack/Teams/Discord/Google Chat, check-in, tác giả biểu mẫu, ask AI, kudos, API key theo repo (`.dailybot/env.json`), email và hơn thế. Addon DWP chỉ kết nối **report**; khả năng khác được gọi trực tiếp qua skill Dailybot
- **Auth:** hoàn toàn hoãn sang skill Dailybot (`dailybot login` hoặc `DAILYBOT_API_KEY`); addon này không bao giờ lưu thông tin xác thực
- **Rào vendor-neutral:** DWP cốt lõi **không** phụ thuộc Dailybot; không bao giờ tự cài cho mọi người
- **Khi đề xuất:** nhà phát triển hoặc nhóm đã dùng Dailybot, hoặc yêu cầu rõ ràng báo cáo nhóm

### Dependency upgrade (addon thứ ba)

Nâng cấp phụ thuộc không phụ thuộc package manager, theo lô, đã xác thực, có thể hoàn tác.

- **Trang kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Bổ sung:** phát hiện trình quản lý **thực** của repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), nâng cấp theo lô phân loại semver, chạy validation gate repo sau mỗi lô, hoàn tác thất bại, tóm tắt không tự commit
- **Lệnh:** cài `/lib-upgrade` vào `.agents/commands/` chỉ khi được chấp nhận
- **Khi đề xuất:** có lockfile và stack nhiều phụ thuộc; chỉ khuyến nghị khi liên quan

### Design system (addon thứ tư)

`DESIGN.md` phạm vi bề mặt giao diện mà mọi agent mã hóa đọc để đầu ra UI, CLI hoặc hội thoại nhất quán.

- **Trang kit:** [Design system](/kit/design-system)
- **Bổ sung:** `docs/DESIGN.md` (tham chiếu từ `AGENTS.md`) với tối đa ba **hồ sơ** xếp chồng trong một file: **visual-ui** (token và thành phần UI được render), **cli-output** (kiểu terminal ngữ nghĩa, suy giảm TTY/`NO_COLOR`), **conversational** (giọng, giải phẫu thông điệp, render theo nền tảng với fallback văn bản thuần)
- **Độ mạnh hồ sơ:** visual-ui **bật mặc định khi phát hiện**; cli-output và conversational **khuyến nghị khi phát hiện, luôn hỏi, không bao giờ tự áp dụng**
- **Khi đề xuất:** chỉ khi phát hiện bề mặt giao diện người dùng — không cho thư viện thuần, dịch vụ headless hoặc repo chỉ hạ tầng

### AI Diff Reviewer (addon thứ năm)

Kết nối tùy chọn với **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, phiên bản hiện tại **v2.0.0**) tăng cường Đánh giá Bảo mật bắt buộc với đánh giá cục bộ có cấu trúc và tùy chọn kiểm soát các pull request trong CI.

- **Trang kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — tài liệu tham khảo khả năng đầy đủ
- **Những gì DWP addon kết nối:** tăng cường Đánh giá Bảo mật cục bộ qua luồng mặc định của skill thượng nguồn; `.review/extension.md` bắt buộc (skill đơn lẻ là chưa đủ); Flow B tùy chọn cài đặt `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) và hiển thị `apply-review` như một công cụ đồng hành do nhà phát triển gọi — không bao giờ là tệp nhiệm vụ kế hoạch
- **Luồng:** **A — chỉ cục bộ** (skill + tiện ích mở rộng) hoặc **B — hai bề mặt** (skill + tiện ích mở rộng + CI Action). Addon **PHẢI hỏi** luồng nào; không bao giờ mặc định
- **Thất bại nhẹ vs cổng:** lỗi skill/tiện ích mở rộng/gọi bị thiếu không bao giờ chặn; kết quả `critical` từ lượt kiểm tra cục bộ **hoàn tất** vẫn theo hợp đồng Đánh giá Bảo mật
- **Tương đồng (Flow B):** `prompt.md` dùng chung + tiện ích mở rộng căn chỉnh phương pháp luận/mức độ nghiêm trọng; Đánh giá Nhận thức Lặp lại CI có thể rút ngắn vòng 2+ trong khi lượt kiểm tra cục bộ vẫn đầy đủ
- **Bảo vệ trung lập với nhà cung cấp:** DWP cốt lõi có **không** phụ thuộc AI Diff Reviewer; không bao giờ cài đặt tự động cho tất cả mọi người
- **Khi nào được cung cấp:** nhà phát triển hoặc nhóm muốn đánh giá cục bộ có cấu trúc và/hoặc cổng hợp nhất PR CI

## Skill

Skill là quy trình tái sử dụng được gọi theo tên. Skill đóng gói luồng công việc lặp lại (chạy test, sửa lint, tạo thành phần).

Phương pháp cung cấp một tập nhỏ sub-skill cốt lõi. Trong đó, sub-skill **author** cho phép kho lưu trữ **phát triển kit riêng**: gọi qua `/skill-create` và `/agent-create`, suy luận về bố cục `.agents/` và quy ước repo hiện có, rồi viết skill, agent hoặc ủy quyền lệnh mỏng mới phù hợp và giữ danh mục đồng bộ. Cùng sub-skill thực hiện tác vụ bắt buộc Skills & Agents Discovery.

Mục kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agent

Agent là công nhân chuyên biệt với vai trò xác định (reviewer, executor, architect). Chúng nằm trong `.agents/agents/` và được liệt kê trong `.agents/docs/`.

## Addon bảo trì

Addon **dependency-upgrade** (ở trên) là addon bảo trì chính. Nó suy luận về package manager thực của repo thay vì giả định npm, phân loại nâng cấp theo semver, nâng cấp theo lô an toàn, chạy xác thực sau mỗi lô và hoàn tác lô thất bại.

## Addon design-system

Xem [Design system](/kit/design-system) trong addon đang phát hành. `DESIGN.md` cấp repo khác với tài liệu thiết kế kỹ thuật theo tính năng: README kế hoạch DWP, tiêu chí chấp nhận tác vụ và validation gate đã bao phủ thiết kế theo tính năng. Addon design-system lấp ngữ cảnh thiết kế **giao diện** bền vững, native repo.

## Preset

Preset điều chỉnh DWP cho stack công nghệ cụ thể (Django, React, Go, Astro + Svelte và hơn thế). Duyệt [danh mục kit](/kit).

## Adapter

Adapter ánh xạ lệnh DWP sang hệ thống lệnh của agent cụ thể (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw và khác). Mục adapter nằm trong kit dưới tên từng agent.

## Ví dụ

Ví dụ minh họa DWP trong thực tế: so sánh trước/sau, kế hoạch mẫu, nghiên cứu điển hình. Xem [Examples](/examples) và [Dogfood this site](/kit/dogfood-this-site).

## Nhắc tuân thủ

Kho lưu trữ **PHẢI** hoàn toàn tuân thủ với **không** addon. Addon là khả năng opt-in xếp lớp — không bao giờ là điều kiện tiên quyết. Xem [Conformance](/spec/conformance).
