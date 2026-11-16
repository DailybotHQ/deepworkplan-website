---
title: Kỹ thuật vòng lặp (loop engineering)
description: " cùng các giới hạn của từng tính năngNgữ nghĩa vòng lặp v8 về thẩm quyền, tiếp tục, kế nhiệm, chặn, hàng đợi, thông báo và khả năng quan sát đội máy."
order: 12
lang: vi
section: Kỹ thuật vòng lặp
---

# Kỹ thuật vòng lặp (loop engineering)

Trang này định nghĩa hợp đồng loop engineering. **Kế hoạch** là nguồn thẩm quyền; vòng lặp cung cấp tính liên tục nhưng không mở rộng thẩm quyền đã ghi.

## 1. Quy tắc v8
Kế hoạch được duyệt chạy đến hết mà không chờ người. Tính tự chủ chỉ trong **thẩm quyền đã ghi của kế hoạch**. Người được thông báo; đăng nhập, thông tin xác thực và cổng C1–C7 dừng việc trừ khi có quyền trước. Quy tắc v7 giữ nguyên: phương pháp cốt lõi tự hoạt động, addon chỉ mở rộng.

### 1.1. Ngữ nghĩa vòng lặp
### Đăng ký và quan sát
Khi bật Herdr, `execute` của pack v8 nhận bản ghi lead và lưu kế nhiệm. Chỉ kế hoạch có lead và state đọc được mới theo dõi. Người khởi chạy `herdr-peers autopilot --loop`; đây là daemon, không phải mục đăng nhập hay dịch vụ hệ thống.

### Tiếp tục và chuyển giao
Daemon chỉ nhắc lead khi kế hoạch mở, lead nhàn rỗi/hoàn tất năm phút, không lane làm hoặc chờ trả lời, pane trong phạm vi và không bị loại, không hộp thoại/đăng nhập/giới hạn sử dụng/bản nháp. Lời nhắc cố định yêu cầu hoàn tất theo cổng và quyền đã ghi; không cấp quyền. Ba lời nhắc không tiến triển ghi `plan_stalled`; kế hoạch bị chặn chỉ báo. Nếu lead vắng, daemon nhờ người kế nhiệm đầu tiên chạy `herdr-peers lead takeover --plan <id>`; daemon không ghi lead hoặc chọn pane ngoài danh sách. Giới hạn sử dụng không chứng minh vắng mặt. Protocol 2 chỉ cho phép bổ nhiệm khi người ghi quyền `lead claim --allow-appointment` và khởi chạy daemon với `--appoint`. Trước merge/tag/release, lead chạy `herdr-peers lead verify --plan <id>`.

### Brain, sự kiện và đội máy
`--brain` tùy chọn chỉ chọn từ danh sách hành động đóng; daemon là tác nhân duy nhất, không chạy văn bản tự do. `autonomy` phải cho phép. Vòng lặp ghi sự kiện; `--notify` gửi `plan-event-v1`, Dailybot chuyển sự kiện hỗ trợ thành cập nhật nhóm. Bản đồ đội máy và `herdr-peers fleet ui` chỉ đọc. Xem [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md) và [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md).

## 2. Khối `autonomy`
Đối tượng đóng; tên và kiểu chuẩn ở [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Thiếu khối thì dùng mặc định.

| Trường | Kiểu / giá trị | Mặc định |
|---|---|---|
| `stall_budget` | số nguyên 1–10 | `3` lời nhắc |
| `promptable` | danh sách địa chỉ pane Herdr | lead |
| `notify` | danh sách; hiện `dailybot` | không đích; vẫn ghi sự kiện |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Địa chỉ pane: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; ID máy không bắt đầu bằng `-`. Các trường giới hạn người nhận, brain và hàng đợi, không đổi tiêu chí hay cổng.

## 3. Chặn có cấu trúc
### 3.1. Bản ghi chặn
`blocked`/`blocker` trong `state.json` ghi lớp C và `resolver` tùy chọn (`lead`/`human`, mặc định `human`). `lead` nghĩa là giải quyết trong quyền đã ghi, không cần thông tin xác thực, đăng nhập, đồng thuận, thanh toán, push lên main, release hay xóa. Vòng lặp chỉ nhờ lead xử lý blocker `lead`; mục khác báo người. Bản đồ Herdr có thể hiển thị tối đa 14 dòng `PROGRESS.md` đã làm sạch; đây không phải schema header máy đọc. Header dự kiến cần xác minh với tag 8.0.0.
### 3.2. Nơi tìm dữ liệu

### 3.3. Việc vòng lặp được phép làm
## 4. Hàng đợi kế hoạch
`.dwp/queue.json` dùng `dwp-queue-v1`, chỉ pack ghi. `create` thêm khi duyệt; người/lead sắp xếp; `execute` đánh dấu `started` khi nhận lead cùng địa chỉ; hoàn tất `done`; `create`/`refine` có thể `skipped` kèm ghi chú. Mục có `after` tùy chọn. Mỗi repo chạy một kế hoạch trừ `parallel: true`. Daemon chỉ đọc có giới hạn; hàng đợi lỗi được xem là rỗng. `prompt-lead` gửi: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon không ghi hàng đợi hoặc chạy `launch` nếu hợp đồng không quy định.

## 5. Những gì v8 giữ
v8 giữ `tasks[].parallel_safe`, delegation, journal và tập sự kiện journal v7. Lớp record giữ URL manifest/journal-event v7 và chỉ thêm `plan-contract/v8`. Kế hoạch cũ giữ nguyên generation, không tự di trú. Herdr tùy chọn.
