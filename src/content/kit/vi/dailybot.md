---
title: Dailybot
description: "Addon DWP opt-in: kết nối vòng đời kế hoạch với nhóm Dailybot, thực thi hook tùy chọn và skill agent Dailybot đầy đủ 3.10.3 (chat, check-in, biểu mẫu, ask AI và hơn thế nữa)."
kind: addon
lang: vi
order: 2
---

# Addon Dailybot

Kết nối thực thi Deep Work Plan với **nhóm Dailybot** để con người thấy agent đang xây dựng gì — kickoff, tiến độ giữa kế hoạch, trở ngại và hoàn thành — mà không thêm cuộc họp hay toolchain thứ hai. Addon **opt-in** cho các nhóm đã dùng [Dailybot](https://www.dailybot.com).

Phương pháp Deep Work Plan cốt lõi có **không** phụ thuộc Dailybot. Kho lưu trữ không có addon vẫn hoàn toàn tuân thủ. Chỉ đề xuất addon này khi nhà phát triển hoặc nhóm đã dùng Dailybot; không bao giờ tự động cài cho mọi người.

## Khi nào dùng

| Tín hiệu | Hành động |
|--------|--------|
| Nhóm đã dùng Dailybot (Slack, Teams, Discord, Google Chat hoặc dashboard) | **Đề xuất** trong onboarding |
| Nhà phát triển yêu cầu hiển thị tiến độ agent hoặc cập nhật kiểu standup | **Đề nghị** addon |
| Repo greenfield không có tài khoản Dailybot | **Bỏ qua** — baseline vendor-neutral là đủ |
| Công việc khách hàng theo NDA mà tiến độ không được rời khỏi repo | **Bỏ qua**, hoặc commit `.dailybot/disabled` làm kill-switch cục bộ |

## Addon này kết nối gì (cố ý hẹp)

Addon DWP Dailybot **không** tái phát minh Dailybot. Nó kết nối thực thi kế hoạch với sub-skill dailybot **`report`** và tùy chọn commit hook harness. Mọi thứ khác — cài đặt, đồng ý, xác thực, phong cách viết — được **hoãn** sang [skill agent Dailybot](https://github.com/DailybotHQ/agent-skill) chính thức (hiện tại **3.10.3**).

### Bốn sự kiện vòng đời

Trong DWP `create` / `execute`, addon kết nối **bốn cập nhật agent best-effort**. Mỗi sự kiện có điều kiện (Dailybot có mặt và đã xác thực), không chặn và tôn trọng `.dailybot/disabled`.

| Sự kiện | Kích hoạt | Cấp độ | Yêu cầu |
|-------|---------|-------|-------------|
| **Kickoff** | Kế hoạch được hiện thực hóa và phê duyệt, hoặc lượt `execute` đầu tiên | regular | SHOULD |
| **Significant task** | Hoàn thành tính năng, sửa lỗi hoặc refactor lớn — không phải việc setup | regular | MAY |
| **Blocked** | Kế hoạch dừng; `state.json.blocked` được điền (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | Mọi tác vụ xong; kế hoạch kết thúc | **milestone** | SHOULD |

Payload lấy từ lớp trạng thái kế hoạch (`state.json`) khi có: `completed` là kết quả (không phải số tác vụ), `in_progress` từ tác vụ hiện tại, `blockers` từ `state.json.blocked`. Thông điệp mô tả **đã xây dựng gì và vì sao** — không bao giờ đường dẫn file, thống kê git, tên nhánh hay ID kế hoạch.

### Thực thi hook tùy chọn

Với `dailybot-cli >= 3.7.0`, addon **có thể** commit hook harness cấp repo (`dailybot hook session-start | activity | post-commit | stop | dismiss`) được hỗ trợ bởi sổ cái cục bộ theo repo. Harness nhắc agent ở cuối lượt khi sự kiện vòng đời bị bỏ lỡ — quan trọng cho phiên dài không giám sát mà hướng dẫn prompt suy yếu.

Báo cáo vòng đời thành công **đặt lại** sổ cái hook, nên hai lớp không bao giờ báo cáo trùng. Lệnh hook chỉ đọc trạng thái cục bộ và luôn thoát `0`.

### Danh tính repo và chính sách báo cáo

Tùy chọn commit `.dailybot/profile.json` (hoặc `.dailybot_example/profile.json` làm mẫu) để mọi người đóng góp và agent ký báo cáo cùng cách. **Không** bao giờ đặt thông tin xác thực vào file đó — trường `key` là lỗi nghiêm trọng.

Cùng file có thể mang chính sách báo cáo mà hook tuân theo:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` đặc biệt hữu ích cho repo nặng nghiên cứu hoặc tài liệu: công việc không commit (phân tích, tài liệu thiết kế, kế hoạch) được nhắc sớm hơn.

## Cài đặt (tất cả opt-in)

Addon **đề xuất** đường cài đặt; skill Dailybot sở hữu đồng ý và xác minh.

| Thành phần | Lệnh / đường dẫn |
|-----------|----------------|
| **Skill agent Dailybot** (khuyến nghị) | `npx skills add DailybotHQ/agent-skill` |
| **Cập nhật skill hiện có** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (tối thiểu `>= 3.7.0`) | Skill cài ở lần dùng đầu qua `shared/auth.md` đã xác minh; hoặc `pip install 'dailybot-cli>=3.7.0'`, Homebrew hoặc trình cài đã xác minh checksum tại [cli.dailybot.com](https://cli.dailybot.com) |

Kiểm tra phiên bản: `dailybot --version` và `dailybot version --check`. Nâng cấp: `dailybot upgrade`.

## Xác thực — hoãn

Addon này **không bao giờ** nhắc email, OTP hay API key và **không bao giờ** lưu thông tin xác thực. Xác thực thuộc về [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) của skill Dailybot:

- `dailybot login` (email OTP), hoặc
- `DAILYBOT_API_KEY` / `dailybot config key=...`, hoặc
- một file khóa theo repo `.dailybot/env.json` opt-in, được gitignore (`dailybot env add/use`, CLI `>= 3.7.0`) để một nhà phát triển có thể đăng nhập vào các tổ chức khác nhau trong các repo khác nhau.

Phân giải xác thực theo **Bearer-first**: token phiên được ưu tiên, với việc thử lại Bearer→API-key minh bạch khi gặp `401`/`403` nên token cũ không bao giờ chặn một khóa hợp lệ. Nếu xác thực bị từ chối hoặc không có, báo cáo bị bỏ qua im lặng — công việc tiếp tục.

## Skill Dailybot đi kèm — 14 khả năng (3.10.3)

Cài skill agent Dailybot mang lại nhiều hơn nhiều so với addon DWP kết nối. Gói skill chính thức (skill **3.10.3**, CLI cơ sở **>= 3.7.0**, bản publish hiện tại **3.7.3**) mở **14 sub-skill phối hợp**:

| Sub-skill | Chức năng |
|-----------|--------------|
| **Progress reports** | Cập nhật agent kiểu standup lên dashboard Dailybot |
| **Ask the AI** | Truy vấn one-shot headless tới trợ lý AI Dailybot |
| **Message polling** | Kiểm tra hướng dẫn nhóm khi bắt đầu phiên hoặc khi rảnh |
| **Email** | Gửi email với kiểm tra an toàn bắt buộc trước khi gửi |
| **Chat** | Gửi hoặc sửa trên Slack, Microsoft Teams, Discord hoặc Google Chat — kênh, DM, nhóm, luồng kiểu báo cáo, send-as-user (Slack, admin) |
| **Conversations** | Mở hoặc tái sử dụng group DM Slack với bot và đồng đội được nêu tên; đăng báo cáo trong cùng lệnh gọi |
| **Health and status** | Thông báo agent online/offline cho phiên chạy lâu |
| **Check-ins** | Hoàn thành standup; **author** check-in (lịch, người tham gia, câu hỏi, nhắc nhở, cài đặt AI) |
| **Kudos** | Ghi nhận đồng đội hoặc cả nhóm; duyệt feed ghi nhận, feed org, wall of fame |
| **Teams** | Liệt kê nhóm, xem thành viên, phân giải tên thành UUID; `me`, `org`, hồ sơ người dùng |
| **Forms** | Liệt kê (nay **theo phạm vi org** mặc định, với `--mine` và `--owner` để thu hẹp), gửi, cập nhật, chuyển trạng thái biểu mẫu; **author** biểu mẫu (trạng thái workflow, quyền, ChatOps); phân trang, tìm kiếm và lọc theo ngày |
| **Workflows** | Đọc workflow org (`workflow list` / `workflow get`; chỉ đọc) |
| **Report channels** | Khám phá UUID kênh cho biểu mẫu hoặc check-in |
| **Per-repo API keys** | Quản lý `.dailybot/env.json` — một file opt-in, được gitignore chứa API key + URL theo môi trường (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**Addon DWP chỉ kết nối `report` vào thực thi kế hoạch.** Gọi skill Dailybot trực tiếp cho mọi thứ khác — ví dụ đăng tóm tắt deploy lên `#releases`, hoàn thành standup hoặc nhờ AI Dailybot tóm tắt xu hướng check-in.

Tham chiếu công khai: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Nguồn: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Mô hình tin cậy: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) trong gói skill.

## Hành vi — hoãn, không bao giờ chặn

| Quy tắc | Chi tiết |
|------|--------|
| **Hoãn** | Skill Dailybot sở hữu cài đặt, đồng ý, auth, mẫu hook, phong cách viết |
| **Không bao giờ chặn** | Không có CLI, auth thất bại, lỗi mạng → cảnh báo một lần, tiếp tục công việc chính |
| **Không thử lại** | Không vào vòng chẩn đoán; báo cáo là best-effort |
| **Đối chiếu** | Skill, CLI, profile, hook hoặc wiring báo cáo hiện có được giữ — chỉ lấp khoảng trống |
| **Vendor-neutral** | DWP không yêu cầu Dailybot; addon này là hiển thị nhóm bổ sung |

## Luồng onboarding

Trong DWP `onboard` **Giai đoạn 7b**, sau scaffolding AI-first cốt lõi, luồng đề xuất năm addon opt-in. Nếu nhà phát triển chấp nhận Dailybot:

1. Phát hiện thiết lập hiện có (skill, CLI, `.dailybot/profile.json`, hook, bước báo cáo).
2. Đề xuất cài skill/CLI qua luồng đồng ý của Dailybot.
3. Hoãn xác thực sang `shared/auth.md`.
4. Kết nối bốn sự kiện vòng đời vào `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Tùy chọn đề xuất thực thi hook và `.dailybot/profile.json`.
6. Chạy xác thực (SPEC §8 trong `addons/dailybot/SPEC.md` của skill).

Hợp đồng chuẩn trong skill Deep Work Plan: `addons/dailybot/SPEC.md` (phiên bản **2.3.0**).

## Mục kit liên quan

- [Devcontainer](/kit/devcontainer) — môi trường dev tái lập với lưu trữ CLI Dailybot (addon đầu tiên)
- [Dependency upgrade](/kit/dependency-upgrade) — nâng cấp phụ thuộc theo lô, đã xác thực (addon thứ ba)
- [Design system](/kit/design-system) — `DESIGN.md` hướng agent cho bề mặt giao diện (addon thứ tư)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — sub-skill onboarding đề xuất addon
