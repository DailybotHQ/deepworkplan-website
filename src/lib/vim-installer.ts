import { createHash } from 'node:crypto';

// Vite's `?raw` suffix inlines the file's bytes as a string at build time, so
// the digest below is computed from the exact file the site serves at
// /vim/install.sh and can never drift from it (see src/lib/init-prompt.ts for
// why a plain fs path is avoided).
import installerSource from '../../public/vim/install.sh?raw';

/** Canonical, public URL of the DeepWorkPlan Vim installer. */
export const VIM_INSTALL_URL = 'https://deepworkplan.com/vim/install.sh';

/**
 * The canonical install one-liner, verbatim from the product contract. It is
 * code, not prose: never translate or reflow it.
 */
export const VIM_INSTALL_COMMAND = `curl -fsSL ${VIM_INSTALL_URL} | bash`;

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
