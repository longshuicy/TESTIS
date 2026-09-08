// SUPERSTES — the locale registry.
//
// English is the source language and lives where it always has: as literals in
// index.html and in this file's UI table. A translation is a *content pack* —
// one generated file (js/content-<lang>.js) that calls I18N.register() with a
// full set of chapter data plus a UI table. Nothing else in the engine changes
// shape; chapters.js picks between the English globals and the pack's, and the
// handful of strings main.js/gallery.js/audio.js build themselves come from
// I18N.ui() instead of being inlined.
//
// Translations are hand-edited as pure JSON under content/<lang>/ and wrapped
// into js/content-<lang>.js by scripts/build_content.py. The JSON is the master;
// the generated .js is the committed artifact, the same bargain the art and
// audio pipelines make (see CLAUDE.md, "Known intentional deviations").
//
// Language is chosen with ?lang= and nothing else. There is no persistence in
// this game by design (tech doc §1), so the URL is the whole of the state, and
// switching languages reloads rather than re-rendering: the title screen is the
// only place the toggle appears, so a reload costs nothing that was not about
// to be thrown away anyway.
//
// No narrative content lives here. Copy belongs to the chapters' data files and
// to content/<lang>/.

const I18N = (function () {

  // The source-language UI table. Only strings the *engine* composes live here;
  // everything the title screen says is inline in index.html, marked up with
  // data-i18n so a pack can override it.
  const UI_EN = {
    examine: "Examine",
    continue: "Continue",
    close: "Close",
    plate: "Plate",
    unnamedPlayer: "a name",
    // Per-register tally on the wall: {n} inked of {total} in that register.
    registerCount: "{n} of {total}",
    soundOn: "Sound on",
    soundOff: "Sound off",
    calendarTitle: "Maius · MDXLIII",
    calendarWeekdays: ["S", "M", "T", "W", "T", "F", "S"]
  };

  const packs = {
    en: { lang: "en", htmlLang: "en", toggleLabel: "中文", toggleAria: "切换到中文", ui: UI_EN, title: null, content: null }
  };

  let active = "en";

  function register(pack) {
    if (!pack || !pack.lang) {
      console.error("I18N.register: pack has no lang");
      return;
    }
    packs[pack.lang] = pack;
  }

  // ?lang=zh, falling back to English for anything unregistered. Read once at
  // boot; every later reader goes through lang().
  function resolve() {
    const wanted = new URLSearchParams(window.location.search).get("lang");
    active = (wanted && packs[wanted]) ? wanted : "en";
    return active;
  }

  function lang() { return active; }
  function pack() { return packs[active]; }

  // One UI string, falling back to English whenever a pack omits a key — a
  // half-translated pack degrades to mixed language rather than to "undefined".
  function ui(key) {
    const p = packs[active];
    const v = p && p.ui ? p.ui[key] : undefined;
    return v === undefined ? UI_EN[key] : v;
  }

  // Chapter data: the pack's copy when it has one, the English global otherwise.
  // Called from chapters.js with the two globals already resolved, so a missing
  // content pack simply plays in English.
  function content(key, fallback) {
    const p = packs[active];
    const v = p && p.content ? p.content[key] : undefined;
    return v === undefined || v === null ? fallback : v;
  }

  // Rewrites the title screen in place. English is the markup, so this is a
  // no-op in English and never has to hold a second copy of it.
  //
  // data-i18n="title.begin" sets textContent; data-i18n-html="title.latin"
  // sets innerHTML, for the lines that carry <em>. Both take their value from
  // the pack's `title` block; blurb lines are indexed (title.blurb.3).
  function applyStatic() {
    const p = packs[active];
    document.documentElement.lang = (p && p.htmlLang) || "en";
    document.body.dataset.lang = active;
    if (!p || !p.title) return;

    const value = path => path.split(".").reduce(
      (o, k) => (o == null ? undefined : o[k]), p.title
    );

    document.querySelectorAll("[data-i18n]").forEach(node => {
      const v = value(node.dataset.i18n);
      if (typeof v === "string") node.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(node => {
      const v = value(node.dataset.i18nHtml);
      if (typeof v === "string") node.innerHTML = v;  // our own content, not input
    });

    if (typeof p.title.docTitle === "string") document.title = p.title.docTitle;
    if (typeof p.title.metaDescription === "string") {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", p.title.metaDescription);
    }
  }

  // The toggle names the language you would be switching *to*, and only ever
  // offers the two: English and whichever pack is registered. With no pack
  // loaded there is nothing to offer, so the button stays hidden.
  function otherLang() {
    const others = Object.keys(packs).filter(k => k !== active);
    return others.length ? others[0] : null;
  }

  // Preserves every other query param, so ?debug= and ?all survive a switch.
  function urlFor(target) {
    const q = new URLSearchParams(window.location.search);
    if (target === "en") q.delete("lang"); else q.set("lang", target);
    const s = q.toString();
    return window.location.pathname + (s ? "?" + s : "") + window.location.hash;
  }

  // Each pack carries the label to show *while it is active* — the English
  // entry says "中文", the Chinese pack says "English" — so the button never
  // has to reason about which direction it is pointing.
  function mountToggle(btn) {
    if (!btn) return;
    const target = otherLang();
    if (!target) { btn.hidden = true; return; }
    const here = packs[active];
    btn.textContent = (here && here.toggleLabel) || target;
    btn.setAttribute("aria-label", (here && here.toggleAria) || target);
    btn.hidden = false;
    btn.addEventListener("click", () => { window.location.href = urlFor(target); });
  }

  return { register, resolve, lang, pack, ui, content, applyStatic, mountToggle };
})();
