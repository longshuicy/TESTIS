// TESTIS — the tally wall.
//
// A record of every plate the game can show, in story order, with the ones you
// actually witnessed inked in and the rest left as marks scratched on the wall.
// No narrative content lives in this file; captions are derived from SCENES /
// ENDINGS and the wall's own words come from wall.js.
//
// Two constraints shape the whole thing:
//
//   MEMORY. A decoded bitmap costs width x height x 4 bytes regardless of
//   format, so a grid of 33 shipped plates would hold ~110MB at once — the
//   same failure the examine panels had before the downscale (see
//   scripts/optimize_images.sh). The wall therefore renders a separate 400px
//   thumbnail tier, lazily, and un-inked cells request no image at all: they
//   are inline SVG. The lightbox is the only place a full-size asset is ever
//   fetched, and it drops the node on close so decodes never accumulate.
//
//   NO PERSISTENCE. Nothing is stored between loads — a stated constraint of
//   the game, and one the title screen makes a promise about. The wall is
//   therefore session-only: it counts what this run witnessed and forgets it
//   on refresh. Reached cold from the title screen it is entirely un-inked,
//   which spoils nothing and is its own kind of invitation.

const Gallery = (function () {

  /* ─────────────────────────────────────────────────── what has been seen */

  // Filled by Gallery.saw(), called from main.js at the three places an image
  // is actually put on screen: the background stack, the tier-2 examine frame,
  // and the plate. Recording at the display sites rather than mapping scene
  // ids keeps this honest — a plate the player never reached cannot sneak in.
  const seen = new Set();

  // Set by ?all — reveals the whole wall without pretending it was witnessed.
  let revealAll = false;

  function idOf(src) {
    return String(src || "").split("/").pop().replace(/\.[a-z0-9]+$/i, "");
  }

  function saw(src) {
    const id = idOf(src);
    if (id) seen.add(id);
  }

  function has(id) {
    return revealAll || seen.has(id);
  }

  /* ───────────────────────────────────────────────────────── the catalogue */

  // Every image the game can put on screen, in the order it could be met,
  // paired with the words the game already uses for it. Built once, lazily.
  let cache = null;

  function catalogue() {
    if (cache) return cache;

    const out = [];
    const byId = new Map();

    function add(src, caption) {
      if (!src) return;
      const id = idOf(src);
      if (!id || byId.has(id)) return;   // obj-water-clock is examined twice
      const entry = { id: id, src: src, caption: caption || "" };
      byId.set(id, entry);
      out.push(entry);
    }

    (typeof SCENES !== "undefined" ? SCENES : []).forEach(scene => {
      add(scene.background, scene.title);
      if (scene.openingPlate) add(plateImage(scene.openingPlate), scene.title);
      (scene.tier2 || []).forEach(item => add(item.image, item.label));
      if (scene.closingPlate) add(plateImage(scene.closingPlate), scene.title);
    });

    (typeof ENDINGS !== "undefined" ? ENDINGS : []).forEach(ending => {
      add(ending.background, ending.title);
    });

    cache = out;
    return out;
  }

  // normalizePlate lives in main.js and loads after this file; a plate spec is
  // either a path or { image, ... }, so read it directly rather than reaching
  // across load order for one field.
  function plateImage(spec) {
    return typeof spec === "string" ? spec : (spec && spec.image);
  }

  function registerOf(id) {
    return WALL.registers.find(r => r.prefix.some(p => id.indexOf(p) === 0)) || null;
  }

  function thumbFor(src) {
    return src.replace(/([^/]+)$/, "thumbs/$1");
  }

  /* ──────────────────────────────────────────────────────────── the marks */

  // Deterministic per-cell, so a given plate always wears the same scratches
  // and the wall looks kept by a hand rather than tiled by a machine.
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h;
  }

  // `groups` scales with the cell: a wide 16:9 cell holding one small cluster
  // reads as a broken image, so it gets a longer run and squares get one.
  function marksSVG(id, groups) {
    const h = hash(id);
    const runs = [];
    let total = 0;
    // Unsigned shifts throughout: `>>` is signed, so any hash above 2^31 comes
    // back negative, `% 5` yields a negative remainder, and the cell draws no
    // marks at all inside a negative-width viewBox.
    for (let g = 0; g < groups; g++) {
      const n = 1 + ((h >>> (g * 4)) % 5);
      runs.push(n);
      total += n === 5 ? 4 : n;
    }

    const step = 11;
    const gap = 14;
    const width = (total - 1) * step + (groups - 1) * gap + 20;
    let x = 10;
    let out = '<svg viewBox="0 0 ' + width + ' 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';

    runs.forEach((n, g) => {
      const full = n === 5;
      const bars = full ? 4 : n;
      const start = x;
      for (let i = 0; i < bars; i++) {
        const jx = (((h >>> (i * 3 + g)) % 7) - 3) * 0.35;
        const jt = (((h >>> (i * 5 + g)) % 5) - 2) * 0.5;
        const cx = x + jx;
        out += '<line x1="' + (cx + jt).toFixed(2) + '" y1="32" x2="' +
               (cx - jt).toFixed(2) + '" y2="68"/>';
        x += step;
      }
      if (full) {
        out += '<line x1="' + (start - 4) + '" y1="70" x2="' +
               (x - step + 4) + '" y2="30"/>';
      }
      x += gap;
    });

    return out + "</svg>";
  }

  const ROMAN = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
                 [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];

  function roman(n) {
    let out = "";
    for (const [v, s] of ROMAN) while (n >= v) { out += s; n -= v; }
    return out;
  }

  /* ───────────────────────────────────────────────────────────── rendering */

  function build() {
    const items = catalogue();
    const total = items.length;
    const got = items.filter(i => has(i.id)).length;

    const wall = document.createElement("div");
    wall.className = "wall";

    const head = document.createElement("div");
    head.className = "wall-head";
    head.innerHTML =
      '<h2>' + esc(WALL.heading) + '</h2>' +
      '<p class="wall-count">' + (got ? roman(got) : "&mdash;") +
      '<span class="of"> / ' + roman(total) + '</span></p>' +
      '<div class="wall-rule"></div>';
    wall.appendChild(head);

    let plate = 0;

    WALL.registers.forEach(reg => {
      const mine = items.filter(i => registerOf(i.id) === reg);
      if (!mine.length) return;

      const section = document.createElement("section");
      section.className = "wall-register";

      const h3 = document.createElement("h3");
      h3.innerHTML = esc(reg.numeral + ". " + reg.label) +
        '<span class="wall-of">' + mine.filter(i => has(i.id)).length +
        " of " + mine.length + "</span>";
      section.appendChild(h3);

      const grid = document.createElement("div");
      grid.className = "wall-grid " + slug(reg.label);
      const groups = slug(reg.label) === "the-rooms" ? 3 : 1;

      mine.forEach(item => {
        plate++;
        grid.appendChild(has(item.id) ? inked(item, plate) : scratched(item, groups));
      });

      section.appendChild(grid);
      wall.appendChild(section);
    });

    const foot = document.createElement("p");
    foot.className = "wall-foot";
    foot.innerHTML = WALL.credit.map(esc).join("<br>");
    wall.appendChild(foot);

    return wall;
  }

  function inked(item, plate) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "wall-cell seen";
    cell.dataset.src = item.src;
    cell.dataset.caption = item.caption;
    cell.dataset.plate = WALL.plateWord + " " + roman(plate);

    const img = document.createElement("img");
    img.alt = item.caption;
    img.loading = "lazy";
    img.decoding = "async";
    // The thumbnail tier is generated by scripts/optimize_images.sh. If it has
    // not been run, fall back to the shipped plate rather than showing a hole.
    img.addEventListener("error", () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = "1";
      img.src = item.src;
    });
    img.src = thumbFor(item.src);
    cell.appendChild(img);

    const label = document.createElement("span");
    label.className = "wall-plate";
    label.innerHTML = '<span class="num">' + esc(cell.dataset.plate) + '</span>' +
                      '<span class="name">' + esc(item.caption) + '</span>';
    cell.appendChild(label);

    return cell;
  }

  function scratched(item, groups) {
    const cell = document.createElement("div");
    cell.className = "wall-cell unseen";
    cell.innerHTML = marksSVG(item.id, groups) +
      '<span class="wall-veil">' + esc(WALL.unseen) + '</span>';
    return cell;
  }

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = String(s == null ? "" : s);
    return d.innerHTML;
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  /* ───────────────────────────────────────────────────────────── lightbox */

  let box = null;

  function openPlate(cell) {
    closePlate();
    box = document.createElement("div");
    box.className = "wall-box";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", cell.dataset.caption || "Plate");
    box.tabIndex = -1;

    const fig = document.createElement("div");
    fig.className = "wall-box-figure";
    const img = document.createElement("img");
    img.src = cell.dataset.src;                 // full size, one at a time
    img.alt = cell.dataset.caption;
    fig.appendChild(img);

    const cap = document.createElement("p");
    cap.className = "wall-box-caption";
    cap.innerHTML = '<span class="num">' + esc(cell.dataset.plate) + '</span>' +
                    esc(cell.dataset.caption);
    fig.appendChild(cap);

    box.appendChild(fig);
    box.addEventListener("click", closePlate);
    document.body.appendChild(box);
    document.body.classList.add("wall-box-open");
    void box.offsetHeight;
    box.classList.add("visible");
    box.focus();
  }

  // Removing the node is the point, not just hiding it: it is what releases
  // the full-size decode.
  function closePlate() {
    if (!box) return;
    box.remove();
    box = null;
    document.body.classList.remove("wall-box-open");
  }

  document.addEventListener("click", e => {
    const cell = e.target.closest && e.target.closest(".wall-cell.seen");
    if (cell) openPlate(cell);
  });

  document.addEventListener("keydown", e => {
    if (box && (e.key === "Escape" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      closePlate();
    }
  });

  /* ─────────────────────────────────────────────────────────────── public */

  // The wall takes over the screen entirely — its own black page, arrived at
  // from an ending. It is not a separate document: nothing is persisted, so the
  // count only exists inside the run that earned it and cannot survive a
  // navigation. `final` is the ending's arrival, which offers "begin again" and
  // no way back; without it (?all) the wall is a dismissable overlay instead.
  let overlay = null;

  function open(opts) {
    if (overlay) return;
    const final = !!(opts && opts.final);

    overlay = document.createElement("div");
    overlay.className = "wall-overlay" + (final ? " is-final" : "");

    if (!final) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "wall-close";
      close.setAttribute("aria-label", "Close");
      close.innerHTML = "&times;";
      close.addEventListener("click", dismiss);
      overlay.appendChild(close);
    }

    overlay.appendChild(build());

    if (final) {
      const wrap = document.createElement("div");
      wrap.className = "continue-wrap wall-again";
      const again = document.createElement("button");
      again.type = "button";
      again.className = "continue";
      again.textContent = WALL.again;
      again.addEventListener("click", () => window.location.reload());
      wrap.appendChild(again);
      overlay.appendChild(wrap);
    }

    document.body.appendChild(overlay);
    document.body.classList.add("wall-open");
    void overlay.offsetHeight;
    overlay.classList.add("visible");
    overlay.scrollTop = 0;
    (overlay.querySelector(".wall-close, .continue") || overlay).focus();
    if (!final) document.addEventListener("keydown", onOverlayKey);
  }

  function onOverlayKey(e) {
    if (e.key === "Escape" && !box) dismiss();
  }

  function dismiss() {
    if (!overlay) return;
    closePlate();
    document.removeEventListener("keydown", onOverlayKey);
    overlay.classList.remove("visible");
    document.body.classList.remove("wall-open");
    const dying = overlay;
    overlay = null;
    setTimeout(() => dying.remove(), 400);
  }

  function setRevealAll(v) { revealAll = !!v; }

  return {
    saw: saw,
    open: open,
    close: dismiss,
    setRevealAll: setRevealAll,
    count: () => catalogue().filter(i => has(i.id)).length,
    total: () => catalogue().length
  };
})();
