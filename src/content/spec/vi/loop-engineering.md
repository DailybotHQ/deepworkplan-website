---
title: Kỹ thuật vòng lặp (loop engineering)
description: "Loop engineering v8 về thẩm quyền đã ghi, tiếp tục do người khởi chạy, kế nhiệm, chặn, hàng đợi, thông báo và quan sát toàn đội máy đầy đủ."
order: 12
lang: vi
section: Kỹ thuật vòng lặp
---

# Kỹ thuật vòng lặp (loop engineering)

Trang này định nghĩa hợp đồng loop engineering. **Kế hoạch** là nguồn thẩm quyền; vòng lặp cung cấp tính liên tục nhưng không mở rộng thẩm quyền đã ghi.

## 1. Quy tắc v8
Kế hoạch được duyệt chạy đến hết mà không chờ người. Tính tự chủ chỉ trong **thẩm quyền đã ghi của kế hoạch**. Người được thông báo; đăng nhập, thông tin xác thực và cổng C1–C7 dừng việc trừ khi có quyền trước. Quy tắc v7 giữ nguyên: phương pháp cốt lõi tự hoạt động, addon chỉ mở rộng.

### 1.1. Ngữ nghĩa vòng lặp
#### Đăng ký và quan sát
Khi bật Herdr, `execute` của pack v8 nhận bản ghi lead và lưu kế nhiệm. Chỉ kế hoạch có lead và state đọc được mới theo dõi. Người khởi chạy `herdr-peers autopilot --loop`; đây là daemon, không phải mục đăng nhập hay dịch vụ hệ thống.

#### Tiếp tục và chuyển giao
Daemon chỉ nhắc lead khi kế hoạch mở, lead nhàn rỗi/hoàn tất năm phút, không lane làm hoặc chờ trả lời, pane trong phạm vi và không bị loại, không hộp thoại/đăng nhập/giới hạn sử dụng/bản nháp. Lời nhắc cố định yêu cầu hoàn tất theo cổng và quyền đã ghi; không cấp quyền. Ba lời nhắc không tiến triển ghi `plan_stalled`; kế hoạch bị chặn chỉ báo. Nếu lead vắng, daemon nhờ người kế nhiệm đầu tiên chạy `herdr-peers lead takeover --plan <id>`; daemon không ghi lead hoặc chọn pane ngoài danh sách. Giới hạn sử dụng không chứng minh vắng mặt. Protocol 2 chỉ cho phép bổ nhiệm khi người ghi quyền `lead claim --allow-appointment` và khởi chạy daemon với `--appoint`. Trước merge/tag/release, lead chạy `herdr-peers lead verify --plan <id>`.

#### Brain, sự kiện và đội máy
`--brain` tùy chọn chỉ chọn từ danh sách hành động đóng; daemon là tác nhân duy nhất, không chạy văn bản tự do. `autonomy` phải cho phép. Vòng lặp ghi sự kiện; `--notify` gửi `plan-event-v1`, Dailybot chuyển sự kiện hỗ trợ thành cập nhật nhóm. Bản đồ đội máy và `herdr-peers fleet ui` chỉ đọc. Xem [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.1/skills/herdr-peers/autopilot.md) và [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.1/skills/herdr-peers/protocol.md).

## 2. Khối `autonomy`
Đối tượng đóng; tên và kiểu chuẩn ở [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Thiếu khối thì dùng mặc định.

| Trường | Kiểu / giá trị | Mặc định |
|---|---|---|
| `stall_budget` | số nguyên 1–10 | `3` lời nhắc |
| `promptable` | danh sách địa chỉ pane Herdr | lead |
| `notify` | danh sách đích không rỗng | không đích; vẫn ghi sự kiện |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

Địa chỉ pane: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`; ID máy không bắt đầu bằng `-`. Các trường giới hạn người nhận, brain và hàng đợi, không đổi tiêu chí hay cổng.

## 3. Chặn có cấu trúc

Kế hoạch v8 ghi lý do dừng dưới dạng dữ liệu để vòng lặp, đội máy và tác nhân tiếp tục đọc cùng trường.

### 3.1. Bản ghi chặn

Ledger dùng `ledger.py block` để mở và `ledger.py unblock` để giải quyết, ghi sự kiện `blocker` trong `journal-event/v8`. Phải từ chối việc thêm thô và ghi nhận mọi lần từ chối.

| Trường | Quy tắc |
|---|---|
| `task` | Tác vụ bị chặn của contract; không chặn tác vụ mà bằng chứng đã đóng. |
| `reason` | Bắt buộc, không rỗng, tối đa 1000 ký tự: lý do. |
| `needs` | Bắt buộc, đúng một dòng không rỗng, tối đa 500 ký tự: điều kiện tiếp tục. |
| `class` | Bắt buộc: `C1`–`C7` trong [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Tùy chọn `lead` hoặc `human`; mặc định là `human`. |

`lead` chỉ giải quyết trong thẩm quyền đã ghi, không cần thông tin xác thực, đăng nhập, đồng thuận, thanh toán, push lên main, phát hành hoặc xóa. Phải từ chối `resolver: "lead"` với `C1`, `C2`, `C5`, `C6`. Mỗi kế hoạch chỉ có một chặn đang hoạt động; chặn khác bị từ chối cho đến khi giải quyết. Mở lại cùng tác vụ có thể đổi trường nhưng giữ `since` ban đầu. Bản ghi giải quyết chỉ gồm tác vụ và ghi chú tùy chọn. Tác vụ bị chặn không thể hoàn tất; bằng chứng mới không đóng tác vụ.

### 3.2. Nơi tìm dữ liệu

`state.json` dùng `plan-snapshot/v8`: dạng `plan-snapshot/v6`, `blocker` là `{task, reason, since, needs, class, resolver?}` hoặc `null`, `blocked` là trạng thái suy ra được ưu tiên. Ledger chiếu dữ liệu, không ghi thủ công.

`PROGRESS.md` NÊN mở đầu dưới tiêu đề bằng header bốn dòng cố định; create ghi và cập nhật mỗi lần chuyển trạng thái (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` và `Needs` lấy từ snapshot (tác vụ bị chặn trước, nếu không tác vụ chưa hoàn tất đầu tiên). Tác nhân viết `Goal` và `Next action`.

### 3.3. Việc vòng lặp được phép làm

Vòng lặp, kể cả brain, chỉ nhờ lead giải quyết khi có `resolver: "lead"`. Các chặn khác cần con người. v6/v7 không ghi `blocker`, giữ `plan-snapshot/v6` (`blocker` luôn `null`); các chặn thuộc về con người.
## 4. Hàng đợi kế hoạch
`.dwp/queue.json` dùng `dwp-queue-v1`, chỉ pack ghi. `create` thêm khi duyệt; người/lead sắp xếp; `execute` đánh dấu `started` khi nhận lead cùng địa chỉ; hoàn tất `done`; `create`/`refine` có thể `skipped` kèm ghi chú. Mục có `after` tùy chọn. Mỗi repo chạy một kế hoạch trừ `parallel: true`. Daemon chỉ đọc có giới hạn; hàng đợi lỗi được xem là rỗng. `prompt-lead` gửi: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” Daemon không ghi hàng đợi hoặc chạy `launch` nếu hợp đồng không quy định.

## 5. Những gì v8 giữ

v8 giữ mọi nội dung v7: `tasks[].parallel_safe`, ủy quyền và toàn bộ tập sự kiện; tính năng v7 tiếp tục có sẵn. v8 ghi tập sự kiện v7 cộng `blocker` trong `journal-event/v8` và chiếu sang `plan-snapshot/v8`; từ chối journal trộn thế hệ. `plan-manifest/v7` giữ nguyên cấu trúc và con trỏ; bộ kiểm tra ghép manifest v7 với contract v8. Bản ghi v6/v7 được giữ nguyên từng byte.
