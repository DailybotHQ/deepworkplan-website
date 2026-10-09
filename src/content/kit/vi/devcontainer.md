---
title: Devcontainer
description: "Addon tùy chọn dựa trên devcontainer-kit: một template Dev Containers do dck init tạo ra, base image không kèm agent, và máy Herdr cho từng container."
kind: addon
lang: vi
order: 1
---

# Devcontainer addon

Mang đến cho repository một dev container có thể tái lập và được cô lập — dùng chung được cho con người, trình soạn thảo và coding agent. Trong **DWP v7 beta** (`v7.0.0-beta.1`, một bản phát hành trước), addon này tích hợp **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, một sản phẩm MIT hoạt động được mà không cần Deep Work Plan, và thay thế template mà gói trước đây mang theo. Addon là tùy chọn: một repo vẫn hoàn toàn tuân thủ khi không có nó.

## devcontainer-kit cung cấp những gì

- **Một template**, xây dựng trên đặc tả [Dev Containers](https://containers.dev), được `dck init` tạo vào repository: `devcontainer.json`, một tệp compose và `docker/local/`. Khi chạy lại sau này, nó dung hòa và không bao giờ ghi đè các chỉnh sửa của bạn; mọi thay đổi đối với một tệp sẵn có đều được hiển thị trước và cần sự đồng ý.
- **`dck`**, một trình khởi chạy chạy container từ một terminal thông thường — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — có hoặc không có VS Code hay Cursor.
- **Base image** với ba biến thể, `python-3.13`, `node-24` và `debian`, được phát hành **không kèm** coding agent.
- **Một thư viện entrypoint** cho volume bền vững, SSH và môi trường của các phiên SSH, thay cho một entrypoint sao chép thủ công cho từng repository.
- **Máy Herdr.** Mỗi container có thể tham gia [Herdr](https://herdr.dev) qua một máy chủ SSH chỉ lắng nghe trên loopback, nhờ đó các agent bên trong trở thành peer có thể truy cập được.

## Cài đặt

```bash
git clone --branch v0.1.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Yêu cầu: `bash` 3.2 trở lên và `python3` 3.11 trở lên trên máy host Linux hoặc macOS, cùng Docker với Compose v2 cho các lệnh container. Hãy xác minh một bản phát hành bằng tệp đính kèm `SHA256SUMS` của nó.

| Mục | Giá trị |
|---|---|
| Sản phẩm | `DailybotHQ/devcontainer-kit`, tag `v0.1.2`, giao diện 1 |
| Khóa registry | `devcontainer` trong `.dwp/config.json` |
| Cấu hình theo từng repository | `.devcontainer/dck.toml` |
| Phát hiện | `dck doctor --json` |

## Các lớp là opt-in

Base image mang theo các công cụ phát triển — git, gh, ripgrep, một máy chủ SSH, Herdr, và Neovim với DeepWorkPlan Vim được ghim theo tag — và không có coding agent, không có CLI báo cáo, không có secret. Mọi thứ khác là một lớp mà bạn bật trong `dck.toml`:

| Lớp | Mặc định | Bổ sung gì |
|---|---|---|
| `agents` | tắt | Cài [coding-agents-kit](/kit/agentkit) và các CLI bạn liệt kê, mỗi CLI có volume bền vững riêng. Không cờ bỏ qua quyền nào được thiết lập. |
| `editor` | bật | Neovim với DeepWorkPlan Vim; khi tắt sẽ là một trình soạn thảo thông thường. |

## Mặc định bảo mật

- Mọi cổng được công bố đều gắn vào `127.0.0.1` trừ khi `dck.toml` thiết lập `bind`.
- Chuyển tiếp SSH agent từ máy host; khóa riêng tư của máy host không bao giờ được sao chép vào container.
- Khóa host SSH được tạo lúc chạy vào một volume riêng cho từng dự án, không bao giờ được đóng gói sẵn vào image; máy chủ chỉ chấp nhận khóa công khai, không cho đăng nhập root và không dùng mật khẩu.
- Template không thêm `cap_add`, không dùng chế độ `privileged` và không có Docker socket.
- Base image và công cụ được ghim theo phiên bản và xác minh bằng checksum; compose tham chiếu base image bằng digest bất cứ khi nào digest đó có thể được phân giải.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon tùy chọn nào. v0.1 hỗ trợ máy host Linux và macOS.
