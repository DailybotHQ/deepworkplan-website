/**
 * ko translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const ko: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — AI 코딩 에이전트를 위한 구조화된 실행',
  siteDescription:
    'Deep Work Plan: 구조화되고 검증 가능하며 재개할 수 있는 장시간 AI 에이전트 실행을 위한 오픈 방법론이자 레퍼런스 키트.',

  // Navigation
  nav: {
    home: '홈',
    about: '소개',
    contact: '문의',
    // Deep Work Plan IA
    methodology: '방법론',
    spec: '스펙',
    kit: '키트',
    examples: '예시',
    init: 'Init',
    quickstart: '빠른 시작',
    trust: '신뢰',
    developers: '개발자',
    privacy: '개인정보 보호',
    github: 'GitHub',
    faq: '자주 묻는 질문',
    compare: '비교',
    changelog: 'Changelog',
    resources: '리소스',
    resourcesDesc: '예시, 신뢰, 자주 묻는 질문, 비교',
    repo: {
      label: '소스 코드',
      website: '웹사이트 저장소',
      websiteDesc: '이 사이트',
      skill: '스킬 저장소',
      skillDesc: '설치 가능한 스킬',
    },
    menu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
  },

  // Footer
  changelogPage: {
    meta: {
      title: 'Deep Work Plan 변경 기록',
      description:
        'Deep Work Plan 스킬, 방법론, 이식 가능한 에이전트 하네스의 주요 업데이트입니다.',
    },
    eyebrow: '변경 기록',
    title: '방법론을 만든 작업',
    intro:
      '장기 에이전트 작업을 안정적으로 만드는 릴리스와 설계 결정을 출처와 함께 보여 주는 타임라인입니다.',
    viewDetail: '업데이트 읽기',
    backToIndex: '모든 업데이트',
    sourceLabel: '출처',
    featuredLabel: '주요 릴리스',
    relatedTitle: '관련 업데이트',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: '모든 권리 보유.',
    poweredBy: 'Powered by',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'New · 토큰 효율적',
    text: 'Deep Work Plan이 오늘 Product Hunt에 출시됐어요',
    tagline: '에이전트에게 계획을',
    linkText: '추천하기',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: '사이트 내비게이션',
    sections: {
      methodology: '방법론',
      getStarted: '시작하기',
      project: '프로젝트',
      connect: '연결',
      learn: '더 알아보기',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — AI 코딩 에이전트를 위한 구조화된 실행',
      description:
        '모델보다 컨텍스트가 더 중요합니다. Deep Work Plan은 어떤 리포지토리든 코딩 에이전트가 장시간 작업을 끝까지 완수하는 구조화된 환경으로 바꿉니다.',
    },
    hero: {
      badge: '오픈 방법론 · MIT · 에이전트 비종속',
      title: '모델은 중요합니다.',
      titleEmphasis: '컨텍스트는 더 중요합니다.',
      subtitle:
        'Deep Work Plan은 어떤 저장소든 구조화된 환경 — 컨텍스트, 가드레일, 지속되는 계획 — 으로 바꾸어, 어떤 코딩 에이전트든 정확하고 효율적으로 실행하며 장기 작업을 끝까지 완수합니다.',
      instructionLabel: '에이전트에 복사하기',
      instruction:
        'init.md 프롬프트를 복사하여 코딩 에이전트 — Claude Code, Cursor, Codex, 또는 다른 에이전트 — 에 붙여넣어 어떤 리포지토리든 AI-first로 만드세요.',
      copyLabel: 'init.md 복사',
      copiedLabel: '복사됨',
      viewInitCta: '전체 /init 프롬프트 보기',
      pullQuote:
        'Deep Work Plan은 리포지토리 자체가 하니스(harness)가 되는 스펙 주도 개발입니다.',
      primaryCta: '방법론 읽기',
      secondaryCta: '스펙 읽기',
      illustrationAlt:
        '바위 해안의 등대가 한 줄기 빛을 비추어 작은 배를 인도하는 모습 — 어떤 에이전트든 이끄는 든든한 하니스로서의 리포지토리를 떠올리게 하는 판화.',
      scrollCta: '작동 방식 보기',
    },
    pitch: {
      kicker: '문제와 해답',
      problem:
        '짧은 작업에서 코딩 에이전트는 놀라운 성능을 보입니다. 장기 미션 — 마이그레이션, 새 서브시스템, 수십 개 파일의 리팩터링 — 을 맡기면 표류합니다: 컨텍스트가 차고, 앞선 결정이 흐려지고, 수 시간의 작업이 한복간에서 멈춥니다.',
      answer:
        'Deep Work Plan은 스펙 주도 개발로 답합니다. 지속되는 계획, 원자적 작업, 그리고 에이전트가 통과해야 하는 검증 게이트. 완료는 느낌이 아니라 — 검증 가능하고 리뷰 가능한 증거가 됩니다.',
      efficiency:
        '그리고 컨텍스트는 에이전트에게 가장 희소한 자원입니다. 그래서 하네스는 토큰 효율을 위해 설계되었습니다: 지시사항은 점진적으로 로드하고, 검증은 변경된 부분만 다루며, 학습은 작업 자리에서 이루어집니다 — 긴 작업도 경제적으로 지속됩니다. 계획 자체도 같은 원리를 따릅니다: 범위가 한정된 수정에는 Lite 계획을, 몇 시간에 걸친 작업에는 Full 계획을 — 형식은 항상 작업의 범위를 따르며, 그 반대가 아닙니다.',
      illustrationAlt:
        '한쪽은 안개 속 암초 옆을 표류하는 배, 다른 쪽은 같은 배가 그려진 항로를 따라 항구 등불로 나아가는 모습의 판화 디프틱.',
    },
    story: {
      act1: {
        kicker: '방법론 · 제1막',
        lead: '완료가 무엇인지, 경계가 어디인지 정하는 것은 사람입니다. 계획이 의도를 담고, 에이전트가 시간을 소모합니다 — 늘 지켜볼 필요도, 이십 분마다 고칠 필요도 없습니다.',
        deepLinkLabel: '방법론 읽기',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: '방법론 · 제2막',
        lead: '긴 작업은 어떤 모델의 컨텍스트도 채웁니다. 세부 사항은 사라지고 에이전트는 표류합니다. 서면 계획 — 원자적 작업, 검증 게이트, 재개 가능한 상태 — 이야말로 매 바퀴 돌아오는 기준입니다.',
        deepLinkLabel: '핵심 루프 보기',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: '방법론 · 제3막',
        lead: '각 작업은 수용 기준과 통과해야 할 검사를 명시합니다. 에이전트가 완료된 느낌으로 끝낼 수는 없습니다 — 통과하거나, 아니면 작업은 열린 채로 남습니다.',
        deepLinkLabel: '사양 읽기',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: '방법론 · 제4막',
        lead: '컨텍스트, 도구, 가드레일, 상태는 어떤 에이전트나 읽을 수 있는 평범한 파일로 저장소 안에 살아 있습니다. 잠금도, 외부 두뇌도 없이 — 컨텍스트 초기화 이후에도 유지됩니다.',
        deepLinkLabel: '온보딩이 생성하는 것 보기',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: '방법론 · 제5막',
        lead: '컨텍스트는 에이전트에게 가장 희소한 자원입니다. 하네스는 점진적으로 로드하고, 변경된 부분만 검증하며, 작업마다 학습합니다 — 계획이 스스로 비용을 회수합니다.',
        deepLinkLabel: '방법론 읽기',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: '추론 기반 온보딩',
      title: '어떤 리포지토리든 가리키세요. 복사·붙여넣기가 아니라 추론합니다.',
      subtitle:
        '온보딩 흐름은 리포지토리의 실제 언어, 프레임워크, 패키지 관리자, 검증 명령을 살펴본 뒤, 그 리포지토리에 맞춘 산출물을 생성합니다. 범용 스텁은 실패로 간주됩니다.',
      steps: [
        {
          title: '스택과 아키타입을 추론합니다',
          description:
            '매니페스트, 폴더 구조, CI를 읽어 실제 test, lint, build 명령을 추론한 뒤, 리포지토리를 개별 리포지토리 또는 오케스트레이터 허브로 분류합니다.',
        },
        {
          title: 'AGENTS.md, docs/, 모듈별 문서를 생성합니다',
          description:
            '추론으로 작성된 AGENTS.md, 분류된 docs/ 계층, 그리고 주요 모듈마다 들어가는 README와 docs/ — 모두 플레이스홀더가 아니라 리포지토리의 실제 명령으로 채워집니다.',
        },
        {
          title:
            '.claude 및 .cursor → .agents 심링크와 함께 .agents/를 구성합니다',
          description:
            '교차 에이전트용 .agents/ 디렉터리(스킬, 에이전트, 명령)와 .claude 및 .cursor → .agents 심링크를 만들고, CLAUDE.md를 AGENTS.md에 미러링하여 모든 도구가 하나의 진실 공급원을 읽도록 합니다.',
        },
        {
          title: 'DWP 스킬을 설치하고 .dwp/를 구성합니다',
          description:
            'Deep Work Plan 스킬을 연결하고 계획과 초안을 위한 gitignore된 .dwp/ 폴더를 생성한 뒤, 필수인 AI Diff Reviewer 로컬 리뷰를 설치하고, 필요하면 devcontainer 지원 같은 선택형 애드온을 추가로 얹습니다.',
        },
      ],
    },
    quickstart: {
      badge: '실행하면 무슨 일이 일어나는가',
      title: '지침은 한 줄. 나머지는 리포지토리가 합니다.',
      subtitle:
        '설치 방식을 고르거나 템플릿을 복사할 필요가 없습니다. 에이전트에게 한 줄을 건네면, 에이전트가 재사용 가능한 엔진인 스킬을 설치하고 리포지토리를 거기에 맞게 적응시킵니다.',
      steps: [
        {
          title: '에이전트가 /init.md를 엽니다',
          description:
            'deepworkplan.com/init.md의 온보딩 프롬프트와 그것이 링크하는 방법론, 스펙, 키트 — 곧 채택할 표준 — 를 읽습니다.',
        },
        {
          title: 'Deep Work Plan 스킬을 설치합니다',
          description:
            '스킬은 모든 리포지토리에서 동일한 엔진입니다. 명령 한 줄로 라우터와 그 하위 스킬(create, execute, refine, resume, status, verify, onboard, author)을 Claude Code, Cursor, Codex, Gemini, Copilot용으로 가져옵니다.',
        },
        {
          title: '리포지토리를 적응시킵니다',
          description:
            '복사·붙여넣기가 아니라 실제 스택을 추론하여 AGENTS.md, 분류된 docs/ 트리, 모듈별 README, 추론된 .agents/ 키트, gitignore된 .dwp/를 작성합니다. 리포지토리가 하니스가 됩니다.',
        },
        {
          title: '계획하고 실행합니다',
          description:
            '어떤 작업이든 장시간 Deep Work Plan을 생성하고 단계별로 실행합니다. 명시적인 인수 기준, 검증 게이트, 재개 가능한 상태와 함께 수 시간 동안 자율적으로 진행됩니다.',
        },
      ],
      note: '스킬은 어디서나 동일하게 설치됩니다. 적응되는 것은 리포지토리입니다 — 스택에 맞게 생성된 AGENTS.md, 문서, 추론된 .agents/ 키트. 이 분리가 방법론을 일회성 스캐폴드가 아니라 재사용 가능한 표준으로 만듭니다.',
    },
    outcomes: {
      badge: '무엇을 얻는가',
      title: '에이전트가 자율적으로 일하는 데 필요한 모든 것.',
      subtitle:
        '한 번의 실행, 원자적인 커밋. 모든 산출물은 Markdown이고 모든 변경은 감사 가능합니다.',
      items: [
        {
          label: '리포지토리 루트의 AGENTS.md',
          detail:
            '플레이스홀더가 있는 템플릿이 아니라 리포지토리의 실제 스택, 명령, 구조에서 추론됩니다. CLAUDE.md는 AGENTS.md에 심링크됩니다.',
        },
        {
          label: '분류된 docs/와 모듈별 문서',
          detail:
            '아키텍처, 셋업, 표준, 문제 해결 — 그리고 코드베이스에서 생성된, 주요 모듈마다 들어가는 README와 docs/.',
        },
        {
          label: '.claude 및 .cursor → .agents 심링크가 있는 .agents/',
          detail:
            '교차 에이전트용 .agents/ 디렉터리(스킬, 에이전트, 명령)와 .claude 및 .cursor → .agents 심링크로 모든 도구가 하나의 진실 공급원을 읽습니다.',
        },
        {
          label: '설치된 Deep Work Plan 스킬',
          detail:
            'create, execute, refine, resume, status, verify, onboard, author — 리포지토리별 복사 없이 단일 스킬 팩으로 에이전트가 사용할 수 있습니다.',
        },
        {
          label: '직접 확인할 수 있는 적합성',
          detail:
            '/dwp-verify는 스펙에 대비한 객관적 합격/불합격 보고서를 만들어, "AI-first"가 단언이 아니라 검증된 사실이 되게 합니다 — 모든 계획 이후 재검증도 가능합니다.',
        },
        {
          label: '두 가지 아키타입, 모두 처리',
          detail:
            '온보딩은 리포지토리를 개별 리포지토리(일반적인 경우) 또는 여러 리포지토리에 걸친 하위 계획을 조율하는 오케스트레이터 허브로 분류합니다.',
        },
        {
          label: '리포지토리가 키워 가는 살아 있는 키트',
          detail:
            'author 하위 스킬(skill-create, agent-create)로 리포지토리가 자체 스킬, 에이전트, 명령을 발전시킬 수 있습니다. dependency-upgrade 같은 선택형 유지보수 애드온이 최신 상태를 유지하도록 돕습니다.',
        },
        {
          label: 'Git 네이티브, 재개 가능, .dwp/',
          detail:
            '데몬도 외부 상태도 없습니다. 계획과 초안은 gitignore된 .dwp/ 폴더에 저장되며, 컨텍스트가 넘쳐도 git만으로 어떤 작업이든 재개됩니다.',
        },
      ],
    },
    agents: {
      badge: '에이전트',
      title: '이미 사용 중인 에이전트와 함께 작동합니다.',
      subtitle:
        '하나의 방법론, 여러 어댑터. Markdown은 프레임워크를 어떤 것에도 묶지 않습니다 — Markdown을 읽는 모든 에이전트가 Deep Work Plan을 실행할 수 있습니다.',
      fullLabel: '완전',
      partialLabel: '부분',
      viewAllCta: '모든 에이전트 보기',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: '네이티브 WebFetch와 슬래시 명령을 갖춘 레퍼런스 구현.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: '완전한 어댑터. WebFetch가 차단되면 오프라인 번들을 사용하세요.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: '오프라인 번들 권장. 규칙은 .codex/ 아래에 설치됩니다.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: '완전한 어댑터 — dwp-* 명령이 AGENTS.md와 # 절차를 통해 실행됩니다.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Gemini 2.5 Pro 이상이 필요하며 네이티브 WebFetch를 지원합니다.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: '오픈 소스. AGENTS.md를 네이티브로 읽고 # 명령으로 dwp-*를 실행합니다.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: '규칙과 # 명령 절차가 완전한 Deep Work Plan 루프를 구동합니다.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: '오픈 소스. Markdown 규칙과 # 명령이 모든 dwp-* 단계를 실행합니다.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: '네이티브 명령 표면을 갖춘 완전한 어댑터.',
        },
      ],
    },
    stacks: {
      badge: '스택',
      title: '중요한 스택을 위한 추론 프리셋.',
      subtitle:
        '이것은 템플릿이 아니라 추론 보조 자료입니다. 온보딩은 리포지토리의 실제 매니페스트를 읽고 스택별로 적응합니다 — 프리셋을 맹목적으로 복사하지 않습니다. 모노레포는 모듈별 문서를 받습니다.',
      viewAllCta: '모든 프리셋 보기',
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
        { name: 'Generic', sub: '모든 스택' },
      ],
    },
    archetypes: {
      badge: '두 가지 아키타입',
      title: '개별 리포지토리, 또는 오케스트레이터 허브.',
      subtitle:
        '온보딩은 아키타입에 따라 갈립니다. 대부분의 리포지토리는 개별 리포지토리입니다. 허브는 여러 리포지토리에 걸쳐 하위 Deep Work Plan을 조율합니다. 방법론은 둘 다 일급으로 다룹니다.',
      individual: {
        tag: '일반적인 경우',
        title: '개별 리포지토리',
        description:
          '하나의 주요 스택, 자체 검증 명령, 모듈별 문서를 갖춘 단일 코드베이스. 기본값이며, 리포지토리가 명백히 허브가 아닌 한 온보딩은 이를 가정합니다.',
        example:
          '예를 들어 Django API, Vue 앱, TypeScript Lambda 서비스가 있습니다.',
      },
      orchestrator: {
        tag: '조율',
        title: '오케스트레이터 허브',
        description:
          '오케스트레이터 매니페스트를 통해 하위 리포지토리 전반의 작업을 조율하는 조율 리포지토리입니다. 각자 자신의 리포지토리에 커밋하는 하위 계획을 생성하며, 경계 규칙과 내비게이션 인덱스를 함께 둡니다.',
        example:
          '예를 들어 다섯 개의 제품 리포지토리를 조율하는 허브가 있습니다.',
      },
    },
    comparison: {
      badge: '방법론 대 도구',
      title: '다른 레이어. 경쟁이 아니라 보완.',
      subtitle:
        'Deep Work Plan은 또 하나의 스캐폴더가 아닙니다. 스펙 주도 또는 스캐폴딩 도구 아래에 자리한 방법론 레이어이며, 장시간 자율 실행에 초점을 둡니다.',
      colDwp: 'Deep Work Plan',
      colOthers: '스캐폴딩 / 스펙 도구',
      rows: [
        {
          label: '주요 초점',
          dwp: '장시간 자율 실행',
          others: '스펙 또는 스캐폴드 생성',
        },
        {
          label: '작업 단위',
          dwp: 'Deep Work Plan(재개 가능한 세션)',
          others: '스펙 문서 또는 스캐폴드',
        },
        {
          label: '상태 모델',
          dwp: 'Git 네이티브 .dwp/ 폴더, 재개 가능',
          others: '종종 외부 또는 IDE 내부',
        },
        {
          label: '에이전트 결합',
          dwp: '에이전트 비종속(Markdown과 Bash)',
          others: '종종 도구 또는 IDE 종속',
        },
        {
          label: '컨텍스트 복구',
          dwp: '컨텍스트 초과 후 재개',
          others: '대개 작업을 다시 시작',
        },
        {
          label: '라이선스',
          dwp: 'MIT, 오픈 방법론 및 키트',
          others: '경우에 따라 다름',
        },
      ],
    },
    origin: {
      badge: '기원',
      quote:
        '분산 팀을 위한 비동기 스탠드업을 만드는 회사 Dailybot이 구축했습니다. 우리는 사내에서 Deep Work Plan을 사용해 Django, Vue, TypeScript Lambda, Astro에 걸친 프로덕션 리포지토리를 에이전트가 조종할 수 있게 만들었습니다. 수개월의 프로덕션 사용 끝에 이 방법론을 MIT 라이선스로 공개했습니다.',
      attribution: 'Dailybot 엔지니어링 팀',
      dailybotCta: 'Dailybot 알아보기',
    },
    finalCta: {
      badge: '리포지토리를 AI-first로 만드세요',
      title: '에이전트에게 깊은 작업을 맡기세요.',
      subtitle:
        '에이전트에게 한 줄을 건네 /init.md를 가리키면 리포지토리가 AI-first가 됩니다. 스킬을 설치하고, 스택을 추론하고, 완전한 AGENTS.md 계층을 커밋합니다. 거기서부터 수 시간 동안 자율적으로 실행되는 Deep Work Plan을 생성하고 실행합니다.',
      primaryCta: '/init 프롬프트 열기',
      secondaryCta: '방법론 읽기',
      tertiaryCta: '에이전트와 개발자용',
      meta: 'MIT 라이선스 · 텔레메트리 없음 · 산출물은 gitignore된 .dwp/ 폴더로.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: '문의',
    nameLabel: '이름',
    namePlaceholder: '성함',
    emailLabel: '이메일',
    emailPlaceholder: 'your@email.com',
    messageLabel: '메시지',
    messagePlaceholder: '메시지를 작성하세요...',
    sendButton: '메시지 보내기',
  },

  // About page
  aboutPage: {
    title: '방법론 소개',
    subtitle: '오픈 방법론 · MIT 라이선스',
    description:
      'Deep Work Plan은 AI 코딩 에이전트와 함께하는 진지한 엔지니어링 작업을 위한 오픈, 프레임워크 비종속 방법론입니다. 어디서 왔고 누가 관리하는지 소개합니다.',
    heroDescription:
      'AI 코딩 에이전트와 함께 깊은 작업을 계획하고, 실행하고, 검증하는 반복 가능한 구조 — 공개적으로 만들어졌고 자유롭게 사용할 수 있습니다.',
    bioTitle: '무엇인가',
    bioText:
      'Deep Work Plan(DWP)은 제품이 아니라 방법론입니다. 목표를 합의된 계획으로 바꾸고, 그 계획을 원자적이며 독립적으로 검증 가능한 작업으로 나누며, 각 작업을 검증으로 마무리되는 집중된 루프로 실행하는 방법을 정의합니다.<br /><br />어떤 AI 에이전트나 스택을 쓰는지에 대해 의도적으로 비종속적입니다 — 어댑터가 동일한 핵심 루프를 Claude, Cursor, Copilot, Codex, Gemini 등으로 옮깁니다. 계획, 작업, 실행 로그는 모두 일반 Markdown이므로 작업은 읽기 쉽고, 검토 가능하며, 버전 관리됩니다.',
    passionsTitle: '핵심 원칙',
    passions: [
      {
        title: '실행 전에 계획',
        description:
          '계획이 합의되기 전에는 어떤 코드도 작성하지 않습니다. 계획은 사용자와 에이전트 사이의 계약입니다.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: '작업은 원자적',
        description:
          '각 작업은 단독으로 실행하고 검증한 뒤 원자적으로 커밋할 수 있도록 범위가 정해집니다.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: '모든 것을 검증',
        description:
          '모든 작업은 다음 작업이 시작되기 전 명시적 검증으로 끝나며, 진행 상황은 git에 기록됩니다.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: '한눈에 보기',
    quickFacts: [
      '오픈 방법론, MIT 라이선스',
      '프레임워크 및 에이전트 비종속',
      'Dailybot과 커뮤니티가 관리',
      '스펙, 명령, 어댑터, 프리셋, 예시 포함',
      'Markdown 전용 — 런타임 없음, 종속 없음',
      '어떤 리포지토리든 AI-first이며 에이전트가 조종 가능한 코드베이스로 전환',
    ],
    ctaTitle: '누가 관리하는가',
    ctaDescription:
      'Deep Work Plan은 Dailybot의 실제 엔지니어링 작업에서 자라났으며, 현재 Dailybot과 오픈소스 커뮤니티가 함께 관리합니다. 방법론, 스펙, 키트는 MIT 라이선스로 공개됩니다 — 자유롭게 사용하고, 적응시키고, 그 위에 만들 수 있습니다.',
    ctaCv: '방법론 읽기',
    ctaContact: '빠른 시작',
  },

  // Contact page
  contactPage: {
    title: '커뮤니티 & 문의',
    subtitle: '오픈소스 · 커뮤니티 주도',
    description:
      'Deep Work Plan은 공개적으로 만들어집니다. 소스를 찾고, 이슈를 열고, 아래 채널로 대화에 참여하세요 — 기여를 환영합니다.',
    heroDescription:
      '질문, 아이디어, 개선 제안이 있으신가요? Deep Work Plan은 공개적으로 개발됩니다 — 프로젝트와 관리자에게 연락할 수 있는 곳입니다.',
    formTitle: '메시지 보내기',
    nameLabel: '이름',
    namePlaceholder: '성함',
    emailLabel: '이메일',
    emailPlaceholder: 'your@email.com',
    reasonLabel: '문의 주제',
    reasonOptions: [
      { value: '', label: '— 주제를 선택하세요 —' },
      { value: 'general', label: '일반 / 인사 전하기' },
      { value: 'tech-talk', label: '기술 강연 / 연사 초청' },
      { value: 'collaboration', label: '협업 / 파트너십' },
      { value: 'project', label: '프로젝트 / 업무 문의' },
      { value: 'dailybot', label: 'Dailybot 관련 질문' },
      { value: 'trading', label: '트레이딩 관련 질문' },
      {
        value: 'the-library-of-tomorrow',
        label: 'The Library of Tomorrow 참여',
      },
      { value: 'other', label: '기타' },
    ],
    subjectLabel: '제목',
    subjectPlaceholder: '무엇에 관한 내용인가요?',
    messageLabel: '메시지',
    messagePlaceholder: '메시지를 작성하세요...',
    sendButton: '메시지 보내기',
    sendingButton: '보내는 중...',
    successTitle: '메시지가 전송되었습니다',
    successMessage: '연락 주셔서 감사합니다. 가능한 한 빨리 답변드리겠습니다.',
    sendAnotherButton: '다른 메시지 보내기',
    requiredField: '필수 입력 항목입니다',
    invalidEmail: '유효한 이메일 주소를 입력하세요',
    fallbackMessage:
      '문의 양식을 현재 사용할 수 없습니다. 이메일로 직접 연락하실 수 있습니다.',
    fallbackEmailText: '다음 주소로 이메일을 보내주세요',
    formNote: '가능한 한 빨리 답변드리겠습니다.',
    socialTitle: '함께 연결하기',
    locationTitle: '위치',
    locationText:
      '콜롬비아에 기반을 두고 있으며, 전 세계 원격 협업에 열려 있습니다.',
    prefillSubjects: {
      generalInquiry: '일반 문의',
      collaboration: '협업 기회',
      projectInquiry: '프로젝트 또는 업무 문의',
      projectCollaboration: '프로젝트 협업 문의',
      startupCollaboration: '스타트업 협업 기회',
      techTalkInvitation: '기술 강연 연사 초청',
      tradingQuestion: '트레이딩 질문',
      dailybotQuestion: 'Dailybot 관련 질문',
    },
  },

  contactSection: {
    title: '함께 연결해요',
    description:
      '흥미로운 대화, 협업 기회, 새로운 아이디어에 언제나 열려 있습니다. 기술 이야기든, 창업 이야기든, 그저 인사를 건네고 싶으시든 환영합니다.',
    ctaText: '연락하기',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'ko-KR',

  // 404 page
  notFoundPage: {
    title: '페이지를 찾을 수 없습니다',
    description:
      '찾으시는 페이지가 존재하지 않거나 이동되었습니다. 방법론을 살펴보거나 홈페이지로 돌아가 계속 둘러보세요.',
    heading: '페이지를 찾을 수 없습니다',
    message:
      '죄송합니다. 찾으시는 페이지가 존재하지 않거나 이동되었을 수 있습니다. 홈페이지로 돌아가거나 방법론을 둘러보세요.',
    backHome: '홈으로 돌아가기',
    exploreMethodology: '방법론 읽기',
    agentTitle: 'AI 에이전트용',
    agentIntro:
      '이 경로는 존재하지 않습니다. 아래의 복구 링크(및 그 기계 판독 가능한 대응물)가 이 사이트의 모든 페이지를 나열합니다.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Deep Work Plan 방법론',
      description:
        '매니페스토부터 아키타입까지 다섯 장: Deep Work Plan을 떠받치는 원칙, 핵심 루프, 템플릿, 스킬과 에이전트, 그리고 적응 방식을 다룹니다.',
    },
    eyebrow: '방법론',
    title: 'Deep Work Plan 방법론',
    intro:
      'Deep Work Plan의 철학에서 출발해 매일 사용하는 실전 루프, 템플릿, 적응 방식까지 안내하는 다섯 장.',
    chapterLabel: '장',
    readChapter: '장 읽기',
    prev: '이전',
    next: '다음',
    backToIndex: '전체 장',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan 스펙',
      description:
        'Deep Work Plan 방법론의 읽기 쉬운 스펙: DWP 형식, 에이전트 프로토콜, 아키타입, 문서화 표준, 애드온을 다룹니다.',
    },
    eyebrow: '스펙',
    title: '스펙',
    intro:
      '방법론의 정밀하고 읽기 쉬운 스펙 — 사람과 에이전트가 공유하는 구조와 프로토콜.',
    tocTitle: '이 페이지에서',
    prev: '이전',
    next: '다음',
    backToIndex: '전체 스펙 문서',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Deep Work Plan 키트',
      description:
        '스킬과 여덟 개의 하위 스킬, 명령, 어댑터, 프리셋, 선택형 애드온, 예시 — Deep Work Plan을 여러 에이전트와 스택에서 실행 가능하게 만듭니다.',
    },
    eyebrow: '키트',
    title: '키트',
    intro:
      '방법론을 실행하는 데 필요한 모든 것: 스킬과 그 하위 스킬, 슬래시 명령, 에이전트 어댑터, 온보딩 프리셋, 필수 로컬 리뷰와 선택형 애드온, 그리고 실제 예시.',
    groups: {
      command: {
        title: '하위 스킬 & 명령',
        description:
          '스킬 라우터와 그 하위 스킬(create, execute, refine, resume, status, verify, onboard, author), 그리고 그것들에 위임하는 얇은 슬래시 명령.',
      },
      adapter: {
        title: '어댑터',
        description: 'Claude, Cursor, Codex 등을 위한 얇은 에이전트별 통합.',
      },
      preset: {
        title: '온보딩 프리셋',
        description:
          'onboard 흐름이 문서, 스킬, 검증 명령을 리포지토리에 맞게 적응시킬 때 사용하는 스택별 추론 가이드.',
      },
      example: {
        title: '예시',
        description: '실제로 작업한 전후 비교 워크스루.',
      },
      addon: {
        title: '애드온(선택형)',
        description:
          'onboard 흐름이 리포지토리에 얹는 기능: 필수인 AI Diff Reviewer 로컬 리뷰와, AI-first 기준선의 일부가 결코 아닌 네 가지 선택형 애드온.',
      },
    },
    viewDetail: '상세 보기',
    prev: '이전',
    next: '다음',
    backToIndex: '키트로 돌아가기',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan 예시',
      description:
        'Deep Work Plan을 사용한 경우와 사용하지 않은 경우 동일한 엔지니어링 작업을 보여 주는 전후 비교 워크스루 — 신뢰성과 검토에서의 차이.',
    },
    eyebrow: '예시',
    title: '예시',
    intro:
      '방법론이 작동하는 모습을 확인하세요 — 실제 엔지니어링 작업의 구체적인 전후 비교 워크스루.',
    viewExample: '워크스루 읽기',
    prev: '이전',
    next: '다음',
    backToGallery: '전체 예시',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: '빠른 시작 — Deep Work Plan',
      description:
        '스킬을 설치하고 리포지토리를 온보딩한 뒤 어떤 에이전트로든 계획하고 실행하세요 — 리포지토리를 스펙 주도이며 에이전트가 조종 가능하게 만드는 단계.',
    },
    eyebrow: '빠른 시작',
    title: '몇 분 만에 시작',
    intro:
      '스킬을 설치하고 리포지토리를 온보딩한 뒤 어떤 에이전트로든 계획하고 실행하세요 — 리포지토리를 스펙 주도이며 에이전트가 조종 가능하게 만드는 단계.',
    sequenceTitle: '채택 경로',
    codeLabel: '터미널',
    orLabel: '또는',
    steps: [
      {
        title: 'Deep Work Plan 스킬 설치',
        description:
          '리포지토리에 스킬을 추가합니다 — 라우터와 여덟 개의 하위 스킬(create, execute, refine, resume, status, verify, onboard, author). 가장 빠른 경로로 Skills CLI를 사용하거나, 리포지토리를 클론한 뒤 git과 셸을 사용할 수 있는 곳에서 setup을 실행하세요.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '리포지토리 온보딩',
        description:
          'onboard 하위 스킬을 실행하고 에이전트가 실제 리포지토리를 추론하게 하세요. AGENTS.md, docs/ 지식 베이스, 모듈별 문서, 교차 에이전트용 .agents/ 홈(.claude → .agents 및 .cursor → .agents 심링크 포함)을 생성하고, 얇은 dwp-* 명령을 연결하며, gitignore된 .dwp/를 구성합니다.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '키트 발전과 애드온 채택',
        description:
          '/skill-create와 /agent-create(author 하위 스킬)로 스택에 맞는 스킬, 에이전트, 명령을 키우세요. 온보딩은 필수인 AI Diff Reviewer 로컬 리뷰를 설치하고(그 CI 게이트는 선택으로 남습니다), 네 가지 선택형 애드온 — devcontainer, Dailybot, dependency-upgrade, design-system — 을 제안하며, 맞을 때만 채택하면 됩니다.',
      },
      {
        title: '계획하고 실행',
        description:
          'Deep Work Plan을 생성하고 작업 단위로 실행하면서, 각 게이트를 검증하고 세션을 넘어 재개하세요 — 리포지토리를 자체 스펙에 대비해 조종합니다.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: '결과',
    outcome:
      '리포지토리가 스펙 주도이며 에이전트가 조종 가능해집니다. 계획이 견고한 단일 진실 공급원이 되고, 리포지토리 자체가 어떤 에이전트든 실행하는 하니스가 됩니다.',
    nextStepsTitle: '다음 단계',
    nextSteps: [
      { label: '방법론 읽기', href: '/methodology' },
      { label: '키트 둘러보기', href: '/kit' },
      { label: '예시 보기', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — 리포지토리를 AI-first로',
      description:
        '어떤 리포지토리에든 Deep Work Plan 방법론을 채택하세요. 스킬을 설치하고, 에이전트 온보딩을 실행한 뒤, 어떤 AI 코딩 에이전트로든 계획하고 실행하세요.',
    },
    eyebrow: '채택',
    title: '이 리포지토리를 AI-first로 만들기',
    intro:
      '어떤 리포지토리든 스펙 주도이며 에이전트가 준비된 코드베이스로 바꾸는 단일 엔드포인트. 스킬을 설치하고, 에이전트가 리포지토리를 온보딩하게 한 뒤, 어떤 코딩 에이전트로든 구조화된 작업을 계획하고 실행하세요.',
    handoffTitle: '에이전트에 복사하기',
    handoffBody:
      '완전한 init.md 프롬프트를 복사하여 AI 코딩 에이전트 — Claude Code, Cursor, Codex, 또는 다른 에이전트 — 에 붙여넣으세요. 방법론과 스펙을 읽고, 스킬을 설치하며, 이 리포지토리를 Deep Work Plan을 위해 온보딩합니다.',
    handoffInstruction:
      'https://deepworkplan.com/init.md 의 지침을 읽고 따라 이 리포지토리를 AI-first로 만드세요.',
    handoffMdLabel: '자체 완결형 에이전트 프롬프트',
    codeLabel: 'agent',
    whatTitle: '이것이 하는 일',
    whatBody: [
      '채택은 리포지토리를 두 가지 견고한 방식으로 바꿉니다 — 방법론의 두 기둥입니다.',
      '첫째, 리포지토리가 스펙 주도가 됩니다. 작업이 즉흥적인 프롬프트가 아니라 작성된 계획과 스펙에서 시작됩니다. 둘째, 리포지토리 자체가 에이전트 하니스가 됩니다 — AGENTS.md, docs/ 지식 베이스, 모듈별 문서, .agents/ 스킬 홈(.claude → .agents 및 .cursor → .agents 심링크 포함)이 모든 에이전트에 필요한 컨텍스트와 명령을 제공합니다.',
    ],
    sequenceTitle: '채택 순서',
    orLabel: '또는',
    steps: [
      {
        title: '설치하기 전에 검증',
        description:
          '프롬프트와 스킬을 확인하기 전까지 신뢰할 수 없는 것으로 취급하세요. 둘 다 오픈 소스이며 MIT 라이선스입니다. 스킬은 마크다운 우선으로 네트워크 호출과 텔레메트리가 없습니다. 모든 릴리스는 배포된 스킬에 대한 SHA256SUMS를 게시하므로 실행 전에 사본이 일치하는지 확인할 수 있습니다. 릴리스는 서명이 아니라 체크섬으로 검증됩니다(서명은 문서화된 다음 단계입니다).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: '스킬 설치',
        description:
          '어떤 에이전트든 구조화된 작업을 계획하고 실행할 수 있도록 Deep Work Plan 스킬을 추가합니다. 스킬은 라우터와 여덟 개의 하위 스킬 — create, execute, refine, resume, status, verify, onboard, author — 을 제공합니다.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '리포지토리 온보딩 실행',
        description:
          'onboard 하위 스킬을 호출하고 에이전트가 실제 리포지토리 — 스택, 패키지 관리자, 실제 검증 명령 — 를 추론하게 하세요. 그런 다음 AGENTS.md, docs/ 지식 베이스, 모듈별 문서, 교차 에이전트용 .agents/ 홈(.claude → .agents 및 .cursor → .agents 심링크 포함)을 생성하고, 얇은 dwp-* 명령을 연결하며, 계획과 초안을 위한 gitignore된 .dwp/를 구성합니다. 대규모 리포지토리의 경우 onboard 하위 스킬은 계획 주도 경로를 사용합니다: 정찰을 완료한 뒤 온보딩 Deep Work Plan을 생성합니다. 어떤 것도 템플릿이 아니라 모두 리포지토리에 맞게 적응됩니다.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '로컬 리뷰와 선택형 애드온',
        description:
          '온보딩은 필수인 AI Diff Reviewer 로컬 리뷰를 설치하고(그 CI 게이트는 선택으로 남습니다), 네 가지 선택형 애드온 — devcontainer, Dailybot, dependency-upgrade, design-system — 을 제안하며, 맞을 때만 채택하면 됩니다. 선택형 애드온이 하나도 없어도 리포지토리는 완전히 적합합니다. /skill-create와 /agent-create(author 하위 스킬)로 기본 구성을 넘어 스택에 맞는 스킬, 에이전트, 명령을 키우세요.',
      },
      {
        title: '계획하고 실행',
        description:
          '/dwp-create로 Deep Work Plan을 생성하고 /dwp-execute로 실행한 뒤, 작업이 진행됨에 따라 /dwp-status, /dwp-refine, /dwp-resume, /dwp-verify를 사용하세요. 각 계획은 번호가 매겨진 작업, 검증 게이트, 완료 프로토콜을 담으며 — 단 하나의 필수 Final Review(보안 패스, 최종 상태 검증, 스킬 결정 조정)로 마무리됩니다. Executive Report는 요청 시 제공됩니다.',
      },
      {
        title: '적합성 검증',
        description:
          '/dwp-verify를 실행하여 스펙 대비 객관적인 합격/불합격 보고서를 받으세요. AGENTS.md, docs/(스텁이 아닌 실제 콘텐츠), .agents/(얇은 dwp-* 위임자와 디스크와 일치하는 카탈로그), .dwp/, tmp/가 제자리에 있는지 확인하세요 — 템플릿이 아니라 이 리포지토리를 위해 추론된 모든 것.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: '결과',
    outcome:
      '리포지토리가 스펙 주도가 되고 리포지토리 자체가 에이전트 하니스가 됩니다 — 컨텍스트와 명령이 코드와 함께 움직입니다.',
    nextStepsTitle: '다음에 읽을 것',
    nextSteps: [
      { label: '빠른 시작', href: '/quickstart' },
      { label: '방법론', href: '/methodology' },
      { label: '스펙', href: '/spec' },
      { label: '키트', href: '/kit' },
    ],
  },

  faqPage: {
    meta: {
      title: '자주 묻는 질문 — Deep Work Plan',
      description:
        'Deep Work Plan이 실제로 무엇을 하는지, 검증 게이트와 세션 재개가 어떻게 작동하는지, 다른 개발 도구들과 어떻게 다른지, 그리고 어떻게 채택하기 시작하는지 — 사람들이 자주 묻는 질문에 대한 답을 이 한 페이지에 모았습니다.',
    },
    eyebrow: 'FAQ',
    title: '자주 묻는 질문',
    intro:
      'Deep Work Plan에 대해 가장 자주 묻는 질문에 짧게 답합니다. 각 항목에는 더 깊이 들어가는 페이지로 이어지는 링크가 함께 있습니다.',
    tocTitle: '이 페이지에서',
    groups: [
      {
        id: 'what',
        title: 'Deep Work Plan이란 무엇인가',
        items: [
          {
            id: 'what-is-it',
            question: 'Deep Work Plan은 실제로 무엇을 하나요?',
            answer:
              'Deep Work Plan은 리포지토리를 코딩 에이전트가 긴 작업을 안정적으로 수행할 수 있는 구조화된 환경으로 바꿉니다. 에이전트 스킬로 설치되어 리포지토리를 한 번 온보딩하고(`AGENTS.md` 인덱스, `docs/` 트리, 스킬과 명령의 `.agents/` 키트, gitignore된 `.dwp/` 출력 영역), 그다음부터는 모든 목표가 계획이 됩니다: 인수 기준과 검증 게이트를 각각 갖춘 원자적 작업들이 한 번에 하나씩 실행되고, 통과할 때마다 커밋되며, 어떤 에이전트든 디스크에서 다시 이어받을 수 있습니다. 계획은 보안을 감사하고 최종 상태를 검증하는 Final Review로 닫힙니다. 방법론은 MIT 라이선스이며 리포지토리를 읽을 수 있는 어떤 코딩 에이전트와도 작동합니다.',
            linkLabel: '방법론 읽기',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: '누구를 위한 것인가요?',
            answer:
              '코딩 에이전트에게 실제 여러 단계로 이루어진 작업을 맡기고 그것을 끝까지 마치기를 원하는 개발자와 팀이 대상입니다. 작업이 세션 하나를 넘거나, 파일군 하나를 넘거나, 에이전트 하나를 넘을 때; 팀원이 에이전트가 멈춘 지점을 이어받을 수 있어야 할 때; 또는 "완료"가 "에이전트가 그렇다고 말했다"가 아니라 "검증됨"을 의미해야 할 때 잘 맞습니다. 한 줄 수정에는 계획이 필요 없으며, 방법론도 그렇게 말합니다: 비례적 엄격도 규칙은 대신 인라인 목표, 기준, 게이트를 권장합니다.',
            linkLabel: '빠른 시작',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: 'Lite 계획과 Full 계획의 차이는 무엇인가요?',
            answer:
              '엄격도의 트레이드오프가 아니라 표현 방식의 선택입니다. 모든 계획은 Lite 폴더로 시작합니다: 앵커가 달린 작업 기록을 담은 간결한 README로, 부분적인 초안이 아니라 이미 실행 가능한 형태입니다. `create`는 작업의 지시 세부사항, 의존성, 계약이 검토 가능한 간결한 기록에 맞지 않을 때만 Full 작업 파일로 확장합니다; 둘 중 하나를 명시적으로 요청하면 그대로 반영되며, Lite 계획은 나중에 완료된 작업을 잃지 않고 Full로 승격될 수 있습니다. 두 형식 모두 동일한 인수 기준, 검증 게이트, 증거, 필수 Final Review를 갖춥니다.',
            linkLabel: '방법론 읽기',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: '도구인가요, 프레임워크인가요, 방법론인가요?',
            answer:
              '설치 가능한 스킬로 포장된 방법론입니다. 서버도, 계정도, 독점 형식도 없으며, 이미 쓰고 있는 코딩 에이전트 너머의 런타임도 없습니다. 설치되는 것은 에이전트가 읽는 지시사항, 컨텍스트 감지와 적합성 검사를 위한 작은 셸 스크립트 모음, 그리고 리포지토리가 채택하는 관례입니다. 계획이 만들어내는 모든 것은 리포지토리 안의 Markdown과 JSON이며, 어떤 도구 없이도 읽을 수 있습니다.',
            linkLabel: '스펙 읽기',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: '어떤 코딩 에이전트에서 작동하나요?',
            answer:
              '리포지토리 파일을 읽을 수 있는 에이전트라면 어느 것이든 됩니다. 스킬은 개방형 Agent Skills 표준과 `AGENTS.md` 관례를 따르므로, Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot 등이 평소의 스킬·지시사항 로딩을 통해 이를 가져옵니다. 방법론 자체 평가에서는 한 벤더의 에이전트가 시작한 계획을 다른 벤더의 에이전트가 양방향으로 이어받는 것이 확인되었습니다. 설치 지원 범위와 행동 증거는 호환성 매트릭스에 에이전트별로 나열되며, 둘은 결코 혼동되지 않습니다.',
            linkLabel: '키트 둘러보기',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: '어떻게 사용하나요?',
            answer:
              '세 단계입니다. 먼저 코딩 에이전트에 Deep Work Plan 스킬을 설치합니다——가장 빠른 방법은 `npx skills add DailybotHQ/deepworkplan-skill`(또는 스킬 리포지토리를 클론한 뒤 `./setup.sh` 실행)입니다. 두 번째로 리포지토리를 한 번 온보딩하여 에이전트가 `AGENTS.md`, `docs/`, `.agents/` 키트와 gitignore된 `.dwp/` 영역을 스택에 맞게 적응시킵니다: https://deepworkplan.com/init.md 를 가리키거나 `/deepworkplan-onboard` 를 실행합니다. 세 번째로 얇은 명령으로 작업을 계획하고 실행합니다: `/dwp-create <goal>` 이 계획을 빌드하고, `/dwp-execute` 가 각 게이트에 대해 작업 단위로 실행하고, `/dwp-refine` 이 진행 중인 계획을 편집하고(범위, 작업, 또는 Lite 계획을 Full로 승격), `/dwp-resume` 이 중단 후 계속하고, `/dwp-status` 는 실행하지 않고 진행 상황을 보고하고, `/dwp-verify` 는 객관적인 적합성 보고서를 생성합니다. `/` 를 intercept하는 에이전트는 `#` 을 쓰는 경우가 많습니다(예: `#dwp-execute`). 도입 엔드포인트와 빠른 시작이 같은 경로를 더 자세히 안내합니다.',
            linkLabel: '빠른 시작',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: '정확히 무엇이 설치되며, 어디에 설치되나요?',
            answer:
              '에이전트 스킬은 에이전트가 프로젝트 또는 사용자 스킬을 로드하는 위치라면 어디든 설치됩니다. 그런 다음 온보딩이 리포지토리 자체를 적응시킵니다: `AGENTS.md`, `docs/`, `.agents/`, 그리고 gitignore된 `.dwp/` 작업공간을 생성하거나 조정합니다. 스킬은 에이전트에게 방법론을 가르치고, 리포지토리는 다른 에이전트가 이어가는 데 필요한 컨텍스트, 키트, 계획 증거를 보관합니다.',
            linkLabel: '채택 흐름 보기',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Deep Work Plan은 Git이 필요한가요?',
            answer:
              '리포지토리에는 Git을 권장합니다. Git의 히스토리가 복구와 리뷰 표면의 일부이기 때문입니다. 하지만 방법론은 Git 리포지토리가 없는 에이전트 작업공간에서도 실행될 수 있습니다. 그 경우 `state.json` 체크포인트와 게이트 기록을 포함한 기계 판독 가능한 상태 계층이 필요하며, 그래야 복구가 대화 기록에 의존하지 않습니다.',
            linkLabel: '리포지토리 아키타입에 대해 읽기',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question: '스킬, 계획, 제품 스펙의 차이는 무엇인가요?',
            answer:
              '스킬은 에이전트가 반복 가능한 절차를 수행하는 방법을 기술합니다. DWP 계획은 범위, 인수 기준, 검증 게이트, 증거를 통해 구체적인 변경을 기술합니다. 제품 스펙은 제품의 현재 동작을 기술하며 구현 이후 델타를 통해 발전합니다; 스킬과 계획도 스펙이지만, 그 정식 제품 계약을 유지하는 것이 아니라 절차와 변경을 기술한다는 점이 다릅니다.',
            linkLabel: '스펙 읽기',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: '계획이 실행되는 방식',
        items: [
          {
            id: 'gates',
            question:
              '검증 게이트는 어떻게 구현되나요? 사람의 승인이 필요한가요?',
            answer:
              '게이트는 에이전트가 스스로 실행하는 실행 가능한 단언입니다. 사람의 승인은 실행의 양 끝에 있습니다: 실행 전에 사람이 계획을 승인하고, 풀 리퀘스트 시점에 최종 diff를 검토하며, 그 사이의 실행은 자율적입니다. 모든 작업은 구체적인 명령을 명시하는데, 대개 리포지토리 자체의 품질 게이트이며 작업의 변경 표면에서 선택됩니다: 변경된 동작과 그 소비자의 테스트, 그리고 변경이 공유되거나 범위를 한정할 수 없을 때는 전체 스위트로 넓어집니다. 작업은 그 명령들이 성공적으로 종료될 때만 완료로 표시되며, 동작을 변경하는 작업은 테스트를 확장해야 합니다. 실패하면 작업은 차단됨으로 표시되고 에이전트는 멈춥니다.',
            linkLabel: '핵심 루프',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              '실행 사이에 사람들이 코드를 바꾸면 계획이 낡아버리는 일은 어떻게 막나요?',
            answer:
              '세 가지 방면에서 그렇습니다. 작업은 편집이 아니라 동작으로 작성됩니다: 인수 기준은 시스템이 무엇을 해야 하는지를 말하므로, 파일 이름이 바뀌거나 구현이 교체되어도 무효가 되지 않습니다. 모든 게이트는 지금 현재의 리포지토리를 기준으로 다시 실행되므로, 깨진 가정은 조용히 표류하는 대신 다음 실행에서 요란하게 실패하며, 그 실패가 다듬을 신호입니다. 그리고 문서를 동기화 상태로 유지하는 것도 작업의 일부입니다: 동작을 변경하는 작업은 그것을 설명하는 문서와 에이전트 대면 키트를 자기 게이트 안에서 함께 갱신합니다. 모든 실행은 리포지토리를 처음 발견했을 때보다 에이전트에 더 준비된 상태로 남겨야 합니다.',
            linkLabel: '방법론 읽기',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              '실행 중간에 계획을 바꿔도 완료된 작업을 잃지 않을 수 있나요?',
            answer:
              '가능합니다; 부분적으로 실행된 계획을 다듬는 것은 일급 기능입니다. 작업 정의와 실행 상태는 분리되어 보관됩니다: 계획은 디스크의 체크리스트에 작은 상태 파일이 더해진 것이므로, 완료된 것은 작업 텍스트와 무관하게 기록으로 남습니다. 작업이 틀린 것으로 밝혀지면 에이전트는 억지로 밀고 나가는 대신 그것을 차단됨으로 표시하고 멈춥니다. 그런 다음 아직 실행되지 않은 작업을 편집, 재정렬, 분할, 제거하면 되고, 완료된 작업은 완료된 채로 남습니다. 재개는 디스크와 실제 리포지토리에서 상태를 재구성하고 중요한 게이트를 다시 실행하므로, 그 밑에서 바뀐 것이 빠져나가지 않습니다.',
            linkLabel: '핵심 루프',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              '작업을 계획에 대비해 계속 검사하나요, 아니면 계획은 처음 한 번뿐인가요?',
            answer:
              '계획은 연속적인 검사입니다. 에이전트는 한 번에 작은 작업 하나씩 진행하고 넘어가기 전에 검증해야 하므로, 세 걸음이 아니라 한 걸음만 벗어날 수 있습니다. 모든 작업은 인수 기준과 그것을 증명하는 정확한 명령을 담고 있고, 진행 상황은 작업별 상태와 함께 리포지토리에 기록되므로, 표류는 당신에게도, 다음 세션에도, 다음 에이전트에게도 보이게 됩니다. Final Review를 포함해 모든 것이 검증되기 전까지 계획은 끝난 것이 아닙니다. 정직한 단서: 방법론은 에이전트가 애초에 약한 인수 기준을 쓰는 것까지는 막을 수 없습니다; 대신 표류를 조용한 것이 아니라 요란한 것으로 만듭니다.',
            linkLabel: '핵심 루프',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              '계획은 한 번 생성되어 손으로 유지되나요, 아니면 코드와 함께 발전하나요?',
            answer:
              '둘 다 아닙니다. 목표에서 한 번 생성된 뒤 작업의 일부로 유지됩니다. 계획을 코드 diff에서 다시 쓰지 않는 것은 의도된 것입니다. 코드를 쫓는 스펙은 뒤처진 거울이 되는데, 그것이야말로 이 방법론이 없애기 위해 존재하는 표류이기 때문입니다. 계획은 의도적으로 발전합니다: 게이트는 현재 리포지토리를 기준으로 다시 실행되고, 실패하는 게이트는 다듬기를 유발하며, 에이전트가 실행 중에 그 다듬기를 수행하는 동안 당신은 앞에서 승인하고 끝에서 검토합니다. 문서와 테스트는 구조상 코드와 함께 발전합니다. 갱신이 각 작업의 게이트 안에 있기 때문입니다.',
            linkLabel: '방법론 읽기',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: '세션이 중간에 끊기면 어떻게 되나요?',
            answer:
              '진행 상황은 대화가 아니라 디스크에 살아 있습니다. README 체크박스, 각 작업의 로그, 범위가 한정된 작업 인덱스, 기계 판독 가능한 상태 파일이 모든 작업 경계에서 갱신되며, 상태 파일은 계획된 일시정지 전에 체크포인트를 기록합니다. 새 세션이나 다른 에이전트는 그 간결한 인덱스를 읽고 리포지토리 및 git 히스토리와 조정한 뒤, 끝낸 작업을 다시 하지 않고 완료되지 않은 첫 작업부터 계속합니다. 계획 생성이 중단된 경우조차 복구 가능합니다: 계획의 정체성과 의도된 작업 목록은 어떤 작업 파일보다 먼저 기록되므로, 반쯤 만들어진 계획은 추측하는 대신 완성하거나 폐기할 수 있습니다.',
            linkLabel: '핵심 루프',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Final Review란 무엇인가요?',
            answer:
              '모든 계획의 단 하나뿐인 필수 마무리 작업입니다. 순서대로: 계획이 쌓아온 전체 변경 집합에 대한 보안 점검 — AI Diff Reviewer 스킬에 의한 로컬 diff 리뷰가 필수로 포함되며, 치명적 발견은 수정되거나 명시적으로 수용될 때까지 완료를 막습니다; 최종 상태 검증 — 최종 코드에 대한 리포지토리의 해당되는 전체 테스트, lint, 타입 검사, 포맷 스위트를 의미합니다; 그리고 각 작업이 기록한 스킬 결정의 조정. 그런 다음 에이전트는 산출물, 증거, 한계를 보고하고, 임원 보고서를 한 번만 제안하며, 요청할 때만 생성합니다.',
            linkLabel: '스펙',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: '검증 게이트가 실패하면 어떻게 되나요?',
            answer:
              '해당 작업은 차단됨으로 기록되고, 에이전트는 완료를 주장하기 전에 멈춥니다. 증거를 살펴보고 코드를 수정하거나 작업을 다듬은 뒤 재개할 수 있습니다; 실패한 명령은 게이트를 약화시켜도 된다는 허락이 아니라 불일치를 해결하라는 신호입니다.',
            linkLabel: '에이전트 프로토콜 읽기',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question: '계획이 밤새 또는 CI에서 무인으로 실행될 수 있나요?',
            answer:
              '예, 계획이 사전에 승인되었고 필요한 상태 계층을 갖추었으며 에이전트에 한정된 권한이 주어진 경우에 가능합니다. 무인 실행은 현실이 계획과 어긋나거나, 계획된 수리 범위 밖에서 게이트가 실패하거나, 새로운 승인이나 자격 증명이 필요할 때 멈추고 차단 사유를 기록해야 합니다.',
            linkLabel: '무인 실행 프로토콜 읽기',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: '비교',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'Spec Kit, OpenSpec, Kiro 같은 스펙 주도 도구와 어떻게 다른가요?',
            answer:
              '이들은 인접한 문제를 풉니다. 스펙 주도 도구는 무엇이 바뀌어야 하는지 포착하는 데 탁월합니다: 반복 가능한 형태의 스펙, 요구사항, 변경 제안. Deep Work Plan은 에이전트가 표류 없이 수 시간을 실행하는 방법에 관한 것입니다: 온보딩된 하니스, 변경 표면에서 선택되는 작업별 검증 게이트, 디스크 위의 재개 가능한 상태, 보안 점검을 동반하는 필수 Final Review, 그리고 리포지토리 자체를 위한 적합성 검사기. 둘은 결합할 수 있으며, 스펙이나 변경 제안이 계획에 공급됩니다. 비교 페이지는 각 도구의 관점에서 기능을 나란히 놓습니다.',
            linkLabel: '비교 보기',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'BMAD, Superpowers, Get Shit Done, Gentle-AI 같은 에이전트 워크플로 도구와 어떻게 다른가요?',
            answer:
              'BMAD, Superpowers, Get Shit Done과 같은 에이전트 워크플로 프레임워크는 강력한 작업 방식을 제공합니다: 역할, 원칙, 테스트 우선 단계, 검증 습관. Gentle-AI는 에이전트 생태계 구성 도구로서 인접한 범주에 속합니다: 이미 사용 중인 코딩 에이전트에 세션 간 지속되는 메모리(Engram), 선별된 skill, 페르소나, MCP 서버, 선택적 Spec-Driven Development, 선택적 증거 기반 리뷰(Receipt-Driven Development)를 장착시키며, 각 에이전트의 설정 디렉터리에 기록합니다. Deep Work Plan은 이 둘과 다릅니다: 저장소에 무엇이 남고 무엇을 검증할 수 있는지에 집중합니다 — 어떤 에이전트든 사전 맥락 없이 읽을 수 있는 harness, 인수 기준과 gate를 갖춘 task 파일, 세션을 넘어 유지되는 state, CI 친화적인 종료 코드를 가진 준수 검사기, 그리고 각 flow가 로드하는 instruction byte 수를 공개적으로 측정한 값. 구조적으로 도구에 구애받지 않으며 핵심 루프에 서비스, 제공자, 시크릿을 전혀 추가하지 않습니다. 이 계층들은 공존할 수 있습니다: 프레임워크와 Gentle-AI는 에이전트가 작동하는 방식을 형성하고, Deep Work Plan은 긴 작업을 저장소 내에서 지속 가능하고 검증 가능하게 만듭니다. 비교 페이지는 각 접근 방식이 어디에 내장되어 있는지, 선택적인지, 범위 밖인지를 보여줍니다.',
            linkLabel: '비교 보기',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: '그냥 에이전트에 내장된 계획 모드를 쓰면 안 되나요?',
            answer:
              '내장 계획 모드도 유용하며, Deep Work Plan은 같은 기반 — `AGENTS.md` 관례와 개방형 Agent Skills 표준 — 위에 세워집니다. 차이는 계획이 어디에 사는지, 무엇이 그것을 강제하는지입니다. 네이티브 계획은 보통 리포지토리 밖에 살며 세션과 함께 만료됩니다; Deep Work Plan은 계획과 그 상태, 증거를 리포지토리 안에 기록하므로 다른 에이전트나 팀원이 그것을 이어갈 수 있고, 모든 작업은 실행 가능한 게이트와 기록된 로그를 담습니다. 사고에는 계속 에이전트의 계획 모드를 쓰시면 됩니다; 방법론은 지속적이고 검증 가능한 실행 루프를 더합니다.',
            linkLabel: '비교 보기',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: '채택하기',
        items: [
          {
            id: 'install',
            question:
              '온보딩은 내 리포지토리에 무엇을 기록하나요? 기존 파일을 건드리나요?',
            answer:
              '온보딩은 비파괴적입니다: 기존의 `AGENTS.md`, `docs/`, `.agents/`, `CLAUDE.md`를 감지하고 덮어쓰는 대신 조정하며, 무언가를 교체하기 전에 묻습니다. 실제 명령을 담은 `AGENTS.md` 인덱스, 이유가 담긴 `docs/` 트리, 모듈별 문서, 얇은 `dwp-*` 명령의 `.agents/` 키트, gitignore된 `.dwp/` 출력 영역, 검증된 테스팅 맵, 그리고 필수 로컬 코드 리뷰(AI Diff Reviewer 스킬 더하기 리포지토리 맞춤 리뷰 확장)를 작성합니다. 그런 다음 자기 점검과 적합성 검사기를 실행해 무엇이 만들어졌는지 볼 수 있게 합니다. 이전 버전에서 온보딩된 리포지토리는 빠진 부분만 바꾸는 표적 업그레이드를 받습니다.',
            linkLabel: '채택 엔드포인트',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              '애드온을 설치하지 않고도 핵심 방법론을 사용할 수 있나요?',
            answer:
              '예. 애드온은 선택적으로 채택하는 계층이며, 아무것도 설치하지 않은 리포지토리도 완전히 DWP에 적합합니다. Devcontainer, Dailybot 보고, 의존성 업그레이드, 디자인 시스템 지원, 선택적 CI 리뷰는 리포지토리에 맞고 명시적으로 수용할 때만 제공됩니다.',
            linkLabel: '애드온 둘러보기',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question: '리포지토리에 아직 테스트나 린트가 없다면 어떻게 되나요?',
            answer:
              'DWP는 툴체인의 부재를 무료 통과권으로 취급하지 않습니다. 온보딩 동안 에이전트는 스택에 맞는 검증 설정을 제안하고, 그 명령을 리포지토리 문서에 기록하며, 이후 게이트의 목표로 그 명령을 사용합니다; 제안 내용은 검토할 수 있도록 계속 보입니다.',
            linkLabel: '에이전트 프로토콜 읽기',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: '비용은 얼마인가요? 효율은 어떻게 측정되나요?',
            answer:
              '방법론과 스킬은 MIT 라이선스이며 무료입니다; 핵심 플로우에는 서비스도, API 키도, 텔레메트리도 없습니다. 효율은 각 플로우가 로드하는 지시사항 바이트 수로 보고됩니다. 스킬과 함께 커밋된 스크립트가 측정하고 평가 원장에 공개하며, 증가는 감소만큼 평범하게 보고됩니다. 바이트 목록은 그런 것을 입증하지 못하므로 토큰 백분율이나 비용 절감으로 보고하지 않습니다; 결과를 제대로 측정하기 위한 사전 등록된 공개 평가가 계획되어 있습니다.',
            linkLabel: '신뢰와 공개',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: '아직 궁금한 점이 있나요?',
      body: 'GitHub에서 토론이나 이슈를 열어 주세요. 반복해서 나오는 질문은 이 페이지에 추가됩니다.',
      ctaLabel: 'GitHub에서 묻기',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan과 대안들의 비교',
      description:
        'Deep Work Plan이 스펙 주도 개발 도구, 에이전트 워크플로 프레임워크, 벤더 네이티브 계획 모드와 각각 어떻게 관련되는지 설명합니다. 모든 사실은 각 도구의 공식 문서로 거슬러 추적되고, 출처와 마지막 검토 날짜를 함께 밝힙니다.',
    },
    eyebrow: '비교',
    title: 'Deep Work Plan과 대안들',
    intro:
      '상황에 맞는 계층을 고르세요. 각 대안은 그 자신의 관점에서 설명되고, 모든 사실은 공식 문서로 거슬러 추적되며, 이 페이지는 마지막으로 검토된 시점을 밝힙니다. 이것은 순위표가 아니라 지도입니다.',
    howToRead: {
      title: '이 페이지 읽는 법',
      body: '세 가지 값이 각 기능을 설명합니다. 이 값들은 도구가 얼마나 좋은지가 아니라 기능이 도구의 어디에 있는지를 말합니다.',
      values: {
        builtIn: '내장',
        optional: '선택 사항 또는 확장 경유',
        notInScope: '범위 외',
      },
    },
    reviewedOnLabel: '마지막 검토',
    alternativesTitle: '대안들, 각자의 관점에서',
    officialSiteLabel: '공식 사이트',
    categories: {
      methodology: '방법론',
      sdd: '스펙 주도 개발 도구',
      agentFramework: '에이전트 워크플로 프레임워크',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: '벤더 네이티브 계획 모드',
    },
    matrix: {
      title: '기능 매트릭스',
      caption:
        '도구별로 각 기능이 어디에 있는지. 내장, 선택 사항 또는 확장 경유, 범위 외. 공식 문서를 기준으로 검토했습니다.',
      capabilityColumn: '기능',
    },
    capabilities: {
      toolAgnostic: {
        label: '어떤 코딩 에이전트와도 작동',
        help: '같은 리포지토리 파일이 Claude Code, Codex, Cursor, Gemini CLI 등을 구동합니다.',
      },
      repoNativeHarness: {
        label: '에이전트 하니스를 리포지토리에 기록',
        help: '지시사항, 문서, 스킬, 명령이 한 도구의 설정이 아니라 리포지토리에 살아 있습니다.',
      },
      taskAcceptanceCriteria: {
        label: '작업별 인수 기준',
        help: '각 작업이 완료의 관찰 가능한 조건을 명시합니다.',
      },
      perTaskGates: {
        label: '작업별 검증 게이트',
        help: '각 작업이 자기가 건드린 것에서 선택된, 통과해야 하는 명령을 명시합니다.',
      },
      resumableState: {
        label: '디스크 위의 재개 가능한 상태',
        help: '진행 상황이 세션 초기화를 넘어 살아남고 다른 에이전트나 팀원이 이어받을 수 있습니다.',
      },
      finalReview: {
        label: '보안 점검을 동반하는 필수 마무리 리뷰',
        help: '전체 변경 집합에 대한 보안 검토와 최종 상태 검증 없이는 계획이 완료될 수 없습니다.',
      },
      conformanceChecker: {
        label: '실행 가능한 적합성 검사기',
        help: '스크립트가 리포지토리와 그 계획을 표준에 대비해 검증하며, CI 친화적 종료 코드를 냅니다.',
      },
      instructionBudgetLedger: {
        label: '공개된 지시사항 로드량 측정',
        help: '각 플로우가 로드하는 바이트가 커밋된 스크립트로 측정되어 그 한계와 함께 공개됩니다.',
      },
      onboardingScaffold: {
        label: '문서를 스캐폴딩하는 온보딩',
        help: '첫 실행이 리포지토리의 에이전트 대면 문서와 키트를 작성합니다.',
      },
      brownfieldSpecs: {
        label: '기존 시스템을 위한 살아있는 스펙',
        help: '변경이 시스템의 커져 가는 스펙으로 병합되는 델타로 명세됩니다.',
      },
      crossProjectMemory: {
        label: '프로젝트 간 지속되는 에이전트 메모리',
        help: '메모리는 하나의 플랜의 디스크 상태에 그치지 않고, 서로 다른 저장소와 세션에 걸쳐 에이전트를 따라갑니다.',
      },
      roleBasedAgents: {
        label: '역할별로 구분된 전문 에이전트',
        help: '분석가, 아키텍트, 리뷰어 같은 이름이 붙은 페르소나가 작업을 분담하며, 하나의 에이전트가 모든 단계를 수행하지 않습니다.',
      },
      nativeIdeProduct: {
        label: '자체 IDE 또는 에디터로 제공',
        help: '이 도구 자체가 하나의 통합 개발 환경이며, 기존 코딩 에이전트에 추가되는 부가 기능이 아닙니다.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          '스킬로 설치되어 리포지토리를 에이전트 하니스로 온보딩하고, 작업별 검증 게이트, 디스크 상태, 필수 Final Review와 함께 장기 계획을 실행합니다.',
        audience:
          '여러 세션에 걸친 작업을 어떤 코딩 에이전트에게든 맡기고 검증된 채로 완료되기를 필요로 하는 개발자와 팀.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          '컨스티튜션, 스펙, 계획, 작업 목록을 통해 기능을 실행 가능한 스펙으로 바꾸며, 50개가 넘는 코딩 에이전트와 통합되는 슬래시 명령으로 구동됩니다. 구현을 시작하기 전에 산출물들이 서로 일관되는지 확인할 수도 있습니다.',
        audience:
          '이미 쓰고 있는 에이전트 안에서 반복 가능한 스펙 작성, 계획, 작업화, 구현 워크플로를 원하는 팀.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          '각 변경을 델타 스펙(추가, 수정, 제거)과 시나리오를 갖춘 RFC 2119 요구사항의 제안으로 포착한 뒤, 살아있는 스펙으로 보관합니다. 변경이 수락되기 전에 제안의 완전성과 시나리오 커버리지를 검사하는 검증기도 갖추고 있습니다.',
        audience:
          '기존 시스템에서 스펙이 변경 한 번에 한 걸음씩 자라나기를 원하는 팀.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'EARS 스타일 요구사항에서 설계로, 다시 작업으로 이동하는 스펙을 갖춘 에이전트형 IDE와 CLI이며, 편집기 이벤트에서 실행되는 스티어링 파일과 훅을 제공합니다. 기존 코드베이스에 대한 스펙을 생성해 설계를 시작하기 전에 요구사항의 공백을 찾아낼 수도 있습니다.',
        audience:
          'AWS 지원 도구와 함께 편집기에 스펙 주도 개발이 내장되기를 원하는 개발자.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          '전문화된 에이전트 역할(분석, 제품, 아키텍처, 개발, 품질)이 브리프, 요구사항, 아키텍처 문서, 스토리 파일을 만들어 내는 애자일 프레임워크입니다. 완료의 정의(Definition of Done)에는 각 스토리가 완료로 인정되기 전에 팀원이나 AI 동료 리뷰어의 검토를 받도록 요구하는 절차가 포함되어 있습니다.',
        audience:
          '역할 기반 세레모니를 선호하고 에이전트 작업을 위한 완전한 애자일 라이프사이클을 원하는 팀.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          '브레인스토밍, 작은 테스트 우선 단계로 계획하기, 서브에이전트로 실행하기, 완료 전에 검토하기 위한 스킬 라이브러리와 워크플로이며, 여기 소개된 다른 어떤 대안보다 많은 코딩 에이전트 호스트와 통합되어 있고, 모든 작업에 2단계 서브에이전트 검토(스펙 준수 확인 후 코드 품질 확인)를 적용합니다.',
        audience:
          '코딩 에이전트 안에서 규율 있는 테스트 주도 실행을 원하는 개발자.',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          '.planning 디렉터리, 요구사항 id, 단계 계획, 새 컨텍스트 실행, 그리고 각 계획의 요약에서 추출한 사용자가 관찰 가능한 산출물에 대한 검증 패스를 갖춘 계획 시스템입니다. 연구·계획·실행을 일회용 서브에이전트에서 실행하고 콘텐츠 지문(fingerprint) 검사로 오래된 검증을 잡아내어, 컨텍스트 저하(context rot)에 정면으로 맞서도록 설계되었습니다.',
        audience:
          '적은 세레모니로 컨텍스트 엔지니어링과 검증을 원하는 1인 개발자와 소규모 팀.',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          '이미 사용 중인 코딩 에이전트를 세션과 모델을 넘나들며 라우팅도 수행하는 영구 메모리, 엄선된 스킬, MCP 서버, 페르소나, 그리고 선택적인 Spec-Driven Development 또는 Receipt-Driven Development로 구성합니다. 설정은 기본적으로 에이전트의 전역 설정에 기록되며, 워크스페이스 범위 설치는 선택 사항입니다.',
        audience:
          '세션 전반에 걸쳐 작업을 기억하고 필요할 때 근거 자료를 생성할 수 있는, 구성된 에이전트 생태계를 원하는 개발자를 위한 것입니다.',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          'Plan과 Design에서 Build, Test, Deploy, Maintain으로 이어지는 6단계 루프이며, 각 단계마다 사람의 승인을 거치도록 게이트가 걸려 있고, 단계 사이마다 저장소에 내구성 있는 산출물을 커밋하며, 배포 전에 보안 전용 검토 패스를 두고, 선행 및 후행 딜리버리 지표를 공개하는 지속적인 평가를 갖추고 있습니다.',
        audience:
          'Claude Code의 엔드투엔드 소프트웨어 제공 플레이북과 그 프로덕션 피드백 루프를 평가하는 팀을 위한 것입니다.',
      },
      'vendor-native': {
        name: '벤더 네이티브 계획 모드',
        whatItDoesWell:
          '에이전트 제품은 개방적이고 벤더에 종속되지 않는 AGENTS.md 및 Agent Skills 표준을 기반으로 계획 모드, 지시사항 파일, 스킬을 제공할 수 있지만, 계획 모드의 정확한 동작은 여전히 벤더, 클라이언트, 버전에 따라 달라집니다. 특히 Agent Skills는 시작 시 짧은 요약만 불러오고 활성화될 때 전체 지시사항을 불러오므로, 사용하지 않는 기능을 컨텍스트 밖에 둘 수 있습니다.',
        audience:
          '방법론을 채택하지 않고 단일 에이전트 안에서 계획을 원하는 모든 사람.',
      },
    },
    aiNative: {
      title: 'AI 네이티브 SDLC에서의 위치',
      body: 'Claude의 AI-native SDLC 플레이북은 Plan, Design, Build, Test, Deploy, Maintain으로 이어지는 완전한 루프를 설명합니다. 각 단계는 다음 단계가 읽을 산출물을 커밋하고, 각 단계마다 사람의 승인 게이트를 두며, 배포 전에 보안 전용 검토 패스를 거치고, 프로덕션 피드백은 새로운 intent가 됩니다.',
      shared:
        'DWP는 내구성 있는 산출물과 게이트를 통한 승인이라는 개념을 공유합니다: intent는 계획이 되고, 작업은 증거를 남기며, 완료 전에 보안 검토가 실행되고, 저장소는 다음 에이전트가 읽을 수 있는 상태로 남습니다.',
      boundary:
        '진짜 차이는 엄격함이 아니라 범위에 있습니다. 이 플레이북은 Claude Code를 중심으로 구축된 반면, DWP의 하니스와 계획 형식은 AGENTS.md와 Agent Skills 표준을 따르는 모든 에이전트가 읽을 수 있습니다. 이 플레이북은 DWP가 내세우지 않는 지속적인 평가와 프로덕션 운영도 다루며, 이러한 운영 관행은 DWP로 운영되는 저장소와 경쟁하기보다 이를 보완할 수 있습니다.',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: '비교 보기',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Deep Work Plan이 가져오는 것',
      items: [
        {
          title: '도구 비종속이며 리포지토리 네이티브',
          body: '하니스와 계획은 리포지토리 안의 파일이며, AGENTS.md와 Agent Skills 표준을 따르는 어떤 에이전트든 읽습니다. 에이전트를 바꿔도 계획을 잃지 않습니다.',
        },
        {
          title: '각 작업이 건드린 것에서 선택되는 검증',
          body: '모든 작업은 자신의 변경 표면을 선언하고 변경된 동작과 그 소비자의 테스트를 실행하며, 영향을 한정할 수 없을 때는 전체 스위트로 넓힙니다. 선택된 테스트가 0개인 경우는 결코 통과가 아닙니다.',
        },
        {
          title: '보안 점검을 동반하는 하나의 Final Review',
          body: '계획은 누적된 변경 집합에 대한 보안 검토 — 필수 로컬 diff 리뷰 포함 — 와 최종 상태 검증으로 닫힙니다. 치명적 발견은 완료를 막습니다.',
        },
        {
          title: '세션과 에이전트를 넘어 살아남는 상태',
          body: 'README 체크박스, 작업 로그, 범위가 한정된 작업 인덱스, 기계 판독 가능한 상태 파일이 모든 경계에서 기록되므로, 다른 세션이나 다른 에이전트가 디스크에서 이어갑니다. 계획 생성이 중단된 경우조차 복구 가능합니다.',
        },
        {
          title: '리포지토리 자체를 위한 적합성 검사기',
          body: '읽기 전용 스크립트가 하니스와 모든 계획을 스펙에 대비해 검증하고, 두 가지 계획 수명 주기를 모두 이해하며, CI 친화적 코드로 종료합니다.',
        },
        {
          title: '측정되고 공개되는 지시사항 로드량',
          body: '커밋된 스크립트가 각 플로우가 로드하는 바이트를 측정합니다; 증가를 포함한 결과는 바이트로 공개되며, 토큰이나 비용 백분율로는 결코 공개되지 않습니다.',
        },
      ],
    },
    honestLimits: {
      title: '정직한 한계',
      body: 'Deep Work Plan에는 살아있는 스펙이나 델타 스펙 메커니즘이 없습니다; 그 부분에서는 OpenSpec과 유사한 도구가 더 강합니다. 방법론의 독립적인 벤치마크는 아직 존재하지 않으며, 사전 등록된 공개 평가가 계획되어 있습니다. 지시사항 로드 원장은 로드된 바이트를 측정하며, 토큰, 비용, 결과가 아닙니다. DWP는 의도적으로 저장소 범위로 한정되어 있습니다. 프로젝트 간 메모리 시스템도, 역할 기반 에이전트 프레임워크도, IDE도 아니므로 이러한 축에서는 경쟁하지 않습니다 — 그런 능력이 필요한 작업에는 이를 제공하는 도구와 함께 사용하세요.',
    },
    correction: {
      title: '정확성을 유지하도록 도와주세요',
      body: '이 페이지는 표시된 날짜에 검토되었으며 요청에 따라 수정됩니다. 당신의 도구 설명이 오래되었거나 불완전하다면 이슈를 열어 주세요. 수정하겠습니다.',
      ctaLabel: '이슈 열기',
    },
    sourcesTitle: '출처',
  },

  trustPage: {
    meta: {
      title: '신뢰와 보안',
      description:
        'Deep Work Plan을 안심하고 채택할 수 있는 이유: 오픈 소스이자 MIT 라이선스, 네트워크 호출이나 텔레메트리 없는 Markdown-first, 비파괴적 설계, 검증 가능한 설치, 그리고 명확한 취약점 공개 정책.',
    },
    eyebrow: '신뢰 & 보안',
    title: '신뢰와 보안',
    intro:
      '신뢰할 수 없는 스킬을 설치해서는 안 됩니다. Deep Work Plan은 맹목적인 믿음이 아니라 검증에 기반하도록 설계되었습니다. 오픈 소스, Markdown-first, 비파괴적이며, 실행하기 전에 확인할 수 있습니다. 이 페이지는 무엇을 하는지, 무엇을 하지 않는지, 그리고 두 가지를 어떻게 확인할 수 있는지를 솔직하게 설명합니다.',
    pillarsTitle: '무엇을 신뢰하는가',
    pillars: [
      {
        title: '오픈 소스이자 MIT 라이선스',
        body: '웹사이트와 스킬은 모두 공개되어 있으며 diff 가능합니다. 실행하기 전에 모든 줄을 읽고, 태그 릴리스의 소스와 임의의 복사본을 비교할 수 있습니다.',
      },
      {
        title: 'Markdown-first — 네트워크 없음, 텔레메트리 없음',
        body: '스킬에는 CLI도, HTTP API도, 인증 흐름도 없습니다. 네트워크 호출을 하지 않으며 텔레메트리를 전송하지 않습니다. 유일한 로컬 헬퍼는 git과 환경 메타데이터만 읽습니다. 리포지토리에 관한 어떤 정보도 사용자의 기기를 벗어나지 않습니다.',
      },
      {
        title: '비파괴적 설계',
        body: '스킬이 하는 유일한 보안 관련 작업은 리포지토리를 변경하는 것이며, 덮어쓰기가 아니라 조정합니다. 기존에 있는 것을 감지하고 계획을 제안한 뒤, 무언가를 교체하기 전에 확인을 요청합니다. 계획 출력은 gitignore된 .dwp/ 디렉터리에 저장됩니다.',
      },
      {
        title: '비밀 정보를 건드리지 않음',
        body: '방법론은 비밀 정보를 커밋하지 않으며 작업 상태를 버전 관리 외부에 유지합니다. 온보딩은 .gitignore를 덮어쓰는 대신 추가하며, 모든 변경은 작고 읽기 쉬운 diff로 검토할 수 있도록 설계됩니다.',
      },
      {
        title: '검증 가능한 출처',
        body: '모든 릴리스는 배포된 스킬에 대한 체크섬을 게시하므로, 신뢰하기 전에 다운로드한 복사본이 게시된 내용과 일치하는지 확인할 수 있습니다.',
      },
    ],
    verifyTitle: '실행 전에 검증',
    verifyIntro:
      '확인하기 전까지 스킬을 신뢰할 수 없는 것으로 취급하세요. 각 릴리스에는 배포된 스킬을 아우르는 SHA256SUMS 파일이 첨부됩니다. 설치하려는 버전의 파일을 다운로드한 뒤, 복사본이 일치하는지 검증하세요 — 비정상 종료 코드는 파일이 일치하지 않음을 의미하므로 중단해야 합니다.',
    codeLabel: 'shell',
    verifyNote:
      '릴리스는 체크섬으로 검증되며, 서명되지는 않았습니다 — 서명(cosign 또는 관리자 GPG)은 문서화된 다음 단계이지 현재의 주장이 아닙니다. 모든 것이 공개되어 있으므로, 임의의 파일을 해당 태그의 리포지토리와 diff로 비교할 수도 있습니다.',
    disclosureTitle: '취약점 신고',
    disclosureBody:
      '보안 문제를 발견하셨나요? 공개 이슈를 열지 말고, 해당 리포지토리(스킬 또는 웹사이트 — 아래에 링크된 보안 정책 참조)에서 GitHub의 비공개 취약점 신고 기능을 통해 비공개로 신고해 주세요. 공개 이슈를 열면 수정이 완료되기 전에 문제가 노출됩니다.',
    resourcesTitle: '신뢰 리소스',
    linkManifest: '기계 판독 가능한 신뢰 매니페스트',
    linkSecurityTxt: 'security.txt(RFC 9116)',
    linkPolicy: '웹사이트 보안 정책',
    linkSkillPolicy: '스킬 보안 정책 및 위협 모델',
    limitationsTitle: '솔직한 한계',
    limitations: [
      '릴리스는 체크섬으로 검증되지만 아직 암호학적으로 서명되지 않았습니다 — 서명은 계획 중이며 아직 완료되지 않았습니다.',
      'Deep Work Plan은 자율적인 코딩 에이전트를 리포지토리에 대해 실행합니다. 제안된 계획과 diff를 검토하세요. 방법론은 그 검토를 위해 설계된 것이지, 검토를 대체하려는 것이 아닙니다.',
      '여기의 신뢰 주장은 공식 소스만을 설명합니다. 리포지토리에서 벗어난 수정되거나 서드파티의 복사본에는 이러한 보증이 없습니다 — 먼저 검증하세요.',
    ],
    ctaTitle: '자신 있게 채택하세요',
    ctaBody:
      '방법론과 스펙을 읽고, 에이전트를 init 엔드포인트로 향하게 한 뒤, 실행하기 전에 설치를 검증하세요.',
    ctaPrimary: '방법론 읽기',
    ctaSecondary: '채택(Init)',
  },

  developersPage: {
    meta: {
      title: '개발자 — Deep Work Plan 에이전트 API, MCP 서버 및 문서',
      description:
        'Deep Work Plan의 에이전트 표면: OpenAPI 스펙을 갖춘 읽기 전용 무인증 API, /api/mcp의 MCP 서버, 17개 언어의 페이지별 Markdown, npx skills 설치 CLI.',
    },
    eyebrow: '에이전트 및 개발자 표면',
    title: '개발자와 AI 에이전트를 위한 Deep Work Plan',
    intro:
      'deepworkplan.com은 페이지와 함께 기계 판독 가능한 표면을 제공합니다. OpenAPI로 기술된 에이전트 API, 스테이트리스 MCP 서버, 17개 언어의 모든 페이지를 담은 네이티브 Markdown 미러, 그리고 설치 가능한 DWP 스킬입니다. 이 페이지의 모든 것은 라이브로 공개되어 있고 무료입니다 — 가입할 것이 전혀 없습니다.',
    accessTitle: '설계부터 무인증',
    accessIntro:
      '생성할 API 키도, OAuth 절차도, 프로덕션과 분리된 샌드박스도 없습니다 — 프로덕션 표면 자체가 샌드박스입니다. 이는 방법론의 의도적인 속성입니다. 에이전트는 "영업 문의" 양식을 작성할 수 없기에, 이 사이트는 그런 것을 절대 요구하지 않습니다.',
    accessPoints: [
      {
        title: '읽기 전용',
        body: '모든 작업은 안전하고 캐시 가능한 GET입니다 — POST를 사용하는 MCP 엔드포인트가 유일한 예외입니다. 어디에도 쓰기 작업, 업로드, 상태 변경은 존재하지 않습니다.',
      },
      {
        title: 'API 키 불필요',
        body: '등록도, 토큰도, 속도 제한 티어도 없습니다. 익명 접근이 문서화된 계약이며, /auth.md와 OAuth 디스커버리 스텁에 선언되어 있습니다.',
      },
      {
        title: '무료 및 오픈 소스',
        body: '사이트 콘텐츠와 DWP 스킬은 MIT 라이선스입니다. 허락을 구하지 않고 상업적·비상업적 작업에 사용할 수 있습니다.',
      },
      {
        title: '머신 퍼스트',
        body: '/api 경로의 구조화된 JSON 오류, Markdown 404 복구 본문, RFC 9727 API 카탈로그, ARD 역량 매니페스트 — 에이전트 소비를 위해 구축되었습니다.',
      },
    ],
    endpointsTitle: '엔드포인트',
    endpointsIntro:
      '에이전트 API의 핵심 엔드포인트입니다. 완전하고 타입이 지정된 스펙 — 모든 작업, 매개변수, 응답 스키마 — 은 OpenAPI 문서에 있습니다.',
    endpointsNote:
      '알 수 없는 /api/* 경로는 해결 힌트를 포함한 구조화된 JSON 오류를 반환하며, HTML 오류 페이지는 결코 반환하지 않습니다.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: '전체 에이전트 API의 OpenAPI 3.1 스펙입니다.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          '엄선된 LLM 안내 인덱스 — 에이전트에게 권장되는 진입점입니다.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          '정식 DWP 채택 프롬프트(모든 리포지토리를 AI-first로 만듭니다).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          '모든 페이지를 네이티브 소스 Markdown으로 — 17개 언어 모두(예: /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description: '스펙과 이 포털로 연결되는 정적 헬스 마커입니다.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP 서버(Streamable HTTP, 스테이트리스): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'ARD 역량 매니페스트 — robots.txt에 선언된 agentmap입니다.',
      },
    ],
    mcpTitle: 'MCP 서버',
    mcpIntro:
      'Streamable HTTP 위의 스테이트리스 Model Context Protocol 서버입니다. 세 가지 읽기 전용 도구: get_init_prompt, list_site_sections, read_page. 프로토콜 버전 2025-03-26과 2025-06-18을 지원하며 세션은 필요하지 않습니다.',
    mcpCodeLabel: '터미널 — HTTP를 통한 JSON-RPC',
    mcpNote:
      'MCP 매니페스트는 /.well-known/mcp.json에, 서버 카드는 /.well-known/mcp/server-card.json에 있습니다. Claude, ChatGPT, 그리고 모든 MCP 클라이언트가 이 도구들을 네이티브로 호출할 수 있습니다.',
    markdownTitle: '에이전트를 위한 Markdown',
    markdownIntro:
      '렌더링되는 모든 페이지는 HTML 변환이 아니라 네이티브 소스 Markdown으로 게시됩니다. URL 접미사로 Markdown을 명시적으로 요청하거나, 어떤 페이지에서든 HTTP 콘텐츠 협상을 통해 요청하세요.',
    markdownCodeLabel: '터미널 — 콘텐츠 협상',
    markdownNote:
      '콘텐츠 협상은 사이트가 렌더링에 사용하는 것과 동일한 소스 Markdown을, 요청한 URL의 언어로 반환합니다.',
    cliTitle: '키트 설치',
    cliIntro:
      'Deep Work Plan 스킬의 공식 설치 경로입니다 — /init 엔드포인트가 에이전트에게 주는 것과 같은 명령입니다. skills 호환 코딩 에이전트(Claude Code, Cursor, Codex, Gemini 등)라면 무엇이든 작동합니다.',
    cliCodeLabel: '터미널 — skills CLI',
    cliNote:
      '스킬은 리포지토리 내 .agents/skills/deepworkplan/에 벤더되므로, 리포지토리를 다루는 모든 에이전트가 같은 방법론을 공유합니다.',
    resourcesTitle: '기계 판독 가능 리소스',
    resources: [
      { label: 'OpenAPI 스펙 (/openapi.json)', href: '/openapi.json' },
      { label: '에이전트 접근 및 인증 선언 (/auth.md)', href: '/auth.md' },
      {
        label: 'API 카탈로그, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP 매니페스트 (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: '보안 연락처 (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: '사이트 리포지토리 디스크립터 (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: '에이전트를 향하게 하세요',
    ctaBody:
      '가장 빠른 길은 여전히 한 줄입니다. 어떤 코딩 에이전트에게든 /init 프롬프트를 건네면 스킬을 설치하고, 리포지토리를 온보딩하고, 깊은 작업을 완료하기 시작합니다.',
    ctaPrimary: '/init 프롬프트 열기',
    ctaSecondary: '방법론 읽기',
  },

  privacyPage: {
    meta: {
      title: '개인정보 보호 — Deep Work Plan',
      description:
        'deepworkplan.com의 개인정보 보호 정책: 계정 없음, 광고 없음, 쿠키 없는 분석을 쓰는 정적 사이트이며, 문의 양식이 수집하는 것을 분명하게 설명합니다.',
    },
    eyebrow: '개인정보 보호 정책',
    title: 'deepworkplan.com의 개인정보 보호',
    intro:
      'Deep Work Plan은 정적 문서 및 방법론 사이트입니다. 이 페이지는 방문할 때 사이트가 다루는 데이터를 분명하고 완전하게 설명합니다. 계정 시스템도, 광고도, 사이트 어디에도 크로스 사이트 추적이 없습니다.',
    lastUpdated: '2026년 9월 8일',
    sections: [
      {
        heading: '사이트란 무엇인가',
        body: 'deepworkplan.com은 CDN을 통해 제공되는 정적 페이지 모음입니다. 로그인도, 사용자 데이터베이스도 없으며 사이트가 개인 프로필을 저장할 방법도 없습니다. 콘텐츠는 DailybotHQ 조직의 공개 GitHub 리포지토리에서 개발되며, 여기서 읽는 모든 것은 빌드된 그대로 제공됩니다.',
      },
      {
        heading: '분석',
        body: '이 사이트는 쿠키를 쓰지 않고 프라이버시를 우선하는 분석 서비스 Umami를 사용해 페이지뷰를 집계합니다. Umami는 추적 쿠키를 설정하지 않고 크로스 사이트 프로필을 만들지 않습니다. AI 크롤러는 JavaScript를 실행하지 않기 때문에, 서버 측 엣지 함수가 자동 봇 방문의 사용자 에이전트와 경로를 익명 분석 이벤트로 기록합니다 — 이는 크롤러 소프트웨어를 식별하는 것이지(예: "GPTBot이 /init 방문") 인간 방문자를 식별하는 것이 결코 아닙니다.',
      },
      {
        heading: '쿠키 및 로컬 스토리지',
        body: '이 사이트는 추적 쿠키를 설정하지 않습니다. 브라우저에 저장되는 유일한 것은 localStorage에 보관되는 테마 기본 설정(라이트 또는 다크 모드)이며, 기기를 벗어나거나 어디로도 전송되지 않습니다. 브라우저 저장소를 지우면 사이트는 시스템 기본 테마로 돌아갈 뿐입니다.',
      },
      {
        heading: '서드파티 서비스',
        body: '호스팅과 전송은 Cloudflare Pages에서 실행되며, CDN 운영과 악용 차단의 일환으로 Cloudflare가 자체 개인정보 보호 정책에 따라 엣지에서 요청 로그와 IP 주소를 처리합니다. 집계 분석은 Umami(cloud.umami.is)에서 실행됩니다. 문의 양식을 자발적으로 제출하면 답변은 Google Forms를 통해 팀으로 전송됩니다 — 입력한 정보가 수집되는 유일한 곳이며, 답장을 위해서만 사용됩니다.',
      },
      {
        heading: '하지 않는 것',
        body: '우리는 개인 데이터를 판매하거나 공유하지 않고, 광고나 리마케팅 픽셀을 실행하지 않으며, 브라우저 핑거프린팅을 하지 않고, 마케팅 이메일을 보내지 않습니다. 사이트에는 뉴스레터 가입도 없고, 위에 설명된 집계·쿠키 없는 카운트를 넘는 텔레메트리도 없습니다.',
      },
      {
        heading: '사용자의 선택',
        body: '여기의 분석은 집계형이고 쿠키를 쓰지 않으므로 내보내거나 삭제할 개인 프로필이 없습니다. 어떤 콘텐츠 차단기로도 분석 스크립트를 차단할 수 있으며 사이트 작동에는 영향이 없습니다. 문의 양식을 제출했고 메시지 삭제를 원한다면 아래 연락처로 편지해 주세요. 삭제하겠습니다.',
      },
      {
        heading: '정책 변경',
        body: '이 정책이 실질적으로 변경되면 이 페이지 상단의 업데이트 날짜도 함께 변경되며, 실질적인 수정은 공개 웹사이트 리포지토리에 커밋되어 누구나 이력을 검토할 수 있습니다.',
      },
    ],
    contactTitle: '연락처 및 보안',
    contactBody:
      '개인정보 보호 관련 질문은 security@dailybot.com으로 보내 주세요. 보안 취약점을 신고할 때는 웹사이트 및 스킬 리포지토리에 대해 GitHub의 비공개 취약점 신고를 우선해 주세요 — 정확한 주소는 /.well-known/security.txt에 있습니다.',
  },
};
