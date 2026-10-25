---
title: Tài nguyên và khả năng
description: "Context manifest theo từng tác vụ, giới hạn tài nguyên, khả năng của host, registry addon .dwp/config.json và các khả năng mà những addon được bật bổ sung."
order: 10
lang: vi
section: Record layer
---

# Tài nguyên và khả năng

> **Phạm vi phiên bản:** Trang này trình bày lại bốn tài liệu quy phạm của tiêu chuẩn hiện tại, DWP 7.0.0, tại bản phát hành `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/CONFIG.md) và [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_ABILITIES.md). Khi trang này và các tệp đó khác nhau, các tệp được ưu tiên.

**Trạng thái: Ổn định (ngữ cảnh và tài nguyên từ 6.0.0; cấu hình và khả năng từ 7.0.0).** Các quy tắc này ràng buộc các kế hoạch dòng v6 ([Lớp bản ghi](/spec/record-layer)); tiêu chuẩn v5 không bị thay đổi. Các từ khóa MUST, MUST NOT, SHOULD, SHOULD NOT và MAY được diễn giải như mô tả trong RFC 2119.

## Context manifest theo từng tác vụ

Trước mỗi tác vụ, agent dẫn xuất một **context manifest** từ hợp đồng và toàn bộ nhật ký (`context_manifest.py`). Đây là một view dẫn xuất, không bao giờ được lưu như trạng thái: dẫn xuất hai lần từ cùng các bản ghi PHẢI (MUST) tạo ra các byte giống hệt nhau, và manifest KHÔNG ĐƯỢC (MUST NOT) đọc bên ngoài kế hoạch và repository của nó. Hình dạng của nó được công bố dưới dạng [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Phần | Dẫn xuất từ |
| --- | --- |
| `identity` | tên kế hoạch, id và bản sửa đổi của hợp đồng đang hiệu lực |
| `authorization` | các sự kiện approval, nguyên văn, bao gồm các điểm kiểm tra đồng ý |
| `repository_rules` | phạm vi hợp đồng và các bất biến cùng trạng thái đánh giá hiện tại của chúng |
| `acceptance` | các tiêu chí của tác vụ cùng trạng thái đóng của chúng |
| `touched_surface` | các tệp được khai báo cùng hash nội dung hiện tại của chúng; một tệp bị thiếu hiển thị là bị thiếu |
| `evidence` | các con trỏ bằng chứng trong cửa sổ phân giải được trên đĩa |
| `dead_ends` | các cổng thất bại, lần từ chối, thích ứng bị từ chối và đối chứng không có tính phân biệt |
| `freshness` | dấu vân tay của các đầu vào mà manifest tóm tắt |
| `next_action` | đúng một bước tiếp theo với một lệnh cụ thể |

`authorization`, `repository_rules` và `acceptance` là **bắt buộc**: việc cắt tỉa ngữ cảnh không bao giờ có thể che giấu ranh giới chấp nhận hay ủy quyền. Thang hành động tiếp theo có thứ tự (approval, start, authority, control, evidence, complete) và không bao giờ trình bày một cổng đạt thông thường như thể nó đóng một tiêu chí có đối chứng.

**Các ngõ cụt được giữ lại.** Một mục chỉ rời khỏi bản tóm tắt dựa trên các sự kiện bản ghi đã được chứng minh (cùng dấu vân tay sau đó đã đạt, một lần từ chối trùng lặp mới hơn đã thay thế nó, hoặc một bản sửa đổi hợp đồng đã làm nó hết hiệu lực); một thay đổi bề mặt đơn thuần KHÔNG ĐƯỢC (MUST NOT) loại bỏ nó. **Độ mới được kiểm tra:** một bản tóm tắt có dấu vân tay đầu vào được ghi lại không còn khớp là đã cũ, và một bản tóm tắt không có dấu vân tay thì đã cũ theo cấu trúc. **Lịch sử chỉ được nạp khi có tác nhân kích hoạt** — một lần bàn giao được ghi lại hoặc một sửa đổi ảnh hưởng đến tác vụ; nếu không, riêng manifest là ngữ cảnh của tác vụ.

## Kế toán bốn đại lượng

Tải chỉ dẫn và chi phí được báo cáo dưới dạng bốn đại lượng riêng biệt: **byte chỉ dẫn** tĩnh, **token của nhà cung cấp** (chỉ khi một bộ đo của host đã ghi lại chúng), **chi phí tiền tệ** (chỉ từ các mẫu đơn giá thực đã được ghi lại) và **thời gian thực** (từ dấu thời gian của các sự kiện). Một đại lượng bị thiếu được báo cáo là thiếu cùng lý do, không bao giờ được suy diễn, và byte không bao giờ được quy đổi thành token hay tiền.

## Khả năng của host

Host thời gian chạy nêu các **khả năng** của nó từ một tập đóng: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Một khả năng không xác định PHẢI (MUST) bị từ chối, và một khả năng không được nêu là `false`. **Host tối thiểu** — không chuyển đổi mô hình, không subagent, không telemetry, không dừng — là một tư thế được hỗ trợ, không bao giờ là lỗi; mọi giới hạn cần một khả năng bị thiếu đều hạ xuống mức khuyến nghị, với khả năng bị thiếu được nêu tên.

Khả năng không phải là quyền được cấp. Một quyền được cấp trong hợp đồng là thẩm quyền; một khả năng là điều môi trường thực sự có thể làm. Mọi tư thế cần một khả năng vẫn cần quyền được cấp tương ứng.

## Giới hạn tài nguyên

Một hợp đồng CÓ THỂ (MAY) khai báo các giới hạn trong phần giới hạn tài nguyên của nó. Một giới hạn chỉ được **cưỡng chế** khi nó nêu tên một nguồn đo thực; nếu không, nó chỉ là **khuyến nghị**, và không bao giờ tuyên bố sự tương đương về cưỡng chế giữa các host.

- **Nguồn bộ đếm.** Các bộ đếm quan sát được từ nhật ký (khoảng thời gian thực, số lần thử lại cổng, số lần gọi điều phối) được tính từ chính các bản ghi của kế hoạch. Các bộ đếm chỉ có ở host (chi tiêu, token của nhà cung cấp) cần khả năng đo tương ứng và một mẫu observed từ một host adapter; một bộ đếm bị thiếu không có nghĩa là sử dụng miễn phí.
- **Phần dự trữ.** Một giới hạn CÓ THỂ (MAY) khai báo một `reserve` để việc kiểm chứng, thử lại và tiếp tục không bị công việc thông thường chiếm hết: việc điều phối bị từ chối khi lượng đã dùng cộng lượng đang chờ sẽ vượt quá giới hạn trừ đi phần dự trữ.
- **Cạn kiệt.** Chạm tới một giới hạn sẽ lưu một điểm kiểm tra chưa hoàn tất, ghi lại `LIMIT: exhausted <id>: <detail>` và giữ việc điều phối cho tới khi có một bản ghi `LIMIT: recovered <id>` tường minh. Một lần cạn kiệt không bao giờ có thể thỏa mãn một tiêu chí chấp nhận.
- **Quyết toán khi hủy.** Một khoản đặt trước đang thực hiện được quyết toán đúng một lần, dưới dạng giải phóng hoặc cam kết; một lần quyết toán thứ hai mâu thuẫn bị từ chối, không bao giờ được phân xử.
- **Tư thế định tuyến.** Mặc định là một mô hình cố định. Việc chuyển đổi bậc mô hình cần cả quyền `model_routing` và khả năng cùng tên; điều phối song song cần cả quyền `agent_delegation` và khả năng `subagents`. Một tư thế định tuyến là một tuyên bố về quyền, không bao giờ là một tuyên bố về hiệu quả.

## Tệp cấu hình và registry addon

`.dwp/config.json` (repository) và `~/.dwp/config.json` (người dùng) có chung một hình dạng, được công bố dưới dạng [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), và một trình phân tích cú pháp (`config.py`). **Phương pháp luận hoạt động mà không cần tệp cấu hình hay addon nào**; không có gì trong tệp có thể khiến một kế hoạch, một luồng hay sự tuân thủ phụ thuộc vào một addon.

- **Được theo dõi theo mặc định.** Tệp của repository chứa các quyết định, không bao giờ chứa bí mật, và được theo dõi trong git để đồng đội và CI đọc cùng một registry: onboarding ghi quy tắc `.gitignore` `.dwp/*` cùng với `!.dwp/config.json`. Các kế hoạch và bản ghi benchmark vẫn bị bỏ qua.
- **Thứ tự ưu tiên.** Tệp của repository thắng tệp của người dùng, và một tệp vắng mặt nghĩa là mọi thứ đều bị tắt. Khóa `addons` được phân giải theo từng khóa addon; khóa `benchmark` được phân giải nguyên khối.
- **Các khóa registry** là tên thư mục addon trong gói: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Mỗi mục có `enabled` (chỉ `true` mới bật), một `version` tùy chọn và một `note` một dòng tùy chọn. Một khóa không xác định bị bỏ qua kèm một cảnh báo.
- **Vắng mặt nghĩa là không được bật.** Chỉ onboarding với sự đồng ý của nhà phát triển, bước cài đặt riêng của một addon hoặc con người mới bật được bất cứ thứ gì. Một addon được bật nhưng không được phát hiện và có kèm ghi chú sẽ được báo cáo là bị hoãn.
- **Đọc theo hướng an toàn khi lỗi.** Một tệp không đọc được hoặc một giá trị sai định dạng không đóng góp gì và tạo ra đúng một cảnh báo; trình đọc không bao giờ hủy một luồng và không bao giờ im lặng về những gì nó đã loại bỏ. Trình ghi đối chiếu một cách nguyên tử và từ chối ghi đè một tệp mà nó không phân tích được.
- **Bản ghi host.** Một khóa `host` tùy chọn ghi lại các khả năng được khai báo của máy (các giá trị boolean từ tập đóng). `telemetry: true` vẫn cần sự đồng ý của nhà phát triển.
- **Chuẩn cơ sở không thay đổi.** Đánh giá cục bộ AI Diff Reviewer vẫn là một phần của mọi Final Review dù registry có nêu tên nó hay không.

## Khả năng do addon cung cấp

Từ 7.0.0, các addon được bật có thể bổ sung khả năng trong thời gian chạy:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

- **Bộ mô tả.** Mỗi addon trong gói đi kèm một `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) khai báo khóa của nó, những gì nó cung cấp và cách nó được phát hiện.
- **Việc phát hiện là chỉ đọc.** Một lệnh detect chạy không qua shell, với stdin bị đóng và thời gian chờ 10 giây, và không có gì nó in ra được thực thi. Một sản phẩm có phiên bản major của giao diện được báo cáo khác với phiên bản đã ghim thì không khả dụng, kèm một cảnh báo.
- **Không được bật nghĩa là không được tham khảo.** Bộ mô tả của một addon bị tắt không được mở và lệnh detect của nó không được chạy. Phép hợp là đơn điệu: bật một addon chỉ có thể bổ sung khả năng.
- **Không bao giờ được lưu lại.** Các khả năng hiệu lực được tính lại ở mỗi lần gọi và KHÔNG ĐƯỢC (MUST NOT) ghi vào một kế hoạch. Một kế hoạch ghi lại những gì nó đã dùng — sự kiện ủy quyền nêu tên phương thức truyền và addon của nó — chứ không phải những gì đã sẵn có.
- **Khả năng không phải là thẩm quyền.** Addon agentkit có thể cung cấp `subagents`, `cancel_children` và `model_routing`; addon Herdr có thể cung cấp `subagents` và `cancel_children`. Việc ủy quyền vẫn cần quyền `agent_delegation` của hợp đồng ([Ủy quyền](/spec/delegation)).

`resources.py abilities` in ra tập hiệu lực và nguồn gốc của từng khả năng; lệnh này là chỉ đọc.

## Liên quan

- [Lớp bản ghi](/spec/record-layer) — hợp đồng, nhật ký và bằng chứng.
- [Ủy quyền](/spec/delegation) — cách một kế hoạch sử dụng khả năng `subagents`.
- [Add-on](/spec/addons) — chính các add-on tùy chọn.
