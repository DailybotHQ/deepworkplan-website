---
title: Spring Boot
description: "Spring Boot 애플리케이션을 위한 온보딩 프리셋으로, Maven 대 Gradle, 컨트롤러, 서비스, 리포지토리, 테스트 러너에 대한 추론 단서를 제공합니다."
kind: preset
lang: ko
order: 9
stack: Spring Boot
---

# Spring Boot 프리셋

onboard 흐름이 Spring Boot 애플리케이션에 사용하는 추론 가이드입니다. 템플릿이 아니라 체크리스트입니다 — 감지된 현실이 우선합니다.

## 신호

- `spring-boot-starter-*` 의존성이 있는 `pom.xml`(Maven) 또는 `build.gradle`/`build.gradle.kts`(Gradle).
- `src/main/java` 레이아웃, `@SpringBootApplication` 진입점, 그리고 `@RestController`/`@Service`/`@Repository` 계층 구조.
- 존재하는 매니페스트에서 빌드 도구를 추론하며, `./mvnw` 또는 `./gradlew` 래퍼를 사용합니다.

## 추론할 사항

- 실제 테스트 명령(`./mvnw test` 또는 `./gradlew test`, Spring Boot Test와 함께 JUnit)과 린트/포맷 게이트(Checkstyle, Spotless) — 그대로 포착합니다.
- 컨트롤러 → 서비스 → 리포지토리 흐름, `application.yml`/`application.properties`의 설정, 프로파일과 시크릿 처리.
- 컨트롤러, 서비스, 리포지토리, 엔티티에 적합한 스킬.

## 참고

전역 Maven/Gradle이 아닌 래퍼(`./mvnw`/`./gradlew`)를 사용하고, 활성 Spring 프로파일과 영속성 계층(JPA/JDBC)을 포착합니다.
