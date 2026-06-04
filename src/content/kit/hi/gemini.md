---
title: Google Gemini
description: "Google Gemini के लिए DWP अडैप्टर, जो markdown कमांड प्रक्रियाओं और हैश प्रीफ़िक्स के माध्यम से आंशिक समर्थन देता है जो अनुक्रमिक वर्कफ़्लो को चलाते हैं।"
kind: adapter
lang: hi
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Google Gemini adapter

Google Gemini markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**आंशिक** — कोर कमांड प्रक्रिया फ़ाइलों के माध्यम से काम करते हैं।

## इंस्टॉलेशन

DWP कमांड markdown प्रक्रियाओं के रूप में रहते हैं जिन्हें एजेंट पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Gemini प्रक्रिया फ़ाइलें पढ़ता है और अनुक्रमिक DWP वर्कफ़्लो को निष्पादित करता है।
