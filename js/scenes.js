// TESTIS — scene data.
// Narrative content transcribed from docs/testis-script.md v3 (source of truth).
// No logic in this file.
//
// Tokens usable inside any body text, each on its own paragraph:
//   {morse}        renders the block's `morse` field as a typed inscription
//   {player_name}  renders the carved name, or "a name" if declined

const SCENES = [

  // ─────────────────────────────────────────────────────────────── SCENE 1
  {
    id: "scene-1",
    title: "The Gate",
    background: "assets/images/scene-1-gate.webp",
    // SOL STAT — fragment 1 of 3. Drives the drip; never decoded in-game.
    morse: "... --- .-.. / ... - .- -",
    text: [
      "I came to the gate the way one comes to a grave, without deciding to, and too late to turn back. The fog did not part for me. It had already been standing where I meant to walk.",
      "The gate was open. Not forced, not broken. Open the way a door is open when someone has gone to the trouble of opening it and then gone back inside to wait.",
      "Somewhere behind the stone, water was falling. Not the indifferent chatter of rain. Something metered. Something counted, and counted carefully, as if the dark were keeping a record it expected to be checked against later."
    ],
    tier2: [
      {
        id: "sundial",
        label: "The sundial",
        image: "assets/images/obj-sundial.webp",
        text: "A dial with no sun to read by, and yet its shadow falls anyway, and falls precisely, as though the hour it names has nothing to do with the sky."
      },
      {
        // Kept as its own hotspot (reusing obj-water-clock.webp, per the art
        // doc's "reused in Scenes 1, 3") rather than merged into the sundial
        // paragraph. Text below is the v3 script's sundial passage, split at
        // the point where it turns from the dial to the water.
        id: "water-clock-1",
        label: "The water-clock behind the wall",
        image: "assets/images/obj-water-clock.webp",
        morse: "... --- .-.. / ... - .- -",
        text: "Beneath the wall the drip keeps its rhythm, patient, unhurried, the same figure over and over:\n\n{morse}\n\nI did not know then that it was saying anything. I only knew it was not random, and that things which are not random are usually addressed to someone."
      },
      {
        id: "latch",
        label: "The gate's iron latch",
        image: "assets/images/obj-latch.webp",
        text: "Cold under my palm, and wet, though nothing above it could have rained. My fingers came away with a film on them, thin as the skin on old milk.\n\nThe wet was on the inside face of the latch. Whoever touched it last had been leaving, not arriving."
      },
      {
        id: "threshold",
        label: "The worn threshold letters",
        image: "assets/images/obj-threshold.webp",
        text: "Someone had carved letters here once. Time, or water, or both, had worn them back to suggestion.\n\nNot one name. Several, I thought, cut over each other at different depths, in different hands, across what must have been a great many years. The oldest were barely a roughness in the stone. The newest still had edges.\n\nBeneath them all, the stone was bare enough for another hand.",
        interaction: {
          type: "text_input",
          flagKey: "player_name",
          maxLength: 20,
          placeholder: "Carve your name…",
          submitLabel: "Carve",
          declineLabel: "Leave the stone as you found it.",
          submitResponse: "I pressed the word into stone the way you press a thumb into wet clay, not because it would last, but because for a moment it was mine to make last. It did not occur to me to wonder why the space had been left empty, or who had been leaving it empty, or for how long.",
          declineResponse: "I let the letters stay half-erased. Whoever they had been, they had not been asked either."
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
            response: "No one answered, but the dripping stopped. Only for a moment, only for the length of a held breath, and then it resumed exactly where it had left off, as though it had been counting and did not intend to lose its place."
          },
          {
            label: "Step through in silence.",
            value: "silent",
            response: "I entered the way guilt enters a room, sideways, already apologizing for a thing I hadn't done yet. Nothing challenged me. I have thought since that being unchallenged is not the same as being unexpected."
          },
          {
            label: "Listen to the water a moment longer.",
            value: "listened",
            response: "I counted the drips until I lost count. Somewhere past forty I understood that the pattern had repeated, and that I had heard the whole of it twice without learning anything, which is a particular kind of failure I would get better at."
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
    background: "assets/images/scene-2-chapel.webp",
    openingPlate: {
      image: "assets/images/char-copernicus-bound.webp",
      text: [
        "I had expected an empty room. I do not know why. Nothing about the night had promised me an empty room, and still, that was what I had prepared for.",
        "He was six feet from me and facing my way and I did not see him until I had already walked in.",
        "Rope at both wrists. Head up. Eyes open.",
        "I stopped so hard I heard my own foot scrape the stone, and not one person in that room turned around."
      ]
    },
    text: [
      "He sat bound at the center of them, and the monks moved around his stillness the way tide moves around a stone. Patient. Certain. In no hurry to be cruel.",
      "His face troubled me before I understood why. A face I had seen pressed flat and yellowing in the margin of some lecture I had half-slept through. A name under a woodcut, a woodcut under a name, the two worn so far together I could no longer say which I remembered.",
      "They did not use his name. Not once, in all the time I stood there. They spoke <em>to</em> him constantly and <em>of</em> him never, the way you might avoid saying a word out loud in a house where saying it has consequences.",
      "He had not yet seen me. I was, as far as this room was concerned, only weather."
    ],
    tier2: [
      {
        id: "astrolabe",
        label: "The astrolabe at his neck",
        image: "assets/images/obj-astrolabe.webp",
        text: "Tarnished, still around his throat, as though no one had thought to take a compass from a man no longer going anywhere.\n\nOr as though it was not his to take. It was worn at the chain in two places, unevenly, the way a thing wears when it has hung on more than one neck."
      },
      {
        id: "star-chart",
        label: "The star-chart under the chair",
        image: "assets/images/obj-star-chart.webp",
        text: "Circles within circles, and at the center, not the earth. I had been taught it wrong, or he had been taught it early.\n\nThe paper was old. Older than him, I thought, and then I put the thought down carefully, the way you put down something you have realized is hot."
      },
      {
        id: "books",
        label: "The confiscated books, spines to the wall",
        image: "assets/images/obj-books.webp",
        text: "They had turned every spine to face the stone, as if a title left visible might argue back.\n\nOne volume had slipped enough to show a fragment of a diagram. The same circles. The same sun where the earth should be.\n\nThe binding was three centuries older than the man in the chair."
      },
      {
        id: "monk-murmuring",
        label: "The monk murmuring a name, not his own",
        image: "assets/images/obj-monk-murmuring.webp",
        text: "A name, repeated like a rosary bead worn smooth. Not his.\n\nI assumed at first it was a saint's. Later I understood it was a question, phrased as a name, and that the monk was practicing it, the way one practices a difficult word before an examination."
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
            response: "I said it once, in my head, the way you test a floorboard before trusting your weight to it. It held. And one of the monks, who could not possibly have heard me, stopped what he was doing and looked, for a moment, directly at the place where I was standing."
          },
          {
            label: "Refuse to. Some part of me wasn't ready to know.",
            value: false,
            response: "Better, I thought, to let him remain a face I half-recognized than a name I would have to carry out of this room. I did not yet know that the room had a use for names, and that mine was already in it."
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
    background: "assets/images/scene-3-tools.webp",
    // TERRA MOVET — fragment 2 of 3.
    morse: "- . .-. .-. .- / -- --- ...- . -",
    text: [
      "The instruments were wrong before I could say how. Steel too smooth for any forge I knew. A faint hum in them like trapped bees, or captured lightning.",
      "A monk was speaking, low and unhurried, and I listened for the accusation I expected. That the earth does not move. That scripture is not a matter for arithmetic. That he had reached above his station and would now be assisted back down to it.",
      "He said none of it. He never once told the man in the chair that he was wrong.",
      "He asked him where he had gotten it.",
      "Again, and then again, with the patience of someone who has asked this many times before and expects to ask it many times more. Not <em>why do you believe this.</em> Not <em>will you recant.</em>",
      "<strong>Who gave it to you.</strong>"
    ],
    tier2: [
      {
        id: "tool-glowing",
        label: "The humming instrument",
        image: "assets/images/obj-tool-glowing.webp",
        text: "A thin cold light lived inside it, the way a firefly holds its own small blasphemy.\n\nIt was not sharpened. Nothing about it was made for cutting. It ended in a smooth blunt cup, and the cup was ringed with a fine grille, and the grille was where the humming came from.\n\nIt was not built to open a man. It was built to listen to one."
      },
      {
        id: "tool-glass",
        label: "The dark glass surface among the tools",
        image: "assets/images/obj-tool-glass.webp",
        text: "Black glass, smooth as still water, holding no image at all, and yet I had the distinct sense it was capable of one, the way an unlit room is capable of a lamp.\n\nWhen the monk's hand passed near it, something beneath the surface moved. Not a reflection. A <em>response</em>.\n\nIt was seated into the table. Not resting on it, not carried in and set down. Set into the wood, and the wood had swelled and darkened around its edges the way wood does after many years of holding something in place. Whatever this room was doing, it had not started doing it recently."
      },
      {
        id: "water-clock",
        label: "The second water-clock, half-hidden",
        image: "assets/images/obj-water-clock.webp",
        morse: "- . .-. .-. .- / -- --- ...- . -",
        text: "Same brass, same crack along its base, same slow patient drip, as though the room kept a spare in case the first one ever told the truth too plainly. I could not tell, looking at them side by side, which had been built first. They agreed with each other too perfectly for the question to matter.\n\nBut this one was faster. Not hurried. Insistent, the way a man repeats himself when he suspects he was not heard:\n\n{morse}"
      },
      {
        id: "tally",
        label: "The tally scratched under the table",
        image: "assets/images/obj-tally.webp",
        // The payoff. Second use of player_name — the name carved in Scene 1 is
        // already on the roster, struck through. The narrator never reacts.
        nameConditional: {
          named: "Marks. Dozens of them, grouped in fives the way a prisoner counts days, except these were not days. They were names, or the ruins of names, each one struck through with the same single unhurried line.\n\nSome were cut deep and square, in a hand that had time. Others were scratched fast and shallow, as if by someone who expected to be interrupted. They ran the length of the board and around its edge and onto the underside of the leg, and they did not stop there, they only stopped being legible.\n\nI read the last one twice, and then a third time, and the third time did not help.\n\n{player_name}\n\nThe cut was fresh. The dust was still in it.",
          unnamed: "Marks. Dozens of them, grouped in fives the way a prisoner counts days, except these were not days. They were names, or the ruins of names, each one struck through with the same single unhurried line.\n\nSome were cut deep and square, in a hand that had time. Others were scratched fast and shallow, as if by someone who expected to be interrupted. They ran the length of the board and around its edge and onto the underside of the leg, and they did not stop there, they only stopped being legible.\n\nThe last one had been started and abandoned. A single stroke, no letters, the beginning of a name by someone who had thought better of giving one. The dust was still in it."
        }
      },
      {
        id: "letter",
        label: "A folded, unsent letter tucked beneath the tools",
        image: "assets/images/obj-letter.webp",
        text: "Addressed to no one. The hand that wrote it had crossed out more than it kept.\n\n<em>“I have kept this correct for thirty years,”</em> it read, in a script gone brittle at the folds. <em>“I no longer remember if I was protecting the world from it, or protecting it from the world. He did not tell me what it would cost to hold. I do not think he knew. I think he was only glad to set it down.”</em>\n\nThere was no signature. There did not need to be one.\n\nThe paper was dated seventy years before the man in the chair was born, and it was unmistakably his handwriting."
      },
      {
        id: "manuscript",
        label: "A single printed page, ink still faintly wet",
        image: "assets/images/obj-manuscript.webp",
        text: "A page, freshly pressed, smelling of iron and oil the way new print does before it has had time to become old. Diagrams. Circles around circles, and at the center, not what the room believed.\n\nIt was from his book. The book he had not finished. The book that would not be printed for years yet, that he would receive on the day he died, that no press in this country had yet been given a single page of.\n\nThe ink was still wet.\n\nI reached for it. A monk's hand closed over mine before I could lift it clear, and not roughly, the way you would stop a dying man from reaching for water he has already had enough of.\n\n“Later,” the monk said, in a tone that made it clear he meant never, said kindly."
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
            response: "I said it the way you say a diagnosis you already suspected. Relief and dread arriving in the same breath. Before, and before that, and before that, and the marks did not begin at the top of the board. They only began where I could still read them."
          },
          {
            label: "This is only this room. It means nothing.",
            value: "denial",
            response: "I told myself that. I have noticed that the things we tell ourselves most firmly are the ones we believe least."
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
            label: "This is wrong. This shouldn't exist here.",
            value: "denial",
            response: "I said it to no one, which was, I was beginning to learn, the only audience this dream kept for me. Wrong for this century, I meant. It did not occur to me until later that the tools might be exactly right, and the century wrong."
          },
          {
            label: "Maybe time doesn't move the way I was told.",
            value: "acceptance",
            response: "If he could be early, perhaps the room could be late. Perhaps things do not arrive in the order we are taught to expect, and perhaps some of them arrive going backward, and have to be carried the rest of the way by hand."
          },
          {
            label: "Watch and say nothing. Some questions aren't for asking.",
            value: "silence",
            response: "I had the sense that understanding it would not have stopped it. Only made me complicit a little sooner."
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
    background: "assets/images/scene-4-reveal.webp",
    text: [
      "The instrument found its place against his temple, and the room exhaled the way a held breath does. Not with violence. With relief.",
      "When the skin gave, no blood came. Only water, clear as the water in the clock, running past his ear onto the stone in a small patient psalm. He did not cry out. He did not seem to be in pain at all, only tired, the way a man is tired after a debate he has already lost the crowd on, or a book he finished decades before anyone agreed to print it.",
      "The monks leaned in. Not to cut. To <em>catch</em> it. There was a basin, and it was not there to keep the floor clean.",
      "And then he looked at me.",
      "Not at them. At me. The one thing in the room that should not have been visible, and was."
    ],
    tier2: [
      {
        id: "eyes",
        label: "His eyes",
        image: "assets/images/obj-eyes-his.webp",
        text: "In the wet dark of them, for just a moment, I saw something reflected that was not candlelight. A face.\n\nMine, I think, though I could not say afterward whether I had recognized it or only hoped I would.\n\nHe was not surprised to see it there. That was the part I could not get past, later. He looked at me the way you look at a face you have been expecting for thirty years and have privately dreaded arriving."
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
            response: "He seemed almost grateful for the silence, as if speech, even mine, would have been one more thing draining out of him. Then, quietly, not quite to me: “Good. The last one talked.”"
          },
          {
            label: "Try to reach out. Touch his shoulder, though no one sees you.",
            value: "reached",
            response: "My hand passed through him the way a hand passes through fog, and yet something in his face eased, as though he had felt weather change, if not a hand. “You did that last time as well,” he said."
          },
          {
            label: "“Why didn't you fight them?”",
            value: "asked_why",
            response: "“Fighting is for men who believe the argument is still open. Mine closed the day I was handed it.” He said <em>handed</em> the way you would say a diagnosis. “And others have taken it upon themselves since to soften what I meant, to make it safer than I intended. I have grown used to my own truth arriving secondhand, wearing someone else's caution. It arrived that way to me.”"
          },
          {
            label: "“I'm sorry.”",
            value: "absolved",
            response: "I did not know what I was apologizing for. It arrived before the reason did, the way an apology sometimes does when the body has understood something the mind has not been told yet.\n\n“No,” he said, so gently it was almost absolution. “Not yours. It rarely is anyone's, and it is never the one holding it at the end. That is the part they never write in the histories.”\n\nHe held my eyes a moment longer than the sentence needed.\n\n“You will want to remember I said that.”"
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
    // Supersedes v2's closingText: the payoff is held on the plate, not appended
    // to a page the player has been reading all scene.
    closingPlate: {
      image: "assets/images/char-copernicus-reveal.webp",
      text: [
        "They were still asking him. Even then, even with the basin filling and the water going over the stone, the same question in the same unhurried voice, over and over, and he would not answer it.",
        "He turned his head as far as the rope allowed. He looked at me while he said it, and I understood that the answer was not a name he was protecting.",
        "“I'm ahead of my time,” he said.",
        "Not as excuse. Not as grievance. As apology.",
        "And I understood, too late, that he was not apologizing to them."
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────── SCENE 5
  {
    id: "scene-5",
    title: "Waking",
    background: "assets/images/scene-5-waking.webp",
    openingPlate: {
      image: "assets/images/char-player-hands.webp",
      text: [
        "I woke the way a candle wakes, not remembering it had ever been out.",
        "My hand had already found my temple before my mind caught up to it, the way a tongue finds a broken tooth before the pain arrives to explain it. There was a seam there. Not a scar. A seam, the kind a thing has when it was made in two pieces and someone forgot to finish the joining.",
        "And it was wet.",
        "Not bleeding-wet. Something slower than blood, that clung the way old glue clings, half-dried and unwilling to let go of either surface it was meant to join. I brought my fingers down where I could see them and held them there a while, in the dark, not doing anything about it."
      ]
    },
    text: [
      "So I did the sensible thing. I went looking for the date.",
      "This is what a reasonable person does, I think, after a dream that will not sit down. You find something ordinary and you hold it up against the dream and you watch the dream lose. I had done it before, after other nights. It had always worked.",
      "There was a calendar. I do not remember the room having one, but there it was, and it was open, and someone had been keeping it.",
      "<strong>May. Fifteen forty-three.</strong>",
      "The days behind me were crossed through, one by one, in a small careful hand that had not missed any. The days ahead were empty, except for one, which was circled.",
      "I looked at the circled date for a long time. It meant nothing to me. That is the part I would like understood: it meant nothing to me <em>then</em>, and I went on looking at it anyway, the way you go on pressing a bruise.",
      "On the desk beneath the window there were pages.",
      "Diagrams. Circles inside circles, and at the center of them the thing that had been at the center of his. Marginal notes in a cramped and hurrying hand. Corrections. A calculation begun three times and abandoned twice.",
      "It was my handwriting.",
      "I do not mean it resembled mine. I mean I recognized the way I make a seven, and the place where I lift the pen in the middle of a word because my hand cramps, and a small ugly habit in my letters that I have never liked and have never managed to stop.",
      "The last page stopped in the middle of a sentence, as though whoever was writing it had been interrupted, or had run out of the thing they were writing with, or had simply not yet got round to finishing.",
      "The ink was not dry."
    ],
    conditionalText: {
      key: "looked_away",
      cases: {
        true: "I had looked away from him. I had not wanted to see what came out. And here it was on my desk in my own hand, finishing itself without me, and I had not even had the decency to watch it arrive.",
        false: "I had watched all of it and I had thought that was the whole of my part. Standing over those pages, I understood that watching had not been the observation. It had been the delivery."
      }
    },
    tier2: [
      {
        id: "seam",
        label: "The wetness itself",
        image: "assets/images/obj-seam.webp",
        text: "It dried slightly at the edges of the seam, the way a puddle dries at its shore first, leaving a faint ring like the stain a glass leaves on wood. The center stayed wet no matter how long I waited.\n\nIt was the same water. I want to be clear that I knew this immediately and without evidence, and that I have never since been able to explain how."
      },
      {
        id: "reflection",
        label: "Your reflection in the dark window",
        image: "assets/images/obj-reflection.webp",
        text: "The glass gave back less a face than a suggestion of one, and for a moment the suggestion wore a collar I did not own, and a face older than mine by three centuries and several apologies.\n\nThen it was only me again. Or only tired, which in that light amounted to the same thing.\n\nThe reflection had turned its head slightly before I did."
      },
      {
        id: "calendar",
        label: "The calendar",
        // No image. Renders the May 1543 Julian grid — see buildCalendar in main.js.
        widget: "calendar-may-1543",
        text: "Someone had been keeping it. That was the part I kept returning to, more than the year. The crossings-out went back weeks and none had been missed, and the hand that made them had been steady at the start and was not steady now.\n\nOne day ahead was circled. Only one. Not marked in the same ink as the crossings, and not, I thought, by the same hand.\n\nI counted the days between where the crossings stopped and where the circle was. It was not many. I counted them twice and got the same answer both times, and then I stopped counting things for a while."
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
            response: "I said it out loud, to the calendar and the pages and the wet ink, in the tone you use on a dog that has got up on the furniture. Nothing in the room was persuaded. I held onto the thought anyway, the way one holds a coat too thin for the weather, out of habit rather than belief."
          },
          {
            label: "“I need to see my own eyes.”",
            value: "mirror",
            response: "Not the pages. Not the date. My own eyes, because there had been something in his and I wanted to know whether it was in mine yet. There was no mirror in the room. I found this, somehow, less frightening than finding one would have been."
          },
          {
            label: "“Finish the sentence.”",
            value: "understand",
            response: "I picked up the pen. I want to say that I fought it, and I did not. My hand knew where the sentence was going and finished it in a hand I recognized, and I read it afterward the way you read something a stranger has written, and it was correct, and I had not known it before I woke."
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
    background: "assets/images/scene-6-chapel-again.webp",
    // EGO SOLU — fragment 3 of 3, cut short. The final ··· never comes.
    morse: ". --. --- / ... --- .-.. ..-",
    text: [
      "The chapel had not moved, but I had. From the fog outside it to the chair at its center. The rope was old in the same place. The candle guttered at the same hour it always had, because it seemed this room did not keep time so much as repeat it, the way a copied page repeats an error until someone checks it against the original.",
      "The monks looked at me now. All of them at once, the way a held breath is finally released.",
      "One of them, the eldest I think, though the hood made ages hard to keep, tilted his head at me with something almost like recognition. Not the recognition of a stranger. The recognition of a man greeting a guest he has hosted so many times he has stopped bothering to relearn the name, only the shape of the visit.",
      "“Back again,” he said, not unkindly, the way you would greet weather you had stopped being surprised by.",
      "And then, past his shoulder, where the candlelight gave up and the dark began, I saw someone standing. Still. Unclaimed by the room, the way I once had been.",
      "I could not see a face. Only the outline of someone watching the way one watches a thing they do not yet understand they will become responsible for. The monks did not turn to look at what I was looking at. Of course they didn't. I had not turned either, the first time."
    ],
    tier2: [
      {
        id: "hands",
        label: "Your own hands",
        image: "assets/images/obj-hands-bound.webp",
        conditionalText: {
          key: "looked_away",
          cases: {
            true: "My hands were shaking the way his never had, as if he had spent his fear already and left me only the leftover of it.",
            false: "My hands were steady. I had rehearsed this without knowing it, every time I refused to look away from his."
          }
        }
      },
      {
        id: "water-clock-6",
        label: "The water-clock",
        // Its own image, not a reuse of Scene 1/3's obj-water-clock — the
        // basin is dry and a second empty basin sits beside it, so the shot
        // has to show wear the earlier two don't. See art doc, Scene 6.
        image: "assets/images/obj-water-clock-2.webp",
        morse: ". --. --- / ... --- .-.. ..-",
        text: "Nearly dry, the basin beneath it dark with old use, and beside it, I now noticed, a second empty basin, drier still, as though it had finished this same errand some while before I arrived to start mine.\n\nWhat was left of it was still trying. Slower now, with long gaps where a drip should have fallen and didn't, the way a voice goes when there isn't breath enough left to finish:\n\n{morse}\n\nThen nothing. Whatever it had been counting toward, it did not reach."
      },
      {
        id: "watcher",
        label: "The watcher in the dark",
        image: "assets/images/obj-watcher.webp",
        text: "They did not move when I looked at them, which is its own kind of answer. I raised a hand, half a greeting, half a warning. I could not tell if they raised one back, or if I only wanted them to.\n\nI knew what they were waiting for. I had waited for it myself, in the same corner, wearing whatever face I had then, and I had not known I was waiting, and neither did they."
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
            response: "“Then you understand,” he said, “why understanding was never going to save you. We do not ask because we hope to be surprised. We ask because the asking is how it is kept moving.”"
          },
          {
            label: "“No, and I don't think you do either.”",
            value: "no",
            response: "He did not answer that. I chose to take his silence as agreement, since he had given me nothing else to take. But he wrote something down, and he did not seem disappointed, and I have thought since that both answers were probably acceptable."
          },
          {
            label: "Say nothing, only sit down in the chair yourself.",
            value: "sat_down",
            response: "This, more than anything I could have said, seemed to satisfy them. I had given them the answer in advance without meaning to. One of them made a mark on the underside of the table. I did not need to see it to know what it was."
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
    background: "assets/images/scene-7-choice.webp",
    text: [
      "A monk knelt before me with the instrument that had opened him. Its cold light pulsed once, patient, unbothered by which century had summoned it.",
      "“Does it hurt to be ahead,” he asked me, not unkindly, “or only to be alone in it?”",
      "And then, in the same even voice, the question he had asked the man in this chair a hundred times and never once been answered:",
      "“Who gave it to you?”",
      "Past his shoulder, they were still there. Closer now than in the chapel. Near enough that I understood, with the strange calm of a fact arriving too late to be useful, that they were not going to intervene. They had not come to save me. They had come the way you come to a bedside, not to change what is happening, only to make sure it is not unwitnessed.",
      "I found, oddly, that this was the closest thing to mercy the room had offered me all night.",
      "And I understood what he had been protecting, at the end, when he lied and called himself early. Not a name. A <em>person</em>. The one standing in the dark, who had not done it yet, who would not understand they had done it until they were sitting here being asked."
    ],
    tier2: [
      {
        id: "rope",
        label: "The rope at your wrists",
        image: "assets/images/obj-rope.webp",
        text: "Soft with age. The same rope, I was almost certain, that had held him. It had not been replaced. Perhaps it never needed to be.\n\nThe fibers had gone shiny at two places, where wrists narrower than mine had worn them, and at two more where wrists wider had. I stopped counting the places. The rope had a longer memory than the room did."
      }
    ],
    reactive: [
      {
        prompt: "Do you acknowledge them?",
        flagKey: "acknowledged_witness",
        options: [
          {
            label: "Look at them and hold their gaze.",
            value: "held",
            response: "I did not look away, and neither did they. Some conversations do not need words to be complete, only two people willing to stay in the room for them. I thought: you will not understand this for a long time, and then you will understand it all at once, and I am sorry."
          },
          {
            label: "Don't look. Keep your eyes on the monk instead.",
            value: "avoided",
            response: "I kept my eyes forward. I told myself it was courage. I suspect now it was the same fear he must have felt, wearing a newer coat. If I did not look at them, perhaps they were not there. Perhaps no one had to be next."
          }
        ]
      }
    ],
    // All three are answers to "who gave it to you."
    branch: {
      prompt: "How does this end?",
      final: true,
      flagKey: "final_choice",
      options: [
        { label: "Let it happen. Say nothing, and let it end with me.", value: "A", next: "ending-a" },
        { label: "Refuse. Fight them, though I knew the rope would win.", value: "B", next: "ending-b" },
        { label: "Say his words back to them: “I'm ahead of my time.”", value: "C", next: "ending-c" }
      ]
    }
  }
];
