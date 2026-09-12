---
title: Add-on
description: "Addon DWP: bốn phần mở rộng tùy chọn (devcontainer, Dailybot, dependency-upgrade, design-system), đánh giá cục bộ AI Diff Reviewer bắt buộc kèm bề mặt CI tùy chọn, hợp đồng addon và khái niệm kit."
order: 6
lang: vi
section: Addons
---

# Add-on

**Phiên bản 4.0.0.** Add-on là phần mở rộng của phương pháp Deep Work Plan cốt lõi. Bốn trong năm addon là tùy chọn và **không bao giờ bắt buộc để tuân thủ** — kho lưu trữ không có addon tùy chọn nào vẫn hoàn toàn AI-first và tuân thủ DWP. Mỗi addon tùy chọn được đề xuất trong onboarding, chấp nhận hoặc từ chối rõ ràng và — khi được chấp nhận — **đối chiếu** với thiết lập hiện có thay vì ghi đè. Một thành phần là ngoại lệ được khai báo: kể từ chuẩn 2.3.0, **đánh giá cục bộ AI Diff Reviewer** là một phần của chuẩn cơ sở bắt buộc — onboarding cài đặt nó và mọi Final Review chạy nó — trong khi bề mặt CI của nó vẫn là opt-in.

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

Hôm nay có năm addon — bốn addon opt-in cộng với đánh giá cục bộ bắt buộc. Mỗi addon có **trang danh mục kit** với chi tiết hướng người dùng và **spec chuẩn** bên trong skill Deep Work Plan.

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
- **Khi đề xuất:** được đề xuất cho mọi repo có phụ thuộc được khai báo; ủy quyền bất hoạt `/lib-upgrade` được cài dưới sự chấp thuận của onboarding trừ khi bị từ chối rõ ràng — một lần cài đặt không chạy bất kỳ nâng cấp nào

### Design system (addon thứ tư)

`DESIGN.md` phạm vi bề mặt giao diện mà mọi agent mã hóa đọc để đầu ra UI, CLI hoặc hội thoại nhất quán.

- **Trang kit:** [Design system](/kit/design-system)
- **Bổ sung:** `docs/DESIGN.md` (tham chiếu từ `AGENTS.md`) với tối đa ba **hồ sơ** xếp chồng trong một file: **visual-ui** (token và thành phần UI được render), **cli-output** (kiểu terminal ngữ nghĩa, suy giảm TTY/`NO_COLOR`), **conversational** (giọng, giải phẫu thông điệp, render theo nền tảng với fallback văn bản thuần)
- **Độ mạnh hồ sơ:** việc phát hiện khiến đề xuất trở thành bắt buộc; việc cài đặt được kiểm soát bằng sự chấp nhận, như nhau ở cả chế độ có hướng dẫn lẫn chế độ tin cậy — visual-ui **được khuyến nghị mạnh mẽ khi được phát hiện**; cli-output và conversational **khuyến nghị khi phát hiện, luôn hỏi, không bao giờ tự áp dụng**
- **Khi đề xuất:** chỉ khi phát hiện bề mặt giao diện người dùng — không cho thư viện thuần, dịch vụ headless hoặc repo chỉ hạ tầng

### AI Diff Reviewer (addon thứ năm — đánh giá cục bộ bắt buộc, bề mặt CI tùy chọn)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, phiên bản hiện tại **v2.0.1**) trao cho bước rà soát bảo mật của Final Review bắt buộc một đánh giá cục bộ có cấu trúc, và tùy chọn kiểm soát các pull request trong CI. Kể từ chuẩn 2.3.0, **đánh giá cục bộ là một phần của chuẩn cơ sở**; chỉ bề mặt CI là opt-in.

- **Trang kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — tài liệu tham khảo khả năng đầy đủ
- **Bắt buộc tại onboarding (Giai đoạn 7a):** cài đặt skill vendored được ghim theo tag (`npx --yes skills add DailybotHQ/ai-diff-reviewer@v2.0.1 --skill ai-diff-reviewer -y`) cùng `.review/extension.md` được điều chỉnh riêng cho repo (qua `generate-extension`), dưới sự chấp thuận của onboarding; một nâng cấp harness có mục tiêu đối chiếu cả hai khi thiếu; một lần từ chối được ghi lại như một ngoại lệ được khai báo và được `verify` báo cáo cho đến khi được cài đặt
- **Bắt buộc trong mọi Final Review:** bước rà soát bảo mật chạy luồng mặc định cha của skill thượng nguồn trên toàn bộ tập thay đổi đã tích lũy và nối thêm kết quả vào `analysis_results/SECURITY_REVIEW.md` nội bộ của plan (bên trong thư mục riêng của plan, không bao giờ ở thư mục gốc của repo); một skill hoặc tiện ích mở rộng bị thiếu là một phát hiện `local reviewer not installed` được ghi lại — không bao giờ là một lần bỏ qua âm thầm, và không bao giờ là một bootstrap bất ngờ: việc cài đặt thuộc về sự chấp thuận của onboarding hoặc một lời gọi addon rõ ràng; các phát hiện `critical` từ một lượt hoàn tất chặn việc hoàn tất cho đến khi được sửa hoặc được chấp nhận rõ ràng
- **Bề mặt CI tùy chọn (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) qua sub-skill `setup` thượng nguồn, cùng `apply-review` như một công cụ đồng hành do nhà phát triển gọi — được đề xuất rõ ràng, không bao giờ cài khi chưa được yêu cầu, không bao giờ là mặc định, không bao giờ là một tệp nhiệm vụ kế hoạch
- **Không bao giờ chặn (chỉ đối với lỗi gọi):** một đánh giá cục bộ có thể khởi động nhưng gặp lỗi thì cảnh báo một lần, ghi lại và tiếp tục; nó không bao giờ làm thất bại tác vụ
- **Tương đồng (Flow B):** `prompt.md` dùng chung + tiện ích mở rộng căn chỉnh phương pháp luận/mức độ nghiêm trọng; Đánh giá Nhận thức Lặp lại CI có thể rút ngắn vòng 2+ trong khi lượt kiểm tra cục bộ vẫn đầy đủ
- **Rào trung lập với nhà cung cấp:** không luồng Deep Work Plan nào yêu cầu một dịch vụ thương mại, nhà cung cấp CI hay bí mật — reviewer là một skill MIT được ghim theo tag, chạy bởi chính agent lập trình của nhà phát triển
- **Tuân thủ:** `verify` báo cáo một local reviewer bị thiếu như một thất bại đối với các repository khai báo chuẩn 2.3.0 hoặc mới hơn, và như một phát hiện phiên bản harness đối với các repository cũ

## Skill

Skill là quy trình tái sử dụng được gọi theo tên. Skill đóng gói luồng công việc lặp lại (chạy test, sửa lint, tạo thành phần).

Phương pháp cung cấp một tập nhỏ sub-skill cốt lõi. Trong đó, sub-skill **author** cho phép kho lưu trữ **phát triển kit riêng**: gọi qua `/skill-create` và `/agent-create`, suy luận về bố cục `.agents/` và quy ước repo hiện có, rồi viết skill, agent hoặc ủy quyền lệnh mỏng mới phù hợp và giữ danh mục đồng bộ. Cùng sub-skill hậu thuẫn cho bước đối chiếu skill của Final Review.

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

Kho lưu trữ **PHẢI** hoàn toàn tuân thủ với **không** addon tùy chọn nào. Addon là khả năng opt-in xếp lớp — không bao giờ là điều kiện tiên quyết. Xem [Conformance](/spec/conformance).
