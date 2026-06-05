---
title: Google Gemini
description: "Google Gemini के लिए DWP अडैप्टर, जो markdown कमांड प्रक्रियाओं और हैश कमांड प्रीफ़िक्स के माध्यम से पूर्ण समर्थन देता है और संपूर्ण Deep Work Plan लूप को चलाता है।"
kind: adapter
lang: hi
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Google Gemini adapter

Google Gemini markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** — हर dwp-* कमांड अपनी प्रक्रिया फ़ाइल से चलता है। नेटिव WebFetch के लिए Gemini 2.5 Pro या नया आवश्यक है।

## इंस्टॉलेशन

DWP कमांड markdown प्रक्रियाओं के रूप में रहते हैं जिन्हें एजेंट आह्वान पर पढ़ता है।

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

Gemini प्रक्रिया फ़ाइलें पढ़ता है और पूरे अनुक्रमिक Deep Work Plan लूप को चलाता है।
