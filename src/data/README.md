# Project content

Two files, both edited by hand. `src/lib/projects.ts` composes them into the
shape the pages consume, validates them at build time, and owns everything
that is code rather than content (types, helpers, the before/after studies).

## `projects.json` — the tile

One entry per project. This is what the `/projects` grid paints, plus the
cover photo reused as the detail-page hero and the Open Graph image.

**Array order is the display order of the grid**, and the `PRJ-NN` sheet
numbers are derived from position, so reordering this file renumbers the grid
automatically. Nothing sorts on `completedAt`.

```json
{
    "slug": "kitchen-navy-brass",
    "title": "Navy & Brass Kitchen",
    "summary": "Answer-first, 1-2 sentences. Feeds the card and the meta description.",
    "category": "kitchen",
    "location": "Rockville, MD",
    "cover": { "src": "/images/projects/kitchen/kitchen6.jpg", "alt": "..." },
    "featured": false,
    "completedAt": "2025-04"
}
```

**No `photos` here.** Carousel frames live in `project-gallery.json`. A
`photos` array on a record in this file fails the build.

| Field | Notes |
| --- | --- |
| `slug` | Unique. It is the URL segment and the key into `project-gallery.json`. |
| `category` | One of `kitchen` `bath` `basement` `addition` `garage` `exterior` `whole-home`. |
| `location` | `"City, ST"`, or `null` when the city is not confirmed. `null` prints no chip; do not write `"TBD"`. See *The tile label* below. |
| `cover` | The tile image and the OG image. Deliberately *not* shown in the modal. |
| `featured` | `true` spans two grid columns and leads the home-page carousel. |
| `hidden` | Optional `true`. Keeps the record out of the portfolio entirely — the `/projects` grid, the "more work" strips, and the `PRJ-NN` numbering — while it stays reachable by slug. See *Hiding a project* below. |
| `completedAt` | Optional `"YYYY-MM"`. Only emitted into structured data; omit rather than guess. |

### Hiding a project

`"hidden": true` drops a record from `PROJECTS`, which is what every portfolio
surface reads: the `/projects` grid, the "more work" strip on detail pages,
`FEATURED_PROJECTS`, and the sheet numbers. The sequence closes over it, so
hiding `PRJ-05` renumbers the rest rather than leaving a gap.

It is not a soft delete. Use it when the record still has a job to do
elsewhere — the cover feeding a service-page carousel through a named export
in `src/lib/projects.ts` — but the project does not earn a tile of its own.
`bySlug` still finds it, so those exports keep working. If nothing references
it, delete the record and its `project-gallery.json` slot instead.

### The tile label

Every tile prints one mono line above its title. By default that line is the
sheet number:

```
PRJ—03 · BATHROOM          CLARKSVILLE, MD · BATHROOM
Slate Vanity Primary Bath  White Marble Primary Bath
```

The right-hand form is what a finished project should look like. A tile leads
with its city once its slug is listed in `CITY_LABEL_SLUGS` at the top of
`TileInner` in `src/components/sections/ProjectGrid.tsx` — **add the slug there
when you add the project**, or the card reads `PRJ-NN` and repeats the city on
a third line underneath, which is the tell that this step was missed.

It is an opt-in list rather than "any record with a `location`" on purpose: a
city being confirmed is not the same decision as a project being finished
enough to lead with it. Records still carrying a sheet number are not bugs.

`null` location and a listed slug is not a failure - the tile falls back to the
sheet number - so a project can be listed before its city is confirmed.

## `project-gallery.json` — what the carousel shows

**This is the only place carousel frames live.** Keyed by the same `slug`, one
slot per project. Every project needs a slot, even an empty one; a missing slot
fails the build.

```json
"kitchen-navy-brass": {
    "intro": "Optional paragraph under the title in the modal.",
    "photos": [
        {
            "src": "/images/projects/kitchen/kitchen6b.jpg",
            "alt": "Describe what is in the frame, not \"project photo 2\".",
            "status": "before"
        }
    ]
}
```

**The cover is never shown in the modal.** `cover` is the grid tile, and
opening a tile should reveal frames the visitor has not already seen rather
than replaying the one they just clicked. So `photos` is the complete modal
gallery: three entries open a three-image modal reading `01 / 03`. Listing the
cover's `src` again inside `photos` fails the build, because it would put the
tile image back in the modal.

**An empty `photos` array means an empty modal.** The tile still opens and
shows a short "photographs are being prepared" message in place of the frame.
To give a project a finished shot in its modal, add a *different* frame of the
finished work - not the cover file.

- `alt` is required and is read aloud by screen readers. Describe the frame.
- **`caption` stays off.** The field exists and renders a label bar under the
  frame, but do not write one. A row of invented room names ("Utility Sink",
  "Closet Run") reads as filing, not as photography, and it says nothing the
  photograph is not already showing. The `alt` text carries the description,
  and it carries it to the people who actually need it.
- `status` is optional: `"before"`, `"after"`, or `"in-progress"`. It stamps a
  chip beside the city. Omit it for ordinary finished work rather than
  labelling every frame `"after"`.
- `intro` is optional. An empty string renders nothing.

Past eight photos the thumbnail strip becomes a sliding window, so the main
frame still reaches every image while the strip stays eight wide.

## Photo folders and file naming

One folder per job, named `<type>_<city>_<year>`:

```
public/images/work_gallery/addition_bethesda_26/
public/images/work_gallery/bath_potomac_2024/
```

Inside it, **name every file for the stage it shows**, zero-padded:

| Prefix | `status` value | What it shows |
| --- | --- | --- |
| `pre_01.jpg` | `"before"` | existing conditions, before any work |
| `prog_01.jpg` | `"in-progress"` | demolition through punch list |
| `after_01.jpg` | `"after"` | finished work, site cleared |

Pad to two digits (`pre_01`, not `pre_1`) or the files sort wrong past nine.

The prefixes are shorter than the status values they map to, so the table above
is the translation. `prog` means `in-progress`.

**Where the line falls between `prog` and `after`:** a frame with visible blue
tape, protective film, drop cloths, a dumpster, or tools still in shot is
`in-progress`, however finished the room looks. `after` means a client could
walk in. Getting this wrong stamps AFTER over a photo of bare studs, which
costs more credibility than an extra progress frame ever gains.

## Do not convert images

Ship the camera JPEGs as they are. `next.config.ts` sets
`images.formats: ["image/avif", "image/webp"]` with the optimizer enabled, so
every frame is transcoded and resized per request. A measured example: a 2048px
484 KB JPEG is served as a 137 KB AVIF. Hand-converting to WebP adds a build
step, produces one fixed-size file the optimizer then has to resize anyway, and
usually is not even the format that wins negotiation.

Fresh Lightroom exports carry Exif (camera, capture date). Next strips it on
the way out, but it does land in git history. Worth a `mogrify -strip` if a
future shoot might include phone GPS, which would pin a client's address.

## Adding a project

1. Make the folder, drop the images in, and name them by stage as above.
2. Add the record to `projects.json` at the position you want it in the grid.
   Array order is the grid order.
3. Add a matching `project-gallery.json` slot, even if `photos` is empty.
4. Write real `alt` for every frame - describe what is actually in the shot,
   not "project photo 2". Screen readers read this aloud, and it is what the
   `ImageGallery` structured data falls back to. No `caption` - see above.
5. Add the slug to `CITY_LABEL_SLUGS` in `ProjectGrid.tsx` so the tile leads
   with the city instead of `PRJ-NN`. See *The tile label* above.
6. Check it in the browser: open the tile, walk the frames, confirm the counter
   and the stage stamps change where you expect.

A slug in one file and not the other fails the build with a named error rather
than rendering a blank tile. Same for an unknown `category` or `status`, a
duplicate slug, a `photos` array in the wrong file, or a cover repeated as a
gallery frame.

## What is deliberately not here

Before/after studies live in `BEFORE_AFTER` in `src/lib/projects.ts`. They
drive the service-page comparison bands, not the modal, and choosing `"wipe"`
against `"pair"` is a judgement about whether two photographs are registered
to the same vantage point. That reasoning belongs next to the data.
