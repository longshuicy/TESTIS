# SUPERSTES — CHAPTER II ART PROMPTS

Companion to `superstes-chapter-2-script.md`.

**Internal chapter title:** *The Last Word*  
**Spoiler rule:** filenames and this internal document may use the title; **player-facing art must not contain readable text or imagery that reveals the “last words” pattern before Scene 7.**

This document is the single source of truth for Chapter II visual direction and generated-image prompts.

---

## 1. VISUAL GOAL

Chapter II should look like **ordinary memories drawn after some of their information has already washed away**.

The first six scenes are contemporary / recent-memory realism rendered in the same SUPERSTES family as Chapter I: black-and-white line illustration, sparse cross-hatching, quiet negative space, restrained surrealism.

The art must resist making the departures look important. The visual reveal belongs to Scene 7, not earlier.

### Core visual principles

- **Ordinary before symbolic.** A workplace entrance should look like a workplace entrance, not a portal. A parking stripe is just a parking stripe until the narration makes the player suspicious of symbolism.
- **No farewell iconography before Scene 7.** No waving silhouettes against sunsets, tearful close-ups, receding trains framed like death, dramatic backlighting, or exaggerated loneliness.
- **Faces are specific enough to feel human but not portrait-literal.** The chapter is autobiographical in emotional source, not a demand for exact likenesses.
- **Different memories may involve different people.** Do not accidentally make every male figure look like the same recurring character.
- **Memory instability is subtle.** Small shifts in object position, reflection, or water can change on revisit. Avoid obvious glitch effects.
- **Water is the only recurring visual motif.** It begins incidental and becomes impossible only in Scene 7.
- **Generated art contains no important readable text.** Timetables, phone screens, receipts, signs, badges, etc. should use abstract marks. All narrative/UI text is HTML/CSS.

---

## 2. MASTER STYLE SUFFIX

Append this to every generated scene and object prompt unless a prompt explicitly overrides composition:

> black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark

### Main-scene composition suffix

Append after the master suffix for scene backgrounds:

> cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

### Tier-2 object suffix

Append after the master suffix for inspectable-object images:

> intimate object vignette, 4:3 or square crop, simple background, one clear focal object, readable silhouette at small web-game scale

### Ending suffix

Append after the master suffix for ending images:

> symbolic but restrained, surrealism emerging from ordinary objects, cinematic horizontal composition, 16:9, no horror imagery

---

## 3. CONTINUITY RULES

### The protagonist

- Adult protagonist seen mostly from first-person implication, reflections, hands, or partial figure.
- Avoid locking ethnicity/appearance unless later design work intentionally establishes it.
- Clothing should be contemporary, plain, and not visually iconic.

### Memory people

- Do not name them in art metadata shown to players.
- Keep each person's silhouette/clothing distinct enough that the seven memories do not visually collapse into one relationship.
- No one should look villainous or saintly.
- Scene 5's angry figure can be visibly distressed, but avoid threatening body-horror or abuse-thriller staging.

### Water continuity

Water should increase gradually:

1. **Scene 1:** condensation only.
2. **Scene 2:** cold station glass / rain or melted snow.
3. **Scene 3:** literal water bottle.
4. **Scene 4:** curb puddle.
5. **Scene 5:** melting ice / drink ring.
6. **Scene 6:** mop bucket / wet floor.
7. **Scene 7:** all water sources merge into one impossible shallow pool.

Before Scene 7, do not make the water glow, behave supernaturally, or attract visual attention beyond what the script calls for.

---

## 4. ASSET MANIFEST

### Main scenes

| ID | Filename | Scene |
|---|---|---|
| S201 | `scene-01-dropoff.png` | The Drop-Off |
| S202 | `scene-02-station.png` | The Station |
| S203 | `scene-03-bottle.png` | The Bottle |
| S204 | `scene-04-street.png` | The Street |
| S205 | `scene-05-noise.png` | Noise |
| S206 | `scene-06-road-home.png` | The Road Home |
| S207 | `scene-07-pool.png` | The Pool / reveal |

### Tier-2 object art

| ID | Filename | Object |
|---|---|---|
| O201 | `obj-dashboard-clock.png` | dashboard clock |
| O202 | `obj-passenger-seat.png` | empty passenger seat |
| O203 | `obj-cup-receipt.png` | damp receipt / cup holder |
| O204 | `obj-workplace-doors.png` | workplace entrance |
| O205 | `obj-departure-board.png` | train departure board |
| O206 | `obj-station-glass.png` | overlapping reflections in station glass |
| O207 | `obj-phone-message.png` | glowing phone with unreadable message |
| O208 | `obj-empty-train-seat.png` | empty train seat |
| O209 | `obj-water-bottle.png` | returned reusable bottle |
| O210 | `obj-packed-car.png` | packed moving car |
| O211 | `obj-parking-stripe.png` | white parking stripe between two pairs of shoes |
| O212 | `obj-street-puddle.png` | smiling reflection in curb puddle |
| O213 | `obj-bar-glass.png` | melting ice / spreading drink ring |
| O214 | `obj-mouth-noise.png` | lower face speaking in noisy room |
| O215 | `obj-argument-doorway.png` | empty hallway beyond argument |
| O216 | `obj-name-tag.png` | school uniform name tag |
| O217 | `obj-mop-bucket.png` | cloudy cleaning water |
| O218 | `obj-schoolbag.png` | heavy middle-school bag |
| O219 | `obj-road-home.png` | ordinary residential walking route |
| O220 | `obj-train-neighbor.png` | chatty stranger on the train (Scene 2) |
| O221 | `obj-graphic-tshirt.png` | faded graphic tee (Scene 4) |
| O222 | `obj-doorway-sign.png` | unreadable sign, bar or restaurant (Scene 5) |

### Plate (1)

| ID | Filename | Plate |
|---|---|---|
| P201 | `plate-c2-pool.png` | Scene 7 opening — the arrival |

The `plate-` prefix is load-bearing, not cosmetic: in Chapter I it is what files a held image into
Register III of the tally wall (`js/wall.js` matches on prefix with `startsWith`). Keep it if Chapter
II ever gets a wall of its own. The `c2-` segment avoids colliding with Chapter I's
`plate-scene-7.webp`, which is a different image in a different chapter.

### Ending images

| ID | Filename | Ending |
|---|---|---|
| E201 | `ending-unrecorded.png` | The Unrecorded |
| E202 | `ending-kept-word.png` | The Kept Word |
| E203 | `ending-testimony.png` | The Testimony |

**Total generated assets:** 33 (7 scenes + 22 objects + 1 plate + 3 endings). Scene 5's "examine the
conversation" hotspot is text-only, no image, the same convention as Chapter I's calendar widget.  
If generation budget is tight, see Section 9 for cuts.

---

# 5. MAIN SCENE PROMPTS

## S201 — `scene-01-dropoff.png`

**Usage:** Scene 1 main art.

**Prompt:**

> ordinary compact car stopped briefly outside a contemporary workplace entrance, passenger in the act of getting out, driver mostly implied from first-person viewpoint, automatic glass doors and badge reader in background, mundane weekday atmosphere, cup condensation visible but visually minor, no waving, no tears, no sunset, no dramatic farewell posture, nothing suggesting this moment is unusually important, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

**Avoid:** romantic framing; sad goodbye body language; obvious breakup imagery.

---

## S202 — `scene-02-station.png`

**Usage:** Scene 2 main art.

**Prompt:**

> small passenger train station in a quiet unnamed town in cold weather, modest platform and station building, traveler visible inside a train carriage while another person remains behind near the station glass, subtle reflection overlap, sparse local station rather than grand city terminal, wet glass or traces of melted snow, quiet natural posture, no cinematic waving, no tears, no exaggerated loneliness, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

**Composition note:** The person who stayed should be discoverable on second glance, not the dominant focal point.

---

## S203 — `scene-03-bottle.png`

**Usage:** Scene 3 main art.

**Prompt:**

> ordinary workplace parking lot in daylight, one person beside a compact car packed with moving belongings handing a reusable water bottle to another person, bedding and bags visible through rear window, mundane practical exchange, white parking stripe beneath them, no embrace, no dramatic departure pose, no road-trip glamour, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

---

## S204 — `scene-04-street.png`

**Usage:** Scene 4 highlight art. Keep it lean; most emotional work is in the main image.

**Prompt:**

> ordinary city sidewalk after light rain, two adults unexpectedly encountering each other while walking opposite directions, one smiling with uncomplicated friendly recognition, casual contemporary clothing, curb puddle reflecting part of the encounter, pedestrians and street context understated, moment feels normal rather than romantic or tragic, no embrace, no tears, no dramatic distance, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

**Branch variant:** Do not generate a second image unless budget allows. `turned_back=true` can be handled with a crop/pan or CSS fade showing the same figure farther down the street.

---

## S205 — `scene-05-noise.png`

**Usage:** Scene 5 main art.

**Prompt:**

> crowded summer bar or casual restaurant with old friends, glassware and layered reflections, one person leaning toward the narrator to speak over the room, background figures laughing and talking, image subtly contains a second memory in reflection: a distressed person mid-argument in a quieter doorway, double exposure effect barely noticeable at first, melting ice and water ring on table, emotional but not threatening, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

**Implementation note:** The argument overlay can also be a CSS crossfade into a separately cropped layer from the same generated composition.

---

## S206 — `scene-06-road-home.png`

**Usage:** Scene 6 main art.

**Prompt:**

> middle-school classroom after cleaning duty in late afternoon, chairs lifted onto desks, broom and mop bucket near wall, wet floor reflecting rectangular window light, two schoolchildren with heavy schoolbags leaving together toward a quiet residential road, ordinary end-of-day atmosphere, no overt sadness, no nostalgic golden glow, no farewell gesture, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, cinematic horizontal composition, 16:9, clear central subject, generous negative space for narrative UI overlay, environment readable at web-game scale

**Important:** This scene should feel smaller and less cinematic than the adult memories. The emotion comes from the player, not the image insisting that childhood is sacred.

---

## S207 — `scene-07-pool.png`

**Usage:** Scene 7 reveal.

**Prompt:**

> impossible shallow pool uniting fragments of several ordinary places without becoming fantasy spectacle: workplace glass doors, small train station window, parking lot stripe, city streetlamp, bar table, middle-school classroom windows, objects submerged just below clear water including reusable bottle receipt train ticket drinking glass broom, several people of different ages positioned around the distant edge doing ordinary leaving or waiting actions, protagonist implied standing ankle-deep in foreground, reflections overlap across incompatible spaces, quiet realization rather than horror, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, symbolic but restrained, surrealism emerging from ordinary objects, cinematic horizontal composition, 16:9, no horror imagery

**Reveal note:** This is the first image allowed to look intentionally symbolic.

---

## P201 — `plate-c2-pool.png`

**Usage:** Scene 7 **opening plate**. Held full screen, alone, with the plate's text over it and one
advance control. See the script doc's THE PLATE section.

**Prompt:**

> first-person downward view of one's own feet standing ankle-deep in a shallow impossible pool, ordinary shoes and trouser hems soaked, water only a few inches deep and perfectly clear, ordinary objects resting just beneath the surface within reach: a scratched reusable water bottle, a folded damp receipt, a cello case, a small cloth name tag, a train ticket, reflected on the surface above them the architecture of several incompatible places at once — automatic glass doors, a small station window, a painted parking stripe, a streetlamp, a bar table, tall classroom windows — all held still in the same water under a light belonging to none of them, no other people, no horror, quiet impossible stillness, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, symbolic but restrained, surrealism emerging from ordinary objects, cinematic horizontal composition, 16:9, no horror imagery

**Composition brief.** This is the counterpart to S207, not a duplicate of it: **the plate looks
down, the scene looks out.** The plate is intimate and first-person, holds the objects and the
impossible reflections, and contains **no other people**. S207 is the wide view with the seven
figures around the edge. Generate the two back to back so the water reads as the same water.

Unlike a scene background, this image is never overlaid with hotspots — but it *does* carry the
plate's paragraphs, so keep the upper half open enough to hold five short paragraphs of text. The
objects and the standing feet belong in the lower two-thirds.

**Avoid:** a deep or dark pool; anything that could read as drowning, a grave, or a baptism; glowing
or supernatural water; visible faces or figures; making the objects float rather than rest.

---

# 6. TIER-2 OBJECT PROMPTS

Use the master style + Tier-2 object suffix for all prompts below.

## O201 — Dashboard clock

> contemporary car dashboard clock and partial steering wheel, digits present only as indistinct abstract marks, ordinary interior, faint windshield condensation

## O202 — Passenger seat

> recently vacated fabric passenger seat with shallow crease in upholstery, seat belt hanging naturally, no person, quiet car interior

## O203 — Cup holder / receipt

> car cup holder with folded gas station receipt damp at one corner from condensation, printed words abstract and unreadable, simple everyday clutter

## O204 — Workplace doors

> automatic glass workplace entrance doors with badge reader and fluorescent interior beyond, neutral modern office architecture, no readable signage

## O205 — Departure board

> modest train-station departure board with rows of abstract unreadable city names and times, simple practical signage, not vintage, not grand

## O206 — Station glass

> cold train-station window with two faint overlapping human reflections on opposite sides of glass, rain or melted snow streaks, subtle not supernatural

## O207 — Phone message

> hand holding smartphone in dim train carriage, one glowing message bubble visible but text replaced by abstract lines, screen light on fingers

## O208 — Empty train seat

> empty passenger train seat beside a travel bag, window showing motion blur of small-town station, ordinary carriage

## O209 — Water bottle

> scratched reusable plastic water bottle with straw lid and tiny amount of water moving at bottom, evidence of daily use, not product photography

## O210 — Packed car

> rear portion of compact car packed tightly for a move, bedding bags lamp and a cello case wedged upright among household objects, seen through rear window

## O211 — Parking stripe

> badly painted white parking stripe on asphalt separating two pairs of ordinary shoes, accidental geometry, no dramatic stance

## O212 — Street puddle

> shallow curb puddle reflecting part of a smiling face and nearby street, reflection disturbed by passing vehicle ripple, subtle

## O213 — Bar glass

> half-finished drink with melting ice, condensation and water ring spreading beyond a paper napkin onto table, background indistinct

## O214 — Mouth in noise

> lower half of a person's face speaking across a noisy table, expression shifting from smile to seriousness, glass reflections and blurred crowd behind, no speech text

## O215 — Argument doorway

> ordinary interior doorway with empty hallway beyond, foreground edge of tense conversation only barely visible, exit path visually clear but not dramatic

## O216 — Name tag

> close-up of a school uniform collar with a crooked hand-sewn cloth name tag, embroidered text rendered as abstract illegible stitching, institutional school fabric, no readable text

## O217 — Mop bucket

> school cleaning bucket filled with cloudy gray water, mop handle resting nearby, sediment slowly settling, window reflection on surface

## O218 — Schoolbag

> heavy middle-school backpack with notebooks and pencil case visible, one broken zipper, ordinary used school supplies, no readable labels

## O219 — Road home

> quiet residential route near a middle school, sidewalk driveways trees and familiar crossing, two small figures walking far ahead, unremarkable weekday setting

## O220 — Train neighbor

> middle-aged man mid-conversation across a train aisle, gesturing with a phone or photograph in hand, warm but generic expression, ordinary travel clothing, environment softly blurred behind him

## O221 — Graphic t-shirt

> close-up of a faded graphic t-shirt collar and chest, printed design intentionally abstract and unreadable, worn casual fabric, ordinary daily-wear texture

## O222 — Doorway sign

> illuminated sign above a restaurant or bar doorway at night, lettering worn to abstract unreadable shapes, ordinary streetfront, ambiguous whether restaurant or bar

---

# 7. ENDING PROMPTS

## E201 — `ending-unrecorded.png`

**Prompt:**

> shallow still pool after people have left, ordinary objects visible beneath clear water: reusable bottle receipt glass broom and indistinct ticket, reflections of several places fading at edges, calm empty negative space, nothing destroyed, release without erasure, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, symbolic but restrained, surrealism emerging from ordinary objects, cinematic horizontal composition, 16:9, no horror imagery

---

## E202 — `ending-kept-word.png`

**Prompt:**

> concentric ripples in a shallow pool reflecting many slightly different versions of the same ordinary scenes: car passenger door, train station, city street, bar table, school classroom, reflections repeated and misaligned as if memory has been replayed too often, faint abstract dialogue-like marks without readable letters, beautiful but increasingly crowded, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, symbolic but restrained, surrealism emerging from ordinary objects, cinematic horizontal composition, 16:9, no horror imagery

---

## E203 — `ending-testimony.png`

**Prompt:**

> protagonist standing ankle-deep in shallow water facing their own reflection, seven faint ordinary memory scenes arranged only as reflections around the pool edges, human figures present but not posed as farewells, emphasis on witnessing and presence rather than loss, open negative space around protagonist, black and white pen-and-ink line illustration, delicate graphite wash, sparse cross-hatching, high-contrast negative space, quiet melancholic contemporary realism, slightly dreamlike but not fantasy, elegant thin linework, restrained facial detail, soft film-grain texture, no color, no photorealism, no 3D render, no anime, no comic speech bubbles, no readable text, no logos, no watermark, symbolic but restrained, surrealism emerging from ordinary objects, cinematic horizontal composition, 16:9, no horror imagery

---

# 8. MOTION / TRANSITION NOTES

Keep animation minimal and primarily CSS-based.

### Scene 1
- Passenger door closes.
- Tiny bead of condensation slowly moves downward.

### Scene 2
- Station drifts sideways only after train begins moving.
- Person behind glass remains still for a fraction longer than expected.

### Scene 3
- Water inside bottle settles after handoff.
- Packed car exits frame without cinematic pause.

### Scene 4
- If `turned_back=true`, reuse scene art with subtle pan/crop; figure becomes smaller behind passing pedestrian.
- Puddle ripple briefly breaks the reflected smile.

### Scene 5
- Layer ambient crowd motion as very subtle parallax.
- Crossfade bar reflection into argument memory.
- Do **not** use digital glitch aesthetics; this is associative memory, not corrupted software.

### Scene 6
- One drop from mop into bucket.
- Very slow settling sediment.

### Scene 6 → 7 transition
This is the major visual transformation of the chapter.

1. Close crop on mop bucket ripple.
2. Match-cut ripple to water bottle.
3. Match-cut to street puddle.
4. Match-cut to drink ring.
5. Reflections begin containing architecture from the wrong scenes.
6. Camera pulls back to reveal the shared pool.

Target: 3–5 seconds. Slow enough to register, not a cutscene.

**The pull-back lands on the plate (P201), not on the scene.** Fade up slowly out of the final
ripple — do not cut in hard. The plate then holds until the player clicks, and S207 is what they
arrive at afterward.

### Scene 7
- Very subtle independent ripples under each memory fragment.
- On title reveal, do **not** flash or glitch. Let the words appear plainly.

### Ending A
- Ripples stop.

### Ending B
- Ripples multiply; scene reflections repeat one additional time every few seconds.

### Ending C
- Reflections remain, but the protagonist's reflection becomes the clearest element.

Provide reduced-motion equivalents as fades.

---

# 9. GENERATION PRIORITY / BUDGET CUTS

If generating all 29 images is too expensive, use this order.

## Tier 1 — required

1. S201 Drop-Off
2. S202 Station
3. S203 Bottle
4. S204 Street
5. S205 Noise
6. S206 Road Home
7. S207 Pool
8. P201 The plate — pool arrival *(generate with S207)*
9. E201 The Unrecorded
10. E202 The Kept Word
11. E203 The Testimony

## Tier 2 — strongest inspectables

11. O203 Cup holder / receipt
12. O206 Station glass
13. O207 Phone message
14. O209 Water bottle
15. O211 Parking stripe
16. O212 Street puddle
17. O213 Bar glass
18. O216 Name tag
19. O217 Mop bucket
20. O219 Road home

## Tier 3 — can be text-only or cropped from scene art

- O201 dashboard clock
- O202 passenger seat
- O204 workplace doors
- O205 departure board
- O208 empty train seat
- O210 packed car
- O214 mouth in noise
- O215 argument doorway
- O218 schoolbag
- O220 train neighbor
- O221 graphic t-shirt
- O222 doorway sign

**Minimum viable art set:** 11 images (7 scenes + the plate + 3 endings). The plate is not optional —
it is the chapter's one held image and the reveal is staged on it.  
**Recommended set:** 21 images (Tier 1 + Tier 2).  
**Full set:** 33 images.

---

# 10. WHAT NOT TO GENERATE

Do not generate:

- readable phone messages, station names, work signs, or receipts;
- a title card containing “The Last Word” before Scene 7;
- crying goodbye portraits;
- romantic train-platform embraces staged like film posters;
- funeral/death symbolism;
- clocks everywhere merely because the theme is time;
- water that looks magical before Scene 7;
- the same male face for every memory;
- literal speech bubbles or floating quote text;
- glitch-art overlays;
- highly detailed photorealistic cars, phones, or brands;
- exact reproductions of real people unless the project later intentionally supplies reference images and obtains the appropriate likeness direction.

The chapter works only if the player first believes these are **ordinary memories**.

---

# 11. ART ACCEPTANCE CHECKLIST

Before accepting a generated image, verify:

- [ ] Does it still look like the established SUPERSTES black-and-white line-art family?
- [ ] Does the scene feel ordinary before Scene 7?
- [ ] Is there no readable generated text?
- [ ] Is water present only at the intended level of emphasis?
- [ ] Are the characters naturally posed rather than signaling “final goodbye”?
- [ ] Is there enough negative space for narrative UI?
- [ ] Can the key silhouette/object be read at web-game size?
- [ ] Does Scene 5 feel like memory overlap rather than digital corruption?
- [ ] Is Scene 6 visually modest rather than sentimentally overproduced?
- [ ] Is Scene 7 the first unmistakably symbolic image?
- [ ] Do the three ending images feel like three responses to the same pool, not three unrelated artworks?

---

# 12. STATUS

Art direction and prompt manifest are complete for a first generation pass.

Recommended next workflow:

1. Generate S201–S207 first.
2. Put them into the prototype with plain text-only Tier-2 inspectables.
3. Confirm pacing and spoiler discipline.
4. Generate E201–E203.
5. Only then spend generation budget on Tier-2 object art.
6. Playtest specifically for whether players infer “these are last encounters” too early. If they do, reduce farewell-like staging before changing the script.

