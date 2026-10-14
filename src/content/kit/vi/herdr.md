---
title: Herdr
description: "Giao việc cho một agent lập trình khác trong ngăn Herdr, trên bất kỳ máy nào, và nhận đúng một phản hồi đã ủy quyền. Kế hoạch biết ủy thác, có ghi lại."
kind: addon
lang: vi
order: 7
---

# Herdr addon

[Herdr](https://herdr.dev) đặt các coding agent vào các pane, trên máy của bạn và trên các máy mà nó kết nối tới qua SSH. Addon này cho phép một Deep Work Plan sử dụng các agent đó như **peer** (tác tử ngang hàng): một kế hoạch có thể giao một tác vụ có giới hạn cho một agent trong pane khác, nhận đúng một phản hồi được ủy quyền và lưu lại bản ghi của lần trao đổi đó.

Đây là một addon tùy chọn của **DWP v7** (pack `v7.8.1`). Phương pháp hoạt động y như cũ khi không có nó: nếu addon không có mặt hoặc bị tắt, mọi tác vụ đều chạy trong phiên hiện tại, đúng như trước đây.

## Addon tích hợp những gì

Addon này là một lớp tích hợp mỏng. Công việc thực sự do **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)** đảm nhận: một skill MIT độc lập được ghim ở **`v1.0.0`**, vẫn hữu ích khi không dùng Deep Work Plan. Nó định nghĩa những điều mà bản thân Herdr để ngỏ: ai được phép trả lời, câu trả lời tìm đường quay về qua các máy như thế nào, làm sao để hai agent không trả lời nhau mãi mãi, và bản ghi "tôi đã hỏi, nó đã trả lời" được lưu ở đâu.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/herdr-peers`, tag `v1.0.0`, giao thức 1 |
| Khóa registry | `herdr` trong `.dwp/config.json` |
| Phương thức truyền | tương tác: một peer trong pane Herdr |
| Cung cấp | `subagents`, `cancel_children` |
| Yêu cầu | quyền `agent_delegation` trong hợp đồng của kế hoạch |

**Ổn định từ `v1.0.0`.** Giao diện công khai tuân theo semantic versioning: các động từ CLI cùng các cờ được tài liệu hóa, mã thoát `0`–`7`, các biến `HERDR_PEERS_*`, `DWP_PLAN` và `DWP_TASK` được tài liệu hóa, giao thức 1, và các hợp đồng JSON `herdr-peers/lanes-v1`, `herdr-peers/lead-v1` cùng bản ghi ủy thác. Một thay đổi phá vỡ tương thích ở bất kỳ thành phần nào trong số đó sẽ tăng phiên bản chính, và một thay đổi định dạng truyền tải còn tăng cả số giao thức. `v1.0.0` không thay đổi hành vi nào so với `v0.3.3`, và các bản phát hành 0.x không còn được hỗ trợ.

## Cài đặt

Cài đặt herdr-peers và skill chính thức của Herdr mà nó phụ thuộc vào. Mọi máy có agent cần trả lời cũng phải có skill này.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.0.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
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

## Container và máy host

Với addon [devcontainer](/kit/devcontainer) trên devcontainer-kit `v1.0.1`, mọi container dck đều có sẵn herdr-peers và tham gia mạng lưới khi `dck up`: các agent của nó có thể hỏi các agent trên máy host, trong các container khác và trong các container loopback khác của máy host, rồi nhận lại phản hồi. `dck setup` cài đặt một herdr-peers đã được xác minh trên máy host, nên các agent trên máy host cũng phản hồi được. Listener trên máy host và các khóa bổ sung cho phép container khác truy cập là quyết định của bạn trong hồ sơ host của bộ kit; addon này không bao giờ thiết lập chúng. Từ herdr-peers (`v0.2.3`), mỗi máy giữ trạng thái riêng của mình (`$XDG_STATE_HOME/herdr-peers/<server>/`), nên một bản checkout được máy host và một container dùng chung không còn trộn lẫn bản ghi của chúng, và từ devcontainer-kit (`v0.3.3`), container tự export `HERDR_PEERS_SELF`, nên các agent Codex bên trong có thể tiếp cận máy khác mà không cần bước thủ công nào.

## Herdr hay agentkit

Cả hai addon đều triển khai cùng một giao diện ủy thác — `launch`, `observe`, `collect`, `cancel` — với các phương thức truyền khác nhau.

| Tình huống | Dùng |
|---|---|
| Một tác vụ `parallel_safe` có giới hạn với đầu ra đã khai báo | [agentkit](/kit/agentkit) (`ak run` headless trong một worktree) |
| Tác vụ cần tương tác, chạy lâu hoặc nằm trên một máy khác | Herdr (một peer trong pane) |

Với một lead chạy nhiều lane cùng lúc — các pane trên máy host, trong container và trên máy khác, mỗi lane trên tài khoản riêng — `herdr-peers lanes` liệt kê mọi lane cùng trạng thái của nó, `herdr-peers status <pane>` phân loại màn hình mà một lane bị chặn đang ở, và mỗi bản ghi ủy thác nêu tài khoản và nhà cung cấp đã đảm nhận nó. Xem [Chạy nhiều agent](/methodology/06-orchestration).

**Mỗi lane tự nêu pane của mình.** Theo quy tắc tự chủ swarm (Guide §17.2), mỗi lane truyền pane riêng của mình qua  trên mọi lệnh herdr-peers (, , , , , , ) để ngăn phân bổ sai tin nhắn và bão hòa khe cắm phân phối. Các lane Codex yêu cầu điều này đặc biệt nghiêm ngặt do máy chủ nền được chia sẻ giữa các phiên.

## Thông báo và quyền lead

herdr-peers (`v0.3.2`) bổ sung những gì giúp một bầy agent tồn tại lâu hơn lead của nó ([Tự chủ của bầy agent](/vi/methodology/07-swarm-autonomy)):

- **Thông báo.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` gửi một tin nhắn một chiều được đóng dấu `reply=no`. Lệnh `check` của bên nhận phân loại nó là một thông báo, ghi lại nó dưới dạng dữ liệu và không bao giờ trả lời. Thông báo không tốn suất phân nhánh nào và có thể được gửi trong khi một ask đang mở; hãy dùng chúng cho thông báo bàn giao, thay đổi lead và thông báo phát hành.
- **Một bản ghi lead cho mỗi kế hoạch.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` biến một agent thành lead của một kế hoạch; `lead show` in ra bản ghi (schema `herdr-peers/lead-v1`: kế hoạch, lead, epoch, danh sách kế nhiệm, các lane, thời điểm cập nhật). `lead handover <addr> --plan <P>` chuyển quyền lead cho agent khác, `lead takeover --plan <P>` cho phép phó lead đầu tiên liên lạc được tiếp quản khi lead biến mất, và `lead release --plan <P>` kết thúc nó. Mỗi thay đổi tăng epoch và thông báo cho mọi lane. Hãy claim kế hoạch trước khi khởi chạy các lane của nó: `lead` chỉ phân giải được khi đã có một bản ghi. Từ `v0.3.2`, bản ghi lưu cục bộ repository đã claim nó và từ chối việc claim cùng id kế hoạch từ một repository khác; hãy đặt tên kế hoạch đó là `--plan <repo>/<id>`.
- **Rào chắn (fencing).** Một lane chỉ chấp nhận thông báo lead từ agent đã giao việc cho nó (lần claim đầu tiên), từ lead hiện tại ở epoch kế tiếp (handover), hoặc từ mục đầu tiên liên lạc được trong danh sách kế nhiệm ở epoch kế tiếp (takeover). Mọi thông báo khác được ghi lại và bỏ qua, và một lead quay lại mà thấy epoch cao hơn sẽ rút lui.
- **Địa chỉ `lead`.** `ask lead …` và `notify lead …` được phân giải thành lead hiện tại của `--plan` (nếu không có thì `$DWP_PLAN`), nên không chỉ dẫn lane nào phải ghi cứng pane của lead.
- **Màn hình `usage_limit`.** `status` và `lanes` nhận diện thông báo giới hạn sử dụng của một CLI là lớp màn hình `usage_limit`, với bước tiếp theo là bàn giao. Nó không bao giờ được gửi phím. `lanes --json` bổ sung kế hoạch, lead của nó, epoch và năng lực được báo cáo gần nhất của mỗi lane.

Các lane cũng có thể hỏi nhau để lấy thông tin và phối hợp — một giao diện, một tên cờ, trạng thái một nhánh — nhưng chỉ lead mới giao việc. Độ sâu 1 và giới hạn phân nhánh vẫn giữ nguyên. Với `v0.2.x` không có thông báo hay bản ghi lead: các lane hỏi địa chỉ của lead lấy từ chỉ dẫn của chúng, và việc thay đổi lead do nhà phát triển chuyển tiếp.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào, và không luồng nào phụ thuộc vào addon này. Vòng khứ hồi hai pane, xuyên máy được kiểm thử với một Herdr mô phỏng; hãy lên kế hoạch cho lần chạy đầu tiên có giám sát.
