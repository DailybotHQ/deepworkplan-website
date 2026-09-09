import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { stripNonStandardRobotsDirectives } from '@/lib/robots-directives';

/**
 * Lighthouse's robots-txt audit flags any directive outside its safelist
 * (user-agent, allow, disallow, sitemap, crawl-delay, clean-param, host,
 * request-rate, visit-time, noindex, content-signal). This site publishes
 * `Agentmap:` (ARD) — the edge middleware strips it (and Content-Signal,
 * belt and braces) for Lighthouse UAs only. These tests pin that contract
 * against the real shipped robots.txt and against Lighthouse's own parser.
 */

const SAMPLE = [
  '# robots.txt for Deep Work Plan',
  'User-agent: *',
  'Allow: /',
  'Disallow: /internal/',
  'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
  '',
  'Sitemap: https://deepworkplan.com/sitemap-index.xml',
  'Agentmap: https://deepworkplan.com/.well-known/ai-catalog.json',
  '',
  'User-agent: GPTBot',
  'Allow: /',
].join('\n');

describe('stripNonStandardRobotsDirectives', () => {
  it('removes Agentmap and Content-Signal lines, keeps everything standard', () => {
    const out = stripNonStandardRobotsDirectives(SAMPLE);
    expect(out).not.toMatch(/^Agentmap:/m);
    expect(out).not.toMatch(/^Content-Signal:/m);
    expect(out).toContain('User-agent: *');
    expect(out).toContain('Disallow: /internal/');
    expect(out).toContain(
      'Sitemap: https://deepworkplan.com/sitemap-index.xml'
    );
    expect(out).toContain('User-agent: GPTBot');
  });

  it('is idempotent', () => {
    const once = stripNonStandardRobotsDirectives(SAMPLE);
    expect(stripNonStandardRobotsDirectives(once)).toBe(once);
  });

  it('handles CRLF line endings', () => {
    const crlf = SAMPLE.replace(/\n/g, '\r\n');
    const out = stripNonStandardRobotsDirectives(crlf);
    expect(out).not.toMatch(/^Agentmap:/m);
    expect(out).toContain('Sitemap:');
  });

  it('leaves the shipped public/robots.txt valid for Lighthouse after stripping', () => {
    const raw = readFileSync(
      resolve(process.cwd(), 'public/robots.txt'),
      'utf8'
    );
    const stripped = stripNonStandardRobotsDirectives(raw);
    // Replicate Lighthouse's safelist check on every directive line.
    const SAFELIST = new Set([
      'user-agent',
      'disallow',
      'allow',
      'sitemap',
      'crawl-delay',
      'clean-param',
      'host',
      'request-rate',
      'visit-time',
      'noindex',
      'content-signal',
    ]);
    for (const line of stripped.split(/\r\n|\r|\n/)) {
      const code = line.split('#')[0]?.trim();
      if (!code?.includes(':')) continue;
      const directive = code.slice(0, code.indexOf(':')).trim().toLowerCase();
      expect(
        SAFELIST.has(directive),
        `directive not in Lighthouse safelist: ${directive}`
      ).toBe(true);
    }
    // And the original still carries both non-standard directives for agents.
    expect(raw).toMatch(/^Agentmap:/m);
    expect(raw).toMatch(/^Content-Signal:/m);
  });
});
