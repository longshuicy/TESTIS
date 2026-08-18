// TESTIS — the tally wall's own copy.
//
// Every caption on the wall is derived at runtime from scenes.js / endings.js
// (scene and ending titles, tier-2 examine labels), so nothing here restates
// narrative that already lives there. What this file owns is only the copy the
// wall itself needs and nothing else does: its heading, its register names,
// and the words for a plate you have not reached.
//
// See docs/testis-script.md § The Tally Wall.

const WALL = {
  heading: "Something is already keeping count",

  // Registers are matched against the asset's filename prefix, in order. An
  // asset that matches nothing is not shown — that is how the decorative frame
  // border stays off the wall without being special-cased anywhere else.
  // `plate-` sits with `char-` rather than with `scene-`: a held plate is a
  // portrait of whoever is in the room, not a picture of the room. Matching on
  // "scene-" alone would also miss it — the prefixes are tested with
  // startsWith, and "plate-scene-7" does not begin with "scene-".
  registers: [
    { numeral: "I",   label: "The Rooms",   prefix: ["scene-", "ending-"] },
    { numeral: "II",  label: "Evidence",    prefix: ["obj-"] },
    { numeral: "III", label: "The Accused", prefix: ["char-", "plate-"] }
  ],

  // Shown on an un-inked cell. Deliberately not "locked" or "???" — the wall
  // is a record of what was witnessed, and the honest word for the rest is
  // that you were not there.
  unseen: "Not seen",

  plateWord: "Plate",

  // The wall's one hidden thing: a place to hand back the sentence the three
  // water-clocks were dripping out, if you already have it. The game itself
  // never translates the Morse (script doc, Deliberate Decisions) — this
  // plaque only answers a player who solved it outside the fiction, or who
  // would rather be told. Comparison strips everything but letters, so
  // punctuation and spacing never matter; the canonical phrase below is also
  // the only copy of it, normalized at compare time rather than duplicated.
  secretPrompt: "Bonus: what was the water clock trying to tell you?",
  secretLabel: "—",
  secretReveal: "Show it to me anyway",
  secretPhrase: "SOL STAT. TERRA MOVET. EGO PRAECEDENS.",
  secretTranslation: "the sun stands still. the earth moves. I am ahead of my time.",

  // The ending hands off to the wall rather than straight back to the start:
  // the count is the last thing the game says, and "begin again" waits there.
  enter: "See what was counted",
  again: "Begin again",

  // Provenance. Kept here rather than in the art doc's voice because it is
  // read by players, not by whoever generates the next asset.
  credit: [
    "Art generated with Midjourney from the author's prompts,",
    "with post-generation drawing and editing in Procreate."
  ]
};
