---
title: lib-upgrade
description: "Nâng cấp dependency của repository một cách an toàn theo từng đợt đã kiểm chứng và có thể hoàn tác qua addon dependency-upgrade. Chỉ cài khi addon đó được chấp nhận."
kind: command
lang: vi
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Nâng cấp dependency của repository một cách an toàn. Một bộ ủy nhiệm gọn nhẹ đến addon **dependency-upgrade**.

## Tác dụng

`lib-upgrade` định tuyến đến addon dependency-upgrade. Addon suy luận về trình quản lý gói thực của repo — không bao giờ mặc định npm — phân loại các nâng cấp theo semver, nâng cấp theo từng đợt an toàn, chạy validation gate thực của repo sau mỗi đợt, hoàn tác đợt thất bại, và tổng kết.

## Cách dùng

```
/lib-upgrade
```

## Hành vi

1. Yêu cầu một working tree sạch (hoặc đã sao lưu).
2. Phát hiện trình quản lý gói thực từ manifest và lockfile đang tồn tại.
3. Phân loại các nâng cấp (patch / minor / major); các bản major cần phê duyệt.
4. Nâng cấp theo từng đợt nhỏ; kiểm chứng gate thực của repo sau mỗi đợt.
5. Hoàn tác bất kỳ đợt nào không qua gate; tổng kết và để nhà phát triển tự commit.

## Ghi chú

Lệnh này chỉ được cài khi addon dependency-upgrade được chấp nhận. Không phụ thuộc trình quản lý gói; nó không bao giờ tự động commit.
