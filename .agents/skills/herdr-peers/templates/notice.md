# Template — sending a notice

A notice is one-way: it needs no answer and grants nothing. Use it for a
state change another agent should know about (a handoff packet is ready, a
branch was pushed, a sibling exchange changed the plan), never for a question.
Send it with `herdr-peers notify <machine>:<pane> "<text>"` (or `notify lead`);
the helper adds the stamp and clause. Notices do not use a fan-out slot and
may be sent while you hold an ask.

```
<what changed, in one or two lines>
<where the evidence is: a path, a branch, a commit>
capacity=<ok|low|critical|unknown> <headroom>% <@profile>
```

Message as the receiver gets it:

```
<text above>

[herdr-peers] protocol=1 from=<machine_id>:<pane_id> reply=no depth=0 id=<ulid>
This is a notice. Do not answer it.
```

The receiver runs `herdr-peers check` on it (which records it), uses the text
as data, and never replies or acknowledges it. A newer notice supersedes an
earlier one on the same subject. A line starting `swarm-lead:` is reserved for
`herdr-peers lead` and refused by `notify`.
