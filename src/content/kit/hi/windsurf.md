---
title: Windsurf
description: "Windsurf के लिए DWP अडैप्टर, जो इसकी नियम-प्रणाली और हैश कमांड प्रीफ़िक्स के साथ markdown कमांड प्रक्रियाओं के माध्यम से पूर्ण समर्थन देता है।"
kind: adapter
lang: hi
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf adapter

Windsurf अपनी नियम-प्रणाली और markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** — Windsurf प्रोजेक्ट नियम पढ़ता है और हर dwp-* कमांड को उसकी प्रक्रिया फ़ाइल से चलाता है।

## इंस्टॉलेशन

DWP कमांड markdown प्रक्रियाओं के रूप में रहते हैं जिन्हें एजेंट Windsurf की नियम-प्रणाली के माध्यम से पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Windsurf प्रक्रिया फ़ाइलें पढ़ता है और पूरे अनुक्रमिक Deep Work Plan लूप को चलाता है।
