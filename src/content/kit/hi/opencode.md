---
title: OpenCode
description: "OpenCode, ओपन-सोर्स एजेंट, के लिए DWP अडैप्टर, जो नेटिव AGENTS.md और हैश प्रीफ़िक्स के साथ markdown कमांड प्रक्रियाओं के माध्यम से पूर्ण समर्थन देता है।"
kind: adapter
lang: hi
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode adapter

OpenCode, ओपन-सोर्स कोडिंग एजेंट, नेटिव AGENTS.md और markdown कमांड प्रक्रियाओं के माध्यम से DWP का समर्थन करता है।

## समर्थन स्तर

**पूर्ण** (स्थापना-परीक्षित) — OpenCode मूल रूप से AGENTS.md को पढ़ता है और अपनी प्रक्रिया फ़ाइल से प्रत्येक dwp-* कमांड चलाता है। स्वचालित परीक्षण सुइट्स द्वारा मार्ग की पुष्टि की गई है।

## इंस्टॉलेशन

DWP, AGENTS.md और कमांड प्रक्रियाएँ रिपॉज़िटरी में भेजता है; OpenCode उन्हें प्रोजेक्ट कॉन्टेक्स्ट के रूप में खोजता है।

वैकल्पिक: [coding-agents-kit](/kit/agentkit) इस CLI को इंस्टॉल कर सकता है और `ak opencode` से चला सकता है। विक्रेता का अपना आधिकारिक इंस्टॉलर भी उतना ही अच्छा काम करता है।

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## आह्वान

`#` प्रीफ़िक्स का उपयोग करें:

```
#dwp-create <goal>
#dwp-execute
```

## टिप्पणियाँ

OpenCode प्रक्रिया फ़ाइलें पढ़ता है और पूरे अनुक्रमिक Deep Work Plan लूप को चलाता है।
