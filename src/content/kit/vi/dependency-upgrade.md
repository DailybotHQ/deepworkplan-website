---
title: Dependency upgrade
description: "Một addon tùy chọn, không phụ thuộc trình quản lý gói, nâng cấp dependency của repo theo từng đợt đã kiểm chứng và có thể hoàn tác; phát hiện trình quản lý thật, không mặc định npm."
kind: addon
lang: vi
order: 3
---

# Dependency-upgrade addon

Đưa các dependency của một repository lên phiên bản mới với quy trình theo từng đợt, đã kiểm chứng và có thể hoàn tác. Addon tùy chọn thứ ba của Deep Work Plan.

## Addon này bổ sung gì

- Phát hiện trình quản lý gói **thực** của repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, và nhiều hơn) từ manifest và lockfile đang tồn tại.
- Một lệnh `/lib-upgrade` được cài vào `.agents/commands/`, **chỉ khi được chấp nhận**.

## Hành vi

1. Yêu cầu một working tree sạch (hoặc đã sao lưu).
2. Phân loại các nâng cấp theo semver — patch, minor, major; các bản major cần phê duyệt rõ ràng.
3. Nâng cấp theo từng đợt nhỏ, mạch lạc; không bao giờ làm tất cả cùng lúc.
4. Chạy validation gate thực của repo sau mỗi đợt; hoàn tác bất kỳ đợt nào thất bại.
5. Tổng kết những gì đã nâng cấp, bỏ qua và hoàn tác; để nhà phát triển tự commit.

## Ghi chú

Không phụ thuộc trình quản lý gói — không bao giờ chạy npm/ncu trong một repo không phải JS. Tùy chọn, không bao giờ bắt buộc, và không bao giờ tự động commit.
