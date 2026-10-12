---
title: Tự chủ của bầy agent
description: "Cách một bầy agent vượt qua giới hạn một tài khoản hay việc mất một agent: kiểm tra năng lực, gói bàn giao, kế nhiệm lead và chỉ leo thang việc nghiêm trọng."
order: 7
lang: vi
summary: Lane nhận biết năng lực, bàn giao chủ động, kế nhiệm lead theo epoch và phân loại leo thang giữ cho một bầy agent tiếp tục chạy.
icon: shield
---

# Tự chủ của bầy agent

[Chạy nhiều agent](/vi/methodology/06-orchestration) mô tả một lead và các lane của nó. Chương này trình bày những gì giữ cho thiết lập đó tiếp tục chạy khi một tài khoản chạm giới hạn hoặc một agent biến mất. Một lane kiểm tra tài khoản của nó còn bao nhiêu chỗ và chuyển giao công việc trước khi cạn. Một lead chuyển giao quyền lead, hoặc được thay thế khi nó biến mất. Bầy agent chỉ hỏi nhà phát triển những gì thực sự nghiêm trọng.

Sự cố mà nó giải quyết rất cụ thể: một lead hết hạn mức giữa chừng một kế hoạch sẽ bỏ rơi mọi lane, và không gì tiến triển cho tới khi có người mở một phiên mới. Với các quy tắc dưới đây, kế hoạch tiếp tục tiến lên trong phạm vi sự cấp phép mà nhà phát triển đã đưa ra.

Sáu quy tắc định hình mọi thứ ở đây:

1. **Mỗi sản phẩm một việc.** [coding-agents-kit](/vi/kit/agentkit) (`ak`) biết về tài khoản và năng lực, [herdr-peers](/vi/kit/herdr) biết về tin nhắn, pane và ai đang là lead, còn gói Deep Work Plan biết về phương pháp: khi nào bàn giao, agent kế nhiệm cần gì, điều gì cần leo thang. Mỗi thành phần đều tùy chọn. Khi không có chúng, các quy tắc vẫn giữ nguyên, với nhà phát triển chuyển tiếp tin nhắn và khởi chạy lại agent.
2. **Kế hoạch là đơn vị liên tục, không phải agent.** Mọi lần bàn giao và kế nhiệm là một lần tiếp tục thông thường cộng với một gói nhỏ mang theo điều mà nhật ký không có: ý định đang được thực hiện dở.
3. **Chủ động tốt hơn bị động.** Một agent kiểm tra chỗ còn lại của nó tại các ranh giới tác vụ và bàn giao khi vẫn còn đủ sức viết một gói tốt. Phản ứng sau khi đã chạm giới hạn vẫn là lưới an toàn.
4. **Tự chủ không bao giờ mở rộng quyền hạn.** Bàn giao, kế nhiệm, khởi chạy và lập lịch đều chạy trong sự cấp phép của kế hoạch. Không agent nào trả lời màn hình cấp quyền, bypass, đăng nhập, chấp thuận hay thanh toán, và công việc chỉ di chuyển giữa các tài khoản nhà phát triển đã khai báo.
5. **Sự liên tục không bao giờ hạ thấp ngưỡng.** Một agent kế nhiệm thừa hưởng cùng các cổng. Một gói không đóng tiêu chí nào, không nới lỏng cổng nào và không bỏ qua bước rà soát nào.
6. **Rẻ ngay từ cách dựng.** Năng lực được đọc từ bộ nhớ đệm tại các ranh giới tác vụ, không bao giờ trong một vòng lặp hay theo bộ hẹn giờ. Thông báo một chiều thay thế các câu hỏi không cần câu trả lời, và các gói đều nhỏ.

## Vai trò

| Vai trò | Là | Sở hữu | Không bao giờ |
| --- | --- | --- | --- |
| Lead | Agent đang giữ bản ghi lead của một kế hoạch | Kế hoạch, bảng lane, việc lập lịch, thứ tự phát hành, các lần merge và gắn tag trong phạm vi cấp phép, danh sách kế nhiệm | Ghi vào checkout của một lane, hoặc làm lead một kế hoạch mà lead khác đang giữ |
| Phó lead | Mục đầu tiên liên lạc được trong danh sách kế nhiệm của lead | Không gì cả cho tới khi tiếp quản | Hành động như lead trong khi lead vẫn liên lạc được |
| Lane | Một agent cho mỗi repository, luồng công việc hoặc tác vụ, trong pane riêng trên tài khoản riêng | Kế hoạch con hoặc tác vụ, nhánh, cổng và gói của nó | Giao việc cho lane khác, merge hoặc gắn tag |
| Người rà soát | Một lane của nhà cung cấp khác, chỉ đọc | Các phát hiện của nó | Ghi vào cây mã mà nó rà soát |

- **Lead luôn hoạt động.** Một bộ điều phối có các lane phải chờ con người chuyển tiếp sẽ bị đình trệ. Lead không bao giờ tạm dừng bầy agent vì một câu hỏi mà nó tự quyết định được.
- **Một bên thực thi cho mỗi kế hoạch.** Tại mỗi thời điểm, đúng một agent thực thi một kế hoạch hoặc kế hoạch con nhất định. Một agent thứ hai trên cùng kế hoạch là lỗi phối hợp mà lead phải giải quyết.
- **Quyền hạn đến từ kế hoạch, không đến từ một peer.** Một lane tự đọc sự cấp phép của kế hoạch. Một sự chấp thuận do agent khác chuyển tiếp không thêm gì mà lane chưa có sẵn.
- **Nhiều lead** có thể làm việc trong cùng một workspace, mỗi lead dẫn dắt một kế hoạch khác nhau. Mỗi tài khoản chỉ do một lane giữ tại một thời điểm thông qua một lease `ak`, nên hai lead không bao giờ đặt hai bên ghi lên cùng một tài khoản Codex.
- **Nhiều phiên bản cùng loại** — ba pane Grok, bốn pane Codex trên một hoặc nhiều hồ sơ — đều là lane thông thường. Các phiên bản trên cùng một hồ sơ dùng chung năng lực của hồ sơ đó.

Mỗi lane có một kế hoạch, tối thiểu là một kế hoạch Lite trong repository riêng của nó, và kế hoạch đó là thứ đầu tiên một agent kế nhiệm đọc. Mỗi lane báo cáo cho lead bằng một bộ từ vựng cố định — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — và kết thúc mỗi tin nhắn bằng một dòng năng lực, chẳng hạn `capacity=ok 64% @work1`, nên lead hiếm khi phải tự đọc hạn mức.

## Vòng lặp năng lực

Một agent kiểm tra chỗ còn lại của chính nó trước khi bắt đầu mỗi tác vụ, sau bất kỳ cổng hay bước nào chạy lâu hơn 20 phút, bất cứ khi nào CLI của nó hiển thị cảnh báo giới hạn sử dụng, và trước khi nhận một lần bàn giao hoặc quyền lead. Việc kiểm tra là `ak capacity --self --json` từ coding-agents-kit `v0.6.1`, được trình trợ giúp của gói chuyển thành một quyết định:

| Kết luận | Quyết định | Một lane | Một lead, cho chính nó |
| --- | --- | --- | --- |
| `ok` (trên ngưỡng thấp) | tiếp tục | Tiếp tục | Tiếp tục |
| `low` (25 % trở xuống) | chuẩn bị | Hoàn thành tác vụ hiện tại, không bắt đầu tác vụ nào nó không thể hoàn thành, báo cáo `capacity=low` | Chỉ định một người kế nhiệm dự kiến và không khởi chạy công việc dài nào trên chính nó |
| `critical` (10 % trở xuống, hoặc bị giới hạn tốc độ) | bàn giao | Đi tới điểm an toàn kế tiếp, viết gói, thông báo cho lead, dừng lại | Chuyển giao quyền lead ngay lập tức |
| `unknown` (không có nguồn hạn mức) | tiếp tục | Báo cáo `capacity=unknown`, bàn giao khi có cảnh báo giới hạn của CLI hoặc màn hình `usage_limit` | Ưu tiên các lane biết rõ năng lực cho tác vụ dài |

- **Ngưỡng** là của bộ kit: mặc định thấp ở 25 % và nghiêm trọng ở 10 % phần còn trống của cửa sổ ràng buộc, điều chỉnh được bằng `AGENTKIT_CAPACITY_LOW` và `AGENTKIT_CAPACITY_CRITICAL`. Số đo đến từ một bộ nhớ đệm được giữ trong 300 giây, nên việc kiểm tra tại mỗi ranh giới tác vụ chỉ tốn vài lần gọi tới nhà cung cấp mỗi giờ.
- **Độ trễ (hysteresis).** Khi một gói đã được viết, việc bàn giao sẽ hoàn tất. Agent không bao giờ tiếp tục tác vụ đó sau khi tài khoản của nó hồi phục; agent kế nhiệm sở hữu tác vụ, và tài khoản đã hồi phục chỉ đơn giản quay về nhóm tài khoản.
- **Áp lực ngữ cảnh cũng được tính.** Khi ngữ cảnh của agent chạm ngưỡng ngữ cảnh mới của hợp đồng (mặc định 60 %), cùng một gói và cùng một lần bàn giao sẽ diễn ra.
- **Suy giảm trung thực.** Khi không có bộ kit, với bộ kit cũ hơn, hoặc ngoài một lần khởi chạy bằng `ak`, năng lực được báo cáo là không xác định, không bao giờ là ok.

**Nhóm tài khoản là của nhà phát triển.** Kế hoạch ghi lại các tài khoản mà nhà phát triển đã khai báo cho công việc. Một agent không bao giờ tạo tài khoản, gia hạn phiên đăng nhập, dùng một lần đặt lại Codex hay dùng tài khoản ngoài nhóm, và nó làm việc trong khuôn khổ điều khoản của từng nhà cung cấp. Di chuyển công việc trước khi chạm giới hạn, trong phạm vi nhóm, là lập lịch; xoay vòng tài khoản để vượt qua một giới hạn thì không bao giờ được phép. Với mỗi tác vụ sẵn sàng, lead lấy tài khoản xếp hạng tốt nhất từ `ak pick --owner <lead>`, lease nó cho chính địa chỉ của lane bằng `ak lease`, không bao giờ giao cho một lane tài khoản của chính lead (cả hai sẽ cùng chạm mức `critical`), ưu tiên các tài khoản biết rõ năng lực cho tác vụ dài và một nhà cung cấp khác cho người rà soát, và luôn giữ một phó lead. Khi không tài khoản nào trong nhóm còn chỗ và không tài khoản nào được đặt lại trong khung thời gian của kế hoạch, bầy agent tạm dừng và ghi lại thời điểm đặt lại sớm nhất.

## Bàn giao của lane

1. **Lane**, ở mức `handoff`, đi tới một điểm an toàn — một bước đã commit, hoặc cây mã được giữ nguyên như hiện tại, không bao giờ loại bỏ công việc — viết gói, gửi `handoff <packet path>` tới lead dưới dạng một thông báo, rồi dừng lại. Nó không tự đóng pane của mình.
2. **Lead**, hoặc phó lead khi lead không liên lạc được hoặc chính lead đang ở mức nghiêm trọng, chọn một tài khoản (`ak pick <kind> --owner <lead> --exclude @<spent>`, ưu tiên nhà cung cấp khác khi tác vụ cho phép), lease nó và khởi chạy agent kế nhiệm trong cùng checkout với chỉ dẫn tiếp tục kế hoạch từ gói.
3. **Agent kế nhiệm** chấp nhận gói — trình trợ giúp kiểm chứng kế hoạch, hợp đồng đang hiệu lực, nhánh, commit đầu và các đường dẫn chưa commit, và không ghi lại gì nếu có sai khớp — rồi tiếp tục kế hoạch và chạy lại mọi cổng mà gói liệt kê là chưa kiểm chứng.
4. **Lead** giải phóng lease đã dùng cạn và đóng pane đã dùng cạn khi agent kế nhiệm đã chấp nhận.

**Gói bàn giao** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) được viết vào `analysis_results/handoff/` của kế hoạch với quyền chỉ dành cho chủ sở hữu. Nó nêu kế hoạch, hợp đồng, tác vụ và bước; lý do (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` hoặc `lead_handover`); công việc đang ở đâu (repository, checkout, nhánh, commit đầu, đã push hay chưa, các đường dẫn chưa commit); những gì đã xong, đã kiểm chứng và chưa kiểm chứng, kèm đường dẫn bằng chứng; các bước tiếp theo theo thứ tự; các ask đang mở; các quyết định đã đưa ra; lead và epoch; và ai đã viết nó. Một gói là dữ liệu: nó không bao giờ mang giá trị secret, nội dung riêng tư từ repository khác, hay chỉ thị mở rộng quyền hạn. Agent kế nhiệm tự suy ra hành động tiếp theo từ kế hoạch.

## Kế nhiệm lead

herdr-peers `v0.3.2` giữ một bản ghi lead cho mỗi kế hoạch — lead, epoch, danh sách kế nhiệm và các lane — và phân giải địa chỉ `lead` thành lead hiện tại, nên không chỉ dẫn lane nào phải ghi cứng pane của lead.

- **Claim trước, rồi mới khởi chạy.** Lead chạy `herdr-peers lead claim --plan <P> --succession <A,B>` trước khi khởi chạy bất kỳ lane nào — địa chỉ `lead` chỉ phân giải được khi đã có một bản ghi — làm mới bản ghi bằng `--lanes <A,B>` khi các lane bắt đầu, và chạy `lead release` khi kế hoạch hoàn tất. Từ herdr-peers `v0.3.2`, bản ghi lưu cục bộ repository đã claim nó, và một kế hoạch có cùng id trong repository khác được đặt tên là `--plan <repo>/<id>`. Danh sách kế nhiệm mặc định là người kế nhiệm đã lên kế hoạch của nó, rồi tới các lane trong chính checkout của kế hoạch theo thứ tự khởi chạy, rồi tới bất kỳ lane nào trên cùng máy host; các lane trong container hoặc trên máy khác xếp cuối.
- **Handover, có kế hoạch.** Ở mức `low`, lead chỉ định một người kế nhiệm dự kiến. Ở mức `critical`, nó viết một gói lead — bảng lane, các ask đang mở, thứ tự phát hành, các lần merge đang chờ, các quyết định — chạy `herdr-peers lead handover <addr> --plan <P>`, lệnh này tăng epoch và thông báo cho mọi lane, rồi dừng lại. Agent kế nhiệm chấp nhận gói, tiếp tục kế hoạch điều phối và kiểm tra lại mọi lane.
- **Takeover, ngoài kế hoạch.** Khi lead không liên lạc được, không có agent, hiển thị màn hình `usage_limit`, hoặc một ask gửi tới nó hết thời gian chờ hai lần, mục đầu tiên liên lạc được trong danh sách kế nhiệm chạy `herdr-peers lead takeover --plan <P>` — tự nó đảm nhận, hoặc khởi chạy một pane lead mới trong checkout của kế hoạch. Lead mới tái dựng trạng thái từ kế hoạch. Ý định đang thực hiện dở bị thiếu được ghi lại là bị thiếu, không bao giờ bịa ra.
- **Rào chắn (fencing).** Chỉ bên giữ epoch cao nhất mới hành động như lead. Một lane chỉ chấp nhận thông báo lead từ agent đã giao việc cho nó (lần claim đầu tiên), từ lead hiện tại ở epoch kế tiếp (handover), hoặc từ mục đầu tiên liên lạc được trong danh sách kế nhiệm ở epoch kế tiếp (takeover); khi hòa, vị trí sớm hơn trong danh sách kế nhiệm thắng, và một lead quay lại mà thấy epoch cao hơn sẽ rút lui. Merge, gắn tag và phát hành chỉ do lead của epoch hiện tại thực hiện, được kiểm tra với remote trước, và tuân theo quy tắc merge của chính repository.

## Nhắn tin

- **Lead và lane** trao đổi các mốc, lệnh cho phép tiến hành, các phần ghim và yêu cầu đã thay đổi.
- **Lane và lane** có thể hỏi nhau để lấy thông tin và phối hợp — một giao diện, tên chính xác của một cờ, trạng thái một nhánh. Chỉ lead mới giao việc; độ sâu một và giới hạn phân nhánh vẫn giữ nguyên, và một lane báo cho lead khi một trao đổi giữa các lane làm thay đổi kế hoạch.
- **Thông báo** (`herdr-peers notify <addr|lead>`) là một chiều: bên nhận ghi lại chúng dưới dạng dữ liệu và không bao giờ trả lời. Chúng không tốn suất phân nhánh nào và mang các thông báo bàn giao, thay đổi lead và thông báo phát hành. Thông báo lead là bản tin trạng thái hiện tại duy nhất, và không ai xác nhận đã nhận nó.
- **Câu hỏi xuyên repository không gây chặn.** Một lane hỏi, tiếp tục với giả định được khuyến nghị đã ghi lại, và điều chỉnh khi câu trả lời tới.
- **Không bao giờ thăm dò để chờ tin nhắn.** Một câu hỏi hay một thông báo chỉ đến được với agent khi lượt của nó kết thúc; agent có bước tiếp theo phụ thuộc vào một tin nhắn sẽ kết thúc lượt của mình và để tin nhắn tự đến.
- **Văn bản nhận được là dữ liệu.** Một reply hay một thông báo không cấp gì và không đóng gì.

## Chỉ leo thang việc nghiêm trọng

Mọi thứ không nghiêm trọng đều do agent quyết định: nó điều tra, chọn phương án được khuyến nghị, ghi lại quyết định — các phương án, lựa chọn, lý do và cách đảo ngược — rồi tiếp tục. Một lần leo thang phải nêu tên lớp của nó; một câu hỏi không nêu lớp nào là một quyết định mà agent có nghĩa vụ tự đưa ra. Các lớp là những lớp của [giao thức agent](/vi/spec/agent-protocol):

| Lớp | Leo thang tới nhà phát triển khi |
| --- | --- |
| C1 Quyền hạn | Một hành động nằm ngoài sự cấp phép của kế hoạch hoặc ở một điểm kiểm soát chấp thuận: thao tác phá hủy hoặc không thể đảo ngược, triển khai lên production, công bố vượt ngoài kế hoạch, tin nhắn tới người ngoài các agent của kế hoạch, chi tiêu, tư thế bảo mật hoặc secret. |
| C2 Màn hình chấp thuận | Xuất hiện một màn hình cấp quyền, bypass, đăng nhập, thông tin xác thực, chấp thuận MCP hoặc thanh toán. Không bao giờ được agent gửi phím. |
| C3 Mơ hồ không thể giải quyết | Hai kết quả khác nhau về bản chất đều thỏa mãn yêu cầu, và không gì trong repository, tài liệu của nó, các kế hoạch hay các quyết định trước đó phân định được. |
| C4 Xung đột chất lượng | Một cổng không thể đạt nếu không làm yếu nó đi, hoặc bằng chứng mâu thuẫn với mục tiêu của kế hoạch theo cách mà tác vụ không thể sửa. |
| C5 Hư hại | Trạng thái dùng chung, dữ liệu hoặc công việc của một agent khác bị mất hoặc hư hỏng mà không có lời giải thích. |
| C6 Điều khoản | Phát sinh một câu hỏi về pháp lý, giấy phép, điều khoản nhà cung cấp hoặc quyền riêng tư. |
| C7 Cạn kiệt năng lực | Không tài khoản nào trong nhóm đã khai báo còn chỗ, và không tài khoản nào được đặt lại trong khung thời gian của kế hoạch. |

Trong một bầy agent, **một mục nghiêm trọng chặn chuỗi phụ thuộc của nó, không chặn cả bầy.** Lead tạm gác tác vụ bị chặn — bản ghi bị chặn của nó chính là lần leo thang, được gửi một lần — giữ mọi lane độc lập tiếp tục chạy, và tiếp tục chuỗi khi nhà phát triển trả lời. Tự chủ không bao giờ đóng một sự phê duyệt của con người, lời nguyên văn của nhà phát triển được ưu tiên hơn một khuyến nghị, và một sự chấp thuận do agent chuyển tiếp được ghi lại là được chuyển tiếp, không bao giờ như thể chính nhà phát triển đã viết ra.

## Ngưỡng chất lượng

Một bầy agent chỉ đáng chạy nếu kết quả của nó đáng tin cậy. [Ngưỡng chất lượng](/vi/spec/dwp-specification) áp dụng cho mọi agent tiếp tục một kế hoạch:

- **Cổng là giả thuyết.** Một cổng mới hoặc đã thay đổi được chứng minh là thất bại trên một lỗi được cài sẵn trước khi được tin cậy, và một kết quả đạt rỗng — thiếu tệp thực thi, không khớp tệp nào, log rỗng — là một thất bại. Một tác vụ có hợp đồng đầu vào nêu rõ các trường hợp biên — rỗng, nhiều dòng, khoảng trắng bao quanh — để việc vượt qua mọi ví dụ không bị nhầm là đã chứng minh quy tắc.
- **So sánh với nhánh gốc.** Hiệu năng, độ phủ và kích thước được so sánh với nhánh gốc, không chỉ với một ngưỡng.
- **Đo trước, thiết kế trước khi xây dựng.** Một bản sửa hoặc đợt kiểm toán kiểm chứng tiền đề và công cụ đo của nó trước; một thay đổi không tầm thường ghi ra giao diện, các chế độ thất bại, bảo mật và test trước khi viết mã.
- **Rà soát trước bước không thể đảo ngược.** Bước AI Diff Review cục bộ chạy trước mọi lần merge, gắn tag hoặc công bố, và các thay đổi về phương pháp luận hoặc giao thức có thêm một người rà soát từ nhà cung cấp khác.
- **Sự liên tục không bao giờ hạ thấp ngưỡng.** Một agent kế nhiệm chạy lại những gì gói liệt kê là chưa kiểm chứng; một lần bàn giao không bao giờ là lối tắt vượt qua một cổng.

## Bản ghi

Nhật ký của kế hoạch điều phối ghi lại bầy agent: các lần khởi chạy và kết quả của lane dưới dạng sự kiện ủy thác; các kết luận năng lực, các lần bàn giao và kế nhiệm dưới dạng quan sát; các lần leo thang và câu trả lời của nhà phát triển dưới dạng can thiệp. Các gói và bản ghi chấp nhận của chúng nằm trong kế hoạch đã thực thi công việc, và báo cáo hoàn tất nêu tên mọi lần bàn giao và kế nhiệm kèm gói của nó.

## Diễn tập

Hãy chứng minh vòng lặp trước khi dựa vào nó. Trên một repository thử nghiệm với một kế hoạch điều phối nhỏ, chạy một lead và ít nhất ba lane trên các tài khoản hoặc nhà cung cấp khác nhau. Giới hạn năng lực được báo cáo của một lane — `AGENTKIT_CAPACITY_CAP=@<profile>=8` hạ số đo và không bao giờ nâng nó lên — và quan sát lane đó viết một gói, lead khởi chạy một agent kế nhiệm chấp nhận gói, và agent kế nhiệm vượt qua cổng. Giới hạn lead theo cùng cách và quan sát lần handover cùng lead mới hoàn tất kế hoạch. Sau đó ghi bằng chứng vào `analysis_results/` của kế hoạch: không có phím bấm nào của con người, mọi gói, mọi epoch, một ask giữa hai lane, và các cổng.
