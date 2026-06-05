---
title: Angular
description: "Angular projeleri için bileşenler, modüller veya bağımsız API'ler, servisler, RxJS ve test koşucusuna yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 15
stack: Angular
---

# Angular ön ayarı

Onboarding akışının Angular projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `angular.json` ve bağımlılıklarda `@angular/core`; `src/app/` içinde `@Component`/`@NgModule` veya bağımsız bileşenler.
- `@Injectable` ile servisler, RxJS observable'ları ve bağımlılık enjeksiyonu.
- Paket yöneticisi, var olan kilit dosyasından çıkarılır.

## Neyin üzerine akıl yürütülmeli

- Gerçek test (`ng test` / Karma+Jasmine `*.spec.ts` veya Jest), lint (`ng lint` / `@angular-eslint`) ve derleme (`ng build`) komutları — birebir kaydedilir.
- Uygulamanın NgModules mi yoksa bağımsız bileşenler API'sini mi kullandığı ve yönlendirme ile bağımlılık enjeksiyonu kuralları.
- Yığına uygun skill'ler: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Notlar

CLI proje düzenini izleyen Angular uygulamaları için kullanışlıdır. Karma/Jasmine ile Jest arasındaki tercihi var olan yapılandırmadan onaylayın.
