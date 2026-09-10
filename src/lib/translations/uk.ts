/**
 * uk translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const uk: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — структуроване виконання для AI-агентів програмування',
  siteDescription:
    'Deep Work Plan: відкрита методологія та еталонний набір для структурованого, перевіреного та відновлюваного багатогодинного виконання роботи AI-агентами.',

  // Navigation
  nav: {
    home: 'Головна',
    about: 'Про методологію',
    contact: 'Контакти',
    // Deep Work Plan IA
    methodology: 'Методологія',
    spec: 'Специфікація',
    kit: 'Набір',
    examples: 'Приклади',
    init: 'Init',
    quickstart: 'Швидкий старт',
    trust: 'Довіра',
    developers: 'Розробники',
    privacy: 'Приватність',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: 'Початковий код',
      website: 'Репозиторій сайту',
      websiteDesc: 'Цей сайт',
      skill: 'Репозиторій навички',
      skillDesc: 'Встановлювана навичка',
    },
    menu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Усі права захищено.',
    poweredBy: 'Працює на',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Новинка · Ефективний за токенами',
    text: 'Deep Work Plan сьогодні на Product Hunt',
    tagline: 'дайте агенту план',
    linkText: 'Підтримати',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Навігація сайтом',
    sections: {
      methodology: 'Методологія',
      getStarted: 'Початок роботи',
      project: 'Проєкт',
      connect: 'Звʼязок',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title:
        'Deep Work Plan — структуроване виконання для AI-агентів програмування',
      description:
        'Контекст важливіший за моделі. Deep Work Plan перетворює будь-який репозиторій на структуроване середовище, де будь-який агент програмування завершує тривалу роботу.',
    },
    hero: {
      badge: 'Відкрита методологія · MIT · Незалежно від агента',
      title: 'Моделі важливі.',
      titleEmphasis: 'Контекст важливіший.',
      subtitle:
        'Deep Work Plan перетворює будь-який репозиторій на структуроване середовище — контекст, захисні бар’єри та довговічний план, — де будь-який агент розробки працює точно й ефективно та виконує тривалу роботу.',
      instructionLabel: 'Скопіювати до агента',
      instruction:
        'Скопіюйте промт init.md і вставте його у свій агент програмування — Claude Code, Cursor, Codex або будь-який інший — щоб зробити будь-який репозиторій AI-first.',
      copyLabel: 'Копіювати init.md',
      copiedLabel: 'Скопійовано',
      viewInitCta: 'Переглянути повний промт /init',
      pullQuote:
        'Deep Work Plan — це spec-driven розробка, у якій сам репозиторій стає harness.',
      primaryCta: 'Читати методологію',
      secondaryCta: 'Читати специфікацію',
      illustrationAlt:
        'Маяк на скелястому березі кидає єдиний промінь, що скеровує невелике судно — гравюра, що уособлює репозиторій як надійний harness, що веде будь-якого агента.',
      scrollCta: 'Як це працює',
    },
    pitch: {
      kicker: 'Проблема й відповідь',
      problem:
        'У коротких ривках агенти розробки вражають. Доручіть їм тривалу місію — міграцію, новий підсистемний рефакторинг десятків файлів — і вони дрейфують: контекст переповнюється, попередні рішення бліднуть, а багатогодинна робота зупиняється на півдорозі.',
      answer:
        'Deep Work Plan відповідає розробкою за специфікацією: міцний план, атомарні завдання та validation gates, які агент зобов’язаний пройти. «Готово» перестає бути відчуттям — стає перевіреним і оглянутим доказом.',
      efficiency:
        'І оскільки контекст — найдефіцитніший ресурс вашого агента, harness спроектований для економії токенів: інструкції завантажуються поступово, перевірка торкається лише зміненого, а навчання відбувається на місці завдання — тривала робота залишається доступною.',
      illustrationAlt:
        'Гравюрний диптих: ліворуч — корабель, що дрейфує в тумані біля скель, праворуч — той самий корабель, впевнено на прокладеному курсі до маяка гавані.',
    },
    story: {
      act1: {
        kicker: 'Метод · Акт I',
        lead: 'Ви вирішуєте, що означає «готово» і де проходять межі. План несе ваш задум; агенти відпрацьовують години — без постійного нагляду та правок кожні двадцять хвилин.',
        deepLinkLabel: 'Прочитати методологію',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'Метод · Акт II',
        lead: 'Довгі завдання заповнюють контекст будь-якої моделі. Деталі втрачаються, і агент дрейфує. Письмовий план — атомарні завдання, ворота валідації, відновлюваний стан — це те, до чого він повертається коло за колом.',
        deepLinkLabel: 'Переглянути основний цикл',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'Метод · Акт III',
        lead: 'Кожне завдання називає свої критерії приймання та перевірки, які мають пройти. Агент не може «відчути себе завершеним» — він має пройти перевірку, інакше завдання залишається відкритим.',
        deepLinkLabel: 'Прочитати специфікацію',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'Метод · Акт IV',
        lead: 'Контекст, інструменти, захисні бар’єри та стан живуть у вашому репозиторії простими файлами, які може прочитати будь-який агент. Без прив’язки, без зовнішнього мозку — усе переживає скидання контексту.',
        deepLinkLabel: 'Подивитися, що створює онбордінг',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'Метод · Акт V',
        lead: 'Контекст — найдефіцитніший ресурс вашого агента. Harness завантажується поступово, перевіряє лише змінене та вчиться завдання за завданням — план окупує себе сам.',
        deepLinkLabel: 'Прочитати методологію',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Онбординг на основі міркувань',
      title:
        'Спрямуйте його на будь-який репозиторій. Він міркує — а не копіює та вставляє.',
      subtitle:
        'Процес онбордингу перевіряє реальні мови, фреймворки, менеджер пакетів і команди валідації вашого репозиторію, а потім генерує артефакти, пристосовані до цього репозиторію. Загальна заготовка вважається невдачею.',
      steps: [
        {
          title: 'Міркує про ваш стек та архетип',
          description:
            'Читає маніфести, структуру каталогів та CI, щоб вивести реальні команди тестування, лінтингу та збірки, після чого класифікує репозиторій як окремий репозиторій або як хаб-оркестратор.',
        },
        {
          title: 'Генерує AGENTS.md, docs/ та документацію кожного модуля',
          description:
            'Обґрунтований AGENTS.md, упорядкована за категоріями ієрархія docs/, а також README та docs/ усередині кожного великого модуля — заповнені реальними командами вашого репозиторію, а не заготовками.',
        },
        {
          title:
            'Створює .agents/ із символьними посиланнями .claude та .cursor на .agents',
          description:
            'Міжагентний каталог .agents/ (скіли, агенти, команди) та символьні посилання .claude та .cursor на .agents, що віддзеркалює CLAUDE.md у AGENTS.md, аби кожен інструмент читав одне джерело істини.',
        },
        {
          title: 'Встановлює скіл DWP і створює .dwp/',
          description:
            'Підключає скіл Deep Work Plan і створює каталог .dwp/ у gitignore для планів та чернеток, а потім за бажанням додає опціональні addon, як-от підтримку devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Що відбувається, коли ви це запускаєте',
      title: 'Одна інструкція. Решту робить репозиторій.',
      subtitle:
        'Ви не обираєте спосіб встановлення й не копіюєте шаблон. Ви передаєте агенту один рядок; він встановлює скіл — багаторазовий рушій — і пристосовує до нього ваш репозиторій.',
      steps: [
        {
          title: 'Ваш агент відкриває /init.md',
          description:
            'Він читає промт онбордингу за адресою deepworkplan.com/init.md, а також методологію, специфікацію та набір, на які той посилається — стандарт, який він збирається прийняти.',
        },
        {
          title: 'Він встановлює скіл Deep Work Plan',
          description:
            'Скіл — це рушій, однаковий у кожному репозиторії. Одна команда підтягує маршрутизатор та його суб-скіли (create, execute, refine, resume, status, verify, onboard, author) для Claude Code, Cursor, Codex, Gemini та Copilot.',
        },
        {
          title: 'Він пристосовує ваш репозиторій',
          description:
            'Міркуючи про ваш реальний стек — ніколи не копіюючи та не вставляючи — він пише AGENTS.md, упорядковане дерево docs/, README кожного модуля, обґрунтований набір .agents/ та .dwp/ у gitignore. Ваш репозиторій стає harness.',
        },
        {
          title: 'Ви плануєте та виконуєте',
          description:
            'Генеруйте тривалі Deep Work Plan для будь-якого завдання та виконуйте їх крок за кроком — із чіткими критеріями приймання, валідаційними gate та відновлюваним станом — автономно, годинами.',
        },
      ],
      note: 'Скіл встановлюється всюди однаково; пристосовується саме ваш репозиторій — AGENTS.md, документація та обґрунтований набір .agents/, згенеровані під ваш стек. Саме цей поділ робить методологію багаторазовим стандартом, а не разовою заготовкою.',
    },
    outcomes: {
      badge: 'Що ви отримуєте',
      title: 'Усе, що потрібно вашому агенту для автономної роботи.',
      subtitle:
        'Один запуск, зафіксований атомарно. Кожен результат — це Markdown, а кожна зміна піддається аудиту.',
      items: [
        {
          label: 'AGENTS.md у корені репозиторію',
          detail:
            'Обґрунтований на основі реального стеку, команд і структури вашого репозиторію — а не шаблон із заготовками. CLAUDE.md символьно посилається на AGENTS.md.',
        },
        {
          label: 'Упорядкований docs/ та документація кожного модуля',
          detail:
            'Архітектура, налаштування, стандарти та усунення несправностей — плюс README і docs/ усередині кожного великого модуля, згенеровані з вашої кодової бази.',
        },
        {
          label:
            '.agents/ із символьними посиланнями .claude та .cursor на .agents',
          detail:
            'Міжагентний каталог .agents/ (скіли, агенти, команди) із символьними посиланнями .claude та .cursor на .agents, аби кожен інструмент читав одне джерело істини.',
        },
        {
          label: 'Встановлений скіл Deep Work Plan',
          detail:
            'create, execute, refine, resume, status, verify, onboard та author — доступні вашому агенту як єдиний пакет скілів, без копії для кожного репозиторію.',
        },
        {
          label: 'Відповідність, яку можна перевірити',
          detail:
            '/dwp-verify формує обʼєктивний звіт «пройдено/не пройдено» за специфікацією, тож «AI-first» є перевіреним, а не просто заявленим — і його можна перевірити заново після кожного плану.',
        },
        {
          label: 'Два архетипи, опрацьовані',
          detail:
            'Онбординг класифікує ваш репозиторій як окремий репозиторій (типовий випадок) або як хаб-оркестратор, що координує дочірні плани в межах багатьох репозиторіїв.',
        },
        {
          label: 'Живий набір, що зростає разом із репозиторієм',
          detail:
            'Суб-скіл author (skill-create, agent-create) дає змогу репозиторію розвивати власні скіли, агенти та команди; опціональні addon обслуговування, як-от dependency-upgrade, допомагають йому підтримувати себе в актуальному стані.',
        },
        {
          label: 'Git-нативний, відновлюваний, .dwp/',
          detail:
            'Без демона та без зовнішнього стану. Плани й чернетки потрапляють у каталог .dwp/ у gitignore, і будь-яке завдання відновлюється виключно з git — навіть після переповнення контексту.',
        },
      ],
    },
    agents: {
      badge: 'Агенти',
      title: 'Працює з агентом, яким ви вже користуєтеся.',
      subtitle:
        'Одна методологія, багато адаптерів. Markdown не привʼязує фреймворк ні до чого — будь-який агент, що читає Markdown, може запустити Deep Work Plan.',
      fullLabel: 'Повна',
      partialLabel: 'Часткова',
      viewAllCta: 'Переглянути всіх агентів',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Еталонна реалізація, з нативними WebFetch та slash-командами.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Повний адаптер. Скористайтеся офлайн-набором, якщо WebFetch обмежено.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Рекомендовано офлайн-набір; правила встановлюються в .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Повний адаптер — команди dwp-* виконуються через AGENTS.md та процедури #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Потрібен Gemini 2.5 Pro або новіший, із нативним WebFetch.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Відкритий код. Нативно читає AGENTS.md і запускає dwp-* через команди #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Правила та процедури команд # керують повним циклом Deep Work Plan.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Відкритий код. Правила Markdown та команди # виконують кожен крок dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Повний адаптер із нативним набором команд.',
        },
      ],
    },
    stacks: {
      badge: 'Стеки',
      title: 'Пресети-міркування для стеків, що мають значення.',
      viewAllCta: 'Переглянути всі пресети',
      subtitle:
        'Це допоміжні засоби для міркування, а не шаблони. Онбординг читає реальні маніфести вашого репозиторію та пристосовується до кожного стеку — він ніколи не копіює пресет наосліп. Монорепозиторії отримують документацію кожного модуля.',
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
        { name: 'Generic', sub: 'Будь-який стек' },
      ],
    },
    archetypes: {
      badge: 'Два архетипи',
      title: 'Окремий репозиторій або хаб-оркестратор.',
      subtitle:
        'Онбординг розгалужується за архетипом. Більшість репозиторіїв — це окремі репозиторії. Хаб координує дочірні Deep Work Plan у межах багатьох репозиторіїв. Методологія опрацьовує обидва як повноцінні.',
      individual: {
        tag: 'Типовий випадок',
        title: 'Окремий репозиторій',
        description:
          'Єдина кодова база з одним основним стеком, власними командами валідації та документацією кожного модуля. Варіант за замовчуванням — онбординг припускає його, доки репозиторій не виявиться явно хабом.',
        example:
          'Наприклад, Django API, застосунок на Vue або сервіс TypeScript Lambda.',
      },
      orchestrator: {
        tag: 'Координація',
        title: 'Хаб-оркестратор',
        description:
          'Координаційний репозиторій, що оркеструє роботу між суб-репозиторіями через маніфест оркестратора, породжуючи дочірні плани, кожен з яких фіксується у власному репозиторії, плюс правила меж та навігаційний індекс.',
        example: 'Наприклад, хаб, що координує пʼять продуктових репозиторіїв.',
      },
    },
    comparison: {
      badge: 'Методологія проти інструмента',
      title: 'Інший рівень. Доповнює, а не конкурує.',
      subtitle:
        'Deep Work Plan — не черговий генератор заготовок. Це рівень методології під будь-яким spec-driven або генерувальним інструментом, зосереджений на багатогодинних автономних запусках.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Інструменти заготовок / специфікацій',
      rows: [
        {
          label: 'Основний фокус',
          dwp: 'Багатогодинне автономне виконання',
          others: 'Генерація специфікації чи заготовки',
        },
        {
          label: 'Одиниця роботи',
          dwp: 'Deep Work Plan (відновлювана сесія)',
          others: 'Документ специфікації або заготовка',
        },
        {
          label: 'Модель стану',
          dwp: 'Git-нативний каталог .dwp/, відновлюваний',
          others: 'Часто зовнішня або в межах IDE',
        },
        {
          label: 'Привʼязка до агента',
          dwp: 'Незалежно від агента (Markdown та Bash)',
          others: 'Часто привʼязано до інструмента чи IDE',
        },
        {
          label: 'Відновлення контексту',
          dwp: 'Відновлюється після переповнення контексту',
          others: 'Зазвичай перезапускає завдання',
        },
        {
          label: 'Ліцензія',
          dwp: 'MIT, відкрита методологія та набір',
          others: 'Залежить',
        },
      ],
    },
    origin: {
      badge: 'Походження',
      quote:
        'Створено в Dailybot — компанії, що стоїть за асинхронними стендапами для розподілених команд. Усередині ми використовували Deep Work Plan, щоб зробити продакшн-репозиторії, які охоплюють Django, Vue, TypeScript Lambda та Astro, пілотовними агентами. Після місяців використання в продакшні ми відкрили методологію під ліцензією MIT.',
      attribution: 'Інженерна команда Dailybot',
      dailybotCta: 'Дізнатися про Dailybot',
    },
    finalCta: {
      badge: 'Зробіть свій репозиторій AI-first',
      title: 'Дайте своїм агентам глибоку роботу.',
      subtitle:
        'Передайте агенту один рядок — спрямуйте його на /init.md — і він зробить ваш репозиторій AI-first: встановить скіл, поміркує про ваш стек і зафіксує повну ієрархію AGENTS.md. Далі ви створюєте й виконуєте Deep Work Plan, що працюють автономно годинами.',
      primaryCta: 'Відкрити промт /init',
      secondaryCta: 'Читати методологію',
      tertiaryCta: 'Для агентів і розробників',
      meta: 'Під ліцензією MIT · нуль телеметрії · виводить у каталог .dwp/ у gitignore.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Контакти',
    nameLabel: 'Імʼя',
    namePlaceholder: 'Ваше імʼя',
    emailLabel: 'Електронна пошта',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Повідомлення',
    messagePlaceholder: 'Напишіть своє повідомлення...',
    sendButton: 'Надіслати повідомлення',
  },

  // About page
  aboutPage: {
    title: 'Про методологію',
    subtitle: 'Відкрита методологія · Ліцензія MIT',
    description:
      'Deep Work Plan — відкрита, незалежна від фреймворку методологія для серйозної інженерної роботи з AI-агентами програмування. Звідки вона взялася та хто її супроводжує.',
    heroDescription:
      'Повторювана структура для планування, виконання та перевірки глибокої роботи з AI-агентами програмування — створена відкрито та безплатна у використанні.',
    bioTitle: 'Що це таке',
    bioText:
      'Deep Work Plan (DWP) — це методологія, а не продукт. Вона визначає, як перетворити мету на узгоджений план, розбити цей план на атомарні та незалежно перевірювані завдання й виконати кожне завдання у зосередженому циклі, що завершується перевіркою.<br /><br />Вона свідомо незалежна від того, яким AI-агентом чи стеком ви користуєтеся — адаптери переносять той самий базовий цикл на Claude, Cursor, Copilot, Codex, Gemini та інші. План, завдання та робочий журнал — це звичайний Markdown, тож робота лишається читабельною, придатною до рецензування та під контролем версій.',
    passionsTitle: 'Базові принципи',
    passions: [
      {
        title: 'Планування перед виконанням',
        description:
          'Жодного рядка коду не пишеться, доки план не узгоджено. План — це контракт між вами та агентом.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'Завдання атомарні',
        description:
          'Кожне завдання окреслене так, щоб його можна було виконати й перевірити окремо, а потім зафіксувати атомарно.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Перевіряйте все',
        description:
          'Кожне завдання завершується явною перевіркою, перш ніж почнеться наступне, а прогрес фіксується в git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Коротко',
    quickFacts: [
      'Відкрита методологія, ліцензія MIT',
      'Незалежна від фреймворку та агента',
      'Супроводжується Dailybot та спільнотою',
      'Містить специфікацію, команди, адаптери, пресети та приклади',
      'Лише Markdown — без середовища виконання, без привʼязки',
      'Перетворює будь-який репозиторій на AI-first, пілотовну агентами кодову базу',
    ],
    ctaTitle: 'Хто її супроводжує',
    ctaDescription:
      'Deep Work Plan виріс із реальної інженерної роботи в Dailybot і тепер супроводжується Dailybot разом зі спільнотою з відкритим кодом. Методологія, специфікація та набір випущені під ліцензією MIT — їх можна вільно використовувати, адаптувати та розвивати.',
    ctaCv: 'Читати методологію',
    ctaContact: 'Швидкий старт',
  },

  // Contact page
  contactPage: {
    title: 'Спільнота й контакти',
    subtitle: 'Відкритий код · Керується спільнотою',
    description:
      'Deep Work Plan створюється відкрито. Знайдіть вихідний код, відкрийте issue або долучіться до розмови через канали нижче — внески вітаються.',
    heroDescription:
      'Запитання, ідеї чи поліпшення? Deep Work Plan розробляється публічно — ось як звʼязатися з проєктом та його супровідниками.',
    formTitle: 'Надіслати повідомлення',
    nameLabel: 'Імʼя',
    namePlaceholder: 'Ваше імʼя',
    emailLabel: 'Електронна пошта',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'Я хочу звʼязатися з приводу',
    reasonOptions: [
      { value: '', label: '— Оберіть тему —' },
      { value: 'general', label: 'Загальне / Просто привітатися' },
      {
        value: 'tech-talk',
        label: 'Технічний виступ / Запрошення на доповідь',
      },
      { value: 'collaboration', label: 'Співпраця / Партнерство' },
      { value: 'project', label: 'Проєкт / Робочий запит' },
      { value: 'dailybot', label: 'Запитання про Dailybot' },
      { value: 'trading', label: 'Запитання про мій трейдинг' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Долучитися до The Library of Tomorrow',
      },
      { value: 'other', label: 'Інше' },
    ],
    subjectLabel: 'Тема',
    subjectPlaceholder: 'Про що йдеться?',
    messageLabel: 'Повідомлення',
    messagePlaceholder: 'Напишіть своє повідомлення...',
    sendButton: 'Надіслати повідомлення',
    sendingButton: 'Надсилання...',
    successTitle: 'Повідомлення надіслано',
    successMessage: 'Дякуємо, що звернулися. Ми відповімо вам якнайшвидше.',
    sendAnotherButton: 'Надіслати ще одне повідомлення',
    requiredField: 'Це поле обовʼязкове',
    invalidEmail: 'Введіть, будь ласка, дійсну адресу електронної пошти',
    fallbackMessage:
      'Контактна форма наразі недоступна. Ви можете звʼязатися з нами напряму електронною поштою.',
    fallbackEmailText: 'Напишіть нам на',
    formNote: 'Ми відповімо вам якнайшвидше.',
    socialTitle: 'Звʼязатися з нами',
    locationTitle: 'Розташування',
    locationText:
      'Базуємося в Колумбії. Відкриті до віддаленої співпраці по всьому світу.',
    prefillSubjects: {
      generalInquiry: 'Загальний запит',
      collaboration: 'Можливість співпраці',
      projectInquiry: 'Проєктний або робочий запит',
      projectCollaboration: 'Запит на проєктну співпрацю',
      startupCollaboration: 'Можливість стартап-співпраці',
      techTalkInvitation: 'Запрошення на технічний виступ',
      tradingQuestion: 'Запитання про трейдинг',
      dailybotQuestion: 'Запитання про Dailybot',
    },
  },

  contactSection: {
    title: 'Звʼяжімося',
    description:
      'Ми завжди відкриті до цікавих розмов, можливостей співпраці та нових ідей. Хочете поговорити про технології, підприємництво чи просто привітатися.',
    ctaText: 'Звʼязатися',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'uk-UA',

  // 404 page
  notFoundPage: {
    title: 'Сторінку не знайдено',
    description:
      'Сторінки, яку ви шукаєте, не існує або її переміщено. Ознайомтеся з методологією або поверніться на головну, щоб продовжити перегляд.',
    heading: 'Сторінку не знайдено',
    message:
      'Вибачте, сторінки, яку ви шукаєте, не існує або її, можливо, переміщено. Спробуйте повернутися на головну або ознайомтеся з методологією.',
    backHome: 'Повернутися на головну',
    exploreMethodology: 'Читати методологію',
    agentTitle: 'Для AI-агентів',
    agentIntro:
      'Цей шлях не існує. Посилання відновлення нижче (та їхні машиночитні еквіваленти) перелічують кожну сторінку цього сайту.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Методологія Deep Work Plan',
      description:
        'Пʼять розділів від маніфесту до архетипів: принципи, базовий цикл, шаблони, скіли й агенти та адаптації, що стоять за Deep Work Plan.',
    },
    eyebrow: 'Методологія',
    title: 'Методологія Deep Work Plan',
    intro:
      'Пʼять розділів, що ведуть вас від філософії Deep Work Plan до практичного циклу, шаблонів та адаптацій, якими ви користуєтеся щодня.',
    chapterLabel: 'Розділ',
    readChapter: 'Читати розділ',
    prev: 'Попередній',
    next: 'Наступний',
    backToIndex: 'Усі розділи',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Специфікація Deep Work Plan',
      description:
        'Читабельна специфікація методології Deep Work Plan: формат DWP, протокол агента, архетипи, стандарт документації та addon.',
    },
    eyebrow: 'Специфікація',
    title: 'Специфікація',
    intro:
      'Точна, читабельна специфікація методології — структури та протоколи, які поділяють люди й агенти.',
    tocTitle: 'На цій сторінці',
    prev: 'Попередній',
    next: 'Наступний',
    backToIndex: 'Усі документи специфікації',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Набір Deep Work Plan',
      description:
        'Скіл та його вісім суб-скілів, команди, адаптери, пресети, опціональні addon і приклади, що роблять Deep Work Plan придатним до запуску в різних агентах та стеках.',
    },
    eyebrow: 'Набір',
    title: 'Набір',
    intro:
      'Усе потрібне для запуску методології: скіл та його суб-скіли, slash-команди, адаптери для агентів, пресети онбордингу, опціональні addon та опрацьовані приклади.',
    groups: {
      command: {
        title: 'Суб-скіли та команди',
        description:
          'Маршрутизатор скілів та його суб-скіли (create, execute, refine, resume, status, verify, onboard, author), а також тонкі slash-команди, що делегують їм.',
      },
      adapter: {
        title: 'Адаптери',
        description:
          'Тонкі інтеграції для окремих агентів — Claude, Cursor, Codex та інших.',
      },
      preset: {
        title: 'Пресети онбордингу',
        description:
          'Міркування під кожен стек, якими процес onboard користується, щоб пристосувати документацію, скіли та команди валідації до вашого репозиторію.',
      },
      example: {
        title: 'Приклади',
        description: 'Опрацьовані покрокові розбори «до й після».',
      },
      addon: {
        title: 'Addon (опціональні)',
        description:
          'Опціональні можливості, які процес onboard може додати до репозиторію — ніколи не є частиною базового рівня AI-first.',
      },
    },
    viewDetail: 'Переглянути деталі',
    prev: 'Попередній',
    next: 'Наступний',
    backToIndex: 'Назад до набору',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Приклади Deep Work Plan',
      description:
        'Покрокові розбори «до й після», що показують те саме інженерне завдання з Deep Work Plan та без нього — і різницю в надійності та рецензуванні.',
    },
    eyebrow: 'Приклади',
    title: 'Приклади',
    intro:
      'Подивіться на методологію в дії — конкретні покрокові розбори «до й після» реальних інженерних завдань.',
    viewExample: 'Читати розбір',
    prev: 'Попередній',
    next: 'Наступний',
    backToGallery: 'Усі приклади',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Швидкий старт — Deep Work Plan',
      description:
        'Встановіть скіл, проведіть онбординг репозиторію, а потім плануйте та виконуйте з будь-яким агентом — кроки, що роблять ваш репозиторій spec-driven та пілотовним агентами.',
    },
    eyebrow: 'Швидкий старт',
    title: 'Почніть за лічені хвилини',
    intro:
      'Встановіть скіл, проведіть онбординг репозиторію, а потім плануйте та виконуйте з будь-яким агентом — кроки, що роблять ваш репозиторій spec-driven та пілотовним агентами.',
    sequenceTitle: 'Шлях впровадження',
    codeLabel: 'Термінал',
    orLabel: 'або',
    steps: [
      {
        title: 'Встановіть скіл Deep Work Plan',
        description:
          'Додайте скіл до свого репозиторію — маршрутизатор плюс вісім суб-скілів (create, execute, refine, resume, status, verify, onboard, author). Скористайтеся Skills CLI для найшвидшого шляху або клонуйте репозиторій і запустіть налаштування там, де доступні git та оболонка.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Проведіть онбординг репозиторію',
        description:
          'Запустіть суб-скіл onboard і дайте агенту поміркувати про ваш реальний репозиторій. Він генерує AGENTS.md, базу знань docs/, документацію кожного модуля та міжагентну домівку .agents/ (із символьними посиланнями .claude → .agents та .cursor → .agents), підключає тонкі команди dwp-* і створює .dwp/ у gitignore.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Розвивайте набір та приймайте addon',
        description:
          "Використовуйте /skill-create та /agent-create (суб-скіл author), щоб розвивати скіли, агенти та команди, доречні для вашого стеку. Онбординг також пропонує п'ять опціональних addon — devcontainer, Dailybot, dependency-upgrade, design-system та AI Diff Reviewer — які ви приймаєте лише тоді, коли вони доречні.",
      },
      {
        title: 'Плануйте та виконуйте',
        description:
          'Згенеруйте Deep Work Plan і виконуйте його завдання за завданням, перевіряючи кожен gate та відновлюючи роботу між сесіями — пілотуючи репозиторій за його власною специфікацією.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'Результат',
    outcome:
      'Ваш репозиторій стає spec-driven та пілотовним агентами: план є стійким джерелом істини, а сам репозиторій стає harness, проти якого працює будь-який агент.',
    nextStepsTitle: 'Наступні кроки',
    nextSteps: [
      { label: 'Читати методологію', href: '/methodology' },
      { label: 'Переглянути набір', href: '/kit' },
      { label: 'Подивитися приклади', href: '/examples' },
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
          'Solo developers and small teams who want context engineering and verification without heavy ceremony.',
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
      title: 'Довіра та безпека',
      description:
        'Чому Deep Work Plan безпечно впроваджувати: відкритий код та MIT, Markdown-first без мережевих викликів і телеметрії, неруйнівний за проєктом, із перевірюваними встановленнями та чіткою політикою розкриття вразливостей.',
    },
    eyebrow: 'Довіра та безпека',
    title: 'Довіра та безпека',
    intro:
      'Ніхто не повинен встановлювати скіл, якому не може довіряти. Deep Work Plan побудований для перевірки, а не для сліпої довіри: відкритий код, Markdown-first, неруйнівний і перевірний до запуску. Ця сторінка прямо пояснює, що він робить, чого не робить і як підтвердити і те, і інше.',
    pillarsTitle: 'Чому ви довіряєте',
    pillars: [
      {
        title: 'Відкритий код та ліцензія MIT',
        body: 'Вебсайт і скіл є публічними та доступними для diff. Ви можете прочитати кожен рядок перед запуском і порівняти будь-яку копію з джерелом на позначеному релізі.',
      },
      {
        title: 'Markdown-first — без мережі, без телеметрії',
        body: 'Скіл не має CLI, HTTP API та потоку автентифікації. Він не здійснює жодних мережевих викликів і не надсилає телеметрію; його єдиний локальний помічник зчитує метадані git та середовища. Жодна інформація про ваш репозиторій не залишає вашу машину.',
      },
      {
        title: 'Неруйнівний за проєктом',
        body: 'Єдина дія скілу, що стосується безпеки, — це зміна вашого репозиторію, і він узгоджує, а не перезаписує. Він виявляє, що існує, пропонує план і запитує перед заміною будь-чого. Результати плану зберігаються в каталозі .dwp/ у gitignore.',
      },
      {
        title: 'Не торкається секретів',
        body: 'Методологія ніколи не фіксує секрети та тримає робочий стан поза системою контролю версій. Онбординг дописує до .gitignore, а не перезаписує його, і кожна зміна призначена для перегляду в невеликих, читабельних diff.',
      },
      {
        title: 'Перевірювана провенієнція',
        body: 'Кожен реліз публікує контрольні суми для скілу, що постачається, тож ви можете підтвердити, що завантажена копія відповідає опублікованій, перш ніж їй довіряти.',
      },
    ],
    verifyTitle: 'Перевірте перед запуском',
    verifyIntro:
      'Ставтеся до скілу як до ненадійного, доки не перевірили його. Кожен реліз додає файл SHA256SUMS, що охоплює скіл. Завантажте його для версії, яку плануєте встановити, а потім перевірте відповідність своєї копії — ненульовий вихідний код означає, що файл не збігається, і слід зупинитися.',
    codeLabel: 'shell',
    verifyNote:
      'Релізи перевіряються контрольними сумами, а не підписуються — підписання (cosign або maintainer GPG) є задокументованим наступним кроком, а не поточною вимогою. Оскільки все відкрито, ви також можете порівняти будь-який файл із репозиторієм на його тезі.',
    disclosureTitle: 'Повідомте про вразливість',
    disclosureBody:
      'Знайшли проблему з безпекою? Повідомте про неї приватно через приватне звітування про вразливості GitHub у відповідному репозиторії — скіл або вебсайт (дивіться посилання на політики безпеки нижче) — замість того щоб відкривати публічне питання, яке б розкрило проблему до появи виправлення.',
    resourcesTitle: 'Ресурси довіри',
    linkManifest: 'Маніфест довіри, зрозумілий для машин',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Політика безпеки вебсайту',
    linkSkillPolicy: 'Політика безпеки скілу та модель загроз',
    limitationsTitle: 'Чесні обмеження',
    limitations: [
      'Релізи перевіряються контрольними сумами, але ще не підписані криптографічно — підписання заплановано, але не виконано.',
      'Deep Work Plan запускає автономного агента програмування у вашому репозиторії. Перевіряйте запропонований план і diff; методологія призначена для такого перегляду, а не для його заміни.',
      'Твердження про довіру тут описують лише офіційні джерела. Змінена або стороння копія, що відхилилася від репозиторіїв, не несе жодної з цих гарантій — спочатку перевірте її.',
    ],
    ctaTitle: 'Впроваджуйте з упевненістю',
    ctaBody:
      'Прочитайте методологію та специфікацію, спрямуйте агента на init endpoint і перевірте встановлення перед запуском.',
    ctaPrimary: 'Читати методологію',
    ctaSecondary: 'Впровадження (init)',
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Зробіть свій репозиторій AI-first',
      description:
        'Впровадьте методологію Deep Work Plan у будь-якому репозиторії. Встановіть скіл, запустіть онбординг агента, а потім плануйте та виконуйте з будь-яким AI-агентом програмування.',
    },
    eyebrow: 'Впровадження',
    title: 'Зробіть цей репозиторій AI-first',
    intro:
      'Один ендпоінт, щоб перетворити будь-який репозиторій на spec-driven, готову до агентів кодову базу. Встановіть скіл, дайте агенту провести онбординг репозиторію, а потім плануйте та виконуйте структуровану роботу з будь-яким агентом програмування.',
    handoffTitle: 'Скопіювати до агента',
    handoffBody:
      'Скопіюйте повний промт init.md і вставте його у свій AI-агент програмування — Claude Code, Cursor, Codex або будь-який інший. Він прочитає методологію та специфікацію, встановить скіл і проведе онбординг цього репозиторію для Deep Work Plan.',
    handoffInstruction:
      'Прочитай і виконай інструкції за адресою https://deepworkplan.com/init.md, щоб зробити цей репозиторій AI-first.',
    handoffMdLabel: 'Самодостатній промт для агента',
    codeLabel: 'agent',
    whatTitle: 'Що це робить',
    whatBody: [
      'Впровадження змінює репозиторій двома стійкими способами — це стовпи методології.',
      'По-перше, репозиторій стає spec-driven: робота починається з написаного плану та специфікації, а не з спонтанних промтів. По-друге, сам репозиторій стає harness агента — AGENTS.md, база знань docs/, документація кожного модуля та домівка скілів .agents/ (із символьними посиланнями .claude → .agents та .cursor → .agents) дають кожному агенту потрібні контекст і команди.',
    ],
    sequenceTitle: 'Послідовність впровадження',
    orLabel: 'або',
    steps: [
      {
        title: 'Перевірте перед встановленням',
        description:
          'Ставтеся до промту та скілу як до ненадійних, доки не перевірите їх. Обидва є відкритими під ліцензією MIT; скіл є Markdown-first без мережевих викликів і телеметрії. Кожен реліз публікує SHA256SUMS для скілу, що постачається, тож ви можете підтвердити відповідність своєї копії перед запуском. Релізи контрольно-суміовані, але не підписані (підписання — задокументований наступний крок).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Встановіть скіл',
        description:
          'Додайте скіл Deep Work Plan, щоб будь-який агент міг планувати та виконувати структуровану роботу. Скіл постачає маршрутизатор плюс вісім суб-скілів — create, execute, refine, resume, status, verify, onboard та author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Запустіть онбординг репозиторію',
        description:
          'Викличте суб-скіл onboard і дайте агенту поміркувати про реальний репозиторій — його стек, менеджер пакетів та реальні команди валідації. Потім він генерує AGENTS.md, базу знань docs/, документацію кожного модуля та міжагентну домівку .agents/ (із символьними посиланнями .claude → .agents та .cursor → .agents), підключає тонкі команди dwp-* і створює .dwp/ у gitignore для планів та чернеток. Для великих репозиторіїв суб-скіл onboard використовує план-орієнтований шлях: спочатку проводить розвідку, а потім генерує онбординговий Deep Work Plan. Нічого не шаблонізується; усе пристосовано до вашого репозиторію.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Прийміть опціональні addon',
        description:
          "Онбординг пропонує п'ять опціональних addon — devcontainer, Dailybot, dependency-upgrade, design-system та AI Diff Reviewer — які ви приймаєте лише тоді, коли вони доречні. Репозиторій повністю відповідає вимогам і з нульовою кількістю addon. Використовуйте /skill-create та /agent-create (суб-скіл author), щоб розвивати скіли, агенти та команди понад базовий набір.",
      },
      {
        title: 'Плануйте та виконуйте',
        description:
          "Генеруйте Deep Work Plan за допомогою /dwp-create і виконуйте їх через /dwp-execute, а потім /dwp-status, /dwp-refine, /dwp-resume та /dwp-verify у міру роботи. Кожен план несе пронумеровані завдання, валідаційні gate та протокол завершення — що закінчується трьома обов'язковими фінальними завданнями: оглядом безпеки, виявленням скілів та агентів і виконавчим звітом.",
      },
      {
        title: 'Перевірте відповідність',
        description:
          "Запустіть /dwp-verify для об'єктивного звіту «пройдено/не пройдено» відносно специфікації. Переконайтеся, що AGENTS.md, docs/ (із реальним вмістом, а не заглушками), .agents/ (із тонкими делегаторами dwp-* і каталогом, що відповідає диску), .dwp/ та tmp/ на місці — нічого шаблонного, усе обґрунтовано для цього репозиторію.",
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'Результат',
    outcome:
      'Репозиторій стає spec-driven, а сам репозиторій стає harness агента — контекст і команди подорожують разом із кодом.',
    nextStepsTitle: 'Читати далі',
    nextSteps: [
      { label: 'Швидкий старт', href: '/quickstart' },
      { label: 'Методологія', href: '/methodology' },
      { label: 'Специфікація', href: '/spec' },
      { label: 'Набір', href: '/kit' },
    ],
  },

  developersPage: {
    meta: {
      title:
        'Розробникам — агентне API Deep Work Plan, MCP-сервер і документація',
      description:
        'Агентна поверхня Deep Work Plan: API лише для читання без авторизації (OpenAPI), MCP-сервер на /api/mcp, Markdown для кожної сторінки 17 мовами та npx skills.',
    },
    eyebrow: 'Поверхня для агентів і розробників',
    title: 'Deep Work Plan для розробників і AI-агентів',
    intro:
      'deepworkplan.com постачає поряд зі своїми сторінками машиночитну поверхню: агентне API, описане через OpenAPI, безстановий MCP-сервер, нативні Markdown-дзеркала кожної сторінки 17 мовами та встановлювану навичку DWP. Усе на цій сторінці працює наживо, відкрите й безкоштовне — реєструватися ні для чого не треба.',
    accessTitle: 'Свідомо без авторизації',
    accessIntro:
      'Тут немає API-ключів для генерації, жодних OAuth-танців і жодної пісочниці, відокремленої від продакшену, — сама продакшен-поверхня і є пісочницею. Це свідома властивість методології: агенти не вміють заповнювати форми «зв’яжіться з відділом продажів», тож сайт ніколи про це не просить.',
    accessPoints: [
      {
        title: 'Лише читання',
        body: 'Кожна операція — безпечний GET, що кешується, — крім кінцевої точки MCP, яка використовує POST. Ніде немає операцій запису, завантажень чи змін стану.',
      },
      {
        title: 'Без API-ключів',
        body: 'Без реєстрації, без токенів, без рівнів лімітів запитів. Анонімний доступ — це документований контракт, заявлений у /auth.md і заглушках виявлення OAuth.',
      },
      {
        title: 'Безкоштовно і з відкритим кодом',
        body: 'Вміст сайту та навичка DWP ліцензовані під MIT. Використовуйте їх у комерційній і некомерційній роботі, не питаючи дозволу.',
      },
      {
        title: 'Спершу машини',
        body: 'Структуровані JSON-помилки на шляхах /api, Markdown-тіла відновлення 404, каталог API RFC 9727 і маніфест можливостей ARD — усе для споживання агентами.',
      },
    ],
    endpointsTitle: 'Кінцеві точки',
    endpointsIntro:
      'Основні кінцеві точки агентного API. Повна типізована специфікація — кожна операція, параметр і схема відповіді — живе в документі OpenAPI.',
    endpointsNote:
      'Невідомі шляхи /api/* повертають структуровану JSON-помилку з підказкою вирішення, а не HTML-сторінку помилки.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Специфікація OpenAPI 3.1 усього агентного API.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Упорядкований індекс настанов для LLM — рекомендована точка входу для агентів.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'Канонічний промт прийняття DWP (робить будь-який репозиторій AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Будь-яка сторінка як нативний вихідний Markdown — усіма 17 мовами (напр. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Статичний маркер стану з посиланнями на специфікацію та цей портал.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP-сервер (Streamable HTTP, безстановий): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Маніфест можливостей ARD — агентмапа, заявлена в robots.txt.',
      },
    ],
    mcpTitle: 'MCP-сервер',
    mcpIntro:
      'Безстановий сервер Model Context Protocol через Streamable HTTP. Три інструменти лише для читання: get_init_prompt, list_site_sections і read_page. Підтримуються версії протоколу 2025-03-26 і 2025-06-18; сесія не потрібна.',
    mcpCodeLabel: 'Термінал — JSON-RPC через HTTP',
    mcpNote:
      'Маніфест MCP лежить у /.well-known/mcp.json, а картка сервера — у /.well-known/mcp/server-card.json. Claude, ChatGPT і будь-який MCP-клієнт можуть викликати ці інструменти нативно.',
    markdownTitle: 'Markdown для агентів',
    markdownIntro:
      'Кожна відрендерена сторінка публікується як нативний вихідний Markdown — не конвертація з HTML. Запитуйте Markdown явно через суфікс URL або через узгодження вмісту HTTP на будь-якій сторінці.',
    markdownCodeLabel: 'Термінал — узгодження вмісту',
    markdownNote:
      'Узгодження вмісту повертає той самий вихідний Markdown, з якого рендериться сайт, мовою запитаного URL.',
    cliTitle: 'Встановити набір',
    cliIntro:
      'Офіційний шлях встановлення навички Deep Work Plan — та сама команда, яку кінцева точка /init дає агентам. Працює з будь-яким сумісним зі skills агентом для коду (Claude Code, Cursor, Codex, Gemini та інші).',
    cliCodeLabel: 'Термінал — CLI skills',
    cliNote:
      'Навичка вбудовується (vendoring) у .agents/skills/deepworkplan/ всередині вашого репозиторію, тож кожен агент, що торкається репозиторію, ділить ту саму методологію.',
    resourcesTitle: 'Машиночитні ресурси',
    resources: [
      { label: 'Специфікація OpenAPI (/openapi.json)', href: '/openapi.json' },
      {
        label: 'Декларація доступу й авторизації агентів (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Каталог API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Маніфест MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Контакт безпеки (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Дескриптор репозиторію сайту (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Скеровуйте на це агента',
    ctaBody:
      'Найшвидший шлях і досі один рядок: дайте будь-якому агенту для коду промт /init — і він установить навичку, онбордить ваш репозиторій і почне завершувати глибоку роботу.',
    ctaPrimary: 'Відкрити промт /init',
    ctaSecondary: 'Читати методологію',
  },

  privacyPage: {
    meta: {
      title: 'Приватність — Deep Work Plan',
      description:
        'Політика приватності deepworkplan.com: статичний сайт без облікових записів і реклами, аналітика без файлів cookie і точно те, що збирає контактна форма.',
    },
    eyebrow: 'Політика приватності',
    title: 'Приватність на deepworkplan.com',
    intro:
      'Deep Work Plan — це статичний сайт документації та методології. Ця сторінка просто і повністю пояснює, яких даних торкається сайт під час вашого візиту: у ньому немає системи облікових записів, реклами та жодного міжсайтового стеження.',
    lastUpdated: '8 вересня 2026 р.',
    sections: [
      {
        heading: 'Що це за сайт',
        body: 'deepworkplan.com — це набір статичних сторінок, що подаються через CDN. Немає входу, бази користувачів і способу зберігати особисті профілі. Вміст розробляється у публічних репозиторіях GitHub в організації DailybotHQ, і все, що ви тут читаєте, подається точно так, як було зібрано.',
      },
      {
        heading: 'Аналітика',
        body: 'Сайт використовує Umami — сервіс аналітики без cookies, орієнтований на приватність, — щоб сукупно рахувати перегляди сторінок. Umami не ставить стежувальних cookies і не будує міжсайтових профілів. Оскільки AI-краулери не виконують JavaScript, серверна edge-функція також записує user agent і шлях візитів автоматичних ботів як анонімні аналітичні події — це ідентифікує програму-краулер (наприклад, «GPTBot відвідав /init»), а не людину-відвідувача.',
      },
      {
        heading: 'Cookies і локальне сховище',
        body: 'Сайт не ставить стежувальних cookies. Єдине, що зберігається у вашому браузері, — це перевага теми (світла чи темна) у localStorage, яка ніколи не залишає ваш пристрій і нікуди не передається. Якщо очистити сховище браузера, сайт просто повернеться до системної теми за замовчуванням.',
      },
      {
        heading: 'Сторонні сервіси',
        body: 'Хостинг і доставку забезпечує Cloudflare Pages, який обробляє журнали запитів та IP-адреси на edge як частину роботи CDN і блокування зловживань — згідно з власною політикою приватності Cloudflare. Сукупна аналітика працює на Umami (cloud.umami.is). Якщо ви добровільно надішлете контактну форму, ваші відповіді через Google Forms потраплять до нашої команди — це єдине місце, де збирається введена вами інформація, і вона використовується виключно для відповіді вам.',
      },
      {
        heading: 'Чого ми не робимо',
        body: 'Ми не продаємо й не передаємо персональні дані, не запускаємо рекламу чи пікселі ремаркетингу, не створюємо відбитків браузерів і не надсилаємо маркетингових листів. На сайті немає підписки на розсилку й телеметрії понад описані вище сукупні підрахунки без cookies.',
      },
      {
        heading: 'Ваші вибори',
        body: 'Оскільки аналітика тут сукупна й без cookies, немає особистого профілю для експорту чи видалення. Ви можете заблокувати аналітичний скрипт будь-яким блокувальником вмісту, не зашкодивши роботі сайту. Якщо ви надсилали контактну форму і хочете видалити своє повідомлення, напишіть на контактну адресу нижче — і ми його видалимо.',
      },
      {
        heading: 'Зміни цієї політики',
        body: 'Якщо ця політика суттєво зміниться, зміниться й дата зверху цієї сторінки, а змістовні правки фіксуються у публічному репозиторії сайту, де кожен може переглянути історію.',
      },
    ],
    contactTitle: 'Контакт і безпека',
    contactBody:
      'З питань приватності пишіть на security@dailybot.com. Щоб повідомити про вразливість, віддайте перевагу приватному звіту про вразливості GitHub для репозиторіїв сайту та навички — точні адреси див. у /.well-known/security.txt.',
  },
};
