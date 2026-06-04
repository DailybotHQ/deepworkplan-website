---
title: Cursor
description: "Cursor AI के लिए DWP अडैप्टर, जो प्रोजेक्ट rules सिस्टम और हैश कमांड प्रीफ़िक्स के माध्यम से पूर्ण समर्थन देता है, क्योंकि Cursor स्वयं slash को आरक्षित रखता है।"
kind: adapter
lang: hi
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor adapter

Cursor प्रोजेक्ट rules और कमांड फ़ाइलों के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** — DWP कमांड Cursor के rules सिस्टम के माध्यम से काम करते हैं।

## इंस्टॉलेशन

DWP कमांड प्रोजेक्ट के अंतर्गत markdown के रूप में रहते हैं। Cursor उन्हें अपने rules सिस्टम के माध्यम से पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें (Cursor `/` को अवरोधित करता है):

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

`#` का उपयोग करें क्योंकि Cursor अपने स्वयं के कमांड के लिए `/` को आरक्षित रखता है।
