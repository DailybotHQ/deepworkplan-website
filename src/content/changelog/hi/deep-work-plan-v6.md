---
title: "DWP v6: वही विधि, अधिक सख्त अनुबंध"
description: "Deep Work Plan v6, v5 कार्यप्रणाली बनाए रखता है और अधिक सख्त निष्पादन संरचना जोड़ता है। एजेंट परिणामों की गैर-अवरता मापी नहीं गई है।"
date: 2026-09-28
version: "v6 · अधिक सख्त संरचना"
kind: release
lang: hi
order: 0
featured: false
sourceLabel: "प्रकाशित v6 स्कीमा सेट"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6, v5 कार्यप्रणाली, कमांड सतह और `.dwp/plans/` स्थान बनाए रखता है। यह योजना प्राधिकरण, निष्पादन साक्ष्य, कार्य संदर्भ, शेड्यूलिंग और लाइव स्थिति को दर्शाने के लिए अधिक सख्त संरचना जोड़ता है।

v6 स्कीमा सेट पहचान मैनिफेस्ट, परिणाम और प्राधिकरण अनुबंध, केवल-जोड़ जर्नल घटनाएँ, प्रति-कार्य संदर्भ मैनिफेस्ट और लाइव स्नैपशॉट परिभाषित करता है। v6 लाइव प्रोजेक्शन एक स्नैपशॉट है, इसलिए `plan-state/v5.json` v5 योजनाओं के लिए state स्कीमा बना रहता है; `plan-state/v6.json` मौजूद नहीं है। मौजूदा योजनाएँ अपनी दर्ज पीढ़ी बनाए रखती हैं और चुपचाप फिर से नहीं लिखी जातीं।

आर्किटेक्चर निर्णय GO है: v6 अधिक सख्त इंजीनियरिंग संरचना के साथ वही कार्यप्रणाली बनाए रखता है। यह अनुभवजन्य श्रेष्ठता का दावा नहीं है। एजेंट परिणामों की गैर-अवरता मापी नहीं गई है।

नई योजनाओं को कम-से-कम तीन अंकों वाली क्रमशः बढ़ती संख्यात्मक ID मिलती है (उदाहरण: `PLAN_001_add_payment_webhooks/`)। स्थिर v5 स्कीमा संख्यात्मक ID को एक शब्द गिनते हैं, इसलिए v5 slug में 2–4 शब्द और v6 slug में 2–5 शब्द होते हैं। मौजूदा बिना नंबर वाले `PLAN_<slug>/` फ़ोल्डर पढ़ने योग्य बने रहते हैं और उनका नाम कभी नहीं बदला जाता। नंबर वाली योजनाएँ मौजूद होने पर `latest` सबसे बड़ी संख्यात्मक ID वाली योजना को दर्शाता है।

इंस्टॉल किया गया skill रिलीज़: **6.0.2**। 6.x पैक नए प्लान डिफ़ॉल्ट रूप से v6 में बनाता है। मौजूदा प्लान अपनी दर्ज पीढ़ी बनाए रखते हैं; माइग्रेशन के लिए स्पष्ट अनुरोध और पूर्वावलोकन आवश्यक है।
