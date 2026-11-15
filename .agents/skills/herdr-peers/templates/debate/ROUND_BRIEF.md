# Round <n> brief — <debate id>

Read first: `HUMAN_NOTE.md`, `ROUND<n-1>.md`<, the anonymized filings in
`rounds/round<n-1>_anon/`, `PROPOSAL_UNDER_REVIEW.md`>. Still forbidden: <...>.
File `rounds/round<n>/<pane>.md`; reply with one line:

    rounds/round<n>/<pane>.md | <V1..Vn: AC/AM/RE> | <D1..Dn: letters> | dissent: <ids or none>
    capacity=<ok|low|critical|unknown> <NN>% <@profile or ->

## 1. Your assignment

| Pane | Role this round |
| --- | --- |
| <pane> | defend <option / thesis> against attacks <A3, A7> (assigned; argue at full strength) |
| <pane> | prosecute <option> (against your round-<n-1> lean) |
| <pane> | verify claims <C2, C5>: CONFIRMED / REFUTED / UNVERIFIABLE, with evidence |
| <pane> | cross-examine Filing_<X> and Filing_<Y>; concede at least one point |

## 2. The draft verdict package (final round)

Answer each item ACCEPT, AMEND (give the exact replacement wording) or REJECT (say why).

- V1 <...>
- V2 <...>

Decision questions:

- D1 <...> — A <...> / B <...> / C your own wording.

## 3. Ballot

Rank every option T1…Tn best first, give a confidence (0–100) and a flip
condition: the evidence that would change your first choice. File the
ballot as `rounds/round<n>/<pane>.ballot.json`, a `herdr-peers/ballots-v1`
document with your one ballot (voter = your pane id) and the brief's
options and items (`templates/debate/ballots.json`); the lead counts the
directory with `herdr-peers debate tally rounds/round<n>/` and never
retypes a ballot.

## 4. Rules

As in `DEBATE_BRIEF.md` §6–7. Length: <1,500–3,500> words.
