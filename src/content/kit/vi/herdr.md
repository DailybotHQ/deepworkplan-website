---
title: Herdr
description: "Addon v7 tùy chọn cho phép kế hoạch giao một tác vụ cho coding agent khác trong một pane Herdr, trên bất kỳ máy nào, và ghi lại một phản hồi được ủy quyền."
kind: addon
lang: vi
order: 7
---

# Herdr addon

[Herdr](https://herdr.dev) đặt các coding agent vào các pane, trên máy của bạn và trên các máy mà nó kết nối tới qua SSH. Addon này cho phép một Deep Work Plan sử dụng các agent đó như **peer** (tác tử ngang hàng): một kế hoạch có thể giao một tác vụ có giới hạn cho một agent trong pane khác, nhận đúng một phản hồi được ủy quyền và lưu lại bản ghi của lần trao đổi đó.

Đây là một addon tùy chọn của **DWP v7 beta** (`v7.0.0-beta.1`, một bản phát hành trước). Phương pháp hoạt động y như cũ khi không có nó: nếu addon không có mặt hoặc bị tắt, mọi tác vụ đều chạy trong phiên hiện tại, đúng như trước đây.

## Addon tích hợp những gì

Addon này là một lớp tích hợp mỏng. Công việc thực sự do **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)** đảm nhận: một skill MIT độc lập được ghim ở **`v0.1.0`**, vẫn hữu ích khi không dùng Deep Work Plan. Nó định nghĩa những điều mà bản thân Herdr để ngỏ: ai được phép trả lời, câu trả lời tìm đường quay về qua các máy như thế nào, làm sao để hai agent không trả lời nhau mãi mãi, và bản ghi "tôi đã hỏi, nó đã trả lời" được lưu ở đâu.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/herdr-peers`, tag `v0.1.0`, giao thức 1 |
| Khóa registry | `herdr` trong `.dwp/config.json` |
| Phương thức truyền | tương tác: một peer trong pane Herdr |
| Cung cấp | `subagents`, `cancel_children` |
| Yêu cầu | quyền `agent_delegation` trong hợp đồng của kế hoạch |

## Cài đặt

Cài đặt herdr-peers và skill chính thức của Herdr mà nó phụ thuộc vào. Mọi máy có agent cần trả lời cũng phải có skill này.

```bash
npx --yes skills add DailybotHQ/herdr-peers@v0.1.0 --skill herdr-peers -g
npx --yes skills add herdrdev/herdr@v0.9.3 --skill herdr -g
```

Yêu cầu: Herdr 0.9.1 trở lên, `bash` và `python3` 3.9 trở lên (chỉ dùng thư viện chuẩn). Onboarding đề xuất addon này và ghi lại câu trả lời của bạn vào registry addon; addon không bao giờ được bật khi chưa có sự đồng ý.

## Addon bổ sung gì cho một kế hoạch

- **Ủy thác cho một peer.** Trên một kế hoạch v7 có hợp đồng cấp quyền `agent_delegation`, `execute` có thể giao một tác vụ `parallel_safe`, hoặc một câu hỏi chỉ đọc, cho một agent trong pane khác, trên máy này hoặc một máy khác.
- **Một phản hồi được ủy quyền.** Yêu cầu mang một con dấu ủy quyền đúng một câu trả lời. Peer trả lời một lần thông qua công cụ hỗ trợ, và phản hồi đó mang con dấu riêng của nó.
- **Ghi lại trước khi dựa vào.** Mọi lần ủy thác đều được ghi vào `analysis_results/delegations.ndjson` của kế hoạch trước khi phản hồi được sử dụng, và tương ứng với sự kiện nhật ký v7 `delegation`.
- **Kết quả vẫn chỉ là tuyên bố cho đến khi được kiểm tra.** Câu trả lời của một peer là bằng chứng `asserted` cho đến khi trình chạy cổng của chính kế hoạch quan sát được nó. Nó không bao giờ tự mình đóng một tác vụ.

## Mô hình an toàn

| Quy tắc | Ý nghĩa |
|---|---|
| Cấp quyền trước | Việc ủy thác chỉ chạy khi hợp đồng của kế hoạch cấp quyền `agent_delegation`. |
| Giới hạn độ sâu 1 | Một tin nhắn được đóng dấu `depth=1` hoặc `reply-to=` không bao giờ được trả lời, và một agent được ủy thác không bao giờ ủy thác tiếp. |
| Giới hạn phân nhánh | Mặc định tối đa bốn peer cho mỗi bên gọi. |
| Dữ liệu, không phải chỉ dẫn | Một phản hồi không bao giờ cấp quyền hạn mà bên nhận chưa có sẵn. |
| Một bên ghi cho mỗi đường dẫn | Một peer có ghi dữ liệu sẽ làm việc trong git worktree riêng của nó. |

herdr-peers không xác thực bên gửi: trường `from=` trong một con dấu chỉ là một tuyên bố. Biện pháp giảm thiểu là danh sách cho phép `HERDR_PEERS_SCOPE`, giới hạn các workspace và máy mà một peer chấp nhận.

## Herdr hay agentkit

Cả hai addon đều triển khai cùng một giao diện ủy thác — `launch`, `observe`, `collect`, `cancel` — với các phương thức truyền khác nhau.

| Tình huống | Dùng |
|---|---|
| Một tác vụ `parallel_safe` có giới hạn với đầu ra đã khai báo | [agentkit](/kit/agentkit) (`ak run` headless trong một worktree) |
| Tác vụ cần tương tác, chạy lâu hoặc nằm trên một máy khác | Herdr (một peer trong pane) |

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào, và không luồng nào phụ thuộc vào addon này. Vòng khứ hồi hai pane, xuyên máy được kiểm thử với một Herdr mô phỏng; hãy lên kế hoạch cho lần chạy đầu tiên có giám sát.
