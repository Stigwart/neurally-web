export type StageId = "decide" | "design" | "deliver" | "embed";

export interface Stage {
  id: StageId;
  index: string;
  name: string;
  question: string;
  summary: string;
  detail: string;
  outputs: string[];
  engagements: string;
}

/** The four stages, in order. Names and order are fixed. */
export const stages: Stage[] = [
  {
    id: "decide",
    index: "01",
    name: "Decide",
    question: "Where is the advantage?",
    summary:
      "Choose the few opportunities worth funding, each with a value case in numbers and the measures it will be judged by.",
    detail:
      "Most AI lists are too long. We cut yours down to the handful that could move revenue, cost, capacity or customer outcomes, and record what is evidence and what is still assumption.",
    outputs: ["Prioritised opportunities", "Value case and measures", "Readiness, risk and dependencies"],
    engagements: "Workshop · Diagnostic · Deep Dive",
  },
  {
    id: "design",
    index: "02",
    name: "Design",
    question: "What must change?",
    summary:
      "Rework products, workflows, roles and decision rights (who decides what) around those opportunities, and agree which calls stay with people.",
    detail:
      "Automating a poor process preserves the wrong work. So the work is redesigned first: what stops, what stays with a person, what AI assists, and what AI takes on within agreed limits.",
    outputs: [
      "Target workflows and roles",
      "Decision rights and accountability",
      "Data, technology and governance needs",
    ],
    engagements: "Operating Model & Transformation Design",
  },
  {
    id: "deliver",
    index: "03",
    name: "Deliver",
    question: "How will we realise it?",
    summary:
      "Test the riskiest assumptions in small, time-boxed pilots with agreed success measures, then build and scale what works.",
    detail:
      "Every pilot ends in one of three decisions: proceed, adapt or stop. What proceeds is built with your teams and the partners we help you choose and brief.",
    outputs: [
      "Pilot specifications and acceptance criteria",
      "Partner selection and briefing",
      "Proceed, adapt or stop decisions",
    ],
    engagements: "Implementation Support · Transformation Leadership",
  },
  {
    id: "embed",
    index: "04",
    name: "Embed",
    question: "Who runs it after us?",
    summary:
      "Give every result a named owner, train people on the new work, and track against the agreed measures until your team runs it without us.",
    detail:
      "Training uses your real workflows, not generic demos. The methods and outputs are yours to keep, and the engagement ends when the operating rhythm no longer needs us in it.",
    outputs: ["Named owners for each result", "Training on real work", "Value tracking your team runs"],
    engagements: "AI Training for Leaders & Teams",
  },
];
