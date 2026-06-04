---
title: Vue + Vite
description: "Preset onboarding cho các dự án Vue + Vite, với gợi ý suy luận về single-file component, Composition API, các store Pinia và kiểm thử bằng Vitest."
kind: preset
lang: vi
order: 2
stack: Vue + Vite
---

# Vue + Vite preset

Một hướng dẫn suy luận mà luồng onboard sử dụng cho các dự án Vue + Vite. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu

- `vite.config.*` và `vue` trong dependency (Vue 3, `<script setup>`).
- `@vitejs/plugin-vue`, `vue-tsc`, `vue-router`, `pinia`.
- Trình quản lý gói được suy ra từ lockfile đang tồn tại.

## Cần suy luận về điều gì

- Các script lint, kiểm tra kiểu (`vue-tsc --noEmit`), test (Vitest/Jest) và build thực — ghi lại nguyên văn.
- Quy ước test (`*.spec.ts` / `*.test.ts`) và các mẫu `@vue/test-utils`.
- Các skill phù hợp với stack: `component`, `store-module`, `composable`, `view`/`route`.

## Ghi chú

Nếu trong dependency là `react` thay vì `vue`, hãy tái sử dụng cùng cách suy luận với các skill định hình theo React.
