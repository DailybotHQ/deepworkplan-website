import { createHash } from 'node:crypto';

// Vite's `?raw` suffix inlines the file's bytes as a string at build time, so
// the digest below is computed from the exact file the site serves at
// /vim/install.sh and can never drift from it (see src/lib/init-prompt.ts for
// why a plain fs path is avoided).
import installerSource from '../../public/vim/install.sh?raw';

/** Canonical, public URL of the DeepWorkPlan Vim installer. */
export const VIM_INSTALL_URL = 'https://deepworkplan.com/vim/install.sh';

/**
 * The product release the served installer is copied from, byte-identical,
 * and that file's SHA-256 as published at
 * raw.githubusercontent.com/DailybotHQ/deepworkplan-vim/<tag>/install.sh.
 * public/vim/install.sh is never edited here: a new release is re-copied and
 * both constants move together (the unit test pins them to the served bytes).
 */
export const VIM_INSTALLER_TAG = 'v0.4.1';
export const VIM_INSTALLER_TAG_SHA256 =
  'eaeb6c909284ff354b4f6a617fab28084e9eb329706d6d0f8d20ef0c76c8285d';

/** The product repository (source, license, releases). */
export const VIM_REPO_URL = 'https://github.com/DailybotHQ/deepworkplan-vim';

/** The repository README section that documents the Windows manual path. */
export const VIM_REPO_INSTALL_URL = `${VIM_REPO_URL}#install-host`;

export interface InstallerFacts {
  /** Lowercase hex SHA-256 of the served installer bytes. */
  sha256: string;
  /** Size of the served installer in bytes. */
  bytes: number;
  /** Number of lines in the served installer. */
  lines: number;
  /** Canonical URL the installer is served from. */
  url: string;
}

/**
 * Facts about the installer exactly as served, for the "inspect before you
 * run" recipe on the DeepWorkPlan Vim page.
 */
export function getInstallerFacts(): InstallerFacts {
  const bytes = Buffer.from(installerSource, 'utf8');
  const lines =
    installerSource === ''
      ? 0
      : installerSource.split('\n').length -
        (installerSource.endsWith('\n') ? 1 : 0);
  return {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    bytes: bytes.length,
    lines,
    url: VIM_INSTALL_URL,
  };
}

/**
 * The install as download -> verify -> run, for a given installer digest. It
 * never pipes a download into a shell (the site's review rule and the skills
 * scanners treat any fetch-and-execute pipe as critical): the script lands on
 * disk, `shasum -a 256 -c` checks it against the digest of the bytes the site
 * serves, and only then does `bash` run it. Code, not prose: never translate
 * or reflow it.
 */
export function buildInstallCommand(sha256: string): string {
  return [
    `curl -fsSL -o install.sh ${VIM_INSTALL_URL}`,
    `echo "${sha256}  install.sh" | shasum -a 256 -c`,
    'bash install.sh',
  ].join('\n');
}

/** The install commands shown on the page, bound to the served installer. */
export const VIM_INSTALL_COMMAND = buildInstallCommand(
  getInstallerFacts().sha256
);
