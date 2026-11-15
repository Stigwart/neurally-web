import type { StageId } from "./stages";

/**
 * AI maturity assessment content. Questions, options, thresholds and
 * scenario text are ported unchanged from the original site.
 */
export interface Dimension {
  key: StageId;
  name: string;
  asks: string;
  gap: string;
  help: string;
  service: string;
}

export interface Question {
  title: string;
  hint?: string;
  options: string[];
  /** Index into DIMENSIONS for scored questions. */
  dim?: number;
}

export interface Level {
  name: string;
  max: number;
  means: string;
  help: string;
  service: string;
}

export const DIMENSIONS: Dimension[] = [
  {
    key: "decide",
    name: "Decide",
    asks: "Direction and investment",
    gap: "You have not yet chosen the few AI opportunities worth backing, or set the measures that would show them working.",
    help: "An AI Opportunity Workshop picks the opportunities worth pursuing and sets out the value case for each.",
    service: "AI Opportunity Workshop",
  },
  {
    key: "design",
    name: "Design",
    asks: "Operating model",
    gap: "The way work gets done has changed less than the tools around it, and ownership across teams is unclear.",
    help: "Operating Model Design redesigns workflows, roles and decision rights around the opportunities, including what stays with people.",
    service: "Operating Model Design",
  },
  {
    key: "deliver",
    name: "Deliver",
    asks: "Delivery and results",
    gap: "Pilots are not yet becoming everyday tools, or results are not tracked against business outcomes.",
    help: "Implementation Support and Transformation Leadership take the riskiest assumptions through bounded pilots with agreed success measures.",
    service: "Implementation Support and Transformation Leadership",
  },
  {
    key: "embed",
    name: "Embed",
    asks: "People and guardrails",
    gap: "People are not yet equipped to use AI well, or the guardrails for using it safely are thin.",
    help: "AI Training for Leaders and Teams is built around your own redesigned workflows, alongside the governance to keep use safe.",
    service: "AI Training for Leaders and Teams",
  },
];

export const SIZE_Q: Question = {
  title: "How big is your organisation?",
  hint: "Roughly, by headcount.",
  options: ["Under 50 people", "50 to 250 people", "250 to 1,000 people", "More than 1,000 people"],
};

export const SCORED_QS: Question[] = [
  {
    dim: 0,
    title: "Where does AI sit in your business strategy?",
    options: [
      "Nobody has set a direction",
      "Plenty of ideas, nothing written down",
      "A written AI plan, not yet tied to investment",
      "Clear priorities, each with a value case and an owner",
    ],
  },
  {
    dim: 0,
    title: "How do you decide which AI opportunities to back?",
    options: [
      "Whoever asks loudest, or the latest tool",
      "Teams choose their own tools",
      "We list use cases and rank them roughly",
      "Ranked by expected return, with success measures agreed first",
    ],
  },
  {
    dim: 1,
    title: "How much has the way work gets done changed?",
    options: [
      "Not at all",
      "Individuals use AI to speed up their existing tasks",
      "A few workflows have been redesigned around AI",
      "Roles, decisions and hand-offs redesigned in key areas, including what stays with people",
    ],
  },
  {
    dim: 1,
    title: "Who owns AI across the business?",
    options: [
      "Nobody",
      "IT or one enthusiast, alongside their day job",
      "A named sponsor, but coordination between teams is ad hoc",
      "A named executive owner with a cross-team mandate and budget",
    ],
  },
  {
    dim: 2,
    title: "What has happened to your AI pilots?",
    options: [
      "We haven't run any",
      "Several pilots, none in everyday use",
      "One or two in everyday use",
      "Several in everyday use, and we've stopped ones that didn't work",
    ],
  },
  {
    dim: 2,
    title: "How do you know whether AI is paying off?",
    options: [
      "We don't",
      "Anecdotes and gut feel",
      "Some measures, such as usage or time saved",
      "Tracked against business outcomes: revenue, cost, capacity, customers",
    ],
  },
  {
    dim: 3,
    title: "How well equipped are your people?",
    options: [
      "No training, left to figure it out",
      "A few self-taught enthusiasts",
      "General AI training for most people",
      "Role-specific training built around our own workflows",
    ],
  },
  {
    dim: 3,
    title: "What guardrails are in place?",
    options: [
      "None",
      "Informal “be careful” advice",
      "A written policy on data and use",
      "A policy, plus risk-reviewed use cases that someone monitors",
    ],
  },
];

export const TRIGGER_Q: Question & { cta: string[] } = {
  title: "What's most pressing right now?",
  hint: "This only shapes the suggestion at the end.",
  options: [
    "The board expects an AI strategy",
    "Lots of AI activity, no payback",
    "A transformation that's stalled or off track",
    "Getting the team to actually use it",
    "Just exploring",
  ],
  cta: [
    "Turn the board’s expectation into an investment case",
    "Find out which AI activity is worth keeping",
    "Get an independent view of what has stalled",
    "Get your team using it well",
    "Start with a conversation, no commitment",
  ],
};

/** Screen order: size, eight scored questions, trigger. */
export const QUESTIONS: Question[] = [SIZE_Q, ...SCORED_QS, TRIGGER_Q];

export const LEVELS: Level[] = [
  {
    name: "The Starting Line",
    max: 6,
    means:
      "There is little formal AI activity yet. That is a fair place to be, and the main risk is buying tools before choosing a direction.",
    help: "Start with a free discovery call, then an AI Opportunity Workshop to choose the few opportunities worth pursuing and the measures that would show them working.",
    service: "Free discovery call, then an AI Opportunity Workshop",
  },
  {
    name: "Activity Without Payback",
    max: 12,
    means:
      "Pilots and tools are multiplying, but little of it is measured against the business, so it is hard to say what is worth continuing.",
    help: "An AI Advantage Diagnostic sizes the opportunities, gives a proceed, adapt or stop view on what is running, and builds the value case for what remains.",
    service: "AI Advantage Diagnostic",
  },
  {
    name: "Proven in Pockets",
    max: 18,
    means:
      "Some things work, but the business has not changed around them, so results stay local to the teams that built them.",
    help: "Operating Model Design and Implementation Support turn those pockets into how the business runs. An AI Transformation Deep Dive helps if several initiatives need aligning first.",
    service: "Operating Model Design and Implementation Support",
  },
  {
    name: "Built In",
    max: 24,
    means:
      "AI is part of how the business runs. The question now is compounding it and staying in control of the risks.",
    help: "You may not need us yet. Where an independent view helps, that is CEO and board advisory on the next investment, or targeted AI training for the teams still catching up.",
    service: "Advisory and targeted AI training",
  },
];

export interface Result {
  dims: number[];
  total: number;
  level: number;
  weakest: number;
  spread: number;
}

/** Score a full set of answers (one option index per screen). */
export const score = (answers: number[]): Result => {
  const dims = [0, 0, 0, 0];
  SCORED_QS.forEach((q, i) => {
    dims[q.dim!]! += answers[i + 1]!;
  });
  const total = dims.reduce((sum, n) => sum + n, 0);
  let level = 0;
  while (total > LEVELS[level]!.max) level++;
  let lo = 0;
  let hi = 0;
  dims.forEach((d, i) => {
    if (d < dims[lo]!) lo = i;
    if (d > dims[hi]!) hi = i;
  });
  return { dims, total, level, weakest: lo, spread: dims[hi]! - dims[lo]! };
};

export const encode = (answers: number[]) => answers.join("");

export const decode = (s: string): number[] | null => {
  if (!/^\d{10}$/.test(s)) return null;
  const answers = s.split("").map(Number);
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (answers[i]! >= QUESTIONS[i]!.options.length) return null;
  }
  return answers;
};
