#!/usr/bin/env node --experimental-strip-types
/**
 * One-off generator for src/content/pages/{lang}/compare.md, run once to
 * restore parity between the hand-maintained agent-markdown endpoint and the
 * live /compare page (PLAN_compare_page_fact_audit, Task 5). Not wired into
 * the build — compare.md remains a hand-maintained static file per the
 * repo's Agent-Friendly Markdown convention; this script is a one-time sync
 * tool, run manually with:
 *   node --experimental-strip-types scripts/generate-compare-md.mjs
 */
import { writeFileSync } from 'node:fs';
import { ALTERNATIVES, CAPABILITY_IDS } from '../src/lib/compare-data.ts';

// Import each locale module directly (bypassing the i18n.ts / translations
// barrel, which use extensionless specifiers Node's native ESM loader can't
// resolve without a bundler) — active languages per AGENTS.md §7.
const LANGUAGES = [
  'en',
  'de',
  'es',
  'fr',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'pl',
  'pt',
  'ru',
  'th',
  'tr',
  'uk',
  'vi',
  'zh',
];

async function getTranslations(lang) {
  const mod = await import(`../src/lib/translations/${lang}.ts`);
  return mod[lang];
}

const CATEGORY_ORDER = [
  'sdd',
  'agent-framework',
  'ai-native-sdlc',
  'vendor-native',
];

const CELL_LABEL = {
  'built-in': (t) => t.comparePage.howToRead.values.builtIn,
  optional: (t) => t.comparePage.howToRead.values.optional,
  'not-in-scope': (t) => t.comparePage.howToRead.values.notInScope,
};

function buildMarkdown(t) {
  const c = t.comparePage;
  const others = ALTERNATIVES.filter((a) => a.id !== 'dwp');
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: others.filter((a) => a.category === category),
  })).filter((g) => g.items.length > 0);

  const categoryLabel = {
    sdd: c.categories.sdd,
    'agent-framework': c.categories.agentFramework,
    'ai-native-sdlc': c.categories.aiNativeSdlc,
    'vendor-native': c.categories.vendorNative,
  };

  const lines = [];
  lines.push('---');
  lines.push(`title: "${c.meta.title.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${c.meta.description.replace(/"/g, '\\"')}"`);
  lines.push(`lastUpdated: 2026-09-11`);
  lines.push('---');
  lines.push('');
  lines.push(`## ${c.title}`);
  lines.push('');
  lines.push(c.intro);
  lines.push('');
  lines.push(`## ${c.howToRead.title}`);
  lines.push('');
  lines.push(c.howToRead.body);
  lines.push('');
  lines.push(`- **${c.howToRead.values.builtIn}**`);
  lines.push(`- **${c.howToRead.values.optional}**`);
  lines.push(`- **${c.howToRead.values.notInScope}**`);
  lines.push('');
  lines.push(`${c.reviewedOnLabel}: 2026-09-11`);
  lines.push('');
  lines.push(`## ${c.alternativesTitle}`);
  lines.push('');

  for (const group of grouped) {
    lines.push(`### ${categoryLabel[group.category]}`);
    lines.push('');
    for (const alt of group.items) {
      const d = c.alternatives[alt.id];
      lines.push(
        `**${d.name}** — ${d.whatItDoesWell} ${d.audience} [${c.officialSiteLabel}](${alt.homepage})`
      );
      lines.push('');
    }
  }

  lines.push(`## ${c.matrix.title}`);
  lines.push('');
  lines.push(c.matrix.caption);
  lines.push('');
  const header = [
    c.matrix.capabilityColumn,
    ...ALTERNATIVES.map((a) => c.alternatives[a.id].name),
  ];
  lines.push(`| ${header.join(' | ')} |`);
  lines.push(`|${header.map(() => '---').join('|')}|`);
  for (const capability of CAPABILITY_IDS) {
    const row = [
      c.capabilities[capability].label,
      ...ALTERNATIVES.map((a) => CELL_LABEL[a.cells[capability]](t)),
    ];
    lines.push(`| ${row.join(' | ')} |`);
  }
  lines.push('');

  lines.push(`## ${c.dwpStrengths.title}`);
  lines.push('');
  for (const item of c.dwpStrengths.items) {
    lines.push(`- **${item.title}.** ${item.body}`);
  }
  lines.push('');

  lines.push(`## ${c.honestLimits.title}`);
  lines.push('');
  lines.push(c.honestLimits.body);
  lines.push('');

  lines.push(`## ${c.correction.title}`);
  lines.push('');
  lines.push(c.correction.body);
  lines.push('');
  lines.push(
    `[${c.correction.ctaLabel}](https://github.com/DailybotHQ/deepworkplan-website/issues)`
  );
  lines.push('');

  lines.push(`## ${c.sourcesTitle}`);
  lines.push('');
  for (const alt of ALTERNATIVES) {
    lines.push(`- ${c.alternatives[alt.id].name} — ${alt.docsUrl}`);
  }
  lines.push('');

  return lines.join('\n');
}

for (const lang of LANGUAGES) {
  const t = await getTranslations(lang);
  const md = buildMarkdown(t);
  const path = `src/content/pages/${lang}/compare.md`;
  writeFileSync(path, md, 'utf-8');
  console.log(`wrote ${path}`);
}
