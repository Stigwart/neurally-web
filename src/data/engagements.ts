import type { StageId } from "./stages";

export interface Engagement {
  id: string;
  index: string;
  name: string;
  length: string;
  fee: string;
  /** Numeric price in GBP for Offer structured data, where a fee is published. */
  price?: number;
  feeNote?: string;
  stage: StageId | "any";
  summary: string;
  outputs: string[];
  bestFor: string;
}

/**
 * The engagement ladder. Fees are exact and published.
 * The Workshop credit is the only discount that may ever appear on the site.
 */
export const engagements: Engagement[] = [
  {
    id: "discovery-call",
    index: "00",
    name: "Free discovery call",
    length: "30 minutes",
    fee: "Free",
    price: 0,
    stage: "any",
    summary:
      "A conversation about the problem, whether Neurally is a fit, and the right next step. Sometimes the right next step is none of the engagements below.",
    outputs: [
      "A clear view of the problem",
      "An honest read on fit",
      "A recommended next step, if there is one",
    ],
    bestFor: "Anyone weighing up whether outside help is worth it.",
  },
  {
    id: "workshop",
    index: "01",
    name: "AI Opportunity Workshop",
    length: "1 day",
    fee: "£2,500",
    price: 2500,
    feeNote: "Credited in full against a Diagnostic or Deep Dive booked within 60 days.",
    stage: "decide",
    summary:
      "One day with your leadership team to reach a shared view of where AI could matter most, and what to do about it first.",
    outputs: [
      "A shared leadership view of the opportunity",
      "An agreed top three priorities, with next steps and owners",
      "A written summary within three working days",
      "A recommendation on whether a Diagnostic or Deep Dive is worthwhile",
    ],
    bestFor: "Leadership teams with plenty of ideas and no agreed order.",
  },
  {
    id: "diagnostic",
    index: "02",
    name: "AI Advantage Diagnostic",
    length: "1 week",
    fee: "£6,000",
    price: 6000,
    stage: "decide",
    summary:
      "A week on one or two priority areas or workflows, ending in opportunities you can compare and a recommendation you can act on.",
    outputs: [
      "Prioritised opportunities for the areas in scope",
      "An initial value hypothesis, with its assumptions stated",
      "A readiness, risk and dependency view",
      "A recommended next step",
    ],
    bestFor: "A function or product area where the opportunity is suspected but unsized.",
  },
  {
    id: "deep-dive",
    index: "03",
    name: "AI Transformation Deep Dive",
    length: "2 weeks",
    fee: "£12,500",
    price: 12500,
    stage: "decide",
    summary:
      "Everything in the Diagnostic, across the whole business or several functions, taken through to a plan a board can approve.",
    outputs: [
      "An operating-model outline: roles, teams, workflows and decision rights",
      "The boundaries between people, AI assistance and automation",
      "A board-ready 90-day mobilisation plan with owners and decision gates",
      "An AI governance and risk view",
      "A board recommendation pack",
    ],
    bestFor: "A board or CEO who needs an investment decision, not another list of use cases.",
  },
  {
    id: "operating-model-design",
    index: "04",
    name: "Operating Model & Transformation Design",
    length: "6–10 weeks",
    fee: "Fixed fee, scoped",
    stage: "design",
    summary:
      "The detailed redesign: how products, workflows, roles and decisions will work once AI is part of them, and how the value will be realised.",
    outputs: [
      "Target customer journeys and propositions",
      "Workflows, decision rights and roles",
      "Boundaries between people, AI assistance and automation",
      "Data, technology and governance requirements",
      "A value-realisation model, roadmap and pilot specifications",
    ],
    bestFor: "Businesses that have chosen their priorities and now need to change how the work is done.",
  },
  {
    id: "implementation-support",
    index: "05",
    name: "Implementation Support",
    length: "Scoped",
    fee: "Quoted",
    stage: "deliver",
    summary:
      "Hands-on support to get the first releases live: specifying pilots, briefing the people who build them, and judging the results.",
    outputs: [
      "Pilot specifications and acceptance criteria",
      "Help choosing and briefing build partners",
      "Work alongside product and engineering on first releases",
      "Testing against agreed measures, ending in proceed, adapt or stop",
    ],
    bestFor: "Teams with a design in hand and a build to get right first time.",
  },
  {
    id: "transformation-leadership",
    index: "06",
    name: "Transformation Leadership",
    length: "Fixed term, typically 3–6 months",
    fee: "Quoted",
    stage: "deliver",
    summary:
      "Embedded, fractional or interim leadership of the change itself, for a fixed term and a fixed outcome.",
    outputs: [
      "An operating rhythm and executive alignment",
      "Teams, ownership and measures set up",
      "Partner coordination and barriers removed",
      "Value tracking and capability transfer to your team",
    ],
    bestFor: "A transformation that needs a senior owner now, or one that has stalled.",
  },
  {
    id: "training",
    index: "07",
    name: "AI Training for Leaders & Teams",
    length: "A single session to a series",
    fee: "Quoted",
    stage: "embed",
    summary:
      "Training built around your own work and your own governance, for the leaders who decide and the teams who do.",
    outputs: [
      "A leadership session on judging AI opportunities, value and risk",
      "Team sessions that use real work",
      "Clarity on what stays with people",
      "Working norms that fit your governance",
    ],
    bestFor: "Teams that have the tools and are unsure how to use them well.",
  },
  {
    id: "advisory",
    index: "08",
    name: "CEO, Board & Investor Advisory",
    length: "Retainer",
    fee: "Quoted",
    stage: "any",
    summary: "Continuing access to independent senior judgement, alongside any stage or on its own.",
    outputs: [
      "Independent challenge on opportunity, investment and execution risk",
      "For boards and NEDs: governance and readiness",
      "For investors: AI and product value-creation assessment, due diligence and portfolio-company mobilisation",
    ],
    bestFor: "CEOs, boards and investors who want a second opinion that isn't selling a build.",
  },
];

export const engagement = (id: string): Engagement => {
  const found = engagements.find((e) => e.id === id);
  if (!found) throw new Error(`Unknown engagement: ${id}`);
  return found;
};

export const engagementIds = engagements.map((e) => e.id) as [string, ...string[]];
