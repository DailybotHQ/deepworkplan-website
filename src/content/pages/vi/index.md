---
title: "Deep Work Plan — thực thi có cấu trúc cho các agent lập trình AI"
description: "Ngữ cảnh quan trọng hơn mô hình. Deep Work Plan biến mọi repository thành một môi trường có cấu trúc nơi mọi agent lập trình hoàn thành công việc dài hơi."
lastUpdated: 2026-09-10
---

## Mô hình quan trọng. Ngữ cảnh còn quan trọng hơn.

Deep Work Plan biến mọi repository thành một môi trường có cấu trúc — ngữ cảnh, rào chắn và một kế hoạch bền vững — nơi bất kỳ agent lập trình nào cũng thực thi chính xác và hiệu quả, và hoàn thành công việc dài hơi.

Deep Work Plan (DWP) là một phương pháp luận và bộ kit mở, cấp phép MIT, để lập kế hoạch và thực thi công việc phần mềm phức tạp cùng các agent AI. Bạn không phải chọn một cách cài đặt hay sao chép một mẫu — bạn sao chép prompt init.md và dán vào agent của mình:

> Sao chép prompt init.md và dán vào agent lập trình của bạn — Claude Code, Cursor, Codex, hoặc bất kỳ agent nào khác — để biến mọi repository thành AI-first.

> Deep Work Plan là phát triển dựa trên đặc tả, nơi chính repository trở thành harness.

- [Mở lời nhắc /init](/init)
- [Đọc phương pháp luận](/methodology)

---

## Vấn đề và lời giải

Trong những đợt ngắn, agent lập trình rất ấn tượng. Giao cho nó một nhiệm vụ dài hơi — một bản di chuyển, một phân hệ mới, một bản refactor hàng chục tệp — nó sẽ trôi dạt: ngữ cảnh đầy lên, các quyết định trước đó phai nhạt và hàng giờ công việc dở dang giữa chừng.

Deep Work Plan trả lời bằng phát triển theo đặc tả: một kế hoạch bền vững, các tác vụ nguyên tử và cổng kiểm chứng agent buộc phải qua. Công việc vẫn được kiểm chứng — và bất kỳ agent nào cũng có thể tiếp tục qua các phiên.

Và vì ngữ cảnh là tài nguyên khan hiếm nhất của agent, harness được thiết kế cho hiệu suất token: hướng dẫn tải tiến tiến, kiểm chứng chỉ chạm vào phần thay đổi và mỗi tác vụ học tại chỗ — công việc dài hơi vẫn khả thi. Bản thân kế hoạch cũng mở rộng theo cùng nguyên tắc: một kế hoạch Lite cho một bản sửa lỗi có giới hạn, một kế hoạch Full cho công việc kéo dài hàng giờ — định dạng luôn đi theo phạm vi công việc, chứ không phải ngược lại.
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

## Bạn nhận được gì

- AGENTS.md tại gốc repository, được suy luận từ stack và các lệnh thực tế của bạn.
- `docs/` được phân loại và tài liệu cho từng mô-đun.
- Một thư mục `.agents/` (skill, agent, command) cùng symlink `.claude` tới `.agents`.
- Skill Deep Work Plan, cài một lần cho mọi agent — gồm cả sub-skill author, để repository có thể nuôi lớn skill, agent và command của riêng nó, cùng các addon tự nguyện như dependency-upgrade và addon design-system cho bất kỳ bề mặt giao diện hướng tới người dùng nào.
- Các kế hoạch dài hơi, tiếp tục được, trong một thư mục `.dwp/` được gitignore.

---

## Điều gì xảy ra khi bạn chạy nó

1. **Agent của bạn mở [/init.md](/init.md)** — nó đọc lời nhắc khởi tạo cùng phương pháp luận, đặc tả và bộ kit mà nó liên kết tới.
2. **Nó cài skill Deep Work Plan** — động cơ, giống hệt nhau trong mọi repository: bộ định tuyến cùng các sub-skill của nó (create, execute, refine, resume, status, verify, onboard, author), cho Claude Code, Cursor, Codex, Gemini và Copilot.
3. **Nó thích ứng repository của bạn** — suy luận về stack thực của bạn (không bao giờ sao chép-dán), nó viết AGENTS.md, `docs/`, các README cho từng mô-đun, một bộ kit `.agents/` được suy luận, và một `.dwp/` được gitignore. Repository của bạn trở thành harness.
4. **Bạn lập kế hoạch và thực thi** — các Deep Work Plan dài hơi, chạy từng bước dựa trên tiêu chí chấp nhận rõ ràng và các cổng kiểm chứng, một cách tự chủ trong nhiều giờ.

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
