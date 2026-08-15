# CLAUDE.md

Guidance for Claude Code (or any agent) working in this repo.

## What this is

TESTIS is a short narrative web game. Plain HTML/CSS/JS, no build step, no backend, no persistence.
See [README.md](README.md) for how to run it.

## The three docs — read this before touching anything

This repo's content is governed by three companion docs in `docs/`. Each is the **single source of
truth** for its own domain. They cross-reference each other and are written to agree; keeping them
in sync is more important than any individual edit.

| Doc | Domain | Owns |
|---|---|---|
| [docs/the-water-clock-script.md](docs/the-water-clock-script.md) | **Story** | All narrative content: scene text, dialogue, object descriptions, flag/state logic tied to story meaning, branch points, endings, theme, tone. Where the three docs disagree, **this one wins.** |
| [docs/testis-art-prompts.md](docs/testis-art-prompts.md) | **Art** | Image generation prompts, style/negative-prompt boilerplate, asset filenames, what each asset depicts. |
| [docs/testis-tech-design.md](docs/testis-tech-design.md) | **Tech** | Stack choices, file structure, the state machine, data shapes (SCENES/ENDINGS schema), constraints (no framework, no build step, `file://`-safe). Deliberately contains **no narrative content** — code examples with story text are illustrative only, never the real strings. |

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
- If a change touches more than one domain (e.g. a new scene needs new art *and* new code), update
  **all** affected docs in the same change, not just the code. A code change whose corresponding doc
  goes unedited is the drift this file exists to prevent.

### Before editing code

1. Check the script doc for the scene/flag/ending semantics you're implementing — don't invent
   narrative behavior in JS that isn't specified there.
2. Check the tech doc for the expected data shape (`SCENES`, `ENDINGS`, `WITNESS_CALLBACK`) and file
   layout before restructuring anything.
3. Check the art doc for exact asset filenames before adding/renaming image references.

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
  shipped site — don't treat them as authoritative asset locations.

## Conventions

- No ES modules — plain `<script>` tags sharing globals, load order: `scenes.js`, `endings.js`,
  `main.js`. Keep it that way (see tech doc §1 for why).
- No framework, no npm, no bundler, no backend, no persistence. Don't introduce any of these without
  discussing it with the user first — it's a stated constraint, not an oversight.
