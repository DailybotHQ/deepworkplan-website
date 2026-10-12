---
title: Devcontainer
description: "Một dev container có thể tái tạo cho mỗi kho mã, từ một mẫu duy nhất: agent dùng tài khoản host qua ak, Herdr nối hai chiều và không có khóa SSH bên trong."
kind: addon
lang: vi
order: 1
---

# Devcontainer addon

Mang đến cho repository một dev container có thể tái lập và được cô lập — dùng chung được cho con người, trình soạn thảo và coding agent. Trong **DWP v7** (gói `v7.6.1`), addon này tích hợp **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, một sản phẩm MIT hoạt động được mà không cần Deep Work Plan. Addon là tùy chọn: một repo vẫn hoàn toàn tuân thủ khi không có nó.

## devcontainer-kit cung cấp những gì

- **Một template**, xây dựng trên đặc tả [Dev Containers](https://containers.dev), được `dck init` tạo vào repository theo một bố cục cố định: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` và `dev.sh`. Khi chạy lại sau này, nó dung hòa và không bao giờ ghi đè các chỉnh sửa của bạn; mọi thay đổi đối với một tệp sẵn có đều được hiển thị trước và cần sự đồng ý.
- **Container riêng của repository.** Dockerfile bắt đầu từ image chính thức của runtime được ghim theo digest — `node-24`, `python-3.13` hoặc `debian` — và sao chép các bước build của bộ kit vào `docker/local/<service>/dck/`. Không có base image dùng chung nào tham gia.
- **`dev.sh` và `dck`.** `bash dev.sh up` build, khởi động và gắn vào container từ một terminal thông thường; `shell`, `rebuild`, `doctor` và các lệnh còn lại hoạt động có hoặc không có VS Code hay Cursor.
- **Herdr hai chiều.** [Herdr](https://herdr.dev) trên máy host gắn mỗi container như một máy qua một máy chủ SSH chỉ lắng nghe trên loopback, và container mở ra với thanh bên tiêu chuẩn: App, Editor, Development và Agents. Mọi workspace và pane, kể cả những cái được mở sau này, đều bắt đầu tại đường dẫn ứng dụng (mặc định là `/app`). Bên trong, [herdr-peers](/kit/herdr) cho phép các agent hỏi các agent trên máy host và trong các container khác.
- **Skill `dck-dockerfile`.** Một agent tạo hoặc tái tạo container của một repository theo yêu cầu và chứng minh nó bằng một lần build thật.

## Cài đặt

```bash
git clone --branch v0.3.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Yêu cầu: `bash` 3.2 trở lên và `python3` 3.11 trở lên trên máy host Linux hoặc macOS, cùng Docker với Compose v2 cho các lệnh container. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó. Hãy ghim `v0.3.1`: `v0.2.0` không được hỗ trợ.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/devcontainer-kit`, tag `v0.3.1`, giao diện 2 |
| Khóa registry | `devcontainer` trong `.dwp/config.json` |
| Cấu hình theo từng repository | `.devcontainer/dck.toml` |
| Phát hiện | `dck doctor --json` |

## Các lớp

Mọi container đều mang theo các công cụ phát triển — git, gh, ripgrep, một máy chủ SSH, Herdr và herdr-peers — và không có secret nào trừ khi bạn chọn bật [tài khoản host](#tài-khoản-host-bên-trong-container). Phần còn lại là một lớp mà bạn chọn trong `dck.toml`:

| Lớp | Mặc định | Bổ sung gì |
|---|---|---|
| `agents` | tắt | [coding-agents-kit](/kit/agentkit) từ bản phát hành đã được xác minh và các CLI bạn liệt kê, mỗi CLI có volume bền vững riêng, cùng các preset `classic` (`claudex`, `codexx`, …) và `providers` (`claude-glm`, `codex-azure`, …). Agent chạy ở chế độ tự chủ theo mặc định — container chính là sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` trong tệp `.env` của service. |
| `editor` | bật | Neovim với [DeepWorkPlan Vim](/kit/vim) được ghim theo tag; khi tắt sẽ là một trình soạn thảo thông thường. |
| `dailybot` | tắt | Dailybot CLI, dành cho addon dailybot. |

Thông tin đăng nhập, `gh`, cấu hình Herdr và danh tính git được giữ lại sau `bash dev.sh rebuild`.

## Agent trên nhiều máy

Từ `v0.2.3`, `dck up` thiết lập một mạng lưới hai chiều mà không cần bước thủ công nào, trên Docker Desktop:

- **Container và máy host.** Agent bên trong kết nối tới các agent Herdr trên máy host, trong mọi container dck khác và trong các container loopback khác mà Herdr của máy host đã quản lý — và các agent đó cũng kết nối ngược lại. Mỗi peer mang một khóa host được ghim; không có gì được tin cậy ở lần dùng đầu tiên.
- **Một listener tùy chọn trên máy host.** `dck setup` đề xuất, một lần duy nhất, một máy chủ SSH cấp người dùng trên `127.0.0.1` chỉ chấp nhận khóa dck và được launchd giữ cho chạy liên tục (macOS). Nếu bạn đã chạy một listener loopback, hãy trỏ hồ sơ host tới listener đó. `dck host listener disable` sẽ gỡ bỏ nó.
- **Tồn tại qua các lần rebuild.** Danh mục máy Herdr của container nằm trên một volume, nên `bash dev.sh rebuild` giữ lại mọi máy đã đăng ký bên trong.
- **Phản hồi cả từ máy host.** `dck setup` cài đặt một [herdr-peers](/kit/herdr) đã được xác minh trên máy host, nên `dck agents` và `dck ask` hoạt động ở đó, và các agent trên máy host trả lời bằng `herdr-peers reply`.
- **Container không do bộ kit tạo ra.** Liệt kê các khóa công khai mà chúng dùng để đăng nhập trong `[ssh] authorized_extra` của hồ sơ host, và chúng cũng có thể kết nối tới các container dck.

Kết hợp với [coding-agents-kit](/kit/agentkit) trên máy host và trong container, và cùng một lệnh `ak` sẽ khởi chạy agent ở cả hai phía.

## Tài khoản host bên trong container

Một container có thể dùng các tài khoản bạn đã có trên máy host, giống như cách git vốn hoạt động qua SSH agent của máy host, mà không cần đăng nhập bên trong. Tính năng này là opt-in và nằm trong **hồ sơ host** của bạn, không bao giờ trong `dck.toml` của một repository:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

Khi bật `host_profiles`, `dck up` chỉ chia sẻ hồ sơ của những CLI mà repository cài đặt:

- **Claude Code** qua một token dài hạn cho mỗi hồ sơ: `CLAUDE_CODE_OAUTH_TOKEN` cho `@default` và `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` cho `@name` (hậu tố viết hoa, mọi ký tự ngoài `A-Z`, `0-9` và `_` được đổi thành `_`).
- **Codex** qua tệp xác thực của nó, cho `@default` và cho từng hồ sơ.
- **Tệp env của bộ kit**, chỉ đọc và rút gọn còn các tên trong `host_env_keys`.

Toàn bộ home của agentkit không bao giờ được mount, và các hồ sơ chứa đường dẫn tuyệt đối của máy host sẽ bị bỏ qua. Một phiên đăng nhập Codex được chia sẻ ở chế độ đọc-ghi có thể bị hai bên ghi làm mới cùng lúc: hãy giữ một agent đang hoạt động cho mỗi tài khoản Codex. Bên trong container, cùng lệnh `ak <kind> @<profile>` chạy trên cùng tài khoản như trên máy host, và đó là điều cho phép một lead giao cho các lane trong container những tài khoản mà `ak pick` đã chọn — xem [Chạy nhiều agent](/methodology/06-orchestration).

## Mặc định bảo mật

- Mọi cổng được công bố đều gắn vào `127.0.0.1` trừ khi `dck.toml` thiết lập `bind`.
- Git qua SSH đi qua SSH agent của máy host — socket của nó, không bao giờ là một tệp khóa và không bao giờ là `~/.ssh` hay `~/.gitconfig` được mount vào. Danh tính git lấy từ các giá trị `DCK_GIT_*` do `dck setup` điền.
- Khóa host SSH được tạo lúc chạy vào một volume riêng cho từng dự án, không bao giờ được đóng gói sẵn vào image; máy chủ chỉ chấp nhận khóa công khai, không cho đăng nhập root và không dùng mật khẩu.
- Template không thêm `cap_add`, không dùng chế độ `privileged` và không có Docker socket.
- Mọi lượt tải xuống đều được ghim theo phiên bản và xác minh bằng checksum; base image được ghim theo digest.
- Mạng lưới Herdr cho phép agent trong một container kết nối tới các container khác được bật theo mặc định và được tài liệu hóa cùng các công tắc tắt trong mô hình mối đe dọa của bộ kit. Listener trên máy host cho phép mã trong một container đang chạy mở shell trên máy host dưới danh nghĩa của bạn: nó chỉ bật khi bạn chọn, chỉ dùng loopback, chỉ chấp nhận khóa dck và được gỡ bằng `dck host listener disable`.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào. v0.2 hỗ trợ máy host Linux và macOS; mạng lưới giữa các container cần Docker Desktop.
