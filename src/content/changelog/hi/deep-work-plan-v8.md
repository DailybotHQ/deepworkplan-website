---
title: "DWP v8: spec-first और बंद लूप"
description: "Deep Work Plan v8 spec-first योजनाओं, harness के रूप में रिपॉज़िटरी, Loop engineering और मापी दक्षता को जोड़ता है; लूप स्वीकृत योजनाएँ पूरी करता है।"
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: hi
order: 0
featured: true
sourceLabel: "Skill रिलीज़ v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill रिलीज़ v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "LOOP_ENGINEERING.md (v8 का मानक दस्तावेज़)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "विशिष्टता रीडर में Loop engineering"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "plan-contract/v8 स्कीमा"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "journal-event/v8 स्कीमा"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "plan-snapshot/v8 स्कीमा"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "योजना कतार लेखक (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill रिलीज़ v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill रिलीज़ v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill रिलीज़ v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 चार विचारों को जोड़ता है: spec-first विकास, एजेंट harness के रूप में रिपॉज़िटरी, Loop engineering और मापी गई दक्षता। इसका कार्य-वाक्य है: “Spec-first, loop-closed: रिपॉज़िटरी harness है और योजना पूरी होने तक स्वयं चलती है।”

## चार स्तंभ

1. **Spec-first.** योजना और उसका विनिर्देश स्पष्ट स्वीकृति मानदंडों और सत्यापन द्वारों के साथ टिकाऊ सत्य-स्रोत हैं।
2. **रिपॉज़िटरी harness है।** संदर्भ, उपकरण, नियंत्रण नियम और फिर से शुरू किया जा सकने वाला state कोड के साथ रहते हैं, ताकि अलग-अलग एजेंट एक ही रिपॉज़िटरी से काम करें।
3. **Loop engineering.** स्वीकृत योजना अपने दर्ज जीवनचक्र से गुजरते हुए पूरी हो सकती है।
4. **मापी गई दक्षता।** दक्षता को प्रति flow instruction bytes में, प्रकाशित मापन पथ के साथ बताया जाता है; token प्रतिशत का अनुमान नहीं लगाया जाता।

## Loop engineering का अर्थ

योजना एक lead और क्रमबद्ध उत्तराधिकारियों को दर्ज करती है। कोई मानव वैकल्पिक Herdr daemon को `herdr-peers autopilot --loop` से शुरू करता है; इसके nudges lead से आगे बढ़ने को कहते हैं, पर नया अधिकार नहीं देते। Lead के उपलब्ध न होने पर loop सूचीबद्ध उत्तराधिकारी से कार्यभार लेने को कह सकता है। योजना घटनाएँ पैक के Dailybot notifier तक पहुँच सकती हैं और fleet दृश्य सक्षम मशीनों के एजेंट तथा योजनाएँ दिखाता है। Daemon शुरू करने की ज़िम्मेदारी मानव की है; Herdr addon वैकल्पिक है।

## इन तंत्रों वाले रिलीज़

पैक v7.11.0 की मजबूती और v7.12.x की योजना पंजीकरण तथा सूचना रिलीज़ योजना-पक्ष के तंत्र देते हैं। herdr-peers v1.3.x loop, reports और fleet दृश्य जोड़ता है; v2.0.0 protocol 2 brain और queue consumer जोड़ता है। coding-agents-kit v1.3.0 pick-v2 launch contract देता है और v1.4.0 सत्यापित updater जोड़ता है। herdr-peers v2.1.0 v8 structured blockers पढ़ता है और coding-agents-kit v1.5.0 केवल रिपोर्ट किए गए tokens का मापन जोड़ता है। पैक 8.0.0 के addon descriptors herdr-peers v2.1.0, coding-agents-kit v1.5.0 और devcontainer-kit v1.3.0 pin करते हैं। टैग किए गए रिलीज़ ऊपर लिंक हैं। इन वैकल्पिक addons के बिना भी पैक काम करता है।

## v8 अनुबंध

रिलीज़ 8.0.0 DWP मानक 8.0.0 लागू करती है। नई योजनाएँ `plan-contract/v8` पर बनती हैं; v7, v6 और v5 योजनाएँ अपनी दर्ज पीढ़ी बनाए रखती हैं और केवल स्पष्ट `refine migrate` से बदलती हैं। v8 योजनाएँ `plan-manifest/v7` पंक्ति बनाए रखती हैं और मौजूदा योजनाओं के लिए `journal-event/v7` समर्थित रहता है। मानक स्रोत `LOOP_ENGINEERING.md` है, साथ में तीन प्रकाशित schemas हैं।

- **`autonomy` block.** `plan-contract/v8` का वैकल्पिक, बंद block जो योजना का loop अधिकार दर्ज करता है: `stall_budget` (1–10, default 3), `promptable` panes (default केवल lead), `notify` targets (default कोई नहीं), `brain` (default `false`) और `queue` (`prompt-lead`, `launch` या `none`, default `none`)। Block अनुपस्थित होने पर सभी defaults लागू होते हैं और समाधान मानव करता है।
- **संरचित blockers.** Blocker `journal-event/v8` का `blocker` event है, जिसे केवल ledger helper से बनाया और हल किया जाता है। इसमें task, कारण, एक पंक्ति `needs`, आवश्यक C1–C7 class और वैकल्पिक resolver शामिल हैं। C1, C2, C5 और C6 के लिए `resolver: lead` अस्वीकृत है; loop केवल उसी blocker पर lead से समाधान माँगता है जिसे योजना ने स्वयं `resolver: lead` चिह्नित किया हो। `state.json` सक्रिय blocker और व्युत्पन्न `blocked` स्थिति वाला `plan-snapshot/v8` बन जाता है; `PROGRESS.md` चार-पंक्ति header से शुरू होता है: लक्ष्य, वर्तमान task, अगली कार्रवाई और ज़रूरतें।
- **योजना कतार।** `.dwp/queue.json` (`dwp-queue-v1`) केवल पैक का `shared/queue.py` या मानव लिख सकता है; अनुमोदन पर `create` योजना जोड़ता है और Herdr daemon केवल पढ़ता है। कतार में अधिकतम 64 योजनाएँ होती हैं और हर रिपॉज़िटरी में एक समय में एक योजना चलती है, जब तक योजना `parallel: true` न सेट करे। खराब कतार जीवनचक्र को बाधित नहीं करती।

v7 की अंतिम रिलीज़ **7.12.2** थी।

इंस्टॉल किए गए skill की रिलीज़: **8.0.0**.
