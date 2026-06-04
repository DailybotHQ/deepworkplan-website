---
title: Addon
description: "Các phần mở rộng tùy chọn cho phương pháp luận DWP lõi: skill, agent, preset, bộ chuyển đổi và ví dụ, cùng cách mỗi loại mở rộng quy trình mà không bắt buộc."
order: 5
lang: vi
section: Addons
---

# Addon

**Phiên bản 1.0.** Các addon là phần mở rộng tùy chọn cho phương pháp luận DWP lõi. Chúng không bắt buộc để tuân thủ nhưng cung cấp thêm năng lực.

## Skill

Skill là các quy trình tái sử dụng được gọi theo tên. Một skill đóng gói một quy trình lặp lại được (chạy test, sửa lint, tạo một component).

Phương pháp luận đi kèm một tập hợp nhỏ các sub-skill lõi. Trong số đó, sub-skill **author** cho phép một repository **nuôi lớn bộ kit của riêng nó**: được gọi qua `/skill-create` và `/agent-create`, nó suy luận về bố cục và quy ước `.agents/` hiện có của repository, rồi sáng tác một skill, agent, hay bộ ủy thác command mỏng phù hợp với chúng, và giữ catalog đồng bộ. Cùng sub-skill đó thực thi tác vụ Skills & Agents Discovery bắt buộc.

## Agent

Agent là các nhân công chuyên biệt với một vai trò xác định (người rà soát, người thực thi, kiến trúc sư).

## Các addon bảo trì

Các addon bảo trì là các phần mở rộng tự nguyện, không bao giờ bắt buộc để tuân thủ, giúp một repository tự bảo trì. Addon **dependency-upgrade** suy luận về trình quản lý gói thực tế của repository (thay vì giả định npm) và nâng cấp các phụ thuộc theo các lô nhỏ, được kiểm chứng, có thể hoàn nguyên: nó phát hiện trình quản lý từ manifest và lockfile thực, phân loại các nâng cấp theo semver, nâng cấp theo lô, chạy cổng kiểm chứng thực của repository sau mỗi lô, hoàn nguyên bất kỳ lô nào thất bại, và tóm tắt mà không tự động commit. Một addon chỉ được cài khi nó được chấp nhận trong quá trình khởi tạo.

## Preset

Preset thích ứng DWP với một stack công nghệ cụ thể (Django, React, Go).

## Bộ chuyển đổi

Bộ chuyển đổi ánh xạ các command DWP sang hệ thống lệnh của một agent cụ thể (Claude Code, Cursor, Codex).

## Ví dụ

Ví dụ minh họa DWP trong thực tế (so sánh trước/sau, kế hoạch mẫu, nghiên cứu tình huống).
