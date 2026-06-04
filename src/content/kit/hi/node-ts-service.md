---
title: Node / TS service
description: "Node और TypeScript सेवाओं तथा serverless APIs के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें request lifecycle, integrations, और tests के लिए तर्क संकेत शामिल हैं।"
kind: preset
lang: hi
order: 4
stack: Node / TS service
---

# Node / TS service preset

एक तर्क मार्गदर्शिका जिसे onboard प्रवाह Node/TypeScript सेवाओं और serverless APIs के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- `tsconfig.json` के साथ एक server framework (`express`, `fastify`, `@nestjs/*`) या serverless handlers (`serverless.yml`, `template.yaml`, एक `functions/` directory)।
- मौजूद lockfile से अनुमानित package manager।

## किस बारे में तर्क करें

- वास्तविक lint, type-check (`tsc --noEmit`), test (Jest/Vitest), और build स्क्रिप्ट — हूबहू दर्ज की गई।
- क्या यह एक लंबे समय तक चलने वाली सेवा है या serverless — यह architecture और performance docs को आकार देता है।
- स्टैक-उपयुक्त स्किल्स: `endpoint`/`handler`, `service`, `middleware`, `integration`, या `lambda-fn`।

## टिप्पणियाँ

request या event lifecycle, integration बिंदुओं, और secrets व config कहाँ रहते हैं — इन्हें दर्ज करें।
