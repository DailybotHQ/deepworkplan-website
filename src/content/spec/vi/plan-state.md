---
title: Trạng thái kế hoạch
description: "Lớp trạng thái kế hoạch có thể đọc bằng máy: manifest.json và state.json, bản ghi cổng, bản ghi kết quả là bộ nhớ theo sự kiện, điều hòa, và khi nào lớp này là bắt buộc."
order: 8
lang: vi
section: State
---

# Trạng thái kế hoạch

**Phiên bản 1.1. Trạng thái: Ổn định.** Tài liệu này đặc tả lớp trạng thái kế hoạch có thể đọc bằng máy của phương pháp luận Deep Work Plan. Các từ khóa MUST, MUST NOT, SHOULD, SHOULD NOT và MAY được diễn giải như mô tả trong RFC 2119.

Hai thành phần JSON — `manifest.json` (danh tính tĩnh của kế hoạch) và `state.json` (trạng thái thực thi trực tiếp theo tác vụ bao gồm kết quả cổng kiểm chứng) — mà mọi kế hoạch CÓ THỂ (MAY) mang theo bên cạnh các tệp markdown, và mà thực thi không có giám sát (xem [Giao thức agent](/spec/agent-protocol#execution-profiles)) và các không gian làm việc không có git (xem [Các kiểu hình](/spec/archetypes) §3) PHẢI (MUST) mang theo.

Kế hoạch markdown vẫn là **nguồn chân lý mà con người đọc được**. Lớp JSON là một **phép chiếu dẫn xuất**: nó được agent tái tạo tại các điểm giao thức xác định, không bao giờ được chỉnh tay, và không bao giờ được phép ngầm bất đồng với markdown. Mục đích của nó là khả năng tương thao — lint, kiểm tra tính tuân thủ, diff, dashboard, khám phá registry và đồng bộ hóa với hạ tầng phiên bên ngoài — không cái nào trong số đó có thể xây dựng đáng tin cậy trên văn xuôi.

## Lý do tồn tại

Qua v1.1, các kế hoạch chỉ là markdown văn xuôi. Điều đó giữ cho chúng có thể kiểm tra và độc lập với agent, nhưng không để lại thứ gì một công cụ có thể kiểm tra, diff, hay tiêu thụ: không có cổng tuân thủ, không phát hiện desync giữa `README.md` và `PROGRESS.md`, không có cách để một daemon hay cloud session biết trạng thái của một kế hoạch mà không phải phân tích văn xuôi. v1.2 thêm phép chiếu JSON mà không hạ cấp markdown — phép chiếu được dẫn xuất từ markdown, theo cách tương tự một lockfile được dẫn xuất từ manifest.

## Vị trí đặt

Một kế hoạch sử dụng lớp trạng thái có bố cục sau:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← nguồn chân lý mà con người đọc (không thay đổi)
├── PROGRESS.md          ← nhật ký tường thuật (không thay đổi)
├── PROMPTS.md           ← không thay đổi
├── manifest.json        ← danh tính tĩnh (được ghi tại lúc vật liệu hóa)
├── state.json           ← trạng thái trực tiếp (được ghi lại tại các điểm giao thức)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` PHẢI được ghi đúng một lần, khi luồng `create` vật liệu hóa kế hoạch, và KHÔNG ĐƯỢC thay đổi sau đó trừ khi có một lần di chuyển phiên bản spec được ghi lại trong `PROGRESS.md`.

`state.json` PHẢI được agent ghi lại tại mỗi điểm giao thức sau: vật liệu hóa kế hoạch (tất cả tác vụ `pending`), khởi đầu tác vụ (`in_progress`), mỗi lần chạy cổng kiểm chứng (bản ghi cổng được thêm hoặc cập nhật), và hoàn tất tác vụ (`completed`, như một phần của giao thức hoàn tất tác vụ trong [Đặc tả DWP](/spec/dwp-specification#task-completion-protocol)).

Cả hai tệp PHẢI được ghi nguyên tử: ghi vào một tệp tạm thời trong cùng thư mục, sau đó đổi tên đè lên đích. Một lần ghi bị lỗi KHÔNG ĐƯỢC để lại một tệp JSON bị cắt bớt.

## Khi nào lớp là bắt buộc

- Đối với thực thi **tương tác** trong một git repository, lớp trạng thái ĐƯỢC KHUYẾN NGHỊ (RECOMMENDED) cho các kế hoạch mới và TÙY CHỌN (OPTIONAL) cho các kế hoạch trước v1.2. Một kế hoạch không có nó vẫn tuân thủ.
- Đối với thực thi **không có giám sát**, lớp trạng thái là BẮT BUỘC (REQUIRED).
- Trong một **không gian làm việc agent** không có git, lớp trạng thái là BẮT BUỘC: `state.json` mang thông tin phục hồi mà git log mang trong một repository.

## `manifest.json` — danh tính kế hoạch

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count` và `plan_format` là BẮT BUỘC (REQUIRED).

`archetype` PHẢI là một trong `individual`, `orchestrator-hub`, `agent-workspace`.

`rigor` PHẢI là một trong `micro`, `standard`, `deep` (xem [Tỷ lệ rigor](/spec/dwp-specification#proportional-rigor)).

`plan_format` PHẢI (MUST) là một trong `lite`, `full` — biểu diễn được chọn lúc tạo (xem [Kế hoạch Lite](/spec/lite-plans)). Nó không thể thay đổi ở cấp manifest: một lần nâng cấp sau đó từ Lite lên Full được ghi lại trong `state.json`, không bao giờ bằng cách ghi đè lên manifest.

`parent_plan` liên kết một kế hoạch con với kế hoạch điều phối của nó (`{repo}:{plan_name}`, hoặc `null`).

`created_by` NÊN (SHOULD) xác định agent tạo và mô hình. Nó KHÔNG ĐƯỢC chứa bí mật, token, hay định danh người dùng ngoài tên hiển thị.

## `state.json` — trạng thái thực thi trực tiếp

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Các mục nhập tác vụ của một kế hoạch Lite dùng một `locator` kiểu `inline` trỏ đến neo của tác vụ trong `README.md` thay vì một tệp riêng biệt — mọi thứ khác về mục nhập (gates, outcome, status) hoạt động theo cùng một cách:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Định dạng, vật liệu hóa, phê duyệt và nâng cấp

`format` PHẢI (MUST) là một trong `lite`, `full` và phản ánh `plan_format` của manifest — có thể thay đổi ở đây, khác với manifest, vì một kế hoạch Lite CÓ THỂ (MAY) sau đó nâng cấp lên Full. `materialization` PHẢI (MUST) là một trong `materializing` (thư mục kế hoạch đang được ghi), `ready` (quá trình vật liệu hóa đã hoàn tất), hoặc `promoting` (một lần nâng cấp từ Lite lên Full đang diễn ra). `approval` PHẢI (MUST) là một trong `pending`, `approved`, `pre_approved`; nó là TÙY CHỌN (OPTIONAL) trong schema này để một kế hoạch được viết trước khi trường này được ghi nhận vẫn hợp lệ — khi vắng mặt, coi hàng `Approval` của README là giá trị, và `pending` khi cả hai đều không có mặt. `promotion` là `null` bên ngoài một lần nâng cấp, hoặc một đối tượng ghi lại ý định và các tác vụ đích của việc nâng cấp trong khi `materialization` là `promoting`. Xem [Kế hoạch Lite](/spec/lite-plans) để biết toàn bộ vòng đời mà các trường này mã hóa.

### Các mục nhập tác vụ

Mỗi tác vụ — một tệp riêng biệt trong một kế hoạch Full, hoặc một bản ghi `{#task-N}` nội tuyến trong một kế hoạch Lite — PHẢI (MUST) có đúng một mục nhập trong `tasks`, được đánh khóa bằng số của nó (`id`) và `locator` của nó. `locator.kind` PHẢI (MUST) là `file` (Full — `value` là tên tệp của tác vụ) hoặc `inline` (Lite — `value` là neo của tác vụ, `#task-N`).

`status` PHẢI là một trong `pending`, `in_progress`, `completed`, `blocked`, `skipped`. `skipped` chỉ hợp lệ khi người dùng đã loại bỏ rõ ràng tác vụ khỏi phạm vi qua `refine`; `state.json` KHÔNG ĐƯỢC dùng để bỏ qua công việc một cách lặng lẽ.

Một mục nhập `completed` PHẢI mang `completed_at` và, nơi kế hoạch commit, băm `commit` ngắn — đây là liên kết truy xuất nguồn gốc từ kế hoạch tới mã.

### Bản ghi cổng

Mỗi lần chạy một lệnh kiểm chứng NÊN được ghi lại dưới dạng bản ghi cổng: `command`, `passes` (boolean), `exit_code`, `last_run`, và một chuỗi `evidence` ngắn có thể đọc được bởi con người (một dòng tóm tắt hoặc một đường dẫn dưới `analysis_results/`, không bao giờ là đầu ra lệnh đầy đủ).

Một tác vụ KHÔNG ĐƯỢC đánh dấu `completed` trong `state.json` trong khi bất kỳ bản ghi cổng nào của nó có `passes: false` mà không có lần chạy đạt sau đó. Các bản ghi cổng là tương đương máy của "không bao giờ đánh dấu hoàn tất mà không có bằng chứng" — mô hình của một cờ `passes` cho mỗi mục bảo vệ khỏi việc hoàn tất sớm.

### Bản ghi kết quả là bộ nhớ theo sự kiện

Một tác vụ `completed` NÊN mang một bản ghi `outcome`: những gì đã `tried`, những gì đã `failed`, những gì đã `worked`, và `notes` tự do. Giữ mỗi mục một dòng.

Các bản ghi kết quả biến một kế hoạch đã hoàn tất thành **bộ nhớ theo sự kiện** có thể truy xuất: một agent (hay một nền tảng lập chỉ mục bộ nhớ) có thể về sau nhớ lại cách một vấn đề được giải quyết, không chỉ là nó đã được giải quyết. Chúng nuôi các quyết định về skill ngay trong tác vụ và bước đối chiếu skill của Final Review, vốn đọc chúng khi khai thác các mô hình. Trên các nền tảng như Hermes lập chỉ mục bộ nhớ agent, các bản ghi kết quả trong `state.json` làm cho các kế hoạch đã hoàn tất trực tiếp có thể truy xuất qua các phiên tương lai.

### Điểm kiểm tra và trạng thái bị chặn

`checkpoint` ghi lại điểm tiếp tục chi tiết nhất bên trong tác vụ hiện tại: `id` tác vụ, bộ định vị `step` tự do, dấu thời gian, và một ghi chú một dòng. Một agent NÊN cập nhật nó mỗi khi nó tạm dừng bên trong một tác vụ; nó PHẢI cập nhật nó trước bất kỳ gián đoạn có kế hoạch nào trong chế độ không có giám sát.

`blocked` là `null` hoặc `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`. Một agent không có giám sát gặp phải điều kiện dừng PHẢI điền vào `blocked` trước khi dừng — đây là cách nhịp tim tiếp theo của daemon, hoặc một con người, biết tại sao kế hoạch dừng lại.

## Phép chiếu và điều hòa

Markdown PHẢI thắng mọi bất đồng. Nếu `state.json` nói tác vụ 4 là `completed` nhưng README kế hoạch hiển thị một ô trống, tệp trạng thái đã lỗi thời.

Một agent tiếp tục PHẢI so sánh danh sách ô chọn README với `state.json` trước khi tiếp tục. Khi desync, nó PHẢI tái tạo `state.json` từ markdown (và git log, nơi có sẵn), ghi lại sự điều hòa trong `PROGRESS.md`, và chỉ sau đó tiếp tục.

Sub-skill `verify` PHẢI coi desync là một phát hiện tuân thủ: báo cáo tác vụ nào bất đồng và theo hướng nào.

Các công cụ khác ngoài agent thực thi PHẢI coi cả hai tệp JSON là chỉ đọc.

## Phiên bản hóa schema

Cả hai schema đều được phiên bản hóa theo URL. Các trường bổ sung được phép trong một phiên bản; đổi tên hoặc thay đổi kiểu của một trường đòi hỏi một phiên bản schema mới và một ghi chú di chuyển trong changelog của spec. Bản sửa đổi này giới thiệu `/v2.json` cho cả hai schema: trường `file` của mục nhập tác vụ trở thành một `locator` có kiểu (`{"kind": "file" | "inline", "value": ...}`), manifest có thêm `plan_format`, và tệp trạng thái có thêm `format`, `materialization`, `approval` và `promotion` — cùng nhau là các trường mà kế hoạch Lite cần (xem [Kế hoạch Lite](/spec/lite-plans)). Các manifest và tệp trạng thái `/v1.json` vẫn hợp lệ và không bao giờ bị âm thầm ghi lại thành v2; một phiên `refine` CÓ THỂ (MAY) di chuyển một cái nào đó một cách có chủ đích. Trường `spec_version` trong manifest cố định phiên bản spec DWP mà kế hoạch được tạo dưới đó; một agent gặp phải một kế hoạch mới hơn spec đã cài đặt của nó NÊN (SHOULD) nói rõ điều đó thay vì đoán.
