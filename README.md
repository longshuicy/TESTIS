# TESTIS

**Beta — v0.1.2-beta.** Playable start to finish, all three endings reachable.

A short narrative web game. Plain HTML/CSS/JS, no build step, no backend, no persistence.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Run it

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8777
```

Then visit <http://localhost:8777>. Everything loads via plain `<script>` tags sharing globals, so
`file://` works too — no ES modules, no server dependency.

## Layout

```
index.html
css/style.css
js/scenes.js     SCENES — all scene data
js/endings.js    ENDINGS + WITNESS_CALLBACK
js/main.js       state machine, rendering, events
assets/          art, filenames per docs/testis-art-prompts.md
```

Load order matters: `scenes.js`, `endings.js`, then `main.js`.

## Art

Images live in `assets/` (not `images/` as the tech-design doc sketches) — filenames are unchanged
and match `docs/testis-art-prompts.md` exactly.

**Missing assets render a procedural placeholder** at the correct path: a dark, in-theme card
labelled with the filename it's waiting for. Drop the real PNG in at that name and it appears on
next load — no code change. Every referenced asset is currently present.

Three of the four `char-*` portraits are used as plates (see [Plates](#plates)) — the portrait ratio
suits a plate, which is why they have no home as backgrounds or hotspot images.
`char-witness-silhouette.png` is not used.

The generated art is dark-native (light linework on black), so CSS only warms and dims it; there is
no inversion. If a later batch comes back as black-ink-on-white instead, the two `filter:` lines in
`.bg` and `.tier2-image` are the only things that need touching.

## Type

Grenze Gotisch (gothic display) for the title, scene titles, choice prompts, and the carved name;
Grenze (its readable serif companion) for prose and for every small tracked-out uppercase label —
blackletter caps at 0.7rem are unreadable, which is what `--label` exists to avoid. Both load from
Google Fonts; the stack falls back to Georgia offline.

Accent is candlelight gold (`--candle`). The background art is lifted with a `brightness()` filter
and legibility comes from the soft column of shade in `.vignette`, not from crushing the image.

## Plates

A plate is a full-bleed image with one line of text and nothing else, held until the player
dismisses it. It's the only mode that shows art undimmed — backgrounds sit under a scrim and tier2
shots are thumbnails — so it's reserved for moments where the image should be the event rather than
the setting. Three fire per playthrough:

| Where | Asset | Form |
|---|---|---|
| Scene 2, before the first word | `char-copernicus-bound.png` | silent |
| Scene 4, on the closing line | `char-copernicus-reveal.png` | captioned |
| Scene 5, before the first word | `char-player-hands.png` | silent |

Two fields, both optional and both accepting either `"path.png"` or `{ image, text }`:

- `openingPlate` — lands before the scene renders; the outgoing scene is faded out first.
- `closingPlate` — pairs with `closingText`, replacing the inline closing paragraph.

Omit the text for a silent plate; it gets more of the frame (74vh rather than 62vh) and is often the
stronger beat. A 4:5 portrait is contained rather than cropped, with a blurred copy of itself
filling the room behind it. Plates are preloaded a scene ahead, so they're warm before they fire.

## Debug jumps

A URL parameter seeds flags and jumps straight to a scene or ending — much faster than replaying to
check a conditional row:

```
?debug=ending-a&looked_away=true&witness_reaction=reached&player_name=Aurelia
?debug=scene-4&examined=tally,astrolabe
```

`true`/`false` are parsed as real booleans. `examined` takes a comma-separated list of tier2 ids.
Strip or gate this before release (`applyDebug` in `js/main.js`).

Watch the console: `lookup()` warns whenever an ending table falls through to its fallback. In
normal play it should never fire.

## Notes for anyone extending it

- `requiresExamined` gates are re-evaluated when the player opens a hotspot, not only at scene load.
  If the gate opens and nothing in the scene has been answered yet, the reactive chain re-renders so
  the gated choice appears (`reconsiderGates`). Once a choice is answered, the gate stays as it was.
- `gate_action`, `tally_reaction`, and `waking_reaction` are set and never read. Deliberate — see the
  flag-consumption table in the script doc.
- `identity_found` is set by the Scene 2 choice, never derived from what was examined. "Never looked"
  and "looked and refused" are both `false` and are meant to be.
- Player-entered text only ever reaches the DOM via `textContent`. Keep it that way.
