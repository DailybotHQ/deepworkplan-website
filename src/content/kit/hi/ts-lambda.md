---
title: TypeScript Lambda
description: "Serverless TypeScript Lambda प्रोजेक्ट के लिए एक ऑनबोर्डिंग प्रीसेट, जिसमें handlers, Serverless/SAM/CDK toolchain और IAM least privilege के लिए तर्क-संकेत हैं।"
kind: preset
lang: hi
order: 22
stack: TS Lambda (Serverless)
---

# TypeScript Lambda preset

एक तर्क-मार्गदर्शिका जिसे onboard प्रवाह serverless TypeScript Lambda प्रोजेक्ट के लिए उपयोग करता है। यह एक चेकलिस्ट है, टेम्पलेट नहीं — पता लगाई गई वास्तविकता ही जीतती है।

## संकेत

- एक deploy descriptor: `serverless.yml` (Serverless Framework), `template.yaml` (AWS SAM), या `cdk.json` (AWS CDK), साथ में `tsconfig.json`।
- `handler` export करने वाले handler functions, अक्सर `src/functions/` या `src/handlers/` के अंतर्गत, प्रति function एक entry point के साथ।

## किस बारे में तर्क करें

- वास्तविक गेट: lint (`eslint`), type-check (`tsc --noEmit`), test (Jest/Vitest), bundle (esbuild/tsc), और synth/package (`sls package`, `sam build`, `cdk synth`) — हूबहू दर्ज किए गए।
- Per-function संरचना, event sources (API Gateway, SQS, EventBridge), और cold-start/bundle-size बजट।
- IAM scope — प्रति function least privilege — और secrets तथा config कहाँ रहते हैं (SSM, Secrets Manager, env)।

## टिप्पणियाँ

SECURITY docs में least-privilege IAM पर जोर दें। Synth/package सुरक्षित गेट है; deploy account को बदलता है और validation के रूप में कभी नहीं चलाना चाहिए।
