---
title: "Deep Work Plan so với các phương án khác — Deep Work Plan"
description: "Deep Work Plan so với các công cụ theo đặc tả, framework quy trình agent và chế độ lập kế hoạch sẵn có: theo thuật ngữ từng bên, kèm nguồn và ngày rà soát."
lastUpdated: 2026-09-10
---

## Deep Work Plan và các phương án khác

Chọn đúng tầng cho hoàn cảnh của bạn. Mỗi phương án được mô tả theo đúng thuật ngữ của chính nó, mọi dữ kiện đều truy về được tài liệu chính thức, và trang nêu rõ ngày được rà soát lần cuối. Đây là một bản đồ, không phải một bảng xếp hạng.

## Cách đọc trang này

Ba giá trị mô tả mỗi khả năng. Chúng nói một khả năng nằm ở đâu trong một công cụ, chứ không nói công cụ tốt đến đâu.

- **Tích hợp sẵn**
- **Tùy chọn hoặc qua tiện ích mở rộng**
- **Ngoài phạm vi**

Rà soát lần cuối: 2026-09-10

## Các phương án khác, theo cách riêng của từng bên

### Công cụ phát triển theo đặc tả

**GitHub Spec Kit** — Biến một tính năng thành đặc tả thực thi được thông qua một bản hiến chương, một đặc tả, một kế hoạch và một danh sách tác vụ, điều khiển bằng các lệnh slash tích hợp với hơn năm mươi agent lập trình. Các nhóm muốn một quy trình đặc tả, lập kế hoạch, phân tác vụ và triển khai có thể lặp lại ngay trong agent họ đã dùng. [Trang chính thức](https://github.com/github/spec-kit)

**OpenSpec** — Ghi lại mỗi thay đổi thành một đề xuất với các đặc tả delta (thêm, sửa, bỏ) và các yêu cầu RFC 2119 kèm kịch bản, rồi lưu trữ chúng thành các đặc tả sống. Các nhóm làm trên hệ thống hiện có, muốn đặc tả lớn dần theo từng thay đổi. [Trang chính thức](https://openspec.dev)

**Amazon Kiro** — Một IDE và CLI dạng agentic với đặc tả đi từ yêu cầu kiểu EARS sang thiết kế rồi sang tác vụ, cùng các tệp steering và hook chạy theo sự kiện của trình soạn thảo. Các nhà phát triển muốn phát triển theo đặc tả được tích hợp sẵn trong trình soạn thảo, cùng công cụ được AWS hỗ trợ. [Trang chính thức](https://kiro.dev)

### Các framework quy trình agent

**BMAD Method** — Một framework agile gồm các vai trò agent chuyên biệt (phân tích, sản phẩm, kiến trúc, phát triển, chất lượng), tạo ra các bản tóm tắt, yêu cầu, tài liệu kiến trúc và tệp story. Các nhóm thích các nghi thức theo vai trò và muốn một vòng đời agile đầy đủ cho công việc của agent. [Trang chính thức](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Một thư viện skill và quy trình làm việc để thảo luận ý tưởng, lập kế hoạch theo các bước nhỏ test trước, thực thi với subagent và review trước khi hoàn tất. Các nhà phát triển muốn thực thi theo hướng test-driven có kỷ luật ngay trong agent lập trình của mình. [Trang chính thức](https://github.com/obra/superpowers)

**Get Shit Done** — Một hệ thống lập kế hoạch với thư mục .planning, id yêu cầu, kế hoạch theo pha, thực thi trong ngữ cảnh mới và một lượt xác minh đối chiếu các điều kiện bắt buộc đã nêu. Nhà phát triển độc lập và nhóm nhỏ muốn kỹ thuật ngữ cảnh và xác minh với ít nghi thức. [Trang chính thức](https://github.com/open-gsd/gsd-core)

### Chế độ lập kế hoạch có sẵn từ nhà cung cấp

**Chế độ lập kế hoạch có sẵn từ nhà cung cấp** — Claude Code, Codex, Cursor và Gemini CLI tích hợp sẵn các chế độ lập kế hoạch, tệp hướng dẫn và skill tuân theo các chuẩn AGENTS.md và Agent Skills. Bất kỳ ai muốn lập kế hoạch ngay trong một agent duy nhất mà không cần áp dụng một phương pháp luận. [Trang chính thức](https://agents.md)

## Ma trận khả năng

Mỗi khả năng nằm ở đâu, theo từng công cụ. Tích hợp sẵn, tùy chọn hoặc qua tiện ích mở rộng, hoặc ngoài phạm vi. Được rà soát theo tài liệu chính thức.

| Khả năng | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Chế độ lập kế hoạch có sẵn từ nhà cung cấp |
|---|---|---|---|---|---|---|---|---|
| Hoạt động với mọi agent lập trình | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Ngoài phạm vi | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Ngoài phạm vi |
| Ghi harness của agent vào repository | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng |
| Tiêu chí chấp nhận cho từng tác vụ | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Cổng kiểm chứng cho từng tác vụ | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng |
| Trạng thái có thể tiếp tục trên đĩa | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Lượt rà kết thúc bắt buộc kèm bước rà soát bảo mật | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng |
| Công cụ kiểm tra tính tuân thủ có thể thực thi | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng |
| Phép đo tải hướng dẫn được công bố | Tích hợp sẵn | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi |
| Onboarding dựng khung tài liệu | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Đặc tả sống cho hệ thống hiện có | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi |

## Deep Work Plan mang lại điều gì

- **Độc lập với công cụ và gắn với repository.** Harness và kế hoạch là các tệp trong repository của bạn, được mọi agent tuân theo chuẩn AGENTS.md và Agent Skills đọc. Đổi agent không làm mất kế hoạch.
- **Kiểm chứng được chọn từ những gì từng tác vụ chạm tới.** Mỗi tác vụ khai báo Touched Surface của mình và chạy các test của hành vi bị thay đổi cùng các bên tiêu thụ nó, mở rộng ra toàn bộ bộ test khi ảnh hưởng không thể giới hạn. Không chọn được test nào thì không bao giờ coi là đạt.
- **Một Final Review duy nhất kèm bước rà soát bảo mật.** Kế hoạch khép lại bằng bước rà soát bảo mật trên tập thay đổi tích lũy, gồm cả lượt review diff cục bộ bắt buộc, và kiểm chứng trạng thái cuối. Các phát hiện nghiêm trọng chặn việc hoàn tất.
- **Trạng thái sống sót qua các phiên và các agent.** Các ô đánh dấu README, nhật ký tác vụ, một chỉ mục làm việc có giới hạn và một tệp trạng thái đọc được bằng máy được ghi tại mỗi ranh giới, nên một phiên khác hay một agent khác tiếp tục ngay từ đĩa. Ngay cả một kế hoạch đang tạo bị gián đoạn cũng khôi phục được.
- **Công cụ kiểm tra tính tuân thủ cho chính repository.** Một script chỉ đọc xác minh harness và mọi kế hoạch theo đặc tả, hiểu cả hai vòng đời kế hoạch và thoát với mã thân thiện CI.
- **Khối lượng hướng dẫn tải lên được đo và công bố.** Một script được commit đo mỗi luồng tải bao nhiêu byte; kết quả, kể cả mức tăng, được công bố theo byte, không bao giờ theo phần trăm token hay chi phí.

## Những giới hạn thành thật

Deep Work Plan không có cơ chế đặc tả sống hay đặc tả delta; OpenSpec và các công cụ tương tự mạnh hơn ở khoản đó. Chưa có benchmark độc lập nào cho phương pháp luận; một đợt đánh giá công khai đăng ký trước đang được lên kế hoạch. Sổ cái tải hướng dẫn đo byte được tải, không đo token, chi phí hay kết quả.

## Giúp chúng tôi giữ trang này chính xác

Trang này được rà soát vào ngày hiển thị và sửa theo yêu cầu. Nếu mô tả về công cụ của bạn đã lỗi thời hoặc chưa đầy đủ, hãy mở một issue và chúng tôi sẽ sửa.

[Mở một issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Nguồn

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
