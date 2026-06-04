---
title: "Về phương pháp luận"
description: "Deep Work Plan là một phương pháp luận mở, độc lập với framework, cho công việc kỹ thuật nghiêm túc cùng các agent lập trình AI. Nguồn gốc và đội ngũ duy trì."
lastUpdated: 2026-05-30
---

## Nó là gì

Deep Work Plan (DWP) là một phương pháp luận, không phải một sản phẩm. Nó định nghĩa cách biến một mục tiêu thành một kế hoạch được thống nhất, phân rã kế hoạch đó thành các tác vụ nguyên tử và kiểm chứng được một cách độc lập, rồi chạy mỗi tác vụ trong một vòng lặp tập trung kết thúc bằng một bước kiểm tra.

Đây là một phương pháp luận dựa trên đặc tả: kế hoạch là nguồn chân lý bền vững, và các agent thực thi dựa trên tiêu chí chấp nhận rõ ràng cùng các cổng kiểm chứng. Khác với các hệ thống dựa trên đặc tả bị ràng buộc vào công cụ như GitHub Spec Kit, Amazon Kiro hay Tessl, DWP độc lập với công cụ và thuần repo. Nó cũng là kỹ thuật harness được làm cho dễ mang theo — ngữ cảnh, hàng rào bảo vệ và trạng thái có thể tiếp tục giúp một agent đáng tin cậy được cài vào chính repository (AGENTS.md, docs, ngôi nhà skill `.agents/`, skill DWP), nên mọi agent đều có thể điều khiển mọi repo.

Nó cố ý không phụ thuộc vào agent AI hay stack nào bạn dùng — các bộ chuyển đổi dịch cùng một vòng lặp lõi sang Claude, Cursor, Copilot, Codex, Gemini và nhiều hơn nữa. Kế hoạch, các tác vụ và nhật ký chạy đều là Markdown thuần, nên công việc luôn dễ đọc, dễ rà soát và được quản lý phiên bản.

---

## Các nguyên tắc cốt lõi

- **Lập kế hoạch trước khi thực thi** — Không viết dòng mã nào cho tới khi kế hoạch được thống nhất. Kế hoạch là một hợp đồng giữa bạn và agent. [Đọc phương pháp luận](/methodology)
- **Tác vụ mang tính nguyên tử** — Mỗi tác vụ được giới hạn phạm vi sao cho nó có thể được thực thi và kiểm chứng độc lập, rồi commit một cách nguyên tử. [Xem đặc tả](/spec)
- **Kiểm chứng mọi thứ** — Mỗi tác vụ kết thúc bằng một bước kiểm tra rõ ràng trước khi tác vụ kế tiếp bắt đầu, với tiến độ được ghi lại trong git. [Khám phá bộ kit](/kit)

---

## Tổng quan nhanh

- Phương pháp luận mở, cấp phép MIT
- Độc lập với framework và agent
- Được duy trì bởi Dailybot và cộng đồng
- Bao gồm một đặc tả, các command, bộ chuyển đổi, preset và ví dụ
- Chỉ dùng Markdown — không runtime, không khóa chặt
- Biến mọi repository thành một codebase AI-first, điều khiển được bằng agent

---

## Đội ngũ duy trì

Deep Work Plan ra đời từ công việc kỹ thuật thực tế tại [Dailybot](https://www.dailybot.com) và giờ được duy trì bởi Dailybot cùng cộng đồng mã nguồn mở. Phương pháp luận, đặc tả và bộ kit được phát hành theo giấy phép MIT — tự do sử dụng, thích ứng và xây dựng tiếp.

- [Đọc phương pháp luận](/methodology)
- [Bắt đầu nhanh](/quickstart)
- [Repository GitHub](https://github.com/DailybotHQ/deepworkplan-website)
