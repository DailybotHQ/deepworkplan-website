---
title: "DWP v8: spec-first और बंद लूप"
description: "Deep Work Plan v8 spec-first योजनाओं, harness के रूप में रिपॉज़िटरी, Loop engineering और मापी दक्षता को जोड़ता है; लूप स्वीकृत योजनाएँ पूरी करता है।"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: hi
order: 0
featured: true
sourceLabel: "टैग की गई रिलीज़ और v8 अनुबंध का मसौदा"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 spec-first विकास, एजेंट harness के रूप में रिपॉज़िटरी, Loop engineering और मापी दक्षता को जोड़ता है। कामकाजी वाक्य: “Spec-first, बंद लूप: रिपॉज़िटरी harness है और योजना पूरी होने तक स्वयं चलती है।”

## चार स्तंभ

1. **Spec-first:** योजना और विनिर्देश स्पष्ट स्वीकृति मानदंड व सत्यापन द्वारों के साथ टिकाऊ स्रोत हैं। 2. **रिपॉज़िटरी harness है:** संदर्भ, उपकरण, नियंत्रण और फिर शुरू होने वाली स्थिति कोड के साथ रहते हैं। 3. **Loop engineering:** स्वीकृत योजना दर्ज चक्र में पूरी होती है। 4. **मापी दक्षता:** प्रति प्रवाह निर्देश बाइट और प्रकाशित मापन पथ; token प्रतिशत का अनुमान नहीं।

## Loop engineering का अर्थ

योजना लीड और क्रमबद्ध उत्तराधिकार दर्ज करती है। मानव वैकल्पिक Herdr daemon को herdr-peers autopilot --loop से शुरू करता है; संकेत नया अधिकार दिए बिना आगे बढ़ने को कहते हैं। लीड न हो तो सूचीबद्ध उत्तराधिकारी जिम्मेदारी ले सकता है। घटनाएँ Dailybot notifier तक जाती हैं और fleet सक्षम मशीनों के एजेंट व योजनाएँ दिखाता है। daemon मानव शुरू करता है; Herdr वैकल्पिक है।

## इन तंत्रों वाली रिलीज़

पैक v7.11.0 का सुदृढ़ीकरण और v7.12.x के योजना-पंजीकरण व सूचना रिलीज़ तंत्र देते हैं। herdr-peers v1.3.x लूप, रिपोर्टिंग और fleet जोड़ता है; v2.0.0 protocol 2 brain और queue consumer जोड़ता है। coding-agents-kit v1.3.0 pick-v2 देता है, v1.4.0 सत्यापित updater। रिलीज़ ऊपर टैग और लिंक की गई हैं; addon वैकल्पिक हैं।

## v8 अनुबंध — RE-VERIFY AT 8.0.0

origin/feat/v8-line मसौदा plan-contract/v8 में autonomy जोड़ता है: ठहराव सीमा, सूचना पाने वाले pane, सूचना लक्ष्य, brain की कार्रवाई अनुमति और queue व्यवहार। .dwp/queue.json के लिए dwp-queue-v1 भी परिभाषित है; पैक स्थिति लिखता और Herdr पढ़ता है। प्रकाशन से पहले टैग किए गए 8.0.0 artifacts से फिर जाँचें।
