---
title: Agentkit
description: "Một lệnh cho mọi agent lập trình trên terminal: mỗi hồ sơ một tài khoản, ak pick chọn tài khoản còn nhiều chỗ nhất, tự chủ có opt-out, và chạy headless."
kind: addon
lang: vi
order: 8
---

# Agentkit addon

Mỗi coding agent trên terminal đều có các cờ riêng để tiếp tục một phiên, cách riêng để tách biệt tài khoản thứ hai, chế độ headless riêng và công tắc riêng để bỏ qua các lời nhắc cấp quyền. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** đặt một bề mặt lệnh duy nhất lên tất cả chúng: `ak <kind> [@profile]`.

Addon này tích hợp bộ kit vào **DWP v7** (gói `v7.5.1`) làm phương thức truyền ủy thác **headless**. Addon là tùy chọn: khi không có nó, mọi tác vụ đều chạy trong phiên hiện tại, đúng như trước đây. Bản thân bộ kit là một sản phẩm MIT hoạt động được mà không cần Deep Work Plan.

## Bộ kit mang lại cho bạn những gì

- **Một cú pháp cho mọi CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` và `ak grok`, cùng các biến thể nhà cung cấp (GLM, Azure, xAI), với cùng các cờ phiên: `-c` để tiếp tục, `-r <id>` để khôi phục.
- **Hồ sơ.** `ak claude @work` chạy một tài khoản thứ hai trong thư mục home riêng, tách biệt với tài khoản thứ nhất.
- **Chạy headless.** `ak run <kind> -- "<prompt>"` chạy một prompt ở chế độ không tương tác và trả về một mã thoát đã được tài liệu hóa, tùy chọn dưới dạng một đối tượng JSON duy nhất.
- **Công cụ chẩn đoán.** `ak doctor --json` báo cáo những CLI nào đã được cài, các hồ sơ, và tên của các khóa đã được thiết lập — không bao giờ là giá trị của chúng.
- **Cài đặt có xác minh.** `ak install <cli>` cài một CLI còn thiếu từ kênh chính thức của nhà cung cấp ở một phiên bản được ghim, đối chiếu với một sha256 được ghim hoặc thông tin integrity của npm registry.
- **Những cái tên quen thuộc.** Hai preset bí danh, ở trạng thái tắt cho đến khi bạn bật: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) và `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), mỗi bí danh là một lệnh `ak <kind>`.

## Tài khoản, hạn mức và chọn tài khoản

Bộ kit coi mỗi phiên đăng nhập hoặc khóa bạn nắm giữ là một **tài khoản**: một CLI × một hồ sơ. `@default` (hoặc `@1`) là home riêng của CLI; `@2`, `@work` hay `@client-x` là các phiên đăng nhập riêng, mỗi phiên trong thư mục riêng dưới thư mục gốc của hồ sơ, chạy song song. `ak profiles` liệt kê chúng cùng trạng thái đăng nhập và tên các khóa; `ak profiles --json` cung cấp cùng danh sách đó cho các công cụ (schema `profiles-v1`).

`ak usage` liệt kê hạn mức và mức sử dụng của mọi tài khoản mà kit nhìn thấy, mỗi tài khoản và hồ sơ một dòng: trực tiếp cho các gói đăng ký Claude Code (cửa sổ 5 giờ, hằng tuần và theo từng mô hình), các lần đăng nhập Codex qua ChatGPT và khóa của gói lập trình Z.AI; Cursor, Grok, xAI và Azure OpenAI hiển thị `n/d` kèm lý do. Lệnh này chỉ đọc: không bao giờ làm mới phiên đăng nhập, không bao giờ in token và không bao giờ ghi vào bên trong một hồ sơ. `--json` cung cấp cùng danh sách đó cho các công cụ (schema `usage-v1`). Các endpoint sử dụng là nội bộ của nhà cung cấp và không chính thức.

`ak pick <kind>` đọc cùng các dòng đó và chỉ ra tài khoản còn nhiều chỗ nhất. `--count N` trả về tối đa N tài khoản, tốt nhất trước; `--exclude @<profile>` loại một tài khoản đang bận; `--model` tính cửa sổ hằng tuần của một mô hình; `--need 5h:40` từ chối chọn khi không còn đủ chỗ như vậy. `--json` cung cấp schema `pick-v1`.

```bash
ak usage                   # hạn mức của mọi tài khoản và hồ sơ
ak pick claude --count 3   # ba tài khoản Claude còn nhiều chỗ nhất
ak claude @work --trust-cwd  # tài khoản thứ hai, thư mục được tin cậy trước
ak profiles --json         # profiles-v1, cho các công cụ
ak setup verify            # các bước kiểm tra theo thứ tự, mỗi bước kèm lệnh khắc phục
```

`--trust-cwd` (hoặc `AGENTKIT_TRUST_CWD=1`) tin cậy trước thư mục mà agent khởi động trong đó, nên Claude Code và Codex mở ra mà không có màn hình tin cậy thư mục. `ak setup probe | verify | docker` là trình trợ giúp chỉ đọc, do skill `agentkit-setup` điều khiển, giúp kiểm tra máy, xác minh bản cài đặt và tạo công thức container được ghim theo tag và đã xác minh.

## Nhiều agent, nhiều tài khoản

Skill `agentkit-orchestrate` (`ak --skill orchestrate`) dạy một agent phân bổ công việc cho nhiều agent, tài khoản và nhà cung cấp: một lần `ak usage` trước đợt việc, `ak pick --count N` để chọn tài khoản, một agent được ủy thác cho mỗi tài khoản, cổng kiểm chứng của chính repository cho mọi kết quả, và chuyển sang tài khoản kế tiếp khi một tài khoản chạm giới hạn. Bộ kit quan sát, tính toán và chạy; nó không bao giờ lập lịch. Lead — bạn, hoặc một agent bạn đã yêu cầu — là bên quyết định, chỉ dùng tài khoản của chính bạn và tuân thủ điều khoản của từng nhà cung cấp.

Với các lane dài và có tương tác, mỗi lane chạy trong một pane [Herdr](/kit/herdr) trên tài khoản riêng. Chương phương pháp luận [Chạy nhiều agent](/methodology/06-orchestration) mô tả toàn bộ mô hình: một lead và các lane của nó, tài khoản được chọn theo hạn mức còn lại, phối hợp qua herdr-peers, và một nhánh cùng một bản phát hành cho mỗi repository.

## Cài đặt

```bash
git clone --branch v0.4.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Yêu cầu: `bash` trên macOS hoặc Linux, và `python3` 3.9 trở lên; không gì khác. Windows dùng `install.ps1`. Hãy ghim `v0.4.0`: `v0.2.0` và `v0.2.1` không được hỗ trợ. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/coding-agents-kit`, tag `v0.4.0`, giao diện 1 |
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

Hai addon có thể kết hợp với nhau: herdr-peers có thể khởi chạy một peer trong pane với môi trường mà `ak env <kind> @profile` in ra. Để chạy nhiều lane cùng lúc, xem [Chạy nhiều agent](/methodology/06-orchestration).

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Giá trị khóa API không bao giờ được in ra, ghi log hay ghi vào tệp cấu hình; ngoại lệ đã được tài liệu hóa là Cline, vốn nhận khóa qua dòng lệnh. Việc trích xuất kết quả cho OpenCode, Pi, Cline và Grok được xây dựng từ tài liệu của nhà cung cấp và chưa được thử nghiệm trên tài khoản thật; đầu ra không xác định sẽ quay về dạng văn bản thô.
