# CLAUDE.md

Guidance for Claude Code (or any agent) working in this repo.

## What this is

TESTIS is a short narrative web game. Plain HTML/CSS/JS, no build step, no backend, no persistence.
See [README.md](README.md) for how to run it.

## The four docs — read this before touching anything

This repo's content is governed by four companion docs in `docs/`. Each is the **single source of
truth** for its own domain. They cross-reference each other and are written to agree; keeping them
in sync is more important than any individual edit.

| Doc | Domain | Owns |
|---|---|---|
| [docs/testis-script.md](docs/testis-script.md) | **Story** | All narrative content: scene text, dialogue, object descriptions, flag/state logic tied to story meaning, branch points, endings, theme, tone. Where the four docs disagree, **this one wins.** |
| [docs/testis-art-prompts.md](docs/testis-art-prompts.md) | **Art** | Image generation prompts, style/negative-prompt boilerplate, asset filenames, what each asset depicts. |
| [docs/testis-tech-design.md](docs/testis-tech-design.md) | **Tech** | Stack choices, file structure, the state machine, data shapes (SCENES/ENDINGS schema), constraints (no framework, no build step, `file://`-safe). Deliberately contains **no narrative content** — code examples with story text are illustrative only, never the real strings. |
| [docs/testis-sound-design.md](docs/testis-sound-design.md) | **Sound** | Beds, stings, the morse drip, the toggle, volume behavior, audio filenames, and the `Sound` interface `main.js` calls. Audio filenames live in `js/audio.js`, never in `scenes.js`/`endings.js`. |

### Routing rule for new content

Before writing anything (in code, in a doc, in a commit), decide which domain it belongs to and put
it there — don't let it leak into the wrong doc or drift the docs out of sync with the code:

- New scene, dialogue, object flavor text, ending, flag meaning, plot/theme decision → **script doc**.
  Update the scene table / flag list there. Do not restate the actual prose in the tech doc.
- New or changed image, prompt, style rule, filename → **art doc**. Filenames referenced from code or
  the script doc must match the art doc exactly (see README's Layout section).
- New file structure, data schema, rendering logic, state machine behavior, constraint (e.g. "must
  work over `file://`") → **tech doc**. No narrative strings — abbreviate or reference the script doc
  instead.
- New or changed bed, sting, silence, volume rule, audio filename, or `Sound` method → **sound doc**.
  A new sound belongs inside `js/audio.js`, behind an existing `Sound` call, not as a new call site
  in `main.js`.
- If a change touches more than one domain (e.g. a new scene needs new art *and* new code), update
  **all** affected docs in the same change, not just the code. A code change whose corresponding doc
  goes unedited is the drift this file exists to prevent.

### Before editing code

1. Check the script doc for the scene/flag/ending semantics you're implementing — don't invent
   narrative behavior in JS that isn't specified there.
2. Check the tech doc for the expected data shape (`SCENES`, `ENDINGS`, `WITNESS_CALLBACK`) and file
   layout before restructuring anything.
3. Check the art doc for exact asset filenames before adding/renaming image references.
4. Check the sound doc before touching `js/audio.js` — especially §1 (the three earned silences) and
   §12 (the `Sound` interface). The silences are load-bearing; they are cheap to break by accident.

### After editing code or docs

- If you changed scene flow, flags, or endings in code, confirm the script doc still describes that
  behavior — update it if not.
- If you added/renamed/removed an asset, update the art doc's filename list and the README's Layout
  note if relevant.
- If you changed the file structure, module load order, or data schema, update the tech doc.
- If a doc's revision note / "unchanged from vN" claim is no longer true, update that note too —
  don't leave stale version claims sitting next to changed content.

## Known intentional deviations

- `assets_backup/` and `assets_tint/` are working directories for the art pipeline, not part of the
  shipped site — don't treat them as authoritative asset locations. Shipped assets are
  `assets/images/` (art) and `assets/sound/` (audio).
- Shipped art is WebP, generated from the PNG masters in `assets_backup/images-png-master/` by
  `scripts/optimize_images.sh`. Masters are git-ignored, so a fresh clone can't regenerate them —
  the committed `.webp` files are the artifacts. Never hand-convert an image or commit a PNG to
  `assets/images/`; add the master and re-run the script. Art doc §3c explains the widths and why
  the downscale is load-bearing (decoded bitmap memory, not file size, is what crashes phones).
- `assets/widgets/` holds standalone HTML prototypes. Nothing there is fetched at runtime — the
  shipped calendar is built in `main.js`, and fetching fragments would break `file://`.
- `assets_sound_src/` holds the original 320kbps/24-bit audio masters, git-ignored like the other
  working directories. Shipped audio is re-encoded from there by `scripts/optimize_audio.sh`, never
  edited in place — the audio counterpart to `scripts/optimize_images.sh`, same masters-are-truth
  bargain. `drip.wav` lives there too: the game loads `drip-single.wav`, one drip cut out of it (a cut
  the script does not make). See sound doc §10.
- Shipped audio is mixed `.m4a` and `.wav` — `bed-scene-5.wav` and `drip-single.wav` are
  deliberately uncompressed (loop gaplessness and trigger latency). Never assume one extension;
  sound doc §7 explains both exceptions. `plate-scene-7.m4a` loops and is *not* a third exception:
  AAC's padding lands inside silence its recording already ends with. That was checked, not assumed —
  the question is whether the seam falls in sound or in silence, not whether the file loops.
- Audio still ships over the sound doc's 8MB budget (~31MB, down from ~127MB). The remaining gap is
  bed *length*, not bitrate, and closing it means trimming the music to loops — an editorial call
  that has not been made. See sound doc §7 before "fixing" it.

## Conventions

- No ES modules — plain `<script>` tags sharing globals, load order: `scenes.js`, `endings.js`,
  `audio.js`, `main.js`. Keep it that way (see tech doc §1 for why).
- No framework, no npm, no bundler, no backend, no persistence. Don't introduce any of these without
  discussing it with the user first — it's a stated constraint, not an oversight.
