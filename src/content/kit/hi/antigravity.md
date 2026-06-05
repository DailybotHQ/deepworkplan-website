---
title: Antigravity
description: "Antigravity के लिए DWP अडैप्टर, जो markdown कमांड प्रक्रियाओं और हैश कमांड प्रीफ़िक्स के माध्यम से नेटिव कमांड सतह के साथ पूर्ण समर्थन देता है।"
kind: adapter
lang: hi
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Antigravity adapter

Antigravity markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** — हर dwp-* कमांड नेटिव कमांड सतह के माध्यम से अपनी प्रक्रिया फ़ाइल से चलता है।

## इंस्टॉलेशन

DWP कमांड markdown प्रक्रियाओं के रूप में रहते हैं जिन्हें एजेंट आह्वान पर पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Antigravity प्रक्रिया फ़ाइलें पढ़ता है और पूरे अनुक्रमिक Deep Work Plan लूप को चलाता है।
