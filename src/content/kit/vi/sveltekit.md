---
title: SvelteKit
description: "Preset onboarding cho dự án SvelteKit, với gợi ý suy luận về route, hàm load, server endpoint, adapter được chọn và testing."
kind: preset
lang: vi
order: 13
stack: SvelteKit
---

# SvelteKit preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án SvelteKit. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `svelte.config.js` và một `vite.config.*`, với `@sveltejs/kit` trong dependencies.
- `src/routes/` có `+page.svelte`, `+page.server.ts`/`+page.ts`, `+layout.svelte`, và endpoint `+server.ts`.
- Package manager được suy luận từ lockfile hiện có (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Cần suy luận về điều gì

- Các script lint (`eslint`), kiểm tra kiểu (`svelte-check`), test (Vitest, cùng e2e Playwright) và build (`vite build`) thực tế — ghi lại nguyên văn.
- Mô hình routing và `load` (server vs universal load), form action, và API endpoint `+server.ts`; adapter được cấu hình.
- Các skill phù hợp với stack: `route` (`+page` + `load`), `endpoint` (`+server.ts`), `component`.

## Ghi chú

Ghi lại adapter được cấu hình (`adapter-auto`, `-node`, `-static`, Cloudflare, Vercel) — nó định hình câu chuyện build và deploy.
