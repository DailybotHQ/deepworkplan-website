/**
 * th translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const th: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — การทำงานอย่างมีโครงสร้างสำหรับ AI coding agent',
  siteDescription:
    'Deep Work Plan: ระเบียบวิธีแบบเปิดและชุดเครื่องมืออ้างอิงสำหรับการรัน AI agent หลายชั่วโมงอย่างมีโครงสร้าง ตรวจสอบได้ และดำเนินต่อได้',

  // Navigation
  nav: {
    home: 'หน้าแรก',
    about: 'เกี่ยวกับ',
    contact: 'ติดต่อ',
    // Deep Work Plan IA
    methodology: 'ระเบียบวิธี',
    spec: 'ข้อกำหนด',
    kit: 'ชุดเครื่องมือ',
    examples: 'ตัวอย่าง',
    init: 'เริ่มต้น',
    quickstart: 'เริ่มใช้งานเร็ว',
    github: 'GitHub',
    repo: {
      label: 'ซอร์สโค้ด',
      website: 'ที่เก็บโค้ดเว็บไซต์',
      websiteDesc: 'เว็บไซต์นี้',
      skill: 'ที่เก็บโค้ดสกิล',
      skillDesc: 'สกิลที่ติดตั้งได้',
    },
    menu: 'เปิดเมนู',
    closeMenu: 'ปิดเมนู',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'สงวนลิขสิทธิ์',
    poweredBy: 'ขับเคลื่อนโดย',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'การนำทางในเว็บไซต์',
    sections: {
      methodology: 'ระเบียบวิธี',
      getStarted: 'เริ่มต้นใช้งาน',
      project: 'โครงการ',
      connect: 'ติดต่อ',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — การทำงานอย่างมีโครงสร้างสำหรับ AI coding agent',
      description:
        'บริบทสำคัญกว่าโมเดล Deep Work Plan เปลี่ยน repository ใดก็ได้ให้เป็นสภาพแวดล้อมที่มีโครงสร้าง ที่ coding agent ใดก็สามารถทำงานระยะยาวจนเสร็จได้',
    },
    hero: {
      badge: 'ระเบียบวิธีแบบเปิด · MIT · ไม่ผูกกับ agent ใด',
      title: 'โมเดลสำคัญ',
      titleEmphasis: 'บริบทสำคัญกว่า',
      subtitle:
        'Deep Work Plan เปลี่ยน repository ใดก็ได้ให้เป็นสภาพแวดล้อมที่มีโครงสร้าง พร้อมบริบท ราวกั้นความปลอดภัย และแผนงานที่คงทน ที่ coding agent ใดก็ทำงานได้อย่างแม่นยำและทำงานระยะยาวจนเสร็จ',
      instructionLabel: 'มอบบรรทัดนี้ให้ agent ของคุณ',
      instruction:
        'อ่านและทำตามคำแนะนำที่ https://deepworkplan.com/init.md เพื่อทำให้รีพอซิทอรีนี้เป็น AI-first',
      copyLabel: 'คัดลอก',
      copiedLabel: 'คัดลอกแล้ว',
      viewInitCta: 'ดูพรอมต์ /init ฉบับเต็ม',
      pullQuote:
        'Deep Work Plan คือ spec-driven development ที่ตัว repository เองกลายเป็น harness',
      primaryCta: 'อ่านระเบียบวิธี',
      secondaryCta: 'อ่านข้อกำหนด',
      illustrationAlt:
        'ภาพแกะสลักประภาคารบนชายฝั่งหินที่ฉายลำแสงเดียวนำทางเรือลำเล็ก สื่อถึง repository ที่เป็น harness อันมั่นคงซึ่งนำทาง agent ทุกตัว',
    },
    pitch: {
      kicker: 'ปัญหาและคำตอบ',
      problem:
        'AI coding agent มีประสิทธิภาพอย่างน่าทึ่งในงานช่วงสั้น แต่ในงานระยะยาว เช่น การย้ายระบบ การสร้างระบบย่อยใหม่ หรือการ refactor ข้ามไฟล์นับสิบ มันจะเริ่มเขว บริบทเต็ม การตัดสินใจถูกลืม และงานหลายชั่วโมงถูกทิ้งไว้ครึ่งทาง',
      answer:
        'Deep Work Plan ตอบโจทย์ด้วย spec-driven development โดยแผนงานเป็นแหล่งความจริงที่คงทน และ agent ทำงานตามเกณฑ์การยอมรับ (acceptance criteria) และ validation gate ที่ชัดเจน อาการเขวลดลง งานยังตรวจสอบได้ และ agent ใดก็กลับมาทำต่อข้ามเซสชันได้',
      origin:
        'อีกทั้งยังเป็น harness engineering ที่พกพาได้ harness ของ agent คือโครงสร้างรอบโมเดล ทั้งบริบท เครื่องมือ ลูปควบคุม ราวกั้นความปลอดภัย และสถานะที่ทำต่อได้ ซึ่งทำให้มันเชื่อถือได้ Deep Work Plan ติดตั้ง harness นั้นเข้าไปในตัว repository เอง (AGENTS.md เอกสาร ที่อยู่ของสกิลใน .agents/ และสกิล DWP) เพื่อให้ agent ใดก็ขับเคลื่อน repo ใดก็ได้ ถือกำเนิดที่ Dailybot ผ่านการใช้งานจริงนานหลายเดือน และเปิดเผยในชื่อ DailybotHQ/deepworkplan-skill',
      illustrationAlt:
        'ภาพแกะสลักแผนที่เดินเรือที่มีเส้นทางเดียวลากผ่านอันตรายอย่างปลอดภัย สื่อถึงแผนงานในฐานะทิศทางที่ทำให้งานอยู่ในเส้นทาง',
    },
    onboarding: {
      badge: 'การเริ่มต้นบนพื้นฐานการให้เหตุผล',
      title: 'ชี้ไปที่ repository ใดก็ได้ มันให้เหตุผล ไม่ใช่คัดลอกวาง',
      subtitle:
        'กระบวนการเริ่มต้นจะตรวจสอบภาษา เฟรมเวิร์ก ตัวจัดการแพ็กเกจ และคำสั่งตรวจสอบจริงของ repository ของคุณ แล้วสร้างผลลัพธ์ที่ปรับให้เข้ากับ repository นั้น สตับทั่วไปแบบสำเร็จรูปถือเป็นความล้มเหลว',
      steps: [
        {
          title: 'ให้เหตุผลเกี่ยวกับสแตกและรูปแบบ (archetype) ของคุณ',
          description:
            'อ่าน manifest โครงสร้างโฟลเดอร์ และ CI เพื่ออนุมานคำสั่ง test, lint และ build จริง แล้วจำแนก repository ว่าเป็น repo เดี่ยวหรือ orchestrator hub',
        },
        {
          title: 'สร้าง AGENTS.md, docs/ และเอกสารแยกตามโมดูล',
          description:
            'AGENTS.md ที่ผ่านการให้เหตุผล โครงสร้าง docs/ ที่จัดหมวดหมู่ และ README พร้อม docs/ ในแต่ละโมดูลหลัก เต็มไปด้วยคำสั่งจริงของ repository คุณ ไม่ใช่ตัวยึดตำแหน่ง',
        },
        {
          title: 'วางโครง .agents/ พร้อมซิมลิงก์ .claude ไปยัง .agents',
          description:
            'ไดเรกทอรี .agents/ ที่ใช้ร่วมกันข้าม agent (สกิล agent คำสั่ง) และซิมลิงก์ .claude ไปยัง .agents โดยสะท้อน CLAUDE.md ไปยัง AGENTS.md เพื่อให้ทุกเครื่องมืออ่านแหล่งความจริงเดียวกัน',
        },
        {
          title: 'ติดตั้งสกิล DWP และวางโครง .dwp/',
          description:
            'เชื่อมต่อสกิล Deep Work Plan และสร้างโฟลเดอร์ .dwp/ ที่ถูก gitignore ไว้สำหรับเก็บแผนและฉบับร่าง จากนั้นเลือกเสริม addon แบบสมัครใจ เช่น การรองรับ devcontainer',
        },
      ],
    },
    quickstart: {
      badge: 'สิ่งที่เกิดขึ้นเมื่อคุณรัน',
      title: 'คำสั่งเดียว ที่เหลือ repository จัดการเอง',
      subtitle:
        'คุณไม่ต้องเลือกวิธีติดตั้งหรือคัดลอกเทมเพลต เพียงมอบหนึ่งบรรทัดให้ agent มันจะติดตั้งสกิล ซึ่งเป็นกลไกที่นำกลับมาใช้ซ้ำได้ แล้วปรับ repository ของคุณให้เข้ากับมัน',
      steps: [
        {
          title: 'agent ของคุณเปิด /init.md',
          description:
            'มันอ่านพรอมต์เริ่มต้นที่ deepworkplan.com/init.md พร้อมระเบียบวิธี ข้อกำหนด และชุดเครื่องมือที่ลิงก์ไว้ ซึ่งคือมาตรฐานที่มันกำลังจะนำมาใช้',
        },
        {
          title: 'มันติดตั้งสกิล Deep Work Plan',
          description:
            'สกิลคือกลไก เหมือนกันในทุก repository คำสั่งเดียวจะดึงเราเตอร์และสกิลย่อย (create, execute, refine, resume, status, verify, onboard, author) เข้ามาสำหรับ Claude Code, Cursor, Codex, Gemini และ Copilot',
        },
        {
          title: 'มันปรับ repository ของคุณ',
          description:
            'ด้วยการให้เหตุผลเกี่ยวกับสแตกจริงของคุณ ไม่ใช่การคัดลอกวาง มันเขียน AGENTS.md โครงสร้าง docs/ ที่จัดหมวดหมู่ README แยกตามโมดูล ชุด .agents/ ที่ผ่านการให้เหตุผล และ .dwp/ ที่ถูก gitignore ไว้ repository ของคุณกลายเป็น harness',
        },
        {
          title: 'คุณวางแผนและลงมือทำ',
          description:
            'สร้าง Deep Work Plan ระยะยาวสำหรับงานใดก็ได้ แล้วรันทีละขั้น พร้อมเกณฑ์การยอมรับ validation gate และสถานะที่ทำต่อได้ อย่างอิสระต่อเนื่องนานหลายชั่วโมง',
        },
      ],
      note: 'สกิลถูกติดตั้งเหมือนกันทุกที่ สิ่งที่ถูกปรับคือ repository ของคุณ ทั้ง AGENTS.md เอกสาร และชุด .agents/ ที่ผ่านการให้เหตุผลซึ่งสร้างขึ้นสำหรับสแตกของคุณ การแยกส่วนนี้เองที่ทำให้ระเบียบวิธีเป็นมาตรฐานที่นำกลับมาใช้ซ้ำได้ ไม่ใช่โครงสร้างแบบครั้งเดียวจบ',
    },
    outcomes: {
      badge: 'สิ่งที่คุณได้รับ',
      title: 'ทุกอย่างที่ agent ของคุณต้องใช้ในการทำงานอย่างอิสระ',
      subtitle:
        'รันครั้งเดียว คอมมิตแบบ atomic ผลลัพธ์ทุกอย่างเป็น Markdown และทุกการเปลี่ยนแปลงตรวจสอบย้อนหลังได้',
      items: [
        {
          label: 'AGENTS.md ที่รากของ repository',
          detail:
            'ให้เหตุผลจากสแตก คำสั่ง และโครงสร้างจริงของ repository คุณ ไม่ใช่เทมเพลตที่มีตัวยึดตำแหน่ง CLAUDE.md ถูกซิมลิงก์ไปยัง AGENTS.md',
        },
        {
          label: 'docs/ ที่จัดหมวดหมู่และเอกสารแยกตามโมดูล',
          detail:
            'สถาปัตยกรรม การติดตั้ง มาตรฐาน และการแก้ปัญหา พร้อม README และ docs/ ในแต่ละโมดูลหลัก สร้างจากโค้ดเบสของคุณ',
        },
        {
          label: '.agents/ พร้อมซิมลิงก์ .claude ไปยัง .agents',
          detail:
            'ไดเรกทอรี .agents/ ที่ใช้ร่วมกันข้าม agent (สกิล agent คำสั่ง) พร้อมซิมลิงก์ .claude ไปยัง .agents เพื่อให้ทุกเครื่องมืออ่านแหล่งความจริงเดียวกัน',
        },
        {
          label: 'สกิล Deep Work Plan ที่ติดตั้งแล้ว',
          detail:
            'create, execute, refine, resume, status, verify, onboard และ author มอบให้ agent ของคุณในรูปแบบชุดสกิลเดียว โดยไม่ต้องคัดลอกแยกตาม repository',
        },
        {
          label: 'ความสอดคล้องที่คุณตรวจสอบได้',
          detail:
            '/dwp-verify สร้างรายงานผ่าน/ไม่ผ่านอย่างเป็นกลางเทียบกับข้อกำหนด ดังนั้น "AI-first" จึงถูกตรวจสอบ ไม่ใช่แค่กล่าวอ้าง และตรวจสอบซ้ำได้หลังทุกแผนงาน',
        },
        {
          label: 'รองรับสองรูปแบบ (archetype)',
          detail:
            'การเริ่มต้นจะจำแนก repository ของคุณว่าเป็น repo เดี่ยว (กรณีทั่วไป) หรือ orchestrator hub ที่ประสานแผนงานลูกข้าม repository หลายแห่ง',
        },
        {
          label: 'ชุดเครื่องมือที่มีชีวิตและเติบโตไปกับ repository',
          detail:
            'สกิลย่อย author (skill-create, agent-create) ช่วยให้ repository พัฒนาสกิล agent และคำสั่งของตัวเอง ส่วน addon บำรุงรักษาแบบสมัครใจ เช่น dependency-upgrade ช่วยให้มันอัปเดตตัวเองอยู่เสมอ',
        },
        {
          label: 'อิงกับ git ทำต่อได้ ผ่าน .dwp/',
          detail:
            'ไม่มี daemon และไม่มีสถานะภายนอก แผนและฉบับร่างถูกเก็บในโฟลเดอร์ .dwp/ ที่ถูก gitignore ไว้ และทุกงานกลับมาทำต่อได้จาก git เพียงอย่างเดียว แม้หลังจากบริบทล้น',
        },
      ],
    },
    agents: {
      badge: 'Agent',
      title: 'ทำงานร่วมกับ agent ที่คุณใช้อยู่แล้ว',
      subtitle:
        'ระเบียบวิธีเดียว อะแดปเตอร์หลากหลาย Markdown ไม่ผูกเฟรมเวิร์กไว้กับสิ่งใด agent ทุกตัวที่อ่าน Markdown ได้สามารถรัน Deep Work Plan ได้',
      fullLabel: 'เต็มรูปแบบ',
      partialLabel: 'บางส่วน',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'การนำไปใช้แบบอ้างอิง พร้อม WebFetch และ slash command ในตัว',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'อะแดปเตอร์เต็มรูปแบบ ใช้บันเดิลออฟไลน์หาก WebFetch ถูกจำกัด',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'แนะนำบันเดิลออฟไลน์ ติดตั้งกฎไว้ใต้ .codex/',
        },
        {
          name: 'GitHub Copilot',
          support: 'partial',
          note: 'เฉพาะเอกสารและ AGENTS.md slash command ผ่านส่วนขยาย',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'ต้องใช้ Gemini 2.5 Pro ขึ้นไป พร้อม WebFetch ในตัว',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'อะแดปเตอร์เต็มรูปแบบพร้อมพื้นผิวคำสั่งในตัว',
        },
      ],
    },
    stacks: {
      badge: 'สแตก',
      title: 'พรีเซ็ตการให้เหตุผลสำหรับสแตกที่สำคัญ',
      subtitle:
        'สิ่งเหล่านี้เป็นตัวช่วยให้เหตุผล ไม่ใช่เทมเพลต การเริ่มต้นจะอ่าน manifest จริงของ repository คุณและปรับตามแต่ละสแตก ไม่เคยคัดลอกพรีเซ็ตแบบตาบอด โมโนรีโปจะได้เอกสารแยกตามโมดูล',
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
        { name: 'Generic', sub: 'สแตกใดก็ได้' },
      ],
    },
    archetypes: {
      badge: 'สองรูปแบบ',
      title: 'repository เดี่ยว หรือ orchestrator hub',
      subtitle:
        'การเริ่มต้นจะแยกทางตามรูปแบบ repository ส่วนใหญ่เป็น repo เดี่ยว ส่วน hub จะประสาน Deep Work Plan ลูกข้าม repository หลายแห่ง ระเบียบวิธีรองรับทั้งสองแบบอย่างเต็มที่',
      individual: {
        tag: 'กรณีทั่วไป',
        title: 'repository เดี่ยว',
        description:
          'โค้ดเบสเดียวที่มีสแตกหลักหนึ่งสแตก คำสั่งตรวจสอบของตัวเอง และเอกสารแยกตามโมดูล เป็นค่าเริ่มต้น การเริ่มต้นจะถือว่าเป็นแบบนี้ เว้นแต่ repository นั้นเป็น hub อย่างชัดเจน',
        example: 'ตัวอย่างเช่น Django API แอป Vue หรือบริการ TypeScript Lambda',
      },
      orchestrator: {
        tag: 'การประสานงาน',
        title: 'orchestrator hub',
        description:
          'repository สำหรับประสานงานที่จัดการงานข้าม sub-repository ผ่าน orchestrator manifest โดยแตกแผนงานลูกที่ต่างคอมมิตใน repository ของตัวเอง พร้อมกฎขอบเขตและดัชนีการนำทาง',
        example: 'ตัวอย่างเช่น hub ที่ประสานงาน repository ผลิตภัณฑ์ห้าแห่ง',
      },
    },
    comparison: {
      badge: 'ระเบียบวิธี เทียบกับ เครื่องมือ',
      title: 'คนละชั้น เสริมกัน ไม่ใช่แข่งกัน',
      subtitle:
        'Deep Work Plan ไม่ใช่ตัวสร้างโครงอีกตัวหนึ่ง แต่เป็นชั้นระเบียบวิธีที่อยู่ใต้เครื่องมือ spec-driven หรือเครื่องมือสร้างโครงใดก็ได้ โดยมุ่งเน้นการรันอย่างอิสระหลายชั่วโมง',
      colDwp: 'Deep Work Plan',
      colOthers: 'เครื่องมือสร้างโครง / เครื่องมือ spec',
      rows: [
        {
          label: 'จุดมุ่งเน้นหลัก',
          dwp: 'การทำงานอย่างอิสระหลายชั่วโมง',
          others: 'การสร้าง spec หรือสร้างโครง',
        },
        {
          label: 'หน่วยของงาน',
          dwp: 'หนึ่ง Deep Work Plan (เซสชันที่ทำต่อได้)',
          others: 'เอกสาร spec หรือโครงสร้าง',
        },
        {
          label: 'แบบจำลองสถานะ',
          dwp: 'โฟลเดอร์ .dwp/ ที่อิงกับ git ทำต่อได้',
          others: 'มักอยู่ภายนอกหรือใน IDE',
        },
        {
          label: 'การผูกกับ agent',
          dwp: 'ไม่ผูกกับ agent ใด (Markdown และ Bash)',
          others: 'มักเจาะจงเครื่องมือหรือ IDE',
        },
        {
          label: 'การกู้คืนบริบท',
          dwp: 'ทำต่อได้หลังบริบทล้น',
          others: 'โดยทั่วไปเริ่มงานใหม่',
        },
        {
          label: 'สัญญาอนุญาต',
          dwp: 'MIT ระเบียบวิธีและชุดเครื่องมือแบบเปิด',
          others: 'แตกต่างกันไป',
        },
      ],
    },
    origin: {
      badge: 'ที่มา',
      quote:
        'สร้างโดย Dailybot บริษัทเบื้องหลังระบบ standup แบบอะซิงโครนัสสำหรับทีมกระจายตัว ภายในองค์กรเราใช้ Deep Work Plan เพื่อทำให้ repository production ที่ครอบคลุม Django, Vue, TypeScript Lambda และ Astro ขับเคลื่อนด้วย agent ได้ หลังจากใช้งานจริงนานหลายเดือน เราจึงเปิดซอร์สระเบียบวิธีนี้ภายใต้สัญญาอนุญาต MIT',
      attribution: 'ทีมวิศวกรรมของ Dailybot',
      dailybotCta: 'เรียนรู้เกี่ยวกับ Dailybot',
    },
    finalCta: {
      badge: 'ทำให้ repository ของคุณเป็น AI-first',
      title: 'มอบงานเชิงลึกให้ agent ของคุณ',
      subtitle:
        'มอบหนึ่งบรรทัดให้ agent ของคุณ ชี้ไปที่ /init.md แล้วมันจะทำให้ repository ของคุณเป็น AI-first ทั้งติดตั้งสกิล ให้เหตุผลเกี่ยวกับสแตกของคุณ และคอมมิตลำดับชั้น AGENTS.md ที่สมบูรณ์ จากนั้นคุณสร้างและรัน Deep Work Plan ที่ทำงานอย่างอิสระนานหลายชั่วโมง',
      primaryCta: 'เปิดพรอมต์ /init',
      secondaryCta: 'อ่านระเบียบวิธี',
      meta: 'อยู่ภายใต้สัญญาอนุญาต MIT · ไม่มีการเก็บข้อมูลการใช้งาน · ผลลัพธ์ออกไปยังโฟลเดอร์ .dwp/ ที่ถูก gitignore ไว้',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'ติดต่อ',
    nameLabel: 'ชื่อ',
    namePlaceholder: 'ชื่อของคุณ',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'ข้อความ',
    messagePlaceholder: 'เขียนข้อความของคุณ...',
    sendButton: 'ส่งข้อความ',
  },

  // About page
  aboutPage: {
    title: 'เกี่ยวกับระเบียบวิธี',
    subtitle: 'ระเบียบวิธีแบบเปิด · ภายใต้สัญญาอนุญาต MIT',
    description:
      'Deep Work Plan คือระเบียบวิธีแบบเปิดที่ไม่ผูกกับเฟรมเวิร์กใด สำหรับงานวิศวกรรมจริงจังร่วมกับ AI coding agent ที่มาที่ไปและผู้ดูแลรักษามันคือใคร',
    heroDescription:
      'โครงสร้างที่ทำซ้ำได้สำหรับการวางแผน ลงมือทำ และตรวจสอบงานเชิงลึกร่วมกับ AI coding agent สร้างขึ้นอย่างเปิดเผยและใช้งานได้ฟรี',
    bioTitle: 'มันคืออะไร',
    bioText:
      'Deep Work Plan (DWP) เป็นระเบียบวิธี ไม่ใช่ผลิตภัณฑ์ มันนิยามวิธีเปลี่ยนเป้าหมายให้เป็นแผนที่ตกลงร่วมกัน แบ่งแผนนั้นออกเป็นงานย่อยแบบ atomic ที่ตรวจสอบได้อย่างอิสระ และรันแต่ละงานในลูปที่มุ่งเน้น ซึ่งจบลงด้วยการตรวจสอบ<br /><br />มันถูกออกแบบให้ไม่ผูกกับ AI agent หรือสแตกใดที่คุณใช้โดยเจตนา อะแดปเตอร์จะแปลลูปหลักเดียวกันไปสู่ Claude, Cursor, Copilot, Codex, Gemini และอื่น ๆ แผน งาน และบันทึกการทำงานล้วนเป็น Markdown ธรรมดา งานจึงยังคงอ่านได้ ตรวจทานได้ และควบคุมเวอร์ชันได้',
    passionsTitle: 'หลักการสำคัญ',
    passions: [
      {
        title: 'วางแผนก่อนลงมือ',
        description: 'ยังไม่เขียนโค้ดจนกว่าจะตกลงแผนกันได้ แผนคือสัญญาระหว่างคุณกับ agent',
        icon: '\u{1F5FA}\uFE0F',
        link: '/methodology',
      },
      {
        title: 'งานเป็นแบบ atomic',
        description:
          'แต่ละงานถูกกำหนดขอบเขตให้ลงมือทำและตรวจสอบได้ด้วยตัวเอง แล้วคอมมิตแบบ atomic',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title:
          '\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e17\u0e38\u0e01\u0e2d\u0e22\u0e48\u0e32\u0e07',
        description:
          '\u0e17\u0e38\u0e01\u0e07\u0e32\u0e19\u0e08\u0e1a\u0e25\u0e07\u0e14\u0e49\u0e27\u0e22\u0e01\u0e32\u0e23\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e17\u0e35\u0e48\u0e0a\u0e31\u0e14\u0e40\u0e08\u0e19\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e23\u0e34\u0e48\u0e21\u0e07\u0e32\u0e19\u0e16\u0e31\u0e14\u0e44\u0e1b \u0e42\u0e14\u0e22\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e04\u0e27\u0e32\u0e21\u0e04\u0e37\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e44\u0e27\u0e49\u0e43\u0e19 git',
        icon: '\u2705',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'โดยสรุป',
    quickFacts: [
      'ระเบียบวิธีแบบเปิด ภายใต้สัญญาอนุญาต MIT',
      'ไม่ผูกกับเฟรมเวิร์กและ agent ใด',
      'ดูแลรักษาโดย Dailybot และชุมชน',
      'ประกอบด้วยข้อกำหนด คำสั่ง อะแดปเตอร์ พรีเซ็ต และตัวอย่าง',
      'ใช้ Markdown เท่านั้น ไม่มี runtime ไม่ผูกขาด',
      'เปลี่ยน repository ใดก็ได้ให้เป็นโค้ดเบสแบบ AI-first ที่ขับเคลื่อนด้วย agent ได้',
    ],
    ctaTitle: 'ใครเป็นผู้ดูแลรักษา',
    ctaDescription:
      'Deep Work Plan เติบโตมาจากงานวิศวกรรมจริงที่ Dailybot และปัจจุบันดูแลรักษาโดย Dailybot ร่วมกับชุมชนโอเพนซอร์ส ระเบียบวิธี ข้อกำหนด และชุดเครื่องมือเผยแพร่ภายใต้สัญญาอนุญาต MIT ใช้งาน ดัดแปลง และต่อยอดได้ฟรี',
    ctaCv: 'อ่านระเบียบวิธี',
    ctaContact: 'เริ่มใช้งานเร็ว',
  },

  // Contact page
  contactPage: {
    title: 'ชุมชนและการติดต่อ',
    subtitle: 'โอเพนซอร์ส · ขับเคลื่อนโดยชุมชน',
    description:
      'Deep Work Plan สร้างขึ้นอย่างเปิดเผย ค้นหาซอร์สโค้ด เปิด issue หรือร่วมพูดคุยผ่านช่องทางด้านล่าง ยินดีต้อนรับการมีส่วนร่วม',
    heroDescription:
      'มีคำถาม ไอเดีย หรือข้อเสนอแนะ Deep Work Plan พัฒนาอย่างเปิดเผยต่อสาธารณะ นี่คือช่องทางติดต่อโครงการและผู้ดูแลรักษา',
    formTitle: 'ส่งข้อความ',
    nameLabel: 'ชื่อ',
    namePlaceholder: 'ชื่อของคุณ',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'ฉันต้องการติดต่อเรื่อง',
    reasonOptions: [
      { value: '', label: '— เลือกหัวข้อ —' },
      { value: 'general', label: 'ทั่วไป / แค่ทักทาย' },
      { value: 'tech-talk', label: 'Tech talk / คำเชิญบรรยาย' },
      { value: 'collaboration', label: 'ความร่วมมือ / เป็นพันธมิตร' },
      { value: 'project', label: 'โครงการ / สอบถามงาน' },
      { value: 'dailybot', label: 'คำถามเกี่ยวกับ Dailybot' },
      { value: 'trading', label: 'คำถามเกี่ยวกับการเทรดของฉัน' },
      {
        value: 'the-library-of-tomorrow',
        label: 'เข้าร่วม The Library of Tomorrow',
      },
      { value: 'other', label: 'อื่น ๆ' },
    ],
    subjectLabel: 'หัวเรื่อง',
    subjectPlaceholder: 'เรื่องเกี่ยวกับอะไร',
    messageLabel: 'ข้อความ',
    messagePlaceholder: 'เขียนข้อความของคุณ...',
    sendButton: 'ส่งข้อความ',
    sendingButton: 'กำลังส่ง...',
    successTitle: 'ส่งข้อความแล้ว',
    successMessage: 'ขอบคุณที่ติดต่อมา เราจะตอบกลับโดยเร็วที่สุด',
    sendAnotherButton: 'ส่งข้อความอีกครั้ง',
    requiredField: 'จำเป็นต้องกรอกช่องนี้',
    invalidEmail: 'กรุณากรอกที่อยู่อีเมลที่ถูกต้อง',
    fallbackMessage: 'ขณะนี้แบบฟอร์มติดต่อใช้งานไม่ได้ คุณสามารถติดต่อเราโดยตรงทางอีเมล',
    fallbackEmailText: 'ส่งอีเมลถึงเราได้ที่',
    formNote: 'เราจะตอบกลับโดยเร็วที่สุด',
    socialTitle: 'ติดต่อกับเรา',
    locationTitle: 'ที่ตั้ง',
    locationText: 'ตั้งอยู่ในโคลอมเบีย เปิดรับความร่วมมือทางไกลทั่วโลก',
    prefillSubjects: {
      generalInquiry: 'สอบถามทั่วไป',
      collaboration: 'โอกาสความร่วมมือ',
      projectInquiry: 'สอบถามโครงการหรืองาน',
      projectCollaboration: 'สอบถามความร่วมมือในโครงการ',
      startupCollaboration: 'โอกาสความร่วมมือกับสตาร์ทอัพ',
      techTalkInvitation: 'คำเชิญบรรยาย Tech Talk',
      tradingQuestion: 'คำถามเรื่องการเทรด',
      dailybotQuestion: 'คำถามเกี่ยวกับ Dailybot',
    },
  },

  contactSection: {
    title: 'มาเชื่อมต่อกัน',
    description:
      'เราเปิดรับบทสนทนาที่น่าสนใจ โอกาสความร่วมมือ และไอเดียใหม่ ๆ เสมอ ไม่ว่าคุณจะอยากคุยเรื่องเทคโนโลยี การเป็นผู้ประกอบการ หรือแค่ทักทาย',
    ctaText: 'ติดต่อเรา',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'en-US',

  // 404 page
  notFoundPage: {
    title: 'ไม่พบหน้านี้',
    description:
      'หน้าที่คุณกำลังค้นหาไม่มีอยู่หรือถูกย้ายไปแล้ว สำรวจระเบียบวิธีหรือกลับไปยังหน้าแรกเพื่อเรียกดูต่อ',
    heading: 'ไม่พบหน้านี้',
    message:
      'ขออภัย หน้าที่คุณกำลังค้นหาไม่มีอยู่หรืออาจถูกย้ายไปแล้ว ลองกลับไปยังหน้าแรกหรือสำรวจระเบียบวิธี',
    backHome: 'กลับสู่หน้าแรก',
    exploreMethodology: 'อ่านระเบียบวิธี',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'ระเบียบวิธี Deep Work Plan',
      description:
        'ห้าบทตั้งแต่แถลงการณ์ไปจนถึงรูปแบบงาน ครอบคลุมหลักการ ลูปหลัก เทมเพลต สกิลและ agent รวมถึงการปรับแต่งที่อยู่เบื้องหลัง Deep Work Plan',
    },
    eyebrow: 'ระเบียบวิธี',
    title: 'ระเบียบวิธี Deep Work Plan',
    intro:
      'ห้าบทที่พาคุณจากปรัชญาเบื้องหลัง Deep Work Plan ไปสู่ลูปการทำงานจริง เทมเพลต และการปรับแต่งที่คุณใช้ทุกวัน',
    chapterLabel: 'บท',
    readChapter: 'อ่านบทนี้',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToIndex: 'ทุกบท',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'ข้อกำหนด Deep Work Plan',
      description:
        'ข้อกำหนดที่อ่านได้ของระเบียบวิธี Deep Work Plan ครอบคลุมรูปแบบ DWP โปรโตคอลของ agent รูปแบบงาน มาตรฐานเอกสาร และส่วนเสริม',
    },
    eyebrow: 'ข้อกำหนด',
    title: 'ข้อกำหนด',
    intro:
      'ข้อกำหนดของระเบียบวิธีที่แม่นยำและอ่านได้ ทั้งโครงสร้างและโปรโตคอลที่มนุษย์และ agent ใช้ร่วมกัน',
    tocTitle: 'ในหน้านี้',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToIndex: 'เอกสารข้อกำหนดทั้งหมด',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'ชุดเครื่องมือ Deep Work Plan',
      description:
        'สกิลและสกิลย่อยทั้งแปด คำสั่ง อะแดปเตอร์ พรีเซ็ต ส่วนเสริมแบบสมัครใจ และตัวอย่างที่ทำให้ Deep Work Plan รันได้ข้าม agent และสแตก',
    },
    eyebrow: 'ชุดเครื่องมือ',
    title: 'ชุดเครื่องมือ',
    intro:
      'ทุกสิ่งที่คุณต้องใช้ในการรันระเบียบวิธี ทั้งสกิลและสกิลย่อย slash command อะแดปเตอร์สำหรับ agent พรีเซ็ตการเริ่มต้น addon แบบสมัครใจ และตัวอย่างที่ลงมือทำจริง',
    groups: {
      command: {
        title: 'สกิลย่อยและคำสั่ง',
        description:
          'เราเตอร์ของสกิลและสกิลย่อย (create, execute, refine, resume, status, verify, onboard, author) พร้อม slash command บาง ๆ ที่มอบหมายงานต่อให้พวกมัน',
      },
      adapter: {
        title: 'อะแดปเตอร์',
        description:
          'การเชื่อมต่อบาง ๆ แยกตาม agent สำหรับ Claude, Cursor, Codex และอื่น ๆ',
      },
      preset: {
        title: 'พรีเซ็ตการเริ่มต้น',
        description:
          'แนวทางการให้เหตุผลแยกตามสแตกที่กระบวนการ onboard ใช้เพื่อปรับเอกสาร สกิล และคำสั่งตรวจสอบให้เข้ากับ repository ของคุณ',
      },
      example: {
        title: 'ตัวอย่าง',
        description: 'การลงมือทำจริงแบบเปรียบเทียบก่อนและหลัง',
      },
      addon: {
        title: 'Addon (สมัครใจ)',
        description:
          'ความสามารถเสริมที่กระบวนการ onboard สามารถวางทับลงบน repo ไม่ใช่ส่วนหนึ่งของพื้นฐาน AI-first',
      },
    },
    viewDetail: 'ดูรายละเอียด',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToIndex: 'กลับไปยังชุดเครื่องมือ',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'ตัวอย่าง Deep Work Plan',
      description:
        'การลงมือทำจริงแบบเปรียบเทียบก่อนและหลัง แสดงงานวิศวกรรมเดียวกันทั้งที่มีและไม่มี Deep Work Plan พร้อมความต่างด้านความน่าเชื่อถือและการตรวจทาน',
    },
    eyebrow: 'ตัวอย่าง',
    title: 'ตัวอย่าง',
    intro:
      'ดูระเบียบวิธีในการใช้งานจริง ผ่านการลงมือทำแบบเปรียบเทียบก่อนและหลังของงานวิศวกรรมจริงอย่างเป็นรูปธรรม',
    viewExample: 'อ่านการลงมือทำ',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToGallery: 'ตัวอย่างทั้งหมด',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'เริ่มใช้งานเร็ว — Deep Work Plan',
      description:
        'ติดตั้งสกิล เริ่มต้น repository ของคุณ แล้ววางแผนและลงมือทำกับ agent ใดก็ได้ ขั้นตอนที่ทำให้ repository ของคุณเป็น spec-driven และขับเคลื่อนด้วย agent ได้',
    },
    eyebrow: 'เริ่มใช้งานเร็ว',
    title: 'เริ่มได้ในไม่กี่นาที',
    intro:
      'ติดตั้งสกิล เริ่มต้น repository ของคุณ แล้ววางแผนและลงมือทำกับ agent ใดก็ได้ ขั้นตอนที่ทำให้ repository ของคุณเป็น spec-driven และขับเคลื่อนด้วย agent ได้',
    sequenceTitle: 'เส้นทางการนำไปใช้',
    codeLabel: 'เทอร์มินัล',
    orLabel: 'หรือ',
    steps: [
      {
        title: 'ติดตั้งสกิล Deep Work Plan',
        description:
          'เพิ่มสกิลลงใน repository ของคุณ ทั้งเราเตอร์และสกิลย่อยแปดตัว (create, execute, refine, resume, status, verify, onboard, author) ใช้ Skills CLI เพื่อความรวดเร็วที่สุด หรือโคลน repo แล้วรันสคริปต์ติดตั้งในที่ที่มี git และเชลล์',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'เริ่มต้น repository',
        description:
          'รันสกิลย่อย onboard แล้วให้ agent ให้เหตุผลเกี่ยวกับ repo จริงของคุณ มันจะสร้าง AGENTS.md ฐานความรู้ docs/ เอกสารแยกตามโมดูล และที่อยู่ .agents/ ที่ใช้ร่วมกันข้าม agent (พร้อมซิมลิงก์ .claude → .agents) เชื่อมต่อคำสั่ง dwp-* บาง ๆ และวางโครง .dwp/ ที่ถูก gitignore ไว้',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'พัฒนาชุดเครื่องมือและรับ addon',
        description:
          'ใช้ /skill-create และ /agent-create (สกิลย่อย author) เพื่อสร้างสกิล agent และคำสั่งที่เหมาะกับสแตก การเริ่มต้นยังเสนอ addon แบบสมัครใจสามตัว ได้แก่ devcontainer, Dailybot และ dependency-upgrade ซึ่งคุณรับมาเฉพาะเมื่อเหมาะสม',
      },
      {
        title: 'วางแผนและลงมือทำ',
        description:
          'สร้าง Deep Work Plan แล้วรันทีละงาน ตรวจสอบทุก gate และกลับมาทำต่อข้ามเซสชัน ขับเคลื่อน repository ตามข้อกำหนดของตัวมันเอง',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'ผลลัพธ์',
    outcome:
      'repository ของคุณกลายเป็น spec-driven และขับเคลื่อนด้วย agent ได้ แผนงานเป็นแหล่งความจริงที่คงทน และตัว repository เองกลายเป็น harness ที่ agent ใดก็รันได้',
    nextStepsTitle: 'ขั้นตอนถัดไป',
    nextSteps: [
      { label: 'อ่านระเบียบวิธี', href: '/methodology' },
      { label: 'เรียกดูชุดเครื่องมือ', href: '/kit' },
      { label: 'ดูตัวอย่าง', href: '/examples' },
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
    handoffTitle: 'Give this to your agent',
    handoffBody:
      'Paste the line below into your AI coding agent. It will read the methodology and specification, install the skill, and onboard this repository for Deep Work Plans.',
    handoffInstruction:
      'อ่านและทำตามคำแนะนำที่ https://deepworkplan.com/init.md เพื่อทำให้รีพอซิทอรีนี้เป็น AI-first',
    handoffMdLabel: 'Self-contained agent prompt',
    codeLabel: 'agent',
    whatTitle: 'What this does',
    whatBody: [
      'Adoption changes the repository in two durable ways — the pillars of the methodology.',
      'First, the repository becomes spec-driven: work begins from a written plan and specification, not from ad-hoc prompts. Second, the repository itself becomes the agent harness — an AGENTS.md, a docs/ knowledge base, per-module docs, and a .agents/ skill home (with the .claude → .agents symlink) give every agent the context and commands it needs.',
    ],
    sequenceTitle: 'The adoption sequence',
    orLabel: 'or',
    steps: [
      {
        title: 'Install the skill',
        description:
          'Add the Deep Work Plan skill so any agent can plan and execute structured work. The skill ships a router plus eight sub-skills — create, execute, refine, resume, status, verify, onboard, and author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Run repository onboarding',
        description:
          'Invoke the onboard sub-skill and let the agent reason about the actual repo — its stack, package manager, and real validation commands. It then generates AGENTS.md, a docs/ knowledge base, per-module docs, and a cross-agent .agents/ home (with the .claude → .agents symlink), wires the thin dwp-* commands, and scaffolds a gitignored .dwp/ for plans and drafts. Nothing is templated; everything is adapted to your repository.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolve the kit and accept addons',
        description:
          'Use /skill-create and /agent-create (the author sub-skill) to grow stack-appropriate skills, agents, and commands. Onboarding also offers three opt-in addons — devcontainer, Dailybot, and dependency-upgrade — that you accept only when they fit. A repo is fully conformant with zero addons.',
      },
      {
        title: 'Plan and execute',
        description:
          'Generate Deep Work Plans with /dwp-create and run them with /dwp-execute, then /dwp-status, /dwp-refine, and /dwp-resume as work proceeds. Each plan carries numbered tasks, validation gates, and a completion protocol so work stays structured, reviewable, and resumable across sessions.',
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
};
