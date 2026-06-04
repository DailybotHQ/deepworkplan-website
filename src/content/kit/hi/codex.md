---
title: OpenAI Codex
description: "OpenAI Codex के लिए DWP अडैप्टर, जो markdown कमांड प्रक्रियाओं और हैश प्रीफ़िक्स के माध्यम से आंशिक समर्थन देता है; team-agent फ़ीचर उपलब्ध नहीं हैं।"
kind: adapter
lang: hi
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex adapter

OpenAI Codex markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**आंशिक** — कोर कमांड काम करते हैं; उन्नत फ़ीचर (team agents) उपलब्ध नहीं हैं।

## इंस्टॉलेशन

DWP कमांड markdown प्रक्रियाओं के रूप में रहते हैं जिन्हें एजेंट आह्वान पर पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Team-agent फ़ीचर केवल Claude के लिए हैं; Codex अनुक्रमिक वर्कफ़्लो का समर्थन करता है।
