---
title: "Đặc tả Deep Work Plan"
description: "Đặc tả rà soát được của phương pháp luận Deep Work Plan: định dạng DWP, giao thức agent, các kiểu hình, chuẩn tài liệu và cơ chế addon."
lastUpdated: 2026-09-28
---

## Đặc tả Deep Work Plan

**Tiêu chuẩn hiện tại: v7 (DWP 7.0.0).** Các tài liệu bên dưới là nền tảng được giữ lại; v6 đã bổ sung hợp đồng, nhật ký chỉ ghi thêm, ngữ cảnh tác vụ, kiểm soát tài nguyên và quy tắc vòng đời, còn v7 giữ nguyên lớp bản ghi đó đồng thời bổ sung dấu đánh tác vụ `parallel_safe` tùy chọn, sự kiện nhật ký `delegation`, sổ đăng ký addon `.dwp/config.json` và các khả năng do addon cung cấp. Đọc [schema manifest v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [schema hợp đồng](https://deepworkplan.com/schema/plan-contract/v7.json) và [schema snapshot trực tiếp](https://deepworkplan.com/schema/plan-snapshot/v6.json) (dùng chung với v6). Các kế hoạch v5 và v6 hiện có vẫn giữ quy tắc đã ghi. Gói 7.x hiện tại mặc định tạo kế hoạch mới bằng v7. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận; di chuyển cần yêu cầu rõ ràng.

Đặc tả là định nghĩa chính xác, rà soát được của phương pháp luận — các cấu trúc và giao thức mà con người và agent chia sẻ. Nó nêu rõ, bằng các thuật ngữ quy phạm RFC-2119, cách một kế hoạch dựa trên đặc tả được cấu trúc và cách một agent phải thực thi dựa trên nó: kế hoạch là nguồn chân lý, các cổng kiểm chứng có tính nhị phân, và chính repository mang theo harness mà một agent cần. Nó được tổ chức thành các tài liệu theo thứ tự:

- **Chuẩn tài liệu** — cấu trúc repository AI-first.
- **Đặc tả DWP** — cấu trúc kế hoạch, cấu trúc tác vụ, vòng lặp thực thi, phần Delta cho các thay đổi trong codebase hiện có, Giao thức Tiếp tục DWP, các bậc rigor tỷ lệ (micro/standard/deep) và lớp trạng thái kế hoạch có thể đọc bằng máy.
- **Giao thức agent** — hành vi xuyên agent bắt buộc, ánh xạ command, các agent được hỗ trợ (bao gồm OpenClaw và Hermes), và các hồ sơ thực thi (tương tác so với không có giám sát) với các điều kiện dừng và tiếp tục theo lịch.
- **Các kiểu hình** — repo độc lập, trung tâm điều phối và không gian làm việc agent (ngôi nhà tồn tại lâu dài của một agent tự chủ: không gian làm việc OpenClaw, thư mục dịch vụ Hermes, volume cloud agent); phép suy đoán phân loại và cách khởi tạo khác nhau.
- **Addon** — cơ chế tự nguyện để bổ sung các năng lực tùy chọn, gồm sub-skill author (để một repository nuôi lớn bộ kit của riêng nó), các addon bảo trì như dependency-upgrade, và addon design-system (một `docs/DESIGN.md` được suy luận từ nguồn thiết kế thực của repo, với các profile cho UI trực quan, đầu ra CLI và các bề mặt hội thoại).
- **Tuân thủ** — định nghĩa quy phạm về một repository AI-first: các thành phần mà một repository PHẢI và NÊN có, điều gì làm một kế hoạch chỉnh dạng, và cách kiểm chứng nó một cách khách quan với `/dwp-verify`.
- **Trạng thái kế hoạch** — lớp trạng thái có thể đọc bằng máy: `manifest.json` và `state.json`, bản ghi cổng, bản ghi kết quả là bộ nhớ theo sự kiện, điều hòa (markdown thắng), và khi nào lớp này là bắt buộc.

- [Đọc đặc tả](/spec)
- [Đọc phương pháp luận](/methodology)
