---
title: "Deep Work Plan — thực thi có cấu trúc cho các agent lập trình AI"
description: "Ngữ cảnh quan trọng hơn mô hình. Deep Work Plan biến mọi repository thành một môi trường có cấu trúc nơi mọi agent lập trình hoàn thành công việc dài hơi."
lastUpdated: 2026-06-03
---

## Mô hình quan trọng. Ngữ cảnh còn quan trọng hơn.

Deep Work Plan biến mọi repository thành một môi trường có cấu trúc — ngữ cảnh, hàng rào bảo vệ và một kế hoạch bền vững — nơi mọi agent lập trình thực thi với độ chính xác cao và hoàn thành công việc dài hơi.

Deep Work Plan (DWP) là một phương pháp luận và bộ kit mở, cấp phép MIT, để lập kế hoạch và thực thi công việc phần mềm phức tạp cùng các agent AI. Bạn không phải chọn một cách cài đặt hay sao chép một mẫu — bạn sao chép prompt init.md và dán vào agent của mình:

> Sao chép prompt init.md và dán vào agent lập trình của bạn — Claude Code, Cursor, Codex, hoặc bất kỳ agent nào khác — để biến mọi repository thành AI-first.

> Deep Work Plan là phát triển dựa trên đặc tả, nơi chính repository trở thành harness.

- [Mở lời nhắc /init](/init)
- [Đọc phương pháp luận](/methodology)

---

## Vấn đề và lời giải

Các agent lập trình AI cực kỳ hiệu quả trong những đợt ngắn. Với công việc dài hơi — một cuộc di trú, một hệ thống con mới, một đợt tái cấu trúc trải khắp hàng chục tệp — chúng trôi dạt: ngữ cảnh đầy lên, các quyết định bị quên đi, và những tác vụ kéo dài nhiều giờ bị bỏ dở giữa chừng.

Deep Work Plan đáp lại bằng **phát triển dựa trên đặc tả**: kế hoạch là nguồn chân lý bền vững, và các agent thực thi dựa trên tiêu chí chấp nhận rõ ràng cùng các cổng kiểm chứng. Sự trôi dạt giảm xuống, công việc luôn kiểm chứng được, và mọi agent đều có thể tiếp tục nó qua các phiên. Khác với các công cụ dựa trên đặc tả bị ràng buộc vào một IDE hay nhà cung cấp (GitHub Spec Kit, Amazon Kiro, Tessl), DWP độc lập với công cụ và thuần repo.

Nó cũng là **kỹ thuật harness** được làm cho dễ mang theo. Một harness agent là khung giàn bao quanh một mô hình — ngữ cảnh, công cụ, vòng điều khiển, hàng rào bảo vệ, trạng thái có thể tiếp tục — thứ khiến nó đáng tin cậy. Deep Work Plan cài harness đó vào chính repository, nên mọi agent đều có thể điều khiển mọi repo.

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
