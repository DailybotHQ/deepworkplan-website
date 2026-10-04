---
title: DeepWorkPlan Vim
description: "Addon DWP opt-in: DeepWorkPlan Vim, trình soạn thảo terminal của Deep Work Plan — mục lục lệnh được tạo, duyệt kế hoạch và đọc Markdown trong Neovim."
kind: addon
lang: vi
order: 6
---

# Addon DeepWorkPlan Vim

**DeepWorkPlan Vim** là trình soạn thảo terminal của Deep Work Plan: một cấu hình Neovim (đây là chính trình soạn thảo, không phải tệp của kho) đặt các mặt làm việc của phương pháp cách một phím. Trong khi các mục kit khác cài harness vào kho, addon này trang bị cho con người — và bất kỳ agent nào điều khiển Neovim ở chế độ headless — một trình soạn thảo nói DWP một cách tự nhiên.

Nó yêu cầu **Neovim 0.12 trở lên**, chạy trên **macOS và Linux** (Windows được hỗ trợ qua đường dẫn thủ công có tài liệu) và được phát hành theo giấy phép **GPL-3.0** — tự do sử dụng, nghiên cứu và sửa đổi.

## Nó thêm gì

| # | Tính năng | Việc nó làm | Phím tắt |
|---|---------|--------------|---------|
| F1 | **Mục lục lệnh được tạo tự động** | Toàn bộ trình soạn thảo, liệt kê đủ: mỗi lệnh cùng phím tắt và mô tả một dòng, được tạo từ cấu hình sống nên mục lục không lệch khỏi trình soạn thảo. | `SPC h h` |
| F2 | **Thao tác kiểu VS Code** | Chọn tất cả, sao chép và yank vào clipboard bằng những tổ hợp mà trí nhớ cơ bắp đã thuộc. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Trình duyệt Deep Work Plan** | Mở kế hoạch đang dẫn dắt kho — tác vụ, cổng xác minh và trạng thái hoàn thành — mà không rời trình soạn thảo. | `SPC P` |
| F4 | **Trình xem Markdown** | Đọc Markdown như các agent đọc: bản xem trước đã kết xuất, hoặc nguồn thô để giữ độ trung thực khi sao chép. | `SPC m p`, `SPC m r` |
| F5 | **Trình cài đặt một dòng** | Một `install.sh` lấy sự đồng ý trước cho macOS và Linux; đường dẫn thủ công có tài liệu bao phủ Windows. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Cài đặt

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Trình cài đặt **lấy sự đồng ý trước**: một cấu hình Neovim có sẵn, không thuộc về nó, không bao giờ bị ghi đè. Khi được bơm qua pipeline không có terminal, nó dừng lại kèm hướng dẫn thay vì đụng vào bất cứ thứ gì; ở chế độ tương tác, nó hỏi trước khi dời cấu hình có sẵn sang bên. Plugin được cài headless ngay lần khởi động đầu — không vũ điệu thoát ra rồi mở lại.

Windows không phải đích của `curl | bash`. Đường dẫn thủ công có tài liệu (winget cộng Git Bash, hoặc WSL) nằm trong README của kho.

## Khi nào dùng đến nó

| Tín hiệu | Hành động |
|--------|--------|
| Người phát triển sống trong terminal và điều khiển kho bằng kế hoạch | **Đưa ra** addon |
| Thực thi DWP dài hơi nơi trình duyệt kế hoạch (`SPC P`) giữ trạng thái luôn hiện diện | **Khuyến nghị** |
| Trình soạn thảo của người phát triển đã được cấu hình và không thương lượng | **Bỏ qua** — addon là opt-in ngay từ thiết kế |
| Đội chỉ dùng Windows, không có WSL | **Bỏ qua**, hoặc trỏ sang đường dẫn thủ công có tài liệu |

## Các mục kit liên quan

- [Devcontainer](/kit/devcontainer) — môi trường phát triển tái lập được (addon đầu tiên)
- [Dailybot](/kit/dailybot) — báo cáo vòng đời kế hoạch nhìn thấy được cho cả nhóm (addon thứ hai)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — đánh giá cục bộ trong các Final Review của kế hoạch (addon thứ năm)
