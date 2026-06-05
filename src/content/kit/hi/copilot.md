---
title: GitHub Copilot
description: "GitHub Copilot के लिए DWP अडैप्टर, जो AGENTS.md और हैश कमांड प्रक्रियाओं के माध्यम से पूर्ण समर्थन देता है और संपूर्ण Deep Work Plan लूप को चलाता है।"
kind: adapter
lang: hi
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot adapter

Copilot AGENTS.md और markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** — Copilot AGENTS.md और dwp-* प्रक्रिया फ़ाइलें पढ़ता है, और उनसे हर कमांड चलाता है।

## इंस्टॉलेशन

DWP, AGENTS.md और कमांड प्रक्रियाएँ रिपॉज़िटरी में भेजता है; Copilot उन्हें रिपॉज़िटरी कॉन्टेक्स्ट के रूप में पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Copilot प्रक्रिया फ़ाइलें पढ़ता है और पूरे अनुक्रमिक Deep Work Plan लूप को चलाता है।
