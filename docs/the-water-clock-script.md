# TESTIS
*(Latin: "witness", also, in a stretch, "testament")*

A short narrative web game. First person, past tense. Black and white line illustration.
Tone: bizarre, anachronistic, sad, melancholic. Themes: time, destiny, witness vs. intervention.

**Companion docs:** `testis-art-prompts.md` (image generation), `testis-tech-design.md` (build spec).
This doc is the single source of truth for narrative content. Where the three disagree, this one wins.

---

## THEME SUMMARY

The game is about **the loneliness of being correct too early, and the violence institutions do to protect their own certainty.** Threads running through every scene:

- **Witness vs. intervention:** the player spends the first half powerless to help, and the second half discovering that powerlessness was never really the obstacle. The real question was always whether *seeing* someone's truth without acting on it is its own kind of complicity.
- **Time as punishment, not backdrop:** the water-clocks, the tally marks, and the anachronistic tools all suggest this isn't one moment in 1543. It's a *recurring* moment that different eras keep re-staging on different "heretics." Being ahead of your time isn't a compliment here. It's a diagnosis, treated the same way in every century, just with better tools.
- **The apology that isn't yours to accept:** Copernicus tells the player it's no one's fault, which is both a kindness and a horror. There's no villain to blame, only a system that will do this to the next person too, forever, with everyone's hands clean.
- **Identity as inheritance, not theft:** becoming him isn't body-snatching, it's succession. The name carved in the threshold, the water in the seam, and the words handed back to the monks all suggest truth-telling is a role passed down bodily, not just intellectually.

**Emotional spine:** quiet, dignified, recurring persecution of clarity, witnessed by someone who will eventually become both the persecuted and the next witness.

### Historical grounding (real Copernicus facts folded into the fiction)
- Copernicus delayed publishing *De revolutionibus orbium coelestium* for over **30 years**, reportedly fearing the controversy it would cause. The game's "waiting" theme draws on this directly: Scene 3's tally marks and unsent letter, and Scene 2's main narration.
- Tradition holds he received the **first printed copy of his book on the day he died**. The idea of touching your life's proof of being right only as you are dying drives Scene 3's manuscript-page object, which pays off again in Ending C.
- The book's printer, Andreas Osiander, added an **anonymous preface** without Copernicus's knowledge, framing heliocentrism as a convenient hypothesis rather than fact. Someone else softened his truth to protect it, without asking. This parallels the monks "helping" him by force, and surfaces in his Scene 4 dialogue (option B).
- Historically Copernicus was a **canon**, a church official himself, not a persecuted outsider, and no one drilled his skull. The monastery and its monks are not literal historical antagonists but a personified Institution and Time, restaging this scene on different "heretics" across centuries. The game is dream-logic, not biography.

---

## FLAG SYSTEM

```js
flags = {
  player_name: null,          // Scene 1, optional carved name, text input, max 20 chars
  gate_action: null,          // Scene 1, "called" | "silent" | "listened"
  identity_found: false,      // Scene 2, true only if player chooses to name him
  tally_reaction: null,       // Scene 3, "before" | "denial" | "refuse"
  tools_reaction: null,       // Scene 3, "denial" | "acceptance" | "silence"
  witness_reaction: null,     // Scene 4, "silent" | "asked_why" | "reached" | "absolved"
  looked_away: null,          // Scene 4 branch, true | false
  waking_reaction: null,      // Scene 5, "dream" | "mirror" | "understand"
  seen_reaction: null,        // Scene 6, "yes" | "no" | "sat_down"
  acknowledged_witness: null, // Scene 7, "held" | "avoided"
  final_choice: null          // Scene 7, "A" | "B" | "C", determines ending
}
```

**Which flags are consumed where.** Important for the build: not every flag feeds an ending, and a
developer should not go looking for uses that don't exist.

| Flag | Consumed by |
|---|---|
| `final_choice` | Routes to Ending A / B / C |
| `witness_reaction` | Ending A conditional middle |
| `tools_reaction` | Ending B conditional middle |
| `identity_found` | Ending C conditional middle |
| `seen_reaction` | Ending C conditional middle |
| `looked_away` | Scene 5 conditional line, Scene 6 tier2 hands, all three ending middles + witness callback |
| `acknowledged_witness` | Witness callback in all three endings |
| `player_name` | Final line of all three endings |
| `gate_action` | **Local only.** Sets tone in Scene 1, never read again. |
| `tally_reaction` | **Local only.** Sets tone in Scene 3, never read again. |
| `waking_reaction` | **Local only.** Sets tone in Scene 5, never read again. |

The three local-only flags are deliberate. They give the player agency in the moment without
multiplying ending permutations. They are still worth storing: if the game is ever extended, they
are the cheapest hooks to add new conditional text against.

**Art style suffix:** maintained in `testis-art-prompts.md`, which is the single source of truth for
art direction. Don't duplicate it here; it drifted once already.

---

## SCENE 1: The Gate

**IMAGE:** monastery gate at night, fog through iron bars, one lit window above, moon obscured by cloud

**TEXT:**
> I came to the gate the way one comes to a grave, without deciding to, and too late to turn back. The fog did not part for me. It had already been standing where I meant to walk.
>
> Somewhere behind the stone, water was falling, not the indifferent chatter of rain, but something metered, something *counted*, as if even the dark kept better time than I did. I would learn, later, that some men wait thirty years to say a single true thing out loud. Perhaps the water had learned patience from watching one of them.

**TIER 2, examine the sundial:**
> A dial with no sun to read by, and yet its shadow falls anyway. Beneath the wall, the drip keeps the same rhythm: long, short, short, long. A code, or only the sound decay makes when it wants to be remembered.

**TIER 2, examine the gate's iron latch:**
> Cold under my palm, and wet, though nothing above it could have rained. My fingers came away with a film on them, thin as the skin on old milk.

**TIER 2 / INTERACTION, the worn threshold letters:**
> Someone had carved letters here once. Time, or water, or both, had worn them back to suggestion. I could make out a shape more than a word, the way you recognize a song by its silence between notes.
>
> Beneath it, the stone was bare enough for another hand.

**INTERACTION, carve your name?** *(sets `player_name`)*
- **A. [text input: carve your name, max 20 characters]** → *I pressed the word into stone the way you press a thumb into wet clay, not because it would last, but because for a moment, it was mine to make last.* → `player_name: <input, truncated to 20 chars>`
- **B. "Leave the stone as you found it."** → *I let the letters stay half-erased. Some things, I thought, are kinder unfinished.* → `player_name: null`

**REACTIVE, what do you do at the gate?** *(sets `gate_action`)*
- **A. "Call out."** → *No one answered. I don't think I expected them to. I think I only wanted to hear what my own voice sounded like, here, before I forgot I'd brought one.* → `"called"`
- **B. "Step through in silence."** → *I entered the way guilt enters a room, sideways, already apologizing for a thing I hadn't done yet.* → `"silent"`
- **C. "Listen to the water a moment longer."** → *I counted the drips until I lost count, which felt, at the time, like the correct number to reach.* → `"listened"`

→ Scene 2

---

## SCENE 2: The Chapel

**IMAGE:** dim chapel, hooded monks encircling a bound seated figure, single candle

**TEXT:**
> He sat bound at the center of them, and the monks moved around his stillness the way tide moves around a stone, patient, certain, in no hurry to be cruel.
>
> His face troubled me before I understood why. Something in it suggested a man who had carried a single unspoken sentence for so long that the carrying had become indistinguishable from the man. Thirty years, I would come to learn, is a long time to hold a truth quietly. Long enough for the holding itself to start to look like guilt, even when the truth was never the crime.

**TIER 2, examine the astrolabe at his neck:**
> Tarnished, still around a dead man's throat as though no one had thought to remove a compass from someone no longer going anywhere. I did not know the word for it then.

**TIER 2, examine the star-chart under the chair:**
> Circles within circles, and at the center, not the earth. I had been taught it wrong, or he had been taught it early.

**TIER 2, examine the confiscated books, spines to the wall:**
> They'd turned every spine to the wall, as if a title left visible might argue back. One book had slipped, just enough to show a fragment of a diagram, circles, and at the center, not what scripture would have wanted.

**TIER 2, examine the monk murmuring a name, not his own:**
> A name, repeated like a rosary bead worn smooth. Not his. Someone he'd studied under, perhaps, or someone he'd proven wrong. Grief has more than one shape in a room like this.

**REACTIVE, do you try to name him?** *(sets `identity_found`. This block only appears if BOTH the astrolabe and the star-chart have been examined. If the player skipped either, this choice never renders and `identity_found` stays `false`.)*
- **A. "Say his name to yourself, silently."** → *I said it once, in my head, the way you test a floorboard before trusting your weight to it. It held.* → `identity_found: true`
- **B. "Refuse to. Some part of me wasn't ready to know."** → *Better, I thought, to let him remain a face I half-recognized than a name I'd have to carry out of this room.* → `identity_found: false`

> **Build note:** there are two distinct routes to `identity_found: false`, and they should feel
> different even though they share ending text: the player who never examined the clues (passive),
> and the player who found them and deliberately declined (active refusal). Ending C's `false` rows
> are written to accommodate both readings. No extra flag needed.

→ Scene 3

---

## SCENE 3: What They Believed

**IMAGE:** monk's hands arranging strange gleaming instruments beside candlelight, instruments too smooth, faintly luminous

**TEXT:**
> The instruments were wrong before I could say how. Steel too smooth for any forge I knew, a faint hum in them like trapped bees or captured lightning.
>
> A monk spoke of pressure. Of excess. Of a mind so overfull of motion that the only mercy left was to let it drain, the way one lances a boil grown fat with rot.
>
> I understood, listening to him, that the room did not object to what he knew. It objected to when he had chosen to say it, and that no one present intended to let him choose that timing twice.

**TIER 2, examine the humming instrument:**
> A thin cold light lived inside it, the way a firefly holds its own small blasphemy. I could not have named its century. I'm not sure it belonged to one.

**TIER 2, examine the dark glass surface among the tools:**
> Black glass, smooth as still water, holding no image at all, and yet I had the distinct sense it was capable of one, the way an unlit room is capable of a lamp.

**TIER 2, examine the second water-clock, half-hidden:**
> Same brass, same crack along its base, same slow patient drip, as though the room kept a spare in case the first one ever told the truth too plainly. I could not tell, looking at them side by side, which one had been built first. They agreed with each other too perfectly for that question to matter.

**TIER 2, examine the tally scratched under the table:**
> Marks. Dozens of them, grouped in fives the way a prisoner counts days, except these weren't days, they were shaped more like names, or the ruins of names, each one struck through with the same single, unhurried line. I did not count them. I did not want the number to be a number I recognized.

**TIER 2, examine a folded, unsent letter tucked beneath the tools:**
> Addressed to no one. The hand that wrote it had crossed out more than it kept.
>
> *"I have kept this correct for thirty years,"* it read, in a script gone brittle at the folds. *"I no longer remember if I was protecting the world from it, or protecting it from the world."*
>
> There was no signature. There didn't need to be one.

**TIER 2, examine a single printed page, ink still faintly wet, half-hidden under cloth:**
> A page, freshly pressed, smelling of iron and oil the way new print always does before it's had time to become old. Diagrams. Circles around circles, and at the center, not what the room believed.
>
> I reached for it. A monk's hand closed over mine before I could lift it clear, not roughly. The way you'd stop a dying man from reaching for water he's already had enough of.
>
> "Later," the monk said, in a tone that made it clear he meant *never*, said kindly.

> **Build note:** Scene 3 is the only scene with **two** reactive blocks. They resolve in sequence
> (tally first, then tools), not simultaneously. The scene schema must accept `reactive` as an
> array, not a single object. Every other scene has exactly one.

**REACTIVE, how do you react to the tally?** *(sets `tally_reaction`. Only renders if the tally tier2 object was examined; otherwise skip straight to the tools reaction below.)*
- **A. "This has happened before."** → *I said it the way you say a diagnosis you already suspected, relief and dread arriving in the same breath.* → `"before"`
- **B. "This is only this room. It means nothing."** → *I told myself that. I have noticed that the things we tell ourselves most firmly are usually the ones we believe least.* → `"denial"`
- **C. "I don't want to know."** → *I let the cloth fall back over the ledger. Some doors close easier from the outside than the mind ever closes them from within.* → `"refuse"`

**REACTIVE, how do you react to the anachronism generally?** *(sets `tools_reaction`)*
- **A. "This is wrong, this shouldn't exist here."** → *I said it to no one, which was, I was beginning to learn, the only audience this dream kept for me.* → `"denial"`
- **B. "Maybe time doesn't move the way I was told."** → *If he could be early, perhaps the room could be late, borrowing tomorrow's tools to perform yesterday's cruelty.* → `"acceptance"`
- **C. "Watch and say nothing, some questions aren't for asking."** → *I had the sense that understanding it would not have stopped it. Only made me complicit in it a little sooner.* → `"silence"`

→ Scene 4

---

## SCENE 4: He Sees Me ★ (highlight scene)

**IMAGE:** bound figure's head tilted back, monk's hand pressing an anachronistic instrument to his temple, single crack of light escaping

**TEXT:**
> The instrument found its place against his temple, and the room exhaled the way a held breath does, not with violence, but with relief.
>
> When the skin gave, no blood came. Only water, clear as the water in the clock, running past his ear onto the stone in a small, patient psalm. He did not cry out. Only tired, the way a man is tired after a debate he has already lost the crowd on, or a book he finished decades before anyone agreed to print it.
>
> And then he looked at me.

**TIER 2, examine his eyes:**
> In the wet dark of them, for just a moment, I saw something reflected that wasn't candlelight. A face. Mine, I think, though I could not say, afterward, if I had recognized it, or only hoped I would.

**REACTIVE, what do you do?** *(sets `witness_reaction`)*
- **A. "Say nothing."** → *He seemed almost grateful for the silence, as if speech, even mine, would have been one more thing draining out of him.* → `"silent"`
- **B. "Why didn't you fight them?"** → *"Fighting is for men who believe the argument is still open. Mine closed the day I finished the mathematics. Since then, others have taken it upon themselves to soften what I meant, to make it safer than I ever intended it to be. I have grown used to my own truth arriving secondhand, wearing someone else's caution." He smiled like it cost him something he no longer had spare.* → `"asked_why"`
- **C. "Try to reach out, touch his shoulder, though no one sees you."** → *My hand passed through him the way a hand passes through fog, and yet something in his face eased, as though he'd felt weather change, if not a hand.* → `"reached"`
- **D. "It's not your fault."** → *"No," he agreed, so gently it was almost forgiveness. "It rarely is anyone's. That's the part they never write in the histories."* → `"absolved"`

**BRANCH POINT 1** *(sets `looked_away`)*
- **"I looked away."** → `true`
- **"I kept watching."** → `false`

**Closing line (always plays):**
> "I'm ahead of my time," he said, not as excuse, not as grievance. As apology. As if being right early was a debt he owed the room, and this, the water, the stone, the small patient sound of himself running out, was only him finally paying it.

→ Scene 5

---

## SCENE 5: Waking

**IMAGE:** a hand touching a forehead in darkness, minimal linework, mostly negative space

**TEXT:**
> I woke the way a candle wakes, not remembering it had ever been out. My hand had already found my temple before my mind caught up to it.
>
> There was a seam there. Not a scar. A *seam*, and it was wet. Not bleeding-wet. Something slower than blood, something that clung to my fingers the way old glue clings, half-dried and unwilling to fully let go of either surface it was meant to join.
>
> I rubbed my fingers together and the wetness did not rub away so much as stretch, a thin, cold thread of it, tacky, reluctant, before it finally broke. It smelled of nothing. It felt like something that had been waiting a very long time to be touched.
>
> Somewhere beneath the stickiness, under the skin, I thought I could feel the shape of a word forming, not one I was thinking, but one waiting to be thought, the way a name waits in a mouth before you've decided to speak it. It felt old. It felt, absurdly, like *mine*, the way a coat left too long in someone else's closet starts to smell like your own house instead of theirs.

**Conditional line (`looked_away`):**
- if `true`: *I had looked away from him, and yet here I was, sticky-fingered, touching the very door I'd refused to watch open.*
- if `false`: *I had watched him become this. I hadn't understood that watching leaves residue, that it stays on the fingers long after the looking is done.*

**TIER 2, examine the wetness itself:**
> It dried, slightly, at the edges of the seam, the way a puddle dries at its shore first, leaving a faint ring, like a stain a glass leaves on wood. The center stayed wet no matter how long I waited.

**TIER 2, examine your reflection in the dark window:**
> The glass gave back less a face than a suggestion of one, and for just a moment, the suggestion wore a collar I didn't own, a face older than mine by three centuries and several apologies. Then it was only me again, or only tired, which in that light amounted to the same thing.

**REACTIVE, what's your first thought?** *(sets `waking_reaction`)*
- **A. "This is still the dream."** → *A reasonable thought. I held onto it the way one holds a coat too thin for the weather, out of habit, not belief.* → `"dream"`
- **B. "I need to see my own eyes."** → *There was no mirror in the room. I found this, somehow, less frightening than finding one would have been.* → `"mirror"`
- **C. "I understand now."** → *Understanding arrived before explanation did, the way grief sometimes arrives before the phone call that should have caused it.* → `"understand"`

→ Scene 6

---

## SCENE 6: The Chapel, Again

**IMAGE:** same chapel composition as Scene 2, seated bound figure's face now obscured/blank, monks facing forward toward viewer

**TEXT:**
> The chapel had not moved, but I had, from the fog outside it, to the chair at its center. The candle guttered at the same hour it always had, because it seemed this room did not keep time so much as repeat it, the way a copied page repeats an error until someone finally checks the original.
>
> The monks looked at me now. All of them, at once, the way a held breath finally released.
>
> One of them, the eldest, I think, though the hood made ages hard to keep, tilted his head at me with something almost like recognition. Not the recognition of a stranger. The recognition of a man greeting a guest he's hosted so many times he's stopped bothering to relearn the name, only the shape of the visit.
>
> "Back again," he said, not unkindly, the way you'd greet weather you'd stopped being surprised by.
>
> And then, past his shoulder, in the place where the candlelight gave up and the dark began, I saw someone standing. Still. Unclaimed by the room, the way I once had been.
>
> I could not see a face. Only the outline of someone watching the way one watches a thing they don't yet understand they'll become responsible for. The monks did not turn to look at what I was looking at. Of course they didn't. I hadn't turned either, the first time.

**TIER 2, examine your own hands:**
- if `looked_away == true`: *My hands were shaking the way his never had, as if he had spent his fear already, and left me only the leftover of it.*
- if `looked_away == false`: *My hands were steady. I had rehearsed this, without knowing it, every time I refused to look away from his.*

**TIER 2, examine the water-clock:**
> Nearly dry, the basin beneath it dark with old use, and beside it, I now noticed, a second empty basin, drier still, as though it had finished this same errand some while before I arrived to start mine.

**TIER 2, examine the watcher in the dark:**
> They did not move when I looked at them, which is its own kind of answer. I raised a hand, half a greeting, half a warning. I could not tell if they raised one back, or if I only wanted them to.

**REACTIVE, a monk speaks: "Do you understand why you're here?"** *(sets `seen_reaction`)*
- **A. "Yes. I always have."** → *"Then you understand," he said, "why understanding was never going to save you."* → `"yes"`
- **B. "No, and I don't think you do either."** → *He did not answer that. I chose to take his silence as agreement, since he'd given me nothing else to take.* → `"no"`
- **C. Say nothing, only sit down in the chair yourself.** → *This, more than anything I could have said, seemed to satisfy them. I had, without meaning to, given them the answer in advance.* → `"sat_down"`

→ Scene 7

---

## SCENE 7: The Choice

**IMAGE:** monk's hand extending an anachronistic instrument toward the viewer, first-person perspective, viewer's own bound wrists visible in frame

**TEXT:**
> A monk knelt before me with the instrument that had opened him. Its cold light pulsed once, patient, unbothered by which century had summoned it.
>
> "Does it hurt to be ahead," he asked me, not unkindly, "or only to be alone in it?"
>
> Past the monk's shoulder, they were still there. Closer now than in the chapel, near enough that I understood, with the strange calm of a fact arriving too late to be useful, that they were not going to intervene. They hadn't come to save me. They had come the way you come to a bedside, not to change what's happening, only to make sure it isn't unwitnessed.
>
> I found, oddly, that this was the closest thing to mercy the room had offered me all night.

**TIER 2, examine the rope at your wrists:**
> Soft with age, the same rope, I was almost certain, that had held him. It had not been replaced. Perhaps it never needed to be.

**REACTIVE, do you acknowledge them?** *(sets `acknowledged_witness`)*
- **A. "Look at them and hold their gaze."** → *I did not look away, and neither did they. Some conversations don't need words to be complete, only two people willing to stay in the room for them.* → `"held"`
- **B. "Don't look. Keep your eyes on the monk instead."** → *I kept my eyes forward. I told myself it was courage. I suspect, now, it was only the same fear he must have felt, wearing a newer coat.* → `"avoided"`

**FINAL BRANCH** *(sets `final_choice`, determines ending)*
- **A. "Let it happen. I have nothing left to prove them wrong."** → Ending: The Drained
- **B. "I fought them, though I knew the rope would win."** → Ending: The Kept Hour
- **C. "I said his words back to them: 'I'm ahead of my time.'"** → Ending: The Relay

---

## ENDINGS

**Assembly spec.** Every ending renders as one continuous screen, assembled from blocks in this
exact order. Blocks are separated by paragraph breaks, with no headers or visible seams: the player
should read it as a single passage, not a stitched-together lookup result.

1. **Base opening** (always, fixed per ending)
2. **Conditional middle** (one row from that ending's table, or fallback)
3. **Witness callback** (one row from the shared 4-row table)
4. **Manuscript callback** (Ending C only)
5. **Closing** (always, fixed per ending, with `{player_name}` interpolated)

**`{player_name}` interpolation.** If the player carved a name, substitute it directly. If they
declined, or submitted an empty/whitespace-only string, substitute the literal words **`a name`**,
which keeps the sentence grammatical and preserves the intended ambiguity. Do not print "null",
"undefined", or an empty gap. This is the last line of the game and the payoff for a Scene 1
decision made twenty minutes earlier; it must not break.

---

### Ending A: The Drained
**IMAGE:** empty chair, ropes loose, small pool of clear water on stone, chapel now vacant

**Base opening (always):**
> I let it happen. There is a particular quiet in choosing your own ending, not peace, exactly, but its patient cousin.

**Conditional middle, by `witness_reaction` + `looked_away`:**
| witness_reaction | looked_away | Flavor |
|---|---|---|
| reached | false | I thought, as the water began, of the hand I'd tried to press through him, how I had tried, at least once, to be brave for someone who could not feel it. It hadn't been enough. I'm not sure anything would have been. But I had tried, and there is a version of this ending where that matters more than it does here. |
| silent | true | I had said nothing to him, and looked away besides. It seemed only fitting, in the end, that no one had anything to say to me either. I had asked for this quiet. I could not now complain that it was quiet. |
| asked_why | false | I had asked him why he hadn't fought, and watched him answer with his whole tired face. I understood, now, sitting where he'd sat, that I wasn't going to fight either, not out of his same certainty, but because I'd seen where certainty gets a man, and envied it anyway. |
| absolved | true | I had told him it wasn't his fault, then looked away from the cost of saying so. It was easier, I found, to forgive someone than to keep watching what forgiveness didn't fix. I hoped, wherever he was, he'd extend me the same easy mercy. |
| reached | true | I had tried to reach him, then looked away before I could learn if it had mattered. I would never know now. That, I think, was the sentence I was actually serving. |
| asked_why | true | I had wanted his reasons, then looked away from what the reasons cost him. Understanding, it turned out, was not the same as staying. |
| silent | false | I had said nothing to him, but I had stayed, and I had watched all of it. I used to think silence was the coward's version of presence. Sitting here now, I am less sure. He never asked me to speak. He only needed someone in the room while it happened, and I had managed that much. |
| absolved | false | I had told him it wasn't his fault, and then I had watched the whole cost of it without flinching. It seems only right that I extend myself the same verdict now, though I notice it is much harder to believe when the man you're forgiving is the one in the chair. |

**Fallback:** I thought of him, of the water, of the apology he'd offered a room that hadn't asked for one. I understood, finally, what he'd meant. It was never about being right. It was only about being early to a loneliness everyone eventually shares.

*(Coverage: all 8 combinations of `witness_reaction` × `looked_away` are written. The fallback should
never fire in normal play; it exists only as a guard against a null flag.)*

**WITNESS CALLBACK, by `looked_away` + `acknowledged_witness`.** *(Shared block. Rendered verbatim in
all three endings, immediately after that ending's conditional middle. All 4 combinations covered,
no fallback required.)*

| looked_away | acknowledged_witness | Flavor |
|---|---|---|
| true | held | I had looked away from him, once. I did not look away from them. Perhaps that was the only debt I managed to repay in either direction. |
| false | avoided | I had watched him fully, and could not now offer the same to whoever was watching me. I understood, finally, how much that must have cost him to forgive. |
| true | avoided | I had looked away from him, and looked away from them in turn. Some patterns, it seems, don't break simply because you've lived both halves of them. |
| false | held | I had watched him fully, and now let myself be watched fully in return. If this is a relay, at least I ran my leg of it with my eyes open. |

**Closing (always):**
> "I'm ahead of my time," I said to no one, and somewhere, I hope, someone was watching who understood it as I once had.
>
> Somewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to.

---

### Ending B: The Kept Hour
**IMAGE:** broken rope, overturned chair, chapel in disarray, single candle still burning

**Base opening (always):**
> I fought them, though I knew the rope would win. It is a strange kind of dignity, choosing a fight you cannot survive, not for victory, but so the losing has your fingerprints on it.

**Conditional middle, by `tools_reaction` + `looked_away`:**
| tools_reaction | looked_away | Flavor |
|---|---|---|
| denial | false | I had called the instruments wrong the moment I saw them, and I called this wrong too, with my whole struggling body, all the way down. At least this time, someone was in the room to hear me say it. |
| acceptance | true | I had wondered, once, if the room was late rather than he early, if time itself had come unstuck. Fighting, now, felt like trying to hold a door shut against weather. Necessary. Useless. Mine, at least. |
| silence | false | I had watched the tools in silence once, telling myself understanding wasn't complicity. I no longer believed that. This, the fighting, was the interest accrued on that earlier quiet. |
| denial | true | I had refused the wrongness of the tools once, and looked away from him besides. The fighting now felt less like courage and more like a debt finally called due, all at once, with interest. |
| silence | true | I had watched the tools in silence once, and looked away from him besides. But rebellion, I was learning, does not require an audience to be real. This fight was quiet too, mine alone, unwitnessed by anyone but the rope. It didn't need to be loud to be a refusal. |
| acceptance | false | I had told myself, once, that the room was only borrowing tomorrow's tools to perform yesterday's cruelty, and I had watched him without looking away. Now I fought the same way I'd accepted that truth, without illusion, working inside the shape of the thing rather than against it, finding what courage was left in a system that would not bend, only in the man made to stand inside it. |

**Fallback:** I fought the way water fights a dam, not expecting to win, only refusing to be still about losing. The rope held. I would like to think something in the room noticed that it had to.

**WITNESS CALLBACK:** render the shared 4-row table from Ending A verbatim. Do not duplicate it in data; store it once and reference it from all three endings.

**Closing (always, name-interpolated):**
> They did not stop. Nothing stops, once a room has decided what a man's insides are for. But I made them work for it. I think that's the only inheritance I have to leave, that being early doesn't require being quiet about it.
>
> Somewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to.

---

### Ending C: The Relay
**IMAGE:** your own eyes in close-up, mirroring Scene 4's "his eyes" composition, now it's you being seen

**Base opening (always):**
> I said his words back to them. "I'm ahead of my time." I felt them leave my mouth the way a coin leaves a hand thrown into water, not lost, exactly. Given.

**Conditional middle, by `identity_found` + `seen_reaction`:**
| identity_found | seen_reaction | Flavor |
|---|---|---|
| true | yes | I had learned his name once, quietly, in a chapel that didn't know I was listening. Saying his words now felt less like theft and more like custody, someone had to keep them, and it may as well have been the one who'd gone looking. |
| false | no | I had never let myself learn his name. I said his words anyway, borrowed and unearned, and understood, as the room went quiet, that some things don't require permission to be inherited. Only a willingness to carry them. |
| true | sat_down | I had known who he was, and still I'd said nothing until now. Perhaps that's what a relay actually is, not urgency, but patience, holding a thing quietly until it's your turn to run. |
| false | yes | I never learned his name, and yet the room saw me and called it recognition all the same. Perhaps that's what a prophet actually is, someone who never needed a name to be understood, only a face willing to stay long enough to be seen. |
| true | no | I had learned his name, quietly, and it turned out learning it was the same as inheriting it. Destiny, I think, is only this, finding out whose story you were always going to finish, and discovering the name was never his alone to keep. |
| false | sat_down | I never learned why he was who he was. I sat down anyway. Some circles, I was beginning to understand, don't need to be explained to be closed, only completed by whoever is willing to sit where the last person sat. |

**Fallback:** I didn't know, fully, whose words I was borrowing when I said them. I only knew they were the truest thing in the room, and someone needed to keep saying them until a century arrived that didn't need them said.

**WITNESS CALLBACK:** render the shared 4-row table from Ending A verbatim. Do not duplicate it in data; store it once and reference it from all three endings.

**Manuscript callback (always plays, Ending C only):**
> I thought, saying his words, of the page I'd once reached for and wasn't allowed to hold, the one a monk had covered with his own hand and called "later," meaning never. No one was stopping me now. I said the words all the way through, out loud, to a room that had no choice left but to hear them. Whatever they did to me after, they could not take back that the sentence had finally been let finish.

**Closing (always, name-interpolated):**
> Somewhere, I could feel it, the way you feel a door closing in another room of the same house, someone was dreaming this exact chapel, watching someone they didn't yet realize was themselves. I hope, when it's their turn to wake, they remember it wasn't punishment.
>
> It was only ever a relay. And I had just handed off the water.
>
> Somewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to.

---

## STATUS

**Narrative content is complete.** All scenes, tier2 objects, reactive blocks, branch points, and
ending permutations are written. Nothing in this doc is a placeholder.

Resolved: title (**TESTIS**), art style (locked in `testis-art-prompts.md`), `player_name` limit
(20 chars), manuscript-page callback (Ending C), full combination coverage in all three ending
tables, `identity_found` logic corrected so refusal no longer sets it true.

### Content inventory
| Item | Count |
|---|---|
| Scenes | 7 |
| Endings | 3 |
| Tier 2 examine objects | 20 (18 dedicated images; `obj-water-clock` is reused, and Scene 6's "hands" is text-only) |
| Reactive blocks (non-branching) | 8 |
| Real branch points | 2 (Scene 4 `looked_away`, Scene 7 `final_choice`) |
| Conditional ending rows | 8 + 6 + 6, plus 4 shared witness rows |
| Estimated playtime | 15 to 20 min per run |

### Remaining work (not narrative)
- [ ] Generate art per `testis-art-prompts.md`
- [ ] Build per `testis-tech-design.md`
- [ ] Playtest all three endings, confirming no conditional row renders the fallback unintentionally

### Deliberate design decisions, recorded so they don't get "fixed" later
- **Three flags are local-only** (`gate_action`, `tally_reaction`, `waking_reaction`). Not a bug. See
  the flag consumption table above.
- **Scene 4 is deliberately lean on tier2 objects** (one only). It's the emotional peak; extra
  clickables would dilute it. Resist the urge to add more for symmetry.
- **No persistence.** Refresh restarts the game. Correct for a 15-minute playtime.
- **The morse rhythm in Scene 1** (long, short, short, long) is never decoded in-game. Players who
  care will look it up. Do not add a translation.
- **The monks are never individuated** and never named. They are one collective. This is a scope
  decision and a thematic one: the Institution has no face to hold accountable.
