// Budget: initial JavaScript on any page must stay under 60 KB gzipped.
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET = 60 * 1024;
const walk = async (dir) => {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
};
const size = new Map();
const gz = async (file) => {
  if (!size.has(file)) size.set(file, gzipSync(await readFile(file)).length);
  return size.get(file);
};
// Follow static imports so shared chunks are counted too.
const closure = async (src, seen = new Set()) => {
  if (seen.has(src)) return seen;
  seen.add(src);
  const code = await readFile(join("dist", src), "utf8");
  for (const [, dep] of code.matchAll(/from\s*"\.\/([^"]+\.js)"|import\s*"\.\/([^"]+\.js)"/g)) {
    if (dep) await closure(join(src, "..", dep), seen);
  }
  return seen;
};

let worst = 0;
let failed = false;
for (const file of await walk("dist")) {
  const html = await readFile(file, "utf8");
  const scripts = new Set();
  for (const [, src] of html.matchAll(/<script[^>]+src="(\/_astro\/[^"]+)"/g))
    for (const s of await closure(src)) scripts.add(s);
  let total = 0;
  for (const s of scripts) total += await gz(join("dist", s));
  worst = Math.max(worst, total);
  if (total > BUDGET) {
    failed = true;
    console.error(`${file}: ${(total / 1024).toFixed(1)} KB gz exceeds 60 KB`);
  }
}
console.log(`Largest initial JS on any page: ${(worst / 1024).toFixed(1)} KB gz (budget 60 KB).`);
process.exit(failed ? 1 : 0);
