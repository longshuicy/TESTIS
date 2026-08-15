# TESTIS

**Beta — v0.2.0-beta.** Playable start to finish, all three endings reachable. Narrative is at script
v3 (`docs/the-water-clock-script.md`): the monks now ask "who gave it to you" rather than demanding
recantation, converting the story from metaphor to mystery. Scene count, tier2 objects, reactive
blocks, flag keys, and branch points are unchanged from v2 — this is a prose and mechanics update,
not a structural one.

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

Images live in `assets/` — filenames match `docs/testis-art-prompts.md` exactly.

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

Two fields, both optional and both accepting either `"path.png"` or `{ image, text }` (`text` is an
array of paragraphs):

- `openingPlate` — lands before the scene renders; the outgoing scene is faded out first.
- `closingPlate` — resolves after a branch choice, in place of the old `closingText` field. Scene 4
  is the one scene that still uses this; its `text` array carries what was `closingText` in v2.

Omit the text for a silent plate; it gets more of the frame (74vh rather than 62vh) and is often the
stronger beat. A 4:5 portrait is contained rather than cropped, with a blurred copy of itself
filling the room behind it. Plates are preloaded a scene ahead, so they're warm before they fire.

While a plate is up it also swaps the background beneath it to the destination scene's, so the plate
lifts onto where you're going rather than onto the scene you just left. `setBackground` ignores a
request for the image already showing, so the scene's own call afterwards is a no-op rather than a
crossfade to itself.

## Morse

Scenes 1, 3 and 6 each carry a fragment of one Latin sentence in morse — `SOL STAT`, `TERRA MOVET`,
`EGO SOLU` (the last cut short on purpose; the full word is `SOLUS`, and the clock runs out before
the final `···`). Set it with a `morse` field holding standard ASCII morse: `.` and `-`, a space
between letters, ` / ` between words.

It surfaces three ways, and is **never translated or completed in-game** — the script doc's design
notes are explicit that players who care will look it up:

- **An ambient inscription** below the scene's prose (`renderScene` in `js/main.js`), typed in
  letter by letter rather than arriving whole, in `·`/`—`, larger and warmer than body text so it
  draws the eye. Selectable, so anyone who spots it can copy it out. Marked `aria-hidden`, since read
  aloud it's noise and spelling it out would translate it.
- **Quoted inline**, inside the tier2 hotspot that actually hears it (the water-clock objects in
  Scenes 1, 3, 6). Put a paragraph containing exactly `{morse}` in that item's `text`, alongside a
  `morse` field on the same item — `prose()`'s `tokens.morse` option types it in the same way, sized
  down to fit the accordion column (`.tier2-panel .morse-inline` in `css/style.css`).
- **The drip beats it out** down the left edge. Real morse timing is far too fast to read as falling
  water, so `DRIP` in `js/main.js` keeps morse's proportions — dashes long, dots short, gaps between
  letters and words — at a tempo you can count. A dash is a longer drop as well as a slower one.

Each typed instance (`typeMorseInto`) is self-contained: it checks `node.isConnected` before every
character rather than relying on a shared timer, so a line left mid-type when a scene changes just
stops quietly once its paragraph leaves the DOM — no cleanup call needed, and two instances (the
ambient one and a hotspot's own) can run at once without fighting each other.

Scenes without a `morse` field keep the ambient CSS drip. The coded drip stops when the scene ends,
including behind plates, and is skipped entirely under `prefers-reduced-motion` (the inscriptions
still render, just without the typing animation).

## The May 1543 calendar

Scene 5's one hotspot with no image (`widget: "calendar-may-1543"` instead of an `image` field).
Built by `buildMayCalendar()` in `js/main.js`: a static Julian grid for May 1543, no navigation,
nothing clickable but the hotspot's own close — the fixed month is the point. Day 24 (the day
Copernicus died, never stated in-game) is circled; days 1–20 are struck through. Both marks are
wobbly hand-drawn SVG paths, not CSS `line-through` or a `border-radius` circle, jittered
deterministically per day number (not `Math.random`) so the calendar looks the same on every load —
the strikes loosen as the day number climbs toward 20.

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
- **`player_name` is read twice**, not once. Besides the endings' closing line, Scene 3's tally
  hotspot (`nameConditional` on that tier2 item) shows the carved name already struck through on the
  roster. Two entirely different passages, not one passage with a name spliced in: declining the
  carve renders a distinct paragraph about an abandoned mark, not a fallback string, so there's no
  `"a name"` substitution here the way there is in the endings — see `item.nameConditional` handling
  in `buildTier2Panel`.
- **`resolveConditional` returns `null`, never `undefined`,** and the one call site that renders a
  scene's `conditionalText` checks for that before calling `prose()`. A scene reached with its
  required flag still at its default (a debug jump straight to Scene 5 or 6 without `looked_away`
  set) used to print the literal word `undefined` into the page; now it just logs a console warning
  and skips the paragraph, the same convention the ending tables' fallback already uses.
