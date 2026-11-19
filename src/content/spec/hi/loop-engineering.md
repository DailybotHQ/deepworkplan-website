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

### 1.1. लूप का अर्थ
#### पंजीकरण और निरीक्षण
Herdr चालू हो तो v8 `execute` lead रिकॉर्ड और उत्तराधिकारी दर्ज करता है। केवल lead रिकॉर्ड और पढ़ने योग्य state वाली योजना देखी जाती है। मानव `herdr-peers autopilot --loop` शुरू करता है; daemon login item या system service नहीं है।

#### जारी रहना और हस्तांतरण
Daemon खुली योजना में lead को तभी संकेत देता है जब वह पाँच मिनट निष्क्रिय/पूर्ण हो, कोई lane काम या उत्तर की प्रतीक्षा में न हो, pane दायरे में और गैर-बहिष्कृत हो, तथा dialog/login/usage-limit/draft न हो। तय संदेश दर्ज अधिकार और gates के अनुसार पूरा करने को कहता है; अधिकार नहीं देता। तीन संकेत बिना प्रगति `plan_stalled` दर्ज करते हैं; अवरोध केवल रिपोर्ट होता है। lead अनुपस्थित हो तो पहला उपलब्ध उत्तराधिकारी `herdr-peers lead takeover --plan <id>` चलाता है। daemon रिकॉर्ड नहीं लिखता, अज्ञात pane नहीं चुनता; usage limit अनुपस्थिति का प्रमाण नहीं। Protocol 2 में मानव `lead claim --allow-appointment` से अनुमति दे और daemon `--appoint` से शुरू हो, तभी नियुक्ति संभव है। merge/tag/release से पहले `herdr-peers lead verify --plan <id>` चलाएँ।

#### Brain, घटनाएँ और fleet
`--brain` केवल बंद action सूची चुनता है; daemon अकेला actor है और free text नहीं चलाता। `autonomy` अनुमति आवश्यक है। loop घटनाएँ रिकॉर्ड करता है; `--notify` `plan-event-v1` भेजता है और Dailybot notifier समर्थित घटनाएँ टीम तक पहुँचाता है। fleet map और `herdr-peers fleet ui` read-only हैं। [autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.2/skills/herdr-peers/autopilot.md) और [protocol](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.2/skills/herdr-peers/protocol.md) देखें।

## 2. `autonomy` ब्लॉक
बंद top-level वस्तु; मानक नाम/प्रकार [plan-contract/v8 schema](https://deepworkplan.com/schema/plan-contract/v8.json) में हैं। ब्लॉक न हो तो defaults लागू हैं।

| Field | मान | Default |
|---|---|---|
| `stall_budget` | पूर्णांक 1–10 | `3` संकेत |
| `promptable` | Herdr pane पते | केवल lead |
| `notify` | गैर-रिक्त लक्ष्य सूची | कोई लक्ष्य नहीं; घटना दर्ज |
| `brain` | boolean | `false` |
| `queue` | `prompt-lead`, `launch`, `none` | `none` |

पता `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}` रूप का है; machine ID `-` से शुरू नहीं होता। ये सीमाएँ criteria या gates नहीं बदलतीं।

## 3. संरचित अवरोध

v8 योजना रुकने का कारण डेटा के रूप में रखती है ताकि loop, fleet और काम फिर शुरू करने वाला एजेंट वही फ़ील्ड पढ़ें।

### 3.1. अवरोध रिकॉर्ड

Ledger खोलने के लिए `ledger.py block` और हल करने के लिए `ledger.py unblock` इस्तेमाल करता है; यह `journal-event/v8` का `blocker` event है। सीधे जोड़ना अस्वीकार होता है और हर अस्वीकृति दर्ज होती है।

| फ़ील्ड | नियम |
|---|---|
| `task` | इस contract का अवरुद्ध कार्य; प्रमाण से बंद कार्य को रोक नहीं सकते। |
| `reason` | अनिवार्य, रिक्त नहीं, अधिकतम 1000 वर्ण: कारण। |
| `needs` | अनिवार्य, ठीक एक गैर-रिक्त पंक्ति, अधिकतम 500 वर्ण: आगे बढ़ने की आवश्यकता। |
| `class` | अनिवार्य: [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5 की `C1`–`C7` श्रेणी। |
| `resolver` | वैकल्पिक `lead` या `human`; अनुपस्थित हो तो `human`। |

`lead` दर्ज अधिकार में credentials, login, consent, payment, main push, release या deletion बिना हल करता है। `C1`, `C2`, `C5`, `C6` में `resolver: "lead"` अस्वीकार है। प्रति योजना एक सक्रिय अवरोध; हल होने तक दूसरा अस्वीकार। उसी कार्य को फिर खोलकर फ़ील्ड बदल सकते हैं, पर शुरुआती `since` वही रहता है। समाधान में कार्य और वैकल्पिक टिप्पणी है। खुला अवरोध कार्य पूरा नहीं होने देता; नया प्रमाण भी उसे बंद नहीं करता।

### 3.2. इसे कहाँ पढ़ें

`state.json`, `plan-snapshot/v8` है: `plan-snapshot/v6` का आकार, `blocker` में `{task, reason, since, needs, class, resolver?}` या `null`; `blocked` प्राथमिक व्युत्पन्न स्थिति है। Ledger प्रोजेक्ट करता है; हाथ से नहीं लिखें।

`PROGRESS.md` शीर्षक के नीचे चार स्थिर पंक्तियों से शुरू होना चाहिए। create लिखता और हर transition पर ताज़ा करता है (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` और `Needs` snapshot से निकलते हैं (पहले अवरुद्ध कार्य, अन्यथा पहला अधूरा)। एजेंट `Goal` और `Next action` लिखता है।

### 3.3. लूप क्या कर सकता है

brain सहित loop, केवल `resolver: "lead"` चिह्नित अवरोध पर lead से कह सकता है; बाकी मानव के लिए हैं। v6/v7 `blocker` events नहीं रखते, `plan-snapshot/v6` बनाए रखते हैं (`blocker` हमेशा `null`); सभी अवरोध मानव के हैं.
## 4. योजना कतार
`.dwp/queue.json` `dwp-queue-v1` है; केवल pack लिखता है। `create` अनुमोदन पर जोड़ता है, मानव/lead क्रम बदलते हैं, `execute` lead दावा करने पर `started`, पूर्णता पर `done` लिखता है; `create`/`refine` एक-पंक्ति नोट से `skipped` कर सकते हैं। `after` वैकल्पिक है; `parallel: true` बिना एक योजना चले। daemon सीमित read-only है और अमान्य कतार खाली मानता है। `prompt-lead` स्थिर संदेश भेजता है: “Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates.” daemon कतार नहीं लिखता, न अनुबंध बिना `launch` करता है।

## 5. v8 में कायम

v8, v7 की `tasks[].parallel_safe`, delegation और पूरी event set सहित सभी बातें रखता है; v7 सुविधाएँ आगे भी उपलब्ध हैं। v8, v7 events और `blocker` को `journal-event/v8` में दर्ज कर `plan-snapshot/v8` में प्रोजेक्ट करता है; मिश्रित journal अस्वीकार है। `plan-manifest/v7` का आकार और pointer बना रहता है; checker v7 manifest को v8 contract से जोड़ता है। v6/v7 रिकॉर्ड byte-for-byte सुरक्षित हैं।
