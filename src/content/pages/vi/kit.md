---
title: "Bộ kit Deep Work Plan"
description: "Skill và tám sub-skill của nó, các command, bộ chuyển đổi agent, preset khởi tạo, các addon tự nguyện và ví dụ giúp Deep Work Plan chạy được ở mọi nơi."
lastUpdated: 2026-05-31
---

## Bộ kit Deep Work Plan

Bộ kit là mọi thứ bạn cần để chạy phương pháp luận trong thực tế. Nó được cài từ
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### Skill và các sub-skill của nó

Skill Deep Work Plan là một bộ định tuyến cùng tám sub-skill:

- **create** — phân rã một mục tiêu thành một kế hoạch có cấu trúc (`/dwp-create`).
- **execute** — chạy một kế hoạch từng tác vụ một, kiểm chứng mỗi cổng (`/dwp-execute`).
- **refine** — thêm, bớt hoặc sắp xếp lại các tác vụ trong khi giữ nguyên công việc đã hoàn tất (`/dwp-refine`).
- **resume** — tái dựng trạng thái và tiếp tục một kế hoạch bị gián đoạn (`/dwp-resume`).
- **status** — báo cáo tiến độ mà không thay đổi gì (`/dwp-status`).
- **verify** — kiểm tra một cách khách quan sự tuân thủ của repository và kế hoạch (`/dwp-verify`).
- **onboard** — biến một repository thành AI-first (`/deepworkplan-onboard`).
- **author** — tạo hoặc phát triển skill, agent và command của riêng repo (`/skill-create`, `/agent-create`).

### Command

Các slash command mỏng ủy thác tới các sub-skill và addon:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — vòng lặp lập kế hoạch–thực thi–kiểm chứng.
- `skill-create`, `agent-create` — ủy thác tới sub-skill author.
- `lib-upgrade` — ủy thác tới addon dependency-upgrade (chỉ được cài khi addon đó được chấp nhận).

### Bộ chuyển đổi

Các tích hợp mỏng cho từng agent: Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes, và cloud/background agent (tác vụ từ xa Claude Code, Codex cloud, lớp Jules). OpenClaw và Hermes là các nền tảng agent tự chủ chạy các kế hoạch dưới hồ sơ thực thi không có giám sát, được điều khiển bởi lập lịch heartbeat hay cron.

### Preset khởi tạo

Các hướng dẫn suy luận theo từng stack mà luồng onboard dùng để thích ứng tài liệu, skill và lệnh kiểm chứng —
không bao giờ là mẫu cứng. Sáu preset: Django, Vue + Vite, Astro/Svelte, dịch vụ Node/TS, gói/CLI Python,
và một phương án dự phòng chung.

### Addon (tự nguyện)

Các năng lực tùy chọn mà luồng onboard có thể bổ sung vào một repo — không bao giờ là phần lõi của nền tảng AI-first:

- **Devcontainer** — một dev container tái lập được, cô lập, với xác thực AI-CLI bền vững.
- **Dailybot** — báo cáo tiến độ và cột mốc theo nỗ lực tối đa cho các đội đang dùng Dailybot.
- **Dependency upgrade** — nâng cấp phụ thuộc độc lập với trình quản lý gói, theo lô, được kiểm chứng, hoàn nguyên được.
- **Design system** — một `DESIGN.md` giới hạn ở frontend (tại `docs/DESIGN.md`, được tham chiếu từ `AGENTS.md`) được suy luận từ các token thiết kế thực của repo, để agent sinh ra UI đúng thương hiệu; bật mặc định khi một hệ thống thiết kế được phát hiện.

### Ví dụ

Các bài hướng dẫn trước-và-sau đã thực hiện.

- [Duyệt bộ kit](/kit)
- [Bắt đầu nhanh](/quickstart)
- [Xem ví dụ](/examples)
