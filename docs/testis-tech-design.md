# TESTIS Technical Design Document

Build spec. Companion to `testis-script.md` (all narrative content, the source of truth),
`testis-art-prompts.md` (art direction and asset filenames), and `testis-sound-design.md` (audio
behavior and audio filenames).

**Read the script doc first.** This doc contains no narrative content and deliberately does not
duplicate any. Where a code example shows story text, it is abbreviated illustration only; the real
strings come from the script.

**Constraints:** no backend, no persistence, single player, single session (refresh restarts), static
site, no build step. Target: working and polished in roughly 10 hours.

---

## 1. Stack

Plain HTML, CSS, and vanilla JS. No framework, no npm, no bundler.

The whole application is a state machine over a mostly-linear script: render scene, handle click,
look up next scene, repeat. A framework's strengths (component reactivity, routing, complex shared
state) buy nothing here and cost setup time against a tight budget. A folder that runs by opening
`index.html` is also trivial to host later on GitHub Pages, itch.io, or Neocities.

**One consequence worth planning for:** ES module imports (`import`/`export`) fail on `file://` in
most browsers due to CORS. Either run a local server while developing (`python3 -m http.server`) or
skip modules and load plain scripts in order via `<script>` tags, letting them share globals. For a
project this size the second option is simpler and removes the server dependency entirely. The code
examples below assume plain scripts and global consts.

---

## 2. File structure

```
/testis
  index.html
  /css
    style.css
  /js
    scenes.js      // SCENES array, all scene data
    endings.js     // ENDINGS array + WITNESS_CALLBACK shared table
    audio.js       // AUDIO state, the Sound facade, every assets/sound/ filename
    main.js        // state machine, rendering, event handling
  /assets
    /images        // 32 art assets, filenames per testis-art-prompts.md
    /sound         // 14 audio assets, filenames per testis-sound-design.md
    /widgets       // standalone HTML prototypes; not loaded by the game
```

Load order in `index.html`: `scenes.js`, `endings.js`, `audio.js`, then `main.js`.

`audio.js` must load before `main.js` (which calls into `Sound`) and may read `SCENES` for bed
preloading, so it goes after the data files. It owns every audio filename and every decision about
when a sound plays; `main.js` only reports events to the `Sound` facade and holds no audio state.
See [testis-sound-design.md](testis-sound-design.md) §12 for that interface.

`/assets/widgets` holds design prototypes (e.g. `calendar-widget.html`, an early static version of
the Scene 5 calendar). Nothing there is fetched at runtime — the shipped calendar is built in
`main.js`. Fetching HTML fragments would break the `file://` constraint anyway.

Asset filenames are defined in the art prompts doc and must match exactly. Do not invent new names
at build time; if an asset is missing, use a placeholder at the correct path rather than renaming.

---

## 3. Scene schema

One object per scene. `main.js` holds rendering logic only and never hardcodes narrative content.

```js
const SCENES = [
  {
    id: "scene-1",
    background: "assets/images/scene-1-gate.png",

    // Array of paragraphs, not one blob. Lets the renderer control spacing and pacing.
    text: [
      "I came to the gate the way one comes to a grave...",
      "Somewhere behind the stone, water was falling..."
    ],

    // Optional inline conditional paragraph appended after `text`.
    // Used by Scene 5 (looked_away). Omit where unused.
    conditionalText: {
      key: "looked_away",
      cases: { true: "I had looked away from him...", false: "I had watched him become this..." }
    },

    // Examine hotspots. Optional, non-blocking, any number.
    tier2: [
      {
        id: "sundial",
        label: "The sundial",
        image: "assets/images/obj-sundial.png",   // optional; omit for text-only
        text: "A dial with no sun to read by..."
      },
      {
        id: "hands",
        label: "Your own hands",
        // Conditional tier2 body. Used by Scene 6. Mutually exclusive with `text`.
        conditionalText: {
          key: "looked_away",
          cases: { true: "My hands were shaking...", false: "My hands were steady..." }
        }
      },
      {
        id: "threshold",
        label: "The worn threshold letters",
        text: "Someone had carved letters here once...",
        // Special-case interaction. Only Scene 1 uses this.
        interaction: {
          type: "text_input",
          flagKey: "player_name",
          maxLength: 20,
          placeholder: "Carve your name...",
          submitLabel: "Carve",
          declineLabel: "Leave the stone as you found it.",
          submitResponse: "I pressed the word into stone...",
          declineResponse: "I let the letters stay half-erased..."
        }
      }
    ],

    // ARRAY, not a single object. Scene 3 has two; every other scene has one or none.
    // They resolve in sequence, in array order.
    reactive: [
      {
        prompt: "What do you do at the gate?",
        flagKey: "gate_action",
        // Optional gate: only render if these tier2 ids have been examined.
        requiresExamined: null,
        options: [
          { label: "Call out.", value: "called", response: "No one answered..." },
          { label: "Step through in silence.", value: "silent", response: "I entered the way guilt enters a room..." }
        ]
      }
    ],

    next: "scene-2"   // omit when the scene ends in a branch
  }
];
```

### Fields that exist because the script requires them

These are not speculative generality. Each maps to a specific place in the script, and omitting any
of them will break that scene.

| Field | Required by | Behavior |
|---|---|---|
| `reactive` as **array** | Scene 3 | Two reactive blocks resolve in sequence (tally, then tools). All other scenes have 0 or 1. |
| `conditionalText` on scene | Scene 5 | A paragraph whose content depends on `looked_away`, appended after the main text. |
| `conditionalText` on tier2 | Scene 6 | The "your own hands" hotspot body depends on `looked_away`. |
| `requiresExamined` | Scenes 2 and 3 | Scene 2's naming choice renders only if both `astrolabe` and `star-chart` were examined. Scene 3's tally reaction renders only if `tally` was examined. If the gate fails, skip the block silently and leave the flag at its default. |
| `interaction` | Scene 1 | The name-carving text input. The only free-text entry in the game. |
| `closingText` | Scene 4 | Text that must render *after* the branch choice resolves, before advancing. |

### Branch scenes

Only two scenes branch. Everything else uses `next`.

```js
{
  id: "scene-4",
  background: "assets/images/scene-4-reveal.png",
  text: [ /* ... */ ],
  tier2: [ { id: "eyes", image: "assets/images/obj-eyes-his.png", /* ... */ } ],
  reactive: [ { flagKey: "witness_reaction", options: [ /* A-D */ ] } ],
  branch: {
    flagKey: "looked_away",
    options: [
      { label: "I looked away.",   value: true,  next: "scene-5" },
      { label: "I kept watching.", value: false, next: "scene-5" }
    ]
  },
  // Renders after the branch resolves, before advancing. Scene 4 only.
  closingText: "\"I'm ahead of my time,\" he said..."
}
```

Scene 4's branch converges (both options lead to `scene-5`) and only sets a flag. Scene 7's diverges
to the three endings. Both use the same structure, so the renderer needs no special casing.

**Scene 4 render order is strict:** text → tier2 available → reactive choice → reactive response →
branch choice → `closingText` → advance. The closing line is the emotional payoff of the scene and
must not appear before the player has chosen whether to look away.

---

## 4. Ending schema

```js
// Shared across all three endings. Store once, reference from each.
const WITNESS_CALLBACK = {
  keys: ["looked_away", "acknowledged_witness"],
  table: [
    { match: { looked_away: true,  acknowledged_witness: "held"    }, text: "..." },
    { match: { looked_away: false, acknowledged_witness: "avoided" }, text: "..." },
    { match: { looked_away: true,  acknowledged_witness: "avoided" }, text: "..." },
    { match: { looked_away: false, acknowledged_witness: "held"    }, text: "..." }
  ]
  // No fallback: all 4 combinations are covered.
};

const ENDINGS = [
  {
    id: "ending-a",
    background: "assets/images/ending-a.png",
    baseOpening: "I let it happen...",
    conditionalMiddle: {
      keys: ["witness_reaction", "looked_away"],
      table: [ /* 8 rows, all combinations covered */ ],
      fallback: "I thought of him, of the water..."   // guard only; should never fire
    },
    manuscriptCallback: null,    // ending-c only
    closing: "\"I'm ahead of my time,\" I said to no one... Somewhere, someone was carving {player_name} into a threshold..."
  }
];
```

**Assembly order** (identical for all three endings, no headers, no visible seams between blocks;
the player should read one continuous passage):

1. `baseOpening`
2. `conditionalMiddle` matched row, else fallback
3. `WITNESS_CALLBACK` matched row
4. `manuscriptCallback` Ending C only
5. `closing` with `{player_name}` interpolated

**Table coverage**, worth knowing before writing tests:

| Ending | Keys | Rows | Complete? |
|---|---|---|---|
| A | `witness_reaction` × `looked_away` | 8 | Yes, 4×2 |
| B | `tools_reaction` × `looked_away` | 6 | Yes, 3×2 |
| C | `identity_found` × `seen_reaction` | 6 | Yes, 2×3 |
| Shared witness callback | `looked_away` × `acknowledged_witness` | 4 | Yes, 2×2 |

All tables are complete. A fallback firing in normal play indicates a null flag, which is a bug, not
a content gap. Consider a `console.warn` in the fallback path during development.

---

## 5. State and flags

```js
const flags = {
  player_name: null,
  gate_action: null,
  identity_found: false,
  tally_reaction: null,
  tools_reaction: null,
  witness_reaction: null,
  looked_away: null,
  waking_reaction: null,
  seen_reaction: null,
  acknowledged_witness: null,
  final_choice: null
};

const examined = new Set();   // tier2 ids, drives `requiresExamined` gating
let currentSceneId = "scene-1";
```

One plain object, held in memory, mutated directly. No persistence, so it resets on load, which is
the intended behavior.

**`gate_action`, `tally_reaction`, and `waking_reaction` are never read after being set.** This is
deliberate, documented in the script doc, and not a bug to fix. They give the player agency in the
moment without multiplying ending permutations.

**`identity_found` is set explicitly by the Scene 2 choice**, not derived from what was examined.
Examining both clues only unlocks the *choice*; the player can still decline, which sets it `false`.
Do not shortcut this by setting the flag when the second clue is examined. The distinction between
"never looked" and "looked and refused" is thematically load-bearing.

---

## 6. Render loop

```js
function renderScene(id) {
  const scene = SCENES.find(s => s.id === id);
  fadeOut(() => {
    preload(nextPossibleImages(scene));
    setBackground(scene.background);
    renderParagraphs(scene.text);
    if (scene.conditionalText) renderParagraph(resolveConditional(scene.conditionalText));
    renderTier2(scene.tier2);
    advanceReactive(scene, 0);
    fadeIn();
  });
}

// Walks the reactive array in sequence, honoring requiresExamined gates.
function advanceReactive(scene, i) {
  const blocks = scene.reactive || [];
  if (i >= blocks.length) return renderExit(scene);

  const block = blocks[i];
  if (block.requiresExamined && !block.requiresExamined.every(id => examined.has(id))) {
    return advanceReactive(scene, i + 1);   // gate failed, skip silently
  }

  renderChoices(block, choice => {
    flags[block.flagKey] = choice.value;
    renderParagraph(choice.response);
    advanceReactive(scene, i + 1);
  });
}

// After all reactive blocks: either a branch, or a continue button.
function renderExit(scene) {
  if (scene.branch) {
    renderChoices(scene.branch, choice => {
      flags[scene.branch.flagKey] = choice.value;
      if (scene.closingText) renderParagraph(scene.closingText);
      renderContinue(() => advanceTo(choice.next));
    });
  } else {
    renderContinue(() => advanceTo(scene.next));
  }
}

function advanceTo(id) {
  currentSceneId = id;
  id.startsWith("ending-") ? renderEnding(id) : renderScene(id);
}

function renderEnding(id) {
  const e = ENDINGS.find(x => x.id === id);
  const blocks = [
    e.baseOpening,
    lookup(e.conditionalMiddle),
    lookup(WITNESS_CALLBACK),
    e.manuscriptCallback,
    interpolate(e.closing)
  ].filter(Boolean);
  fadeOut(() => { setBackground(e.background); renderParagraphs(blocks); fadeIn(); });
}

function lookup(block) {
  const row = block.table.find(r => block.keys.every(k => r.match[k] === flags[k]));
  if (!row && block.fallback) console.warn("Fallback fired:", block.keys, flags);
  return row ? row.text : block.fallback;
}

function interpolate(str) {
  const name = (flags.player_name || "").trim();
  return str.replace("{player_name}", name || "a name");
}
```

**Note the strict equality in `lookup`.** `looked_away` is a real boolean, and `identity_found` is a
real boolean. Store them as booleans in both the flags object and the match tables, never as the
strings `"true"`/`"false"`. Object keys stringify, so if you build match rows from object literals
keyed by boolean, they will silently fail to match. The `table` + `match` structure above avoids
this; don't refactor it into a nested keyed object.

**`{player_name}` must never render as `null`, `undefined`, or an empty gap.** It is the final line
of the game and the payoff for a decision made twenty minutes earlier. Empty or whitespace-only
input falls back to the literal words `a name`, which keeps the sentence grammatical and preserves
the intended ambiguity.

---

## 7. UI behavior

**Tier 2 hotspots: inline accordion, not modals.** Render as a small list of clickable labels below
the scene text. On click, expand inline to reveal the body text (and image, if present) directly
beneath the label. No overlay, no dismissal step, no interruption to reading rhythm. Toggling closed
is optional and does not affect state. Add each clicked id to `examined` on first open.

**Choices arrive; they do not sit there.** A choice block is built and appended when its scene paints,
and it holds its full height from that moment — nothing below a choice ever shifts — but its prompt
and options are *veiled* (`opacity: 0`) until the player has actually scrolled to it. Painting them
visible up front meant nothing happened at the moment the player finished reading: they scrolled into
more page, and the options at the bottom of it went unread. The reveal is the event.

The trigger is a rect check on `scroll`/`resize`, rAF-throttled, firing when the block's top crosses
62% of the viewport — deliberately **not** an `IntersectionObserver`, because an observer that quietly
fails to fire leaves the options permanently invisible and there is no recovery from that. Then, in
order:

| Beat | Reactive block | Branch |
|---|---|---|
| Bed settles out, page dims, nothing else | 650ms | 900ms |
| Prompt, then the first option | +340ms | +620ms |
| Each further option | +400ms | +680ms |
| An option becomes clickable, after its own fade | +460ms | +460ms |

An option is inert until its fade finishes — `aria-disabled`, **not** `disabled`, since a disabled
button is not focusable and a keyboard player has to be able to tab into the block to trigger it at
all. The click handler returns early while `aria-disabled` is `"true"`; `disabled` is still what a
resolved block uses. The prompt is `position: sticky` so a long branch cannot scroll its own question
away.

**The reveal is permanent; the dim is not.** One watcher per block drives both, and they are
deliberately not the same lifetime:

- **The reveal** fires once. The options arrived, and that is a thing that happened. Re-running a
  2.6-second arrival on every scroll wobble reads as a glitch — and the bed is halted by then, so a
  second arrival would look like the first and sound like nothing.
- **The hold** — `choosing` on `.scene-content`, dropping everything already read to `opacity: 0.55`
  — tracks scroll position and is released whenever the player scrolls back up away from the block.
  Scrolling up is a *reading* action: a player going back for a line they half remember needs that
  line at full strength, not held behind a question they are still thinking about. Answering releases
  it for good.

**Two thresholds, not one.** The block takes the page when its top crosses `REVEAL_LINE` (62%) and
gives it back only when it falls past `RELEASE_LINE` (90%). A single line strobes the dim on any small
scroll that happens to sit on it; the dead zone between them is what makes normal reading quiet.

Reduced motion keeps the held beat and gives up only the stagger and the fades: the pause is the
intent, the movement is not.

Reveals in flight own timers and listeners, so **`clearReveals()` must run before any code discards
rendered blocks** — a scene change and `reconsiderGates()` both do.

**Text input (Scene 1 only):**
```html
<input type="text" id="carve-input" maxlength="20" placeholder="Carve your name...">
<button id="carve-btn">Carve</button>
<button id="decline-btn">Leave the stone as you found it.</button>
```
Trim on submit. No sanitization beyond native `maxLength`; this string is only ever inserted via
`textContent`, never `innerHTML`. Keep it that way and there is no injection surface.

**Transitions: one CSS class, 400ms.**
```css
.scene-content { transition: opacity 400ms ease; opacity: 1; }
.scene-content.fade-out { opacity: 0; }
```
```js
function fadeOut(cb) {
  el.classList.add("fade-out");
  setTimeout(() => { cb(); el.classList.remove("fade-out"); }, 400);
}
```
No transition library. Fade the content, not the whole page; the background can crossfade separately
with two stacked layers if time allows, but content-only is enough to read as polished.

**No persistence.** Refresh restarts. No localStorage, no save, no continue button.

**Preload next images.** Branch scenes have multiple possible next backgrounds, so preload all of
them, not just one:
```js
function nextPossibleImages(scene) {
  if (scene.branch) return scene.branch.options.map(o => backgroundFor(o.next));
  return scene.next ? [backgroundFor(scene.next)] : [];
}
function preload(paths) { paths.forEach(src => { new Image().src = src; }); }
```
Roughly fifteen lines, removes the blank-image flash on every transition. Worth doing.

---

## 8. Polish pass

- **Vignette:** one fixed full-screen div, `pointer-events: none`, above content.
  `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)`
- **Drip animation:** CSS keyframes only, no JS. A slow, irregular loop reads as more unsettling than
  a metronomic one. Thematically apt, since the drip is a clue with a rhythm.
- **Typography:** one serif display face, line-height 1.6 to 1.8, max line length around 70
  characters. This is a reading-heavy game and long lines are the fastest way to make prose feel like
  work.
- **Choice buttons:** never let them shift layout on hover; the text underneath is the point.
- **Reduced motion:** wrap transitions in `@media (prefers-reduced-motion: no-preference)`. Two lines,
  and the game is fully playable without animation either way.

---

## 9. Build order

1. **Data first.** `scenes.js` and `endings.js` fully populated from the script doc. No logic yet.
   This is transcription, and it is the single largest chunk of the build.
2. **Logic with placeholders.** Colored boxes instead of images. Get every path working: both branch
   points, all reactive blocks, both `requiresExamined` gates, all conditional text, ending assembly.
3. **Art swap.** Drop in real assets. Filenames already match, so this should be near-zero work.
4. **CSS pass.** Crossfade, accordion, vignette, drip, typography.
5. **Playtest.** See below.

Do step 1 completely before step 2. Transcribing content while also debugging rendering is how the
content develops silent typos.

---

## 10. Testing

The failure mode for this game is not a crash. It is a wrong-but-plausible line of ending text,
which reads as fine and is invisible to code review. Test accordingly.

**Full coverage needs 6 to 8 playthroughs minimum:**
- One per ending (3), to verify routing from `final_choice`.
- Within those, vary `witness_reaction`, `tools_reaction`, `identity_found`, `seen_reaction`,
  `looked_away`, and `acknowledged_witness` to hit different table rows.
- One run examining **nothing**, confirming both `requiresExamined` gates skip silently and Scene 2's
  naming choice never appears.
- One run examining **everything**, confirming both gates open.
- One run declining the name carve, confirming the ending reads `a name` and not an empty gap.
- One run carving exactly 20 characters, confirming no layout break on the final line.

**Faster than replaying:** a dev-only URL parameter that seeds flags directly and jumps to an ending,
e.g. `?debug=ending-a&looked_away=true&witness_reaction=reached`. Perhaps twenty lines, and it turns
each table-row check from a four-minute playthrough into a page refresh. With 24 conditional rows to
verify, this pays for itself immediately. Strip or gate it before release.

**Watch the console.** The `console.warn` in `lookup` fires whenever a fallback is used. During
testing it should never fire.

---

## 11. Deferred to build time

Genuinely low-stakes; do not spend planning time here.

- Exact viewport sizing and object-fit behavior for backgrounds, which depends on final art dimensions.
- Font choice.
- Whether tier2 accordions stay open or toggle closed.
- Whether the background crossfades separately from the content or fades as one unit.
