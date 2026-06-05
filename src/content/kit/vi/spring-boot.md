---
title: Spring Boot
description: "Preset onboarding cho ứng dụng Spring Boot, với gợi ý suy luận về Maven vs Gradle, controller, service, repository và test runner."
kind: preset
lang: vi
order: 9
stack: Spring Boot
---

# Spring Boot preset

Hướng dẫn suy luận mà luồng onboard sử dụng cho ứng dụng Spring Boot. Đây là một danh sách kiểm tra, không phải khuôn mẫu — thực tế phát hiện được sẽ thắng.

## Tín hiệu nhận biết

- `pom.xml` (Maven) hoặc `build.gradle`/`build.gradle.kts` (Gradle) với các dependency `spring-boot-starter-*`.
- Bố cục `src/main/java`, một entrypoint `@SpringBootApplication`, và phân lớp `@RestController`/`@Service`/`@Repository`.
- Build tool được suy luận từ manifest hiện có, với wrapper `./mvnw` hoặc `./gradlew`.

## Cần suy luận về điều gì

- Lệnh test thực tế (`./mvnw test` hoặc `./gradlew test`, JUnit với Spring Boot Test) và cổng lint/format (Checkstyle, Spotless) — ghi lại nguyên văn.
- Luồng controller → service → repository, cấu hình trong `application.yml`/`application.properties`, và cách xử lý profile/secret.
- Các skill phù hợp với stack cho controller, service, repository và entity.

## Ghi chú

Dùng wrapper (`./mvnw`/`./gradlew`) thay vì Maven/Gradle toàn cục, và ghi lại các Spring profile đang hoạt động cũng như lớp persistence (JPA/JDBC).
