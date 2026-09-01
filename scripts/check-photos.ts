#!/usr/bin/env tsx
/**
 * Guards the project photo data. Nothing else in the repo verifies that a
 * `src` string in projects.ts points at a file that exists, so a typo ships a
 * broken image and only surfaces in a browser.
 *
 *   npx tsx scripts/check-photos.ts      (or: npm run check:photos)
 *
 * Runs as part of `npm run build`, so a bad path fails the build instead of
 * reaching production.
 */

import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { PROJECTS, hasDetailPage, DETAIL_PHOTO_THRESHOLD } from "../src/lib/projects";

const PUBLIC = path.resolve("public");
const PHOTO_ROOT = path.join(PUBLIC, "images/projects");

const errors: string[] = [];
const warnings: string[] = [];

/** Every image path referenced anywhere in the project data. */
const referenced = new Set<string>();

for (const project of PROJECTS) {
    const where = `${project.slug}`;

    const frames: { src: string; alt: string; label: string }[] = [
        { src: project.cover.src, alt: project.cover.alt, label: "cover" },
        ...project.photos.map((p, i) => ({ src: p.src, alt: p.alt, label: `photos[${i}]` })),
        ...(project.beforeAfter ?? []).flatMap((study, i) => [
            { src: study.before.src, alt: study.before.alt, label: `beforeAfter[${i}].before` },
            { src: study.after.src, alt: study.after.alt, label: `beforeAfter[${i}].after` },
        ]),
    ];

    for (const frame of frames) {
        referenced.add(frame.src);

        // 1. The file has to exist.
        if (!existsSync(path.join(PUBLIC, frame.src))) {
            errors.push(`${where} ${frame.label}: file not found -> ${frame.src}`);
        }

        // 2. Alt text describes the photograph. An empty one is a scaffold that
        //    was never filled in, and it ships as an unlabelled image.
        if (!frame.alt.trim()) {
            errors.push(`${where} ${frame.label}: empty alt -> ${frame.src}`);
        }
    }

    // 3. Scaffold placeholders must not reach production.
    for (const [field, value] of [
        ["title", project.title],
        ["summary", project.summary],
        ["category", project.category as string],
    ] as const) {
        if (value.trim().toUpperCase() === "TODO") {
            errors.push(`${where}: ${field} is still "TODO"`);
        }
    }

    // Informational: how close this project is to earning a detail page.
    if (!hasDetailPage(project)) {
        const total = 1 + project.photos.length;
        warnings.push(
            `${where}: ${total} photo${total === 1 ? "" : "s"}, needs ${DETAIL_PHOTO_THRESHOLD} ` +
                `(or a beforeAfter study) for a /projects/${project.slug} page`,
        );
    }
}

/* 4. Files on disk that nothing points at are weight in git for no reason.
      Grepped against all of src/ first, because an image can legitimately be
      referenced from somewhere other than the PROJECTS array. */
function walk(dir: string): string[] {
    if (!existsSync(dir)) return [];
    return readdirSync(dir).flatMap((entry) => {
        const full = path.join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });
}

const srcTree = walk(path.resolve("src"))
    .filter((f) => /\.(ts|tsx|js|jsx)$/.test(f))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");

for (const file of walk(PHOTO_ROOT)) {
    const webPath = "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
    if (referenced.has(webPath)) continue;
    if (srcTree.includes(path.basename(file))) continue;
    warnings.push(`orphan: nothing references ${webPath}`);
}

/* ── Report ───────────────────────────────────────────────────────────── */

if (warnings.length) {
    console.log(`\n  ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`    - ${w}`);
}

if (errors.length) {
    console.error(`\n  ${errors.length} error(s):`);
    for (const e of errors) console.error(`    x ${e}`);
    console.error("");
    process.exit(1);
}

const photoCount = PROJECTS.reduce((n, p) => n + 1 + p.photos.length, 0);
const detail = PROJECTS.filter(hasDetailPage).length;
console.log(
    `\n  ok: ${PROJECTS.length} projects, ${photoCount} photos, ` +
        `${detail} with detail pages. All paths resolve, all alt text present.\n`,
);
