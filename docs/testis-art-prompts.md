# TESTIS Art Prompt List

Companion to `the-water-clock-script.md` (narrative) and `testis-tech-design.md` (build).
**This doc is the single source of truth for art direction and asset filenames.**

Generate everything in one sitting, back to back, so style stays consistent. Pick best-of-two per
prompt and move on. Do not re-roll chasing perfection; consistency across the set matters more than
any single image being ideal.

**Total assets: 32.** 10 scene and ending backgrounds, 18 object shots, 4 character shots.

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

**`scene-1-gate.png`**: The Gate
```
monastery gate at night, fog drifting through iron bars, one lit window high above, moon obscured
by cloud, wide establishing shot, low angle looking up at the gate
```

**`scene-2-chapel.png`**: The Chapel
```
dim chapel interior, hooded monks encircling a bound seated figure at the center, single candle as
the only light source, composition echoing a Renaissance religious painting, wide shot
```

**`scene-3-tools.png`**: What They Believed
```
close-up of a monk's hands arranging gleaming surgical instruments on cloth beside a candle, the
instruments too smooth and precise for the era, faintly luminous, unsettling stillness
```

**`scene-4-reveal.png`**: He Sees Me ★
*Highlight scene. Worth an extra generation pass.*
```
bound elderly figure's head tilted back, a monk's hand pressing a smooth glowing instrument to his
temple, a thin stream of clear water running from the temple down past his ear, his eyes open and
turned directly toward the viewer, sorrowful and tired expression, calm, no pain, no wound, no blood
```

**`scene-5-waking.png`**: Waking
```
a hand touching a forehead in near-total darkness, minimal linework, mostly negative space, faint
wet sheen along the fingertips, intimate close framing
```

**`scene-6-chapel-again.png`**: The Chapel, Again
```
same chapel composition and camera angle as scene 2, but the bound seated figure's face is blank and
featureless, the monks now face forward toward the viewer instead of inward toward the chair, a faint
indistinct human silhouette stands in the deep background shadow, unnoticed by the monks
```

**`scene-7-choice.png`**: The Choice
```
first-person perspective, a monk kneeling and extending a glowing instrument toward the viewer, the
viewer's own rope-bound wrists visible in the lower frame, a silhouetted figure standing just behind
the monk's shoulder, watching, unacknowledged
```

**`ending-a.png`**: The Drained
```
an empty wooden chair with loose ropes fallen around its legs, a small pool of clear water on the
stone floor beneath it, chapel otherwise empty, a single candle guttering, quiet aftermath
```

**`ending-b.png`**: The Kept Hour
```
a snapped rope, an overturned wooden chair, chapel interior in disarray, a single candle still
burning upright amid the wreckage
```

**`ending-c.png`**: The Relay
```
extreme close-up of a single human eye, composition mirroring the scene 4 eye shot exactly, a faint
reflected figure visible in the wet dark of the pupil, this time it is the viewer being seen
```

---

## 2. OBJECT SHOTS (18)

Used as tier2 examine images. Each corresponds to a specific examine hotspot in the script.

### Scene 1 (3)
**`obj-sundial.png`**
```
a weathered stone sundial carved into an archway at night, its gnomon casting a shadow despite the
absence of sun, isolated close-up
```
**`obj-latch.png`**
```
a cold wet iron gate latch, beaded with moisture, worn smooth by centuries of hands, isolated close-up
```
**`obj-threshold.png`**
```
close-up of a stone threshold, carved letters worn nearly illegible by time and water, only the
suggestion of a name remaining, bare uncarved stone beside them
```

### Scene 2 (4)
**`obj-astrolabe.png`**
```
a tarnished brass astrolabe hanging on a chain against a bound man's chest, ornate engraved
gradations, isolated close-up
```
**`obj-star-chart.png`**
```
a hand-drawn star chart on aged paper, concentric orbital circles with the sun at the center rather
than the earth, half-tucked beneath a chair leg
```
**`obj-books.png`**
```
a stack of confiscated books shelved with every spine deliberately turned to face the wall, one
volume slipped forward revealing a fragment of an orbital diagram
```
**`obj-monk-murmuring.png`**
```
a hooded monk in profile, lips parted mid-whisper, eyes lowered, hands worrying a rosary, close-up
```

### Scene 3 (6)
**`obj-tool-glowing.png`**
```
a smooth surgical instrument of impossibly precise manufacture, a thin cold light glowing within it,
resting on dark cloth among antique implements, isolated close-up
```
**`obj-tool-glass.png`**
```
a small rectangular slab of black glass lying among 16th century surgical tools, blank and faintly
reflective, screen-like, isolated close-up
```
**`obj-water-clock.png`**: *reused in Scenes 1, 3, 6*
```
an antique brass water clock, a clepsydra, with a dripping basin beneath it, a hairline crack along
its base, ornate but worn metalwork, isolated on dark stone
```
**`obj-tally.png`**
```
dozens of tally marks scratched into the rough underside of a wooden table, grouped in fives, each
group struck through with a single unhurried line, shapes suggesting ruined names rather than numbers
```
**`obj-letter.png`**
```
a folded unsent letter on brittle paper, handwriting with more lines crossed out than kept, no
signature, isolated close-up
```

**`obj-manuscript.png`**
```
a single freshly printed page of astronomical diagrams, circles within circles, ink appearing still
wet, half covered by cloth, a monk's hand pressing down over another hand reaching for it
```

### Scene 4 (1)
**`obj-eyes-his.png`**
```
extreme close-up of an elderly man's eye, sorrowful, a small indistinct human figure reflected in the
wet dark of the pupil
```
*Compose this and `ending-c.png` as a deliberate matched pair. The mirroring is the payoff.*

### Scene 5 (2)
**`obj-seam.png`**
```
close-up of a hairline seam across a human temple, not a wound, no blood, a faint wet sheen at its
center and a dried ring at its edges like a water stain on wood
```
**`obj-reflection.png`**
```
a dark window at night returning a faint partial reflection of a face, the reflection wearing an
older man's collar that the viewer does not own, ambiguous and half-formed
```

### Scene 6 (1)
**`obj-watcher.png`**: *reused in Scene 7*
```
a still human silhouette standing at the edge of darkness, no facial features, posture suggesting
quiet watchfulness rather than threat, minimal linework, mostly negative space
```

### Scene 7 (1)
**`obj-rope.png`**
```
old rope binding a pair of wrists to a wooden chair arm, fibers gone soft and frayed with age,
isolated close-up
```

---

## 3. CHARACTER SHOTS (4)

**`char-copernicus-bound.png`**
```
an elderly Renaissance man with a tired sorrowful face, wrists bound to a wooden chair, worn
scholar's robes, dignified bearing despite restraint, three-quarter view, waist-up
```

**`char-copernicus-reveal.png`**
```
the same elderly man, head tilted back, eyes open and turned toward the viewer, clear water running
from his temple past his ear, calm and sorrowful, no wound, no blood, waist-up
```

**`char-player-hands.png`**
```
a pair of hands touching a forehead, faint wet sheen on the fingertips, minimal background, close
intimate framing
```

**`char-witness-silhouette.png`**
```
a featureless standing human silhouette seen from behind and slightly to the side, watching something
out of frame, minimal linework
```

---

## 4. GENERATION ORDER

1. **Suffix test first.** Generate two or three throwaway prompts (`a candle`, `a stone wall`) using
   the suffix alone. Confirm the crosshatch-to-flat-area balance looks right before committing to
   real scenes. Ten minutes here saves an hour of inconsistent output.
2. **Lock a seed.** Once a test image has the right feel, note its seed and reuse it across the set.
   This is the single highest-leverage step for making 33 images look authored rather than assembled.
3. **Scene backgrounds** in narrative order, so lighting and mood carry scene to scene.
4. **The matched pair** (`obj-eyes-his.png` and `ending-c.png`) together, back to back, same seed.
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
| `ending-b.png` and `ending-c.png`; reuse `ending-a.png` | ~7% | Medium. Endings feel less distinct. |
| `scene-6-chapel-again.png`; reuse `scene-2-chapel.png` | ~7% | **Do not cut.** The changed composition is the reveal that the player has become him. |

The absolute minimum viable set is **7 scene backgrounds plus 3 ending backgrounds**. Everything else
is enhancement.
