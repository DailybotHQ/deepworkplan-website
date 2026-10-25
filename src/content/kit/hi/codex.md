---
title: OpenAI Codex
description: "OpenAI Codex के लिए DWP अडैप्टर, जो markdown कमांड प्रक्रियाओं और हैश कमांड प्रीफ़िक्स के माध्यम से पूर्ण समर्थन देता है और संपूर्ण Deep Work Plan लूप को चलाता."
kind: adapter
lang: hi
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# OpenAI Codex adapter

OpenAI Codex markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** (व्यवहार-परीक्षित) — प्रत्येक dwp-* कमांड अपनी प्रक्रिया फ़ाइल से चलता है, जो मॉडलों में द्विदिश लेखक/फिर से शुरू करने के बेंचमार्क में सिद्ध हुआ है।

## इंस्टॉलेशन

DWP कमांड markdown प्रक्रियाओं के रूप में रहते हैं जिन्हें एजेंट आह्वान पर पढ़ता है; नियम `.codex/` के अंतर्गत स्थापित होते हैं।

वैकल्पिक: [coding-agents-kit](/kit/agentkit) इस CLI को इंस्टॉल कर सकता है और `ak codex` से चला सकता है। विक्रेता का अपना आधिकारिक इंस्टॉलर भी उतना ही अच्छा काम करता है।

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Codex प्रक्रिया फ़ाइलें पढ़ता है और पूरे अनुक्रमिक Deep Work Plan लूप को चलाता है।
