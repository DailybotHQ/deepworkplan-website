---
title: Hermes
description: "Bộ điều hợp DWP cho Hermes: nạp skill qua chuẩn AgentSkills, bộ nhớ theo sự kiện từ kết quả kế hoạch và tiếp tục kế hoạch theo lịch cron."
kind: adapter
lang: vi
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Bộ chuyển đổi Hermes

Hermes là một nền tảng agent tự chủ tải skill qua chuẩn AgentSkills và duy trì bộ nhớ theo sự kiện qua các phiên. DWP tích hợp với cả hai bề mặt: gói skill tải từ `.agents/skills/` theo cùng cách như bất kỳ gói tương thích AgentSkills nào khác, và các bản ghi kết quả của `state.json` nạp trực tiếp vào chỉ mục bộ nhớ của Hermes.

## Mức độ hỗ trợ

**Đầy đủ** (Đã lập tài liệu) — Hermes đọc `AGENTS.md` và tải kỹ năng qua cách tải tiêu chuẩn AgentSkills. Tất cả các kỹ năng phụ của DWP đều có sẵn.

## Cài đặt

Cài gói skill vào thư mục `.agents/skills/` của không gian làm việc, hoặc dùng trình quản lý skill của nền tảng nếu sẵn có.

## Cách gọi

Văn bản thuần:

```
create a plan for <goal>
resume the open plan
```

## Hiệp lực bộ nhớ theo sự kiện

Trong các kế hoạch v6 và v7, biên nhận xác minh tất định của DWP (`outcomes.py receipt`) và các bản ghi kết quả được đưa trực tiếp vào chỉ mục bộ nhớ của Hermes: mỗi tác vụ hoàn thành mang theo những gì đã thử, thất bại và hiệu quả trong một lược đồ JSON có cấu trúc. Các kế hoạch đã hoàn thành trở thành bộ nhớ tình tiết có thể truy xuất — một agent có thể nhớ lại cách một vấn đề đã được giải quyết.

Các phiên tạm thời nối thêm sự kiện vào `journal.ndjson` và chiếu `state.json` qua `ledger.py project` thay vì viết lại các tệp trạng thái theo cách thủ công. Xem [Trạng thái kế hoạch](/spec/plan-state#outcome-records-as-episodic-memory).

## Tiếp tục theo lịch cron

Trên các nền tảng có lập lịch cron, tiếp tục tuân theo cùng mô hình như các nền tảng tự chủ khác: mỗi lượt theo lịch thức dậy, chạy Giao thức Tiếp tục DWP, thực thi tối đa một tác vụ, cập nhật `state.json`, và nhường. Kế hoạch — không phải phiên — là đơn vị liên tục.

Lớp trạng thái có thể đọc bằng máy (`manifest.json` + `state.json`) là BẮT BUỘC (REQUIRED) cho thực thi không có giám sát. Xem [Giao thức agent](/spec/agent-protocol#execution-profiles) để biết giao thức dừng điều kiện và leo thang đầy đủ.

## Ghi chú

Hermes và OpenClaw đều là các nền tảng agent tự chủ trong bảng supported-agents trong [Giao thức agent](/spec/agent-protocol). Cả hai chạy dưới hồ sơ thực thi không có giám sát và cả hai hưởng lợi từ sự tương đương `state.json`-như-git-log của kiểu hình không gian làm việc agent.
