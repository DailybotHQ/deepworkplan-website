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
    about: 'Acerca de',
    contact: 'Contacto',
    // Deep Work Plan IA
    methodology: 'Metodología',
    spec: 'Especificación',
    kit: 'Kit',
    examples: 'Ejemplos',
    init: 'Init',
    quickstart: 'Inicio rápido',
    trust: 'Confianza',
    developers: 'Desarrolladores',
    privacy: 'Privacidad',
    github: 'GitHub',
    repo: {
      label: 'Código fuente',
      website: 'Repositorio del sitio web',
      websiteDesc: 'Este sitio',
      skill: 'Repositorio de la skill',
      skillDesc: 'La skill instalable',
    },
    menu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Todos los derechos reservados.',
    poweredBy: 'Desarrollado por',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Nuevo',
    text: 'Deep Work Plan ya está en Product Hunt',
    tagline: 'dale un plan a tu agente',
    linkText: 'Vótalo',
  },

  // Navegación de Markdown para agentes
  agentNav: {
    heading: 'Navegación del Sitio',
    sections: {
      methodology: 'Metodología',
      getStarted: 'Empezar',
      project: 'Proyecto',
      connect: 'Conectar',
    },
  },

  // Página de inicio de Deep Work Plan
  home: {
    meta: {
      title: 'Deep Work Plan — ejecución estructurada para agentes de IA',
      description:
        'El contexto importa más que el modelo. Deep Work Plan hace de cualquier repositorio un entorno estructurado donde un agente completa trabajo de largo aliento.',
    },
    hero: {
      badge: 'Metodología abierta · MIT · Independiente del agente',
      title: 'Los modelos importan.',
      titleEmphasis: 'El contexto importa más.',
      subtitle:
        'Deep Work Plan convierte cualquier repositorio en un entorno estructurado — contexto, guardrails y un plan duradero — donde cualquier agente de código ejecuta con precisión y completa el trabajo de largo aliento.',
      instructionLabel: 'Copia en tu agente',
      instruction:
        'Copia el prompt de init.md y pégalo en tu agente de código — Claude Code, Cursor, Codex, o cualquier otro — para hacer de cualquier repositorio uno AI-first.',
      copyLabel: 'Copiar init.md',
      copiedLabel: 'Copiado',
      viewInitCta: 'Ver el prompt de /init',
      pullQuote:
        'Deep Work Plan es desarrollo guiado por especificación donde el propio repositorio se convierte en el harness.',
      primaryCta: 'Leer la metodología',
      secondaryCta: 'Leer la especificación',
      illustrationAlt:
        'Un faro en una costa rocosa proyecta un único haz que guía a una pequeña embarcación — un grabado que evoca el repositorio como un harness estable que guía a cualquier agente.',
    },
    pitch: {
      kicker: 'El problema y la respuesta',
      problem:
        'Los agentes de programación de IA son muy eficaces en ráfagas cortas. En trabajo de largo alcance — una migración, un subsistema nuevo, una refactorización en decenas de archivos — se desvían: el contexto se llena, las decisiones se olvidan y las tareas de varias horas se abandonan a medio camino.',
      answer:
        'Deep Work Plan responde con desarrollo guiado por especificación: el plan es la fuente de verdad duradera y los agentes ejecutan contra criterios de aceptación y puertas de validación explícitos. La desviación baja, el trabajo se mantiene verificable y cualquier agente puede reanudarlo entre sesiones.',
      origin:
        'También es ingeniería de harness hecha portable. Un harness de agente es el andamiaje alrededor de un modelo — contexto, herramientas, bucle de control, barreras, estado reanudable — que lo hace fiable. Deep Work Plan instala ese harness en el propio repositorio (AGENTS.md, docs, el hogar de skills .agents/, el skill de DWP), para que cualquier agente pueda pilotar cualquier repo. Nació en Dailybot, se probó durante meses y se publicó como la DailybotHQ/deepworkplan-skill.',
      illustrationAlt:
        'Una carta náutica con un único rumbo trazado que sortea los peligros con seguridad — un grabado que evoca el plan como la dirección que mantiene el trabajo en curso.',
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
          title:
            'Crea .agents/ con enlaces simbólicos .claude y .cursor a .agents',
          description:
            'Un directorio .agents/ multiagente (skills, agentes, comandos) y los enlaces simbólicos .claude y .cursor a .agents, para que cada herramienta lea una única fuente de verdad.',
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
        'No eliges un método de instalación ni copias una plantilla. Le das a tu agente una sola línea; instala el skill — el motor reutilizable — y adapta tu repositorio a él.',
      steps: [
        {
          title: 'Tu agente abre /init.md',
          description:
            'Lee el prompt de incorporación en deepworkplan.com/init.md y la metodología, la especificación y el kit que enlaza: el estándar que está a punto de adoptar.',
        },
        {
          title: 'Instala el skill de Deep Work Plan',
          description:
            'El skill es el motor — el mismo en todos los repositorios. Un comando trae el router y sus sub-skills (create, execute, refine, resume, status, verify, onboard, author) para Claude Code, Cursor, Codex, Gemini y Copilot.',
        },
        {
          title: 'Adapta tu repositorio',
          description:
            'Razonando sobre tu stack real — nunca copiando y pegando — escribe AGENTS.md, un árbol docs/ categorizado, READMEs por módulo, un kit .agents/ razonado y un .dwp/ ignorado por git. Tu repositorio se convierte en el harness.',
        },
        {
          title: 'Planificas y ejecutas',
          description:
            'Genera Deep Work Plans de largo alcance para cualquier tarea y ejecútalos paso a paso, con criterios de aceptación explícitos, puertas de validación y estado reanudable — de forma autónoma, durante horas.',
        },
      ],
      note: 'El skill se instala idéntico en todas partes; lo que se adapta es tu repositorio — el AGENTS.md, los docs y el kit .agents/ razonado generados para tu stack. Esa separación es lo que hace de la metodología un estándar reutilizable y no un andamiaje de una sola vez.',
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
          label: '.agents/ con enlaces simbólicos .claude y .cursor a .agents',
          detail:
            'Un directorio .agents/ multiagente (skills, agentes, comandos) con los enlaces simbólicos .claude y .cursor a .agents para que cada herramienta lea una única fuente de verdad.',
        },
        {
          label: 'El skill de Deep Work Plan, instalado',
          detail:
            'create, execute, refine, resume, status, verify, onboard y author, disponibles para tu agente como un único paquete de skills, sin copia por repositorio.',
        },
        {
          label: 'Conformidad que puedes comprobar',
          detail:
            '/dwp-verify produce un informe objetivo de aprobado/fallido frente a la especificación, de modo que "AI-first" se verifica, no se afirma — y es reverificable tras cada plan.',
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
      viewAllCta: 'Ver todos los agentes',
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
          support: 'full',
          note: 'Adaptador completo — los comandos dwp-* se ejecutan a través de AGENTS.md y procedimientos #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Requiere Gemini 2.5 Pro o superior, con WebFetch nativo.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Código abierto. Lee AGENTS.md de forma nativa y ejecuta dwp-* mediante comandos #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Las reglas y los procedimientos de comandos # impulsan el bucle completo de Deep Work Plan.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Código abierto. Las reglas en Markdown y los comandos # ejecutan cada paso de dwp-*.',
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
      viewAllCta: 'Ver todos los presets',
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
      dailybotCta: 'Conoce Dailybot',
    },
    finalCta: {
      badge: 'Haz que tu repositorio sea AI-first',
      title: 'Dale deep work a tus agentes.',
      subtitle:
        'Dale a tu agente una sola línea — apúntalo a /init.md — y hace que tu repositorio sea AI-first: instala el skill, razona sobre tu stack y confirma una jerarquía completa de AGENTS.md. Desde ahí creas y ejecutas Deep Work Plans que corren de forma autónoma durante horas.',
      primaryCta: 'Abrir el prompt de /init',
      secondaryCta: 'Leer la metodología',
      tertiaryCta: 'Para agentes y desarrolladores',
      meta: 'Con licencia MIT · sin telemetría · los resultados van a una carpeta .dwp/ ignorada por git.',
    },
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
      'Deep Work Plan es una metodología abierta y agnóstica de framework para trabajo de ingeniería serio con agentes de IA. De dónde viene y quién la mantiene.',
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

  // Date formatting
  dateLocale: 'es-ES',

  // 404 page
  notFoundPage: {
    title: 'Página no encontrada',
    description:
      'La página que buscas no existe o ha sido movida. Explora la metodología o vuelve a la página principal para encontrar lo que necesitas.',
    heading: 'Página no encontrada',
    message:
      'Lo sentimos, la página que buscas no existe o pudo haber sido movida. Intenta volver a la página principal o explorar la metodología.',
    backHome: 'Volver al inicio',
    exploreMethodology: 'Leer la metodología',
    agentTitle: 'Para agentes de IA',
    agentIntro:
      'Esta ruta no existe. Los enlaces de recuperación de abajo (y sus equivalentes legibles por máquina) enumeran todas las páginas de este sitio.',
  },

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
        'La especificación legible de Deep Work Plan: el formato DWP, el protocolo de agentes, los arquetipos, el estándar de documentación y los complementos.',
    },
    eyebrow: 'Especificación',
    title: 'Especificación',
    intro:
      'La especificación precisa y legible de la metodología: las estructuras y protocolos que comparten las personas y los agentes.',
    tocTitle: 'En esta página',
    prev: 'Anterior',
    next: 'Siguiente',
    backToIndex: 'Todos los documentos',
  },

  // Deep Work Plan — Kit (índice + detalle)
  kitPage: {
    meta: {
      title: 'El Kit de Deep Work Plan',
      description:
        'La skill y sus ocho sub-skills, comandos, adaptadores, presets, addons opcionales y ejemplos que hacen ejecutable Deep Work Plan en cualquier agente y stack.',
    },
    eyebrow: 'Kit',
    title: 'El Kit',
    intro:
      'Todo lo que necesitas para ejecutar la metodología: la skill y sus sub-skills, comandos de barra, adaptadores de agente, presets de incorporación, addons opcionales y ejemplos resueltos.',
    groups: {
      command: {
        title: 'Sub-skills y comandos',
        description:
          'El enrutador de la skill y sus sub-skills (create, execute, refine, resume, status, verify, onboard, author), más los comandos de barra ligeros que delegan en ellos.',
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
    prev: 'Anterior',
    next: 'Siguiente',
    backToIndex: 'Volver al kit',
  },

  // Deep Work Plan — Ejemplos (galería + detalle)
  examplesPage: {
    meta: {
      title: 'Ejemplos de Deep Work Plan',
      description:
        'Recorridos de antes y después que muestran la misma tarea de ingeniería con y sin un Deep Work Plan — y la diferencia en fiabilidad y revisión.',
    },
    eyebrow: 'Ejemplos',
    title: 'Ejemplos',
    intro:
      'Mira la metodología en acción: recorridos concretos de antes y después de tareas de ingeniería reales.',
    viewExample: 'Leer el recorrido',
    prev: 'Anterior',
    next: 'Siguiente',
    backToGallery: 'Todos los ejemplos',
  },

  // Deep Work Plan — Inicio rápido
  quickstartPage: {
    meta: {
      title: 'Inicio rápido — Deep Work Plan',
      description:
        'Instala la skill, incorpora tu repositorio y planifica y ejecuta con cualquier agente: los pasos que vuelven tu repo spec-driven y pilotable por agentes.',
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
          'Añade la skill a tu repositorio — un enrutador y ocho sub-skills (create, execute, refine, resume, status, verify, onboard, author). Usa la CLI de Skills para el camino más rápido, o clona el repositorio y ejecuta el setup donde tengas git y una shell.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Incorpora el repositorio',
        description:
          'Ejecuta la sub-skill de onboard y deja que el agente razone sobre tu repositorio real. Genera AGENTS.md, una base de conocimiento docs/, docs por módulo y un hogar multiagente .agents/ (con los enlaces simbólicos .claude → .agents y .cursor → .agents), conecta los comandos ligeros dwp-* y crea un .dwp/ ignorado por git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evoluciona el kit y acepta addons',
        description:
          'Usa /skill-create y /agent-create (la sub-skill author) para hacer crecer skills, agentes y comandos adaptados a tu stack. La incorporación también ofrece cinco addons opcionales — devcontainer, Dailybot, dependency-upgrade, design-system y AI Diff Reviewer — que aceptas solo cuando encajan.',
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
        'Adopta Deep Work Plan en cualquier repositorio: instala la skill, ejecuta la incorporación y luego planifica y ejecuta con cualquier agente de IA.',
    },
    eyebrow: 'Adopción',
    title: 'Convierte este repositorio en AI-first',
    intro:
      'Un solo endpoint para convertir cualquier repositorio en una base de código guiada por especificación y lista para agentes. Instala la skill, deja que un agente incorpore el repo y luego planifica y ejecuta trabajo estructurado con cualquier agente de programación.',
    handoffTitle: 'Copia en tu agente',
    handoffBody:
      'Copia el prompt completo de init.md y pégalo en tu agente de código IA — Claude Code, Cursor, Codex, o cualquier otro. Lee la metodología y la especificación, instala la skill e incorpora este repositorio para los Deep Work Plans.',
    handoffInstruction:
      'Lee y sigue las instrucciones en https://deepworkplan.com/init.md para hacer este repositorio AI-first.',
    handoffMdLabel: 'Instrucción autocontenida para el agente',
    codeLabel: 'agente',
    whatTitle: 'Qué hace esto',
    whatBody: [
      'La adopción cambia el repositorio de dos maneras duraderas: los pilares de la metodología.',
      'Primero, el repositorio se vuelve guiado por especificación: el trabajo comienza desde un plan y una especificación escritos, no desde prompts improvisados. Segundo, el repositorio mismo se convierte en el harness del agente: un AGENTS.md, una base de conocimiento docs/, docs por módulo y un hogar de skills .agents/ (con los enlaces simbólicos .claude → .agents y .cursor → .agents) dan a cada agente el contexto y los comandos que necesita.',
    ],
    sequenceTitle: 'La secuencia de adopción',
    orLabel: 'o',
    steps: [
      {
        title: 'Verifica antes de instalar',
        description:
          'Trata el prompt y el skill como no confiables hasta haberlos comprobado. Ambos son de código abierto y con licencia MIT; el skill es Markdown-first sin llamadas de red ni telemetría. Cada versión publica un SHA256SUMS sobre los archivos del skill, así que puedes confirmar que tu copia coincide antes de ejecutarlo. Las versiones tienen checksums, no firmas (las firmas son el próximo paso documentado).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Instala la skill',
        description:
          'Añade la skill de Deep Work Plan para que cualquier agente pueda planificar y ejecutar trabajo estructurado. La skill incluye un enrutador y ocho sub-skills: create, execute, refine, resume, status, verify, onboard y author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Ejecuta la incorporación del repositorio',
        description:
          'Invoca la sub-skill de onboard y deja que el agente razone sobre el repositorio real: su stack, su gestor de paquetes y sus comandos de validación reales. Luego genera AGENTS.md, una base de conocimiento docs/, docs por módulo y un hogar multiagente .agents/ (con los enlaces simbólicos .claude → .agents y .cursor → .agents), conecta los comandos ligeros dwp-* y crea un .dwp/ ignorado por git para planes y borradores. Para repos grandes, la sub-skill de onboard utiliza una ruta guiada por plan: completa el reconocimiento y luego emite un Deep Work Plan de incorporación. Nada se copia de una plantilla; todo se adapta a tu repositorio.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Acepta addons opcionales',
        description:
          'La incorporación ofrece cinco addons opcionales — devcontainer, Dailybot, dependency-upgrade, design-system y AI Diff Reviewer — que aceptas solo cuando encajan. Un repo es plenamente conforme con cero addons. Usa /skill-create y /agent-create (la sub-skill author) para hacer crecer skills, agentes y comandos más allá de la línea base.',
      },
      {
        title: 'Planifica y ejecuta',
        description:
          'Genera Deep Work Plans con /dwp-create y ejecútalos con /dwp-execute; luego usa /dwp-status, /dwp-refine, /dwp-resume y /dwp-verify a medida que avanza el trabajo. Cada plan lleva tareas numeradas, compuertas de validación y un protocolo de finalización — terminando con tres tareas finales obligatorias: una Revisión de Seguridad, un Descubrimiento de Skills y Agentes, y un Informe Ejecutivo.',
      },
      {
        title: 'Verifica la conformidad',
        description:
          'Ejecuta /dwp-verify para obtener un informe objetivo de aprobado/reprobado contra la especificación. Confirma que AGENTS.md, docs/ (con contenido real, no stubs), .agents/ (con delegadores dwp-* ligeros y un catálogo que coincida con el disco), .dwp/ y tmp/ están en su lugar — nada es de plantilla, todo está razonado para este repositorio.',
        commands: ['/dwp-verify'],
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

  trustPage: {
    meta: {
      title: 'Confianza y seguridad',
      description:
        'Por qué Deep Work Plan es seguro de adoptar: código abierto y MIT, Markdown-first sin llamadas de red ni telemetría, no destructivo por diseño, con instalaciones verificables y una política clara de divulgación de vulnerabilidades.',
    },
    eyebrow: 'Confianza y seguridad',
    title: 'Confianza y seguridad',
    intro:
      'Nadie debería instalar una skill en la que no puede confiar. Deep Work Plan está diseñado para ser verificado, no tomado con fe ciega: código abierto, Markdown-first, no destructivo y comprobable antes de ejecutarlo. Esta página explica claramente qué hace, qué no hace y cómo confirmar ambas cosas.',
    pillarsTitle: 'En qué confías',
    pillars: [
      {
        title: 'Código abierto y licencia MIT',
        body: 'El sitio web y la skill son públicos y se pueden revisar línea por línea. Puedes leer cada línea antes de ejecutarla y comparar cualquier copia con el código fuente en una versión etiquetada.',
      },
      {
        title: 'Markdown-first — sin red, sin telemetría',
        body: 'La skill no tiene CLI, ni API HTTP ni flujo de autenticación. No realiza llamadas de red ni envía telemetría; su único helper local lee metadatos de git y del entorno. Nada de tu repositorio sale de tu máquina.',
      },
      {
        title: 'No destructivo por diseño',
        body: 'Lo único relevante para la seguridad que hace la skill es modificar tu repositorio — y reconcilia en lugar de sobreescribir. Detecta lo que existe, propone un plan y pregunta antes de reemplazar cualquier cosa. El resultado de los planes vive en un directorio .dwp/ ignorado por git.',
      },
      {
        title: 'No toca secretos',
        body: 'La metodología nunca confirma secretos y mantiene el estado de trabajo fuera del control de versiones. La incorporación añade al .gitignore en lugar de reescribirlo, y cada cambio está pensado para revisarse en diffs pequeños y legibles.',
      },
      {
        title: 'Procedencia verificable',
        body: 'Cada versión publica checksums de la skill distribuida, de modo que puedes confirmar que una copia descargada coincide con lo publicado antes de confiar en ella.',
      },
    ],
    verifyTitle: 'Verifica antes de ejecutar',
    verifyIntro:
      'Trata la skill como no confiable hasta haberla comprobado. Cada versión adjunta un archivo SHA256SUMS que cubre la skill distribuida. Descárgalo para la versión que vayas a instalar y verifica que tu copia coincide — una salida distinta de cero significa que un archivo no coincide y debes detenerte.',
    codeLabel: 'shell',
    verifyNote:
      'Las versiones tienen checksums, no firmas criptográficas — las firmas (cosign o GPG del mantenedor) son el próximo paso documentado, no una garantía actual. Dado que todo es abierto, también puedes comparar cualquier archivo con el repositorio en su etiqueta.',
    disclosureTitle: 'Reportar una vulnerabilidad',
    disclosureBody:
      '¿Encontraste un problema de seguridad? Repórtalo de forma privada a través del sistema de reporte privado de vulnerabilidades de GitHub en el repositorio correspondiente — la skill o el sitio web (consulta las políticas de seguridad enlazadas abajo) — en lugar de abrir un issue público, lo cual expondría el problema antes de que exista una corrección.',
    resourcesTitle: 'Recursos de confianza',
    linkManifest: 'Manifiesto de confianza legible por máquina',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Política de seguridad del sitio web',
    linkSkillPolicy: 'Política de seguridad y modelo de amenazas de la skill',
    limitationsTitle: 'Limitaciones honestas',
    limitations: [
      'Las versiones tienen checksums, pero aún no están firmadas criptográficamente — las firmas están planificadas, no implementadas.',
      'Deep Work Plan ejecuta un agente de programación autónomo en tu repositorio. Revisa el plan propuesto y sus diffs; la metodología está diseñada para esa revisión, no para reemplazarla.',
      'Las afirmaciones de confianza aquí describen solo las fuentes oficiales. Una copia modificada o de terceros que se haya apartado de los repositorios no tiene ninguna de estas garantías — verifícala primero.',
    ],
    ctaTitle: 'Adóptalo con confianza',
    ctaBody:
      'Lee la metodología y la especificación, apunta un agente al endpoint de init y verifica la instalación antes de ejecutarla.',
    ctaPrimary: 'Leer la metodología',
    ctaSecondary: 'Adopción (init)',
  },

  developersPage: {
    meta: {
      title:
        'Desarrolladores — API para agentes, servidor MCP y documentación de Deep Work Plan',
      description:
        'La superficie para agentes de Deep Work Plan: API de solo lectura sin autenticación, OpenAPI, servidor MCP en /api/mcp y Markdown por página en 17 idiomas.',
    },
    eyebrow: 'Superficie para agentes y desarrolladores',
    title: 'Deep Work Plan para desarrolladores y agentes de IA',
    intro:
      'deepworkplan.com publica una superficie legible por máquina junto a sus páginas: una API para agentes descrita con OpenAPI, un servidor MCP sin estado, espejos nativos en Markdown de cada página en 17 idiomas y la skill DWP instalable. Todo lo que hay en esta página está activo, es público y gratuito — no hay nada que registrar.',
    accessTitle: 'Sin autenticación por diseño',
    accessIntro:
      'No hay claves de API que generar, ningún baile de OAuth y ningún sandbox separado de producción — la propia superficie de producción es el sandbox. Es una propiedad deliberada de la metodología: los agentes no pueden rellenar formularios de "contactar con ventas", así que el sitio nunca pide uno.',
    accessPoints: [
      {
        title: 'Solo lectura',
        body: 'Cada operación es un GET seguro y almacenable en caché — excepto el endpoint MCP, que es POST. No hay operaciones de escritura, subidas ni cambios de estado en ninguna parte.',
      },
      {
        title: 'Sin claves de API',
        body: 'Sin registro, sin tokens, sin niveles de límite de peticiones. El acceso anónimo es el contrato documentado, declarado en /auth.md y en los stubs de descubrimiento de OAuth.',
      },
      {
        title: 'Gratis y de código abierto',
        body: 'El contenido del sitio y la skill DWP tienen licencia MIT. Úsalos en trabajo comercial y no comercial sin pedir permiso.',
      },
      {
        title: 'Pensado para las máquinas',
        body: 'Errores JSON estructurados en las rutas /api, cuerpos de recuperación 404 en Markdown, catálogo de API RFC 9727 y un manifiesto de capacidades ARD — construido para el consumo de agentes.',
      },
    ],
    endpointsTitle: 'Endpoints',
    endpointsIntro:
      'Los endpoints centrales de la API para agentes. La especificación completa y tipada — cada operación, parámetro y esquema de respuesta — vive en el documento OpenAPI.',
    endpointsNote:
      'Las rutas /api/* desconocidas devuelven un error JSON estructurado con una pista de resolución, nunca una página de error HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Especificación OpenAPI 3.1 de toda la API para agentes.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Índice curado de guía para LLM — el punto de entrada recomendado para agentes.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'El prompt canónico de adopción de DWP (hace que cualquier repositorio sea AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Cualquier página como Markdown fuente nativo — en los 17 idiomas (p. ej. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Marcador de estado estático con enlaces a la especificación y a este portal.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Servidor MCP (Streamable HTTP, sin estado): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifiesto de capacidades ARD — el agentmap declarado en robots.txt.',
      },
    ],
    mcpTitle: 'Servidor MCP',
    mcpIntro:
      'Un servidor de Model Context Protocol sin estado sobre Streamable HTTP. Tres herramientas de solo lectura: get_init_prompt, list_site_sections y read_page. Se admiten las versiones de protocolo 2025-03-26 y 2025-06-18; no se requiere ninguna sesión.',
    mcpCodeLabel: 'Terminal — JSON-RPC sobre HTTP',
    mcpNote:
      'El manifiesto MCP vive en /.well-known/mcp.json y la tarjeta del servidor en /.well-known/mcp/server-card.json. Claude, ChatGPT y cualquier cliente MCP pueden llamar a estas herramientas de forma nativa.',
    markdownTitle: 'Markdown para agentes',
    markdownIntro:
      'Cada página renderizada se publica como Markdown fuente nativo — no como una conversión de HTML. Solicita Markdown explícitamente con un sufijo de URL o mediante negociación de contenido HTTP en cualquier página.',
    markdownCodeLabel: 'Terminal — negociación de contenido',
    markdownNote:
      'La negociación de contenido devuelve el mismo Markdown fuente desde el que el sitio renderiza, en el idioma de la URL que solicites.',
    cliTitle: 'Instala el kit',
    cliIntro:
      'La ruta de instalación oficial de la skill Deep Work Plan — el mismo comando que el endpoint /init da a los agentes. Funciona con cualquier agente de programación compatible con skills (Claude Code, Cursor, Codex, Gemini y otros).',
    cliCodeLabel: 'Terminal — CLI de skills',
    cliNote:
      'La skill se vendoriza en .agents/skills/deepworkplan/ dentro de tu repositorio, de modo que cada agente que toca el repositorio comparte la misma metodología.',
    resourcesTitle: 'Recursos legibles por máquina',
    resources: [
      {
        label: 'Especificación OpenAPI (/openapi.json)',
        href: '/openapi.json',
      },
      {
        label: 'Declaración de acceso y autenticación de agentes (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Catálogo de API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifiesto MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Contacto de seguridad (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Descriptor del repositorio del sitio (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Apunta un agente a ello',
    ctaBody:
      'La ruta más rápida sigue siendo una línea: entrega el prompt de /init a cualquier agente de programación y este instala la skill, incorpora tu repositorio y empieza a terminar deep work.',
    ctaPrimary: 'Abrir el prompt de /init',
    ctaSecondary: 'Leer la metodología',
  },

  privacyPage: {
    meta: {
      title: 'Privacidad — Deep Work Plan',
      description:
        'La política de privacidad de deepworkplan.com: sitio estático sin cuentas ni publicidad, analítica sin cookies y qué recoge el formulario de contacto.',
    },
    eyebrow: 'Política de privacidad',
    title: 'Privacidad en deepworkplan.com',
    intro:
      'Deep Work Plan es un sitio estático de documentación y metodología. Esta página explica, de forma llana y completa, qué datos toca el sitio cuando lo visitas: no hay sistema de cuentas, ni publicidad, ni rastreo entre sitios en ninguna parte.',
    lastUpdated: '8 de septiembre de 2026',
    sections: [
      {
        heading: 'Qué es el sitio',
        body: 'deepworkplan.com es una colección de páginas estáticas servidas a través de una CDN. No hay inicio de sesión, ni base de datos de usuarios, ni forma de que el sitio almacene perfiles personales. El contenido se desarrolla en repositorios públicos de GitHub bajo la organización DailybotHQ, y todo lo que lees aquí se sirve exactamente como se construyó.',
      },
      {
        heading: 'Analítica',
        body: 'El sitio usa Umami, un servicio de analítica sin cookies y orientado a la privacidad, para contar las visitas de páginas de forma agregada. Umami no establece cookies de rastreo ni construye perfiles entre sitios. Como los crawlers de IA no ejecutan JavaScript, una función edge del lado del servidor también registra el user agent y la ruta de las visitas de bots automatizados como eventos anónimos de analítica — esto identifica el software del crawler (por ejemplo "GPTBot visitó /init"), nunca a un visitante humano.',
      },
      {
        heading: 'Cookies y almacenamiento local',
        body: 'El sitio no establece cookies de rastreo. Lo único que se guarda en tu navegador es una preferencia de tema (modo claro u oscuro) en localStorage, que nunca sale de tu dispositivo ni se transmite a ninguna parte. Si borras el almacenamiento del navegador, el sitio simplemente vuelve al tema predeterminado de tu sistema.',
      },
      {
        heading: 'Servicios de terceros',
        body: 'El hosting y la entrega funcionan sobre Cloudflare Pages, que procesa registros de peticiones y direcciones IP en el edge como parte de operar la CDN y bloquear abusos, bajo la propia política de privacidad de Cloudflare. La analítica agregada funciona sobre Umami (cloud.umami.is). Si envías el formulario de contacto de forma voluntaria, tus respuestas pasan por Google Forms hacia nuestro equipo — ese es el único lugar donde se recoge la información que escribes, y se usa únicamente para responderte.',
      },
      {
        heading: 'Lo que no hacemos',
        body: 'No vendemos ni compartimos datos personales, no ejecutamos publicidad ni píxeles de remarketing, no tomamos huellas de navegadores ni enviamos correo de marketing. El sitio no tiene suscripción a boletín ni telemetría más allá de los conteos agregados y sin cookies descritos arriba.',
      },
      {
        heading: 'Tus opciones',
        body: 'Como la analítica aquí es agregada y sin cookies, no hay ningún perfil personal que exportar o eliminar. Puedes bloquear el script de analítica con cualquier bloqueador de contenido sin afectar el funcionamiento del sitio. Si enviaste el formulario de contacto y quieres que se elimine tu mensaje, escribe a la dirección de contacto de abajo y lo eliminaremos.',
      },
      {
        heading: 'Cambios en esta política',
        body: 'Si esta política cambia de forma sustancial, la fecha de actualización de la parte superior de esta página cambia con ella, y las ediciones sustanciales se confirman en el repositorio público del sitio web, donde cualquiera puede revisar el historial.',
      },
    ],
    contactTitle: 'Contacto y seguridad',
    contactBody:
      'Para preguntas de privacidad escribe a security@dailybot.com. Para reportar una vulnerabilidad de seguridad, prefiere el reporte privado de vulnerabilidades de GitHub para los repositorios del sitio web y de la skill — consulta /.well-known/security.txt para las direcciones exactas.',
  },
};
