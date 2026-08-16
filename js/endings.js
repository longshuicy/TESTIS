// TESTIS — ending data.
// Transcribed from docs/testis-script.md v3. Assembly order is fixed:
// baseOpening → conditionalMiddle → WITNESS_CALLBACK → manuscriptCallback (C only) → closing.
//
// NOTE: `looked_away` and `identity_found` are real booleans in both flags and match rows.
// Do not stringify them; `lookup()` uses strict equality.

const WITNESS_CALLBACK = {
  keys: ["looked_away", "acknowledged_witness"],
  table: [
    {
      match: { looked_away: true, acknowledged_witness: "held" },
      text: "I looked away from him once. I did not look away from them. Perhaps that was the only debt I managed to repay in either direction."
    },
    {
      match: { looked_away: false, acknowledged_witness: "avoided" },
      text: "I watched him fully, and could not offer the same to whoever was watching me. I understand now what that must have cost him to forgive, and I notice he forgave it without being asked."
    },
    {
      match: { looked_away: true, acknowledged_witness: "avoided" },
      text: "I looked away from him, and looked away from them in turn. Some patterns do not break simply because you have lived both halves of them."
    },
    {
      match: { looked_away: false, acknowledged_witness: "held" },
      text: "I watched him fully, and let myself be watched fully in return. If this is a relay, at least I ran my leg of it with my eyes open."
    }
  ]
  // No fallback: all 4 combinations are covered.
};

const ENDINGS = [

  // ─────────────────────────────────────────────────────────── ENDING A
  {
    id: "ending-a",
    title: "The Drained",
    background: "assets/images/ending-a.png",
    baseOpening: "I said nothing.\n\nNot out of courage. I want to be honest about that. I had simply understood, somewhere between the chapel and the chair, that the answer they wanted was standing in the dark behind them, and that giving it would only move the marks on the table one line further down.\n\nThere is a particular quiet in choosing your own ending. Not peace exactly, but its patient cousin.",
    conditionalMiddle: {
      keys: ["witness_reaction", "looked_away"],
      table: [
        {
          match: { witness_reaction: "reached", looked_away: false },
          text: "I thought, as the water began, of the hand I had tried to press through him. <em>You did that last time as well,</em> he had said, and I had not understood. I understood now. I had been trying to reach him for longer than either of us had been counting, and I had never once managed it, and I had never once stopped."
        },
        {
          match: { witness_reaction: "silent", looked_away: true },
          text: "<em>Good,</em> he had said. <em>The last one talked.</em> I had not talked then and I did not talk now, and I looked away from him besides, and it seems only fitting that no one had anything to say to me either. I had asked for this quiet. I could not now complain that it was quiet."
        },
        {
          match: { witness_reaction: "asked_why", looked_away: false },
          text: "I had asked him why he did not fight, and watched him answer with his whole tired face. <em>Mine closed the day I was handed it.</em> I understood, sitting where he had sat, that I was not going to fight either, and that the reason was the same, and that neither of us had chosen the moment the argument closed."
        },
        {
          match: { witness_reaction: "absolved", looked_away: true },
          text: "I said sorry to him without knowing what for, and he told me it was not mine, and then I looked away before I could watch him pay for it anyway. <em>You will want to remember I said that.</em> I have remembered. It has not done what he intended. A man can hand you an absolution and still be wrong about who needed one."
        },
        {
          match: { witness_reaction: "reached", looked_away: true },
          text: "I had tried to reach him, then looked away before I could learn whether it mattered. I will never know now. That, I think, was the sentence I was actually serving."
        },
        {
          match: { witness_reaction: "asked_why", looked_away: true },
          text: "I had wanted his reasons and then looked away from what the reasons cost him. Understanding, it turns out, is not the same as staying."
        },
        {
          match: { witness_reaction: "silent", looked_away: false },
          text: "I said nothing to him, but I stayed, and I watched all of it. I used to think silence was the coward's version of presence. Sitting here now I am less sure. He never asked me to speak. He only needed someone in the room while it happened, and I managed that much."
        },
        {
          match: { witness_reaction: "absolved", looked_away: false },
          text: "I said sorry to him before I knew why, and he refused it, and I watched the whole cost of his refusing without looking away. <em>Not yours,</em> he said. <em>It is never the one holding it at the end.</em> He was telling me about himself and I heard it as kindness. Sitting here now, holding it at the end, I understand he was telling me about me."
        }
      ],
      fallback: "I thought of him, and of the water, and of the apology he had offered a room that had not asked for one. It was never about being right. It was only about being handed something early and being made to carry it alone."
    },
    manuscriptCallback: null,
    closing: "“I'm ahead of my time,” I said to no one, because it was the only lie left that might be useful to somebody.\n\nThe marks under the table did not stop at mine. I had seen that and understood it and chosen this anyway, which is either the bravest thing I have done or the most useless, and I was not going to find out which.\n\nSomewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to."
  },

  // ─────────────────────────────────────────────────────────── ENDING B
  {
    id: "ending-b",
    title: "The Kept Hour",
    background: "assets/images/ending-b.png",
    baseOpening: "I fought them, though I knew the rope would win.\n\nNot to escape. I understood by then that there was nowhere in this arrangement to escape <em>to</em>, that the door I had come in by opened onto the same fog it always had. I fought because a thing that has been done this many times, this smoothly, deserves at least once to be done badly.\n\nIt is a strange kind of dignity, choosing a fight you cannot survive. Not for victory. So that the losing has your fingerprints on it.",
    conditionalMiddle: {
      keys: ["tools_reaction", "looked_away"],
      table: [
        {
          match: { tools_reaction: "denial", looked_away: false },
          text: "I called the instruments wrong the moment I saw them, and I called this wrong too, with my whole struggling body, all the way down. Wrong for the century, I had meant then. I meant something larger now, and there was finally somebody in the room to hear me mean it."
        },
        {
          match: { tools_reaction: "acceptance", looked_away: true },
          text: "I had wondered once whether the room was late rather than he early, whether things arrive out of order and have to be carried the rest of the way by hand. Fighting now felt like trying to hold a door shut against weather. Necessary. Useless. Mine, at least."
        },
        {
          match: { tools_reaction: "silence", looked_away: false },
          text: "I watched the tools in silence once and told myself understanding was not complicity. I no longer believe that. This, the fighting, was the interest accrued on that earlier quiet, and it was owed."
        },
        {
          match: { tools_reaction: "denial", looked_away: true },
          text: "I refused the wrongness of the tools once and looked away from him besides. The fighting felt less like courage than a debt called due all at once, with interest, in a currency I had not known I was borrowing."
        },
        {
          match: { tools_reaction: "silence", looked_away: true },
          text: "I watched in silence once and looked away besides. But rebellion does not require an audience to be real. This fight was quiet too, mine alone, unwitnessed by anything but the rope. It did not need to be loud to be a refusal."
        },
        {
          match: { tools_reaction: "acceptance", looked_away: false },
          text: "I had told myself the room was only borrowing tomorrow's tools for yesterday's cruelty, and I had watched him without looking away. I fought the same way I had accepted that, without illusion, inside the shape of the thing rather than against it, finding what courage remains available to a man standing where the machine expects him."
        }
      ],
      fallback: "I fought the way water fights a dam, not expecting to win, only refusing to be still about losing. The rope held. I would like to think something in the room noticed that it had to."
    },
    manuscriptCallback: null,
    closing: "They did not stop. Nothing stops, once a room has decided what a man's insides are for.\n\nBut I never answered the question. Not once, not at the end, not when answering would have been easier than the rope. Whatever else the marks under that table record, mine has that next to it, and I find I can live with the rest.\n\nSomewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to."
  },

  // ─────────────────────────────────────────────────────────── ENDING C
  {
    id: "ending-c",
    title: "The Relay",
    background: "assets/images/ending-c.png",
    baseOpening: "I said his words back to them. “I'm ahead of my time.”\n\nI knew it was not true when I said it. That was rather the point. He had known it was not true either, and had said it anyway, in this chair, to protect a person standing in the dark who had not done anything yet.\n\nI felt the words leave my mouth the way a coin leaves a hand thrown into water. Not lost, exactly. Given.",
    conditionalMiddle: {
      keys: ["identity_found", "seen_reaction"],
      table: [
        {
          match: { identity_found: true, seen_reaction: "yes" },
          text: "I had learned his name once, quietly, in a chapel that did not know I was listening. Saying his words now felt less like theft than custody. Someone has to keep them, and it may as well be the one who went looking."
        },
        {
          match: { identity_found: false, seen_reaction: "no" },
          text: "I never let myself learn his name. I said his words anyway, borrowed and unearned, and understood as the room went quiet that some things do not require permission to be inherited. Only a willingness to carry them."
        },
        {
          match: { identity_found: true, seen_reaction: "sat_down" },
          text: "I knew who he was and still said nothing until now. Perhaps that is what a relay actually is. Not urgency. Patience, holding a thing quietly until it is your turn to run."
        },
        {
          match: { identity_found: false, seen_reaction: "yes" },
          text: "I never learned his name, and the room saw me and called it recognition anyway. Perhaps that is all any of them ever were: not prophets, not heretics, only people who never needed a name to be understood, and who stayed long enough to be seen."
        },
        {
          match: { identity_found: true, seen_reaction: "no" },
          text: "I had learned his name, and learning it turned out to be the same as inheriting it. That is all destiny is, I think. Finding out whose story you were always going to finish, and discovering the name was never his alone to keep."
        },
        {
          match: { identity_found: false, seen_reaction: "sat_down" },
          text: "I never learned why he was who he was. I sat down anyway. Some circles do not need to be explained to be closed, only completed by whoever is willing to sit where the last one sat."
        }
      ],
      fallback: "I did not fully know whose words I was borrowing when I said them. I only knew they were the truest lie in the room, and that someone would need to keep saying it until a century arrived that did not require it."
    },
    manuscriptCallback: "I thought, saying it, of the page I had reached for and was not allowed to hold, the one a monk had covered with his own hand and called later, meaning never. Wet ink, in a room where the book had not been written.\n\nI understood at last which direction it had been traveling.\n\nNo one stopped me now. I said the words all the way through, out loud, to a room that had no choice left but to hear them, and the one in the dark heard them too, which was the entire purpose of saying them at all.",
    closing: "Somewhere, and I could feel it the way you feel a door closing in another room of the same house, someone was dreaming this exact chapel. Watching someone they did not yet realize was themselves. Carrying something home in their hands without knowing they had picked it up.\n\nI hope, when it is their turn to wake, they remember it was not punishment.\n\nIt was only ever a relay. And I had just handed off the water.\n\nSomewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to."
  }
];
