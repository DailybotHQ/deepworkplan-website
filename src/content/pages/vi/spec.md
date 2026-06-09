---
title: "Đặc tả Deep Work Plan"
description: "Đặc tả rà soát được của phương pháp luận Deep Work Plan: định dạng DWP, giao thức agent, các kiểu hình, chuẩn tài liệu và cơ chế addon."
lastUpdated: 2026-05-30
---

## Đặc tả Deep Work Plan

Đặc tả là định nghĩa chính xác, rà soát được của phương pháp luận — các cấu trúc và giao thức mà con người và agent chia sẻ. Nó nêu rõ, bằng các thuật ngữ quy phạm RFC-2119, cách một kế hoạch dựa trên đặc tả được cấu trúc và cách một agent phải thực thi dựa trên nó: kế hoạch là nguồn chân lý, các cổng kiểm chứng có tính nhị phân, và chính repository mang theo harness mà một agent cần. Nó được tổ chức thành các tài liệu theo thứ tự:

- **Chuẩn tài liệu** — cấu trúc repository AI-first.
- **Đặc tả DWP** (v1.2) — cấu trúc kế hoạch, cấu trúc tác vụ, vòng lặp thực thi, phần Delta cho các thay đổi trong codebase hiện có, Giao thức Tiếp tục DWP, các bậc rigor tỷ lệ (micro/standard/deep) và lớp trạng thái kế hoạch có thể đọc bằng máy.
- **Giao thức agent** (v1.2) — hành vi xuyên agent bắt buộc, ánh xạ command, các agent được hỗ trợ (bao gồm OpenClaw và Hermes), và các hồ sơ thực thi (tương tác so với không có giám sát) với các điều kiện dừng và tiếp tục theo lịch.
- **Các kiểu hình** (v1.1) — repo độc lập, trung tâm điều phối và không gian làm việc agent (ngôi nhà tồn tại lâu dài của một agent tự chủ: không gian làm việc OpenClaw, thư mục dịch vụ Hermes, volume cloud agent); phép suy đoán phân loại và cách khởi tạo khác nhau.
- **Addon** — cơ chế tự nguyện để bổ sung các năng lực tùy chọn, gồm sub-skill author (để một repository nuôi lớn bộ kit của riêng nó), các addon bảo trì như dependency-upgrade, và addon design-system frontend (một `docs/DESIGN.md` được suy luận từ các token thiết kế thực của repo).
- **Tuân thủ** — định nghĩa quy phạm về một repository AI-first: các thành phần mà một repository PHẢI và NÊN có, điều gì làm một kế hoạch chỉnh dạng, và cách kiểm chứng nó một cách khách quan với `/dwp-verify`.
- **Trạng thái kế hoạch** — lớp trạng thái có thể đọc bằng máy: `manifest.json` và `state.json`, bản ghi cổng, bản ghi kết quả là bộ nhớ theo sự kiện, điều hòa (markdown thắng), và khi nào lớp này là bắt buộc.

- [Đọc đặc tả](/spec)
- [Đọc phương pháp luận](/methodology)
