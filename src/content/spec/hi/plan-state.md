---
title: योजना-स्थिति
description: "मशीन-पठनीय योजना-स्थिति परत: manifest.json और state.json, गेट रिकॉर्ड, एपिसोडिक मेमोरी के रूप में परिणाम रिकॉर्ड, पुनर्मेल, और यह कब आवश्यक है।"
order: 8
lang: hi
section: State
---

# योजना-स्थिति

**संस्करण 1.1. स्थिति: स्थिर।** यह दस्तावेज़ Deep Work Plan पद्धति की मशीन-पठनीय योजना-स्थिति परत का विनिर्देश करता है। कीवर्ड MUST, MUST NOT, SHOULD, SHOULD NOT और MAY की व्याख्या RFC 2119 में वर्णित अनुसार की जानी है।

दो JSON आर्टिफ़ैक्ट — `manifest.json` (योजना की स्थिर पहचान) और `state.json` (सत्यापन-गेट परिणामों सहित प्रति-कार्य निष्पादन की सजीव स्थिति) — जो हर योजना अपनी markdown फ़ाइलों के साथ MAY रख सकती है, और जिन्हें अनुपस्थित निष्पादन (देखें [एजेंट प्रोटोकॉल](/spec/agent-protocol#execution-profiles)) और गैर-git कार्यस्थल (देखें [आर्किटाइप](/spec/archetypes) §3) के लिए MUST रखना चाहिए।

markdown योजना **मानव-पठनीय सत्य का स्रोत** बनी रहती है। JSON परत एक **व्युत्पन्न प्रक्षेपण** है: इसे एजेंट निर्धारित प्रोटोकॉल बिंदुओं पर पुनर्जनित करता है, कभी हस्त-संपादित नहीं करता, और markdown से चुपचाप असहमत होने की कभी अनुमति नहीं दी जाती। इसका उद्देश्य अंतरसंचालनीयता है — लिंटिंग, अनुरूपता जाँच, डिफ़िंग, डैशबोर्ड, रजिस्ट्री खोज, और बाहरी सत्र अवसंरचना के साथ समन्वय — जिनमें से कोई भी गद्य पर विश्वसनीय रूप से नहीं बनाया जा सकता।

## यह क्यों है

v1.1 तक, योजनाएँ केवल-गद्य markdown थीं। इसने उन्हें परीक्षण योग्य और एजेंट-निरपेक्ष रखा, लेकिन ऐसा कुछ नहीं छोड़ा जिसे कोई टूल सत्यापित, डिफ़, या उपभोग कर सके: कोई अनुरूपता गेट नहीं, `README.md` और `PROGRESS.md` के बीच desync का कोई पता लगाना नहीं, किसी डेमन या क्लाउड सत्र के लिए गद्य को पार्स किए बिना योजना की स्थिति जानने का कोई तरीका नहीं। v1.2 markdown को पदावनत किए बिना JSON प्रक्षेपण जोड़ता है — प्रक्षेपण markdown से व्युत्पन्न होता है, उसी तरह जैसे एक lockfile एक manifest से व्युत्पन्न होता है।

## स्थान-निर्धारण

स्थिति परत का उपयोग करने वाली एक योजना की यह संरचना होती है:

```text
.dwp/plans/PLAN_{name}/
├── README.md            ← मानव सत्य का स्रोत (अपरिवर्तित)
├── PROGRESS.md          ← विवरण लॉग (अपरिवर्तित)
├── PROMPTS.md           ← अपरिवर्तित
├── manifest.json        ← स्थिर पहचान (मैटेरियलाइज़ेशन पर लिखी जाती है)
├── state.json           ← सजीव स्थिति (प्रोटोकॉल बिंदुओं पर पुनर्लिखी जाती है)
├── analysis_results/
└── {N}.task_{...}.md
```

`manifest.json` को ठीक एक बार MUST लिखा जाना चाहिए, जब `create` प्रवाह योजना को मैटेरियलाइज़ करता है, और बाद में MUST NOT बदलना चाहिए सिवाय `PROGRESS.md` में दर्ज किसी spec-version माइग्रेशन के।

`state.json` को एजेंट द्वारा इन प्रोटोकॉल बिंदुओं में से प्रत्येक पर MUST पुनर्लिखा जाना चाहिए: योजना मैटेरियलाइज़ेशन (सभी कार्य `pending`), कार्य प्रारंभ (`in_progress`), प्रत्येक सत्यापन-गेट रन (गेट रिकॉर्ड जोड़ा या अद्यतन), और कार्य पूर्णता (`completed`, [DWP विनिर्देश](/spec/dwp-specification#task-completion-protocol) में कार्य-पूर्णता प्रोटोकॉल के भाग के रूप में)।

दोनों फ़ाइलें MUST परमाणु रूप से लिखी जानी चाहिए: उसी डायरेक्टरी में एक अस्थायी फ़ाइल में लिखें, फिर लक्ष्य पर नाम बदलें। एक क्रैश किया हुआ लेखन MUST NOT एक कटी-छँटी JSON फ़ाइल को स्थान पर छोड़ना चाहिए।

## परत कब आवश्यक है

- git रिपॉज़िटरी में **इंटरेक्टिव** निष्पादन के लिए, स्थिति परत नई योजनाओं के लिए RECOMMENDED है और pre-v1.2 योजनाओं के लिए OPTIONAL है। इसके बिना एक योजना अनुरूप बनी रहती है।
- **अनुपस्थित** निष्पादन के लिए, स्थिति परत REQUIRED है।
- git के बिना एक **एजेंट कार्यस्थल** में, स्थिति परत REQUIRED है: `state.json` वह पुनर्प्राप्ति जानकारी वहन करता है जो git लॉग एक रिपॉज़िटरी में वहन करता है।

## `manifest.json` — योजना पहचान

```json
{
  "schema": "https://deepworkplan.com/schema/plan-manifest/v2.json",
  "spec_version": "2.4.0",
  "name": "PLAN_payment_webhooks",
  "title": "Add payment webhook handling",
  "archetype": "individual",
  "rigor": "standard",
  "plan_format": "full",
  "created_at": "2026-06-09T14:00:00Z",
  "created_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "tags": ["backend", "payments"],
  "task_count": 7,
  "parent_plan": null
}
```

`schema`, `spec_version`, `name`, `archetype`, `rigor`, `created_at`, `task_count`, और `plan_format` REQUIRED हैं।

`archetype` MUST इनमें से एक होना चाहिए: `individual`, `orchestrator-hub`, `agent-workspace`।

`rigor` MUST इनमें से एक होना चाहिए: `micro`, `standard`, `deep` (देखें [आनुपातिक कठोरता](/spec/dwp-specification#proportional-rigor))।

`plan_format` MUST इनमें से एक होना चाहिए: `lite`, `full` — निर्माण के समय चुना गया प्रतिनिधित्व (देखें [Lite योजनाएँ](/spec/lite-plans))। यह manifest स्तर पर अपरिवर्तनीय है: बाद में Lite से Full में कोई भी प्रोन्नति `state.json` में दर्ज होती है, manifest को फिर से लिखकर कभी नहीं।

`parent_plan` एक चाइल्ड योजना को उसकी ऑर्केस्ट्रेटर योजना से जोड़ता है (`{repo}:{plan_name}`, या `null`)।

`created_by` SHOULD निर्माण करने वाले एजेंट और मॉडल की पहचान करे। इसमें MUST NOT रहस्य, टोकन, या एक प्रदर्शन नाम से परे उपयोगकर्ता पहचानकर्ता होने चाहिए।

## `state.json` — सजीव निष्पादन स्थिति

```json
{
  "schema": "https://deepworkplan.com/schema/plan-state/v2.json",
  "plan": "PLAN_payment_webhooks",
  "updated_at": "2026-06-09T16:42:10Z",
  "updated_by": { "agent": "claude-code", "model": "claude-fable-5" },
  "status": "in_progress",
  "completed_count": 2,
  "task_count": 7,
  "format": "full",
  "materialization": "ready",
  "approval": "approved",
  "promotion": null,
  "tasks": [
    {
      "id": 1,
      "locator": { "kind": "file", "value": "1.task_webhook_endpoint.md" },
      "title": "Create webhook endpoint",
      "status": "completed",
      "started_at": "2026-06-09T14:10:00Z",
      "completed_at": "2026-06-09T15:02:33Z",
      "commit": "a1b2c3d",
      "gates": [
        {
          "command": "pnpm run test",
          "passes": true,
          "exit_code": 0,
          "last_run": "2026-06-09T15:01:50Z",
          "evidence": "42 passed, 0 failed"
        }
      ],
      "outcome": {
        "tried": ["raw body parsing via middleware"],
        "failed": ["initial signature check used wrong header"],
        "worked": "verify signature against X-Sig header before JSON parse",
        "notes": "stripe-style HMAC; see analysis_results/webhook_notes.md"
      }
    },
    {
      "id": 3,
      "locator": { "kind": "file", "value": "3.task_retry_queue.md" },
      "title": "Add retry queue",
      "status": "in_progress",
      "started_at": "2026-06-09T16:30:00Z",
      "gates": []
    }
  ],
  "checkpoint": {
    "task": 3,
    "step": "instructions:4",
    "at": "2026-06-09T16:42:10Z",
    "note": "queue table migrated; worker loop not yet wired"
  },
  "blocked": null
}
```

Lite योजना की कार्य-प्रविष्टियाँ अलग फ़ाइल के बजाय `README.md` में कार्य के एंकर की ओर इशारा करने वाले `inline` locator का उपयोग करती हैं — प्रविष्टि के बारे में बाकी सब कुछ (gates, outcome, status) उसी तरह काम करता है:

```json
{
  "format": "lite",
  "materialization": "ready",
  "approval": "pre_approved",
  "promotion": null,
  "tasks": [
    {
      "id": 2,
      "locator": { "kind": "inline", "value": "#task-2" },
      "title": "Add retry queue",
      "status": "pending",
      "gates": []
    }
  ]
}
```

### Format, materialization, approval, और promotion

`format` MUST इनमें से एक होना चाहिए: `lite`, `full` और manifest के `plan_format` को प्रतिबिंबित करता है — यहाँ यह परिवर्तनीय है, manifest के विपरीत, क्योंकि एक Lite योजना MAY बाद में Full में प्रोन्नत हो। `materialization` MUST इनमें से एक होना चाहिए: `materializing` (योजना फ़ोल्डर लिखा जा रहा है), `ready` (मैटेरियलाइज़ेशन पूर्ण है), या `promoting` (एक Lite-से-Full प्रोन्नति प्रगति में है)। `approval` MUST इनमें से एक होना चाहिए: `pending`, `approved`, `pre_approved`; यह इस स्कीमा में OPTIONAL है ताकि इसके दर्ज होने से पहले लिखी गई कोई योजना अब भी सत्यापित हो — जब यह अनुपस्थित हो, README की `Approval` पंक्ति को मान मानें, और दोनों अनुपस्थित होने पर `pending` मानें। `promotion` किसी प्रोन्नति के बाहर `null` है, या यह एक ऑब्जेक्ट है जो प्रोन्नति के इरादे और लक्ष्य कार्यों को दर्ज करता है जबकि `materialization` का मान `promoting` होता है। इन फ़ील्ड्स द्वारा एनकोड किए गए पूर्ण जीवनचक्र के लिए देखें [Lite योजनाएँ](/spec/lite-plans)।

### कार्य प्रविष्टियाँ

हर कार्य — Full योजना में एक अलग फ़ाइल, या Lite योजना में एक इनलाइन `{#task-N}` रिकॉर्ड — का `tasks` में ठीक एक प्रविष्टि MUST होनी चाहिए, जो उसके नंबर (`id`) और उसके `locator` द्वारा कुंजीबद्ध हो। `locator.kind` MUST `file` होना चाहिए (Full — `value` कार्य का फ़ाइलनाम है) या `inline` (Lite — `value` कार्य का एंकर है, `#task-N`)।

`status` MUST इनमें से एक होना चाहिए: `pending`, `in_progress`, `completed`, `blocked`, `skipped`। `skipped` तभी मान्य है जब उपयोगकर्ता ने `refine` के माध्यम से स्पष्ट रूप से कार्य को दायरे से हटाया हो; `state.json` MUST NOT काम को चुपचाप छोड़ने के लिए उपयोग किया जाना चाहिए।

एक `completed` प्रविष्टि में MUST `completed_at` होना चाहिए और, जहाँ योजना कमिट करती है, संक्षिप्त `commit` हैश — यह योजना-से-कोड ट्रेसेबिलिटी लिंक है।

### गेट रिकॉर्ड

एक सत्यापन कमांड के प्रत्येक रन को SHOULD गेट रिकॉर्ड के रूप में दर्ज किया जाना चाहिए: `command`, `passes` (boolean), `exit_code`, `last_run`, और एक संक्षिप्त मानव-पठनीय `evidence` स्ट्रिंग (एक सारांश पंक्ति या plan-local `analysis_results/` (plan के अपने folder के अंदर, repo root में कभी नहीं) के अंतर्गत एक पाथ, कभी पूर्ण कमांड आउटपुट नहीं)।

एक कार्य को `state.json` में `completed` MUST NOT अंकित किया जाना चाहिए जबकि उसके किसी भी गेट रिकॉर्ड में `passes: false` हो और कोई बाद का पासिंग रन न हो। गेट रिकॉर्ड "बिना प्रमाण के कभी पूर्ण अंकित न करें" के मशीन समकक्ष हैं — प्रति-आइटम `passes` फ़्लैग का वह पैटर्न जो समय से पहले पूर्णता की रक्षा करता है।

### एपिसोडिक मेमोरी के रूप में परिणाम रिकॉर्ड

एक `completed` कार्य में SHOULD एक `outcome` रिकॉर्ड होना चाहिए: क्या `tried` (प्रयास किया), क्या `failed` (विफल रहा), क्या `worked` (काम आया), और मुक्त-रूप `notes`। प्रत्येक प्रविष्टि को एक पंक्ति तक सीमित रखें।

परिणाम रिकॉर्ड एक समाप्त योजना को पुनर्प्राप्ति योग्य **एपिसोडिक मेमोरी** बनाते हैं: एक एजेंट (या एक मेमोरी-इंडेक्सिंग प्लेटफ़ॉर्म) बाद में यह याद कर सकता है कि कोई समस्या कैसे हल हुई, न केवल यह कि वह हुई। वे कार्य-स्थानीय स्किल्स निर्णयों और Final Review के स्किल्स समाधान को पोषित करते हैं, जो पैटर्न खोजते समय उन्हें पढ़ता है। Hermes जैसे प्लेटफ़ॉर्म पर जो एजेंट मेमोरी को इंडेक्स करते हैं, `state.json` में परिणाम रिकॉर्ड भविष्य के सत्रों में पूर्ण योजनाओं को सीधे पुनर्प्राप्ति योग्य बनाते हैं।

### चेकपॉइंट और अवरुद्ध स्थिति

`checkpoint` वर्तमान कार्य के भीतर सबसे सूक्ष्म रिज्यूम बिंदु दर्ज करता है: कार्य `id`, एक मुक्त-रूप `step` लोकेटर, एक टाइमस्टैम्प, और एक एक-पंक्ति नोट। एक एजेंट को SHOULD इसे अद्यतन करना चाहिए जब भी वह किसी कार्य के बीच में रुके; किसी भी नियोजित रुकावट से पहले अनुपस्थित मोड में MUST अद्यतन करना चाहिए।

`blocked` या तो `null` है या `{ "task": N, "reason": "...", "since": "...", "needs": "..." }`। एक अनुपस्थित एजेंट जो रोक-शर्त से टकराता है, रुकने से पहले MUST `blocked` को पॉपुलेट करना चाहिए — यह वह तरीका है जिससे डेमन का अगला हार्टबीट, या कोई मानव, यह जान सकता है कि योजना क्यों रुकी।

## प्रक्षेपण और पुनर्मेल

markdown MUST हर असहमति जीतनी चाहिए। यदि `state.json` कहता है कि कार्य 4 `completed` है लेकिन योजना README एक अचिह्नित बॉक्स दिखाता है, तो स्थिति फ़ाइल पुरानी है।

एक रिज्यूम करने वाले एजेंट को जारी रखने से पहले MUST README चेकबॉक्स सूची की `state.json` से तुलना करनी चाहिए। desync पर उसे markdown से (और जहाँ उपलब्ध हो, git लॉग से) `state.json` पुनर्जनित करना MUST, `PROGRESS.md` में पुनर्मेल दर्ज करना MUST, और उसके बाद ही आगे बढ़ना चाहिए।

`verify` सब-स्किल को MUST desync को एक अनुरूपता-खोज मानना चाहिए: रिपोर्ट करें कि कौन से कार्य असहमत हैं और किस दिशा में।

निष्पादन करने वाले एजेंट के अलावा अन्य टूल्स को MUST दोनों JSON फ़ाइलों को केवल-पठन मानना चाहिए।

## स्कीमा संस्करण-निर्धारण

दोनों स्कीमा URL द्वारा संस्करणबद्ध हैं। एक संस्करण के भीतर योगात्मक फ़ील्ड की अनुमति है; किसी फ़ील्ड का नाम बदलने या पुनः-टाइप करने के लिए एक नए स्कीमा संस्करण और spec changelog में एक माइग्रेशन नोट की आवश्यकता है। यह संशोधन दोनों स्कीमा के लिए `/v2.json` पेश करता है: कार्य-प्रविष्टि की `file` फ़ील्ड एक टाइप्ड `locator` (`{"kind": "file" | "inline", "value": ...}`) बन जाती है, manifest को `plan_format` मिलता है, और state फ़ाइल को `format`, `materialization`, `approval`, और `promotion` मिलते हैं — साथ मिलकर वे फ़ील्ड जो Lite योजनाओं को चाहिए (देखें [Lite योजनाएँ](/spec/lite-plans))। `/v1.json` manifest और state फ़ाइलें मान्य बनी रहती हैं और कभी चुपचाप v2 में फिर से नहीं लिखी जातीं; एक `refine` सत्र किसी एक को जानबूझकर माइग्रेट कर MAY। manifest में `spec_version` फ़ील्ड वह DWP spec संस्करण पिन करता है जिसके अंतर्गत योजना बनाई गई थी; अपने स्थापित spec से नई योजना से सामना होने वाले एजेंट को SHOULD अनुमान लगाने के बजाय यह कहना चाहिए।
