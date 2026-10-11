---
title: "Bắt đầu nhanh — Deep Work Plan"
description: "Lời nhắc khởi tạo thực thi được cho agent AI: áp dụng Deep Work Plan trong mọi repository — phân tích, lập tài liệu, cài skill, để repo điều khiển được bằng agent."
lastUpdated: 2026-10-11
---

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

   Các nguyên tắc làm việc được đặt **ngay trong tệp**, cạnh những quy tắc cốt lõi: một agent chỉ đọc điểm vào phải tìm thấy chúng ở đó, chứ không phải sau một liên kết. Mười hành vi: nhận trách nhiệm về kết quả, tự tìm hiểu trước khi hỏi, tự quyết những việc thường lệ, hỏi khi thiếu căn cứ hoặc thiếu thẩm quyền, làm cho yêu cầu phê duyệt trở nên cụ thể, vượt qua trở ngại, tôn trọng ý định và phạm vi, áp dụng mức độ kỹ lưỡng tương xứng, trao đổi thẳng thắn, và kiểm chứng trước khi tuyên bố hoàn tất. Hãy đánh giá **ý nghĩa** của những quy tắc đã có trước khi sửa: giữ lại cái tương đương, chỉ bổ sung cái còn thiếu, và xác nhận lần chạy thứ hai không tạo thêm khác biệt. Đây là giá trị mặc định trong phạm vi yêu cầu hiện tại, không phải thẩm quyền mới.

## 0. Đọc phương pháp luận và đặc tả

Phương pháp luận đứng trên ba trụ cột: **phát triển dựa trên đặc tả** (đặc tả viết ra là nguồn chân lý), **kỹ thuật harness** (repository mang theo ngữ cảnh, công cụ, hàng rào bảo vệ và trạng thái), và **hiệu quả token** (harness được nạp theo kiểu tiệm tiến và việc kiểm chứng chỉ chạm vào những gì đã thay đổi — công việc tầm xa ngay từ thiết kế, hiệu quả ngay từ cách dựng).

Trước khi thay đổi bất cứ thứ gì, hãy đọc các nguồn chuẩn để bạn hiểu tiêu chuẩn mình đang áp dụng:

- Phương pháp luận: https://deepworkplan.com/methodology.md
- Đặc tả: https://deepworkplan.com/spec.md
- Catalog bộ kit: https://deepworkplan.com/kit.md

## 1. Trinh sát và một kế hoạch để phê duyệt

Trước hết hãy hiểu repository, rồi đề xuất điều bạn sẽ làm.

- **Phát hiện stack.** Các ngôn ngữ, framework, trình quản lý gói (từ lockfile thực sự
  tồn tại), các lệnh build/test/lint/type-check thật, các mô-đun nguồn, quy ước test, và
  hình dạng triển khai.
- **Phân loại kiểu hình.** Một repository độc lập (trường hợp phổ biến), một trung tâm điều phối, hay một
  không gian làm việc agent — ngôi nhà tồn tại lâu dài của một agent tự chủ, nơi git được khuyến
  nghị thay vì mặc định — kèm bằng chứng.
- **Nhận diện một bản cài DWP hiện có.** Nếu `AGENTS.md` và `.agents/` đã tồn tại, hãy tìm dòng
  xuất xứ `DWP standard:`. Một harness ra đời trước tiêu chuẩn hiện tại nhận một đợt **nâng cấp
  có mục tiêu**: cài lại skill là toàn bộ lộ trình nâng cấp, và việc khởi tạo chỉ đối chiếu những
  phần còn thiếu hoặc đã cũ — mọi phần viết tay, skill tùy chỉnh và kế hoạch đang thực thi đều
  được giữ nguyên, và lượt chạy thứ hai không thay đổi gì. Các kế hoạch được viết dưới một phiên bản
  sớm hơn giữ nguyên hình dạng đã ghi lại của mình và khép lại bằng các tác vụ cuối riêng của chúng;
  chúng không bao giờ bị ép sang hình dạng mới.
- **Kiểm kê những gì đã tồn tại.** `AGENTS.md`, `CLAUDE.md`, `docs/`, bất kỳ thiết lập `.agents/` hay skill/agent
  nào, `.dwp/`, và `.gitignore`. Ghi chú bất cứ thứ gì đã làm một phần công việc này.
- **Đề xuất kế hoạch khởi tạo.** Trình bày một danh sách súc tích: các tệp bạn sẽ tạo, các tệp bạn sẽ
  sửa đổi, và bất cứ thứ gì hiện có mà bạn đề nghị đối chiếu hay thay thế — rồi **đề nghị người dùng xác nhận**
  trước khi tiến hành. Với một repository lớn (nhiều mô-đun hoặc nhiều thành phần cần sinh ra), sub-skill
  onboard sử dụng lộ trình hướng kế hoạch: nó hoàn tất trinh sát, sinh `AGENTS.md`, rồi phát ra một
  Deep Work Plan khởi tạo dưới `.dwp/plans/` và chuyển giao cho `/dwp-execute`
  → `/dwp-resume` khi cần.

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
  git checkout v7.6.0
  # Tải xuống checksum của bản phát hành đó và đối chiếu với digest bên dưới:
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/v7.6.0/SHA256SUMS
  shasum -a 256 SHA256SUMS   # phải bằng digest của deepworkplan-skill trong Bản phát hành được ghim
  ./setup.sh --verify        # kết quả khác không có nghĩa là một tệp không khớp — dừng lại
  ```

  Các bản phát hành **có checksum, không có chữ ký** (ký là bước tiếp theo đã được ghi lại). Mọi thứ
  đều mở và có thể so sánh, vì vậy bạn cũng có thể so sánh bất kỳ tệp nào với repository tại tag của nó.
- **Bản phát hành được ghim.** Mọi thành phần mà lời nhắc này cài đặt đều được ghim vào một bản phát hành. Trước
  khi dùng `SHA256SUMS` của một bản phát hành, hãy đối chiếu chính tệp đó với digest bên dưới
  (`shasum -a 256 SHA256SUMS`, hoặc `sha256sum` trên Linux); không khớp có nghĩa là dừng lại.

  | Repository (github.com/DailybotHQ) | Tag | sha256 của `SHA256SUMS` |
  | --- | --- | --- |
  | deepworkplan-skill | `v7.6.0` | `99f0dbf3bcc1e795fa6e15b520d6250f0a47d5efcb44614fa5d1926fb2320784` |
  | coding-agents-kit | `v0.5.0` | `a90f45e44085370694a954a3578d037d0637d0eb4ec2f1b846a8d29556b1ec27` |
  | herdr-peers | `v0.2.1` | `72b3ea5352ab3eb13045fb0ff901efddc5d8b860724daa3d75d4531df3ebfb3f` |
  | devcontainer-kit | `v0.3.0` | `02d4de086eeb010b42458dd131b690df36638b361033e5df6aa3d5ceba4a7eea` |
  | deepworkplan-vim | `v0.7.0` | `24c0a036f8988d2c2a484c4153cddde7ffe563b12709df3f4b5a2150970e08d2` |
  | ai-diff-reviewer | `v3.3.9` | `aaf490cfe01ba858df49732798d6861a7c742b967f39fedb4f1a9c999aafc0c9` |
  | agent-skill | `v3.23.12` | không công bố — CLI skills ghi một hash nội dung trong `skills-lock.json` |
- **Báo cáo vấn đề.** Báo cáo các vấn đề bảo mật **riêng tư qua tính năng báo cáo lỗ hổng bảo mật của GitHub** trên repository liên quan — `https://github.com/DailybotHQ/deepworkplan-skill/security` hoặc `https://github.com/DailybotHQ/deepworkplan-website/security` — không phải dưới dạng issue công khai. Xem thêm `SECURITY.md` của mỗi repository, `https://deepworkplan.com/.well-known/security.txt`, và trang tin tưởng `https://deepworkplan.com/trust`.

## 2. Cài skill Deep Work Plan

> **Đường tắt.** Skill mang theo quy trình onboarding của riêng nó, nên chỉ cần cài đặt là đủ. Sau khi cài, hãy chạy `/deepworkplan-onboard`: nó thực hiện mọi thứ mà các mục 3–7 mô tả — trinh sát, `AGENTS.md`, `docs/`, tài liệu theo từng mô-đun, `.agents/`, bản đánh giá cục bộ bắt buộc, các addon tùy chọn và bước tự kiểm tra cuối cùng. Hãy đọc tiếp để biết sub-skill đó sẽ làm gì — và đường dự phòng khi một tác nhân không thể nạp skill.

Cài skill để các agent của repository này có thể lập kế hoạch và thực thi công việc có cấu trúc. Nó đi kèm một bộ định tuyến
cùng chín sub-skill — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard`, `author` và `upgrade`.

```bash
# pinned to the current release (the skills CLI honours only this tree-URL form for a tag):
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.6.0 --skill deepworkplan -y
```

Hoặc cài đặt qua OpenClaw:

```bash
openclaw skills install deepworkplan
```

Hoặc clone và chạy script cài đặt:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### Tiêu chuẩn hiện tại và mô hình thực thi

Tiêu chuẩn hướng-repository hiện tại là **DWP 7.0.0**, được triển khai bởi phiên
bản skill Deep Work Plan đã cài ở trên. Gói skill hiện tại bao gồm bộ định tuyến
và chín sub-skill: `create`, `execute`, `refine`, `resume`, `status`, `verify`,
`onboard`, `author` và `upgrade`.

Phiên bản skill đã cài: **7.6.0**. Gói 7.x hiện tại mặc định tạo kế hoạch mới bằng v7. Các kế hoạch hiện có giữ nguyên thế hệ đã ghi nhận; chuyển kế hoạch v5 sang v6 cần yêu cầu di chuyển rõ ràng và xem trước.

Tiêu chuẩn này được thiết kế có chủ đích theo tỷ lệ, và biến sự tỷ lệ đó thành
một thuộc tính của kế hoạch chứ không phải kỷ luật của nhà phát triển. Một kế
hoạch hoặc là **Lite** — các bản ghi tác vụ nằm trực tiếp trong README của kế
hoạch, dành cho công việc nhỏ và giới hạn — hoặc là **Full**, mỗi tác vụ một
tệp, dành cho công việc dài hơi. Lựa chọn này liên quan đến chi phí biểu diễn,
không phải mức độ nghiêm ngặt: cả hai định dạng đều mang id tác vụ ổn định, một
Bề mặt bị chạm tới, tiêu chí chấp nhận, cổng kiểm định và bằng chứng hoàn thành,
nên một kế hoạch Lite là một kế hoạch thật sự, không phải bản phác thảo. Định
dạng, cụ thể hóa, phê duyệt và thực thi là các trục độc lập; một kế hoạch Lite
được nâng cấp lên Full bằng `/dwp-refine promote` khi các bản ghi gọn nhẹ không
còn đủ để mang một yêu cầu hay một cổng.

Đối với một kế hoạch Full, repository là bề mặt thực thi lâu dài. Kế hoạch chứa
các tác vụ nguyên tử, một **Bề mặt bị chạm tới** giải thích điều gì đã thay đổi và
những người tiêu dùng nào bị ảnh hưởng, tiêu chí chấp nhận, và một cổng kiểm
định được chọn từ bản đồ kiểm thử đã được ghi lại của repository. Một kế hoạch mới ghi manifest định danh của nó, tiếp theo là hợp đồng có phiên bản, rồi đến sự kiện phê duyệt. Nhật ký chỉ ghi thêm lưu quá trình thực thi; `state.json` là bản chụp được suy ra từ nhật ký. Có thể khôi phục từng bước sau gián đoạn.

Phiên bản schema luôn gắn với từng kế hoạch. Gói 7.x hiện tại mặc định tạo kế
hoạch **v7**: `manifest.json` tuân theo
https://deepworkplan.com/schema/plan-manifest/v7.json,
[hợp đồng](https://deepworkplan.com/schema/plan-contract/v7.json) bổ sung một dấu
đánh tác vụ `parallel_safe` tùy chọn vào hợp đồng v6, và mọi
[sự kiện nhật ký](https://deepworkplan.com/schema/journal-event/v7.json) cũng có thể
ghi lại một `delegation`. Projection trực tiếp vẫn giữ snapshot không thay đổi tại
https://deepworkplan.com/schema/plan-snapshot/v6.json, và
[manifest ngữ cảnh tác vụ](https://deepworkplan.com/schema/context-manifest/v6.json)
được dùng chung với v6. Một yêu cầu `v6` rõ ràng vẫn tạo ra kế hoạch v6.
Một kế hoạch không bao giờ đổi thế hệ: kế hoạch v6 giữ các schema v6 của nó
([manifest](https://deepworkplan.com/schema/plan-manifest/v6.json),
[hợp đồng](https://deepworkplan.com/schema/plan-contract/v6.json),
[sự kiện nhật ký](https://deepworkplan.com/schema/journal-event/v6.json)) và chạy
không thay đổi; kế hoạch v5 tiếp tục dùng `state.json` theo schema
https://deepworkplan.com/schema/plan-state/v5.json; các kế hoạch v1, v2 và v5 hiện có
không bao giờ bị viết lại hay di chuyển ngầm định, và chuyển kế hoạch v5 sang v6 cần
một lần di chuyển rõ ràng, có xem trước.

Các addon tùy chọn được ghi lại theo từng repository trong sổ đăng ký addon được theo
dõi `.dwp/config.json` (https://deepworkplan.com/schema/dwp-config/v1.json): không có
nghĩa là chưa được bật, và phương pháp vẫn hoạt động khi tắt mọi addon. Một kế hoạch v7
chỉ được giao một tác vụ `parallel_safe` cho một agent lập trình khác khi hợp đồng của
nó cấp `agent_delegation` và một addon ủy quyền (agentkit hoặc Herdr) đã được bật và
phát hiện; kết quả của bên được ủy quyền vẫn chỉ là một tuyên bố cho đến khi trình chạy
cổng của chính kế hoạch quan sát được nó.

Mỗi kế hoạch có một tác vụ kết thúc bắt buộc: **Final Review**. Nó chạy bước
kiểm tra bảo mật trên toàn bộ tập thay đổi đã tích lũy, bao gồm cả đánh giá cục
bộ AI Diff Reviewer bắt buộc, xác thực trạng thái cuối cùng của repository,
đối chiếu các skill mà các tác vụ đã sử dụng, và ghi lại bằng chứng cùng các
giới hạn. Skill đánh giá cục bộ được cài đặt ở một phiên bản cố định; lệnh
được ghi lại hiện tại cài đặt `https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.9`. GitHub
Action là một bề mặt CI riêng biệt, tùy chọn, và không bao giờ là bắt buộc đối
với phương pháp luận cốt lõi.

Một lượt đánh giá đã chạy và không báo gì không giống với một lượt đánh giá chưa từng tạo ra phát hiện nào. Trường hợp thứ hai là một **lượt đánh giá dở dang**: nó được ghi nhận đúng như vậy, không bao giờ được tính là bằng chứng rằng tập thay đổi đã sạch, và không bao giờ là lý do để khép lại Final Review — cùng xử lý màu đỏ mà một lượt đánh giá `timeout` nhận dưới mức nghiêm ngặt có tính chặn (BC-04). Cùng với trình đánh giá vắng mặt và lời gọi bị lỗi, đó là ba trạng thái khác nhau — và không trạng thái nào nghĩa là bản diff đã được đánh giá và sạch. Nội dung nói `Recommendation: approve` cũng không phải bằng chứng check đã đạt. Hãy đọc trước khối Highest severity / Strictness gate / Check status trên dấu theo dõi — runtime viết lại `approve` của mô hình khi cổng đang thất bại.

Thực thi không giám sát chỉ được hỗ trợ cho một kế hoạch đã được phê duyệt
trước. Nó đòi hỏi lớp trạng thái mà máy có thể đọc được, một tiêu chuẩn DWP đã
khai báo, quyền hạn giới hạn, và các điều kiện dừng rõ ràng. Nếu một cổng thất
bại ngoài phạm vi sửa chữa đã lên kế hoạch, repository phân kỳ, hoặc cần một
sự phê duyệt hay thông tin xác thực mới, tác nhân sẽ ghi lại điểm chặn và
dừng lại. Không luồng nào làm suy yếu một cổng kiểm định để tuyên bố hoàn
thành.

## 3. Khởi tạo repository (có suy luận và không phá hủy)

Gọi sub-skill onboard (`/deepworkplan-onboard`). Suy luận về repo thực và thích ứng mọi thứ
cho nó. Với mỗi thành phần dưới đây, **nếu nó đã tồn tại, hãy đối chiếu nó** (hợp nhất, cải thiện, căn chỉnh theo
phương pháp luận) thay vì ghi đè — và xác nhận với người dùng trước khi thay thế bất cứ thứ gì.

1. **`AGENTS.md` + `CLAUDE.md`.** Tạo ra một `AGENTS.md` tại gốc — một chỉ mục, các quy tắc bắt buộc
   (chỉ tiếng Anh, conventional commit, mẫu test thật của repo và các cổng rà soát), và một khối Quick
   Commands với các lệnh **thật, chạy được** của repo. Nếu một `AGENTS.md` đã tồn tại, hãy hợp nhất
   vào nó thay vì thay thế nó. Tạo symlink `CLAUDE.md → AGENTS.md` (đừng ghi đè một
   `CLAUDE.md` hiện có mà không hỏi). Cũng tạo `.cursor → .agents` nếu chưa có.
2. **`docs/`.** Lấp đầy các hạng mục chuẩn bằng nội dung thật, riêng cho repo: `PRODUCT_SPEC.md` (tài liệu sản phẩm/lý do phi kỹ thuật — bắt buộc cho mọi repo, kể cả thư viện), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md` (không bao giờ
   bị bỏ qua — mọi repository đều có một tư thế bảo mật, ngay cả khi không có bí mật nào),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, cùng `PERFORMANCE.md` và một chỉ mục `docs/README.md`.
   Nếu tài liệu đã tồn tại, hãy tích hợp và mở rộng chúng — đừng nhân bản.
3. **Tài liệu cho từng mô-đun.** Thêm một `README.md` (và một thư mục con `docs/` cho các mô-đun phức tạp) bên trong mỗi
   mô-đun nguồn chính được phát hiện trong quá trình trinh sát.
4. **`.agents/` + `.claude → .agents` + `.cursor → .agents`.** Tạo ngôi nhà chuẩn, xuyên agent: một catalog **được suy luận**
   gồm `agents/`, `skills/` phù hợp với stack, và các `commands/` `dwp-*` mỏng ủy thác tới skill
   đã cài — mỗi mục đều được biện minh cho *chính* repository này, không sao chép từ repo khác. Thêm một
   catalog `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) khớp với những gì có trên
   đĩa, cùng `settings.json`, và các symlink `.claude → .agents` cùng `.cursor → .agents`. Gộp bất kỳ skill/agent hiện có nào
   vào catalog.
5. **Skill DWP, đã thích ứng.** Skill đã cài là động cơ; bộ kit của riêng repository
   (skill, agent, command) phải **được suy luận cho repo này** — không bao giờ là một bản sao chép-dán bộ kit của repo
   khác.
6. **`.dwp/` + `tmp/`.** Dựng một `.dwp/` được gitignore với `plans/`, cùng một không gian nháp
   `tmp/` — cả hai đều được thêm vào `.gitignore` một cách không phá hủy (nối thêm, không bao giờ viết lại). Hai nơi này không thể thay cho nhau: mọi thứ một luồng tạo ra **về một kế hoạch** — bản phân tích, sổ ghi skills, bản rà soát bảo mật, nhật ký cổng kiểm, báo cáo kiểm toán — đều phải nằm trong `.dwp/plans/PLAN_001_<slug>/analysis_results/` của chính kế hoạch đó, không đặt ở gốc kho và không đặt trong `tmp/`. `tmp/` dành cho phần việc mà không kế hoạch nào đọc lại.

Các kế hoạch mới nhận ID số tăng đơn điệu, có ít nhất ba chữ số (ví dụ `PLAN_001_add_payment_webhooks/`). Schema v5 đã cố định tính ID số là một từ, nên slug v5 có 2–4 từ; slug v6 và v7 có 2–5 từ. Các thư mục cũ không đánh số `PLAN_<slug>/` vẫn đọc được và không bao giờ bị đổi tên. Khi có kế hoạch được đánh số, `latest` trỏ đến kế hoạch có ID số cao nhất.

## 4. Cài đặt — hoặc nâng cấp — đánh giá cục bộ và các addon

Sau khi khởi tạo nền tảng, skill Deep Work Plan và đánh giá cục bộ AI Diff Reviewer bắt buộc đã có mặt
trong **mọi** repository. Các addon khác thì không: mỗi addon chỉ thuộc về những repository mà nó phù hợp.
Phần này **phát hiện mọi addon, nâng cấp những addon bạn đang dùng và đề xuất những addon phù hợp** —
nó không bao giờ thêm một addon chỉ để cho đủ bộ. Chạy phần này theo cùng một cách trên một repository
mới và trên một repository đã được khởi tạo từ nhiều tháng trước: nó **idempotent**. Với mỗi thành phần,
hãy phát hiện những gì đã được cài và phiên bản của nó, rồi rẽ nhánh:

- **Chưa có** — đánh giá cục bộ bắt buộc được cài dưới sự chấp thuận của quá trình khởi tạo. Một addon
  tùy chọn chỉ được **đề xuất** khi nó phù hợp với repository này, và chỉ được cài khi nhà phát triển chấp nhận.
- **Đã cài, cũ hơn bản ghim** — nếu nó vẫn phù hợp, nâng cấp nó **tại chỗ** bằng cùng lệnh đã ghim (mỗi
  trình cài đặt thay thế các tệp của riêng nó và giữ nguyên cấu hình, phiên đăng nhập và dữ liệu của người
  dùng). Nói rõ những gì sẽ thay đổi trước khi chạy. Nếu nó không còn phù hợp, hãy nói rõ điều đó và để
  nhà phát triển quyết định.
- **Đã cài ở bản ghim, hoặc mới hơn** — không thay đổi gì.

Ghi lại mọi lần chấp nhận hoặc từ chối trong `.dwp/config.json`; một addon đã bị từ chối sẽ không được đề xuất lại
trừ khi nhà phát triển yêu cầu. Chạy phần này lần thứ hai không thay đổi gì.

| Thành phần | Phát hiện phiên bản đã cài | Cài đặt hoặc nâng cấp (đã ghim) |
| --- | --- | --- |
| AI Diff Reviewer (bắt buộc) | `version:` trong `.agents/skills/ai-diff-reviewer/SKILL.md` | `npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.9 --skill ai-diff-reviewer --force -y` |
| Dailybot | `version:` trong `.agents/skills/dailybot/SKILL.md` | `npx --yes skills add https://github.com/DailybotHQ/agent-skill/tree/v3.23.12 --skill dailybot --force -y` |
| agentkit | `ak --version` | `git clone --branch v0.5.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh` |
| Herdr | `scripts/herdr-peers --version` trong skill herdr-peers đã cài | `npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.2.1 --skill herdr-peers -g --force -y` |
| devcontainer | `dck --version` | `git clone --branch v0.3.0 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh` |
| DeepWorkPlan Vim | `git -C ~/.config/nvim describe --tags` | trình cài đặt đã xác minh tại https://deepworkplan.com/vim/install.sh (nó ghim `v0.7.0`; tải xuống, `shasum -a 256 -c install.sh.sha256`, rồi chạy) |

Xác minh mỗi bản tải xuống với `SHA256SUMS` của bản phát hành tương ứng và digest trong *Bản phát hành được ghim* ở trên
trước khi chạy nó.

**Đánh giá cục bộ bắt buộc.** Cài **đánh giá cục bộ AI Diff Reviewer** (Giai đoạn 7a — bắt buộc
kể từ chuẩn 2.3.0): skill được ghim theo tag ở trên cùng một `.review/extension.md` được điều chỉnh riêng cho repo qua
`generate-extension`, dưới sự chấp thuận của quá trình khởi tạo.

**Các addon tùy chọn.** Liệt kê bảy addon tùy chọn (devcontainer, Dailybot, dependency
upgrade, design system, agentkit, Herdr, DeepWorkPlan Vim) và đề xuất mỗi cái như một lựa chọn tự nguyện rõ ràng. Một
repository hoàn toàn tuân thủ với **không** addon tùy chọn nào — đừng bao giờ tự động cài chúng.

- **Hỗ trợ devcontainer** — một lớp tích hợp mỏng cho [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, ghim ở `v0.3.0`, cùng skill `dck-dockerfile` của nó): `dck init` tạo container riêng của repository — image chính thức ghim theo digest, không có base image dùng chung, `bash dev.sh up` — và chỉ đối chiếu một devcontainer có sẵn sau khi diff của nó được chấp nhận. Khi được chấp nhận, hãy làm theo *Lộ trình devcontainer* bên dưới cho đến toàn bộ stack.
- **Tích hợp Dailybot** — bốn sự kiện vòng đời (kickoff, tác vụ quan trọng, bị chặn, hoàn tất) dưới dạng báo cáo tiến độ theo nỗ lực tối đa cho các đội đã dùng Dailybot, với lớp hook tự hành tùy chọn (`dailybot-cli >= 3.9.0`). Cài skill agent Dailybot đi kèm (3.23.12) cũng mở ra chat, check-in, tạo biểu mẫu, hỏi AI, board và tác vụ Plan, API key theo repo và nhiều hơn — addon chỉ đấu nối phần báo cáo vào quá trình thực thi DWP. Phương pháp luận lõi không có phụ thuộc nào vào Dailybot.
- **Nâng cấp phụ thuộc** — nâng cấp độc lập với trình quản lý gói, theo lô, được kiểm chứng, hoàn nguyên được. Khi
  được chấp nhận, nó cài command `/lib-upgrade`.
- **Design system** — `docs/DESIGN.md` tự nguyện dành cho các repo có bề mặt giao diện được phát hiện
  (không đề xuất cho thư viện thuần, dịch vụ headless hay repo chỉ hạ tầng). Ba profile xếp chồng trong
  một tệp: visual-ui (được khuyến nghị mạnh mẽ khi phát hiện; cài đặt kiểm soát bằng sự chấp nhận), cli-output và hội thoại — hai profile sau
  luôn được hỏi, không bao giờ tự động áp dụng.
- **agentkit** — bản cài đặt cấp máy của [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, ghim ở `v0.5.0`): một lệnh cho mọi coding agent, một tài khoản cho mỗi hồ sơ, `ak usage` và `ak pick` để chọn tài khoản còn nhiều chỗ nhất, và `ak run` headless cho các kế hoạch giao những tác vụ `parallel_safe` có giới hạn cho coding agent khác (mỗi worktree một bên được ủy thác). Bộ kit khởi chạy agent ở chế độ tự chủ theo mặc định và lựa chọn opt-out của nó (`--ask` hoặc `AGENTKIT_PERMISSIONS=ask`) luôn được ưu tiên.
- **Herdr** — bản cài đặt cấp máy của [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (ghim ở `v0.2.1`, cùng skill chính thức của Herdr) cho các kế hoạch yêu cầu một agent ngang hàng trong một pane Herdr, trên bất kỳ máy nào, gửi một phản hồi được ủy quyền, và cho một lead theo dõi các lane của mình.
- **DeepWorkPlan Vim** — trình soạn thảo terminal ([deepworkplan-vim](https://github.com/DailybotHQ/deepworkplan-vim), ghim ở `v0.7.0`), một bản cài đặt cấp máy không bao giờ ghi đè cấu hình Neovim có sẵn khi chưa có sự đồng ý rõ ràng.
- **AI Diff Reviewer** — đánh giá cục bộ bắt buộc (không phải tùy chọn): bước rà soát bảo mật của mọi
  Final Review chạy [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) **v3** (skill +
  `.review/extension.md` bắt buộc) trên toàn bộ tập thay đổi đã tích lũy của kế hoạch. Một skill hoặc
  tiện ích mở rộng bị thiếu là một phát hiện `local reviewer not installed` được ghi lại — không bao giờ là một lần bỏ qua âm thầm,
  và không bao giờ là một bootstrap bất ngờ: việc cài đặt thuộc về sự chấp thuận
  của onboarding hoặc một lời gọi addon rõ ràng; lỗi gọi chỉ thất bại
  nhẹ; kết quả **nghiêm trọng đã xác minh** từ một lượt hoàn tất vẫn chặn việc hoàn thành (v3, BC-07 — các xác nhận nghiêm trọng chưa xác minh xuất hiện dưới dạng cảnh báo có chú thích, và một lượt đánh giá `incomplete`/`timeout` không phải là một lượt sạch, BC-04). **Flow B** (cổng CI với
  `pr-review.yml`) được đề xuất như một lựa chọn tự nguyện rõ ràng và không bao giờ được cài khi chưa
  được yêu cầu. Không luồng Deep Work Plan nào yêu cầu một dịch vụ thương mại, nhà cung cấp CI hay bí mật.

### Lộ trình devcontainer (khi được chấp nhận)

Addon devcontainer kết thúc bằng một stack hoạt động được, không phải một bộ tệp vừa được tạo. Với sự chấp thuận
của nhà phát triển ở mỗi bước:

1. **Tạo tệp.** `dck init` ghi `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`,
   `docker/local/docker-compose.yaml` và `dev.sh`, trình bày kế hoạch trước và hỏi trước khi
   thay đổi bất kỳ tệp có sẵn nào.
2. **Chọn các lớp trong `.devcontainer/dck.toml`.** Chỉ bật `[layers] agents` nếu nhà phát triển
   muốn có coding agent bên trong, và chỉ liệt kê **những CLI mà họ chọn** trong `[agents] clis` (ví dụ
   `["claude", "codex"]`); không cài gì khác. `editor` thêm DeepWorkPlan Vim.
3. **Đấu nối Herdr.** `[herdr] machine = true` đăng ký container như một máy Herdr và
   `layout = "standard"` mở nó với thanh bên tiêu chuẩn — App · Editor · Development · Agents —
   mọi pane đều ở đường dẫn ứng dụng (mặc định là `/app`). Mạng lưới cho phép các agent bên trong kết nối tới các agent trên
   máy host và trong các container khác.
4. **Tài khoản host (tự nguyện, do nhà phát triển quyết định).** Trong **hồ sơ host** của nhà phát triển
   (`~/.config/dck/profile.toml`), không bao giờ trong `dck.toml` của repository, `[agents] host_profiles = true`
   cho phép container dùng các tài khoản trên máy host của những CLI mà repository cài — Claude qua
   `CLAUDE_CODE_OAUTH_TOKEN` (`@default`) hoặc `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` (`@name`), Codex
   qua tệp xác thực của nó — chỉ đọc, với `host_env_keys` là danh sách cho phép các tên biến bổ sung.
   Đừng bao giờ bật tùy chọn này thay cho nhà phát triển, và đừng bao giờ in ra một token.
5. **Khởi động.** `bash dev.sh up` build, khởi động và đăng ký container.
6. **Kiểm tra.** Mỗi mục là một lệnh:
   - [ ] `dck doctor --json` báo cáo bố cục vendored là `current`.
   - [ ] `bash dev.sh ps` cho thấy service đang chạy; `dck herdr status` cho thấy máy đã được gắn.
   - [ ] `bash dev.sh shell -c 'ak doctor'` liệt kê đúng các CLI trong `[agents] clis` (chỉ với lớp agents).
   - [ ] `bash dev.sh agents` liệt kê các peer trên máy host và trong các container khác.
   - [ ] `bash dev.sh shell -c 'ssh-add -l'` hiển thị các khóa của agent trên máy host; không có tệp khóa nào bên trong.
   - [ ] Máy đã gắn mở ra với App · Editor · Development · Agents trong `/app`.

## Điều phối: nhiều agent, lane và lần chạy không người giám sát

Công việc rộng hơn một phiên chạy dưới dạng một **lead** và các **lane** của nó — xem
https://deepworkplan.com/methodology/06-orchestration.md. Khi nhà phát triển yêu cầu và các addon
agentkit và Herdr đã được cài:

- **Một lane cho mỗi repository**, trên bản checkout gốc của nó, với một nhánh, một pull request và một
  bản phát hành. Chỉ dùng git worktree khi hai bên ghi phải dùng chung một repository. Các bản phát hành đi theo
  thứ tự phụ thuộc, và lead trao GO cho từng lane.
- **Tài khoản theo hạn mức còn lại.** `ak profiles --json` liệt kê các tài khoản; `ak usage` hiển thị hạn mức của chúng
  một lần cho mỗi đợt; `ak pick <kind> --count N` trả về các tài khoản còn nhiều chỗ nhất. Chỉ dùng
  tài khoản của chính nhà phát triển, trong phạm vi điều khoản của từng nhà cung cấp.
- **Chuẩn bị một lần.** Xác nhận bypass-permissions của Claude Code là bước một lần, theo từng hồ sơ,
  do **nhà phát triển** thực hiện khi hồ sơ được tạo (trong một container devcontainer-kit, kit chỉ
  ghi nó vào các thư mục home riêng của container). Không bao giờ gửi phím cho bước này.
- **Khởi chạy.** `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` khởi chạy một lane trong thư mục
  riêng của nó; `--trust-cwd` tin cậy trước thư mục đó, nên không có màn hình tin cậy thư mục nào xuất hiện.
  Khi nhà phát triển đã cho phép vận hành không người giám sát, mỗi lần khởi chạy không cần thêm phê duyệt nào.
- **Phối hợp.** `herdr-peers ask` và `herdr-peers reply`: mỗi ask một reply được ủy quyền, độ sâu một,
  reply là dữ liệu và không cấp thêm gì.
- **Theo dõi.** `herdr-peers lanes` hiển thị trạng thái của mọi lane; với một lane bị chặn,
  `herdr-peers status <pane>` phân loại màn hình và `herdr pane read <pane>` hiển thị nó.
- **Một lần gõ phím, một trường hợp.** Những phím duy nhất bạn được gửi bằng `herdr pane send-keys` là
  câu trả lời cho màn hình tin cậy thư mục, trên một pane do chính bạn khởi chạy, khi không dùng được
  `--trust-cwd`. Đọc màn hình trước và sau, và gửi ít phím nhất.
- **Đọc, ghi lại và chuyển mọi thứ khác lên** nhà phát triển: xác nhận bypass-permissions của Claude,
  lời nhắc đăng nhập và thông tin xác thực, yêu cầu cấp quyền theo từng hành động, xác nhận mang tính
  phá hủy, lời nhắc thanh toán hoặc gói dịch vụ, màn hình không xác định và các pane bạn không tạo. Với
  `AGENTKIT_PERMISSIONS=ask`, các lane hỏi trước khi hành động; không bao giờ lách qua những lời nhắc
  đó. Ghi lại mọi lần can thiệp trong kế hoạch cha.

## 5. Phát triển bộ kit (sub-skill author)

Dùng sub-skill `author` để nuôi lớn bộ kit của riêng repository sau khi khởi tạo. Các bộ ủy thác mỏng `/skill-create` và
`/agent-create` định tuyến tới nó. Tạo một **skill** cho một quy trình lặp lại trong phiên, một **agent** cho
một vai trò lặp lại với hạng mô hình và công cụ riêng, và một **command** chỉ như một bộ ủy thác mỏng. Giữ
catalog `.agents/docs/` đồng bộ với những gì có trên đĩa.

## 6. Lập kế hoạch và thực thi

Sinh các Deep Work Plan cho mọi tác vụ và chạy chúng từng tác vụ một:

- `/dwp-create <mục tiêu>` — biến một mục tiêu thành kế hoạch thực thi được. Kể từ chuẩn 2.4.0, một kế hoạch có hai định dạng: **Lite**, với bản ghi công việc nằm nội tuyến trong README của kế hoạch, dành cho công việc nhỏ và có giới hạn rõ; và **Full**, mỗi công việc một tệp, dành cho công việc dài hơi. Cả hai mang cùng một hợp đồng — id công việc ổn định, bề mặt bị chạm tới, tiêu chí chấp nhận, cổng xác thực, bằng chứng hoàn thành và một Final Review — nên Lite chỉ rẻ hơn về biểu diễn chứ không yếu hơn. Thêm `lite` hoặc `full` để ép định dạng và `trust` để hiện thực hóa mà không cần vòng đánh giá; nếu không nêu ưu tiên, DWP sẽ đề xuất một định dạng và giải thích lý do. Kế hoạch Lite được nâng cấp bằng `/dwp-refine promote`.
- `/dwp-execute` — thực thi kế hoạch từng tác vụ một, cập nhật tiến độ và kiểm chứng mỗi cổng.
- `/dwp-status` — báo cáo tiến độ mà không thay đổi gì.
- `/dwp-refine` — thêm, bớt hoặc sắp xếp lại các tác vụ trong khi giữ nguyên công việc đã hoàn tất.
- `/dwp-resume` — tái dựng trạng thái và tiếp tục một kế hoạch bị gián đoạn.
- `/dwp-verify` — báo cáo tuân thủ đạt/không đạt khách quan cho repo (hoặc một kế hoạch cụ thể).

Mỗi kế hoạch khép lại bằng Final Review — một bước rà soát bảo mật trên các thay đổi của
chính kế hoạch (giữ `docs/SECURITY.md` luôn cập nhật; một phát hiện nghiêm trọng chặn việc hoàn tất),
kiểm chứng trạng thái cuối cùng và đối chiếu skill. Executive Report vẫn được cung cấp theo yêu cầu.

## 7. Kiểm chứng

Chạy `/dwp-verify` để có một báo cáo tuân thủ đạt/không đạt khách quan (hoặc
`bash {skill_dir}/verify/conformance.sh` cho lớp cơ học tương thích CI, thoát `0`/`1`, và `2` với phán quyết `UNVERIFIED` rõ ràng khi không thể chạy các bước kiểm tra — nó không bao giờ báo cáo một kết quả đậu mà nó chưa kiểm tra).
Nó kiểm tra các tiêu chí trong [tài liệu Tuân thủ của đặc tả](https://deepworkplan.com/spec).
Rồi xác nhận:

- [ ] Skill đã được cài và phân giải được, với cả chín sub-skill sẵn sàng.
- [ ] `AGENTS.md` tồn tại ở gốc với khối Quick Commands thực sự và các nguyên tắc làm việc nội tuyến bao quát mười hành vi; `CLAUDE.md` trỏ tới nó.
- [ ] `docs/` chứa các hạng mục chuẩn với nội dung thật, riêng cho repo; `docs/TESTING_GUIDE.md`
      mô tả thiết lập test/lint thật (không trống hay chỉ là stub); các mô-đun chính có một
      `README.md`.
- [ ] `.agents/` tồn tại với `agents/`, `commands/` (các bộ ủy thác `dwp-*` mỏng tham chiếu đến skill,
      không phải luồng sao chép), `skills/`, và một catalog khớp với thực tế trên đĩa;
      `.claude → .agents` và `.cursor → .agents` phân giải được.
- [ ] `.dwp/` tồn tại, được gitignore, và có `plans/`; `tmp/` tồn tại và được gitignore.
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

## Bước tiếp theo

- [Đọc phương pháp luận](/methodology)
- [Đặc tả](/spec)
- [Duyệt bộ kit](/kit)
- [Xem ví dụ](/examples)
- [Tùy chọn: trình soạn thảo terminal DeepWorkPlan Vim](/kit/vim)
- [Chạy nhiều agent](/methodology/06-orchestration)
