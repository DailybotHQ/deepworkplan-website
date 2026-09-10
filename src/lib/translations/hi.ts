/**
 * hi translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const hi: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — AI कोडिंग एजेंट्स के लिए संरचित निष्पादन',
  siteDescription:
    'Deep Work Plan: बहु-घंटे चलने वाले AI-एजेंट निष्पादन को संरचित, सत्यापित और फिर से शुरू करने योग्य बनाने के लिए एक खुली पद्धति और संदर्भ किट।',

  // Navigation
  nav: {
    home: 'मुखपृष्ठ',
    about: 'परिचय',
    contact: 'संपर्क',
    // Deep Work Plan IA
    methodology: 'पद्धति',
    spec: 'विनिर्देश',
    kit: 'किट',
    examples: 'उदाहरण',
    init: 'Init',
    quickstart: 'त्वरित शुरुआत',
    trust: 'भरोसा',
    developers: 'डेवलपर',
    privacy: 'गोपनीयता',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: 'सोर्स कोड',
      website: 'वेबसाइट रिपॉज़िटरी',
      websiteDesc: 'यह साइट',
      skill: 'स्किल रिपॉज़िटरी',
      skillDesc: 'इंस्टॉल करने योग्य स्किल',
    },
    menu: 'मेनू खोलें',
    closeMenu: 'मेनू बंद करें',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    poweredBy: 'द्वारा संचालित',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'नया · टोकन-कुशल',
    text: 'Deep Work Plan आज Product Hunt पर है',
    tagline: 'अपने एजेंट को एक प्लान दें',
    linkText: 'अपवोट करें',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'साइट नेविगेशन',
    sections: {
      methodology: 'पद्धति',
      getStarted: 'शुरुआत करें',
      project: 'परियोजना',
      connect: 'जुड़ें',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — AI कोडिंग एजेंट्स के लिए संरचित निष्पादन',
      description:
        'मॉडल से ज़्यादा कॉन्टेक्स्ट मायने रखता है। Deep Work Plan किसी भी रिपॉज़िटरी को एक संरचित वातावरण में बदल देता है जहाँ कोई भी कोडिंग एजेंट लंबे काम को पूरा करता है।',
    },
    hero: {
      badge: 'खुली पद्धति · MIT · एजेंट-निरपेक्ष',
      title: 'मॉडल मायने रखते हैं।',
      titleEmphasis: 'कॉन्टेक्स्ट और भी ज़्यादा।',
      subtitle:
        'Deep Work Plan किसी भी रिपॉज़िटरी को एक संरचित वातावरण में बदल देता है — संदर्भ, सुरक्षा-बाउंड्री और एक टिकाऊ योजना — जहाँ कोई भी कोडिंग एजेंट परिशुद्धता और दक्षता से निष्पादित करता है और लंबे कार्य को पूरा करता है।',
      instructionLabel: 'अपने एजेंट में कॉपी करें',
      instruction:
        'init.md प्रॉम्प्ट कॉपी करें और इसे अपने कोडिंग एजेंट — Claude Code, Cursor, Codex, या किसी भी अन्य — में पेस्ट करें, ताकि किसी भी रिपॉज़िटरी को AI-first बनाया जा सके।',
      copyLabel: 'init.md कॉपी करें',
      copiedLabel: 'कॉपी हो गया',
      viewInitCta: 'पूरा /init प्रॉम्प्ट देखें',
      pullQuote:
        'Deep Work Plan स्पेक-ड्रिवन डेवलपमेंट है, जहाँ रिपॉज़िटरी स्वयं हार्नेस बन जाती है।',
      primaryCta: 'पद्धति पढ़ें',
      secondaryCta: 'विनिर्देश पढ़ें',
      illustrationAlt:
        'चट्टानी तट पर खड़ा एक प्रकाशस्तंभ एक छोटी नौका का मार्गदर्शन करता एकमात्र प्रकाश-पुंज फेंकता है — एक उत्कीर्णन जो रिपॉज़िटरी को एक स्थिर हार्नेस के रूप में दर्शाता है जो किसी भी एजेंट का मार्गदर्शन करती है।',
      scrollCta: 'यह कैसे काम करता है, देखें',
    },
    pitch: {
      kicker: 'समस्या और उत्तर',
      problem:
        'छोटे विस्फोटों में कोडिंग एजेंट शानदार होते हैं। उन्हें एक लंबा मिशन सौंपिए — एक माइग्रेशन, एक नया सबसिस्टम, दर्जनों फ़ाइलों की रिफैक्टरिंग — और वे भटक जाते हैं: संदर्भ भर जाता है, पहले के निर्णय फीके पड़ जाते हैं, और घंटों का कार्य आधे रास्ते में रुक जाता है।',
      answer:
        'Deep Work Plan स्पेसिफिकेशन-संचालित विकास से जवाब देता है: एक टिकाऊ योजना, परमाणु कार्य, और सत्यापन द्वार जिन्हें एजेंट को पास करना होता है। “पूर्ण” एक भावना नहीं रहता — यह सत्यापित, समीक्षित साक्ष्य बन जाता है।',
      efficiency:
        'और क्योंकि संदर्भ आपके एजेंट का सबसे दुर्लभ संसाधन है, harness टोकन-दक्षता के लिए डिज़ाइन किया गया है: निर्देश प्रगतिशील रूप से लोड होते हैं, सत्यापन केवल बदले हुए पर लागू होता है, और हर कार्य स्थानीय रूप से सीखता है — लंबा कार्य किफ़ायती रहता है।',
      illustrationAlt:
        'एक उत्कीर्ण डिप्टिक: एक ओर कोहरे में चट्टानों के पास बहता जहाज़, दूसरी ओर वही जहाज़ बनाए गए मार्ग पर बंदरगाह की लौ की ओर स्थिर।',
    },
    story: {
      act1: {
        kicker: 'पद्धति · अंक I',
        lead: '“पूर्ण” का अर्थ और सीमाएँ तय करना आपका काम है। योजना आपका इरादा ले जाती है; एजेंट घंटे लगाते हैं — बिना लगातार निगरानी, बिना हर बीस मिनट में सुधार।',
        deepLinkLabel: 'पद्धति पढ़ें',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'पद्धति · अंक II',
        lead: 'लंबे कार्य किसी भी मॉडल का संदर्भ भर देते हैं। विवरण खो जाते हैं और एजेंट भटक जाता है। लिखित योजना — परमाणु कार्य, सत्यापन द्वार, पुनरारंभ योग्य स्थिति — ही वह आधार है जिस पर वह बार-बार लौटता है।',
        deepLinkLabel: 'मुख्य चक्र देखें',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'पद्धति · अंक III',
        lead: 'प्रत्येक कार्य अपने स्वीकृति मानदंड और उन जाँचों को नामित करता है जो पास होनी चाहिए। एजेंट “पूर्ण महसूस” नहीं कर सकता — पास करना ज़रूरी है, अन्यथा कार्य खुला रहता है।',
        deepLinkLabel: 'विनिर्देश पढ़ें',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'पद्धति · अंक IV',
        lead: 'संदर्भ, उपकरण, सुरक्षा-बाउंड्री और स्थिति आपके रिपॉज़िटरी में सादी फ़ाइलों के रूप में रहते हैं जिन्हें कोई भी एजेंट पढ़ सकता है। न लॉक-इन, न बाहरी दिमाग — यह संदर्भ-रीसेट के बाद भी टिकता है।',
        deepLinkLabel: 'देखें ऑनबोर्डिंग क्या बनाता है',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'पद्धति · अंक V',
        lead: 'संदर्भ आपके एजेंट का सबसे दुर्लभ संसाधन है। harness प्रगतिशील रूप से लोड होता है, केवल बदले हुए को सत्यापित करता है और कार्य दर कार्य सीखता है — योजना खुद का खर्च निकालती है।',
        deepLinkLabel: 'पद्धति पढ़ें',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'तर्क-आधारित ऑनबोर्डिंग',
      title:
        'इसे किसी भी रिपॉज़िटरी की ओर इंगित करें। यह तर्क करता है — कॉपी-पेस्ट नहीं।',
      subtitle:
        'ऑनबोर्डिंग प्रवाह आपकी रिपॉज़िटरी की वास्तविक भाषाओं, फ़्रेमवर्क, पैकेज मैनेजर और सत्यापन कमांड्स का निरीक्षण करता है, फिर उस रिपॉज़िटरी के अनुरूप ढाले गए आर्टिफ़ैक्ट तैयार करता है। एक सामान्य स्टब को विफलता माना जाता है।',
      steps: [
        {
          title: 'आपके स्टैक और आर्किटाइप पर तर्क करता है',
          description:
            'मैनिफ़ेस्ट, फ़ोल्डर संरचना और CI पढ़कर वास्तविक test, lint और build कमांड्स का अनुमान लगाता है, फिर रिपॉज़िटरी को एक स्वतंत्र रिपॉज़िटरी या एक ऑर्केस्ट्रेटर हब के रूप में वर्गीकृत करता है।',
        },
        {
          title: 'AGENTS.md, docs/ और प्रति-मॉड्यूल docs तैयार करता है',
          description:
            'एक तर्कपूर्ण AGENTS.md, एक वर्गीकृत docs/ पदानुक्रम, और हर बड़े मॉड्यूल के भीतर एक README तथा docs/ — आपकी रिपॉज़िटरी की वास्तविक कमांड्स से भरे, प्लेसहोल्डर नहीं।',
        },
        {
          title:
            '.claude और .cursor से .agents सिमलिंक के साथ .agents/ का ढाँचा बनाता है',
          description:
            'एक क्रॉस-एजेंट .agents/ डायरेक्टरी (स्किल्स, एजेंट्स, कमांड्स) और .claude तथा .cursor से .agents सिमलिंक, जो CLAUDE.md को AGENTS.md से मिरर करता है, ताकि हर उपकरण सत्य के एक ही स्रोत को पढ़े।',
        },
        {
          title: 'DWP स्किल स्थापित करता है और .dwp/ का ढाँचा बनाता है',
          description:
            'Deep Work Plan स्किल को जोड़ता है और योजनाओं तथा ड्राफ़्ट के लिए gitignored .dwp/ फ़ोल्डर बनाता है, अनिवार्य AI Diff Reviewer स्थानीय समीक्षा स्थापित करता है, फिर वैकल्पिक रूप से devcontainer समर्थन जैसे ऑप्ट-इन ऐडऑन जोड़ता है।',
        },
      ],
    },
    quickstart: {
      badge: 'इसे चलाने पर क्या होता है',
      title: 'एक निर्देश। बाकी काम रिपॉज़िटरी कर देती है।',
      subtitle:
        'आप न तो कोई इंस्टॉल विधि चुनते हैं, न कोई टेम्पलेट कॉपी करते हैं। आप अपने एजेंट को एक पंक्ति देते हैं; वह स्किल — पुनः-प्रयोज्य इंजन — स्थापित करता है और आपकी रिपॉज़िटरी को उसके अनुरूप ढाल देता है।',
      steps: [
        {
          title: 'आपका एजेंट /init.md खोलता है',
          description:
            'यह deepworkplan.com/init.md पर ऑनबोर्डिंग प्रॉम्प्ट और उससे जुड़ी पद्धति, विनिर्देश तथा किट पढ़ता है — वह मानक जिसे यह अपनाने वाला है।',
        },
        {
          title: 'यह Deep Work Plan स्किल स्थापित करता है',
          description:
            'स्किल वह इंजन है — हर रिपॉज़िटरी में एक समान। एक कमांड Claude Code, Cursor, Codex, Gemini और Copilot के लिए राउटर तथा उसके सब-स्किल्स (create, execute, refine, resume, status, verify, onboard, author) को ले आती है।',
        },
        {
          title: 'यह आपकी रिपॉज़िटरी को ढालता है',
          description:
            'आपके वास्तविक स्टैक पर तर्क करते हुए — कभी कॉपी-पेस्ट किए बिना — यह AGENTS.md, एक वर्गीकृत docs/ वृक्ष, प्रति-मॉड्यूल README, एक तर्कपूर्ण .agents/ किट और एक gitignored .dwp/ लिखता है। आपकी रिपॉज़िटरी ही हार्नेस बन जाती है।',
        },
        {
          title: 'आप योजना बनाते और निष्पादित करते हैं',
          description:
            'किसी भी काम के लिए लंबे समय तक चलने वाली Deep Work Plans तैयार करें और उन्हें चरण-दर-चरण चलाएँ — स्पष्ट स्वीकृति मानदंडों, सत्यापन-गेटों और फिर से शुरू होने योग्य स्थिति के साथ — स्वायत्त रूप से, घंटों तक।',
        },
      ],
      note: 'स्किल हर जगह एक ही तरह स्थापित होती है; जो ढाला जाता है वह आपकी रिपॉज़िटरी है — आपके स्टैक के लिए तैयार किया गया AGENTS.md, docs और तर्कपूर्ण .agents/ किट। यही विभाजन इस पद्धति को एक बार के ढाँचे के बजाय एक पुनः-प्रयोज्य मानक बनाता है।',
    },
    outcomes: {
      badge: 'आपको क्या मिलता है',
      title: 'स्वायत्त रूप से काम करने के लिए आपके एजेंट को जो कुछ चाहिए, सब कुछ।',
      subtitle:
        'एक ही रन, एटॉमिक रूप से कमिट किया गया। हर आउटपुट Markdown है और हर बदलाव ऑडिट करने योग्य है।',
      items: [
        {
          label: 'रिपॉज़िटरी रूट पर AGENTS.md',
          detail:
            'आपकी रिपॉज़िटरी के वास्तविक स्टैक, कमांड्स और संरचना से तर्क करके बनाया गया — प्लेसहोल्डर वाला टेम्पलेट नहीं। CLAUDE.md को AGENTS.md से सिमलिंक किया गया है।',
        },
        {
          label: 'वर्गीकृत docs/ और प्रति-मॉड्यूल docs',
          detail:
            'आर्किटेक्चर, सेटअप, मानक और समस्या-निवारण — साथ ही हर बड़े मॉड्यूल के भीतर एक README और docs/, जो आपके कोडबेस से तैयार किए गए हैं।',
        },
        {
          label: '.claude और .cursor से .agents सिमलिंक के साथ .agents/',
          detail:
            'एक क्रॉस-एजेंट .agents/ डायरेक्टरी (स्किल्स, एजेंट्स, कमांड्स) जिसमें .claude और .cursor से .agents सिमलिंक हैं, ताकि हर उपकरण सत्य के एक ही स्रोत को पढ़े।',
        },
        {
          label: 'Deep Work Plan स्किल, स्थापित',
          detail:
            'create, execute, refine, resume, status, verify, onboard और author — आपके एजेंट को एक ही स्किल पैक के रूप में उपलब्ध, बिना किसी प्रति-रिपॉज़िटरी कॉपी के।',
        },
        {
          label: 'अनुरूपता जिसे आप जाँच सकते हैं',
          detail:
            '/dwp-verify विनिर्देश के विरुद्ध एक वस्तुनिष्ठ पास/फ़ेल रिपोर्ट तैयार करता है, ताकि "AI-first" दावा नहीं, बल्कि सत्यापित हो — और हर योजना के बाद फिर से सत्यापन योग्य।',
        },
        {
          label: 'दो आर्किटाइप, संभाले गए',
          detail:
            'ऑनबोर्डिंग आपकी रिपॉज़िटरी को एक स्वतंत्र रिपॉज़िटरी (सामान्य मामला) या एक ऑर्केस्ट्रेटर हब के रूप में वर्गीकृत करती है, जो रिपॉज़िटरीज़ के पार चाइल्ड योजनाओं का समन्वय करता है।',
        },
        {
          label: 'एक जीवंत किट जिसे आपकी रिपॉज़िटरी बढ़ाती है',
          detail:
            'author सब-स्किल (skill-create, agent-create) रिपॉज़िटरी को अपनी स्किल्स, एजेंट्स और कमांड्स विकसित करने देती है; dependency-upgrade जैसे ऑप्ट-इन रखरखाव ऐडऑन उसे स्वयं को अद्यतन रखने में मदद करते हैं।',
        },
        {
          label: 'Git-नेटिव, फिर से शुरू होने योग्य, .dwp/',
          detail:
            'कोई डेमॉन नहीं, कोई बाहरी स्थिति नहीं। योजनाएँ और ड्राफ़्ट एक gitignored .dwp/ फ़ोल्डर में रहते हैं, और कोई भी काम केवल git से फिर शुरू होता है — कॉन्टेक्स्ट भर जाने के बाद भी।',
        },
      ],
    },
    agents: {
      badge: 'एजेंट्स',
      title: 'उसी एजेंट के साथ काम करता है जिसका आप पहले से उपयोग करते हैं।',
      subtitle:
        'एक पद्धति, अनेक अडैप्टर। Markdown फ़्रेमवर्क को किसी से नहीं बाँधता — Markdown पढ़ने वाला हर एजेंट एक Deep Work Plan चला सकता है।',
      fullLabel: 'पूर्ण',
      partialLabel: 'आंशिक',
      viewAllCta: 'सभी एजेंट देखें',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'संदर्भ कार्यान्वयन, नेटिव WebFetch और स्लैश कमांड्स के साथ।',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'पूर्ण अडैप्टर। यदि WebFetch प्रतिबंधित हो तो ऑफ़लाइन बंडल का उपयोग करें।',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'ऑफ़लाइन बंडल अनुशंसित; नियम .codex/ के अंतर्गत स्थापित।',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'पूर्ण अडैप्टर — dwp-* कमांड्स AGENTS.md और # प्रक्रियाओं के माध्यम से चलते हैं।',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Gemini 2.5 Pro या नया आवश्यक, नेटिव WebFetch के साथ।',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'ओपन सोर्स। AGENTS.md को नेटिव रूप से पढ़ता है और dwp-* को # कमांड्स से चलाता है।',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'नियम और # कमांड प्रक्रियाएँ पूरे Deep Work Plan लूप को चलाती हैं।',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'ओपन सोर्स। Markdown नियम और # कमांड्स हर dwp-* चरण को चलाते हैं।',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'नेटिव कमांड सतह के साथ पूर्ण अडैप्टर।',
        },
      ],
    },
    stacks: {
      badge: 'स्टैक्स',
      title: 'उन स्टैक्स के लिए तर्क-प्रीसेट जो मायने रखते हैं।',
      subtitle:
        'ये तर्क में सहायक हैं, टेम्पलेट नहीं। ऑनबोर्डिंग आपकी रिपॉज़िटरी के वास्तविक मैनिफ़ेस्ट पढ़कर हर स्टैक के अनुसार ढलती है — यह कभी आँख मूँदकर कोई प्रीसेट कॉपी नहीं करती। मोनोरेपो को प्रति-मॉड्यूल docs मिलते हैं।',
      viewAllCta: 'सभी प्रीसेट देखें',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Modules · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Generic', sub: 'कोई भी स्टैक' },
      ],
    },
    archetypes: {
      badge: 'दो आर्किटाइप',
      title: 'स्वतंत्र रिपॉज़िटरी, या ऑर्केस्ट्रेटर हब।',
      subtitle:
        'ऑनबोर्डिंग आर्किटाइप पर शाखाएँ बनाती है। अधिकांश रिपॉज़िटरीज़ स्वतंत्र रिपॉज़िटरी होती हैं। एक हब कई रिपॉज़िटरीज़ के पार चाइल्ड Deep Work Plans का समन्वय करता है। यह पद्धति दोनों को प्रथम-श्रेणी के रूप में संभालती है।',
      individual: {
        tag: 'सामान्य मामला',
        title: 'स्वतंत्र रिपॉज़िटरी',
        description:
          'एक प्राथमिक स्टैक, अपने सत्यापन कमांड्स और प्रति-मॉड्यूल docs वाला एकल कोडबेस। डिफ़ॉल्ट — ऑनबोर्डिंग यही मानती है, जब तक कि रिपॉज़िटरी स्पष्ट रूप से एक हब न हो।',
        example:
          'उदाहरण के लिए, एक Django API, एक Vue ऐप, या एक TypeScript Lambda सेवा।',
      },
      orchestrator: {
        tag: 'समन्वय',
        title: 'ऑर्केस्ट्रेटर हब',
        description:
          'एक समन्वय रिपॉज़िटरी जो एक ऑर्केस्ट्रेटर मैनिफ़ेस्ट के माध्यम से सब-रिपॉज़िटरीज़ में काम का समन्वय करती है, चाइल्ड योजनाएँ बनाती है जो प्रत्येक अपनी रिपॉज़िटरी में कमिट करती हैं, साथ ही सीमा-नियम और एक नेविगेशन इंडेक्स।',
        example: 'उदाहरण के लिए, पाँच प्रोडक्ट रिपॉज़िटरीज़ का समन्वय करता एक हब।',
      },
    },
    comparison: {
      badge: 'पद्धति बनाम उपकरण',
      title: 'एक अलग परत। पूरक, प्रतिस्पर्धी नहीं।',
      subtitle:
        'Deep Work Plan कोई और स्कैफ़ोल्डर नहीं है। यह किसी भी स्पेक-ड्रिवन या स्कैफ़ोल्डिंग उपकरण के नीचे की पद्धति-परत है, जो बहु-घंटे स्वायत्त रनों पर केंद्रित है।',
      colDwp: 'Deep Work Plan',
      colOthers: 'स्कैफ़ोल्डिंग / स्पेक उपकरण',
      rows: [
        {
          label: 'प्राथमिक केंद्र',
          dwp: 'बहु-घंटे स्वायत्त निष्पादन',
          others: 'स्पेक या स्कैफ़ोल्ड निर्माण',
        },
        {
          label: 'काम की इकाई',
          dwp: 'एक Deep Work Plan (फिर से शुरू होने योग्य सत्र)',
          others: 'एक स्पेक दस्तावेज़ या एक स्कैफ़ोल्ड',
        },
        {
          label: 'स्थिति मॉडल',
          dwp: 'Git-नेटिव .dwp/ फ़ोल्डर, फिर से शुरू होने योग्य',
          others: 'अक्सर बाहरी या IDE के भीतर',
        },
        {
          label: 'एजेंट युग्मन',
          dwp: 'एजेंट-निरपेक्ष (Markdown और Bash)',
          others: 'अक्सर उपकरण- या IDE-विशिष्ट',
        },
        {
          label: 'कॉन्टेक्स्ट पुनर्प्राप्ति',
          dwp: 'कॉन्टेक्स्ट भर जाने के बाद फिर शुरू होता है',
          others: 'आमतौर पर काम फिर से शुरू करता है',
        },
        {
          label: 'लाइसेंस',
          dwp: 'MIT, खुली पद्धति और किट',
          others: 'भिन्न-भिन्न',
        },
      ],
    },
    origin: {
      badge: 'उद्गम',
      quote:
        'Dailybot द्वारा निर्मित — वितरित टीमों के लिए असिंक्रोनस स्टैंडअप के पीछे की कंपनी। आंतरिक रूप से हमने Django, Vue, TypeScript Lambda और Astro में फैली प्रोडक्शन रिपॉज़िटरीज़ को एजेंट-संचालन योग्य बनाने के लिए Deep Work Plans का उपयोग किया। महीनों के प्रोडक्शन उपयोग के बाद, हमने इस पद्धति को MIT के अंतर्गत ओपन-सोर्स किया।',
      attribution: 'Dailybot इंजीनियरिंग टीम',
      dailybotCta: 'Dailybot के बारे में जानें',
    },
    finalCta: {
      badge: 'अपनी रिपॉज़िटरी को AI-first बनाएँ',
      title: 'अपने एजेंट्स को गहन काम दें।',
      subtitle:
        'अपने एजेंट को एक पंक्ति दें — उसे /init.md की ओर इंगित करें — और वह आपकी रिपॉज़िटरी को AI-first बना देता है: यह स्किल स्थापित करता है, आपके स्टैक पर तर्क करता है, और एक पूर्ण AGENTS.md पदानुक्रम कमिट करता है। वहाँ से आप Deep Work Plans बनाते और निष्पादित करते हैं जो घंटों तक स्वायत्त रूप से चलती हैं।',
      primaryCta: '/init प्रॉम्प्ट खोलें',
      secondaryCta: 'पद्धति पढ़ें',
      tertiaryCta: 'एजेंटों और डेवलपर्स के लिए',
      meta: 'MIT-लाइसेंस प्राप्त · शून्य टेलीमेट्री · आउटपुट एक gitignored .dwp/ फ़ोल्डर में।',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'संपर्क',
    nameLabel: 'नाम',
    namePlaceholder: 'आपका नाम',
    emailLabel: 'ईमेल',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'संदेश',
    messagePlaceholder: 'अपना संदेश लिखें...',
    sendButton: 'संदेश भेजें',
  },

  // About page
  aboutPage: {
    title: 'पद्धति के बारे में',
    subtitle: 'खुली पद्धति · MIT लाइसेंस प्राप्त',
    description:
      'Deep Work Plan AI कोडिंग एजेंट्स के साथ गंभीर इंजीनियरिंग कार्य के लिए एक खुली, फ़्रेमवर्क-निरपेक्ष पद्धति है। यह कहाँ से आई और इसका रखरखाव कौन करता है।',
    heroDescription:
      'AI कोडिंग एजेंट्स के साथ गहन काम की योजना बनाने, निष्पादित करने और सत्यापित करने का एक दोहराने योग्य ढाँचा — खुले रूप में निर्मित और मुफ़्त उपयोग के लिए।',
    bioTitle: 'यह क्या है',
    bioText:
      'Deep Work Plan (DWP) एक पद्धति है, उत्पाद नहीं। यह परिभाषित करती है कि किसी लक्ष्य को एक सहमत योजना में कैसे बदला जाए, उस योजना को एटॉमिक और स्वतंत्र रूप से सत्यापन योग्य कार्यों में कैसे विभाजित किया जाए, और हर कार्य को एक केंद्रित लूप में कैसे चलाया जाए जो एक जाँच के साथ समाप्त होता है।<br /><br />यह जानबूझकर इस बारे में निरपेक्ष है कि आप कौन-सा AI एजेंट या स्टैक उपयोग करते हैं — अडैप्टर उसी मूल लूप को Claude, Cursor, Copilot, Codex, Gemini और अन्य में अनुवादित करते हैं। योजना, कार्य और चालू लॉग सभी सादे Markdown हैं, इसलिए काम पठनीय, समीक्षा योग्य और संस्करण-नियंत्रित बना रहता है।',
    passionsTitle: 'मूल सिद्धांत',
    passions: [
      {
        title: 'निष्पादन से पहले योजना',
        description:
          'योजना पर सहमति बनने तक कोई कोड नहीं लिखा जाता। योजना आपके और एजेंट के बीच एक अनुबंध है।',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'कार्य एटॉमिक होते हैं',
        description:
          'हर कार्य का दायरा ऐसा होता है कि उसे अकेले निष्पादित और सत्यापित किया जा सके, फिर एटॉमिक रूप से कमिट किया जा सके।',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'सब कुछ सत्यापित करें',
        description:
          'हर कार्य अगले के शुरू होने से पहले एक स्पष्ट जाँच के साथ समाप्त होता है, और प्रगति git में दर्ज होती है।',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'एक नज़र में',
    quickFacts: [
      'खुली पद्धति, MIT लाइसेंस प्राप्त',
      'फ़्रेमवर्क- और एजेंट-निरपेक्ष',
      'Dailybot और समुदाय द्वारा रखरखाव',
      'इसमें एक स्पेक, कमांड्स, अडैप्टर, प्रीसेट और उदाहरण शामिल हैं',
      'केवल Markdown — कोई रनटाइम नहीं, कोई लॉक-इन नहीं',
      'किसी भी रिपॉज़िटरी को AI-first, एजेंट-संचालन योग्य कोडबेस में बदल देती है',
    ],
    ctaTitle: 'इसका रखरखाव कौन करता है',
    ctaDescription:
      'Deep Work Plan, Dailybot के वास्तविक इंजीनियरिंग कार्य से उपजी और अब इसका रखरखाव Dailybot, ओपन-सोर्स समुदाय के साथ मिलकर करता है। पद्धति, विनिर्देश और किट MIT लाइसेंस के अंतर्गत जारी हैं — उपयोग, अनुकूलन और निर्माण के लिए मुफ़्त।',
    ctaCv: 'पद्धति पढ़ें',
    ctaContact: 'त्वरित शुरुआत',
  },

  // Contact page
  contactPage: {
    title: 'समुदाय और संपर्क',
    subtitle: 'ओपन सोर्स · समुदाय-संचालित',
    description:
      'Deep Work Plan खुले रूप में निर्मित है। नीचे दिए चैनलों के माध्यम से स्रोत खोजें, एक इश्यू खोलें, या चर्चा में शामिल हों — योगदान का स्वागत है।',
    heroDescription:
      'प्रश्न, विचार या सुधार? Deep Work Plan सार्वजनिक रूप से विकसित होती है — परियोजना और उसके रखरखावकर्ताओं तक यहाँ पहुँचें।',
    formTitle: 'एक संदेश भेजें',
    nameLabel: 'नाम',
    namePlaceholder: 'आपका नाम',
    emailLabel: 'ईमेल',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'मैं आपसे इस बारे में संपर्क करना चाहता हूँ',
    reasonOptions: [
      { value: '', label: '— एक विषय चुनें —' },
      { value: 'general', label: 'सामान्य / केवल नमस्ते कहना' },
      { value: 'tech-talk', label: 'टेक टॉक / वक्ता आमंत्रण' },
      { value: 'collaboration', label: 'सहयोग / साझेदारी' },
      { value: 'project', label: 'परियोजना / कार्य पूछताछ' },
      { value: 'dailybot', label: 'Dailybot के बारे में प्रश्न' },
      { value: 'trading', label: 'मेरी ट्रेडिंग के बारे में प्रश्न' },
      {
        value: 'the-library-of-tomorrow',
        label: 'The Library of Tomorrow में शामिल हों',
      },
      { value: 'other', label: 'अन्य' },
    ],
    subjectLabel: 'विषय',
    subjectPlaceholder: 'यह किस बारे में है?',
    messageLabel: 'संदेश',
    messagePlaceholder: 'अपना संदेश लिखें...',
    sendButton: 'संदेश भेजें',
    sendingButton: 'भेजा जा रहा है...',
    successTitle: 'संदेश भेज दिया गया',
    successMessage: 'संपर्क करने के लिए धन्यवाद। मैं यथाशीघ्र आपसे संपर्क करूँगा।',
    sendAnotherButton: 'एक और संदेश भेजें',
    requiredField: 'यह फ़ील्ड आवश्यक है',
    invalidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें',
    fallbackMessage:
      'संपर्क फ़ॉर्म अभी उपलब्ध नहीं है। आप मुझसे सीधे ईमेल द्वारा संपर्क कर सकते हैं।',
    fallbackEmailText: 'मुझे इस पते पर ईमेल भेजें',
    formNote: 'मैं यथाशीघ्र आपसे संपर्क करूँगा।',
    socialTitle: 'मुझसे जुड़ें',
    locationTitle: 'स्थान',
    locationText: 'कोलंबिया में स्थित। दुनिया भर में दूरस्थ सहयोग के लिए तैयार।',
    prefillSubjects: {
      generalInquiry: 'सामान्य पूछताछ',
      collaboration: 'सहयोग का अवसर',
      projectInquiry: 'परियोजना या कार्य पूछताछ',
      projectCollaboration: 'परियोजना सहयोग पूछताछ',
      startupCollaboration: 'स्टार्टअप सहयोग का अवसर',
      techTalkInvitation: 'टेक टॉक वक्ता आमंत्रण',
      tradingQuestion: 'ट्रेडिंग प्रश्न',
      dailybotQuestion: 'Dailybot के बारे में प्रश्न',
    },
  },

  contactSection: {
    title: 'आइए जुड़ें',
    description:
      'मैं हमेशा दिलचस्प बातचीत, सहयोग के अवसरों और नए विचारों के लिए तैयार रहता हूँ। चाहे आप तकनीक, उद्यमिता पर बात करना चाहें, या बस नमस्ते कहना चाहें।',
    ctaText: 'संपर्क करें',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'hi-IN',

  // 404 page
  notFoundPage: {
    title: 'पृष्ठ नहीं मिला',
    description:
      'आप जिस पृष्ठ को खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है। पद्धति देखें या ब्राउज़िंग जारी रखने के लिए मुखपृष्ठ पर लौटें।',
    heading: 'पृष्ठ नहीं मिला',
    message:
      'क्षमा करें, आप जिस पृष्ठ को खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया हो सकता है। मुखपृष्ठ पर वापस जाने या पद्धति देखने का प्रयास करें।',
    backHome: 'मुखपृष्ठ पर लौटें',
    exploreMethodology: 'पद्धति पढ़ें',
    agentTitle: 'AI एजेंटों के लिए',
    agentIntro:
      'यह पथ मौजूद नहीं है। नीचे दिए गए रिकवरी लिंक (और उनके मशीन-पठनीय समकक्ष) इस साइट का हर पृष्ठ सूचीबद्ध करते हैं।',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Deep Work Plan पद्धति',
      description:
        'मेनिफ़ेस्टो से आर्किटाइप तक पाँच अध्याय: Deep Work Plan के पीछे के सिद्धांत, मूल लूप, टेम्पलेट, स्किल्स तथा एजेंट्स और अनुकूलन।',
    },
    eyebrow: 'पद्धति',
    title: 'Deep Work Plan पद्धति',
    intro:
      'पाँच अध्याय जो आपको Deep Work Plan के पीछे के दर्शन से व्यावहारिक लूप, टेम्पलेट और रोज़मर्रा के अनुकूलनों तक ले जाते हैं।',
    chapterLabel: 'अध्याय',
    readChapter: 'अध्याय पढ़ें',
    prev: 'पिछला',
    next: 'अगला',
    backToIndex: 'सभी अध्याय',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan विनिर्देश',
      description:
        'Deep Work Plan पद्धति का पठनीय विनिर्देश: DWP प्रारूप, एजेंट प्रोटोकॉल, आर्किटाइप, दस्तावेज़ीकरण मानक और ऐडऑन।',
    },
    eyebrow: 'विनिर्देश',
    title: 'विनिर्देश',
    intro:
      'पद्धति का सटीक, पठनीय विनिर्देश — वे संरचनाएँ और प्रोटोकॉल जिन्हें मनुष्य और एजेंट साझा करते हैं।',
    tocTitle: 'इस पृष्ठ पर',
    prev: 'पिछला',
    next: 'अगला',
    backToIndex: 'सभी स्पेक दस्तावेज़',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Deep Work Plan किट',
      description:
        'स्किल और उसके आठ सब-स्किल्स, कमांड्स, अडैप्टर, प्रीसेट, ऑप्ट-इन ऐडऑन और उदाहरण जो Deep Work Plan को एजेंट्स तथा स्टैक्स के पार चलाने योग्य बनाते हैं।',
    },
    eyebrow: 'किट',
    title: 'किट',
    intro:
      'पद्धति चलाने के लिए आवश्यक सब कुछ: स्किल और उसके सब-स्किल्स, स्लैश कमांड्स, एजेंट अडैप्टर, ऑनबोर्डिंग प्रीसेट, अनिवार्य स्थानीय समीक्षा और ऑप्ट-इन ऐडऑन, तथा हल किए हुए उदाहरण।',
    groups: {
      command: {
        title: 'सब-स्किल्स और कमांड्स',
        description:
          'स्किल राउटर और उसके सब-स्किल्स (create, execute, refine, resume, status, verify, onboard, author), साथ ही वे पतले स्लैश कमांड्स जो उन्हें सौंपते हैं।',
      },
      adapter: {
        title: 'अडैप्टर',
        description: 'Claude, Cursor, Codex और अन्य के लिए पतले प्रति-एजेंट एकीकरण।',
      },
      preset: {
        title: 'ऑनबोर्डिंग प्रीसेट',
        description:
          'प्रति-स्टैक तर्क-मार्गदर्शिकाएँ जिन्हें onboard प्रवाह docs, स्किल्स और सत्यापन कमांड्स को आपकी रिपॉज़िटरी के अनुरूप ढालने के लिए उपयोग करता है।',
      },
      example: {
        title: 'उदाहरण',
        description: 'हल किए हुए, पहले-और-बाद के वॉकथ्रू।',
      },
      addon: {
        title: 'ऐडऑन (ऑप्ट-इन)',
        description:
          'वे क्षमताएँ जिन्हें onboard प्रवाह किसी रिपॉज़िटरी पर जोड़ता है: अनिवार्य AI Diff Reviewer स्थानीय समीक्षा और चार वैकल्पिक ऐडऑन, जो कभी भी AI-first आधार-रेखा का हिस्सा नहीं होते।',
      },
    },
    viewDetail: 'विवरण देखें',
    prev: 'पिछला',
    next: 'अगला',
    backToIndex: 'किट पर लौटें',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan उदाहरण',
      description:
        'पहले-और-बाद के वॉकथ्रू जो वही इंजीनियरिंग कार्य Deep Work Plan के साथ और बिना दिखाते हैं — और विश्वसनीयता तथा समीक्षा में अंतर।',
    },
    eyebrow: 'उदाहरण',
    title: 'उदाहरण',
    intro:
      'पद्धति को काम करते देखें — वास्तविक इंजीनियरिंग कार्यों के ठोस, पहले-और-बाद के वॉकथ्रू।',
    viewExample: 'वॉकथ्रू पढ़ें',
    prev: 'पिछला',
    next: 'अगला',
    backToGallery: 'सभी उदाहरण',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'त्वरित शुरुआत — Deep Work Plan',
      description:
        'स्किल स्थापित करें, अपनी रिपॉज़िटरी ऑनबोर्ड करें, फिर किसी भी एजेंट के साथ योजना बनाएँ और निष्पादित करें — वे चरण जो आपकी रिपॉज़िटरी को स्पेक-ड्रिवन बनाते हैं।',
    },
    eyebrow: 'त्वरित शुरुआत',
    title: 'मिनटों में शुरू करें',
    intro:
      'स्किल स्थापित करें, अपनी रिपॉज़िटरी ऑनबोर्ड करें, फिर किसी भी एजेंट के साथ योजना बनाएँ और निष्पादित करें — वे चरण जो आपकी रिपॉज़िटरी को स्पेक-ड्रिवन और एजेंट-संचालन योग्य बनाते हैं।',
    sequenceTitle: 'अपनाने का मार्ग',
    codeLabel: 'टर्मिनल',
    orLabel: 'या',
    steps: [
      {
        title: 'Deep Work Plan स्किल स्थापित करें',
        description:
          'अपनी रिपॉज़िटरी में स्किल जोड़ें — एक राउटर और आठ सब-स्किल्स (create, execute, refine, resume, status, verify, onboard, author)। सबसे तेज़ रास्ते के लिए Skills CLI का उपयोग करें, या रिपॉज़िटरी क्लोन करें और जहाँ git तथा शेल उपलब्ध हों वहाँ सेटअप चलाएँ।',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'रिपॉज़िटरी ऑनबोर्ड करें',
        description:
          'onboard सब-स्किल चलाएँ और एजेंट को अपनी वास्तविक रिपॉज़िटरी पर तर्क करने दें। यह AGENTS.md, एक docs/ ज्ञान-आधार, प्रति-मॉड्यूल docs, और एक क्रॉस-एजेंट .agents/ घर (.claude → .agents और .cursor → .agents सिमलिंक के साथ) तैयार करता है, पतले dwp-* कमांड्स जोड़ता है, और एक gitignored .dwp/ का ढाँचा बनाता है।',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'किट विकसित करें और ऐडऑन स्वीकार करें',
        description:
          'स्टैक-उपयुक्त स्किल्स, एजेंट्स और कमांड्स विकसित करने के लिए /skill-create और /agent-create (author सब-स्किल) का उपयोग करें। ऑनबोर्डिंग अनिवार्य AI Diff Reviewer स्थानीय समीक्षा स्थापित करती है (इसका CI गेट वैकल्पिक बना रहता है) और चार ऑप्ट-इन ऐडऑन प्रदान करती है — devcontainer, Dailybot, dependency-upgrade और design-system — जिन्हें आप तभी स्वीकार करते हैं जब वे उपयुक्त हों।',
      },
      {
        title: 'योजना बनाएँ और निष्पादित करें',
        description:
          'एक Deep Work Plan तैयार करें और उसे कार्य-दर-कार्य चलाएँ, हर गेट को सत्यापित करते हुए और सत्रों के पार फिर से शुरू करते हुए — रिपॉज़िटरी को उसके अपने स्पेक के विरुद्ध संचालित करते हुए।',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'परिणाम',
    outcome:
      'आपकी रिपॉज़िटरी स्पेक-ड्रिवन और एजेंट-संचालन योग्य बन जाती है: योजना सत्य का टिकाऊ स्रोत होती है, और रिपॉज़िटरी स्वयं वह हार्नेस बन जाती है जिसके विरुद्ध कोई भी एजेंट चलता है।',
    nextStepsTitle: 'अगले कदम',
    nextSteps: [
      { label: 'पद्धति पढ़ें', href: '/methodology' },
      { label: 'किट देखें', href: '/kit' },
      { label: 'उदाहरण देखें', href: '/examples' },
    ],
  },

  // Deep Work Plan — Trust & security page
  faqPage: {
    meta: {
      title: 'Frequently asked questions — Deep Work Plan',
      description:
        'Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it.',
    },
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    intro:
      'Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.',
    groups: [
      {
        id: 'what',
        title: 'What Deep Work Plan is',
        items: [
          {
            id: 'what-is-it',
            question: 'What does Deep Work Plan actually do?',
            answer:
              'Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Who is it for?',
            answer:
              'Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Is it a tool, a framework or a methodology?',
            answer:
              'A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.',
            linkLabel: 'Read the specification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Which coding agents does it work with?',
            answer:
              "Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.",
            linkLabel: 'Browse the kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'How a plan runs',
        items: [
          {
            id: 'gates',
            question:
              'How are the validation gates implemented? Do they need human sign-off?',
            answer:
              "They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'How does the plan avoid going stale when people change the code between runs?',
            answer:
              'On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Can I change the plan mid-run without losing completed work?',
            answer:
              'Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Does it keep checking the work against the plan, or is the plan an upfront thing?',
            answer:
              'The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Is the plan generated once and maintained by hand, or does it evolve with the code?',
            answer:
              "Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'What happens if the session dies halfway?',
            answer:
              "Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'What is the Final Review?',
            answer:
              "The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.",
            linkLabel: 'The specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'How it compares',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?',
            answer:
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow frameworks such as BMAD, Superpowers or Get Shit Done?',
            answer:
              'Those frameworks bring strong working styles: roles, principles, test-first steps, verification habits. Deep Work Plan focuses on what stays in the repository and what can be checked: a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The comparison page shows where each approach is built in, optional or out of scope.',
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: "Why not just use my agent's built-in plan mode?",
            answer:
              "Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopting it',
        items: [
          {
            id: 'install',
            question:
              'What does onboarding write into my repository, and does it touch existing files?',
            answer:
              'Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.',
            linkLabel: 'The adoption endpoint',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'What does it cost, and how is efficiency measured?',
            answer:
              'The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.',
            linkLabel: 'Trust and disclosure',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Still have a question?',
      body: 'Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.',
      ctaLabel: 'Ask on GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan compared with the alternatives — Deep Work Plan',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.',
      values: {
        builtIn: 'Built in',
        optional: 'Optional or via extension',
        notInScope: 'Not in scope',
      },
    },
    reviewedOnLabel: 'Last reviewed',
    alternativesTitle: 'The alternatives, on their own terms',
    officialSiteLabel: 'Official site',
    categories: {
      methodology: 'Methodology',
      sdd: 'Spec-driven development tools',
      agentFramework: 'Agent workflow frameworks',
      vendorNative: 'Vendor-native plan modes',
    },
    matrix: {
      title: 'Capability matrix',
      caption:
        'Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.',
      capabilityColumn: 'Capability',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Works with any coding agent',
        help: 'The same repository files drive Claude Code, Codex, Cursor, Gemini CLI and others.',
      },
      repoNativeHarness: {
        label: 'Writes the agent harness into the repository',
        help: "Instructions, docs, skills and commands live in the repository, not in one tool's settings.",
      },
      taskAcceptanceCriteria: {
        label: 'Acceptance criteria per task',
        help: 'Each task states observable conditions for being done.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Each task names the commands that must pass, selected from what it touched.',
      },
      resumableState: {
        label: 'Resumable state on disk',
        help: 'Progress survives a session reset and can be picked up by another agent or a teammate.',
      },
      finalReview: {
        label: 'Mandatory closing review with a security pass',
        help: 'The plan cannot complete without a security review of the full change set and validation of the final state.',
      },
      conformanceChecker: {
        label: 'Executable conformance checker',
        help: 'A script verifies the repository and its plans against the standard, with a CI-friendly exit code.',
      },
      instructionBudgetLedger: {
        label: 'Published instruction-load measurement',
        help: 'The bytes each flow loads are measured by a committed script and published with their limits.',
      },
      onboardingScaffold: {
        label: 'Onboarding that scaffolds documentation',
        help: "A first run writes the repository's agent-facing documentation and kit.",
      },
      brownfieldSpecs: {
        label: 'Living specs for existing systems',
        help: 'Changes are specified as deltas that merge into a growing specification of the system.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installs as a skill, onboards the repository into an agent harness and runs long-horizon plans with per-task validation gates, on-disk state and a mandatory Final Review.',
        audience:
          'Developers and teams who hand multi-session work to any coding agent and need it to finish verified.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves.',
        audience:
          'Solo developers and small teams who want context engineering and verification with little ceremony.',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards.',
        audience:
          'Anyone who wants planning inside a single agent without adopting a methodology.',
      },
    },
    dwpStrengths: {
      title: 'What Deep Work Plan brings',
      items: [
        {
          title: 'Tool-agnostic and repository-native',
          body: 'The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.',
        },
        {
          title: 'Validation selected from what each task touched',
          body: 'Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.',
        },
        {
          title: 'One Final Review with a security pass',
          body: 'A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.',
        },
        {
          title: 'State that survives sessions and agents',
          body: 'README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.',
        },
        {
          title: 'A conformance checker for the repository itself',
          body: 'A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.',
        },
        {
          title: 'Instruction load measured and published',
          body: 'A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.',
        },
      ],
    },
    honestLimits: {
      title: 'Honest limits',
      body: 'Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.',
    },
    correction: {
      title: 'Help us keep this accurate',
      body: 'This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.',
      ctaLabel: 'Open an issue',
    },
    sourcesTitle: 'Sources',
  },

  trustPage: {
    meta: {
      title: 'भरोसा और सुरक्षा',
      description:
        'Deep Work Plan को अपनाना क्यों सुरक्षित है: ओपन सोर्स और MIT, बिना नेटवर्क कॉल या टेलीमेट्री के Markdown-first, डिज़ाइन से गैर-विनाशकारी, सत्यापन योग्य इंस्टॉल और स्पष्ट भेद्यता-प्रकटीकरण नीति के साथ।',
    },
    eyebrow: 'भरोसा और सुरक्षा',
    title: 'भरोसा और सुरक्षा',
    intro:
      'किसी को भी वह स्किल इंस्टॉल नहीं करनी चाहिए जिस पर वे भरोसा न कर सकें। Deep Work Plan को सत्यापित किया जा सकता है, आस्था के आधार पर नहीं लिया जाता: ओपन सोर्स, Markdown-first, गैर-विनाशकारी, और चलाने से पहले जाँचने योग्य। यह पृष्ठ सरल भाषा में बताता है कि यह क्या करता है, क्या नहीं करता, और दोनों की पुष्टि कैसे करें।',
    pillarsTitle: 'आप किस पर भरोसा कर रहे हैं',
    pillars: [
      {
        title: 'ओपन सोर्स और MIT लाइसेंस प्राप्त',
        body: 'वेबसाइट और स्किल दोनों सार्वजनिक और diff करने योग्य हैं। आप इसे चलाने से पहले हर पंक्ति पढ़ सकते हैं, और किसी भी प्रति को tagged release पर मौजूद सोर्स से तुलना कर सकते हैं।',
      },
      {
        title: 'Markdown-first — कोई नेटवर्क नहीं, कोई टेलीमेट्री नहीं',
        body: 'स्किल में कोई CLI नहीं, कोई HTTP API नहीं, और कोई प्रमाणीकरण प्रवाह नहीं है। यह कोई नेटवर्क कॉल नहीं करती और कोई टेलीमेट्री नहीं भेजती; इसका एकमात्र स्थानीय सहायक git और वातावरण मेटाडेटा पढ़ता है। आपकी रिपॉज़िटरी के बारे में कुछ भी आपकी मशीन नहीं छोड़ता।',
      },
      {
        title: 'डिज़ाइन से गैर-विनाशकारी',
        body: 'स्किल जो एकमात्र सुरक्षा-प्रासंगिक काम करती है वह है आपकी रिपॉज़िटरी को बदलना — और यह clobber करने के बजाय सुलझाती है। यह मौजूदा चीज़ें पहचानती है, एक योजना प्रस्तावित करती है, और कुछ भी बदलने से पहले पूछती है। योजना का आउटपुट एक gitignored .dwp/ डायरेक्टरी में रहता है।',
      },
      {
        title: 'किसी रहस्य को नहीं छूती',
        body: 'पद्धति कभी रहस्य कमिट नहीं करती और संस्करण नियंत्रण से बाहर काम की स्थिति रखती है। ऑनबोर्डिंग .gitignore को पुनः लिखने के बजाय उसमें जोड़ती है, और हर बदलाव छोटे, पठनीय diffs में समीक्षा के लिए होता है।',
      },
      {
        title: 'सत्यापन योग्य उत्पत्ति',
        body: 'हर रिलीज़ भेजी गई स्किल पर चेकसम प्रकाशित करती है, ताकि आप यह पुष्टि कर सकें कि डाउनलोड की गई प्रति उससे मेल खाती है जो प्रकाशित हुई थी, इससे पहले कि आप उस पर भरोसा करें।',
      },
    ],
    verifyTitle: 'चलाने से पहले सत्यापित करें',
    verifyIntro:
      'स्किल को तब तक अविश्वसनीय मानें जब तक आपने इसे जाँच न लिया हो। प्रत्येक रिलीज़ भेजी गई स्किल पर एक SHA256SUMS फ़ाइल संलग्न करती है। उस संस्करण के लिए इसे डाउनलोड करें जिसे आप इंस्टॉल करना चाहते हैं, फिर सत्यापित करें कि आपकी प्रति मेल खाती है — एक गैर-शून्य एग्ज़िट का अर्थ है कि कोई फ़ाइल मेल नहीं खाती और आपको रुकना चाहिए।',
    codeLabel: 'shell',
    verifyNote:
      'रिलीज़ चेकसम की गई हैं, हस्ताक्षरित नहीं — हस्ताक्षर (cosign या maintainer GPG) एक दस्तावेज़ीकृत अगला चरण है, वर्तमान दावा नहीं। क्योंकि सब कुछ खुला है, आप किसी भी फ़ाइल को उसके tag पर रिपॉज़िटरी से diff भी कर सकते हैं।',
    disclosureTitle: 'भेद्यता की रिपोर्ट करें',
    disclosureBody:
      'कोई सुरक्षा समस्या मिली? सार्वजनिक issue खोलने के बजाय इसे GitHub के निजी भेद्यता रिपोर्टिंग के माध्यम से संबंधित रिपॉज़िटरी — स्किल या वेबसाइट (नीचे लिंक की गई सुरक्षा नीतियाँ देखें) — पर निजी तौर पर रिपोर्ट करें, ताकि कोई समाधान मौजूद होने से पहले समस्या उजागर न हो।',
    resourcesTitle: 'भरोसा संसाधन',
    linkManifest: 'मशीन-पठनीय भरोसा मैनिफ़ेस्ट',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'वेबसाइट सुरक्षा नीति',
    linkSkillPolicy: 'स्किल सुरक्षा नीति और खतरा मॉडल',
    limitationsTitle: 'ईमानदार सीमाएँ',
    limitations: [
      'रिलीज़ चेकसम की गई हैं, अभी तक क्रिप्टोग्राफ़िक रूप से हस्ताक्षरित नहीं — हस्ताक्षर योजनाबद्ध है, हुआ नहीं।',
      'Deep Work Plan आपकी रिपॉज़िटरी के विरुद्ध एक स्वायत्त कोडिंग एजेंट चलाता है। इसकी प्रस्तावित योजना और diffs की समीक्षा करें; पद्धति उस समीक्षा के लिए डिज़ाइन की गई है, उसे प्रतिस्थापित करने के लिए नहीं।',
      'यहाँ भरोसा के दावे केवल आधिकारिक स्रोतों का वर्णन करते हैं। एक संशोधित या तृतीय-पक्ष प्रति जो रिपॉज़िटरी से भटक गई है उसमें इनमें से कोई भी गारंटी नहीं है — पहले उसे सत्यापित करें।',
    ],
    ctaTitle: 'आत्मविश्वास के साथ अपनाएँ',
    ctaBody:
      'पद्धति और विनिर्देश पढ़ें, एजेंट को init endpoint की ओर इंगित करें, और चलाने से पहले इंस्टॉल सत्यापित करें।',
    ctaPrimary: 'पद्धति पढ़ें',
    ctaSecondary: 'अपनाना (init)',
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — अपनी रिपॉज़िटरी को AI-first बनाएँ',
      description:
        'किसी भी रिपॉज़िटरी में Deep Work Plan पद्धति अपनाएँ। स्किल स्थापित करें, एजेंट ऑनबोर्डिंग चलाएँ, फिर किसी भी AI कोडिंग एजेंट के साथ योजना बनाएँ और निष्पादित करें।',
    },
    eyebrow: 'अपनाना',
    title: 'इस रिपॉज़िटरी को AI-first बनाएँ',
    intro:
      'किसी भी रिपॉज़िटरी को स्पेक-ड्रिवन, एजेंट-तैयार कोडबेस में बदलने का एक endpoint। स्किल स्थापित करें, एक एजेंट को रिपॉज़िटरी ऑनबोर्ड करने दें, फिर किसी भी कोडिंग एजेंट के साथ संरचित काम की योजना बनाएँ और उसे निष्पादित करें।',
    handoffTitle: 'अपने एजेंट में कॉपी करें',
    handoffBody:
      'पूरा init.md प्रॉम्प्ट कॉपी करें और इसे अपने AI कोडिंग एजेंट — Claude Code, Cursor, Codex, या किसी भी अन्य — में पेस्ट करें। यह पद्धति और विनिर्देश पढ़ेगा, स्किल स्थापित करेगा, और इस रिपॉज़िटरी को Deep Work Plans के लिए ऑनबोर्ड करेगा।',
    handoffInstruction:
      'इस रिपॉज़िटरी को AI-first बनाने के लिए https://deepworkplan.com/init.md पर दिए निर्देश पढ़ें और उनका पालन करें।',
    handoffMdLabel: 'स्व-निहित एजेंट प्रॉम्प्ट',
    codeLabel: 'agent',
    whatTitle: 'यह क्या करता है',
    whatBody: [
      'अपनाना रिपॉज़िटरी को दो टिकाऊ तरीकों से बदलता है — पद्धति के स्तंभ।',
      'पहला, रिपॉज़िटरी स्पेक-ड्रिवन बन जाती है: काम तदर्थ प्रॉम्प्ट से नहीं, बल्कि एक लिखित योजना और विनिर्देश से शुरू होता है। दूसरा, रिपॉज़िटरी स्वयं एजेंट हार्नेस बन जाती है — एक AGENTS.md, एक docs/ ज्ञान-आधार, प्रति-मॉड्यूल docs, और एक .agents/ स्किल घर (.claude → .agents और .cursor → .agents सिमलिंक के साथ) हर एजेंट को आवश्यक कॉन्टेक्स्ट और कमांड्स देते हैं।',
    ],
    sequenceTitle: 'अपनाने का क्रम',
    orLabel: 'या',
    steps: [
      {
        title: 'स्थापना से पहले सत्यापित करें',
        description:
          'प्रॉम्प्ट और स्किल को तब तक अविश्वसनीय मानें जब तक आपने उन्हें जाँच न लिया हो। दोनों ओपन-सोर्स और MIT लाइसेंस प्राप्त हैं; स्किल Markdown-first है जिसमें कोई नेटवर्क कॉल नहीं और कोई टेलीमेट्री नहीं है। प्रत्येक रिलीज़ भेजी गई स्किल पर SHA256SUMS प्रकाशित करती है, ताकि आप चलाने से पहले पुष्टि कर सकें कि आपकी प्रति मेल खाती है। रिलीज़ चेकसम की गई हैं, हस्ताक्षरित नहीं (हस्ताक्षर एक दस्तावेज़ीकृत अगला चरण है)।',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'स्किल स्थापित करें',
        description:
          'Deep Work Plan स्किल जोड़ें ताकि कोई भी एजेंट संरचित काम की योजना बना सके और उसे निष्पादित कर सके। स्किल एक राउटर और आठ सब-स्किल्स के साथ आती है — create, execute, refine, resume, status, verify, onboard और author।',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'रिपॉज़िटरी ऑनबोर्डिंग चलाएँ',
        description:
          'onboard सब-स्किल आमंत्रित करें और एजेंट को वास्तविक रिपॉज़िटरी पर तर्क करने दें — उसका स्टैक, पैकेज मैनेजर और वास्तविक सत्यापन कमांड्स। फिर यह AGENTS.md, एक docs/ ज्ञान-आधार, प्रति-मॉड्यूल docs, और एक क्रॉस-एजेंट .agents/ घर (.claude → .agents और .cursor → .agents सिमलिंक के साथ) तैयार करता है, पतले dwp-* कमांड्स जोड़ता है, और योजनाओं तथा ड्राफ़्ट के लिए एक gitignored .dwp/ का ढाँचा बनाता है। बड़ी रिपॉज़िटरी के लिए onboard सब-स्किल एक योजना-संचालित पथ का उपयोग करता है: यह पहले टोह लेता है, फिर एक ऑनबोर्डिंग Deep Work Plan उत्पन्न करता है। कुछ भी टेम्पलेट नहीं है; सब कुछ आपकी रिपॉज़िटरी के अनुरूप ढाला गया है।',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'स्थानीय समीक्षा और ऑप्ट-इन ऐडऑन',
        description:
          'ऑनबोर्डिंग अनिवार्य AI Diff Reviewer स्थानीय समीक्षा स्थापित करती है (इसका CI गेट वैकल्पिक बना रहता है) और चार ऑप्ट-इन ऐडऑन प्रदान करती है — devcontainer, Dailybot, dependency-upgrade और design-system — जिन्हें आप तभी स्वीकार करते हैं जब वे उपयुक्त हों। एक रिपॉज़िटरी शून्य वैकल्पिक ऐडऑन के साथ भी पूर्णतः अनुरूप होती है। बेसलाइन से परे स्टैक-उपयुक्त स्किल्स, एजेंट्स और कमांड्स विकसित करने के लिए /skill-create और /agent-create (author सब-स्किल) का उपयोग करें।',
      },
      {
        title: 'योजना बनाएँ और निष्पादित करें',
        description:
          '/dwp-create से Deep Work Plans तैयार करें और उन्हें /dwp-execute से चलाएँ, फिर काम बढ़ने पर /dwp-status, /dwp-refine, /dwp-resume और /dwp-verify का उपयोग करें। हर योजना में क्रमांकित कार्य, सत्यापन-गेट और एक पूर्णता प्रोटोकॉल होता है — जो तीन अनिवार्य अंतिम कार्यों के साथ समाप्त होता है: एक सुरक्षा समीक्षा, स्किल्स और एजेंट्स खोज, और एक कार्यकारी रिपोर्ट।',
      },
      {
        title: 'अनुरूपता सत्यापित करें',
        description:
          'विनिर्देश के विरुद्ध एक वस्तुनिष्ठ उत्तीर्ण/अनुत्तीर्ण रिपोर्ट के लिए /dwp-verify चलाएँ। पुष्टि करें कि AGENTS.md, docs/ (वास्तविक सामग्री के साथ, स्टब्स नहीं), .agents/ (पतले dwp-* डेलिगेटर्स और डिस्क से मेल खाने वाली कैटलॉग के साथ), .dwp/ और tmp/ यथास्थान हैं — कुछ भी टेम्पलेट नहीं, सब कुछ इस रिपॉज़िटरी के लिए तर्कित।',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'परिणाम',
    outcome:
      'रिपॉज़िटरी स्पेक-ड्रिवन बन जाती है और रिपॉज़िटरी स्वयं एजेंट हार्नेस बन जाती है — कॉन्टेक्स्ट और कमांड्स कोड के साथ-साथ चलते हैं।',
    nextStepsTitle: 'आगे पढ़ें',
    nextSteps: [
      { label: 'त्वरित शुरुआत', href: '/quickstart' },
      { label: 'पद्धति', href: '/methodology' },
      { label: 'विनिर्देश', href: '/spec' },
      { label: 'किट', href: '/kit' },
    ],
  },

  // Developers — agent & developer surface
  developersPage: {
    meta: {
      title: 'डेवलपर — Deep Work Plan एजेंट API, MCP सर्वर और दस्तावेज़',
      description:
        'Deep Work Plan की एजेंट सतह: OpenAPI स्पेसिफिकेशन के साथ रीड-ओनली, ज़ीरो-ऑथ API, MCP सर्वर, 17 भाषाओं में प्रति-पृष्ठ Markdown और npx skills इंस्टॉल CLI।',
    },
    eyebrow: 'एजेंट और डेवलपर सतह',
    title: 'डेवलपर्स और AI एजेंटों के लिए Deep Work Plan',
    intro:
      'deepworkplan.com अपने पृष्ठों के साथ एक मशीन-पठनीय सतह भी देता है: OpenAPI से वर्णित एक एजेंट API, एक स्टेटलेस MCP सर्वर, हर पृष्ठ के लिए 17 भाषाओं में नेटिव Markdown मिरर, और इंस्टॉल की जा सकने वाली DWP स्किल। इस पृष्ठ पर सब कुछ लाइव, सार्वजनिक और निःशुल्क है — साइन अप करने के लिए कुछ भी नहीं है।',
    accessTitle: 'डिज़ाइन से ही ज़ीरो-ऑथ',
    accessIntro:
      'बनाने के लिए कोई API कुंजी नहीं, कोई OAuth प्रक्रिया नहीं, और प्रोडक्शन से अलग कोई सैंडबॉक्स नहीं — प्रोडक्शन सतह ही सैंडबॉक्स है। यह पद्धति का एक जानबूझकर चुना गया गुण है: एजेंट "contact sales" फ़ॉर्म नहीं भर सकते, इसलिए साइट कभी ऐसा नहीं माँगती।',
    accessPoints: [
      {
        title: 'रीड-ओनली',
        body: 'MCP एंडपॉइंट (POST) को छोड़कर हर ऑपरेशन एक सुरक्षित, कैश करने योग्य GET है। कहीं भी कोई राइट ऑपरेशन, अपलोड या स्टेट बदलाव नहीं है।',
      },
      {
        title: 'कोई API कुंजी नहीं',
        body: 'कोई रजिस्ट्रेशन नहीं, कोई टोकन नहीं, कोई रेट-लिमिट टियर नहीं। गुमनाम पहुँच दस्तावेज़ीकृत अनुबंध है, जो /auth.md और OAuth डिस्कवरी स्टब में घोषित है।',
      },
      {
        title: 'निःशुल्क और ओपन सोर्स',
        body: 'साइट की सामग्री और DWP स्किल MIT-लाइसेंस प्राप्त हैं। इन्हें अनुमति माँगे बिना व्यावसायिक और गैर-व्यावसायिक कामों में उपयोग करें।',
      },
      {
        title: 'मशीन-प्रथम',
        body: '/api पथों पर संरचित JSON त्रुटियाँ, Markdown 404 रिकवरी बॉडी, RFC 9727 API कैटलॉग, और एक ARD क्षमता मैनिफ़ेस्टो — एजेंट उपभोग के लिए बनाया गया।',
      },
    ],
    endpointsTitle: 'एंडपॉइंट',
    endpointsIntro:
      'एजेंट API के मुख्य एंडपॉइंट। पूर्ण, टाइप किया गया विनिर्देश — हर ऑपरेशन, पैरामीटर और रिस्पॉन्स स्कीमा — OpenAPI दस्तावेज़ में रहता है।',
    endpointsNote:
      'अज्ञात /api/* पथ संकल्प संकेत के साथ एक संरचित JSON त्रुटि लौटाते हैं, कभी HTML त्रुटि पृष्ठ नहीं।',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'पूरे एजेंट API की OpenAPI 3.1 विनिर्देश।',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description: 'क्यूरेटेड LLM गाइडेंस इंडेक्स — एजेंटों के लिए अनुशंसित प्रवेश बिंदु।',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'कैननिकल DWP अपनाने का प्रॉम्प्ट (किसी भी रिपॉज़िटरी को AI-first बनाएँ)।',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'कोई भी पृष्ठ नेटिव सोर्स Markdown के रूप में — सभी 17 भाषाओं में (यथा /es/developers.md)।',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description: 'विनिर्देश और इस पोर्टल के लिंक के साथ स्थैतिक हेल्थ मार्कर।',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP सर्वर (Streamable HTTP, स्टेटलेस): initialize, ping, tools/list, tools/call।',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description: 'ARD क्षमता मैनिफ़ेस्टो — robots.txt में घोषित agentmap।',
      },
    ],
    mcpTitle: 'MCP सर्वर',
    mcpIntro:
      'Streamable HTTP पर एक स्टेटलेस Model Context Protocol सर्वर। तीन रीड-ओनली टूल: get_init_prompt, list_site_sections और read_page। प्रोटोकॉल संस्करण 2025-03-26 और 2025-06-18 समर्थित हैं; किसी सत्र की आवश्यकता नहीं है।',
    mcpCodeLabel: 'टर्मिनल — HTTP पर JSON-RPC',
    mcpNote:
      'MCP मैनिफ़ेस्टो /.well-known/mcp.json पर और सर्वर कार्ड /.well-known/mcp/server-card.json पर रहता है। Claude, ChatGPT और कोई भी MCP क्लाइंट इन टूल्स को नेटिव रूप से कॉल कर सकता है।',
    markdownTitle: 'एजेंटों के लिए Markdown',
    markdownIntro:
      'रेंडर किया गया हर पृष्ठ नेटिव सोर्स Markdown के रूप में प्रकाशित होता है — HTML रूपांतरण नहीं। किसी भी पृष्ठ पर URL सफ़िक्स से स्पष्ट रूप से या HTTP कंटेंट नेगोशिएशन के माध्यम से Markdown का अनुरोध करें।',
    markdownCodeLabel: 'टर्मिनल — कंटेंट नेगोशिएशन',
    markdownNote:
      'कंटेंट नेगोशिएशन वही सोर्स Markdown लौटाता है जिससे साइट रेंडर होती है, आपके द्वारा अनुरोधित URL की भाषा में।',
    cliTitle: 'किट इंस्टॉल करें',
    cliIntro:
      'Deep Work Plan स्किल के लिए आधिकारिक इंस्टॉल पथ — वही कमांड जो /init एंडपॉइंट एजेंटों को देता है। यह skills-संगत किसी भी कोडिंग एजेंट के साथ काम करता है (Claude Code, Cursor, Codex, Gemini और अन्य)।',
    cliCodeLabel: 'टर्मिनल — skills CLI',
    cliNote:
      'स्किल आपकी रिपॉज़िटरी के अंदर .agents/skills/deepworkplan/ में वेंडर हो जाती है, इसलिए रेपो को छूने वाला हर एजेंट एक ही पद्धति साझा करता है।',
    resourcesTitle: 'मशीन-पठनीय संसाधन',
    resources: [
      {
        label: 'OpenAPI विनिर्देश (/openapi.json)',
        href: '/openapi.json',
      },
      {
        label: 'एजेंट पहुँच और ऑथ घोषणा (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'API कैटलॉग, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP मैनिफ़ेस्टो (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'सुरक्षा संपर्क (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'साइट रेपो डिस्क्रिप्टर (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'किसी एजेंट को इंगित करें',
    ctaBody:
      'सबसे तेज़ रास्ता अब भी एक पंक्ति है: किसी भी कोडिंग एजेंट को /init प्रॉम्प्ट दें और वह स्किल इंस्टॉल करता है, आपकी रिपॉज़िटरी को ऑनबोर्ड करता है, और गहन काम पूरा करना शुरू कर देता है।',
    ctaPrimary: '/init प्रॉम्प्ट खोलें',
    ctaSecondary: 'पद्धति पढ़ें',
  },

  // Privacy policy
  privacyPage: {
    meta: {
      title: 'गोपनीयता — Deep Work Plan',
      description:
        'deepworkplan.com की गोपनीयता नीति: बिना खाता, बिना विज्ञापन और बिना कुकी की एनालिटिक्स वाली स्थैतिक साइट, तथा संपर्क फ़ॉर्म क्या एकत्र करता है।',
    },
    eyebrow: 'गोपनीयता नीति',
    title: 'deepworkplan.com पर गोपनीयता',
    intro:
      'Deep Work Plan एक स्थैतिक दस्तावेज़ीकरण और पद्धति साइट है। यह पृष्ठ सादे शब्दों में और पूरी तरह समझाता है कि आपके दौरे पर साइट किन डेटा को छूती है: इसमें कोई खाता प्रणाली नहीं, कोई विज्ञापन नहीं और कहीं भी कोई साइट-पार ट्रैकिंग नहीं है।',
    lastUpdated: '8 सितंबर 2026',
    sections: [
      {
        heading: 'साइट क्या है',
        body: 'deepworkplan.com एक CDN के माध्यम से परोसे जाने वाले स्थैतिक पृष्ठों का संग्रह है। कोई लॉगिन नहीं, कोई उपयोगकर्ता डेटाबेस नहीं, और व्यक्तिगत प्रोफ़ाइल संग्रहीत करने का साइट के पास कोई रास्ता नहीं है। सामग्री DailybotHQ संगठन के अंतर्गत सार्वजनिक GitHub रिपॉज़िटरी में विकसित होती है, और आप यहाँ जो कुछ भी पढ़ते हैं वह ठीक उसी रूप में परोसा जाता है जिस रूप में बनाया गया था।',
      },
      {
        heading: 'एनालिटिक्स',
        body: 'साइट पृष्ठ दृश्यों को समुच्चय में गिनने के लिए Umami का उपयोग करती है — एक बिना-कुकी, गोपनीयता-प्रथम एनालिटिक्स सेवा। Umami ट्रैकिंग कुकी नहीं लगाता और साइट-पार प्रोफ़ाइल नहीं बनाता। चूँकि AI क्रॉलर JavaScript नहीं चलाते, एक सर्वर-साइड एज फ़ंक्शन स्वचालित बॉट यात्राओं का यूज़र एजेंट और पथ भी गुमनाम एनालिटिक्स घटनाओं के रूप में रिकॉर्ड करता है — यह क्रॉलर सॉफ़्टवेयर की पहचान करता है (जैसे "GPTBot ने /init दौरा किया"), कभी किसी मानव आगंतुक की नहीं।',
      },
      {
        heading: 'कुकी और लोकल स्टोरेज',
        body: 'साइट कोई ट्रैकिंग कुकी नहीं लगाती। आपके ब्राउज़र में संग्रहीत एकमात्र चीज़ localStorage में रखी एक थीम प्राथमिकता (लाइट या डार्क मोड) है, जो कभी आपके डिवाइस से बाहर नहीं जाती और कहीं प्रेषित नहीं होती। यदि आप अपना ब्राउज़र स्टोरेज साफ़ करते हैं, तो साइट बस आपकी सिस्टम डिफ़ॉल्ट थीम पर लौट आती है।',
      },
      {
        heading: 'तृतीय-पक्ष सेवाएँ',
        body: 'होस्टिंग और वितरण Cloudflare Pages पर चलते हैं, जो CDN संचालित करने और दुरुपयोग अवरुद्ध करने के हिस्से के रूप में, Cloudflare की अपनी गोपनीयता नीति के तहत एज पर अनुरोध लॉग और IP पते संसाधित करता है। समुच्चय एनालिटिक्स Umami (cloud.umami.is) पर चलते हैं। यदि आप स्वेच्छा से संपर्क फ़ॉर्म जमा करते हैं, तो आपके उत्तर Google Forms के माध्यम से हमारी टीम को भेजे जाते हैं — आपके द्वारा टाइप की गई जानकारी एकत्र होने का यही एकमात्र स्थान है, और इसका उपयोग केवल आपको उत्तर देने के लिए किया जाता है।',
      },
      {
        heading: 'हम क्या नहीं करते',
        body: 'हम व्यक्तिगत डेटा नहीं बेचते या साझा नहीं करते, विज्ञापन या रीमार्केटिंग पिक्सेल नहीं चलाते, ब्राउज़र फ़िंगरप्रिंटिंग नहीं करते, और मार्केटिंग ईमेल नहीं भेजते। साइट में कोई न्यूज़लेटर साइनअप नहीं है और ऊपर वर्णित समुच्चय, बिना-कुकी गणनाओं से परे कोई टेलीमेट्री नहीं है।',
      },
      {
        heading: 'आपके विकल्प',
        body: 'चूँकि यहाँ की एनालिटिक्स समुच्चय और बिना-कुकी है, निर्यात या हटाने के लिए कोई व्यक्तिगत प्रोफ़ाइल नहीं है। आप किसी भी कंटेंट ब्लॉकर से एनालिटिक्स स्क्रिप्ट को साइट के काम करने को प्रभावित किए बिना अवरुद्ध कर सकते हैं। यदि आपने संपर्क फ़ॉर्म जमा किया है और अपना संदेश हटाना चाहते हैं, तो नीचे दिए गए संपर्क पते पर लिखें और हम उसे हटा देंगे।',
      },
      {
        heading: 'इस नीति में बदलाव',
        body: 'यदि यह नीति सारगर्भित रूप से बदलती है, तो इस पृष्ठ के शीर्ष पर अद्यतन तिथि भी उसके साथ बदल जाती है, और सारगर्भित संपादन सार्वजनिक वेबसाइट रिपॉज़िटरी में कमिट होते हैं जहाँ कोई भी इतिहास की समीक्षा कर सकता है।',
      },
    ],
    contactTitle: 'संपर्क और सुरक्षा',
    contactBody:
      'गोपनीयता प्रश्नों के लिए security@dailybot.com पर लिखें। किसी सुरक्षा भेद्यता की रिपोर्ट के लिए, वेबसाइट और स्किल रिपॉज़िटरी के लिए GitHub की निजी भेद्यता रिपोर्टिंग को प्राथमिकता दें — सटीक पतों के लिए /.well-known/security.txt देखें।',
  },
};
