// SUPERSTES — Chapter II scene data.
// Narrative content transcribed from docs/superstes-chapter-2-script.md.
// No logic in this file.
//
// Chapter II uses no {morse} and no {player_name}: it has no water-clock and
// no carving, so neither token appears anywhere below.
//
// Every scene ends on a `closingText` continuation. Chapter I uses that field
// once, after a branch; here it follows the reactive block in every scene.

const SCENES_C2 = [

  // ─────────────────────────────────────────────────────────────── SCENE 1
  {
    id: "c2-scene-1",
    title: "The Drop-Off",
    background: "assets/images/scene-01-dropoff.webp",
    text: [
      "I drove him to work that day.",
      "I don't remember why.",
      "There had been a plan before that. Lunch, maybe. Some errand. We had meant to go somewhere and either went or didn't. I remember the plan existing. I don't remember what it was.",
      "The heater was on too high. I remember reaching over to turn it down and not turning it down.",
      "We were talking about blood pressure.",
      "<em>“If you're worried about your blood pressure, you should really check out—”</em>",
      "That is where it stops. Check out what, I can't say. A doctor. A test. Some number you are supposed to stay under. It's possible I wasn't the one saying it.",
      "He reached for the door."
    ],
    tier2: [
      {
        id: "dashboard-clock",
        label: "The dashboard clock",
        image: "assets/images/obj-dashboard-clock.webp",
        text: "Green digits. I looked at them directly and couldn't read them, the way you can't read a sign in a dream.\n\nThe hour had been there. I never learned it. There was no reason to."
      },
      {
        id: "passenger-seat",
        label: "The passenger seat",
        image: "assets/images/obj-passenger-seat.webp",
        text: "A shallow crease in the fabric where he had been sitting. It stayed after he stood up. Ten seconds, maybe fifteen. Then the foam did whatever foam does."
      },
      {
        id: "cup-receipt",
        label: "The cup holder",
        image: "assets/images/obj-cup-receipt.webp",
        text: "A receipt, folded twice, damp in one corner where the cup had sweated on it. I turned it over expecting a place name to bring the day back. Most of the ink had gone gray and spread.\n\nOne line was still readable. A gas station, forty miles from anywhere we had reason to be.\n\nA gas station. That is what got kept.\n\nI held it for a while and then put it back in the cup holder."
      },
      {
        id: "workplace-doors",
        label: "The workplace entrance",
        image: "assets/images/obj-workplace-doors.webp",
        text: "Automatic glass doors. A badge reader on a post. A strip of fluorescent light inside.\n\nA door into a building where a person went five days a week. There was nothing else to say about it."
      }
    ],
    reactive: [
      {
        prompt: "What are you trying to recover?",
        flagKey: "dropoff_focus",
        options: [
          {
            label: "“What was the plan that day?”",
            value: "plan",
            response: "Start with the logistics. Where we went, what for, in what order. If I could get the itinerary back, maybe the rest would come with it."
          },
          {
            label: "“What were we talking about?”",
            value: "conversation",
            response: "The sentence came back and stopped in the same place. It stops there every time. I have tried it from several directions."
          },
          {
            label: "“Why did this day come back at all?”",
            value: "return",
            response: "Too early to ask. The memory hadn't told me what it wanted yet. It had shown up the way someone shows up for an appointment you don't remember making, and stood there."
          }
        ]
      }
    ],
    closingText: "He got out.\n\nOne of us raised a hand. I think it was me.\n\nThe door shut with that padded sound a car door makes when it shuts properly.\n\nThen I drove away.",
    next: "c2-scene-2"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 2
  {
    id: "c2-scene-2",
    title: "The Station",
    background: "assets/images/scene-02-station.webp",
    text: [
      "The next memory arrived with weather.",
      "A small station in a town whose name has blurred. The kind of place a train stops at briefly on its way somewhere else.",
      "He came to see me off. Thanksgiving break was ending. We had already settled on Christmas, a few weeks out, nothing that needed confirming.",
      "We hugged. I remember the pressure of the coat between us. I don't remember what either of us said into the other's shoulder.",
      "Then he turned back toward the station.",
      "I thought he had left.",
      "I boarded.",
      "From inside the train I saw him again through the glass. He was still standing there, waiting while the train waited.",
      "When the train finally moved, my phone lit up in my hand."
    ],
    tier2: [
      {
        id: "departure-board",
        label: "The departure board",
        image: "assets/images/obj-departure-board.webp",
        text: "City names. Times. Delays measured in minutes.\n\nOne thing after another. A platform becomes a train. A train becomes distance. The board was certain about all of it."
      },
      {
        id: "station-glass",
        label: "The station glass",
        image: "assets/images/obj-station-glass.webp",
        text: "My reflection lay faintly over his figure, so that for a moment we were on the same patch of glass from opposite sides. Then the train shifted and we came apart."
      },
      {
        id: "phone-message",
        label: "The phone",
        image: "assets/images/obj-phone-message.webp",
        text: "A message had arrived as the train began to move. I remembered receiving it. I remembered looking down. I remembered the small blue-white brightness of the screen in the dark carriage.\n\nThe words themselves would not come."
      },
      {
        id: "empty-train-seat",
        label: "The empty place beside you",
        image: "assets/images/obj-empty-train-seat.webp",
        text: "My bag sat there, buckled in by nothing, behaving as though the seat had always belonged to it."
      },
      {
        id: "train-neighbor",
        label: "The man beside you",
        image: "assets/images/obj-train-neighbor.webp",
        text: "A middle-aged man had taken the seat across the aisle and decided, unprompted, that I would want to hear about his daughter. She was, he told me twice, exactly my age. He had photographs. He had opinions about her boyfriend. He talked the way people talk when a phone has no signal and a stranger hasn't yet worked out how to look busy enough to be excused from listening.\n\nI don't remember one word of what he said about her. I remember that he never ran out of things to say."
      }
    ],
    reactive: [
      {
        prompt: "Which detail feels most trustworthy?",
        flagKey: "station_anchor",
        options: [
          {
            label: "“The hug.”",
            value: "hug",
            response: "The coat, the arms, the small awkwardness of letting go before either person knows who should let go first. Bodies keep pressure. I trusted that much."
          },
          {
            label: "“That he stayed until the train moved.”",
            value: "waiting",
            response: "I had been wrong once already in the memory: I had thought he'd gone. The correction mattered to me more than I understood."
          },
          {
            label: "“The message on the phone.”",
            value: "message",
            response: "A written thing should have been safer. I looked for the words and found only the fact that there had been words."
          }
        ]
      }
    ],
    closingText: "The station slid backward.\n\nOr I did.\n\nFrom inside the train there was no way to tell.",
    next: "c2-scene-3"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 3
  {
    id: "c2-scene-3",
    title: "The Bottle",
    background: "assets/images/scene-03-bottle.webp",
    text: [
      "Then a parking lot.",
      "He was moving away that day.",
      "His car was packed the way cars are packed for a move: bags fitted into gaps, soft things pressed around hard things, everything wedged so it would hold at highway speed.",
      "I had left a water bottle at his place.",
      "Of everything still unsettled before he drove away, this was the part that could be handled.",
      "He asked me to meet him in the parking lot at work so he could give it back.",
      "He held it out.",
      "I took it."
    ],
    tier2: [
      {
        id: "water-bottle",
        label: "The water bottle",
        image: "assets/images/obj-water-bottle.webp",
        text: "Scratched plastic. A bite mark on the straw. A little water still moving at the bottom, though neither of us had touched it for several seconds.\n\nAn object returned to its owner.\n\nI don't remember what became of it after that. Whether it came home with me and sat in a cupboard for a year before I recycled it. Whether I left it in the car. I can't tell you how long ago any of this was."
      },
      {
        id: "packed-car",
        label: "The packed car",
        image: "assets/images/obj-packed-car.webp",
        text: "I could see bedding through the rear window. A lamp wedged sideways. His cello case, upright between two boxes, taking up more room than anything else he owned.\n\nHe used to play for me sometimes. Badly, he said, though I never believed him. I would sit with a glass of wine and we would pretend the apartment was somewhere more expensive than it was.\n\nStanding in that parking lot, I could not remember the last thing he had played.\n\nSomething red I couldn't identify was pressed against the glass."
      },
      {
        id: "parking-stripe",
        label: "The parking stripe between you",
        image: "assets/images/obj-parking-stripe.webp",
        text: "A white line, badly painted, thickening where the roller had slowed. We stood on opposite sides of it. Neither of us had chosen where to stand."
      }
    ],
    reactive: [
      {
        // bottle_reaction is deliberately local-only: it sets the tone here and
        // is never read again (script doc, Which flags are consumed where).
        prompt: "What do you do with the bottle?",
        flagKey: "bottle_reaction",
        options: [
          {
            label: "“Keep holding it.”",
            value: "object",
            response: "I held it through the rest of the conversation, if there was a rest of the conversation, as though the object had given my hands an assignment and might complain if I finished early."
          },
          {
            label: "“Look at his hand after he lets go.”",
            value: "gesture",
            response: "His hand dropped to his side. Empty. Mine did not. I noticed this and immediately distrusted myself for noticing it."
          },
          {
            label: "“Put it in your bag.”",
            value: "leave",
            response: "The bottle went into my bag without any trouble at all. I zipped it shut and we kept talking."
          }
        ]
      }
    ],
    closingText: "We stood there a little longer.\n\nI know we spoke.\n\nI have the bottle and not the conversation.\n\nThen his car pulled out of the lot.",
    next: "c2-scene-4"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 4
  // The instability turn. The puddle is the chapter's first anomaly, and the
  // closingText carries a non-missable version for a player who never clicks it.
  {
    id: "c2-scene-4",
    title: "The Street",
    background: "assets/images/scene-04-street.webp",
    text: [
      "A street came next.",
      "We hadn't seen each other in a few years. Long enough that I had assumed we wouldn't again — no falling out, nothing I could point to, just two people who had stopped making the effort.",
      "Then I ran into him by accident.",
      "There should have been awkwardness. I remember expecting it.",
      "Instead he smiled.",
      "Not cruelly. Not sadly. Not with the careful face people wear when they have prepared to run into someone difficult.",
      "He looked pleased to see me.",
      "He told me he'd just adopted a dog. A rescue, some mutt with a name he was clearly delighted by. He said I should come meet it sometime.",
      "I said something about being glad for him. I meant it.",
      "For a minute, maybe less, we stood on the sidewalk and talked like two people for whom talking had never become complicated."
    ],
    tier2: [
      {
        id: "street-puddle",
        label: "The puddle beside the curb",
        image: "assets/images/obj-street-puddle.webp",
        text: "His reflection smiled a fraction later than he did.\n\nI want to be accurate about this, because it is the first thing in any of these memories that I know did not happen the way I remember it. He smiled. Then the water smiled. Not together. There was a gap, about the length of a blink, and I noticed it while it was happening rather than afterward.\n\nA bus went past and broke the face into black water.\n\nWhen the surface settled he was still standing there, whole again — and for a moment the puddle was holding something else as well. A window, or a glass door, belonging to no building on that street. It was gone before I could look at it properly.\n\nI could not tell you what it was. I could tell you it did not belong there.\n\nI looked up. He was still talking. Nothing in his face suggested anything had happened."
      },
      {
        id: "graphic-tshirt",
        label: "His shirt",
        image: "assets/images/obj-graphic-tshirt.webp",
        text: "A graphic tee, faded at the collar. He owned a rotation of them, dozens deep, each printed with some band or joke or cartoon I could still individually picture if asked, the one with the cracked egg, the one from the aquarium gift shop, the one so old the design had gone illegible.\n\nI could picture every shirt he had ever worn to meet me. I could not tell you which one he was wearing."
      }
    ],
    reactive: [],
    branch: {
      prompt: "After you pass each other, do you turn around?",
      flagKey: "turned_back",
      options: [
        {
          label: "Turn around.",
          value: true,
          next: "c2-scene-5",
          response: "I turned after several steps.\n\nHe was still walking.\n\nI saw the back of his coat, then another pedestrian crossed between us, and when the view cleared he had become merely one person among several moving in the same direction."
        },
        {
          label: "Keep walking.",
          value: false,
          next: "c2-scene-5",
          response: "I kept walking.\n\nIt didn't feel like a decision."
        }
      ]
    },
    closingText: "The street remained where it was.\n\nI left it anyway.\n\nSomething had changed by then. Up to that afternoon I had been remembering ordinary days. After it I was doing something else, and I did not have a word for what."
  },

  // ─────────────────────────────────────────────────────────────── SCENE 5
  {
    id: "c2-scene-5",
    title: "Noise",
    background: "assets/images/scene-05-noise.webp",
    text: [
      "The next memory was loud.",
      "He had been studying abroad and came back for the summer. Old friends gathered somewhere with drinks and bad acoustics. A bar, I think. Or a restaurant that became a bar after a certain hour.",
      "I don't remember, now, what he looked like that night. I know the shape of a person leaning toward me, the angle of it, but the face refuses to resolve, as though memory kept the geometry and lost the artist.",
      "Someone laughed too loudly behind me. Glass touched glass. Music occupied every empty part of the room.",
      "He leaned toward me and said something.",
      "I leaned closer.",
      "The sentence entered the noise and did not come out intact.",
      "I blamed the room for losing the sentence.",
      "Then another memory struck it from the side.",
      "Different place. Different year. No music.",
      "His long-distance girlfriend had broken up with him.",
      "He was furious. Hurt. He threw the whole weather of it at me.",
      "He yelled.",
      "I remember the volume.",
      "I remember thinking it was unfair that I had become the nearest wall for someone else's collapse.",
      "I remember his face red with the effort of saying things.",
      "I do not remember what any of the things were.",
      "The first room had been too loud to hear.",
      "The second was loud enough.",
      "I lost both."
    ],
    tier2: [
      {
        id: "bar-glass",
        label: "The half-finished drink",
        image: "assets/images/obj-bar-glass.webp",
        text: "Melted ice had raised the waterline without adding anything worth drinking. A ring spread beneath the glass. I watched it reach the edge of the napkin and continue onto the table."
      },
      {
        id: "mouth-noise",
        label: "His mouth, instead of listening",
        image: "assets/images/obj-mouth-noise.webp",
        text: "I could see the shape of emphasis. A smile, then seriousness, then the small sideways movement people make when they are correcting themselves. The face preserved the grammar and lost every noun."
      },
      {
        // No image, deliberately — the one text-only hotspot in the chapter,
        // the same convention as Chapter I's calendar. `image` is optional.
        id: "the-conversation",
        label: "The conversation, instead of his mouth",
        text: "I have tried, standing in this memory, to recover a single sentence of what either of us actually said. Not the tone, not the shape of it — the words themselves, in order, the way a person actually talks.\n\nNothing comes. I get as far as knowing we were talking, which is either a very small thing to know or, depending on the day, the only thing that ever mattered."
      },
      {
        id: "doorway-sign",
        label: "The sign above the door",
        image: "assets/images/obj-doorway-sign.webp",
        text: "A sign hung above the door, lit from within, whatever it said long since sanded down by the years into two shapes and a color. I have decided, without any real evidence, that it was a restaurant. Not a bar. A restaurant that had, by the hour we arrived, forgotten it served food.\n\nIt felt important to settle on one answer, even an invented one. A memory with no name for its own room starts to feel like it might not have happened at all."
      },
      {
        id: "argument-doorway",
        label: "The doorway from the argument",
        image: "assets/images/obj-argument-doorway.webp",
        text: "I had stood close enough to leave and far enough away to pretend leaving would have been dramatic. The hallway beyond him was empty. I remember measuring it with my eyes."
      }
    ],
    reactive: [
      {
        prompt: "When the words won't stay, what do you trust instead?",
        flagKey: "noise_strategy",
        options: [
          {
            label: "“Listen harder.”",
            value: "listen",
            response: "I replayed tone as though tone were a cipher. Anger became syllables; laughter became possible consonants. I knew I was manufacturing evidence. I did it carefully."
          },
          {
            label: "“Watch the face.”",
            value: "watch",
            response: "Faces had survived where language hadn't. I let expression stand in for quotation, which is unfair to both."
          },
          {
            label: "“Leave the words alone.”",
            value: "leave",
            response: "I stopped asking the memories to perform. For a moment the rooms became ordinary again: one noisy, one painful, neither obligated to explain why it had returned."
          }
        ]
      }
    ],
    next: "c2-scene-6"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 6
  {
    id: "c2-scene-6",
    title: "The Road Home",
    background: "assets/images/scene-06-road-home.webp",
    text: [
      "The oldest memory was smaller than the others.",
      "Middle school.",
      "He was transferring to another school.",
      "We had cleaning duty together that day.",
      "I remember chairs lifted onto desks. A broom leaning in the corner. The wet mineral smell of a floor that had just been mopped. Sunlight arranged in long rectangles where the windows permitted it.",
      "We finished.",
      "We walked home together.",
      "Then, the way we always did, we split off, him pushing his bicycle the last stretch rather than riding it, some rule of his I never asked about and he never explained. I could not tell you, now, which corner it was. Which street. Whether he waved, or said something, or simply peeled away mid-sentence the way children do when the conversation has already moved on without them noticing it end.",
      "It happened the way it always happened. That, apparently, was the whole problem.",
      "I don't remember being devastated.",
      "I don't remember trying to make the walk longer.",
      "I don't remember understanding that the afternoon deserved any special treatment.",
      "We were children. Tomorrow was a place adults managed for us."
    ],
    tier2: [
      {
        id: "name-tag",
        label: "His name tag",
        image: "assets/images/obj-name-tag.webp",
        text: "Sewn crooked into the collar of his uniform, the way the school made every one of us do, in case we got lost or forgot which coat was ours.\n\nI cannot read it. I have tried angling the memory every way I know how. I can tell you the color of the thread. I cannot tell you the name.\n\nI am fairly sure I knew it once. That feels like it should count for something."
      },
      {
        id: "mop-bucket",
        label: "The mop bucket",
        image: "assets/images/obj-mop-bucket.webp",
        text: "Cloudy water trembled each time someone stepped nearby. When the room became empty, it went still. The dirt sank slowly to the bottom as though time, even then, preferred layers."
      },
      {
        id: "schoolbag",
        label: "The schoolbag",
        image: "assets/images/obj-schoolbag.webp",
        text: "Too heavy. Textbooks, notebooks, a pencil case with one broken zipper. The ordinary equipment of a future extending at least as far as tomorrow morning."
      },
      {
        id: "road-home",
        label: "The road home",
        image: "assets/images/obj-road-home.webp",
        text: "We had walked it before. That was what made it a route instead of a scene. Houses, trees, driveways, a crossing where we knew when to look without discussing it."
      }
    ],
    reactive: [
      {
        prompt: "The memory begins to move away from you. What do you do?",
        flagKey: "childhood_reaction",
        options: [
          {
            label: "“Call to the child.”",
            value: "call",
            response: "I wanted to tell her to listen. To look. To memorize everything. She did not turn. Perhaps she couldn't hear me. Perhaps she heard and had the good sense to ignore an adult asking a child to become an archivist of her own life."
          },
          {
            label: "“Follow them.”",
            value: "follow",
            response: "I walked several steps behind. Their conversation moved easily between topics I could no longer make out. Neither child seemed aware that I had mistaken their ordinary walk for evidence."
          },
          {
            label: "“Stay in the empty classroom.”",
            value: "stay",
            response: "I let them go. The wet floor reflected the windows. The bucket settled. For a while, the room remembered only that two students had completed the task assigned to them."
          }
        ]
      }
    ],
    // The chapter's one long transition. The waters that never touched, touching.
    closingText: "A drop fell from the mop into the bucket.\n\nI heard, impossibly, another drop answer from the parking lot.\n\nCondensation slipped from the cup holder.\n\nWater moved inside the bottle.\n\nRain gathered at the station glass.\n\nA street puddle shivered.\n\nMelted ice crossed a bar napkin.\n\nNone of these waters had touched.\n\nThen they did.",
    next: "c2-scene-7"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 7
  // The reveal. The chapter's only plate opens it: the arrival is held on its
  // own screen so the reveal lands in a scene the player entered rather than
  // scrolled into (script doc, THE PLATE).
  {
    id: "c2-scene-7",
    title: "The Pool",
    openingPlate: {
      image: "assets/images/plate-c2-pool.webp",
      text: [
        "I stood ankle-deep in all of it.",
        "The water was not deep enough to drown in. That made it worse.",
        "Everything was lying just under the surface, close enough to pick up. The bottle. The gas station receipt. A cello case. A name tag I still couldn't read. A train ticket I don't remember keeping.",
        "And above them, reflections of places that had never shared a sky. Glass doors. A station window. A parking stripe. A streetlamp. A bar table. Classroom windows. All of it holding still in four inches of water, in a light that belonged to none of them.",
        "I stood there with my shoes ruined and understood that I was not going to be allowed to call this a dream."
      ]
    },
    background: "assets/images/scene-07-pool.webp",
    text: [
      "Around the edge of the pool, the people from the memories appeared one by one.",
      "No one faced me as though summoned.",
      "One walked toward work.",
      "One waited beside a station window.",
      "One stood by a packed car.",
      "One smiled on a street.",
      "One leaned across a noisy table.",
      "One was caught forever in the posture of anger.",
      "One was still a child walking home.",
      "And then the reason arrived.",
      "Not as a recovered sentence. As a fact.",
      "<strong>Nothing came after any of these conversations.</strong>",
      "I searched the years beyond each memory and found no later exchange waiting there. No correction. No second version. No ordinary next time to reduce the importance of the one before it.",
      "These were the last times I had spoken to them.",
      "I had spent years imagining last words as something a person says while standing at the edge of an ending.",
      "But none of us had been standing at an edge.",
      "We had been in cars. Parking lots. Bars. Classrooms. Streets.",
      "We had been talking about blood pressure.",
      "<strong>I hadn't forgotten their last words. I had never known I was hearing them.</strong>",
      "Memory had not failed to preserve a monument.",
      "There had been no monument yet.",
      "<strong>Importance arrived later.</strong>",
      "Time had reached backward and renamed the day."
    ],
    // The subtitle is withheld until here and nowhere else — not in the title
    // screen, the tab title, or any earlier copy (script doc, SPOILER RULE).
    titleReveal: "CHAPTER II: THE LAST WORD",
    tier2: [
      {
        // Scene 7's three inspectables have no dedicated object art; they read
        // against the pool itself (art doc, asset manifest).
        id: "the-water",
        label: "The water",
        text: "Every scene had contributed something to it. None had known where the water was going. That, I thought, was the vulgar advantage time held over everyone inside it: it knew the direction without having to tell us the destination."
      },
      {
        id: "objects-beneath",
        label: "The objects beneath the surface",
        text: "They had survived because objects do not need to understand importance in order to persist. A bottle can outlive a sentence without ever knowing it has won."
      },
      {
        id: "overlapping-voices",
        label: "The overlapping voices",
        text: "Fragments rose and vanished.\n\n<em>…tomorrow…</em>\n\n<em>…text me…</em>\n\n<em>…anyway…</em>\n\n<em>…when you…</em>\n\n<em>…see…</em>\n\nI could no longer tell which fragments were remembered, inferred, or merely grammatically likely.\n\nAlmost all of them faced forward."
      }
    ],
    reactive: [
      {
        prompt: "Do you look at the people around the pool?",
        flagKey: "acknowledged_departures",
        options: [
          {
            label: "“Look at them. Hold the scene as it is.”",
            value: "held",
            response: "I looked from one to the next without asking any of them to turn around. For once I let seeing be different from retrieving."
          },
          {
            label: "“Keep your eyes on the water.”",
            value: "avoided",
            response: "I watched the reflections instead. They were easier. Reflections cannot disappoint you by continuing to walk away."
          }
        ]
      }
    ],
    branch: {
      flagKey: "final_choice",
      final: true,
      options: [
        { label: "Let the words stay where time left them.", value: "A", next: "c2-ending-a" },
        { label: "Go back. Listen again.", value: "B", next: "c2-ending-b" },
        { label: "Say only what you know happened.", value: "C", next: "c2-ending-c" }
      ]
    }
  }
];
