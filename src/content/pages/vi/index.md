---
title: "Deep Work Plan — thực thi có cấu trúc cho các agent lập trình AI"
description: "Đặc tả trước, vòng lặp khép kín: Deep Work Plan biến kho mã thành harness cho agent lập trình AI; mỗi kế hoạch chạy xong trong vòng lặp do người khởi động."
lastUpdated: 2026-11-17
---

*Đặc tả trước · vòng lặp khép kín*

## Mọi tác tử AI đều làm xong việc trong kho mã của bạn.

Kho mã giữ kế hoạch, ngữ cảnh và các bước kiểm tra, nên công việc vượt qua các lần khởi động lại, chuyển giữa các tác tử và tiếp tục lặp cho đến khi mọi cổng kiểm tra đều đạt — trong phạm vi quyền hạn bạn cấp.

Deep Work Plan (DWP) là một phương pháp luận và bộ kit mở, cấp phép MIT, để lập kế hoạch và thực thi công việc phần mềm phức tạp cùng các agent AI. Bạn không phải chọn một cách cài đặt hay sao chép một mẫu — bạn sao chép prompt init.md và dán vào agent của mình:

> Sao chép prompt init.md và dán vào agent lập trình của bạn — Claude Code, Cursor, Codex, hoặc bất kỳ agent nào khác — để biến mọi repository thành AI-first.


- [Mở lời nhắc /init](/vi/quickstart)
- [Đọc phương pháp luận](/methodology)

---

## Nền tảng của phương pháp luận.

1. **Đặc tả trước** — kế hoạch là nguồn sự thật bền vững: các tác vụ nguyên tử, tiêu chí chấp nhận và cổng kiểm chứng mà agent buộc phải qua.
2. **Repository là harness** — ngữ cảnh, công cụ, rào chắn và trạng thái nằm trong repository dưới dạng tệp thuần mà mọi agent đều đọc được.

3. **Loop engineering** — Kế hoạch chạy đến cùng: đăng ký, một daemon do con người khởi động, lời nhắc không thêm quyền hạn, chuyển giao dự phòng và sự kiện kế hoạch.
4. **Hiệu quả đo được** — số byte chỉ dẫn cho mỗi luồng, được đo và công bố cùng phương pháp — không bao giờ là tỷ lệ phần trăm token bịa ra.

---

## Vấn đề và lời giải

Trong những đợt ngắn, agent lập trình rất ấn tượng. Giao cho nó một nhiệm vụ dài hơi — một bản di chuyển, một phân hệ mới, một bản refactor hàng chục tệp — nó sẽ trôi dạt: ngữ cảnh đầy lên, các quyết định trước đó phai nhạt và hàng giờ công việc dở dang giữa chừng.



Ngữ cảnh là tài nguyên khan hiếm nhất của agent, vì vậy harness giữ phần hướng dẫn của chính nó gọn nhẹ và dễ kiểm tra. Hướng dẫn được tải dần, bước xác thực tập trung vào phần đã thay đổi, và mỗi tác vụ nhận đúng ngữ cảnh liên quan. Chúng tôi công bố dung lượng hướng dẫn của từng luồng bằng byte để phần tải này luôn minh bạch. Kế hoạch cũng tùy theo công việc: Lite cho một sửa đổi có phạm vi rõ ràng, Full cho công việc kéo dài nhiều giờ. Định dạng theo sát phạm vi công việc, giúp quy trình tập trung và dễ theo dõi.

---

## Con người cầm lái. Agent thực thi.

Bạn quyết định “xong” nghĩa là gì và ranh giới ở đâu. Kế hoạch mang theo ý định của bạn; các agent làm phần giờ giấc — không cần trông chừng, không cần sửa mỗi hai mươi phút.

- Bạn: ý định, tiêu chí nghiệm thu, đánh giá
- Agent: thực thi, từng nhiệm vụ một
- Kế hoạch: hợp đồng giữa hai bên

[Đọc phương pháp luận](/vi/methodology)

---

## Một kế hoạch mà các tác tử không thể lệch khỏi.

Tác vụ dài làm đầy ngữ cảnh của bất kỳ mô hình nào. Chi tiết rơi rụng và agent trôi dạt. Một kế hoạch viết ra — tác vụ nguyên tử, cổng kiểm chứng, trạng thái có thể tiếp tục — chính là nơi nó quay về, vòng này qua vòng khác.

1. Kế hoạch
2. Tác vụ nguyên tử
3. Cổng xác minh
4. Hoàn thành
5. Trạng thái có thể tiếp tục

[Xem vòng lặp lõi](/vi/methodology)

---

## Hoàn thành là một hợp đồng, không phải một cảm giác.

Mỗi tác vụ nêu rõ tiêu chí chấp nhận và các bước kiểm tra bắt buộc phải qua. Agent không được “cảm thấy đã xong” — phải qua kiểm tra, nếu không task vẫn mở.

- Các kiểm thử vượt qua
- Các kiểu được kiểm tra
- Tiêu chí nghiệm thu được đáp ứng
- Hoặc nhiệm vụ vẫn mở

[Đọc đặc tả](/vi/spec)

---

## Kho lưu trữ chính là harness.

Ngữ cảnh, công cụ, rào chắn và trạng thái nằm trong repository của bạn dưới dạng tệp thuần mà bất kỳ agent nào cũng đọc được. Không khóa chặt, không bộ não bên ngoài — sống sót qua mọi lần đặt lại ngữ cảnh.

- Bản đặc tả bền vững trên đĩa
- Cổng kiểm chứng, không phải cảm tính
- Sống sót qua việc đặt lại ngữ cảnh

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Xem onboarding tạo ra gì](/vi/quickstart)

---

## Kế hoạch chạy đến cùng. Quyền hạn vẫn thuộc về con người.

Loop engineering giúp kế hoạch hoàn tất mà không cần con người liên tục kiểm tra. Các hàng dưới đây mô tả những hợp đồng đã phát hành của vòng lặp: phần lớn thuộc herdr-peers, còn hàng đợi kế hoạch là hợp đồng của pack. Herdr là tùy chọn; phương pháp vẫn hoạt động khi không có nó.

> Đặc tả trước cho biết làm gì; harness cho biết ở đâu; Loop engineering cho biết công việc kết thúc thế nào.

**Vòng lặp:** Đăng ký (`lead claim`, lead và thứ tự kế nhiệm) → Daemon (`autopilot --loop`, do con người khởi động) → Nhắc (`idle ≥ 5 min`, không thêm quyền hạn) → Chuyển giao (`lead takeover`, người kế nhiệm đầu tiên liên lạc được) → Thông báo (`plan-event-v1`, tới lệnh của con người) → Xong (`plan_completed`, đã qua các cổng). Mọi kế hoạch mở có bản ghi lead, cho đến khi chính trạng thái của nó báo đã xong.



| Hợp đồng | Điều nó bảo đảm | Nguồn (herdr-peers v2.2.1) |
| --- | --- | --- |
| Đăng ký kế hoạch (`herdr-peers lead claim`) | Một kế hoạch mà vòng lặp theo dõi có bản ghi lead với một epoch và thứ tự kế nhiệm. Chỉ bên giữ epoch cao nhất mới hành động với vai trò lead của nó. | `skills/herdr-peers/protocol.md` §12 |
| Chỉ con người khởi động (`herdr-peers autopilot start --loop`) | Chỉ con người khởi động daemon, bằng chính lời của mình. Không yêu cầu, phản hồi hay thông báo nào có thể khởi động, dừng hoặc thay đổi việc nó làm. | `skills/herdr-peers/autopilot.md` §1 |
| Lời nhắc không thêm quyền hạn (`plan_stalled`) | Lead đang rảnh của một kế hoạch mở nhận một lời nhắc cố định để tiếp tục. Các cổng, điều kiện dừng và cơ chế leo thang vẫn ràng buộc như trước; ba lời nhắc không có tiến triển sẽ đánh dấu kế hoạch là bị đình trệ. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Chuyển giao cho người kế nhiệm (`herdr-peers lead takeover`) | Khi lead không còn, người kế nhiệm đầu tiên liên lạc được sẽ được yêu cầu tiếp quản, và trình trợ giúp kiểm tra lại bằng chứng. Một lane chỉ nhận vai trò lead theo quyền mà con người đã ghi nhận từ trước. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Sự kiện kế hoạch (`plan-event-v1`) | Khi một kế hoạch bị đình trệ, bị chặn, mất lead, bắt đầu từ hàng đợi hoặc hoàn thành, một lệnh do con người chọn sẽ nhận một đối tượng plan-event-v1. Gói skill kèm sẵn một trình thông báo Dailybot cho việc này. | `docs/schema/plan-event-v1.json` |
| Bản đồ đội máy (`plans-v1` · `fleet-v1`) | Mỗi máy báo cáo các kế hoạch của mình dưới dạng plans-v1; daemon duy trì bản đồ fleet-v1 của mọi máy, agent, repository và kế hoạch, và fleet ui hiển thị nó ở chế độ chỉ đọc. | `docs/schema/fleet-v1.json` |
| Hàng đợi kế hoạch (`dwp-queue-v1`) | Pack xác thực và ghi hàng đợi; daemon đọc hàng đợi để tiếp tục các kế hoạch đang chờ. | `skills/deepworkplan/shared/queue.py` |
| Xác minh lead (`herdr-peers lead verify`) | Trước mọi lần merge, gắn tag hay phát hành, lead xác nhận rằng nó vẫn giữ kế hoạch trên mọi máy. Một lead mới hơn sẽ từ chối; một máy không liên lạc được sẽ dừng thao tác trừ khi rủi ro đó được chấp nhận và ghi nhận. | `skills/herdr-peers/protocol.md` §12 |

Bộ não quyết định (`--brain`) và việc chỉ định lead (`--appoint`) là các cờ tùy chọn của cùng một daemon, mỗi cờ do con người bật. Daemon không bao giờ merge, phát hành, đăng nhập hay thay đổi quyền truy cập.

[Đọc về addon Herdr](/vi/kit/herdr)

---

## Số byte chỉ dẫn cho mỗi luồng, đã được đo.

Harness công bố những gì mỗi luồng phải đọc trước khi bắt đầu: bộ định tuyến, sub-skill và các tài nguyên dùng chung mà nó liên kết. Đây là các tập đọc bắt buộc của gói đã phát hành.

| Luồng | Gói đầu vào (byte) |
| --- | ---: |
| `create` | 74.974|
| `execute` | 55.136|
| `resume` | 32.023|
| `refine` | 77.014|
| `onboard` | 82.051|
| `status` | 27.311|
| `verify` | 36.701|

Đơn vị: byte hệ thống tệp. Đo trên gói đã phát hành bằng lệnh bên dưới: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.3).

Token của nhà cung cấp, chi phí và thống kê khép vòng lặp không được hiển thị: chưa có nguồn gắn tag nào đo chúng, nên chúng không có hàng. Con số token bằng byte ÷ 4 của script là ước tính có ghi nhãn, không bao giờ là phép đo.

[Đọc sổ đánh giá](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.3/docs/EVALUATION.md)

---

## Bạn nhận được gì

- AGENTS.md tại gốc repository, được suy luận từ stack và các lệnh thực tế của bạn.
- `docs/` được phân loại và tài liệu cho từng mô-đun.
- Một thư mục `.agents/` (skill, agent, command) cùng symlink `.claude` tới `.agents`.
- Skill Deep Work Plan, cài một lần cho mọi agent — gồm cả sub-skill author, để repository có thể nuôi lớn skill, agent và command của riêng nó, cùng các addon tự nguyện như dependency-upgrade và addon design-system cho bất kỳ bề mặt giao diện hướng tới người dùng nào.
- Các kế hoạch dài hơi, tiếp tục được, trong một thư mục `.dwp/` được gitignore. Bản thân phương pháp luận không cần daemon, không cần trạng thái ngoài; daemon vòng lặp tùy chọn bổ sung tính liên tục, không bao giờ là một phụ thuộc.
- Ủy quyền đa tác tử và Hệ sinh thái 1.0 — điều phối an toàn các tác tử song song trên worktree git biệt lập, kiểm chứng qua cổng và tiện ích bổ sung hệ sinh thái.

---

## Điều gì xảy ra khi bạn chạy nó

1. **Agent của bạn mở [/init.md](/init.md)** — nó đọc lời nhắc khởi tạo cùng phương pháp luận, đặc tả và bộ kit mà nó liên kết tới.
2. **Nó cài skill Deep Work Plan** — động cơ, giống hệt nhau trong mọi repository: bộ định tuyến cùng các sub-skill của nó (create, execute, refine, resume, status, verify, onboard, author, upgrade), cho Claude Code, Cursor, Codex, Gemini và Copilot.
3. **Nó thích ứng repository của bạn** — suy luận về stack thực của bạn (không bao giờ sao chép-dán), nó viết AGENTS.md, `docs/`, các README cho từng mô-đun, một bộ kit `.agents/` được suy luận, và một `.dwp/` được gitignore. Repository của bạn trở thành harness.
4. **Bạn lập kế hoạch và thực thi** — các Deep Work Plan dài hơi, chạy từng bước dựa trên tiêu chí chấp nhận rõ ràng và các cổng kiểm chứng, một cách tự chủ trong nhiều giờ.
5. **Con người khởi động vòng lặp** — tùy chọn, với addon Herdr: bạn — không bao giờ là agent — chạy `herdr-peers autopilot start --loop`. Mọi kế hoạch mở có bản ghi lead sẽ tiếp tục chạy đến cùng, và trình thông báo của bạn được báo khi một kế hoạch bị đình trệ, bị chặn hoặc hoàn thành.

Skill là động cơ tái sử dụng, được cài theo cùng một cách ở mọi nơi; thứ được thích ứng là repository của bạn. Cơ chế cài đặt (Skills CLI, OpenClaw, hay git clone) nằm trong lời nhắc [/init.md](/init.md) và trên trang [bắt đầu nhanh](/quickstart).

---

## Phương pháp luận, đặc tả và bộ kit

- [Đọc phương pháp luận](/methodology) — DWP là gì, các nguyên tắc, quy trình, và cách áp dụng nó.
- [Đọc đặc tả](/spec) — cấu trúc tác vụ, các cổng kiểm chứng, giao thức hoàn tất, các kiểu hình và addon.
- [Khám phá bộ kit](/kit) — preset, bộ chuyển đổi và command để cài DWP vào một repository.
- [Xem ví dụ](/examples) — các bài hướng dẫn trước-và-sau của công việc kỹ thuật thực.

---

## Đội ngũ xây dựng

Deep Work Plan ra đời từ công việc kỹ thuật thực tế tại [Dailybot](https://www.dailybot.com) và được duy trì bởi Dailybot cùng cộng đồng mã nguồn mở.

- [Về phương pháp luận](/about)
- [Cộng đồng và liên hệ](/contact)
- [Repository GitHub](https://github.com/DailybotHQ/deepworkplan-website)
