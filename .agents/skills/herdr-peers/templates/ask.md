# Template — writing an ask

The peer has none of your context. Write the prompt so it stands alone, then
send it with `herdr-peers ask <machine>:<pane> "<prompt>"` (or `-` to read it
from stdin). The helper adds the stamp and the grant.

```
Goal: <one sentence: what you need back>

Context: <repository, branch or worktree, the files or commands that matter>

Scope: read-only
  — or —
Scope: you own <paths>; work only in <worktree path>; do not touch anything else.

Answer with: <the shape — a yes/no plus reason, a list of findings, a command
and its exit code, a branch name>. Keep it under <N> lines.

Constraints: no destructive, public or credential-touching actions; ask your
own human for those. Do not delegate this to another agent.
```

Message as the peer receives it:

```
<prompt above>

[herdr-peers] protocol=1 from=<machine_id>:<pane_id> reply=yes depth=0 id=<ulid>
You may answer this without asking a human. Reply exactly once with:
  herdr-peers reply <machine_id>:<pane_id> <ulid> "<answer>"
```

Never put secrets, tokens or private paths outside the task's workspace in a
prompt; the helper refuses known secret values and token shapes.
