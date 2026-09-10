@AGENTS.md

# Section band standard

The About page is the design reference for every numbered content band. When
building a new page section, match it rather than inventing a treatment.

Header grammar lives in `src/components/ui/SectionHeader.tsx` — always use it,
never hand-roll the label/number/headline stack:

1. mono label `Prefix 01.0X` + trailing dashed rule
2. oversized ghost number bleeding behind an offset headline
3. optional accent bar + mono `meta` stamp under the headline

`meta` is the About-page stamp ("Est. 2010 · DMV Area"). Keep it factual — it
reads as a drafting-sheet annotation, not a tagline. `kicker` is optional and
appends "· Kicker" to the label; the About grammar omits it and lets the sheet
number carry the label alone. Prefer omitting it on new work.

Two surfaces, per the dark-mode skill's two-surface model:

- **Themed band** (default) — reference `WhoWeAre.tsx`:
  `bg-surface`, `<BlueprintGrid className="... text-light-blue opacity-40" />`,
  `py-24 md:py-32`, inner `relative z-10 mx-auto max-w-6xl px-6`,
  `SectionHeader` default tone, body copy `text-foreground/80`.
- **Ink band** — reference `OurStory.tsx`: `bg-ink-raised` (or the steel
  gradient for CTAs), `SectionHeader tone="ink"`, body copy on fixed tokens.

Rules that keep the rhythm working:

- Body copy on themed bands is `text-foreground/80`, not `text-muted`.
  `--color-muted` measures 4.17:1 on `bg-surface` and 3.96:1 on
  `bg-surface-muted`, both under the 4.5:1 AA floor. Reserve `text-muted` for
  the `meta` stamp and incidental labels.
- Never stack two ink bands back to back. A steel band directly above the
  `ReadyToTransform` CTA merges into one dark slab and costs the CTA its
  emphasis — alternate themed and ink instead.
- No hardcoded hex. Themed surfaces use flipping tokens, ink surfaces use the
  fixed brand/ink/steel tokens.

# Using the ui-ux-pro-max skills

All seven skills in the `ui-ux-pro-max` plugin are available and work. They are
written against a generic shadcn + Tailwind v3 project, so translate their
output before applying it here. This project is **Tailwind v4, no shadcn**.

Which skill to reach for:

- `ui-ux-pro-max:ui-ux-pro-max` — the design database. Styles, palettes, font
  pairings, UX guidelines, motion presets, chart types, per-stack rules. Query
  it with `scripts/search.py`, always `--stack nextjs` for stack guidelines or
  `--domain style|color|typography|ux|gsap|chart` for design lookups. This is
  the one worth using most.
- `ui-ux-pro-max:design-system` — token architecture and component specs.
- `ui-ux-pro-max:brand` — voice, messaging, brand consistency.
- `ui-ux-pro-max:banner-design`, `:slides`, `:design` — asset generation.
  Logo/icon generation in `:design` needs `GEMINI_API_KEY`; everything else is
  offline.
- `ui-ux-pro-max:ui-styling` — generic shadcn/Tailwind reference. Lowest value
  here; its code samples assume components this repo does not have.

Translation rules — apply to output from any of them:

- Never run `npx shadcn@latest init` or `add`. There is no `components.json`.
  `src/components/ui/` is hand-built; extend it, don't overwrite it.
- Never create `tailwind.config.js` and ignore any generated one. Tokens live
  in `@theme` in `src/app/globals.css`.
- Never take their dark-mode pattern (`bg-white dark:bg-gray-900`). Use the
  two-surface token model above. No hardcoded hex, ever.
- Their form examples assume react-hook-form + zod. Neither is installed;
  don't add them for a single form.
- Icons come from `@tabler/icons-react`, not their icon set.
- `font-title` (Unica One) is single-weight — never `font-bold` on it.

A style the database returns is a starting point, not a verdict. The section
band standard above wins on any conflict.
