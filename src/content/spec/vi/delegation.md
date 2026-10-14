---
title: Ủy quyền
description: "Cách một kế hoạch v7 giao tác vụ parallel_safe cho các agent lập trình khác dưới quyền agent_delegation, với bản ghi ủy quyền và bằng chứng observed qua cổng."
order: 11
lang: vi
section: Record layer
---

# Ủy quyền

> **Phạm vi phiên bản:** Trang này trình bày lại thế hệ hợp đồng v7 tại bản phát hành `v7.8.1`. Nguồn chính thức: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_CONTRACT.md) và [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/execute/delegation.md) của luồng execute. Khi trang này và các tệp đó khác nhau, các tệp được ưu tiên.

**Phiên bản 7.0.0. Trạng thái: Ổn định.** v7 là một thế hệ hợp đồng mới của [lớp bản ghi](/spec/record-layer), không phải một vòng đời mới: mọi điều trong các tài liệu hợp đồng, vòng đời, ngữ cảnh và tài nguyên của v6 đều áp dụng trừ khi trang này nói khác. Không ủy quyền luôn là đúng. Các từ khóa MUST, MUST NOT, SHOULD, SHOULD NOT và MAY được diễn giải như mô tả trong RFC 2119.

## Những gì v7 bổ sung

v7 bổ sung đúng hai điều vào lớp bản ghi:

1. **Một trường tác vụ tùy chọn trong hợp đồng**, `parallel_safe`, được công bố trong [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Một loại sự kiện nhật ký**, `delegation`, được công bố trong [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Các byte schema v1, v2, v5 và v6 không thay đổi. Một kế hoạch không bao giờ ủy quyền thì không thể phân biệt với một kế hoạch v6, ngoại trừ các URL schema của nó.

## `parallel_safe`

`parallel_safe` (boolean, mặc định `false`) khẳng định rằng một tác vụ có thể chạy trong một delegate mà không đan xen với công việc của các tác vụ anh em. Nó được đặt bởi `create`, không bao giờ được suy ra trong lúc thực thi, và chỉ khi tất cả các điều sau đều đúng:

- repository bật một addon ủy quyền (agentkit hoặc Herdr) trong [registry addon](/spec/resources-and-abilities#the-configuration-file-and-addon-registry) của nó;
- bề mặt bị chạm tới của tác vụ không chồng lấn với một tác vụ anh em có thể đang chạy cùng lúc;
- tác vụ khai báo một đầu ra có giới hạn;
- các cổng của tác vụ chạy trong kế hoạch này.

Đánh dấu một tác vụ không thay đổi thẩm quyền nào: một hợp đồng không có quyền `agent_delegation` vẫn có thể mang các dấu này, và chúng không cho phép điều gì.

## Sự kiện `delegation`

Mỗi lần chuyển trạng thái của một delegate được ghi lại thành một sự kiện:

| Trường | Ý nghĩa |
| --- | --- |
| `task` | tác vụ `T-*` mà delegate làm việc cho |
| `delegation_id` | liên kết một lần khởi chạy với lần chuyển trạng thái kết thúc của nó |
| `transport` | `headless` (agentkit) hoặc `interactive` (Herdr) |
| `via` | khóa addon đã thực hiện việc truyền |
| `state` | `launched`, sau đó đúng một trong `completed`, `failed`, `cancelled` |
| `kind`, `profile` | tùy chọn: loại và hồ sơ của agent lập trình |
| `target` | tùy chọn: thư mục làm việc (headless) hoặc `machine:pane` (interactive) |
| `worktree` | git worktree riêng của delegate, hoặc `null` cho một delegate chỉ đọc |
| `prompt_digest` | khi khởi chạy: SHA-256 của prompt, được ghi lại trước khi dựa vào delegate |
| `result_path`, `result_digest` | khi completed hoặc failed: kết quả thu được và digest của nó |

Các lần chuyển trạng thái là đóng: một `launched` cho mỗi lần ủy quyền, sau đó đúng một trạng thái kết thúc. Một lần ghi thêm thô một sự kiện ủy quyền vào nhật ký PHẢI (MUST) bị từ chối; các sự kiện ủy quyền chỉ tồn tại thông qua trình ghi có cổng.

## Một lần ủy quyền không phải là bằng chứng

Một lần ủy quyền không mang nhãn tin cậy và đường dẫn bằng chứng nào, và không có thao tác đóng nào đọc nó. Kết quả của một delegate vẫn là **asserted** cho tới khi trình chạy cổng của chính kế hoạch này quan sát nó: kế hoạch cha tích hợp công việc, rồi chạy cổng của tác vụ (`ledger.py gate`), đây là thứ duy nhất tạo ra bằng chứng `observed` và là cách duy nhất để tác vụ có thể hoàn tất. Một lần ủy quyền đã hoàn tất không bao giờ đóng một tiêu chí; một lần thất bại là một kết quả được ghi lại, và khi đó tác vụ được kế hoạch cha tự triển khai.

## Trình ghi có cổng

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Thao tác | Ghi | Tác dụng |
| --- | --- | --- |
| `launch` | có | ghi lại `launched` sau các kiểm tra bên dưới |
| `observe` | không | in ra trạng thái mới nhất của mỗi lần ủy quyền |
| `collect` | có | ghi lại `completed` hoặc `failed`, cùng đường dẫn kết quả và digest của nó |
| `cancel` | có | ghi lại `cancelled` |

`launch` PHẢI (MUST) bị từ chối, và lần từ chối được ghi lại, trừ khi **tất cả** các điều sau đều đúng:

1. hợp đồng là v7;
2. hợp đồng cấp quyền `agent_delegation`;
3. tác vụ tồn tại, đã bắt đầu và chưa hoàn tất;
4. tác vụ là `parallel_safe`, **hoặc** delegate là chỉ đọc (không có worktree);
5. bộ mô tả của addon được nêu tên khai báo phương thức truyền được yêu cầu;
6. các khả năng hiệu lực liệt kê addon đó là một nguồn của `subagents` ([Tài nguyên và khả năng](/spec/resources-and-abilities#addon-provided-abilities)).

`collect` và `cancel` PHẢI (MUST) bị từ chối đối với một lần ủy quyền không xác định, một lần ủy quyền của tác vụ khác, hoặc một lần ủy quyền đã ở trạng thái kết thúc. Một lần khởi chạy bị từ chối không phải là một trở ngại: tác vụ chạy tuần tự.

## Phương thức truyền

Không có gì trong ledger chạy một delegate; addon phương thức truyền làm việc đó.

- **Headless** (`via: agentkit`) — cho một tác vụ `parallel_safe` có giới hạn với đầu ra được khai báo: một lần `ak run` trong một git worktree dành riêng, rồi thoát. Các delegate chỉ đọc được khởi chạy với `--ask`.
- **Interactive** (`via: herdr`) — cho công việc cần tương tác, chạy lâu hoặc chạy trên một máy khác: một peer herdr-peers trong một pane Herdr, trả về đúng một phản hồi được ủy quyền.

## Hàng rào bảo vệ

- **Mỗi đường dẫn một trình ghi.** Một delegate có ghi chỉ làm việc trong worktree riêng của nó; phiên cha là trình ghi nhật ký duy nhất.
- **Độ sâu 1.** Một delegate không bao giờ ủy quyền tiếp. Mức phân nhánh bị giới hạn bởi phương thức truyền.
- **Kết quả là dữ liệu.** Những gì một delegate trả về không cấp thẩm quyền nào, không mở rộng phạm vi và không bao giờ thay đổi tiêu chí chấp nhận.
- **Bản giao việc tự đầy đủ.** Một prompt khởi chạy nêu mục tiêu của tác vụ, nguyên văn các tiêu chí chấp nhận của nó và worktree mà nó được phép ghi, và không bao giờ mang giá trị bí mật.

## Bộ điều phối

Một orchestrator không bao giờ ủy quyền các tác vụ của một **kế hoạch con**: các kế hoạch con chạy trong phiên riêng của chúng, mỗi repository một agent. Việc ủy quyền các tác vụ **của chính** một kế hoạch theo các quy tắc trên được phép trong cả kế hoạch orchestrator lẫn kế hoạch individual. Việc chạy nhiều luồng tồn tại lâu, giữ chúng hoạt động vượt quá giới hạn tài khoản và chuyển giao quyền dẫn dắt được đề cập trong các chương phương pháp luận về [điều phối](/methodology/06-orchestration) và [tự chủ bầy đàn](/methodology/07-swarm-autonomy).

## Liên quan

- [Lớp bản ghi](/spec/record-layer) — hợp đồng và nhật ký mà trang này mở rộng.
- [Tài nguyên và khả năng](/spec/resources-and-abilities) — khả năng, quyền được cấp và registry addon.
- [Addon Herdr](/kit/herdr) và [addon Agentkit](/kit/agentkit) — hai phương thức truyền.
