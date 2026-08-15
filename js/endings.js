// TESTIS — ending data.
// Transcribed from docs/the-water-clock-script.md. Assembly order is fixed:
// baseOpening → conditionalMiddle → WITNESS_CALLBACK → manuscriptCallback (C only) → closing.
//
// NOTE: `looked_away` and `identity_found` are real booleans in both flags and match rows.
// Do not stringify them; `lookup()` uses strict equality.

const WITNESS_CALLBACK = {
  keys: ["looked_away", "acknowledged_witness"],
  table: [
    {
      match: { looked_away: true, acknowledged_witness: "held" },
      text: "I had looked away from him, once. I did not look away from them. Perhaps that was the only debt I managed to repay in either direction."
    },
    {
      match: { looked_away: false, acknowledged_witness: "avoided" },
      text: "I had watched him fully, and could not now offer the same to whoever was watching me. I understood, finally, how much that must have cost him to forgive."
    },
    {
      match: { looked_away: true, acknowledged_witness: "avoided" },
      text: "I had looked away from him, and looked away from them in turn. Some patterns, it seems, don't break simply because you've lived both halves of them."
    },
    {
      match: { looked_away: false, acknowledged_witness: "held" },
      text: "I had watched him fully, and now let myself be watched fully in return. If this is a relay, at least I ran my leg of it with my eyes open."
    }
  ]
  // No fallback: all 4 combinations are covered.
};

const ENDINGS = [

  // ─────────────────────────────────────────────────────────── ENDING A
  {
    id: "ending-a",
    title: "The Drained",
    background: "assets/ending-a.png",
    baseOpening: "I let it happen. There is a particular quiet in choosing your own ending, not peace, exactly, but its patient cousin.",
    conditionalMiddle: {
      keys: ["witness_reaction", "looked_away"],
      table: [
        {
          match: { witness_reaction: "reached", looked_away: false },
          text: "I thought, as the water began, of the hand I'd tried to press through him, how I had tried, at least once, to be brave for someone who could not feel it. It hadn't been enough. I'm not sure anything would have been. But I had tried, and there is a version of this ending where that matters more than it does here."
        },
        {
          match: { witness_reaction: "silent", looked_away: true },
          text: "I had said nothing to him, and looked away besides. It seemed only fitting, in the end, that no one had anything to say to me either. I had asked for this quiet. I could not now complain that it was quiet."
        },
        {
          match: { witness_reaction: "asked_why", looked_away: false },
          text: "I had asked him why he hadn't fought, and watched him answer with his whole tired face. I understood, now, sitting where he'd sat, that I wasn't going to fight either, not out of his same certainty, but because I'd seen where certainty gets a man, and envied it anyway."
        },
        {
          match: { witness_reaction: "absolved", looked_away: true },
          text: "I had told him it wasn't his fault, then looked away from the cost of saying so. It was easier, I found, to forgive someone than to keep watching what forgiveness didn't fix. I hoped, wherever he was, he'd extend me the same easy mercy."
        },
        {
          match: { witness_reaction: "reached", looked_away: true },
          text: "I had tried to reach him, then looked away before I could learn if it had mattered. I would never know now. That, I think, was the sentence I was actually serving."
        },
        {
          match: { witness_reaction: "asked_why", looked_away: true },
          text: "I had wanted his reasons, then looked away from what the reasons cost him. Understanding, it turned out, was not the same as staying."
        },
        {
          match: { witness_reaction: "silent", looked_away: false },
          text: "I had said nothing to him, but I had stayed, and I had watched all of it. I used to think silence was the coward's version of presence. Sitting here now, I am less sure. He never asked me to speak. He only needed someone in the room while it happened, and I had managed that much."
        },
        {
          match: { witness_reaction: "absolved", looked_away: false },
          text: "I had told him it wasn't his fault, and then I had watched the whole cost of it without flinching. It seems only right that I extend myself the same verdict now, though I notice it is much harder to believe when the man you're forgiving is the one in the chair."
        }
      ],
      fallback: "I thought of him, of the water, of the apology he'd offered a room that hadn't asked for one. I understood, finally, what he'd meant. It was never about being right. It was only about being early to a loneliness everyone eventually shares."
    },
    manuscriptCallback: null,
    closing: "“I'm ahead of my time,” I said to no one, and somewhere, I hope, someone was watching who understood it as I once had.\n\nSomewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to."
  },

  // ─────────────────────────────────────────────────────────── ENDING B
  {
    id: "ending-b",
    title: "The Kept Hour",
    background: "assets/ending-b.png",
    baseOpening: "I fought them, though I knew the rope would win. It is a strange kind of dignity, choosing a fight you cannot survive, not for victory, but so the losing has your fingerprints on it.",
    conditionalMiddle: {
      keys: ["tools_reaction", "looked_away"],
      table: [
        {
          match: { tools_reaction: "denial", looked_away: false },
          text: "I had called the instruments wrong the moment I saw them, and I called this wrong too, with my whole struggling body, all the way down. At least this time, someone was in the room to hear me say it."
        },
        {
          match: { tools_reaction: "acceptance", looked_away: true },
          text: "I had wondered, once, if the room was late rather than he early, if time itself had come unstuck. Fighting, now, felt like trying to hold a door shut against weather. Necessary. Useless. Mine, at least."
        },
        {
          match: { tools_reaction: "silence", looked_away: false },
          text: "I had watched the tools in silence once, telling myself understanding wasn't complicity. I no longer believed that. This, the fighting, was the interest accrued on that earlier quiet."
        },
        {
          match: { tools_reaction: "denial", looked_away: true },
          text: "I had refused the wrongness of the tools once, and looked away from him besides. The fighting now felt less like courage and more like a debt finally called due, all at once, with interest."
        },
        {
          match: { tools_reaction: "silence", looked_away: true },
          text: "I had watched the tools in silence once, and looked away from him besides. But rebellion, I was learning, does not require an audience to be real. This fight was quiet too, mine alone, unwitnessed by anyone but the rope. It didn't need to be loud to be a refusal."
        },
        {
          match: { tools_reaction: "acceptance", looked_away: false },
          text: "I had told myself, once, that the room was only borrowing tomorrow's tools to perform yesterday's cruelty, and I had watched him without looking away. Now I fought the same way I'd accepted that truth, without illusion, working inside the shape of the thing rather than against it, finding what courage was left in a system that would not bend, only in the man made to stand inside it."
        }
      ],
      fallback: "I fought the way water fights a dam, not expecting to win, only refusing to be still about losing. The rope held. I would like to think something in the room noticed that it had to."
    },
    manuscriptCallback: null,
    closing: "They did not stop. Nothing stops, once a room has decided what a man's insides are for. But I made them work for it. I think that's the only inheritance I have to leave, that being early doesn't require being quiet about it.\n\nSomewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to."
  },

  // ─────────────────────────────────────────────────────────── ENDING C
  {
    id: "ending-c",
    title: "The Relay",
    background: "assets/ending-c.png",
    baseOpening: "I said his words back to them. “I'm ahead of my time.” I felt them leave my mouth the way a coin leaves a hand thrown into water, not lost, exactly. Given.",
    conditionalMiddle: {
      keys: ["identity_found", "seen_reaction"],
      table: [
        {
          match: { identity_found: true, seen_reaction: "yes" },
          text: "I had learned his name once, quietly, in a chapel that didn't know I was listening. Saying his words now felt less like theft and more like custody, someone had to keep them, and it may as well have been the one who'd gone looking."
        },
        {
          match: { identity_found: false, seen_reaction: "no" },
          text: "I had never let myself learn his name. I said his words anyway, borrowed and unearned, and understood, as the room went quiet, that some things don't require permission to be inherited. Only a willingness to carry them."
        },
        {
          match: { identity_found: true, seen_reaction: "sat_down" },
          text: "I had known who he was, and still I'd said nothing until now. Perhaps that's what a relay actually is, not urgency, but patience, holding a thing quietly until it's your turn to run."
        },
        {
          match: { identity_found: false, seen_reaction: "yes" },
          text: "I never learned his name, and yet the room saw me and called it recognition all the same. Perhaps that's what a prophet actually is, someone who never needed a name to be understood, only a face willing to stay long enough to be seen."
        },
        {
          match: { identity_found: true, seen_reaction: "no" },
          text: "I had learned his name, quietly, and it turned out learning it was the same as inheriting it. Destiny, I think, is only this, finding out whose story you were always going to finish, and discovering the name was never his alone to keep."
        },
        {
          match: { identity_found: false, seen_reaction: "sat_down" },
          text: "I never learned why he was who he was. I sat down anyway. Some circles, I was beginning to understand, don't need to be explained to be closed, only completed by whoever is willing to sit where the last person sat."
        }
      ],
      fallback: "I didn't know, fully, whose words I was borrowing when I said them. I only knew they were the truest thing in the room, and someone needed to keep saying them until a century arrived that didn't need them said."
    },
    manuscriptCallback: "I thought, saying his words, of the page I'd once reached for and wasn't allowed to hold, the one a monk had covered with his own hand and called “later,” meaning never. No one was stopping me now. I said the words all the way through, out loud, to a room that had no choice left but to hear them. Whatever they did to me after, they could not take back that the sentence had finally been let finish.",
    closing: "Somewhere, I could feel it, the way you feel a door closing in another room of the same house, someone was dreaming this exact chapel, watching someone they didn't yet realize was themselves. I hope, when it's their turn to wake, they remember it wasn't punishment.\n\nIt was only ever a relay. And I had just handed off the water.\n\nSomewhere, someone was carving {player_name} into a threshold, not yet knowing whose chapel it would lead them to."
  }
];
