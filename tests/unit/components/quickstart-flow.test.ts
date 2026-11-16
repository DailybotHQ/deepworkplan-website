import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSupportedLanguages } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

// The v8 adoption path ends with the loop: five steps — open /init.md,
// install the skill, adapt the repository, plan and execute, and a human
// starting the loop. The QuickstartFlow plate (inline i18n map) and the
// home.quickstart.steps translation must both carry five steps in every
// supported language, or the plate and the numbered list drift apart.

const STEPS = 5;
const source = readFileSync(
  resolve(process.cwd(), 'src/components/diagrams/home/QuickstartFlow.astro'),
  'utf8'
);
const languages = getSupportedLanguages();

// One language's block inside the inline i18n map.
const langBlock = (lang: string): string => {
  const match = source.match(
    new RegExp(`^ {2}${lang}: \\{\\n([\\s\\S]*?)^ {2}\\},`, 'm')
  );
  expect(match, `QuickstartFlow: no i18n block for "${lang}"`).not.toBeNull();
  return match?.[1] ?? '';
};

const stepLabels = (block: string): string[] => {
  const steps = block.match(/steps: \[([\s\S]*?)\]/);
  expect(steps, 'steps array not found').not.toBeNull();
  return [...(steps?.[1] ?? '').matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(
    (m) => m[1]
  );
};

describe('QuickstartFlow five adoption steps', () => {
  it.each(languages)('plate has %s labels for five non-empty steps', (lang) => {
    const labels = stepLabels(langBlock(lang));
    expect(labels).toHaveLength(STEPS);
    for (const label of labels) expect(label.trim()).not.toBe('');
  });

  it.each(languages)('home.quickstart.steps has five steps in %s', (lang) => {
    const steps = getTranslations(lang).home.quickstart.steps;
    expect(steps).toHaveLength(STEPS);
    for (const step of steps) {
      expect(step.title.trim()).not.toBe('');
      expect(step.description.trim()).not.toBe('');
    }
  });

  it('the last step names the human-started loop command', () => {
    const last = getTranslations('en').home.quickstart.steps[STEPS - 1];
    expect(last.description).toContain('herdr-peers autopilot start --loop');
  });
});
