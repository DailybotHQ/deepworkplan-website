---
title: NestJS
description: "Preset onboarding cho ứng dụng NestJS, với gợi ý suy luận về module, controller, provider, DTO, mô hình decorator và test runner."
kind: preset
lang: vi
order: 8
stack: NestJS
---

# NestJS preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho ứng dụng NestJS. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `nest-cli.json`, các gói `@nestjs/*` trong `package.json`, và `main.ts` gọi `NestFactory.create`.
- Mô hình decorator: `@Module`, `@Controller`, `@Injectable`, và các thư mục tính năng chứa module, controller, service và DTO.
- Package manager được suy luận từ lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## Cần suy luận về điều gì

- Lệnh test thực tế (Jest unit `*.spec.ts` và e2e `*.e2e-spec.ts`), cổng lint (`eslint`), và build script — ghi lại nguyên văn.
- Ranh giới module, dependency injection, provider, guard/pipe/interceptor, và nơi lưu trữ cấu hình (`@nestjs/config`).
- Các skill phù hợp với stack cho module, controller, provider và DTO.

## Ghi chú

Ghi lại cách các feature module được kết nối vào root module và liệu ứng dụng có sử dụng TypeORM/Prisma, microservice hay GraphQL hay không.
