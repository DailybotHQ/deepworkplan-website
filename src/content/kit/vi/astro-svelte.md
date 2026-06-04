---
title: Astro / Svelte
description: "Preset onboarding cho các site Astro, tùy chọn kèm island Svelte, với gợi ý suy luận về content collection, kiểm tra schema và hydration của island."
kind: preset
lang: vi
order: 3
stack: Astro / Svelte
---

# Astro / Svelte preset

Một hướng dẫn suy luận mà luồng onboard sử dụng cho các site Astro, tùy chọn kèm các island Svelte. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu

- `astro.config.*`; tùy chọn `@astrojs/svelte` và các component `.svelte`.
- Content Collections nằm trong `src/content/` với schema Zod.

## Cần suy luận về điều gì

- Các script lint, kiểm tra kiểu (`astro check`), test và build thực tế — ghi lại nguyên văn.
- Các schema của content collection và quy ước hydration cho island (`client:visible` thay vì `client:load`).
- Các skill phù hợp với stack cho component, trang và mục nội dung.

## Ghi chú

Hữu ích cho các site hướng nội dung sử dụng kiến trúc island của Astro với khả năng tương tác có chọn lọc.
