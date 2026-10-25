---
title: Lớp bản ghi
description: "Lớp bản ghi v6 và v7: một hợp đồng kết quả bất biến, một nhật ký chỉ ghi thêm, các lớp bằng chứng, phê duyệt của con người, sửa đổi, bất biến và biên nhận."
order: 9
lang: vi
section: Record layer
---

# Lớp bản ghi

> **Phạm vi phiên bản:** Trang này trình bày lại lớp bản ghi v6 có tính quy phạm mà tiêu chuẩn hiện tại, DWP 7.0.0, xây dựng trên đó. Nguồn chính thức tại bản phát hành `v7.8.1`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) và [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). Khi trang này và các tệp đó khác nhau, các tệp được ưu tiên. Kế hoạch v5 giữ lớp [trạng thái kế hoạch](/spec/plan-state) và không bao giờ được di chuyển một cách ngầm định.

**Phiên bản 6.0.0, mở rộng trong 7.0.0. Trạng thái: Ổn định.** Lớp bản ghi thay thế việc hoàn tất bằng lời tường thuật bằng các bản ghi: hợp đồng là thẩm quyền, nhật ký là bộ nhớ, các helper thực hiện việc ghi, và mọi tệp được sinh ra đều là một phép chiếu. Các từ khóa MUST, MUST NOT, SHOULD, SHOULD NOT và MAY được diễn giải như mô tả trong RFC 2119.

## Mô hình trong một dòng

Một kế hoạch gồm hai thành phần được soạn thảo và một chuỗi được bảo vệ. Markdown của kế hoạch (`README.md` và các tệp tác vụ) nói điều gì sẽ được làm. **Hợp đồng kết quả** (`contract.json`) nói điều gì được tính là xong và kế hoạch được phép làm gì. **Nhật ký** (`journal.ndjson`) ghi lại điều đã thực sự xảy ra. `state.json` và `views/` được tái tạo từ nhật ký và KHÔNG ĐƯỢC (MUST NOT) chỉnh sửa bằng tay; khi một tệp được sinh ra và nhật ký không khớp nhau, nhật ký thắng và tệp được tái tạo.

## Nhận diện thế hệ

Một thư mục kế hoạch là một kế hoạch thuộc dòng v6 khi và chỉ khi nó mang một `manifest.json` có con trỏ `contract` phân giải được, một `contract.json`, hoặc một chuỗi bản sửa đổi `contracts/`. Việc nhận diện PHẢI (MUST) dựa trên các thành phần này, không bao giờ dựa trên phiên bản gói đã cài: một gói hiện tại có thể chứa kế hoạch v5, và một gói cũ hơn có thể gặp một kế hoạch v6.

URL `schema` của hợp đồng nêu tên **thế hệ** của nó, và manifest cùng mọi sự kiện nhật ký phản chiếu thế hệ đó:

| Thế hệ | Hợp đồng | Sự kiện nhật ký | Manifest | Bổ sung |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` và sự kiện `delegation` ([Ủy quyền](/spec/delegation)) |

Các kế hoạch mới do gói 7.x tạo ra mặc định là v7; một yêu cầu `v6` tường minh vẫn vật liệu hóa một hợp đồng v6. Một kế hoạch không bao giờ đổi thế hệ, và một nhật ký trộn lẫn các thế hệ PHẢI (MUST) bị từ chối. Cả hai thế hệ đều chiếu vào cùng một hình dạng [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## Hợp đồng kết quả

Mỗi kế hoạch có một hợp đồng, tuân theo schema của thế hệ của nó. Hợp đồng mang phát biểu kết quả và định nghĩa thành công, các tiêu chí chấp nhận, các tác vụ cùng điều kiện tiên quyết, bề mặt bị chạm tới và ý định cổng của chúng, các bất biến trong phạm vi kế hoạch, phạm vi (đường dẫn được phép, các lớp lệnh, các thao tác bị cấm), giới hạn tài nguyên, giới hạn lập lịch, quyền và bản ghi ủy quyền.

- **Danh tính.** `contract_id` là SHA-256 của các byte chuẩn hóa của hợp đồng, không tính trường id. Mọi bản ghi được tạo dưới hợp đồng đều trích dẫn nó.
- **Tính bất biến.** Khi việc thực thi đã bắt đầu, hợp đồng KHÔNG ĐƯỢC (MUST NOT) thay đổi. Một hợp đồng thay đổi là một **bản sửa đổi** mới dưới `contracts/`, trích dẫn bản cha của nó, với số hiệu sửa đổi liên tiếp và thẩm quyền mới được ghi lại.
- **Id ổn định.** Các tiêu chí (`AC-*`), bất biến (`INV-*`) và tác vụ (`T-*`) PHẢI (MUST) là duy nhất, và các bản ghi trích dẫn id, không bao giờ trích dẫn vị trí trong danh sách. Đồ thị tác vụ PHẢI (MUST) không có chu trình, và mọi ý định cổng PHẢI (MUST) tham chiếu tới một tiêu chí đã khai báo.
- **Quyền.** Các khả năng được cấp và không được cấp PHẢI (MUST) là các tập con rời nhau của một tập đóng: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Ủy quyền.** Cơ chế là đúng `plan_authorship` (con người đã soạn hoặc rà soát kế hoạch trước khi thực thi) hoặc `pre_authorization` (một quyền thường trực với giới hạn được nêu rõ, như trong chế độ tin cậy). Cả hai đều qua cổng như nhau; chỉ thẩm quyền được ghi lại là khác nhau.
- **Khả năng đóng.** Mọi tiêu chí PHẢI (MUST) đóng được: một tiêu chí mà một tác vụ chặn bằng cổng được đóng bởi bằng chứng `observed` từ cổng của nó hoặc bởi một phê duyệt `asserted` của con người, tùy theo các lớp bằng chứng mà nó chấp nhận. Một tiêu chí nháp không chấp nhận lớp nào bị từ chối.

## Vật liệu hóa

Một kế hoạch được vật liệu hóa bởi helper đi kèm (`ledger.py materialize`), không bao giờ bằng tay, theo đúng thứ tự sau, mỗi bước đều idempotent và có thể tiếp tục:

1. **`manifest.json`** với con trỏ hợp đồng, được ghi trước tiên để thế hệ của kế hoạch có thể được phát hiện ngay cả khi việc vật liệu hóa bị gián đoạn.
2. **`contract.json`**, đã được kiểm định và định địa chỉ theo nội dung.
3. Sự kiện nhật ký **`approval`**, trích dẫn id hợp đồng và digest của markdown kế hoạch.

Chỉ sự kiện approval đó mới mở cổng bắt đầu tác vụ. Một hợp đồng được sao chép bằng tay mà không có nó sẽ bị từ chối khi bắt đầu tác vụ, và một manifest có con trỏ không khớp với hợp đồng đang vật liệu hóa sẽ bị từ chối thay vì bị ghi lại.

## Nhật ký

`journal.ndjson` là chỉ ghi thêm: mỗi dòng một đối tượng JSON đóng, không bao giờ bị sửa hay xóa. Một sự điều chỉnh là một sự kiện sau đó. Mọi sự kiện mang schema, loại, một `seq` tăng nghiêm ngặt, một dấu thời gian, kế hoạch, `contract_id` và tác nhân (`helper`, `agent`, `host_adapter` hoặc `human`). Danh mục sự kiện bao gồm bắt đầu tác vụ, phê duyệt, các lần chạy cổng, quan sát, thích ứng, sửa đổi, can thiệp, mẫu tài nguyên, cặp đối chứng, lựa chọn của bộ lập lịch, từ chối, hiển thị view, đối chiếu và sửa chữa nhật ký; v7 bổ sung các sự kiện ủy quyền. Mọi lần từ chối đều tự nó được ghi lại.

## Các lớp bằng chứng

Các sự kiện mang bằng chứng ghi lại một nhãn **tin cậy**:

1. **observed** — chính một helper đi kèm đã thực thi việc kiểm tra, với thư mục làm việc, môi trường, thời gian chờ được khai báo và đầu ra được thu lại. Chỉ trình chạy cổng (`ledger.py gate`) mới tạo ra bằng chứng cổng observed; một agent chỉ ghi lại kết quả mà nó báo cáo thì không thể.
2. **imported** — lấy từ một nguồn bên ngoài khớp, có nguồn gốc rõ ràng, ví dụ một bản ghi cổng v5 đã di chuyển có con trỏ bằng chứng phân giải được.
3. **asserted** — được khẳng định mà không có xác lập độc lập.

Mỗi tiêu chí khai báo các lớp mà nó chấp nhận, vì vậy một tiêu chí chỉ chấp nhận observed không bao giờ có thể đóng dựa trên một lời khẳng định. Checksum xác lập sự đồng nhất về byte, không phải sự đúng đắn về ngữ nghĩa; lớp bản ghi kiểm tra cấu trúc và nguồn gốc, và không chứng minh ngữ nghĩa sản phẩm.

## Phê duyệt của con người

Một tiêu chí mà con người phải phán xét được đóng qua `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. Phê duyệt được ghi lại là `asserted`, trích dẫn thành phần mà nó dựa vào, chỉ được tính bên trong cửa sổ bằng chứng của tác vụ khai báo, và chỉ đóng một tiêu chí chấp nhận `asserted`. Một agent không bao giờ phê duyệt thay cho con người. Các bản ghi có tác nhân là con người được ghi ngoài quá trình vật liệu hóa mang một dấu thẩm quyền tường minh (một ghi chú do con người viết, được ghi lại bằng đường dẫn và digest, hoặc một xác nhận tương tác); ledger không thể xác thực một con người, nên dấu này làm cho lời khẳng định có thể kiểm toán được chứ không biến nó thành observed.

## Các tiêu chí có đối chứng

Một tiêu chí được khai báo là đối chứng hồi quy hoặc đối chứng phân biệt chỉ đóng trên một **cặp đối chứng có tính phân biệt**: việc kiểm tra thất bại trên bản sửa đổi khởi đầu và đạt trên bản mới. Một cặp đạt ở cả hai nhánh được ghi lại là không có tính phân biệt và không bao giờ được làm tròn lên; một điểm khởi đầu bẩn hoặc một nhánh cũ không khả dụng được ghi lại là đối chứng không khả dụng, không bao giờ được tổng hợp ra.

## Thực thi và hoàn tất

Việc điều phối đến từ bộ lập lịch tất định (`scheduler.py ready`), và `ledger.py start` từ chối một tác vụ có điều kiện tiên quyết chưa hoàn tất. Mỗi lần bắt đầu tác vụ ghi lại một dấu vân tay của cây làm việc, và bằng chứng chỉ được tái sử dụng cho cùng tác vụ và tiêu chí trên một dấu vân tay tương đương.

**Bất biến có phạm vi kế hoạch.** Mỗi bất biến được khai báo đúng trên toàn bộ kế hoạch và được đánh giá tại mọi ranh giới dưới dạng một quan sát (`INV-<id>: pass` hoặc `INV-<id>: fail: <reason>`). Một thuộc tính mà chỉ một số tác vụ phải giữ là một tiêu chí chấp nhận của các tác vụ đó, không bao giờ là một bất biến.

**Hoàn tất được dẫn xuất, không bao giờ được tuyên bố.** `ledger.py complete` từ chối, và ghi lại lần từ chối, khi còn bất kỳ tiêu chí nào thiếu bằng chứng được chấp nhận trong cửa sổ hoặc bất kỳ bất biến nào thiếu một lần đánh giá đạt mới. Snapshot hiển thị một tác vụ là đã hoàn tất đúng khi các bản ghi hỗ trợ điều đó.

## Thích ứng và sửa đổi

Các thay đổi giữa chừng là các đề xuất gửi tới bộ lập lịch, giới hạn trong một tập đóng: `split`, `reorder`, `insert`, `change_strategy` và `retry`. Một thích ứng KHÔNG ĐƯỢC (MUST NOT) xóa một yêu cầu, làm yếu đi hoặc thay thế tiêu chí chấp nhận, mở rộng phạm vi hoặc quyền, chi tiêu vượt quá giới hạn, hoặc đánh dấu hoàn tất một kịch bản chưa được thực thi.

Một thay đổi về phạm vi, tiêu chí chấp nhận, quyền hoặc giới hạn là một **sửa đổi hợp đồng**: `ledger.py amend` chuẩn bị hợp đồng đã sửa thành bản sửa đổi kế tiếp, ghi lại sửa đổi cùng các tiêu chí có bằng chứng trước đó bị nó vô hiệu hóa, đòi hỏi một phê duyệt mới với dấu thẩm quyền của con người, và chỉ khi đó mới chuyển sang hợp đồng mới. Một lần sửa đổi bị gián đoạn tiếp tục tại bước đầu tiên còn thiếu; quyền soạn kế hoạch không bao giờ được chuyển sang một bản sửa đổi.

## Biên nhận, view và xuất

`outcomes.py receipt` tính lại kết quả của kế hoạch từ các bản ghi, nên nó thay đổi khi các bản ghi thay đổi; nó không bao giờ được viết tay. `views.py render` tái tạo các view mà con người đọc được; một view đã bị con người chỉnh sửa sẽ được báo cáo, không bao giờ bị ghi đè âm thầm, và việc đối chiếu tự nó được ghi lại. Vì `.dwp/` bị gitignore, `ledger.py export --dest <dir>` đóng gói nhật ký, snapshot, chuỗi hợp đồng và mọi thành phần bằng chứng được trích dẫn để lưu giữ bền vững hoặc cho một host khác.

## Bề mặt chỉ đọc và tiếp tục

`status` và `verify` không bao giờ ghi vào một kế hoạch dòng v6; chúng báo cáo thông qua các lệnh thuần túy và các phép chiếu được sinh ra. Một host đang tiếp tục phục hồi theo một thứ tự cố định (kiểm tra, kiểm định, chiếu, hiển thị với thẩm quyền được ghi lại) và coi một dấu vân tay cũ là bằng chứng đã bị vô hiệu cần chạy lại, không bao giờ là một kết quả có thể tái sử dụng. Nhật ký không bao giờ được phát lại như ngữ cảnh hội thoại: công việc tiếp tục qua vòng lặp execute với một [context manifest](/spec/resources-and-abilities#the-per-task-context-manifest) cho từng tác vụ.

## Cùng tồn tại và di chuyển

Kế hoạch v5 và kế hoạch dòng v6 CÓ THỂ (MAY) cùng tồn tại trong một `.dwp/plans/`, và mỗi kế hoạch chạy dưới thế hệ của riêng nó trong suốt vòng đời. Con đường duy nhất từ v5 lên v6 là một lần di chuyển tường minh, có xem trước (`migrate_v6.py`, chạy qua `refine`) với một bản sao lưu đã kiểm chứng và khả năng hoàn tác; lịch sử v5 đã di chuyển là `imported` khi bằng chứng của nó phân giải được và `asserted` trong trường hợp ngược lại, không bao giờ là `observed`. Không có di chuyển ngược.

## Liên quan

- [Tài nguyên và khả năng](/spec/resources-and-abilities) — context manifest, giới hạn tài nguyên, khả năng của host và registry addon.
- [Ủy quyền](/spec/delegation) — những gì v7 bổ sung vào lớp này.
- [Trạng thái kế hoạch](/spec/plan-state) — lớp trạng thái v5 được giữ lại.
