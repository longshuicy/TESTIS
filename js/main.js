// TESTIS — state machine, rendering, event handling.
// No narrative content lives in this file. All strings come from scenes.js / endings.js.

/* ────────────────────────────────────────────────────────────── state */

const flags = {
  player_name: null,
  gate_action: null,
  identity_found: false,
  tally_reaction: null,
  tools_reaction: null,
  witness_reaction: null,
  looked_away: null,
  waking_reaction: null,
  seen_reaction: null,
  acknowledged_witness: null,
  final_choice: null
};

const examined = new Set();
let currentSceneId = "scene-1";

// Per-scene bookkeeping for the reactive chain. `requiresExamined` gates are
// checked when the chain runs, which is on scene load — before the player has
// had any chance to examine. `runtime` lets an examine re-open a gate that was
// closed at load time (see reconsiderGates).
let runtime = null;

const FADE_MS = 400;

/* ────────────────────────────────────────────────────────────── dom refs */

const stage = document.getElementById("stage");
const content = document.getElementById("scene-content");
const bgA = document.getElementById("bg-a");
const bgB = document.getElementById("bg-b");
let activeBg = bgA;

/* ───────────────────────────────────────────────── missing-asset placeholder */

// Assets are still being generated. Anything that 404s gets a procedural
// stand-in at the same path — swap the real file in and it just works.
const placeholderCache = new Map();

function placeholderFor(src, ratio) {
  const key = src + "|" + ratio;
  if (placeholderCache.has(key)) return placeholderCache.get(key);

  const name = (src.split("/").pop() || "asset").replace(/\.[a-z]+$/i, "");
  const w = ratio === "wide" ? 1600 : 800;
  const h = ratio === "wide" ? 900 : 800;

  // Deterministic pseudo-random from the filename, so each placeholder is
  // distinct but stable across renders.
  let seed = 0;
  for (let i = 0; i < name.length; i++) seed = (seed * 31 + name.charCodeAt(i)) >>> 0;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  let marks = "";
  for (let i = 0; i < 26; i++) {
    const x = rand() * w, y = rand() * h, l = 40 + rand() * 160, a = rand() * Math.PI;
    marks += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + Math.cos(a) * l).toFixed(1)}" y2="${(y + Math.sin(a) * l).toFixed(1)}"/>`;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<rect width="${w}" height="${h}" fill="#0c0b0a"/>` +
      `<g stroke="#3a352c" stroke-width="1.5" opacity="0.55">${marks}</g>` +
      `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.28}" fill="none" stroke="#5a5245" stroke-width="2" opacity="0.7"/>` +
      `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.min(w, h) * 0.17}" fill="none" stroke="#5a5245" stroke-width="1.5" opacity="0.5"/>` +
      `<circle cx="${w / 2}" cy="${h / 2}" r="5" fill="#7d7160"/>` +
      `<text x="${w / 2}" y="${h - 46}" fill="#6f6555" font-family="Georgia,serif" font-size="${ratio === "wide" ? 26 : 30}" font-style="italic" text-anchor="middle">${name}</text>` +
    `</svg>`;

  const uri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  placeholderCache.set(key, uri);
  return uri;
}

/* ────────────────────────────────────────────────────────────── helpers */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Authored prose may carry <em>. Player input never passes through here.
function prose(node, str) {
  const parts = String(str).split(/\n{2,}/);
  parts.forEach(p => {
    const para = document.createElement("p");
    para.innerHTML = p.replace(/\n/g, "<br>");
    node.appendChild(para);
  });
}

function resolveConditional(cond) {
  return cond.cases[String(flags[cond.key])];
}

function backgroundFor(id) {
  const s = SCENES.find(x => x.id === id);
  if (s) return s.background;
  const e = ENDINGS.find(x => x.id === id);
  return e ? e.background : null;
}

/* ────────────────────────────────────────────────────────── transitions */

function fadeOut(cb) {
  content.classList.add("fade-out");
  setTimeout(() => {
    content.innerHTML = "";
    cb();
    content.scrollTop = 0;
    window.scrollTo(0, 0);
    content.classList.remove("fade-out");
  }, FADE_MS);
}

function setBackground(src) {
  if (!src) return;
  const next = activeBg === bgA ? bgB : bgA;
  const probe = new Image();
  probe.onload = () => swap(src);
  probe.onerror = () => swap(placeholderFor(src, "wide"));
  probe.src = src;

  function swap(url) {
    next.style.backgroundImage = `url("${url}")`;
    next.classList.add("visible");
    activeBg.classList.remove("visible");
    activeBg = next;
  }
}

function preload(paths) {
  paths.filter(Boolean).forEach(src => { new Image().src = src; });
}

function nextPossibleImages(scene) {
  if (scene.branch) return scene.branch.options.map(o => backgroundFor(o.next));
  return scene.next ? [backgroundFor(scene.next)] : [];
}

// True only while a scene is painting its opening state. Blocks added then
// must not steal the scroll position away from the top of the scene.
let painting = false;

// New blocks appear below what the player has already read; ease them in.
function appendBlock(node) {
  node.classList.add("enters");
  content.appendChild(node);
  void node.offsetHeight; // force a reflow so the transition actually runs
  node.classList.add("entered");
  if (!painting) {
    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
  return node;
}

/* ────────────────────────────────────────────────────────────── render */

function renderScene(id) {
  const scene = SCENES.find(s => s.id === id);
  if (!scene) return console.error("Unknown scene:", id);

  fadeOut(() => {
    preload(nextPossibleImages(scene));
    setBackground(scene.background);

    if (scene.title) {
      const h = el("h2", "scene-title", scene.title);
      content.appendChild(h);
    }

    const body = el("div", "narration");
    scene.text.forEach(p => prose(body, p));
    if (scene.conditionalText) prose(body, resolveConditional(scene.conditionalText));
    content.appendChild(body);

    renderTier2(scene.tier2);

    runtime = { scene: scene, skipped: [], answered: 0 };
    painting = true;
    advanceReactive(scene, 0);
    painting = false;
  });
}

/* ─────────────────────────────────────────── tier 2: inline accordions */

function renderTier2(list) {
  if (!list || !list.length) return;

  const wrap = el("div", "tier2");
  const heading = el("p", "tier2-heading", "Examine");
  wrap.appendChild(heading);

  list.forEach(item => {
    const row = el("div", "tier2-item");

    const btn = el("button", "tier2-label");
    btn.type = "button";
    btn.appendChild(el("span", "tier2-marker", "◆"));
    btn.appendChild(el("span", "tier2-text", item.label));

    const panel = el("div", "tier2-panel");
    panel.hidden = true;

    btn.addEventListener("click", () => {
      const opening = panel.hidden;
      if (opening && !panel.dataset.built) {
        buildTier2Panel(panel, item);
        panel.dataset.built = "1";
      }
      panel.hidden = !opening;
      row.classList.toggle("open", opening);
      btn.setAttribute("aria-expanded", String(opening));
      if (opening) {
        const isNew = !examined.has(item.id);
        examined.add(item.id);
        btn.classList.add("seen");
        if (isNew) reconsiderGates();
      }
    });

    btn.setAttribute("aria-expanded", "false");
    row.appendChild(btn);
    row.appendChild(panel);
    wrap.appendChild(row);
  });

  content.appendChild(wrap);
}

function buildTier2Panel(panel, item) {
  if (item.image) {
    const img = el("img", "tier2-image");
    img.alt = item.label;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = "1";
      img.src = placeholderFor(item.image, "square");
      img.classList.add("is-placeholder");
    });
    img.src = item.image;
    panel.appendChild(img);
  }

  const body = item.conditionalText ? resolveConditional(item.conditionalText) : item.text;
  if (body) prose(panel, body);

  if (item.interaction) renderInteraction(panel, item.interaction);
}

/* ─────────────────────────────────────────── scene 1: name interaction */

function renderInteraction(panel, spec) {
  const box = el("div", "interaction");

  const field = document.createElement("input");
  field.type = "text";
  field.id = "carve-input";
  field.maxLength = spec.maxLength;
  field.placeholder = spec.placeholder;
  field.autocomplete = "off";
  field.spellcheck = false;

  const carve = el("button", "choice interaction-btn", spec.submitLabel);
  carve.type = "button";
  const decline = el("button", "choice interaction-btn", spec.declineLabel);
  decline.type = "button";

  const row = el("div", "interaction-row");
  row.appendChild(field);
  row.appendChild(carve);

  box.appendChild(row);
  box.appendChild(decline);
  panel.appendChild(box);

  function resolve(value, responseText) {
    flags[spec.flagKey] = value;
    box.remove();
    const res = el("div", "response");
    if (value) {
      const carved = el("p", "carved-name");
      carved.textContent = value; // textContent only — no injection surface.
      res.appendChild(carved);
    }
    prose(res, responseText);
    panel.appendChild(res);
  }

  carve.addEventListener("click", () => {
    const name = field.value.trim();
    if (!name) return field.focus();
    resolve(name, spec.submitResponse);
  });

  field.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); carve.click(); }
  });

  decline.addEventListener("click", () => resolve(null, spec.declineResponse));
}

/* ────────────────────────────────────────────────── reactive sequencing */

function gateOpen(block) {
  return !block.requiresExamined || block.requiresExamined.every(id => examined.has(id));
}

function advanceReactive(scene, i) {
  const blocks = scene.reactive || [];
  if (i >= blocks.length) return renderExit(scene);

  const block = blocks[i];
  if (!gateOpen(block)) {
    runtime.skipped.push(i);          // remember it, in case the player examines later
    return advanceReactive(scene, i + 1); // gate failed — skip silently
  }

  renderChoices(block, choice => {
    flags[block.flagKey] = choice.value;
    runtime.answered++;
    if (choice.response) {
      const res = el("div", "response");
      prose(res, choice.response);
      appendBlock(res);
    }
    advanceReactive(scene, i + 1);
  });
}

// A player who examines the sundial before answering anything should still get
// the gated choice. Re-running the chain is only lossless while nothing has
// been answered yet, so that is the one case we do it in — otherwise the gate
// stays shut and the flag keeps its default, exactly as the design intends.
function reconsiderGates() {
  if (!runtime || runtime.answered > 0 || !runtime.skipped.length) return;

  const blocks = runtime.scene.reactive || [];
  const reopened = runtime.skipped.filter(i => gateOpen(blocks[i]));
  if (!reopened.length) return;

  const anchor = content.querySelector(".tier2");
  if (!anchor) return;
  while (anchor.nextSibling) anchor.nextSibling.remove();

  runtime.skipped = [];
  painting = true;
  advanceReactive(runtime.scene, 0);
  painting = false;
}

function renderChoices(block, onPick, extraClass) {
  const wrap = el("div", "choices" + (extraClass ? " " + extraClass : ""));

  if (block.prompt) {
    const q = el("p", "prompt");
    q.innerHTML = block.prompt;
    wrap.appendChild(q);
  }

  block.options.forEach(opt => {
    const b = el("button", "choice");
    b.type = "button";
    const mark = el("span", "choice-mark", "❖");
    const body = el("span", "choice-body");
    body.innerHTML = opt.label;
    b.appendChild(mark);
    b.appendChild(body);
    b.addEventListener("click", () => {
      // Freeze the answered block in place so the reading order stays intact.
      wrap.querySelectorAll("button").forEach(x => { x.disabled = true; });
      wrap.classList.add("resolved");
      b.classList.add("picked");
      onPick(opt);
    });
    wrap.appendChild(b);
  });

  appendBlock(wrap);
}

/* ───────────────────────────────────────────────────────── scene exit */

function renderExit(scene) {
  if (scene.branch) {
    renderChoices(scene.branch, choice => {
      flags[scene.branch.flagKey] = choice.value;
      if (scene.closingText) {
        const res = el("div", "response closing");
        prose(res, scene.closingText);
        appendBlock(res);
      }
      renderContinue(() => advanceTo(choice.next));
    }, "branch" + (scene.branch.final ? " final" : ""));
  } else {
    renderContinue(() => advanceTo(scene.next));
  }
}

function renderContinue(onGo) {
  const wrap = el("div", "continue-wrap");
  const b = el("button", "continue", "Continue");
  b.type = "button";
  b.addEventListener("click", () => { b.disabled = true; onGo(); });
  wrap.appendChild(b);
  appendBlock(wrap);
}

function advanceTo(id) {
  currentSceneId = id;
  if (String(id).startsWith("ending-")) renderEnding(id);
  else renderScene(id);
}

/* ──────────────────────────────────────────────────────────── endings */

function lookup(block) {
  if (!block) return null;
  const row = block.table.find(r => block.keys.every(k => r.match[k] === flags[k]));
  if (!row) console.warn("Fallback fired:", block.keys, JSON.parse(JSON.stringify(flags)));
  return row ? row.text : (block.fallback || null);
}

function renderEnding(id) {
  const e = ENDINGS.find(x => x.id === id);
  if (!e) return console.error("Unknown ending:", id);

  const blocks = [
    e.baseOpening,
    lookup(e.conditionalMiddle),
    lookup(WITNESS_CALLBACK),
    e.manuscriptCallback
  ].filter(Boolean);

  fadeOut(() => {
    runtime = null;
    setBackground(e.background);
    document.body.classList.add("is-ending");

    const body = el("div", "narration ending-text");
    blocks.forEach(b => prose(body, b));
    appendClosing(body, e.closing);
    content.appendChild(body);

    const label = el("p", "ending-label", e.title);
    content.appendChild(label);

    const wrap = el("div", "continue-wrap");
    const again = el("button", "continue", "Begin again");
    again.type = "button";
    again.addEventListener("click", () => window.location.reload());
    wrap.appendChild(again);
    content.appendChild(wrap);
  });
}

// {player_name} is inserted as a text node, never as markup, and never renders
// as null/undefined/an empty gap.
function appendClosing(node, closing) {
  const name = (flags.player_name || "").trim() || "a name";
  String(closing).split(/\n{2,}/).forEach(part => {
    const p = document.createElement("p");
    const chunks = part.split("{player_name}");
    chunks.forEach((chunk, i) => {
      const span = document.createElement("span");
      span.innerHTML = chunk.replace(/\n/g, "<br>");
      p.appendChild(span);
      if (i < chunks.length - 1) {
        const n = el("span", "player-name");
        n.textContent = name;
        p.appendChild(n);
      }
    });
    node.appendChild(p);
  });
}

/* ──────────────────────────────────────────────────────── dev shortcut */
// ?debug=ending-a&looked_away=true&witness_reaction=reached
// ?debug=scene-4 also works. Strip or gate before release.

function applyDebug() {
  const q = new URLSearchParams(window.location.search);
  const target = q.get("debug");
  if (!target) return null;

  q.forEach((v, k) => {
    if (k === "debug") return;
    if (k === "examined") { v.split(",").forEach(x => examined.add(x.trim())); return; }
    if (!(k in flags)) return;
    flags[k] = v === "true" ? true : v === "false" ? false : v;
  });
  console.warn("DEBUG jump:", target, flags);
  return target;
}

/* ──────────────────────────────────────────────────────────────── boot */

function startGame() {
  document.body.classList.add("playing");
  const jump = applyDebug();
  advanceTo(jump || "scene-1");
}

window.addEventListener("DOMContentLoaded", () => {
  const begin = document.getElementById("begin");
  const title = document.getElementById("title-screen");

  const enter = () => {
    title.classList.add("gone");
    setTimeout(() => { title.hidden = true; startGame(); }, 700);
  };

  begin.addEventListener("click", enter);
  if (new URLSearchParams(window.location.search).has("debug")) enter();
});
