// SUPERSTES — Chapter II's tally wall copy.
//
// Same mechanism as Chapter I's wall (see wall.js), with one deliberate
// absence and one deliberate presence:
//
//   • No secret plaque. There is no Morse in Chapter II, so there is nothing
//     withheld for a plaque to hand back.
//   • `again` is present. The wall used to be a dead end (Chapter I loops,
//     Chapter II stops), which read well as an argument and badly as a thing
//     to sit in front of, so it offers Begin again. There is still no
//     `nextChapter`: Chapter II is the last one. See the script doc's
//     "Reversed decision, recorded."
//
// See docs/superstes-chapter-2-script.md § The Tally Wall.

const WALL_C2 = {
  // Chapter I's wall says something is *already* keeping count, before the
  // player has done anything. Chapter II's says it in the past tense, because
  // by the time this wall opens the counting is what has just been revealed.
  heading: "Something was already keeping count",

  // Register names in Chapter II's own register: no accused, no proceeding,
  // only what was kept and who was in it. Matched on filename prefix in order,
  // and an asset matching nothing is silently left off — the same trap as
  // Chapter I's, which is why `plate-` is listed explicitly.
  registers: [
    { numeral: "I",   label: "The Places",    layout: "wide",   prefix: ["scene-", "ending-"] },
    { numeral: "II",  label: "What Was Kept", layout: "square", prefix: ["obj-"] },
    // Same 4:5 as Chapter I's register III: the pool plate is cropped to 4:5 to
    // match Chapter I's held plates, so the wall cell has to be 4:5 too or
    // object-fit: cover crops a portrait into a landscape slot.
    { numeral: "III", label: "The People",    layout: "portrait", prefix: ["char-", "plate-"] }
  ],

  // Chapter I says "Not seen" — you were not there. Chapter II's whole subject
  // is having been there and not retained it, so the honest words are different.
  unseen: "Not remembered",

  plateWord: "Plate",

  enter: "See what was kept",

  // Chapter II's wall used to be a dead end -- Chapter I loops, Chapter II
  // stops -- which read well as an argument and badly as a thing to actually
  // sit in front of. It offers the way out. There is still no `nextChapter`
  // here: Chapter II is the last one, so this is the end of the line.
  again: "Begin again",

  // Same provenance line as Chapter I's wall. Kept rather than inherited so
  // each chapter's wall carries its own copy and neither depends on the other.
  credit: [
    "Art generated with Midjourney from the author's prompts,",
    "with post-generation drawing and editing in Procreate."
  ]

  // No secret* keys. That absence is load-bearing; see above.
};
