---
title: OpenClaw
description: "OpenClaw के लिए DWP अडैप्टर: नेटिव .agents/skills स्कैनिंग, अनुपस्थित निष्पादन मैपिंग, और स्वायत्त एजेंट कार्यस्थलों के लिए cron-संचालित योजना-निरंतरता।"
kind: adapter
lang: hi
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw adapter

OpenClaw एक स्वायत्त एजेंट प्लेटफ़ॉर्म है जो अनुसूचित चक्रों के साथ दीर्घकालिक कार्यस्थल चलाता है। यह नेटिव रूप से इंस्टॉल किए गए skill packs के लिए `<workspace>/.agents/skills/` स्कैन करता है, जिसका अर्थ है कि DWP skill बिना किसी adapter shim के लोड होती है — इसे वहाँ इंस्टॉल करें और OpenClaw इसे स्वतः उठा लेता है।

## समर्थन स्तर

**पूर्ण** — OpenClaw `AGENTS.md` पढ़ता है और AgentSkills मानक के माध्यम से skill लोड करता है। सभी DWP सब-स्किल्स (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) उपलब्ध हैं।

## इंस्टॉलेशन

```bash
openclaw skills install deepworkplan
```

या मैन्युअल रूप से: `DailybotHQ/deepworkplan-skill` को `<workspace>/.agents/skills/deepworkplan/` में क्लोन करें।

## आह्वान

Plain text — OpenClaw slash-command प्रीफ़िक्स का उपयोग नहीं करता:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## अनुपस्थित निष्पादन मैपिंग

OpenClaw की शेड्यूलिंग primitives सीधे DWP के निरंतरता मॉडल से मैप होती हैं:

| OpenClaw primitive | DWP भूमिका |
|--------------------|------------|
| Workspace root | [एजेंट कार्यस्थल](/spec/archetypes) आर्किटाइप: workspace रूट पर `AGENTS.md`, `.agents/`, `.dwp/` |
| `<workspace>/.agents/skills/` (नेटिव tier-2 स्कैन) | यह pack जहाँ रहता है — कोई adapter shim की आवश्यकता नहीं |
| Heartbeat या cron turn | एक [अनुसूचित निरंतरता](/spec/agent-protocol#scheduled-continuation) turn: जागें → DWP Resume Protocol → अगला परमाणु कार्य → state अद्यतन करें → yield करें |
| `HEARTBEAT.md` जाँचें | एक पंक्ति जोड़ें: "यदि `.dwp/plans/` में कोई खुली योजना है, तो एक कार्य के लिए उसे फिर से शुरू करें।" |
| Standing orders | योजना-अनुमोदन सीमा और अनुपस्थित प्रोफ़ाइल का सीमित अधिकार |

व्यावहारिक रूप से:

1. एक मानव इंटरेक्टिव रूप से एक योजना बनाता और अनुमोदित करता है। अनुमोदन नियंत्रण बिंदु है — अनुपस्थित turn कभी एक ही turn में create-and-execute नहीं करते।
2. योजना में मशीन-पठनीय स्थिति परत (`manifest.json` + `state.json`) MUST होनी चाहिए। git के बिना एक कार्यस्थल में, `state.json` वह है जो crash-safe रिज्यूम संभव बनाता है। देखें [योजना-स्थिति](/spec/plan-state)।
3. प्रत्येक heartbeat या cron turn अधिकतम एक कार्य निष्पादित करता है, उसका सत्यापन गेट पार करता है, `state.json` को परमाणु रूप से अद्यतन करता है, और yield करता है।
4. किसी भी रोक-शर्त पर एजेंट `state.json` के `blocked` फ़ील्ड को लिखता है और workspace के सामान्य चैनल के माध्यम से रिपोर्ट करता है। अगली मानवीय नज़र — या heartbeat रिपोर्ट — ठीक वह देखती है जो चाहिए।

परिणाम: एक बहु-दिवसीय योजना जो रीस्टार्ट, मॉडल परिवर्तन, और सत्र सीमाओं से बचती है, रात भर डेमन द्वारा निष्पादित होती है — उन्हीं गेटों के साथ जो मानव-पर्यवेक्षित रन में होते।

## टिप्पणियाँ

OpenClaw का workspace [एजेंट कार्यस्थल](/spec/archetypes) आर्किटाइप का प्रामाणिक उदाहरण है। DWP skill pack का `HEARTBEAT.md` एकीकरण और `state.json` आवश्यकता इसी प्लेटफ़ॉर्म को ध्यान में रखकर डिज़ाइन की गई थी।
