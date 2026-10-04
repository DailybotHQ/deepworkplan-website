import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  getInstallerFacts,
  VIM_INSTALL_COMMAND,
  VIM_INSTALL_URL,
  VIM_REPO_INSTALL_URL,
} from '@/lib/vim-installer';

const installerPath = resolve(process.cwd(), 'public/vim/install.sh');

describe('getInstallerFacts', () => {
  it('returns a lowercase 64-character hex SHA-256', () => {
    expect(getInstallerFacts().sha256).toMatch(/^[0-9a-f]{64}$/);
  });

  it('matches an independent hash of the served file', () => {
    const expected = createHash('sha256')
      .update(readFileSync(installerPath))
      .digest('hex');
    expect(getInstallerFacts().sha256).toBe(expected);
  });

  it('reports the byte size of the served file', () => {
    expect(getInstallerFacts().bytes).toBe(statSync(installerPath).size);
  });

  it('counts lines the way wc -l does for a newline-terminated script', () => {
    const text = readFileSync(installerPath, 'utf8');
    expect(getInstallerFacts().lines).toBe(text.split('\n').length - 1);
  });

  it('points at the canonical installer URL', () => {
    expect(getInstallerFacts().url).toBe(VIM_INSTALL_URL);
  });
});

describe('installer constants', () => {
  it('keeps the canonical one-liner verbatim', () => {
    expect(VIM_INSTALL_COMMAND).toBe(
      'curl -fsSL https://deepworkplan.com/vim/install.sh | bash'
    );
  });

  it('serves the installer from the /vim/ path on the apex domain', () => {
    expect(VIM_INSTALL_URL.startsWith('https://deepworkplan.com/vim/')).toBe(
      true
    );
  });

  it('links the Windows manual path to the repository install section', () => {
    expect(VIM_REPO_INSTALL_URL).toBe(
      'https://github.com/DailybotHQ/deepworkplan-vim#install-host'
    );
  });
});
