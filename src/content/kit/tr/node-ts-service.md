---
title: Node / TS service
description: "Node ve TypeScript servisleri ile serverless API’ler için bir onboarding ön ayarı; istek yaşam döngüsü, entegrasyonlar ve testler için akıl yürütme ipuçları sunar."
kind: preset
lang: tr
order: 4
stack: Node / TS service
---

# Node / TS service ön ayarı

Onboarding akışının Node/TypeScript servisleri ve serverless API’ler için kullandığı akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- `tsconfig.json` ile birlikte bir sunucu çerçevesi (`express`, `fastify`, `@nestjs/*`) ya da serverless işleyiciler (`serverless.yml`, `template.yaml`, bir `functions/` dizini).
- Var olan lockfile’dan çıkarsanan paket yöneticisi.

## Neyin üzerine akıl yürütülmeli

- Gerçek lint, tür denetimi (`tsc --noEmit`), test (Jest/Vitest) ve build betikleri — birebir kaydedilir.
- Uzun süre çalışan bir servis mi yoksa serverless mı olduğu — bu, mimari ve performans dokümanlarını biçimlendirir.
- Yığına uygun skill’ler: `endpoint`/`handler`, `service`, `middleware`, `integration` veya `lambda-fn`.

## Notlar

İstek veya olay yaşam döngüsünü, entegrasyon noktalarını ve gizli bilgiler ile yapılandırmanın nerede bulunduğunu kaydedin.
