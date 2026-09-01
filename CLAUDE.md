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
