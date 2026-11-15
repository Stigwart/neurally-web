import { getCollection, type CollectionEntry } from "astro:content";
import { families, type FamilyId } from "../data/nav";

export type LandingEntry = CollectionEntry<FamilyId>;

export const landingHref = (collection: FamilyId, id: string) =>
  `${families.find((f) => f.collection === collection)!.base}${id}/`;

export const getFamily = async (collection: FamilyId): Promise<LandingEntry[]> => {
  const entries: LandingEntry[] = await getCollection(collection);
  return entries.sort((a, b) => a.data.order - b.data.order);
};

export const getAllLanding = async () =>
  Promise.all(families.map(async (family) => ({ family, entries: await getFamily(family.collection) })));

/** Resolve "collection/slug" references from front matter into links. */
export const resolveRelated = async (refs: string[]) => {
  const all = await getAllLanding();
  return refs.map((ref) => {
    const [collection, id] = ref.split("/") as [FamilyId, string];
    const group = all.find((g) => g.family.collection === collection);
    const entry = group?.entries.find((e) => e.id === id);
    if (!group || !entry) throw new Error(`Unknown related page: ${ref}`);
    return {
      href: landingHref(collection, id),
      name: entry.data.name,
      summary: entry.data.summary,
      family: group.family.singular,
    };
  });
};

export const getInsights = async () => {
  const posts = await getCollection("insights", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
};

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
