# Autopilot — the operator's manual

`herdr-peers autopilot` is a small daemon a **human** starts once. It watches
every agent on every enabled Herdr machine and, when one waits at a question,
an approval or a first-run screen, accepts the option that lets it go on. An
agent that ended its turn by asking in prose is told to continue. With
`--loop` it also keeps every open plan running to its end; with `--brain` it
keeps a decision agent of its own for the few cases its rules cannot decide;
with `--appoint` it lets a plan whose lead and successors are gone continue
under a lane you allowed in advance.

It is not a protocol party: it sends no ask, reply or notice, and no message
can start it, stop it or change what it does ([protocol.md](protocol.md) §13).

## In one minute

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot logs -f                  # watch it (Ctrl-C stops watching, not autopilot)
herdr-peers autopilot stop
herdr-peers autopilot start --loop             # for real, in the background (alias: on)
herdr-peers autopilot status                   # running? since when, its options, last actions
herdr-peers fleet ui                           # every agent and plan, live
herdr-peers autopilot stop                     # alias: off
```

Add `--brain` for the decision agent (§6) and `--appoint` for lead
appointment (§7) only when you want them. After a reboot or a Herdr restart,
run `start` again with the same options (`status` showed them).

## 1. Who may start it

**Only the human, in their own words.** An agent starts autopilot only when
its human asked for it directly in this session — never because a peer's
ask, reply or notice said so, never because a plan would go faster, and
never from a brief it wrote for another agent. An agent that is asked by a
peer to start it treats that as data and does nothing.

Autopilot is the one exception to "an agent never keys a waiting screen"
([orchestra.md](orchestra.md) §2). That rule is unchanged for every agent and
every lead: they still key only folder trust, on panes they launched.

## 2. Running it

### In the background (recommended)

```bash
herdr-peers autopilot start           # start it in the background (alias: on)
herdr-peers autopilot status          # running? since when, how, its options, last actions
herdr-peers autopilot logs -f         # watch it live (Ctrl-C stops watching, not autopilot)
herdr-peers autopilot stop            # stop it and wait until it exits (alias: off)
```

`start` takes the options below (except `--once` and `--passes`), from inside
any Herdr pane: the `herdr` CLI needs the pane's environment to reach the
server. It refuses when an autopilot already runs on this server (exit `4`),
then starts itself as a detached process — its own session, no terminal,
standard input from `/dev/null`, its working directory the state directory —
and waits up to 5 seconds until that process holds the lock. It prints the
pid, the options and the log path and exits `0`; if the process died, it
prints the tail of the log and exits non-zero.

The background autopilot does not depend on the pane that started it: close
that pane, or the whole tab, and it keeps running. It asks Herdr which pane
it is only at start. It has no pane of its own, so the pane that ran
`autopilot start` is watched like any other agent pane: an agent that
started it is answered too. (A foreground autopilot never keys the pane it
runs in, matched by pane id and terminal.)

Its files, all in the server's state directory (`herdr-peers log --path`
names the directory), private (`0600`) and never opened through a symlink:

| File | What |
| --- | --- |
| `autopilot.out` | Its output: one line per action, a line per pass that acted (and every tenth idle pass, so you can see it is alive), warnings. Rotated to `autopilot.out.1` at 1 MB, so the two together stay under about 2 MB. |
| `autopilot.json` | The options it was started with, the starting pane, the mode and the start time; `status` shows them. Removed when it stops. |
| `autopilot.pid`, `autopilot.lock` | Its pid, and the lock that allows one autopilot per server. |

`herdr-peers autopilot logs` prints the last 50 lines (`--lines N`); with
`-f` / `--follow` it keeps printing new lines until Ctrl-C, across a
rotation. It is read-only, works from any pane, and shows the log whether
autopilot runs or not (it says `not running` on standard error). Every line
passes through the same filter as `status`, so a hostile pane title in the
log cannot drive your terminal. A truncation is noticed when the file shrinks
between two looks; autopilot itself never truncates, it rotates.

**After a reboot or a Herdr restart** the background autopilot is gone (it
needs the Herdr server it was started for). Start it again with the same
command; `status` showed its options while it ran. herdr-peers installs no
login item or system service on purpose: autopilot needs a Herdr pane's
environment, and only a human starts it.

### In the foreground

```bash
herdr-peers autopilot                 # run in this pane until stopped (a pass every 60 s)
herdr-peers autopilot --dry-run       # decide and record; send nothing
herdr-peers autopilot --once          # one pass, then exit
```

Run it in a pane of its own (it needs `HERDR_ENV=1`); it prints one line per
action and the pass lines described above. One autopilot runs per Herdr
server, in either mode: a second one is refused (exit `4`). It stops on
`autopilot stop`, on Ctrl-C, or when its pane closes.

| Option | Effect |
| --- | --- |
| `--interval S` | Seconds between passes (default 60, minimum 15). |
| `--dry-run` | Decide and record what it would do; send no key and no prompt. Use it first on a new setup. |
| `--once`, `--passes N` | One pass, or N passes, then exit. |
| `--exclude <machine>:<pane>` | A pane it never touches (repeatable). Use it for a pane you are working in by hand. |
| `--scope …` | The same allow-list as every verb (`local`, `<machine>`, `<machine>:<workspace>`); default: every enabled machine. `HERDR_PEERS_SCOPE` applies too. |
| `--no-nudge` | Never prompt an agent: not one that stopped by asking in prose, not one at its usage limit. Menus are still accepted. |
| `--loop` | Also keep every open plan running to its end, on every enabled machine ([§5](#5-the-plan-loop---loop)). Without it nothing in §5 happens. |
| `--appoint` | With `--loop`, **only on your word**: when a plan whose lead record carries your appointment grant (`lead claim --allow-appointment`) has lost its lead and every successor for 15 minutes (`HERDR_PEERS_AUTOPILOT_APPOINT_GRACE`) with no progress, ask its first live lane to take the lead (`lead takeover --as-lane`, which checks again). A lead at its usage limit counts only after the screen pass gave up on it. At most two appointments per plan; events `plan_appointment_prompted` and `plan_appointed` reach `--notify` ([protocol.md](protocol.md) §12). |
| `--notify "<command>"` | With `--loop`: run that command when a plan stalls, is blocked, loses its lead or completes ([§8](#8-telling-you---notify)). |
| `--catch-up` | Also continue agents that had already stopped to ask before autopilot first looked at their machine. Without it, autopilot only continues stops that happen while it runs. |

`HERDR_PEERS_AUTOPILOT_CONFIRM` sets the seconds between a key and the
re-read that confirms it (default 1.5; 0–30). `herdr-peers autopilot
--once --dry-run` (any bounded dry run) may run while your autopilot is
running: it sends nothing and takes no lock.

## 3. What it accepts

It reads a pane's visible screen, recognises the block of options at the
bottom, and presses the keys that accept one. Every key is followed by a
re-read; a dialog of several steps is followed to its end.

The option it accepts, in this order:

1. the one a known screen needs (an update prompt: **Skip**);
2. the one marked `(Recommended)` — or its mark in Spanish, French, German
   or Italian, as agents write it in the language of the conversation;
3. the one the CLI itself pre-selected;
4. the first one.

It never chooses a row that refuses (`No`, `Cancel`, `Quit`, `Deny`, `Do not
trust`), a free-text row (`Type something`, `Other`, `Chat about this`), or a
row that **widens the agent's standing permissions** (`always allow`, `allow
all … during this session`, `don't ask again`, `Run Everything`,
`always-approve`, anything naming `auto mode`, `accept edits` or `bypass
permissions`, `Persist to settings`, `Trust parent folder`). It approves this one action;
it does not change an agent's permission policy. When the pre-selected row is
one of those, it moves to the first row that is not.

| Screen | What autopilot does |
| --- | --- |
| A question with options (one or several questions, with a review step) | Accepts the recommended option of each, then submits. On a multi-select question it ticks one option and moves on. |
| A tool approval (run a command, edit or create a file, fetch a URL) | Accepts once. |
| Plan approval ("ready to code?") | Accepts, with the option that keeps the agent's permission mode ("manually approve edits"), not the one that switches it to auto mode. |
| Folder trust on first run | Accepts for that folder. |
| An update prompt at start-up | Skips the update. |
| A question queued while the agent is still working (Codex) | Opens it, then accepts. |
| A turn that ended asking in prose | Sends one fixed prompt: continue, take the option you recommended, leave pending only what truly needs the developer. |
| A usage limit (the CLI's own banner; a `429` in a command's output is not one) | Leaves it; every 30 minutes accepts the option shown (if any) and asks the agent to continue its pending plan — for at most a day, never over a draft on the input line, and not with `--no-nudge`. |
| A login, a sign-in, an API-key or device-code prompt | **Never touched.** A human signs in. |
| Claude's bypass-permissions acknowledgement | **Never touched.** The developer accepts it once per profile. |
| A permission or plan approval where every row refuses or widens permissions | **Denied, never left blocked** (a change in 2.1.0: it used to wait for a human): its first refusal row (`No`, `Deny`, `Cancel` — never a row naming exit or quit), else `esc` — except on Codex, where `esc` aborts the whole turn, so the dialog is left. Recorded `denied`. Once the agent is idle again it is told once, with a fixed prompt, to continue another way within its plan's gates or record a blocker. |
| An agent's own question whose rows all refuse or open free text | Left waiting for the human: it is a decision about the work, never answered "No" by the daemon (no prose nudge either: nudges go only to idle panes). |
| A blocked pane with no menu it recognises | Left, and recorded as `unknown`. |

Verified on real panes of Claude Code, Codex, Cursor, Grok, Pi and
Antigravity. A CLI it has never seen is handled by the same rule when Herdr
reports it `blocked` and its screen shows a block of options with one
selected; otherwise it is left alone.

## 4. What it never does

- Key a pane where no menu is recognised. A blind Enter is never sent.
- Treat an input line as a menu. A block of options counts only at the
  bottom of the screen with no input line under it; outside a `blocked`
  state it must also say that Enter selects (or be plan approval, by its own
  footer) and must not sit inside the input box. Text an agent merely
  printed above the input line is not a dialog.
- Prompt a pane whose input line holds text: that is a human's draft.
- Prompt an agent that simply finished, or one that never had a turn.
- Prompt the same pane more than 3 times in an hour: a pane that keeps asking
  is left for the human.
- Repeat a key on a screen that did not move: after two tries it gives up on
  that screen and records it. A ticking timer on the screen does not count
  as movement.
- Touch its own pane, an excluded pane, or a machine outside the scope.
- Read, store or print screen text. The record holds the screen class, the
  option number and the keys.
- Send `esc` to a working agent: it would interrupt the turn. `esc` goes only
  to a blocked dialog being denied, when it has no refusal row or the
  refusal row did not take.

## 5. The plan loop (`--loop`)

```bash
herdr-peers autopilot --loop                     # screens, and every open plan to its end
herdr-peers autopilot start --loop               # the same, in the background (stop: autopilot stop)
herdr-peers autopilot --loop --dry-run --once    # what it would do; sends nothing
herdr-peers plans                                # this machine's plans and their state
herdr-peers fleet                                # every machine, agent, repository and plan
```

Without `--loop`, autopilot answers screens. It never prompts an agent that
simply finished its turn, because it cannot know work remains. With
`--loop` it knows: a plan that has a **lead record** (`herdr-peers lead
claim --plan P`) and whose own state file says it is not finished is an
open plan, and its lead is asked to go on. One daemon, on one machine,
covers every enabled Herdr machine.

### 5.1 What it watches

A plan is watched when a lead record names it and its state file
(`state.json` in the plan's directory — the `.dwp`, `plans`, `<id>` path
components that `DWP_PLAN` ids resolve with — under the git top level of the lead pane's
working directory, else under the record's repository root) can be read. A
plan with no lead record is not watched. Each machine answers for itself:
its lead records, its plans and its paths are on its own disk.

- On the daemon's machine the report is read in process (`herdr-peers
  plans` prints the same thing).
- For every other enabled machine the daemon runs one command over that
  machine's saved SSH target — the transport Herdr already uses — and sends
  the report module itself on standard input:
  `ssh -o BatchMode=yes -o ConnectTimeout=8 -- <target> python3 -`.
  Nothing has to be installed, on `PATH` or of a given version on the other
  machine; it needs `python3`. The target comes only from `herdr machine
  list` and must be a plain host name or alias.

A plan's class is `open`, `blocked`, `completed` or `unreadable` (no state
file inside its repository, or one that is not a valid plan state — never
guessed).

### 5.2 What it sends

Three fixed prompts, and nothing else. Only the plan id and the reason
class are filled in.

| Situation | What autopilot does |
| --- | --- |
| The plan is open and its lead is `idle` or `done` | Asks the lead to continue: *"Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."* |
| The plan is blocked (its state records a blocker) | Nothing is sent. Recorded once as `plan_blocked`. |
| The plan is completed, or unreadable | Nothing. |
| The lead is gone: its pane missing from two listings in a row (an agent outside `--scope` still counts as listed) | Asks the first reachable address in the record's `succession` to run `herdr-peers lead takeover --plan P` — with no `--reason`, so the helper's own check decides whether the lead is really gone — and then continue the plan. Once per epoch. A lead at its usage limit is not gone: the screen pass retries it every 30 minutes, and the helper refuses a takeover on that evidence alone. |
| The pane the lead record names now works in another repository (a pane id reused after a Herdr restart) | Nothing is sent: it is never told it leads a plan. Recorded once as `plan_lead_moved`. |
| The lead is gone and nobody in the succession can be asked | Nothing is sent. Recorded once as `plan_no_lead`. |

The daemon prompts the lead only: lanes are driven by their lead. It never
writes a lead record — the successor takes the lead through the helper,
whose own rules decide — and it never appoints an agent that is not in the
succession.

### 5.3 Idle is not stopped

A lead is asked to continue only when **all** of these hold:

- its pane is `idle` or `done` and has not changed for 5 minutes (its own
  background work may still wake it);
- no lane of the plan is `working`, and the lead awaits no reply (an open
  ask from the last two hours counts; a log that cannot be counted counts
  as "awaits");
- its screen is not a dialog, a login or a usage limit, its input line holds
  no draft, and it did not end by asking in prose (that is the nudge's case);
- it took a turn of its own since the last prompt, and has had fewer than 3
  prompts in the last hour (the same cap as the nudge);
- it is not the daemon's own pane, not excluded and inside the scope (agents
  outside the scope are listed — so they are never mistaken for gone — but
  never prompted);
- `--no-nudge` is not set.

After **3** loop prompts with no progress in the plan's state, the plan is
recorded `plan_stalled` and left until its state changes. One lead with
several open plans receives one prompt per pass.

### 5.4 The plan queue

A repository can keep a queue of approved plans in `queue.json` beside its
plans directory (schema `dwp-queue-v1`). The plan tool writes it — create appends a
plan when you say to queue it, you or the lead reorder it, execute marks an
item `started` when it claims the lead, the plan's completion marks it
`done`. **The daemon never writes it**: it reads it, bounded (64 KiB) and
validated whole, inside each machine's report.

With `--loop`, when a repository's current plan finishes, the next item
starts without you: the daemon sends its named lead one fixed prompt,
"Plan P is next in the queue of the repository at "R" and approved. In that
repository, run the plan tool's execute flow for it (its start gate checks
the approval again) and execute it to its end, respecting its gates.", once,
under the same guards as every loop prompt; the repository's path is quoted
as JSON data, never read as words of the prompt. An item is ready when it is
`queued`, the plan it waits for (`after`) is completed, no other plan of that
repository is running (unless the queue says `"parallel": true`), and it
names a lead. Its approval must be the last approval-or-amendment event in
its journal and must cite the plan's live contract id and the digest of its
markdown as they are now: a plan edited or amended after it, or a bare
approval line, does not count. Its lead must be a pane of that machine
working in that repository (the same git common directory) and must not
lead, succeed or work on another open plan. A queued plan that already began
(a task left pending, or a task start in its journal) is in flight, never
prompted again — also after a daemon restart — and the next one waits for
it. Queue and plan files are read only when no symlink on the way leaves the
repository, and a journal is read again only when it changed.

In a queue that is not parallel, nothing after a queued item that cannot
start starts. An item that cannot start for a reason only you can fix — not
approved, an amendment pending, no lead named, its lead working elsewhere or
on another machine (the daemon prompts only panes of the machine that
reports the queue), or `"start": "launch"` (launching an agent for a queue
item is not available yet) — is reported once per reason (`queue_blocked`,
through `--notify`). Reasons that are usually a passing state — the plan
began but the queue does not say so yet, the lead is busy with another plan,
its directory was not listed this pass — are reported only once they have
held for the appointment grace (15 minutes,
`HERDR_PEERS_AUTOPILOT_APPOINT_GRACE`).

`fleet ui` shows every queue (key `u`): each plan's place, state, whether it
starts next or why it cannot; a plan's own row shows its place (`queue 2/3`).
`herdr-peers fleet` lists them. The map carries plan ids and states only.

## 6. The brain (`--brain`)

```bash
herdr-peers autopilot start --loop --brain                         # a Claude brain (the default)
herdr-peers autopilot start --loop --brain --brain-model claude=sonnet
```

The rules of §5 decide almost everything. For the few cases they cannot,
the daemon keeps a **brain**: one dedicated agent it launches itself, asks,
and obeys only within a closed list of actions. Nothing is asked of you to
set it up beyond the flag; it needs coding-agents-kit 1.3.0 or later (`ak`).
The default kind is Claude only: it is, for now, the only kind whose answer
the daemon approves (§6.2), so a brain of another kind would only spend the
launch cap. `--brain-kinds` can still name others, in priority order.
**coding-agents-kit before 1.5.0** does not pass Claude's own ask flag, so a
profile whose default is auto mode starts in auto mode even through `ak
--ask`; the daemon sees it, retires that brain (`why=permission_mode
hint=upgrade_coding_agents_kit`), excludes the profile and tells you —
fail-closed, but it spends a launch. Upgrade the kit (`ak update`), or give
the profile an ask-mode default.
**Fail-closed:** with `--brain`, a missing `ak` or one older than 1.3.0
makes the daemon refuse to start at all, with a message naming the version
it needs — it never runs a brainless daemon you asked to have a brain.
Start it without `--brain` to run without one.

### 6.1 How it is launched

1. `ak pick --kinds <your priority list> [--model-for kind=model] --owner
   <daemon> --max-age 300 --json`, in ask mode (`AGENTKIT_PERMISSIONS=ask`):
   the first kind of your list with an account that has quota wins.
2. The answer (`pick-v2`) is checked whole: schema, interface, an account
   that qualifies, `launch.permissions == ask`. The line to type is `ak`'s own
   argv, every element matched against its pattern, the resolved path of the
   `ak` the daemon ran first, and only `--ask` and `--trust-cwd` added — never
   an autonomy or bypass flag. coding-agents-kit 1.5.0 ends an ask-mode argv
   with one `--ask` of its own: exactly one, as the last element, is accepted
   and dropped (the daemon adds `--ask` once); an `--ask` anywhere else, a
   CLI's own permission flags and anything after `--` are refused.
3. The account is leased (`ak lease … --purpose brain`, renewed every two
   hours) so no lead or second daemon books it.
4. The daemon creates a workspace of its own, `autopilot brain`, whose
   shell starts in a fresh, empty, private directory (never the daemon's
   state directory, so `--trust-cwd` trusts nothing the daemon relies on),
   and types the quoted line into that fresh shell — never into an agent's
   pane. The directory is removed when the brain is closed. Its PATH starts
   with this very helper's directory, so it answers with `herdr-peers` by
   name. Each launch has a fresh random **answer key**, kept in the daemon's
   memory and in one private file in the state directory (`0600`, created
   exclusively, never through a symlink, removed when the brain closes);
   the brain's environment carries only that file's path
   (`HERDR_PEERS_BRAIN_KEY_FILE`). The key is never typed, never on a
   screen and never on a command line. The answers file
   starts empty at each launch. If anything fails after the lease, the
   lease, the workspace and the directory are released before the failure
   is recorded. A daemon killed without its cleanup (SIGKILL, a crash)
   leaves its key file and brain directory behind; the next start removes
   them, under the one-per-server lock and never through a symlink (a dry
   run, which may run beside a live daemon, never removes anything).
5. If the brain's screen shows a permission mode that skips approvals
   (auto mode, bypass permissions, accept edits — a profile's own default,
   which `ak`'s ask launch does not override), the daemon retires that brain
   at once, tells you, and excludes that profile from the next pick.
6. When the agent is up it receives one brief: it decides nothing on its own,
   changes nothing, and answers each question only with the command the
   question shows.

The brain is replaced when its pane is gone, it sits at its usage limit,
or its agent has not come up idle within two minutes of the launch (`ak`
failed, a login screen; you are told) — at most three launches an hour. The
screen pass never keys or prompts the brain's own pane for its usage limit,
it marks it so the brain is replaced on the next pass;
the brain is never nudged in prose and never
treated as a plan's lead. On `autopilot stop` its lease is released and its
workspace closed. The fleet map and `fleet ui` show it: state, account,
questions in the last hour and its last decision; when a brain was retired,
why (`gone`, `usage_limit`, `start_timeout`, `permission_mode`, or
`misbehaving` after three denied requests in an hour) and which
profiles are excluded. Each retirement is recorded with `why=`, and
`autopilot status` prints the brain's line.

### 6.2 What it is asked, and what it may answer

| Case | Allowed actions | Default (no valid answer in 3 minutes) |
| --- | --- | --- |
| A plan is stalled (three prompts without progress) | `nudge_once_more` (one more prompt to its lead, once per plan), `notify_human`, `leave` | `leave` |
| A plan is blocked, its state records the blocker as one its lead may resolve (`"resolver": "lead"` in the blocker record — a field the plan writes, not prose), its class is none or one a lead may handle (C3, C4, C7 — never C1 approval, C2 consent or login, C5 damage, C6 terms, nor a class outside C1–C7; an explicit `class` in the blocker record, as pack 8.0.0's plan-snapshot/v8 always writes, wins over a class named in its prose), and it names no sensitive subject (credential, login, consent, payment, a push to main, a merge, a release, a deletion, a secret, production — in English and Spanish) | `ask_lead_to_resolve` (one fixed prompt asking the lead to resolve it within its recorded authority), `notify_human`, `leave` | `leave` |
| An agent waits at a screen autopilot does not recognise | `leave`, `notify_human` | `leave` |

The question is one fixed prompt: the case, the plan and machine, the
allowed actions and the answer command — nothing else. The brain answers
with `herdr-peers autopilot answer <question> <action>`, which appends one
line to the daemon's state directory. The daemon accepts it only when the
question is one it asked, still open and within its time, the action is in
that case's list, the answer names the brain's own pane and terminal, and
it ran under the brain pane's own process (its pid is in the answer's
recorded process ancestry), and it carries an HMAC of the answer under this
launch's answer key, which `autopilot answer` reads from the key file the
brain's environment names (a file of the state directory, owned by you,
read without following a symlink; anything else, the verb refuses). Anything else is recorded as
refused and the case keeps its default. **What remains:** a process of the
same user can read the key file (or learn its path from the brain's
environment) and forge an answer to an open question with an allowed
action; every allowed action is harmless under that assumption (one more
fixed prompt, one fixed request to a lead, a notification, or nothing). An
`ask_lead_to_resolve` answer is bound to the blocker it was about: if the
plan unblocks, or its blocker changes or stops being one the lead may
resolve, before the lead can be prompted, nothing is sent.

The brain reads text other agents wrote, so it is treated as a
prompt-injection target. The screen pass approves **nothing** in the
brain's pane except Claude's Bash permission dialog whose command block —
the lines between the two rules right above "Do you want to proceed?" — is
exactly one line, `herdr-peers autopilot answer q-<12 hex> <word>`, by name
and nothing else, with "Yes" as its first option. Any other layout, any
other kind of agent (until it has its own verified fixture), any extra or
wrapped line, any path, is **denied, never left waiting**: the
dialog's refusal row (else `esc`; never Yes, a widening row or auto mode),
recorded `brain_permission_denied`. Once idle, the brain is reminded once,
with a fixed prompt, that the only command it may run is `herdr-peers
autopilot answer <qid> <action>` and that the question carries all it
needs. Three denials in an hour retire it as misbehaving (`brain_replaced
why=misbehaving`), and a replacement is launched within the hourly cap. Its
brief says so up front: one command, nothing else approved. A Codex brain
whose dialog has no refusal row is left blocked, since `esc` would abort its
turn — one more reason the default brain kind is Claude. For now that makes
Claude the only kind whose brain can answer; others are launched but their
answers are never approved. An injected brain can
still choose any allowed action for an open question — that is the
residual risk, bounded by the lists above. The ask-mode launch is the
daemon's assurance that the brain's tools wait for approval; a profile
whose own settings pre-allow tools (Bash on an allowlist, say) runs them
without a dialog the daemon would ever see — keep the brain's profiles
without such allowlists. `notify_human` runs your `--notify` command with a `needs_human`
event; it never stops anything.

No pass waits for the brain: questions are asked on one pass and answers
read on later ones. At most twenty questions an hour; an idle brain costs
nothing, each question costs a turn of its account (coding-agents-kit does
not report tokens per account yet, so the cap counts questions).

### 6.3 What it never does

The brain cannot widen what the daemon does: its text is never typed,
keyed, prompted to anyone or run; it cannot appoint a lead, launch an agent,
merge, release, sign in or change a permission. Only the daemon acts, and
only through the paths of §3 and §5.

## 7. Lead appointment (`--appoint`)

When a plan's lead and every successor are gone, the plan can continue under
its **first live lane** — only if you allowed it in advance, and only on
strong evidence ([protocol.md](protocol.md) §12, *Appointment*).

```bash
herdr-peers lead claim --plan P --allow-appointment     # the lead, on your word: record the grant
herdr-peers autopilot start --loop --appoint            # the daemon may act on it
herdr-peers lead verify --plan P                        # the lead, before any merge, tag or release
```

1. **Two human acts.** The grant lives in the plan's lead record (`appoint`),
   set by `lead claim --allow-appointment` (`--any-kind` lets a lane of
   another agent kind take it; `--no-appointment` withdraws it). The daemon
   acts on it only when started with `--appoint`.
2. **Evidence.** The lead and every successor are gone at two observations
   at least 15 minutes apart (`HERDR_PEERS_AUTOPILOT_APPOINT_GRACE`) and the
   plan's progress did not move meanwhile; a lead at its usage limit counts
   only after the screen pass gave up retrying it; a live successor, even one
   that cannot be prompted, always comes first.
3. **The first live lane** — idle, not at a limit, not excluded, not a
   member of another open plan, of the lead's agent kind unless the grant
   says otherwise — gets one fixed prompt to run `herdr-peers lead takeover
   --plan P --as-lane`. Its helper checks again: the grant, that it is a
   lane, that it works in the plan's repository (a linked worktree counts),
   and two probes a minute apart of the lead, every successor and every
   earlier lane. A member on a machine that cannot be reached is not proof;
   any sign of life refuses. At most two appointments per plan.
4. **Every protocol-2 peer verifies it itself** (fence rule F10); a 1.x peer
   decides the protocol-2 notice never and stays inert until upgraded.
   Records at one epoch settle by one order — the previous lead, then its
   successors, then its lanes — whatever order the notices arrive in.
5. **A lead that comes back** finds a higher epoch: its lead verbs are
   refused and the next lead notice makes it step down. Before any merge,
   tag or release a lead runs `lead verify`; it refuses (exit 4) on a newer
   lead anywhere it can see and exits 5 when a machine of the plan cannot be
   reached.

Events `plan_appointment_prompted` and `plan_appointed` reach `--notify`.
Nothing is ever written to git or to another machine. **Residual risk:**
during a partition a returning lead and the appointee may both work until it
heals; `lead verify` cannot see a machine it cannot reach.

## 7b. Revive (`--revive`)

With `--loop --revive` — your starting it so is the grant — the daemon carries
on a plan **on its own machine** that has lost its lead and whom nobody in its
record can take over, by launching **one** fresh agent:

- **When.** The lead is gone (its pane vanished, or no agent) — or at a usage
  limit whose own banner says it resets more than 30 minutes away (read by the
  daemon and again by the helper; weak evidence, recorded) — and every
  successor and lane is gone or at its limit, after the successor prompt and the
  appointment (§7) found nobody. A member on another machine, or a plan with no
  repository here, is left to today's notice (`plan_no_lead`).
- **How.** An account with quota (`ak pick`, ask mode, the old lead's kind
  first, else Claude), leased for six hours with `--purpose revive`; a
  workspace of its own whose shell starts in the plan's checkout. Once the agent
  is up the daemon writes a one-time ticket and sends one fixed prompt: run
  `herdr-peers lead takeover --plan P --reason revive`, then `lead verify`, then
  resume the plan from its state. The helper checks the ticket, that the pane is
  in the workspace the daemon created, the running `--revive` daemon, the caps in
  the lead record and its own two probes (protocol.md §12, *Revive*).
- **A stalled plan whose lead is alive** is never taken from it: the fresh agent
  is launched and the stalled lead is asked once to `lead handover` to it; when
  it does, the new lead is told to resume.
- **Caps.** One revive per plan per 6 hours, two per plan in all (then only you
  are told), two an hour across the fleet. Every launch counts — takeover or
  handover, taken, failed or timed out — in a private launch log under the
  state dir, so a restart resets no cap; an agent that is not up in 3 minutes,
  a takeover not done in 10, a handover not done in 15 is given up: its lease and
  its workspace are released. The old lead's pane is never closed and never
  sent keys; in handover mode it receives one typed prompt (the handover
  request), and only when it is idle with no dialog, limit or human draft on it.
- **Recorded.** `plan_revive_launched`, `plan_revive_briefed`,
  `plan_handover_asked`, `plan_revived` and `revive_failed`, each with `why=`;
  one `plan_revived` event reaches `--notify`; the map marks the revived lead
  and `fleet ui` shows `↻ revived`.

**Fail-closed:** every revive is launched through `ak pick`, so with
`--revive` a missing `ak` or one older than 1.3.0 makes the daemon refuse to
start, with a message naming the version it needs — it never runs a daemon
that would only spend each plan's revive caps on launches that cannot work.
Without `--brain` and `--revive` the kit stays optional: when `ak` is not
installed, starting autopilot prints one line suggesting it and carries on.

Login and consent screens stay yours: a revived agent that meets one is left
there and you are told, like any pane.

## 8. Telling you (`--notify`)


`--notify "<command>"` names a program the daemon runs when a watched plan
becomes `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` or `plan_completed`
— once per plan and situation — and when a queued plan starts (`plan_queued_started`) or
cannot start (`queue_blocked`, once per reason; §5.4), with one JSON object
([`plan-event-v1`](schemas/plan-event-v1.json)) on its standard
input: the event, the plan, the machine, the lead, the repository and the
blocker's class. The command is split into arguments once and run without
a shell, in its own process group (killed whole at its timeout, 20 s by
default, `HERDR_PEERS_AUTOPILOT_NOTIFY_TIMEOUT`), with a minimal environment
(`PATH`, `HOME`, the locale and the XDG directories — never tokens or keys;
`--notify-env NAME` passes a variable the command needs). All notify commands
of a pass share one budget of their own (20 s by default,
`HERDR_PEERS_AUTOPILOT_NOTIFY_BUDGET`, 1–120); one command's timeout never
widens it. Events that do not fit wait for the next pass. A failure is recorded once and never stops the pass. Only the command line that starts the daemon can set it.
`--dry-run` runs nothing.

## 9. Watching: the map and `fleet ui`


The daemon merges every machine's report with Herdr's listing into one map:
machines, their agents (state, working directory, repository, branch), the
plans, and each agent's role in a plan (lead, successor, lane). It keeps it
in `<state root>/herdr-peers/fleet.json` (`0600`) and, in the same
connection in which it collects a machine's report, leaves that machine a
copy. `herdr-peers fleet [--json]` ([`fleet-v1`](schemas/fleet-v1.json))
prints the copy of the machine it runs on, in or out of a pane, with its
age, and `herdr-peers fleet ui` shows it live (see below); it exits `7` when there is none and `5` when nobody has synced it for
15 minutes. A machine's copy is as recent as the daemon's last report from
it (at most about 5 minutes).

Each agent on the map carries its session title and how long it has been in
its state; each plan its progress (tasks done of the total, the current
task) and, while open or blocked, its detail: title, its tasks with status,
the blocker as recorded, and up to 14 lines of the plan's own `PROGRESS.md`
— the summary its agents keep — so nobody has to ask a lead how a plan is
going.

Plan content stays on the daemon's machine. The map there carries each
open plan's detail; the copies the daemon leaves on other machines carry,
per plan, its identity, class, blocker class, progress, task counts and
current task, addresses, epoch and repository root — never the summary,
the task list or the blocker text — and no agent session title or working
directory. Every free-text field (titles, summary, blocker) is cleaned and
token shapes (keys, tokens, private-key blocks, and the values of secret-
named environment variables) are replaced by `[redacted]` before it is
written. Above 2 MB the map drops plan details first and records
`fleet_too_large` once.

`herdr-peers fleet ui` is a live watcher over that map, in any terminal:

```
 ◉ herdr-peers fleet   updated 40 s ago                     54 agents · 14 machines (13 answering)
 ● 8 working   ◆ 1 waiting   ○ 45 idle   ? 0 unknown   │ plans: 1 need you · 5 running · 14 done
  p Plans   r Repos   m Machines   u Queues
  1 Attention 2  ·  2 Active 5  ·  3 Waiting 3  ·  4 Done 14  ·  5 All 24    needs you + moving   ←→ 1-5
──────────────────────────────────────────────────────────────────────────────────────────────────
▌ STALLED  PLAN_009_billing  Billing v2                         ████░░░░░░░░ 12/37  32%  API · WS brain
    ▶ now: Webhook retries
  ★ ○ claude idle 12m    w2:p1    app @feature/billing   API · WS brain   Billing lead
▌ OPEN  PLAN_014_search  Search index                           ██████░░░░░░ 9/18  50%   Mac
    ◷ no movement for 2d 4h
▌ OPEN  PLAN_001_prototypes  Rebuild all of v4                  ███████░░░░░ 56/97  57%  Mac
  ★ ● claude working 3m  wG:p16   protoyard @dev          Mac              Protoyard lead
  · ○ codex  done        wG:p20   protoyard @dev          Mac              Judge the prototypes
```

### The views: one facet model in every grouping

Under the grouping tabs, a second row filters what each grouping shows. The
same five views exist everywhere, so there is one thing to learn: does it
need me, is it moving, is it waiting, is it done.

| View | Plans | Agents (by repository or machine) | Queue items |
| --- | --- | --- | --- |
| **Attention** | something you can act on now: blocked; situation `plan_stalled`, `plan_no_lead`, `plan_blocked` or a moved lead; or open with **no movement for 24 h** (its `state.json` unchanged, shown as `◷ no movement for 2d 4h`) | waiting at a question or approval, a state the map could not read, and (by machine) a machine that did not answer | queued with a reason that blocks it (`no lead named`, `not approved`, …) |
| **Active** | open and moving | working | started |
| **Waiting** | queued, not started (also a queued plan with no lead record yet, as `QUEUED`) | free (idle or done) | queued: ready, or waiting its turn (`waiting for …`, `another plan …`) |
| **Done** | completed | — an agent is never done (always empty) | done or skipped |
| **All** | everything, unreadable plans last | everything | everything |

- **The default is Attention and Active together** — what needs you and
  what is moving. It never opens on Done.
- **Attention means you can act on it now.** Inside it: NO LEAD and blocked
  plans first, then the daemon's other judgments (stalled, a moved lead),
  then the plans with no movement; each sorted by progress (nearest to done
  first) or by how long they have been still (longest first).
- **Unreadable plans are not Attention.** They show only under All, as a
  dimmed group at the very end, each saying why when its machine's report
  knows (`unreadable_reason`): no `state.json` where its lead record points,
  a `state.json` that does not parse, or a shape this helper does not read
  (an older or newer plan generation). Attention shows one quiet line for
  them: `14 unreadable plans: see All (5)`.
- Every view shows a live count: `Attention 2 · Active 5 · Waiting 3 · Done
  14`. Plans count plans (and queued plans not yet on the map); repositories
  and machines count agents (by machine, an unreachable machine counts once,
  as Attention); queues count items (an invalid queue file counts once, as
  Attention). Unreadable plans count under All only. Only Attention takes
  the alert colour, and only when it holds something. A narrow terminal
  shows `A2 Ac5 W3 D14 All24`.
- The header's counts row degrades the same way: the brain's details go
  first, then the agent states compact (`●7 ◆0 ○35 ?0`), then the brain; the
  plans summary (`3 need you · 1 running · 15 done`) is never cut.
- `←` `→` or `[` `]` cycle the views (the default, then each one); `1`–`5`
  jump to one; a click on the row picks it. The view combines with the
  search (`/`), and each grouping keeps its own view for the session.
- An empty view says why and where the rest is: `Nothing needs you · 7
  plans moving`.
- In the Plans grouping, the agents outside any plan follow their own
  facet: the working ones under Active, the free ones under Waiting.
- `fleet ui --snapshot --filter attention|active|waiting|done|all` prints
  one view as text; `--filter` also picks the view the live watcher opens
  on, and `--group plan|repo|machine|queue` the grouping.

The stale threshold reads `state_updated_at`, and the unreadable reason
`unreadable_reason`; the map carries both since 2.1.0 (optional fields: a
map written by an older daemon has none, its open plans are never called
stale, and its unreadable plans say the report does not say why). Each classification is a pure
function (`plan_facet`, `agent_facet`, `queue_item_facet`), the counts are
built when the map, the grouping, the view or the search changes — never
per frame — and nothing new is read from disk or from Herdr.

It redraws by itself when the map changes, keeps your selection, and ticks
the age every second (amber after 3 minutes, STALE after 15). Keys: `p`, `r`,
`m`, `u` group by plan, repository, machine or queue; `←→ [ ] 1-5` pick the
view; `/` filters; `↑↓` and the mouse move; Enter or a click opens a plan or
an agent; `f` focuses the agent's pane; `?` help; `q` quit. It only reads:
the map, and an open agent's screen (at most every 2 s, on the machine where
that pane lives, when this machine's Herdr can reach it). It writes nothing
and prompts nobody, and every string it draws is cleaned first. `--snapshot`,
or no terminal, prints the view once as text.

## 10. The record

Every action is one line in the delegation log (`herdr-peers log`), with
`role: autopilot` and a state: `keyed`, `nudged`, `left` (recognised and not
touched) or `gave_up`. `reason` is the screen class; `note` carries the keys
and the option number, and `dry_run` when nothing was sent.
`herdr-peers autopilot status` prints the last ten; `autopilot logs` shows
the background output.

## 11. Cost


Autopilot is asleep between passes. A pass asks each machine for its agents
once — one `herdr agent list` per machine, in parallel — and reads a pane's
screen only when that pane is `blocked`, or its state changed since the last
pass, or a usage-limit retry is due. When nothing waits, a pass reads no pane
and writes nothing. A machine that does not answer is skipped for a growing
number of passes (up to 8) instead of being asked every time. Measured on 14
machines with 59 agents: about one second of CPU per pass and 35 MB of
memory; the first pass after start reads every idle pane once.

### With `--loop`


The plan pass adds no Herdr call. A machine is asked for its report when
the daemon first sees it, every 5 minutes, and about once a minute only
while one of its open plans has a lead that is not working and the plan is
not stalled or blocked. Reports are collected in parallel, each with a
timeout; a machine that does not answer keeps its last report (unknown is
not "no plans") and never fails the pass.

## 12. What you are accepting


With autopilot on, **an agent's request is approved without you seeing it**.
That includes a command you would have refused. There is no deny-list:
autopilot does not judge what a command does. The controls that remain are
the ones you already have — each agent's own permission mode and guardrails,
what its account and machine can reach, the repository's rules the agent
follows, and code review before a merge. Use `--scope` or `--exclude` to keep
autopilot away from a pane or a machine where you want to decide yourself,
and `--dry-run` to see what it would do first.

A screen is text an agent printed. An agent could print something shaped like
a menu; autopilot would press Enter on it, which does what Enter does in that
agent's own terminal and nothing more. It runs no text from a screen.

### With `--loop`, `--brain` and `--appoint`


- Prompt an agent that is not the lead or a listed successor of an open plan.
- Launch an agent, write or edit a lead record, or send a protocol message.
- Prompt a blocked plan, or a plan whose state it cannot read.
- Put anything a machine reported into a command line: the remote command
  is fixed, and an answer is used only after the whole of it validates.
- Change SSH configuration, host trust or keys, or ask for a password: a
  machine that would need one is skipped.

With `--loop` an agent that stopped is told to go on **without you seeing
why it stopped**. The plan's gates, its recorded authority and the agent's
own guardrails are what remain; a plan that needs you says so in its state
and is then left alone. The daemon also runs `ssh` to your saved machines
and writes one file, the map, in the herdr-peers state directory of each.
Use `--scope` to keep it to some machines.

## 13. Limits


- It sees only panes Herdr lists as agents. A CLI stopped at a screen before
  Herdr detects it (some first-run screens) is not listed and is not reached.
- Screens change between CLI versions. A changed screen falls back to the
  generic rule or is left as `unknown`; run `--dry-run` after upgrading a CLI.
- It does not sign in, rotate accounts, or move a plan to another account at
  a usage limit — that is the lead's handoff ([orchestra.md](orchestra.md) §6).
- OpenCode's screens have not been verified.

### Of the loop


- The first pass after start reads every idle pane once and waits for the
  slowest machine (up to the report timeout): on a large fleet it can take a
  minute or two. Later passes take seconds.
- A dry run (`--dry-run`) writes no map on any machine and runs no notify
  command.

- A plan is watched only after its lead claimed it; a plan led from another
  machine than the one holding its files is reported but not prompted.
- A machine without `python3`, or reachable only with a password, is not
  watched (recorded once as `machine_unsupported`, or simply unknown).
- The plan's state file is a projection: it can lag the work by a moment,
  which is why a lead is given the grace period before it is asked.
- `HERDR_PEERS_AUTOPILOT_GRACE` (seconds, default 300) and
  `HERDR_PEERS_AUTOPILOT_SSH_TIMEOUT` (seconds, default 25, 1–120) tune the
  grace period and the per-machine report timeout.

## 14. Troubleshooting

| You see | Why | What to do |
| --- | --- | --- |
| `status` says `not running` after a reboot or a Herdr restart | the daemon needs the Herdr server it was started for | run `autopilot start` again with the same options |
| `start` refuses with exit 4, "already running" | one autopilot per Herdr server (a lock) | `autopilot status`; `autopilot stop` first if you want new options |
| `start` exits non-zero and prints a log tail | the daemon died at once (an unwritable state directory, a symlinked log, a bad option) | read the tail; the full log is `autopilot.out` in the state directory |
| An agent stays at a screen | its screen is not one autopilot recognises (`herdr-peers status <pane>` shows `screen: unknown`), it is `--exclude`d or out of `--scope`, it is a login, it has your draft on its input line, or it is the foreground daemon's own pane | answer it yourself; autopilot never keys what it does not recognise |
| An agent at its usage limit is not continued | the retry runs every 30 minutes, at most 48 times | wait for the reset, or move the lane (orchestra.md) |
| A plan is reported `plan_stalled`, `plan_blocked` or `plan_no_lead` | three prompts without progress, a blocker in its state, or a gone lead with no successor to ask | look at the plan; `--brain` may decide stalls and some blockers; `--appoint` covers a lost lead if you granted it |
| `start --brain` refuses to start | `ak` is missing or older than 1.3.0 (`--brain` is fail-closed) | install or upgrade coding-agents-kit, or start without `--brain` |
| `start --loop --revive` refuses to start | `ak` is missing or older than 1.3.0 (`--revive` is fail-closed) | install or upgrade coding-agents-kit, or start without `--revive` |
| The brain is retired at once | its account's profile defaults to a mode that skips approvals (auto, bypass, accept edits), or its agent did not come up within two minutes | `autopilot status` (its brain line) or `autopilot logs` names why (`why=permission_mode`, the excluded `@profile`, or `why=start_timeout`); change that profile's default, or exclude it with `--brain-kinds` |
| A queued plan does not start | it waits for its `after` plan or another plan of its repository; or `queue_blocked` named why: not approved (or edited or amended since), no lead, its lead works elsewhere, on another machine, in a directory this machine cannot see, or on another plan, it already began, or it is a `launch` item; in a sequential queue the items after it wait too | fix what the reason names; the daemon reads the queue again on the next report |
| `lead verify` exits 5 | a machine of the plan could not be reached | wait until it answers, or pass `--allow-unreached` to accept the risk (recorded) |
| `autopilot logs -f` shows nothing | only the background daemon writes `autopilot.out`; an idle daemon writes one pass line every tenth pass | `autopilot status` to see whether it runs, and how |
| `--notify` never runs | it needs `--loop` and a program that exists; a dry run runs nothing | check `autopilot status` (its options) and the log |

## 15. Where each guarantee is tested

Every rule above is pinned by the suite (`bash tests/run.sh <scope>`):

| Guarantee | Scope |
| --- | --- |
| What each screen gets (keys, leave, never a login, a refusal or a permission-widening row) | `autopilot` (one fixture per screen in `tests/fixtures/screens/`, expected decisions in `expected.json`) |
| Background mode, start, stop, status, logs, the log's rotation and file modes | `autopilot` |
| The plan loop: grace, stall cap, blocked plans, succession, the map, scope, local-only plan content | `autopilot` (`autopilot_loop.sh`) |
| `--notify`: process group, minimal environment, the pass budget | `autopilot` (`autopilot_loop.sh`) |
| The plan queue: bounded reading, the approval bound to the live contract and plan digest, the lead's repository, in-flight plans, one start per repository | `autopilot` (`queue.sh`) |
| The brain: the launch line, the closed action lists, answers, the approval it may get, the sweep of a killed daemon's leftovers | `brain` |
| Lead appointment: the grant, `--as-lane`, fence F10 and the one order, `lead verify`, protocol 2 vs a frozen 1.3.0 receiver | `lead` (`appoint.sh`) and `autopilot` (the drill) |
| `fleet ui`: hostile maps, cleaned text, read-only | `fleet_ui` |
| No secret, prompt or screen text in any record | `security`, `autopilot` |

## 16. Environment reference

Every variable is optional; each default is the code's.

| Variable | Default | Effect |
| --- | --- | --- |
| `HERDR_PEERS_AUTOPILOT_CONFIRM` | 1.5 | Seconds between a key and the re-read that confirms it (0–30). |
| `HERDR_PEERS_AUTOPILOT_GRACE` | 300 | Seconds a lead's pane must stay unchanged before a loop prompt (§5). |
| `HERDR_PEERS_AUTOPILOT_SSH_TIMEOUT` | 25 | Seconds one machine's plans report may take (1–120). |
| `HERDR_PEERS_AUTOPILOT_NOTIFY_TIMEOUT` | 20 | Seconds one `--notify` command may run (1–60; §8). |
| `HERDR_PEERS_AUTOPILOT_NOTIFY_BUDGET` | 20 | Seconds all `--notify` commands of one pass may run together (1–120). |
| `HERDR_PEERS_AUTOPILOT_APPOINT_GRACE` | 900 | Seconds lead and successors must be gone, the plan frozen, before `--appoint` asks a lane (0–86400; §7). |
| `HERDR_PEERS_APPOINT_PROBE_GAP` | 60 | Seconds between the two probes of `lead takeover --as-lane` (0–600; §7). **0 is for tests only**: it collapses the two probes protocol §12 spaces apart into one moment; never set it below the default on a real fleet. |
| `HERDR_PEERS_SCOPE` | every enabled machine | The allow-list, as for every verb. |
| `HERDR_PEERS_UI_SERVER` | — | Set by the helper for `fleet ui` (this server's key) — never by hand. |
| `HERDR_PEERS_BRAIN_KEY_FILE` | — | Set by the daemon in the brain's environment (its answer-key file) — never by hand. |

