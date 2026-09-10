---
title: Chuẩn tài liệu
description: "Chuẩn quy phạm về cách các Deep Work Plan ghi lại cấu trúc, tác vụ và tiến độ của chúng: quy tắc README, các dấu trạng thái, cấu trúc tác vụ mười phần, và Final Review."
order: 1
lang: vi
section: Standard
---

# Chuẩn tài liệu

**Phiên bản 1.1.** Chuẩn này định nghĩa cách các Deep Work Plan ghi lại cấu trúc, tác vụ và tiến độ của chúng. Nó áp dụng cho mọi kế hoạch được tạo theo phương pháp luận DWP. Các từ khóa MUST, SHOULD và MAY được dùng như định nghĩa trong RFC 2119.

## README của kế hoạch

Mỗi kế hoạch PHẢI có một `README.md` chứa:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — một câu phát biểu dạng văn xuôi về mục tiêu của kế hoạch.
- **Source material** — các liên kết hay đường dẫn tới các đầu vào chuẩn (tùy chọn).
- **Tasks** — một bảng markdown với số thứ tự tác vụ, tên và một ô đánh dấu trạng thái.
- **Status** — một dòng theo dạng `<n>/<total> tasks complete`.

## Các tệp tác vụ

Mỗi tệp tác vụ PHẢI được đặt tên `<n>.task_<slug>.md` và chứa cấu trúc mười phần — chín phần kinh điển cộng với **Touched Surface**: hợp đồng giữa những gì tác vụ thay đổi và những gì phải được kiểm chứng (bề mặt dự kiến so với bề mặt thực tế, các bên tiêu thụ bị ảnh hưởng, một lớp rủi ro thuộc một trong *cô lập*, *đường nối*, *dùng chung/lõi* hoặc *không rõ*, ánh xạ test được dùng, và cổng được chọn kèm lý do).

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

## Final Review, quyết định skill ngay trong tác vụ, và báo cáo tùy chọn

Mọi kế hoạch được viết dưới phiên bản này PHẢI kết thúc bằng đúng một tác vụ bắt buộc: **Final Review** — bước rà soát bảo mật trên toàn bộ tập thay đổi của kế hoạch, kiểm chứng trạng thái cuối cùng trên trạng thái liên quan cuối cùng, và sự đối chiếu các quyết định về skill. Một phát hiện bảo mật nghiêm trọng chặn việc hoàn tất.

- **Quyết định skill ngay trong tác vụ.** Completion & Log của mỗi tác vụ mang một **kết luận về skill** — không có gì, một cập nhật cho một skill hoặc agent hiện có, một tạo mới có đặt tên, hoặc một lần hoãn kèm lý do và người phụ trách. Việc viết skill khi thực sự có cơ sở diễn ra bên trong tác vụ sở hữu nó, trước cổng kiểm chứng của nó, sau một kiểm tra trùng lặp với danh mục `.agents/`; các ứng viên xứng đáng được ghi lại như các ứng viên ổn định (`T{task}-{seq}`) trong sổ cái ứng viên skill của kế hoạch.
- **Executive Report là tùy chọn, theo yêu cầu.** Được đề xuất một lần lúc hoàn tất; chỉ được tạo khi có yêu cầu rõ ràng, từ bằng chứng bền vững. Không trả lời, hoặc một lượt chạy không có giám sát, để kế hoạch hoàn tất mà không có nó.
- **Kế hoạch cũ.** Các kế hoạch được viết dưới các phiên bản sớm hơn kết thúc bằng ba tác vụ cuối bắt buộc và vẫn tuân thủ — một trình kiểm tra tuân thủ PHẢI chấp nhận hình dạng đó.
