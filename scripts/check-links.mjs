// Internal link check over the built site: every href/src that points at
// this site must resolve to a file in dist/, and every #fragment must exist.
import { readFile, readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const DIST = "dist";
const ORIGIN = "https://www.neurally.co.uk";

const walk = async (dir) => {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
};

const exists = async (p) =>
  stat(p).then(
    (s) => s.isFile(),
    () => false,
  );
const resolveFile = async (path) => {
  const clean = decodeURIComponent(path);
  if (extname(clean)) return (await exists(join(DIST, clean))) ? join(DIST, clean) : null;
  const index = join(DIST, clean, "index.html");
  return (await exists(index)) ? index : null;
};

const idsCache = new Map();
const idsOf = async (file) => {
  if (!idsCache.has(file)) {
    const html = await readFile(file, "utf8");
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};

const files = await walk(DIST);
const problems = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page = "/" + file.slice(DIST.length + 1).replace(/index\.html$/, "");
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    let url = raw.replace(/&amp;/g, "&");
    if (url.startsWith(ORIGIN)) url = url.slice(ORIGIN.length) || "/";
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(url)) continue;
    checked++;
    const [pathPart, fragment] = url.split("#");
    const path = pathPart === "" ? page : pathPart.split("?")[0];
    if (!path.startsWith("/")) {
      problems.push(`${page}: relative ${attr} "${raw}"`);
      continue;
    }
    const target = await resolveFile(path);
    if (!target) {
      problems.push(`${page}: broken ${attr} "${raw}"`);
      continue;
    }
    if (attr === "href" && !extname(path) && !path.endsWith("/"))
      problems.push(`${page}: missing trailing slash "${raw}"`);
    if (
      fragment &&
      target.endsWith(".html") &&
      !fragment.startsWith("r=") &&
      !(await idsOf(target)).has(fragment)
    ) {
      problems.push(`${page}: missing fragment "${raw}"`);
    }
  }
}

if (problems.length) {
  console.error(`${problems.length} link problem(s):\n` + [...new Set(problems)].join("\n"));
  process.exit(1);
}
console.log(`Checked ${checked} internal links across ${files.length} pages: all resolve.`);
