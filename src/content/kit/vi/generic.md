---
title: Generic
description: "Preset onboarding dự phòng cho mọi dự án, với các gợi ý suy luận không phụ thuộc stack giúp phát hiện lệnh build và test ngay từ repository."
kind: preset
lang: vi
order: 6
stack: Generic
---

# Generic preset

Hướng dẫn suy luận dự phòng mà luồng onboard sử dụng khi không có preset nào dành riêng cho stack phù hợp. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Cần suy luận về điều gì

- Phát hiện các lệnh build và test thực tế từ manifest, Makefile, hoặc CI — ghi lại nguyên văn.
- Áp dụng các quy ước chung; không đưa ra giả định riêng cho bất kỳ stack nào.
- Chỉ sinh ra những skill, agent và tài liệu khớp với quy trình làm việc thực sự của repo.

## Ghi chú

Đây là phương án dự phòng khi không có preset nào trong số Django, Vue + Vite, Astro/Svelte, dịch vụ Node/TS, hay gói/CLI Python phù hợp.
