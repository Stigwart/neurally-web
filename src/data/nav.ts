export interface NavLink {
  label: string;
  href: string;
}

/** The main menu. Kept to three links plus the call to action. */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Insights", href: "/insights/" },
];

/**
 * The three landing-page families, in the order they appear in the footer.
 * They have no hub pages: each page is reached from the footer and from
 * related links in page content.
 */
export const families = [
  {
    collection: "industries",
    label: "Industries",
    singular: "Industry",
    base: "/industries/",
  },
  {
    collection: "teams",
    label: "Teams",
    singular: "Team",
    base: "/teams/",
  },
  {
    collection: "use-cases",
    label: "Use cases",
    singular: "Use case",
    base: "/use-cases/",
  },
] as const;

export type FamilyId = (typeof families)[number]["collection"];
