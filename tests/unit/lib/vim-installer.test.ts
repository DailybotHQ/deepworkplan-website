import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  buildInstallCommand,
  getInstallerFacts,
  VIM_INSTALL_COMMAND,
  VIM_INSTALL_URL,
  VIM_INSTALLER_TAG,
  VIM_INSTALLER_TAG_SHA256,
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

describe('installer provenance', () => {
  it('serves the byte-identical installer of the pinned product release', () => {
    expect(VIM_INSTALLER_TAG).toBe('v0.6.0');
    expect(getInstallerFacts().sha256).toBe(VIM_INSTALLER_TAG_SHA256);
  });

  it('serves a script that installs the pinned release by default', () => {
    const source = readFileSync(installerPath, 'utf8');
    expect(source).toContain(`RELEASE_REF="${VIM_INSTALLER_TAG}"`);
  });

  it('serves a sha256sum-format checksum of the served installer', () => {
    const checksum = readFileSync(
      resolve(process.cwd(), 'public/vim/install.sh.sha256'),
      'utf8'
    );
    expect(checksum).toBe(`${VIM_INSTALLER_TAG_SHA256}  install.sh\n`);
  });
});

describe('installer constants', () => {
  it('shows download, verify, run bound to the served digest', () => {
    const lines = VIM_INSTALL_COMMAND.split('\n');
    expect(lines).toEqual([
      'curl -fsSL -o install.sh https://deepworkplan.com/vim/install.sh && \\',
      `echo "${getInstallerFacts().sha256}  install.sh" | shasum -a 256 -c && \\`,
      'bash install.sh',
    ]);
  });

  it('runs the installer only after the download and the checksum succeed', () => {
    const lines = VIM_INSTALL_COMMAND.split('\n');
    // Every step but the last ends in `&& \` — a failed step stops the paste.
    for (const line of lines.slice(0, -1)) {
      expect(line.endsWith(' && \\')).toBe(true);
    }
    expect(lines.at(-1)).toBe('bash install.sh');
  });

  it('never pipes a download into a shell', () => {
    expect(VIM_INSTALL_COMMAND).not.toMatch(/\|\s*(ba)?sh\b/);
    expect(buildInstallCommand('0'.repeat(64))).not.toMatch(/\|\s*(ba)?sh\b/);
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
