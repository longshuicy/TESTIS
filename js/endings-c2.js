// SUPERSTES Chapter II — ending data.
// Transcribed from docs/superstes-chapter-2-script.md. Assembly order is fixed:
// baseOpening → conditionalMiddle → DEPARTURE_CALLBACK → specificCallback → closing.
//
// NOTE: `turned_back` is a real boolean in both flags and match rows.
// Do not stringify it; `lookup()` uses strict equality.

const DEPARTURE_CALLBACK = {
  keys: ["turned_back", "acknowledged_departures"],
  table: [
    {
      match: { turned_back: true, acknowledged_departures: "held" },
      text: "I had turned back once, trying to keep a disappearing person in sight. At the pool I looked again, but this time I did not ask anyone to return. Looking was enough."
    },
    {
      match: { turned_back: true, acknowledged_departures: "avoided" },
      text: "I had turned back on the street, but here I watched only the water. Perhaps I had finally exhausted the belief that one more look could make a moment stay."
    },
    {
      match: { turned_back: false, acknowledged_departures: "held" },
      text: "I had kept walking on the street. Here I looked at them fully. The two acts did not contradict each other. Presence is not measured by how long you can delay leaving."
    },
    {
      match: { turned_back: false, acknowledged_departures: "avoided" },
      text: "I had kept walking then and looked away now. Some endings receive no ceremony at all. They remain true anyway."
    }
  ]
  // No fallback: all 4 combinations are covered.
};

const ENDINGS_C2 = [

  // ─────────────────────────────────────────────────────────── ENDING A
  {
    id: "c2-ending-a",
    title: "The Unrecorded",
    background: "assets/images/ending-unrecorded.webp",
    baseOpening: "I let the words stay missing.\n\nNot the people. Not the days. Only the sentences I had spent years trying to force back into their mouths.\n\nThey had not failed to leave me a final message.\n\nThey had not known they were leaving one.",
    conditionalMiddle: {
      keys: ["dropoff_focus", "turned_back"],
      table: [
        {
          match: { dropoff_focus: "plan", turned_back: true },
          text: "I had begun by trying to reconstruct a plan—the itinerary of an ordinary day—and later turned on a street to keep one disappearing figure in sight. Both impulses had come from the same superstition: that if I recovered enough sequence, sequence would become meaning. It did not. The day was allowed to have been badly documented."
        },
        {
          match: { dropoff_focus: "plan", turned_back: false },
          text: "I had wanted the plan first: where we'd gone, what we'd meant to do, what came before the workplace. On the street I had kept walking instead of turning back. I understood now that both choices were ordinary, and ordinariness was not negligence. A day does not owe the future minutes precise enough to survive cross-examination."
        },
        {
          match: { dropoff_focus: "conversation", turned_back: true },
          text: "I had chased the blood pressure sentence and later turned to watch another person recede down a street. Words and bodies: I had wanted both to hold still after the moment had finished using them. Neither had agreed. I released the sentence first."
        },
        {
          match: { dropoff_focus: "conversation", turned_back: false },
          text: "I had wanted the conversation back but had not turned around on the street. Apparently some part of me already knew what the rest of me would take years to learn: you can continue walking without possessing the final transcript of what happened behind you."
        },
        {
          match: { dropoff_focus: "return", turned_back: true },
          text: "I had asked why the drop-off memory returned, then turned back when another memory offered me the chance. The answer was smaller than I expected. They returned because nothing followed them. Not prophecy. Not unfinished business. Only chronology, arriving late and dressed as significance."
        },
        {
          match: { dropoff_focus: "return", turned_back: false },
          text: "I had wondered why the day returned and then kept walking on the street. I could answer myself now: the future had selected these scenes after the fact. I had not missed a sign. There had been no sign to miss."
        }
      ],
      fallback: "I stopped treating forgetting as a crime scene. Memory had kept what it could without knowing what the future would subpoena."
    },
    specificCallback: "A phrase floated up from nowhere I could responsibly assign it:\n\n<em>See you.</em>\n\nPerhaps someone had said it. Perhaps no one had.\n\nIt was simply the grammar of ordinary parting: a future assumed without evidence.",
    closing: "I had thought time took the words.\n\nWhat time had actually taken was the next time.\n\nThe water became still."
  },

  // ─────────────────────────────────────────────────────────── ENDING B
  {
    id: "c2-ending-b",
    title: "The Kept Word",
    background: "assets/images/ending-kept-word.webp",
    baseOpening: "I went back.\n\nI knew memory changed when handled. I knew repetition polished guesses until they acquired the shine of facts.\n\nI went back anyway.\n\nThere is a kind of dignity in refusing to surrender evidence you know you do not possess. There is also a kind of madness. From inside the work, they feel almost identical.",
    conditionalMiddle: {
      keys: ["noise_strategy", "turned_back"],
      table: [
        {
          match: { noise_strategy: "listen", turned_back: true },
          text: "I had listened harder in the noisy rooms and turned back on the street. So I did both again. I replayed tone, posture, breath, distance. Every pass produced another plausible syllable. Plausibility accumulated until it began impersonating memory."
        },
        {
          match: { noise_strategy: "listen", turned_back: false },
          text: "I had listened harder but kept walking on the street. Now I reversed only the second decision. In memory I could turn around forever. That was the obscenity of it: the past had become more obedient than life had ever been."
        },
        {
          match: { noise_strategy: "watch", turned_back: true },
          text: "I had trusted faces when words failed and turned back to watch one body disappear. I built dialogue from eyebrows, smiles, anger, shoulders. Soon everyone in the memories was saying exactly the thing their faces suggested. It was elegant. It was almost certainly false."
        },
        {
          match: { noise_strategy: "watch", turned_back: false },
          text: "I had watched faces and refused the backward glance. Returning now, I discovered I could manufacture both. I gave the street another angle, the bar another camera, the argument another expression. The archive improved as its truth declined."
        },
        {
          match: { noise_strategy: "leave", turned_back: true },
          text: "I had once left the words alone, then turned back on the street. The contradiction had bothered me. Now I resolved it badly: I disturbed every word and turned back in every scene. Nothing was allowed to remain unexamined. Nothing survived examination unchanged."
        },
        {
          match: { noise_strategy: "leave", turned_back: false },
          text: "I had once let the words alone and kept walking. I broke both mercies. I reopened every room. The memories received me politely. They had learned by then what I wanted from them."
        }
      ],
      fallback: "I replayed the scenes until uncertainty developed habits. A habit, repeated often enough, can pass for recollection even to the person who invented it."
    },
    specificCallback: "The workplace returned first.\n\n<em>“If you're worried about your blood pressure, you should really check out—”</em>\n\nThis time I heard something after <em>out</em>.\n\nOr believed I did.\n\nThe station followed.\n\nThen the street.\n\nThen the bar.\n\nThen the classroom.\n\nEach pass gave me one more syllable and took away one more reason to trust it.\n\nSomewhere in the repetitions a voice said:\n\n<em>See you.</em>\n\nI replayed it until I could no longer tell whether I remembered the phrase or had taught the memory to say it.",
    closing: "I kept the words.\n\nAll of them.\n\nEvery possible version.\n\nThe pool filled until there was no room left for silence."
  },

  // ─────────────────────────────────────────────────────────── ENDING C
  {
    id: "c2-ending-c",
    title: "The Testimony",
    background: "assets/images/ending-testimony.webp",
    baseOpening: "I stopped asking what they had said.\n\nInstead I said what I knew.\n\nNot because it was enough to reconstruct the past.\n\nBecause it was enough to testify that there had been one.",
    conditionalMiddle: {
      keys: ["station_anchor", "childhood_reaction"],
      table: [
        {
          match: { station_anchor: "hug", childhood_reaction: "call" },
          text: "I had trusted the pressure of a hug and later called after a child who could not hear me. Both were attempts to warn the body that time was happening. The body had known only warmth, distance, a road home. I testified to those instead."
        },
        {
          match: { station_anchor: "hug", childhood_reaction: "follow" },
          text: "I had trusted the hug and followed the children home. I could not quote either scene, but I could say this: once, arms closed around me at a station; once, two children walked side by side beneath schoolbags too heavy for them. The facts did not need better dialogue."
        },
        {
          match: { station_anchor: "hug", childhood_reaction: "stay" },
          text: "I had trusted the hug, then stayed behind in the empty classroom. Touch and absence: both had survived without explanation. I let them stand as evidence."
        },
        {
          match: { station_anchor: "waiting", childhood_reaction: "call" },
          text: "I had trusted that he stayed until the train moved, then tried to call after the child. One person had waited; another had kept walking. Time permitted both and explained neither. I testified to the difference."
        },
        {
          match: { station_anchor: "waiting", childhood_reaction: "follow" },
          text: "I had trusted the waiting at the station and followed the children down the road. Presence, I learned, was often made of minutes no one had thought to count. I could not recover the sentences, but I could count that much."
        },
        {
          match: { station_anchor: "waiting", childhood_reaction: "stay" },
          text: "I had trusted that he stayed while the train waited, then remained in the classroom while the children left. The two rooms faced each other across years: one person staying, two people going. I did not force them into a lesson. I simply named what I had seen."
        },
        {
          match: { station_anchor: "message", childhood_reaction: "call" },
          text: "I had trusted the fact of a message even when its words were gone, then called after a child to listen more carefully. The irony was obvious. A record can survive without content; a witness can survive without a transcript. I allowed myself the same incompleteness."
        },
        {
          match: { station_anchor: "message", childhood_reaction: "follow" },
          text: "I had trusted the message's existence and followed the children home. I testified in the same modest tense: a message arrived; two children walked; a bottle changed hands; someone smiled. History is often built from sentences no grander than these."
        },
        {
          match: { station_anchor: "message", childhood_reaction: "stay" },
          text: "I had trusted the fact that the phone lit, then stayed in the empty classroom. The screen and the wet floor both reflected light after the people had moved on. I could not ask reflections to quote anyone. I stopped trying."
        }
      ],
      fallback: "I could not provide the words. I could provide the scene. A witness is allowed to have limits and remain a witness."
    },
    specificCallback: "I drove him to work.\n\nWe were talking about blood pressure.\n\nHe waited at the little station until the train moved.\n\nSomeone returned my water bottle before leaving town for good.\n\nA man I hadn't seen in years smiled when we met by accident on the street, and invited me to meet his new dog.\n\nSomeone came home from studying abroad and leaned toward me in a loud room.\n\nSomeone else was furious because his long-distance girlfriend had left him, and I stood there while the anger passed through the room.\n\nTwo children finished cleaning duty and walked home together before one transferred schools.\n\nThese are poor last words.\n\nFortunately, they are not last words.\n\nThey are testimony.",
    closing: "I had mistaken remembering for witnessing.\n\nA witness is not an archive.\n\nA witness loses things.\n\nA witness arrives too early to know which details history will later demand.\n\nAnd still a witness can say:\n\n<strong>I saw you.</strong>\n\nThe water carried the sentence outward without telling me where it would end."
  }
];
