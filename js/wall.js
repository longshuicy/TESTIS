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
  registers: [
    { numeral: "I",   label: "The Rooms",   prefix: ["scene-", "ending-"] },
    { numeral: "II",  label: "Evidence",    prefix: ["obj-"] },
    { numeral: "III", label: "The Accused", prefix: ["char-"] }
  ],

  // Shown on an un-inked cell. Deliberately not "locked" or "???" — the wall
  // is a record of what was witnessed, and the honest word for the rest is
  // that you were not there.
  unseen: "Not seen",

  plateWord: "Plate",

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
