---
title: Agentkit
description: "Một lệnh cho mọi agent lập trình trên terminal: mỗi hồ sơ một tài khoản, ak pick chọn tài khoản còn nhiều chỗ nhất, tự chủ có opt-out, và chạy headless."
kind: addon
lang: vi
order: 8
---

# Agentkit addon

Mỗi coding agent trên terminal đều có các cờ riêng để tiếp tục một phiên, cách riêng để tách biệt tài khoản thứ hai, chế độ headless riêng và công tắc riêng để bỏ qua các lời nhắc cấp quyền. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** đặt một bề mặt lệnh duy nhất lên tất cả chúng: `ak <kind> [@profile]`.

Addon này tích hợp bộ kit vào **DWP v8** (gói `v8.0.4`) làm phương thức truyền ủy thác **headless**. Addon là tùy chọn: khi không có nó, mọi tác vụ đều chạy trong phiên hiện tại, đúng như trước đây. Bản thân bộ kit là một sản phẩm MIT hoạt động được mà không cần Deep Work Plan.

Deep Work Plan có bốn trụ cột: đặc tả trước, repository là harness, loop engineering và hiệu quả đo được. Addon và các tích hợp có thể mở rộng harness và vòng lặp; phương pháp vẫn hoạt động độc lập.

## Bộ kit mang lại cho bạn những gì

- **Một cú pháp cho mọi CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` và `ak antigravity`, cùng các tuyến nhà cung cấp (Z.AI GLM, Azure OpenAI, xAI và Gemini API), với cùng các cờ phiên: `-c` để tiếp tục, `-r <id>` để khôi phục.
- **Hồ sơ.** `ak claude @work` chạy một tài khoản thứ hai trong thư mục home riêng, tách biệt với tài khoản thứ nhất.
- **Chạy headless.** `ak run <kind> -- "<prompt>"` chạy một prompt ở chế độ không tương tác và trả về một mã thoát đã được tài liệu hóa, tùy chọn dưới dạng một đối tượng JSON duy nhất.
- **Công cụ chẩn đoán.** `ak doctor --json` báo cáo những CLI nào đã được cài, các hồ sơ, và tên của các khóa đã được thiết lập — không bao giờ là giá trị của chúng.
- **Cài đặt có xác minh.** `ak install <cli>` cài một CLI còn thiếu từ kênh chính thức của nhà cung cấp ở một phiên bản được ghim, đối chiếu với một sha256 được ghim hoặc thông tin integrity của npm registry.
- **Những cái tên quen thuộc.** Hai preset bí danh, ở trạng thái tắt cho đến khi bạn bật: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) và `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), mỗi bí danh là một lệnh `ak <kind>`.

## Tài khoản, hạn mức và chọn tài khoản

Kể từ `v1.0.1`, mọi profile — bao gồm cả `@default` — là một tài khoản độc lập trong thư mục riêng dưới thư mục gốc profile, ngăn rò rỉ trạng thái và xung đột chứng chỉ. `ak profiles` liệt kê chúng cùng trạng thái đăng nhập và tên các khóa; `ak profiles --json` cung cấp cùng danh sách đó cho các công cụ (schema `profiles-v1`). Từ `v0.5.1`, lệnh này báo cáo token của Claude Code thực sự nằm ở đâu — `file`, `keychain` (macOS), `none` hoặc `unknown` — chỉ dựa trên sự hiện diện, không bao giờ đọc secret, và nhận diện được phiên đăng nhập Cursor trên Linux, trong container hoặc trên máy host Linux. Từ `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` chỉ định tài khoản mà lệnh `ak <cli>` không kèm tham số sử dụng (một `@profile` theo vị trí vẫn được ưu tiên), và đó là cách một dev container chọn tài khoản host mà nó dùng chung. Từ `v0.5.3`, `ak codex` thêm `--no-daemon` khi một home Codex dùng chung với máy khác ghi nhận một daemon chạy nền không có trên máy này.

`ak usage` (hoặc `ak status`) liệt kê mọi tài khoản của mọi CLI mà kit biết, mỗi tài khoản và hồ sơ một dòng, nằm dưới CLI của nó: hạn mức trực tiếp cho các gói đăng ký Claude Code (cửa sổ 5 giờ, hằng tuần và theo từng mô hình), các lần đăng nhập Codex qua ChatGPT, khóa của gói lập trình Z.AI và, từ `v0.7.0`, các lần đăng nhập Google của Antigravity trên Linux và trong container (cửa sổ năm giờ và hằng tuần của chính bảng `/usage` của agy). Tài khoản không đọc được hạn mức vẫn có dòng của mình: `n/d` kèm cách nó được kết nối và lý do — Cursor, Grok, xAI, Azure OpenAI, một khóa API Gemini, hoặc một lần đăng nhập Antigravity được lưu trong Keychain của macOS — hoặc `no login` kèm lệnh để đăng nhập, nên bảng cũng cho thấy những tài khoản nào của mỗi CLI đã được kết nối. Lệnh này chỉ đọc: không bao giờ làm mới phiên đăng nhập, không bao giờ in token và không bao giờ ghi vào bên trong một hồ sơ. `--json` cung cấp cùng danh sách đó cho các công cụ (schema `usage-v1`). Các endpoint sử dụng là nội bộ của nhà cung cấp và không chính thức.

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

Với các lane dài và có tương tác, mỗi lane chạy trong một pane [Herdr](/kit/herdr) trên tài khoản riêng. Chương phương pháp luận [Chạy nhiều agent](/methodology/06-orchestration) mô tả toàn bộ mô hình: một lead và các lane của nó, tài khoản được chọn theo hạn mức còn lại, phối hợp qua herdr-peers, và một nhánh cùng một bản phát hành cho mỗi repository; [Tự chủ của bầy agent](/vi/methodology/07-swarm-autonomy) bổ sung việc kiểm tra năng lực, bàn giao và kế nhiệm lead.

## Năng lực và lease

Từ `v0.6.0`, một agent có thể hỏi tài khoản của chính nó còn bao nhiêu chỗ, với chi phí thấp, tại mỗi ranh giới tác vụ — tín hiệu cho phép một bầy agent chuyển giao công việc trước khi một tài khoản cạn ([Tự chủ của bầy agent](/vi/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (schema `capacity-v1`) cho biết `headroom_pct` của tài khoản đang chạy, `binding_window`, `resets_at` của nó và một `verdict`: `ok`, `low` (25 % trở xuống), `critical` (10 % trở xuống, hoặc bị giới hạn tốc độ) hoặc `unknown` (không có nguồn hạn mức: Cursor, Grok, hoặc Antigravity trên macOS). Lệnh này dùng cùng phép tính của `ak pick`, nên hai lệnh không bao giờ mâu thuẫn, và đọc một bộ nhớ đệm mức sử dụng được giữ trong 300 giây (`--max-age`), nên việc kiểm tra tại mỗi ranh giới tác vụ vẫn rẻ. `--self` xác định tài khoản mà `ak` đã khởi chạy; ngoài một lần khởi chạy bằng `ak`, lệnh thoát với mã 3 và không bao giờ đoán. `ak usage` vẫn đọc trực tiếp và làm mới bộ nhớ đệm.
- **Ngưỡng và diễn tập.** `AGENTKIT_CAPACITY_LOW` và `AGENTKIT_CAPACITY_CRITICAL` (hoặc `--low` và `--critical`) dịch chuyển các ngưỡng. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` chỉ có thể hạ một số đo — đó là cách một buổi diễn tập làm cho một tài khoản trông như sắp cạn — và không bao giờ làm cho tài khoản trông dư dả hơn.
- **`ak lease <kind> @<profile> --owner <addr>`** giữ một tài khoản cho một lane; `ak lease release …` giải phóng nó khi một agent kế nhiệm đã chấp nhận bàn giao, và `ak lease ls` liệt kê các lease (schema `leases-v1`). Một hồ sơ Codex chỉ nhận một lease — một bên ghi cho mỗi tệp xác thực — và chỉ chủ sở hữu mới giải phóng được lease. Lease có thời hạn và chỉ là bản ghi tham khảo gồm các con số, tên hồ sơ và địa chỉ pane, không bao giờ là thông tin xác thực.
- **`ak pick <kind> --owner <lead>`** đếm mọi lease đang hoạt động, kể cả lease của chính chủ sở hữu: nó xếp hạng ứng viên theo `headroom / (1 + leases)` và không bao giờ đề xuất một tài khoản Codex đang được lease, kể cả cho người đang giữ nó. `--reuse @<profile>` chuyển tiếp một lease của chính chủ sở hữu, chẳng hạn cho agent kế nhiệm của một lane. Khi không có `--owner`, thứ hạng không đổi.

```bash
ak capacity --self --json                        # chỗ còn lại và kết luận của chính agent này
ak lease claude @work --owner local:w2:p1        # giữ một tài khoản cho một lane
ak pick codex --owner local:w1:p1 --count 2      # bỏ qua các tài khoản đã lease cho bên khác
```

Công việc chỉ di chuyển giữa các tài khoản bạn đã khai báo cho kế hoạch, trong khuôn khổ điều khoản của từng nhà cung cấp: không agent nào tạo tài khoản, gia hạn phiên đăng nhập hay dùng một lần đặt lại Codex. Gói Deep Work Plan đọc kết luận qua trình trợ giúp riêng của nó và chuyển kết luận thành tiếp tục, chuẩn bị hoặc bàn giao; khi không có bộ kit, hoặc với một bộ kit cũ hơn, năng lực được báo cáo là không xác định, không bao giờ là ok.

## Cài đặt

```bash
git clone --branch v1.5.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Yêu cầu: `bash` trên macOS hoặc Linux, và `python3` 3.9 trở lên; không gì khác. Windows dùng `install.ps1`. Hãy ghim `v1.5.1`: `v0.2.0` và `v0.2.1` không được hỗ trợ. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/coding-agents-kit`, tag `v1.5.1`, giao diện 1 |
| Khóa registry | `agentkit` trong `.dwp/config.json` |
| Phương thức truyền | headless: một `ak run` cho mỗi agent được ủy thác, trong một git worktree riêng |
| Cung cấp | `subagents`, `cancel_children`, `model_routing` |
| Yêu cầu | quyền `agent_delegation` trong hợp đồng của kế hoạch |

**Ổn định từ `v1.0.0`.** Giao diện công khai của bộ kit tuân theo semantic versioning và chỉ thay đổi không tương thích trong một phiên bản chính mới: bề mặt lệnh (`ak <kind> [@profile]` cho mọi kind trong `providers.toml`, và mọi động từ cùng các cờ được tài liệu hóa), chế độ cấp quyền, giao diện 1 (`ak doctor --json`, `ak env`, cú pháp và envelope của `ak run`), các schema JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1` và `setup-verify-v1`), cùng bố cục cài đặt và tên biến trong tệp env. `v1.0.0` không thay đổi lệnh, cờ, khóa hay schema nào so với `v0.7.1`.

Bản phát hành 1.2.0 thêm **`ak last`**: mỗi lần khởi động tương tác đều ghi lại kind và profile theo thư mục làm việc; `ak last` khởi động lại nó với `-c` (tiếp tục phiên mới nhất tại đó) trong bất kỳ terminal nào, `ak last -r` mở trình chọn của CLI trong tài khoản đó, và `ak last ls` liệt kê bản ghi. Một lần khởi động bên trong pane Herdr cũng sống sót qua việc Herdr hoặc máy khởi động lại: pane quay lại qua `ak --resume` với cùng tài khoản, khóa từ tệp env và tư thế quyền nguyên vẹn (`AGENTKIT_HERDR_RESUME=0` tắt nó).

Kit bản 1.3.0 (giao diện 1 không đổi) thêm **pick-v2**: `ak pick --kinds codex,claude` xếp hạng qua các kind, `--model-for KIND=NAME` ghi đè mô hình theo từng kind, và `--json` trả về hợp đồng khởi động — `launch.argv` với `launch.permissions` (`auto` hoặc `ask`) và dạng `qualifies: false`. `--model` trở thành cờ đầu được ánh xạ sang cờ riêng của mỗi CLI (codex `-m`) — một thay đổi hành vi với các script truyền `--model` xuyên qua.

Kit bản 1.4.0 (giao diện 1 không đổi) thêm **`ak update`**, chỉ do con người gọi: nó đưa một CLI đến bản phát hành mới nhất của nhà cung cấp với xác minh của `ak install` — khám phá, xác minh, cài đặt và ghim lại `providers.toml` của kit này một cách nguyên tử (giữ một `.bak`). `--take-over` bắt buộc khi thay thế symlink do nhà cung cấp quản lý, việc hạ phiên bản bị từ chối trừ khi nêu tên, và bản cập nhật chỉ tính khi PATH phân giải được bản mới.

## Từ coding-agents-kit 1.5.0 (giao diện 1)

Bản phát hành này bổ sung trường `tokens` cho `ak run --json`, chỉ chứa số liệu do CLI báo cáo (`input`, `output`, `cache_read`, `cache_write` và `total`). Giá trị không được báo cáo vẫn là `null`; kit không bao giờ tự suy ra. `ak usage --json` bổ sung khối `advisory` gồm `runs`, `tokens` và `coverage`. Khối này chỉ để tham khảo, không thay đổi cửa sổ hạn mức của nhà cung cấp, kết luận về năng lực hay điều kiện được chọn bởi `ak pick`.

Khi `--ask` hoặc `AGENTKIT_PERMISSIONS=ask` được bật, `ak` nay buộc dùng chế độ ask tường minh riêng của từng CLI; CLI không có cờ ask giữ nguyên. Khi lựa chọn opt-out này được bật, `launch.argv` của pick-v2 kết thúc bằng `--ask`. herdr-peers (v2.0.2) trở lên chấp nhận đối số cuối này; v2.0.1 từ chối.

## Từ coding-agents-kit 1.5.1 (giao diện 1)

Đây là bản vá; định dạng của `ak doctor --json` không đổi. `ak install` và `ak update` giờ cài các CLI từ npm với `--include=optional`, nên Codex giữ được tệp nhị phân gốc cho từng nền tảng. Một CLI đã cài phải khởi động được (`--version` thoát với mã 0, được kiểm tra mà không có biến khóa); nếu không, `ak` cài lại nó một lần rồi báo cáo bản cài thất bại kèm lỗi của chính CLI đó. `ak doctor` đánh dấu một CLI được tìm thấy nhưng không khởi động được và nêu cách sửa.

## Tự chủ theo mặc định, với lựa chọn opt-out luôn được ưu tiên

Kể từ `v0.2.0`, `ak <kind>` khởi chạy mọi agent ở chế độ **tự chủ**: nó thêm cờ tự chủ của chính CLI đó, chỉ được lưu trong tệp `providers.toml` của bộ kit. Chế độ tự chủ dành cho các môi trường dùng một lần hoặc có sandbox, chẳng hạn một dev container.

**Opt-out luôn được ưu tiên**: `--ask` trên một lệnh, hoặc `AGENTKIT_PERMISSIONS=ask` trong môi trường hay trong tệp env của bộ kit, sẽ chặn cờ đó ngay cả khi cùng lệnh có `--auto`. Một phiên đã opt-out sẽ truyền opt-out đó sang các agent mà nó khởi chạy. Trên máy host, hãy thiết lập opt-out.

Addon không tự viết ra cờ tự chủ nào và không bao giờ truyền `--auto`. Nó truyền `--ask` khi một kế hoạch ghi nhận opt-out. Một kế hoạch cấp quyền `agent_delegation` trên máy host chấp nhận các agent được ủy thác chạy tự chủ, bị giới hạn trong worktree riêng của chúng — vốn không phải là một sandbox.

## Addon bổ sung gì cho một kế hoạch

Trên một kế hoạch v7 hoặc v8 có hợp đồng cấp quyền `agent_delegation`, `execute` có thể giao một tác vụ `parallel_safe` cho một CLI khác: nó tạo một git worktree riêng, chạy `ak run` ở đó với giới hạn thời gian và thu thập kết quả vào `analysis_results/delegations/` của kế hoạch. Kết quả là bằng chứng `asserted` cho đến khi trình chạy cổng của chính kế hoạch quan sát được nó. Việc hủy một agent được ủy thác sẽ dừng toàn bộ cây tiến trình của nó.

## Agentkit hay Herdr

| Tình huống | Dùng |
|---|---|
| Một tác vụ `parallel_safe` có giới hạn với đầu ra đã khai báo | Agentkit (headless) |
| Tác vụ cần tương tác, chạy lâu hoặc nằm trên một máy khác | [Herdr](/kit/herdr) (một peer trong pane) |

Hai addon có thể kết hợp với nhau: herdr-peers có thể khởi chạy một peer trong pane với môi trường mà `ak env <kind> @profile` in ra. Để chạy nhiều lane cùng lúc, xem [Chạy nhiều agent](/methodology/06-orchestration).

herdr-peers 2.0.0 dùng giao diện này cho bộ não autopilot tùy chọn: `ak pick --kinds ... --json` trả về hợp đồng khởi chạy pick-v2; Herdr xác thực hợp đồng, yêu cầu `launch.permissions: ask`, rồi khởi chạy `launch.argv` được trả về. Bộ não không thể bật các cờ tự chủ hoặc bypass. `ak update` vẫn do con người gọi; bộ não không bao giờ cập nhật CLI.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Giá trị khóa API không bao giờ được in ra, ghi log hay ghi vào tệp cấu hình; ngoại lệ đã được tài liệu hóa là Cline, vốn nhận khóa qua dòng lệnh. Việc trích xuất kết quả cho OpenCode, Pi, Cline và Grok được xây dựng từ tài liệu của nhà cung cấp và chưa được thử nghiệm trên tài khoản thật; đầu ra không xác định sẽ quay về dạng văn bản thô.
