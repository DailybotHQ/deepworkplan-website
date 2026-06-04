---
title: Node / TS service
description: "Preset onboarding cho các dịch vụ Node và TypeScript cùng API serverless, với gợi ý suy luận về vòng đời request, các tích hợp và bài kiểm thử."
kind: preset
lang: vi
order: 4
stack: Node / TS service
---

# Node / TS service preset

Một hướng dẫn suy luận mà luồng onboard sử dụng cho các dịch vụ Node/TypeScript và API serverless. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu

- `tsconfig.json` cùng một server framework (`express`, `fastify`, `@nestjs/*`) hoặc các handler serverless (`serverless.yml`, `template.yaml`, một thư mục `functions/`).
- Trình quản lý gói được suy ra từ lockfile đang tồn tại.

## Cần suy luận về điều gì

- Các script lint, kiểm tra kiểu (`tsc --noEmit`), test (Jest/Vitest) và build thực — ghi lại nguyên văn.
- Đây là một dịch vụ chạy dài hạn hay serverless — điều này định hình tài liệu kiến trúc và hiệu năng.
- Các skill phù hợp với stack: `endpoint`/`handler`, `service`, `middleware`, `integration`, hoặc `lambda-fn`.

## Ghi chú

Ghi lại vòng đời request hoặc event, các điểm tích hợp, và nơi lưu trữ secret cùng config.
