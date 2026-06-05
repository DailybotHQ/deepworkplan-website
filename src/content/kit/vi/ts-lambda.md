---
title: TypeScript Lambda
description: "Preset onboarding cho dự án serverless TypeScript Lambda, với gợi ý suy luận về handler, toolchain Serverless/SAM/CDK và IAM tối thiểu quyền."
kind: preset
lang: vi
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án serverless TypeScript Lambda. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- Một deploy descriptor: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM), hoặc `cdk.json` (AWS CDK), cùng `tsconfig.json`.
- Các hàm handler xuất `handler`, thường nằm trong `src/functions/` hoặc `src/handlers/`, với một entrypoint mỗi hàm.

## Cần suy luận về điều gì

- Cổng kiểm chứng thực tế: lint (`eslint`), kiểm tra kiểu (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc), và synth/package (`sls package`, `sam build`, `cdk synth`) — ghi lại nguyên văn.
- Cấu trúc từng hàm, event source (API Gateway, SQS, EventBridge), và ngân sách cold-start/bundle-size.
- Phạm vi IAM — tối thiểu quyền mỗi hàm — và nơi lưu trữ secret cùng config (SSM, Secrets Manager, env).

## Ghi chú

Nhấn mạnh IAM tối thiểu quyền trong tài liệu SECURITY. Synth/package là cổng an toàn; deploy làm thay đổi account và không được chạy như cổng kiểm chứng.
