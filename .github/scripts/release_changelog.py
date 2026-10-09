#!/usr/bin/env python3
"""Roll CHANGELOG.md's [Unreleased] section into a released version.

    python3 .github/scripts/release_changelog.py <version> [<date>] < commits.txt

Called by prepare_release.sh before the release commit. The entries under
`## [Unreleased]` move to a new `## [<version>] - <date>` section and
`[Unreleased]` starts empty again. When nothing was logged under Unreleased,
the commit subjects read from stdin (one per line) become a `### Changed` list,
so every tag still gets a section. The link references at the bottom are
updated. Standard library only; no network.
"""
import datetime
import re
import sys

REPO = 'https://github.com/DailybotHQ/deepworkplan-website'


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__, file=sys.stderr)
        return 2
    version = sys.argv[1].lstrip('v')
    date = sys.argv[2] if len(sys.argv) > 2 else datetime.date.today().isoformat()
    text = open('CHANGELOG.md', encoding='utf-8').read()
    head = '## [Unreleased]'
    if head not in text or f'## [{version}]' in text:
        print(f'release_changelog: no [Unreleased] or {version} already present', file=sys.stderr)
        return 1
    before, rest = text.split(head, 1)
    nxt = re.search(r'^## \[', rest, re.M)
    body, after = (rest[: nxt.start()], rest[nxt.start():]) if nxt else (rest, '')
    entries = body.strip()
    if not entries:
        commits = [c.strip() for c in sys.stdin.read().splitlines() if c.strip()]
        commits = [re.sub(r'^\W*🚩\s*', '', c) for c in commits] or ['Maintenance release']
        entries = '### Changed\n\n' + '\n'.join(f'- {c}' for c in commits)
    section = f'## [{version}] - {date}\n\n{entries}\n\n'
    out = f'{before}{head}\n\n{section}{after}'
    prev = re.search(r'^\[Unreleased\]: .*/compare/(v[^.]+\.[^.]+\.[^.]+)\.\.\.HEAD$', out, re.M)
    out = re.sub(r'^\[Unreleased\]: .*$', f'[Unreleased]: {REPO}/compare/v{version}...HEAD', out, count=1, flags=re.M)
    link = f'[{version}]: {REPO}/releases/tag/v{version}'
    out = re.sub(r'^(\[Unreleased\]: .*)$', r'\1\n' + link.replace('\\', r'\\'), out, count=1, flags=re.M)
    open('CHANGELOG.md', 'w', encoding='utf-8').write(out)
    print(f'release_changelog: [Unreleased] -> [{version}] - {date}' + (f' (previous {prev.group(1)})' if prev else ''))
    return 0


if __name__ == '__main__':
    sys.exit(main())
