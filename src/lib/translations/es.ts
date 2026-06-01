/**
 * Spanish translations
 */

import type { SiteTranslations } from './types';

export const es: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — ejecución estructurada para agentes de IA',
  siteDescription:
    'Deep Work Plan: una metodología abierta y kit de referencia para ejecución estructurada, validada y reanudable de agentes de IA durante varias horas.',

  // Navigation
  nav: {
    home: 'Inicio',
    blog: 'Blog',
    about: 'Acerca de',
    contact: 'Contacto',
    // Deep Work Plan IA
    methodology: 'Metodología',
    spec: 'Especificación',
    kit: 'Kit',
    examples: 'Ejemplos',
    init: 'Init',
    github: 'GitHub',
    menu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Todos los derechos reservados.',
  },

  // Página de inicio de Deep Work Plan
  home: {
    meta: {
      title:
        'Deep Work Plan — convierte cualquier repositorio en un código AI-first',
      description:
        'Deep Work Plan convierte cualquier repositorio en un código AI-first, pilotable por agentes. Una metodología abierta con licencia MIT y un kit de referencia para una ejecución estructurada, validada y reanudable.',
    },
    hero: {
      badge: 'Metodología abierta · MIT · Independiente del agente',
      title: 'Haz que cualquier repositorio sea AI-first.',
      titleEmphasis: 'Dale a tu agente una sola instrucción.',
      instructionLabel: 'Dale esto a tu agente',
      instruction:
        'Lee y sigue las instrucciones en https://deepworkplan.com/init.md para hacer este repositorio AI-first.',
      instructionCaption:
        'Tu agente lee el plan, instala el kit e incorpora tu repositorio, razonando sobre tu stack real, sin pegar una plantilla.',
      copyLabel: 'Copiar',
      copiedLabel: 'Copiado',
      viewInitCta: 'Ver el prompt completo de /init',
      pullQuote:
        'Deep Work Plan es desarrollo guiado por especificación donde el propio repositorio se convierte en el harness.',
      primaryCta: 'Leer la metodología',
      secondaryCta: 'Leer la especificación',
    },
    pitch: {
      kicker: 'El problema y la respuesta',
      problem:
        'Los agentes de programación de IA son muy eficaces en ráfagas cortas. En trabajo de largo alcance — una migración, un subsistema nuevo, una refactorización en decenas de archivos — se desvían: el contexto se llena, las decisiones se olvidan y las tareas de varias horas se abandonan a medio camino.',
      answer:
        'Deep Work Plan responde con desarrollo guiado por especificación: el plan es la fuente de verdad duradera y los agentes ejecutan contra criterios de aceptación y puertas de validación explícitos. La desviación baja, el trabajo se mantiene verificable y cualquier agente puede reanudarlo entre sesiones.',
      origin:
        'También es ingeniería de harness hecha portable. Un harness de agente es el andamiaje alrededor de un modelo — contexto, herramientas, bucle de control, barreras, estado reanudable — que lo hace fiable. Deep Work Plan instala ese harness en el propio repositorio (AGENTS.md, docs, el hogar de skills .agents/, el skill de DWP), para que cualquier agente pueda pilotar cualquier repo. Nació en Dailybot, se probó durante meses y se publicó como la DailybotHQ/deepworkplan-skill.',
    },
    onboarding: {
      badge: 'Incorporación basada en razonamiento',
      title: 'Apúntalo a cualquier repositorio. Razona, no copia y pega.',
      subtitle:
        'El flujo de incorporación inspecciona los lenguajes, frameworks, gestor de paquetes y comandos de validación reales de tu repositorio, y luego genera artefactos adaptados a ese repositorio. Un esbozo genérico se trata como un fallo.',
      steps: [
        {
          title: 'Razona sobre tu stack y arquetipo',
          description:
            'Lee los manifiestos, la estructura de carpetas y la CI para inferir los comandos reales de prueba, lint y compilación, y luego clasifica el repositorio como repo individual o como hub orquestador.',
        },
        {
          title: 'Genera AGENTS.md, docs/ y documentación por módulo',
          description:
            'Un AGENTS.md razonado, una jerarquía docs/ categorizada y un README más docs/ dentro de cada módulo principal, completados con los comandos reales de tu repositorio, no con marcadores de posición.',
        },
        {
          title: 'Crea .agents/ con el enlace simbólico .claude a .agents',
          description:
            'Un directorio .agents/ multiagente (skills, agentes, comandos) y el enlace simbólico .claude a .agents, reflejando CLAUDE.md a AGENTS.md, para que cada herramienta lea una única fuente de verdad.',
        },
        {
          title: 'Instala el skill de DWP y crea .dwp/',
          description:
            'Conecta el skill de Deep Work Plan y crea la carpeta .dwp/ ignorada por git para planes y borradores, y luego, de forma opcional, añade complementos como soporte de devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'Qué ocurre cuando lo ejecutas',
      title: 'Una sola instrucción. El repositorio hace el resto.',
      subtitle:
        'No eliges un método de instalación ni copias una plantilla. Le das a tu agente una sola línea y él sigue el plan de /init de principio a fin.',
      steps: [
        {
          title: 'Tu agente abre /init',
          description:
            'Obtiene el prompt de incorporación en deepworkplan.com/init y lee la metodología, la especificación y el kit que enlaza: el estándar que está a punto de adoptar.',
        },
        {
          title: 'Instala el skill de Deep Work Plan',
          description:
            'Un comando trae el router y sus sub-skills — create, execute, refine, resume, status, onboard y author — disponibles para Claude Code, Cursor, Codex, Gemini y Copilot.',
        },
        {
          title: 'Incorpora tu repositorio',
          description:
            'Razonando sobre tu stack real, escribe AGENTS.md, un árbol docs/ categorizado, READMEs por módulo, el kit multiagente .agents/ y un .dwp/ ignorado por git: tu repositorio se convierte en el harness. Sin plantillas, sin marcadores de posición.',
        },
        {
          title: 'Planificas y ejecutas',
          description:
            'Genera Deep Work Plans de largo alcance para cualquier tarea y ejecútalos paso a paso, con criterios de aceptación explícitos, puertas de validación y estado reanudable.',
        },
      ],
      installTitle: '¿Prefieres instalar el skill tú mismo?',
      installNote:
        'La instrucción de arriba lo hace por ti. Si prefieres instalar el skill directamente, cualquiera de estas opciones funciona; luego pídele a tu agente que haga el repositorio AI-first.',
      codeLabel: 'pega esto en tu terminal',
      installOptions: [
        {
          tag: 'Skills CLI',
          title: 'Paquete multiagente',
          command: 'npx skills add DailybotHQ/deepworkplan-skill',
          note: 'Se instala una vez para Claude Code, Cursor, Codex, Gemini y Copilot.',
        },
        {
          tag: 'OpenClaw',
          title: 'Registro nativo',
          command: 'openclaw skills install deepworkplan',
          note: 'Se carga de forma nativa en cada sesión elegible, sin configurar disparadores.',
        },
        {
          tag: 'Clonar git',
          title: 'Sin gestor de paquetes',
          command:
            'git clone https://github.com/DailybotHQ/deepworkplan-skill.git\ncd deepworkplan-skill\n./setup.sh',
          note: 'El skill es solo Markdown y Bash; setup lo enlaza al directorio de skills de tu agente.',
        },
      ],
    },
    outcomes: {
      badge: 'Lo que obtienes',
      title: 'Todo lo que tu agente necesita para trabajar de forma autónoma.',
      subtitle:
        'Una sola ejecución, confirmada de forma atómica. Cada resultado es Markdown y cada cambio es auditable.',
      items: [
        {
          label: 'AGENTS.md en la raíz del repositorio',
          detail:
            'Razonado a partir del stack, los comandos y la estructura reales de tu repositorio, no una plantilla con marcadores de posición. CLAUDE.md se enlaza simbólicamente a AGENTS.md.',
        },
        {
          label: 'docs/ categorizado y documentación por módulo',
          detail:
            'Arquitectura, configuración, estándares y resolución de problemas, además de un README y docs/ dentro de cada módulo principal, generados a partir de tu base de código.',
        },
        {
          label: '.agents/ con el enlace simbólico .claude a .agents',
          detail:
            'Un directorio .agents/ multiagente (skills, agentes, comandos) con el enlace simbólico .claude a .agents para que cada herramienta lea una única fuente de verdad.',
        },
        {
          label: 'El skill de Deep Work Plan, instalado',
          detail:
            'crear, ejecutar, refinar, reanudar, estado e incorporar, disponibles para tu agente como un único paquete de skills, sin copia por repositorio.',
        },
        {
          label: 'Dos arquetipos, gestionados',
          detail:
            'La incorporación clasifica tu repositorio como repo individual (el caso común) o como hub orquestador que coordina planes hijos entre repositorios.',
        },
        {
          label: 'Un kit vivo que tu repositorio crea',
          detail:
            'La subhabilidad author (skill-create, agent-create) permite al repositorio crear sus propias habilidades, agentes y comandos; los complementos de mantenimiento opcionales como dependency-upgrade ayudan a mantenerlo actualizado.',
        },
        {
          label: 'Nativo de git, reanudable, .dwp/',
          detail:
            'Sin demonios ni estado externo. Los planes y borradores quedan en una carpeta .dwp/ ignorada por git, y cualquier tarea se reanuda solo desde git, incluso tras un desbordamiento de contexto.',
        },
      ],
    },
    agents: {
      badge: 'Agentes',
      title: 'Funciona con el agente que ya usas.',
      subtitle:
        'Una sola metodología, muchos adaptadores. Markdown no acopla el framework a nada: cada agente que lee Markdown puede ejecutar un Deep Work Plan.',
      fullLabel: 'Completo',
      partialLabel: 'Parcial',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implementación de referencia, con WebFetch nativo y comandos de barra.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Adaptador completo. Usa el paquete sin conexión si WebFetch está restringido.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Se recomienda el paquete sin conexión; las reglas se instalan en .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'partial',
          note: 'Solo documentación y AGENTS.md. Comandos de barra mediante extensiones.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Requiere Gemini 2.5 Pro o superior, con WebFetch nativo.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Adaptador completo con una superficie de comandos nativa.',
        },
      ],
    },
    stacks: {
      badge: 'Stacks',
      title: 'Ajustes de razonamiento para los stacks que importan.',
      subtitle:
        'Son ayudas de razonamiento, no plantillas. La incorporación lee los manifiestos reales de tu repositorio y se adapta a cada stack: nunca copia un ajuste a ciegas. Los monorepos obtienen documentación por módulo.',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Módulos · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Genérico', sub: 'Cualquier stack' },
      ],
    },
    archetypes: {
      badge: 'Dos arquetipos',
      title: 'Repositorio individual u hub orquestador.',
      subtitle:
        'La incorporación se bifurca según el arquetipo. La mayoría de los repositorios son individuales. Un hub coordina Deep Work Plans hijos entre muchos repositorios. La metodología gestiona ambos como ciudadanos de primera clase.',
      individual: {
        tag: 'Caso común',
        title: 'Repositorio individual',
        description:
          'Una sola base de código con un stack principal, sus propios comandos de validación y documentación por módulo. Es el valor por defecto: la incorporación lo asume salvo que el repositorio sea claramente un hub.',
        example:
          'Por ejemplo, una API de Django, una app de Vue o un servicio Lambda de TypeScript.',
      },
      orchestrator: {
        tag: 'Coordinación',
        title: 'Hub orquestador',
        description:
          'Un repositorio de coordinación que orquesta el trabajo entre subrepositorios mediante un manifiesto orquestador, generando planes hijos que se confirman en su propio repositorio, además de reglas de frontera y un índice de navegación.',
        example:
          'Por ejemplo, un hub que coordina cinco repositorios de producto.',
      },
    },
    comparison: {
      badge: 'Metodología frente a herramienta',
      title: 'Una capa distinta. Complementaria, no competidora.',
      subtitle:
        'Deep Work Plan no es otro generador de andamiaje. Es la capa de metodología que está debajo de cualquier herramienta de andamiaje o basada en especificaciones, centrada en ejecuciones autónomas de varias horas.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Herramientas de andamiaje/especificación',
      rows: [
        {
          label: 'Enfoque principal',
          dwp: 'Ejecución autónoma de varias horas',
          others: 'Generación de especificaciones o andamiaje',
        },
        {
          label: 'Unidad de trabajo',
          dwp: 'Un Deep Work Plan (sesión reanudable)',
          others: 'Un documento de especificación o un andamiaje',
        },
        {
          label: 'Modelo de estado',
          dwp: 'Carpeta .dwp/ nativa de git, reanudable',
          others: 'A menudo externo o dentro del IDE',
        },
        {
          label: 'Acoplamiento al agente',
          dwp: 'Independiente del agente (Markdown y Bash)',
          others: 'A menudo específico de una herramienta o IDE',
        },
        {
          label: 'Recuperación de contexto',
          dwp: 'Se reanuda tras un desbordamiento de contexto',
          others: 'Normalmente reinicia la tarea',
        },
        {
          label: 'Licencia',
          dwp: 'MIT, metodología y kit abiertos',
          others: 'Variable',
        },
      ],
    },
    origin: {
      badge: 'Origen',
      quote:
        'Creado por Dailybot, la empresa detrás de los standups asincrónicos para equipos distribuidos. Internamente usamos Deep Work Plans para hacer pilotables por agentes repositorios de producción que abarcan Django, Vue, Lambda de TypeScript y Astro. Tras meses de uso en producción, liberamos la metodología bajo licencia MIT.',
      attribution: 'El equipo de ingeniería de Dailybot',
    },
    finalCta: {
      title: 'Dale deep work a tus agentes.',
      subtitle:
        'Lee la metodología, luego instala el skill y pídele a tu agente que haga el repositorio AI-first. Razona sobre tu stack y confirma una jerarquía completa de AGENTS.md, y desde ahí ejecutas Deep Work Plans.',
      primaryCta: 'Leer la metodología',
      secondaryCta: 'Leer la especificación',
      meta: 'Con licencia MIT · sin telemetría · los resultados van a una carpeta .dwp/ ignorada por git.',
    },
  },

  // Homepage hero
  hero: {
    tagline: 'CTO en Dailybot (YC S21) · Creador de productos digitales',
    description:
      'Construyo tecnología que empodera equipos. CTO y Cofundador en <a href="https://dailybot.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-300 transition-colors underline">Dailybot (YC S21)</a>, una plataforma de colaboración donde equipos humanos y agentes de IA trabajan juntos. Más de 10 años creando productos digitales, desde plataformas potenciadas por IA hasta herramientas open source.',
    typewriterWords: [
      'CTO en Dailybot (YC S21)',
      'Creador de productos digitales',
      'Fundador de comunidades',
      'Explorador de IA & tech',
      'Contribuidor open source',
    ],
  },

  // Homepage sections
  homeSections: {
    about: {
      title: "Hola, soy <span class='text-secondary'>Sergio</span>",
      description: `Hoy lidero ingenier\u00EDa en Dailybot (YC S21), una plataforma de colaboraci\u00F3n moderna que permite que equipos humanos y agentes de IA trabajen juntos sin fricciones. Me enfoco en estrategia de producto, flujos potenciados por IA y sistemas confiables que ayudan a los equipos h\u00EDbridos a avanzar m\u00E1s r\u00E1pido.<br /><br />
Mis fortalezas están en convertir ideas complejas en productos simples, escalar equipos de ingeniería y ejecutar end-to-end: arquitectura, implementación e iteración basada en feedback real de usuarios.<br /><br />
Actualmente estoy enfocado en aplicaciones de IA, productividad para developers y productos de alto impacto que combinan velocidad, calidad y resultados de negocio medibles.`,
      cta: 'Conoce m\u00E1s sobre m\u00ED',
      cta2: 'Ver mi CV',
    },
    dailybot: {
      title: 'Dailybot (YC S21)',
      subtitle: 'CTO & Cofundador',
      description:
        'He liderado el desarrollo de una plataforma de colaboraci\u00F3n moderna que permite que equipos humanos y agentes de IA trabajen juntos sin fricciones. Ofrece transparencia y visibilidad unificadas sobre el trabajo en equipos h\u00EDbridos y flujos inteligentes — desde standups as\u00EDncronos y reconocimiento entre pares hasta agentes de IA reportando progreso — todo dentro de Slack, Microsoft Teams y Google Chat. En 2021 fuimos seleccionados por Y Combinator, lo que aceler\u00F3 nuestro crecimiento y reforz\u00F3 nuestro enfoque en la satisfacci\u00F3n del cliente. \u{1F680}',
      cta: 'Conoce m\u00E1s sobre Dailybot',
    },
    techTalks: {
      title: 'Tech Talks',
      subtitle: 'Cofundador & Speaker',
      description:
        'Como cofundador y organizador de la comunidad Pereira Tech Talks, he impulsado la creaci\u00F3n de espacios para compartir conocimiento y conectar a profesionales de tecnolog\u00EDa. He tenido la oportunidad de ser speaker en m\u00FAltiples charlas t\u00E9cnicas, donde disfruto compartir experiencias y aprender junto a la comunidad.',
      cta: 'Conoce m\u00E1s sobre mis charlas',
    },
    makerHome: {
      title: 'Lo que he construido',
      subtitle: 'Emprendedor, maker y entusiasta de la tecnolog\u00EDa',
      description:
        'M\u00E1s all\u00E1 de Dailybot, soy emprendedor y maker apasionado por la tecnolog\u00EDa. Construyo proyectos paralelos, exploro IA y contribuyo al open source \u2014 desde Moltbot (IA en Raspberry Pi) hasta Syntro (soporte con IA) y SysPrompt (gesti\u00F3n de prompts para LLMs). Con 113+ repositorios en GitHub, creo que la mejor forma de aprender es construir algo real.',
      cta: 'Ver portafolio',
    },
    portfolio: {
      title: 'Portafolio',
      subtitle: 'Proyectos & Open Source',
      description:
        'Una l\u00EDnea de tiempo curada de mis proyectos personales \u2014 desde software y aplicaciones web hasta rob\u00F3tica y contribuciones open source. Cada proyecto representa un hito en mi camino como maker y desarrollador.',
      cta: 'Explorar mi portafolio',
    },
    trading: {
      title: 'Trading',
      subtitle: 'Trader entusiasta & Aprendiz de trading algor\u00EDtmico',
      description:
        'Como trader entusiasta, he dedicado los \u00FAltimos dos a\u00F1os a formarme en el mercado de divisas (forex) y a profundizar en el trading algor\u00EDtmico, con el objetivo de optimizar y automatizar mis estrategias de inversi\u00F3n. Me motiva el aprendizaje continuo y la investigaci\u00F3n de los mercados financieros, siempre en busca de nuevas herramientas y enfoques que me permitan mejorar mi desempe\u00F1o y tomar decisiones m\u00E1s informadas.',
      cta: 'Conoce m\u00E1s sobre trading',
    },
    foodie: {
      title: 'Foodie Enthusiast',
      subtitle: 'Creador de contenido & Foodie lover',
      description:
        'M\u00E1s all\u00E1 de la tecnolog\u00EDa, soy un apasionado creador de contenido y amante de la gastronom\u00EDa. Disfruto explorar nuevos lugares para comer, compartir recomendaciones y experiencias culinarias, y conectar con personas a trav\u00E9s de mis redes sociales. Me motiva inspirar a otros a descubrir sitios \u00FAnicos y vivir nuevas experiencias, combinando mi entusiasmo por la comunicaci\u00F3n, la creatividad y el buen comer.',
      cta: 'Descubre mi lado foodie',
    },
    hobbies: {
      title: 'Hobbies',
      subtitle: 'Apasionado del deporte y la vida activa',
      description:
        'Fuera del mundo profesional, soy un apasionado del deporte y el bienestar. Disfruto recorrer la ciudad en bicicleta y mantenerme activo a trav\u00E9s del running, el baloncesto y el ajedrez. Adem\u00E1s, encuentro en los videojuegos una forma de entretenimiento y desaf\u00EDo mental. El deporte es una parte fundamental de mi vida, ya que me inspira a superarme constantemente y a mantener un equilibrio saludable.',
      cta: 'Ver mis hobbies',
    },
    builder: {
      title: 'Lo que construyo',
      subtitle: 'Desde plataformas con IA hasta herramientas open source',
      description:
        'Construir es lo que mejor hago. Como CTO de <a href="https://dailybot.com" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white font-semibold underline hover:no-underline">Dailybot (YC S21)</a>, he dise\u00F1ado la arquitectura de una plataforma de colaboraci\u00F3n moderna que permite que equipos humanos y agentes de IA trabajen juntos sin fricciones, con transparencia unificada en equipos h\u00EDbridos y flujos inteligentes. M\u00E1s all\u00E1 de Dailybot, estoy constantemente lanzando proyectos \u2014 desde Moltbot (IA en Raspberry Pi) hasta Syntro (soporte con IA) y SysPrompt (gesti\u00F3n de prompts para LLMs).<br /><br />Con 113+ repositorios en GitHub y proyectos en Python, Go, TypeScript y m\u00E1s, creo que la mejor forma de aprender nueva tecnolog\u00EDa es construir algo real con ella.',
      cta: 'Explorar mis proyectos',
    },
    community: {
      title: 'Comunidad & charlas',
      subtitle: 'Compartiendo conocimiento, construyendo ecosistemas',
      description:
        'Cofund\u00E9 Pereira Tech Talks, una comunidad tech dedicada a conectar profesionales y compartir conocimiento en Colombia. Como speaker, he hablado sobre Docker, arquitecturas serverless, IA conversacional, blockchain y m\u00E1s en conferencias y meetups de la regi\u00F3n. La comunidad se ha convertido en una plataforma donde desarrolladores, dise\u00F1adores y emprendedores se conectan, aprenden unos de otros y empujan los l\u00EDmites de lo posible. Creo que la tecnolog\u00EDa crece m\u00E1s r\u00E1pido cuando compartimos lo que aprendemos \u2014 por eso escribo este blog y doy charlas.',
      cta: 'Explorar comunidad y charlas',
    },
    beyondCode: {
      title: 'M\u00E1s all\u00E1 del c\u00F3digo',
      subtitle: 'Lo que impulsa al constructor',
      description:
        'Cuando no estoy construyendo productos, exploro otras pasiones. Me encanta leer, especialmente ciencia ficci\u00F3n \u2014 Isaac Asimov es uno de mis autores favoritos \u2014 y pel\u00EDculas sobre viajes en el tiempo, futuros dist\u00F3picos y exploraci\u00F3n espacial. Estudio los mercados financieros y el trading algor\u00EDtmico para entender el mundo de los negocios desde otro \u00E1ngulo. Me mantengo activo con ciclismo, running y baloncesto \u2014 el deporte me mantiene con energ\u00EDa y disciplina. Y me encanta descubrir buena comida y compartir hallazgos culinarios. La vida es mejor cuando eres curioso por todo.',
      cta: 'M\u00E1s sobre mis intereses',
    },
    latestArticles: '\u00DAltimos art\u00EDculos',
    viewAllPosts: 'Ver todos los art\u00EDculos',
    portfolioProjectsTitle: 'Portafolio y proyectos',
    portfolioProjectsViewAll: 'Ver todos los posts del portafolio',
    portfolioProjectsEmpty: 'Próximamente más proyectos.',
    techTalksPostsTitle: 'Charlas recientes',
    techTalksPostsViewAll: 'Ver todas las charlas',
    techTalksPostsEmpty: 'Próximamente más charlas.',
    dailybotPostsTitle: 'Últimos artículos de Dailybot',
    dailybotPostsViewAll: 'Ver todos los artículos de Dailybot',
    dailybotPostsEmpty: 'Próximamente artículos de Dailybot.',
    tradingPostsTitle: 'Diario de Trading',
    tradingPostsViewAll: 'Ver todas las entradas de trading',
    tradingPostsEmpty: 'Próximamente entradas del diario de trading.',
  },

  // Contact section (homepage)
  contact: {
    title: 'Contacto',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Email',
    emailPlaceholder: 'tu@email.com',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Escribe tu mensaje...',
    sendButton: 'Enviar mensaje',
  },

  // About page
  aboutPage: {
    title: 'Acerca de la metodología',
    subtitle: 'Metodología abierta · Licencia MIT',
    description:
      'Deep Work Plan es una metodología abierta y agnóstica de frameworks para ejecutar trabajo de ingeniería serio con agentes de programación con IA. Conoce su origen y quién la mantiene.',
    heroDescription:
      'Una estructura repetible para planificar, ejecutar y verificar trabajo profundo con agentes de programación con IA: construida en abierto y de uso libre.',
    bioTitle: 'Qué es',
    bioText:
      'Deep Work Plan (DWP) es una metodología, no un producto. Define cómo convertir un objetivo en un plan acordado, dividir ese plan en tareas atómicas y verificables de forma independiente, y ejecutar cada tarea en un bucle enfocado que termina con una verificación.<br /><br />Es deliberadamente agnóstica respecto al agente de IA o al stack que utilices: los adaptadores traducen el mismo bucle central a Claude, Cursor, Copilot, Codex, Gemini y más. El plan, las tareas y el registro de ejecución son Markdown plano, así que el trabajo se mantiene legible, revisable y bajo control de versiones.',
    passionsTitle: 'Principios fundamentales',
    passions: [
      {
        title: 'Planificar antes de ejecutar',
        description:
          'No se escribe código hasta que el plan está acordado. El plan es un contrato entre tú y el agente.',
        icon: '\u{1F5FA}\uFE0F',
        link: '/methodology',
      },
      {
        title: 'Las tareas son atómicas',
        description:
          'Cada tarea se acota para poder ejecutarse y verificarse por sí sola, y luego se confirma de forma atómica.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verificar todo',
        description:
          'Cada tarea termina con una verificación explícita antes de empezar la siguiente, con el progreso registrado en git.',
        icon: '\u2705',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'De un vistazo',
    quickFacts: [
      'Metodología abierta, licencia MIT',
      'Agnóstica de frameworks y de agentes',
      'Mantenida por Dailybot y la comunidad',
      'Incluye especificación, comandos, adaptadores, presets y ejemplos',
      'Solo Markdown — sin runtime, sin lock-in',
      'Convierte cualquier repositorio en un código AI-first, pilotable por agentes',
    ],
    ctaTitle: 'Quién la mantiene',
    ctaDescription:
      'Deep Work Plan surgió del trabajo real de ingeniería en Dailybot y hoy lo mantienen Dailybot junto con la comunidad de código abierto. La metodología, la especificación y el kit se publican bajo licencia MIT — libres de usar, adaptar y construir sobre ellos.',
    ctaCv: 'Leer la metodología',
    ctaContact: 'Inicio rápido',
  },

  // Contact page
  contactPage: {
    title: 'Comunidad y contacto',
    subtitle: 'Código abierto · Impulsado por la comunidad',
    description:
      'Deep Work Plan se construye en abierto. Encuentra el código, abre un issue o únete a la conversación a través de los canales de abajo.',
    heroDescription:
      'Siempre estoy abierto a nuevas oportunidades, colaboraciones y conversaciones. Ya sea que tengas una idea de proyecto, una invitaci\u00F3n para hablar o simplemente quieras saludar — me encantar\u00EDa saber de ti.',
    formTitle: 'Enviar un mensaje',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'Email',
    emailPlaceholder: 'tu@email.com',
    reasonLabel: 'Quiero contactarte por',
    reasonOptions: [
      { value: '', label: '— Selecciona un tema —' },
      { value: 'general', label: 'General / Solo saludar' },
      { value: 'tech-talk', label: 'Charla tech / Invitación a hablar' },
      { value: 'collaboration', label: 'Colaboración / Partnership' },
      { value: 'project', label: 'Proyecto / Consulta laboral' },
      { value: 'dailybot', label: 'Pregunta sobre Dailybot' },
      { value: 'trading', label: 'Preguntas sobre mi trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Unirme a La Biblioteca del Mañana',
      },
      { value: 'other', label: 'Otro' },
    ],
    subjectLabel: 'Asunto',
    subjectPlaceholder: '\u00BFDe qu\u00E9 se trata?',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Escribe tu mensaje...',
    sendButton: 'Enviar mensaje',
    sendingButton: 'Enviando...',
    successTitle: '¡Mensaje enviado!',
    successMessage: 'Gracias por escribirme. Te responderé lo antes posible.',
    sendAnotherButton: 'Enviar otro mensaje',
    requiredField: 'Este campo es obligatorio',
    invalidEmail: 'Por favor ingresa un email válido',
    fallbackMessage:
      'El formulario de contacto no está disponible en este momento. Puedes contactarme directamente por email.',
    fallbackEmailText: 'Envíame un email a',
    formNote: 'Te responderé lo antes posible.',
    socialTitle: 'Con\u00E9ctate conmigo',
    locationTitle: 'Ubicaci\u00F3n',
    locationText:
      'Ubicado en Colombia. Abierto a colaboraci\u00F3n remota en todo el mundo.',
    prefillSubjects: {
      generalInquiry: 'Consulta General',
      collaboration: 'Oportunidad de Colaboración',
      projectInquiry: 'Consulta de Proyecto o Trabajo',
      projectCollaboration: 'Consulta de Colaboración en Proyecto',
      startupCollaboration: 'Oportunidad de Colaboración Startup',
      techTalkInvitation: 'Invitación a Charla Tech',
      tradingQuestion: 'Pregunta de Trading',
      dailybotQuestion: 'Pregunta sobre Dailybot',
    },
  },

  contactSection: {
    title: 'Conectemos',
    description:
      'Siempre estoy abierto a conversaciones interesantes, oportunidades de colaboración e ideas nuevas. Ya sea para hablar de tech, emprendimiento o simplemente saludar.',
    ctaText: 'Ponte en contacto',
    ctaLink: '/es/contact?topic=general&subject=Consulta%20General',
  },

  // Search input
  searchPlaceholder: 'Buscar art\u00EDculos...',
  searchHint: 'Tip: presiona Esc para limpiar la b\u00FAsqueda.',
  clearSearch: 'Limpiar',
  resultsFound: (count) =>
    `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`,

  // Loading states
  loadingIndex: 'Cargando \u00EDndice de b\u00FAsqueda...',
  searching: 'Buscando art\u00EDculos...',

  // Results
  noResults: (query) =>
    `No se encontraron art\u00EDculos que coincidan con "${query}"`,
  noResultsSuggestion:
    'Prueba una palabra m\u00E1s amplia o navega todos los art\u00EDculos.',
  noPostsAvailable: 'Aún no hay artículos disponibles.',

  // Pagination
  previous: 'Anterior',
  next: 'Siguiente',
  pageOf: (current, total) => `P\u00E1gina ${current} de ${total}`,

  // Blog header
  blogTitle: 'Blog',
  blogHeading: 'Artículos e Historias',
  blogDescription:
    'Tecnología, emprendimiento, vida personal y todo lo que hay en el medio',
  allPosts: 'Todos los posts',
  showingArticles: (showing, total) =>
    `Mostrando ${showing} de ${total} artículos`,
  articlesAvailable: (total) =>
    `${total} artículo${total !== 1 ? 's' : ''} disponible${total !== 1 ? 's' : ''}`,
  lastUpdatedOn: 'Actualizado',
  readingTime: (minutes) => `${minutes} min de lectura`,
  relatedArticles: 'Artículos relacionados',
  relatedArticlesDescription: 'También te pueden interesar estos artículos',

  // Series navigation
  seriesPartOf: 'Parte de la serie',
  seriesChapter: (n) => `Capítulo ${n}`,
  seriesPrevious: 'Capítulo anterior',
  seriesNext: 'Siguiente capítulo',
  seriesToC: 'Todos los capítulos',
  seriesChapterOf: (current, total) => `Capítulo ${current} de ${total}`,

  // Indicadores flotantes que conectan un blog post con su deck de slides (y al revés).
  slideIndicator: {
    label: 'Slides',
    subtitle: 'Abrir deck →',
    ariaLabel: 'Abrir presentación asociada',
  },
  postIndicator: {
    label: 'Artículo',
    subtitle: 'Leer post →',
    ariaLabel: 'Leer artículo asociado',
  },

  // Series pages
  seriesPage: {
    title: 'Serie',
    breadcrumb: 'Series',
    chapters: 'capítulos',
    chapter: 'Capítulo',
    progress: (current, total) => `${current} de ${total} capítulos`,
    readChapter: 'Leer capítulo',
    emptyState: 'Aún no hay publicaciones en esta serie.',
    backToSeries: 'Todas las Series',
    backToBlog: 'Volver al Blog',
    startReading: 'Comenzar a leer',
    continueReading: 'Continuar leyendo',
  },
  seriesListingPage: {
    title: 'Series del Blog',
    description:
      'Explora colecciones curadas de artículos organizados en series temáticas — inmersiones profundas en tecnología, emprendimiento e ingeniería.',
    heading: 'Series',
    postsCount: (count) => `${count} ${count === 1 ? 'capítulo' : 'capítulos'}`,
    exploreSeries: 'Explorar series',
    emptyState: 'Aún no hay series disponibles.',
  },

  // Scheduled posts (dev-only indicators)
  scheduledBadge: 'Programado',
  scheduledBannerTitle: 'Post programado',
  scheduledBannerMessage: (date) =>
    `Este post será publicado el ${date}. Solo es visible en modo desarrollo.`,

  // Draft posts (dev + preview indicators)
  draftBadge: 'Borrador',
  draftBannerTitle: 'Post en borrador',
  draftBannerMessage:
    'Este post está en construcción. Lo ves porque estás en el servidor local o en una rama de preview — no se publicará en producción hasta que se quite la marca de borrador.',

  // Tags
  postsTagged: (tag) => `Posts etiquetados con "${tag}"`,
  allTags: 'Todas las etiquetas',
  tagNames: {
    // Primary tags
    tech: 'Tecnología',
    personal: 'Personal',
    talks: 'Charlas',
    trading: 'Trading',
    portfolio: 'Portafolio',
    dailybot: 'Dailybot',
    entrepreneur: 'Emprendimiento',
    // Secondary tags (topics)
    'web-development': 'Desarrollo Web',
    javascript: 'JavaScript',
    ai: 'IA & ML',
    blockchain: 'Blockchain',
    devops: 'DevOps',
    python: 'Python',
    university: 'Universidad',
    database: 'Bases de Datos',
    iot: 'IoT',
    design: 'Diseño',
    mobile: 'Móvil',
    'ai-agents': 'Agentes de IA',
    // Subtopic tags
    astro: 'Astro',
    svelte: 'Svelte',
    cloudflare: 'Cloudflare',
    docker: 'Docker',
    graphql: 'GraphQL',
    django: 'Django',
    openclaw: 'OpenClaw',
    kotlin: 'Kotlin',
    claude: 'Claude',
    mcp: 'MCP',
    flutter: 'Flutter',
  },
  tagDescriptions: {
    // Primary tags
    tech: 'Tutoriales, guías y artículos técnicos.',
    personal: 'Artículos sobre mi vida y experiencias.',
    talks: 'Charlas técnicas, slides, videos y eventos.',
    trading: 'Diario de trading, análisis y aprendizajes.',
    portfolio:
      'Proyectos personales, software, robótica y trabajo open source.',
    dailybot:
      'Artículos sobre Dailybot: plataforma de colaboración para equipos humanos y agentes de IA, automatización de flujos y productividad de equipos híbridos.',
    entrepreneur: 'Viaje emprendedor, aventuras y experiencias de startups.',
    // Secondary tags (topics)
    'web-development':
      'Frameworks, frontend, fullstack — Astro, Vue, Svelte, Meteor, CSS, Webpack.',
    javascript:
      'Ecosistema JavaScript — Vue.js, Webpack, Meteor, A-Frame, Node.',
    ai: 'Inteligencia artificial, machine learning, deep learning y LLMs.',
    blockchain:
      'Blockchain, criptomonedas, Bitcoin, Ethereum y contratos inteligentes.',
    devops: 'Docker, contenedores, serverless, microservicios y despliegue.',
    python: 'Ecosistema Python — Django, TensorFlow, MyPy, Spark.',
    university: 'Proyectos y ejercicios de cursos universitarios.',
    database: 'SQL, NoSQL, MongoDB y arquitectura multi-base de datos.',
    iot: 'Internet de las Cosas, sensores, hardware e interfaces de voz.',
    design: 'Diseño visual, branding, diseño web y UX.',
    mobile:
      'Desarrollo móvil — Android, iOS, frameworks multiplataforma y el camino para aprender a publicar en dispositivos.',
    'ai-agents':
      'Agentes de IA y la agentic web — sistemas autónomos, uso de herramientas, patrones de orquestación, MCP y los estándares .well-known.',
    // Subtopic tags
    astro:
      'Framework Astro — arquitectura por islas, Content Collections, MDX y builds estáticos.',
    svelte:
      'Svelte y SvelteKit — componentes reactivos, runes y patrones de hidratación.',
    cloudflare: 'Cloudflare Pages, Workers, R2 y la plataforma agentic-web.',
    docker:
      'Contenedores Docker, escritura de Dockerfile y orquestación multi-servicio.',
    graphql:
      'APIs GraphQL — esquemas, resolvers, federación y patrones de cliente.',
    django:
      'Framework Django — ORM, configuraciones multi-base, admin y despliegue.',
    openclaw:
      'OpenClaw — el agente personal de IA local y su filosofía de diseño.',
    kotlin:
      'Lenguaje y ecosistema Kotlin — Kotlin Multiplatform, Compose Multiplatform, Android y herramientas para JVM.',
    claude:
      'Claude — la familia de modelos de Anthropic y los runtimes de agente construidos encima (Claude Code, Skills, Files API).',
    mcp: 'Model Context Protocol — comunicación estandarizada agente↔herramienta, server cards y la capa de estándares para la agentic web.',
    flutter:
      'Flutter — framework móvil multiplataforma basado en Dart, widgets y los trade-offs frente a nativo y Kotlin Multiplatform.',
  },

  // Series names and descriptions (keyed by series slug)
  seriesNames: {
    'building-deepworkplan': 'Construyendo Deep Work Plan',
    'trading-journey': 'Viaje de Trading: De Futuros a Algoritmos',
    'aeo-from-invisible-to-cited': 'AEO: De Invisible a Citado',
    'working-with-agents': 'Trabajando con Agentes',
    'building-agents': 'Construyendo Agentes',
    'the-library-of-tomorrow': 'La Biblioteca del Mañana',
    'mastering-openclaw': 'Dominando OpenClaw',
    'learning-mobile-development': 'Aprendiendo Desarrollo Móvil',
    'slides-as-code': 'Slides as Code',
  },
  seriesDescriptions: {
    'building-deepworkplan':
      'La historia completa de la construcción del sitio web de Deep Work Plan — desde decisiones de arquitectura hasta optimización de rendimiento, analítica y escalabilidad de contenido.',
    'trading-journey':
      'Una serie de 3 partes sobre mi evolución desde el trading discrecional temprano hasta el análisis estructurado con Market Profile y la ejecución algorítmica con MQL4.',
    'aeo-from-invisible-to-cited':
      'Una guía práctica para construir sitios web que los motores de respuesta de IA puedan encontrar, entender, citar y usar — desde datos estructurados y endpoints markdown hasta MCP server cards, WebMCP y puntuación de preparación para agentes.',
    'working-with-agents':
      'De escribir código a orquestar agentes de IA — explorando el nuevo rol, flujos reales de trabajo, lo que falla, criterio, contexto y adopción en equipos.',
    'building-agents':
      'Lo que realmente se necesita para pasar de usar herramientas de IA a construir sistemas de agentes confiables — arquitectura, habilidades y modelos mentales detrás de los agentes reales.',
    'the-library-of-tomorrow':
      'Reseñas y reflexiones sobre libros, películas e historias de ciencia ficción — donde la ciencia ficción clásica se encuentra con la revolución actual de la IA. Nacida de un club de lectura dentro de la comunidad de Pereira Tech Talks.',
    'mastering-openclaw':
      'Una inmersión profunda en OpenClaw — el agente de IA personal que vive en tu máquina, sigue tus reglas, y marcó un nuevo paradigma de IA local.',
    'learning-mobile-development':
      'Un recorrido honesto por el desarrollo móvil — el estado del arte, escoger herramientas y aprender a construir para Android e iOS documentando cada paso.',
    'slides-as-code':
      'Una serie que explora herramientas de presentación orientadas a desarrolladores, compara alternativas y documenta cómo construir un sistema de diapositivas multilingüe dentro de un framework web moderno.',
  },

  // Date formatting
  dateLocale: 'es-ES',

  // Read more
  readMore: 'Leer m\u00E1s',

  // Scroll to timeline
  scrollToTimeline: 'Ver timeline',
  viewLabel: (label: string) => `Ver ${label}`,

  // 404 page
  notFoundPage: {
    title: 'Página no encontrada',
    description:
      'La página que buscas no existe o ha sido movida. Explora el blog, el portafolio o la página principal para encontrar lo que necesitas.',
    heading: 'Página no encontrada',
    message:
      'Lo sentimos, la página que buscas no existe o pudo haber sido movida. Intenta volver a la página principal o buscar en el blog.',
    backHome: 'Volver al inicio',
    searchBlog: 'Leer la metodología',
  },

  // Blog post engagement
  engagement: {
    // Share buttons
    shareTitle: 'Comparte este artículo',
    shareSeriesTitle: 'Comparte esta serie',
    shareOnTwitter: 'Compartir en X',
    shareOnLinkedIn: 'Compartir en LinkedIn',
    shareOnWhatsApp: 'Compartir en WhatsApp',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado!',

    // Newsletter
    newsletterTitle: 'Mantente al día',
    newsletterDescription:
      'Recibe una notificación cuando publique algo nuevo. Sin spam, cancela cuando quieras.',
    newsletterPlaceholder: 'tu@email.com',
    newsletterButton: 'Suscribirse',
    newsletterSubmitting: 'Suscribiendo...',
    newsletterSuccessTitle: '\u00a1Te has suscrito!',
    newsletterSuccessMessage:
      'Gracias por suscribirte. Te avisar\u00e9 cuando publique algo nuevo.',
    newsletterInvalidEmail:
      'Por favor, ingresa un correo electr\u00f3nico v\u00e1lido.',
    newsletterAlreadySubscribed:
      '\u00a1Ya est\u00e1s suscrito! Gracias por estar aqu\u00ed.',
    newsletterResubscribe: 'Suscribirse con otro correo',
    newsletterPrivacy: 'Sin spam. Cancela cuando quieras.',

    // End-of-post CTA
    ctaTitle: '¿Te gustó este artículo?',
    ctaDescription:
      'Compártelo con tu red o suscríbete para recibir mis nuevas publicaciones.',
  },

  // Blog engagement (author + share)
  blogEngagement: {
    aboutAuthor: 'Sobre el autor',
    writtenBy: 'Escrito por',
  },

  // Errors
  searchError: 'Ocurrió un error al buscar. Por favor intenta de nuevo.',
  loadError:
    'Error al cargar el índice de búsqueda. Por favor recarga la página.',
  retry: 'Intentar de nuevo',

  // Deep Work Plan — Metodología (índice + lector de capítulos)
  methodologyPage: {
    meta: {
      title: 'La Metodología Deep Work Plan',
      description:
        'Cinco capítulos del manifiesto a los arquetipos: los principios, el bucle central, las plantillas, las skills y las adaptaciones detrás de Deep Work Plan.',
    },
    eyebrow: 'Metodología',
    title: 'La Metodología Deep Work Plan',
    intro:
      'Cinco capítulos que te llevan desde la filosofía detrás de Deep Work Plan hasta el bucle práctico, las plantillas y las adaptaciones que usas cada día.',
    chapterLabel: 'Capítulo',
    readChapter: 'Leer capítulo',
    prev: 'Anterior',
    next: 'Siguiente',
    backToIndex: 'Todos los capítulos',
  },

  // Deep Work Plan — Especificación (índice + lector)
  specPage: {
    meta: {
      title: 'Especificación de Deep Work Plan',
      description:
        'La especificación legible de la metodología Deep Work Plan: el formato DWP, el protocolo de agentes, los arquetipos, el estándar de documentación y los complementos.',
    },
    eyebrow: 'Especificación',
    title: 'Especificación',
    intro:
      'La especificación precisa y legible de la metodología: las estructuras y protocolos que comparten las personas y los agentes.',
    tocTitle: 'En esta página',
    backToIndex: 'Todos los documentos',
  },

  // Deep Work Plan — Kit (índice + detalle)
  kitPage: {
    meta: {
      title: 'El Kit de Deep Work Plan',
      description:
        'Comandos, adaptadores, presets y ejemplos que hacen ejecutable la metodología Deep Work Plan en distintos agentes y stacks.',
    },
    eyebrow: 'Kit',
    title: 'El Kit',
    intro:
      'Todo lo que necesitas para ejecutar la metodología: la skill y sus sub-skills, comandos de barra, adaptadores de agente, presets de incorporación, addons opcionales y ejemplos resueltos.',
    groups: {
      command: {
        title: 'Sub-skills y comandos',
        description:
          'El enrutador de la skill y sus sub-skills (create, execute, refine, resume, status, onboard, author), más los comandos de barra ligeros que delegan en ellos.',
      },
      adapter: {
        title: 'Adaptadores',
        description:
          'Integraciones ligeras por agente para Claude, Cursor, Codex y más.',
      },
      preset: {
        title: 'Presets de incorporación',
        description:
          'Guías de razonamiento por stack que el flujo de onboard usa para adaptar docs, skills y comandos de validación a tu repositorio.',
      },
      example: {
        title: 'Ejemplos',
        description: 'Recorridos resueltos de antes y después.',
      },
      addon: {
        title: 'Addons (opcionales)',
        description:
          'Capacidades opcionales que el flujo de onboard puede sumar a un repo — nunca forman parte de la base AI-first.',
      },
    },
    viewDetail: 'Ver detalles',
    backToIndex: 'Volver al kit',
  },

  // Deep Work Plan — Ejemplos (galería + detalle)
  examplesPage: {
    meta: {
      title: 'Ejemplos de Deep Work Plan',
      description:
        'Recorridos de antes y después que muestran la misma tarea de ingeniería con y sin un Deep Work Plan.',
    },
    eyebrow: 'Ejemplos',
    title: 'Ejemplos',
    intro:
      'Mira la metodología en acción: recorridos concretos de antes y después de tareas de ingeniería reales.',
    viewExample: 'Leer el recorrido',
    backToGallery: 'Todos los ejemplos',
  },

  // Deep Work Plan — Inicio rápido
  quickstartPage: {
    meta: {
      title: 'Inicio rápido — Deep Work Plan',
      description:
        'Instala la skill, incorpora tu repositorio y luego planifica y ejecuta con cualquier agente: los pasos que vuelven tu repositorio spec-driven y pilotable por agentes.',
    },
    eyebrow: 'Inicio rápido',
    title: 'Empieza en minutos',
    intro:
      'Instala la skill, incorpora tu repositorio y luego planifica y ejecuta con cualquier agente: los pasos que vuelven tu repositorio spec-driven y pilotable por agentes.',
    sequenceTitle: 'El camino de adopción',
    codeLabel: 'Terminal',
    orLabel: 'o',
    steps: [
      {
        title: 'Instala la skill de Deep Work Plan',
        description:
          'Añade la skill a tu repositorio — un enrutador y siete sub-skills (create, execute, refine, resume, status, onboard, author). Usa la CLI de Skills para el camino más rápido, o clona el repositorio y ejecuta el setup donde tengas git y una shell.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Incorpora el repositorio',
        description:
          'Ejecuta la sub-skill de onboard y deja que el agente razone sobre tu repositorio real. Genera AGENTS.md, una base de conocimiento docs/, docs por módulo y un hogar multiagente .agents/ (con el enlace simbólico .claude → .agents), conecta los comandos ligeros dwp-* y crea un .dwp/ ignorado por git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evoluciona el kit y acepta addons',
        description:
          'Usa /skill-create y /agent-create (la sub-skill author) para hacer crecer skills, agentes y comandos adaptados a tu stack. La incorporación también ofrece tres addons opcionales — devcontainer, Dailybot y dependency-upgrade — que aceptas solo cuando encajan.',
      },
      {
        title: 'Planifica y ejecuta',
        description:
          'Genera un Deep Work Plan y ejecútalo tarea por tarea, validando cada compuerta y reanudando entre sesiones — pilotando el repositorio contra su propia especificación.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'El resultado',
    outcome:
      'Tu repositorio se vuelve spec-driven y pilotable por agentes: el plan es la fuente de verdad duradera, y el repositorio mismo se convierte en el harness contra el que corre cualquier agente.',
    nextStepsTitle: 'Próximos pasos',
    nextSteps: [
      { label: 'Leer la metodología', href: '/methodology' },
      { label: 'Explorar el kit', href: '/kit' },
      { label: 'Ver ejemplos', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / endpoint de adopción
  initPage: {
    meta: {
      title: 'Init — Convierte tu repositorio en AI-first',
      description:
        'Adopta la metodología Deep Work Plan en cualquier repositorio. Instala la skill, ejecuta la incorporación del agente y luego planifica y ejecuta con cualquier agente de programación de IA.',
    },
    eyebrow: 'Adopción',
    title: 'Convierte este repositorio en AI-first',
    intro:
      'Un solo endpoint para convertir cualquier repositorio en una base de código guiada por especificación y lista para agentes. Instala la skill, deja que un agente incorpore el repo y luego planifica y ejecuta trabajo estructurado con cualquier agente de programación.',
    handoffTitle: 'Dale esto a tu agente',
    handoffBody:
      'Pega la línea de abajo en tu agente de programación con IA. Leerá la metodología y la especificación, instalará la skill e incorporará este repositorio para los Deep Work Plans.',
    handoffInstruction:
      'Lee y sigue las instrucciones en https://deepworkplan.com/init.md para hacer este repositorio AI-first.',
    handoffMdLabel: 'Instrucción autocontenida para el agente',
    codeLabel: 'agente',
    whatTitle: 'Qué hace esto',
    whatBody: [
      'La adopción cambia el repositorio de dos maneras duraderas: los pilares de la metodología.',
      'Primero, el repositorio se vuelve guiado por especificación: el trabajo comienza desde un plan y una especificación escritos, no desde prompts improvisados. Segundo, el repositorio mismo se convierte en el harness del agente: un AGENTS.md, una base de conocimiento docs/, docs por módulo y un hogar de skills .agents/ (con el enlace simbólico .claude → .agents) dan a cada agente el contexto y los comandos que necesita.',
    ],
    sequenceTitle: 'La secuencia de adopción',
    orLabel: 'o',
    steps: [
      {
        title: 'Instala la skill',
        description:
          'Añade la skill de Deep Work Plan para que cualquier agente pueda planificar y ejecutar trabajo estructurado. La skill incluye un enrutador y siete sub-skills: create, execute, refine, resume, status, onboard y author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Ejecuta la incorporación del repositorio',
        description:
          'Invoca la sub-skill de onboard y deja que el agente razone sobre el repositorio real: su stack, su gestor de paquetes y sus comandos de validación reales. Luego genera AGENTS.md, una base de conocimiento docs/, docs por módulo y un hogar multiagente .agents/ (con el enlace simbólico .claude → .agents), conecta los comandos ligeros dwp-* y crea un .dwp/ ignorado por git para planes y borradores. Nada se copia de una plantilla; todo se adapta a tu repositorio.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evoluciona el kit y acepta addons',
        description:
          'Usa /skill-create y /agent-create (la sub-skill author) para hacer crecer skills, agentes y comandos adaptados a tu stack. La incorporación también ofrece tres addons opcionales — devcontainer, Dailybot y dependency-upgrade — que aceptas solo cuando encajan. Un repo es plenamente conforme con cero addons.',
      },
      {
        title: 'Planifica y ejecuta',
        description:
          'Genera Deep Work Plans con /dwp-create y ejecútalos con /dwp-execute; luego usa /dwp-status, /dwp-refine y /dwp-resume a medida que avanza el trabajo. Cada plan lleva tareas numeradas, compuertas de validación y un protocolo de finalización para que el trabajo siga siendo estructurado, revisable y reanudable entre sesiones.',
      },
    ],
    outcomeTitle: 'El resultado',
    outcome:
      'El repositorio se vuelve guiado por especificación y el repositorio mismo se convierte en el harness del agente: el contexto y los comandos viajan con el código.',
    nextStepsTitle: 'Lee a continuación',
    nextSteps: [
      { label: 'Inicio rápido', href: '/quickstart' },
      { label: 'Metodología', href: '/methodology' },
      { label: 'Especificación', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },
};
