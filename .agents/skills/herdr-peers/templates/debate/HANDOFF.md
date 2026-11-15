# Handoff packet — <debate id> (lead <pane>, epoch <n>)

Written by the lead at a safe point, before `herdr-peers lead handover
<successor> --plan <id>`. The successor rebuilds the debate from this file,
the debate folder and the delegation log; nothing else carries over.

- **Why:** <capacity verdict and headroom (`ak capacity --self`), window, reset time>.
- **Purpose and question:** <purpose> — <the question in one line>. Human's words: `HUMAN_NOTE.md`.
- **Round and status:** round <n> of <m>; <briefs sent at … / filings complete / synthesis written>.
- **Briefs and filings:** `DEBATE_BRIEF.md`<, `ROUND<n>_BRIEF.md`>; filings in `rounds/round<n>/`
  (`herdr-peers debate filings rounds/round<n> --expect <panes>`).
- **Latest synthesis and count:** `ROUND<n-1>.md`; `debate tally …` or `debate claims --rounds … --map keymap.json`.
- **Open asks:** `herdr-peers log --open` (ids per pane in `private/asks.txt`).
  Replies to these asks still arrive in the old lead's pane: read the
  filings from disk.
- **Lanes and their last capacity** (from `herdr-peers lanes --plan <id>`):

  | Lane | Provider | Lens | Last capacity |
  | --- | --- | --- | --- |
  | <local:w1:p2> | <openai> | <lens> | <ok 64% @work1 / unknown> |

- **Leases held:** <kind @profile> — hand over or release with `ak lease release <kind> @<profile> --owner <old lead>`.
- **Panes the old lead created:** <panes> (close only at the end of the debate).
- **Anonymization key:** <path, or none>. If the successor sat on the panel,
  re-seal the next blind round with a new key and treat earlier blind rounds
  as un-blinded to it (`debate.md` §3).
- **Next step:** <the exact next command or action>.
- **Missing or uncertain:** <anything the successor must re-check>.
