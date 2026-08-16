# TESTIS

**Beta — v0.2.0-beta.** Playable start to finish, all three endings reachable.

A short narrative web game. Plain HTML/CSS/JS, no build step, no backend, no persistence.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Run it

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8777
```

Then visit <http://localhost:8777>. Everything loads via plain `<script>` tags sharing globals, so
`file://` works too — no ES modules, no server dependency.

## Layout

```
index.html
css/style.css
js/scenes.js     SCENES — all scene data
js/endings.js    ENDINGS + WITNESS_CALLBACK
js/audio.js      AUDIO state + the Sound facade
js/main.js       state machine, rendering, events
assets/images/   art, filenames per docs/testis-art-prompts.md
assets/sound/    audio, filenames per docs/testis-sound-design.md
assets/widgets/  standalone HTML prototypes; not loaded by the game
ATTRIBUTIONS.txt required credits; maintained from sound doc §11
```

Load order matters: `scenes.js`, `endings.js`, `audio.js`, then `main.js`.

## The docs

- [docs/testis-script.md](docs/testis-script.md) — narrative, scenes, endings,
  theme (source of truth for story).
- [docs/testis-art-prompts.md](docs/testis-art-prompts.md) — art direction and asset filenames.
- [docs/testis-tech-design.md](docs/testis-tech-design.md) — stack, file structure, data schema,
  render loop.
- [docs/testis-sound-design.md](docs/testis-sound-design.md) — beds, stings, the morse drip, the
  toggle, and audio filenames.

For implementation detail on plates, morse, the calendar widget, and debug jumps, read the
corresponding code directly (`js/main.js`, `js/audio.js`).

## Debug jumps

A URL parameter seeds flags and jumps straight to a scene or ending:

```
?debug=ending-a&looked_away=true&witness_reaction=reached&player_name=Aurelia
?debug=scene-4&examined=tally,astrolabe
```

See `applyDebug` in `js/main.js`. Strip or gate this before release.
