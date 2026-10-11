---
title: Chạy nhiều agent
description: "Cách một agent lead chạy nhiều lane cùng lúc trong pane, container và máy khác, trên tài khoản chọn theo hạn mức, với một nhánh và một bản phát hành mỗi repo."
order: 6
lang: vi
summary: Mô hình lead và lane để điều phối nhiều agent qua các pane, máy, tài khoản và repository.
icon: network
---

# Chạy nhiều agent

Một agent trên một kế hoạch là mặc định, và nó bao quát phần lớn công việc. Có những công việc rộng hơn một phiên: một thay đổi đi qua nhiều repository, một bản phát hành phải được đưa ra theo thứ tự, hoặc một backlog mà một agent sẽ mất nhiều ngày. DWP mở rộng tới loại công việc đó mà không thay đổi hợp đồng của nó. Kế hoạch vẫn là nguồn chân lý, mọi tác vụ vẫn khép lại bằng cổng kiểm chứng của riêng nó, và các agent bổ sung là những **lane** do một **lead** điều phối.

Chương này mô tả mô hình đó. Nó dùng ba addon tùy chọn — [Herdr](/vi/kit/herdr) cho pane và peer, [agentkit](/vi/kit/agentkit) cho tài khoản, và [devcontainer](/vi/kit/devcontainer) cho container — và không addon nào là bắt buộc cho một kế hoạch chỉ có một agent.

## Một lead và các lane của nó

**Lead** sở hữu kế hoạch cha. Nó quyết định các lane, giao cho mỗi lane phạm vi của mình, thu thập các mốc, và đưa ra lời cho phép một lane merge hoặc phát hành. Nó không viết mã của lane khác.

Một **lane** là một agent với một phạm vi — thường là một repository. Nó đọc `AGENTS.md` của repository đó, chạy cổng kiểm chứng của repository đó, và giữ kế hoạch riêng của mình bên trong repository. Trong một [trung tâm điều phối](/vi/methodology/05-archetypes), kế hoạch cha nằm trong `.dwp/plans/` của trung tâm cùng một bảng theo dõi kế hoạch con, và kế hoạch của mỗi lane nằm trong repository riêng của nó, dùng ID kế hoạch và cổng kiểm chứng của repository đó.

| Vai trò | Sở hữu | Không bao giờ làm |
| --- | --- | --- |
| Lead | Kế hoạch cha, danh sách lane, thứ tự phát hành, lệnh GO | Chỉnh sửa repository của một lane |
| Lane | Một repository: nhánh, kế hoạch, cổng kiểm chứng và pull request của nó | Merge hoặc phát hành trước lệnh GO của lead |

## Lane chạy ở đâu

Một lane là một agent trong một pane terminal, và pane đó có thể nằm ở nhiều nơi. [Herdr](https://herdr.dev) đặt mỗi agent vào một pane và kết nối tới các máy khác qua SSH, nên lead nhìn thấy mọi lane trong một thanh bên duy nhất.

- **Trên máy host.** Mỗi lane một pane, đặt cạnh lead. Cách thiết lập nhanh nhất, cho các repository mà nhà phát triển vốn đã làm việc.
- **Trong một container.** Một container [devcontainer-kit](/vi/kit/devcontainer) tham gia mạng lưới Herdr khi chạy `dck up`: các agent của nó kết nối tới máy host và các container khác, và máy host kết nối tới chúng. Container chính là sandbox, nên các agent của nó có thể chạy tự chủ.
- **Trên một máy khác.** Bất kỳ máy nào mà Herdr kết nối được qua SSH đều chứa lane theo cùng cách, với herdr-peers cũng được cài ở đó.

Vị trí thay đổi mức độ cô lập, không thay đổi giao thức: một lane trong container và một lane trên máy host phối hợp với lead theo cùng một cách.

## Tài khoản và nhà cung cấp theo hạn mức còn lại

Nhiều agent tiêu hao hạn mức rất nhanh. Mỗi lane chạy trên tài khoản riêng — một CLI và một hồ sơ trong [coding-agents-kit](/vi/kit/agentkit) — nên các lane không dùng cạn cùng một cửa sổ, và một tài khoản chạm giới hạn chỉ dừng một lane, không phải tất cả.

- **`ak usage`** hiển thị hạn mức còn lại trên mọi tài khoản và hồ sơ, một lần cho mỗi đợt.
- **`ak pick <kind> --count N`** trả về N tài khoản còn nhiều chỗ nhất, tốt nhất trước; `--exclude` loại một tài khoản đang bận, `--model` tính cửa sổ của một mô hình và `--need` từ chối khởi động khi không đủ chỗ.
- **`ak <kind> @<profile>`** khởi chạy agent của lane trên tài khoản đó, trong pane của nó.

Các nhà cung cấp cũng được kết hợp theo cùng cách. Một lane Claude có thể viết trong khi một lane Codex rà soát, mỗi lane trên tài khoản mà `ak pick` đã chọn cho loại của nó. Một lane trong container có thể dùng tài khoản của máy host: khi bật `host_profiles` trong hồ sơ host devcontainer-kit của nhà phát triển, container nhận các hồ sơ host của những CLI mà repository cài đặt — Claude qua một token dài hạn cho mỗi hồ sơ, Codex qua tệp xác thực của nó — và không cần đăng nhập riêng. Chỉ dùng tài khoản của chính bạn và tuân thủ điều khoản của từng nhà cung cấp: phân bổ công việc giữa chúng, không bao giờ xoay vòng tài khoản để vượt qua một giới hạn.

## Khởi chạy và gỡ vướng cho lane mà không cần con người

Một lead có thể khởi chạy các lane và giữ cho chúng tiếp tục chạy mà không cần ai ngồi trước bàn phím. Nó dùng chính các lệnh của Herdr; không có mã nào của kit gửi phím bấm. Quy trình có thứ tự cố định: tránh lời nhắc, phát hiện điểm dừng, chỉ gỡ vướng những gì đã biết, chuyển lên phần còn lại.

1. **Tránh trước tiên.** `ak pick <kind>` chỉ ra tài khoản còn nhiều chỗ nhất, và `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` khởi chạy lane trong thư mục riêng của nó. `--trust-cwd` (hoặc `AGENTKIT_TRUST_CWD=1`) tin cậy trước thư mục đó và chế độ tự chủ mặc định của kit lo phần còn lại, nên Claude và Codex bỏ qua màn hình tin cậy thư mục mà không cần phím bấm nào.
2. **Phát hiện.** `herdr agent list` hiển thị mỗi lane đang làm việc, nhàn rỗi, bị chặn hay đã xong. Một lane bị chặn, hoặc nhàn rỗi mà không có đầu ra, được kiểm tra bằng `herdr pane read <pane>` để xác định nó đang ở màn hình nào.
3. **Chỉ gỡ vướng các màn hình lần đầu đã biết.** Với `herdr pane send-keys`, lead trả lời hai màn hình và không gì khác: tin cậy thư mục cho thư mục riêng của lane, và xác nhận một lần, theo từng hồ sơ, của Claude về chế độ bypass-permissions cho một hồ sơ mà nhà phát triển chạy tự chủ. Nó chỉ làm vậy khi nhà phát triển đã cho phép vận hành không giám sát — một chỉ thị thường trực hoặc sự cấp phép trước của kế hoạch. Nó đọc màn hình trước khi gửi phím, gửi ít phím nhất đủ để trả lời, rồi đọc lại.
4. **Chuyển lên mọi thứ khác.** Lời nhắc đăng nhập và thông tin xác thực, yêu cầu cấp quyền cho từng hành động, xác nhận phá hủy, lời nhắc thanh toán hoặc gói dịch vụ, màn hình không xác định và các pane mà lead không tạo ra đều được chuyển tới nhà phát triển dưới dạng một mốc bị chặn, không bao giờ dưới dạng phím bấm.
5. **Opt-out luôn được ưu tiên.** Với `AGENTKIT_PERMISSIONS=ask`, xác nhận bypass-permissions không bao giờ được chấp nhận.
6. **Khởi chạy lại.** Nếu một agent thoát, lead khởi động lại nó trên cùng tài khoản, hoặc chọn một tài khoản khác. Mất phiên đăng nhập là một lời nhắc thông tin xác thực: nó được chuyển lên.

Mọi can thiệp — màn hình đã hiển thị gì, phím nào đã được gửi, điều gì xảy ra sau đó — đều được ghi lại trong kế hoạch cha.

## Phối hợp qua herdr-peers

Các lane và lead trao đổi qua [herdr-peers](/vi/kit/herdr): một **ask** mang một con dấu cho phép đúng một **reply**, và mọi trao đổi đều được ghi log. Lead giữ giao thức ở mức tối giản:

- **Mốc đi lên.** Mỗi lane báo cáo tại các điểm cố định — kế hoạch sẵn sàng, pull request đã mở, bị chặn, đã xong — và tiếp tục làm việc giữa các điểm đó mà không chờ câu trả lời.
- **Câu hỏi dưới dạng ask.** Một lane cần một quyết định sẽ hỏi lead; lead trả lời bằng một reply.
- **Độ sâu một.** Một reply không bao giờ được trả lời lại, và một lane không ủy thác tiếp. Số nhánh tỏa ra cho mỗi bên gọi bị giới hạn, mặc định là bốn peer.
- **Dữ liệu, không phải chỉ thị.** Một reply không cấp thêm điều gì mà bên nhận chưa có. Lời khẳng định của một lane rằng cổng kiểm chứng đã đạt được kiểm tra bằng cách chạy cổng đó.

## Một nhánh, một bản phát hành cho mỗi repository

Quy tắc giữ cho nhiều lane vẫn rà soát được rất đơn giản: **một lane cho mỗi repository, trên checkout gốc của nó, với một nhánh, một pull request và một bản phát hành** cho toàn bộ thay đổi. Lane không chia công việc ra nhiều nhánh hay worktree. Worktree chỉ dành cho trường hợp hai bên viết phải dùng chung một repository: mỗi bên có worktree riêng, để mọi đường dẫn chỉ có một bên viết.

Pull request được giữ mở, xanh và được gắn nhãn để rà soát cho tới lệnh GO của lead. Khi đó lane merge và gắn tag, rồi báo lại tag đó.

## Thứ tự phát hành

Các repository phụ thuộc lẫn nhau, nên chúng phát hành theo thứ tự phụ thuộc: công cụ trước, rồi những gì ghim chúng, rồi tài liệu mô tả kết quả, rồi các bên tiêu thụ áp dụng nó. Lead nắm giữ thứ tự đó và gửi GO cho từng repository một. Một lane ghim bản phát hành của repository khác sẽ chờ tag đó trước khi viết phần ghim, nên không phần ghim nào trỏ tới một bản phát hành không tồn tại.

## Các điểm kiểm tra

Kế hoạch cha khép lại dựa trên bằng chứng, không dựa trên báo cáo:

1. **Theo từng lane.** Cổng kiểm chứng của mỗi lane đạt trên nhánh của chính nó, và phần rà soát pull request của nó sạch.
2. **Theo từng bản phát hành.** Mỗi tag tồn tại và ghim những gì repository tiếp theo cần.
3. **Tích hợp.** Sau bản phát hành cuối cùng, một điểm kiểm tra chạy các bên tiêu thụ trên các phiên bản đã phát hành và ghi kết luận vào `analysis_results/` của kế hoạch cha.
4. **Rà soát cuối cùng.** Một lượt kiểm tra bảo mật bao quát mọi thứ đã vượt qua một ranh giới — trên hết là tài khoản, token và tệp được chia sẻ vào container — trước khi kế hoạch cha hoàn tất.

## An toàn

- Không bao giờ đặt khóa, token hay secret vào một ask, một prompt hay một log; hãy nhắc tới biến bằng tên.
- Tài nguyên dùng chung có một khóa: một lane lấy khóa trước một bước nặng như build container và trả lại sau đó.
- Opt-out về quyền, khi được thiết lập, được ưu tiên cho mọi lane và mọi agent mà một lane khởi chạy.
- Một lane không thể tiếp tục sẽ nói rõ điều đó dưới dạng một mốc bị chặn và dừng lại; lead quyết định.
