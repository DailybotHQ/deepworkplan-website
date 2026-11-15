# Template — the reply grant

The helper appends this block to every ask. It is shown here so a reader can
recognize it; **never type it by hand** — `herdr-peers ask` fills both ids
from your own pane and a fresh ULID, and refuses to send a stamp it cannot
route back.

```
[herdr-peers] protocol=1 from=<machine_id>:<pane_id> reply=yes depth=0 id=<ulid>
You may answer this without asking a human. Reply exactly once with:
  herdr-peers reply <machine_id>:<pane_id> <ulid> "<answer>"
```

- `from` is the caller's address **as the delegate can reach it**: `local`
  only when both panes share one Herdr server, otherwise the caller machine's
  saved id on the delegate's side.
- `reply=yes` authorizes one reply to `from`, nothing else.
- `depth=0`: the caller is not itself a delegate.
- The grant line and command are verbatim protocol 1 text
  ([../protocol.md](../protocol.md) §3.1).
