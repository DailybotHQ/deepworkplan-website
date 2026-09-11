---
title: Kế hoạch Lite
description: "Kế hoạch Lite: các bản ghi tác vụ gọn nhẹ, thực thi đầy đủ, nội tuyến trong README.md, việc tạo và chọn định dạng, cùng việc nâng cấp lên kế hoạch Full."
order: 3
lang: vi
section: Workflow
---

# Kế hoạch Lite

**Phiên bản 2.4.0. Trạng thái: Ổn định.** Tài liệu này đặc tả biểu diễn kế hoạch Lite được giới thiệu cùng với [Đặc tả DWP](/spec/dwp-specification): một định dạng kế hoạch cho công việc có giới hạn, quy mô nhỏ đến vừa, được vật liệu hóa trực tiếp, không qua giai đoạn bản nháp không thể thực thi. Các từ khóa MUST, MUST NOT, SHOULD, SHOULD NOT và MAY được diễn giải như mô tả trong RFC 2119.

## Biểu diễn và vòng đời

Một kế hoạch PHẢI (MUST) là một trong hai biểu diễn, được ghi lại một lần trong `manifest.json` dưới dạng `plan_format`: **Full** lưu một tệp cho mỗi tác vụ dưới `<n>.task_<slug>.md`; **Lite** lưu các bản ghi tác vụ gọn nhẹ, có thể thực thi, nội tuyến trong `README.md`, mỗi bản ghi nằm sau một neo `{#task-N}` ổn định. Một kế hoạch Lite không phải là một kế hoạch Full không đầy đủ hay không chính thức: mỗi bản ghi tác vụ vẫn PHẢI (MUST) mang một mục tiêu, một Touched Surface, tiêu chí chấp nhận, một cổng kiểm chứng và một nhật ký hoàn tất, theo cùng hình thức quy phạm mà [Cấu trúc tác vụ](/spec/dwp-specification#task-anatomy) định nghĩa cho Full.

Bốn trục mô tả trạng thái của một kế hoạch, và PHẢI (MUST) được theo dõi độc lập thay vì bị trộn lẫn:

| Trục | Giá trị | Ý nghĩa |
|------|--------|---------|
| Định dạng | `lite`, `full` | Nơi các bản ghi tác vụ tồn tại |
| Vật liệu hóa | `materializing`, `ready`, `promoting` | Thư mục kế hoạch đang được ghi, đã hoàn tất, hay đang trong quá trình nâng cấp |
| Phê duyệt | `pending`, `approved`, `pre_approved` | Một con người đã rà soát kế hoạch, hay chế độ tin cậy đã phê duyệt trước nó |
| Thực thi | `pending`, `in_progress`, `blocked`, `completed` | Tiến độ theo từng tác vụ và tổng thể |

Create có hướng dẫn viết ra một **đề xuất đang chờ, có thể rà soát** — Lite hoặc Full, đã là kế hoạch thật sự, không bao giờ là một bản nháp dùng-rồi-bỏ. Trust vật liệu hóa một kế hoạch **đã sẵn sàng, được phê duyệt trước** và trả lại quyền kiểm soát ngay lập tức. `create` và một lần nâng cấp không bao giờ thực thi công việc sản phẩm; `execute` PHẢI (MUST) từ chối một đề xuất `pending` đang chờ phê duyệt và PHẢI (MUST) từ chối một kế hoạch đang có một lần nâng cấp chưa giải quyết xong.

## Tạo và chọn định dạng

`/dwp-create` phục vụ ý định lập kế hoạch ở mọi quy mô, không chỉ công việc lớn. Công việc nhỏ, có giới hạn — một mối quan tâm duy nhất, khoảng một buổi làm việc, không cần điều phối — là đối tượng hướng đến của kế hoạch Lite; công việc nhiều bước với phạm vi thực sự mặc định chuyển sang Full, theo [Rigor tỷ lệ](/spec/dwp-specification#proportional-rigor). Một chỉnh sửa trực tiếp, một lời giải thích, một lần kiểm tra trạng thái, một lần tiếp tục, hoặc một yêu cầu rõ ràng không cần kế hoạch giữ nguyên lộ trình riêng của nó và không bao giờ trở thành một kế hoạch.

`lite` và `full` là **tùy chọn định dạng**; `trust` và `auto` là những **tùy chọn tương tác** riêng biệt, và mỗi loại tùy chọn CÓ THỂ (MAY) xuất hiện ở đầu nào của yêu cầu cũng được, theo bất kỳ thứ tự nào:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Lặp lại cùng một tùy chọn có tính idempotent; yêu cầu cả `lite` và `full` cùng lúc là một lỗi. `--` kết thúc việc phân tích tùy chọn.

Khi không có tùy chọn định dạng nào được đưa ra, `create` đề xuất một định dạng và giải thích lý do. Một yêu cầu **Full** rõ ràng luôn thắng. Một yêu cầu **Lite** rõ ràng được tôn trọng trừ khi các yêu cầu hoặc cổng kiểm chứng của công việc sẽ không vừa trong các bản ghi nội tuyến gọn nhẹ — trong trường hợp đó `create` ghi lại lý do vì sao Full là cần thiết thay vào đó. Việc lựa chọn PHẢI (MUST) ghi lại phạm vi quan sát được, các phụ thuộc, mức độ chi tiết hướng dẫn cần thiết và những điều chưa biết đằng sau lựa chọn đó — một phán đoán có thể kiểm toán, không phải một sự bảo đảm đúng trên mọi mô hình hay agent.

## Nâng cấp và tính tương thích

Một kế hoạch Lite CÓ THỂ (MAY) được **nâng cấp** lên Full vào bất kỳ lúc nào, thông qua `/dwp-refine promote {plan_name}` (xem [dwp-refine](/kit/dwp-refine)). Việc nâng cấp chỉ liên quan đến **biểu diễn**: nó ghi lại ý định, viết các tệp tác vụ đích, xác minh rằng mọi yêu cầu và cổng mà bản ghi Lite mang theo vẫn được đáp ứng, chuyển bản sao có thẩm quyền từ các bản ghi README nội tuyến sang các tệp tác vụ, rồi xóa dấu hiệu đang-diễn-ra. `execute` và `resume` PHẢI (MUST) từ chối tiếp tục trong khi dấu hiệu nâng cấp vẫn còn được đặt. ID tác vụ và bằng chứng hoàn tất đã được ghi lại KHÔNG ĐƯỢC bị ghi đè bởi một lần nâng cấp; phạm vi mới được phát hiện trong quá trình nâng cấp thay vào đó đi qua `refine` và chỉ làm mất hiệu lực bằng chứng mà nó ảnh hưởng.

Việc nâng cấp không bao giờ tự động chạy theo chiều ngược lại: một kế hoạch Full không bị âm thầm gập lại thành Lite. Một kế hoạch được viết dưới một phiên bản spec trước đó — kể cả một kế hoạch Full v1 hoàn toàn không có trường `plan_format` — vẫn giữ nguyên hình dạng đã ghi lại của nó và vẫn tuân thủ; một phiên `refine` CÓ THỂ (MAY) di chuyển nó một cách có chủ đích, nhưng không có gì làm điều đó một cách ngầm định.

`plan_format` của `manifest.json` không thể thay đổi một khi đã được ghi; một lần nâng cấp thay đổi `format` của `state.json` và xóa dấu hiệu `promotion` của nó, và không bao giờ ghi đè lên manifest. Xem [Trạng thái kế hoạch](/spec/plan-state) để biết chính xác các trường `plan_format`, `format`, `materialization`, `approval`, `promotion` và `locator`, cùng các URL schema v2 của chúng.
