---
title: Devcontainer
description: "Addon tùy chọn dựa trên devcontainer-kit: dev container riêng của mỗi repository từ một template, agent qua ak, Herdr hai chiều, không có khóa SSH bên trong."
kind: addon
lang: vi
order: 1
---

# Devcontainer addon

Mang đến cho repository một dev container có thể tái lập và được cô lập — dùng chung được cho con người, trình soạn thảo và coding agent. Trong **DWP v7** (gói `v7.1.0`), addon này tích hợp **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, một sản phẩm MIT hoạt động được mà không cần Deep Work Plan. Addon là tùy chọn: một repo vẫn hoàn toàn tuân thủ khi không có nó.

## devcontainer-kit cung cấp những gì

- **Một template**, xây dựng trên đặc tả [Dev Containers](https://containers.dev), được `dck init` tạo vào repository theo một bố cục cố định: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` và `dev.sh`. Khi chạy lại sau này, nó dung hòa và không bao giờ ghi đè các chỉnh sửa của bạn; mọi thay đổi đối với một tệp sẵn có đều được hiển thị trước và cần sự đồng ý.
- **Container riêng của repository.** Dockerfile bắt đầu từ image chính thức của runtime được ghim theo digest — `node-24`, `python-3.13` hoặc `debian` — và sao chép các bước build của bộ kit vào `docker/local/<service>/dck/`. Không có base image dùng chung nào tham gia.
- **`dev.sh` và `dck`.** `bash dev.sh up` build, khởi động và gắn vào container từ một terminal thông thường; `shell`, `rebuild`, `doctor` và các lệnh còn lại hoạt động có hoặc không có VS Code hay Cursor.
- **Herdr hai chiều.** [Herdr](https://herdr.dev) trên máy host gắn mỗi container như một máy qua một máy chủ SSH chỉ lắng nghe trên loopback, và container mở ra với thanh bên tiêu chuẩn: Home, Editor, Development và Agents. Bên trong, [herdr-peers](/kit/herdr) cho phép các agent hỏi các agent trên máy host và trong các container khác.
- **Skill `dck-dockerfile`.** Một agent tạo hoặc tái tạo container của một repository theo yêu cầu và chứng minh nó bằng một lần build thật.

## Cài đặt

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Yêu cầu: `bash` 3.2 trở lên và `python3` 3.11 trở lên trên máy host Linux hoặc macOS, cùng Docker với Compose v2 cho các lệnh container. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó. Hãy ghim `v0.2.2`: `v0.2.0` không được hỗ trợ.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/devcontainer-kit`, tag `v0.2.2`, giao diện 2 |
| Khóa registry | `devcontainer` trong `.dwp/config.json` |
| Cấu hình theo từng repository | `.devcontainer/dck.toml` |
| Phát hiện | `dck doctor --json` |

## Các lớp

Mọi container đều mang theo các công cụ phát triển — git, gh, ripgrep, một máy chủ SSH, Herdr và herdr-peers — và không có secret nào. Phần còn lại là một lớp mà bạn chọn trong `dck.toml`:

| Lớp | Mặc định | Bổ sung gì |
|---|---|---|
| `agents` | tắt | [coding-agents-kit](/kit/agentkit) từ bản phát hành đã được xác minh và các CLI bạn liệt kê, mỗi CLI có volume bền vững riêng, cùng các preset `classic` (`claudex`, `codexx`, …) và `providers` (`claude-glm`, `codex-azure`, …). Agent chạy ở chế độ tự chủ theo mặc định — container chính là sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` trong tệp `.env` của service. |
| `editor` | bật | Neovim với [DeepWorkPlan Vim](/kit/vim) được ghim theo tag; khi tắt sẽ là một trình soạn thảo thông thường. |
| `dailybot` | tắt | Dailybot CLI, dành cho addon dailybot. |

Thông tin đăng nhập, `gh`, cấu hình Herdr và danh tính git được giữ lại sau `bash dev.sh rebuild`.

## Mặc định bảo mật

- Mọi cổng được công bố đều gắn vào `127.0.0.1` trừ khi `dck.toml` thiết lập `bind`.
- Git qua SSH đi qua SSH agent của máy host — socket của nó, không bao giờ là một tệp khóa và không bao giờ là `~/.ssh` hay `~/.gitconfig` được mount vào. Danh tính git lấy từ các giá trị `DCK_GIT_*` do `dck setup` điền.
- Khóa host SSH được tạo lúc chạy vào một volume riêng cho từng dự án, không bao giờ được đóng gói sẵn vào image; máy chủ chỉ chấp nhận khóa công khai, không cho đăng nhập root và không dùng mật khẩu.
- Template không thêm `cap_add`, không dùng chế độ `privileged` và không có Docker socket.
- Mọi lượt tải xuống đều được ghim theo phiên bản và xác minh bằng checksum; base image được ghim theo digest.
- Mạng lưới Herdr cho phép agent trong một container kết nối tới các container khác được bật theo mặc định và được tài liệu hóa cùng các công tắc tắt trong mô hình mối đe dọa của bộ kit.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào. v0.2 hỗ trợ máy host Linux và macOS; mạng lưới giữa các container cần Docker Desktop.
