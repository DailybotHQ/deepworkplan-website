---
title: deepworkplan-onboard
description: "किसी रिपॉज़िटरी के स्टैक और आर्किटाइप के बारे में तर्क करके उसे AI-first बनाएं, फिर एक अनुकूलित AGENTS.md, docs/, .agents/, और एक gitignored .dwp/ उत्पन्न करें।"
kind: command
lang: hi
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

किसी रिपॉज़िटरी को एक AI-first, spec-driven कोडबेस में बदलें। यह Deep Work Plan स्किल की onboard सब-स्किल है।

## यह क्या करता है

`deepworkplan-onboard` **वास्तविक** रिपॉज़िटरी का निरीक्षण करता है — भाषाएँ, फ़्रेमवर्क, package manager, build/test/lint कमांड, मॉड्यूल, test परिपाटी, परिनियोजन का स्वरूप — और उसके अनुकूल आर्टिफ़ैक्ट उत्पन्न करता है। यह तर्क करता है; यह कभी कोई टेम्पलेट कॉपी नहीं करता या प्लेसहोल्डर नहीं छोड़ता।

## उपयोग

```
/deepworkplan-onboard
```

## व्यवहार

1. टोह लेना — वास्तविक स्टैक और validation कमांड का पता लगाएं; निकटतम ऑनबोर्डिंग प्रीसेट से मिलान करें।
2. आर्किटाइप — व्यक्तिगत रिपॉज़िटरी या orchestrator hub के रूप में वर्गीकृत करें।
3. एक वास्तविक Quick Commands ब्लॉक के साथ `AGENTS.md` + `CLAUDE.md` symlink उत्पन्न करें।
4. `docs/` (architecture, standards, testing, security, और बहुत कुछ) तथा प्रति-मॉड्यूल docs उत्पन्न करें।
5. `.agents/` (agents, पतले `dwp-*` कमांड, स्टैक-उपयुक्त skills, कैटलॉग) + `.claude → .agents` उत्पन्न करें।
6. स्किल इंस्टॉल करें और एक gitignored `.dwp/` (plans, drafts) तथा एक `tmp/` scratch space स्कैफ़ोल्ड करें।
7. ऑप्ट-इन ऐडऑन का प्रस्ताव दें, फिर स्व-जाँच करें।

## टिप्पणियाँ

एक रिपॉज़िटरी शून्य ऐडऑन के साथ पूरी तरह अनुरूप होती है। पता लगाई गई वास्तविकता हमेशा प्रीसेट धारणाओं पर भारी पड़ती है।
