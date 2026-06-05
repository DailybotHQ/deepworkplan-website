---
title: Spring Boot
description: "พรีเซ็ต onboarding สำหรับแอปพลิเคชัน Spring Boot พร้อมแนวคิดสำหรับ Maven กับ Gradle, controller, service, repository และ test runner"
kind: preset
lang: th
order: 9
stack: Spring Boot
---

# พรีเซ็ต Spring Boot

แนวทางการให้เหตุผลที่ขั้นตอน onboard ใช้สำหรับแอปพลิเคชัน Spring Boot นี่คือเช็กลิสต์ ไม่ใช่เทมเพลต โดยยึดสภาพจริงที่ตรวจพบเป็นหลัก

## สัญญาณที่ใช้ตรวจสอบ

- `pom.xml` (Maven) หรือ `build.gradle`/`build.gradle.kts` (Gradle) ที่มี dependency `spring-boot-starter-*`
- โครงสร้าง `src/main/java`, entrypoint `@SpringBootApplication` และการแบ่งชั้นด้วย `@RestController`/`@Service`/`@Repository`
- อนุมาน build tool จาก manifest ที่มีอยู่ พร้อม wrapper `./mvnw` หรือ `./gradlew`

## สิ่งที่ต้องให้เหตุผล

- คำสั่ง test จริง (`./mvnw test` หรือ `./gradlew test`, JUnit กับ Spring Boot Test) และ gate ของ lint/format (Checkstyle, Spotless) โดยบันทึกไว้ตามต้นฉบับทุกตัวอักษร
- flow ของ controller → service → repository, configuration ใน `application.yml`/`application.properties` และการจัดการ profile กับ secret
- skill ที่เหมาะกับสแตกสำหรับ controller, service, repository และ entity

## หมายเหตุ

ใช้ wrapper (`./mvnw`/`./gradlew`) ไม่ใช่ Maven/Gradle แบบ global และบันทึก Spring profile ที่ใช้งานอยู่และ persistence layer (JPA/JDBC)
