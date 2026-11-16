"""herdr-peers autopilot — answer every waiting agent (stdlib only).

A human starts it once. It watches every agent on every enabled Herdr
machine and, when one waits at a question, an approval or a first-run
screen, accepts the option that lets it go on. An agent that ended its turn
asking in prose is told to continue. See ../orchestra.md §8.

Two layers:

  decide()   pure: (agent kind, Herdr state, visible screen) -> Decision.
             No I/O. Everything it knows about a screen is in this file.
  Autopilot  the loop: list agents, read a screen only when needed, key,
             re-read to confirm, record.

A screen is text written by an agent: it is matched against anchored
patterns and never executed, echoed or logged. The log carries the class,
the name of what matched, the option index and the keys.
"""
from __future__ import annotations

import hashlib
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor

SCHEMA = 'herdr-peers/autopilot-v1'
DEFAULT_INTERVAL = 60
MIN_INTERVAL = 15
MAX_STEPS = 8            # keys-then-reread rounds on one pane in one pass
MAX_ATTEMPTS = 2         # rounds without progress before a screen is left
MAX_LIMIT_RETRIES = 48   # tries on one usage-limit episode (a day), then it is left
MAX_NUDGES = 3           # prompts to one pane within NUDGE_WINDOW
NUDGE_WINDOW = 3600      # seconds; a pane that keeps asking is left after MAX_NUDGES
LIMIT_RETRY = 1800       # seconds between two tries on a pane at its usage limit
CONFIRM_DELAY = 1.5      # seconds between keys and the confirming re-read
TAIL = 40                # screen lines a decision looks at
DESCRIPTION_MAX = 12     # lines an option's description may take before the next row
BACKOFF_MAX = 8          # passes an unreachable machine is skipped, at most
PLAN_REFRESH = 300       # seconds between two reports of a machine with nothing to do
PLAN_HOT_REFRESH = 55    # the same, while one of its open plans has a lead that is not working
LEAD_GRACE = 300         # seconds a lead's pane must stay unchanged before a loop prompt
MAX_PLAN_PROMPTS = 3     # loop prompts to one plan without progress, then it is stalled
ABSENT_PASSES = 2        # passes a lead's pane must be missing before it counts as gone
FLEET_SCHEMA = 'herdr-peers/fleet-v1'
EVENT_SCHEMA = 'herdr-peers/plan-event-v1'
# The map lists at most this many excluded brain profiles (fleet-v1's limit; the
# daemon's own exclusion set is not capped, only what it publishes).
EXCLUDED_SHOWN = 16

NUDGE_TEXT = (
    '[autopilot] The developer is away and has pre-approved the recommended option for every '
    'pending decision. Continue autonomously: for each open question, take the option you '
    'recommended; where you recommended none, choose the one that best fits this repository\'s '
    'guidelines and the active plan, and record the choice. Do not wait for the developer '
    'again. If an item truly needs something only the developer can provide (a credential, a '
    'login, a fact you cannot verify), leave only that item pending, finish everything else, '
    'and list it at the end.')
DENIED_TEXT = (
    '[autopilot] Your last request was declined: it offered only options the autopilot never '
    'approves (one that widens your permissions, or a refusal). Continue your task another '
    'way, within your plan\'s gates and recorded authority; if it truly cannot go on without '
    'that permission, record it as a blocker and stop.')
RESUME_TEXT = (
    '[autopilot] Your usage limit may have reset. Continue the pending plan to its end from '
    'where you stopped, taking the recommended option at every decision. If the limit is '
    'still in force, stop and wait; you will be asked again later.')

LOOP_TEXT = (
    '[autopilot] Plan %s is not finished and you are its lead. Continue executing it to its '
    'end, respecting its gates and the authority already recorded in the plan. Never weaken a '
    'gate to pass it. If the plan cannot go on without something only the developer can '
    'provide, record the blocker in the plan state and stop.')
TAKEOVER_TEXT = (
    '[autopilot] The lead of plan %s looks gone (%s) and you are in its succession. Run: '
    'herdr-peers lead takeover --plan %s — the helper checks itself whether the lead is really '
    'gone. If it accepts, continue executing the plan to its end, respecting its gates. If it '
    'refuses, do nothing more.')
APPOINT_TEXT = (
    '[autopilot] Plan %s has no lead: its lead and every successor are gone, and its lead '
    'record carries the developer\'s appointment grant. You are its first live lane. Run: '
    'herdr-peers lead takeover --plan %s --as-lane — the helper checks again, twice, that '
    'they are really gone. If it accepts, continue executing the plan to its end, respecting '
    'its gates, and run `herdr-peers lead verify --plan %s` before any merge, tag or release. '
    'If it refuses, do nothing more.')
APPOINT_GRANTS = ('lanes', 'lanes:any-kind')
APPOINT_GRACE = 900        # seconds the evidence must hold, with the plan frozen, before an appointment
MAX_APPOINTMENTS = 2       # appointments one daemon prompts per plan; then only the human is told

# Reasons that are usually a passing state (the lead has not marked the queue yet,
# it is finishing another plan, its directory is not listed this pass).
# 'started, queue not updated' is not here: a plan that began while the queue still says queued
# (the pack leaves it so outside Herdr) is running, never reported.
QUEUE_TRANSIENT = ('lead busy with another plan', 'lead directory unknown')
# The repository path is quoted as JSON data: it is never read as words of the prompt.
QUEUE_TEXT = ("Plan %s is next in the queue of the repository at %s and approved. In that repository, "
              "run the plan tool's execute flow for it (its start gate checks the approval again) and "
              "execute it to its end, respecting its gates.")

BOX = {ord(c): ' ' for c in '│┃█'}
CURSORS = '❯›>→▶'
ROW_NUM = re.compile(r'^(?P<ind>\s*)(?:(?P<cur>[%s])\s+)?(?P<num>\d{1,2})[.)]\s+(?P<rest>\S.*)$'
                     % CURSORS)
ROW_RADIO = re.compile(r'^(?P<ind>\s*)(?P<num>\d{1,2}|[a-z])\s+\((?P<radio>[○●◯◉])\)\s+'
                       r'(?P<rest>\S.*)$')
ROW_CUR = re.compile(r'^(?P<ind>\s*)(?P<cur>[%s])\s+(?P<rest>\S.*)$' % CURSORS)
CHECK = re.compile(r'^\[(?P<mark>[ xX✔✓])\]\s+(?P<rest>\S.*)$')
RULE = re.compile(r'^[\s─━═╌▔▀▄_\-╭╮╰╯]{6,}$')

HINT = re.compile(r'(?i)enter\s*(?:to\s+)?(?:select|confirm|submit)|enter:\s*(?:select|submit|confirm)|'
                  r'press enter')
# The marker a CLI puts on the option it recommends; agents write it in the
# language of the conversation.
RECOMMENDED = re.compile(r'\((?:recommended|recomendad[oa]|recommand[ée]e?|empfohlen|consigliat[oa])\)', re.I)
# A label ends where a wide gap starts: text further right on the same line
# belongs to a preview shown beside the options.
GAP = re.compile(r'\s{3,}.*$')
# Rows that refuse, leave, or open free text: never chosen.
NEGATIVE = re.compile(
    r'^(?:\[[a-z]\]\s+)?(?:no\b|never\b|cancel\b|quit\b|exit\b|skip &|do not\b|don\'t\b|deny\b|'
    r'reject\b|type something|type your answer|other\b|chat about|tell \w+ what|write-in)',
    re.I)
# Rows that widen the agent's standing permissions: never chosen. Autopilot
# accepts one action; it does not change an agent's permission policy.
WIDENING = re.compile(
    r'always allow|don\'t ask again|run everything|always-approve|persist to settings|'
    r'auto mode|auto-accept|accept edits|allow all|during this session|bypass permissions|'
    r'to allowlist|trust parent folder|extra usage|upgrade', re.I)

# name -> patterns; the first match decides. A screen is data.
LOGIN = [r'Select login method', r'Sign in with ChatGPT', r'Log ?in with', r'Paste (the )?code here',
         r'Please run /login', r'Invalid API key', r'Provide your own API key',
         r'(?i)authentication (required|failed)', r'(?i)enter (your )?(api key|password|token)',
         r'(?i)please sign in again', r'(?i)access token could not be refreshed']
# The same, without the phrases an agent working on a sign-in feature would
# plausibly print in a question: these decide when they sit right above a menu.
LOGIN_STRONG = [r'Select login method', r'Sign in with ChatGPT', r'Paste (the )?code here',
                r'Please run /login', r'Invalid API key', r'Provide your own API key',
                r'(?i)authentication required', r'(?i)please sign in again',
                r'(?i)access token could not be refreshed', r'(?i)device code']
# A CLI's own limit banner at the start of a line. Generic "429" and "rate
# limit" lines are not here: a command's output prints those too.
LIMIT = [r"(?m)^[^\w>\n]{0,3}[ \t]*You['’]ve hit your (?:[\w-]+ )?limit\b",
         r'(?mi)^[^\w>\n]{0,3}[ \t]*(?:Claude )?usage limit reached\b',
         r'(?mi)^[^\w>\n]{0,3}[ \t]*(?:[\w-]+ )?limit reached[ \t]*[·∙•|-][ \t]*resets\b']
TRUST = [r'Do you trust the (files|contents) (in|of) this (folder|directory|project)',
         r'Is this a project you created or one you trust', r'(Do you t|T)rust this folder\?',
         r'allow Codex to work in this folder', r'Trust this workspace',
         r'(?m)^\s*Do not trust\s*$']
UPDATE = [r'(?i)update available', r'(?i)a new version .* is available']
PLAN = [r'Would you like to proceed\?', r'Ready to code\?']
# Plan approval shows no "Enter selects" line; these footers are its own.
PLAN_FOOT = re.compile(r'ctrl\+g to edit|to approve with this feedback')
REVIEW = [r'Ready to submit your answers\?']
QUEUED = [r'shift\+← to answer']
# Named classes that may be keyed whatever Herdr's state says: each is
# anchored on its own text, so it does not lean on Herdr's detection.
ANCHORED = (('folder_trust', TRUST), ('update_prompt', UPDATE), ('plan_approval', PLAN),
            ('question_review', REVIEW))
PERMISSION = [r'Do you want to (proceed|make this edit|create|run|allow)', r'Run this command\?',
              r'Would you like to (run|make|apply)', r'Allow (command|once|this|creation)',
              r'Requesting permission', r'(?i)approve (this|the) ', r'Not in allowlist',
              r'(?i)permission (request|required)']

# A turn that finished: only such a pane can be asked to continue.
TURN_DONE = re.compile(r'(?m)^\s*(?:[✻✽✢✶·*]\s+\w+ for \d|Worked for \d|Took \d)')
# An empty input line or a CLI's own placeholder; anything else typed there
# is a human's draft and the pane is left alone.
PLACEHOLDERS = re.compile(
    r'^(?:|Ask Codex to do anything|Add a follow-up|Plan, search, build anything|'
    r'Ask anything.*|Try ".*)$')
INPUT_ROW = re.compile(r'^\s*[%s]\s?(?P<text>.*)$' % CURSORS)
ASKS = re.compile(
    r'[?？]\s*$|(?i:\b(?:let me know|tell me|your call|which (?:option|one)|should i\b|'
    r'do you want|waiting (?:for|on) you|please (?:choose|pick|select|confirm|advise)|'
    r'i[\'’]ll wait|once you (?:confirm|decide|choose)|dime\b|quieres que|espero tu|me dices|decide[sn]?\b|'
    r'confirm(?:a|as|e)?\b))')
CHROME = re.compile(r'shift\+tab|for shortcuts|/effort|esc to interrupt|bypass permissions|'
                    r'new task\?|Update installed|ctrl\+|recap:|Tip:|· /|tokens|\d+%')


class Decision(object):
    """What autopilot does with one screen. `action` is `keys`, `prompt`,
    `leave` (recognised, deliberately untouched) or `none`."""

    def __init__(self, action, cls, why, keys=None, option=None, text=None):
        self.action, self.cls, self.why = action, cls, why
        self.keys, self.option, self.text = keys or [], option, text

    def as_dict(self):
        out = {'action': self.action, 'class': self.cls, 'why': self.why}
        if self.keys:
            out['keys'] = self.keys
        if self.option is not None:
            out['option'] = self.option
        return out


def tail_lines(text, count=TAIL):
    lines = [ln.translate(BOX).rstrip() for ln in (text or '').splitlines()]
    while lines and not lines[-1].strip():
        lines.pop()
    return lines[-count:]


def first_match(patterns, text):
    """The first pattern found in `text`, also tried on the text with its
    line breaks folded: a narrow pane wraps a phrase across two lines."""
    flat = re.sub(r'\s+', ' ', text)
    for pattern in patterns:
        if re.search(pattern, text) or re.search(pattern, flat):
            return pattern
    return None


def _row(label, selected, num=None):
    label = GAP.sub('', label)
    check = CHECK.match(label)
    return {'label': check.group('rest') if check else label, 'selected': selected, 'num': num,
            'checked': None if not check else check.group('mark') != ' ', 'more': ''}


def parse_menu(text):
    """The option block lowest on the screen, or None.

    Returns {'style', 'rows': [{'label', 'selected', 'num', 'checked'}],
    'first', 'last' (line indexes in the tail), 'below' (non-empty lines
    under the block), 'hint' (a line under it says Enter selects),
    'input_below' (an input line sits under it)}.
    A block needs two option rows and a selection mark: a cursor glyph on
    one row, or radio marks on all of them. A numbered list in an agent's
    prose has neither and is not a menu.
    """
    lines = tail_lines(text)
    for end in range(len(lines) - 1, -1, -1):
        menu = _menu_at(lines, end)
        if menu:
            return menu
    return None


def _menu_at(lines, at):
    line = lines[at]
    radio, numbered, cursor = ROW_RADIO.match(line), ROW_NUM.match(line), ROW_CUR.match(line)
    if radio:
        return _collect(lines, at, 'radio')
    if numbered and numbered.group('cur'):
        return _collect(lines, at, 'numbered')
    if cursor and not numbered:
        return _collect(lines, at, 'plain', cursor.start('rest'))
    return None


def _collect(lines, at, style, column=None):
    """Walk up and down from the row at `at`, gathering its sibling rows."""
    def parse(index):
        line = lines[index]
        if style == 'radio':
            m = ROW_RADIO.match(line)
            return _row(m.group('rest'), m.group('radio') in '●◉', m.group('num')) if m else None
        if style == 'numbered':
            m = ROW_NUM.match(line)
            return _row(m.group('rest'), bool(m.group('cur')), m.group('num')) if m else None
        m = ROW_CUR.match(line)
        if m and not ROW_NUM.match(line):
            return _row(m.group('rest'), True)
        if len(line) > column and not line[:column].strip() and line[column] != ' ':
            return _row(line[column:], False)
        return None

    span = [at, at]
    # Lines between two rows: a wrapped label or an option's description. A
    # numbered or radio row is unmistakable, so its description may be long;
    # an unnumbered row is told from other text only by its column.
    gap = DESCRIPTION_MAX if style != 'plain' else 3

    def walk(step):
        found, index, misses = [], at + step, 0
        while 0 <= index < len(lines) and misses <= gap:
            line = lines[index]
            if not line.strip() or RULE.match(line):
                if style != 'numbered' or not line.strip():
                    break
                index += step
                continue
            row = parse(index)
            if row:
                found.append(row)
                misses = 0
                span[0], span[1] = min(span[0], index), max(span[1], index)
            else:
                misses += 1  # a wrapped label or a description line
                if step == 1:
                    owner = found[-1] if found else here
                    owner['more'] += ' ' + GAP.sub('', line.strip())
            index += step
        return found

    here = parse(at)
    if not here:
        return None
    above = walk(-1)
    rows = list(reversed(above)) + [here] + walk(1)
    if style == 'numbered':
        rows = _ascending(rows)
    if len(rows) < 2:
        return None
    if style != 'radio' and sum(1 for r in rows if r['selected']) != 1:
        return None
    under = [ln for ln in lines[span[1] + 1:] if ln.strip()]
    return {'style': style, 'rows': rows, 'first': span[0], 'last': span[1],
            'below': len(under), 'hint': any(HINT.search(ln) for ln in under[:5]),
            # Enter named anywhere under the block: what lets a block with a
            # preview beside it (more lines under the last option) count.
            'hint_far': any(HINT.search(ln) for ln in under[:PREVIEW_MAX]),
            # An agent's input line under the block: these rows are not a dialog.
            'input_below': any(INPUT_ROW.match(ln) for ln in under)}


def _ascending(rows):
    """Keep the run of numbered rows whose numbers go up by one."""
    out = []
    for row in rows:
        if out and int(row['num']) != int(out[-1]['num']) + 1:
            if any(r['selected'] for r in out):
                break
            out = []
        out.append(row)
    return out


def acceptable(row):
    return not NEGATIVE.match(row['label']) and not WIDENING.search(row['label'])


def choose(menu, prefer=None):
    """Index of the row to accept, or None.

    Order: a class's own preference, the row marked recommended, the row the
    CLI pre-selected, the first row — skipping refusals, free text and rows
    that widen the agent's permissions.
    """
    rows = menu['rows']
    order = []
    if prefer:
        order += [i for i, r in enumerate(rows) if prefer.search(r['label'])]
    order += [i for i, r in enumerate(rows) if RECOMMENDED.search(r['label'] + r['more'])]
    order += [i for i, r in enumerate(rows) if r['selected']]
    order += list(range(len(rows)))
    for index in order:
        if acceptable(rows[index]) or (prefer and prefer.search(rows[index]['label'])):
            return index
    return None


def keys_for(menu, target):
    rows = menu['rows']
    current = next((i for i, r in enumerate(rows) if r['selected']), 0)
    if any(r['checked'] is not None for r in rows):
        # Multi-select: Enter toggles and stays, so toggle once, then leave.
        if any(r['checked'] for r in rows):
            return ['tab']
    move = ['down'] * (target - current) if target >= current else ['up'] * (current - target)
    return move + ['enter']


EXIT_ROW = re.compile(r'\b(?:exit|quit)\b', re.I)   # anywhere: 'Cancel and exit' leaves the agent too
REFUSAL_ROW = re.compile(r'^(?:\[[a-z]\]\s+)?(?:no\b|deny\b|reject\b|cancel\b|don\'t\b|do not\b)', re.I)


def no_esc(kind):
    """CLIs where Esc on a dialog aborts the whole turn rather than refusing it."""
    return kind == 'codex'


def deny_decision(text, state, cls, why):
    """Keys that refuse what a pane waits for: its refusal row when the menu has
    one, else Esc. Never a Yes, a row that widens permissions, auto mode, or a row
    that exits the agent. Pure."""
    lines = tail_lines(text)
    menu = parse_menu(text)
    if menu and not live(menu, state, lines):
        menu = None
    if menu:
        rows = menu['rows']
        for i, r in enumerate(rows):
            label = r['label']
            if REFUSAL_ROW.match(label) and not WIDENING.search(label) and not EXIT_ROW.search(label) \
                    and not RECOMMENDED.search(label + r['more']):
                current = next((n for n, x in enumerate(rows) if x['selected']), 0)
                move = ['down'] * (i - current) if i >= current else ['up'] * (current - i)
                return Decision('keys', cls, why, move + ['enter'], i + 1)
    return Decision('keys', cls, why, ['esc'])


# What a pane may wait at that a denial resolves: a permission or a plan approval the
# daemon cannot accept. An agent's own question is a decision about the work: it is left
# waiting for the human, never answered "No" by the daemon. Login, the
# bypass-permissions consent, folder trust, a usage limit and an unknown screen stay the
# human's (or have their own path).
DENIABLE = ('permission', 'plan_approval')
# In the brain's pane everything but its own answer command is denied.
BRAIN_DENIABLE = ('permission', 'plan_approval', 'question', 'question_review')


def menu_decision(menu, cls, why, prefer=None):
    target = choose(menu, prefer)
    if target is None:
        return Decision('leave', cls, 'no acceptable option')
    return Decision('keys', cls, why, keys_for(menu, target), target + 1)


NEAR = 14          # an anchor counts only this close above its menu
FOOTER_MAX = 6     # a live menu sits at the bottom: few lines under it
PREVIEW_MAX = 16   # ...or more, when a preview is drawn beside it and Enter is named below
QUEUED_TAIL = 12   # the queued-question hint counts only this low on the screen


def live(menu, state, lines=()):
    """Is this block a dialog that waits now?

    It sits at the bottom of the screen with no input line under it. Outside
    a blocked state — where Herdr itself says a dialog is up — it also must
    say that Enter selects (or carry plan approval's own footer): a block of rows with a cursor is exactly
    what an agent's input line with wrapped or numbered text looks like, and
    an Enter there would send a human's half-written message.
    """
    if menu['input_below']:
        return False
    if menu['below'] > FOOTER_MAX and not (menu['hint_far'] and menu['below'] <= PREVIEW_MAX):
        return False
    if state == 'blocked':
        return True
    region = lines[menu['first']:menu['last'] + 6]
    return menu['hint'] or any(PLAN_FOOT.search(ln) for ln in region)


def near_menu(patterns, lines, menu):
    """An anchored class counts only when its text sits right above its
    menu — not somewhere in old scrollback."""
    return first_match(patterns, '\n'.join(lines[max(0, menu['first'] - NEAR):menu['last'] + 4]))


def decide(agent, state, text):
    """The action for one pane. Pure: no I/O, nothing from `text` is run."""
    lines = tail_lines(text)
    menu = parse_menu(text)
    if menu and not live(menu, state, lines):
        menu = None
    labels = [r['label'] for r in menu['rows']] if menu else []
    if menu:
        hit = near_menu(LOGIN_STRONG, lines, menu)
        if hit:
            return Decision('leave', 'login', hit)
        if any(re.search(r'Yes, I accept', label) for label in labels):
            return Decision('leave', 'bypass_ack', 'Yes, I accept')
        hit = near_menu(LIMIT, lines, menu)
        if hit:
            return Decision('leave', 'usage_limit', hit)
        for cls, patterns in ANCHORED:
            hit = near_menu(patterns, lines, menu)
            if not hit:
                continue
            if cls == 'update_prompt':
                skip = re.compile(r'^skip\b', re.I)
                if not any(skip.search(label) for label in labels):
                    continue  # a passive banner, not a prompt
                return menu_decision(menu, cls, hit, skip)
            return menu_decision(menu, cls, hit)
        if state == 'blocked':
            hit = near_menu(PERMISSION, lines, menu)
            return menu_decision(menu, 'permission' if hit else 'question', hit or 'menu')
        return Decision('none', 'none', 'no live menu of a known class')
    low = '\n'.join(lines[-QUEUED_TAIL:])
    if state in ('blocked', 'working') and first_match(QUEUED, low):
        return Decision('keys', 'queued_question', 'shift+← to answer', ['shift+left'])
    hit = first_match(LOGIN, '\n'.join(lines[-8:]))
    if hit:
        return Decision('leave', 'login', hit)
    hit = first_match(LIMIT, '\n'.join(lines[-8:]))
    if hit:
        return Decision('leave', 'usage_limit', hit)
    if state == 'blocked':
        return Decision('leave', 'unknown', 'blocked without a recognised menu')
    return Decision('none', 'none', 'nothing waits')


def input_text(lines):
    """Text on the agent's input line; '' when it is empty or not shown."""
    for line in reversed(lines[-8:]):
        m = INPUT_ROW.match(line)
        if m:
            return m.group('text').strip()
    return ''


def has_draft(text, state=None):
    """True when the input line holds something that is not a placeholder:
    a human is typing there, and nothing may be sent to that pane. The rows
    of a live dialog are not an input line."""
    lines = tail_lines(text)
    menu = parse_menu(text)
    if menu and live(menu, state, lines):
        lines = lines[:menu['first']] + lines[menu['last'] + 1:]
    return not PLACEHOLDERS.match(input_text(lines))


def asks_in_prose(text):
    """True when a finished turn ends by asking the human something."""
    lines = tail_lines(text, 30)
    if not TURN_DONE.search('\n'.join(lines)) or has_draft(text):
        return False
    said = [ln for ln in lines if ln.strip() and not RULE.match(ln) and not CHROME.search(ln)
            and not INPUT_ROW.match(ln) and not TURN_DONE.search(ln)]
    return any(ASKS.search(ln) for ln in said[-5:])


def wait_digest(text):
    """What identifies the screen a pane is waiting at: the option block and
    the lines right above it, with digits blanked so a ticking timer or
    counter does not make an unmoved screen look new. Without a block, the
    whole tail."""
    lines = tail_lines(text)
    menu = parse_menu(text)
    if menu:
        lines = lines[max(0, menu['first'] - 8):menu['last'] + 1]
    flat = re.sub(r'\d+', '#', '\n'.join(lines))
    return hashlib.sha256(flat.encode('utf-8', 'replace')).hexdigest()[:16]


def engaged(text):
    """A dialog autopilot is already inside: the next step of what it just
    keyed. It must still be a live block at the bottom of the screen."""
    menu = parse_menu(text)
    return bool(menu) and live(menu, 'blocked') and (menu['style'] != 'plain' or menu['hint'])


class Pane(object):
    """What the loop remembers about one pane between passes (memory only)."""

    def __init__(self):
        self.state = None
        self.seq = None        # Herdr's state_change_seq at the last completed look
        self.turn = None       # Herdr's completion_seq when last seen
        self.seen_working = False
        self.nudges = []       # times of the prompts sent to it
        self.limit_at = 0.0    # when its usage limit was last noted or retried
        self.limit_tries = 0
        self.stuck = None      # digest of the screen last keyed without progress
        self.tries = 0         # key rounds spent on that screen
        self.left = None       # digest of a screen autopilot gave up on or left
        self.since = None      # when its state was last seen to change
        self.denied = False    # a refusal was keyed: tell it once, when it is idle again


class Autopilot(object):
    """The loop. `io` supplies Herdr and the record writer, so the loop is
    testable and this module never imports the helper."""

    def __init__(self, io, dry_run=False, nudge=True, catch_up=False, exclude=(),
                 clock=time.time, sleep=time.sleep, confirm=CONFIRM_DELAY, loop=False,
                 grace=LEAD_GRACE, appoint=False, appoint_grace=APPOINT_GRACE, brain=None):
        self.io, self.dry_run, self.nudge, self.catch_up = io, dry_run, nudge, catch_up
        self.exclude = set(exclude)
        self.clock, self.sleep, self.confirm = clock, sleep, confirm
        self.panes = {}
        self.backoff = {}      # machine -> [passes to skip, last penalty]
        self.known = set()     # machines that have answered at least once
        self.actions = 0
        self.passes = 0
        self.grace = grace
        self.appoint, self.appoint_grace = appoint, appoint_grace  # human flag --appoint
        self.plans = PlanLoop(self) if loop else None
        self.quiet = set()     # panes never nudged in prose (the brain)
        self.brain = BrainKeeper(self, brain) if brain and self.plans else None

    # -- one pass ---------------------------------------------------------
    def run_pass(self):
        """One look at every due machine. Returns the pass summary: machines
        that answered, agents listed, actions taken, seconds spent."""
        started, before = self.clock(), self.actions
        self.passes += 1
        sources = self.io.sources()
        due = []
        for machine in sources:
            wait = self.backoff.get(machine)
            if wait and wait[0] > 0:
                wait[0] -= 1
                continue
            due.append(machine)
        with ThreadPoolExecutor(max_workers=min(8, max(1, len(due)))) as pool:
            listed = list(pool.map(self.io.agents, due))
        seen = set()
        for machine, agents in zip(due, listed):
            if agents is None:
                penalty = min(BACKOFF_MAX, (self.backoff.get(machine) or [0, 0])[1] * 2 or 1)
                self.backoff[machine] = [penalty, penalty]
                continue
            self.backoff.pop(machine, None)
            first_look = machine not in self.known
            for agent in agents:
                addr = '%s:%s' % (machine, agent['pane'])
                seen.add(addr)
                if agent.get('you') or addr in self.exclude or not agent.get('in_scope', True):
                    continue
                try:
                    self.visit(machine, agent, addr, first_look)
                except Exception as exc:  # one pane never stops the loop
                    self.io.warn(addr, exc)
            self.known.add(machine)
        for addr in [a for a in self.panes if a not in seen
                     and a.split(':', 1)[0] in due]:
            del self.panes[addr]
        if self.plans:
            try:
                self.plans.run(dict(zip(due, listed)))
            except Exception as exc:  # never stops the screen pass; a stop (Halt) is not an Exception
                self.io.warn('plan loop', exc)
        return {'pass': self.passes,
                'machines': sum(1 for agents in listed if agents is not None),
                'agents': sum(len(agents) for agents in listed if agents is not None),
                'actions': self.actions - before,
                'seconds': max(0.0, self.clock() - started)}

    def visit(self, machine, agent, addr, first_look):
        memo = self.panes.setdefault(addr, Pane())
        state, fresh = agent.get('state'), memo.state is None and memo.turn is None
        changed = state != memo.state or agent.get('seq') != memo.seq
        if changed or memo.since is None:
            memo.since = self.clock()
        if fresh:
            memo.turn = agent.get('turn')
        elif agent.get('turn') != memo.turn:
            memo.seen_working, memo.turn = True, agent.get('turn')  # a turn finished meanwhile
        memo.state = state
        if state == 'working':
            memo.seq, memo.seen_working = agent.get('seq'), True
            memo.left = memo.stuck = None
            memo.tries = 0
            return
        limit_due = memo.limit_at and self.clock() - memo.limit_at >= LIMIT_RETRY
        if state != 'blocked' and not changed and not limit_due:
            return  # an idle pass reads no pane
        # A stop that predates autopilot is one seen on the first look at its machine.
        if self.attend(machine, agent, addr, memo, stale=fresh and first_look):
            memo.seq = agent.get('seq')
        else:
            memo.state = 'unseen'  # the look did not complete: look again next pass

    def attend(self, machine, agent, addr, memo, stale):
        """Read the pane and act. False when the look could not be completed."""
        pane, kind = agent['pane'], agent.get('agent')
        for step in range(MAX_STEPS):
            text = self.io.read(machine, pane)
            if text is None:
                return False
            digest = wait_digest(text)
            if digest == memo.left:
                return True
            state = self.io.state(machine, pane) if step else agent.get('state')
            if state == 'working':
                return True
            # Once a dialog was keyed, its next step is part of the same
            # dialog even when Herdr briefly reports another state.
            seen = 'blocked' if step and engaged(text) else state   # the state decide reads, and deny too
            choice = decide(kind, seen, text)
            brain = self.brain is not None and self.brain.is_brain(addr)
            if brain and choice.cls not in ('folder_trust', 'update_prompt', 'login', 'bypass_ack',
                                            'usage_limit', 'unknown', 'none') \
                    and (choice.action == 'keys' or choice.cls in BRAIN_DENIABLE) \
                    and not (choice.cls == 'permission' and brain_mod().approval_is_answer(kind, text)):
                # The brain reads text other agents wrote: the daemon approves
                # nothing in its pane but its own answer command. What it asked for
                # is denied — never left waiting — and the brain is reminded once.
                choice = deny_decision(text, seen, 'brain_permission_denied', choice.cls)
            elif choice.action == 'leave' and choice.cls in DENIABLE and choice.why == 'no acceptable option':
                # A permission or plan approval whose every row widens permissions or
                # refuses: refused, not left blocked; the agent is told once it is idle.
                denial = deny_decision(text, seen, 'denied', choice.cls)
                if denial.keys != ['esc'] or not no_esc(kind):
                    choice = denial
            if choice.action == 'keys' and choice.keys == ['esc'] and no_esc(kind):
                # Esc in a Codex approval aborts the whole turn: leave it instead.
                choice = Decision('leave', choice.cls, 'no refusal row; esc would abort the turn')
            if choice.action == 'keys':
                if digest == memo.stuck:
                    memo.tries += 1
                else:
                    memo.stuck, memo.tries = digest, 1
                if memo.tries > MAX_ATTEMPTS:
                    memo.left = digest
                    self.record(addr, kind, Decision('leave', 'stuck', 'no progress'), 'gave_up')
                    return True
                if memo.tries == MAX_ATTEMPTS and choice.cls in ('denied', 'brain_permission_denied') \
                        and not no_esc(kind):
                    choice = Decision('keys', choice.cls, choice.why, ['esc'])   # the row did not take: Esc
                self.record(addr, kind, choice, 'keyed')
                if self.dry_run:
                    return True
                if not self.io.keys(machine, pane, choice.keys):
                    return False
                if memo.tries == 1 and choice.cls == 'brain_permission_denied':
                    self.brain.denied(addr)
                elif memo.tries == 1 and choice.cls == 'denied':
                    memo.denied = True
                self.sleep(self.confirm)
                continue
            if choice.cls == 'usage_limit':
                self.limit(machine, pane, addr, kind, memo, choice, text, state)
                return True
            memo.limit_at, memo.limit_tries = 0.0, 0
            if choice.action == 'leave':
                memo.left = digest
                self.record(addr, kind, choice, 'left')
                if choice.cls == 'unknown' and self.brain is not None:
                    self.brain.ask('screen_unknown', machine, None, {'addr': addr})
            elif state in ('idle', 'done'):
                if memo.denied and self.nudge and not has_draft(text, state) and not brain:
                    memo.denied = False
                    self.record(addr, kind, Decision('prompt', 'denied_told', 'continue another way'),
                                'nudged')
                    if not self.dry_run:
                        self.io.prompt(machine, pane, DENIED_TEXT)
                    return True
                self.maybe_nudge(machine, pane, addr, kind, memo, text, stale)
            return True
        return True

    def limit(self, machine, pane, addr, kind, memo, choice, text, state):
        """A pane at its usage limit: noted once, then tried again every
        LIMIT_RETRY seconds — accept the dialog if one is shown, then ask it
        to go on. Never over a human's draft, never with --no-nudge, and not
        forever."""
        now = self.clock()
        if self.brain is not None and self.brain.is_brain(addr):
            # The brain's own limit is the keeper's to handle, never keyed: marked
            # so that the keeper replaces it on its next tick.
            memo.limit_tries = max(memo.limit_tries, 1)
            return
        if not memo.limit_at:
            memo.limit_at = now
            self.record(addr, kind, choice, 'left')
            return
        if now - memo.limit_at < LIMIT_RETRY:
            return
        memo.limit_at = now
        if not self.nudge or memo.limit_tries >= MAX_LIMIT_RETRIES or has_draft(text, state):
            return
        memo.limit_tries += 1
        menu = parse_menu(text)
        target = choose(menu) if menu and live(menu, state, tail_lines(text)) else None
        keys = keys_for(menu, target) if target is not None else []
        self.record(addr, kind, Decision('prompt', 'usage_limit', 'retry after the wait', keys,
                                         None if target is None else target + 1), 'nudged')
        if self.dry_run:
            return
        if keys:
            self.io.keys(machine, pane, keys)
            self.sleep(self.confirm)
        self.io.prompt(machine, pane, RESUME_TEXT)

    def maybe_nudge(self, machine, pane, addr, kind, memo, text, stale):
        if not self.nudge or addr in self.quiet:
            return
        if stale and not self.catch_up:
            return  # stopped before autopilot started: not ours to restart
        if memo.nudges and not memo.seen_working:
            return  # no turn of its own since the last prompt
        now = self.clock()
        memo.nudges = [t for t in memo.nudges if now - t < NUDGE_WINDOW]
        if len(memo.nudges) >= MAX_NUDGES:
            return
        if not asks_in_prose(text):
            return
        memo.nudges.append(now)
        memo.seen_working = False
        self.record(addr, kind, Decision('prompt', 'prose_question', 'turn ended asking'),
                    'nudged')
        if not self.dry_run:
            self.io.prompt(machine, pane, NUDGE_TEXT)

    def record(self, addr, kind, choice, outcome, plan=None):
        self.actions += 1
        if plan is None:
            self.io.record(addr, kind, choice, outcome, self.dry_run)
        else:
            self.io.record(addr, kind, choice, outcome, self.dry_run, plan=plan)


class PlanMemo(object):
    """What the loop remembers about one plan between passes (memory only)."""

    def __init__(self):
        self.progress = None   # the plan's last reported progress digest
        self.prompts = 0       # loop prompts sent since that digest last changed
        self.epoch = None
        self.takeover = False  # a successor was already asked at this epoch
        self.situation = None  # plan_stalled, plan_blocked, plan_no_lead, plan_completed
        self.seen_open = False
        self.skip_seq = None   # the lead's state sequence when its screen ruled a prompt out
        self.absent = 0        # consecutive reports in which the lead's pane was not listed
        self.extra = 0         # one more prompt the brain allowed (once per plan)
        self.lead_kind = None  # the agent kind last seen in the lead's pane
        self.gone_at = None    # when lead and successors were first all seen gone (appointment)
        self.gone_progress = None
        self.appointee = None  # (address, epoch) of the lane last asked to take the lead
        self.appointments = 0
        self.appointed_epoch = None


class PlanLoop(object):
    """The plan pass of `autopilot --loop`: learn every machine's plans, ask
    the idle lead of an open plan to continue, leave a blocked plan, stop on
    a stall, ask a successor to take over a lead that is gone, keep the map.

    It decides from the machines' reports and Herdr's listing only. A report
    is data: the daemon uses a field only after `valid_report` accepted the
    whole answer, and only addresses the reporting machine calls `local:`
    — its own panes — are ever prompted."""

    def __init__(self, ap):
        self.ap, self.io = ap, ap.io
        self.machines = {}     # machine -> {'at', 'state', 'report'}
        self.memos = {}        # (machine, plan id) -> PlanMemo
        self.resolve = {}           # (machine, plan) -> the blocker the brain allowed its lead to resolve
        self.queued = set()         # (machine, repo, plan) whose lead was prompted to start it
        self.queue_told = {}        # (machine, repo, plan) -> the blocked reason already reported
        self.queue_since = {}       # (machine, repo, plan) -> (reason, first seen)
        self.fleet_text = None      # the daemon's own map
        self.remote_text = None     # the reduced copy left on other machines
        self.fleet_key = None
        self.too_large = False
        # A daemon that restarts hands the machines the last map at once
        # instead of waiting a full report cycle for its first one.
        load = getattr(self.io, 'load_fleet', None)
        last = load() if load is not None and not ap.dry_run else None
        if isinstance(last, dict) and isinstance(last.get('machines'), list):
            try:
                self.remote_text = json.dumps(remote_copy(last), sort_keys=True)
            except (TypeError, ValueError, AttributeError, KeyError):
                self.remote_text = None

    # -- reports -----------------------------------------------------------
    def due(self, machine, rows, now):
        info = self.machines.get(machine)
        if info is None:
            return True
        age = now - info['at']
        if age >= PLAN_REFRESH:
            return True
        return age >= PLAN_HOT_REFRESH and self.hot(machine, info, rows)

    def hot(self, machine, info, rows):
        """True while an open, unstalled plan of this machine has a lead
        that is not working: the only case worth asking again soon."""
        states = dict((r['pane'], r.get('state')) for r in rows)
        for plan in (info.get('report') or {}).get('plans', []):
            memo = self.memos.get((machine, plan['plan']))
            if plan['class'] != 'open' or (memo and memo.situation):
                continue
            pane = local_pane(plan['lead'])
            if pane and states.get(pane) != 'working':
                return True
        return False

    def fetch(self, listed, now):
        mirror = getattr(self.io, 'self_machine', None)  # a saved machine that is this server
        need = [m for m, rows in listed.items()
                if rows is not None and m != mirror and self.due(m, rows, now)]
        if not need:
            return

        def ask(machine):
            panes = dict((r['pane'], r['cwd']) for r in listed[machine]
                         if r.get('cwd') and r.get('in_scope', True))
            try:
                return self.io.plans(machine, panes, None if self.ap.dry_run else self.remote_text)
            except Exception as exc:  # one machine never stops the pass
                self.io.warn(machine, exc)
                return 'unknown', None
        with ThreadPoolExecutor(max_workers=min(8, len(need))) as pool:
            answers = list(pool.map(ask, need))
        for machine, (state, report) in zip(need, answers):
            info = self.machines.setdefault(machine, {'at': 0.0, 'state': None, 'report': None})
            if state != info['state'] and state in ('unsupported', 'bad_target'):
                self.ap.record('%s:-' % machine, None, Decision(
                    'leave', 'machine_unsupported' if state == 'unsupported' else 'machine_target',
                    'no report from this machine'), 'left')
            info['at'], info['state'] = now, state
            if state == 'ok':
                info['report'] = report
            # Otherwise the last good report stays: unknown is not "no plans".

    # -- one pass ----------------------------------------------------------
    def run(self, listed):
        now = self.ap.clock()
        if self.ap.brain is not None:
            self.ap.brain.tick(listed, now)
        self.fetch(listed, now)
        prompted = set()
        for machine in sorted(listed):
            rows = listed[machine]
            info = self.machines.get(machine)
            if rows is None or not info or not info.get('report'):
                continue
            by_pane = dict((r['pane'], r) for r in rows)
            for plan in info['report']['plans']:
                try:
                    self.consider(machine, plan, by_pane, now, prompted)
                except Exception as exc:  # one plan never stops the pass
                    self.io.warn('%s:%s' % (machine, plan.get('plan')), exc)
            seen = set()
            queues = info['report'].get('queues') or []
            # A queue reported invalid (a queue.json caught mid-write, say) lists
            # no items: its repository keeps its state until a valid read.
            unread = set(q.get('repo_root') for q in queues if q.get('invalid'))
            for queue in queues:
                for item in queue.get('items') or []:
                    seen.add((machine, queue.get('repo_root'), item.get('plan')))
            if info.get('state') == 'ok':  # a machine that could not answer keeps its state
                self.forget_queues(machine, seen, unread)
            for queue in queues:
                try:
                    self.consider_queue(machine, queue, by_pane, now, prompted, seen)
                except Exception as exc:  # one queue never stops the pass
                    self.io.warn('%s:queue' % machine, exc)
        self.publish(listed, now)
        flush = getattr(self.io, 'flush_events', None)
        if flush is not None:
            flush()  # notify commands run last, within their own budget

    def consider(self, machine, plan, by_pane, now, prompted):
        memo = self.memos.setdefault((machine, plan['plan']), PlanMemo())
        if memo.epoch != plan['epoch']:
            memo.epoch, memo.takeover = plan['epoch'], False
            if memo.situation == 'plan_no_lead':
                memo.situation = None
        if plan['progress'] != memo.progress:
            memo.progress, memo.prompts = plan['progress'], 0
            if memo.situation == 'plan_stalled':
                memo.situation = None
        cls = plan['class']
        if cls == 'unreadable':
            return
        pane = local_pane(plan['lead'])
        addr = '%s:%s' % (machine, pane) if pane else '%s:-' % machine
        if pane is not None and pane in by_pane:
            memo.absent = 0
        elif pane is not None:
            memo.absent += 1  # judged on the full listing, scope or not
        if cls == 'completed':
            if memo.seen_open:  # only a plan this daemon watched while open
                self.enter(memo, machine, plan, 'plan_completed', addr, None)
            return
        memo.seen_open = True
        if cls == 'blocked':
            self.enter(memo, machine, plan, 'plan_blocked', addr, 'left')
            key = (machine, plan['plan'])
            allowed = self.resolve.get(key)
            # Only the blocker the brain was asked about, and only while it is
            # still one the lead may resolve; kept until the lead can be prompted.
            if allowed is not None and (allowed != brain_mod().blocker_key(plan)
                                        or not brain_mod().blocker_is_askable(plan)):
                self.resolve.pop(key, None)
            elif allowed is not None and pane is not None and self.prompt_lead(machine, plan, pane, addr, by_pane, now, prompted,
                                 brain_mod().RESOLVE_TEXT % plan['plan'], 'plan_resolve'):
                self.resolve.pop(key, None)
            return
        self.resolve.pop((machine, plan['plan']), None)  # unblocked: the answer is spent
        if memo.situation in ('plan_blocked', 'plan_completed'):
            memo.situation = None
        if pane is None:
            return  # released, or led from another machine: not this daemon's to prompt
        row = by_pane.get(pane)
        pmemo = self.ap.panes.get(addr)
        if row is not None and row.get('agent'):
            memo.lead_kind = row.get('agent')
        if plan.get('appointed') and memo.appointed_epoch != plan['epoch']:
            # The record says this epoch came by appointment: reported once per epoch.
            memo.appointed_epoch, memo.appointee = plan['epoch'], None
            self.io.event({'schema': EVENT_SCHEMA, 'event': 'plan_appointed', 'plan': plan['plan'],
                           'machine': machine, 'lead': plan['lead'],
                           'repo_root': plan['repo_root'], 'blocker_class': None}, self.ap.dry_run)
        gone = None
        if row is None:
            if memo.absent < ABSENT_PASSES:
                return  # one missing listing is not a gone lead
            gone = 'no_agent'
        elif self.ap.appoint and pmemo is not None and pmemo.limit_tries >= MAX_LIMIT_RETRIES:
            # Only for an appointment, and only once the screen pass gave up on
            # its limit (the developer's rule); the 15-minute grace follows.
            gone = 'usage_limit'
        if gone:
            self.succeed(memo, machine, plan, by_pane, addr, gone, prompted)
            return
        memo.gone_at = None  # the lead is here: any appointment evidence starts over
        if memo.situation in ('plan_no_lead', 'plan_lead_moved') and plan.get('lead_in_repo') is not False:
            memo.situation = None
        if row.get('you') or addr in self.ap.exclude or pmemo is None or not row.get('in_scope', True):
            return
        if plan.get('lead_in_repo') is False:
            # The pane the record names works elsewhere now: a stale record
            # (pane ids are reused after a Herdr restart). Never tell a stranger
            # it leads a plan.
            self.enter(memo, machine, plan, 'plan_lead_moved', addr, 'left')
            return
        if row.get('state') not in ('idle', 'done'):
            memo.skip_seq = None
            return
        if memo.situation == 'plan_stalled' or not self.ap.nudge or addr in prompted:
            return
        if pmemo.since is None or now - pmemo.since < self.ap.grace:
            return  # idle is not stopped: its own watcher may still wake it
        if plan.get('open_asks') != 0:
            return  # it awaits a reply (or its asks could not be counted)
        for lane in plan['lanes']:
            lane_pane = local_pane(lane)
            if lane_pane and (by_pane.get(lane_pane) or {}).get('state') == 'working':
                return  # its lanes are still working for it
        if pmemo.nudges and not pmemo.seen_working:
            return  # no turn of its own since the last prompt
        pmemo.nudges = [t for t in pmemo.nudges if now - t < NUDGE_WINDOW]
        if len(pmemo.nudges) >= MAX_NUDGES:
            return
        if memo.skip_seq is not None and memo.skip_seq == row.get('seq'):
            return  # its screen ruled a prompt out and has not moved since
        if memo.prompts >= MAX_PLAN_PROMPTS + memo.extra:
            self.enter(memo, machine, plan, 'plan_stalled', addr, 'gave_up')
            return
        text = self.io.read(machine, pane)
        if text is None:
            return
        choice = decide(row.get('agent'), row.get('state'), text)
        if choice.action in ('keys', 'leave') or choice.cls == 'usage_limit' \
                or has_draft(text, row.get('state')) or asks_in_prose(text):
            memo.skip_seq = row.get('seq')  # a dialog, a login, a draft, or the prose nudge's case
            return
        memo.prompts += 1
        pmemo.nudges.append(now)
        pmemo.seen_working = False
        prompted.add(addr)
        self.ap.record(addr, row.get('agent'), Decision('prompt', 'plan_open', 'plan not finished'),
                       'nudged', plan=plan['plan'])
        if not self.ap.dry_run:
            self.io.prompt(machine, pane, LOOP_TEXT % plan['plan'])

    def consider_queue(self, machine, queue, by_pane, now, prompted, seen=None):
        """Start the next ready item of a repository's queue: one fixed prompt to
        its named lead, once. The queue is the pack's; the daemon only reads it.
        In a sequential queue nothing after a queued item that cannot start
        starts. An item that cannot start for a reason the human must fix is
        reported once per reason; a reason that is usually a passing state is
        reported only once it has held for the appointment grace."""
        repo = queue.get('repo_root')
        sequential = not queue.get('parallel')
        seen = set() if seen is None else seen
        for item in queue.get('items') or []:
            key = (machine, repo, item['plan'])
            seen.add(key)
            if item.get('state') != 'queued':
                self.queued.discard(key)
                self.queue_told.pop(key, None)
                self.queue_since.pop(key, None)
                continue
            reason = item.get('blocked_reason')
            pane = local_pane(item.get('lead'))
            if not reason and item.get('ready') and pane is None:
                reason = 'lead on another machine'  # this daemon can prompt only its own panes
            in_flight = bool(reason) and reason.startswith('started')   # began; the queue not updated (outside Herdr)
            if not reason or in_flight or reason.startswith('waiting for') or reason.startswith('another plan'):
                # Its reason cleared: a reason that returns later is reported again.
                self.queue_told.pop(key, None)
                self.queue_since.pop(key, None)
            if reason:
                if reason.startswith('waiting for') or in_flight:
                    continue  # its `after` plan decides; or it runs already: never reported
                if not reason.startswith('another plan'):
                    self.tell_queue(machine, repo, item, key, reason, now)
                if sequential:
                    return  # nothing after a stuck item starts
                continue
            self.queue_since.pop(key, None)
            if not item.get('ready'):
                if sequential:
                    return
                continue
            if key in self.queued:
                if sequential:
                    return  # its start is in flight: one at a time per repository
                continue
            addr = '%s:%s' % (machine, pane)
            if self.prompt_lead(machine, {'plan': item['plan']}, pane, addr, by_pane, now, prompted,
                                QUEUE_TEXT % (item['plan'], json.dumps(repo)), 'plan_queued_started'):
                self.queued.add(key)
                self.io.event({'schema': EVENT_SCHEMA, 'event': 'plan_queued_started',
                               'plan': item['plan'], 'machine': machine, 'lead': item.get('lead'),
                               'repo_root': repo, 'blocker_class': None}, self.ap.dry_run)
            if sequential:
                return  # one at a time per repository

    def forget_queues(self, machine, seen, unread=()):
        """Drop the queue state of this machine's items that its current report
        no longer lists (an item removed, a queue deleted). A repository whose
        queue was reported invalid (`unread`) keeps its state: no items were read,
        so nothing is known to be gone, and forgetting `queued` would prompt its
        lead a second time."""
        def gone(k):
            return k[0] == machine and k not in seen and k[1] not in unread
        for store in (self.queue_told, self.queue_since):
            for key in [k for k in store if gone(k)]:
                del store[key]
        self.queued -= set(k for k in self.queued if gone(k))

    def tell_queue(self, machine, repo, item, key, reason, now):
        """Report a queued item that cannot start, once per reason; a passing
        reason only after it held for the appointment grace."""
        since = self.queue_since.get(key)
        if since is None or since[0] != reason:
            since = self.queue_since[key] = (reason, now)
        if reason in QUEUE_TRANSIENT and now - since[1] < self.ap.appoint_grace:
            return
        if self.queue_told.get(key) == reason:
            return
        self.queue_told[key] = reason
        self.ap.record('%s:-' % machine, None, Decision('leave', 'queue_blocked', reason),
                       'left', plan=item['plan'])
        self.io.event({'schema': EVENT_SCHEMA, 'event': 'queue_blocked',
                       'plan': item['plan'], 'machine': machine, 'lead': item.get('lead'),
                       'repo_root': repo, 'blocker_class': None}, self.ap.dry_run)

    def prompt_lead(self, machine, plan, pane, addr, by_pane, now, prompted, text, cls):
        """One fixed prompt to a plan's lead, under the same guards as the
        loop prompt: listed, in scope, idle or done, not its own pane, no
        dialog, login, limit or draft on its screen, the hourly cap."""
        row = by_pane.get(pane)
        pmemo = self.ap.panes.get(addr)
        if row is None or row.get('you') or addr in self.ap.exclude or pmemo is None \
                or not row.get('in_scope', True) or row.get('state') not in ('idle', 'done') \
                or addr in prompted or not self.ap.nudge:
            return False
        pmemo.nudges = [t for t in pmemo.nudges if now - t < NUDGE_WINDOW]
        if len(pmemo.nudges) >= MAX_NUDGES:
            return False
        text_on = self.io.read(machine, pane)
        if text_on is None:
            return False
        choice = decide(row.get('agent'), row.get('state'), text_on)
        if choice.action in ('keys', 'leave') or choice.cls == 'usage_limit' \
                or has_draft(text_on, row.get('state')):
            return False
        pmemo.nudges.append(now)
        prompted.add(addr)
        self.ap.record(addr, row.get('agent'), Decision('prompt', cls, 'brain allowed'), 'nudged',
                       plan=plan['plan'])
        if not self.ap.dry_run:
            self.io.prompt(machine, pane, text)
        return True

    def succeed(self, memo, machine, plan, by_pane, addr, reason, prompted):
        """The lead is gone: ask the first reachable successor to take over,
        once per epoch. The daemon writes no lead record; the helper's own
        takeover rules decide."""
        if memo.takeover or not self.ap.nudge:
            return
        for candidate in plan['succession']:
            pane = local_pane(candidate)
            row = by_pane.get(pane) if pane else None
            target = '%s:%s' % (machine, pane)
            pmemo = self.ap.panes.get(target)
            if row is None or row.get('you') or target in self.ap.exclude or target in prompted \
                    or not row.get('in_scope', True):
                continue
            if row.get('state') not in ('idle', 'done') or (pmemo and pmemo.limit_at):
                continue
            text = self.io.read(machine, pane)
            if text is None:
                continue
            choice = decide(row.get('agent'), row.get('state'), text)
            if choice.action in ('keys', 'leave') or choice.cls == 'usage_limit' \
                    or has_draft(text, row.get('state')):
                continue
            memo.takeover = True
            prompted.add(target)
            self.ap.record(target, row.get('agent'), Decision(
                'prompt', 'plan_takeover_prompted', 'lead %s' % reason), 'nudged', plan=plan['plan'])
            if not self.ap.dry_run:
                self.io.prompt(machine, pane, TAKEOVER_TEXT % (plan['plan'], reason, plan['plan']))
            return
        if self.appoint(memo, machine, plan, by_pane, prompted):
            return
        self.enter(memo, machine, plan, 'plan_no_lead', addr, 'left')

    def appoint(self, memo, machine, plan, by_pane, prompted):
        """Lead and every successor gone, the plan granted and `--appoint` on:
        after the evidence held APPOINT_GRACE with the plan frozen, ask the
        first live lane to take the lead (`lead takeover --as-lane`, which
        checks again). True while an appointment is under way or waiting for
        its grace; False when there is none to make (plan_no_lead follows)."""
        if not self.ap.appoint or plan.get('appoint') not in APPOINT_GRANTS or not self.ap.nudge:
            return False
        if any(local_pane(s) is None or local_pane(s) in by_pane for s in plan['succession']):
            memo.gone_at = None  # a successor is back: the evidence starts over
            return False  # a successor is alive (or on another machine): not ours to bypass
        now = self.ap.clock()
        if memo.gone_at is None or memo.gone_progress != plan['progress']:
            memo.gone_at, memo.gone_progress = now, plan['progress']
            return True   # first sight, or the plan moved: the grace starts now
        if now - memo.gone_at < self.ap.appoint_grace:
            return True
        if memo.appointments >= MAX_APPOINTMENTS:
            return False
        if memo.appointee and memo.appointee[1] == plan['epoch']:
            return True   # asked at this epoch already: the helper decides
        for lane in plan['lanes']:
            pane = local_pane(lane)
            if pane is None:
                return False  # a lane on another machine: this daemon cannot see it
            row = by_pane.get(pane)
            if row is None:
                continue      # a gone lane: F10 needs every earlier lane gone, so go on
            target = '%s:%s' % (machine, pane)
            pmemo = self.ap.panes.get(target)
            kind_ok = plan['appoint'] == 'lanes:any-kind' or memo.lead_kind is None \
                or row.get('agent') == memo.lead_kind
            if row.get('you') or target in self.ap.exclude or target in prompted \
                    or not row.get('in_scope', True) or not kind_ok \
                    or row.get('state') not in ('idle', 'done') or (pmemo and pmemo.limit_at) \
                    or self.leads_elsewhere(machine, pane, plan['plan']):
                return True   # the first live lane is not ready: wait, never skip it
            text = self.io.read(machine, pane)
            if text is None:
                return True
            choice = decide(row.get('agent'), row.get('state'), text)
            if choice.action in ('keys', 'leave') or choice.cls == 'usage_limit' \
                    or has_draft(text, row.get('state')):
                return True
            memo.appointee, memo.appointments = (target, plan['epoch']), memo.appointments + 1
            prompted.add(target)
            self.ap.record(target, row.get('agent'), Decision(
                'prompt', 'plan_appointment_prompted', 'lead and successors gone'), 'nudged',
                plan=plan['plan'])
            self.io.event({'schema': EVENT_SCHEMA, 'event': 'plan_appointment_prompted',
                           'plan': plan['plan'], 'machine': machine, 'lead': plan['lead'],
                           'repo_root': plan['repo_root'], 'blocker_class': None}, self.ap.dry_run)
            if not self.ap.dry_run:
                self.io.prompt(machine, pane, APPOINT_TEXT % ((plan['plan'],) * 3))
            return True
        return False

    def leads_elsewhere(self, machine, pane, plan_id):
        """True when `pane` leads, succeeds or is a lane of another open plan on
        `machine` (the same membership the queue checks)."""
        report = (self.machines.get(machine) or {}).get('report') or {}
        for other in report.get('plans', []):
            if other['plan'] == plan_id or other['class'] not in ('open', 'blocked'):
                continue
            members = [other.get('lead')] + list(other.get('succession') or []) + list(other.get('lanes') or [])
            if pane in [local_pane(a) for a in members]:
                return True
        return False

    def enter(self, memo, machine, plan, situation, addr, outcome):
        """A plan arrives at a situation the developer should know about:
        recorded once, and told once through the notify command."""
        if memo.situation == situation:
            return
        memo.situation = situation
        if outcome:
            self.ap.record(addr, None, Decision('leave', situation, 'plan needs the developer'),
                           outcome, plan=plan['plan'])
        keeper = self.ap.brain
        if keeper is not None:
            if situation == 'plan_stalled':
                keeper.ask('plan_stalled', machine, plan, {'addr': addr})
            elif situation == 'plan_blocked' and brain_mod().blocker_is_askable(plan):
                keeper.ask('plan_blocked', machine, plan, {'addr': addr})
        self.io.event({'schema': EVENT_SCHEMA, 'event': situation, 'plan': plan['plan'],
                       'machine': machine, 'lead': plan['lead'], 'repo_root': plan['repo_root'],
                       'blocker_class': plan['blocker_class']}, self.ap.dry_run)

    # -- the map -----------------------------------------------------------
    def publish(self, listed, now):
        machines = []
        for machine in sorted(set(listed) | set(self.machines)):
            info = self.machines.get(machine) or {}
            report = info.get('report') or {}
            rows = listed.get(machine)
            repos = dict((a['pane'], a) for a in report.get('agents', []))
            roles = {}
            for plan in report.get('plans', []):
                for role, items in (('lead', [plan['lead']]), ('successor', plan['succession']),
                                    ('lane', plan['lanes'])):
                    for item in items:
                        pane = local_pane(item)
                        if pane:
                            roles.setdefault(pane, []).append({'plan': plan['plan'], 'role': role})
            agents = []
            for row in [r for r in rows or [] if r.get('in_scope', True)]:  # never map what is out of scope
                repo = repos.get(row['pane']) or {}
                pmemo = self.ap.panes.get('%s:%s' % (machine, row['pane']))
                since = pmemo.since if pmemo is not None else None
                agents.append({'pane': row['pane'], 'kind': row.get('agent'),
                               'state': row.get('state'), 'cwd': row.get('cwd'),
                               'title': clean_title(row.get('title')),
                               'state_since': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(since))
                               if since else None,
                               'repo_root': repo.get('repo_root'), 'branch': repo.get('branch'),
                               'plans': roles.get(row['pane'], [])})
            plans = []
            for plan in report.get('plans', []):
                memo = self.memos.get((machine, plan['plan']))
                plans.append({'plan': plan['plan'], 'class': plan['class'], 'lead': plan['lead'],
                              'epoch': plan['epoch'], 'succession': plan['succession'],
                              'lanes': plan['lanes'], 'repo_root': plan['repo_root'],
                              'blocker_class': plan['blocker_class'],
                              'progress': plan.get('progress'), 'updated_at': plan.get('updated_at'),
                              'state_updated_at': plan.get('state_updated_at'),
                              'unreadable_reason': plan.get('unreadable_reason'),
                              'tasks_done': plan.get('tasks_done'),
                              'tasks_total': plan.get('tasks_total'),
                              'current_task': plan.get('current_task'),
                              'detail': plan.get('detail'),
                              'situation': memo.situation if memo else None})
            queues = []
            for q in report.get('queues') or []:
                queues.append({'repo_root': q.get('repo_root'), 'parallel': bool(q.get('parallel')),
                               'invalid': bool(q.get('invalid')),
                               'items': [{'plan': it['plan'], 'state': it['state'], 'after': it.get('after'),
                                          'lead': it.get('lead'), 'ready': it['ready'],
                                          'blocked_reason': it.get('blocked_reason')}
                                         for it in q.get('items') or []]})
            machines.append({'machine': machine, 'label': self.io.label(machine),
                             'agents_state': 'unknown' if rows is None else 'ok',
                             'plans_state': info.get('state') or 'unknown',
                             'agents': agents, 'plans': plans, 'queues': queues})
        daemon = dict(self.io.identity())
        daemon['brain'] = self.ap.brain.status(now) if self.ap.brain is not None else None
        body = {'schema': FLEET_SCHEMA, 'daemon': daemon, 'machines': machines}
        key = hashlib.sha256(json.dumps(body, sort_keys=True).encode('utf-8')).hexdigest()
        if key != self.fleet_key:
            self.fleet_key = key
            stamp = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(now))
            body['generated_at'] = stamp
            text = json.dumps(body, sort_keys=True)
            if len(text.encode('utf-8')) > MAP_MAX_BYTES:
                # Too big for the map: plan details go first; the rest of the map stays.
                for m in body['machines']:
                    for p in m['plans']:
                        p['detail'] = None
                text = json.dumps(body, sort_keys=True)
                if not self.too_large:
                    self.too_large = True
                    self.ap.record('local:-', None, Decision('leave', 'fleet_too_large',
                                                             'plan details left out of the map'), 'left')
            self.fleet_text = text  # this machine's own map, with plan details
            self.remote_text = json.dumps(remote_copy(body), sort_keys=True)
        if not self.ap.dry_run:
            self.io.save_fleet(self.fleet_text)


MAP_MAX_BYTES = 2 * 1024 * 1024 - 4096   # under the store's 2 MB cap, with room to spare
REMOTE_PLAN_KEYS = ('plan', 'class', 'blocker_class', 'progress', 'lead', 'lanes', 'succession',
                    'epoch', 'updated_at', 'state_updated_at', 'unreadable_reason', 'repo_root', 'situation',
                    'tasks_done', 'tasks_total', 'current_task')


def brain_mod():
    import brain
    return brain


class BrainKeeper(object):
    """The daemon's brain: launched by the daemon itself (ask mode, on the
    best account by provider priority), briefed once, kept alive, asked
    only what the rules cannot decide, and obeyed only within each case's
    closed action list. See brain.py; the I/O is the helper's."""

    def __init__(self, ap, opts):
        self.ap, self.io, self.opts = ap, ap.io, opts
        self.b = brain_mod().Brain()
        self.excluded = set()   # profiles whose default mode skips approvals
        self.last = None   # the brain's last decision, for the map and the watcher
        self.retired = None  # why the last brain was retired, for the map and status
        self.denials = []    # times of this brain's denied requests (an hour is kept)
        self.remind = False  # a denial happened: remind it of the one allowed command

    # -- lifecycle ---------------------------------------------------------
    def tick(self, listed, now):
        b, B = self.b, brain_mod()
        rows = dict((r['pane'], r) for r in (listed.get('local') or []))
        self.read_answers(now)
        for q in b.expired(now):
            self.last = {'case': q['case'], 'action': 'default', 'plan': q['plan'],
                         'at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(now))}
            self.ap.record(q['addr'] or 'local:-', None, Decision('leave', 'brain_default',
                                                                   'no valid answer in time'),
                           'left', plan=q['plan'])
        if b.pane and b.state in ('starting', 'ready'):
            row = rows.get(b.pane)
            pmemo = self.ap.panes.get('local:%s' % b.pane)
            gone = row is None and b.state == 'ready'
            limited = pmemo is not None and pmemo.limit_tries >= 1
            late = b.state == 'starting' and now - b.started_at > B.START_DEADLINE and not (
                row is not None and row.get('state') in ('idle', 'done'))
            if late:
                # ak failed, a login screen, an agent that never came up: not this one.
                addr = 'local:%s' % b.pane
                self.retire('start_timeout')
                self.io.event({'schema': EVENT_SCHEMA, 'event': 'needs_human', 'plan': None,
                               'machine': 'local', 'lead': addr, 'repo_root': None,
                               'blocker_class': None}, self.ap.dry_run)
            elif gone or limited:
                self.retire('gone' if gone else 'usage_limit')
            elif b.state == 'starting' and row is not None and row.get('state') in ('idle', 'done'):
                screen = self.io.read('local', b.pane) or ''
                if B.AUTO_MODE.search('\n'.join(screen.splitlines()[-6:])):
                    # Its profile starts in a mode that skips approvals: the
                    # daemon's approval guard would never see them. Not this one.
                    addr = 'local:%s' % b.pane
                    if b.profile and B.PROFILE_RE.fullmatch(b.profile):
                        self.excluded.add(b.profile)
                        self.ap.record(addr, b.kind, Decision('leave', 'brain_profile_excluded', b.profile), 'left')
                    self.retire('permission_mode')
                    self.refused(addr)
                    return
                if not self.ap.dry_run:
                    self.io.prompt('local', b.pane, B.BRIEF)
                b.state, b.briefed = 'ready', True
                self.ap.record('local:%s' % b.pane, row.get('agent'),
                               Decision('prompt', 'brain_briefed', 'brain ready'), 'nudged')
            elif b.state == 'ready' and self.remind and row is not None and row.get('state') in ('idle', 'done'):
                self.remind = False
                if not self.ap.dry_run:
                    self.io.prompt('local', b.pane, B.REMINDER)
                self.ap.record('local:%s' % b.pane, row.get('agent'),
                               Decision('prompt', 'brain_reminded', 'only the answer command'), 'nudged')
            elif b.state == 'ready' and now - b.lease_at >= B.LEASE_RENEW:
                if not self.ap.dry_run and self.io.brain_lease(b.kind, b.profile):
                    b.lease_at = now
        if b.state in ('none', 'failed') and b.can_launch(now):
            self.launch(now)

    def launch(self, now):
        b = self.b
        b.launches.append(now)
        if self.ap.dry_run:
            b.state = 'failed'
            self.ap.record('local:-', None, Decision('leave', 'brain_launch', 'dry run: not launched'),
                           'left')
            return
        try:
            info = self.io.brain_launch(self.opts.get('kinds') or brain_mod().DEFAULT_KINDS,
                                        self.opts.get('models') or {}, sorted(self.excluded))
        except Exception as exc:  # a refusal or a tool failure: recorded, retried within the cap
            b.state = 'failed'
            self.ap.record('local:-', None, Decision('leave', 'brain_launch_failed',
                                                     brain_mod().clean(str(exc), 120)), 'left')
            return
        b.pane, b.terminal, b.workspace = info['pane'], info['terminal'], info['workspace']
        b.kind, b.profile, b.lease_at = info['kind'], info['profile'], now
        b.key, b.offset, b.started_at = info.get('key'), 0, now  # the answers file starts empty
        b.state, b.briefed = 'starting', False
        self.ap.quiet.add('local:%s' % b.pane)
        self.ap.record('local:%s' % b.pane, b.kind, Decision('prompt', 'brain_launched',
                                                             '%s %s' % (b.kind, b.profile)), 'nudged')

    def denied(self, addr):
        """A request of the brain's was denied: remind it once; three in an hour and
        it is retired as misbehaving (a replacement launches within the cap)."""
        now = self.ap.clock()
        self.denials = [t for t in self.denials if now - t < 3600] + [now]
        if len(self.denials) >= brain_mod().MAX_DENIALS:
            self.retire('misbehaving')
            return
        self.remind = True

    def retire(self, why):
        b = self.b
        self.denials, self.remind = [], False
        self.ap.record('local:%s' % b.pane, b.kind, Decision('leave', 'brain_replaced', why), 'left')
        self.retired = {'why': why, 'profile': b.profile,
                        'at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(self.ap.clock()))}
        self.close()
        b.state = 'none'

    def close(self):
        """Release the lease and close the workspace the daemon created."""
        b = self.b
        if b.pane and not self.ap.dry_run:
            self.io.brain_release(b.kind, b.profile, b.workspace)
        self.ap.quiet.discard('local:%s' % b.pane)
        b.pane = b.terminal = b.workspace = b.key = None

    # -- questions -----------------------------------------------------------
    def ask(self, case, machine, plan, ctx):
        """Put one question to the brain, if it is ready and the cap allows;
        never waits. Its answer is read on a later pass."""
        b, B = self.b, brain_mod()
        now = self.ap.clock()
        key = '%s|%s|%s' % (case, machine, (plan or {}).get('plan') or ctx.get('addr'))
        if b.state != 'ready' or b.open_for(key) or not b.can_ask(now):
            return
        qid = B.new_question_id(self.io.random_bytes)
        b.questions[qid] = {'case': case, 'key': key, 'at': now, 'answered': False,
                            'machine': machine, 'plan': (plan or {}).get('plan'),
                            'lead': (plan or {}).get('lead'), 'addr': ctx.get('addr'),
                            'repo_root': (plan or {}).get('repo_root'),
                            'blocker_class': (plan or {}).get('blocker_class'),
                            'blocker_key': B.blocker_key(plan) if plan else None}
        b.asked.append(now)
        self.ap.record('local:%s' % b.pane, b.kind, Decision('prompt', 'brain_asked', case),
                       'nudged', plan=(plan or {}).get('plan'))
        if not self.ap.dry_run:
            self.io.prompt('local', b.pane, B.question_text(qid, case, (plan or {}).get('plan'),
                                                            machine))

    def read_answers(self, now):
        b, B = self.b, brain_mod()
        lines, b.offset = self.io.brain_answers(b.offset)
        for line in lines:
            rec = B.parse_answer_line(line)
            if rec is None:
                continue
            got = b.accept(rec, now, owns=lambda: self.io.brain_owns(b.pane, rec.get('ancestry')))
            if got is None:
                self.ap.record('local:%s' % (b.pane or '-'), None,
                               Decision('leave', 'brain_answer_refused', B.clean(rec.get('qid'), 20)),
                               'left')
                continue
            q, action = got
            self.ap.record(q['addr'] or 'local:-', None,
                           Decision('prompt' if action not in ('leave',) else 'leave',
                                    'brain_' + action, q['case']),
                           'nudged' if action != 'leave' else 'left', plan=q['plan'])
            self.act(q, action)

    def is_brain(self, addr):
        return bool(self.b.pane) and addr == 'local:%s' % self.b.pane

    def refused(self, addr):
        """The brain asked for something the daemon will not approve: tell the
        human once per brain."""
        if not self.b.refused_told:
            self.b.refused_told = True
            self.io.event({'schema': EVENT_SCHEMA, 'event': 'needs_human', 'plan': None,
                           'machine': 'local', 'lead': addr, 'repo_root': None,
                           'blocker_class': None}, self.ap.dry_run)

    def status(self, now):
        """What the map shows about the brain: no prompt text, no answer text."""
        b = self.b
        return {'state': b.state, 'kind': b.kind, 'profile': b.profile,
                'pane': ('local:%s' % b.pane) if b.pane else None,
                'asked_last_hour': len([t for t in b.asked if now - t < 3600]),
                'open_questions': sum(1 for q in b.questions.values() if not q['answered']),
                'last': self.last, 'excluded': sorted(self.excluded)[:EXCLUDED_SHOWN], 'retired': self.retired}

    def act(self, q, action):
        """Run one allowed action through the daemon's own paths."""
        self.last = {'case': q['case'], 'action': action, 'plan': q['plan'],
                     'at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(self.ap.clock()))}
        loop = self.ap.plans
        if action == 'notify_human':
            self.io.event({'schema': EVENT_SCHEMA, 'event': 'needs_human', 'plan': q['plan'],
                           'machine': q['machine'], 'lead': q['lead'], 'repo_root': q['repo_root'],
                           'blocker_class': q['blocker_class']}, self.ap.dry_run)
        elif action == 'nudge_once_more' and q['plan']:
            memo = loop.memos.get((q['machine'], q['plan']))
            if memo is not None and memo.extra == 0:
                memo.extra = 1
                if memo.situation == 'plan_stalled':
                    memo.situation = None
        elif action == 'ask_lead_to_resolve' and q['plan']:
            loop.resolve[(q['machine'], q['plan'])] = q.get('blocker_key')


def remote_copy(body):
    """The map as it is left on other machines: plan content stays on the
    daemon's machine. Per plan its identity, class, blocker class, progress
    digest and counts, current task, addresses, epoch, update time and
    repository root — never its detail (summary, task list, blocker text);
    per agent no session title and no working directory."""
    out = dict(body, machines=[])
    for m in body['machines']:
        plans = []
        for p in m.get('plans') or []:
            q = dict((k, p.get(k)) for k in REMOTE_PLAN_KEYS)
            q['detail'] = None  # the summary, task list and blocker text stay on the daemon's machine
            plans.append(q)
        agents = [dict(a, title=None, cwd=None) for a in m.get('agents') or []]
        out['machines'].append(dict(m, plans=plans, agents=agents))
    return out


def clean_title(value, limit=120):
    """An agent's session title, single line, safe to show and cut (the same
    cleaner and token redactor as every free text on the map)."""
    import fleet_report
    return fleet_report.clean_text(value, limit)


def local_pane(addr):
    """The pane of an address the reporting machine calls its own, else None."""
    if isinstance(addr, str) and addr.startswith('local:'):
        return addr[len('local:'):]
    return None
