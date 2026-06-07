---
title: "Bắt đầu nhanh — Deep Work Plan"
description: "Cài skill, khởi tạo repository, rồi lập kế hoạch và thực thi với mọi agent — các bước biến repo của bạn thành dựa trên đặc tả và điều khiển được bằng agent."
lastUpdated: 2026-05-31
---

## Bắt đầu nhanh

Cài skill, khởi tạo repository, rồi lập kế hoạch và thực thi với mọi agent — các bước biến
repository của bạn thành dựa trên đặc tả và điều khiển được bằng agent.

## Lộ trình áp dụng

### 1. Cài skill Deep Work Plan

Thêm skill vào repository của bạn. Nó đi kèm một bộ định tuyến cùng tám sub-skill — create, execute, refine,
resume, status, verify, onboard và author. Dùng Skills CLI cho con đường nhanh nhất:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Hoặc clone repo và chạy script cài đặt ở nơi có sẵn git và một shell:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Khởi tạo repository

Chạy sub-skill onboard và để agent suy luận về repo thực tế của bạn — stack, trình quản lý gói,
và các lệnh kiểm chứng thật của nó:

```bash
/deepworkplan-onboard
```

Nó sinh ra `AGENTS.md`, một cơ sở tri thức `docs/`, tài liệu cho từng mô-đun, và một ngôi nhà `.agents/` xuyên agent
(cùng symlink `.claude → .agents`), kết nối các command `dwp-*` mỏng, và dựng một `.dwp/` được gitignore
cho các kế hoạch và bản nháp. Không gì là mẫu cứng; mọi thứ đều được thích ứng cho repository của bạn.

### 3. Phát triển bộ kit và chấp nhận addon

Dùng `/skill-create` và `/agent-create` (sub-skill author) để nuôi lớn các skill, agent và command phù hợp với stack.
Quá trình khởi tạo cũng đề xuất bốn addon tự nguyện — devcontainer, Dailybot,
dependency-upgrade, và design-system — mà bạn chỉ chấp nhận khi chúng phù hợp. Một repo hoàn toàn tuân thủ với không cần addon nào.

### 4. Lập kế hoạch và thực thi

Sinh một Deep Work Plan và chạy nó từng tác vụ một:

```bash
/dwp-create <goal>
/dwp-execute
```

Dùng `/dwp-status`, `/dwp-refine` và `/dwp-resume` khi công việc tiến triển. Mỗi kế hoạch mang các tác vụ đánh số,
các cổng kiểm chứng, và một giao thức hoàn tất để công việc luôn có cấu trúc và tiếp tục được qua các phiên.

## Kết quả

Repository của bạn trở thành dựa trên đặc tả và điều khiển được bằng agent: kế hoạch là nguồn chân lý bền vững, và
chính repository trở thành harness mà mọi agent chạy dựa vào.

- [Đọc phương pháp luận](/methodology)
- [Duyệt đặc tả](/spec)
- [Khám phá bộ kit](/kit)
