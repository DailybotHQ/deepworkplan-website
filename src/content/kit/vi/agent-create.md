---
title: agent-create
description: "Tạo một agent mới trong repository hiện tại — một worker chuyên biệt với tầng mô hình và bộ công cụ riêng — thông qua sub-skill author, giữ cho catalog luôn đồng bộ."
kind: command
lang: vi
order: 8
usage: /agent-create
---

# agent-create

Tạo một agent mới trong repository hiện tại. Một bộ ủy nhiệm gọn nhẹ đến sub-skill **author** của Deep Work Plan.

## Tác dụng

`agent-create` định tuyến đến luồng tạo agent của sub-skill author. Một agent là định nghĩa của một worker chuyên biệt (vai trò, tầng mô hình, công cụ, system prompt) được điều phối để xử lý một lớp tác vụ. Nó mã hóa "ai làm việc X" và nằm tại `.agents/agents/<name>.md`.

## Cách dùng

```
/agent-create
```

## Hành vi

1. Phát hiện bố cục `.agents/` và các quy ước cục bộ của repo.
2. Xác nhận một vai trò lặp lại với nhu cầu mô hình/công cụ riêng biệt; đặt tên theo kiểu kebab-case.
3. Dựng khung và điền nội dung cho agent (Vai trò, Đầu vào, Quy trình, Đầu ra, leo thang).
4. Chọn một tầng mô hình có lý do chính đáng — nhẹ, tiêu chuẩn, hoặc nặng — mà không hardcode ID mô hình của nhà cung cấp.
5. Cập nhật catalog trong `.agents/docs/` cho khớp.

## Ghi chú

Với các quy trình, hãy dùng `/skill-create`. Giữ các tầng mô hình ở mức trừu tượng và ánh xạ chúng trong cấu hình của repo.
