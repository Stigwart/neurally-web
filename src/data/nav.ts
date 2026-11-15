export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: "Approach", href: "/approach/" },
  { label: "Services", href: "/services/" },
];

export const secondaryNav: NavLink[] = [
  { label: "Insights", href: "/insights/" },
  { label: "About", href: "/about/" },
];

/** The three landing-page families, in the order they appear in menus. */
export const families = [
  {
    collection: "industries",
    label: "Industries",
    singular: "Industry",
    base: "/industries/",
    blurb: "Where the sector changes the answer.",
  },
  {
    collection: "teams",
    label: "Teams",
    singular: "Team",
    base: "/teams/",
    blurb: "The decisions on your desk, by role.",
  },
  {
    collection: "use-cases",
    label: "Use cases",
    singular: "Use case",
    base: "/use-cases/",
    blurb: "The situation you are in right now.",
  },
] as const;

export type FamilyId = (typeof families)[number]["collection"];
