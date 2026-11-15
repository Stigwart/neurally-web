import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../data/site";
import { getInsights } from "../lib/content";

export async function GET(context: APIContext) {
  const posts = await getInsights();
  return rss({
    title: "Neurally Insights",
    description: "Practical writing on getting AI from pilot to value.",
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `/insights/${post.id}/`,
      categories: post.data.tags,
      author: `${site.email} (${site.founder})`,
    })),
    customData: "<language>en-gb</language>",
  });
}
