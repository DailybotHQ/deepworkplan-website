---
title: Next.js
description: "Preset onboarding cho dự án Next.js, với gợi ý suy luận về App vs Pages Router, Server và Client Component, route handler và testing."
kind: preset
lang: vi
order: 12
stack: Next.js (React)
---

# Next.js preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Next.js. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `package.json` có `next` và `react`, cùng `next.config.js`/`next.config.mjs`/`next.config.ts`.
- `app/` (App Router, Server/Client Component, route handler) hoặc `pages/` (Pages Router, API route) — phát hiện cái nào đang được dùng.
- Package manager được suy luận từ lockfile hiện có (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Cần suy luận về điều gì

- Các script lint (`eslint` với `next/core-web-vitals`), test (Jest/Vitest, cùng e2e Playwright/Cypress) và build (`next build`) thực tế — ghi lại nguyên văn.
- Mô hình router (App vs Pages), sự phân tách Server vs Client Component, và nơi đặt data fetching cũng như route handler.
- Các skill phù hợp với stack: `page`/`route`, `server-component`, `route-handler`, `component`.

## Ghi chú

Phát hiện router trước khi sinh skill — App Router và Pages Router có các quy ước file và mô hình data-fetching khác nhau.
