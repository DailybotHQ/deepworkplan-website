---
title: Agentkit
description: "Addon v7 tùy chọn dựa trên coding-agents-kit: một lệnh ak cho mọi coding agent trên terminal, và ủy thác headless các tác vụ có giới hạn trong kế hoạch."
kind: addon
lang: vi
order: 8
---

# Agentkit addon

Mỗi coding agent trên terminal đều có các cờ riêng để tiếp tục một phiên, cách riêng để tách biệt tài khoản thứ hai, chế độ headless riêng và công tắc riêng để bỏ qua các lời nhắc cấp quyền. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** đặt một bề mặt lệnh duy nhất lên tất cả chúng: `ak <kind> [@profile]`.

Addon này tích hợp bộ kit vào **DWP v7** (`v7.0.0`) làm phương thức truyền ủy thác **headless**. Addon là tùy chọn: khi không có nó, mọi tác vụ đều chạy trong phiên hiện tại, đúng như trước đây. Bản thân bộ kit là một sản phẩm MIT hoạt động được mà không cần Deep Work Plan.

## Bộ kit mang lại cho bạn những gì

- **Một cú pháp cho mọi CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` và `ak grok`, cùng các biến thể nhà cung cấp (GLM, Azure, xAI), với cùng các cờ phiên: `-c` để tiếp tục, `-r <id>` để khôi phục.
- **Hồ sơ.** `ak claude @work` chạy một tài khoản thứ hai trong thư mục home riêng, tách biệt với tài khoản thứ nhất.
- **Chạy headless.** `ak run <kind> -- "<prompt>"` chạy một prompt ở chế độ không tương tác và trả về một mã thoát đã được tài liệu hóa, tùy chọn dưới dạng một đối tượng JSON duy nhất.
- **Công cụ chẩn đoán.** `ak doctor --json` báo cáo những CLI nào đã được cài, các hồ sơ, và tên của các khóa đã được thiết lập — không bao giờ là giá trị của chúng.
- **Cài đặt.** `ak install <cli>` cài một CLI còn thiếu từ kênh chính thức của nhà cung cấp.

## Cài đặt

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Yêu cầu: `bash` trên macOS hoặc Linux, và `python3` 3.9 trở lên; không gì khác. Windows dùng `install.ps1`. Hãy ghim `v0.1.1`: bản này thay thế `v0.1.0` và mang một bản sửa lỗi bảo mật.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, giao diện 1 |
| Khóa registry | `agentkit` trong `.dwp/config.json` |
| Phương thức truyền | headless: một `ak run` cho mỗi agent được ủy thác, trong một git worktree riêng |
| Cung cấp | `subagents`, `cancel_children`, `model_routing` |
| Yêu cầu | quyền `agent_delegation` trong hợp đồng của kế hoạch |

## Quyền hạn được chuyển nguyên trạng

`ak <kind>` **không** thêm cờ bỏ qua quyền nào. Quyền tự chủ là một lựa chọn opt-in tường minh: `--auto` trên một lệnh, hoặc `AGENTKIT_PERMISSIONS=auto` trong môi trường, sẽ thêm cờ tự chủ của chính CLI đó cho lần khởi chạy ấy. Preset bí danh `classic`, vốn tạo lại các lối tắt như `claudex`, được phát hành ở trạng thái tắt.

Addon không bao giờ tự ý thêm cờ tự chủ. Một kế hoạch chỉ dùng `--auto` khi nhà phát triển opt-in một cách tường minh và có ghi nhận, và chỉ bên trong một worktree hoặc container cô lập.

## Addon bổ sung gì cho một kế hoạch

Trên một kế hoạch v7 có hợp đồng cấp quyền `agent_delegation`, `execute` có thể giao một tác vụ `parallel_safe` cho một CLI khác: nó tạo một git worktree riêng, chạy `ak run` ở đó với giới hạn thời gian và thu thập kết quả vào `analysis_results/delegations/` của kế hoạch. Kết quả là bằng chứng `asserted` cho đến khi trình chạy cổng của chính kế hoạch quan sát được nó. Việc hủy một agent được ủy thác sẽ dừng toàn bộ cây tiến trình của nó.

## Agentkit hay Herdr

| Tình huống | Dùng |
|---|---|
| Một tác vụ `parallel_safe` có giới hạn với đầu ra đã khai báo | Agentkit (headless) |
| Tác vụ cần tương tác, chạy lâu hoặc nằm trên một máy khác | [Herdr](/kit/herdr) (một peer trong pane) |

Hai addon có thể kết hợp với nhau: herdr-peers có thể khởi chạy một peer trong pane với môi trường mà `ak env <kind> @profile` in ra.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Giá trị khóa API không bao giờ được in ra, ghi log hay ghi vào tệp cấu hình; ngoại lệ đã được tài liệu hóa là Cline, vốn nhận khóa qua dòng lệnh. Việc trích xuất kết quả cho OpenCode, Pi, Cline và Grok được xây dựng từ tài liệu của nhà cung cấp và chưa được thử nghiệm trên tài khoản thật; đầu ra không xác định sẽ quay về dạng văn bản thô.
