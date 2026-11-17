---
title: Loop engineering
description: "Cách daemon do con người khởi động đưa Deep Work Plan đã duyệt đến đích: bản ghi lead, lời nhắc, trở ngại có cấu trúc, kế nhiệm, revive, hàng đợi và sự kiện."
order: 8
lang: vi
summary: Vòng đời trọn vẹn giữ cho kế hoạch đã duyệt tiếp tục chạy trong phạm vi quyền hạn đã ghi.
icon: repeat
---

# Loop engineering

**Đặc tả trước, vòng lặp khép kín: repository là harness và kế hoạch tự chạy đến khi hoàn thành.** Chương này mô tả cơ chế tùy chọn giữ cho kế hoạch tiếp tục chạy sau lượt thực thi đầu tiên. Kế hoạch vẫn là đặc tả bền vững; vòng lặp mang lại tính liên tục, không phải quyền hạn mới.

Văn bản quy phạm nằm trong [đặc tả loop engineering](/vi/spec/loop-engineering). Chương này là phần đồng hành dạng tường thuật: nó đi qua vòng đời theo thứ tự và cho thấy các thành phần khớp với nhau thế nào, mà không nhắc lại mọi MUST.

## Vì sao cần vòng lặp

Hai trụ cột đầu tiên của DWP còn để lại một khoảng trống. Lập kế hoạch đặc tả trước nói *cái gì* mà một episode phải bàn giao và cách nó được xác thực. Repository-là-harness nói ngữ cảnh, công cụ và các cổng nằm *ở đâu*. Không cái nào nói *công việc kết thúc thế nào* khi agent đang thực thi kết thúc lượt của mình, chạm giới hạn sử dụng hoặc đóng pane. Không có vòng lặp, một kế hoạch đã duyệt và được đặc tả tốt vẫn phải chờ ai đó gõ "tiếp tục".

Quy tắc v8 lấp khoảng trống đó. Một kế hoạch đã duyệt chạy đến khi hoàn thành mà không cần con người can thiệp thường xuyên, trong phạm vi quyền hạn ghi trong chính kế hoạch đó. Con người được thông báo, không phải bị chờ, trừ khi cần đăng nhập hoặc thông tin xác thực, hoặc khi một trong các cổng C1–C7 của chính kế hoạch đòi hỏi đầu vào của con người chưa được cho phép trước. Ở những ngoại lệ đó, việc thực thi dừng tại cổng cho đến khi đầu vào đến.

Vì vậy vòng lặp là cơ chế tiếp tục, không phải cơ chế phê duyệt, và nó là tùy chọn: tích hợp Herdr (herdr-peers `autopilot --loop`) khuếch đại một phương pháp vốn đã chạy được trong một phiên duy nhất.

## Tổng quan vòng đời

Một kế hoạch đã duyệt đi qua các giai đoạn sau. Mỗi giai đoạn được mô tả chi tiết bên dưới.

| Giai đoạn | Điều gì xảy ra | Ai hành động |
|---|---|---|
| Phê duyệt | Kế hoạch được duyệt; hợp đồng của nó ghi quyền hạn và, theo v8, một khối `autonomy` tùy chọn | Con người |
| Đăng ký | `execute` nhận bản ghi lead của kế hoạch (`resume` nhận lại), kèm danh sách kế nhiệm khi kế hoạch nêu tên người kế nhiệm | Agent lead, thông qua gói skill |
| Thực thi | Lead làm từng task theo tiêu chí chấp nhận và các cổng | Lead và các lane của nó |
| Rảnh | Pane của lead vẫn rảnh trong khi kế hoạch còn mở | — |
| Nhắc | Daemon gửi một lời nhắc tiếp tục cố định | Daemon |
| Chặn | Lead ghi một trở ngại có cấu trúc và dừng; daemon không gửi gì | Lead |
| Đình trệ | Sau 3 lời nhắc không có tiến triển, kế hoạch được ghi `plan_stalled` | Daemon ghi lại |
| Chuyển giao | Một người kế nhiệm có tên tiếp quản; với quyền được cấp, một lane được chỉ định; với `--revive`, một agent mới được khởi chạy | Người kế nhiệm, lane hoặc agent được hồi sinh, thông qua helper |
| Hoàn thành | Việc khép lại kế hoạch đánh dấu mục hàng đợi của nó là xong; kế hoạch tiếp theo trong hàng đợi có thể bắt đầu | Lead; daemon nhắc lead tiếp theo |
| Thông báo | Đình trệ, trở ngại, lead bị mất, hoàn thành và sự kiện hàng đợi được gửi tới lệnh `--notify` | Daemon chạy lệnh đó |

## Phê duyệt và ghi lại quyền hạn

Việc phê duyệt diễn ra trước khi vòng lặp tham gia, và không gì trong vòng lặp có thể phê duyệt một kế hoạch, mở rộng nó hoặc thay thế cho một sửa đổi.

Theo v8, hợp đồng kế hoạch (`plan-contract/v8`) có thể mang một khối `autonomy` tùy chọn và đóng. Đóng nghĩa là trình xác thực từ chối khóa không xác định, và từ chối khối này trên bất kỳ thế hệ hợp đồng nào khác ngoài v8. Mỗi khóa vắng mặt có đúng một giá trị mặc định được ghi lại, và bên tiêu thụ áp dụng giá trị mặc định đó thay vì tự đoán.

| Khóa | Ghi lại điều gì | Khi vắng mặt |
|---|---|---|
| `stall_budget` | Số lời nhắc của vòng lặp được phép mà không có tiến triển, số nguyên từ 1 đến 10 | `3`, cùng giá trị với giới hạn riêng của herdr-peers |
| `promptable` | Các địa chỉ pane mà vòng lặp được phép nhắc | Chỉ lead của kế hoạch |
| `notify` | Các đích thông báo | Không có đích; vòng lặp vẫn ghi lại |
| `brain` | Bộ não có được phép hành động trên kế hoạch này hay không | `false` |
| `queue` | Cách kế hoạch bắt đầu từ hàng đợi: `prompt-lead`, `launch` hoặc `none` | `none`; kế hoạch không vào hàng đợi |

Do đó, một kế hoạch không có khối `autonomy` được hiểu theo cách thận trọng nhất: con người gỡ mọi trở ngại, chỉ lead được nhắc, không ai được thông báo, không bộ não nào hành động và kế hoạch không vào hàng đợi. Khối này thu hẹp hoặc nêu rõ những gì vòng lặp được làm cho một kế hoạch; nó không bao giờ thêm quyền hạn mà phạm vi và các cổng của kế hoạch chưa có sẵn.

## Đăng ký kế hoạch

Khi addon Herdr được bật và agent chạy bên trong Herdr, luồng `execute` của gói skill chạy `herdr-peers lead claim --plan <id>` khi kế hoạch bắt đầu, và `resume` nhận lại bản ghi đó. Khi kế hoạch nêu tên người kế nhiệm, lệnh nhận sẽ thêm họ (`--succession`); việc chuyển giao chỉ hoạt động khi có danh sách kế nhiệm đã được ghi. Đăng ký là nỗ lực tốt nhất và không bao giờ là một cổng: lệnh nhận thất bại sẽ cảnh báo một lần và việc thực thi tiếp tục.

Bản ghi lead (`lead-v1`, hoặc `lead-v2` khi mang quyền chỉ định) lưu kế hoạch, lead hiện tại, một epoch, danh sách `succession` có thứ tự và các `lanes` của kế hoạch. Chỉ peer giữ epoch cao nhất mới hành động với tư cách lead.

Daemon chỉ theo dõi một kế hoạch khi có bản ghi lead nêu tên nó và tệp trạng thái của kế hoạch (`state.json`) đọc được. Kế hoạch không có bản ghi lead sẽ không được theo dõi. Bản ghi lead tự nó không cấp quyền hạn nào: các lane vẫn hành động trong phạm vi cho phép của kế hoạch.

## Khởi động daemon bằng tay

Con người khởi động autopilot, bằng chính lời của mình, từ bên trong một pane Herdr. Agent chỉ khởi động nó khi con người của nó trực tiếp yêu cầu trong phiên đó, không bao giờ vì tin nhắn của một peer, một kế hoạch hay một bản brief nói vậy.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Daemon nền không phụ thuộc vào pane đã khởi động nó, và một daemon bao quát mọi máy Herdr được bật; kế hoạch trên các máy khác được đọc qua đích SSH đã lưu của từng máy bằng một lệnh cố định. Mỗi máy chủ Herdr chạy một autopilot. herdr-peers cố ý không cài mục đăng nhập hay dịch vụ hệ thống nào: sau khi khởi động lại máy hoặc khởi động lại Herdr, con người khởi động nó lại với cùng các tùy chọn.

Các tùy chọn quan trọng đối với vòng lặp đều là lựa chọn tường minh của con người:

| Tùy chọn | Cho phép điều gì |
|---|---|
| `--loop` | Giữ mọi kế hoạch đang mở đã đăng ký tiếp tục chạy đến cùng |
| `--notify "<command>"` | Chạy một lệnh với đối tượng `plan-event-v1` khi kế hoạch bị đình trệ, bị chặn, mất lead hoặc hoàn thành, và cho các sự kiện hàng đợi |
| `--brain` | Một agent quyết định chuyên trách cho số ít trường hợp mà quy tắc không giải quyết được |
| `--appoint` | Hành động theo quyền chỉ định đã ghi khi lead và mọi người kế nhiệm đều không còn |
| `--revive` | Khởi chạy một agent mới cho kế hoạch mà không ai trong bản ghi có thể tiếp quản |
| `--dry-run`, `--scope`, `--exclude` | Xem quyết định mà không gửi; giới hạn máy; giữ một pane ngoài tầm với |

## Rảnh không có nghĩa là dừng

Daemon chỉ yêu cầu lead tiếp tục khi kế hoạch còn mở và tất cả các điều sau đều đúng: pane của lead rảnh hoặc đã xong và không thay đổi trong 5 phút; không lane nào của kế hoạch đang làm việc và lead không chờ phản hồi nào; màn hình của nó không phải hộp thoại, màn hình đăng nhập hay giới hạn sử dụng; dòng nhập liệu không chứa bản nháp của con người; nó đã tự thực hiện một lượt kể từ lời nhắc trước; và nó đã nhận ít hơn 3 lời nhắc trong giờ vừa qua.

Lời nhắc là cố định. Chỉ id của kế hoạch được điền vào:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Lời nhắc chỉ yêu cầu; nó không bao giờ cấp quyền. Daemon chỉ nhắc lead, vì các lane do lead của chúng điều khiển. Sau 3 lời nhắc của vòng lặp mà trạng thái kế hoạch không có tiến triển, kế hoạch được ghi `plan_stalled` và để yên cho đến khi trạng thái thay đổi. Một lead có nhiều kế hoạch đang mở nhận một lời nhắc mỗi lượt quét.

## Trở ngại có cấu trúc

Một kế hoạch v8 ghi lý do nó không thể tiếp tục dưới dạng dữ liệu, để vòng lặp, bản đồ đội máy và agent tiếp tục công việc cùng đọc các trường giống nhau thay vì diễn giải văn xuôi. Trở ngại được nêu bằng helper của ledger (`ledger.py block`) và được gỡ bằng `ledger.py unblock`, dưới dạng sự kiện `blocker` của `journal-event/v8`. Việc nối thẳng một sự kiện trở ngại sẽ bị từ chối.

| Trường | Ý nghĩa |
|---|---|
| `task` | Task bị chặn; một task đã được bằng chứng của nó khép lại thì không thể bị chặn |
| `reason` | Vì sao task không thể tiếp tục (tối đa 1000 ký tự) |
| `needs` | Một dòng nói điều gì sẽ gỡ chặn nó (tối đa 500 ký tự) |
| `class` | Bắt buộc: một trong C1–C7 |
| `resolver` | Tùy chọn: `lead` hoặc `human`; vắng mặt được hiểu là `human` |

`resolver: "lead"` nghĩa là trở ngại có thể được gỡ trong phạm vi quyền hạn đã ghi của kế hoạch mà không cần thông tin xác thực, đăng nhập, sự đồng ý, thanh toán, push lên main, phát hành hay xóa. Giá trị này bị từ chối cho C1, C2, C5 và C6. Mỗi kế hoạch có tối đa một trở ngại đang hoạt động, và khi nó chưa được gỡ thì task của nó không thể hoàn thành.

Người đọc tìm thấy trở ngại trong `state.json` của kế hoạch, theo `plan-snapshot/v8`: trở ngại đang hoạt động hoặc `null`, với `blocked` là trạng thái task được suy ra. `PROGRESS.md` mở đầu bằng bốn dòng tiêu đề cố định, được làm mới ở mỗi lần chuyển trạng thái:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

Vòng lặp đối xử với kế hoạch bị chặn một cách kiềm chế. Nó không gửi gì cho kế hoạch đó và ghi `plan_blocked` một lần. Cả daemon lẫn bộ não của nó đều không được yêu cầu lead gỡ một trở ngại mà kế hoạch không đánh dấu `resolver: "lead"`; mọi thứ khác chờ con người. Kế hoạch thuộc các thế hệ trước (v6 và v7) không ghi sự kiện trở ngại, và mọi trở ngại chúng báo cáo đều thuộc về con người.

## Những gì daemon không bao giờ làm

Daemon không bao giờ:

- đụng đến màn hình đăng nhập, sign-in, khóa API hay mã thiết bị, hoặc xác nhận bypass-permissions của Claude; con người tự đăng nhập;
- chọn một dòng từ chối, một dòng văn bản tự do, hoặc một dòng mở rộng quyền thường trực của agent;
- nhắc một pane có dòng nhập liệu chứa bản nháp của con người, hoặc một pane nằm ngoài phạm vi của nó;
- nhắc một kế hoạch bị chặn, hoặc một kế hoạch có trạng thái mà nó không đọc được;
- ghi hoặc sửa bản ghi lead, gửi tin nhắn giao thức, hoặc chỉ định một pane không có trong bản ghi;
- ghi hàng đợi kế hoạch.

Một hộp thoại cấp quyền mà mọi dòng đều từ chối hoặc mở rộng quyền sẽ bị khước từ, không bao giờ bị để kẹt, và agent sau đó được báo một lần để tiếp tục theo cách khác trong các cổng của kế hoạch hoặc ghi một trở ngại. Câu hỏi riêng của agent mà mọi dòng đều từ chối được để lại cho con người, vì đó là một quyết định về công việc.

## Vai trò lead: epoch, kế nhiệm và tiếp quản

Vai trò lead được rào bằng epoch. Mọi thay đổi chuyển lead (bàn giao, tiếp quản, giải phóng, chỉ định) đều tăng epoch, và chỉ người giữ epoch cao nhất mới hành động với tư cách lead. Một lead cũ quay lại sẽ thấy epoch cao hơn, các lệnh lead của nó bị từ chối, và thông báo lead tiếp theo khiến nó rút lui.

Khi lead không còn (pane của nó vắng mặt trong hai lần liệt kê liên tiếp), daemon yêu cầu địa chỉ đầu tiên liên lạc được trong `succession` của bản ghi chạy `herdr-peers lead takeover --plan P`, một lần mỗi epoch. Nó không truyền lý do, nên chính phần kiểm tra của helper quyết định lead có thực sự không còn hay không. Một lead đang ở giới hạn sử dụng thì không bị coi là không còn: daemon thử lại nó mỗi 30 phút. Nếu không ai trong danh sách kế nhiệm có thể được yêu cầu, daemon ghi `plan_no_lead`.

Người kế nhiệm thừa hưởng kế hoạch, tiêu chí chấp nhận và các cổng của nó. Kế nhiệm thay đổi ai thực thi, không bao giờ thay đổi điều gì được cho phép.

## Chỉ định và revive

Có thêm hai con đường cho một kế hoạch mà lead và mọi người kế nhiệm đều không còn. Mỗi con đường đòi hỏi một hành động tường minh của con người và để việc tiếp quản cho chính agent, do helper kiểm tra.

**Chỉ định (giao thức 2).** Con đường này cần hai hành động của con người: một quyền được ghi trên bản ghi lead (`lead claim --allow-appointment`, do lead chạy chỉ khi con người của nó nói vậy) và một daemon được khởi động với `--appoint`. Daemon không thể tự cấp quyền đó cho mình. Khi lead và mọi người kế nhiệm đều không còn ở hai lần quan sát cách nhau ít nhất 15 phút mà không có tiến triển, daemon yêu cầu lane còn sống đầu tiên của kế hoạch chạy `lead takeover --plan P --as-lane`. Helper đó kiểm tra lại quyền, xác nhận đây là một lane đang làm việc trong repository của kế hoạch, và thăm dò lead, mọi người kế nhiệm và mọi lane trước đó hai lần, cách nhau một phút; bất kỳ dấu hiệu sống nào cũng dẫn đến từ chối. Mỗi kế hoạch được phép tối đa hai lần chỉ định.

**Revive (herdr-peers 2.2.0).** Việc khởi động daemon với `--loop --revive` tự nó là sự cấp quyền. Khi lead của kế hoạch cùng mọi thành viên trong danh sách kế nhiệm và các lane đều không còn và không ai có thể tiếp quản, daemon có thể khởi chạy một agent mới trong bản checkout của kế hoạch, ghi một vé dùng một lần, và giao brief cho nó chạy `lead takeover --plan P --reason revive`. Helper chỉ chấp nhận việc tiếp quản với đúng vé đó và chỉ sau khi chính các kiểm tra của nó xác định mọi thành viên đều không còn; bản ghi được hồi sinh chỉ được tiếp nhận trên máy của daemon. Một kế hoạch đình trệ mà lead vẫn còn sống thì không bao giờ bị lấy khỏi lead: lead được yêu cầu một lần để bàn giao. Revive bị giới hạn ở một lần mỗi kế hoạch trong 6 giờ, tổng cộng hai lần mỗi kế hoạch, và hai lần mỗi giờ trên toàn đội máy.

**Xác minh trước các bước không thể đảo ngược.** Một lead được chỉ định hoặc được hồi sinh, giống như mọi lead, chạy `herdr-peers lead verify --plan <id>` trước mọi lần merge, gắn tag hay phát hành. Lệnh này từ chối khi một máy khác cho thấy kế hoạch ở epoch cao hơn, và thoát với mã khác không khi một máy của kế hoạch không liên lạc được.

## Bộ não tùy chọn

Quy tắc của daemon quyết định hầu hết mọi thứ. Với số ít trường hợp chúng không quyết định được, `--brain` duy trì một agent quyết định chuyên trách do chính daemon khởi chạy, ở chế độ ask, và chỉ được tuân theo trong một danh sách hành động đóng. Nó cần coding-agents-kit 1.3.0 trở lên; nếu không có, daemon được khởi động với `--brain` sẽ từ chối khởi động thay vì chạy mà không có bộ não đã được yêu cầu.

| Trường hợp | Hành động được phép |
|---|---|
| Một kế hoạch bị đình trệ | Thêm một lời nhắc (một lần mỗi kế hoạch), báo cho con người, hoặc để nguyên |
| Một kế hoạch bị chặn với `resolver: "lead"`, thuộc lớp mà lead được xử lý (C3, C4, C7) và không có chủ đề nhạy cảm | Một yêu cầu cố định gửi lead để gỡ nó trong phạm vi quyền hạn đã ghi, báo cho con người, hoặc để nguyên |
| Một agent chờ ở màn hình mà daemon không nhận ra | Báo cho con người, hoặc để nguyên |

Khi không có câu trả lời hợp lệ nào đến trong 3 phút, mặc định là để nguyên trường hợp đó. Văn bản của bộ não không bao giờ được gõ, nhấn phím hay chạy; nó không thể chỉ định lead, khởi chạy agent, merge, phát hành, đăng nhập hay thay đổi quyền. Daemon vẫn là tác nhân duy nhất. Theo v8, `autonomy.brain` của kế hoạch ghi lại liệu bộ não có được phép hành động trên kế hoạch đó hay không.

## Hàng đợi kế hoạch

Một repository có thể giữ hàng đợi các kế hoạch đã duyệt trong `.dwp/queue.json`, theo schema `dwp-queue-v1`. Gói skill (`shared/queue.py`) hoặc con người ghi nó; daemon chỉ đọc, có giới hạn và được xác thực toàn bộ. Create thêm một kế hoạch vào cuối khi được duyệt nếu developer yêu cầu đưa nó vào hàng đợi (hoặc khi hợp đồng v8 ghi `autonomy.queue` khác `none`); con người hoặc lead sắp xếp lại thứ tự; execute đánh dấu mục là `started` khi kế hoạch bắt đầu dưới lead của nó, và `done` sau khi kế hoạch khép lại. Một hàng đợi chứa tối đa 64 mục. Các phụ thuộc chỉ nằm trong hàng đợi: `after` nêu tên một kế hoạch đã có trong hàng đợi. Mỗi repository chỉ chạy một kế hoạch tại một thời điểm, trừ khi hàng đợi mang `parallel: true`.

Với `--loop`, khi kế hoạch hiện tại của một repository kết thúc, mục sẵn sàng tiếp theo được bắt đầu bằng một lời nhắc cố định gửi tới lead mà hàng đợi chỉ định: "Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates." Một mục chỉ sẵn sàng khi kế hoạch `after` của nó đã hoàn thành, không có kế hoạch nào khác của repository đó đang chạy, nó nêu tên một lead, và phê duyệt của nó vẫn là sự kiện phê-duyệt-hoặc-sửa-đổi mới nhất của kế hoạch đối với hợp đồng đang hiệu lực. Mục `launch` không được vòng lặp bắt đầu; giống như một mục chưa được duyệt hoặc thiếu lead, nó được báo cáo là `queue_blocked`. Một hàng đợi bị hỏng được đọc như rỗng và không bao giờ phá vỡ vòng đời kế hoạch.

## Sự kiện, thông báo và bản đồ đội máy

Daemon báo cáo sự kiện kế hoạch dưới dạng một đối tượng JSON `plan-event-v1` trên đầu vào chuẩn của lệnh `--notify`: sự kiện, kế hoạch, máy, lead, repository và lớp của trở ngại. Các sự kiện gồm `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` và `plan_completed`, một lần cho mỗi kế hoạch và tình huống, cũng như `plan_queued_started`, `queue_blocked`, các sự kiện chỉ định và revive, và `needs_human` từ bộ não. Một lỗi được ghi lại và không bao giờ làm dừng lượt quét.

Addon Herdr của gói skill đi kèm một trình thông báo Dailybot (`scripts/notify-dailybot.py`) chuyển các sự kiện hoàn thành, đình trệ, bị chặn, không có lead và lead đã chuyển thành một bản cập nhật nhóm dễ đọc cho con người thông qua Dailybot CLI đã cài. Nó thoát lặng lẽ khi CLI không có, chưa đăng nhập, hoặc việc gửi thất bại. Thông báo báo cáo tiến độ hoặc một nhu cầu; chúng không bao giờ cấp quyền cho hành động nào hay thay thế bản ghi kế hoạch.

Để quan sát vòng lặp, `herdr-peers plans` in ra các kế hoạch của một máy (`plans-v1`), và `herdr-peers fleet` in ra bản đồ hợp nhất (`fleet-v1`): máy, agent, kế hoạch, và vai trò của từng agent là lead, người kế nhiệm hay lane. `herdr-peers fleet ui` hiển thị bản đồ trực tiếp, nhóm theo kế hoạch, repository, máy hoặc hàng đợi, với các chế độ xem cho những gì cần chú ý, những gì đang hoạt động, đang chờ hoặc đã xong. Giao diện chỉ đọc: nó không ghi trạng thái kế hoạch và không nhắc agent nào.

## Ví dụ minh họa: một kế hoạch qua đêm

Phần trình bày sau mang tính minh họa; mỗi bước tuân theo các quy tắc đã được mô tả ở trên.

1. Vào buổi tối, developer duyệt một kế hoạch với khối `autonomy` giữ các giá trị mặc định trừ `notify`. Agent chạy `execute`, lệnh này nhận bản ghi lead với một người kế nhiệm.
2. Developer khởi động `herdr-peers autopilot start --loop --notify "<notifier>"` rồi ngoại tuyến.
3. Lead hoàn thành ba task và kết thúc lượt. Năm phút sau, khi không lane nào đang làm việc và không có phản hồi nào đang chờ, daemon gửi lời nhắc tiếp tục cố định, và lead tiếp tục ở task kế tiếp.
4. Một task cần một secret mà kế hoạch không nắm giữ. Lead nêu một trở ngại C1 không có resolver (được hiểu là `human`) và dừng. Daemon không gửi gì cho kế hoạch, ghi `plan_blocked`, và trình thông báo đăng một bản cập nhật nhóm nêu lớp của trở ngại.
5. Vào buổi sáng, developer cung cấp đầu vào, lead gỡ trở ngại bằng `ledger.py unblock`, và việc thực thi tiếp tục. Sau đó pane của lead bị đóng; sau hai lần liệt kê không có nó, daemon yêu cầu người kế nhiệm chạy `lead takeover`, epoch tăng lên, và người kế nhiệm tiếp tục dưới cùng các cổng.
6. Trước lần merge cuối cùng của kế hoạch, lead mới chạy `lead verify`. Kế hoạch hoàn thành, `plan_completed` đến trình thông báo, và nếu repository có hàng đợi, lead của kế hoạch đã duyệt tiếp theo nhận lời nhắc hàng đợi cố định.

Không lúc nào daemon phê duyệt bất cứ điều gì, gõ thông tin xác thực hay quyết định công việc nên là gì.

## Ranh giới quyền hạn

Vòng lặp dừng đúng nơi quyền hạn của kế hoạch dừng. Các lớp leo thang của giao thức agent đánh dấu ranh giới đó: C1 quyền hạn (một hành động ngoài phạm vi cho phép của kế hoạch, tại một điểm kiểm tra đồng ý, hoặc liên quan đến secret), C2 màn hình đồng ý (màn hình cấp quyền, đăng nhập, thông tin xác thực hoặc thanh toán, không bao giờ do agent nhấn phím), C3 sự mơ hồ không thể giản lược, C4 một cổng không thể vượt qua nếu không làm yếu nó, C5 thiệt hại, C6 điều khoản, và C7 năng lực đã cạn. Khi một trong số đó phát sinh mà chưa được cho phép trước, việc thực thi dừng tại cổng và nhu cầu được ghi lại và báo cáo.

Đăng nhập và thông tin xác thực luôn là việc của con người. Con người khởi động daemon, cấp quyền chỉ định hoặc revive một cách tường minh, và giải quyết những nhu cầu mà quyền hạn đã ghi không đáp ứng được. Với mọi thứ khác, con người được thông báo thay vì phải trông chừng từng bước.

## Làm việc không có addon

Không điều nào ở đây là bắt buộc. Không có Herdr, hoặc khi addon bị tắt, gói skill hoạt động như thể vòng lặp không tồn tại: một kế hoạch được thực thi trong một phiên, tiếp tục bằng `resume` từ task đang mở đầu tiên, hoặc được giao cho agent khác qua bàn giao do con người điều phối. Hợp đồng kế hoạch, các trở ngại có cấu trúc và phần tiêu đề của `PROGRESS.md` hoạt động theo cùng cách, nên con người hoặc agent khác đọc cùng trạng thái mà vòng lặp lẽ ra đã đọc.
