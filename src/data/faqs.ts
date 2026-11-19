export interface FaqItem {
  q: string;
  /** May contain simple inline HTML links. Tags are stripped for structured data. */
  a: string;
}

export const homeFaq: FaqItem[] = [
  {
    q: "What does Neurally do?",
    a: 'Neurally is a UK-based advisory that helps leadership teams decide where AI is worth the investment, redesign products, processes and teams around it, and lead the change through to measured results. Every engagement follows four stages: Decide, Design, Deliver and Embed. <a class="link" href="/approach/">Read more about our approach</a>.',
  },
  {
    q: "Who is it for?",
    a: 'CEOs, founders, and product and technology leaders of scaling and established businesses, roughly 50 to 1,000 people, where AI could change costs, capacity, speed, products or customer value. If you are not sure where you stand, the <a class="link" href="/assessment/">two-minute AI maturity assessment</a> will tell you.',
  },
  {
    q: "What does it cost to get started?",
    a: 'The first call is free. After that the Workshop (one day, £2,500), the Diagnostic (one week, £6,000) and the Deep Dive (two weeks, £12,500) each have a fixed fee agreed before work starts. The Workshop fee is credited in full if you book a Diagnostic or Deep Dive within 60 days. <a class="link" href="/services/">See every engagement and fee</a>.',
  },
  {
    q: "Do you stay through to delivery?",
    a: "Yes. We can work with you from the first decision until the change is live and your team runs it. We lead the agreed transformation work and support implementation hands-on: specifying pilots, choosing and briefing build partners, and working alongside your teams on the first releases. Your teams or specialist partners write the software. We do not sell software or resell tools, so our advice on what to build has nothing to sell.",
  },
  {
    q: "How is this different from a large consultancy?",
    a: "You work directly with one senior operator who can move from the board-level choice into product, operating-model and delivery detail. Nothing is handed from the people who sold the work to a different team who deliver it. Specialists are added only where the problem needs them.",
  },
];

export const approachFaq: FaqItem[] = [
  {
    q: "Are you an AI consultancy?",
    a: "Not quite. AI is usually why people call, but most of the work is on the business itself: its economics, products, customers, organisation and delivery. AI is the catalyst for that work.",
  },
  {
    q: "What happens in each stage?",
    a: "Decide: choose the few opportunities worth funding, with a value case and measures for each. Design: redesign products, workflows, roles and decision rights around them. Deliver: test the riskiest assumptions in small, time-boxed pilots, then build and scale what works. Embed: train your people, track results against the agreed measures and leave an operating rhythm your team runs without us.",
  },
  {
    q: "Do we have to do all four stages?",
    a: "No. You can stop after any stage and keep every output. Many clients start with a single fixed-fee step in the Decide stage and choose what follows once they have seen the result.",
  },
  {
    q: "Who is accountable when AI is involved in a decision?",
    a: "A named person. Every workflow redesign sets out who is accountable when AI is involved, what stays with a person, what is automated, and how a decision can be reviewed and reversed.",
  },
  {
    q: "Do you cover the FCA Consumer Duty?",
    a: "Yes. For financial-services and insurance clients, opportunities and designs are tested against Consumer Duty outcomes and conduct risk before they reach a board.",
  },
  {
    q: "How do you handle the EU AI Act and UK GDPR?",
    a: "Where a product or workflow could fall into an EU AI Act risk category, it is flagged early, while the design can still change. Data use, retention and third-party processing under UK GDPR are covered in scoping. We are not a law firm, so formal legal advice stays with your counsel.",
  },
  {
    q: "Do you sell software or resell AI tools?",
    a: "No. Training and implementation support are tied to the changes agreed with you. They are not off-the-shelf courses or standalone builds, and no tool vendor pays us.",
  },
];

export const servicesFaq: FaqItem[] = [
  {
    q: "What is the difference between the Workshop, the Diagnostic and the Deep Dive?",
    a: "The Workshop (one day, £2,500) gives your leadership team a shared view of priorities and a recommendation on what to do next. The Diagnostic (one week, £6,000) goes deeper on one or two priority areas. The Deep Dive (two weeks, £12,500) covers the whole business or several functions, and adds an operating-model outline and a board-ready 90-day mobilisation plan.",
  },
  {
    q: "Does the Workshop fee count towards later work?",
    a: "Yes. If you book a Diagnostic or Deep Dive within 60 days of the Workshop, its £2,500 fee is credited in full against it.",
  },
  {
    q: "Do I have to book the free call first?",
    a: "No, but most people do. It is a quick way to check fit and agree whether a Workshop, Diagnostic or Deep Dive is the right next step, with no fee attached.",
  },
  {
    q: "Why are the later engagements quoted rather than priced?",
    a: "Because their scope depends on what the earlier work finds. Operating Model and Transformation Design is a fixed fee agreed once the scope is clear. Implementation support, leadership, training and advisory are quoted after a scoping conversation. Nothing starts before the fee is agreed.",
  },
  {
    q: "Can we start with training or a build?",
    a: "Yes, if the problem and the expected value are already clear. Both are built around your own priorities. If leadership still needs to decide where to focus, the free call, the Workshop or the Diagnostic come first.",
  },
  {
    q: "Do you take payment by results?",
    a: "No. Fees are fixed or quoted in advance. We also do not provide recruitment, extra staffing or open-ended functional cover: fractional and interim work is for a fixed term and a fixed outcome.",
  },
  {
    q: "What do you need from us?",
    a: "An executive sponsor, access to evidence and people, a budget, and a willingness to change how the business operates. All of that is confirmed in scoping, before any fee. An NDA is standard before you share anything substantive.",
  },
];
