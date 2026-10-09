---
title: "Bộ kit Deep Work Plan"
description: "Skill và chín sub-skill của nó, các command, bộ chuyển đổi agent, preset khởi tạo, các addon tự nguyện và ví dụ giúp Deep Work Plan chạy được ở mọi nơi."
lastUpdated: 2026-10-09
---

## Bộ kit Deep Work Plan

Bộ kit là mọi thứ bạn cần để chạy phương pháp luận trong thực tế. Nó được cài từ
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill@v6.0.2 --skill deepworkplan
```

Gói 6.x hiện tại mặc định tạo kế hoạch mới bằng v6. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận; di chuyển cần yêu cầu rõ ràng.

### Skill và các sub-skill của nó

Skill Deep Work Plan là một bộ định tuyến cùng chín sub-skill:

- **create** — phân rã một mục tiêu thành một kế hoạch có cấu trúc (`/dwp-create`).
- **execute** — chạy một kế hoạch từng tác vụ một, kiểm chứng mỗi cổng (`/dwp-execute`).
- **refine** — thêm, bớt hoặc sắp xếp lại các tác vụ trong khi giữ nguyên công việc đã hoàn tất (`/dwp-refine`).
- **resume** — tái dựng trạng thái và tiếp tục một kế hoạch bị gián đoạn (`/dwp-resume`).
- **status** — báo cáo tiến độ mà không thay đổi gì (`/dwp-status`).
- **verify** — kiểm tra một cách khách quan sự tuân thủ của repository và kế hoạch (`/dwp-verify`).
- **onboard** — biến một repository thành AI-first (`/deepworkplan-onboard`).
- **author** — tạo hoặc phát triển skill, agent và command của riêng repo (`/skill-create`, `/agent-create`).
- **upgrade** — đưa skill đã cài sang bản phát hành mới hơn một cách an toàn (`/dwp-upgrade`).

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

### Addon (tùy chọn)

Các năng lực mà luồng onboard bổ sung vào một repo. Bốn addon là tùy chọn và không bao giờ là phần lõi của nền tảng AI-first; đánh giá cục bộ AI Diff Reviewer là bắt buộc kể từ chuẩn 2.3.0:

- **Devcontainer** — một dev container tái lập được, cô lập, với xác thực AI-CLI bền vững.
- **Dailybot** — báo cáo tiến độ và cột mốc theo nỗ lực tối đa cho các đội đang dùng Dailybot.
- **Dependency upgrade** — nâng cấp phụ thuộc độc lập với trình quản lý gói, theo lô, được kiểm chứng, hoàn nguyên được.
- **Design system** — một `DESIGN.md` giới hạn ở bề mặt giao diện (tại `docs/DESIGN.md`, được tham chiếu từ `AGENTS.md`) được suy luận từ nguồn thiết kế thực của repo, với các profile cho UI trực quan, đầu ra CLI có phong cách và nhắn tin hội thoại, để agent sinh ra đầu ra giao diện đúng thương hiệu; khi một hệ thống thiết kế được phát hiện, đề xuất là bắt buộc nhưng việc cài đặt được kiểm soát bằng sự chấp nhận — profile trực quan được khuyến nghị mạnh mẽ khi được phát hiện, các profile CLI và hội thoại được khuyến nghị khi được phát hiện và luôn được hỏi.
- **AI Diff Reviewer** — đánh giá cục bộ bắt buộc: onboarding cài [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, và bước rà soát bảo mật của mọi Final Review chạy nó; Flow B tùy chọn thêm cổng merge PR CI dùng chung extension, được đề xuất rõ ràng và không bao giờ được cài khi chưa được yêu cầu.

### Hệ sinh thái

**Phương pháp hoạt động độc lập. Tiện ích bổ sung khuếch đại nó.** Mỗi addon là một lớp tích hợp mỏng bên trong skill Deep Work Plan, được ghim theo tag vào một sản phẩm có repository, bản phát hành và phiên bản giao diện riêng. Mọi sản phẩm đều hoạt động mà không cần Deep Work Plan, và không addon nào là bắt buộc.

- **Skill Deep Work Plan** — Tạo, thực thi, xác minh, tiếp tục và tinh chỉnh kế hoạch. Không cần addon nào.
- **[herdr](/vi/kit/herdr)** — Các agent ngang hàng trong các pane của Herdr, trên bất kỳ máy nào: ủy thác tương tác với đúng một phản hồi được ủy quyền. Ghim tại `herdr-peers@v0.1.0`.
- **[agentkit](/vi/kit/agentkit)** — Một lệnh ak duy nhất cho mọi agent lập trình trên terminal: ủy thác headless trong một worktree. Ghim tại `coding-agents-kit@v0.1.1`.
- **[devcontainer](/vi/kit/devcontainer)** — Một template Dev Containers và các image cơ sở được phân phối không kèm agent lập trình. Ghim tại `devcontainer-kit@v0.1.4`.
- **[vim](/vi/kit/vim)** — Trình soạn thảo terminal, với trình duyệt kế hoạch chỉ đọc và trình xem Markdown. Ghim tại `deepworkplan-vim@v0.4.2`.

Registry addon và các descriptor được phân phối trong bản beta v7, một bản phát hành trước: `v7.0.0-beta.1`

### Ví dụ

Các bài hướng dẫn trước-và-sau đã thực hiện.

- [Duyệt bộ kit](/kit)
- [Bắt đầu nhanh](/quickstart)
- [Xem ví dụ](/examples)
