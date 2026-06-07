---
title: "Đặc tả Deep Work Plan"
description: "Đặc tả rà soát được của phương pháp luận Deep Work Plan: định dạng DWP, giao thức agent, các kiểu hình, chuẩn tài liệu và cơ chế addon."
lastUpdated: 2026-05-30
---

## Đặc tả Deep Work Plan

Đặc tả là định nghĩa chính xác, rà soát được của phương pháp luận — các cấu trúc và giao thức mà con người và agent chia sẻ. Nó nêu rõ, bằng các thuật ngữ quy phạm RFC-2119, cách một kế hoạch dựa trên đặc tả được cấu trúc và cách một agent phải thực thi dựa trên nó: kế hoạch là nguồn chân lý, các cổng kiểm chứng có tính nhị phân, và chính repository mang theo harness mà một agent cần. Nó được tổ chức thành các tài liệu theo thứ tự:

- **Chuẩn tài liệu** — cấu trúc repository AI-first.
- **Đặc tả DWP** — cấu trúc kế hoạch, cấu trúc tác vụ và vòng lặp thực thi.
- **Giao thức agent** — hành vi xuyên agent bắt buộc và ánh xạ command.
- **Các kiểu hình** — repo độc lập so với trung tâm điều phối.
- **Addon** — cơ chế tự nguyện để bổ sung các năng lực tùy chọn, gồm sub-skill author (để một repository nuôi lớn bộ kit của riêng nó), các addon bảo trì như dependency-upgrade, và addon design-system frontend (một `docs/DESIGN.md` được suy luận từ các token thiết kế thực của repo).
- **Tuân thủ** — định nghĩa quy phạm về một repository AI-first: các thành phần mà một repository PHẢI và NÊN có, điều gì làm một kế hoạch chỉnh dạng, và cách kiểm chứng nó một cách khách quan với `/dwp-verify`.

- [Đọc đặc tả](/spec)
- [Đọc phương pháp luận](/methodology)
