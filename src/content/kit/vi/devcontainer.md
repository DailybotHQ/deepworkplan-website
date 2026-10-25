---
title: Devcontainer
description: "Một dev container có thể tái tạo cho mỗi kho mã, từ một mẫu duy nhất: agent dùng tài khoản host qua ak, Herdr nối hai chiều, khóa SSH chỉ khi bạn chọn bật."
kind: addon
lang: vi
order: 1
---

# Devcontainer addon

Mang đến cho repository một dev container có thể tái lập và được cô lập — dùng chung được cho con người, trình soạn thảo và coding agent. Trong **DWP v7** (gói `v7.9.0`), addon này tích hợp **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, một sản phẩm MIT hoạt động được mà không cần Deep Work Plan. Addon là tùy chọn: một repo vẫn hoàn toàn tuân thủ khi không có nó.

## devcontainer-kit cung cấp những gì

- **Một template**, xây dựng trên đặc tả [Dev Containers](https://containers.dev), được `dck init` tạo vào repository theo một bố cục cố định: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` và `dev.sh`. Khi chạy lại sau này, nó dung hòa và không bao giờ ghi đè các chỉnh sửa của bạn; mọi thay đổi đối với một tệp sẵn có đều được hiển thị trước và cần sự đồng ý.
- **Container riêng của repository.** Dockerfile bắt đầu từ image chính thức của runtime được ghim theo digest — `node-24`, `python-3.13` hoặc `debian` — và sao chép các bước build của bộ kit vào `docker/local/<service>/dck/`. Không có base image dùng chung nào tham gia.
- **`dev.sh` và `dck`.** `bash dev.sh up` build, khởi động và gắn vào container từ một terminal thông thường; `shell`, `rebuild`, `doctor` và các lệnh còn lại hoạt động có hoặc không có VS Code hay Cursor.
- **Herdr hai chiều.** [Herdr](https://herdr.dev) trên máy host gắn mỗi container như một máy qua một máy chủ SSH chỉ lắng nghe trên loopback, và container mở ra với thanh bên tiêu chuẩn: App, Editor, Development và Agents. Mọi workspace và pane, kể cả những cái được mở sau này, đều bắt đầu tại đường dẫn ứng dụng (mặc định là `/app`). Bên trong, [herdr-peers](/kit/herdr) cho phép các agent hỏi các agent trên máy host và trong các container khác.
- **Skill `dck-dockerfile`.** Một agent tạo hoặc tái tạo container của một repository theo yêu cầu và chứng minh nó bằng một lần build thật.

## Cài đặt

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Yêu cầu: `bash` 3.2 trở lên và `python3` 3.11 trở lên trên máy host Linux hoặc macOS, cùng Docker với Compose v2 cho các lệnh container. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó. Hãy ghim `v1.0.1`: `v0.2.0` không được hỗ trợ.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/devcontainer-kit`, tag `v1.0.1`, giao diện 2 |
| Khóa registry | `devcontainer` trong `.dwp/config.json` |
| Cấu hình theo từng repository | `.devcontainer/dck.toml` |
| Phát hiện | `dck doctor --json` |

**Ổn định từ `v1.0.0`.** Giao diện công khai tuân theo semantic versioning và chỉ thay đổi không tương thích trong một phiên bản chính mới (và, đối với các tệp, một số giao diện mới): các động từ `dck` cùng các cờ và mã thoát được tài liệu hóa (`0` thành công, `1` thất bại, `2` sai cách dùng, `3` cấu hình, `4` môi trường, `5` bị từ chối), các schema của `dck.toml`, hồ sơ host và `dck doctor --json` (giao diện 2), và hợp đồng render — các tệp mà `dck init` ghi và sở hữu, các marker `dck:managed` và khối người dùng mà nó giữ nguyên, cùng môi trường mà entrypoint đọc. Không có gì bị phá vỡ khi chuyển từ `v0.3.7`: hãy chạy `dck init` và `dck rebuild` để image mang các phiên bản ghim mới (herdr-peers, coding-agents-kit và DeepWorkPlan Vim, mỗi thành phần ở `v1.0.0`).

## Các lớp

Mọi container đều mang theo các công cụ phát triển — git, gh, ripgrep, một máy chủ SSH, Herdr và herdr-peers — và không có secret nào trừ khi bạn chọn bật [tài khoản host](#tài-khoản-host-bên-trong-container). Phần còn lại là một lớp mà bạn chọn trong `dck.toml`:

| Lớp | Mặc định | Bổ sung gì |
|---|---|---|
| `agents` | tắt | [coding-agents-kit](/kit/agentkit) từ bản phát hành đã được xác minh và các CLI bạn liệt kê, mỗi CLI có volume bền vững riêng, cùng các preset `classic` (`claudex`, `codexx`, …) và `providers` (`claude-glm`, `codex-azure`, …). Agent chạy ở chế độ tự chủ theo mặc định — container chính là sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` trong tệp `.env` của service. |
| `editor` | bật | Neovim với [DeepWorkPlan Vim](/kit/vim) được ghim theo tag; khi tắt sẽ là một trình soạn thảo thông thường. |
| `dailybot` | tắt | Dailybot CLI, dành cho addon dailybot. |

Thông tin đăng nhập, `gh`, cấu hình Herdr và danh tính git được giữ lại sau `bash dev.sh rebuild`. Với lớp `agents`, image còn mang theo ba skill của coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), được liên kết vào thư mục skill của mọi agent ở mỗi lần khởi động, nên một container được tạo lại vẫn giữ chúng.

Volume trạng thái (khóa host SSH, `~/.ssh`, phiên đăng nhập `gh`, trạng thái client Herdr, lịch sử) có tên là `state`. Khi nhiều service dùng chung một dự án compose, hãy đặt cho mỗi service một tên riêng bằng `[compose] state_volume` trong `dck.toml` (hoặc `dck init --state-volume NAME`); nếu không, tất cả sẽ mount cùng một volume, và `dck doctor` sẽ báo điều đó.

## Agent trên nhiều máy

Từ `v0.2.3`, `dck up` thiết lập một mạng lưới hai chiều mà không cần bước thủ công nào, trên Docker Desktop:

- **Container và máy host.** Agent bên trong kết nối tới các agent Herdr trên máy host, trong mọi container dck khác và trong các container loopback khác mà Herdr của máy host đã quản lý — và các agent đó cũng kết nối ngược lại. Mỗi peer mang một khóa host được ghim; không có gì được tin cậy ở lần dùng đầu tiên.
- **Một listener tùy chọn trên máy host.** `dck setup` đề xuất, một lần duy nhất, một máy chủ SSH cấp người dùng trên `127.0.0.1` chỉ chấp nhận khóa dck và được launchd giữ cho chạy liên tục (macOS). Nếu bạn đã chạy một listener loopback, hãy trỏ hồ sơ host tới listener đó. `dck host listener disable` sẽ gỡ bỏ nó.
- **Tồn tại qua các lần rebuild.** Danh mục máy Herdr của container nằm trên một volume, nên `bash dev.sh rebuild` giữ lại mọi máy đã đăng ký bên trong. Từ `v0.3.2`, `rebuild`, `start` và `restart` chạy cùng các bước như `up`: container được đăng ký lại với Herdr của máy host, khóa host của nó được ghim lại và mạng lưới được đẩy đi, nên một container được dựng từ đầu tiếp cận máy host và các peer của nó ngay lập tức.
- **Pane Codex bên trong container.** Một agent Codex cần `HERDR_PEERS_SELF`, tức mã máy của container như đã lưu trên máy host, để hỏi các peer trên máy khác. Từ `v0.3.3`, bộ kit ghi lại mã này ở mỗi lần đăng ký và các login shell của container export nó, nên không agent nào phải tự đặt bằng tay; `dck doctor` sẽ báo nếu có sai lệch. Từ `v0.3.4`, các cấu hình Codex riêng của container bỏ qua bước kiểm tra cập nhật khi khởi động của Codex và daemon chạy nền của nó (bộ kit ghim phiên bản của mọi CLI), không bao giờ động đến home Codex trên máy host của bạn hay một hồ sơ dùng chung.
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

Toàn bộ home của agentkit không bao giờ được mount, và các hồ sơ chứa đường dẫn tuyệt đối của máy host sẽ bị bỏ qua. Một phiên đăng nhập Codex được chia sẻ ở chế độ đọc-ghi có thể bị hai bên ghi làm mới cùng lúc: hãy giữ một agent đang hoạt động cho mỗi tài khoản Codex. `[agents] default_profile` trong hồ sơ host (ví dụ `{ claude = "@work3" }`) khiến lệnh `ak claude` không kèm tham số bên trong container dùng tài khoản được chia sẻ đó (coding-agents-kit ≥ `v0.5.2`); phiên đăng nhập Claude `@default` trên macOS nằm trong Keychain và không thể chia sẻ. Từ `v0.3.4`, các shell của container cũng trỏ lệnh `claude` hoặc `codex` không kèm tham số tới tài khoản đó, nên các pane mà Herdr khôi phục sẽ mở trên tài khoản ấy thay vì một màn hình đăng nhập. Bên trong container, cùng lệnh `ak <kind> @<profile>` chạy trên cùng tài khoản như trên máy host, và đó là điều cho phép một lead giao cho các lane trong container những tài khoản mà `ak pick` đã chọn — xem [Chạy nhiều agent](/methodology/06-orchestration).

## Nhiều repository, một stack compose

Từ `v0.3.3`, một repository có service là một phần của một dự án compose lớn hơn (một API, một ứng dụng web, các worker và một cơ sở dữ liệu dùng chung một dự án) có thể tham gia dự án đó mà không cần sửa tay những gì dck render. Mọi thay đổi đều mang tính bổ sung: một repository không đặt khóa nào trong số này sẽ được render y hệt như trước.

- **Một dự án, một volume trạng thái cho mỗi service.** `[compose] project` đặt tên cho dự án dùng chung trong mọi repository; `state_volume`, `[compose] networks` và `[compose] volumes` giữ tách biệt trạng thái của từng service cũng như các volume dữ liệu và network của stack.
- **Một khối người dùng.** Các dòng nằm giữa `# >>> user:<service> >>>` và `# <<< user:<service> <<<` bên trong service của dck được giữ nguyên văn: các khóa thông thường cho những gì dck không render (`depends_on`, `healthcheck`), và `x-dck-merge:` cho những khóa mà dck có render. Một tệp chỉ có một phần các marker của dck sẽ bị từ chối kèm cách sửa thay vì bị ghi đè.
- **Chuỗi cổng.** `ssh_port` và `ports` chấp nhận các biểu thức compose như `"${API_PORT:-8000}:8000"`; chúng vẫn ở trên `127.0.0.1` trừ khi chuỗi nêu rõ một IP của máy host.
- **Build dùng chung và trình khởi chạy của riêng bạn.** `[build] context` và `[build] dockerfile` hỗ trợ một Dockerfile được nhiều service dùng chung; `dev_sh = false` giữ lại `dev.sh` riêng của repository.
- **Các vệ tinh của workspace.** Từ `v0.3.5`, một instance thứ hai của service trong dự án compose riêng của nó được khởi động và dừng qua dck (`dck --project P --compose-file F --service S up` hoặc `down`), nên nó nhận cùng khóa host, các tài khoản, danh tính git và máy Herdr như instance chính; `up --seed-state-from VOLUME` chỉ sao chép các phiên đăng nhập vào volume trạng thái còn trống của nó. Trong một tệp overlay, `extends` phải chỉ rõ tệp mà nó mở rộng.
- **Node cho agent.** Node riêng của các agent nằm dưới `/opt/dck/node` và không bao giờ thay thế Node của image; `[agents] node_first = true` đặt nó lên đầu PATH khi công cụ của repository cần điều đó.

## Khóa SSH của máy host bên trong container

Một số công cụ chỉ đọc tệp khóa và bỏ qua agent được chuyển tiếp: ví dụ, `gh auth login` đề nghị tạo một khóa mới. Từ `v0.3.2`, bạn có thể chọn bật, chỉ trong **hồ sơ host** của bạn (`dck.toml` của một repository không thể thiết lập nó; `dck setup` hỏi một lần, mặc định là không):

```toml
[ssh]
copy_keys = true              # default false
```

Khi tùy chọn này bật, `dck up` gắn `~/.ssh` của máy host ở chế độ chỉ đọc tại `~/.ssh_host`, và mỗi lần khởi động sẽ sao chép các khóa `id_*` của nó vào `~/.ssh` của container (khóa riêng tư `0600`), luôn đồng bộ với máy host. Việc chuyển tiếp agent không thay đổi, và khi tắt tùy chọn, các bản sao sẽ bị xóa ở lần khởi động tiếp theo. Cái giá phải trả: toàn bộ `~/.ssh` của máy host có thể được đọc bên trong container, và các khóa riêng tư nằm lại trong volume trạng thái.

## Mặc định bảo mật

- Mọi cổng được công bố đều gắn vào `127.0.0.1` trừ khi `dck.toml` thiết lập `bind`.
- Git qua SSH đi qua SSH agent của máy host — socket của nó, không bao giờ là một tệp khóa và không bao giờ là `~/.ssh` hay `~/.gitconfig` được mount vào, trừ khi bạn đã bật [`copy_keys`](#khóa-ssh-của-máy-host-bên-trong-container) trong hồ sơ host của mình. Danh tính git lấy từ các giá trị `DCK_GIT_*` do `dck setup` điền.
- Khóa host SSH được tạo lúc chạy vào một volume riêng cho từng dự án, không bao giờ được đóng gói sẵn vào image; máy chủ chỉ chấp nhận khóa công khai, không cho đăng nhập root và không dùng mật khẩu.
- Template không thêm `cap_add`, không dùng chế độ `privileged` và không có Docker socket.
- Mọi lượt tải xuống đều được ghim theo phiên bản và xác minh bằng checksum; base image được ghim theo digest.
- Mạng lưới Herdr cho phép agent trong một container kết nối tới các container khác được bật theo mặc định và được tài liệu hóa cùng các công tắc tắt trong mô hình mối đe dọa của bộ kit. Listener trên máy host cho phép mã trong một container đang chạy mở shell trên máy host dưới danh nghĩa của bạn: nó chỉ bật khi bạn chọn, chỉ dùng loopback, chỉ chấp nhận khóa dck và được gỡ bằng `dck host listener disable`.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào. Máy host Linux và macOS được hỗ trợ; mạng lưới giữa các container cần Docker Desktop.
