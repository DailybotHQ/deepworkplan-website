---
title: Flutter
description: "Preset onboarding cho dự án Flutter và Dart, với gợi ý suy luận về widget, analyzer, quản lý state, sinh mã và flutter test."
kind: preset
lang: vi
order: 17
stack: Flutter (Dart)
---

# Flutter preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho dự án Flutter và Dart. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `pubspec.yaml` có dependency `flutter` và `lib/main.dart` với entry `runApp`/`MaterialApp`.
- Các widget (`StatelessWidget`/`StatefulWidget`), `analysis_options.yaml`, và `test/` với `flutter test`.
- Thư viện quản lý state (Provider, Riverpod hoặc Bloc) và sinh mã (`build_runner`, `json_serializable`) nếu có.

## Cần suy luận về điều gì

- Các lệnh test (`flutter test`), analyze (`flutter analyze`), format (`dart format`) và build (`flutter build <target>`) thực tế — ghi lại nguyên văn.
- Phương pháp quản lý state đang dùng và các quy ước widget/feature folder trong `lib/`.
- Liệu có dùng sinh mã (`dart run build_runner build`) và những target nào tồn tại.

## Ghi chú

Xác nhận thư viện quản lý state và bước `build_runner` bất kỳ từ `pubspec.yaml`; cả hai định hình các skill được sinh ra.
