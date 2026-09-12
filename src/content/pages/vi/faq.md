---
title: "Câu hỏi thường gặp — Deep Work Plan"
description: "Câu trả lời cho các câu hỏi về Deep Work Plan: nó làm gì, cổng kiểm chứng và tiếp tục sau gián đoạn thế nào, so sánh với công cụ khác, và cách áp dụng."
lastUpdated: 2026-09-12
---

## Câu hỏi thường gặp

Những câu trả lời ngắn cho các câu hỏi được hỏi nhiều nhất về Deep Work Plan, mỗi câu kèm liên kết đến trang đi sâu hơn.

## Deep Work Plan là gì

### Deep Work Plan thực sự làm gì?

Deep Work Plan biến một repository thành một môi trường có cấu trúc, nơi agent lập trình có thể thực thi công việc dài hơi một cách đáng tin cậy. Nó cài đặt dưới dạng một agent skill, onboard repository một lần (một chỉ mục `AGENTS.md`, một cây `docs/`, một bộ kit `.agents/` gồm skill và lệnh, một vùng xuất `.dwp/` được gitignore), và từ đó mọi mục tiêu trở thành một kế hoạch: các tác vụ nguyên tử, mỗi tác vụ có tiêu chí chấp nhận và một cổng kiểm chứng, được thực thi lần lượt từng tác vụ một, được commit khi vượt qua, và bất kỳ agent nào cũng có thể tiếp tục từ đĩa. Kế hoạch khép lại bằng một Final Review rà soát bảo mật và kiểm chứng trạng thái cuối. Phương pháp luận này cấp phép MIT và hoạt động với bất kỳ agent lập trình nào đọc được repository.

[Đọc phương pháp luận](https://deepworkplan.com/vi/methodology)

### Nó dành cho ai?

Những nhà phát triển và nhóm giao công việc thật, nhiều bước cho agent lập trình và muốn nó hoàn thành. Nó phù hợp khi một tác vụ trải dài hơn một phiên, hơn một họ tệp, hoặc hơn một agent; khi một đồng đội phải có thể tiếp tục đúng chỗ agent dừng lại; hoặc khi "xong" phải nghĩa là "đã kiểm chứng", chứ không phải "agent nói vậy". Một bản sửa một dòng không cần kế hoạch, và phương pháp luận nói rõ điều đó: quy tắc rigor tỷ lệ của nó đề xuất thay bằng mục tiêu, tiêu chí và cổng viết inline.

[Khởi động nhanh](https://deepworkplan.com/vi/quickstart)

### Sự khác biệt giữa một kế hoạch Lite và một kế hoạch Full là gì?

Đây là một lựa chọn về cách biểu diễn, không phải một sự đánh đổi về độ chặt chẽ. Kế hoạch mặc định ở dạng Lite: một README gọn gàng với các bản ghi tác vụ được neo (anchored), đã có thể thực thi được ngay, không phải một bản nháp dang dở. Nếu bạn yêu cầu một kế hoạch Full ngay từ đầu, `create` viết trực tiếp các tệp tác vụ Full; và mở rộng một kế hoạch sang Full khi mức chi tiết hướng dẫn, các phụ thuộc hoặc hợp đồng của một tác vụ không còn vừa với một bản ghi gọn gàng có thể rà soát. Việc nâng cấp sau này giữ nguyên mỗi tác vụ đã hoàn thành. Cả hai định dạng đều mang cùng tiêu chí chấp nhận, cổng kiểm chứng, bằng chứng và Final Review bắt buộc.

[Đọc phương pháp luận](https://deepworkplan.com/vi/methodology)

### Nó là một công cụ, một framework hay một phương pháp luận?

Một phương pháp luận được đóng gói thành skill cài đặt được. Không có server, không có tài khoản, không có định dạng độc quyền và không có runtime nào ngoài agent lập trình bạn đã dùng. Những gì được cài là các hướng dẫn cho agent đọc, một bộ nhỏ script shell để nhận diện ngữ cảnh và kiểm tra tính tuân thủ, cùng các quy ước mà repository của bạn áp dụng. Mọi thứ kế hoạch tạo ra đều là Markdown và JSON trong repository của bạn, đọc được mà không cần công cụ nào.

[Đọc đặc tả](https://deepworkplan.com/vi/spec)

### Nó hoạt động với những agent lập trình nào?

Bất kỳ agent nào đọc được các tệp của repository. Skill tuân theo chuẩn mở Agent Skills và quy ước `AGENTS.md`, nên Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot và các agent khác nhận được nó qua cơ chế tải skill và hướng dẫn thông thường của mình. Chính đợt đánh giá của phương pháp luận cho thấy một kế hoạch do agent của nhà cung cấp này bắt đầu và được agent của nhà cung cấp khác tiếp tục, theo cả hai chiều. Độ phủ cài đặt và bằng chứng hành vi được liệt kê cho từng agent trong ma trận tương thích, và hai thứ đó không bao giờ bị trộn lẫn.

[Xem bộ kit](https://deepworkplan.com/vi/kit)

### Tôi dùng nó như thế nào?

Ba bước. Trước hết, cài skill Deep Work Plan vào coding agent của bạn — đường nhanh nhất là `npx skills add DailybotHQ/deepworkplan-skill` (hoặc clone repo skill và chạy `./setup.sh`). Thứ hai, onboard repository một lần để agent thích ứng `AGENTS.md`, `docs/`, bộ kit `.agents/` và vùng `.dwp/` được gitignore với stack của bạn: trỏ tới https://deepworkplan.com/init.md, hoặc chạy `/deepworkplan-onboard`. Thứ ba, lập kế hoạch và chạy công việc với các lệnh mỏng: `/dwp-create <goal>` dựng kế hoạch; `/dwp-execute` chạy từng tác vụ qua mỗi cổng; `/dwp-refine` sửa một kế hoạch đang chạy dở (phạm vi, tác vụ, hoặc nâng cấp một kế hoạch Lite lên Full); `/dwp-resume` tiếp tục sau gián đoạn; `/dwp-status` báo tiến độ mà không thực thi; `/dwp-verify` tạo báo cáo phù hợp khách quan. Agent chặn `/` thường dùng `#` thay thế (ví dụ `#dwp-execute`). Adoption endpoint và Khởi động nhanh đi cùng con đường với chi tiết hơn.

[Khởi động nhanh](https://deepworkplan.com/vi/quickstart)

### Chính xác thì những gì được cài đặt, và ở đâu?

Agent skill được cài ở bất cứ đâu agent của bạn tải skill cấp dự án hoặc cấp người dùng. Sau đó, onboarding thích ứng chính repository: nó tạo mới hoặc hòa giải `AGENTS.md`, `docs/`, `.agents/` và không gian làm việc `.dwp/` được gitignore. Skill dạy agent phương pháp; repository giữ ngữ cảnh, bộ kit và bằng chứng kế hoạch mà các agent khác cần để tiếp tục.

[Xem luồng áp dụng](https://deepworkplan.com/vi/init)

### Deep Work Plan có yêu cầu Git không?

Git được khuyến nghị cho repository vì lịch sử của nó là một phần của bề mặt khôi phục và rà soát, nhưng phương pháp luận cũng có thể chạy trong một không gian làm việc agent mà không cần repository Git. Trong trường hợp đó, tầng trạng thái đọc được bằng máy — gồm các điểm kiểm tra `state.json` và bản ghi cổng kiểm chứng — là bắt buộc, để việc khôi phục không phụ thuộc vào bản ghi hội thoại.

[Đọc về các nguyên mẫu repository](https://deepworkplan.com/vi/spec/archetypes)

### Sự khác biệt giữa một skill, một kế hoạch và một đặc tả sản phẩm là gì?

Một skill mô tả cách agent thực hiện một quy trình có thể lặp lại. Một kế hoạch DWP mô tả một thay đổi cụ thể thông qua phạm vi, tiêu chí chấp nhận, cổng kiểm chứng và bằng chứng. Một đặc tả sản phẩm mô tả hành vi hiện tại của sản phẩm và tiến hóa qua các delta sau khi triển khai; skill và kế hoạch cũng là đặc tả, nhưng chúng mô tả quy trình và thay đổi chứ không duy trì hợp đồng sản phẩm chuẩn tắc đó.

[Đọc đặc tả](https://deepworkplan.com/vi/spec/dwp-specification)

## Cách một kế hoạch vận hành

### Các cổng kiểm chứng được triển khai thế nào? Chúng có cần con người phê duyệt không?

Chúng là các assertion thực thi được, do chính agent chạy. Việc phê duyệt của con người chỉ đóng khung hai đầu lượt chạy: một người duyệt kế hoạch trước khi thực thi và xem xét diff cuối cùng lúc mở pull request; phần thực thi ở giữa là tự chủ. Mỗi tác vụ nêu tên các lệnh cụ thể, thường là chính cổng chất lượng của repository, được chọn từ Touched Surface của tác vụ: các test của hành vi bị thay đổi và các bên tiêu thụ nó, mở rộng ra toàn bộ bộ test khi thay đổi dùng chung hoặc không thể giới hạn. Một tác vụ chỉ được đánh dấu xong khi các lệnh đó thoát thành công, và các tác vụ thay đổi hành vi phải mở rộng test. Khi thất bại, agent sửa chữa trước những gì nằm trong phạm vi của chính tác vụ và chạy lại cổng; một thất bại không thể sửa trong phạm vi đó để tác vụ bị đánh dấu là bị chặn và dừng lượt chạy.

[Vòng lặp lõi](https://deepworkplan.com/vi/methodology/02-core-loop)

### Kế hoạch tránh lỗi thời thế nào khi mọi người thay đổi mã giữa các lượt chạy?

Trên ba mặt trận. Các tác vụ được viết theo hành vi, không phải theo các bước sửa: một tiêu chí chấp nhận nói rõ hệ thống phải làm gì, nên một tệp được đổi tên hay một bản triển khai bị thay không làm nó vô hiệu. Mỗi cổng chạy lại trên repository như nó đang tồn tại, nên một giả định sai sẽ hỏng ầm ĩ ở lượt chạy tiếp theo thay vì trôi dạt âm thầm, và chính thất bại đó là tín hiệu để tinh chỉnh. Và việc giữ tài liệu đồng bộ là một phần của công việc: một tác vụ thay đổi hành vi cũng cập nhật tài liệu và bộ kit dành cho agent mô tả hành vi đó, ngay trong cổng của chính nó. Mỗi lượt chạy nên để lại repository sẵn sàng cho agent hơn khi nó bắt đầu.

[Đọc phương pháp luận](https://deepworkplan.com/vi/methodology)

### Tôi có thể thay đổi kế hoạch giữa lượt chạy mà không mất công việc đã xong không?

Có; tinh chỉnh một kế hoạch đã thực thi một phần là một thao tác được hỗ trợ đầy đủ. Định nghĩa tác vụ và trạng thái thực thi được giữ tách biệt: kế hoạch là một danh sách kiểm tra trên đĩa cộng với một tệp trạng thái nhỏ, nên những gì đã xong vẫn được ghi lại độc lập với nội dung tác vụ. Khi một tác vụ hóa ra sai, agent đánh dấu nó bị chặn và dừng lại thay vì cố đẩy tiếp. Sau đó bạn sửa, sắp xếp lại, tách hoặc bỏ các tác vụ chưa chạy, trong khi các tác vụ đã hoàn thành vẫn giữ nguyên. Việc tiếp tục dựng lại trạng thái từ đĩa và từ repository thực tế rồi chạy lại các cổng liên quan, nên không có gì thay đổi bên dưới lượt qua được.

[Vòng lặp lõi](https://deepworkplan.com/vi/methodology/02-core-loop)

### Nó có liên tục đối chiếu công việc với kế hoạch, hay kế hoạch chỉ là thứ lập sẵn từ đầu?

Kế hoạch là một phép kiểm tra liên tục. Agent làm việc theo từng tác vụ nhỏ và phải kiểm chứng trước khi đi tiếp, nên nó chỉ có thể lạc một bước, chứ không phải ba bước. Mỗi tác vụ mang tiêu chí chấp nhận cùng các lệnh chính xác chứng minh chúng, và tiến trình được ghi vào repository khi làm việc, kèm trạng thái từng tác vụ, nên độ trôi dạt trở nên nhìn thấy được với bạn, với phiên tiếp theo và với agent tiếp theo. Một kế hoạch chưa xong cho đến khi mọi thứ kiểm chứng đạt, kể cả Final Review. Lời nói thành thật: phương pháp luận không thể ngăn agent viết một tiêu chí chấp nhận yếu ngay từ đầu; nó làm cho trôi dạt bị lộ rõ thay vì âm thầm.

[Vòng lặp lõi](https://deepworkplan.com/vi/methodology/02-core-loop)

### Kế hoạch được sinh một lần và duy trì bằng tay, hay nó tiến hóa cùng mã?

Cả hai đều không. Nó được sinh một lần từ một mục tiêu, rồi được duy trì như một phần của công việc. Kế hoạch cố tình không được viết lại từ code diff, vì một đặc tả chạy theo mã sẽ trở thành tấm gương phản chiếu muộn màng — chính là độ trôi dạt mà phương pháp luận tồn tại để diệt. Nó tiến hóa một cách có chủ đích: các cổng chạy lại trên repository hiện tại, một cổng thất bại kích hoạt một lượt tinh chỉnh, và agent thực hiện lượt tinh chỉnh đó trong lúc chạy, còn bạn duyệt từ đầu và xem xét ở cuối. Tài liệu và test tiến hóa song song với mã một cách tự nhiên, vì việc cập nhật chúng nằm ngay trong cổng của từng tác vụ.

[Đọc phương pháp luận](https://deepworkplan.com/vi/methodology)

### Điều gì xảy ra nếu phiên chết giữa chừng?

Tiến trình nằm trên đĩa, không nằm trong hội thoại. Các ô đánh dấu trong README, nhật ký của từng tác vụ, một chỉ mục làm việc có giới hạn và một tệp trạng thái đọc được bằng máy được cập nhật tại mỗi ranh giới tác vụ, và tệp trạng thái ghi một điểm kiểm tra trước mọi khoảng dừng theo kế hoạch. Một phiên mới, hoặc một agent khác, đọc chỉ mục gọn gàng đó, đối chiếu nó với repository và lịch sử git, rồi tiếp tục tại tác vụ chưa hoàn thành đầu tiên mà không làm lại công việc đã xong. Ngay cả một kế hoạch đang tạo bị gián đoạn cũng khôi phục được: định danh của kế hoạch và danh sách tác vụ dự kiến được ghi trước mọi tệp tác vụ, nên một kế hoạch tạo dở có thể được hoàn tất hoặc bỏ đi thay vì phải đoán.

[Vòng lặp lõi](https://deepworkplan.com/vi/methodology/02-core-loop)

### Final Review là gì?

Tác vụ kết thúc bắt buộc duy nhất của mọi kế hoạch. Theo thứ tự: một bước rà soát bảo mật trên toàn bộ tập thay đổi tích lũy của kế hoạch, gồm cả lượt review diff cục bộ bắt buộc bởi skill AI Diff Reviewer, với các phát hiện nghiêm trọng chặn việc hoàn tất cho đến khi được sửa hoặc được chấp nhận rõ ràng; kiểm chứng trạng thái cuối, nghĩa là chạy đầy đủ các bộ test, lint, kiểm tra kiểu và định dạng áp dụng được của repository trên mã cuối cùng; và một bước đối chiếu các quyết định về skill mà từng tác vụ đã ghi. Sau đó agent báo cáo sản phẩm bàn giao, bằng chứng và giới hạn, rồi đề xuất Executive Report đúng một lần, chỉ tạo khi bạn yêu cầu.

[Đặc tả](https://deepworkplan.com/vi/spec/dwp-specification)

### Điều gì xảy ra khi một cổng kiểm chứng thất bại?

Một cổng thất bại trước hết là tín hiệu sửa chữa: agent khắc phục những gì nằm trong phạm vi của chính tác vụ và chạy lại cổng. Một thất bại vượt quá phạm vi đó khiến tác vụ được ghi nhận là bị chặn, và agent dừng lại trước khi tuyên bố hoàn thành. Bạn có thể kiểm tra bằng chứng, sửa mã hoặc tinh chỉnh tác vụ, rồi tiếp tục; một lệnh thất bại là tín hiệu để giải quyết sự sai lệch, không phải giấy phép để làm yếu cổng kiểm chứng.

[Đọc giao thức agent](https://deepworkplan.com/vi/spec/agent-protocol)

### Một kế hoạch có thể chạy không giám sát qua đêm hoặc trong CI không?

Có, khi kế hoạch đã được phê duyệt từ trước, mang tầng trạng thái bắt buộc và trao cho agent thẩm quyền có giới hạn. Một lượt chạy không giám sát phải dừng lại và ghi nhận một điểm chặn khi thực tế lệch khỏi kế hoạch, một cổng kiểm chứng thất bại ngoài phạm vi sửa chữa đã định, hoặc cần một phê duyệt hay thông tin xác thực mới.

[Đọc giao thức chạy không giám sát](https://deepworkplan.com/vi/spec/agent-protocol)

## So sánh với các công cụ khác

### Nó khác các công cụ theo đặc tả như Spec Kit, OpenSpec hay Kiro thế nào?

Chúng giải quyết các vấn đề kề nhau. Các công cụ theo đặc tả rất giỏi ghi lại cái gì cần thay đổi: đặc tả, yêu cầu và đề xuất thay đổi theo một khuôn có thể lặp lại. Deep Work Plan nói về cách một agent thực thi nhiều giờ mà không trôi dạt: harness đã onboard, các cổng kiểm chứng theo tác vụ được chọn từ Touched Surface, trạng thái có thể tiếp tục trên đĩa, một Final Review bắt buộc kèm bước rà soát bảo mật, và một công cụ kiểm tra tính tuân thủ cho chính repository. Hai thứ có thể kết hợp, với một đặc tả hay đề xuất thay đổi cấp dữ liệu cho kế hoạch. Trang so sánh xếp các khả năng cạnh nhau, theo đúng thuật ngữ của từng công cụ.

[Xem trang so sánh](https://deepworkplan.com/vi/compare)

### Nó khác các công cụ quy trình agent như BMAD, Superpowers, Get Shit Done hay Gentle-AI thế nào?

Các framework quy trình làm việc cho agent như BMAD, Superpowers và Get Shit Done mang lại phong cách làm việc mạnh mẽ: vai trò, nguyên tắc, các bước test-first, thói quen xác minh. Gentle-AI nằm ở một hạng mục lân cận với vai trò là bộ cấu hình hệ sinh thái agent: nó trang bị cho các coding agent bạn đã dùng bộ nhớ bền vững qua các phiên (Engram), các skill được tuyển chọn, persona, máy chủ MCP, Spec-Driven Development tùy chọn và đánh giá dựa trên bằng chứng tùy chọn (Receipt-Driven Development), bằng cách ghi vào thư mục cấu hình của từng agent. Deep Work Plan khác cả hai: nó tập trung vào những gì còn lại trong repository và những gì có thể kiểm tra được — một harness mà bất kỳ agent nào cũng đọc được ngay, các tệp task với tiêu chí chấp nhận và gate, trạng thái tồn tại qua một phiên, một bộ kiểm tra tuân thủ với mã thoát thân thiện CI, và một phép đo được công bố về số byte hướng dẫn mà mỗi flow tải. Nó độc lập với công cụ theo thiết kế và không thêm bất kỳ dịch vụ, nhà cung cấp hay bí mật nào vào vòng lặp cốt lõi. Các lớp có thể cùng tồn tại: các framework và Gentle-AI định hình cách agent hoạt động; Deep Work Plan làm cho công việc dài hạn bền vững và có thể kiểm chứng bên trong repository. Trang so sánh cho thấy mỗi cách tiếp cận được tích hợp sẵn, tùy chọn, hay nằm ngoài phạm vi.

[Xem trang so sánh](https://deepworkplan.com/vi/compare)

### Sao không dùng luôn chế độ lập kế hoạch có sẵn trong agent của tôi?

Các chế độ lập kế hoạch có sẵn rất hữu ích, và Deep Work Plan xây trên cùng một nền tảng — quy ước `AGENTS.md` và chuẩn mở Agent Skills. Khác biệt nằm ở chỗ kế hoạch sống ở đâu và cái gì bảo đảm nó. Các kế hoạch bản địa thường nằm ngoài repository và hết hạn cùng phiên; Deep Work Plan ghi kế hoạch, trạng thái và bằng chứng của nó vào repository, nên một agent khác hay một đồng đội có thể tiếp tục, và mỗi tác vụ mang một cổng thực thi được cùng một nhật ký đã ghi. Bạn vẫn dùng chế độ lập kế hoạch của agent để suy nghĩ; phương pháp luận bổ sung vòng lặp thực thi bền vững và kiểm chứng được.

[Xem trang so sánh](https://deepworkplan.com/vi/compare)

## Áp dụng

### Onboarding ghi gì vào repository của tôi, và nó có chạm các tệp hiện có không?

Onboarding không phá hủy gì: nó phát hiện `AGENTS.md`, `docs/`, `.agents/` hay `CLAUDE.md` sẵn có, hòa giải thay vì ghi đè, và hỏi trước khi thay thế bất cứ thứ gì. Nó ghi chỉ mục `AGENTS.md` với các lệnh thật, một cây `docs/` có lý lẽ, tài liệu cho từng mô-đun, bộ kit `.agents/` với các lệnh `dwp-*` mỏng, một vùng xuất `.dwp/` được gitignore, một bản đồ kiểm thử đã xác minh, và phần review mã cục bộ bắt buộc (skill AI Diff Reviewer cùng một tiện ích mở rộng review được điều chỉnh theo repo). Sau đó nó chạy tự kiểm tra và công cụ kiểm tra tính tuân thủ để bạn thấy cái gì đã được tạo. Một repository đã onboard ở một tiêu chuẩn sớm hơn sẽ nhận một bản nâng cấp harness có mục tiêu, chỉ hòa giải phần còn thiếu hoặc đã lỗi thời. Nâng cấp chính skill là một luồng riêng biệt, chỉ chạy khi được đồng ý rõ ràng (`/dwp-upgrade`): nó kiểm tra phiên bản mới nhất đã xuất bản ở chế độ chỉ đọc, chỉ cài đặt sau khi bạn chấp nhận rõ ràng, chạy lại onboarding như một lượt thực thi mới, và không bao giờ di chuyển hay vô hiệu hóa các kế hoạch hiện có dưới `.dwp/`.

[Điểm cuối áp dụng](https://deepworkplan.com/vi/init)

### Tôi có thể dùng phương pháp luận cốt lõi mà không cài add-on nào không?

Có. Add-on là các tầng tùy chọn, và một repository không dùng add-on nào vẫn tuân thủ DWP đầy đủ. Devcontainer, báo cáo Dailybot, nâng cấp phụ thuộc, hỗ trợ design-system và review CI tùy chọn chỉ được đề xuất khi chúng phù hợp với repository của bạn và bạn chấp nhận chúng một cách rõ ràng.

[Xem các add-on](https://deepworkplan.com/vi/spec/addons)

### Nếu repository của tôi chưa có test hay linting thì sao?

DWP không coi việc thiếu một toolchain là một lối thoát miễn trừ. Trong quá trình onboarding, agent đề xuất một thiết lập kiểm chứng phù hợp với stack, ghi các lệnh đó vào tài liệu repository và dùng chính các lệnh đó làm mục tiêu cho các cổng kiểm chứng sau này; đề xuất vẫn hiển thị để bạn rà soát.

[Đọc giao thức agent](https://deepworkplan.com/vi/spec/agent-protocol)

### Chi phí là bao nhiêu, và hiệu suất được đo thế nào?

Phương pháp luận và skill cấp phép MIT và miễn phí; không có dịch vụ, không có API key và không có telemetry trong các luồng lõi. Hiệu suất được báo cáo bằng số byte hướng dẫn mà mỗi luồng tải, đo bằng một script được commit cùng skill và công bố trong một sổ cái đánh giá, với mức tăng được báo cáo thẳng thắn như mức giảm. Nó không được báo cáo dưới dạng phần trăm token hay khoản tiết kiệm chi phí, vì một bản kê byte không chứng minh được những điều đó; một đợt đánh giá công khai đăng ký trước đang được lên kế hoạch để đo kết quả một cách đúng đắn.

[Tin tưởng và công bố](https://deepworkplan.com/vi/trust)

## Vẫn còn câu hỏi?

Mở một thảo luận hoặc một issue trên GitHub. Các câu hỏi được hỏi đi hỏi lại sẽ được thêm vào trang này.

[Hỏi trên GitHub](https://github.com/DailybotHQ/deepworkplan-website/issues)
