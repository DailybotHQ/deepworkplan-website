---
title: "Tin tưởng và bảo mật"
description: "Tại sao Deep Work Plan an toàn để áp dụng: mã nguồn mở và MIT, Markdown-first không có lời gọi mạng hay telemetry, không phá hủy theo thiết kế, với các lần cài đặt có thể xác minh và chính sách công bố lỗ hổng rõ ràng."
lastUpdated: 2026-06-05
---

## Tại sao bạn có thể tin tưởng nó

Không ai nên cài một skill mà họ không thể tin tưởng. Deep Work Plan được xây dựng để xác minh, không phải để tin một cách mù quáng: mã nguồn mở, Markdown-first, không phá hủy và có thể kiểm tra trước khi chạy.

- **Mã nguồn mở và cấp phép MIT** — trang web và skill đều công khai và có thể so sánh được; đọc từng dòng trước khi chạy.
- **Markdown-first — không mạng, không telemetry** — không có CLI, không có HTTP API, không có luồng xác thực; không thực hiện lời gọi mạng và không gửi telemetry. Không có gì liên quan đến repository của bạn rời khỏi máy của bạn.
- **Không phá hủy theo thiết kế** — hành động duy nhất liên quan đến bảo mật là thay đổi repository của bạn, và nó hòa giải thay vì ghi đè: phát hiện những gì tồn tại, đề xuất một kế hoạch và hỏi trước khi thay thế bất cứ thứ gì. Đầu ra của kế hoạch nằm trong thư mục `.dwp/` được gitignore.
- **Không chạm vào bí mật** — không bao giờ commit bí mật, thêm vào `.gitignore` thay vì viết lại nó, và giữ các thay đổi trong những diff nhỏ, dễ xem xét.
- **Nguồn gốc có thể xác minh** — mỗi bản phát hành công bố checksum cho skill được giao.

---

## Xác minh trước khi chạy

Hãy coi skill là không đáng tin cho đến khi bạn đã kiểm tra nó. Mỗi bản phát hành đính kèm một file `SHA256SUMS` bao gồm skill được giao. Tải xuống cho phiên bản bạn định cài đặt, rồi xác minh bản sao của bạn khớp — lối thoát khác không có nghĩa là một file không khớp và bạn nên dừng lại.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Tải checksum cho bản phát hành bạn định cài (thay vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # lối thoát khác không nghĩa là file không khớp — dừng lại
```

Các bản phát hành **có checksum, không có chữ ký** — ký (cosign hoặc GPG của người duy trì) là bước tiếp theo được ghi lại, không phải tuyên bố hiện tại. Vì mọi thứ đều mở, bạn cũng có thể so sánh bất kỳ file nào với repository tại tag của nó.

---

## Báo cáo lỗ hổng

Báo cáo các vấn đề bảo mật riêng tư tới **security@dailybot.com** thay vì mở một issue công khai. Chúng tôi xác nhận báo cáo trong vòng 3 ngày làm việc và đặt mục tiêu gửi bản sửa lỗi hoặc biện pháp giảm thiểu trong vòng 30 ngày cho các phát hiện hợp lệ, tùy thuộc vào mức độ nghiêm trọng. Trang web và skill chia sẻ cùng một chính sách.

---

## Những hạn chế thành thật

- Các bản phát hành có checksum, nhưng chưa được ký mật mã — ký được lên kế hoạch, chưa thực hiện.
- Deep Work Plan chạy một coding agent tự chủ đối với repository của bạn. Xem xét kế hoạch được đề xuất và các diff của nó; phương pháp luận được thiết kế cho việc xem xét đó, không phải để thay thế nó.
- Các tuyên bố tin tưởng ở đây chỉ mô tả các nguồn chính thức. Một bản sao đã bị sửa đổi hoặc của bên thứ ba đã trôi dạt khỏi các repository không mang theo bất kỳ đảm bảo nào trong số này — hãy xác minh trước.

---

## Tài nguyên tin tưởng

- [Manifest tin tưởng có thể đọc bằng máy](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Chính sách bảo mật trang web](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Chính sách bảo mật skill & mô hình mối đe dọa](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Đọc phương pháp luận](/methodology)
- [Áp dụng (init)](/init)
