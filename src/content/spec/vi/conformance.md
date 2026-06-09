---
title: Tuân thủ
description: "Định nghĩa quy phạm về một repository tuân thủ DWP, AI-first: các thành phần nó PHẢI và NÊN có, điều gì làm một kế hoạch chỉnh dạng, và cách kiểm chứng nó."
order: 6
lang: vi
section: Conformance
---

# Tuân thủ

**Phiên bản 1.1. Trạng thái: Ổn định.** Tài liệu này định nghĩa thế nào là một repository *tuân thủ Deep Work Plan* — tức là AI-first và điều khiển được bằng agent. Các từ khóa MUST, MUST NOT, SHOULD, SHOULD NOT và MAY được diễn giải như mô tả trong RFC 2119.

Sự tuân thủ tồn tại để "AI-first" là một đặc tính khách quan, kiểm tra được thay vì một ấn tượng. Một repository hoặc đạt các tiêu chí dưới đây hoặc không. [Sub-skill `verify`](/kit) (`/dwp-verify`) kiểm tra chúng một cách máy móc.

## Một repository tuân thủ

Một repository tuân thủ DWP PHẢI thỏa mãn tất cả những điều sau. Mọi thành phần PHẢI được **suy luận cho repository** — thích ứng với các ngôn ngữ, framework và lệnh thực tế của nó. Một bản mẫu chung chung, một chỗ trống, hay nội dung sao chép từ một repository khác không thỏa mãn một tiêu chí.

1. **`AGENTS.md` tại gốc.** Repository PHẢI chứa một `AGENTS.md` tại gốc bao gồm (a) một chỉ mục tài liệu, (b) các quy tắc bắt buộc cho repository, và (c) một khối Quick Commands với các lệnh **thật và chạy được** trong repository này. Các lệnh chỗ trống (ví dụ, `npm test` trong một repository không dùng npm) KHÔNG ĐƯỢC xuất hiện.
2. **`CLAUDE.md` phân giải tới `AGENTS.md`.** Một `CLAUDE.md` PHẢI tồn tại và phân giải tới `AGENTS.md` (một symlink, hoặc một thứ tương đương bảo đảm một nguồn chân lý duy nhất). Cả hai KHÔNG ĐƯỢC lệch nhau.
3. **Một hệ thống `docs/`.** Repository PHẢI chứa một thư mục `docs/` bao quát các hạng mục chuẩn (kiến trúc, chuẩn mực, kiểm thử, lệnh phát triển, bảo mật và khởi tạo agent) với nội dung thật, riêng cho repository. Các mô-đun phức tạp NÊN mang `README.md` của riêng chúng. Hướng dẫn kiểm thử PHẢI định nghĩa một bộ công cụ test, lint và kiểm tra kiểu thực — hoặc, đối với một repository không có, một thiết lập cụ thể được **đề xuất** từ ngăn xếp công nghệ trong quá trình khởi tạo. Một hướng dẫn kiểm thử rỗng hay "không có test" không thỏa mãn tiêu chí này: không có một cách xác định để kiểm chứng hành vi, một kế hoạch không có cổng kiểm chứng khách quan nào.
4. **Một thư mục `.agents/`.** Repository PHẢI chứa một thư mục `.agents/` với `agents/`, `commands/` và `skills/`, cùng một catalog dưới `.agents/docs/` **khớp với những gì có trên đĩa**. Các command `dwp-*` PHẢI là các bộ ủy thác mỏng tới skill đã cài. Một đường dẫn `.claude` PHẢI phân giải tới `.agents`.
5. **Một không gian làm việc `.dwp/` được gitignore.** Repository PHẢI chứa một thư mục `.dwp/` với `plans/` và `drafts/`, và `.dwp/` PHẢI được gitignore. Một không gian nháp `tmp/` NÊN tồn tại và NÊN được gitignore.
6. **Skill phương pháp luận phân giải được.** Skill Deep Work Plan PHẢI được cài hoặc tham chiếu sao cho một agent trong repository có thể gọi các sub-skill của nó.

Một repository **hoàn toàn tuân thủ với không cần addon nào**. Các addon (devcontainer, Dailybot, dependency-upgrade, design-system) là tự nguyện và KHÔNG ĐƯỢC bắt buộc để tuân thủ.

## Một kế hoạch chỉnh dạng

Một Deep Work Plan trong `.dwp/plans/` là chỉnh dạng khi:

1. Mỗi tác vụ PHẢI khai báo một **phạm vi** rõ ràng, **tiêu chí chấp nhận**, và ít nhất một **cổng kiểm chứng** (một lệnh hay bước kiểm tra đạt hoặc không đạt một cách khách quan).
2. Mỗi tác vụ thêm chức năng lõi mới hoặc thay đổi hành vi sản phẩm PHẢI bao gồm độ phủ test tự động cho hành vi đó trong tiêu chí chấp nhận của nó, và PHẢI chạy các test của repository cùng với các bước kiểm tra lint và kiểm tra kiểu trong cổng kiểm chứng của nó — chứ không phải chỉ riêng bước build. Các test hiện có PHẢI tiếp tục xanh; một thay đổi hành vi PHẢI cập nhật một test mà nó làm hỏng thay vì xóa hay bỏ qua nó. Các tác vụ thuần tài liệu, cấu hình hay nghiên cứu được miễn việc tạo test nhưng vẫn chạy cổng của repository.
3. Kế hoạch PHẢI lưu giữ tiến độ để công việc vượt qua gián đoạn và có thể được tiếp tục bởi một agent khác.
4. Kế hoạch PHẢI bao gồm hai tác vụ cuối bắt buộc — Skills & Agents Discovery và Executive Report.
5. Các tác vụ NÊN neo lại vào mục tiêu của kế hoạch trước khi thực thi, để ngăn trôi dạt qua một chân trời dài.

## Kiểm chứng sự tuân thủ

Sự tuân thủ NÊN được kiểm chứng một cách máy móc thay vì bằng việc xem xét thủ công. Chạy `/dwp-verify` tạo một báo cáo đạt/không đạt so với các tiêu chí trên: sự hiện diện và nội dung thật của `AGENTS.md`, sự phân giải của `CLAUDE.md`, các hạng mục `docs/`, sự khớp giữa catalog `.agents/` và đĩa, trạng thái gitignore của `.dwp/` và `tmp/`, và — đối với một kế hoạch — rằng mỗi tác vụ mang tiêu chí chấp nhận và một cổng kiểm chứng, cùng độ phủ test cho các tác vụ thay đổi hành vi.

Một repository NÊN được kiểm chứng lại sau khi khởi tạo và sau mỗi kế hoạch hoàn tất, để sự tuân thủ được duy trì thay vì chỉ được tuyên bố một lần.
