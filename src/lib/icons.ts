/**
 * Outline icons from Lucide (ISC licence), bundled at build time so no
 * third party is involved. Each shape gets pathLength="1" so the stroke
 * can be drawn in by the homepage motion script.
 */
import blocks from "lucide-static/icons/blocks.svg?raw";
import compass from "lucide-static/icons/compass.svg?raw";
import flask from "lucide-static/icons/flask-conical.svg?raw";
import gauge from "lucide-static/icons/gauge.svg?raw";
import shieldAlert from "lucide-static/icons/shield-alert.svg?raw";
import shieldCheck from "lucide-static/icons/shield-check.svg?raw";

const prepare = (svg: string) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+class="[^"]*"/, "")
    .replace(/\s+(width|height)="24"/g, "")
    .replace("<svg", '<svg aria-hidden="true" focusable="false"')
    .replace(/<(path|circle|rect|line|polyline|polygon|ellipse)\b/g, '<$1 pathLength="1"')
    .trim();

export const icons = {
  blocks: prepare(blocks),
  compass: prepare(compass),
  flask: prepare(flask),
  gauge: prepare(gauge),
  "shield-alert": prepare(shieldAlert),
  "shield-check": prepare(shieldCheck),
} as const;

export type IconName = keyof typeof icons;
