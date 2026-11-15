import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { engagementIds } from "./data/engagements";

const stage = z.enum(["decide", "design", "deliver", "embed"]);

/**
 * One schema for every landing page (industries, teams, use cases).
 * A new page is one Markdown file with this front matter. No code.
 */
const landing = z.object({
  /** Short name for menus, cards and breadcrumbs. */
  name: z.string().max(48),
  /** The H1: first beat, then a quieter second beat. */
  headline: z.string(),
  headlineSecond: z.string(),
  /** <title> (without the site name) and meta description. */
  seoTitle: z.string().max(62),
  description: z.string().min(110).max(165),
  /** One or two sentences under the H1. */
  lede: z.string(),
  /** One line for hub cards. */
  summary: z.string().max(170),
  order: z.number().default(10),
  /** The reader's situation, in their own words. */
  situation: z.object({
    heading: z.string(),
    quotes: z.array(z.string()).min(3).max(5),
  }),
  /** The decisions that matter in this context. */
  decisions: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    items: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .min(3)
      .max(5),
  }),
  /** What tends to go wrong here. */
  risks: z.object({
    heading: z.string(),
    items: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .min(2)
      .max(4),
  }),
  /** How each stage applies in this context. */
  path: z.object({
    heading: z.string(),
    steps: z
      .array(z.object({ stage, body: z.string() }))
      .min(2)
      .max(4),
  }),
  /** Where to start: the relevant engagement and why. */
  entry: z.object({
    engagement: z.enum(engagementIds),
    heading: z.string(),
    body: z.string(),
    alsoConsider: z.enum(engagementIds).optional(),
  }),
  /** Optional career evidence. Always rendered with the pre-Neurally caveat. */
  evidence: z
    .object({
      heading: z.string(),
      items: z
        .array(z.object({ figure: z.string(), label: z.string(), where: z.string() }))
        .min(1)
        .max(4),
    })
    .optional(),
  /** Set when the sector is a focus area with no claimed track record. */
  focusAreaNote: z.string().optional(),
  faq: z
    .array(z.object({ q: z.string(), a: z.string() }))
    .min(3)
    .max(6),
  /** Contextual internal links: "collection/slug". */
  related: z.array(z.string()).min(2).max(4),
  updated: z.coerce.date(),
});

const landingCollection = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: `./src/content/${dir}` }),
    schema: landing,
  });

const insights = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/insights" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(62).optional(),
    description: z.string().min(110).max(165),
    /** The standfirst under the title. */
    standfirst: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1).max(4),
    stage: stage.optional(),
    readingMinutes: z.number().int().positive(),
    related: z.array(z.string()).max(4).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  industries: landingCollection("industries"),
  teams: landingCollection("teams"),
  "use-cases": landingCollection("use-cases"),
  insights,
};
