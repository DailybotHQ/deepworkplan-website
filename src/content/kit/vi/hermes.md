---
title: Hermes
description: "Bộ chuyển đổi DWP cho Hermes: tải skill theo chuẩn AgentSkills, hiệp lực bộ nhớ theo sự kiện qua bản ghi kết quả trong state.json, và tiếp tục kế hoạch theo lịch cron."
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

**Full** — Hermes đọc `AGENTS.md` và tải skill qua tải theo chuẩn AgentSkills. Tất cả các sub-skill DWP đều sẵn có.

## Cài đặt

Cài gói skill vào thư mục `.agents/skills/` của không gian làm việc, hoặc dùng trình quản lý skill của nền tảng nếu sẵn có.

## Cách gọi

Văn bản thuần:

```
create a plan for <goal>
resume the open plan
```

## Hiệp lực bộ nhớ theo sự kiện

Hermes lập chỉ mục bộ nhớ agent để làm cho công việc trong quá khứ có thể truy xuất qua các phiên tương lai. Các bản ghi kết quả `state.json` của DWP được thiết kế chính xác cho mục đích sử dụng này: mỗi tác vụ đã hoàn tất mang những gì đã `tried`, những gì đã `failed`, những gì đã `worked`, và các ghi chú tự do trong một trường JSON có cấu trúc. Khi Hermes lập chỉ mục các tệp trạng thái `.dwp/plans/` của không gian làm việc, các kế hoạch đã hoàn tất trở thành bộ nhớ theo sự kiện có thể truy xuất — một agent có thể về sau nhớ lại cách một vấn đề cụ thể được giải quyết, không chỉ là một kế hoạch đã chạy.

Điều này có nghĩa là các kế hoạch DWP trên Hermes bền vững theo hai cách: các tệp markdown là bản ghi mà con người đọc được, và các bản ghi kết quả `state.json` là bộ nhớ có thể lập chỉ mục bằng máy. Xem [Trạng thái kế hoạch](/spec/plan-state#outcome-records-as-episodic-memory).

## Tiếp tục theo lịch cron

Trên các nền tảng có lập lịch cron, tiếp tục tuân theo cùng mô hình như các nền tảng tự chủ khác: mỗi lượt theo lịch thức dậy, chạy Giao thức Tiếp tục DWP, thực thi tối đa một tác vụ, cập nhật `state.json`, và nhường. Kế hoạch — không phải phiên — là đơn vị liên tục.

Lớp trạng thái có thể đọc bằng máy (`manifest.json` + `state.json`) là BẮT BUỘC (REQUIRED) cho thực thi không có giám sát. Xem [Giao thức agent](/spec/agent-protocol#execution-profiles) để biết giao thức dừng điều kiện và leo thang đầy đủ.

## Ghi chú

Hermes và OpenClaw đều là các nền tảng agent tự chủ trong bảng supported-agents trong [Giao thức agent](/spec/agent-protocol). Cả hai chạy dưới hồ sơ thực thi không có giám sát và cả hai hưởng lợi từ sự tương đương `state.json`-như-git-log của kiểu hình không gian làm việc agent.
