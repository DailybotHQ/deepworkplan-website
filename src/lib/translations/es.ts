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
    faq: 'FAQ',
    compare: 'Comparativa',
    changelog: 'Changelog',
    resources: 'Recursos',
    resourcesDesc: 'Ejemplos, confianza, FAQ y comparativa',
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
  changelogPage: {
    meta: {
      title: 'Cambios de Deep Work Plan',
      description:
        'Actualizaciones importantes de la skill, la metodología y el arnés portátil de agentes de Deep Work Plan.',
    },
    eyebrow: 'Cambios',
    title: 'El trabajo detrás del método',
    intro:
      'Una línea de tiempo basada en fuentes sobre las versiones y decisiones de diseño que hacen fiable a Deep Work Plan para el trabajo de largo aliento.',
    viewDetail: 'Leer la actualización',
    backToIndex: 'Todos los cambios',
    sourceLabel: 'Fuentes',
    featuredLabel: 'Lanzamiento destacado',
    relatedTitle: 'Cambios relacionados',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Todos los derechos reservados.',
    poweredBy: 'Desarrollado por',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Nuevo · Eficiente en tokens',
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
      learn: 'Aprender',
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
        'Deep Work Plan convierte cualquier repositorio en un entorno estructurado — contexto, guardarraíles y un plan duradero — donde cualquier agente de código ejecuta con precisión y eficiencia y completa el trabajo de largo alcance.',
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
      scrollCta: 'Ve cómo funciona',
    },
    pitch: {
      kicker: 'El problema y la respuesta',
      problem:
        'Un agente de programación rinde de maravilla en tareas cortas. Pero en una misión de largo alcance — una migración, un subsistema nuevo, una refactorización a escala — la deriva llega: el contexto se llena, las decisiones se olvidan y las tareas de varias horas se quedan a medio camino.',
      answer:
        'Deep Work Plan responde con desarrollo guiado por especificación: un plan duradero, tareas atómicas y puertas de validación que el agente debe pasar. «Hecho» deja de ser una sensación — se convierte en evidencia verificable y revisable.',
      efficiency:
        'Y como el contexto es el recurso más escaso de tu agente, el harness está diseñado para la eficiencia de tokens: las instrucciones se cargan progresivamente, la validación solo toca lo que cambió y cada tarea aprende localmente — así el trabajo de largo alcance se mantiene asequible. El plan mismo escala igual: un plan Lite para una corrección acotada, un plan Full para el trabajo que se extiende por horas — el formato siempre sigue el alcance del trabajo, y no al revés.',
      illustrationAlt:
        'Un díptico grabado: un barco a la deriva en la niebla junto a rocas escarpadas a un lado, y el mismo barco firme sobre un rumbo trazado hacia una baliza de puerto al otro.',
    },
    story: {
      act1: {
        kicker: 'El método · Acto I',
        lead: 'Tú decides qué significa «hecho» y dónde están los límites. El plan lleva tu intención; los agentes ponen las horas — sin supervisión constante, sin corregir cada veinte minutos.',
        deepLinkLabel: 'Lee la metodología',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'El método · Acto II',
        lead: 'Las tareas largas llenan el contexto de cualquier modelo. Los detalles se pierden y el agente se desvía. Un plan escrito — tareas atómicas, puertas de validación, estado reanudable — es aquello a lo que vuelve, vuelta tras vuelta.',
        deepLinkLabel: 'Ve el bucle principal',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'El método · Acto III',
        lead: 'Cada tarea nombra sus criterios de aceptación y las comprobaciones que deben pasar. El agente no puede sentirse terminado — tiene que pasar, o la tarea sigue abierta.',
        deepLinkLabel: 'Lee la especificación',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'El método · Acto IV',
        lead: 'El contexto, las herramientas, los guardarraíles y el estado viven en tu repositorio como archivos planos que cualquier agente puede leer. Sin dependencias, sin cerebro externo — sobrevive a los reinicios de contexto.',
        deepLinkLabel: 'Ve qué genera la incorporación',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'El método · Acto V',
        lead: 'El contexto es el recurso más escaso de tu agente. El harness carga progresivamente, valida lo que cambió y aprende tarea a tarea — así el plan se paga por sí mismo.',
        deepLinkLabel: 'Lee la metodología',
        deepLinkHref: '/methodology',
      },
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
            'Conecta el skill de Deep Work Plan y crea la carpeta .dwp/ ignorada por git para planes y borradores, instala la revisión local obligatoria de AI Diff Reviewer y luego, de forma opcional, añade complementos como soporte de devcontainer.',
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
      'Todo lo que necesitas para ejecutar la metodología: la skill y sus sub-skills, comandos de barra, adaptadores de agente, presets de incorporación, la revisión local obligatoria y los addons opcionales, y ejemplos resueltos.',
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
          'Capacidades que el flujo de onboard suma a un repo: la revisión local obligatoria de AI Diff Reviewer más cuatro addons opcionales que nunca forman parte de la base AI-first.',
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
          'Usa /skill-create y /agent-create (la sub-skill author) para hacer crecer skills, agentes y comandos adaptados a tu stack. La incorporación instala la revisión local obligatoria de AI Diff Reviewer (su gate de CI sigue siendo opcional) y ofrece cuatro addons opcionales — devcontainer, Dailybot, dependency-upgrade y design-system — que aceptas solo cuando encajan.',
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
        title: 'Revisión local y addons opcionales',
        description:
          'La incorporación instala la revisión local obligatoria de AI Diff Reviewer (su gate de CI sigue siendo opcional) y ofrece cuatro addons opcionales — devcontainer, Dailybot, dependency-upgrade y design-system — que aceptas solo cuando encajan. Un repo es plenamente conforme con cero addons opcionales. Usa /skill-create y /agent-create (la sub-skill author) para hacer crecer skills, agentes y comandos más allá de la línea base.',
      },
      {
        title: 'Planifica y ejecuta',
        description:
          'Genera Deep Work Plans con /dwp-create y ejecútalos con /dwp-execute; luego usa /dwp-status, /dwp-refine, /dwp-resume y /dwp-verify a medida que avanza el trabajo. Cada plan lleva tareas numeradas, compuertas de validación y un protocolo de finalización — y se cierra con un único Final Review obligatorio (pase de seguridad, validación del estado final y reconciliación de skills). El Executive Report sigue disponible a petición.',
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

  faqPage: {
    meta: {
      title: 'Preguntas frecuentes — Deep Work Plan',
      description:
        'Respuestas a las preguntas sobre Deep Work Plan: qué hace, cómo funcionan las puertas de validación y la reanudación, cómo se compara y cómo adoptarlo.',
    },
    eyebrow: 'FAQ',
    title: 'Preguntas frecuentes',
    intro:
      'Respuestas breves a lo que más se pregunta sobre Deep Work Plan, cada una con un enlace a la página que entra en más detalle.',
    tocTitle: 'En esta página',
    groups: [
      {
        id: 'what',
        title: 'Qué es Deep Work Plan',
        items: [
          {
            id: 'what-is-it',
            question: '¿Qué hace Deep Work Plan en concreto?',
            answer:
              'Deep Work Plan convierte un repositorio en un entorno estructurado donde un agente de código puede ejecutar trabajo largo de forma fiable. Se instala como una skill de agente, incorpora el repositorio una vez (un índice `AGENTS.md`, un árbol `docs/`, un kit `.agents/` de skills y comandos, un área de salida `.dwp/` ignorada por git) y, a partir de ahí, cualquier objetivo se convierte en un plan: tareas atómicas, cada una con criterios de aceptación y una puerta de validación, ejecutadas de una en una, con commit a medida que pasan y reanudables desde el disco por cualquier agente. El plan se cierra con un Final Review que audita la seguridad y valida el estado final. La metodología tiene licencia MIT y funciona con cualquier agente de código que lea un repositorio.',
            linkLabel: 'Leer la metodología',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: '¿Para quién es?',
            answer:
              'Desarrolladores y equipos que entregan trabajo real de varios pasos a agentes de código y quieren que se termine. Encaja cuando una tarea abarca más de una sesión, más de una familia de archivos o más de un agente; cuando un compañero debe poder continuar donde un agente se detuvo; o cuando «hecho» debe significar «validado», no «el agente lo dice». Una corrección de una línea no necesita un plan, y la metodología lo dice: su regla de rigor proporcional recomienda en su lugar un objetivo inline, criterios y una puerta.',
            linkLabel: 'Inicio rápido',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: '¿Cuál es la diferencia entre un plan Lite y uno Full?',
            answer:
              'Una decisión de representación, no un compromiso de rigor. Todo plan empieza como una carpeta Lite: un README compacto con registros de tareas anclados que ya es ejecutable, no un borrador parcial. `create` solo se expande a archivos de tarea Full cuando el detalle de instrucciones, las dependencias o los contratos de una tarea no caben en un registro compacto y revisable; una solicitud explícita de cualquiera de los dos formatos se respeta, y un plan Lite puede promoverse a Full más adelante sin perder el trabajo ya completado. Ambos formatos llevan los mismos criterios de aceptación, puertas de validación, evidencias y el Final Review obligatorio.',
            linkLabel: 'Leer la metodología',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: '¿Es una herramienta, un framework o una metodología?',
            answer:
              'Una metodología empaquetada como una skill instalable. No hay servidor, ni cuenta, ni formato propietario, ni runtime más allá del agente de código que ya usas. Lo que se instala son instrucciones que el agente lee, un pequeño conjunto de scripts de shell para la detección de contexto y la comprobación de conformidad, y las convenciones que tu repositorio adopta. Todo lo que el plan produce es Markdown y JSON en tu repositorio, legible sin ninguna herramienta.',
            linkLabel: 'Leer la especificación',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: '¿Con qué agentes de código funciona?',
            answer:
              'Con cualquier agente que lea archivos del repositorio. La skill sigue el estándar abierto Agent Skills y la convención `AGENTS.md`, de modo que Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot y otros la reconocen a través de su carga normal de skills e instrucciones. La propia evaluación de la metodología muestra un plan iniciado por el agente de un proveedor y reanudado por el de otro, en ambas direcciones. La cobertura de instalación y la evidencia de comportamiento se listan por agente en la matriz de compatibilidad, y ambas nunca se confunden.',
            linkLabel: 'Explorar el kit',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: '¿Cómo lo uso?',
            answer:
              'Tres pasos. Primero, instala la skill Deep Work Plan en tu agente de código — la vía más rápida es `npx skills add DailybotHQ/deepworkplan-skill` (o clona el repositorio de la skill y ejecuta `./setup.sh`). Segundo, incorpora el repositorio una vez para que el agente adapte `AGENTS.md`, `docs/`, el kit `.agents/` y un área `.dwp/` ignorada por git a tu stack: apúntalo a https://deepworkplan.com/init.md, o ejecuta `/deepworkplan-onboard`. Tercero, planifica y ejecuta el trabajo con los comandos ligeros: `/dwp-create <goal>` construye un plan; `/dwp-execute` lo ejecuta tarea por tarea frente a cada puerta; `/dwp-refine` edita un plan en curso (alcance, tareas, o promover un plan Lite a Full); `/dwp-resume` continúa tras una interrupción; `/dwp-status` informa del progreso sin ejecutar; `/dwp-verify` produce un informe objetivo de conformidad. Los agentes que interceptan `/` suelen usar `#` en su lugar (por ejemplo `#dwp-execute`). El endpoint de adopción y el inicio rápido recorren el mismo camino con más detalle.',
            linkLabel: 'Inicio rápido',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: '¿Qué se instala exactamente y dónde?',
            answer:
              'La skill del agente se instala donde tu agente carga las skills de usuario o de proyecto. Después, la incorporación adapta el propio repositorio: crea o concilia `AGENTS.md`, `docs/`, `.agents/` y el área `.dwp/` ignorada por git. La skill enseña el método al agente; el repositorio conserva el contexto, el kit y la evidencia del plan que necesitan los demás agentes para continuar.',
            linkLabel: 'Ver el flujo de adopción',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: '¿Deep Work Plan necesita Git?',
            answer:
              'Git se recomienda en los repositorios porque su historial forma parte de la superficie de recuperación y revisión, pero la metodología también puede ejecutarse en un workspace de agente sin un repositorio Git. En ese caso, la capa de estado legible por máquina, incluidos los puntos de control y registros de puertas en `state.json`, es obligatoria para que la recuperación no dependa del historial del chat.',
            linkLabel: 'Leer sobre los arquetipos de repositorio',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question:
              '¿Cuál es la diferencia entre una skill, un plan y una especificación de producto?',
            answer:
              'Una skill describe cómo ejecuta un agente un procedimiento repetible. Un plan de DWP describe un cambio concreto mediante alcance, criterios de aceptación, puertas de validación y evidencias. Una especificación de producto describe el comportamiento actual del producto y evoluciona mediante deltas después de cada implementación; las skills y los planes también son especificaciones, pero describen procedimientos y cambios en lugar de mantener ese contrato canónico del producto.',
            linkLabel: 'Leer la especificación',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'Cómo se ejecuta un plan',
        items: [
          {
            id: 'gates',
            question:
              '¿Cómo se implementan las puertas de validación? ¿Necesitan aprobación humana?',
            answer:
              'Son aserciones ejecutables que el propio agente ejecuta. La aprobación humana enmarca la ejecución: una persona aprueba el plan antes de la ejecución y revisa el diff final a la hora del pull request; la ejecución intermedia es autónoma. Cada tarea nombra comandos concretos, normalmente el propio control de calidad del repositorio, seleccionados de la superficie tocada de la tarea: las pruebas del comportamiento cambiado y de sus consumidores, ampliando a la suite completa cuando el cambio es compartido o no puede acotarse. Una tarea se marca como hecha solo cuando esos comandos terminan con éxito, y las tareas que cambian comportamiento deben ampliar las pruebas. Ante un fallo, la tarea se marca como bloqueada y el agente se detiene.',
            linkLabel: 'El bucle principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              '¿Cómo evita el plan quedar obsoleto cuando la gente cambia el código entre ejecuciones?',
            answer:
              'En tres frentes. Las tareas se escriben como comportamiento, no como ediciones: un criterio de aceptación dice qué debe hacer el sistema, así que un archivo renombrado o una implementación sustituida no lo invalida. Cada puerta se vuelve a ejecutar contra el repositorio tal como está ahora, de modo que una suposición rota falla de forma ruidosa en la siguiente ejecución en lugar de derivar en silencio, y ese fallo es la señal para refinar. Y mantener la documentación sincronizada es parte del trabajo: una tarea que cambia comportamiento también actualiza la documentación y el kit orientado a agentes que la describen, dentro de su propia puerta. Cada ejecución debería dejar el repositorio más preparado para agentes de lo que lo encontró.',
            linkLabel: 'Leer la metodología',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              '¿Puedo cambiar el plan a mitad de ejecución sin perder el trabajo completado?',
            answer:
              'Sí; refinar un plan parcialmente ejecutado es un movimiento de primera clase. Las definiciones de tareas y el estado de ejecución se mantienen separados: el plan es una lista de verificación en disco más un pequeño archivo de estado, así que lo hecho queda registrado con independencia del texto de la tarea. Cuando una tarea resulta estar equivocada, el agente la marca como bloqueada y se detiene en lugar de forzar el paso. Entonces tú editas, reordenas, divides o descartas las tareas que no se han ejecutado, mientras las tareas completadas siguen completadas. La reanudación reconstruye el estado desde el disco y el repositorio real y vuelve a ejecutar las puertas que importan, así que nada de lo que cambió por debajo pasa desapercibido.',
            linkLabel: 'El bucle principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              '¿Sigue comprobando el trabajo contra el plan, o el plan es solo algo del principio?',
            answer:
              'El plan es una comprobación continua. El agente trabaja una tarea pequeña cada vez y debe validar antes de continuar, así que puede desviarse un paso, no tres. Cada tarea lleva criterios de aceptación más los comandos exactos que los demuestran, y el progreso se escribe en el repositorio a medida que avanza, con un estado por tarea, de modo que la deriva se vuelve visible para ti, para la siguiente sesión y para el siguiente agente. Un plan no está terminado hasta que todo valida, incluido el Final Review. La advertencia honesta: la metodología no puede impedir que un agente escriba de entrada un criterio de aceptación débil; hace que la deriva sea ruidosa en lugar de silenciosa.',
            linkLabel: 'El bucle principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              '¿El plan se genera una vez y se mantiene a mano, o evoluciona con el código?',
            answer:
              'Ninguna de las dos. Se genera una vez a partir de un objetivo y luego se mantiene como parte del trabajo. El plan deliberadamente no se reescribe a partir de los diffs de código, porque una especificación que persigue al código se convierte en un espejo rezagado, que es la deriva que la metodología existe para eliminar. Evoluciona a propósito: las puertas se vuelven a ejecutar contra el repositorio actual, una puerta que falla desencadena un refinamiento, y el agente realiza ese refinamiento durante la ejecución mientras tú apruebas por adelantado y revisas al final. La documentación y las pruebas evolucionan junto con el código por construcción, porque actualizarlas está dentro de la puerta de cada tarea.',
            linkLabel: 'Leer la metodología',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: '¿Qué pasa si la sesión muere a mitad de camino?',
            answer:
              'El progreso vive en el disco, no en el chat. Las casillas del README, el registro de cada tarea, un índice de trabajo acotado y un archivo de estado legible por máquina se actualizan en cada límite de tarea, y el archivo de estado registra un punto de control antes de cualquier pausa planificada. Una sesión nueva, o un agente distinto, lee ese índice compacto, lo concilia con el repositorio y el historial de git, y continúa en la primera tarea incompleta sin rehacer el trabajo terminado. Incluso una creación de plan interrumpida es recuperable: la identidad del plan y su lista de tareas prevista se escriben antes que cualquier archivo de tarea, así que un plan creado a medias puede completarse o descartarse en lugar de adivinarse.',
            linkLabel: 'El bucle principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: '¿Qué es el Final Review?',
            answer:
              'La única tarea de cierre obligatoria de todo plan. En orden: un pase de seguridad sobre el conjunto completo de cambios acumulados del plan, incluida una revisión local obligatoria del diff por la skill AI Diff Reviewer, con hallazgos críticos que bloquean la finalización hasta que se corrigen o se aceptan explícitamente; la validación del estado final, es decir, las suites completas aplicables de pruebas, lint, comprobación de tipos y formato del repositorio sobre el código final; y una reconciliación de las decisiones de skills que registró cada tarea. El agente luego informa de entregables, evidencia y limitaciones, y ofrece un Reporte Ejecutivo una sola vez, generándolo solo si lo pides.',
            linkLabel: 'La especificación',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: '¿Qué ocurre cuando falla una puerta de validación?',
            answer:
              'La tarea queda registrada como bloqueada y el agente se detiene antes de declarar que está terminada. Puedes revisar la evidencia, corregir el código o refinar la tarea y después reanudarla; un comando fallido es una señal para resolver la discrepancia, no un permiso para debilitar la puerta.',
            linkLabel: 'Leer el protocolo del agente',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question:
              '¿Puede un plan ejecutarse sin supervisión durante la noche o en CI?',
            answer:
              'Sí, siempre que el plan se haya aprobado de antemano, incluya la capa de estado necesaria y otorgue al agente una autoridad acotada. Una ejecución sin supervisión debe detenerse y registrar un bloqueo cuando la realidad diverge, falla una puerta fuera del alcance de reparación previsto o se necesita una aprobación o credencial nueva.',
            linkLabel: 'Leer el protocolo sin supervisión',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Cómo se compara',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              '¿En qué se diferencia de las herramientas guiadas por especificación como Spec Kit, OpenSpec o Kiro?',
            answer:
              'Resuelven problemas adyacentes. Las herramientas guiadas por especificación son excelentes para capturar qué debe cambiar: especificaciones, requisitos y propuestas de cambio con una forma repetible. Deep Work Plan trata de cómo un agente ejecuta durante horas sin derivar: el harness incorporado en el repositorio, puertas de validación por tarea seleccionadas de la superficie tocada, estado reanudable en disco, un Final Review obligatorio con pase de seguridad y un comprobador de conformidad para el propio repositorio. Ambas cosas pueden combinarse, con una especificación o propuesta de cambio alimentando un plan. El playbook de Claude sobre el SDLC nativo de IA plantea una idea relacionada con artefactos duraderos entre Planificar, Diseñar, Construir, Probar, Desplegar y Mantener; DWP cubre el harness del repositorio y el bucle de ejecución, mientras que la evaluación continua en producción sigue siendo una práctica complementaria. La página de comparación pone las capacidades una al lado de la otra, en los términos de cada herramienta.',
            linkLabel: 'Ver la comparativa',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              '¿En qué se diferencia de herramientas de flujo de trabajo para agentes como BMAD, Superpowers, Get Shit Done o Gentle-AI?',
            answer:
              'Los frameworks de flujo de trabajo para agentes como BMAD, Superpowers y Get Shit Done aportan estilos de trabajo sólidos: roles, principios, pasos de prueba primero, hábitos de verificación. Gentle-AI pertenece a una categoría vecina como configurador del ecosistema de agentes: equipa los agentes de codificación que ya usas con memoria persistente entre sesiones (Engram), skills curadas, personas, servidores MCP, Spec-Driven Development opcional y revisión basada en evidencias opcional (Receipt-Driven Development), escribiendo en los directorios de configuración de cada agente. Deep Work Plan se diferencia de ambos: se centra en lo que permanece en el repositorio y en lo que puede comprobarse — un harness que cualquier agente lee sin contexto previo, archivos de tarea con criterios de aceptación y puertas, estado que sobrevive a una sesión, un comprobador de conformidad con un código de salida apto para CI y una medición publicada de cuántos bytes de instrucción carga cada flujo. Es agnóstico de la herramienta por construcción y no añade ningún servicio, proveedor ni secreto al bucle principal. Las capas pueden convivir: los frameworks y Gentle-AI dan forma a cómo trabaja el agente; Deep Work Plan hace que el trabajo largo sea duradero y comprobable dentro del repositorio. La página de comparación muestra dónde cada enfoque las tiene integradas, opcionales o fuera del alcance.',
            linkLabel: 'Ver la comparativa',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              '¿Por qué no usar simplemente el modo de planificación integrado de mi agente?',
            answer:
              'Los modos de planificación integrados son útiles y Deep Work Plan se construye sobre el mismo sustrato, la convención `AGENTS.md` y el estándar abierto Agent Skills. La diferencia está en dónde vive el plan y qué lo hace cumplir. Los planes nativos suelen vivir fuera del repositorio y caducan con la sesión; Deep Work Plan escribe el plan, su estado y su evidencia en el repositorio, de modo que otro agente o un compañero puede continuar el plan, y cada tarea lleva una puerta ejecutable y un registro escrito. Tú sigues usando el modo de planificación de tu agente para pensar; la metodología añade el bucle de ejecución duradero y verificable.',
            linkLabel: 'Ver la comparativa',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adoptarlo',
        items: [
          {
            id: 'install',
            question:
              '¿Qué escribe la incorporación en mi repositorio y toca algún archivo existente?',
            answer:
              'La incorporación no es destructiva: detecta un `AGENTS.md`, `docs/`, `.agents/` o `CLAUDE.md` existente, reconcilia en lugar de sobrescribir y pregunta antes de reemplazar cualquier cosa. Escribe el índice `AGENTS.md` con comandos reales, un árbol `docs/` razonado, documentación por módulo, el kit `.agents/` con comandos ligeros `dwp-*`, un área de salida `.dwp/` ignorada por git, un mapa de pruebas verificado y la revisión local de código obligatoria (la skill AI Diff Reviewer más una extensión de revisión adaptada al repositorio). Luego ejecuta una autocomprobación y el comprobador de conformidad para que veas lo que se produjo. Un repositorio incorporado con una versión anterior recibe una actualización dirigida que cambia solo lo que falta.',
            linkLabel: 'El endpoint de adopción',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              '¿Puedo usar la metodología principal sin instalar add-ons?',
            answer:
              'Sí. Los add-ons son capas opcionales y un repositorio sin ninguno cumple por completo con DWP. Los devcontainers, los informes de Dailybot, las actualizaciones de dependencias, el soporte de sistemas de diseño y la revisión opcional en CI solo se ofrecen cuando encajan con tu repositorio y los aceptas explícitamente.',
            linkLabel: 'Explorar los add-ons',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question:
              '¿Qué pasa si mi repositorio todavía no tiene tests ni linting?',
            answer:
              'DWP no considera que la ausencia de herramientas sea un pase libre. Durante la incorporación, el agente propone una configuración de validación adecuada para el stack, registra los comandos en la documentación del repositorio y los usa como objetivo para las futuras puertas; la propuesta queda visible para que la revises.',
            linkLabel: 'Leer el protocolo del agente',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: '¿Cuánto cuesta y cómo se mide la eficiencia?',
            answer:
              'La metodología y la skill tienen licencia MIT y son gratuitas; no hay servicio, clave de API ni telemetría en los flujos centrales. La eficiencia se reporta como el número de bytes de instrucción que carga cada flujo, medido por un script versionado junto con la skill y publicado en un registro de evaluación, con los aumentos reportados con la misma claridad que las disminuciones. No se reporta como porcentajes de tokens ni ahorros de costo, porque un inventario de bytes no establece eso; está planificada una evaluación pública preregistrada para medir los resultados como corresponde.',
            linkLabel: 'Confianza y divulgación',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: '¿Te queda alguna pregunta?',
      body: 'Abre una discusión o un issue en GitHub. Las preguntas que surgen repetidamente se añaden a esta página.',
      ctaLabel: 'Pregunta en GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan comparado con las alternativas',
      description:
        'Cómo se relaciona Deep Work Plan con herramientas guiadas por especificación, frameworks de agentes y modos de plan nativos, con fuentes y fecha de revisión.',
    },
    eyebrow: 'Comparativa',
    title: 'Deep Work Plan y las alternativas',
    intro:
      'Elige Deep Work Plan cuando el trabajo de largo alcance con agentes deba seguir siendo duradero, portable y verificable. Esta guía responde las dudas que aparecen al comparar DWP con otras alternativas y aclara sus diferencias: DWP pone el harness, el plan, el estado y la evidencia en tu repositorio para que cualquier agente pueda continuar el trabajo.',
    howToRead: {
      title: 'Cómo leer esta página',
      body: 'Tres valores describen cada capacidad. Indican dónde vive una capacidad en una herramienta, no qué tan buena es la herramienta. Una aclaración importante: las skills y los planes de DWP son especificaciones de procedimientos y cambios; la fila de especificaciones vivas del producto pregunta si una herramienta mantiene una descripción canónica del comportamiento actual del producto y fusiona deltas en ella.',
      values: {
        builtIn: 'Integrado',
        optional: 'Opcional o mediante extensión',
        notInScope: 'Fuera del alcance',
      },
    },
    reviewedOnLabel: 'Última revisión',
    alternativesTitle: 'Las alternativas, en sus propios términos',
    officialSiteLabel: 'Sitio oficial',
    categories: {
      methodology: 'Metodología',
      sdd: 'Herramientas de desarrollo guiado por especificación',
      agentFramework: 'Frameworks de flujo de trabajo para agentes',
      aiNativeSdlc: 'SDLC nativo de IA',
      vendorNative: 'Modos de plan nativos del proveedor',
    },
    matrix: {
      title: 'Matriz de capacidades',
      caption:
        'Dónde vive cada capacidad, por herramienta. Integrado, opcional o mediante extensión, o fuera del alcance. Revisado contra la documentación oficial.',
      capabilityColumn: 'Capacidad',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Funciona con cualquier agente de código',
        help: 'Los mismos archivos del repositorio impulsan a Claude Code, Codex, Cursor, Gemini CLI y otros.',
      },
      repoNativeHarness: {
        label: 'Escribe el harness del agente en el repositorio',
        help: 'Las instrucciones, la documentación, las skills y los comandos viven en el repositorio, no en la configuración de una sola herramienta.',
      },
      taskAcceptanceCriteria: {
        label: 'Criterios de aceptación por tarea',
        help: 'Cada tarea establece condiciones observables para considerarse hecha.',
      },
      perTaskGates: {
        label: 'Puerta de validación por tarea',
        help: 'Cada tarea nombra los comandos que deben pasar, seleccionados de lo que tocó.',
      },
      resumableState: {
        label: 'Estado reanudable en disco',
        help: 'El progreso sobrevive a un reinicio de sesión y otro agente o un compañero puede retomarlo.',
      },
      finalReview: {
        label: 'Revisión de cierre obligatoria con pase de seguridad',
        help: 'El plan no puede completarse sin una revisión de seguridad del conjunto completo de cambios y la validación del estado final.',
      },
      conformanceChecker: {
        label: 'Comprobador de conformidad ejecutable',
        help: 'Un script verifica el repositorio y sus planes contra el estándar, con un código de salida apto para CI.',
      },
      instructionBudgetLedger: {
        label: 'Medición publicada de la carga de instrucciones',
        help: 'Los bytes que carga cada flujo los mide un script versionado y se publican con sus límites.',
      },
      onboardingScaffold: {
        label: 'Incorporación que genera la documentación',
        help: 'Una primera ejecución escribe la documentación y el kit orientados a agentes del repositorio.',
      },
      brownfieldSpecs: {
        label: 'Especificaciones vivas del producto',
        help: 'Una especificación canónica describe el comportamiento actual del producto, acepta deltas de cambio y se actualiza cuando cada cambio se implementa.',
      },
      crossProjectMemory: {
        label: 'Memoria persistente del agente entre proyectos',
        help: 'La memoria acompaña al agente entre distintos repositorios y sesiones, no solo el estado en disco de un plan.',
      },
      roleBasedAgents: {
        label: 'Roles de agente especializados y diferenciados',
        help: 'Personas con nombre (como analista, arquitecto o revisor) se reparten el trabajo, en vez de que un único agente ejecute cada paso.',
      },
      nativeIdeProduct: {
        label: 'Es en sí mismo un IDE o editor',
        help: 'La herramienta es un entorno de desarrollo integrado por derecho propio, no una extensión de un agente de código ya existente.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Se instala como skill, incorpora el repositorio a un harness de agente y ejecuta planes de largo alcance con puertas de validación por tarea, estado en disco y un Final Review obligatorio.',
        audience:
          'Desarrolladores y equipos que entregan trabajo de varias sesiones a cualquier agente de código y necesitan que termine verificado.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Convierte una funcionalidad en una especificación ejecutable mediante una constitución, una especificación, un plan y una lista de tareas, impulsado por comandos de barra que se integran con más de cincuenta agentes de código, y puede comprobar que los artefactos siguen siendo consistentes entre sí antes de empezar la implementación.',
        audience:
          'Equipos que quieren un flujo repetible de especificar, planificar, tareas e implementar dentro del agente que ya usan.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captura cada cambio como una propuesta con especificaciones delta (añadidas, modificadas, eliminadas) y requisitos RFC 2119 con escenarios, y luego los archiva en especificaciones vivas, con un validador que comprueba la completitud de la propuesta y la cobertura de los escenarios antes de aceptar un cambio.',
        audience:
          'Equipos que trabajan sobre sistemas existentes y quieren que las especificaciones crezcan un cambio a la vez.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Un IDE agéntico y una CLI cuyas especificaciones avanzan de requisitos de estilo EARS al diseño y a las tareas, con archivos steering y hooks que se ejecutan en eventos del editor, y que puede generar especificaciones de una base de código existente para detectar vacíos en los requisitos antes de empezar el diseño.',
        audience:
          'Desarrolladores que quieren el desarrollo guiado por especificación integrado en su editor con herramientas respaldadas por AWS.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Un framework ágil de roles de agente especializados (análisis, producto, arquitectura, desarrollo, calidad) que produce briefs, requisitos, documentos de arquitectura y archivos de historias de usuario, con una Definición de Terminado que exige que cada historia sea revisada por un compañero de equipo o un agente revisor de IA antes de darla por concluida.',
        audience:
          'Equipos a los que les gustan las ceremonias basadas en roles y quieren un ciclo ágil completo para el trabajo de agentes.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Una biblioteca de skills y un flujo de trabajo para hacer lluvia de ideas, planificar en pasos pequeños de prueba primero, ejecutar con subagentes y revisar antes de completar, integrada con más agentes de código anfitriones que cualquier otra alternativa de esta página, además de una revisión en dos etapas con subagentes (cumplimiento de la especificación y luego calidad del código) en cada tarea.',
        audience:
          'Desarrolladores que quieren una ejecución disciplinada guiada por pruebas dentro de su agente de código.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'Un sistema de planificación con un directorio .planning, ids de requisitos, planes por fases, ejecución con contexto fresco y un pase de verificación contra los entregables observables por el usuario extraídos del resumen de cada plan, diseñado para combatir el deterioro del contexto ejecutando la investigación, la planificación y la ejecución en subagentes desechables, y detectando verificaciones obsoletas mediante huellas de contenido.',
        audience:
          'Desarrolladores en solitario y equipos pequeños que quieren ingeniería de contexto y verificación con poca ceremonia.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'Configura los agentes de código que ya usas con memoria persistente que además enruta entre sesiones y modelos, skills curadas, servidores MCP, personas y Spec-Driven Development o Receipt-Driven Development opcionales. Su configuración se escribe por defecto en los ajustes globales del agente; la instalación limitada al workspace es opcional.',
        audience:
          'Para desarrolladores que quieren un ecosistema de agentes configurado, capaz de recordar el trabajo entre sesiones y producir evidencias cuando se necesitan.',
      },
      'claude-ai-native-sdlc': {
        name: 'SDLC nativo de IA de Claude',
        whatItDoesWell:
          'Un ciclo de seis etapas, desde Planificar y Diseñar hasta Construir, Probar, Desplegar y Mantener, con aprobación humana obligatoria en cada etapa, artefactos duraderos confirmados en el repositorio entre etapas, un pase de revisión dedicado y etiquetado como seguridad antes de desplegar, y evaluaciones continuas que publican indicadores de entrega adelantados y rezagados.',
        audience:
          'Equipos que evalúan el playbook de entrega de software de extremo a extremo de Claude Code y su ciclo de feedback en producción.',
      },
      'vendor-native': {
        name: 'Funciones nativas del agente (varían según el proveedor)',
        whatItDoesWell:
          'Los productos de agentes pueden ofrecer modos de plan, archivos de instrucciones y skills construidos sobre los estándares abiertos y multiproveedor AGENTS.md y Agent Skills, aunque el comportamiento exacto del modo de plan sigue dependiendo del proveedor, el cliente y la versión. Agent Skills, en particular, carga solo un resumen breve al iniciar y las instrucciones completas al activarse, manteniendo fuera del contexto la capacidad que no se usa.',
        audience:
          'Para quienes quieren planificar dentro de un solo agente y aceptan un comportamiento específico del proveedor.',
      },
    },
    aiNative: {
      title: 'Dónde encaja en el SDLC nativo de IA',
      body: 'El playbook de Claude sobre el SDLC nativo de IA describe un ciclo completo: Planificar, Diseñar, Construir, Probar, Desplegar y Mantener. Cada etapa confirma un artefacto que la siguiente lee, con una aprobación humana obligatoria en cada etapa y un pase de seguridad dedicado antes de desplegar, mientras que el feedback de producción se convierte en nueva intención.',
      shared:
        'DWP comparte las ideas de los artefactos duraderos y la aprobación con puertas: la intención se convierte en un plan, las tareas dejan evidencia, un pase de seguridad se ejecuta antes de completar y el repositorio sigue siendo legible para el siguiente agente.',
      boundary:
        'La diferencia real está en el alcance, no en el rigor: el playbook está construido en torno a Claude Code específicamente, mientras que el harness y el formato de plan de DWP los puede leer cualquier agente que siga los estándares AGENTS.md y Agent Skills. El playbook también cubre la evaluación continua y las operaciones en producción que DWP no reclama; esas prácticas operativas pueden complementar un repositorio gestionado con DWP en lugar de competir con él.',
      sourceLabel: 'Leer el playbook de Claude sobre el SDLC nativo de IA',
    },
    profileCta: 'Ver la comparativa',
    profile: {
      backLabel: 'Volver a todas las alternativas',
      eyebrow: 'Perfil de la alternativa',
      compareWith: 'Comparado con Deep Work Plan',
      fitTitle: 'Dónde encaja',
      capabilityTitle: 'Resumen de capacidades',
      sourceLabel: 'Documentación oficial',
    },
    dwpStrengths: {
      title: 'Qué aporta Deep Work Plan',
      items: [
        {
          title: 'Agnóstico de la herramienta y nativo del repositorio',
          body: 'El harness y el plan son archivos en tu repositorio, legibles por cualquier agente que siga los estándares AGENTS.md y Agent Skills. Cambiar de agente no pierde el plan.',
        },
        {
          title: 'Validación seleccionada de lo que cada tarea tocó',
          body: 'Cada tarea declara su superficie tocada y ejecuta las pruebas del comportamiento cambiado y de sus consumidores, ampliando a la suite completa cuando el impacto no puede acotarse. Cero pruebas seleccionadas nunca cuenta como un pase.',
        },
        {
          title: 'Un Final Review con pase de seguridad',
          body: 'Un plan se cierra con una revisión de seguridad del conjunto acumulado de cambios, incluida una revisión local obligatoria del diff, y una validación del estado final. Los hallazgos críticos bloquean la finalización.',
        },
        {
          title: 'Estado que sobrevive a sesiones y agentes',
          body: 'Las casillas del README, los registros de tareas, un índice de trabajo acotado y un archivo de estado legible por máquina se escriben en cada límite, de modo que otra sesión u otro agente continúa desde el disco. Incluso una creación de plan interrumpida es recuperable.',
        },
        {
          title: 'Un comprobador de conformidad para el propio repositorio',
          body: 'Un script de solo lectura verifica el harness y cada plan contra la especificación, entiende ambos ciclos de vida del plan y termina con un código apto para CI.',
        },
        {
          title: 'Carga de instrucciones medida y publicada',
          body: 'Un script versionado mide cuántos bytes carga cada flujo; los resultados, incluidos los aumentos, se publican como bytes, nunca como porcentajes de tokens o de costo.',
        },
      ],
    },
    honestLimits: {
      title: 'Límites honestos',
      body: 'Una skill de DWP también es una especificación: describe cómo debe ejecutar un agente un procedimiento, como crear un componente. Los planes de DWP también son especificaciones de cambio: definen el alcance, los criterios de aceptación, las puertas de validación y las evidencias. Esta fila se refiere a algo más concreto: una especificación canónica que describe el comportamiento actual del producto y se actualiza con deltas después de cada cambio. Actualmente DWP no mantiene esa especificación viva a nivel de producto para cada sistema adoptado; OpenSpec es más fuerte cuando ese ciclo de vida es la necesidad principal. Las capas se pueden combinar alimentando un plan de DWP con una especificación del producto o una propuesta delta. Todavía no existe un benchmark independiente de la metodología; está planificada una evaluación pública preregistrada. El registro de carga de instrucciones mide bytes cargados, no tokens, costo ni resultados. DWP se limita deliberadamente al repositorio: no es un sistema de memoria entre proyectos, ni un framework de agentes basado en roles, ni un IDE, así que tampoco compite en esos frentes; combínalo con una herramienta que cubra ese frente cuando el trabajo lo requiera.',
    },
    correction: {
      title: 'Ayúdanos a mantener esto preciso',
      body: 'Esta página se revisa en la fecha indicada y se corrige a petición. Si la descripción de tu herramienta está desactualizada o incompleta, abre un issue y lo corregiremos.',
      ctaLabel: 'Abrir un issue',
    },
    sourcesTitle: 'Fuentes',
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
