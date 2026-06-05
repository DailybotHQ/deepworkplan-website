---
title: Angular
description: "Preset onboarding untuk proyek Angular, dengan petunjuk penalaran untuk komponen, modul atau API standalone, service, RxJS, dan test runner."
kind: preset
lang: id
order: 15
stack: Angular
---

# Preset Angular

Panduan penalaran yang dipakai alur onboard untuk proyek Angular. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `angular.json` dan `@angular/core` di dependensi; `src/app/` dengan `@Component`/`@NgModule` atau komponen standalone.
- Service dengan `@Injectable`, observable RxJS, dan dependency injection.
- Package manager disimpulkan dari lockfile yang ada.

## Yang perlu dipertimbangkan

- Command test (`ng test` / Karma+Jasmine `*.spec.ts` atau Jest), lint (`ng lint` / `@angular-eslint`), dan build (`ng build`) yang sebenarnya — dicatat apa adanya.
- Apakah aplikasi menggunakan NgModule atau API komponen standalone, serta konvensi routing dan DI.
- Skill yang sesuai stack: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Catatan

Cocok untuk aplikasi Angular yang mengikuti tata letak proyek CLI. Konfirmasi Karma/Jasmine vs Jest dari konfigurasi yang ada.
