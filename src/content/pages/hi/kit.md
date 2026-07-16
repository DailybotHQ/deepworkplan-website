---
title: "Deep Work Plan किट"
description: "वह स्किल और उसकी आठ सब-स्किल्स, कमांड्स, एजेंट अडैप्टर, ऑनबोर्डिंग प्रीसेट, ऑप्ट-इन ऐडऑन, और उदाहरण जो Deep Work Plan को कहीं भी चलाने योग्य बनाते हैं।"
lastUpdated: 2026-05-31
---

## Deep Work Plan किट

किट वह सब कुछ है जिसकी आपको पद्धति को व्यवहार में चलाने के लिए आवश्यकता है। इसे `DailybotHQ/deepworkplan-skill` से स्थापित किया जाता है:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### स्किल और उसकी सब-स्किल्स

Deep Work Plan स्किल एक राउटर और आठ सब-स्किल्स है:

- **create** — एक लक्ष्य को एक संरचित योजना में विघटित करें (`/dwp-create`)।
- **execute** — एक योजना को कार्य-दर-कार्य चलाएँ, हर गेट सत्यापित करते हुए (`/dwp-execute`)।
- **refine** — पूर्ण किए गए काम को संरक्षित रखते हुए कार्य जोड़ें, हटाएँ, या पुनः-क्रमित करें (`/dwp-refine`)।
- **resume** — स्थिति का पुनर्निर्माण करें और एक बाधित योजना जारी रखें (`/dwp-resume`)।
- **status** — बिना कुछ बदले प्रगति की रिपोर्ट दें (`/dwp-status`)।
- **verify** — रिपॉज़िटरी और योजना की अनुरूपता वस्तुनिष्ठ रूप से जाँचें (`/dwp-verify`)।
- **onboard** — एक रिपॉज़िटरी को AI-first बनाएँ (`/deepworkplan-onboard`)।
- **author** — रिपॉज़िटरी की अपनी स्किल्स, एजेंट्स और कमांड्स बनाएँ या विकसित करें (`/skill-create`, `/agent-create`)।

### कमांड्स

पतले स्लैश कमांड्स सब-स्किल्स और ऐडऑन को सौंपते हैं:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — योजना-निष्पादन-सत्यापन लूप।
- `skill-create`, `agent-create` — author सब-स्किल को सौंपते हैं।
- `lib-upgrade` — dependency-upgrade ऐडऑन को सौंपता है (केवल तभी स्थापित होता है जब वह ऐडऑन स्वीकार किया जाए)।

### अडैप्टर

Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, और Antigravity के लिए पतले प्रति-एजेंट एकीकरण, साथ ही OpenClaw, Hermes, और cloud/background agents (Claude Code remote tasks, Codex cloud, Jules-class) के लिए। OpenClaw और Hermes स्वायत्त एजेंट प्लेटफ़ॉर्म हैं जो heartbeat या cron शेड्यूलिंग द्वारा संचालित, अनुपस्थित execution profile के अंतर्गत योजनाएँ चलाते हैं।

### ऑनबोर्डिंग प्रीसेट

प्रति-स्टैक तर्क-निर्देशिकाएँ जिनका उपयोग onboard प्रवाह docs, स्किल्स और सत्यापन कमांड्स को ढालने के लिए करता है — कभी टेम्पलेट नहीं। छह प्रीसेट: Django, Vue + Vite, Astro/Svelte, Node/TS सेवा, Python पैकेज/CLI, और एक सामान्य फ़ॉलबैक।

### ऐडऑन (ऑप्ट-इन)

वैकल्पिक क्षमताएँ जिन्हें onboard प्रवाह किसी रिपॉज़िटरी पर परत के रूप में जोड़ सकता है — कभी AI-first आधाररेखा का हिस्सा नहीं:

- **Devcontainer** — स्थायी AI-CLI प्रमाणन वाला एक पुनरुत्पाद्य, पृथक dev container।
- **Dailybot** — Dailybot का उपयोग करने वाली टीमों के लिए सर्वोत्तम-प्रयास प्रगति और मील-पत्थर रिपोर्टिंग।
- **Dependency upgrade** — पैकेज-मैनेजर-निरपेक्ष, बैच-आधारित, सत्यापित, वापस लेने योग्य अपग्रेड।
- **Design system** — रिपॉज़िटरी के वास्तविक डिज़ाइन स्रोत से तर्क की गई एक इंटरफ़ेस-दायरे वाली `DESIGN.md` (`docs/DESIGN.md` पर, `AGENTS.md` से संदर्भित), विज़ुअल UI, शैलीबद्ध CLI आउटपुट और संवादात्मक संदेशों के लिए प्रोफ़ाइलों के साथ, ताकि एजेंट ऑन-ब्रांड इंटरफ़ेस आउटपुट बनाएँ; एक डिज़ाइन सिस्टम का पता चलने पर विज़ुअल प्रोफ़ाइल डिफ़ॉल्ट-ऑन है, CLI और संवादात्मक प्रोफ़ाइल पता चलने पर अनुशंसित हैं और हमेशा पूछे जाते हैं।
- **AI Diff Reviewer** — Security Review को संरचित स्थानीय समीक्षा ([AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v2 + आवश्यक `.review/extension.md`) से मज़बूत करता है; वैकल्पिक Flow B उसी extension को साझा करने वाला CI PR मर्ज गेट जोड़ता है। हमेशा Flow A vs Flow B पूछें; कभी स्वतः-इंस्टॉल न करें।

### उदाहरण

काम किए हुए, पहले-और-बाद के विवरण।

- [किट देखें](/kit)
- [Quickstart](/quickstart)
- [उदाहरण देखें](/examples)
