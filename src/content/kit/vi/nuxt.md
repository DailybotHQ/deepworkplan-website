---
title: Nuxt
description: "Preset onboarding cho dự án Nuxt, với gợi ý suy luận về page, server API route, composable, Nitro server engine và testing."
kind: preset
lang: vi
order: 14
stack: Nuxt (Vue)
---

# Nuxt preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Nuxt. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `nuxt.config.ts` và `nuxt` trong dependencies, với entrypoint `app.vue`.
- `pages/` (file-based routing), `server/api/` (Nitro endpoint), `composables/`, và `components/` được tự động import.
- Package manager được suy luận từ lockfile hiện có (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Cần suy luận về điều gì

- Các script lint (`eslint`), kiểm tra kiểu (`nuxi typecheck`), test (Vitest với `@nuxt/test-utils`) và build (`nuxt build`) thực tế — ghi lại nguyên văn.
- Routing và data fetching (`useFetch`/`useAsyncData`), các route Nitro `server/api/`, composable và quy ước auto-import; chế độ render (SSR/SSG/SPA).
- Các skill phù hợp với stack: `page`/`route`, `server-route` (`server/api`), `composable`, `component`.

## Ghi chú

Auto-import (component, composable, util) là một quy ước của Nuxt — tính đến chúng thay vì thêm import tường minh ở khắp nơi.
