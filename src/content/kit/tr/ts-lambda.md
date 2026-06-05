---
title: TypeScript Lambda
description: "Sunucusuz TypeScript Lambda projeleri için işleyiciler, Serverless/SAM/CDK araç zinciri ve IAM en az ayrıcalık ilkesine yönelik akıl yürütme ipuçları içeren bir onboarding ön ayarı."
kind: preset
lang: tr
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda ön ayarı

Onboarding akışının sunucusuz TypeScript Lambda projeleri için kullandığı bir akıl yürütme kılavuzu. Bu bir şablon değil, bir kontrol listesidir — saptanan gerçeklik kazanır.

## Sinyaller

- Bir dağıtım tanımlayıcısı: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM) veya `cdk.json` (AWS CDK); `tsconfig.json` ile birlikte.
- `handler` dışa aktaran işleyici fonksiyonlar, çoğunlukla `src/functions/` veya `src/handlers/` altında; fonksiyon başına tek bir giriş noktası.

## Neyin üzerine akıl yürütülmeli

- Gerçek kapı: lint (`eslint`), tür denetimi (`tsc --noEmit`), test (Jest/Vitest), paketleme (esbuild/tsc) ve synth/paketleme (`sls package`, `sam build`, `cdk synth`) — birebir kaydedilir.
- Fonksiyon başına yapı, olay kaynakları (API Gateway, SQS, EventBridge) ve soğuk başlatma/paket boyutu bütçesi.
- IAM kapsamı — fonksiyon başına en az ayrıcalık — ve sırlar ile yapılandırmanın nerede tutulduğu (SSM, Secrets Manager, env).

## Notlar

SECURITY belgelerinde en az ayrıcalıklı IAM'ı vurgulayın. Synth/paketleme güvenli kapıdır; deploy hesabı değiştirir ve doğrulama olarak çalıştırılmamalıdır.
