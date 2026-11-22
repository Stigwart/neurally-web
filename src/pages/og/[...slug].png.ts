/**
 * Open Graph images, generated at build time: one per page.
 * Drawn with Satori (HTML-like tree to SVG) and rasterised with Resvg.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { staticOgPages } from "../../data/pages";
import { families } from "../../data/nav";
import { getFamily } from "../../lib/content";

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFile(require.resolve(`${pkg}/files/${file}`));

const assets = (async () => {
  const [display, body, logo] = await Promise.all([
    font("@fontsource/archivo", "archivo-latin-500-normal.woff"),
    font("@fontsource/instrument-sans", "instrument-sans-latin-400-normal.woff"),
    sharp("src/assets/logo-mark.png").resize({ height: 96 }).png().toBuffer(),
  ]);
  return { display, body, logo: `data:image/png;base64,${logo.toString("base64")}` };
})();

type OgProps = {
  title: string;
  label: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string }; props: OgProps }[] = staticOgPages.map((p) => ({
    params: { slug: p.slug },
    props: { title: p.title, label: p.label },
  }));
  for (const family of families) {
    for (const entry of await getFamily(family.collection)) {
      paths.push({
        params: { slug: `${family.collection}/${entry.id}` },
        props: { title: `${entry.data.headline} ${entry.data.headlineSecond}`, label: family.singular },
      });
    }
  }
  return paths;
};

const h = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
  extra: Record<string, unknown> = {},
) => ({
  type,
  props: { style, children, ...extra },
});

export const GET: APIRoute = async ({ props }) => {
  const { title, label } = props as OgProps;
  const { display, body, logo } = await assets;
  const paper = "#faf8f4";
  const stageColours = ["#a9c4d9", "#efdba0", "#b7c9a8", "#e8a599"];

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "64px 72px",
      backgroundColor: "#121211",
      color: paper,
      fontFamily: "Instrument Sans",
    },
    [
      h("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
        h("div", { display: "flex", alignItems: "center", gap: 20 }, [
          h("img", { height: 48 }, undefined, { src: logo, height: 48 }),
          h("div", { fontFamily: "Archivo", fontSize: 36, letterSpacing: "-0.03em" }, "Neurally"),
        ]),
        h("div", { fontSize: 24, color: "#aba79e" }, label),
      ]),
      h(
        "div",
        {
          fontFamily: "Archivo",
          fontSize: title.length > 70 ? 56 : 68,
          lineHeight: 1.04,
          letterSpacing: "-0.035em",
          maxWidth: 1000,
        },
        title,
      ),
      h("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
        h(
          "div",
          { fontSize: 24, color: "#aba79e" },
          "AI & business transformation advisory · neurally.co.uk",
        ),
        h(
          "div",
          { display: "flex", gap: 10 },
          stageColours.map((c) => h("div", { width: 44, height: 10, borderRadius: 5, backgroundColor: c })),
        ),
      ]),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Archivo", data: display, weight: 500, style: "normal" },
      { name: "Instrument Sans", data: body, weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
