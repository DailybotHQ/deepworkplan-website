---
title: Agentkit
description: "Một lệnh cho mọi agent lập trình trên terminal. Mặc định tự chủ hoàn toàn nhưng tắt được, chạy headless trong git worktree, và có tài khoản thứ hai."
kind: addon
lang: vi
order: 8
---

# Agentkit addon

Mỗi coding agent trên terminal đều có các cờ riêng để tiếp tục một phiên, cách riêng để tách biệt tài khoản thứ hai, chế độ headless riêng và công tắc riêng để bỏ qua các lời nhắc cấp quyền. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** đặt một bề mặt lệnh duy nhất lên tất cả chúng: `ak <kind> [@profile]`.

Addon này tích hợp bộ kit vào **DWP v7** (gói `v7.1.4`) làm phương thức truyền ủy thác **headless**. Addon là tùy chọn: khi không có nó, mọi tác vụ đều chạy trong phiên hiện tại, đúng như trước đây. Bản thân bộ kit là một sản phẩm MIT hoạt động được mà không cần Deep Work Plan.

## Bộ kit mang lại cho bạn những gì

- **Một cú pháp cho mọi CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` và `ak grok`, cùng các biến thể nhà cung cấp (GLM, Azure, xAI), với cùng các cờ phiên: `-c` để tiếp tục, `-r <id>` để khôi phục.
- **Hồ sơ.** `ak claude @work` chạy một tài khoản thứ hai trong thư mục home riêng, tách biệt với tài khoản thứ nhất.
- **Chạy headless.** `ak run <kind> -- "<prompt>"` chạy một prompt ở chế độ không tương tác và trả về một mã thoát đã được tài liệu hóa, tùy chọn dưới dạng một đối tượng JSON duy nhất.
- **Công cụ chẩn đoán.** `ak doctor --json` báo cáo những CLI nào đã được cài, các hồ sơ, và tên của các khóa đã được thiết lập — không bao giờ là giá trị của chúng.
- **Cài đặt có xác minh.** `ak install <cli>` cài một CLI còn thiếu từ kênh chính thức của nhà cung cấp ở một phiên bản được ghim, đối chiếu với một sha256 được ghim hoặc thông tin integrity của npm registry.
- **Những cái tên quen thuộc.** Hai preset bí danh, ở trạng thái tắt cho đến khi bạn bật: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) và `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), mỗi bí danh là một lệnh `ak <kind>`.

## Cài đặt

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Yêu cầu: `bash` trên macOS hoặc Linux, và `python3` 3.9 trở lên; không gì khác. Windows dùng `install.ps1`. Hãy ghim `v0.3.0`: `v0.2.0` và `v0.2.1` không được hỗ trợ. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/coding-agents-kit`, tag `v0.3.0`, giao diện 1 |
| Khóa registry | `agentkit` trong `.dwp/config.json` |
| Phương thức truyền | headless: một `ak run` cho mỗi agent được ủy thác, trong một git worktree riêng |
| Cung cấp | `subagents`, `cancel_children`, `model_routing` |
| Yêu cầu | quyền `agent_delegation` trong hợp đồng của kế hoạch |

## Tự chủ theo mặc định, với lựa chọn opt-out luôn được ưu tiên

Kể từ `v0.2.0`, `ak <kind>` khởi chạy mọi agent ở chế độ **tự chủ**: nó thêm cờ tự chủ của chính CLI đó, chỉ được lưu trong tệp `providers.toml` của bộ kit. Chế độ tự chủ dành cho các môi trường dùng một lần hoặc có sandbox, chẳng hạn một dev container.

**Opt-out luôn được ưu tiên**: `--ask` trên một lệnh, hoặc `AGENTKIT_PERMISSIONS=ask` trong môi trường hay trong tệp env của bộ kit, sẽ chặn cờ đó ngay cả khi cùng lệnh có `--auto`. Một phiên đã opt-out sẽ truyền opt-out đó sang các agent mà nó khởi chạy. Trên máy host, hãy thiết lập opt-out.

Addon không tự viết ra cờ tự chủ nào và không bao giờ truyền `--auto`. Nó truyền `--ask` khi một kế hoạch ghi nhận opt-out. Một kế hoạch cấp quyền `agent_delegation` trên máy host chấp nhận các agent được ủy thác chạy tự chủ, bị giới hạn trong worktree riêng của chúng — vốn không phải là một sandbox.

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
