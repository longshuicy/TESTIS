// TESTIS — scene data.
// Narrative content transcribed from docs/the-water-clock-script.md (source of truth).
// No logic in this file.

const SCENES = [

  // ─────────────────────────────────────────────────────────────── SCENE 1
  {
    id: "scene-1",
    title: "The Gate",
    background: "assets/scene-1-gate.png",
    text: [
      "I came to the gate the way one comes to a grave, without deciding to, and too late to turn back. The fog did not part for me. It had already been standing where I meant to walk.",
      "Somewhere behind the stone, water was falling, not the indifferent chatter of rain, but something metered, something <em>counted</em>, as if even the dark kept better time than I did. I would learn, later, that some men wait thirty years to say a single true thing out loud. Perhaps the water had learned patience from watching one of them."
    ],
    tier2: [
      {
        id: "sundial",
        label: "The sundial",
        image: "assets/obj-sundial.png",
        text: "A dial with no sun to read by, and yet its shadow falls anyway. Beneath the wall, the drip keeps the same rhythm: long, short, short, long. A code, or only the sound decay makes when it wants to be remembered."
      },
      {
        id: "latch",
        label: "The gate's iron latch",
        image: "assets/obj-latch.png",
        text: "Cold under my palm, and wet, though nothing above it could have rained. My fingers came away with a film on them, thin as the skin on old milk."
      },
      {
        id: "threshold",
        label: "The worn threshold letters",
        image: "assets/obj-threshold.png",
        text: "Someone had carved letters here once. Time, or water, or both, had worn them back to suggestion. I could make out a shape more than a word, the way you recognize a song by its silence between notes.\n\nBeneath it, the stone was bare enough for another hand.",
        interaction: {
          type: "text_input",
          flagKey: "player_name",
          maxLength: 20,
          placeholder: "Carve your name…",
          submitLabel: "Carve",
          declineLabel: "Leave the stone as you found it.",
          submitResponse: "I pressed the word into stone the way you press a thumb into wet clay, not because it would last, but because for a moment, it was mine to make last.",
          declineResponse: "I let the letters stay half-erased. Some things, I thought, are kinder unfinished."
        }
      }
    ],
    reactive: [
      {
        prompt: "What do you do at the gate?",
        flagKey: "gate_action",
        options: [
          {
            label: "Call out.",
            value: "called",
            response: "No one answered. I don't think I expected them to. I think I only wanted to hear what my own voice sounded like, here, before I forgot I'd brought one."
          },
          {
            label: "Step through in silence.",
            value: "silent",
            response: "I entered the way guilt enters a room, sideways, already apologizing for a thing I hadn't done yet."
          },
          {
            label: "Listen to the water a moment longer.",
            value: "listened",
            response: "I counted the drips until I lost count, which felt, at the time, like the correct number to reach."
          }
        ]
      }
    ],
    next: "scene-2"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 2
  {
    id: "scene-2",
    title: "The Chapel",
    background: "assets/scene-2-chapel.png",
    // You meet him as a person before you see him as a composition.
    openingPlate: "assets/char-copernicus-bound.png",
    text: [
      "He sat bound at the center of them, and the monks moved around his stillness the way tide moves around a stone, patient, certain, in no hurry to be cruel.",
      "His face troubled me before I understood why. Something in it suggested a man who had carried a single unspoken sentence for so long that the carrying had become indistinguishable from the man. Thirty years, I would come to learn, is a long time to hold a truth quietly. Long enough for the holding itself to start to look like guilt, even when the truth was never the crime."
    ],
    tier2: [
      {
        id: "astrolabe",
        label: "The astrolabe at his neck",
        image: "assets/obj-astrolabe.png",
        text: "Tarnished, still around a dead man's throat as though no one had thought to remove a compass from someone no longer going anywhere. I did not know the word for it then."
      },
      {
        id: "star-chart",
        label: "The star-chart under the chair",
        image: "assets/obj-star-chart.png",
        text: "Circles within circles, and at the center, not the earth. I had been taught it wrong, or he had been taught it early."
      },
      {
        id: "books",
        label: "The confiscated books, spines to the wall",
        image: "assets/obj-books.png",
        text: "They'd turned every spine to the wall, as if a title left visible might argue back. One book had slipped, just enough to show a fragment of a diagram, circles, and at the center, not what scripture would have wanted."
      },
      {
        id: "monk-murmuring",
        label: "The monk murmuring a name, not his own",
        image: "assets/obj-monk-murmuring.png",
        text: "A name, repeated like a rosary bead worn smooth. Not his. Someone he'd studied under, perhaps, or someone he'd proven wrong. Grief has more than one shape in a room like this."
      }
    ],
    reactive: [
      {
        prompt: "Do you try to name him?",
        flagKey: "identity_found",
        requiresExamined: ["astrolabe", "star-chart"],
        options: [
          {
            label: "Say his name to yourself, silently.",
            value: true,
            response: "I said it once, in my head, the way you test a floorboard before trusting your weight to it. It held."
          },
          {
            label: "Refuse to. Some part of me wasn't ready to know.",
            value: false,
            response: "Better, I thought, to let him remain a face I half-recognized than a name I'd have to carry out of this room."
          }
        ]
      }
    ],
    next: "scene-3"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 3
  {
    id: "scene-3",
    title: "What They Believed",
    background: "assets/scene-3-tools.png",
    text: [
      "The instruments were wrong before I could say how. Steel too smooth for any forge I knew, a faint hum in them like trapped bees or captured lightning.",
      "A monk spoke of pressure. Of excess. Of a mind so overfull of motion that the only mercy left was to let it drain, the way one lances a boil grown fat with rot.",
      "I understood, listening to him, that the room did not object to what he knew. It objected to <em>when</em> he had chosen to say it, and that no one present intended to let him choose that timing twice."
    ],
    tier2: [
      {
        id: "tool-glowing",
        label: "The humming instrument",
        image: "assets/obj-tool-glowing.png",
        text: "A thin cold light lived inside it, the way a firefly holds its own small blasphemy. I could not have named its century. I'm not sure it belonged to one."
      },
      {
        id: "tool-glass",
        label: "The dark glass surface among the tools",
        image: "assets/obj-tool-glass.png",
        text: "Black glass, smooth as still water, holding no image at all, and yet I had the distinct sense it was capable of one, the way an unlit room is capable of a lamp."
      },
      {
        id: "water-clock",
        label: "The second water-clock, half-hidden",
        image: "assets/obj-water-clock.png",
        text: "Same brass, same crack along its base, same slow patient drip, as though the room kept a spare in case the first one ever told the truth too plainly. I could not tell, looking at them side by side, which one had been built first. They agreed with each other too perfectly for that question to matter."
      },
      {
        id: "tally",
        label: "The tally scratched under the table",
        image: "assets/obj-tally.png",
        text: "Marks. Dozens of them, grouped in fives the way a prisoner counts days, except these weren't days, they were shaped more like names, or the ruins of names, each one struck through with the same single, unhurried line. I did not count them. I did not want the number to be a number I recognized."
      },
      {
        id: "letter",
        label: "A folded, unsent letter tucked beneath the tools",
        image: "assets/obj-letter.png",
        text: "Addressed to no one. The hand that wrote it had crossed out more than it kept.\n\n<em>“I have kept this correct for thirty years,”</em> it read, in a script gone brittle at the folds. <em>“I no longer remember if I was protecting the world from it, or protecting it from the world.”</em>\n\nThere was no signature. There didn't need to be one."
      },
      {
        id: "manuscript",
        label: "A single printed page, ink still faintly wet",
        image: "assets/obj-manuscript.png",
        text: "A page, freshly pressed, smelling of iron and oil the way new print always does before it's had time to become old. Diagrams. Circles around circles, and at the center, not what the room believed.\n\nI reached for it. A monk's hand closed over mine before I could lift it clear, not roughly. The way you'd stop a dying man from reaching for water he's already had enough of.\n\n“Later,” the monk said, in a tone that made it clear he meant <em>never</em>, said kindly."
      }
    ],
    reactive: [
      {
        prompt: "How do you react to the tally?",
        flagKey: "tally_reaction",
        requiresExamined: ["tally"],
        options: [
          {
            label: "This has happened before.",
            value: "before",
            response: "I said it the way you say a diagnosis you already suspected, relief and dread arriving in the same breath."
          },
          {
            label: "This is only this room. It means nothing.",
            value: "denial",
            response: "I told myself that. I have noticed that the things we tell ourselves most firmly are usually the ones we believe least."
          },
          {
            label: "I don't want to know.",
            value: "refuse",
            response: "I let the cloth fall back over the ledger. Some doors close easier from the outside than the mind ever closes them from within."
          }
        ]
      },
      {
        prompt: "How do you react to the anachronism generally?",
        flagKey: "tools_reaction",
        options: [
          {
            label: "This is wrong, this shouldn't exist here.",
            value: "denial",
            response: "I said it to no one, which was, I was beginning to learn, the only audience this dream kept for me."
          },
          {
            label: "Maybe time doesn't move the way I was told.",
            value: "acceptance",
            response: "If he could be early, perhaps the room could be late, borrowing tomorrow's tools to perform yesterday's cruelty."
          },
          {
            label: "Watch and say nothing, some questions aren't for asking.",
            value: "silence",
            response: "I had the sense that understanding it would not have stopped it. Only made me complicit in it a little sooner."
          }
        ]
      }
    ],
    next: "scene-4"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 4
  {
    id: "scene-4",
    title: "He Sees Me",
    background: "assets/scene-4-reveal.png",
    text: [
      "The instrument found its place against his temple, and the room exhaled the way a held breath does, not with violence, but with relief.",
      "When the skin gave, no blood came. Only water, clear as the water in the clock, running past his ear onto the stone in a small, patient psalm. He did not cry out. Only tired, the way a man is tired after a debate he has already lost the crowd on, or a book he finished decades before anyone agreed to print it.",
      "And then he looked at me."
    ],
    tier2: [
      {
        id: "eyes",
        label: "His eyes",
        image: "assets/obj-eyes-his.png",
        text: "In the wet dark of them, for just a moment, I saw something reflected that wasn't candlelight. A face. Mine, I think, though I could not say, afterward, if I had recognized it, or only hoped I would."
      }
    ],
    reactive: [
      {
        prompt: "What do you do?",
        flagKey: "witness_reaction",
        options: [
          {
            label: "Say nothing.",
            value: "silent",
            response: "He seemed almost grateful for the silence, as if speech, even mine, would have been one more thing draining out of him."
          },
          {
            label: "“Why didn't you fight them?”",
            value: "asked_why",
            response: "“Fighting is for men who believe the argument is still open. Mine closed the day I finished the mathematics. Since then, others have taken it upon themselves to soften what I meant, to make it safer than I ever intended it to be. I have grown used to my own truth arriving secondhand, wearing someone else's caution.” He smiled like it cost him something he no longer had spare."
          },
          {
            label: "Try to reach out, touch his shoulder, though no one sees you.",
            value: "reached",
            response: "My hand passed through him the way a hand passes through fog, and yet something in his face eased, as though he'd felt weather change, if not a hand."
          },
          {
            label: "“It's not your fault.”",
            value: "absolved",
            response: "“No,” he agreed, so gently it was almost forgiveness. “It rarely is anyone's. That's the part they never write in the histories.”"
          }
        ]
      }
    ],
    branch: {
      prompt: "Do you watch?",
      flagKey: "looked_away",
      options: [
        { label: "I looked away.", value: true, next: "scene-5" },
        { label: "I kept watching.", value: false, next: "scene-5" }
      ]
    },
    // The scene's payoff is shown as a full-bleed plate rather than one more
    // paragraph on a page the player has been reading for minutes.
    closingPlate: "assets/char-copernicus-reveal.png",
    closingText: "“I'm ahead of my time,” he said, not as excuse, not as grievance. As apology. As if being right early was a debt he owed the room, and this, the water, the stone, the small patient sound of himself running out, was only him finally paying it."
  },

  // ─────────────────────────────────────────────────────────────── SCENE 5
  {
    id: "scene-5",
    title: "Waking",
    background: "assets/scene-5-waking.png",
    // Your own hands at your temple, before the prose explains them.
    openingPlate: "assets/char-player-hands.png",
    text: [
      "I woke the way a candle wakes, not remembering it had ever been out. My hand had already found my temple before my mind caught up to it.",
      "There was a seam there. Not a scar. A <em>seam</em>, and it was wet. Not bleeding-wet. Something slower than blood, something that clung to my fingers the way old glue clings, half-dried and unwilling to fully let go of either surface it was meant to join.",
      "I rubbed my fingers together and the wetness did not rub away so much as stretch, a thin, cold thread of it, tacky, reluctant, before it finally broke. It smelled of nothing. It felt like something that had been waiting a very long time to be touched.",
      "Somewhere beneath the stickiness, under the skin, I thought I could feel the shape of a word forming, not one I was thinking, but one waiting to be thought, the way a name waits in a mouth before you've decided to speak it. It felt old. It felt, absurdly, like <em>mine</em>, the way a coat left too long in someone else's closet starts to smell like your own house instead of theirs."
    ],
    conditionalText: {
      key: "looked_away",
      cases: {
        true: "I had looked away from him, and yet here I was, sticky-fingered, touching the very door I'd refused to watch open.",
        false: "I had watched him become this. I hadn't understood that watching leaves residue, that it stays on the fingers long after the looking is done."
      }
    },
    tier2: [
      {
        id: "seam",
        label: "The wetness itself",
        image: "assets/obj-seam.png",
        text: "It dried, slightly, at the edges of the seam, the way a puddle dries at its shore first, leaving a faint ring, like a stain a glass leaves on wood. The center stayed wet no matter how long I waited."
      },
      {
        id: "reflection",
        label: "Your reflection in the dark window",
        image: "assets/obj-reflection.png",
        text: "The glass gave back less a face than a suggestion of one, and for just a moment, the suggestion wore a collar I didn't own, a face older than mine by three centuries and several apologies. Then it was only me again, or only tired, which in that light amounted to the same thing."
      }
    ],
    reactive: [
      {
        prompt: "What's your first thought?",
        flagKey: "waking_reaction",
        options: [
          {
            label: "“This is still the dream.”",
            value: "dream",
            response: "A reasonable thought. I held onto it the way one holds a coat too thin for the weather, out of habit, not belief."
          },
          {
            label: "“I need to see my own eyes.”",
            value: "mirror",
            response: "There was no mirror in the room. I found this, somehow, less frightening than finding one would have been."
          },
          {
            label: "“I understand now.”",
            value: "understand",
            response: "Understanding arrived before explanation did, the way grief sometimes arrives before the phone call that should have caused it."
          }
        ]
      }
    ],
    next: "scene-6"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 6
  {
    id: "scene-6",
    title: "The Chapel, Again",
    background: "assets/scene-6-chapel-again.png",
    text: [
      "The chapel had not moved, but I had, from the fog outside it, to the chair at its center. The candle guttered at the same hour it always had, because it seemed this room did not keep time so much as repeat it, the way a copied page repeats an error until someone finally checks the original.",
      "The monks looked at me now. All of them, at once, the way a held breath finally released.",
      "One of them, the eldest, I think, though the hood made ages hard to keep, tilted his head at me with something almost like recognition. Not the recognition of a stranger. The recognition of a man greeting a guest he's hosted so many times he's stopped bothering to relearn the name, only the shape of the visit.",
      "“Back again,” he said, not unkindly, the way you'd greet weather you'd stopped being surprised by.",
      "And then, past his shoulder, in the place where the candlelight gave up and the dark began, I saw someone standing. Still. Unclaimed by the room, the way I once had been.",
      "I could not see a face. Only the outline of someone watching the way one watches a thing they don't yet understand they'll become responsible for. The monks did not turn to look at what I was looking at. Of course they didn't. I hadn't turned either, the first time."
    ],
    tier2: [
      {
        id: "hands",
        label: "Your own hands",
        conditionalText: {
          key: "looked_away",
          cases: {
            true: "My hands were shaking the way his never had, as if he had spent his fear already, and left me only the leftover of it.",
            false: "My hands were steady. I had rehearsed this, without knowing it, every time I refused to look away from his."
          }
        }
      },
      {
        id: "water-clock-6",
        label: "The water-clock",
        image: "assets/obj-water-clock.png",
        text: "Nearly dry, the basin beneath it dark with old use, and beside it, I now noticed, a second empty basin, drier still, as though it had finished this same errand some while before I arrived to start mine."
      },
      {
        id: "watcher",
        label: "The watcher in the dark",
        image: "assets/obj-watcher.png",
        text: "They did not move when I looked at them, which is its own kind of answer. I raised a hand, half a greeting, half a warning. I could not tell if they raised one back, or if I only wanted them to."
      }
    ],
    reactive: [
      {
        prompt: "A monk speaks: “Do you understand why you're here?”",
        flagKey: "seen_reaction",
        options: [
          {
            label: "“Yes. I always have.”",
            value: "yes",
            response: "“Then you understand,” he said, “why understanding was never going to save you.”"
          },
          {
            label: "“No, and I don't think you do either.”",
            value: "no",
            response: "He did not answer that. I chose to take his silence as agreement, since he'd given me nothing else to take."
          },
          {
            label: "Say nothing, only sit down in the chair yourself.",
            value: "sat_down",
            response: "This, more than anything I could have said, seemed to satisfy them. I had, without meaning to, given them the answer in advance."
          }
        ]
      }
    ],
    next: "scene-7"
  },

  // ─────────────────────────────────────────────────────────────── SCENE 7
  {
    id: "scene-7",
    title: "The Choice",
    background: "assets/scene-7-choice.png",
    text: [
      "A monk knelt before me with the instrument that had opened him. Its cold light pulsed once, patient, unbothered by which century had summoned it.",
      "“Does it hurt to be ahead,” he asked me, not unkindly, “or only to be alone in it?”",
      "Past the monk's shoulder, they were still there. Closer now than in the chapel, near enough that I understood, with the strange calm of a fact arriving too late to be useful, that they were not going to intervene. They hadn't come to save me. They had come the way you come to a bedside, not to change what's happening, only to make sure it isn't unwitnessed.",
      "I found, oddly, that this was the closest thing to mercy the room had offered me all night."
    ],
    tier2: [
      {
        id: "rope",
        label: "The rope at your wrists",
        image: "assets/obj-rope.png",
        text: "Soft with age, the same rope, I was almost certain, that had held him. It had not been replaced. Perhaps it never needed to be."
      }
      // Scene 7 stays lean on purpose — one hotspot, per the script's inventory.
    ],
    reactive: [
      {
        prompt: "Do you acknowledge them?",
        flagKey: "acknowledged_witness",
        options: [
          {
            label: "Look at them and hold their gaze.",
            value: "held",
            response: "I did not look away, and neither did they. Some conversations don't need words to be complete, only two people willing to stay in the room for them."
          },
          {
            label: "Don't look. Keep your eyes on the monk instead.",
            value: "avoided",
            response: "I kept my eyes forward. I told myself it was courage. I suspect, now, it was only the same fear he must have felt, wearing a newer coat."
          }
        ]
      }
    ],
    branch: {
      prompt: "How does this end?",
      final: true,
      flagKey: "final_choice",
      options: [
        { label: "Let it happen. I have nothing left to prove them wrong.", value: "A", next: "ending-a" },
        { label: "I fought them, though I knew the rope would win.", value: "B", next: "ending-b" },
        { label: "I said his words back to them: “I'm ahead of my time.”", value: "C", next: "ending-c" }
      ]
    }
  }
];
