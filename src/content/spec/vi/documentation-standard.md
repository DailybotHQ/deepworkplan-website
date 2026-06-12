---
title: Chuẩn tài liệu
description: "Chuẩn quy phạm về cách các Deep Work Plan ghi lại cấu trúc, tác vụ và tiến độ của chúng: quy tắc README, các dấu trạng thái, và ba tác vụ cuối bắt buộc."
order: 1
lang: vi
section: Standard
---

# Chuẩn tài liệu

**Phiên bản 1.0.** Chuẩn này định nghĩa cách các Deep Work Plan ghi lại cấu trúc, tác vụ và tiến độ của chúng. Nó áp dụng cho mọi kế hoạch được tạo theo phương pháp luận DWP. Các từ khóa MUST, SHOULD và MAY được dùng như định nghĩa trong RFC 2119.

## README của kế hoạch

Mỗi kế hoạch PHẢI có một `README.md` chứa:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — một câu phát biểu dạng văn xuôi về mục tiêu của kế hoạch.
- **Source material** — các liên kết hay đường dẫn tới các đầu vào chuẩn (tùy chọn).
- **Tasks** — một bảng markdown với số thứ tự tác vụ, tên và một ô đánh dấu trạng thái.
- **Status** — một dòng theo dạng `<n>/<total> tasks complete`.

## Các tệp tác vụ

Mỗi tệp tác vụ PHẢI được đặt tên `<n>.task_<slug>.md` và chứa cấu trúc chín phần.

## PROGRESS.md

`PROGRESS.md` là một nhật ký thực thi chỉ ghi thêm. Mỗi mục PHẢI ghi lại:

- Một dấu thời gian ISO 8601.
- Số thứ tự và tên tác vụ.
- Điều đã làm.
- Mọi sai lệch hay lý do bỏ qua.

## Các dấu trạng thái

- `[ ]` — chưa bắt đầu.
- `[~]` — đang làm.
- `[x]` — đã xong.
- `[!]` — bị chặn.

## Tiêu đề

Mọi tiêu đề PHẢI dùng kiểu viết hoa đầu câu. Các tài liệu NÊN tránh ngôn ngữ tiếp thị và dấu chấm than.

## Ba tác vụ cuối bắt buộc

Mọi kế hoạch PHẢI kết thúc bằng ba tác vụ chuẩn:

1. **Security Review** — kiểm toán toàn bộ tập thay đổi của kế hoạch để tìm bí mật, rủi ro tiêm nhiễm và bề mặt tấn công mới, và xác minh rằng `docs/SECURITY.md` vẫn phản ánh thực tế. Một phát hiện nghiêm trọng chặn việc hoàn tất.
2. **Skills & Agents Discovery** — xác định các skill và agent tái sử dụng được tạo ra.
3. **Executive Report** — một bản tóm tắt kết quả cho các bên liên quan.
