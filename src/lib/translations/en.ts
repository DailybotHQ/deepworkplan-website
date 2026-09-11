/**
 * English translations
 */

import type { SiteTranslations } from './types';

export const en: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — structured execution for AI coding agents',
  siteDescription:
    'Deep Work Plan: an open methodology and reference kit for structured, validated, resumable multi-hour AI-agent execution.',

  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    // Deep Work Plan IA
    methodology: 'Methodology',
    spec: 'Spec',
    kit: 'Kit',
    examples: 'Examples',
    init: 'Init',
    quickstart: 'Quickstart',
    trust: 'Trust',
    developers: 'Developers',
    privacy: 'Privacy',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    changelog: 'Changelog',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: 'Source code',
      website: 'Website repository',
      websiteDesc: 'This site',
      skill: 'Skill repository',
      skillDesc: 'The installable skill',
    },
    menu: 'Open menu',
    closeMenu: 'Close menu',
  },

  // Footer
  changelogPage: {
    meta: {
      title: 'Deep Work Plan Changelog',
      description:
        'Important updates to the Deep Work Plan skill, methodology, and portable agent harness.',
    },
    eyebrow: 'Changelog',
    title: 'The work behind the method',
    intro:
      'A source-backed timeline of the releases and design decisions that make Deep Work Plan reliable for long-horizon agent work.',
    viewDetail: 'Read the update',
    backToIndex: 'All updates',
    sourceLabel: 'Sources',
    featuredLabel: 'Featured release',
    relatedTitle: 'Related updates',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'All rights reserved.',
    poweredBy: 'Powered by',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'New · Token-efficient',
    text: 'Deep Work Plan is live on Product Hunt today',
    tagline: 'give your agent a plan',
    linkText: 'Upvote it',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Site Navigation',
    sections: {
      methodology: 'Methodology',
      getStarted: 'Get started',
      project: 'Project',
      connect: 'Connect',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — structured execution for AI coding agents',
      description:
        'Context matters more than models. Deep Work Plan turns any repository into a structured environment where any coding agent finishes long-horizon work.',
    },
    hero: {
      badge: 'Open methodology · MIT · Agent-agnostic',
      title: 'Models matter.',
      titleEmphasis: 'Context matters more.',
      subtitle:
        'Deep Work Plan turns any repository into a structured environment — context, guardrails, and a durable plan — where any coding agent executes and finishes long-horizon work with precision and efficiency.',
      instructionLabel: 'Copy into your agent',
      instruction:
        'Copy the init.md prompt and paste it into your coding agent — Claude Code, Cursor, Codex, or any other — to make any repository AI-first.',
      copyLabel: 'Copy init.md',
      copiedLabel: 'Copied',
      viewInitCta: 'View the full /init prompt',
      pullQuote:
        'Deep Work Plan is spec-driven development where the repository itself becomes the harness.',
      primaryCta: 'Read the methodology',
      secondaryCta: 'Read the spec',
      illustrationAlt:
        'A lighthouse on a rocky shore casts a single beam guiding a small vessel — an engraving evoking the repository as a steady harness that guides any agent.',
      scrollCta: 'See how it works',
    },
    pitch: {
      kicker: 'The problem and the answer',
      problem:
        'A coding agent performs beautifully on short tasks. But hand it a long-horizon mission — a migration, a new subsystem, a refactor at scale — and drift sets in: the context window fills, earlier decisions fade, and hours of work stall halfway through.',
      answer:
        'Deep Work Plan answers with spec-driven development: a durable plan, atomic tasks, and validation gates the agent must pass. Done stops being a feeling — it becomes verifiable, reviewable evidence.',
      efficiency:
        'And because context is the scarcest resource your agent has, the harness is engineered for token efficiency: instructions load progressively, validation touches only what changed, and every task learns locally — so long-horizon work stays affordable.',
      illustrationAlt:
        'An engraved diptych: a ship adrift in fog beside jagged rocks on one side, and the same ship steady on a plotted course toward a harbor beacon on the other.',
    },
    story: {
      act1: {
        kicker: 'The method · Act I',
        lead: 'You decide what done means and where the lines are. The plan carries your intent; the agents do the hours — no babysitting, no correcting every twenty minutes.',
        deepLinkLabel: 'Read the methodology',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'The method · Act II',
        lead: "Long tasks fill any model's context. Details fall away and the agent drifts. A written plan — atomic tasks, validation gates, resumable state — is what it returns to, lap after lap.",
        deepLinkLabel: 'See the core loop',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'The method · Act III',
        lead: "Each task names its acceptance criteria and the checks that must pass. The agent doesn't get to feel finished — it has to pass, or the task stays open.",
        deepLinkLabel: 'Read the specification',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'The method · Act IV',
        lead: 'Context, tools, guardrails, and state live in your repository as plain files any agent can read. No lock-in, no external brain — it survives context resets.',
        deepLinkLabel: 'See what onboarding generates',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'The method · Act V',
        lead: 'Context is the scarcest resource your agent has. The harness loads progressively, validates what changed, and learns task by task — so the plan pays for itself.',
        deepLinkLabel: 'Read the methodology',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Reasoning-based onboarding',
      title: 'Point it at any repository. It reasons — it does not copy-paste.',
      subtitle:
        "The onboarding flow inspects your repository's actual languages, frameworks, package manager, and validation commands, then generates artifacts adapted to that repository. A generic stub is treated as a failure.",
      steps: [
        {
          title: 'Reasons about your stack and archetype',
          description:
            'Reads manifests, folder layout, and CI to infer the real test, lint, and build commands, then classifies the repository as an individual repo or an orchestrator hub.',
        },
        {
          title: 'Generates AGENTS.md, docs/, and per-module docs',
          description:
            "A reasoned AGENTS.md, a categorized docs/ hierarchy, and a README plus docs/ inside each major module — filled with your repository's real commands, not placeholders.",
        },
        {
          title: 'Scaffolds .agents/ with .claude and .cursor symlinks',
          description:
            'A cross-agent .agents/ directory (skills, agents, commands) and the .claude and .cursor to .agents symlinks, so every tool reads one source of truth.',
        },
        {
          title: 'Installs the DWP skill and scaffolds .dwp/',
          description:
            'Wires the Deep Work Plan skill and creates the gitignored .dwp/ folder for plans and drafts, installs the required AI Diff Reviewer local review, then optionally layers opt-in addons such as devcontainer support.',
        },
      ],
    },
    quickstart: {
      badge: 'What happens when you run it',
      title: 'One instruction. The repository does the rest.',
      subtitle:
        'You do not pick an install method or copy a template. You hand your agent one line; it installs the skill — the reusable engine — and adapts your repository to it.',
      steps: [
        {
          title: 'Your agent opens /init.md',
          description:
            'It reads the onboarding prompt at deepworkplan.com/init.md and the methodology, specification, and kit it links to — the standard it is about to adopt.',
        },
        {
          title: 'It installs the Deep Work Plan skill',
          description:
            'The skill is the engine — the same in every repository. One command pulls in the router and its sub-skills (create, execute, refine, resume, status, verify, onboard, author) for Claude Code, Cursor, Codex, Gemini, and Copilot.',
        },
        {
          title: 'It adapts your repository',
          description:
            'Reasoning about your real stack — never copy-pasting — it writes AGENTS.md, a categorized docs/ tree, per-module READMEs, a reasoned .agents/ kit, and a gitignored .dwp/. Your repository becomes the harness.',
        },
        {
          title: 'You plan and execute',
          description:
            'Generate long-horizon Deep Work Plans for any task and run them step by step, with explicit acceptance criteria, validation gates, and resumable state — autonomously, for hours.',
        },
      ],
      note: 'The skill is installed identically everywhere; what is adapted is your repository — the AGENTS.md, docs, and reasoned .agents/ kit generated for your stack. That split is what makes the methodology a reusable standard rather than a one-off scaffold.',
    },
    outcomes: {
      badge: 'What you get',
      title: 'Everything your agent needs to work autonomously.',
      subtitle:
        'One run, committed atomically. Every output is Markdown and every change is auditable.',
      items: [
        {
          label: 'AGENTS.md at the repository root',
          detail:
            "Reasoned from your repository's actual stack, commands, and structure — not a template with placeholders. CLAUDE.md is symlinked to AGENTS.md.",
        },
        {
          label: 'Categorized docs/ and per-module docs',
          detail:
            'Architecture, setup, standards, and troubleshooting — plus a README and docs/ inside each major module, generated from your codebase.',
        },
        {
          label: '.agents/ with .claude and .cursor to .agents symlinks',
          detail:
            'A cross-agent .agents/ directory (skills, agents, commands) with the .claude and .cursor to .agents symlinks so every tool reads one source of truth.',
        },
        {
          label: 'The Deep Work Plan skill, installed',
          detail:
            'create, execute, refine, resume, status, verify, onboard, and author — available to your agent as a single skill pack, with no per-repository copy.',
        },
        {
          label: 'Conformance you can check',
          detail:
            '/dwp-verify produces an objective pass/fail report against the specification, so "AI-first" is verified, not asserted — and re-verifiable after every plan.',
        },
        {
          label: 'Two archetypes, handled',
          detail:
            'Onboarding classifies your repository as an individual repo (the common case) or an orchestrator hub that coordinates child plans across repositories.',
        },
        {
          label: 'A living kit your repository grows',
          detail:
            'The author sub-skill (skill-create, agent-create) lets the repository evolve its own skills, agents, and commands; opt-in maintenance add-ons such as dependency-upgrade help it keep itself up to date.',
        },
        {
          label: 'Git-native, resumable, .dwp/',
          detail:
            'No daemon and no external state. Plans and drafts land in a gitignored .dwp/ folder, and any task resumes from git alone — even after context overflows.',
        },
      ],
    },
    agents: {
      badge: 'Agents',
      title: 'Works with the agent you already use.',
      subtitle:
        'One methodology, many adapters. Markdown couples the framework to nothing — every agent that reads Markdown can run a Deep Work Plan.',
      fullLabel: 'Full',
      partialLabel: 'Partial',
      viewAllCta: 'See all agents',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Reference implementation, with native WebFetch and slash commands.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Full adapter. Use the offline bundle if WebFetch is gated.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Offline bundle recommended; rules installed under .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Full adapter — the dwp-* commands run via AGENTS.md and # procedures.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Requires Gemini 2.5 Pro or newer, with native WebFetch.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Open source. Reads AGENTS.md natively and runs dwp-* via # commands.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Rules plus # command procedures drive the full Deep Work Plan loop.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Open source. Markdown rules and # commands run every dwp-* step.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Full adapter with a native command surface.',
        },
      ],
    },
    stacks: {
      badge: 'Stacks',
      title: 'Reasoning presets for the stacks that matter.',
      subtitle:
        "These are reasoning aids, not templates. Onboarding reads your repository's real manifests and adapts per stack — it never blind-copies a preset. Monorepos get per-module docs.",
      viewAllCta: 'See all presets',
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
        { name: 'Generic', sub: 'Any stack' },
      ],
    },
    archetypes: {
      badge: 'Two archetypes',
      title: 'Individual repository, or orchestrator hub.',
      subtitle:
        'Onboarding forks on the archetype. Most repositories are individual repos. A hub coordinates child Deep Work Plans across many repositories. The methodology handles both as first-class.',
      individual: {
        tag: 'Common case',
        title: 'Individual repository',
        description:
          'A single codebase with one primary stack, its own validation commands, and per-module docs. The default — onboarding assumes it unless the repository is clearly a hub.',
        example:
          'For example, a Django API, a Vue app, or a TypeScript Lambda service.',
      },
      orchestrator: {
        tag: 'Coordination',
        title: 'Orchestrator hub',
        description:
          'A coordination repository that orchestrates work across sub-repositories via an orchestrator manifest, spawning child plans that each commit in their own repository, plus boundary rules and a navigation index.',
        example: 'For example, a hub coordinating five product repositories.',
      },
    },
    comparison: {
      badge: 'Methodology versus tool',
      title: 'A different layer. Complementary, not competing.',
      subtitle:
        'Deep Work Plan is not another scaffolder. It is the methodology layer underneath any spec-driven or scaffolding tool, focused on multi-hour autonomous runs.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Scaffolding / spec tools',
      rows: [
        {
          label: 'Primary focus',
          dwp: 'Multi-hour autonomous execution',
          others: 'Spec or scaffold generation',
        },
        {
          label: 'Unit of work',
          dwp: 'A Deep Work Plan (resumable session)',
          others: 'A spec document or a scaffold',
        },
        {
          label: 'State model',
          dwp: 'Git-native .dwp/ folder, resumable',
          others: 'Often external or in-IDE',
        },
        {
          label: 'Agent coupling',
          dwp: 'Agent-agnostic (Markdown and Bash)',
          others: 'Often tool- or IDE-specific',
        },
        {
          label: 'Context recovery',
          dwp: 'Resumes after context overflow',
          others: 'Typically restarts the task',
        },
        {
          label: 'License',
          dwp: 'MIT, open methodology and kit',
          others: 'Varies',
        },
      ],
    },
    origin: {
      badge: 'Origin',
      quote:
        'Built by Dailybot — the company behind asynchronous standups for distributed teams. Internally we used Deep Work Plans to make production repositories spanning Django, Vue, TypeScript Lambda, and Astro agent-pilotable. After months of production use, we open-sourced the methodology under MIT.',
      attribution: 'The Dailybot engineering team',
      dailybotCta: 'Learn about Dailybot',
    },
    finalCta: {
      badge: 'Make your repository AI-first',
      title: 'Give your agents deep work.',
      subtitle:
        'Hand your agent one line — point it at /init.md — and it makes your repository AI-first: it installs the skill, reasons about your stack, and commits a complete AGENTS.md hierarchy. From there you create and execute Deep Work Plans that run autonomously for hours.',
      primaryCta: 'Open the /init prompt',
      secondaryCta: 'Read the methodology',
      tertiaryCta: 'For agents & developers',
      meta: 'MIT-licensed · zero telemetry · outputs to a gitignored .dwp/ folder.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Contact',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Write your message...',
    sendButton: 'Send message',
  },

  // About page
  aboutPage: {
    title: 'About the methodology',
    subtitle: 'Open methodology · MIT licensed',
    description:
      'Deep Work Plan is an open, framework-agnostic methodology for serious engineering work with AI coding agents. Where it came from and who maintains it.',
    heroDescription:
      'A repeatable structure for planning, executing, and verifying deep work with AI coding agents — built in the open and free to use.',
    bioTitle: 'What it is',
    bioText:
      'Deep Work Plan (DWP) is a methodology, not a product. It defines how to turn a goal into an agreed plan, break that plan into atomic and independently verifiable tasks, and run each task in a focused loop that ends with a check.<br /><br />It is deliberately agnostic about which AI agent or stack you use — adapters translate the same core loop to Claude, Cursor, Copilot, Codex, Gemini, and more. The plan, the tasks, and the running log are all plain Markdown, so the work stays readable, reviewable, and version-controlled.',
    passionsTitle: 'Core principles',
    passions: [
      {
        title: 'Plan before execution',
        description:
          'No code is written until the plan is agreed. The plan is a contract between you and the agent.',
        icon: '\u{1F5FA}\uFE0F',
        link: '/methodology',
      },
      {
        title: 'Tasks are atomic',
        description:
          'Each task is scoped so it can be executed and verified on its own, then committed atomically.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verify everything',
        description:
          'Every task ends with an explicit check before the next one begins, with progress recorded in git.',
        icon: '\u2705',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'At a glance',
    quickFacts: [
      'Open methodology, MIT licensed',
      'Framework- and agent-agnostic',
      'Maintained by Dailybot and the community',
      'Includes a spec, commands, adapters, presets, and examples',
      'Markdown-only — no runtime, no lock-in',
      'Turns any repository into an AI-first, agent-pilotable codebase',
    ],
    ctaTitle: 'Who maintains it',
    ctaDescription:
      'Deep Work Plan grew out of real engineering work at Dailybot and is now maintained by Dailybot together with the open-source community. The methodology, specification, and kit are released under the MIT license — free to use, adapt, and build on.',
    ctaCv: 'Read the methodology',
    ctaContact: 'Quickstart',
  },

  // Contact page
  contactPage: {
    title: 'Community & contact',
    subtitle: 'Open source · Community-driven',
    description:
      'Deep Work Plan is built in the open. Find the source, open an issue, or join the conversation through the channels below — contributions are welcome.',
    heroDescription:
      'Questions, ideas, or improvements? Deep Work Plan is developed in public — here is where to reach the project and its maintainers.',
    formTitle: 'Send a Message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'I want to contact you about',
    reasonOptions: [
      { value: '', label: '— Select a topic —' },
      { value: 'general', label: 'General / Just saying hello' },
      { value: 'tech-talk', label: 'Tech talk / Speaking invitation' },
      { value: 'collaboration', label: 'Collaboration / Partnership' },
      { value: 'project', label: 'Project / Work inquiry' },
      { value: 'dailybot', label: 'Question about Dailybot' },
      { value: 'trading', label: 'Questions about my trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Join The Library of Tomorrow',
      },
      { value: 'other', label: 'Other' },
    ],
    subjectLabel: 'Subject',
    subjectPlaceholder: 'What is this about?',
    messageLabel: 'Message',
    messagePlaceholder: 'Write your message...',
    sendButton: 'Send Message',
    sendingButton: 'Sending...',
    successTitle: 'Message sent!',
    successMessage:
      "Thank you for reaching out. I'll get back to you as soon as possible.",
    sendAnotherButton: 'Send another message',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    fallbackMessage:
      'The contact form is currently unavailable. You can reach me directly by email.',
    fallbackEmailText: 'Send me an email at',
    formNote: "I'll get back to you as soon as possible.",
    socialTitle: 'Connect With Me',
    locationTitle: 'Location',
    locationText: 'Based in Colombia. Open to remote collaboration worldwide.',
    prefillSubjects: {
      generalInquiry: 'General Inquiry',
      collaboration: 'Collaboration Opportunity',
      projectInquiry: 'Project or Work Inquiry',
      projectCollaboration: 'Project Collaboration Inquiry',
      startupCollaboration: 'Startup Collaboration Opportunity',
      techTalkInvitation: 'Tech Talk Speaking Invitation',
      tradingQuestion: 'Trading Question',
      dailybotQuestion: 'Question About Dailybot',
    },
  },

  contactSection: {
    title: "Let's Connect",
    description:
      "I'm always open to interesting conversations, collaboration opportunities, and new ideas. Whether you want to talk tech, entrepreneurship, or just say hello.",
    ctaText: 'Get in touch',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'en-US',

  // 404 page
  notFoundPage: {
    title: 'Page Not Found',
    description:
      'The page you are looking for does not exist or has been moved. Explore the methodology or head back to the homepage to keep browsing.',
    heading: 'Page Not Found',
    message:
      "Sorry, the page you are looking for doesn't exist or may have been moved. Try navigating back to the homepage or exploring the methodology.",
    backHome: 'Go back home',
    exploreMethodology: 'Read the methodology',
    agentTitle: 'For AI agents',
    agentIntro:
      'This path does not exist. The recovery links below (and their machine-readable equivalents) list every page on this site.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'The Deep Work Plan Methodology',
      description:
        'Five chapters from manifesto to archetypes: the principles, the core loop, templates, skills and agents, and the adaptations behind Deep Work Plan.',
    },
    eyebrow: 'Methodology',
    title: 'The Deep Work Plan Methodology',
    intro:
      'Five chapters that take you from the philosophy behind Deep Work Plan to the practical loop, templates, and adaptations you use every day.',
    chapterLabel: 'Chapter',
    readChapter: 'Read chapter',
    prev: 'Previous',
    next: 'Next',
    backToIndex: 'All chapters',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan Specification',
      description:
        'The readable specification of the Deep Work Plan methodology: the DWP format, agent protocol, archetypes, documentation standard, and add-ons.',
    },
    eyebrow: 'Specification',
    title: 'Specification',
    intro:
      'The precise, readable specification of the methodology — the structures and protocols that humans and agents share.',
    tocTitle: 'On this page',
    prev: 'Previous',
    next: 'Next',
    backToIndex: 'All spec documents',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'The Deep Work Plan Kit',
      description:
        'The skill and its eight sub-skills, commands, adapters, presets, opt-in add-ons, and examples that make Deep Work Plan runnable across agents and stacks.',
    },
    eyebrow: 'Kit',
    title: 'The Kit',
    intro:
      'Everything you need to run the methodology: the skill and its sub-skills, slash commands, agent adapters, onboarding presets, the required local review and opt-in addons, and worked examples.',
    groups: {
      command: {
        title: 'Sub-skills & commands',
        description:
          'The skill router and its sub-skills (create, execute, refine, resume, status, verify, onboard, author), plus the thin slash commands that delegate to them.',
      },
      adapter: {
        title: 'Adapters',
        description:
          'Thin per-agent integrations for Claude, Cursor, Codex, and more.',
      },
      preset: {
        title: 'Onboarding presets',
        description:
          'Per-stack reasoning guides the onboard flow uses to adapt docs, skills, and validation commands to your repository.',
      },
      example: {
        title: 'Examples',
        description: 'Worked, before-and-after walkthroughs.',
      },
      addon: {
        title: 'Addons (opt-in)',
        description:
          'Capabilities the onboard flow layers onto a repo: the required AI Diff Reviewer local review plus four optional addons that are never part of the AI-first baseline.',
      },
    },
    viewDetail: 'View details',
    prev: 'Previous',
    next: 'Next',
    backToIndex: 'Back to the kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan Examples',
      description:
        'Before-and-after walkthroughs showing the same engineering task with and without a Deep Work Plan — and the difference in reliability and review.',
    },
    eyebrow: 'Examples',
    title: 'Examples',
    intro:
      'See the methodology in action — concrete, before-and-after walkthroughs of real engineering tasks.',
    viewExample: 'Read the walkthrough',
    prev: 'Previous',
    next: 'Next',
    backToGallery: 'All examples',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Quickstart — Deep Work Plan',
      description:
        'Install the skill, onboard your repository, then plan and execute with any agent — the steps that make your repository spec-driven and agent-pilotable.',
    },
    eyebrow: 'Quickstart',
    title: 'Start in minutes',
    intro:
      'Install the skill, onboard your repository, then plan and execute with any agent — the steps that make your repository spec-driven and agent-pilotable.',
    sequenceTitle: 'The adoption path',
    codeLabel: 'Terminal',
    orLabel: 'or',
    steps: [
      {
        title: 'Install the Deep Work Plan skill',
        description:
          'Add the skill to your repository — a router plus eight sub-skills (create, execute, refine, resume, status, verify, onboard, author). Use the Skills CLI for the fastest path, or clone the repo and run setup where git and a shell are available.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Onboard the repository',
        description:
          'Run the onboard sub-skill and let the agent reason about your actual repo. It generates AGENTS.md, a docs/ knowledge base, per-module docs, and a cross-agent .agents/ home (with the .claude → .agents and .cursor → .agents symlinks), wires the thin dwp-* commands, and scaffolds a gitignored .dwp/.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolve the kit and accept addons',
        description:
          'Use /skill-create and /agent-create (the author sub-skill) to grow stack-appropriate skills, agents, and commands. Onboarding installs the required AI Diff Reviewer local review (its CI gate stays optional) and offers four opt-in addons — devcontainer, Dailybot, dependency-upgrade, and design-system — that you accept only when they fit.',
      },
      {
        title: 'Plan and execute',
        description:
          'Generate a Deep Work Plan and run it task by task, validating each gate and resuming across sessions — piloting the repository against its own spec.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'The outcome',
    outcome:
      'Your repository becomes spec-driven and agent-pilotable: the plan is the durable source of truth, and the repository itself becomes the harness any agent runs against.',
    nextStepsTitle: 'Next steps',
    nextSteps: [
      { label: 'Read the methodology', href: '/methodology' },
      { label: 'Browse the kit', href: '/kit' },
      { label: 'See examples', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Make your repository AI-first',
      description:
        'Adopt the Deep Work Plan methodology in any repository. Install the skill, run agent onboarding, then plan and execute with any AI coding agent.',
    },
    eyebrow: 'Adoption',
    title: 'Make this repository AI-first',
    intro:
      'One endpoint to turn any repository into a spec-driven, agent-ready codebase. Install the skill, let an agent onboard the repo, then plan and execute structured work with any coding agent.',
    handoffTitle: 'Copy into your agent',
    handoffBody:
      'Copy the full init.md prompt and paste it into your AI coding agent — Claude Code, Cursor, Codex, or any other. It reads the methodology and specification, installs the skill, and onboards this repository for Deep Work Plans.',
    handoffInstruction:
      'Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.',
    handoffMdLabel: 'Self-contained agent prompt',
    codeLabel: 'agent',
    whatTitle: 'What this does',
    whatBody: [
      'Adoption changes the repository in two durable ways — the pillars of the methodology.',
      'First, the repository becomes spec-driven: work begins from a written plan and specification, not from ad-hoc prompts. Second, the repository itself becomes the agent harness — an AGENTS.md, a docs/ knowledge base, per-module docs, and a .agents/ skill home (with the .claude → .agents and .cursor → .agents symlinks) give every agent the context and commands it needs.',
    ],
    sequenceTitle: 'The adoption sequence',
    orLabel: 'or',
    steps: [
      {
        title: 'Verify before you install',
        description:
          'Treat the prompt and the skill as untrusted until you have checked them. Both are open source and MIT; the skill is Markdown-first with no network calls and no telemetry. Each release publishes a SHA256SUMS over the shipped skill, so you can confirm your copy matches before running it. Releases are checksummed, not signed (signing is a documented next step).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Install the skill',
        description:
          'Add the Deep Work Plan skill so any agent can plan and execute structured work. The skill ships a router plus eight sub-skills — create, execute, refine, resume, status, verify, onboard, and author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Run repository onboarding',
        description:
          'Invoke the onboard sub-skill and let the agent reason about the actual repo — its stack, package manager, and real validation commands. It generates AGENTS.md, a docs/ knowledge base, per-module docs, and a cross-agent .agents/ home (with the .claude → .agents and .cursor → .agents symlinks), wires thin dwp-* commands, and scaffolds a gitignored .dwp/ for plans and drafts. For large repos the onboard sub-skill uses a plan-driven path: it completes reconnaissance, then emits an onboarding Deep Work Plan. Nothing is templated; everything is adapted to your repository.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Local review and opt-in addons',
        description:
          'Onboarding installs the required AI Diff Reviewer local review (its CI gate stays optional) and offers four opt-in addons — devcontainer, Dailybot, dependency-upgrade, and design-system — that you accept only when they fit. A repo is fully conformant with zero optional addons. Use /skill-create and /agent-create (the author sub-skill) to grow stack-appropriate skills, agents, and commands beyond the baseline.',
      },
      {
        title: 'Plan and execute',
        description:
          'Generate Deep Work Plans with /dwp-create and run them with /dwp-execute, then /dwp-status, /dwp-refine, /dwp-resume, and /dwp-verify as work proceeds. Each plan carries numbered tasks, validation gates, and a completion protocol — closing with a single mandatory Final Review (security pass, final-state validation, and skills reconciliation). The Executive Report remains available on request.',
      },
      {
        title: 'Verify conformance',
        description:
          'Run /dwp-verify for an objective pass/fail report against the specification. Confirm AGENTS.md, docs/ (with real content, not stubs), .agents/ (with thin dwp-* delegators and a catalog that matches disk), .dwp/, and tmp/ are in place — nothing templated, everything reasoned for this repo.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'The outcome',
    outcome:
      'The repository becomes spec-driven and the repository itself becomes the agent harness — context and commands travel with the code.',
    nextStepsTitle: 'Read next',
    nextSteps: [
      { label: 'Quickstart', href: '/quickstart' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Spec', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },
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
    tocTitle: 'On this page',
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
            id: 'lite-vs-full',
            question: "What's the difference between a Lite and a Full plan?",
            answer:
              "A representation choice, not a rigor tradeoff. Every plan starts as a Lite folder: a compact README with anchored task records that is already executable, not a partial draft. `create` expands to Full task files only when a task's instruction detail, dependencies or contracts do not fit a reviewable compact record; an explicit request for either format is honored, and a Lite plan can be promoted to Full later without losing completed work. Both formats carry the same acceptance criteria, validation gates, evidence and mandatory Final Review.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
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
          {
            id: 'how-to-use',
            question: 'How do I use it?',
            answer:
              'Three steps. First, install the Deep Work Plan skill into your coding agent — the fastest path is `npx skills add DailybotHQ/deepworkplan-skill` (or clone the skill repo and run `./setup.sh`). Second, onboard the repository once so the agent adapts `AGENTS.md`, `docs/`, the `.agents/` kit and a gitignored `.dwp/` area to your stack: point it at https://deepworkplan.com/init.md, or run `/deepworkplan-onboard`. Third, plan and run work with the thin commands: `/dwp-create <goal>` builds a plan; `/dwp-execute` runs it task by task against each gate; `/dwp-refine` edits an in-flight plan (scope, tasks, or promoting a Lite plan to Full); `/dwp-resume` continues after an interruption; `/dwp-status` reports progress without executing; `/dwp-verify` produces an objective conformance report. Agents that intercept `/` often use `#` instead (for example `#dwp-execute`). The adoption endpoint and the quickstart walk the same path in more detail.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: 'What exactly gets installed, and where?',
            answer:
              'The agent skill is installed wherever your agent loads project or user skills. Onboarding then adapts the repository itself: it creates or reconciles `AGENTS.md`, `docs/`, `.agents/` and the gitignored `.dwp/` workspace. The skill teaches the agent the method; the repository keeps the context, kit and plan evidence that other agents need to continue.',
            linkLabel: 'See the adoption flow',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Does Deep Work Plan require Git?',
            answer:
              'Git is recommended for repositories because its history is part of the recovery and review surface, but the methodology can also run in an agent workspace without a Git repository. In that case the machine-readable state layer, including `state.json` checkpoints and gate records, is required so recovery does not depend on a chat transcript.',
            linkLabel: 'Read about repository archetypes',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question:
              'What is the difference between a skill, a plan and a product specification?',
            answer:
              'A skill describes how an agent performs a repeatable procedure. A DWP plan describes a concrete change through scope, acceptance criteria, validation gates and evidence. A product specification describes the product’s current behavior and evolves through deltas after implementation; skills and plans are specifications too, but they describe procedures and changes rather than maintaining that canonical product contract.',
            linkLabel: 'Read the specification',
            linkPath: '/spec/dwp-specification',
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
          {
            id: 'gate-fails',
            question: 'What happens when a validation gate fails?',
            answer:
              'The task is recorded as blocked and the agent stops before claiming completion. You can inspect the evidence, repair the code or refine the task, then resume; a failed command is a signal to resolve the mismatch, not permission to weaken the gate.',
            linkLabel: 'Read the agent protocol',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question: 'Can a plan run unattended overnight or in CI?',
            answer:
              'Yes, when the plan was approved in advance, carries the required state layer and gives the agent bounded authority. An unattended run must stop and record a blocker when reality diverges, a gate fails outside its planned repair scope, or a new approval or credential is needed.',
            linkLabel: 'Read the unattended protocol',
            linkPath: '/spec/agent-protocol',
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
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. Claude's AI-native SDLC playbook makes a related case for durable artifacts across Plan, Design, Build, Test, Deploy and Maintain; DWP covers the repository harness and execution loop, while continuous production evaluation remains a complementary practice. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow tools such as BMAD, Superpowers, Get Shit Done or Gentle-AI?',
            answer:
              "Agent workflow frameworks such as BMAD, Superpowers and Get Shit Done bring strong working styles: roles, principles, test-first steps, verification habits. Gentle-AI sits nearby as an agent ecosystem configurator: it equips the coding agents you already use with persistent memory across sessions (Engram), curated skills, personas, MCP servers, optional Spec-Driven Development and optional evidence-based review (Receipt-Driven Development), writing into each agent's config directories. Deep Work Plan differs from both: it focuses on what stays in the repository and what can be checked — a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The layers can sit together: frameworks and Gentle-AI shape how the agent works; Deep Work Plan makes long work durable and checkable inside the repo. The comparison page shows where each approach is built in, optional or out of scope.",
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
            id: 'core-and-addons',
            question:
              'Can I use the core methodology without installing add-ons?',
            answer:
              'Yes. Add-ons are opt-in layers and a repository with none is fully DWP-conformant. Devcontainers, Dailybot reporting, dependency upgrades, design-system support and optional CI review are offered only when they fit your repository and you accept them explicitly.',
            linkLabel: 'Browse the add-ons',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question: 'What if my repository has no tests or linting yet?',
            answer:
              'DWP does not treat the absence of a toolchain as a free pass. During onboarding the agent proposes a stack-appropriate validation setup, records the commands in the repository documentation and uses those commands as the target for future gates; the proposal remains visible for you to review.',
            linkLabel: 'Read the agent protocol',
            linkPath: '/spec/agent-protocol',
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
      title: 'Deep Work Plan compared with the alternatives',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Choose Deep Work Plan when long-horizon agent work needs to remain durable, portable and verifiable. The alternatives below clarify the tradeoffs: DWP puts the harness, plan, state and evidence in your repository so any agent can carry the work forward.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is. One clarification: DWP skills and plans are specifications of procedures and changes; the living product specs row asks whether a tool maintains a canonical description of the product’s current behavior and merges deltas into it.',
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
      aiNativeSdlc: 'AI-native SDLC',
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
        label: 'Living product specs for existing systems',
        help: 'A canonical specification describes the product’s current behavior, accepts change deltas and is updated as each change is implemented.',
      },
      crossProjectMemory: {
        label: 'Persistent agent memory across projects',
        help: 'Memory follows the agent across different repositories and sessions, not just one plan’s on-disk state.',
      },
      roleBasedAgents: {
        label: 'Distinct specialized agent roles',
        help: 'Named personas (such as analyst, architect or reviewer) divide the work, rather than one agent running every step.',
      },
      nativeIdeProduct: {
        label: 'Ships as its own IDE or editor',
        help: 'The tool is an integrated development environment in its own right, not an add-on to an existing coding agent.',
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
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents, and can check the artifacts stay consistent with each other before implementation starts.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications, with a validator that checks proposal completeness and scenario coverage before a change is accepted.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events, and that can generate specs for an existing codebase to catch requirement gaps before design begins.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files, with a Definition of Done that requires each story to be reviewed by a teammate or an AI peer reviewer before it counts as finished.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion, integrated with more coding-agent hosts than any other alternative here, plus a two-stage subagent review (spec compliance, then code quality) on every task.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against the user-observable deliverables extracted from each plan, purpose-built to fight context rot by running research, planning and execution in disposable subagents and catching stale verification with content-fingerprint checks.',
        audience:
          'Solo developers and small teams who want context engineering and verification with little ceremony.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'Configures the coding agents you already use with persistent memory that also routes across sessions and models, curated skills, MCP servers, personas and optional Spec-Driven Development or Receipt-Driven Development. Its configuration is written to your global agent settings by default; a workspace-scoped install is opt-in.',
        audience:
          'Developers who want a configured agent ecosystem that remembers work across sessions and can produce evidence on demand.',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          'A six-stage loop from Plan and Design through Build, Test, Deploy and Maintain, with human approval gated at every stage, durable artifacts committed to the repository between stages, a dedicated security-tagged review pass before deploy, and continuous evals that publish leading and lagging delivery indicators.',
        audience:
          "Teams evaluating Claude Code's end-to-end software delivery playbook and its production feedback loop.",
      },
      'vendor-native': {
        name: 'Native agent features (varies by vendor)',
        whatItDoesWell:
          'Agent products may provide plan modes, instruction files and skills built on the open, cross-vendor AGENTS.md and Agent Skills standards, though the exact plan-mode behavior still depends on the vendor, client and version. Agent Skills in particular load only a short summary at startup and the full instructions on activation, keeping unused capability out of context.',
        audience:
          'Anyone who wants planning inside one agent and is comfortable with vendor-specific behavior.',
      },
    },
    aiNative: {
      title: 'Where this fits in the AI-native SDLC',
      body: "Claude's AI-native SDLC playbook describes a full loop: Plan, Design, Build, Test, Deploy and Maintain. Each stage commits an artifact the next stage reads, with a human approval gate at every stage and a dedicated security pass before deploy, while production feedback becomes new intent.",
      shared:
        'DWP shares the durable-artifact and gated-approval ideas: intent becomes a plan, tasks leave evidence, a security pass runs before completion, and the repository remains readable by the next agent.',
      boundary:
        "The real difference is scope, not rigor: the playbook is built around Claude Code specifically, while DWP's harness and plan format are read by any agent that follows the AGENTS.md and Agent Skills standards. The playbook also covers continuous evaluation and production operations that DWP does not claim; those operational practices can complement a DWP-run repository rather than compete with it.",
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'See the comparison',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
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
      body: 'A DWP skill is a specification too: it describes how an agent should perform a procedure, such as creating a component. DWP plans are also change specifications: they define scope, acceptance criteria, validation gates and evidence. This row means something narrower: a canonical specification that describes the product’s current behavior and is updated with deltas after each change. DWP does not currently maintain that product-level living specification for every adopted system; OpenSpec is stronger when that lifecycle is the primary need. You can combine the layers by feeding a product spec or delta proposal into a DWP plan. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes. DWP is deliberately scoped to the repository: it is not a cross-project memory system, not a role-based agent framework and not an IDE, so it does not compete on those axes either — pair it with a tool that covers one of them when that is what the work needs.',
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
      title: 'Trust and security',
      description:
        'Why Deep Work Plan is safe to adopt: open source and MIT, Markdown-first with no network calls or telemetry, non-destructive by design, with verifiable installs and a clear vulnerability-disclosure policy.',
    },
    eyebrow: 'Trust & security',
    title: 'Trust and security',
    intro:
      'Nobody should install a skill they cannot trust. Deep Work Plan is built to be verified, not taken on faith: open source, Markdown-first, non-destructive, and checkable before you run it. This page states plainly what it does, what it does not do, and how to confirm both.',
    pillarsTitle: 'What you are trusting',
    pillars: [
      {
        title: 'Open source and MIT licensed',
        body: 'The website and the skill are both public and diffable. You can read every line before you run it, and compare any copy against the source at a tagged release.',
      },
      {
        title: 'Markdown-first — no network, no telemetry',
        body: 'The skill has no CLI, no HTTP API, and no authentication flow. It makes no network calls and sends no telemetry; its only local helper reads git and environment metadata. Nothing about your repository leaves your machine.',
      },
      {
        title: 'Non-destructive by design',
        body: 'The only security-relevant thing the skill does is change your repository — and it reconciles rather than clobbers. It detects what exists, proposes a plan, and asks before replacing anything. Plan output lives in a gitignored .dwp/ directory.',
      },
      {
        title: 'Touches no secrets',
        body: 'The methodology never commits secrets and keeps working state out of version control. Onboarding appends to .gitignore rather than rewriting it, and every change is meant to be reviewed in small, readable diffs.',
      },
      {
        title: 'Verifiable provenance',
        body: 'Every release publishes checksums over the shipped skill, so you can confirm a downloaded copy matches what was published before you trust it.',
      },
    ],
    verifyTitle: 'Verify before you run',
    verifyIntro:
      'Treat the skill as untrusted until you have checked it. Each release attaches a SHA256SUMS file covering the shipped skill. Download it for the version you intend to install, then verify your copy matches — a non-zero exit means a file does not match and you should stop.',
    codeLabel: 'shell',
    verifyNote:
      'Releases are checksummed, not signed — signing (cosign or maintainer GPG) is a documented next step, not a current claim. Because everything is open, you can also diff any file against the repository at its tag.',
    disclosureTitle: 'Report a vulnerability',
    disclosureBody:
      "Found a security issue? Report it privately through GitHub's private vulnerability reporting on the relevant repository — the skill or the website (see the security policies linked below) — rather than opening a public issue, which would expose the problem before a fix exists.",
    resourcesTitle: 'Trust resources',
    linkManifest: 'Machine-readable trust manifest',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Website security policy',
    linkSkillPolicy: 'Skill security policy & threat model',
    limitationsTitle: 'Honest limitations',
    limitations: [
      'Releases are checksummed, not yet cryptographically signed — signing is planned, not done.',
      'Deep Work Plan runs an autonomous coding agent against your repository. Review its proposed plan and its diffs; the methodology is designed for that review, not to replace it.',
      'Trust claims here describe the official sources only. A modified or third-party copy that has drifted from the repositories carries none of these guarantees — verify it first.',
    ],
    ctaTitle: 'Adopt it with confidence',
    ctaBody:
      'Read the methodology and the specification, point an agent at the init endpoint, and verify the install before you run it.',
    ctaPrimary: 'Read the methodology',
    ctaSecondary: 'Adoption (init)',
  },

  developersPage: {
    meta: {
      title: 'Developers — Deep Work Plan agent API, MCP server & docs',
      description:
        'The Deep Work Plan agent surface: a read-only, zero-auth API with an OpenAPI spec, an MCP server, per-page Markdown in 17 languages, and the npx skills CLI.',
    },
    eyebrow: 'Agent & developer surface',
    title: 'Deep Work Plan for developers and AI agents',
    intro:
      'deepworkplan.com ships a machine-readable surface alongside its pages: an OpenAPI-described agent API, a stateless MCP server, native Markdown mirrors for every page in 17 languages, and the installable DWP skill. Everything on this page is live, public, and free — there is nothing to sign up for.',
    accessTitle: 'Zero-auth by design',
    accessIntro:
      'There are no API keys to generate, no OAuth dance, and no sandbox separate from production — the production surface itself is the sandbox. This is a deliberate property of the methodology: agents cannot fill in "contact sales" forms, so the site never asks for one.',
    accessPoints: [
      {
        title: 'Read-only',
        body: 'Every operation is a safe, cacheable GET — except the MCP endpoint, which is POST. There are no write operations, uploads, or state changes anywhere.',
      },
      {
        title: 'No API keys',
        body: 'No registration, no tokens, no rate-limit tiers. Anonymous access is the documented contract, declared in /auth.md and the OAuth discovery stubs.',
      },
      {
        title: 'Free & open source',
        body: 'The site content and the DWP skill are MIT-licensed. Use them in commercial and non-commercial work without asking permission.',
      },
      {
        title: 'Machine-first',
        body: 'Structured JSON errors on /api paths, Markdown 404 recovery bodies, RFC 9727 API catalog, and an ARD capability manifest — built for agent consumption.',
      },
    ],
    endpointsTitle: 'Endpoints',
    endpointsIntro:
      'The core endpoints of the agent API. The complete, typed specification — every operation, parameter, and response schema — lives at the OpenAPI document.',
    endpointsNote:
      'Unknown /api/* paths return a structured JSON error with a resolution hint, never an HTML error page.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'OpenAPI 3.1 specification of the whole agent API.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Curated LLM guidance index — the recommended entry point for agents.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'The canonical DWP adoption prompt (make any repository AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Any page as native source Markdown — in all 17 languages (e.g. /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Static health marker with links to the spec and this portal.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP server (Streamable HTTP, stateless): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'ARD capability manifest — the agentmap declared in robots.txt.',
      },
    ],
    mcpTitle: 'MCP server',
    mcpIntro:
      'A stateless Model Context Protocol server over Streamable HTTP. Three read-only tools: get_init_prompt, list_site_sections, and read_page. Protocol versions 2025-03-26 and 2025-06-18 are supported; no session is required.',
    mcpCodeLabel: 'Terminal — JSON-RPC over HTTP',
    mcpNote:
      'The MCP manifest lives at /.well-known/mcp.json and the server card at /.well-known/mcp/server-card.json. Claude, ChatGPT, and any MCP client can call these tools natively.',
    markdownTitle: 'Markdown for agents',
    markdownIntro:
      'Every rendered page is published as native source Markdown — not an HTML conversion. Request Markdown explicitly with a URL suffix or through HTTP content negotiation on any page.',
    markdownCodeLabel: 'Terminal — content negotiation',
    markdownNote:
      'Content negotiation returns the same source Markdown the site renders from, in the language of the URL you request.',
    cliTitle: 'Install the kit',
    cliIntro:
      'The official install path for the Deep Work Plan skill — the same command the /init endpoint gives agents. It works with any skills-compatible coding agent (Claude Code, Cursor, Codex, Gemini, and others).',
    cliCodeLabel: 'Terminal — skills CLI',
    cliNote:
      'The skill vendors into .agents/skills/deepworkplan/ inside your repository, so every agent that touches the repo shares the same methodology.',
    resourcesTitle: 'Machine-readable resources',
    resources: [
      { label: 'OpenAPI spec (/openapi.json)', href: '/openapi.json' },
      { label: 'Agent access & auth declaration (/auth.md)', href: '/auth.md' },
      {
        label: 'API catalog, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP manifest (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Security contact (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Site repo descriptor (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Point an agent at it',
    ctaBody:
      'The fastest path is still one line: hand any coding agent the /init prompt and it installs the skill, onboards your repository, and starts finishing deep work.',
    ctaPrimary: 'Open the /init prompt',
    ctaSecondary: 'Read the methodology',
  },

  privacyPage: {
    meta: {
      title: 'Privacy — Deep Work Plan',
      description:
        'The deepworkplan.com privacy policy: a static site with no accounts, no advertising, cookieless analytics, and exactly what the contact form collects.',
    },
    eyebrow: 'Privacy policy',
    title: 'Privacy on deepworkplan.com',
    intro:
      'Deep Work Plan is a static documentation and methodology site. This page explains, plainly and completely, what data the site touches when you visit: there is no accounts system, no advertising, and no cross-site tracking anywhere in it.',
    lastUpdated: 'September 8, 2026',
    sections: [
      {
        heading: 'What the site is',
        body: 'deepworkplan.com is a collection of static pages served through a CDN. There is no login, no user database, and no way for the site to store personal profiles. Content is developed in public GitHub repositories under the DailybotHQ organization, and everything you read here is served exactly as built.',
      },
      {
        heading: 'Analytics',
        body: 'The site uses Umami, a cookieless, privacy-first analytics service, to count page views in aggregate. Umami does not set tracking cookies and does not build cross-site profiles. Because AI crawlers do not run JavaScript, a server-side edge function also records the user agent and path of automated bot visits as anonymous analytics events — this identifies crawler software (for example "GPTBot visited /init"), never a human visitor.',
      },
      {
        heading: 'Cookies and local storage',
        body: 'The site sets no tracking cookies. The only thing stored in your browser is a theme preference (light or dark mode) kept in localStorage, which never leaves your device and is not transmitted anywhere. If you clear your browser storage, the site simply returns to your system default theme.',
      },
      {
        heading: 'Third-party services',
        body: "Hosting and delivery run on Cloudflare Pages, which processes request logs and IP addresses at the edge as part of operating the CDN and blocking abuse, under Cloudflare's own privacy policy. Aggregate analytics run on Umami (cloud.umami.is). If you voluntarily submit the contact form, your answers are sent through Google Forms to our team — that is the only place where information you type is collected, and it is used solely to reply to you.",
      },
      {
        heading: 'What we do not do',
        body: 'We do not sell or share personal data, run advertising or remarketing pixels, fingerprint browsers, or send marketing email. The site has no newsletter signup and no telemetry beyond the aggregate, cookieless counts described above.',
      },
      {
        heading: 'Your choices',
        body: 'Because analytics here are aggregate and cookieless, there is no personal profile to export or delete. You can block the analytics script with any content blocker without affecting how the site works. If you have submitted the contact form and want your message deleted, write to the contact address below and we will remove it.',
      },
      {
        heading: 'Changes to this policy',
        body: 'If this policy changes materially, the updated date at the top of this page changes with it, and substantive edits are committed to the public website repository where anyone can review the history.',
      },
    ],
    contactTitle: 'Contact and security',
    contactBody:
      "For privacy questions write to security@dailybot.com. To report a security vulnerability, prefer GitHub's private vulnerability reporting for the website and skill repositories — see /.well-known/security.txt for the exact addresses.",
  },
};
