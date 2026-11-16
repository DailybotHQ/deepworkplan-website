"""herdr-peers fleet ui — a live terminal watcher of the fleet (stdlib only).

Three layers, each depending only on the one before it:

  source   where the map comes from: the fleet-v1 file the autopilot loop
           keeps on every machine. `FileSource.poll()` costs one stat; the
           file is parsed only when it changed. Another source (a socket)
           can replace it without touching the layers below.
  model    pure: `Index` (built once per map change: agents, plans,
           machines, roles) and `build_view` (grouping by plan, repository or
           machine, counts, sorting, filtering, the age of the picture).
  view     pure rendering of a model into `Line`s of styled segments for a
           given width (`render_list`, `render_plan`, `render_agent`,
           `render_header`), then two thin back-ends: `CursesTerm` (the live
           app) and plain text (`--snapshot`, for agents and pipes).

`App` drives a `Term` (real curses, or a fake in the tests): it sleeps in
`read_key(timeout)`, redraws the header clock every second and the body only
when the map, the size, the selection or the mode changed.

Read-only: the watcher never writes the map and never sends anything to an
agent. Its only Herdr calls are `pane read` while a detail panel is open (at
most every 2 s) and `agent focus` when the human presses `f`. Every string
from the map or a screen passes through `clean()` before it is drawn.
"""
from __future__ import annotations

import json
import os
import re
import stat
import subprocess
import time
import unicodedata

SCHEMA = 'herdr-peers/fleet-v1'
STALE_AFTER = 900          # seconds: the map is called stale (the daemon is not syncing)
AGING_AFTER = 180          # seconds: the age turns amber
TICK = 1.0                 # seconds between two header redraws
SCREEN_EVERY = 2.0         # seconds between two live screen reads in a detail panel
SCREEN_LINES = 20
MIN_W, MIN_H = 50, 12
GROUPINGS = ('plan', 'repo', 'machine', 'queue')
QUEUE_MARK = {'queued': ('○', 'dim'), 'started': ('▶', 'accent'), 'done': ('✓', 'ok'), 'skipped': ('–', 'dim')}

# Agent states as the map reports them, folded into what a human reads.
STATES = {
    'working': ('working', '●'),
    'blocked': ('waiting', '◆'),
    'idle': ('idle', '○'),
    'done': ('idle', '○'),
}
STATE_ORDER = ('working', 'waiting', 'idle', 'unknown')
SITUATIONS = {
    'plan_blocked': 'BLOCKED', 'plan_stalled': 'STALLED', 'plan_no_lead': 'NO LEAD',
    'plan_completed': 'DONE', 'plan_lead_moved': 'STALE LEAD',
}
ROLE_MARK = {'lead': '★', 'lane': '·', 'successor': '↳'}
TASK_MARK = {'completed': ('✓', 'ok'), 'skipped': ('–', 'dim'), 'in_progress': ('▶', 'accent'),
             'blocked': ('■', 'bad'), 'pending': ('○', 'dim'), None: ('?', 'dim')}

UNSAFE_CATEGORIES = ('Cc', 'Cf', 'Zl', 'Zp', 'Co', 'Cs')
MAX_MAP_BYTES = 2 * 1024 * 1024
NOFOLLOW = getattr(os, 'O_NOFOLLOW', 0)


def clean(value, limit=400):
    """A single printable line: control, format (bidi, zero-width, soft
    hyphen, tag), separator and private-use characters become spaces, runs
    of spaces collapse. Data from the map or a screen is shown, never
    interpreted."""
    if value is None:
        return ''
    text = ''.join(' ' if unicodedata.category(c) in UNSAFE_CATEGORIES else c
                   for c in str(value)[:limit * 2])
    return ' '.join(text.split())[:limit]


# One validator for the map, shared with `fleet` and the writer (fleet_report).
from fleet_report import valid_fleet  # noqa: E402  (same directory, stdlib only)


def width_of(text):
    """Terminal cells a string takes (wide East Asian characters take two)."""
    return sum(2 if unicodedata.east_asian_width(c) in ('W', 'F') else
               0 if unicodedata.combining(c) else 1 for c in text)


def fit(text, cells):
    """Cut `text` to at most `cells` terminal cells, marking a cut with '…'."""
    if cells <= 0:
        return ''
    if width_of(text) <= cells:
        return text
    out, used = [], 0
    for c in text:
        w = width_of(c)
        if used + w > cells - 1:
            break
        out.append(c)
        used += w
    return ''.join(out) + '…'


def pad(text, cells):
    """`text` cut or padded with spaces to exactly `cells` cells."""
    text = fit(text, cells)
    return text + ' ' * (cells - width_of(text))


def age_phrase(seconds):
    """How old the picture is, the way a human says it."""
    if seconds is None:
        return 'never'
    seconds = max(0, int(seconds))
    if seconds < 10:
        return 'just now'
    if seconds < 60:
        return '%d s ago' % seconds
    if seconds < 3600:
        return '%d min ago' % (seconds // 60)
    if seconds < 86400:
        return '%d h %02d min ago' % (seconds // 3600, seconds % 3600 // 60)
    return '%d d ago' % (seconds // 86400)


def duration(seconds):
    if seconds is None:
        return ''
    seconds = max(0, int(seconds))
    if seconds < 60:
        return '%ds' % seconds
    if seconds < 3600:
        return '%dm' % (seconds // 60)
    if seconds < 86400:
        return '%dh%02d' % (seconds // 3600, seconds % 3600 // 60)
    return '%dd' % (seconds // 86400)


def parse_ts(stamp):
    """Seconds since the epoch of an ISO-8601 UTC stamp, or None."""
    if not isinstance(stamp, str):
        return None
    try:
        import calendar
        return calendar.timegm(time.strptime(stamp[:19], '%Y-%m-%dT%H:%M:%S'))
    except ValueError:
        return None


# ===================================================================== source

class FileSource(object):
    """The fleet-v1 file, re-read only when its size or mtime changes."""

    def __init__(self, path):
        self.path = path
        self.key = None
        self.fleet = None
        self.mtime = None
        self.error = None

    def poll(self):
        """True when the map changed since the last poll (or appeared or
        vanished). One `stat` when nothing changed."""
        try:
            st = os.stat(self.path)
        except OSError:
            changed = self.fleet is not None or self.error is None
            self.fleet, self.key, self.mtime, self.error = None, None, None, 'no map'
            return changed
        key = (st.st_mtime_ns, st.st_size)
        self.mtime = st.st_mtime
        if key == self.key:
            return False
        self.key = key
        doc = None
        try:
            fd = os.open(self.path, os.O_RDONLY | NOFOLLOW)
            try:
                info = os.fstat(fd)
                if stat.S_ISREG(info.st_mode) and info.st_size <= MAX_MAP_BYTES:
                    data = os.read(fd, MAX_MAP_BYTES + 1)
                    if len(data) <= MAX_MAP_BYTES:
                        doc = json.loads(data.decode('utf-8'))
            finally:
                os.close(fd)
        except (OSError, ValueError, UnicodeDecodeError, RecursionError):
            doc = None
        if not valid_fleet(doc):
            # Unreadable, too big, a symlink, or not the fleet-v1 shape: shown as
            # such, and the watcher keeps running.
            self.fleet, self.error = None, 'map unreadable (not a valid fleet-v1 map)'
            return True
        self.fleet, self.error = doc, None
        return True

    def age(self, now):
        """Seconds since the daemon last confirmed this copy of the map."""
        return None if self.mtime is None else max(0.0, now - self.mtime)


# ====================================================================== model

class Agent(object):
    __slots__ = ('key', 'machine', 'label', 'pane', 'kind', 'state', 'raw_state', 'mark',
                 'title', 'cwd', 'repo', 'branch', 'roles', 'since', 'search')

    def __init__(self, machine, label, row):
        self.machine, self.label = machine, label
        self.pane = clean(row.get('pane'), 40)
        self.key = '%s:%s' % (machine, self.pane)
        self.kind = clean(row.get('kind'), 20) or '?'
        self.raw_state = clean(row.get('state'), 20) or 'unknown'
        self.state, self.mark = STATES.get(self.raw_state, ('unknown', '?'))
        self.title = clean(row.get('title'), 120)
        self.cwd = clean(row.get('cwd'), 400)
        self.repo = clean(row.get('repo_root'), 400)
        self.branch = clean(row.get('branch'), 120)
        self.roles = []
        for item in row.get('plans') or []:
            if isinstance(item, dict) and item.get('role') in ROLE_MARK:
                self.roles.append((clean(item.get('plan'), 128), item['role']))
        self.since = parse_ts(row.get('state_since'))
        self.search = ' '.join([self.key, self.label, self.kind, self.raw_state, self.title,
                                self.repo or self.cwd, self.branch]
                               + [p for p, _ in self.roles]).lower()


class Plan(object):
    __slots__ = ('key', 'machine', 'label', 'plan', 'cls', 'lead', 'epoch', 'situation',
                 'done', 'total', 'current', 'repo', 'blocker_class', 'detail', 'members', 'search')

    def __init__(self, machine, label, row):
        self.machine, self.label = machine, label
        self.plan = clean(row.get('plan'), 128)
        self.key = '%s/%s' % (machine, self.plan)
        self.cls = clean(row.get('class'), 20) or 'unreadable'
        self.lead = clean(row.get('lead'), 120) or None
        self.epoch = row.get('epoch') if isinstance(row.get('epoch'), int) else None
        self.situation = row.get('situation') if row.get('situation') in SITUATIONS else None
        self.done = row.get('tasks_done') if isinstance(row.get('tasks_done'), int) else None
        self.total = row.get('tasks_total') if isinstance(row.get('tasks_total'), int) else None
        cur = row.get('current_task') if isinstance(row.get('current_task'), dict) else {}
        self.current = clean(cur.get('title') or cur.get('id'), 200) or None
        self.repo = clean(row.get('repo_root'), 400)
        self.blocker_class = clean(row.get('blocker_class'), 4) or None
        self.detail = row.get('detail') if isinstance(row.get('detail'), dict) else None
        self.members = []  # (role, Agent)
        self.search = ' '.join([self.plan, self.label, self.repo, self.current or '',
                                clean((self.detail or {}).get('title'), 200)]).lower()

    @property
    def needs_you(self):
        return self.cls == 'blocked' or self.situation in ('plan_blocked', 'plan_stalled', 'plan_no_lead',
                                                           'plan_lead_moved')

    @property
    def rank(self):
        """Plans that need the developer first, then running, then the rest."""
        if self.needs_you:
            return 0
        if self.cls == 'open':
            return 1
        return 2 if self.cls == 'completed' else 3


class Index(object):
    """Everything the views need, built once per map change: O(agents + plans)."""

    def __init__(self, fleet):
        self.agents, self.plans, self.machines = [], [], []
        self.queue_pos = {}    # machine/plan -> (position, length, state) in its repository's queue
        self.generated_at = parse_ts((fleet or {}).get('generated_at'))
        self.daemon = (fleet or {}).get('daemon') if isinstance((fleet or {}).get('daemon'), dict) else {}
        by_key = {}
        daemon = (fleet or {}).get('daemon') if isinstance((fleet or {}).get('daemon'), dict) else {}
        mirror = daemon.get('local_is') if isinstance(daemon.get('local_is'), str) else None
        labels = dict((m.get('machine'), m.get('label')) for m in (fleet or {}).get('machines') or []
                      if isinstance(m, dict))
        for m in (fleet or {}).get('machines') or []:
            if not isinstance(m, dict):
                continue
            machine = clean(m.get('machine'), 64) or '?'
            if mirror and machine == mirror:
                continue  # the daemon's own machine, saved under its id: it is `local` already
            default = clean(labels.get(mirror), 80) if mirror else ''
            label = clean(m.get('label'), 80) or (
                (default or 'daemon host') if machine == 'local' else machine[:12])
            agents = [Agent(machine, label, a) for a in m.get('agents') or [] if isinstance(a, dict)]
            plans = [Plan(machine, label, p) for p in m.get('plans') or [] if isinstance(p, dict)]
            queues = []
            for q in m.get('queues') or []:
                if not isinstance(q, dict):
                    continue
                items = [{'plan': clean(it.get('plan'), 128), 'state': clean(it.get('state'), 12),
                          'after': clean(it.get('after'), 128) or None, 'lead': clean(it.get('lead'), 120) or None,
                          'ready': it.get('ready') is True, 'blocked': clean(it.get('blocked_reason'), 120) or None}
                         for it in q.get('items') or [] if isinstance(it, dict)]
                queues.append({'repo': clean(q.get('repo_root'), 400), 'parallel': q.get('parallel') is True,
                               'invalid': q.get('invalid') is True, 'items': items})
            self.machines.append({'machine': machine, 'label': label,
                                  'agents_state': clean(m.get('agents_state'), 20),
                                  'plans_state': clean(m.get('plans_state'), 20),
                                  'agents': agents, 'plans': plans, 'queues': queues})
            for q in queues:
                for n, it in enumerate(q['items']):
                    self.queue_pos['%s/%s' % (machine, it['plan'])] = (n + 1, len(q['items']), it['state'])
            self.agents.extend(agents)
            self.plans.extend(plans)
            for a in agents:
                by_key[a.key] = a
            local = dict(('%s/%s' % (machine, p.plan), p) for p in plans)
            for a in agents:
                for plan_id, role in a.roles:
                    plan = local.get('%s/%s' % (machine, plan_id))
                    if plan is not None:
                        plan.members.append((role, a))
        order = {'lead': 0, 'lane': 1, 'successor': 2}
        for plan in self.plans:
            plan.members.sort(key=lambda m: (order.get(m[0], 3), m[1].key))
        self.by_key = by_key
        self.plan_by_key = dict((p.key, p) for p in self.plans)

    def counts(self):
        out = dict((s, 0) for s in STATE_ORDER)
        for a in self.agents:
            out[a.state] = out.get(a.state, 0) + 1
        plans = {'open': 0, 'needs_you': 0, 'completed': 0}
        for p in self.plans:
            if p.needs_you:
                plans['needs_you'] += 1
            elif p.cls == 'open':
                plans['open'] += 1
            elif p.cls == 'completed':
                plans['completed'] += 1
        answering = sum(1 for m in self.machines if m['agents_state'] == 'ok')
        return out, plans, answering


class Group(object):
    __slots__ = ('key', 'kind', 'title', 'subtitle', 'plan', 'members', 'tone', 'queue_pos')

    def __init__(self, key, kind, title, subtitle='', plan=None, members=None, tone='normal'):
        self.key, self.kind, self.title, self.subtitle = key, kind, title, subtitle
        self.plan, self.members, self.tone = plan, members or [], tone
        self.queue_pos = None


def _matches(text, needle):
    return not needle or needle in text


def build_view(index, grouping='plan', needle=''):
    """The groups shown for a grouping and a filter. Pure."""
    needle = (needle or '').strip().lower()
    groups = []
    if grouping == 'plan':
        in_plan = set()
        plans = sorted(index.plans, key=lambda p: (p.rank, p.label, p.plan))
        for plan in plans:
            members = [(r, a) for r, a in plan.members if _matches(a.search, needle)]
            if needle and not members and not _matches(plan.search, needle):
                continue
            if plan.cls == 'completed' and not members and not needle:
                continue  # a finished plan with nobody on it is history, not the fleet
            for _, a in plan.members:
                in_plan.add(a.key)
            tone = 'bad' if plan.needs_you else ('dim' if plan.cls == 'completed' else 'normal')
            group = Group(plan.key, 'plan', plan.plan, plan.label, plan, members, tone)
            group.queue_pos = index.queue_pos.get(plan.key)
            groups.append(group)
        busy = [('', a) for a in index.agents if a.key not in in_plan and a.state != 'idle'
                and _matches(a.search, needle)]
        idle = [('', a) for a in index.agents if a.key not in in_plan and a.state == 'idle'
                and _matches(a.search, needle)]
        if busy:
            groups.append(Group('busy', 'busy', 'Working outside any plan', '', None,
                                sorted(busy, key=lambda m: m[1].key)))
        if idle:
            groups.append(Group('idle', 'idle', 'Doing nothing — free to take work', '', None,
                                sorted(idle, key=lambda m: m[1].key), 'free'))
    elif grouping == 'queue':
        for m in index.machines:
            for q in m.get('queues') or []:
                if needle and not any(needle in it['plan'].lower() for it in q['items']) \
                        and needle not in (q['repo'] + ' ' + m['label']).lower():
                    continue
                name = os.path.basename(q['repo'].rstrip('/')) or '(repository)'
                sub = '%s · %s%s' % (m['label'], 'parallel' if q['parallel'] else 'one at a time',
                                      ' · INVALID queue file' if q['invalid'] else '')
                g = Group('queue:%s:%s' % (m['machine'], q['repo']), 'queue', name, sub, None, [],
                          'bad' if q['invalid'] else 'normal')
                g.plan = (m['machine'], q['items'])
                groups.append(g)
    elif grouping == 'repo':
        repos = {}
        for a in index.agents:
            if _matches(a.search, needle):
                repos.setdefault(a.repo or '', []).append(('', a))
        for repo in sorted(repos, key=lambda r: (r == '', os.path.basename(r).lower(), r)):
            members = sorted(repos[repo], key=lambda m: (STATE_ORDER.index(m[1].state), m[1].key))
            name = os.path.basename(repo.rstrip('/')) if repo else '(no repository)'
            machines = sorted(set(a.label for _, a in members))
            groups.append(Group('repo:' + repo, 'repo', name,
                                '%s · %s' % (repo or 'outside git', ', '.join(machines[:3])
                                             + (' +%d' % (len(machines) - 3) if len(machines) > 3 else '')),
                                None, members))
    else:
        for m in index.machines:
            members = [('', a) for a in m['agents'] if _matches(a.search, needle)]
            if needle and not members:
                continue
            sub = 'unreachable' if m['agents_state'] != 'ok' else '%d agents' % len(m['agents'])
            tone = 'dim' if m['agents_state'] != 'ok' else 'normal'
            groups.append(Group('machine:' + m['machine'], 'machine', m['label'], sub, None,
                                sorted(members, key=lambda x: (STATE_ORDER.index(x[1].state), x[1].key)),
                                tone))
    return groups


# ======================================================================= view

class Line(object):
    """One screen row: styled segments, and what selecting it opens."""
    __slots__ = ('segs', 'target')

    def __init__(self, segs=None, target=None):
        self.segs, self.target = segs or [], target

    def add(self, text, style='normal'):
        if text:
            self.segs.append((text, style))
        return self

    def text(self):
        return ''.join(t for t, _ in self.segs)


def bar(done, total, cells):
    """A progress bar of `cells` cells."""
    if not total or done is None or cells <= 0:
        return ''
    full = int(round(cells * min(done, total) / float(total)))
    return '█' * full + '░' * (cells - full)


def fit_line(line, width):
    """Cut a line's segments to `width` cells and pad it to exactly `width`."""
    out, used = [], 0
    for text, style in line.segs:
        room = width - used
        if room <= 0:
            break
        piece = fit(text, room)
        out.append((piece, style))
        used += width_of(piece)
    if used < width:
        out.append((' ' * (width - used), 'normal'))
    return Line(out, line.target)


def agent_cells(a, now, width, role=''):
    """The row of one agent."""
    line = Line(target=('agent', a.key))
    line.add('  ')
    line.add(ROLE_MARK.get(role, ' ') + ' ', 'accent' if role == 'lead' else 'dim')
    line.add(a.mark + ' ', a.state)
    line.add(pad(a.kind, 7), 'kind')
    line.add(pad(a.raw_state + (' ' + duration(now - a.since) if a.since else ''), 13), a.state)
    line.add(pad(a.pane, 9), 'dim')
    rest = width - 36
    if rest > 20:
        where = os.path.basename(a.repo) if a.repo else (a.cwd or '-')
        if a.branch:
            where += ' @' + a.branch
        line.add(pad(where, min(34, rest // 2) - 1) + ' ', 'repo')
        line.add(pad(a.label, min(22, max(1, rest // 4)) - 1) + ' ', 'dim')
        line.add(a.title, 'title')
    return line


def group_header(g, width):
    line = Line(target=('plan', g.key) if g.kind == 'plan' else ('group', g.key))
    if g.kind == 'plan':
        p = g.plan
        badge = SITUATIONS.get(p.situation) or ('BLOCKED' if p.cls == 'blocked' else p.cls.upper())
        tone = 'bad' if p.needs_you else ('ok' if p.cls == 'open' else 'dim')
        line.add('▌', tone).add(' %s ' % badge, tone + '_badge').add(' ')
        title = clean((p.detail or {}).get('title'), 120)
        right = []
        if p.total:
            pct = int(100 * (p.done or 0) / float(p.total))
            right.append(('%s %d/%d %3d%% ' % (bar(p.done, p.total, 12), p.done or 0, p.total, pct),
                          'ok' if p.done == p.total else 'accent'))
        if getattr(g, 'queue_pos', None):
            right.append(('  queue %d/%d' % g.queue_pos[:2], 'dim'))
        right.append(('  ' + fit(p.label, 24) + ' ', 'dim'))
        room = width - sum(width_of(t) for t, _ in line.segs) - sum(width_of(t) for t, _ in right) - 1
        name = fit(p.plan, max(8, room))
        line.add(name, 'group_title')
        room -= width_of(name)
        if title and room > 8:
            line.add(fit('  ' + title, room), 'dim')
            room -= width_of(fit('  ' + title, room))
        if room > 0:
            line.add(' ' * room)
        line.add(' ')
        for text, style in right:
            line.add(text, style)
    else:
        mark = {'idle': '○', 'busy': '●', 'repo': '▤', 'machine': '▣', 'queue': '☰'}.get(g.kind, '▸')
        line.add('▌', 'free' if g.tone == 'free' else 'accent')
        line.add(' %s %s ' % (mark, g.title), 'group_title')
        line.add('(%d)' % (len(g.plan[1]) if g.kind == 'queue' else len(g.members)), 'dim')
        if g.subtitle:
            line.add('  ' + g.subtitle, 'dim')
    return line


def render_list(groups, now, width):
    """Every line of the main list: group headers, the current task of a
    plan, and its agents. Pure; built once per change, drawn by window."""
    lines = []
    for g in groups:
        lines.append(group_header(g, width))
        if g.kind == 'plan':
            p = g.plan
            if p.current and p.cls != 'completed':
                lines.append(Line(target=('plan', g.key)).add('    ▶ now: ', 'accent').add(p.current, 'title'))
            block = (p.detail or {}).get('blocker') if p.detail else None
            if isinstance(block, dict) and (block.get('needs') or block.get('reason')):
                lines.append(Line(target=('plan', g.key)).add('    ■ needs: ', 'bad').add(
                    clean(block.get('needs') or block.get('reason'), 200), 'bad'))
            if not g.members:
                lines.append(Line(target=('plan', g.key)).add('    nobody on the map works on this plan', 'dim'))
        if g.kind == 'queue':
            machine, items = g.plan
            for n, it in enumerate(items):
                mark, style = QUEUE_MARK.get(it['state'], ('?', 'dim'))
                line = Line(target=('plan', '%s/%s' % (machine, it['plan'])))
                line.add('    %2d. ' % (n + 1), 'dim').add(mark + ' ', style).add(pad(it['plan'], 44), 'group_title')
                line.add(pad(it['state'], 9), style)
                if it['ready']:
                    line.add('ready — starts next', 'ok')
                elif it['blocked'] and it['state'] == 'queued':
                    waiting = it['blocked'].startswith('waiting') or it['blocked'].startswith('another plan')
                    line.add(it['blocked'], 'dim' if waiting else 'bad')
                if it['lead']:
                    line.add('  lead ' + it['lead'], 'dim')
                lines.append(line)
        for role, a in g.members:
            lines.append(agent_cells(a, now, width, role))
        lines.append(Line())
    return [fit_line(l, width) for l in lines]


def render_header(index, age, grouping, needle, width, error=None):
    """The two header rows and the tab row."""
    counts, plans, answering = index.counts() if index else ({}, {}, 0)
    stale = age is not None and age > STALE_AFTER
    tone = 'bad' if stale or age is None else ('warn' if age > AGING_AFTER else 'ok')
    top = Line().add(' ◉ herdr-peers fleet ', 'brand')
    top.add('  updated ', 'dim').add(age_phrase(age), tone)
    if stale:
        top.add('  STALE — no autopilot loop is syncing this machine', 'bad')
    if error:
        top.add('  ' + error, 'bad')
    if index:
        total = len(index.agents)
        machines = len(index.machines)
        right = '%d agent%s · %d machine%s (%d answering) ' % (
            total, '' if total == 1 else 's', machines, '' if machines == 1 else 's', answering)
        used = sum(width_of(t) for t, _ in top.segs)
        if used + width_of(right) < width:
            top.add(' ' * (width - used - width_of(right))).add(right, 'dim')
    second = Line().add(' ')
    for state, label in (('working', 'working'), ('waiting', 'waiting'), ('idle', 'idle'),
                         ('unknown', 'unknown')):
        n = counts.get(state, 0)
        mark = {'working': '●', 'waiting': '◆', 'idle': '○', 'unknown': '?'}[state]
        second.add('%s %d %s   ' % (mark, n, label), state if n else 'dim')
    brain = ((index.daemon or {}).get('brain') if index else None)
    if isinstance(brain, dict):
        bstate = clean(brain.get('state'), 12)
        second.add('│ brain ', 'dim').add('◎ ', 'working' if bstate == 'ready' else 'warn')
        second.add('%s %s %s' % (clean(brain.get('kind'), 12) or '-', clean(brain.get('profile'), 24) or '',
                                 bstate), 'accent')
        last = brain.get('last') if isinstance(brain.get('last'), dict) else None
        if isinstance(brain.get('asked_last_hour'), int):
            second.add(' · %d asked/h' % brain['asked_last_hour'], 'dim')
        if last:
            second.add(' · last: %s %s' % (clean(last.get('action'), 24), clean(last.get('plan'), 40)), 'dim')
        second.add('   ')
    second.add('│ plans: ', 'dim')
    second.add('%d need you' % plans.get('needs_you', 0), 'bad' if plans.get('needs_you') else 'dim')
    second.add(' · %d running · %d done' % (plans.get('open', 0), plans.get('completed', 0)), 'dim')
    tabs = Line().add(' ')
    for key, label in (('plan', 'Plans'), ('repo', 'Repos'), ('machine', 'Machines'), ('queue', 'Queues')):
        style = 'tab_on' if key == grouping else 'tab'
        tabs.add(' %s %s ' % ({'queue': 'u'}.get(key, label[0].lower()), label), style).add(' ')
    if needle:
        tabs.add('   filter: ', 'dim').add(needle, 'accent')
    return [fit_line(l, width) for l in (top, second, tabs)]


def render_plan(plan, now, width):
    """The plan view: everything about one plan, so nobody has to ask its agents."""
    d = plan.detail or {}
    out = []
    head = Line().add(' ' + plan.plan + ' ', 'group_title')
    badge = SITUATIONS.get(plan.situation) or ('BLOCKED' if plan.cls == 'blocked' else plan.cls.upper())
    head.add(' %s ' % badge, ('bad' if plan.needs_you else 'ok') + '_badge')
    out.append(head)
    title = clean(d.get('title'), 200)
    if title:
        out.append(Line().add(' ' + title, 'title'))
    out.append(Line().add(' %s · %s · epoch %s' % (plan.label, plan.repo or '-', plan.epoch or '-'), 'dim'))
    out.append(Line())
    if plan.total:
        pct = int(100 * (plan.done or 0) / float(plan.total))
        out.append(Line().add(' Progress ', 'section').add(
            bar(plan.done, plan.total, max(10, min(40, width - 30))), 'accent').add(
            '  %d / %d tasks  %d%%' % (plan.done or 0, plan.total, pct), 'normal'))
    if plan.current:
        out.append(Line().add(' Now      ', 'section').add(plan.current, 'title'))
    block = d.get('blocker') if isinstance(d.get('blocker'), dict) else None
    if block:
        out.append(Line().add(' Blocked  ', 'bad').add(clean(block.get('reason'), 200), 'bad'))
        if block.get('needs'):
            out.append(Line().add('   needs  ', 'bad').add(clean(block.get('needs'), 200), 'bad'))
    out.append(Line())
    out.append(Line().add(' Group (%d)' % len(plan.members), 'section'))
    if not plan.members:
        out.append(Line().add('   nobody on the map works on this plan', 'dim'))
    for role, a in plan.members:
        out.append(agent_cells(a, now, width, role))
    summary = d.get('summary') if isinstance(d.get('summary'), list) else []
    if summary:
        out.append(Line())
        at = parse_ts(d.get('summary_at'))
        out.append(Line().add(' Summary', 'section').add(
            ('  from PROGRESS.md, written %s' % age_phrase(now - at)) if at else '  from PROGRESS.md', 'dim'))
        for text in summary:
            out.append(Line().add('   ' + clean(text, 300), 'normal'))
    tasks = d.get('tasks') if isinstance(d.get('tasks'), list) else []
    if tasks:
        out.append(Line())
        first = d.get('tasks_from') if isinstance(d.get('tasks_from'), int) else 0
        out.append(Line().add(' Tasks', 'section').add(
            ('  (%d–%d of %d)' % (first + 1, first + len(tasks), plan.total or len(tasks)))
            if first or (plan.total and plan.total > len(tasks)) else '', 'dim'))
        for t in tasks:
            if not isinstance(t, dict):
                continue
            mark, style = TASK_MARK.get(t.get('status'), TASK_MARK[None])
            out.append(Line().add('   %s ' % mark, style).add(pad(clean(t.get('id'), 24), 19) + ' ', 'dim').add(
                clean(t.get('title'), 200) or '', 'title' if t.get('status') == 'in_progress' else 'normal'))
    return [fit_line(l, width) for l in out]


def render_agent(a, index, now, width, screen=None, screen_note=None):
    """The agent view: who it is, where it works, its plans, its live screen."""
    out = [Line().add(' %s %s ' % (a.mark, a.key), a.state + '_badge').add('  ' + a.kind, 'kind'),
           Line().add(' ' + (a.title or '(no title)'), 'title'),
           Line()]
    rows = [('State', '%s%s' % (a.raw_state, (' for ' + duration(now - a.since)) if a.since else '')),
            ('Machine', a.label), ('Repository', a.repo or '-'), ('Branch', a.branch or '-'),
            ('Directory', a.cwd or '-')]
    for key, value in rows:
        out.append(Line().add(' %-11s' % key, 'section').add(value, 'normal'))
    if a.roles:
        out.append(Line())
        out.append(Line().add(' Plans', 'section'))
        for plan_id, role in a.roles:
            plan = index.plan_by_key.get('%s/%s' % (a.machine, plan_id)) if index else None
            line = Line(target=('plan', plan.key) if plan else None)
            line.add('   %s %-10s' % (ROLE_MARK.get(role, ' '), role), 'accent')
            line.add(plan_id, 'group_title')
            if plan and plan.total:
                line.add('  %s %d/%d' % (bar(plan.done, plan.total, 8), plan.done or 0, plan.total), 'accent')
            if plan and plan.current:
                line.add('  now: ' + plan.current, 'dim')
            out.append(line)
    out.append(Line())
    out.append(Line().add(' Screen', 'section').add('  ' + (screen_note or ''), 'dim'))
    for text in (screen or [])[-SCREEN_LINES:]:
        out.append(Line().add('   │ ', 'dim').add(clean(text, 400), 'screen'))
    return [fit_line(l, width) for l in out]


def footer(mode, width, focus_ok=False):
    keys = {'list': '↑↓ move  ⏎ open  p/r/m group  / filter  ? help  q quit',
            'plan': '↑↓ scroll  ⏎ agent  esc back  q quit',
            'agent': '↑↓ scroll  %s esc back  q quit' % ('f focus pane ' if focus_ok else ''),
            'help': 'esc back  q quit'}[mode]
    return fit_line(Line().add(' ' + keys, 'footer'), width)


HELP = [
    'herdr-peers fleet ui — every agent and plan, live',
    '',
    'The picture comes from the map the autopilot loop keeps (herdr-peers autopilot --loop).',
    'The header says how old it is; it redraws by itself whenever the map changes.',
    '',
    'p  group by plan: each plan with its lead (★), lanes (·) and successors (↳);',
    '   plans that need you first; agents working outside plans; agents doing nothing.',
    'r  group by repository     m  group by machine     u  each repository\'s plan queue',
    '/  filter (pane, plan, repository, branch, title, machine)   esc clears it',
    '⏎ or click  open a plan or an agent      f  focus that agent\'s pane (Herdr)',
    '↑↓ j k  move   PgUp PgDn  page   g G  top / bottom   q  quit',
    '',
    '● working   ◆ waiting at a question or approval   ○ idle   ? unknown',
    'Plan badges: BLOCKED, STALLED, NO LEAD need you; OPEN is running; DONE is finished.',
]


def render_help(width):
    return [fit_line(Line().add(' ' + text, 'section' if i == 0 else 'normal'), width)
            for i, text in enumerate(HELP)]


# ======================================================================= herdr

class HerdrLink(object):
    """The two Herdr calls the watcher makes, with fixed argv. An agent's
    address on the map is resolved to something this machine's Herdr can
    reach: `local` entries only when this is the daemon's own server (else
    the daemon's saved-machine id), saved-machine ids only when this
    machine's own catalog lists them."""

    def __init__(self, fleet, run=subprocess.run, environ=os.environ):
        self.run = run
        self.ok = environ.get('HERDR_ENV') == '1'
        self.daemon = (fleet or {}).get('daemon') if isinstance((fleet or {}).get('daemon'), dict) else {}
        self.here = environ.get('HERDR_PEERS_UI_SERVER')  # set by the helper: this server's key
        self.known = None

    def catalog(self):
        if self.known is None:
            self.known = set()
            if self.ok:
                try:
                    proc = self.run(['herdr', 'machine', 'list', '--json'], stdout=subprocess.PIPE,
                                    stderr=subprocess.DEVNULL, timeout=8)
                    data = json.loads(proc.stdout.decode('utf-8')) if proc.returncode == 0 else []
                    self.known = set(m['id'] for m in data if isinstance(m, dict)
                                     and m.get('enabled') is True and isinstance(m.get('id'), str)
                                     and re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]{0,63}', m['id']))
                except (OSError, ValueError, subprocess.SubprocessError):
                    self.known = set()
        return self.known

    def target(self, machine):
        """['--machine', id], [] for this server, or None when unreachable from here."""
        if not self.ok:
            return None
        if machine == 'local':
            if self.here and self.daemon.get('server') == self.here:
                return []
            machine = self.daemon.get('local_is')
            if not isinstance(machine, str):
                return None
        if machine in self.catalog():
            return ['--machine', machine]
        return None

    def read(self, machine, pane):
        via = self.target(machine)
        if via is None or not re.fullmatch(r'[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}', pane or ''):
            return None
        try:
            proc = self.run(['herdr'] + via + ['pane', 'read', pane, '--source', 'recent',
                                               '--lines', str(SCREEN_LINES)],
                            stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, timeout=8)
        except (OSError, subprocess.SubprocessError):
            return None
        if proc.returncode != 0:
            return None
        return [clean(l, 400) for l in proc.stdout.decode('utf-8', 'replace').splitlines()][-SCREEN_LINES:]

    def focus(self, machine, pane):
        via = self.target(machine)
        if via is None or not re.fullmatch(r'[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}', pane or ''):
            return False
        try:
            return self.run(['herdr'] + via + ['agent', 'focus', pane], stdout=subprocess.DEVNULL,
                            stderr=subprocess.DEVNULL, timeout=8).returncode == 0
        except (OSError, subprocess.SubprocessError):
            return False


# ======================================================================= app

class App(object):
    """The watcher. Drives a Term: `size()`, `draw(y, line)`, `flush()`,
    `read_key(timeout) -> str | None`, `last_mouse() -> (x, y) | None`."""

    def __init__(self, term, source, link_factory=HerdrLink, clock=time.time, grouping='plan'):
        self.term, self.source, self.clock = term, source, clock
        self.link_factory = link_factory
        self.link = None
        self.grouping = grouping if grouping in GROUPINGS else 'plan'
        self.needle, self.typing = '', False
        self.mode = 'list'            # list, plan, agent, help
        self.stack = []               # previous (mode, target, scroll)
        self.target = None            # ('plan', key) / ('agent', key) in a detail mode
        self.index = None
        self.groups = []
        self.lines = []
        self.sel = 0                  # index into self.lines (list mode)
        self.sel_target = None        # what is selected, kept across map changes
        self.scroll = 0
        self.dirty = True
        self.width = self.height = 0
        self.screen, self.screen_at, self.screen_note = None, 0.0, ''
        self.message = ''
        self.running = True

    # -- data --------------------------------------------------------------
    def refresh_data(self):
        if self.source.poll() or self.index is None:
            self.index = Index(self.source.fleet) if self.source.fleet else None
            self.link = self.link_factory(self.source.fleet) if self.source.fleet else None
            self.dirty = True

    def rebuild(self, now):
        width = self.width
        if self.mode == 'list':
            self.groups = build_view(self.index, self.grouping, self.needle) if self.index else []
            self.lines = render_list(self.groups, now, width)
            if not self.lines:
                note = ('no agent matches "%s"' % self.needle) if self.needle else (
                    'no map on this machine yet — start `herdr-peers autopilot --loop`'
                    if self.index is None else 'the map lists no agent')
                self.lines = [fit_line(Line().add('  ' + note, 'dim'), width)]
            self.place_selection()
        elif self.mode == 'plan':
            plan = self.index.plan_by_key.get(self.target[1]) if self.index else None
            self.lines = render_plan(plan, now, width) if plan else [
                fit_line(Line().add('  this plan is no longer on the map', 'dim'), width)]
        elif self.mode == 'agent':
            agent = self.index.by_key.get(self.target[1]) if self.index else None
            self.lines = render_agent(agent, self.index, now, width, self.screen, self.screen_note) \
                if agent else [fit_line(Line().add('  this agent is no longer on the map', 'dim'), width)]
        else:
            self.lines = render_help(width)

    def place_selection(self):
        """Keep the selection on the same plan or agent when the list changes."""
        selectable = [i for i, l in enumerate(self.lines) if l.target]
        if not selectable:
            self.sel = 0
            return
        if self.sel_target is not None:
            for i in selectable:
                if self.lines[i].target == self.sel_target:
                    self.sel = i
                    return
        self.sel = min(selectable, key=lambda i: abs(i - self.sel))
        self.sel_target = self.lines[self.sel].target

    # -- drawing -----------------------------------------------------------
    def body_rows(self):
        return max(1, self.height - 5)

    def draw(self, now):
        w, h = self.term.size()
        if (w, h) != (self.width, self.height):
            self.width, self.height, self.dirty = w, h, True
        if w < MIN_W or h < MIN_H:
            self.term.clear()
            self.term.draw(0, fit_line(Line().add(' terminal too small for the fleet view '
                                                  '(%dx%d, needs %dx%d)' % (w, h, MIN_W, MIN_H), 'warn'), w))
            self.term.flush()
            return
        age = self.source.age(now)
        header = render_header(self.index, age, self.grouping,
                               self.needle + ('▏' if self.typing else ''), w, self.source.error)
        for y, line in enumerate(header):
            self.term.draw(y, line)
        if self.dirty:
            self.rebuild(now)
            self.dirty = False
            self.term.draw(3, fit_line(Line().add('─' * w, 'rule'), w))
            rows = self.body_rows()
            if self.mode == 'list':
                if self.sel < self.scroll:
                    self.scroll = self.sel
                elif self.sel >= self.scroll + rows:
                    self.scroll = self.sel - rows + 1
            self.scroll = max(0, min(self.scroll, max(0, len(self.lines) - rows)))
            for i in range(rows):
                at = self.scroll + i
                line = self.lines[at] if at < len(self.lines) else fit_line(Line(), w)
                if self.mode == 'list' and at == self.sel and line.target:
                    line = Line([(t, 'selected') for t, _ in line.segs], line.target)
                self.term.draw(4 + i, line)
            more = len(self.lines) - self.scroll - rows
            status = Line().add(' ' + (self.message or ''), 'warn')
            if more > 0:
                status.add('   ▼ %d more' % more, 'dim')
            self.term.draw(h - 1, footer(self.mode, w, self.mode == 'agent' and self.focus_target() is not None)
                           if not self.message else fit_line(status, w))
        self.term.flush()

    # -- input -------------------------------------------------------------
    def selectable(self):
        return [i for i, l in enumerate(self.lines) if l.target]

    def move(self, step):
        sel = self.selectable()
        if self.mode != 'list':
            self.scroll = max(0, min(self.scroll + step, max(0, len(self.lines) - self.body_rows())))
        elif sel:
            # Rows that open the same thing (a plan's header and its "now" line)
            # are one stop: each step moves to the next different target.
            stops, seen = [], set()
            for i in sel:
                if self.lines[i].target not in seen:
                    seen.add(self.lines[i].target)
                    stops.append(i)
            current = self.lines[self.sel].target if self.sel < len(self.lines) else None
            here = next((n for n, i in enumerate(stops) if self.lines[i].target == current), 0)
            self.sel = stops[max(0, min(len(stops) - 1, here + step))]
            self.sel_target = self.lines[self.sel].target
        self.dirty = True

    def open(self, target):
        if not target or target[0] not in ('plan', 'agent'):
            return
        self.stack.append((self.mode, self.target, self.scroll))
        self.mode, self.target, self.scroll = target[0], target, 0
        self.screen, self.screen_at, self.screen_note = None, 0.0, ''
        self.dirty = True

    def back(self):
        if self.stack:
            self.mode, self.target, self.scroll = self.stack.pop()
        else:
            self.mode, self.target = 'list', None
        self.dirty = True

    def focus_target(self):
        if self.mode != 'agent' or not self.index or not self.link:
            return None
        agent = self.index.by_key.get(self.target[1])
        if agent is None or self.link.target(agent.machine) is None:
            return None
        return agent

    def on_key(self, key, now):
        self.message = ''
        if self.typing:
            if key in ('enter', 'esc'):
                self.typing = False
                if key == 'esc':
                    self.needle = ''
            elif key == 'backspace':
                self.needle = self.needle[:-1]
            elif key and len(key) == 1 and key.isprintable():
                self.needle = (self.needle + key)[:60]
            self.sel_target = None
            self.dirty = True
            return
        if key in ('q', 'Q'):
            self.running = False
        elif key in ('up', 'k'):
            self.move(-1)
        elif key in ('down', 'j'):
            self.move(1)
        elif key == 'pgup':
            self.move(-self.body_rows())
        elif key == 'pgdn':
            self.move(self.body_rows())
        elif key == 'g':
            self.move(-10 ** 6)
        elif key == 'G':
            self.move(10 ** 6)
        elif key in ('p', 'r', 'm', 'u') and self.mode == 'list':
            self.grouping = {'p': 'plan', 'r': 'repo', 'm': 'machine', 'u': 'queue'}[key]
            self.sel_target, self.sel, self.scroll, self.dirty = None, 0, 0, True
        elif key == '/' and self.mode == 'list':
            self.typing, self.dirty = True, True
        elif key == '?' and self.mode != 'help':
            self.stack.append((self.mode, self.target, self.scroll))
            self.mode, self.scroll, self.dirty = 'help', 0, True
        elif key == 'esc':
            if self.mode == 'list' and self.needle:
                self.needle, self.dirty = '', True
            elif self.mode != 'list':
                self.back()
        elif key == 'enter':
            if self.mode == 'list' and self.lines and self.sel < len(self.lines):
                self.open(self.lines[self.sel].target)
            elif self.mode == 'plan':
                plan = self.index.plan_by_key.get(self.target[1]) if self.index else None
                if plan and plan.members:
                    self.open(('agent', plan.members[0][1].key))
        elif key == 'f' and self.mode == 'agent':
            agent = self.focus_target()
            if agent is None:
                self.message = 'that pane cannot be reached from this machine'
            elif self.link.focus(agent.machine, agent.pane):
                self.message = 'focused %s' % agent.key
            else:
                self.message = 'Herdr could not focus %s' % agent.key
            self.dirty = True
        elif key == 'mouse':
            self.on_mouse(self.term.last_mouse())
        elif key == 'resize':
            self.dirty = True

    def on_mouse(self, event):
        if not event:
            return
        x, y, kind = event
        row = y - 4
        if row < 0 or row >= self.body_rows():
            return
        at = self.scroll + row
        if at >= len(self.lines):
            return
        target = self.lines[at].target
        if kind == 'wheel_up':
            self.move(-3)
        elif kind == 'wheel_down':
            self.move(3)
        elif self.mode == 'list' and target:
            if at == self.sel and kind == 'click':
                self.open(target)          # a click on the selected row opens it
            else:
                self.sel, self.sel_target = at, target
                if kind == 'double':
                    self.open(target)
            self.dirty = True
        elif target and kind in ('click', 'double'):
            self.open(target)

    # -- the live screen -----------------------------------------------------
    def poll_screen(self, now):
        if self.mode != 'agent' or not self.index or not self.link:
            return
        if now - self.screen_at < SCREEN_EVERY:
            return
        self.screen_at = now
        agent = self.index.by_key.get(self.target[1])
        if agent is None:
            return
        lines = self.link.read(agent.machine, agent.pane)
        if lines is None:
            self.screen, self.screen_note = None, 'not readable from this machine'
        else:
            self.screen, self.screen_note = lines, 'live · every %ds' % SCREEN_EVERY
        self.dirty = True

    def run(self):
        last_tick = 0.0
        while self.running:
            now = self.clock()
            self.refresh_data()
            self.poll_screen(now)
            if self.dirty or now - last_tick >= TICK:
                self.draw(now)
                last_tick = now
            key = self.term.read_key(TICK)
            if key is not None:
                self.on_key(key, self.clock())
        return 0


# =================================================================== terminals

STYLE_COLORS = {
    # style: (fg, bg, attrs) with 256-colour indexes; 8-colour fallbacks below
    'brand': (231, 25, 'bold'), 'dim': (245, -1, ''), 'normal': (252, -1, ''),
    'title': (230, -1, ''), 'kind': (147, -1, ''), 'repo': (116, -1, ''), 'screen': (250, -1, ''),
    'working': (82, -1, 'bold'), 'waiting': (214, -1, 'bold'), 'idle': (110, -1, ''),
    'unknown': (244, -1, ''), 'ok': (78, -1, 'bold'), 'warn': (214, -1, 'bold'),
    'bad': (203, -1, 'bold'), 'accent': (81, -1, ''), 'free': (110, -1, 'bold'),
    'group_title': (231, -1, 'bold'), 'section': (81, -1, 'bold'), 'rule': (238, -1, ''),
    'tab': (250, 236, ''), 'tab_on': (16, 81, 'bold'), 'footer': (250, 235, ''),
    'selected': (16, 153, 'bold'),
    'ok_badge': (16, 78, 'bold'), 'bad_badge': (231, 160, 'bold'), 'dim_badge': (16, 245, ''),
    'working_badge': (16, 82, 'bold'), 'waiting_badge': (16, 214, 'bold'),
    'idle_badge': (16, 110, 'bold'), 'unknown_badge': (16, 244, 'bold'),
}
FALLBACK = {16: 0, 231: 7, 25: 4, 245: 7, 252: 7, 230: 7, 147: 5, 116: 6, 250: 7, 82: 2, 214: 3,
            110: 4, 244: 7, 78: 2, 203: 1, 81: 6, 238: 7, 236: 0, 235: 0, 153: 6, 160: 1}


class CursesTerm(object):
    """The real terminal."""

    def __init__(self, curses, stdscr, environ=os.environ):
        self.c, self.scr = curses, stdscr
        self.styles = {}
        self.mouse = None
        stdscr.keypad(True)
        try:
            curses.curs_set(0)
        except curses.error:
            pass
        colour = curses.has_colors() and not environ.get('NO_COLOR')
        if colour:
            curses.start_color()
            try:
                curses.use_default_colors()
                default_bg = -1
            except curses.error:
                default_bg = 0
            many = curses.COLORS >= 256
            pair = 1
            for name, (fg, bg, attrs) in STYLE_COLORS.items():
                if not many:
                    fg = FALLBACK.get(fg, 7)
                    bg = FALLBACK.get(bg, default_bg) if bg != -1 else default_bg
                elif bg == -1:
                    bg = default_bg
                try:
                    curses.init_pair(pair, fg, bg)
                    attr = curses.color_pair(pair)
                except curses.error:
                    attr = 0
                if 'bold' in attrs:
                    attr |= curses.A_BOLD
                self.styles[name] = attr
                pair += 1
        else:
            plain = {'selected': curses.A_REVERSE, 'tab_on': curses.A_REVERSE,
                     'bad': curses.A_BOLD, 'warn': curses.A_BOLD, 'group_title': curses.A_BOLD,
                     'section': curses.A_BOLD, 'brand': curses.A_REVERSE, 'dim': curses.A_DIM}
            for name in STYLE_COLORS:
                self.styles[name] = plain.get(name, curses.A_REVERSE if name.endswith('_badge') else 0)
        try:
            curses.mousemask(curses.ALL_MOUSE_EVENTS | curses.REPORT_MOUSE_POSITION)
            curses.mouseinterval(0)
        except curses.error:
            pass

    def size(self):
        h, w = self.scr.getmaxyx()
        return w, h

    def clear(self):
        self.scr.erase()

    def draw(self, y, line):
        w, h = self.size()
        if y >= h:
            return
        x = 0
        for text, style in line.segs:
            if x >= w:
                break
            room = w - x - (1 if y == h - 1 else 0)  # the last cell of the screen cannot be written
            piece = fit(text, room)
            try:
                self.scr.addstr(y, x, piece, self.styles.get(style, 0))
            except self.c.error:
                pass
            x += width_of(piece)

    def flush(self):
        self.scr.noutrefresh()
        self.c.doupdate()

    def read_key(self, timeout):
        self.scr.timeout(int(timeout * 1000))
        try:
            ch = self.scr.get_wch()
        except self.c.error:
            return None
        c = self.c
        if isinstance(ch, str):
            return {'\n': 'enter', '\r': 'enter', '\x1b': 'esc', '\x7f': 'backspace',
                    '\x08': 'backspace', '\t': 'tab'}.get(ch, ch)
        names = {c.KEY_UP: 'up', c.KEY_DOWN: 'down', c.KEY_PPAGE: 'pgup', c.KEY_NPAGE: 'pgdn',
                 c.KEY_ENTER: 'enter', c.KEY_BACKSPACE: 'backspace', c.KEY_RESIZE: 'resize',
                 c.KEY_HOME: 'g', c.KEY_END: 'G'}
        if ch == c.KEY_MOUSE:
            try:
                _id, x, y, _z, state = c.getmouse()
            except c.error:
                return None
            kind = 'move'
            if state & (c.BUTTON1_CLICKED | c.BUTTON1_PRESSED | c.BUTTON1_RELEASED):
                kind = 'click'
            if state & c.BUTTON1_DOUBLE_CLICKED:
                kind = 'double'
            if state & getattr(c, 'BUTTON4_PRESSED', 0):
                kind = 'wheel_up'
            if state & getattr(c, 'BUTTON5_PRESSED', 0):
                kind = 'wheel_down'
            self.mouse = (x, y, kind)
            return 'mouse' if kind != 'move' else None
        return names.get(ch)

    def last_mouse(self):
        return self.mouse


def snapshot(source, now, width=100, grouping='plan'):
    """The fleet view as plain text, once: for agents, pipes and checks."""
    source.poll()
    index = Index(source.fleet) if source.fleet else None
    out = [l.text().rstrip() for l in render_header(index, source.age(now), grouping, '', width,
                                                     source.error)]
    out.append('─' * width)
    if index is None:
        out.append('  no map on this machine yet — start `herdr-peers autopilot --loop`')
    else:
        out.extend(l.text().rstrip() for l in render_list(build_view(index, grouping), now, width))
        for plan in sorted(index.plans, key=lambda p: (p.rank, p.plan)):
            if plan.cls in ('open', 'blocked'):
                out.append('')
                out.extend(l.text().rstrip() for l in render_plan(plan, now, width))
    return '\n'.join(out).rstrip() + '\n'


def run_curses(path, grouping='plan'):
    """Start the live watcher in this terminal."""
    import curses

    def main(stdscr):
        os.environ.setdefault('ESCDELAY', '25')
        app = App(CursesTerm(curses, stdscr), FileSource(path), grouping=grouping)
        return app.run()

    os.environ.setdefault('ESCDELAY', '25')
    return curses.wrapper(main)
