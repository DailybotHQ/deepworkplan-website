---
title: GitHub Copilot
description: "GitHub Copilot के लिए DWP अडैप्टर, जो markdown कमांड प्रक्रियाओं और हैश प्रीफ़िक्स के माध्यम से आंशिक समर्थन देता है; कुछ ऑटोमेशन मैन्युअल रूप से किया जाता है।"
kind: adapter
lang: hi
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot adapter

GitHub Copilot markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**आंशिक** — कोर कमांड प्रक्रिया फ़ाइलों के माध्यम से काम करते हैं; कुछ ऑटोमेशन मैन्युअल होता है।

## इंस्टॉलेशन

DWP कमांड रिपॉज़िटरी में markdown प्रक्रियाओं के रूप में रहते हैं।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Copilot प्रक्रिया फ़ाइलें पढ़ता है लेकिन Claude Code की तुलना में इसका स्वायत्त निष्पादन कम है।
