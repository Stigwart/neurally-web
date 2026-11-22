# Problems Neurally solves

Working copy for LinkedIn posts, intros and outreach. It describes Neurally by the
problem a leader recognises, not by the offer. The problem and answer wording is
Stuart's own and should be kept as written. Before any line goes on the site, check it
against the Drive `neurally-overview-v2.1.md` and add a row to `docs/claims-ledger.md`.

Each problem has: the problem, what Neurally does, and the engagements that fit.

---

## 1. Where to start

**The problem:** You know you should be doing more with AI, but don't know where to start.

**What Neurally does:** Neurally removes the hype and helps you understand how AI could
genuinely improve your business.

**Fits:** Free discovery call → AI Opportunity Workshop (1 day, £2,500) → AI Advantage
Diagnostic (1 week, £6,000).

---

## 2. Not living up to expectations

**The problem:** You have done some pilots, or embedded some AI tools, but it doesn't
really feel like it's living up to the expectation, or it's actually making things more
difficult.

**What Neurally does:** Neurally can help understand what's working and what's not, where
things can be optimised to better fit your needs and where you can remove complexity,
focusing on the outcomes that genuinely make a difference for your business.

**Fits:** AI Advantage Diagnostic, or AI Transformation Deep Dive (2 weeks, £12,500)
across several functions. See the "AI transformation rescue" use case.

---

## 3. Not landing in the business

**The problem:** You've invested in AI, you think you've got the right tools, but it's
not really landing in the business and things aren't changing as you'd hoped.

**What Neurally does:** Neurally can help with the overall transformation of your people,
processes, and technology, bringing it all together and making it work: training,
process design and transformation.

**Fits:** Operating Model & Transformation Design (6–10 weeks, fixed fee), Transformation
Leadership (3–6 months), AI Training for Leaders & Teams.

---

## 4. Falling behind

**The problem:** You're running a business, and you know AI is changing many things and
moving fast, but you feel like you're falling behind. You know you need to build your
knowledge if you're going to lead your business through this period of extraordinary
change.

**What Neurally does:** Neurally can offer one-on-one training and coaching for
executives to keep you ahead of your team.

**Fits:** Executive AI Coaching (one-to-one, quoted).

---

## How this compares with the site

The homepage already frames four problems (`src/pages/index.astro`, the `stalls` list):

| Site problem               | Site promise          | Closest problem here |
| -------------------------- | --------------------- | -------------------- |
| AI activity, no payback    | Pick the right bets   | 2 (and partly 1)     |
| New tools, same old habits | Change the work       | 3                    |
| No one owns the outcome    | Get it built and live | 3                    |
| Teams unsure how to use it | A team that runs it   | 3                    |

- **The site starts later.** All four site problems assume AI activity is already under
  way. Problems 1 and 4 are new ground and speak to leaders who haven't started yet.
- **The site splits "change" three ways.** Ownership, habits and team skills are
  separate problems there. Problem 3 here folds them together.
- **Problem 2 adds "it's making things more difficult".** The site talks about missing
  payback, not added complexity.
- **Problem 4 now has an offer behind it:** Executive AI Coaching, added to
  `src/data/engagements.ts` as engagement 08.

## Open questions

1. **Coaching format and fee.** Executive AI Coaching is published as one-to-one and
   quoted, with no session count. Add a length (for example, six sessions over three
   months) and a fee if you want it priced. Add a backing line to the Drive overview too.
2. **Site copy.** Problems 1 and 4 could become homepage messages or part of
   `src/content/teams/ceos-founders-boards.md`.
