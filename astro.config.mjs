// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.neurally.co.uk",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "never" },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/og/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Keep every script external so the CSP can stay free of 'unsafe-inline' for scripts.
    build: { assetsInlineLimit: 0 },
  },
});
