/* =====================================================================
      my_cpp_journey.exe — built almost entirely in JavaScript.
      The HTML above is just a shell: <head><title></title></head><body>.
      Everything else — fonts, icon font, CSS, and every DOM node on the
      page — is created and injected right here in JS.
      ===================================================================== */

(function () {
    "use strict";

    /* ---------------------------------------------------------------
       0. EXTERNAL RESOURCES (fonts + icon font), loaded via JS
    --------------------------------------------------------------- */
    function loadLink(rel, href, extra) {
        const l = document.createElement("link");
        l.rel = rel;
        l.href = href;
        if (extra) Object.assign(l, extra);
        document.head.appendChild(l);
        return l;
    }
    loadLink("preconnect", "https://fonts.googleapis.com");
    loadLink("stylesheet", "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap");
    loadLink("stylesheet", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

    /* ---------------------------------------------------------------
       1. DATA (topics, note links, config)
    --------------------------------------------------------------- */
    const VIDEO_ID = "-TkoO8Z07hI";
    const START_SECONDS = 924;

    // Fill these in, in the same order as `topics` below.
    // "" or "#" = not done yet. A real URL / relative path = done.
    const noteLinks = [
        "", "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", ""
    ];

    const topics = [
        "Tutorial", "Variables and basic data types", "Const", "Namespaces", "Typedef and type aliases",
        "Arithmetic operators", "Type conversion", "User input", "Useful math related functions", "Hypotenuse calculator practice program",
        "If statements", "Switches", "Console calculator program", "Ternary operator", "Logical operators",
        "Temperature conversion program", "Useful string methods in C++", "While loops", "Do while loops", "For loops",
        "Break and continue", "Nested loops", "Random number generator", "Random event generator", "Number guessing game",
        "User defined functions", "Return keyword", "Overloaded functions", "Variable scope", "Banking practice program",
        "Rock paper scissors game", "Arrays", "Sizeof() operator", "Iterate over an array", "Foreach loop",
        "Pass array to a function", "Search an array for an element", "Sort an array", "Fill() function", "Fill an array with user input",
        "Multidimensional arrays", "Quiz game", "Memory addresses", "Pass by value vs pass by reference", "Const parameters",
        "Credit card validator program", "Pointers", "Null pointers", "Tic tac toe game", "Dynamic memory",
        "Recursion", "Function templates", "Structs", "Pass structs as arguments", "Enums",
        "Object oriented programming", "Constructors", "Constructor overloading", "Getters and setters", "Inheritance"
    ];

    const doneState = new Array(topics.length).fill(false);

    /* ---------------------------------------------------------------
       2. STYLES — one big CSS string, injected as a <style> tag
    --------------------------------------------------------------- */
    const CSS = `
  :root{
    --bg: #0e0f17; --bg-soft:#12141e; --panel:#171a27; --panel-2:#1c2032; --panel-3:#232840;
    --border:#2a2f45; --text:#e9e8f2; --text-dim:#9195ac; --text-dimmer:#666b85;
    --amber:#ffb454; --amber-soft:rgba(255,180,84,.12); --teal:#5fd8c4; --teal-soft:rgba(95,216,196,.12);
    --pink:#ff7597; --mono:'JetBrains Mono',monospace; --sans:'Inter',sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background:
      radial-gradient(ellipse 900px 500px at 15% -10%, rgba(255,180,84,.09), transparent),
      radial-gradient(ellipse 900px 600px at 90% 10%, rgba(95,216,196,.07), transparent),
      var(--bg);
    color:var(--text); font-family:var(--sans); line-height:1.6; min-height:100vh; overflow-x:hidden;
  }
  a{color:inherit;text-decoration:none;}
  ::selection{background:var(--amber);color:#1a1300;}
  .reveal{opacity:0;transform:translateY(20px);animation:fadeInUp .7s ease forwards;}
  @keyframes fadeInUp{to{opacity:1;transform:translateY(0);}}
  section.reveal:nth-of-type(1){animation-delay:.05s;}
  section.reveal:nth-of-type(2){animation-delay:.1s;}
  section.reveal:nth-of-type(3){animation-delay:.15s;}
  .titlebar{display:flex;align-items:center;gap:10px;padding:10px 18px;background:rgba(18,20,30,.85);
    backdrop-filter:blur(10px);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;}
  .dots{display:flex;gap:7px;margin-right:6px;}
  .dot{width:11px;height:11px;border-radius:50%;}
  .dot.red{background:#ff5f56;} .dot.yellow{background:#ffbd2e;} .dot.green{background:#27c93f;}
  .filename{font-family:var(--mono);font-size:12.5px;color:var(--text-dim);background:var(--panel);
    padding:5px 12px;border-radius:6px 6px 0 0;border:1px solid var(--border);border-bottom:none;
    display:flex;align-items:center;gap:7px;}
  .titlebar nav{margin-left:auto;display:flex;gap:2px;}
  .titlebar nav a{font-family:var(--mono);font-size:12.5px;color:var(--text-dim);padding:7px 13px;
    border-radius:6px;transition:.15s;display:flex;align-items:center;gap:7px;}
  .titlebar nav a:hover{color:var(--amber);background:var(--amber-soft);}
  .titlebar nav a i{font-size:11px;}
  section{padding:88px 20px;max-width:1000px;margin:0 auto;}
  .hero{padding-top:120px;}
  .eyebrow{font-family:var(--mono);font-size:13px;color:var(--teal);letter-spacing:.06em;margin-bottom:18px;
    display:flex;align-items:center;gap:9px;}
  .eyebrow i{font-size:12px;}
  h1{font-family:var(--mono);font-weight:800;letter-spacing:-0.01em;font-size:clamp(30px,5.2vw,54px);
    line-height:1.15;color:var(--text);}
  h1 .brace{color:var(--amber);}
  .cursor{display:inline-block;width:.5ch;background:var(--amber);animation:blink 1s steps(1) infinite;margin-left:4px;}
  @keyframes blink{50%{opacity:0;}}
  .hero p.sub{margin-top:18px;max-width:580px;color:var(--text-dim);font-size:16px;}
  .hero p.sub b{color:var(--text);font-weight:600;}
  .hero-stats{display:flex;gap:28px;margin-top:38px;flex-wrap:wrap;}
  .hstat{font-family:var(--mono);}
  .hstat .n{font-size:26px;font-weight:800;color:var(--amber);display:flex;align-items:center;gap:8px;}
  .hstat .l{font-size:11.5px;color:var(--text-dimmer);margin-top:4px;letter-spacing:.04em;}
  .sec-head{display:flex;align-items:center;gap:12px;margin-bottom:28px;}
  .sec-icon{width:38px;height:38px;border-radius:9px;background:var(--panel);border:1px solid var(--border);
    display:flex;align-items:center;justify-content:center;color:var(--amber);font-size:15px;flex:none;}
  .sec-tag{font-family:var(--mono);font-size:12px;color:var(--text-dimmer);border:1px solid var(--border);
    padding:3px 9px;border-radius:5px;}
  .sec-head h2{font-family:var(--mono);font-size:22px;font-weight:700;color:var(--text);}
  .sec-head .sec-sub{margin-left:auto;font-family:var(--mono);font-size:12px;color:var(--text-dimmer);}
  .editor-panel{background:var(--panel);border:1px solid var(--border);border-radius:14px;overflow:hidden;
    box-shadow:0 20px 60px -20px rgba(0,0,0,.6);}
  .editor-tab{display:flex;align-items:center;gap:8px;background:var(--panel-2);padding:11px 18px;
    border-bottom:1px solid var(--border);font-family:var(--mono);font-size:12.5px;color:var(--text-dim);}
  .editor-tab i{color:var(--pink);font-size:9px;}
  .editor-tab .badge{margin-left:auto;font-size:10.5px;background:var(--teal-soft);color:var(--teal);
    padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:5px;}
  .player-shell{position:relative;width:100%;aspect-ratio:16/9;background:#000;}
  .player-shell #ytPlayer{position:absolute;inset:0;width:100%;height:100%;}
  .player-shell .click-shield{position:absolute;inset:0;z-index:5;cursor:pointer;}
  .loader-overlay{position:absolute;inset:0;z-index:20;background:#000;display:flex;align-items:center;
    justify-content:center;flex-direction:column;gap:14px;transition:opacity .4s ease,visibility .4s ease;}
  .loader-overlay.hidden{opacity:0;visibility:hidden;pointer-events:none;}
  .spinner{width:38px;height:38px;border-radius:50%;border:3px solid var(--panel-3);border-top-color:var(--amber);
    animation:spin .8s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .loader-overlay span{font-family:var(--mono);font-size:12px;color:var(--text-dimmer);}
  .center-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(1);width:76px;height:76px;
    border-radius:50%;z-index:10;background:rgba(255,180,84,.92);color:#1a1300;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-size:26px;
    box-shadow:0 0 0 10px rgba(255,180,84,.08),0 10px 40px rgba(0,0,0,.4);transition:.25s ease;opacity:1;}
  .center-play:hover{transform:translate(-50%,-50%) scale(1.08);background:#ffc576;}
  .center-play.playing{opacity:0;pointer-events:none;transform:translate(-50%,-50%) scale(0.7);}
  .center-play i{margin-left:3px;}
  .center-play.is-pause i{margin-left:0;}
  .controls{display:flex;align-items:center;gap:10px;padding:12px 16px;
    background:linear-gradient(180deg,var(--panel-2),var(--bg-soft));border-top:1px solid var(--border);flex-wrap:wrap;}
  .ctrl-btn{background:var(--bg-soft);border:1px solid var(--border);color:var(--text);width:36px;height:36px;
    border-radius:9px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;
    transition:.15s;flex:none;}
  .ctrl-btn:hover{border-color:var(--amber);color:var(--amber);transform:translateY(-1px);}
  .ctrl-btn.play{background:var(--amber);color:#1a1300;border-color:var(--amber);width:40px;height:40px;}
  .ctrl-btn.play:hover{background:#ffc576;color:#1a1300;}
  .seek-wrap{flex:1 1 220px;display:flex;align-items:center;gap:10px;min-width:170px;}
  .time{font-family:var(--mono);font-size:11.5px;color:var(--text-dimmer);white-space:nowrap;}
  .seek-track{position:relative;flex:1;height:6px;border-radius:4px;background:var(--bg-soft);
    border:1px solid var(--border);cursor:pointer;overflow:hidden;}
  .seek-buffer{position:absolute;top:0;left:0;height:100%;background:var(--panel-3);width:0%;}
  .seek-fill{position:absolute;top:0;left:0;height:100%;background:linear-gradient(90deg,var(--teal),var(--amber));width:0%;}
  .seek-thumb{position:absolute;top:50%;width:13px;height:13px;border-radius:50%;background:var(--amber);
    border:2px solid #0e0f17;transform:translate(-50%,-50%);left:0%;box-shadow:0 0 0 3px rgba(255,180,84,.15);}
  .vol-wrap{display:flex;align-items:center;gap:6px;flex:none;position:relative;}
  .vol-track{width:0;overflow:hidden;transition:width .18s ease;display:flex;align-items:center;}
  .vol-wrap:hover .vol-track,.vol-wrap.active .vol-track{width:80px;}
  .vol-track input[type="range"]{width:70px;margin-left:8px;}
  input[type="range"]{-webkit-appearance:none;appearance:none;height:4px;border-radius:4px;
    background:var(--panel-3);outline:none;border:none;}
  input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;
    background:var(--amber);cursor:pointer;border:2px solid var(--bg-soft);}
  input[type="range"]::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background:var(--amber);
    cursor:pointer;border:2px solid var(--bg-soft);}
  .speed-select{font-family:var(--mono);font-size:12px;background:var(--bg-soft);color:var(--text-dim);
    border:1px solid var(--border);border-radius:9px;padding:0 10px;height:36px;cursor:pointer;}
  .speed-select:hover{border-color:var(--teal);color:var(--teal);}
  .kbd-hint{font-family:var(--mono);font-size:11px;color:var(--text-dimmer);text-align:center;margin-top:12px;
    display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
  .kbd-hint kbd{background:var(--panel);border:1px solid var(--border);border-radius:5px;padding:1px 6px;
    font-size:10.5px;color:var(--text-dim);}
  .notes-intro{color:var(--text-dim);font-size:14px;margin-bottom:26px;max-width:660px;}
  .notes-intro code{background:var(--panel);border:1px solid var(--border);padding:1px 6px;border-radius:4px;
    color:var(--teal);font-size:12.5px;}
  .notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;}
  .note-card{font-family:var(--mono);text-align:left;background:var(--panel);border:1px solid var(--border);
    color:var(--text-dim);padding:14px 15px;border-radius:11px;cursor:pointer;position:relative;transition:.18s ease;
    display:flex;flex-direction:column;gap:9px;opacity:0;transform:translateY(14px) scale(.98);
    animation:cardIn .5s ease forwards;}
  @keyframes cardIn{to{opacity:1;transform:translateY(0) scale(1);}}
  .note-card:hover{border-color:var(--teal);transform:translateY(-3px);box-shadow:0 10px 26px -14px rgba(95,216,196,.35);}
  .note-card.done{border-color:var(--amber);background:var(--amber-soft);}
  .note-card.done:hover{box-shadow:0 10px 26px -14px rgba(255,180,84,.4);}
  .note-top{display:flex;align-items:center;justify-content:space-between;gap:8px;}
  .note-num{font-size:11px;font-weight:700;color:var(--teal);background:var(--teal-soft);padding:2px 8px;
    border-radius:20px;flex:none;}
  .note-card.done .note-num{color:var(--amber);background:rgba(255,180,84,.18);}
  .note-check{font-size:15px;color:var(--text-dimmer);transition:.15s;flex:none;}
  .note-card.done .note-check{color:var(--amber);}
  .note-title{font-size:12.8px;font-weight:600;color:var(--text);line-height:1.4;}
  .note-open-hint{font-size:10.5px;color:var(--text-dimmer);display:flex;align-items:center;gap:5px;}
  .note-open-hint i{font-size:9px;}
  .note-hint{font-family:var(--mono);font-size:11.5px;color:var(--text-dimmer);margin-top:20px;display:flex;
    gap:8px;align-items:flex-start;}
  .note-hint i{margin-top:2px;color:var(--teal);}
  .search-wrap{position:relative;margin-bottom:18px;max-width:340px;}
  .search-wrap i{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--text-dimmer);font-size:12px;}
  .search-input{width:100%;font-family:var(--mono);font-size:12.5px;color:var(--text);background:var(--panel);
    border:1px solid var(--border);border-radius:9px;padding:9px 12px 9px 32px;outline:none;transition:.15s;}
  .search-input:focus{border-color:var(--teal);}
  .search-input::placeholder{color:var(--text-dimmer);}
  .progress-wrap{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:30px;
    display:flex;gap:36px;align-items:center;flex-wrap:wrap;box-shadow:0 20px 60px -30px rgba(0,0,0,.6);}
  .chart-box{position:relative;width:200px;height:200px;flex:none;margin:0 auto;}
  .chart-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
    font-family:var(--mono);pointer-events:none;}
  .chart-center .pct{font-size:32px;font-weight:800;color:var(--text);}
  .chart-center .lbl{font-size:11px;color:var(--text-dimmer);margin-top:2px;}
  .progress-stats{flex:1;min-width:220px;display:flex;flex-direction:column;gap:14px;}
  .pstat-row{display:flex;align-items:center;gap:12px;font-family:var(--mono);font-size:13.5px;}
  .pdot{width:11px;height:11px;border-radius:3px;flex:none;}
  .pdot.done{background:var(--teal);}
  .pdot.remain{background:var(--panel-3);border:1px solid var(--border);}
  .pstat-row .val{margin-left:auto;color:var(--text-dimmer);}
  .pstat-row .val b{color:var(--text);}
  .pstat-hint{margin-top:4px;font-family:var(--mono);font-size:11.5px;color:var(--text-dimmer);
    display:flex;gap:8px;align-items:flex-start;line-height:1.6;}
  .pstat-hint i{margin-top:2px;color:var(--teal);flex:none;}
  .pstat-hint code{background:var(--bg-soft);border:1px solid var(--border);padding:1px 5px;border-radius:4px;
    color:var(--amber);font-size:11px;}
  .streak-row{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}
  .streak-chip{font-family:var(--mono);font-size:11.5px;color:var(--text-dim);background:var(--bg-soft);
    border:1px solid var(--border);padding:6px 12px;border-radius:20px;display:flex;align-items:center;gap:7px;}
  .streak-chip i{color:var(--pink);}
  footer{text-align:center;padding:50px 20px 70px;font-family:var(--mono);font-size:12px;color:var(--text-dimmer);
    display:flex;align-items:center;justify-content:center;gap:8px;}
  footer i{color:var(--pink);}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--panel);
    border:1px solid var(--teal);color:var(--text);font-family:var(--mono);font-size:12.5px;padding:11px 18px;
    border-radius:10px;box-shadow:0 14px 40px -14px rgba(0,0,0,.6);opacity:0;pointer-events:none;
    transition:.25s ease;z-index:300;display:flex;align-items:center;gap:8px;}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
  .toast i{color:var(--teal);}
  @media (max-width:600px){
    section{padding:60px 16px;}
    .titlebar nav{display:none;}
    .progress-wrap{flex-direction:column;}
    .center-play{width:60px;height:60px;font-size:20px;}
  }
  `;

    function injectStyles(css) {
        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
    }
    injectStyles(CSS);

    /* ---------------------------------------------------------------
       3. DOM BUILDING HELPERS
    --------------------------------------------------------------- */
    function el(tag, opts = {}, children = []) {
        const node = document.createElement(tag);
        if (opts.class) node.className = opts.class;
        if (opts.id) node.id = opts.id;
        if (opts.html !== undefined) node.innerHTML = opts.html;
        if (opts.text !== undefined) node.textContent = opts.text;
        if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
        if (opts.style) Object.assign(node.style, opts.style);
        if (opts.on) Object.entries(opts.on).forEach(([evt, fn]) => node.addEventListener(evt, fn));
        children.forEach(c => c && node.appendChild(c));
        return node;
    }
    const icon = (name, extraClass = "") => `<i class="fa-solid ${name} ${extraClass}"></i>`;

    /* ---------------------------------------------------------------
       4. TITLEBAR
    --------------------------------------------------------------- */
    function buildTitlebar() {
        const dots = el("div", { class: "dots" }, [
            el("span", { class: "dot red" }),
            el("span", { class: "dot yellow" }),
            el("span", { class: "dot green" })
        ]);
        const filename = el("span", { class: "filename", html: `${icon("fa-code")}my_cpp_journey.html` });

        const navLinks = [
            ["#home", "fa-house", "home"],
            ["#video", "fa-play", "video"],
            ["#notes", "fa-book", "notes"],
            ["#progress", "fa-chart-pie", "progress"]
        ].map(([href, ic, label]) =>
            el("a", { attrs: { href }, html: `${icon(ic)}${label}` })
        );
        const nav = el("nav", {}, navLinks);

        return el("div", { class: "titlebar" }, [dots, filename, nav]);
    }

    /* ---------------------------------------------------------------
       5. HERO
    --------------------------------------------------------------- */
    function buildHero() {
        const eyebrow = el("div", { class: "eyebrow reveal", html: `${icon("fa-terminal")}personal learning log` });
        const h1 = el("h1", {
            class: "reveal",
            html: `<span class="brace">&lt;</span>Learning C++<span class="brace">/&gt;</span><span class="cursor">&nbsp;</span>`
        });
        const sub = el("p", {
            class: "sub reveal",
            html: `Following <b>Bro Code's</b> full C++ course on YouTube. Professional player, ${topics.length} tracked notes, and a live progress chart — all in one page.`
        });

        const stats = [
            ["fa-list-check", String(topics.length), "TOPICS TO COVER"],
            ["fa-clapperboard", "1", "FULL COURSE VIDEO"],
            ["fa-chart-pie", "LIVE", "PROGRESS TRACKING"]
        ].map(([ic, n, l]) =>
            el("div", { class: "hstat" }, [
                el("div", { class: "n", html: `${icon(ic)}${n}` }),
                el("div", { class: "l", text: l })
            ])
        );
        const heroStats = el("div", { class: "hero-stats reveal" }, stats);

        return el("section", { class: "hero", id: "home" }, [eyebrow, h1, sub, heroStats]);
    }

    function buildSectionHead(tag, iconName, num, title, sub) {
        return el("div", { class: "sec-head" }, [
            el("div", { class: "sec-icon", html: icon(iconName) }),
            el("span", { class: "sec-tag", text: num }),
            el("h2", { text: title }),
            sub ? el("span", { class: "sec-sub", text: sub }) : null
        ]);
    }

    /* ---------------------------------------------------------------
       6. VIDEO SECTION (custom YouTube player)
    --------------------------------------------------------------- */
    function buildVideoSection() {
        const head = buildSectionHead("fa-clapperboard", "01", "the video", "Bro Code · C++ Full Course");

        const ytPlayerDiv = el("div", { id: "ytPlayer" });
        const clickShield = el("div", { class: "click-shield", id: "clickShield" });
        const centerPlay = el("button", { class: "center-play", id: "centerPlay", html: icon("fa-play") });
        const loaderOverlay = el("div", { class: "loader-overlay", id: "loaderOverlay" }, [
            el("div", { class: "spinner" }),
            el("span", { text: "loading player…" })
        ]);
        const playerShell = el("div", { class: "player-shell" }, [ytPlayerDiv, clickShield, centerPlay, loaderOverlay]);

        const seekTrack = el("div", { class: "seek-track", id: "seekTrack" }, [
            el("div", { class: "seek-buffer", id: "seekBuffer" }),
            el("div", { class: "seek-fill", id: "seekFill" }),
            el("div", { class: "seek-thumb", id: "seekThumb" })
        ]);
        const seekWrap = el("div", { class: "seek-wrap" }, [
            el("span", { class: "time", id: "timeCurrent", text: "0:00" }),
            seekTrack,
            el("span", { class: "time", id: "timeDuration", text: "0:00" })
        ]);

        const speedSelect = el("select", { class: "speed-select", id: "speedSelect", attrs: { title: "Playback speed" } });
        [["0.5", "0.5x"], ["0.75", "0.75x"], ["1", "1x", true], ["1.25", "1.25x"], ["1.5", "1.5x"], ["2", "2x"]]
            .forEach(([val, label, selected]) => {
                const opt = el("option", { text: label, attrs: { value: val } });
                if (selected) opt.selected = true;
                speedSelect.appendChild(opt);
            });

        const volWrap = el("div", { class: "vol-wrap", id: "volWrap" }, [
            el("button", { class: "ctrl-btn", id: "btnMute", attrs: { title: "Mute/Unmute" }, html: `<i class="fa-solid fa-volume-high" id="volIcon"></i>` }),
            el("div", { class: "vol-track" }, [el("input", { id: "volBar", attrs: { type: "range", min: "0", max: "100", value: "100" } })])
        ]);

        const controls = el("div", { class: "controls" }, [
            el("button", { class: "ctrl-btn", id: "btnBack10", attrs: { title: "Back 10s" }, html: icon("fa-rotate-left") }),
            el("button", { class: "ctrl-btn play", id: "btnPlay", attrs: { title: "Play/Pause" }, html: icon("fa-play") }),
            el("button", { class: "ctrl-btn", id: "btnFwd10", attrs: { title: "Forward 10s" }, html: icon("fa-rotate-right") }),
            seekWrap,
            speedSelect,
            volWrap,
            el("button", { class: "ctrl-btn", id: "btnFullscreen", attrs: { title: "Fullscreen" }, html: icon("fa-expand") })
        ]);

        const editorTab = el("div", { class: "editor-tab", html: `<i class="fa-solid fa-circle"></i>player.cpp<span class="badge"><i class="fa-solid fa-shield"></i>custom controls</span>` });
        const editorPanel = el("div", { class: "editor-panel" }, [editorTab, playerShell, controls]);

        const kbdHint = el("div", { class: "kbd-hint" }, [
            el("span", { html: `<kbd>space</kbd> play/pause` }),
            el("span", { html: `<kbd>←</kbd> <kbd>→</kbd> seek 10s` }),
            el("span", { html: `<kbd>↑</kbd> <kbd>↓</kbd> volume` }),
            el("span", { html: `<kbd>m</kbd> mute` }),
            el("span", { html: `<kbd>f</kbd> fullscreen` })
        ]);

        return el("section", { id: "video", class: "reveal" }, [head, editorPanel, kbdHint]);
    }

    /* ---------------------------------------------------------------
       7. NOTES SECTION
    --------------------------------------------------------------- */
    function hasRealLink(url) {
        if (!url) return false;
        const t = url.trim();
        return t !== "" && t !== "#";
    }
    function resolveLink(url) {
        const t = url.trim();
        if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(t)) return t;
        if (/^\.{1,2}\//.test(t)) return t;
        if (t.startsWith("/")) return t;
        if (t.startsWith("#")) return t;
        if (t.includes("://")) return t;
        return "https://" + t;
    }

    function buildNoteCard(title, i) {
        const url = noteLinks[i] || "";
        const isDone = hasRealLink(url);
        doneState[i] = isDone;

        const card = el("div", {
            class: "note-card" + (isDone ? " done" : ""),
            style: { animationDelay: (i * 0.02) + "s" },
            attrs: { "data-title": title.toLowerCase(), "data-index": i }
        }, [
            el("div", { class: "note-top" }, [
                el("span", { class: "note-num", text: "#" + (i + 1) }),
                el("i", { class: `fa-${isDone ? "solid" : "regular"} fa-circle-check note-check` })
            ]),
            el("div", { class: "note-title", text: title }),
            el("div", { class: "note-open-hint", html: `${icon("fa-arrow-up-right-from-square")}${isDone ? "open note" : "no link yet"}` })
        ]);

        card.addEventListener("click", () => {
            if (!hasRealLink(noteLinks[i])) return;
            window.open(resolveLink(noteLinks[i].trim()), "_blank", "noopener");
        });
        return card;
    }

    function buildNotesSection() {
        const head = buildSectionHead("fa-book-bookmark", "02", "my notes", `${topics.length} topics · Bro Code sequence`);
        const intro = el("p", {
            class: "notes-intro",
            html: `One card per topic, in course order. Add your real note link in the <code>noteLinks</code> array in the code — once a topic has a real link, it's automatically counted as done and the card unlocks so you can click it to open the note.`
        });

        const searchInput = el("input", { class: "search-input", id: "noteSearch", attrs: { type: "text", placeholder: "search topics…" } });
        const searchWrap = el("div", { class: "search-wrap" }, [
            el("i", { class: "fa-solid fa-magnifying-glass" }),
            searchInput
        ]);

        const notesGrid = el("div", { class: "notes-grid", id: "notesGrid" });
        topics.forEach((title, i) => notesGrid.appendChild(buildNoteCard(title, i)));

        searchInput.addEventListener("input", () => {
            const q = searchInput.value.trim().toLowerCase();
            [...notesGrid.children].forEach(card => {
                const match = card.dataset.title.includes(q);
                card.style.display = match ? "" : "none";
            });
        });

        const hint = el("div", {
            class: "note-hint",
            html: `${icon("fa-circle-info")}<span>tip: open this file in a text editor and fill the <b>noteLinks</b> array near the top of the script with your ${topics.length} links, in the same order as the topics.</span>`
        });

        return el("section", { id: "notes", class: "reveal" }, [head, intro, searchWrap, notesGrid, hint]);
    }

    /* ---------------------------------------------------------------
       8. PROGRESS SECTION
    --------------------------------------------------------------- */
    function buildProgressSection() {
        const head = buildSectionHead("fa-chart-pie", "03", "progress", null);

        const chartCanvas = el("canvas", { id: "progressChart" });
        const chartCenter = el("div", { class: "chart-center" }, [
            el("div", { class: "pct", id: "chartPct", text: "0%" }),
            el("div", { class: "lbl", text: "complete" })
        ]);
        const chartBox = el("div", { class: "chart-box" }, [chartCanvas, chartCenter]);

        const doneRow = el("div", { class: "pstat-row" }, [
            el("span", { class: "pdot done" }),
            document.createTextNode("Notes completed"),
            el("span", { class: "val", html: `<b id="doneCount">0</b> / ${topics.length}` })
        ]);
        const remainRow = el("div", { class: "pstat-row" }, [
            el("span", { class: "pdot remain" }),
            document.createTextNode("Notes remaining"),
            el("span", { class: "val", html: `<b id="remainCount">${topics.length}</b> / ${topics.length}` })
        ]);
        const hintRow = el("div", {
            class: "pstat-hint",
            html: `${icon("fa-circle-info")}a note counts as done once you add its real link in <code>noteLinks</code> — leaving it as <code>""</code> or <code>"#"</code> keeps it not done.`
        });

        const streakRow = el("div", { class: "streak-row", id: "streakRow" });

        const stats = el("div", { class: "progress-stats" }, [doneRow, remainRow, hintRow, streakRow]);
        const wrap = el("div", { class: "progress-wrap" }, [chartBox, stats]);

        return el("section", { id: "progress", class: "reveal" }, [head, wrap]);
    }

    /* ---------------------------------------------------------------
       9. FOOTER + TOAST
    --------------------------------------------------------------- */
    function buildFooter() {
        return el("footer", {
            html: `${icon("fa-heart")}built for my self-taught C++ journey · course by Bro Code`
        });
    }
    function buildToast() {
        return el("div", { class: "toast", id: "toast" }, [
            el("i", { class: "fa-solid fa-circle-check" }),
            el("span", { id: "toastMsg", text: "" })
        ]);
    }
    let toastTimer = null;
    function showToast(msg) {
        const toast = document.getElementById("toast");
        const toastMsg = document.getElementById("toastMsg");
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
    }

    /* ---------------------------------------------------------------
       10. ASSEMBLE PAGE
    --------------------------------------------------------------- */
    document.body.appendChild(buildTitlebar());
    document.body.appendChild(buildHero());
    document.body.appendChild(buildVideoSection());
    document.body.appendChild(buildNotesSection());
    document.body.appendChild(buildProgressSection());
    document.body.appendChild(buildFooter());
    document.body.appendChild(buildToast());

    /* ---------------------------------------------------------------
       11. PROGRESS CHART + STREAK CHIPS
    --------------------------------------------------------------- */
    let progressChart = null;
    function computeStreak() {
        // longest run of consecutive completed topics from the start (course order)
        let streak = 0;
        for (const done of doneState) {
            if (done) streak++; else break;
        }
        return streak;
    }
    function renderStreak() {
        const row = document.getElementById("streakRow");
        if (!row) return;
        const streak = computeStreak();
        const done = doneState.filter(Boolean).length;
        row.innerHTML = "";
        row.appendChild(el("div", { class: "streak-chip", html: `${icon("fa-fire")}${streak} in a row from start` }));
        row.appendChild(el("div", { class: "streak-chip", html: `${icon("fa-flag-checkered")}${done} total completed` }));
    }

    function updateProgress() {
        const done = doneState.filter(Boolean).length;
        const total = topics.length;
        const remain = total - done;
        const pct = total ? Math.round((done / total) * 100) : 0;

        if (progressChart) {
            progressChart.data.datasets[0].data = [done, remain];
            progressChart.update();
        }
        const pctEl = document.getElementById("chartPct");
        const doneEl = document.getElementById("doneCount");
        const remainEl = document.getElementById("remainCount");
        if (pctEl) pctEl.textContent = pct + "%";
        if (doneEl) doneEl.textContent = done;
        if (remainEl) remainEl.textContent = remain;
        renderStreak();
    }

    try {
        if (typeof Chart === "undefined") throw new Error("Chart.js failed to load");
        const ctx = document.getElementById("progressChart").getContext("2d");
        progressChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Done", "Remaining"],
                datasets: [{
                    data: [0, topics.length],
                    backgroundColor: ["#5fd8c4", "#232840"],
                    borderColor: ["#171a27", "#171a27"],
                    borderWidth: 3,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "72%",
                animation: { duration: 500 },
                plugins: { legend: { display: false }, tooltip: { enabled: true } }
            }
        });
    } catch (err) {
        console.error("chart error:", err);
        const box = document.querySelector(".chart-box");
        if (box) box.style.display = "none";
    }
    updateProgress();

    /* ---------------------------------------------------------------
       12. CUSTOM YOUTUBE PLAYER
    --------------------------------------------------------------- */
    let ytPlayer, ytReady = false, isSeeking = false;

    try {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.onerror = fallbackToPlainEmbed;
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = function () {
            try {
                ytPlayer = new YT.Player("ytPlayer", {
                    videoId: VIDEO_ID,
                    playerVars: { controls: 0, disablekb: 1, rel: 0, modestbranding: 1, fs: 0, iv_load_policy: 3, start: START_SECONDS },
                    events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange, onError: fallbackToPlainEmbed }
                });
            } catch (err) {
                console.error("YT player init error:", err);
                fallbackToPlainEmbed();
            }
        };
        setTimeout(() => { if (!ytReady) fallbackToPlainEmbed(); }, 7000);
    } catch (err) {
        console.error("YT setup error:", err);
        fallbackToPlainEmbed();
    }

    function fallbackToPlainEmbed() {
        if (fallbackToPlainEmbed._done) return;
        fallbackToPlainEmbed._done = true;
        const shell = document.querySelector(".player-shell");
        const controlsBar = document.querySelector(".controls");
        const kbdHint = document.querySelector(".kbd-hint");
        if (!shell) return;
        shell.innerHTML = "";
        shell.appendChild(el("iframe", {
            style: { position: "absolute", inset: "0", width: "100%", height: "100%", border: "0" },
            attrs: {
                src: `https://www.youtube.com/embed/${VIDEO_ID}?start=${START_SECONDS}`,
                title: "C++ Full Course - Bro Code",
                allowfullscreen: "true",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            }
        }));
        if (controlsBar) controlsBar.style.display = "none";
        if (kbdHint) kbdHint.style.display = "none";
    }

    function onPlayerReady() {
        ytReady = true;
        document.getElementById("loaderOverlay").classList.add("hidden");
        document.getElementById("volBar").value = ytPlayer.getVolume();
        setInterval(syncSeekBar, 400);
    }

    function setPlayingUI(playing) {
        const btnPlay = document.getElementById("btnPlay");
        const centerPlay = document.getElementById("centerPlay");
        btnPlay.innerHTML = playing ? icon("fa-pause") : icon("fa-play");
        centerPlay.innerHTML = playing ? icon("fa-pause") : icon("fa-play");
        centerPlay.classList.toggle("playing", playing);
        centerPlay.classList.toggle("is-pause", playing);
    }

    function onPlayerStateChange(e) {
        if (e.data === YT.PlayerState.PLAYING) setPlayingUI(true);
        else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) setPlayingUI(false);
    }

    function fmtTime(sec) {
        sec = Math.floor(sec || 0);
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;
        if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        return `${m}:${String(s).padStart(2, "0")}`;
    }

    function syncSeekBar() {
        if (!ytReady || isSeeking) return;
        const seekFill = document.getElementById("seekFill");
        const seekBuffer = document.getElementById("seekBuffer");
        const seekThumb = document.getElementById("seekThumb");
        const dur = ytPlayer.getDuration() || 0;
        const cur = ytPlayer.getCurrentTime() || 0;
        const loaded = ytPlayer.getVideoLoadedFraction ? ytPlayer.getVideoLoadedFraction() : 0;
        const pct = dur ? (cur / dur) * 100 : 0;
        seekFill.style.width = pct + "%";
        seekThumb.style.left = pct + "%";
        seekBuffer.style.width = (loaded * 100) + "%";
        document.getElementById("timeCurrent").textContent = fmtTime(cur);
        document.getElementById("timeDuration").textContent = fmtTime(dur);
    }

    function togglePlay() {
        if (!ytReady) return;
        const state = ytPlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING) ytPlayer.pauseVideo();
        else ytPlayer.playVideo();
    }

    function seekFromEvent(clientX) {
        const seekTrack = document.getElementById("seekTrack");
        const seekFill = document.getElementById("seekFill");
        const seekThumb = document.getElementById("seekThumb");
        const rect = seekTrack.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const dur = ytPlayer.getDuration() || 0;
        seekFill.style.width = (ratio * 100) + "%";
        seekThumb.style.left = (ratio * 100) + "%";
        return ratio * dur;
    }

    function updateVolIcon(vol, muted) {
        const volIcon = document.getElementById("volIcon");
        if (muted || vol == 0) volIcon.className = "fa-solid fa-volume-xmark";
        else if (vol < 50) volIcon.className = "fa-solid fa-volume-low";
        else volIcon.className = "fa-solid fa-volume-high";
    }

    function wireUpControls() {
        document.getElementById("btnPlay").addEventListener("click", togglePlay);
        document.getElementById("centerPlay").addEventListener("click", togglePlay);
        document.getElementById("clickShield").addEventListener("click", togglePlay);

        document.getElementById("btnBack10").addEventListener("click", () => {
            if (!ytReady) return;
            ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 10), true);
        });
        document.getElementById("btnFwd10").addEventListener("click", () => {
            if (!ytReady) return;
            ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10, true);
        });

        const seekTrack = document.getElementById("seekTrack");
        let pendingSeek = null;
        seekTrack.addEventListener("mousedown", e => {
            if (!ytReady) return;
            isSeeking = true;
            pendingSeek = seekFromEvent(e.clientX);
        });
        window.addEventListener("mousemove", e => {
            if (!isSeeking) return;
            pendingSeek = seekFromEvent(e.clientX);
        });
        window.addEventListener("mouseup", () => {
            if (!isSeeking) return;
            isSeeking = false;
            if (pendingSeek !== null) ytPlayer.seekTo(pendingSeek, true);
        });
        seekTrack.addEventListener("touchstart", e => {
            if (!ytReady) return;
            isSeeking = true;
            pendingSeek = seekFromEvent(e.touches[0].clientX);
        }, { passive: true });
        seekTrack.addEventListener("touchmove", e => {
            if (!isSeeking) return;
            pendingSeek = seekFromEvent(e.touches[0].clientX);
        }, { passive: true });
        seekTrack.addEventListener("touchend", () => {
            if (!isSeeking) return;
            isSeeking = false;
            if (pendingSeek !== null) ytPlayer.seekTo(pendingSeek, true);
        });

        const volBar = document.getElementById("volBar");
        volBar.addEventListener("input", () => {
            if (!ytReady) return;
            ytPlayer.setVolume(volBar.value);
            ytPlayer.unMute();
            updateVolIcon(volBar.value, false);
        });
        document.getElementById("btnMute").addEventListener("click", () => {
            if (!ytReady) return;
            if (ytPlayer.isMuted()) { ytPlayer.unMute(); updateVolIcon(volBar.value, false); }
            else { ytPlayer.mute(); updateVolIcon(volBar.value, true); }
        });

        document.getElementById("speedSelect").addEventListener("change", e => {
            if (!ytReady) return;
            ytPlayer.setPlaybackRate(parseFloat(e.target.value));
        });

        document.getElementById("btnFullscreen").addEventListener("click", () => {
            const shell = document.querySelector(".player-shell");
            if (shell.requestFullscreen) shell.requestFullscreen();
            else if (shell.webkitRequestFullscreen) shell.webkitRequestFullscreen();
        });

        window.addEventListener("keydown", e => {
            if (!ytReady) return;
            const tag = (e.target.tagName || "").toLowerCase();
            if (tag === "input" || tag === "select" || tag === "textarea") return;
            switch (e.key) {
                case " ": e.preventDefault(); togglePlay(); break;
                case "ArrowRight": ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10, true); break;
                case "ArrowLeft": ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 10), true); break;
                case "ArrowUp":
                    e.preventDefault();
                    volBar.value = Math.min(100, Number(volBar.value) + 10);
                    ytPlayer.setVolume(volBar.value); ytPlayer.unMute(); updateVolIcon(volBar.value, false);
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    volBar.value = Math.max(0, Number(volBar.value) - 10);
                    ytPlayer.setVolume(volBar.value); updateVolIcon(volBar.value, false);
                    break;
                case "m": case "M": document.getElementById("btnMute").click(); break;
                case "f": case "F": document.getElementById("btnFullscreen").click(); break;
            }
        });
    }
    wireUpControls();

    /* ---------------------------------------------------------------
       13. NICE-TO-HAVE: toast the first time a note card is opened
    --------------------------------------------------------------- */
    document.getElementById("notesGrid").addEventListener("click", e => {
        const card = e.target.closest(".note-card");
        if (card && card.classList.contains("done")) {
            showToast("opening: " + card.querySelector(".note-title").textContent);
        }
    });

})();