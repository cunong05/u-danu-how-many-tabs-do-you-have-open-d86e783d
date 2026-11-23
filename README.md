# 47

[![make.fun · u-danu-how-many-tabs-do-you-have-open-d86e783d](https://make.fun/badge/u-danu-how-many-tabs-do-you-have-open-d86e783d.svg)](https://make.fun/bounty/u-danu-how-many-tabs-do-you-have-open-d86e783d?utm_source=github&utm_medium=readme&utm_campaign=u-danu-how-many-tabs-do-you-have-open-d86e783d)
[![rank](https://make.fun/badge/u-danu-how-many-tabs-do-you-have-open-d86e783d/cunong05/u-danu-how-many-tabs-do-you-have-open-d86e783d/rank.svg)](https://make.fun/bounty/u-danu-how-many-tabs-do-you-have-open-d86e783d/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-danu-how-many-tabs-do-you-have-open-d86e783d)
[![reward](https://make.fun/badge/u-danu-how-many-tabs-do-you-have-open-d86e783d/cunong05/u-danu-how-many-tabs-do-you-have-open-d86e783d/reward.svg)](https://make.fun/bounty/u-danu-how-many-tabs-do-you-have-open-d86e783d?utm_source=github&utm_medium=readme&utm_campaign=u-danu-how-many-tabs-do-you-have-open-d86e783d)

An entry for make.fun's **"How Many Tabs Do You Have Open?"** bounty ($5 in USDC, shared by the top ten counts).

## The entry

The entry is the single number above — digits only, nothing else.

## Why 47

Forty-seven is a lived-in tab-hoarder count: not a round number, not a tiny tidy handful, and not a thousand-tab fantasy. It reads like a real browser right now — docs half-read, a recipe left open since Tuesday, three "read later" articles, a flight search, a half-written message, and the tabs behind the tabs. Surprising enough to raise an eyebrow, believable enough to be honest.

## How it works

`main.ts` (Node 22+, stdlib only, no network, deterministic) writes exactly the number `47` — 2 bytes, no trailing newline — to `$OUTPUT_DIR/entry.txt` (default `/output`):

```sh
OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

## Referral

Referral code: `4w89k05q`

## License

MIT — see [LICENSE](LICENSE).
