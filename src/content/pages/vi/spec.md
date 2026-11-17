---
title: "Đặc tả Deep Work Plan"
description: "Đặc tả rà soát được của phương pháp luận Deep Work Plan: định dạng DWP, giao thức agent, các kiểu hình, chuẩn tài liệu và cơ chế addon."
lastUpdated: 2026-09-28
---

## Đặc tả Deep Work Plan

**Tiêu chuẩn hiện tại: DWP 8.0.0 (bản phát hành `v8.0.0`).** Nền tảng được giữ lại bao gồm lớp bản ghi v6 và các phần mở rộng v7; kế hoạch mới mặc định dùng `plan-contract/v8`. Kế hoạch v5, v6 và v7 hiện có giữ nguyên thế hệ đã ghi nhận và chỉ được di chuyển bằng lệnh `refine migrate` rõ ràng. v8 giữ `plan-manifest/v7` và bổ sung `plan-contract/v8`, `journal-event/v8` cùng `plan-snapshot/v8`; schema manifest và journal-event v7 vẫn được hỗ trợ cho kế hoạch hiện có. [Manifest v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [hợp đồng v8](https://deepworkplan.com/schema/plan-contract/v8.json), [sự kiện journal v8](https://deepworkplan.com/schema/journal-event/v8.json) và [snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

Đặc tả là định nghĩa chính xác, rà soát được của phương pháp luận — các cấu trúc và giao thức mà con người và agent chia sẻ. Nó nêu rõ, bằng các thuật ngữ quy phạm RFC-2119, cách một kế hoạch dựa trên đặc tả được cấu trúc và cách một agent phải thực thi dựa trên nó: kế hoạch là nguồn chân lý, các cổng kiểm chứng có tính nhị phân, và chính repository mang theo harness mà một agent cần. Nó được tổ chức thành các tài liệu theo thứ tự:

- **Chuẩn tài liệu** — cấu trúc repository AI-first.
- **Lớp bản ghi** — lớp bản ghi dựa trên bằng chứng: hợp đồng, nhật ký, phân loại bằng chứng (khẳng định so với quan sát), phê duyệt và biên nhận.
- **Tài nguyên và năng lực** — thực thi có giới hạn: tệp khai báo ngữ cảnh, giới hạn tài nguyên, khả năng máy chủ và sổ đăng ký tiện ích.
- **Ủy quyền** — thực thi đa tác tử và bầy đàn: worktree song song an toàn, sự kiện ủy quyền và kế thừa lãnh đạo theo giai đoạn.
- **Trạng thái kế hoạch** — lớp trạng thái máy có thể đọc: ảnh chụp nhanh phái sinh từ nhật ký trong v6/v7 (`ledger.py project`), lớp trạng thái v5 cũ và đối soát.
- **Giao thức agent** — hành vi xuyên agent bắt buộc, ánh xạ command, các agent được hỗ trợ (bao gồm OpenClaw và Hermes), và các hồ sơ thực thi (tương tác so với không có giám sát) với các điều kiện dừng và tiếp tục theo lịch.
- **Các kiểu hình** — repo độc lập, trung tâm điều phối và không gian làm việc agent (ngôi nhà tồn tại lâu dài của một agent tự chủ: không gian làm việc OpenClaw, thư mục dịch vụ Hermes, volume cloud agent); phép suy đoán phân loại và cách khởi tạo khác nhau.
- **Addon** — cơ chế tự nguyện để bổ sung các năng lực tùy chọn, gồm sub-skill author (để một repository nuôi lớn bộ kit của riêng nó), các addon bảo trì như dependency-upgrade, và addon design-system (một `docs/DESIGN.md` được suy luận từ nguồn thiết kế thực của repo, với các profile cho UI trực quan, đầu ra CLI và các bề mặt hội thoại).
- **Tuân thủ** — định nghĩa quy phạm về một repository AI-first: các thành phần mà một repository PHẢI và NÊN có, điều gì làm một kế hoạch chỉnh dạng, và cách kiểm chứng nó một cách khách quan với `/dwp-verify`.
- **Trạng thái kế hoạch** — lớp trạng thái có thể đọc bằng máy: `manifest.json` và `state.json`, bản ghi cổng, bản ghi kết quả là bộ nhớ theo sự kiện, điều hòa (markdown thắng), và khi nào lớp này là bắt buộc.

- [Đọc đặc tả](/spec)
- [Đọc phương pháp luận](/methodology)
