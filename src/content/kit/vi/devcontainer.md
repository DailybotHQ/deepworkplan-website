---
title: Devcontainer
description: "Một addon tùy chọn thêm hoặc dung hòa một devcontainer dựa trên compose từ stack đã phát hiện, với xác thực AI-CLI bền bỉ tồn tại qua các lần rebuild."
kind: addon
lang: vi
order: 1
---

# Devcontainer addon

Thêm một dev container có thể tái lập, được cô lập vào repository. Addon tùy chọn đầu tiên của Deep Work Plan.

## Addon này bổ sung gì

- Một devcontainer dựa trên compose với base image và các dịch vụ hỗ trợ được suy luận từ stack đã phát hiện.
- Các volume xác thực AI-CLI bền bỉ (Claude, Codex, Cursor, gh, Dailybot) tồn tại qua các lần rebuild.
- `dailybot-project-network`, quy ước `DOCKER_DEV_ENV=vscode`, và các alias kiểm chứng (`codecheck`, `check`, `fix`, `test`).
- Với các repo công khai, một `.dockerignore` loại trừ secret và một `.env.example` không chứa secret.

## Hành vi

Khoảng 85% của devcontainer là một bộ khung chung ổn định; 15% còn lại — base image, user, thư mục workspace, dịch vụ, port, secret — được suy luận từ stack thực của repo. Một devcontainer sẵn có được dung hòa, không bao giờ bị ghi đè.

## Ghi chú

Tùy chọn và không bao giờ bắt buộc. Một repo hoàn toàn tuân thủ ngay cả khi không có addon nào.
