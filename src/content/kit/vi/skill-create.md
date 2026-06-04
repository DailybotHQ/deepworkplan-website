---
title: skill-create
description: "Tạo một skill tái sử dụng mới trong repository hiện tại — một quy trình tham số hóa, chạy trong phiên — thông qua sub-skill author, giữ cho catalog luôn đồng bộ."
kind: command
lang: vi
order: 7
usage: /skill-create
---

# skill-create

Tạo một skill mới trong repository hiện tại. Một bộ ủy nhiệm gọn nhẹ đến sub-skill **author** của Deep Work Plan.

## Tác dụng

`skill-create` định tuyến đến luồng tạo skill của sub-skill author. Một skill là một quy trình tái sử dụng, tham số hóa, chạy trong phiên (ví dụ, `/fix-lint`). Nó mã hóa "cách làm việc X" và nằm tại `.agents/skills/<name>/SKILL.md`.

## Cách dùng

```
/skill-create
```

## Hành vi

1. Phát hiện bố cục `.agents/` và các quy ước cục bộ của repo.
2. Xác nhận tồn tại một quy trình thực, có thể lặp lại; đặt tên theo kiểu kebab-case.
3. Dựng khung và điền nội dung `SKILL.md` (Mục tiêu, Khi nào dùng, Các bước, Kiểm chứng).
4. Thêm một bộ ủy nhiệm lệnh gọn nhẹ nếu cần.
5. Cập nhật catalog trong `.agents/docs/` cho khớp.

## Ghi chú

Với các agent, hãy dùng `/agent-create`. Logic nằm trong skill; lệnh giữ ở mức gọn nhẹ.
