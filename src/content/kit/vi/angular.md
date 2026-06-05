---
title: Angular
description: "Preset onboarding cho dự án Angular, với gợi ý suy luận về component, module hoặc standalone API, service, RxJS và test runner."
kind: preset
lang: vi
order: 15
stack: Angular
---

# Angular preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Angular. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `angular.json` và `@angular/core` trong dependencies; `src/app/` với `@Component`/`@NgModule` hoặc standalone component.
- Service với `@Injectable`, RxJS observable và dependency injection.
- Package manager được suy luận từ lockfile hiện có.

## Cần suy luận về điều gì

- Các lệnh test (`ng test` / Karma+Jasmine `*.spec.ts` hoặc Jest), lint (`ng lint` / `@angular-eslint`) và build (`ng build`) thực tế — ghi lại nguyên văn.
- Liệu ứng dụng dùng NgModule hay API standalone-component, và các quy ước routing cùng DI.
- Các skill phù hợp với stack: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Ghi chú

Hữu ích cho ứng dụng Angular theo bố cục dự án CLI. Xác nhận Karma/Jasmine vs Jest từ cấu hình hiện có.
