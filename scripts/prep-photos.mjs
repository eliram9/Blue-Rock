#!/usr/bin/env node
/**
 * Turn one downloaded Zenfolio gallery into web-ready project photos, then
 * print a `Project` block ready to paste into src/lib/projects.ts.
 *
 *   node scripts/prep-photos.mjs --in ~/Downloads/Gallery --slug potomac-kitchen \
 *        [--category kitchen] [--force]
 *
 * What it does and why:
 *   - Resizes the longest edge to 2560px and never upscales. The widest render
 *     is the panorama row at 1152px CSS, which needs ~2300px at 2x DPR; the
 *     lightbox asks for 100vw. Beyond 2560 is bytes nobody downloads.
 *   - Writes JPEG, NOT WebP. next.config.ts already sets
 *     formats: ["image/avif","image/webp"], so Next derives modern formats per
 *     requested width. Shipping WebP sources would make it re-encode lossy
 *     input and lose quality for nothing.
 *   - STRIPS ALL METADATA. Photographs of clients' homes carry GPS EXIF, and
 *     publishing that puts a customer's street address online. sharp drops
 *     metadata unless .withMetadata() is called, so this file must never call
 *     it. This is a privacy requirement, not an optimisation.
 *   - Leaves every `alt` empty. Alt text describes what is actually in the
 *     frame; a script guessing from a filename would produce plausible lies.
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const MAX_EDGE = 2560;
const QUALITY = 82;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".heic"]);
/* Camera-default filenames carry no meaning, so they become bare numbers. */
const CAMERA_JUNK = /^(dsc|dscn|img|imgp|p|_mg|_dsc)[-_ ]?\d+$/i;

function parseArgs(argv) {
    const out = {};
    for (let i = 2; i < argv.length; i += 1) {
        const a = argv[i];
        if (a === "--force") out.force = true;
        else if (a.startsWith("--")) out[a.slice(2)] = argv[++i];
    }
    return out;
}

const slugify = (s) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const constName = (slug) => slug.toUpperCase().replace(/-/g, "_");

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

function fail(msg) {
    console.error(`\n  error: ${msg}\n`);
    process.exit(1);
}

const args = parseArgs(process.argv);
if (!args.in || !args.slug) {
    fail("usage: node scripts/prep-photos.mjs --in <folder> --slug <project-slug> [--category <cat>] [--force]");
}

const slug = slugify(args.slug);
const srcDir = path.resolve(args.in.replace(/^~/, process.env.HOME ?? "~"));
const outDir = path.resolve("public/images/projects", slug);

if (!existsSync(srcDir)) fail(`input folder not found: ${srcDir}`);
if (existsSync(outDir) && !args.force) {
    fail(`${path.relative(process.cwd(), outDir)} already exists. Re-run with --force to overwrite.`);
}

const entries = (await readdir(srcDir))
    .filter((f) => EXTS.has(path.extname(f).toLowerCase()) && !f.startsWith("."))
    /* Natural sort so 2 comes before 10, not after it. */
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

if (entries.length === 0) fail(`no images found in ${srcDir}`);

await mkdir(outDir, { recursive: true });

/* before-*/ /* and after-* are a documented before/after study; everything else
   is an ordinary gallery photo. */
const isPair = (f) => /^(before|after)[-_]/i.test(f);
const galleryFiles = entries.filter((f) => !isPair(f));
const pairFiles = entries.filter(isPair);

function outputName(file, index) {
    const base = path.parse(file).name;
    if (isPair(file)) return `${slugify(base)}.jpg`;
    const label = slugify(base.replace(/^\d+[-_\s]*/, ""));
    const nn = String(index + 1).padStart(2, "0");
    return CAMERA_JUNK.test(base) || !label ? `${nn}.jpg` : `${nn}-${label}.jpg`;
}

console.log(`\n  ${entries.length} image(s) -> public/images/projects/${slug}/\n`);

const written = { gallery: [], pairs: [] };
let totalIn = 0;
let totalOut = 0;

for (const [i, file] of [...galleryFiles, ...pairFiles].entries()) {
    const from = path.join(srcDir, file);
    const galleryIndex = galleryFiles.indexOf(file);
    const name = outputName(file, galleryIndex === -1 ? i : galleryIndex);
    const to = path.join(outDir, name);

    const before = (await stat(from)).size;
    const meta = await sharp(from).metadata();

    await sharp(from)
        .rotate() /* Apply EXIF orientation before we discard the EXIF. */
        .resize({
            width: MAX_EDGE,
            height: MAX_EDGE,
            fit: "inside",
            withoutEnlargement: true,
        })
        /* No .withMetadata() anywhere: that is what strips GPS and all EXIF. */
        .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
        .toFile(to);

    const after = (await stat(to)).size;
    totalIn += before;
    totalOut += after;

    const dims = await sharp(to).metadata();
    const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;
    console.log(
        `  ${file.padEnd(30).slice(0, 30)} -> ${name.padEnd(28)} ` +
            `${String(meta.width ?? "?").padStart(5)}px -> ${String(dims.width).padStart(5)}px  ` +
            `${kb(before).padStart(8)} -> ${kb(after).padStart(8)}  ${saved > 0 ? `-${saved}%` : ""}`,
    );

    (isPair(file) ? written.pairs : written.gallery).push(name);
}

console.log(
    `\n  total ${kb(totalIn)} -> ${kb(totalOut)}  ` +
        `(-${Math.round((1 - totalOut / totalIn) * 100)}%), metadata stripped\n`,
);

/* ── Scaffold ─────────────────────────────────────────────────────────────
   Paths and structure are filled in because they are mechanical and easy to
   typo. Copy and alt text are left blank because they need a human who saw
   the job. check-photos refuses to pass while any of them are still blank. */

const url = (n) => `/images/projects/${slug}/${n}`;
const cover = written.gallery[0] ?? written.pairs.find((p) => p.startsWith("after")) ?? written.pairs[0];
const rest = written.gallery.slice(1);

const photoLines = rest
    .map((n) => `        { src: "${url(n)}", alt: "" },`)
    .join("\n");

let beforeAfterBlock = "";
if (written.pairs.length) {
    const befores = written.pairs.filter((p) => p.startsWith("before"));
    beforeAfterBlock = befores
        .map((b) => {
            const a = b.replace(/^before/, "after");
            const hasAfter = written.pairs.includes(a);
            return `        {
            /* Pick mode from the photographs, not preference: "wipe" needs a
               registered pair (same camera position and framing). See the rule
               in src/components/ui/SheetPair.tsx:22-37. */
            mode: "pair",
            lead: "",
            before: { src: "${url(b)}", alt: "", label: "Rev. A", note: "Existing" },
            after: { src: "${url(hasAfter ? a : b)}", alt: "", label: "Rev. B", note: "As built" },
            caption: "",
            specs: [{ label: "Scope", value: "" }],
        },`;
        })
        .join("\n");
    beforeAfterBlock = `\n    beforeAfter: [\n${beforeAfterBlock}\n    ],`;
}

console.log(`  ---- paste into src/lib/projects.ts ----\n`);
console.log(`export const ${constName(slug)}: Project = {
    slug: "${slug}",
    title: "TODO",
    summary: "TODO",
    category: "${args.category ?? "TODO"}",
    location: null,
    cover: { src: "${url(cover)}", alt: "" },
    photos: [
${photoLines || "        // none"}
    ],${beforeAfterBlock}
    featured: false,
};`);

console.log(`
  Then: add ${constName(slug)} to the PROJECTS array (position = display order),
  write the title, summary, city and every alt, and run:

      npm run check:photos
`);
