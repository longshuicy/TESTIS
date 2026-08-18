# TESTIS Art Prompt List

Companion to `testis-script.md` (narrative), `testis-tech-design.md` (build), and
`testis-sound-design.md` (audio).
**This doc is the single source of truth for art direction and asset filenames.**

Generate everything in one sitting, back to back, so style stays consistent. Pick best-of-two per
prompt and move on. Do not re-roll chasing perfection; consistency across the set matters more than
any single image being ideal.

**Total assets: 35 specified, 34 shipping.** 10 scene and ending backgrounds, 20 object shots, 5
character and plate shots — of which `char-witness-silhouette.webp` has never been generated (see
§3). The tally wall counts what ships, so it currently reads XXXIV.

**All of them live in `assets/images/`.** Filenames below are bare; the directory is implied and is
what `scenes.js`, `endings.js`, and `style.css` reference (`assets/images/scene-1-gate.webp`). Audio
sits alongside in `assets/sound/` and belongs to `testis-sound-design.md`; `assets_backup/` and
`assets_tint/` are art-pipeline working directories and are not shipped.

---

## Style suffix

Append to **every** prompt below, verbatim.

```
black and white line illustration, clean bold vector-style outlines, selective crosshatching
for shading and texture (not fully covering the image), flat black ink on white background,
editorial occult-illustration style, symbolic and slightly surreal staging, gothic, unsettling,
full-bleed with no decorative border, no text, no watermark
```

**Negative prompt** (SDXL and similar; Midjourney users prepend `--no`):

```
color, grayscale gradients, photorealism, 3D render, painterly soft shading, blur, decorative
frame, border, ornate filigree edging, text, letters, signature, watermark, gore, blood
```

The border exclusions matter: the reference art this style derives from has heavy baroque framing,
and generators will reintroduce it unprompted. The blood exclusion matters thematically. Nothing in
this game bleeds; that is the entire point of the central image.

### Style anchors
Derived from the user's own zodiac illustration series: clean bold vector-style linework, selective
crosshatching concentrated on organic textures (fur, hair, fabric) with large areas left flat,
symbolic staging, matter-of-fact framing of uncanny subjects. Converted here to pure black and
white, full-bleed, borderless.

### Aspect ratios
| Category | Ratio |
|---|---|
| Scene backgrounds | 16:9 landscape |
| Object shots | 1:1 square |
| Eye close-ups (Scene 4 tier2, Ending C) | 1:1 square, matched composition |
| Character shots | 4:5 portrait |

Stay consistent within each category. Mixed ratios inside a category are the fastest way to make a
solo art set look assembled rather than authored.

---

## 1. SCENE BACKGROUNDS (10)

**`scene-1-gate.webp`**: The Gate
```
monastery gate at night, fog drifting through iron bars, one lit window high above, moon obscured
by cloud, wide establishing shot, low angle looking up at the gate
```

**`scene-2-chapel.webp`**: The Chapel
```
dim chapel interior, hooded monks encircling a bound seated figure at the center, single candle as
the only light source, composition echoing a Renaissance religious painting, wide shot
```

**`scene-3-tools.webp`**: What They Believed
```
close-up of a monk's hands arranging gleaming surgical instruments on cloth beside a candle, the
instruments too smooth and precise for the era, faintly luminous, unsettling stillness
```

**`scene-4-reveal.webp`**: He Sees Me ★
*Highlight scene. Worth an extra generation pass.*
```
bound elderly figure's head tilted back, a monk's hand pressing a smooth glowing instrument to his
temple, a thin stream of clear water running from the temple down past his ear, his eyes open and
turned directly toward the viewer, sorrowful and tired expression, calm, no pain, no wound, no blood
```

**`scene-5-waking.webp`**: Waking
```
a hand touching a forehead in near-total darkness, minimal linework, mostly negative space, faint
wet sheen along the fingertips, intimate close framing
```

**`scene-6-chapel-again.webp`**: The Chapel, Again
```
same chapel composition and camera angle as scene 2, but the bound seated figure's face is blank and
featureless, the monks now face forward toward the viewer instead of inward toward the chair, a faint
indistinct human silhouette stands in the deep background shadow, unnoticed by the monks
```

**`scene-7-choice.webp`**: The Choice
```
first-person perspective, a monk kneeling and extending a glowing instrument toward the viewer, the
viewer's own rope-bound wrists visible in the lower frame, a silhouetted figure standing just behind
the monk's shoulder, watching, unacknowledged
```

**`ending-a.webp`**: The Drained
```
an empty wooden chair with loose ropes fallen around its legs, a small pool of clear water on the
stone floor beneath it, chapel otherwise empty, a single candle guttering, quiet aftermath
```

**`ending-b.webp`**: The Kept Hour
```
a snapped rope, an overturned wooden chair, chapel interior in disarray, a single candle still
burning upright amid the wreckage
```

**`ending-c.webp`**: The Relay
```
extreme close-up of a single human eye, composition mirroring the scene 4 eye shot exactly, a faint
reflected figure visible in the wet dark of the pupil, this time it is the viewer being seen
```

---

## 2. OBJECT SHOTS (20)

Used as tier2 examine images. Each corresponds to a specific examine hotspot in the script.

### Scene 1 (3)
**`obj-sundial.webp`**
```
a weathered stone sundial carved into an archway at night, its gnomon casting a shadow despite the
absence of sun, isolated close-up
```
**`obj-latch.webp`**
```
a cold wet iron gate latch, beaded with moisture, worn smooth by centuries of hands, isolated close-up
```
**`obj-threshold.webp`**
```
close-up of a stone threshold, carved letters worn nearly illegible by time and water, only the
suggestion of a name remaining, bare uncarved stone beside them
```

### Scene 2 (4)
**`obj-astrolabe.webp`**
```
a tarnished brass astrolabe hanging on a chain against a bound man's chest, ornate engraved
gradations, isolated close-up
```
**`obj-star-chart.webp`**
```
a hand-drawn star chart on aged paper, concentric orbital circles with the sun at the center rather
than the earth, half-tucked beneath a chair leg
```
**`obj-books.webp`**
```
a stack of confiscated books shelved with every spine deliberately turned to face the wall, one
volume slipped forward revealing a fragment of an orbital diagram
```
**`obj-monk-murmuring.webp`**
```
a hooded monk in profile, lips parted mid-whisper, eyes lowered, hands worrying a rosary, close-up
```

### Scene 3 (6)
**`obj-tool-glowing.webp`**
```
a smooth surgical instrument of impossibly precise manufacture, a thin cold light glowing within it,
resting on dark cloth among antique implements, isolated close-up
```
**`obj-tool-glass.webp`**
```
a small rectangular slab of black glass lying among 16th century surgical tools, blank and faintly
reflective, screen-like, isolated close-up
```
**`obj-water-clock.webp`**: *reused in Scenes 1, 3*
```
an antique brass water clock, a clepsydra, with a dripping basin beneath it, a hairline crack along
its base, ornate but worn metalwork, isolated on dark stone
```
**`obj-tally.webp`**
```
dozens of tally marks scratched into the rough underside of a wooden table, grouped in fives, each
group struck through with a single unhurried line, shapes suggesting ruined names rather than numbers
```
**`obj-letter.webp`**
```
a folded unsent letter on brittle paper, handwriting with more lines crossed out than kept, no
signature, isolated close-up
```

**`obj-manuscript.webp`**
```
a single freshly printed page of astronomical diagrams, circles within circles, ink appearing still
wet, half covered by cloth, a monk's hand pressing down over another hand reaching for it
```

### Scene 4 (1)
**`obj-eyes-his.webp`**
```
extreme close-up of an elderly man's eye, sorrowful, a small indistinct human figure reflected in the
wet dark of the pupil
```
*Compose this and `ending-c.webp` as a deliberate matched pair. The mirroring is the payoff.*

### Scene 5 (2)
**`obj-seam.webp`**
```
close-up of a hairline seam across a human temple, not a wound, no blood, a faint wet sheen at its
center and a dried ring at its edges like a water stain on wood
```
**`obj-reflection.webp`**
```
a dark window at night returning a faint partial reflection of a face, the reflection wearing an
older man's collar that the viewer does not own, ambiguous and half-formed
```

### Scene 6 (3)
**`obj-hands-bound.webp`**
```
close-up of a pair of hands resting in a lap, wrists bound loosely by old rope, seen from above in
the first-person seated position, the rope gone soft with age, isolated close framing
```
*This is the player's own hands, seen from the chair. The same rope that held him. Compose it as a
downward look — what you see when you glance at your own wrists mid-scene. Pairs with `obj-rope.webp`
from Scene 7, which shows the same wrists from a slightly different angle. Generate back to back.*

**`obj-water-clock-2.webp`**: *not a reuse — this is the same clock later, failing*
```
the same antique brass water clock, a clepsydra, its basin beneath it nearly dry, a second empty
basin set beside it drier still, the hairline crack along its base more pronounced, ornate but worn
metalwork, isolated on dark stone
```
*Scene 6's clock is described as running down — a second empty basin, long gaps where a drip should
have fallen and didn't — which `obj-water-clock.webp` cannot show without contradicting Scenes 1 and 3,
where the same clock is still keeping time. Same object, same metalwork and framing as
`obj-water-clock.webp` so the two read as one clock across the game, generated back to back with it
for consistency; the only change is the wear and the second basin.*

**`obj-watcher.webp`**: *reused in Scene 7*
```
a still human silhouette standing at the edge of darkness, no facial features, posture suggesting
quiet watchfulness rather than threat, minimal linework, mostly negative space
```

### Scene 7 (1)
**`obj-rope.webp`**
```
old rope binding a pair of wrists to a wooden chair arm, fibers gone soft and frayed with age,
isolated close-up
```

---

## 3. CHARACTER SHOTS (5)

Four are named `char-`; one is named `plate-`. Both prefixes land in Register III of the tally wall
(see `js/wall.js`), so the naming is about what the image *is* rather than where it hangs — a `char-`
shot is a person the story has a name or a role for, a `plate-` shot is a held image that belongs to
one specific plate and would mean nothing outside it.

**`plate-scene-7.webp`**: Scene 7 opening plate — the question, asked too close
```
extreme close-up of a monk's face in near-total darkness, hood drawn forward so only the lower
half is visible, lips parted mid-question, candlelight catching the jaw and throat only, everything
above the nose in shadow, the glowing instrument held just below frame, its cold light casting
upward onto the chin, intimate and inescapable distance
```
*The framing should feel too close — closer than you'd let a stranger stand. This is the only image
in the game that crops a face rather than composing one, and the crop is the point: the player never
gets to see who is asking. Do not reveal the eyes. Do not widen it to make the composition
comfortable; discomfort is the brief.*

**`char-copernicus-bound.webp`**
```
an elderly Renaissance man with a tired sorrowful face, wrists bound to a wooden chair, worn
scholar's robes, dignified bearing despite restraint, three-quarter view, waist-up
```

**`char-copernicus-reveal.webp`**
```
the same elderly man, head tilted back, eyes open and turned toward the viewer, clear water running
from his temple past his ear, calm and sorrowful, no wound, no blood, waist-up
```

**`char-player-hands.webp`**
```
a pair of hands touching a forehead, faint wet sheen on the fingertips, minimal background, close
intimate framing
```

**`char-witness-silhouette.webp`** — **NOT GENERATED, NOT SHIPPED.** The prompt is kept because the
asset is still wanted, but no master exists in `assets_backup/images-png-master/`, nothing in
`scenes.js`/`endings.js` references it, and it is not in `assets/images/`. It is the whole of the gap
between this doc's "35" and the 34 plates that actually ship. Generate it and the tally wall picks it
up on its own — the wall derives its catalogue from the scene and ending data, so the denominator
moves from XXXIV to XXXV with no code change. Until then, do not count it as shipped.
```
a featureless standing human silhouette seen from behind and slightly to the side, watching something
out of frame, minimal linework
```

---

## 3b. UI ORNAMENT (1)

Not a narrative image and not part of the 34 — a chrome asset consumed by CSS, not by
`scenes.js`/`endings.js`.

| File | What it is |
|---|---|
| `decorative-frame-border.webp` | Gilt scrollwork corner plate on transparent ground, used as the `border-image` around every examine-panel photo (`.tier2-frame::before`). |

**Ship it at 1000×1000, not larger.** The border draws at roughly 26 CSS pixels; an 8000×8000 plate
decodes to ~256MB of RGBA the moment a hotspot opens, which crashed the tab on mobile Safari and
Chrome. If the plate is ever regenerated, keep `border-image-slice` at one-fifth the shipped edge
(200 for a 1000px plate).

This is also the **only** asset that keeps an alpha channel — it sits on transparent ground, and
flattening it would fill the scrollwork's gaps with black and box every examine photo in a solid
slab. Every other asset is fully opaque and ships flattened.

---

## 3c. SHIPPING THE ASSETS

Generated art is a **master**, not a shipped file. Masters are PNG at whatever size the generator
produced; they live in `assets_backup/images-png-master/` and are git-ignored. What ships is WebP,
downscaled, produced by:

```bash
./scripts/optimize_images.sh
```

| Role | Shipped width | Alpha | Quality |
|---|---|---|---|
| Scene + ending backgrounds | 1600 | flattened | 82 |
| Object + character shots | 800 | flattened | 82 |
| `decorative-frame-border` | 1000 | kept | 90 |
| Wall thumbnails (`thumbs/`) | 400 | flattened | 78 |

The thumbnail tier exists for the tally wall (`js/gallery.js`), which shows every plate at once.
Same reasoning as the downscale below, only sharper: at shipped widths that one grid would decode to
roughly 110MB. 400px covers the largest wall cell (~225px) at 2× DPR, and the whole set of 34 costs
656K on disk — less than three of the shipped background plates. The frame border has no wall cell
and is skipped. Un-inked cells draw inline SVG and request no image at all, so a first-time visitor
who has witnessed nothing downloads nothing.

The script is idempotent — it always encodes from the masters, never from its own output, so
re-running it does not stack generational loss. Current result: 37MB of PNG masters → 2.8MB of
shipped WebP.

**Why the downscale, and why it is not optional.** A decoded bitmap costs `width × height × 4` bytes
of RAM regardless of file format, so pixel dimensions — not file size — are what crash a phone. At
master resolution the full set decoded to roughly 537MB; `main.js` preloads a background for every
branch target, so a three-way branch held ~73MB of backgrounds alone. WebP fixes transfer and does
nothing for this. Downscaling is the part that fixes it, and it brought the set to ~142MB.

Add a new asset by dropping its PNG master in `assets_backup/images-png-master/` and re-running the
script — do not hand-convert, and do not commit a PNG to `assets/images/`.

---

## 3d. PROVENANCE AND CREDIT

Every image here is generated with **Midjourney** from the prompts in this doc, then taken into
**Procreate** for post-generation drawing and editing before it becomes a master. The style is not
the generator's: it derives from the author's own zodiac illustration series (see *Style anchors*),
which is what the prompts and the hand-editing are both steering toward.

This is a **disclosure, not a licence obligation** — which is why it does not live in
`ATTRIBUTIONS.txt`. That file opens by saying every asset in it requires credit, and it is
maintained from sound doc §11 for CC BY audio; adding voluntary credit to a compliance list dilutes
what the list means. Whether Midjourney output carries an attribution requirement depends on the
plan it was generated under, so check current terms before assuming either way.

The line players actually see lives in `js/wall.js` (`WALL.credit`) and renders at the foot of the
tally wall. The README carries the same statement. Keep all three saying the same thing:

> Art generated with Midjourney from the author's prompts, with post-generation drawing and
> editing in Procreate.

One further note, not urgent: `LICENSE` is MIT over `Copyright (c) 2026 Chen Wang`, which covers the
code cleanly. Purely AI-generated images may not be copyrightable in the US, so a blanket claim over
the art is shakier ground — the Procreate editing pass is exactly the kind of human authorship that
argument turns on. If asset licensing is ever split from code licensing, that is the reason.

---

## 4. GENERATION ORDER

1. **Suffix test first.** Generate two or three throwaway prompts (`a candle`, `a stone wall`) using
   the suffix alone. Confirm the crosshatch-to-flat-area balance looks right before committing to
   real scenes. Ten minutes here saves an hour of inconsistent output.
2. **Lock a seed.** Once a test image has the right feel, note its seed and reuse it across the set.
   This is the single highest-leverage step for making 34 images look authored rather than assembled.
3. **Scene backgrounds** in narrative order, so lighting and mood carry scene to scene.
4. **The matched pair** (`obj-eyes-his.webp` and `ending-c.webp`) together, back to back, same seed.
   Their similarity is a narrative device; generate them as one job.
5. **Object shots.** Fastest category. Consistent framing matters more than individual drama.
6. **Character shots last**, once you've seen how the style renders faces in the backgrounds.

**If style drifts mid-set**, don't push forward hoping it resolves. Stop, return to the locked seed,
and regenerate the drifted images. Drift compounds.

---

## 5. SCOPE FALLBACK

If the 10-hour budget tightens, cut in this order. The game remains playable and coherent at every
level below.

| Cut | Saves | Cost |
|---|---|---|
| All 18 object shots; render tier2 as text only | ~40% of art time | Low. Tier2 is primarily writing; the prose carries it. |
| The 4 character shots; let backgrounds imply figures | ~15% | Low. Implied presence is a standard horror technique and often stronger. |
| `ending-b.webp` and `ending-c.webp`; reuse `ending-a.webp` | ~7% | Medium. Endings feel less distinct. |
| `scene-6-chapel-again.webp`; reuse `scene-2-chapel.webp` | ~7% | **Do not cut.** The changed composition is the reveal that the player has become him. |

The absolute minimum viable set is **7 scene backgrounds plus 3 ending backgrounds**. Everything else
is enhancement.
