---
title: "Case study: chính website này"
description: "Cách deepworkplan.com tự vận hành trên Deep Work Plan — một tường thuật thực về một repository Astro production được biến thành AI-first bằng chính phương pháp luận nó ghi lại."
kind: example
lang: vi
order: 2
---

# Case study: chính website này

Site mà bạn đang đọc vận hành trên chính phương pháp luận nó ghi lại. Nó dogfood Deep Work Plan: cùng một skill, cùng luồng `/init`, cùng các kế hoạch `.dwp/` mà bất kỳ repository nào khác cũng sẽ dùng. Đây là một tường thuật thực, không phải giả định.

## Trước đây

Như hầu hết các repository, repo này không được xây cho agent. Bối cảnh nằm trong đầu mọi người và những ghi chú rải rác, không có một nguồn chân lý duy nhất nào để agent đọc, và việc onboard một agent mới đồng nghĩa phải giải thích lại dự án mỗi phiên. Công việc dài hơi cứ trôi dạt.

## Áp dụng DWP

Repository được biến thành AI-first bằng một Deep Work Plan duy nhất, được phân rã thành các tác vụ nguyên tử với các validation gate:

1. Cài đặt skill Deep Work Plan dưới dạng reference install, được ghim bởi `skills-lock.json`.
2. Chạy onboarding để sinh ra một `AGENTS.md` đã suy luận, cây `docs/`, và tài liệu cho từng module từ stack thực của repository.
3. Xây bộ kit `.agents/` đa-agent — các bộ ủy nhiệm lệnh `dwp-*` gọn nhẹ và một catalog khớp với những gì có trên ổ đĩa.
4. Dựng khung không gian làm việc `.dwp/` được gitignore cho kế hoạch và bản nháp.
5. Kiểm chứng sự tuân thủ bằng `/dwp-verify`.

Mỗi tác vụ được kiểm chứng với các gate thực của repository — `biome`, `astro:check`, bộ test, bản build production, và kiểm tra tương đương của agent-endpoint — trước khi được đánh dấu hoàn thành.

## Sau đó

Repository giờ đây là AI-first theo đúng đặc tả của chính nó: một `AGENTS.md` đã suy luận, một cây `docs/` được phân loại, một bộ kit `.agents/` đa-agent, và một không gian làm việc `.dwp/` được gitignore. Bất kỳ agent nào — Claude Code, Cursor, Codex, Gemini, Copilot — đều có thể mở nó ra, đọc harness, và thực thi các kế hoạch dài hơi mà không cần dìu dắt từng phiên.

## Kết quả

Phương pháp luận tự chứng minh trên chính mã nguồn của nó: site này được xây và bảo trì theo đúng cách nó bảo bạn xây của mình — bằng cách làm theo [`/init.md`](/init.md). Nếu tiêu chuẩn này hoạt động ở đây, trong môi trường production, thì nó cũng hoạt động cho repository của bạn.
