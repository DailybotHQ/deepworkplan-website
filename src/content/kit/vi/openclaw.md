---
title: OpenClaw
description: "Bộ chuyển đổi DWP cho OpenClaw: quét .agents/skills gốc, ánh xạ thực thi không có giám sát, và tiếp tục kế hoạch theo lịch cron cho các không gian làm việc agent tự chủ."
kind: adapter
lang: vi
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Bộ chuyển đổi OpenClaw

OpenClaw là một nền tảng agent tự chủ chạy các không gian làm việc tồn tại lâu dài với các lượt theo lịch. Nó quét `<workspace>/.agents/skills/` gốc để tìm các gói skill đã cài, nghĩa là skill DWP tải mà không cần bất kỳ shim chuyển đổi nào — cài nó ở đó và OpenClaw tự động nhận ra.

## Mức độ hỗ trợ

**Full** — OpenClaw đọc `AGENTS.md` và tải skill qua chuẩn AgentSkills. Tất cả các sub-skill DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) đều sẵn có.

## Cài đặt

```bash
openclaw skills install deepworkplan
```

Hoặc thủ công: clone `DailybotHQ/deepworkplan-skill` vào `<workspace>/.agents/skills/deepworkplan/`.

## Cách gọi

Văn bản thuần — OpenClaw không dùng tiền tố slash-command:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Ánh xạ thực thi không có giám sát

Các primitive lập lịch của OpenClaw ánh xạ trực tiếp vào mô hình tiếp tục của DWP:

| Primitive OpenClaw | Vai trò DWP |
|--------------------|-------------|
| Gốc không gian làm việc | Kiểu hình [không gian làm việc agent](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` tại gốc không gian làm việc |
| `<workspace>/.agents/skills/` (quét tier-2 gốc) | Nơi gói này tồn tại — không cần shim chuyển đổi |
| Lượt heartbeat hay cron | Một lượt [tiếp tục theo lịch](/spec/agent-protocol#scheduled-continuation): thức dậy → Giao thức Tiếp tục DWP → tác vụ nguyên tử tiếp theo → cập nhật trạng thái → nhường |
| Kiểm tra `HEARTBEAT.md` | Thêm một dòng: "Nếu `.dwp/plans/` có kế hoạch đang mở, tiếp tục nó một tác vụ." |
| Lệnh thường trực | Ranh giới chấp thuận kế hoạch và quyền hạn giới hạn của hồ sơ không có giám sát |

Về mặt vận hành:

1. Một con người tạo và chấp thuận một kế hoạch một cách tương tác. Chấp thuận là điểm kiểm soát — các lượt không có giám sát không bao giờ tạo-và-thực-thi trong một lượt.
2. Kế hoạch phải mang lớp trạng thái có thể đọc bằng máy (`manifest.json` + `state.json`). Trong một không gian làm việc không có git, `state.json` là thứ làm cho việc tiếp tục an toàn khi sự cố có thể thực hiện được. Xem [Trạng thái kế hoạch](/spec/plan-state).
3. Mỗi lượt heartbeat hay cron thực thi tối đa một tác vụ, vượt qua cổng kiểm chứng của nó, cập nhật `state.json` nguyên tử, và nhường.
4. Khi gặp bất kỳ điều kiện dừng nào, agent ghi trường `blocked` của `state.json` và báo cáo qua kênh bình thường của không gian làm việc. Lần nhìn của con người tiếp theo — hoặc báo cáo heartbeat — thấy chính xác những gì cần thiết.

Kết quả: một kế hoạch nhiều ngày tồn tại qua các lần khởi động lại, thay đổi mô hình và ranh giới phiên, được thực thi qua đêm bởi daemon — với các cổng tương tự một lần chạy được giám sát bởi con người.

## Ghi chú

Không gian làm việc của OpenClaw là ví dụ chuẩn của kiểu hình [không gian làm việc agent](/spec/archetypes). Tích hợp `HEARTBEAT.md` của gói skill DWP và yêu cầu `state.json` được thiết kế với nền tảng này trong tâm trí.
