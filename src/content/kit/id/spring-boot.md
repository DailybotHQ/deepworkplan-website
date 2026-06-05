---
title: Spring Boot
description: "Preset onboarding untuk aplikasi Spring Boot, dengan petunjuk penalaran untuk Maven vs Gradle, controller, service, repository, dan test runner."
kind: preset
lang: id
order: 9
stack: Spring Boot
---

# Preset Spring Boot

Panduan penalaran yang dipakai alur onboard untuk aplikasi Spring Boot. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `pom.xml` (Maven) atau `build.gradle`/`build.gradle.kts` (Gradle) dengan dependensi `spring-boot-starter-*`.
- Tata letak `src/main/java`, titik masuk `@SpringBootApplication`, serta pelapisan `@RestController`/`@Service`/`@Repository`.
- Build tool disimpulkan dari manifest yang ada, dengan wrapper `./mvnw` atau `./gradlew`.

## Yang perlu dipertimbangkan

- Command test yang sebenarnya (`./mvnw test` atau `./gradlew test`, JUnit dengan Spring Boot Test) dan gate lint/format (Checkstyle, Spotless) — dicatat apa adanya.
- Alur controller → service → repository, konfigurasi di `application.yml`/`application.properties`, serta penanganan profil dan rahasia.
- Skill yang sesuai stack untuk controller, service, repository, dan entitas.

## Catatan

Gunakan wrapper (`./mvnw`/`./gradlew`), bukan Maven/Gradle global, dan catat profil Spring aktif serta lapisan persistensi (JPA/JDBC).
