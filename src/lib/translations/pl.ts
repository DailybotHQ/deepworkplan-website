/**
 * pl translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const pl: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — uporządkowana realizacja dla agentów kodujących AI',
  siteDescription:
    'Deep Work Plan: otwarta metodyka i referencyjny zestaw narzędzi do uporządkowanej, weryfikowanej i wznawialnej, wielogodzinnej pracy agentów AI.',

  // Navigation
  nav: {
    home: 'Start',
    about: 'O metodyce',
    contact: 'Kontakt',
    // Deep Work Plan IA
    methodology: 'Metodyka',
    spec: 'Specyfikacja',
    kit: 'Zestaw',
    examples: 'Przykłady',
    init: 'Init',
    quickstart: 'Szybki start',
    trust: 'Zaufanie',
    developers: 'Programiści',
    privacy: 'Prywatność',
    github: 'GitHub',
    repo: {
      label: 'Kod źródłowy',
      website: 'Repozytorium witryny',
      websiteDesc: 'Ta witryna',
      skill: 'Repozytorium umiejętności',
      skillDesc: 'Instalowalna umiejętność',
    },
    menu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Wszelkie prawa zastrzeżone.',
    poweredBy: 'Napędzane przez',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Nowość · Wydajny tokenowo',
    text: 'Deep Work Plan jest dziś na Product Hunt',
    tagline: 'daj agentowi plan',
    linkText: 'Zagłosuj',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Nawigacja po witrynie',
    sections: {
      methodology: 'Metodyka',
      getStarted: 'Pierwsze kroki',
      project: 'Projekt',
      connect: 'Kontakt',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title:
        'Deep Work Plan — uporządkowana realizacja dla agentów kodujących AI',
      description:
        'Kontekst znaczy więcej niż modele. Deep Work Plan zamienia dowolne repozytorium w uporządkowane środowisko, w którym każdy agent kodujący kończy długodystansową pracę.',
    },
    hero: {
      badge: 'Otwarta metodyka · MIT · Niezależna od agenta',
      title: 'Modele mają znaczenie.',
      titleEmphasis: 'Kontekst znaczy więcej.',
      subtitle:
        'Deep Work Plan przekształca każde repozytorium w ustrukturyzowane środowisko — kontekst, zabezpieczenia i trwały plan — w którym każdy agent kodowania pracuje precyzyjnie i wydajnie oraz kończy pracę długoterminową.',
      instructionLabel: 'Skopiuj do swojego agenta',
      instruction:
        'Skopiuj prompt init.md i wklej go do swojego agenta kodowania — Claude Code, Cursor, Codex lub innego — aby uczynić dowolne repozytorium AI-first.',
      copyLabel: 'Kopiuj init.md',
      copiedLabel: 'Skopiowano',
      viewInitCta: 'Zobacz pełny prompt /init',
      pullQuote:
        'Deep Work Plan to spec-driven development, w którym samo repozytorium staje się harness (rusztowaniem agenta).',
      primaryCta: 'Przeczytaj metodykę',
      secondaryCta: 'Przeczytaj specyfikację',
      illustrationAlt:
        'Latarnia morska na skalistym brzegu rzuca pojedynczy snop światła prowadzący niewielki statek — rycina przywołująca repozytorium jako stabilny harness, który prowadzi każdego agenta.',
      scrollCta: 'Zobacz, jak to działa',
    },
    pitch: {
      kicker: 'Problem i odpowiedź',
      problem:
        'W krótkich seriach agenci kodowania są imponujący. Powierz im długą misję — migrację, nowy podsystem, refaktoryzację dziesiątek plików — a zaczną dryfować: kontekst się zapełnia, wcześniejsze decyzje blakną, a wielogodzinna praca zatrzymuje się w połowie.',
      answer:
        'Deep Work Plan odpowiada programowaniem sterowanym specyfikacją: trwały plan, zadania atomowe i bramki walidacyjne, które agent musi przejść. „Skończone” przestaje być odczuciem — staje się dowodem: zweryfikowanym i możliwym do przejrzenia.',
      efficiency:
        'A ponieważ kontekst to najrzadszy zasób Twojego agenta, harness zaprojektowano pod wydajność tokenów: instrukcje ładują się progresywnie, walidacja dotyka tylko zmian, a każde zadanie uczy się lokalnie — długa praca pozostaje przystępna.',
      illustrationAlt:
        'Dyptyk: z jednej strony statek dryfujący we mgle wśród skał, z drugiej ten sam statek pewnie na wykreowanym kursie ku latarni portu.',
    },
    story: {
      act1: {
        kicker: 'Metoda · Akt I',
        lead: 'To Ty decydujesz, co znaczy „skończone” i gdzie biegną granice. Plan niesie Twoją intencję; agenci odpracowują godziny — bez ciągłego nadzorowania i poprawek co dwadzieścia minut.',
        deepLinkLabel: 'Przeczytaj metodologię',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Metoda · Akt II',
        lead: 'Długie zadania zapełniają kontekst każdego modelu. Szczegóły znikają i agent dryfuje. Napisany plan — zadania atomowe, bramy walidacji, wznawialny stan — to punkt, do którego wraca z okrążenia na okrążenie.',
        deepLinkLabel: 'Zobacz pętlę główną',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Metoda · Akt III',
        lead: 'Każde zadanie nazywa swoje kryteria akceptacji i testy, które muszą przejść. Agent nie może czuć się skończony — musi przejść, albo zadanie pozostaje otwarte.',
        deepLinkLabel: 'Przeczytaj specyfikację',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Metoda · Akt IV',
        lead: 'Kontekst, narzędzia, zabezpieczenia i stan mieszkają w Twoim repozytorium jako zwykłe pliki, które może przeczytać każdy agent. Bez lock-inu, bez zewnętrznego mózgu — przetrwa resetowanie kontekstu.',
        deepLinkLabel: 'Zobacz, co tworzy onboarding',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Metoda · Akt V',
        lead: 'Kontekst to najrzadszy zasób Twojego agenta. Harness ładuje się progresywnie, waliduje tylko zmiany i uczy się zadanie po zadaniu — plan spłaca się sam.',
        deepLinkLabel: 'Przeczytaj metodologię',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Onboarding oparty na rozumowaniu',
      title:
        'Skieruj go na dowolne repozytorium. Rozumuje — nie kopiuje na ślepo.',
      subtitle:
        'Proces onboardingu analizuje rzeczywiste języki, frameworki, menedżer pakietów i polecenia walidacyjne Twojego repozytorium, a następnie generuje artefakty dostosowane do tego repozytorium. Ogólnikowy szablon traktowany jest jak porażka.',
      steps: [
        {
          title: 'Rozumuje o Twoim stosie technologicznym i archetypie',
          description:
            'Czyta manifesty, układ katalogów i CI, by wywnioskować rzeczywiste polecenia testów, lintowania i budowania, a następnie klasyfikuje repozytorium jako pojedyncze repo lub hub orkiestratora.',
        },
        {
          title: 'Generuje AGENTS.md, docs/ oraz dokumentację per moduł',
          description:
            'Przemyślany AGENTS.md, skategoryzowana hierarchia docs/ oraz README i docs/ wewnątrz każdego głównego modułu — wypełnione rzeczywistymi poleceniami Twojego repozytorium, nie placeholderami.',
        },
        {
          title:
            'Tworzy .agents/ wraz z dowiązaniami .claude i .cursor do .agents',
          description:
            'Międzyagentowy katalog .agents/ (skille, agenci, polecenia) oraz dowiązania symboliczne .claude i .cursor do .agents, lustrzane CLAUDE.md względem AGENTS.md, tak aby każde narzędzie czytało jedno źródło prawdy.',
        },
        {
          title: 'Instaluje skill DWP i tworzy .dwp/',
          description:
            'Podłącza skill Deep Work Plan i tworzy ignorowany przez git katalog .dwp/ na plany i szkice, a następnie opcjonalnie dokłada dobrowolne dodatki, takie jak wsparcie devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Co się dzieje, gdy to uruchomisz',
      title: 'Jedna instrukcja. Resztę robi repozytorium.',
      subtitle:
        'Nie wybierasz metody instalacji ani nie kopiujesz szablonu. Przekazujesz agentowi jedną linijkę; on instaluje skill — wielokrotnego użytku silnik — i dostosowuje do niego Twoje repozytorium.',
      steps: [
        {
          title: 'Twój agent otwiera /init.md',
          description:
            'Czyta prompt onboardingowy pod deepworkplan.com/init.md oraz metodykę, specyfikację i zestaw narzędzi, do których prowadzą odnośniki — standard, który właśnie przyjmuje.',
        },
        {
          title: 'Instaluje skill Deep Work Plan',
          description:
            'Skill jest silnikiem — takim samym w każdym repozytorium. Jedno polecenie pobiera router i jego sub-skille (create, execute, refine, resume, status, verify, onboard, author) dla Claude Code, Cursor, Codex, Gemini i Copilot.',
        },
        {
          title: 'Dostosowuje Twoje repozytorium',
          description:
            'Rozumując o Twoim rzeczywistym stosie technologicznym — nigdy nie kopiując na ślepo — tworzy AGENTS.md, skategoryzowane drzewo docs/, pliki README per moduł, przemyślany zestaw .agents/ oraz ignorowany przez git .dwp/. Twoje repozytorium staje się harness.',
        },
        {
          title: 'Planujesz i realizujesz',
          description:
            'Generuj długodystansowe Deep Work Plans dla dowolnego zadania i realizuj je krok po kroku, z jawnymi kryteriami akceptacji, bramkami walidacyjnymi i wznawialnym stanem — autonomicznie, godzinami.',
        },
      ],
      note: 'Skill instalowany jest wszędzie identycznie; dostosowywane jest Twoje repozytorium — AGENTS.md, dokumentacja i przemyślany zestaw .agents/ wygenerowane dla Twojego stosu technologicznego. Ten podział sprawia, że metodyka jest standardem wielokrotnego użytku, a nie jednorazowym rusztowaniem.',
    },
    outcomes: {
      badge: 'Co otrzymujesz',
      title:
        'Wszystko, czego Twój agent potrzebuje, by pracować autonomicznie.',
      subtitle:
        'Jedno uruchomienie, zatwierdzone atomowo. Każdy efekt to Markdown, a każda zmiana podlega audytowi.',
      items: [
        {
          label: 'AGENTS.md w głównym katalogu repozytorium',
          detail:
            'Przemyślany na podstawie rzeczywistego stosu technologicznego, poleceń i struktury Twojego repozytorium — nie szablon z placeholderami. CLAUDE.md jest dowiązany symbolicznie do AGENTS.md.',
        },
        {
          label: 'Skategoryzowane docs/ oraz dokumentacja per moduł',
          detail:
            'Architektura, konfiguracja, standardy i rozwiązywanie problemów — plus README i docs/ wewnątrz każdego głównego modułu, wygenerowane z Twojej bazy kodu.',
        },
        {
          label: '.agents/ z dowiązaniami .claude i .cursor do .agents',
          detail:
            'Międzyagentowy katalog .agents/ (skille, agenci, polecenia) z dowiązaniami .claude i .cursor do .agents, dzięki czemu każde narzędzie czyta jedno źródło prawdy.',
        },
        {
          label: 'Zainstalowany skill Deep Work Plan',
          detail:
            'create, execute, refine, resume, status, verify, onboard i author — dostępne dla Twojego agenta jako jeden pakiet skilli, bez kopii per repozytorium.',
        },
        {
          label: 'Zgodność, którą możesz sprawdzić',
          detail:
            '/dwp-verify tworzy obiektywny raport zaliczenia/niezaliczenia względem specyfikacji, dzięki czemu „AI-first” jest zweryfikowane, a nie deklarowane — i możliwe do ponownej weryfikacji po każdym planie.',
        },
        {
          label: 'Dwa archetypy, obsłużone',
          detail:
            'Onboarding klasyfikuje Twoje repozytorium jako pojedyncze repo (przypadek typowy) lub hub orkiestratora, który koordynuje plany potomne pomiędzy repozytoriami.',
        },
        {
          label: 'Żywy zestaw, który rozwija Twoje repozytorium',
          detail:
            'Sub-skill author (skill-create, agent-create) pozwala repozytorium rozwijać własne skille, agentów i polecenia; dobrowolne dodatki utrzymaniowe, takie jak dependency-upgrade, pomagają mu utrzymywać aktualność.',
        },
        {
          label: 'Natywny dla git, wznawialny, .dwp/',
          detail:
            'Bez demona i bez zewnętrznego stanu. Plany i szkice trafiają do ignorowanego przez git katalogu .dwp/, a każde zadanie wznawia się z samego git — nawet po przepełnieniu kontekstu.',
        },
      ],
    },
    agents: {
      badge: 'Agenci',
      title: 'Działa z agentem, którego już używasz.',
      subtitle:
        'Jedna metodyka, wiele adapterów. Markdown nie wiąże frameworka z niczym — każdy agent, który czyta Markdown, może uruchomić Deep Work Plan.',
      fullLabel: 'Pełne',
      partialLabel: 'Częściowe',
      viewAllCta: 'Zobacz wszystkich agentów',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implementacja referencyjna, z natywnym WebFetch i poleceniami slash.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Pełny adapter. Użyj pakietu offline, jeśli WebFetch jest zablokowany.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Zalecany pakiet offline; reguły instalowane w .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Pełny adapter — komendy dwp-* działają przez AGENTS.md i procedury #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Wymaga Gemini 2.5 Pro lub nowszego, z natywnym WebFetch.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Open source. Natywnie odczytuje AGENTS.md i uruchamia dwp-* przez komendy #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Reguły i procedury komend # napędzają pełną pętlę Deep Work Plan.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Open source. Reguły Markdown i komendy # wykonują każdy krok dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Pełny adapter z natywną warstwą poleceń.',
        },
      ],
    },
    stacks: {
      badge: 'Stosy technologiczne',
      title: 'Presety rozumowania dla stosów, które mają znaczenie.',
      viewAllCta: 'Zobacz wszystkie presety',
      subtitle:
        'To pomoce w rozumowaniu, nie szablony. Onboarding czyta rzeczywiste manifesty Twojego repozytorium i dostosowuje się do stosu — nigdy nie kopiuje presetu na ślepo. Monorepozytoria otrzymują dokumentację per moduł.',
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
        { name: 'Generic', sub: 'Dowolny stos' },
      ],
    },
    archetypes: {
      badge: 'Dwa archetypy',
      title: 'Pojedyncze repozytorium albo hub orkiestratora.',
      subtitle:
        'Onboarding rozwidla się na archetypie. Większość repozytoriów to pojedyncze repo. Hub koordynuje potomne Deep Work Plans pomiędzy wieloma repozytoriami. Metodyka traktuje oba jako pełnoprawne.',
      individual: {
        tag: 'Przypadek typowy',
        title: 'Pojedyncze repozytorium',
        description:
          'Pojedyncza baza kodu z jednym głównym stosem technologicznym, własnymi poleceniami walidacyjnymi i dokumentacją per moduł. Domyślny wybór — onboarding go zakłada, o ile repozytorium nie jest wyraźnie hubem.',
        example:
          'Na przykład API w Django, aplikacja Vue lub usługa TypeScript Lambda.',
      },
      orchestrator: {
        tag: 'Koordynacja',
        title: 'Hub orkiestratora',
        description:
          'Repozytorium koordynujące, które orkiestruje pracę pomiędzy podrepozytoriami za pomocą manifestu orkiestratora, uruchamiając plany potomne — każdy zatwierdzający we własnym repozytorium — wraz z regułami granic i indeksem nawigacyjnym.',
        example: 'Na przykład hub koordynujący pięć repozytoriów produktowych.',
      },
    },
    comparison: {
      badge: 'Metodyka kontra narzędzie',
      title: 'Inna warstwa. Uzupełniająca, nie konkurująca.',
      subtitle:
        'Deep Work Plan to nie kolejny generator rusztowań. To warstwa metodyki pod dowolnym narzędziem spec-driven lub generującym rusztowanie, skupiona na wielogodzinnych, autonomicznych przebiegach.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Narzędzia do rusztowań / specyfikacji',
      rows: [
        {
          label: 'Główne skupienie',
          dwp: 'Wielogodzinna realizacja autonomiczna',
          others: 'Generowanie specyfikacji lub rusztowania',
        },
        {
          label: 'Jednostka pracy',
          dwp: 'Deep Work Plan (wznawialna sesja)',
          others: 'Dokument specyfikacji lub rusztowanie',
        },
        {
          label: 'Model stanu',
          dwp: 'Natywny dla git katalog .dwp/, wznawialny',
          others: 'Często zewnętrzny lub w IDE',
        },
        {
          label: 'Powiązanie z agentem',
          dwp: 'Niezależny od agenta (Markdown i Bash)',
          others: 'Często zależny od narzędzia lub IDE',
        },
        {
          label: 'Odzyskiwanie kontekstu',
          dwp: 'Wznawia po przepełnieniu kontekstu',
          others: 'Zwykle uruchamia zadanie od nowa',
        },
        {
          label: 'Licencja',
          dwp: 'MIT, otwarta metodyka i zestaw',
          others: 'Różnie',
        },
      ],
    },
    origin: {
      badge: 'Pochodzenie',
      quote:
        'Stworzony przez Dailybot — firmę stojącą za asynchronicznymi standupami dla rozproszonych zespołów. Wewnętrznie używaliśmy Deep Work Plans, by uczynić produkcyjne repozytoria obejmujące Django, Vue, TypeScript Lambda i Astro pilotowalnymi przez agentów. Po miesiącach użycia produkcyjnego udostępniliśmy metodykę jako open source na licencji MIT.',
      attribution: 'Zespół inżynieryjny Dailybot',
      dailybotCta: 'Poznaj Dailybot',
    },
    finalCta: {
      badge: 'Uczyń swoje repozytorium AI-first',
      title: 'Daj swoim agentom głęboką pracę.',
      subtitle:
        'Przekaż agentowi jedną linijkę — skieruj go na /init.md — a uczyni Twoje repozytorium AI-first: zainstaluje skill, przeprowadzi rozumowanie o Twoim stosie technologicznym i zatwierdzi kompletną hierarchię AGENTS.md. Stamtąd tworzysz i realizujesz Deep Work Plans, które działają autonomicznie godzinami.',
      primaryCta: 'Otwórz prompt /init',
      secondaryCta: 'Przeczytaj metodykę',
      tertiaryCta: 'Dla agentów i programistów',
      meta: 'Na licencji MIT · zero telemetrii · efekty trafiają do ignorowanego przez git katalogu .dwp/.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Kontakt',
    nameLabel: 'Imię i nazwisko',
    namePlaceholder: 'Twoje imię i nazwisko',
    emailLabel: 'E-mail',
    emailPlaceholder: 'twoj@email.com',
    messageLabel: 'Wiadomość',
    messagePlaceholder: 'Napisz swoją wiadomość...',
    sendButton: 'Wyślij wiadomość',
  },

  // About page
  aboutPage: {
    title: 'O metodyce',
    subtitle: 'Otwarta metodyka · Na licencji MIT',
    description:
      'Deep Work Plan to otwarta, niezależna od frameworka metodyka poważnej pracy inżynierskiej z agentami kodującymi AI. Skąd się wzięła i kto ją utrzymuje.',
    heroDescription:
      'Powtarzalna struktura planowania, realizacji i weryfikacji głębokiej pracy z agentami kodującymi AI — tworzona otwarcie i darmowa w użyciu.',
    bioTitle: 'Czym jest',
    bioText:
      'Deep Work Plan (DWP) to metodyka, nie produkt. Definiuje, jak zamienić cel w uzgodniony plan, podzielić ten plan na zadania atomowe, które można weryfikować niezależnie, i realizować każde zadanie w skupionej pętli kończącej się sprawdzeniem.<br /><br />Jest celowo niezależna od tego, którego agenta AI czy stosu technologicznego używasz — adaptery przekładają tę samą podstawową pętlę na Claude, Cursor, Copilot, Codex, Gemini i inne. Plan, zadania i dziennik pracy to wszystko zwykły Markdown, dzięki czemu praca pozostaje czytelna, podatna na przegląd i wersjonowana.',
    passionsTitle: 'Podstawowe zasady',
    passions: [
      {
        title: 'Planuj przed realizacją',
        description:
          'Żaden kod nie powstaje, dopóki plan nie zostanie uzgodniony. Plan jest umową między Tobą a agentem.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Zadania są atomowe',
        description:
          'Każde zadanie ma zakres pozwalający realizować je i weryfikować osobno, a następnie zatwierdzać atomowo.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Weryfikuj wszystko',
        description:
          'Każde zadanie kończy się jawnym sprawdzeniem, zanim rozpocznie się kolejne, a postęp zapisywany jest w git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'W skrócie',
    quickFacts: [
      'Otwarta metodyka, na licencji MIT',
      'Niezależna od frameworka i agenta',
      'Utrzymywana przez Dailybot i społeczność',
      'Zawiera specyfikację, polecenia, adaptery, presety i przykłady',
      'Wyłącznie Markdown — bez środowiska uruchomieniowego, bez vendor lock-in',
      'Zamienia dowolne repozytorium w bazę kodu AI-first, pilotowalną przez agenta',
    ],
    ctaTitle: 'Kto ją utrzymuje',
    ctaDescription:
      'Deep Work Plan wyrósł z rzeczywistej pracy inżynierskiej w Dailybot i jest teraz utrzymywany przez Dailybot wspólnie ze społecznością open source. Metodyka, specyfikacja i zestaw narzędzi udostępniane są na licencji MIT — darmowe w użyciu, adaptacji i rozbudowie.',
    ctaCv: 'Przeczytaj metodykę',
    ctaContact: 'Szybki start',
  },

  // Contact page
  contactPage: {
    title: 'Społeczność i kontakt',
    subtitle: 'Open source · Napędzane przez społeczność',
    description:
      'Deep Work Plan powstaje otwarcie. Znajdź kod źródłowy, zgłoś issue lub dołącz do rozmowy poprzez poniższe kanały — wkład jest mile widziany.',
    heroDescription:
      'Pytania, pomysły lub usprawnienia? Deep Work Plan rozwijany jest publicznie — tutaj dotrzesz do projektu i jego opiekunów.',
    formTitle: 'Wyślij wiadomość',
    nameLabel: 'Imię i nazwisko',
    namePlaceholder: 'Twoje imię i nazwisko',
    emailLabel: 'E-mail',
    emailPlaceholder: 'twoj@email.com',
    reasonLabel: 'Chcę się skontaktować w sprawie',
    reasonOptions: [
      { value: '', label: '— Wybierz temat —' },
      { value: 'general', label: 'Ogólne / Po prostu się przywitać' },
      { value: 'tech-talk', label: 'Tech talk / Zaproszenie do wystąpienia' },
      { value: 'collaboration', label: 'Współpraca / Partnerstwo' },
      { value: 'project', label: 'Projekt / Zapytanie o pracę' },
      { value: 'dailybot', label: 'Pytanie o Dailybot' },
      { value: 'trading', label: 'Pytania o mój trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Dołącz do The Library of Tomorrow',
      },
      { value: 'other', label: 'Inne' },
    ],
    subjectLabel: 'Temat',
    subjectPlaceholder: 'Czego dotyczy sprawa?',
    messageLabel: 'Wiadomość',
    messagePlaceholder: 'Napisz swoją wiadomość...',
    sendButton: 'Wyślij wiadomość',
    sendingButton: 'Wysyłanie...',
    successTitle: 'Wiadomość wysłana',
    successMessage:
      'Dziękuję za kontakt. Odpowiem najszybciej, jak to możliwe.',
    sendAnotherButton: 'Wyślij kolejną wiadomość',
    requiredField: 'To pole jest wymagane',
    invalidEmail: 'Podaj prawidłowy adres e-mail',
    fallbackMessage:
      'Formularz kontaktowy jest obecnie niedostępny. Możesz skontaktować się ze mną bezpośrednio e-mailem.',
    fallbackEmailText: 'Napisz do mnie na adres',
    formNote: 'Odpowiem najszybciej, jak to możliwe.',
    socialTitle: 'Bądźmy w kontakcie',
    locationTitle: 'Lokalizacja',
    locationText:
      'Z siedzibą w Kolumbii. Otwarci na zdalną współpracę na całym świecie.',
    prefillSubjects: {
      generalInquiry: 'Zapytanie ogólne',
      collaboration: 'Możliwość współpracy',
      projectInquiry: 'Zapytanie o projekt lub pracę',
      projectCollaboration: 'Zapytanie o współpracę przy projekcie',
      startupCollaboration: 'Możliwość współpracy ze startupem',
      techTalkInvitation: 'Zaproszenie do wystąpienia na tech talku',
      tradingQuestion: 'Pytanie o trading',
      dailybotQuestion: 'Pytanie o Dailybot',
    },
  },

  contactSection: {
    title: 'Bądźmy w kontakcie',
    description:
      'Jestem zawsze otwarty na ciekawe rozmowy, możliwości współpracy i nowe pomysły. Niezależnie od tego, czy chcesz porozmawiać o technologii, przedsiębiorczości, czy po prostu się przywitać.',
    ctaText: 'Skontaktuj się',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'pl-PL',

  // 404 page
  notFoundPage: {
    title: 'Nie znaleziono strony',
    description:
      'Strona, której szukasz, nie istnieje lub została przeniesiona. Zapoznaj się z metodyką lub wróć na stronę główną, by przeglądać dalej.',
    heading: 'Nie znaleziono strony',
    message:
      'Przepraszamy, strona, której szukasz, nie istnieje lub mogła zostać przeniesiona. Spróbuj wrócić na stronę główną lub zapoznaj się z metodyką.',
    backHome: 'Wróć na stronę główną',
    exploreMethodology: 'Przeczytaj metodykę',
    agentTitle: 'Dla agentów AI',
    agentIntro:
      'Ta ścieżka nie istnieje. Linki odzyskiwania poniżej (oraz ich odpowiedniki czytelne maszynowo) wymieniają każdą stronę tej witryny.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Metodyka Deep Work Plan',
      description:
        'Pięć rozdziałów od manifestu po archetypy: zasady, podstawowa pętla, szablony, skille i agenci oraz adaptacje stojące za Deep Work Plan.',
    },
    eyebrow: 'Metodyka',
    title: 'Metodyka Deep Work Plan',
    intro:
      'Pięć rozdziałów, które prowadzą od filozofii stojącej za Deep Work Plan do praktycznej pętli, szablonów i adaptacji używanych na co dzień.',
    chapterLabel: 'Rozdział',
    readChapter: 'Przeczytaj rozdział',
    prev: 'Poprzedni',
    next: 'Następny',
    backToIndex: 'Wszystkie rozdziały',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Specyfikacja Deep Work Plan',
      description:
        'Czytelna specyfikacja metodyki Deep Work Plan: format DWP, protokół agenta, archetypy, standard dokumentacji i dodatki.',
    },
    eyebrow: 'Specyfikacja',
    title: 'Specyfikacja',
    intro:
      'Precyzyjna, czytelna specyfikacja metodyki — struktury i protokoły wspólne dla ludzi i agentów.',
    tocTitle: 'Na tej stronie',
    prev: 'Poprzedni',
    next: 'Następny',
    backToIndex: 'Wszystkie dokumenty specyfikacji',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Zestaw Deep Work Plan',
      description:
        'Skill i jego osiem sub-skilli, polecenia, adaptery, presety, dobrowolne dodatki oraz przykłady, dzięki którym Deep Work Plan działa w różnych agentach i stosach technologicznych.',
    },
    eyebrow: 'Zestaw',
    title: 'Zestaw',
    intro:
      'Wszystko, czego potrzebujesz, by uruchomić metodykę: skill i jego sub-skille, polecenia slash, adaptery agentów, presety onboardingu, dobrowolne dodatki oraz opracowane przykłady.',
    groups: {
      command: {
        title: 'Sub-skille i polecenia',
        description:
          'Router skilla i jego sub-skille (create, execute, refine, resume, status, verify, onboard, author), a także cienkie polecenia slash, które do nich delegują.',
      },
      adapter: {
        title: 'Adaptery',
        description:
          'Cienkie integracje per agent dla Claude, Cursor, Codex i innych.',
      },
      preset: {
        title: 'Presety onboardingu',
        description:
          'Przewodniki rozumowania per stos technologiczny, których proces onboardingu używa, by dostosować dokumentację, skille i polecenia walidacyjne do Twojego repozytorium.',
      },
      example: {
        title: 'Przykłady',
        description: 'Opracowane przejścia w wariancie przed i po.',
      },
      addon: {
        title: 'Dodatki (dobrowolne)',
        description:
          'Opcjonalne możliwości, które proces onboardingu może dołożyć do repo — nigdy nie będące częścią bazowego standardu AI-first.',
      },
    },
    viewDetail: 'Zobacz szczegóły',
    prev: 'Poprzedni',
    next: 'Następny',
    backToIndex: 'Powrót do zestawu',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Przykłady Deep Work Plan',
      description:
        'Przejścia w wariancie przed i po, pokazujące to samo zadanie inżynierskie z Deep Work Plan i bez niego — oraz różnicę w niezawodności i przeglądzie.',
    },
    eyebrow: 'Przykłady',
    title: 'Przykłady',
    intro:
      'Zobacz metodykę w działaniu — konkretne przejścia rzeczywistych zadań inżynierskich w wariancie przed i po.',
    viewExample: 'Przeczytaj przejście',
    prev: 'Poprzedni',
    next: 'Następny',
    backToGallery: 'Wszystkie przykłady',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Szybki start — Deep Work Plan',
      description:
        'Zainstaluj skill, przeprowadź onboarding repozytorium, a potem planuj i realizuj z dowolnym agentem — kroki, które czynią repozytorium spec-driven i pilotowalnym przez agenta.',
    },
    eyebrow: 'Szybki start',
    title: 'Zacznij w kilka minut',
    intro:
      'Zainstaluj skill, przeprowadź onboarding repozytorium, a potem planuj i realizuj z dowolnym agentem — kroki, które czynią repozytorium spec-driven i pilotowalnym przez agenta.',
    sequenceTitle: 'Ścieżka adopcji',
    codeLabel: 'Terminal',
    orLabel: 'lub',
    steps: [
      {
        title: 'Zainstaluj skill Deep Work Plan',
        description:
          'Dodaj skill do repozytorium — router plus osiem sub-skilli (create, execute, refine, resume, status, verify, onboard, author). Użyj Skills CLI dla najszybszej ścieżki lub sklonuj repo i uruchom setup tam, gdzie dostępne są git i powłoka.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Przeprowadź onboarding repozytorium',
        description:
          'Uruchom sub-skill onboard i pozwól agentowi przeprowadzić rozumowanie o Twoim rzeczywistym repo. Generuje AGENTS.md, bazę wiedzy docs/, dokumentację per moduł oraz międzyagentowy katalog .agents/ (z dowiązaniami .claude → .agents i .cursor → .agents), podłącza cienkie polecenia dwp-* i tworzy ignorowany przez git .dwp/.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Rozwijaj zestaw i przyjmuj dodatki',
        description:
          'Użyj /skill-create i /agent-create (sub-skill author), by rozwijać skille, agentów i polecenia dopasowane do stosu technologicznego. Onboarding oferuje także pięć dobrowolnych dodatków — devcontainer, Dailybot, dependency-upgrade, design-system i AI Diff Reviewer — które przyjmujesz tylko, gdy pasują.',
      },
      {
        title: 'Planuj i realizuj',
        description:
          'Wygeneruj Deep Work Plan i realizuj go zadanie po zadaniu, walidując każdą bramkę i wznawiając między sesjami — pilotując repozytorium względem jego własnej specyfikacji.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Efekt',
    outcome:
      'Twoje repozytorium staje się spec-driven i pilotowalne przez agenta: plan jest trwałym źródłem prawdy, a samo repozytorium staje się harness, względem którego działa każdy agent.',
    nextStepsTitle: 'Kolejne kroki',
    nextSteps: [
      { label: 'Przeczytaj metodykę', href: '/methodology' },
      { label: 'Przejrzyj zestaw', href: '/kit' },
      { label: 'Zobacz przykłady', href: '/examples' },
    ],
  },

  // Deep Work Plan — Trust & security page
  trustPage: {
    meta: {
      title: 'Zaufanie i bezpieczeństwo',
      description:
        'Dlaczego Deep Work Plan jest bezpieczny w adopcji: open source i MIT, Markdown-first bez połączeń sieciowych ani telemetrii, niedestrukcyjny z założenia, z weryfikowalnymi instalacjami i przejrzystą polityką ujawniania podatności.',
    },
    eyebrow: 'Zaufanie i bezpieczeństwo',
    title: 'Zaufanie i bezpieczeństwo',
    intro:
      'Nikt nie powinien instalować skilla, któremu nie może ufać. Deep Work Plan jest zbudowany tak, by dało się go zweryfikować, a nie przyjąć na wiarę: open source, Markdown-first, niedestrukcyjny i sprawdzalny przed uruchomieniem. Ta strona mówi wprost, co robi, czego nie robi i jak potwierdzić jedno i drugie.',
    pillarsTitle: 'Czemu ufasz',
    pillars: [
      {
        title: 'Open source na licencji MIT',
        body: 'Witryna i skill są publiczne i diffowalne. Możesz przeczytać każdą linię przed uruchomieniem i porównać dowolną kopię ze źródłem przy oznaczonym wydaniu.',
      },
      {
        title: 'Markdown-first — bez sieci, bez telemetrii',
        body: 'Skill nie ma CLI, API HTTP ani przepływu uwierzytelniania. Nie wykonuje żadnych połączeń sieciowych i nie wysyła telemetrii; jego jedynym lokalnym pomocnikiem jest odczyt metadanych git i środowiska. Żadna informacja o Twoim repozytorium nie opuszcza Twojej maszyny.',
      },
      {
        title: 'Niedestrukcyjny z założenia',
        body: 'Jedyne działanie skilla istotne z punktu widzenia bezpieczeństwa to zmiana Twojego repozytorium — a robi to przez uzgadnianie, a nie nadpisywanie. Wykrywa, co istnieje, proponuje plan i pyta przed zastąpieniem czegokolwiek. Efekty planu trafiają do ignorowanego przez git katalogu .dwp/.',
      },
      {
        title: 'Nie dotyka sekretów',
        body: 'Metodyka nigdy nie zatwierdza sekretów i trzyma stan roboczy poza kontrolą wersji. Onboarding dopisuje do .gitignore zamiast go nadpisywać, a każda zmiana ma być przeglądana w małych, czytelnych diffach.',
      },
      {
        title: 'Weryfikowalne pochodzenie',
        body: 'Każde wydanie publikuje sumy kontrolne dla dostarczonego skilla, dzięki czemu możesz potwierdzić, że pobrана kopia odpowiada temu, co zostało opublikowane, zanim jej zaufasz.',
      },
    ],
    verifyTitle: 'Zweryfikuj przed uruchomieniem',
    verifyIntro:
      'Traktuj skill jako niezaufany, dopóki go nie sprawdzisz. Każde wydanie dołącza plik SHA256SUMS obejmujący dostarczony skill. Pobierz go dla wersji, którą zamierzasz zainstalować, a następnie sprawdź, czy Twoja kopia pasuje — niezerowe wyjście oznacza, że plik nie pasuje i powinieneś się zatrzymać.',
    codeLabel: 'shell',
    verifyNote:
      'Wydania są sumowane kontrolnie, nie podpisywane — podpisywanie (cosign lub GPG opiekuna) to udokumentowany kolejny krok, a nie bieżące twierdzenie. Ponieważ wszystko jest otwarte, możesz też diffować dowolny plik względem repozytorium przy jego tagu.',
    disclosureTitle: 'Zgłoś podatność',
    disclosureBody:
      'Znalazłeś problem z bezpieczeństwem? Zgłoś go prywatnie przez prywatne raportowanie podatności GitHub we właściwym repozytorium — skill lub stronie (patrz poniżej linkowane polityki bezpieczeństwa) — zamiast otwierać publiczne zgłoszenie, które ujawniłoby problem przed powstaniem poprawki.',
    resourcesTitle: 'Zasoby dotyczące zaufania',
    linkManifest: 'Manifest zaufania odczytywalny przez maszyny',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Polityka bezpieczeństwa witryny',
    linkSkillPolicy: 'Polityka bezpieczeństwa skilla i model zagrożeń',
    limitationsTitle: 'Uczciwe ograniczenia',
    limitations: [
      'Wydania są sumowane kontrolnie, ale jeszcze nie podpisywane kryptograficznie — podpisywanie jest zaplanowane, nie wykonane.',
      'Deep Work Plan uruchamia autonomicznego agenta kodującego względem Twojego repozytorium. Przeglądaj jego proponowany plan i diffe; metodyka jest zaprojektowana do tego przeglądu, nie do jego zastąpienia.',
      'Twierdzenia dotyczące zaufania opisują wyłącznie oficjalne źródła. Zmodyfikowana lub zewnętrzna kopia, która odeszła od repozytoriów, nie niesie żadnej z tych gwarancji — najpierw ją zweryfikuj.',
    ],
    ctaTitle: 'Adoptuj z pewnością',
    ctaBody:
      'Przeczytaj metodykę i specyfikację, skieruj agenta na endpoint init i zweryfikuj instalację przed uruchomieniem.',
    ctaPrimary: 'Przeczytaj metodykę',
    ctaSecondary: 'Adopcja (init)',
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Uczyń swoje repozytorium AI-first',
      description:
        'Przyjmij metodykę Deep Work Plan w dowolnym repozytorium. Zainstaluj skill, uruchom onboarding agenta, a potem planuj i realizuj z dowolnym agentem kodującym AI.',
    },
    eyebrow: 'Adopcja',
    title: 'Uczyń to repozytorium AI-first',
    intro:
      'Jeden endpoint, by zamienić dowolne repozytorium w bazę kodu spec-driven, gotową dla agentów. Zainstaluj skill, pozwól agentowi przeprowadzić onboarding repo, a potem planuj i realizuj uporządkowaną pracę z dowolnym agentem kodującym.',
    handoffTitle: 'Skopiuj do swojego agenta',
    handoffBody:
      'Skopiuj pełny prompt init.md i wklej go do swojego agenta kodowania AI — Claude Code, Cursor, Codex lub innego. Przeczyta metodykę i specyfikację, zainstaluje skill i przeprowadzi onboarding tego repozytorium pod Deep Work Plans.',
    handoffInstruction:
      'Przeczytaj i wykonaj instrukcje na https://deepworkplan.com/init.md, aby uczynić to repozytorium AI-first.',
    handoffMdLabel: 'Samodzielny prompt dla agenta',
    codeLabel: 'agent',
    whatTitle: 'Co to robi',
    whatBody: [
      'Adopcja zmienia repozytorium na dwa trwałe sposoby — to filary metodyki.',
      'Po pierwsze, repozytorium staje się spec-driven: praca zaczyna się od spisanego planu i specyfikacji, a nie od doraźnych promptów. Po drugie, samo repozytorium staje się harness agenta — AGENTS.md, baza wiedzy docs/, dokumentacja per moduł i katalog skilli .agents/ (z dowiązaniami .claude → .agents i .cursor → .agents) dają każdemu agentowi potrzebny kontekst i polecenia.',
    ],
    sequenceTitle: 'Sekwencja adopcji',
    orLabel: 'lub',
    steps: [
      {
        title: 'Zweryfikuj przed instalacją',
        description:
          'Traktuj prompt i skill jako niezaufane, dopóki ich nie sprawdzisz. Oba są open source na licencji MIT; skill jest Markdown-first, bez połączeń sieciowych i bez telemetrii. Każda wersja publikuje SHA256SUMS dla dostarczonego skilla, dzięki czemu możesz potwierdzić zgodność swojej kopii przed uruchomieniem. Wersje są sumowane kontrolnie, a nie podpisywane (podpisywanie to udokumentowany kolejny krok).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Zainstaluj skill',
        description:
          'Dodaj skill Deep Work Plan, aby dowolny agent mógł planować i realizować uporządkowaną pracę. Skill dostarcza router plus osiem sub-skilli — create, execute, refine, resume, status, verify, onboard i author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Uruchom onboarding repozytorium',
        description:
          'Wywołaj sub-skill onboard i pozwól agentowi przeprowadzić rozumowanie o rzeczywistym repo — jego stosie technologicznym, menedżerze pakietów i realnych poleceniach walidacyjnych. Następnie generuje AGENTS.md, bazę wiedzy docs/, dokumentację per moduł oraz międzyagentowy katalog .agents/ (z dowiązaniami .claude → .agents i .cursor → .agents), podłącza cienkie polecenia dwp-* i tworzy ignorowany przez git .dwp/ na plany i szkice. W przypadku dużych repozytoriów sub-skill onboard stosuje ścieżkę opartą na planie: przeprowadza rekonesans, a następnie generuje onboardingowy Deep Work Plan. Nic nie jest szablonowe; wszystko dostosowane jest do Twojego repozytorium.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Przyjmij opcjonalne dodatki',
        description:
          'Onboarding oferuje pięć opcjonalnych dodatków — devcontainer, Dailybot, dependency-upgrade, design-system i AI Diff Reviewer — które przyjmujesz tylko, gdy pasują. Repo jest w pełni zgodne z zerową liczbą dodatków. Użyj /skill-create i /agent-create (sub-skill author), by rozwijać skille, agentów i polecenia wykraczające poza bazowy zestaw.',
      },
      {
        title: 'Planuj i realizuj',
        description:
          'Generuj Deep Work Plans za pomocą /dwp-create i realizuj je przez /dwp-execute, a następnie /dwp-status, /dwp-refine, /dwp-resume i /dwp-verify w miarę postępu prac. Każdy plan niesie ponumerowane zadania, bramki walidacyjne i protokół ukończenia — kończący się trzema obowiązkowymi zadaniami końcowymi: przeglądem bezpieczeństwa, odkrywaniem skilli i agentów oraz raportem wykonawczym.',
      },
      {
        title: 'Zweryfikuj zgodność',
        description:
          'Uruchom /dwp-verify, aby uzyskać obiektywny raport pozytywny/negatywny względem specyfikacji. Potwierdź, że AGENTS.md, docs/ (z prawdziwą treścią, nie zaślepkami), .agents/ (z cienkimi delegatorami dwp-* i katalogiem zgodnym z dyskiem), .dwp/ i tmp/ są na miejscu — nic szablonowego, wszystko przemyślane dla tego repozytorium.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Efekt',
    outcome:
      'Repozytorium staje się spec-driven, a samo repozytorium staje się harness agenta — kontekst i polecenia podróżują razem z kodem.',
    nextStepsTitle: 'Przeczytaj dalej',
    nextSteps: [
      { label: 'Szybki start', href: '/quickstart' },
      { label: 'Metodyka', href: '/methodology' },
      { label: 'Specyfikacja', href: '/spec' },
      { label: 'Zestaw', href: '/kit' },
    ],
  },

  developersPage: {
    meta: {
      title:
        'Programiści — agentowe API Deep Work Plan, serwer MCP i dokumentacja',
      description:
        'Agentowe API Deep Work Plan: tylko odczyt, bez logowania i kluczy (OpenAPI), serwer MCP pod /api/mcp, Markdown każdej strony w 17 językach i npx skills.',
    },
    eyebrow: 'Powierzchnia dla agentów i programistów',
    title: 'Deep Work Plan dla programistów i agentów AI',
    intro:
      'deepworkplan.com publikuje obok swoich stron powierzchnię czytelną maszynowo: agentowe API opisane przez OpenAPI, bezstanowy serwer MCP, natywne lustrzane wersje Markdown każdej strony w 17 językach oraz instalowalną umiejętność DWP. Wszystko na tej stronie jest dostępne na żywo, publicznie i bezpłatnie — nie ma na co się rejestrować.',
    accessTitle: 'Z założenia bez uwierzytelniania',
    accessIntro:
      'Nie ma tu kluczy API do wygenerowania, żadnego tańca z OAuth i żadnej piaskownicy oddzielonej od produkcji — to powierzchnia produkcyjna sama w sobie jest piaskownicą. To celowa własność metodyki: agenci nie potrafią wypełniać formularzy „kontaktu z działem sprzedaży”, więc witryna nigdy o to nie prosi.',
    accessPoints: [
      {
        title: 'Tylko do odczytu',
        body: 'Każda operacja to bezpieczne, cacheowalne GET — z wyjątkiem punktu końcowego MCP, który używa POST. Nie ma nigdzie operacji zapisu, przesyłania plików ani zmian stanu.',
      },
      {
        title: 'Bez kluczy API',
        body: 'Bez rejestracji, bez tokenów, bez progów limitów zapytań. Anonimowy dostęp to udokumentowana umowa, zadeklarowana w /auth.md i w zalążkach odnajdywania OAuth.',
      },
      {
        title: 'Bezpłatnie i open source',
        body: 'Treści witryny i umiejętność DWP są na licencji MIT. Korzystaj z nich w pracy komercyjnej i niekomercyjnej bez pytania o pozwolenie.',
      },
      {
        title: 'Najpierw maszyny',
        body: 'Ustrukturyzowane błędy JSON na ścieżkach /api, treści odzyskiwania 404 w Markdown, katalog API RFC 9727 i manifest możliwości ARD — zbudowane do konsumpcji przez agentów.',
      },
    ],
    endpointsTitle: 'Punkty końcowe',
    endpointsIntro:
      'Główne punkty końcowe agentowego API. Kompletna, typowana specyfikacja — każda operacja, parametr i schemat odpowiedzi — mieszka w dokumencie OpenAPI.',
    endpointsNote:
      'Nieznane ścieżki /api/* zwracają ustrukturyzowany błąd JSON z podpowiedzią rozwiązania, nigdy stronę błędu HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Specyfikacja OpenAPI 3.1 całego agentowego API.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Wyselekcjonowany indeks wskazówek dla LLM — zalecany punkt wejścia dla agentów.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Kanoniczny prompt adopcji DWP (uczynia każde repozytorium AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Każda strona jako natywny Markdown źródłowy — we wszystkich 17 językach (np. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Statyczny znacznik stanu z linkami do specyfikacji i do tego portalu.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Serwer MCP (Streamable HTTP, bezstanowy): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifest możliwości ARD — agentmap zadeklarowany w robots.txt.',
      },
    ],
    mcpTitle: 'Serwer MCP',
    mcpIntro:
      'Bezstanowy serwer Model Context Protocol przez Streamable HTTP. Trzy narzędzia tylko do odczytu: get_init_prompt, list_site_sections i read_page. Obsługiwane wersje protokołu to 2025-03-26 i 2025-06-18; sesja nie jest wymagana.',
    mcpCodeLabel: 'Terminal — JSON-RPC przez HTTP',
    mcpNote:
      'Manifest MCP mieści się pod /.well-known/mcp.json, a karta serwera pod /.well-known/mcp/server-card.json. Claude, ChatGPT i każdy klient MCP mogą wywoływać te narzędzia natywnie.',
    markdownTitle: 'Markdown dla agentów',
    markdownIntro:
      'Każda wyrenderowana strona jest publikowana jako natywny Markdown źródłowy — nie konwersja z HTML. Żądaj Markdown jawnie przez sufiks URL albo przez negocjację treści HTTP na dowolnej stronie.',
    markdownCodeLabel: 'Terminal — negocjacja treści',
    markdownNote:
      'Negocjacja treści zwraca ten sam Markdown źródłowy, z którego renderuje witryna, w języku żądanego adresu URL.',
    cliTitle: 'Zainstaluj zestaw',
    cliIntro:
      'Oficjalna ścieżka instalacji umiejętności Deep Work Plan — ta sama komenda, którą punkt końcowy /init przekazuje agentom. Działa z każdym agentem do kodu zgodnym ze skills (Claude Code, Cursor, Codex, Gemini i inne).',
    cliCodeLabel: 'Terminal — CLI skills',
    cliNote:
      'Umiejętność wdraża się (vendoring) do .agents/skills/deepworkplan/ wewnątrz Twojego repozytorium, więc każdy agent dotykający repozytorium dzieli tę samą metodykę.',
    resourcesTitle: 'Zasoby czytelne maszynowo',
    resources: [
      { label: 'Specyfikacja OpenAPI (/openapi.json)', href: '/openapi.json' },
      {
        label: 'Deklaracja dostępu i uwierzytelniania agentów (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Katalog API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifest MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Kontakt bezpieczeństwa (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Deskryptor repozytorium witryny (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Skieruj na to agenta',
    ctaBody:
      'Najszybsza ścieżka to wciąż jedna linijka: przekaż dowolnemu agentowi do kodu prompt /init, a on zainstaluje skill, zrobi onboarding repozytorium i zacznie kończyć głęboką pracę.',
    ctaPrimary: 'Otwórz prompt /init',
    ctaSecondary: 'Przeczytaj metodykę',
  },

  privacyPage: {
    meta: {
      title: 'Prywatność — Deep Work Plan',
      description:
        'Polityka prywatności deepworkplan.com: statyczna witryna bez kont i reklam, analityka bez plików cookie i dokładnie to, co zbiera formularz kontaktowy.',
    },
    eyebrow: 'Polityka prywatności',
    title: 'Prywatność na deepworkplan.com',
    intro:
      'Deep Work Plan to statyczna witryna dokumentacyjno-metodyczna. Ta strona wyjaśnia jasno i w pełni, jakich danych dotyka witryna podczas Twojej wizyty: nie ma tu systemu kont, reklam ani żadnego śledzenia międzywitrynowego.',
    lastUpdated: '8 września 2026',
    sections: [
      {
        heading: 'Czym jest ta witryna',
        body: 'deepworkplan.com to zbiór statycznych stron dostarczanych przez CDN. Nie ma loginu, bazy użytkowników ani sposobu, by witryna przechowywała profile osobiste. Treści powstają w publicznych repozytoriach GitHub w organizacji DailybotHQ, a wszystko, co tu czytasz, jest dostarczane dokładnie tak, jak zostało zbudowane.',
      },
      {
        heading: 'Analityka',
        body: 'Witryna używa Umami — bezplikowego, nastawionego na prywatność serwisu analitycznego — by zbiorczo liczyć odsłony stron. Umami nie ustawia plików cookie śledzących i nie buduje profili międzywitrynowych. Ponieważ crawlery AI nie wykonują JavaScriptu, serwerowa funkcja brzegowa dodatkowo zapisuje user agent i ścieżkę wizyt automatycznych botów jako anonimowe zdarzenia analityczne — to identyfikuje oprogramowanie crawlera (na przykład „GPTBot odwiedził /init”), nigdy ludzkiego odwiedzającego.',
      },
      {
        heading: 'Pliki cookie i pamięć lokalna',
        body: 'Witryna nie ustawia plików cookie śledzących. Jedyna rzecz zapisywana w Twojej przeglądarce to preferencja motywu (jasny lub ciemny) trzymana w localStorage, która nigdy nie opuszcza Twojego urządzenia i nie jest nigdzie przesyłana. Jeśli wyczyścisz pamięć przeglądarki, witryna po prostu wróci do domyślnego motywu systemowego.',
      },
      {
        heading: 'Usługi osób trzecich',
        body: 'Hosting i dostarczanie działają na Cloudflare Pages, które przetwarza dzienniki żądań i adresy IP na krawędzi w ramach działania CDN i blokowania nadużyć, zgodnie z własną polityką prywatności Cloudflare. Analityka zbiorcza działa na Umami (cloud.umami.is). Jeśli dobrowolnie wyślesz formularz kontaktowy, Twoje odpowiedzi trafiają przez Google Forms do naszego zespołu — to jedyne miejsce, w którym zbierane są wpisywane przez Ciebie informacje, i służą wyłącznie do udzielenia Ci odpowiedzi.',
      },
      {
        heading: 'Czego nie robimy',
        body: 'Nie sprzedajemy ani nie udostępniamy danych osobowych, nie prowadzimy reklamy ani pikseli remarketingowych, nie tworzymy odcisków palców przeglądarek i nie wysyłamy e-maili marketingowych. Witryna nie ma zapisu do newslettera ani telemetrii wykraczającej poza opisane powyżej zbiorcze, bezplikowe liczniki.',
      },
      {
        heading: 'Twoje wybory',
        body: 'Ponieważ analityka jest tu zbiorcza i bez plików cookie, nie ma profilu osobistego do eksportu lub usunięcia. Możesz zablokować skrypt analityczny dowolnym blokerem treści bez wpływu na działanie witryny. Jeśli wysłałeś formularz kontaktowy i chcesz usunąć swoją wiadomość, napisz na kontaktowy adres poniżej, a ją usuniemy.',
      },
      {
        heading: 'Zmiany w tej polityce',
        body: 'Jeśli ta polityka zmieni się istotnie, zmieni się także data na górze tej strony, a merytoryczne edycje trafiają komitem do publicznego repozytorium witryny, gdzie każdy może przejrzeć historię.',
      },
    ],
    contactTitle: 'Kontakt i bezpieczeństwo',
    contactBody:
      'W sprawach prywatności pisz na security@dailybot.com. Aby zgłosić lukę bezpieczeństwa, użyj preferencyjnie prywatnego zgłaszania luk GitHub dla repozytoriów witryny i umiejętności — dokładne adresy znajdziesz w /.well-known/security.txt.',
  },
};
