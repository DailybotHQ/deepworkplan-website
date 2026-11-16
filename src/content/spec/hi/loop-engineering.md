---
title: लूप इंजीनियरिंग (loop engineering)
description: "v8 लूप के नियम: दर्ज अधिकार, मानव द्वारा शुरू निरंतरता, उत्तराधिकार, अवरोध, कतार, सूचनाएँ, फ्लीट दृश्यता और उनकी सीमाएँ; साथ में डिफ़ॉल्ट।"
order: 12
lang: hi
section: लूप इंजीनियरिंग
---

# लूप इंजीनियरिंग (loop engineering)

यह पृष्ठ loop engineering योजना अनुबंध बताता है। **योजना** अधिकार का स्रोत है; loop निरंतरता देता है, दर्ज अधिकार नहीं बढ़ाता।

## 1. v8 नियम
स्वीकृत योजना मानव की प्रतीक्षा किए बिना अंत तक चलती है। स्वायत्तता **योजना में दर्ज अधिकार के भीतर** है। मानव को सूचना मिलती है; लॉगिन, क्रेडेंशियल और C1–C7 gates पूर्व-अनुमति न होने पर काम रोकते हैं। v7 का मूल नियम कायम है: मुख्य विधि अकेले चलती है।

## लूप अर्थ
### पंजीकरण और निरीक्षण
Herdr चालू हो तो v8 `execute` lead रिकॉर्ड और उत्तराधिकारी दर्ज करता है। केवल lead रिकॉर्ड और पढ़ने योग्य state वाली योजना देखी जाती है। मानव `herdr-peers autopilot --loop` शुरू करता है; daemon login item या system service नहीं है।

### जारी रहना और हस्तांतरण
Daemon खुली योजना में lead को तभी संकेत देता है जब वह पाँच मिनट निष्क्रिय/पूर्ण हो, कोई lane काम या उत्तर की प्रतीक्षा में न हो, pane दायरे में और गैर-बहिष्कृत हो, तथा dialog/login/usage-limit/draft न हो। तय संदेश दर्ज अधिकार और gates के अनुसार पूरा करने को कहता है; अधिकार नहीं देता। तीन संकेत बिना प्रगति `plan_stalled` दर्ज करते हैं; अवरोध केवल रिपोर्ट होता है। lead अनुपस्थित हो तो पहला उपलब्ध उत्तराधिकारी `herdr-peers lead takeover --plan <id>` चलाता है। daemon रिकॉर्ड नहीं लिखता, अज्ञात pane नहीं चुनता; usage limit अनुपस्थिति का प्रमाण नहीं। Protocol 2 में मानव `lead claim --allow-appointment` से अनुमति दे और daemon `--appoint` से शुरू हो, तभी नियुक्ति संभव है। merge/tag/release से पहले `herdr-peers lead verify --plan <id>` चलाएँ।

### Brain, घटनाएँ और fleet
`--brain` केवल बंद action सूची चुनता है; daemon अकेला actor है और free text नहीं चलाता। `autonomy` अनुमति आवश्यक है। loop घटनाएँ रिकॉर्ड करता है; `--notify` `plan-event-v1` भेजता है और Dailybot notifier समर्थित घटनाएँ टीम तक पहुँचाता है। fleet map और `herdr-peers fleet ui` read-only हैं। [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md) और [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md) देखें।

## 2. `autonomy` ब्लॉक
बंद top-level वस्तु; मानक नाम/प्रकार [plan-contract/v8 schema](https://deepworkplan.com/schema/plan-contract/v8.json) में हैं। ब्लॉक न हो तो defaults लागू हैं।

| Field | मान | Default |
|---|---|---|
| `stall_budget` | पूर्णांक 1–10 | `3` संकेत |
| `promptable` | Herdr pane पते | केवल lead |
| `notify` | सूची; `dailybot` | कोई लक्ष्य नहीं; घटना दर्ज |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

पता `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}` रूप का है; machine ID `-` से शुरू नहीं होता। ये सीमाएँ criteria या gates नहीं बदलतीं।

## 3. संरचित अवरोध और प्रगति
`state.json` का `blocked`/`blocker` C वर्ग और वैकल्पिक `resolver` (`lead`/`human`, default `human`) रखता है। `lead` का अर्थ credential, login, consent, भुगतान, main push, release या deletion बिना दर्ज अधिकार में समाधान है। loop केवल `lead` blocker पर अनुरोध करता है; बाकी मानव को सूचित होते हैं। fleet map `PROGRESS.md` से साफ की हुई 14 पंक्तियों तक दिखा सकता है; यह header schema नहीं, जिसे tag 8.0.0 पर पुनः जाँचना है।

## 4. योजना कतार
`.dwp/queue.json` `dwp-queue-v1` है; केवल pack लिखता है। `create` अनुमोदन पर जोड़ता है, मानव/lead क्रम बदलते हैं, `execute` lead दावा करने पर `started`, पूर्णता पर `done` लिखता है; `create`/`refine` एक-पंक्ति नोट से `skipped` कर सकते हैं। `after` वैकल्पिक है; `parallel: true` बिना एक योजना चले। daemon सीमित read-only है और अमान्य कतार खाली मानता है। `prompt-lead` स्थिर संदेश भेजता है: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” daemon कतार नहीं लिखता, न अनुबंध बिना `launch` करता है।

## 5. v8 में कायम
v8 v7 `tasks[].parallel_safe`, delegation, journal और घटना-समूह रखता है; रिकॉर्ड परत v7 manifest/journal-event URL रखकर केवल `plan-contract/v8` जोड़ती है। पुराने plans migrate नहीं होते। Herdr वैकल्पिक है।
