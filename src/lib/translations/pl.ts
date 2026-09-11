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
    faq: 'FAQ',
    compare: 'Porównanie',
    changelog: 'Changelog',
    resources: 'Zasoby',
    resourcesDesc: 'Przykłady, zaufanie, FAQ i porównanie',
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
  changelogPage: {
    meta: {
      title: 'Dziennik zmian Deep Work Plan',
      description:
        'Najważniejsze aktualizacje umiejętności, metodyki i przenośnego harnessu agentów Deep Work Plan.',
    },
    eyebrow: 'Dziennik zmian',
    title: 'Praca za metodyką',
    intro:
      'Oparta na źródłach oś czasu wydań i decyzji projektowych, które sprawiają, że Deep Work Plan nadaje się do długiej pracy agentów.',
    viewDetail: 'Przeczytaj aktualizację',
    backToIndex: 'Wszystkie aktualizacje',
    sourceLabel: 'Źródła',
    featuredLabel: 'Wyróżnione wydanie',
    relatedTitle: 'Powiązane aktualizacje',
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
      learn: 'Nauka',
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
            'Podłącza skill Deep Work Plan i tworzy ignorowany przez git katalog .dwp/ na plany i szkice, instaluje wymaganą lokalną recenzję AI Diff Reviewer, a następnie opcjonalnie dokłada dobrowolne dodatki, takie jak wsparcie devcontainer.',
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
      'Wszystko, czego potrzebujesz, by uruchomić metodykę: skill i jego sub-skille, polecenia slash, adaptery agentów, presety onboardingu, wymaganą lokalną recenzję i dobrowolne dodatki oraz opracowane przykłady.',
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
          'Możliwości, które proces onboardingu dokłada do repo: wymagana lokalna recenzja AI Diff Reviewer oraz cztery opcjonalne dodatki, które nigdy nie są częścią bazowego standardu AI-first.',
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
          'Użyj /skill-create i /agent-create (sub-skill author), by rozwijać skille, agentów i polecenia dopasowane do stosu technologicznego. Onboarding instaluje wymaganą lokalną recenzję AI Diff Reviewer (jej bramka CI pozostaje opcjonalna) i oferuje cztery dobrowolne dodatki — devcontainer, Dailybot, dependency-upgrade i design-system — które przyjmujesz tylko, gdy pasują.',
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
  faqPage: {
    meta: {
      title: 'Często zadawane pytania — Deep Work Plan',
      description:
        'Odpowiedzi na najczęstsze pytania o Deep Work Plan: co robi, jak działają bramki walidacji i wznawianie, porównanie z innymi narzędziami oraz adopcja.',
    },
    eyebrow: 'FAQ',
    title: 'Często zadawane pytania',
    intro:
      'Krótkie odpowiedzi na to, o co najczęściej pytają o Deep Work Plan, każda z linkiem do strony, która wyjaśnia więcej.',
    tocTitle: 'Na tej stronie',
    groups: [
      {
        id: 'what',
        title: 'Czym jest Deep Work Plan',
        items: [
          {
            id: 'what-is-it',
            question: 'Co właściwie robi Deep Work Plan?',
            answer:
              'Deep Work Plan zamienia repozytorium w uporządkowane środowisko, w którym agent kodujący może niezawodnie realizować długą pracę. Instaluje się jako skill agenta i jednorazowo onboarduje repozytorium (indeks `AGENTS.md`, drzewo `docs/`, zestaw `.agents/` ze skillami i poleceniami, obszar wyjściowy `.dwp/` wykluczony przez gitignore); od tego momentu każdy cel staje się planem: atomowe zadania, każde z kryteriami akceptacji i bramką walidacji, wykonywane pojedynczo, commitowane po przejściu i wznawialne z dysku przez dowolnego agenta. Plan kończy się Final Review, który audytuje bezpieczeństwo i waliduje stan końcowy. Metodyka jest na licencji MIT i działa z każdym agentem kodującym, który czyta repozytorium.',
            linkLabel: 'Przeczytaj metodykę',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Dla kogo to jest?',
            answer:
              'Dla programistów i zespołów, które przekazują agentom kodującym realną, wieloetapową pracę i chcą, by została dokończona. Pasuje, gdy zadanie obejmuje więcej niż jedną sesję, więcej niż jedną rodzinę plików lub więcej niż jednego agenta; gdy członek zespołu musi móc kontynuować od miejsca, w którym agent się zatrzymał; lub gdy „gotowe” musi oznaczać „zweryfikowane”, a nie „agent tak twierdzi”. Jednoliniowa poprawka nie wymaga planu — i metodyka to mówi wprost: reguła proporcjonalnej rygorystyczności zaleca zamiast tego cel, kryteria i bramkę inline.',
            linkLabel: 'Szybki start',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: 'Jaka jest różnica między planem Lite a Full?',
            answer:
              'Wybór reprezentacji, a nie kompromis rygoru. Każdy plan zaczyna się jako folder Lite: zwarty README z zakotwiczonymi zapisami zadań, który jest już wykonywalny, a nie częściowym szkicem. `create` rozwija się do plików zadań Full tylko wtedy, gdy szczegółowość instrukcji, zależności lub kontrakty zadania nie mieszczą się w zwartym, możliwym do przejrzenia zapisie; jawna prośba o dowolny z formatów jest respektowana, a plan Lite można później promować do Full bez utraty ukończonej pracy. Oba formaty niosą te same kryteria akceptacji, bramki walidacji, dowody i obowiązkowy Final Review.',
            linkLabel: 'Przeczytaj metodykę',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: 'Czy to narzędzie, framework czy metodyka?',
            answer:
              'Metodyka zapakowana jako instalowalny skill. Nie ma serwera, konta, formatu zastrzeżonego ani środowiska uruchomieniowego poza agentem kodującym, którego już używasz. Instalowane są instrukcje czytane przez agenta, niewielki zestaw skryptów shell do wykrywania kontekstu i sprawdzania zgodności oraz konwencje przyjęte przez repozytorium. Wszystko, co plan produkuje, to Markdown i JSON w repozytorium — czytelne bez żadnego narzędzia.',
            linkLabel: 'Przeczytaj specyfikację',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Z jakimi agentami kodującymi to działa?',
            answer:
              'Z każdym agentem, który czyta pliki repozytorium. Skill podąża za otwartym standardem Agent Skills i konwencją `AGENTS.md`, więc Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot i inne przejmują go przez zwykłe ładowanie skilli i instrukcji. Własna ewaluacja metodyki pokazuje plan rozpoczęty przez agenta jednego dostawcy i wznowiony przez agenta innego — w obie strony. Pokrycie instalacji i dowody behawioralne są wymienione per agent w macierzy kompatybilności, a oba aspekty nigdy nie są mieszane.',
            linkLabel: 'Przejrzyj zestaw',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: 'Jak z tego korzystać?',
            answer:
              'Trzy kroki. Najpierw zainstaluj skill Deep Work Plan w swoim agencie kodującym — najszybsza ścieżka to `npx skills add DailybotHQ/deepworkplan-skill` (lub sklonuj repozytorium skilla i uruchom `./setup.sh`). Następnie jednorazowo wprowadź repozytorium do onboardingu, aby agent dostosował `AGENTS.md`, `docs/`, zestaw `.agents/` i obszar `.dwp/` ignorowany przez git do twojego stacku: wskaż https://deepworkplan.com/init.md lub uruchom `/deepworkplan-onboard`. Na koniec planuj i wykonuj pracę za pomocą lekkich poleceń: `/dwp-create <goal>` buduje plan; `/dwp-execute` uruchamia go zadanie po zadaniu wobec każdej bramki; `/dwp-refine` edytuje plan w toku (zakres, zadania lub promocję planu Lite do Full); `/dwp-resume` kontynuuje po przerwie; `/dwp-status` raportuje postęp bez wykonywania; `/dwp-verify` tworzy obiektywny raport zgodności. Agenci przechwytujący `/` często używają zamiast tego `#` (na przykład `#dwp-execute`). Endpoint adopcji i szybki start przechodzą tę samą ścieżkę bardziej szczegółowo.',
            linkLabel: 'Szybki start',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: 'Co dokładnie zostaje zainstalowane i gdzie?',
            answer:
              'Skill agenta jest instalowany tam, gdzie twój agent ładuje skille projektu lub użytkownika. Onboarding następnie dostosowuje samo repozytorium: tworzy lub uzgadnia `AGENTS.md`, `docs/`, `.agents/` oraz obszar roboczy `.dwp/` wykluczony przez gitignore. Skill uczy agenta metody; repozytorium przechowuje kontekst, zestaw i dowody planu, których potrzebują inni agenci, by kontynuować.',
            linkLabel: 'Zobacz przepływ adopcji',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Czy Deep Work Plan wymaga Gita?',
            answer:
              'Git jest zalecany dla repozytoriów, ponieważ jego historia jest częścią powierzchni odzyskiwania i przeglądu, ale metodyka może też działać w przestrzeni roboczej agenta bez repozytorium Git. W takim przypadku wymagana jest maszynowo czytelna warstwa stanu, obejmująca punkty kontrolne `state.json` i zapisy bramek, aby odzyskiwanie nie zależało od transkryptu czatu.',
            linkLabel: 'Przeczytaj o archetypach repozytoriów',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question: 'Czym różni się skill od planu i specyfikacji produktu?',
            answer:
              'Skill opisuje, jak agent wykonuje powtarzalną procedurę. Plan DWP opisuje konkretną zmianę poprzez zakres, kryteria akceptacji, bramki walidacji i dowody. Specyfikacja produktu opisuje bieżące zachowanie produktu i ewoluuje poprzez delty po wdrożeniu; skille i plany też są specyfikacjami, ale opisują procedury i zmiany, a nie utrzymują ten kanoniczny kontrakt produktu.',
            linkLabel: 'Przeczytaj specyfikację',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'Jak działa plan',
        items: [
          {
            id: 'gates',
            question:
              'Jak zaimplementowane są bramki walidacji? Czy wymagają zatwierdzenia przez człowieka?',
            answer:
              'To wykonywalne asercje, które agent uruchamia sam. Zatwierdzenie przez człowieka ramuje przebieg: osoba zatwierdza plan przed wykonaniem i przegląda końcowy diff przy pull requeście; wykonanie między tymi punktami jest autonomiczne. Każde zadanie wymienia konkretne polecenia, zwykle własną bramkę jakości repozytorium, wybrane z dotkniętej powierzchni zadania: testy zmienionego zachowania i jego konsumentów, rozszerzone do pełnej suity, gdy zmiana jest współdzielona lub nie da się jej ograniczyć. Zadanie jest oznaczone jako ukończone tylko wtedy, gdy te polecenia zakończą się sukcesem, a zadania zmieniające zachowanie muszą rozszerzyć testy. Przy niepowodzeniu zadanie jest oznaczone jako zablokowane i agent się zatrzymuje.',
            linkLabel: 'Pętla rdzeniowa',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'Jak plan unika nieaktualności, gdy ludzie zmieniają kod między przebiegami?',
            answer:
              'Na trzech frontach. Zadania są pisane jako zachowanie, nie jako edycje: kryterium akceptacji mówi, co system musi robić, więc zmiana nazwy pliku lub podmiana implementacji go nie unieważnia. Każda bramka uruchamia się ponownie na repozytorium w jego aktualnym stanie; złamane założenie przy następnym przebiegu kończy się głośnym błędem zamiast cichego dryfu, a to niepowodzenie jest sygnałem do doprecyzowania. Utrzymanie dokumentacji w synchronizacji jest częścią pracy: zadanie zmieniające zachowanie aktualizuje też docs i zestaw skierowany do agentów, które to opisują, w ramach własnej bramki. Każdy przebieg powinien zostawić repozytorium bardziej gotowe dla agentów niż zastał.',
            linkLabel: 'Przeczytaj metodykę',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Czy mogę zmienić plan w trakcie przebiegu bez utraty ukończonej pracy?',
            answer:
              'Tak — doprecyzowanie częściowo wykonanego planu jest pełnoprawną operacją. Definicje zadań i stan wykonania są rozdzielone: plan to checklista na dysku plus mały plik stanu, więc to, co zrobione, pozostaje zapisane niezależnie od tekstu zadania. Gdy zadanie okaże się błędne, agent oznacza je jako zablokowane i zatrzymuje się, zamiast iść dalej. Następnie edytujesz, zmieniasz kolejność, dzielisz lub usuwasz zadania, które jeszcze nie ruszyły, podczas gdy ukończone zostają ukończone. Wznowienie odbudowuje stan z dysku i faktycznego repozytorium i ponownie uruchamia istotne bramki, więc nic, co się pod spodem przesunęło, nie przejdzie niezauważone.',
            linkLabel: 'Pętla rdzeniowa',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Czy praca jest stale sprawdzana względem planu, czy plan to tylko kwestia początkowa?',
            answer:
              'Plan jest ciągłą kontrolą. Agent pracuje nad jednym małym zadaniem naraz i musi zwalidować przed przejściem dalej — może zboczyć o jeden krok, nie o trzy. Każde zadanie niesie kryteria akceptacji plus dokładne polecenia, które je dowodzą, a postęp jest zapisywany w repozytorium w trakcie pracy, ze statusem per zadanie, więc dryf staje się widoczny dla ciebie, następnej sesji i następnego agenta. Plan nie jest ukończony, dopóki wszystko nie przejdzie walidacji — w tym Final Review. Uczciwy zastrzeżenie: metodyka nie może powstrzymać agenta od napisania słabego kryterium akceptacji na początku; sprawia, że dryf jest głośny zamiast cichy.',
            linkLabel: 'Pętla rdzeniowa',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Czy plan jest generowany raz i utrzymywany ręcznie, czy ewoluuje wraz z kodem?',
            answer:
              'Ani jedno, ani drugie. Jest generowany raz z celu, a potem utrzymywany jako część pracy. Plan celowo nie jest przepisywany z diffów kodu, bo specyfikacja goniąca kod staje się opóźnionym lustrem — dokładnie tym dryfem, który metodyka istnieje, by wyeliminować. Ewoluuje celowo: bramki uruchamiają się ponownie na aktualnym repozytorium, nieudana bramka wyzwala doprecyzowanie, a agent wykonuje je w trakcie przebiegu, podczas gdy ty zatwierdzasz z góry i przeglądasz na końcu. Dokumentacja i testy rozwijają się wraz z kodem z definicji, bo ich aktualizacja jest w bramce każdego zadania.',
            linkLabel: 'Przeczytaj metodykę',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'Co się dzieje, gdy sesja umiera w połowie?',
            answer:
              'Postęp żyje na dysku, nie w czacie. Checkboxy README, log każdego zadania, ograniczony indeks roboczy i maszynowo czytelny plik stanu są aktualizowane na każdej granicy zadania, a plik stanu rejestruje punkt kontrolny przed każdą planowaną pauzą. Nowa sesja lub inny agent czyta ten zwarty indeks, uzgadnia go z repozytorium i historią git i kontynuuje od pierwszego nieukończonego zadania bez powtarzania gotowej pracy. Nawet przerwane tworzenie planu jest odzyskiwalne: tożsamość planu i zamierzona lista zadań są zapisywane przed jakimkolwiek plikiem zadania, więc półutworzony plan można dokończyć lub odrzucić, zamiast zgadywać.',
            linkLabel: 'Pętla rdzeniowa',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Czym jest Final Review?',
            answer:
              'Jedynym obowiązkowym zadaniem zamykającym każdy plan. Kolejno: przejście bezpieczeństwa przez pełny skumulowany zestaw zmian planu, w tym wymagany lokalny przegląd diffu przez skill AI Diff Reviewer, przy czym krytyczne ustalenia blokują ukończenie do czasu naprawy lub wyraźnej akceptacji; walidacja stanu końcowego, czyli pełne odpowiednie suity testów, lintu, sprawdzania typów i formatowania repozytorium na końcowym kodzie; oraz uzgodnienie decyzji o skillach zarejestrowanych przez każde zadanie. Agent następnie raportuje rezultaty, dowody i ograniczenia oraz jednorazowo oferuje Executive Report, generując go tylko na żądanie.',
            linkLabel: 'Specyfikacja',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: 'Co się dzieje, gdy bramka walidacji zawiedzie?',
            answer:
              'Zadanie jest zapisywane jako zablokowane, a agent zatrzymuje się przed zgłoszeniem ukończenia. Możesz sprawdzić dowody, naprawić kod lub doprecyzować zadanie, a następnie wznowić; nieudane polecenie jest sygnałem do rozwiązania niezgodności, a nie pozwoleniem na osłabienie bramki.',
            linkLabel: 'Przeczytaj protokół agenta',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question: 'Czy plan może działać bez nadzoru w nocy lub w CI?',
            answer:
              'Tak, gdy plan został wcześniej zatwierdzony, niesie wymaganą warstwę stanu i daje agentowi ograniczone uprawnienia. Przebieg bez nadzoru musi się zatrzymać i zapisać blokadę, gdy rzeczywistość odbiega od planu, bramka zawiedzie poza planowanym zakresem naprawy lub potrzebne jest nowe zatwierdzenie bądź poświadczenie.',
            linkLabel: 'Przeczytaj protokół pracy bez nadzoru',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Porównanie',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'Czym różni się od narzędzi spec-driven, takich jak Spec Kit, OpenSpec czy Kiro?',
            answer:
              'Rozwiązują sąsiednie problemy. Narzędzia spec-driven doskonale uchwytują, co powinno się zmienić: specyfikacje, wymagania i propozycje zmian w powtarzalnej formie. Deep Work Plan dotyczy tego, jak agent wykonuje pracę godzinami bez dryfu: onboardowany harness, bramki walidacji per zadanie wybrane z dotkniętej powierzchni, wznawialny stan na dysku, obowiązkowy Final Review z przejściem bezpieczeństwa i sprawdzacz zgodności dla samego repozytorium. Oba podejścia można połączyć — specyfikacja lub propozycja zmiany zasila plan. Strona porównania układa możliwości obok siebie, w terminach każdego narzędzia.',
            linkLabel: 'Zobacz porównanie',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'Czym różni się od narzędzi workflow agentów, takich jak BMAD, Superpowers, Get Shit Done czy Gentle-AI?',
            answer:
              'Frameworki przepływu pracy dla agentów, takie jak BMAD, Superpowers i Get Shit Done, wnoszą silne style pracy: role, zasady, kroki test-first, nawyki weryfikacji. Gentle-AI znajduje się w sąsiedniej kategorii jako konfigurator ekosystemu agentów: wyposaża agentów kodujących, których już używasz, w trwałą pamięć między sesjami (Engram), wyselekcjonowane skille, persony, serwery MCP, opcjonalny Spec-Driven Development i opcjonalną recenzję opartą na dowodach (Receipt-Driven Development), zapisując w katalogach konfiguracyjnych każdego agenta. Deep Work Plan różni się od obu: skupia się na tym, co pozostaje w repozytorium i co można sprawdzić — harness, który każdy agent odczyta bez wcześniejszego kontekstu, pliki zadań z kryteriami akceptacji i bramkami, stan, który przetrwa sesję, weryfikator zgodności z kodem wyjścia przyjaznym dla CI oraz publikowany pomiar liczby bajtów instrukcji ładowanych przez każdy przepływ. Jest niezależny od narzędzia z założenia i nie dodaje do głównej pętli żadnej usługi, dostawcy ani sekretu. Warstwy mogą współistnieć: frameworki i Gentle-AI kształtują sposób pracy agenta; Deep Work Plan sprawia, że długa praca jest trwała i możliwa do zweryfikowania w repozytorium. Strona porównania pokazuje, gdzie każde podejście jest wbudowane, opcjonalne lub poza zakresem.',
            linkLabel: 'Zobacz porównanie',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Dlaczego nie użyć wbudowanego trybu planowania mojego agenta?',
            answer:
              'Wbudowane tryby planowania są przydatne, a Deep Work Plan buduje na tym samym podłożu: konwencji `AGENTS.md` i otwartym standardzie Agent Skills. Różnica polega na tym, gdzie żyje plan i co go egzekwuje. Natywne plany zwykle żyją poza repozytorium i wygasają z sesją; Deep Work Plan zapisuje plan, jego stan i dowody w repozytorium, więc inny agent lub członek zespołu może go kontynuować, a każde zadanie niesie wykonywalną bramkę i zarejestrowany log. Tryb planowania agenta nadal używasz do myślenia; metodyka dodaje trwałą, weryfikowalną pętlę wykonania.',
            linkLabel: 'Zobacz porównanie',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopcja',
        items: [
          {
            id: 'install',
            question:
              'Co onboarding zapisuje w moim repozytorium i czy dotyka istniejących plików?',
            answer:
              'Onboarding jest niedestrukcyjny: wykrywa istniejący `AGENTS.md`, `docs/`, `.agents/` lub `CLAUDE.md`, uzgadnia zamiast nadpisywać i pyta przed zastąpieniem czegokolwiek. Zapisuje indeks `AGENTS.md` z realnymi poleceniami, przemyślane drzewo `docs/`, dokumentację per moduł, zestaw `.agents/` z cienkimi poleceniami `dwp-*`, obszar wyjściowy `.dwp/` wykluczony przez gitignore, zweryfikowaną mapę testów i wymagany lokalny przegląd kodu (skill AI Diff Reviewer plus rozszerzenie przeglądu dopasowane do repozytorium). Następnie uruchamia samosprawdzenie i sprawdzacz zgodności, aby pokazać, co zostało wyprodukowane. Repozytorium onboardowane pod wcześniejszą wersją dostaje ukierunkowaną aktualizację zmieniającą tylko to, czego brakuje.',
            linkLabel: 'Endpoint adopcji',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              'Czy mogę korzystać z rdzenia metodyki bez instalowania dodatków?',
            answer:
              'Tak. Dodatki są warstwami opcjonalnymi, a repozytorium bez żadnego z nich jest w pełni zgodne z DWP. Devcontainery, raportowanie Dailybot, aktualizacje zależności, wsparcie systemu projektowego i opcjonalny przegląd CI są oferowane tylko wtedy, gdy pasują do twojego repozytorium i wyraźnie je akceptujesz.',
            linkLabel: 'Przejrzyj dodatki',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question:
              'Co, jeśli moje repozytorium nie ma jeszcze testów ani lintingu?',
            answer:
              'DWP nie traktuje braku łańcucha narzędzi jako wolnej przepustki. Podczas onboardingu agent proponuje konfigurację walidacji dopasowaną do stosu, zapisuje polecenia w dokumentacji repozytorium i używa tych poleceń jako celu dla przyszłych bramek; propozycja pozostaje widoczna do przeglądu.',
            linkLabel: 'Przeczytaj protokół agenta',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: 'Ile to kosztuje i jak mierzona jest wydajność?',
            answer:
              'Metodyka i skill są na licencji MIT i bezpłatne; nie ma usługi, klucza API ani telemetrii w przepływach rdzeniowych. Wydajność jest raportowana jako liczba bajtów instrukcji ładowanych przez każdy przepływ, mierzona skryptem commitowanym ze skillem i publikowaną w rejestrze ewaluacji, przy czym wzrosty są raportowane tak samo otwarcie jak spadki. Nie jest raportowana jako procenty tokenów ani oszczędności kosztów, bo inwentaryzacja bajtów tego nie dowodzi; planowana jest preregistrowana publiczna ewaluacja, by właściwie zmierzyć wyniki.',
            linkLabel: 'Zaufanie i ujawnianie',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Masz jeszcze pytanie?',
      body: 'Otwórz dyskusję lub issue na GitHubie. Pytania powtarzające się są dodawane do tej strony.',
      ctaLabel: 'Zapytaj na GitHubie',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan w porównaniu z alternatywami',
      description:
        'Jak Deep Work Plan odnosi się do narzędzi spec-driven, frameworków workflow agentów i trybów planowania dostawców: własne terminy, źródła i data przeglądu.',
    },
    eyebrow: 'Porównanie',
    title: 'Deep Work Plan i alternatywy',
    intro:
      'Wybierz właściwą warstwę dla swojej sytuacji. Każda alternatywa jest opisana we własnych terminach, każdy fakt da się prześledzić do oficjalnej dokumentacji, a strona podaje datę ostatniego przeglądu. To mapa, nie ranking.',
    howToRead: {
      title: 'Jak czytać tę stronę',
      body: 'Trzy wartości opisują każdą możliwość. Mówią, gdzie możliwość żyje w narzędziu — nie, jak dobre jest narzędzie.',
      values: {
        builtIn: 'Wbudowane',
        optional: 'Opcjonalnie lub przez rozszerzenie',
        notInScope: 'Poza zakresem',
      },
    },
    reviewedOnLabel: 'Ostatni przegląd',
    alternativesTitle: 'Alternatywy, we własnych terminach',
    officialSiteLabel: 'Strona oficjalna',
    categories: {
      methodology: 'Metodyka',
      sdd: 'Narzędzia do rozwoju spec-driven',
      agentFramework: 'Frameworki workflow agentów',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: 'Tryby planowania dostawców',
    },
    matrix: {
      title: 'Macierz możliwości',
      caption:
        'Gdzie każda możliwość żyje, per narzędzie. Wbudowane, opcjonalnie lub przez rozszerzenie, lub poza zakresem. Przegląd na podstawie oficjalnej dokumentacji.',
      capabilityColumn: 'Możliwość',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Działa z każdym agentem kodującym',
        help: 'Te same pliki repozytorium obsługują Claude Code, Codex, Cursor, Gemini CLI i inne.',
      },
      repoNativeHarness: {
        label: 'Zapisuje harness agenta w repozytorium',
        help: 'Instrukcje, docs, skille i polecenia żyją w repozytorium, nie w ustawieniach jednego narzędzia.',
      },
      taskAcceptanceCriteria: {
        label: 'Kryteria akceptacji per zadanie',
        help: 'Każde zadanie podaje obserwowalne warunki ukończenia.',
      },
      perTaskGates: {
        label: 'Bramka walidacji per zadanie',
        help: 'Każde zadanie wymienia polecenia, które muszą przejść, wybrane z tego, co dotknęło.',
      },
      resumableState: {
        label: 'Wznawialny stan na dysku',
        help: 'Postęp przetrwa reset sesji i może być przejęty przez innego agenta lub członka zespołu.',
      },
      finalReview: {
        label: 'Obowiązkowy przegląd zamykający z przejściem bezpieczeństwa',
        help: 'Plan nie może się zakończyć bez przeglądu bezpieczeństwa pełnego zestawu zmian i walidacji stanu końcowego.',
      },
      conformanceChecker: {
        label: 'Wykonywalny sprawdzacz zgodności',
        help: 'Skrypt weryfikuje repozytorium i jego plany względem standardu, z kodem wyjścia przyjaznym dla CI.',
      },
      instructionBudgetLedger: {
        label: 'Opublikowany pomiar obciążenia instrukcjami',
        help: 'Bajty ładowane przez każdy przepływ są mierzone skryptem commitowanym i publikowane z ich limitami.',
      },
      onboardingScaffold: {
        label: 'Onboarding budujący dokumentację',
        help: 'Pierwszy przebieg zapisuje dokumentację i zestaw repozytorium skierowane do agentów.',
      },
      brownfieldSpecs: {
        label: 'Żywe specyfikacje dla istniejących systemów',
        help: 'Zmiany są specyfikowane jako delty scalane w rosnącą specyfikację systemu.',
      },
      crossProjectMemory: {
        label: 'Trwała pamięć agenta między projektami',
        help: 'Pamięć podąża za agentem między różnymi repozytoriami i sesjami, a nie tylko za stanem jednego planu na dysku.',
      },
      roleBasedAgents: {
        label: 'Odrębne wyspecjalizowane role agentów',
        help: 'Nazwane persony (np. analityk, architekt czy recenzent) dzielą pracę, zamiast by jeden agent wykonywał każdy krok.',
      },
      nativeIdeProduct: {
        label: 'Jest samodzielnym IDE lub edytorem',
        help: 'Narzędzie samo w sobie jest zintegrowanym środowiskiem programistycznym, a nie dodatkiem do istniejącego agenta kodującego.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Instaluje się jako skill, onboarduje repozytorium jako harness agenta i realizuje długoterminowe plany z bramkami walidacji per zadanie, stanem na dysku i obowiązkowym Final Review.',
        audience:
          'Programiści i zespoły przekazujące wielosesyjną pracę dowolnemu agentowi kodującemu, którzy potrzebują zweryfikowanego ukończenia.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Zamienia funkcję w wykonywalną specyfikację przez konstytucję, spec, plan i listę zadań, napędzane poleceniami slash integrującymi ponad pięćdziesiąt agentów kodujących, i może sprawdzić spójność artefaktów między sobą przed rozpoczęciem implementacji.',
        audience:
          'Zespoły chcące powtarzalnego workflow specify, plan, tasks i implement w agencie, którego już używają.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Uchwytuje każdą zmianę jako propozycję z delta-specs (dodane, zmodyfikowane, usunięte) i wymaganiami RFC 2119 ze scenariuszami, a następnie archiwizuje je w żywych specyfikacjach, wraz z walidatorem sprawdzającym kompletność propozycji i pokrycie scenariuszy przed zaakceptowaniem zmiany.',
        audience:
          'Zespoły pracujące nad istniejącymi systemami, których specyfikacje powinny rosnąć zmiana po zmianie.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Agentowa IDE i CLI, w której specyfikacje przechodzą od wymagań w stylu EARS przez design do zadań, ze steering files i hookami uruchamianymi na zdarzeniach edytora, i potrafi wygenerować specyfikacje dla istniejącej bazy kodu, aby wychwycić luki w wymaganiach przed rozpoczęciem projektowania.',
        audience:
          'Programiści chcący rozwoju spec-driven wbudowanego w edytor z narzędziami opartymi na AWS.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Zwinny framework wyspecjalizowanych ról agentów (analiza, produkt, architektura, rozwój, jakość) produkujący briefy, wymagania, dokumenty architektury i pliki story, wraz z Definition of Done wymagającym, aby każda story została zrecenzowana przez współpracownika lub recenzenta AI, zanim zostanie uznana za ukończoną.',
        audience:
          'Zespoły lubiące ceremonie oparte na rolach i chcące pełnego zwinnego cyklu życia pracy agentów.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Biblioteka skilli i workflow do brainstormingu, planowania w małych krokach test-first, wykonania z subagentami i przeglądu przed ukończeniem, zintegrowana z większą liczbą hostów agentów kodujących niż jakakolwiek inna alternatywa tutaj, plus dwuetapowy przegląd przez subagenta (najpierw zgodność ze specyfikacją, potem jakość kodu) przy każdym zadaniu.',
        audience:
          'Programiści chcący zdyscyplinowanego wykonania test-driven w swoim agencie kodującym.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'System planowania z katalogiem .planning, identyfikatorami wymagań, planami faz, wykonaniem ze świeżym kontekstem i przejściem weryfikacji względem obserwowalnych przez użytkownika rezultatów wyodrębnionych z podsumowania każdego planu — zaprojektowany, by przeciwdziałać "context rot": badania, planowanie i wykonanie działają w jednorazowych subagentach, a weryfikacja wykrywa nieaktualność dzięki sprawdzaniu odcisków cyfrowych treści.',
        audience:
          'Samodzielni programiści i małe zespoły chcące context engineering i weryfikacji z niewielką ceremonią.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          "Konfiguruje agentów kodujących, których już używasz — z pamięcią trwałą, która dodatkowo kieruje ruch między sesjami i modelami, wyselekcjonowanymi skillami, serwerami MCP, personami oraz opcjonalnym Spec-Driven Development lub Receipt-Driven Development. Konfiguracja jest domyślnie zapisywana w globalnych ustawieniach agenta; instalacja ograniczona do workspace'u jest opcjonalna.",
        audience:
          'Programiści chcący skonfigurowanego ekosystemu agentów, który pamięta pracę między sesjami i może na żądanie dostarczyć dowody.',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          'Sześcioetapowa pętla od Plan i Design przez Build, Test, Deploy po Maintain, z zatwierdzeniem człowieka wymaganym na każdym etapie, trwałymi artefaktami commitowanymi do repozytorium między etapami, dedykowanym przeglądem oznaczonym jako bezpieczeństwo przed wdrożeniem oraz ciągłymi ewaluacjami publikującymi wiodące i opóźnione wskaźniki dostaw.',
        audience:
          'Zespoły oceniające kompleksowy playbook dostarczania oprogramowania Claude Code i jego pętlę informacji zwrotnej z produkcji.',
      },
      'vendor-native': {
        name: 'Tryby planowania dostawców',
        whatItDoesWell:
          'Claude Code, Codex, Cursor i Gemini CLI dostarczają tryby planowania, pliki instrukcji i skille oparte na otwartych, niezależnych od dostawcy standardach AGENTS.md i Agent Skills, choć dokładne zachowanie trybu planowania nadal zależy od dostawcy, klienta i wersji. W szczególności Agent Skills ładują na starcie tylko krótkie podsumowanie, a pełne instrukcje dopiero po aktywacji, dzięki czemu nieużywana funkcjonalność nie zajmuje kontekstu.',
        audience:
          'Każdy, kto chce planowania w jednym agencie bez adopcji metodyki.',
      },
    },
    aiNative: {
      title: 'Gdzie to pasuje w AI-native SDLC',
      body: 'Playbook AI-native SDLC od Claude opisuje pełną pętlę: Plan, Design, Build, Test, Deploy i Maintain. Każdy etap commituje artefakt, który czyta kolejny etap, z bramką zatwierdzenia człowieka na każdym etapie i dedykowanym przeglądem bezpieczeństwa przed wdrożeniem, podczas gdy informacja zwrotna z produkcji staje się nową intencją.',
      shared:
        'DWP podziela ideę trwałego artefaktu i bramkowanego zatwierdzenia: intencja staje się planem, zadania pozostawiają dowody, przed ukończeniem uruchamiany jest przegląd bezpieczeństwa, a repozytorium pozostaje czytelne dla kolejnego agenta.',
      boundary:
        'Prawdziwa różnica dotyczy zakresu, nie rygoru: playbook jest zbudowany wokół konkretnie Claude Code, podczas gdy harness i format planu DWP mogą być odczytane przez każdego agenta zgodnego ze standardami AGENTS.md i Agent Skills. Playbook obejmuje też ciągłą ewaluację i operacje produkcyjne, do których DWP nie rości sobie prawa; te praktyki operacyjne mogą uzupełniać repozytorium prowadzone w DWP, a nie z nim konkurować.',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'Zobacz porównanie',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Co wnosi Deep Work Plan',
      items: [
        {
          title: 'Niezależny od narzędzi i natywny dla repozytorium',
          body: 'Harness i plan to pliki w repozytorium, czytane przez każdego agenta zgodnego ze standardami AGENTS.md i Agent Skills. Zmiana agenta nie traci planu.',
        },
        {
          title: 'Walidacja wybrana z tego, co dotknęło każde zadanie',
          body: 'Każde zadanie deklaruje dotkniętą powierzchnię i uruchamia testy zmienionego zachowania i jego konsumentów, rozszerzając do pełnej suity, gdy wpływ nie da się ograniczyć. Zero wybranych testów nigdy nie jest przejściem.',
        },
        {
          title: 'Jeden Final Review z przejściem bezpieczeństwa',
          body: 'Plan kończy się przeglądem bezpieczeństwa skumulowanego zestawu zmian, w tym wymaganym lokalnym przeglądem diffu, i walidacją stanu końcowego. Krytyczne ustalenia blokują ukończenie.',
        },
        {
          title: 'Stan przetrwający sesje i agentów',
          body: 'Checkboxy README, logi zadań, ograniczony indeks roboczy i maszynowo czytelny plik stanu są zapisywane na każdej granicy, więc inna sesja lub inny agent kontynuuje z dysku. Nawet przerwane tworzenie planu jest odzyskiwalne.',
        },
        {
          title: 'Sprawdzacz zgodności dla samego repozytorium',
          body: 'Skrypt tylko do odczytu weryfikuje harness i każdy plan względem specyfikacji, rozumie oba cykle życia planu i kończy się kodem przyjaznym dla CI.',
        },
        {
          title: 'Obciążenie instrukcjami mierzone i publikowane',
          body: 'Commitowany skrypt mierzy, ile bajtów ładuje każdy przepływ; wyniki, w tym wzrosty, są publikowane jako bajty, nigdy jako procenty tokenów ani kosztów.',
        },
      ],
    },
    honestLimits: {
      title: 'Uczciwe ograniczenia',
      body: 'Deep Work Plan nie ma mechanizmu żywych ani delta-specyfikacji; OpenSpec i podobne narzędzia są tam silniejsze. Niezależny benchmark metodyki jeszcze nie istnieje; planowana jest preregistrowana publiczna ewaluacja. Rejestr obciążenia instrukcjami mierzy załadowane bajty, nie tokeny, koszty ani wyniki. DWP jest celowo ograniczony do repozytorium: nie jest systemem pamięci między projektami, nie jest frameworkiem agentów opartym na rolach ani IDE, więc nie konkuruje też na tych płaszczyznach — połącz go z narzędziem pokrywającym daną potrzebę, gdy praca tego wymaga.',
    },
    correction: {
      title: 'Pomóż nam utrzymać dokładność',
      body: 'Ta strona jest przeglądana w podanej dacie i poprawiana na żądanie. Jeśli opis twojego narzędzia jest nieaktualny lub niekompletny, otwórz issue, a poprawimy go.',
      ctaLabel: 'Otwórz issue',
    },
    sourcesTitle: 'Źródła',
  },

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
        title: 'Lokalna recenzja i dobrowolne dodatki',
        description:
          'Onboarding instaluje wymaganą lokalną recenzję AI Diff Reviewer (jej bramka CI pozostaje opcjonalna) i oferuje cztery opcjonalne dodatki — devcontainer, Dailybot, dependency-upgrade i design-system — które przyjmujesz tylko, gdy pasują. Repo jest w pełni zgodne z zerową liczbą opcjonalnych dodatków. Użyj /skill-create i /agent-create (sub-skill author), by rozwijać skille, agentów i polecenia wykraczające poza bazowy zestaw.',
      },
      {
        title: 'Planuj i realizuj',
        description:
          'Generuj Deep Work Plans za pomocą /dwp-create i realizuj je przez /dwp-execute, a następnie /dwp-status, /dwp-refine, /dwp-resume i /dwp-verify w miarę postępu prac. Każdy plan niesie ponumerowane zadania, bramki walidacyjne i protokół ukończenia — i zamyka się dokładnie jednym obowiązkowym Final Review (przejście bezpieczeństwa, walidacja stanu końcowego i uzgodnienie decyzji o skillach). Executive Report pozostaje dostępny na żądanie.',
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
