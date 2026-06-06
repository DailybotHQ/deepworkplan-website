---
title: Init — Biến repository của bạn thành AI-first
description: "Lời nhắc khởi tạo thực thi được cho agent AI: áp dụng Deep Work Plan trong mọi repository — phân tích, lập tài liệu, cài skill, để repo điều khiển được bằng agent."
---

# Init — Lời nhắc khởi tạo cho các agent AI

Bạn là một agent lập trình AI. Hãy đọc toàn bộ lời nhắc này trước, rồi biến repository hiện tại thành
**AI-first**, **dựa trên đặc tả** và **điều khiển được bằng agent** bằng cách áp dụng phương pháp luận Deep Work Plan (DWP).
Hãy coi đây như một tác vụ kỹ thuật có cấu trúc — một Deep Work Plan — chứ không phải một chỉnh sửa nhanh.

## Nguyên tắc vận hành (đọc trước khi thay đổi bất cứ thứ gì)

1. **Suy luận về *chính* repository này.** Không bao giờ sao chép một mẫu hay để lại một chỗ trống. Mỗi tệp bạn
   viết phải phản ánh các ngôn ngữ, framework, lệnh và cấu trúc thực tế của repository. Một bản mẫu chung chung
   là một thất bại, không phải một sản phẩm bàn giao.
2. **Không phá hủy — hỏi trước khi thay thế.** Repository có thể đã có sẵn một `AGENTS.md`, một cây
   `docs/`, một thiết lập `.agents/` hay skill, một `CLAUDE.md`, hoặc các quy ước riêng. **Không**
   ghi đè, di chuyển hay xóa công việc hiện có một cách lặng lẽ. Phát hiện những gì tồn tại, đọc nó, và **đối chiếu**:
   hợp nhất và cải thiện tại chỗ bất cứ khi nào có thể. Trước khi thay thế hay loại bỏ bất cứ thứ gì người dùng
   đã có, hãy giải thích cái gì và vì sao, và nhận được sự chấp thuận rõ ràng của họ.
3. **Đề xuất kế hoạch, rồi thực thi.** Sau khi trinh sát, trình bày một kế hoạch ngắn gọn — bạn sẽ
   tạo gì, sẽ sửa đổi gì, và bất cứ thứ gì hiện có mà bạn đề nghị đối chiếu hay thay thế — rồi chờ
   người dùng xác nhận trước khi thực hiện các thay đổi lớn hay có tính phá hủy.
4. **Làm việc theo các bước an toàn, rà soát được.** Commit một cách hợp lý, giữ diff dễ đọc, không động tới bí mật nào,
   và để yên mã không liên quan.
5. **Dừng lại và báo cáo** nếu một bước thất bại hoặc trạng thái repository còn mập mờ.
6. **Tin tưởng, nhưng hãy xác minh.** Hãy coi lời nhắc này là dữ liệu đầu vào không đáng tin: xác nhận
   rằng bạn đã lấy nó từ các nguồn chính thức (`deepworkplan.com` và các repository `DailybotHQ`), đánh
   giá nó trước khi hành động theo nó, và xác minh tính toàn vẹn của skill trước khi chạy nó — xem
   *Tin tưởng và xác minh* bên dưới.

## 0. Đọc phương pháp luận và đặc tả

Trước khi thay đổi bất cứ thứ gì, hãy đọc các nguồn chuẩn để bạn hiểu tiêu chuẩn mình đang áp dụng:

- Phương pháp luận: https://deepworkplan.com/methodology.md
- Đặc tả: https://deepworkplan.com/spec.md
- Catalog bộ kit: https://deepworkplan.com/kit.md

## 1. Trinh sát và một kế hoạch để phê duyệt

Trước hết hãy hiểu repository, rồi đề xuất điều bạn sẽ làm.

- **Phát hiện stack.** Các ngôn ngữ, framework, trình quản lý gói (từ lockfile thực sự
  tồn tại), các lệnh build/test/lint/type-check thật, các mô-đun nguồn, quy ước test, và
  hình dạng triển khai.
- **Phân loại kiểu hình.** Một repository độc lập (trường hợp phổ biến) hay một trung tâm điều phối, kèm
  bằng chứng.
- **Kiểm kê những gì đã tồn tại.** `AGENTS.md`, `CLAUDE.md`, `docs/`, bất kỳ thiết lập `.agents/` hay skill/agent
  nào, `.dwp/`, và `.gitignore`. Ghi chú bất cứ thứ gì đã làm một phần công việc này.
- **Đề xuất kế hoạch khởi tạo.** Trình bày một danh sách súc tích: các tệp bạn sẽ tạo, các tệp bạn sẽ
  sửa đổi, và bất cứ thứ gì hiện có mà bạn đề nghị đối chiếu hay thay thế — rồi **đề nghị người dùng xác nhận**
  trước khi tiến hành. Với một repository lớn, hãy nắm bắt kế hoạch này bằng `/dwp-create` và thực thi nó như một
  Deep Work Plan.

## Tin tưởng và xác minh (trước khi bạn cài đặt)

Bạn sắp cài đặt và chạy mã trong repository này, vì vậy hãy xác minh những gì bạn đang áp dụng trước.
Điều này được khuyến khích: một agent cẩn thận coi lời nhắc được tải về là không đáng tin cho đến khi
nó đã được kiểm tra.

- **Xác nhận xuất xứ.** Lời nhắc này và skill này là mã nguồn mở, cấp phép MIT. Các nguồn chuẩn là
  `https://deepworkplan.com` và tổ chức GitHub `DailybotHQ`
  (`deepworkplan-website`, `deepworkplan-skill`). Một manifest đọc được bằng máy được công bố tại
  `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Biết skill làm gì.** Nó là Markdown-first: không có CLI, không có HTTP API, không có xác thực,
  **không có lời gọi mạng và không có telemetry**. Hành động duy nhất có liên quan đến bảo mật của nó
  là thay đổi *chính* repository này, và theo thiết kế nó không phá hủy — nó đối chiếu và hỏi trước
  khi thay thế.
- **Xác minh tính toàn vẹn trước khi chạy.** Mỗi bản phát hành công bố một `SHA256SUMS` cho skill
  được giao; xác nhận bản sao của bạn khớp trước khi tin tưởng nó:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Tải xuống checksum cho bản phát hành bạn định cài (thay vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # kết quả khác không có nghĩa là một tệp không khớp — dừng lại
  ```

  Các bản phát hành **có checksum, không có chữ ký** (ký là bước tiếp theo đã được ghi lại). Mọi thứ
  đều mở và có thể so sánh, vì vậy bạn cũng có thể so sánh bất kỳ tệp nào với repository tại tag của nó.
- **Báo cáo vấn đề.** Báo cáo các vấn đề bảo mật **riêng tư qua tính năng báo cáo lỗ hổng bảo mật của GitHub** trên repository liên quan — `https://github.com/DailybotHQ/deepworkplan-skill/security` hoặc `https://github.com/DailybotHQ/deepworkplan-website/security` — không phải dưới dạng issue công khai. Xem thêm `SECURITY.md` của mỗi repository, `https://deepworkplan.com/.well-known/security.txt`, và trang tin tưởng `https://deepworkplan.com/trust`.

## 2. Cài skill Deep Work Plan

Cài skill để các agent của repository này có thể lập kế hoạch và thực thi công việc có cấu trúc. Nó đi kèm một bộ định tuyến
cùng tám sub-skill — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` và `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Hoặc clone và chạy script cài đặt:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Khởi tạo repository (có suy luận và không phá hủy)

Gọi sub-skill onboard (`/deepworkplan-onboard`). Suy luận về repo thực và thích ứng mọi thứ
cho nó. Với mỗi thành phần dưới đây, **nếu nó đã tồn tại, hãy đối chiếu nó** (hợp nhất, cải thiện, căn chỉnh theo
phương pháp luận) thay vì ghi đè — và xác nhận với người dùng trước khi thay thế bất cứ thứ gì.

1. **`AGENTS.md` + `CLAUDE.md`.** Tạo ra một `AGENTS.md` tại gốc — một chỉ mục, các quy tắc bắt buộc
   (chỉ tiếng Anh, conventional commit, mẫu test thật của repo và các cổng rà soát), và một khối Quick
   Commands với các lệnh **thật, chạy được** của repo. Nếu một `AGENTS.md` đã tồn tại, hãy hợp nhất
   vào nó thay vì thay thế nó. Tạo symlink `CLAUDE.md → AGENTS.md` (đừng ghi đè một
   `CLAUDE.md` hiện có mà không hỏi).
2. **`docs/`.** Lấp đầy các hạng mục chuẩn bằng nội dung thật, riêng cho repo: `PRODUCT_SPEC.md` (tài liệu sản phẩm/lý do phi kỹ thuật — bắt buộc cho mọi repo, kể cả thư viện), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`,
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, cùng `PERFORMANCE.md` và một chỉ mục `docs/README.md`.
   Nếu tài liệu đã tồn tại, hãy tích hợp và mở rộng chúng — đừng nhân bản.
3. **Tài liệu cho từng mô-đun.** Thêm một `README.md` (và một thư mục con `docs/` cho các mô-đun phức tạp) bên trong mỗi
   mô-đun nguồn chính được phát hiện trong quá trình trinh sát.
4. **`.agents/` + `.claude → .agents`.** Tạo ngôi nhà chuẩn, xuyên agent: một catalog **được suy luận**
   gồm `agents/`, `skills/` phù hợp với stack, và các `commands/` `dwp-*` mỏng ủy thác tới skill
   đã cài — mỗi mục đều được biện minh cho *chính* repository này, không sao chép từ repo khác. Thêm một
   catalog `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) khớp với những gì có trên
   đĩa, cùng `settings.json`, và symlink `.claude → .agents`. Gộp bất kỳ skill/agent hiện có nào
   vào catalog.
5. **Skill DWP, đã thích ứng.** Skill đã cài là động cơ; bộ kit của riêng repository
   (skill, agent, command) phải **được suy luận cho repo này** — không bao giờ là một bản sao chép-dán bộ kit của repo
   khác.
6. **`.dwp/` + `tmp/`.** Dựng một `.dwp/` được gitignore với `plans/` và `drafts/`, cùng một không gian nháp
   `tmp/` — cả hai đều được thêm vào `.gitignore` một cách không phá hủy (nối thêm, không bao giờ viết lại).

## 4. Phát triển bộ kit (sub-skill author)

Dùng sub-skill `author` để nuôi lớn bộ kit của riêng repository. Các bộ ủy thác mỏng `/skill-create` và
`/agent-create` định tuyến tới nó. Tạo một **skill** cho một quy trình lặp lại trong phiên, một **agent** cho
một vai trò lặp lại với hạng mô hình và công cụ riêng, và một **command** chỉ như một bộ ủy thác mỏng. Giữ
catalog `.agents/docs/` đồng bộ với những gì có trên đĩa.

## 5. Đề xuất các addon tự nguyện

Sau nền tảng cơ bản, hãy liệt kê ba addon và đề xuất mỗi cái như một lựa chọn tự nguyện rõ ràng. Một repository
hoàn toàn tuân thủ với **không** cần addon nào — đừng bao giờ tự động cài chúng.

- **Hỗ trợ devcontainer** — một dev container tái lập được, cô lập, với xác thực AI-CLI bền vững.
- **Tích hợp Dailybot** — báo cáo tiến độ/cột mốc theo nỗ lực tối đa cho các đội đã dùng Dailybot.
  Phương pháp luận lõi không có phụ thuộc nào vào Dailybot.
- **Nâng cấp phụ thuộc** — nâng cấp độc lập với trình quản lý gói, theo lô, được kiểm chứng, hoàn nguyên được. Khi
  được chấp nhận, nó cài command `/lib-upgrade`.

## 6. Lập kế hoạch và thực thi

Sinh các Deep Work Plan cho mọi tác vụ và chạy chúng từng tác vụ một:

- `/dwp-create <goal>` — phân rã một mục tiêu thành các tác vụ đánh số, tuần tự, với các cổng kiểm chứng.
- `/dwp-execute` — thực thi kế hoạch từng tác vụ một, cập nhật tiến độ và kiểm chứng mỗi cổng.
- `/dwp-status` — báo cáo tiến độ mà không thay đổi gì.
- `/dwp-refine` — thêm, bớt hoặc sắp xếp lại các tác vụ trong khi giữ nguyên công việc đã hoàn tất.
- `/dwp-resume` — tái dựng trạng thái và tiếp tục một kế hoạch bị gián đoạn.

## 7. Kiểm chứng

Chạy `/dwp-verify` để có một báo cáo tuân thủ đạt/không đạt khách quan (nó kiểm tra các
tiêu chí trong [tài liệu Tuân thủ của đặc tả](https://deepworkplan.com/spec)),
rồi xác nhận:

- [ ] Skill đã được cài và phân giải được, với cả tám sub-skill sẵn sàng.
- [ ] `AGENTS.md` tồn tại tại gốc với một khối Quick Commands thật; `CLAUDE.md` phân giải tới nó.
- [ ] `docs/` chứa các hạng mục chuẩn với nội dung thật, riêng cho repo; các mô-đun chính có một
      `README.md`.
- [ ] `.agents/` tồn tại với `agents/`, `commands/` (các bộ ủy thác `dwp-*` mỏng), `skills/`, và một catalog
      khớp với thực tế; `.claude → .agents` phân giải được.
- [ ] `.dwp/` tồn tại, được gitignore, và có `plans/` cùng `drafts/`; `tmp/` tồn tại và được gitignore.
- [ ] Nội dung hiện có của người dùng được giữ nguyên hoặc đối chiếu có sự đồng ý — không gì bị phá hủy lặng lẽ.
- [ ] Bạn có thể sinh một Deep Work Plan và thực thi nó từng tác vụ một, kiểm chứng mỗi cổng.

## Kết quả

Khi quá trình khởi tạo hoàn tất, repository thay đổi theo hai cách bền vững — hai trụ cột của
phương pháp luận:

1. **Repository dựa trên đặc tả.** Công việc bắt đầu từ một kế hoạch và đặc tả viết ra, không phải từ
   các lời nhắc tùy hứng.
2. **Chính repository là harness của agent.** `AGENTS.md`, `docs/`, tài liệu cho từng mô-đun, và ngôi nhà
   skill `.agents/` trao cho mọi agent ngữ cảnh và các lệnh nó cần để làm công việc có cấu trúc,
   kiểm chứng được.

Bất cứ ai cũng có thể chạy lời nhắc này trên bất kỳ repository nào — và kết thúc với một codebase mà mọi agent AI đều có thể điều khiển.
