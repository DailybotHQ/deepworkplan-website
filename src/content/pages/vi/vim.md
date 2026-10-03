---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim là trình soạn thảo terminal của Deep Work Plan: cấu hình Neovim 0.12+ với mục lục lệnh, trình duyệt kế hoạch và trình xem Markdown."
lastUpdated: 2026-10-03
---

## Giới thiệu

Một cấu hình Neovim dành cho con người và các agent lập trình sống trong terminal — Deep Work Plans, tài liệu và mục lục lệnh của bạn chỉ cách một phím bấm.

## Cài đặt

Một dòng lệnh cài đặt DeepWorkPlan Vim làm cấu hình Neovim của bạn. Trình cài đặt giải thích nó sẽ làm gì và hỏi trước khi chạm vào thiết lập hiện có.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Lấy sự đồng ý trước: cấu hình Neovim hiện có không bao giờ bị ghi đè nếu thiếu sự chấp thuận rõ ràng của bạn. Trình cài đặt dừng lại và chỉ ra đường dẫn thủ công.

Trên Windows, lệnh một dòng không áp dụng; đường dẫn thủ công được ghi trong README của repository. [Đường dẫn cài đặt Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Nó làm gì

Năm tính năng, cố tình giới hạn phạm vi. Mỗi tính năng ứng với một tổ hợp phím bạn có thể tra trong mục lục lệnh được tạo tự động.

| Tính năng | Là gì | Gán phím |
|---|---|---|
| Mục lục lệnh được tạo tự động | Mục lục lệnh được tạo từ cấu hình đang chạy, nên danh sách tổ hợp phím luôn cập nhật. | `SPC h h` |
| Thao tác kiểu VS Code | Những thao tác chỉnh sửa mang dáng dấp trình soạn thảo đồ họa: chọn tất cả và sao chép vào clipboard của hệ thống. | `<C-a>`, `y`, `<leader>y` |
| Trình duyệt Deep Work Plan | Một panel duyệt các kế hoạch trong repository — đọc một kế hoạch, các task và cổng xác thực của nó mà không rời khỏi trình soạn thảo. | `SPC P` |
| Trình xem Markdown | Xem trước Markdown trong trình duyệt hoặc kết xuất ngay trong buffer — tài liệu và kế hoạch ở ngay nơi công việc diễn ra. | `SPC m p`, `SPC m r` |
| Trình cài đặt một dòng | Trình cài đặt tự chứa cho macOS và Linux, kèm đường dẫn thủ công đã được ghi chép cho Windows. | — |

## Yêu cầu

- Neovim 0.12 trở lên, có Lua (lua, lua5.4 hoặc luajit) khả dụng
- macOS và Linux; Windows được hỗ trợ qua đường dẫn thủ công đã ghi chép
- Giấy phép GPL-3.0 — tự do sử dụng, nghiên cứu và sửa đổi

## Liên kết liên quan

- [Đọc tài liệu addon trong kit](/kit/vim)
- [Xem repository nguồn](https://github.com/DailybotHQ/deepworkplan-vim)
- Cài đặt DeepWorkPlan Vim, mở Neovim và đọc các Deep Work Plans của bạn trong cùng terminal mà các agent của bạn dùng.
