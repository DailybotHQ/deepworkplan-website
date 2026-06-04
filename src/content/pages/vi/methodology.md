---
title: "Phương pháp luận Deep Work Plan"
description: "Năm chương từ tuyên ngôn tới các kiểu hình: nguyên tắc, vòng lặp lõi, mẫu, skill và các thích ứng đứng sau phương pháp luận Deep Work Plan."
lastUpdated: 2026-05-30
---

## Phương pháp luận Deep Work Plan

Deep Work Plan (DWP) là một phương pháp luận mở, độc lập với framework, để chạy công việc kỹ thuật tự chủ, có cấu trúc cùng các agent lập trình AI. Nó biến một mục tiêu mơ hồ thành một kế hoạch rà soát được mà agent có thể thực thi, tạm dừng, tiếp tục và báo cáo — mà không đánh mất ngữ cảnh.

DWP đứng trên hai trụ cột.

**Phát triển dựa trên đặc tả.** Thay vì coi một bản chép cuộc chat là nguồn chân lý, trước hết bạn viết ra *điều gì* phải đúng — mục tiêu, phạm vi, tiêu chí chấp nhận, và các bước kiểm tra chứng minh nó đã xong — và agent thực thi dựa trên đặc tả đó. Trong DWP, kế hoạch *chính là* đặc tả: kế hoạch → tác vụ nguyên tử → cổng kiểm chứng → hoàn tất. Viết đặc tả trước giúp giảm trôi dạt (agent được đo lường so với các tiêu chí được nêu), làm công việc kiểm chứng được (mỗi cổng hoặc đạt hoặc không đạt), và làm nó tiếp tục được (đặc tả sống lâu hơn bất kỳ phiên hay agent nào). Độc lập với công cụ và thuần repo, nó khác với các hệ thống dựa trên đặc tả bị ràng buộc vào công cụ như GitHub Spec Kit, Amazon Kiro và Tessl.

**Kỹ thuật harness — repository trở thành harness.** Một mô hình ngôn ngữ, tự thân nó, chỉ là một bộ dự đoán văn bản; thứ biến nó thành một kỹ sư đáng tin cậy là *harness* bao quanh nó — ngữ cảnh, công cụ, một vòng điều khiển, các hàng rào bảo vệ và trạng thái bền vững. Kỹ thuật harness là việc thiết kế khung giàn đó một cách có chủ đích. Lập trường của DWP là nó nên sống trong repository, không phải trong một công cụ: ngữ cảnh là `AGENTS.md` + `docs/`, công cụ là bộ kit `.agents/`, vòng điều khiển là kế hoạch, hàng rào bảo vệ là các cổng kiểm chứng, và trạng thái là `.dwp/` được gitignore. Vì mỗi phần là một tệp trong repo, harness có tính di động — nên mọi agent đều có thể điều khiển mọi repo.

Phương pháp luận được trình bày qua năm chương:

1. **Tuyên ngôn** — Deep Work Plan là gì và vì sao thực thi có cấu trúc lại quan trọng.
2. **Vòng lặp lõi** — chu trình lập kế hoạch–thực thi–kiểm chứng dẫn dắt mọi tác vụ.
3. **Mẫu** — các cấu trúc kế hoạch và tác vụ mà agent và con người chia sẻ.
4. **Skill và agent** — cách các command và vai trò agent ăn khớp với nhau, bộ kit sống (cách một repository nuôi lớn skill của riêng nó qua sub-skill author), và các addon bảo trì tự nguyện như dependency-upgrade.
5. **Các kiểu hình** — thích ứng phương pháp luận cho repo độc lập và trung tâm điều phối.

- [Đọc phương pháp luận](/methodology)
- [Đọc đặc tả](/spec)
- [Duyệt bộ kit](/kit)
