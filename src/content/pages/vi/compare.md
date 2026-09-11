---
title: "Deep Work Plan so với các phương án khác"
description: "Deep Work Plan so với các công cụ theo đặc tả, framework quy trình agent và chế độ lập kế hoạch sẵn có: theo thuật ngữ từng bên, kèm nguồn và ngày rà soát."
lastUpdated: 2026-09-11
---

## Deep Work Plan và các phương án khác

Chọn đúng tầng cho hoàn cảnh của bạn. Mỗi phương án được mô tả theo đúng thuật ngữ của chính nó, mọi dữ kiện đều truy về được tài liệu chính thức, và trang nêu rõ ngày được rà soát lần cuối. Đây là một bản đồ, không phải một bảng xếp hạng.

## Cách đọc trang này

Ba giá trị mô tả mỗi khả năng. Chúng nói một khả năng nằm ở đâu trong một công cụ, chứ không nói công cụ tốt đến đâu.

- **Tích hợp sẵn**
- **Tùy chọn hoặc qua tiện ích mở rộng**
- **Ngoài phạm vi**

Rà soát lần cuối: 2026-09-11

## Các phương án khác, theo cách riêng của từng bên

### Công cụ phát triển theo đặc tả

**GitHub Spec Kit** — Biến một tính năng thành đặc tả thực thi được thông qua một bản hiến chương, một đặc tả, một kế hoạch và một danh sách tác vụ, điều khiển bằng các lệnh slash tích hợp với hơn năm mươi agent lập trình, và có thể kiểm tra xem các artifact có nhất quán với nhau hay không trước khi bắt đầu triển khai. Các nhóm muốn một quy trình đặc tả, lập kế hoạch, phân tác vụ và triển khai có thể lặp lại ngay trong agent họ đã dùng. [Trang chính thức](https://github.com/github/spec-kit)

**OpenSpec** — Ghi lại mỗi thay đổi thành một đề xuất với các đặc tả delta (thêm, sửa, bỏ) và các yêu cầu RFC 2119 kèm kịch bản, rồi lưu trữ chúng thành các đặc tả sống, cùng một trình xác thực kiểm tra tính đầy đủ của đề xuất và độ bao phủ kịch bản trước khi một thay đổi được chấp nhận. Các nhóm làm trên hệ thống hiện có, muốn đặc tả lớn dần theo từng thay đổi. [Trang chính thức](https://openspec.dev)

**Amazon Kiro** — Một IDE và CLI dạng agentic với đặc tả đi từ yêu cầu kiểu EARS sang thiết kế rồi sang tác vụ, cùng các tệp steering và hook chạy theo sự kiện của trình soạn thảo, và có thể tạo đặc tả cho một codebase hiện có để phát hiện lỗ hổng yêu cầu trước khi bắt đầu thiết kế. Các nhà phát triển muốn phát triển theo đặc tả được tích hợp sẵn trong trình soạn thảo, cùng công cụ được AWS hỗ trợ. [Trang chính thức](https://kiro.dev)

### Các framework quy trình agent

**BMAD Method** — Một framework agile gồm các vai trò agent chuyên biệt (phân tích, sản phẩm, kiến trúc, phát triển, chất lượng), tạo ra các bản tóm tắt, yêu cầu, tài liệu kiến trúc và tệp story, với một Definition of Done yêu cầu mỗi story phải được một thành viên trong nhóm hoặc một AI đánh giá ngang hàng xem xét trước khi được coi là hoàn tất. Các nhóm thích các nghi thức theo vai trò và muốn một vòng đời agile đầy đủ cho công việc của agent. [Trang chính thức](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Một thư viện skill và quy trình làm việc để thảo luận ý tưởng, lập kế hoạch theo các bước nhỏ test trước, thực thi với subagent và review trước khi hoàn tất, tích hợp với nhiều nền tảng agent lập trình hơn bất kỳ lựa chọn thay thế nào khác ở đây, cộng thêm một lượt review hai giai đoạn bằng subagent (trước tiên là tuân thủ đặc tả, sau đó là chất lượng mã) cho mỗi tác vụ. Các nhà phát triển muốn thực thi theo hướng test-driven có kỷ luật ngay trong agent lập trình của mình. [Trang chính thức](https://github.com/obra/superpowers)

**GSD Core** — Một hệ thống lập kế hoạch với thư mục .planning, id yêu cầu, kế hoạch theo pha, thực thi trong ngữ cảnh mới và một lượt xác minh đối chiếu với các kết quả bàn giao mà người dùng có thể quan sát được, trích xuất từ bản tóm tắt của mỗi kế hoạch — được thiết kế riêng để chống lại tình trạng “context rot” bằng cách chạy nghiên cứu, lập kế hoạch và thực thi trong các subagent dùng một lần, đồng thời phát hiện xác minh đã lỗi thời bằng kiểm tra dấu vân tay nội dung. Nhà phát triển độc lập và nhóm nhỏ muốn kỹ thuật ngữ cảnh và xác minh với ít nghi thức. [Trang chính thức](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Cấu hình các coding agent mà bạn đã dùng với bộ nhớ bền vững có định tuyến cả giữa các phiên và các mô hình, các skill được tuyển chọn, các máy chủ MCP, các persona, và tùy chọn Spec-Driven Development hoặc Receipt-Driven Development. Theo mặc định, cấu hình được ghi vào cài đặt agent toàn cục của bạn; việc cài đặt giới hạn trong phạm vi workspace là tùy chọn (opt-in). Các nhà phát triển muốn một hệ sinh thái agent đã được cấu hình, ghi nhớ công việc qua các phiên và có thể tạo ra bằng chứng theo yêu cầu. [Trang chính thức](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**AI-native SDLC của Claude** — Một vòng lặp sáu giai đoạn từ Plan và Design qua Build, Test, Deploy và Maintain, với một cổng phê duyệt của con người ở mỗi giai đoạn, các artifact bền vững được commit vào repository giữa các giai đoạn, một lượt review được gắn nhãn bảo mật riêng trước khi deploy, và các đánh giá liên tục (evals) công bố các chỉ số bàn giao dẫn trước và trễ. Các nhóm đang đánh giá playbook chuyển giao phần mềm toàn trình của Claude Code và vòng phản hồi từ production của nó. [Trang chính thức](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Chế độ lập kế hoạch có sẵn từ nhà cung cấp

**Chế độ lập kế hoạch có sẵn từ nhà cung cấp** — Claude Code, Codex, Cursor và Gemini CLI tích hợp sẵn các chế độ lập kế hoạch, tệp hướng dẫn và skill được xây dựng trên các chuẩn mở, đa nhà cung cấp AGENTS.md và Agent Skills, dù hành vi chính xác của chế độ lập kế hoạch vẫn phụ thuộc vào nhà cung cấp, client và phiên bản. Agent Skills nói riêng chỉ tải một bản tóm tắt ngắn khi khởi động và tải đầy đủ hướng dẫn khi được kích hoạt, giữ cho năng lực chưa dùng đến không chiếm ngữ cảnh. Bất kỳ ai muốn lập kế hoạch ngay trong một agent duy nhất mà không cần áp dụng một phương pháp luận. [Trang chính thức](https://agents.md)

## Ma trận khả năng

Mỗi khả năng nằm ở đâu, theo từng công cụ. Tích hợp sẵn, tùy chọn hoặc qua tiện ích mở rộng, hoặc ngoài phạm vi. Được rà soát theo tài liệu chính thức.

| Khả năng | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | AI-native SDLC của Claude | Chế độ lập kế hoạch có sẵn từ nhà cung cấp |
|---|---|---|---|---|---|---|---|---|---|---|
| Hoạt động với mọi agent lập trình | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Ngoài phạm vi | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Ngoài phạm vi | Ngoài phạm vi |
| Ghi harness của agent vào repository | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Tiêu chí chấp nhận cho từng tác vụ | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Cổng kiểm chứng cho từng tác vụ | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng |
| Trạng thái có thể tiếp tục trên đĩa | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Lượt rà kết thúc bắt buộc kèm bước rà soát bảo mật | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Công cụ kiểm tra tính tuân thủ có thể thực thi | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng |
| Phép đo tải hướng dẫn được công bố | Tích hợp sẵn | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi |
| Onboarding dựng khung tài liệu | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tích hợp sẵn | Ngoài phạm vi | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng |
| Đặc tả sống cho hệ thống hiện có | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tích hợp sẵn | Tích hợp sẵn | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi |
| Bộ nhớ tác nhân liên tục giữa các dự án | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Tích hợp sẵn | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng |
| Các vai trò tác nhân chuyên biệt riêng biệt | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Tích hợp sẵn | Ngoài phạm vi | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng | Ngoài phạm vi | Ngoài phạm vi |
| Là một IDE hoặc trình soạn thảo riêng | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Tích hợp sẵn | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Ngoài phạm vi | Tùy chọn hoặc qua tiện ích mở rộng |

## Deep Work Plan mang lại điều gì

- **Độc lập với công cụ và gắn với repository.** Harness và kế hoạch là các tệp trong repository của bạn, được mọi agent tuân theo chuẩn AGENTS.md và Agent Skills đọc. Đổi agent không làm mất kế hoạch.
- **Kiểm chứng được chọn từ những gì từng tác vụ chạm tới.** Mỗi tác vụ khai báo Touched Surface của mình và chạy các test của hành vi bị thay đổi cùng các bên tiêu thụ nó, mở rộng ra toàn bộ bộ test khi ảnh hưởng không thể giới hạn. Không chọn được test nào thì không bao giờ coi là đạt.
- **Một Final Review duy nhất kèm bước rà soát bảo mật.** Kế hoạch khép lại bằng bước rà soát bảo mật trên tập thay đổi tích lũy, gồm cả lượt review diff cục bộ bắt buộc, và kiểm chứng trạng thái cuối. Các phát hiện nghiêm trọng chặn việc hoàn tất.
- **Trạng thái sống sót qua các phiên và các agent.** Các ô đánh dấu README, nhật ký tác vụ, một chỉ mục làm việc có giới hạn và một tệp trạng thái đọc được bằng máy được ghi tại mỗi ranh giới, nên một phiên khác hay một agent khác tiếp tục ngay từ đĩa. Ngay cả một kế hoạch đang tạo bị gián đoạn cũng khôi phục được.
- **Công cụ kiểm tra tính tuân thủ cho chính repository.** Một script chỉ đọc xác minh harness và mọi kế hoạch theo đặc tả, hiểu cả hai vòng đời kế hoạch và thoát với mã thân thiện CI.
- **Khối lượng hướng dẫn tải lên được đo và công bố.** Một script được commit đo mỗi luồng tải bao nhiêu byte; kết quả, kể cả mức tăng, được công bố theo byte, không bao giờ theo phần trăm token hay chi phí.

## Những giới hạn thành thật

Deep Work Plan không có cơ chế đặc tả sống hay đặc tả delta; OpenSpec và các công cụ tương tự mạnh hơn ở khoản đó. Chưa có benchmark độc lập nào cho phương pháp luận; một đợt đánh giá công khai đăng ký trước đang được lên kế hoạch. Sổ cái tải hướng dẫn đo byte được tải, không đo token, chi phí hay kết quả. DWP cố tình giới hạn phạm vi ở kho mã: đây không phải là hệ thống bộ nhớ liên dự án, không phải khung tác nhân theo vai trò, và cũng không phải một IDE, nên nó cũng không cạnh tranh trên những khía cạnh đó — hãy kết hợp với một công cụ đáp ứng khía cạnh đó khi công việc thực sự cần.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- AI-native SDLC của Claude — https://claude.com/blog/the-ai-native-sdlc-playbook
- Chế độ lập kế hoạch có sẵn từ nhà cung cấp — https://agentskills.io
