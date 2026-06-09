---
title: Cloud agents
description: "Bộ chuyển đổi DWP cho cloud agent và background agent: tác vụ từ xa Claude Code, Codex cloud, lớp Jules — các phiên tạm thời thực thi dựa trên kế hoạch .dwp/ bền vững."
kind: adapter
lang: vi
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Bộ chuyển đổi cloud agent

Các cloud agent và background agent — tác vụ từ xa Claude Code, Codex cloud OpenAI, các agent lớp Jules, và các môi trường thực thi bất đồng bộ tương tự — có tính tạm thời theo thiết kế: một phiên khởi đầu, chạy trong thời gian giới hạn, và kết thúc. DWP biến ràng buộc đó thành một đặc điểm bằng cách làm cho kế hoạch trở thành thành phần bền vững, không phải phiên.

## Nhận thức cốt lõi

Thư mục `.dwp/` của repository là **lớp spec và trạng thái bền vững**. Các cloud session là **các bộ thực thi tạm thời**. Kế hoạch cho bộ thực thi biết phải làm gì; `state.json` cho nó biết nơi tiếp tục. Phiên có thể là bất cứ thứ gì — một mô hình khác, một nhà cung cấp khác, một container mới — và kế hoạch tiếp tục từ chính xác nơi nó dừng lại.

## Mức độ hỗ trợ

**Full** — bất kỳ cloud agent nào đọc repository, tuân theo `AGENTS.md`, và có thể thực thi các lệnh shell đều hỗ trợ DWP mà không cần bộ chuyển đổi riêng cho nền tảng.

## Vòng lặp thức dậy–tiếp tục–nhường

Mỗi lượt cloud agent tuân theo mô hình:

1. **Thức dậy** — phiên khởi đầu (được kích hoạt bởi lịch cron, sự kiện CI, hay hành động người dùng).
2. **Chạy Giao thức Tiếp tục DWP** — đọc README kế hoạch, định vị điểm kiểm tra, điều hòa `state.json` với markdown, kiểm tra đường nối, chạy smoke test. Xem [Đặc tả DWP](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Kiểm tra trạng thái bị chặn** — nếu `state.json.blocked` được đặt, báo cáo lý do và nhường mà không thực thi.
4. **Thực thi tác vụ nguyên tử tiếp theo** — một tác vụ, vượt qua cổng kiểm chứng đầy đủ của nó.
5. **Cập nhật lớp trạng thái** — ghi lại `state.json` nguyên tử với trạng thái tác vụ mới, bản ghi cổng, bản ghi kết quả và băm commit.
6. **Nhường** — phiên kết thúc gọn gàng; lượt tiếp theo tiếp tục từ trạng thái đã cập nhật.

## Yêu cầu

- Kế hoạch PHẢI mang lớp trạng thái có thể đọc bằng máy (`manifest.json` + `state.json`). Không có nó, một phiên tạm thời không có cách đáng tin cậy để xác định vị trí tiếp tục. Xem [Trạng thái kế hoạch](/spec/plan-state).
- Kế hoạch PHẢI đã được một con người chấp thuận trước bất kỳ lượt cloud không có giám sát nào. Chấp thuận kế hoạch là điểm kiểm soát.
- Agent hoạt động dưới quyền hạn giới hạn: nó KHÔNG ĐƯỢC mở rộng phạm vi, thực hiện các hành động phá hủy mà kế hoạch không ủy quyền rõ ràng, hoặc tùy hứng vượt ra ngoài hướng dẫn của tác vụ hiện tại. Xem [Giao thức agent](/spec/agent-protocol#execution-profiles).

## Ghi chú

Các cloud session agent là trường hợp cực đoan của hồ sơ thực thi không có giám sát: không có tính liên tục phiên, tính bền vững kế hoạch tối đa. Thư mục `.dwp/` của DWP được thiết kế đặc biệt để làm cho điều này hoạt động — tất cả trạng thái mà một agent cần để bắt đầu, tiếp tục và hoàn tất một khối công việc nằm trong các tệp markdown và JSON thuần mà bất kỳ phiên nào cũng có thể đọc từ một checkout mới.
