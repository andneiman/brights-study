(() => {
  "use strict";

  const OFFER_SECONDS = 5 * 60;
  const PRICE = "$69";
  const OLD_PRICE = "$199";
  const STORE_KEY = "lhl-onboard";

  // Backend stubs: nothing leaves the browser yet.
  const api = {
    async saveAnswers(answers) {
      console.info("[stub] saveAnswers", answers);
    },
    async saveLead(lead) {
      console.info("[stub] saveLead", lead);
      await wait(700);
      return { ok: true };
    },
    async checkout(order) {
      console.info("[stub] checkout", order);
      await wait(1200);
      return { ok: true };
    },
    whatsappUrl: null,
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const saved = (() => {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
  })();
  const state = { answers: saved.answers || {}, history: [] };
  const A = state.answers;
  const persist = () => {
    sessionStorage.setItem(STORE_KEY, JSON.stringify({ answers: A, deadline: saved.deadline }));
    api.saveAnswers(A);
  };

  const isYes = () => A.esa === "yes";
  const atHome = () => ["homeschool", "online-home", "other-yes"].includes(A.school);

  const check = '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7.2l2.6 2.6L11 4.4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const screens = {
    esa: {
      kind: "cards",
      key: "esa",
      progress: true,
      tag: "Learn How to Learn (with AI) · 2-minute check",
      title: "Are you an ==ESA family== in Arizona?",
      sub: "A few quick questions to fit the course to your family.",
      options: [
        { value: "yes", label: "Yes", img: "/quiz/img/yes-family.jpg", alt: "A father and daughter looking at a laptop" },
        { value: "notyet", label: "Not yet", img: "/quiz/img/notyet-school.jpg", alt: "A mother and her son walking to school" },
      ],
    },
    school: {
      kind: "single",
      key: "school",
      progress: true,
      title: () => (isYes() ? "Where does your child learn?" : "Where does your child go to school?"),
      options: () =>
        isYes()
          ? [
              { value: "homeschool", label: "Homeschool" },
              { value: "private", label: "Private school" },
              { value: "microschool", label: "Microschool or co-op" },
              { value: "online-home", label: "Online school at home" },
              { value: "other-yes", label: "Other" },
            ]
          : [
              { value: "public", label: "Public school" },
              { value: "charter", label: "Charter school" },
              { value: "private", label: "Private school" },
              { value: "homeschool", label: "Homeschool" },
              { value: "microschool", label: "Microschool or online school" },
              { value: "other-no", label: "Other" },
            ],
    },
    welcome: {
      kind: "info",
      img: "/quiz/img/welcome.jpg",
      title: "You’re in the ==right place==.",
      body: "We built this course so learning feels good for your child — and lighter for you. Answer a few quick questions so we can tailor it to your family.",
      cta: "Continue",
    },
    kids: {
      kind: "single",
      key: "kids",
      progress: true,
      title: "How many children would take the course?",
      sub: "One course per student.",
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4+", label: "4+" },
      ],
    },
    ages: {
      kind: "multi",
      key: "ages",
      progress: true,
      title: "How old are they?",
      sub: "Select all that apply.",
      options: [
        { value: "11-12", label: "11–12" },
        { value: "13-14", label: "13–14" },
        { value: "15-16", label: "15–16" },
        { value: "17-18", label: "17–18" },
        { value: "under-11", label: "Under 11" },
      ],
    },
    subjects: {
      kind: "multi",
      key: "subjects",
      progress: true,
      title: "Which subjects take the most effort right now?",
      sub: "Select all that apply. Practice uses their real subjects.",
      options: [
        { value: "math", label: "Math" },
        { value: "science", label: "Science" },
        { value: "english", label: "English & writing" },
        { value: "history", label: "History" },
        { value: "language", label: "Foreign language" },
        { value: "all", label: "All of them" },
        { value: "other", label: "Other", other: true },
      ],
    },
    childHard: {
      kind: "multi",
      key: "childHard",
      progress: true,
      title: "When your child studies, what gets in the way?",
      sub: "Select all that apply.",
      options: [
        { value: "forgets", label: "Forgets it by test day" },
        { value: "stuck", label: "Gets stuck and gives up" },
        { value: "focus", label: "Loses focus fast" },
        { value: "delays", label: "Puts off hard tasks" },
        { value: "other", label: "Something else", other: true },
      ],
    },
    parentHard: {
      kind: "multi",
      key: "parentHard",
      progress: true,
      title: () => (atHome() ? "And at home, what’s the hardest part for you?" : "And after school, what’s the hardest part at home?"),
      sub: "Select all that apply.",
      options: () =>
        atHome()
          ? [
              { value: "remind", label: "Reminding them to start" },
              { value: "sit", label: "Sitting next to them" },
              { value: "tension", label: "Daily tension over lessons" },
              { value: "routine", label: "Keeping a steady routine" },
              { value: "step-back", label: "Knowing when to step back" },
              { value: "other", label: "Something else", other: true },
            ]
          : [
              { value: "start", label: "Getting homework started" },
              { value: "tired", label: "Tired and unfocused evenings" },
              { value: "cramming", label: "Last-minute test cramming" },
              { value: "tension", label: "Evening tension over homework" },
              { value: "unknown", label: "Not knowing how they study" },
              { value: "other", label: "Something else", other: true },
            ],
    },
    help: {
      kind: "help",
      bullets: [
        "How the brain actually learns",
        "Study methods that stick",
        "How AI works, and where it goes wrong",
        "A simple way to learn with AI — not hand it the homework",
        "A plan they can follow on their own",
      ],
      cta: "Continue",
    },
    ai: {
      kind: "single",
      key: "ai",
      progress: true,
      title: "How does your child use AI today?",
      options: [
        { value: "none", label: "Doesn’t use it yet" },
        { value: "copies", label: "Copies answers from ChatGPT" },
        { value: "unsure", label: "Uses it, I’m not sure how" },
        { value: "right-way", label: "Wants to use it the right way" },
        { value: "other", label: "Other" },
      ],
    },
    aiChart: { kind: "aiChart" },
    parent: {
      kind: "single",
      key: "parent",
      progress: true,
      title: "Would you like to understand how learning and AI work too?",
      options: [
        { value: "myself", label: "Yes, just for myself" },
        { value: "same-page", label: "I want to be on the same page as my child" },
        { value: "child-only", label: "No, it’s just for my child" },
      ],
    },
    parentMode: {
      kind: "info",
      when: () => A.parent !== "child-only",
      img: "/quiz/img/parent-mode.jpg",
      title: "You’re included. That’s ==Parent Mode.==",
      bullets: [
        "The same units, written for you",
        "See how your child learns best",
        "Know what honest AI use looks like",
        "Stay on the same page — same knowledge, same language",
      ],
      cta: "See what changes in 2 weeks →",
    },
    finalYes: { kind: "finalYes", when: isYes },
    whatsapp: { kind: "whatsapp", when: isYes, final: true },
    email: { kind: "email", when: () => !isYes() },
    paywall: { kind: "paywall", when: () => !isYes(), final: true },
    success: { kind: "success", when: () => !isYes(), final: true },
  };

  const flow = Object.keys(screens);
  const $screen = document.getElementById("screen");
  const $back = document.getElementById("back");
  const $progress = document.getElementById("progress");
  const $bar = document.getElementById("bar");
  const $step = document.getElementById("step");
  const $toast = document.getElementById("toast");

  const val = (v) => (typeof v === "function" ? v() : v);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rich = (s) => esc(s).replace(/==(.+?)==/g, "<mark>$1</mark>");
  const visible = (id) => !screens[id].when || screens[id].when();
  const nextOf = (id) => {
    for (let i = flow.indexOf(id) + 1; i < flow.length; i++) if (visible(flow[i])) return flow[i];
    return null;
  };

  let current = null;
  let cleanup = null;

  function go(id, { push = true } = {}) {
    if (cleanup) { cleanup(); cleanup = null; }
    if (push && current) state.history.push(current);
    current = id;
    if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
    render();
    window.scrollTo(0, 0);
  }

  function next() {
    persist();
    const n = nextOf(current);
    if (n) go(n);
  }

  $back.addEventListener("click", () => {
    const prev = state.history.pop();
    if (prev) go(prev, { push: false });
  });

  function updateChrome() {
    const s = screens[current];
    const steps = flow.filter((id) => screens[id].progress);
    const idx = steps.indexOf(current);
    const lastQ = flow.indexOf("parent");
    const pos = flow.indexOf(current);
    const done = idx >= 0 ? idx + 1 : steps.filter((id) => flow.indexOf(id) < pos).length;
    const showBar = pos <= lastQ + 1;
    $progress.hidden = !showBar;
    $bar.style.width = `${Math.round((done / steps.length) * 100)}%`;
    $step.textContent = s.progress ? `${idx + 1}/${steps.length}` : "";
    $back.hidden = !state.history.length || s.final;
  }

  function render() {
    const s = screens[current];
    $screen.className = "screen";
    $screen.style.animation = "none";
    void $screen.offsetWidth;
    $screen.style.animation = "";
    updateChrome();
    ({ cards: renderCards, single: renderSingle, multi: renderMulti, info: renderInfo, help: renderHelp, aiChart: renderAiChart, finalYes: renderFinalYes, whatsapp: renderWhatsapp, email: renderEmail, paywall: renderPaywall, success: renderSuccess })[s.kind](s);
    noOrphans($screen);
  }

  // Browsers without text-wrap: pretty/balance still must not leave a single word alone on a line.
  function noOrphans(root) {
    root.querySelectorAll("h1, h2, h3, p, li, .option .label, .metric b").forEach((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let last = null;
      while (walker.nextNode()) {
        const node = walker.currentNode;
        node.textContent = node.textContent.replace(/([.!?]) (\S{1,5}) /g, "$1 $2\u00A0");
        if (node.textContent.trim()) last = node;
      }
      if (last) last.textContent = last.textContent.replace(/ (\S+\s*)$/, "\u00A0$1");
    });
  }

  function head(s) {
    return `${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ""}
      <h1>${rich(val(s.title))}</h1>
      ${s.sub ? `<p class="sub">${esc(val(s.sub))}</p>` : ""}`;
  }

  function bottomBar(html) {
    $screen.classList.add("with-bar");
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.innerHTML = `<div class="bar-inner">${html}</div>`;
    $screen.appendChild(bar);
    return bar;
  }

  function renderCards(s) {
    $screen.innerHTML = `${head(s)}<div class="cards">${s.options
      .map((o) => `<button class="card${A[s.key] === o.value ? " on" : ""}" data-v="${o.value}" type="button">
          <img src="${o.img}" alt="${esc(o.alt)}"><span>${esc(o.label)}<span class="radio"></span></span></button>`)
      .join("")}</div>`;
    $screen.querySelectorAll(".card").forEach((b) =>
      b.addEventListener("click", () => {
        if (A[s.key] !== b.dataset.v) delete A.school;
        A[s.key] = b.dataset.v;
        $screen.querySelectorAll(".card").forEach((x) => x.classList.toggle("on", x === b));
        setTimeout(next, 220);
      })
    );
  }

  function renderSingle(s) {
    const options = val(s.options);
    $screen.innerHTML = `${head(s)}<div class="options">${options
      .map((o) => `<button class="option${A[s.key] === o.value ? " on" : ""}" data-v="${o.value}" type="button"><span class="label">${esc(o.label)}</span><span class="radio"></span></button>`)
      .join("")}</div>`;
    $screen.querySelectorAll(".option").forEach((b) =>
      b.addEventListener("click", () => {
        A[s.key] = b.dataset.v;
        $screen.querySelectorAll(".option").forEach((x) => x.classList.toggle("on", x === b));
        setTimeout(next, 220);
      })
    );
  }

  function renderMulti(s) {
    const options = val(s.options);
    const allowed = new Set(options.map((o) => o.value));
    const picked = new Set((A[s.key] || []).filter((v) => allowed.has(v)));
    const otherKey = `${s.key}Other`;
    $screen.innerHTML = `${head(s)}<div class="options">${options
      .map((o) => `<button class="option${picked.has(o.value) ? " on" : ""}" data-v="${o.value}" type="button" aria-pressed="${picked.has(o.value)}"><span class="label">${esc(o.label)}</span><span class="check">${check}</span></button>
        ${o.other ? `<textarea class="other-input" rows="2" placeholder="Tell us in a few words" ${picked.has(o.value) ? "" : "hidden"}>${esc(A[otherKey] || "")}</textarea>` : ""}`)
      .join("")}</div>`;
    const bar = bottomBar(`<button class="btn" id="cont" type="button">Continue</button>`);
    const cont = bar.querySelector("#cont");
    const other = $screen.querySelector(".other-input");
    const sync = () => {
      A[s.key] = [...picked];
      cont.disabled = picked.size === 0;
    };
    other?.addEventListener("input", () => (A[otherKey] = other.value.trim()));
    $screen.querySelectorAll(".option").forEach((b) =>
      b.addEventListener("click", () => {
        const v = b.dataset.v;
        picked.has(v) ? picked.delete(v) : picked.add(v);
        b.classList.toggle("on", picked.has(v));
        b.setAttribute("aria-pressed", picked.has(v));
        const opt = options.find((o) => o.value === v);
        if (opt.other && other) {
          other.hidden = !picked.has(v);
          if (picked.has(v)) other.focus();
        }
        sync();
      })
    );
    cont.addEventListener("click", next);
    sync();
  }

  function renderInfo(s) {
    $screen.innerHTML = `${s.img ? `<img class="hero" src="${s.img}" alt="">` : ""}
      <h1>${rich(s.title)}</h1>
      ${s.body ? `<p class="body">${esc(s.body)}</p>` : ""}
      ${s.bullets ? `<ul class="bullets">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}`;
    bottomBar(`<button class="btn" type="button">${esc(s.cta)}</button>`).querySelector(".btn").addEventListener("click", next);
  }

  function renderHelp(s) {
    $screen.innerHTML = `<span class="tag">We hear you. We’ll help.</span>
      <h1>We’ve built a course <mark>for exactly this</mark></h1>
      <div class="course-plate">
        <small>The course</small>
        <b>Learn How to Learn (with AI)</b>
        <span class="unesco">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>
          Based on the UNESCO AI framework
        </span>
      </div>
      <p class="body">It takes just 2 weeks, and your child learns:</p>
      <ul class="bullets">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
    bottomBar(`<button class="btn" type="button">Continue</button>`).querySelector(".btn").addEventListener("click", next);
  }

  function renderAiChart() {
    $screen.innerHTML = `<h1>Why “just using ChatGPT” <mark>backfires</mark></h1>
      <p class="sub">And what works instead.</p>
      <div class="charts">
        <div class="chart">
          <h3>Homework Score</h3><p>Goes up with ChatGPT</p>
          <div class="bars">
            <div class="col"><span class="val">100</span><span class="fill" data-h="85"></span><span class="name">Before AI</span></div>
            <div class="col"><span class="val up">+18%</span><span class="fill ai-up" data-h="100"></span><span class="name">After AI</span></div>
          </div>
        </div>
        <div class="chart">
          <h3>Exam Score</h3><p>Drops within 6 months</p>
          <div class="bars">
            <div class="col"><span class="val">100</span><span class="fill" data-h="100"></span><span class="name">Before AI</span></div>
            <div class="col"><span class="val down">−20%</span><span class="fill ai-down" data-h="80"></span><span class="name">After AI</span></div>
          </div>
        </div>
      </div>
      <p class="body">About 80% of students in the study used AI to finish homework fast. Homework scores went up, but real exam scores dropped. Students who still spent the time thinking barely lost ground.</p>
      <p class="note">The course shows a simple way to learn with AI. Your child still does the thinking.</p>
      <p class="source">Strömberg, Lei &amp; Wu. The Generative AI Learning Penalty. CEPR Discussion Paper 21577. https://cepr.org/publications/dp21577</p>`;
    requestAnimationFrame(() =>
      setTimeout(() => $screen.querySelectorAll(".fill").forEach((f) => (f.style.height = `${f.dataset.h * 1.1}px`)), 60)
    );
    bottomBar(`<button class="btn" type="button">Continue</button>`).querySelector(".btn").addEventListener("click", next);
  }

  const compareBlock = `<h1>Your child’s next <mark>2 weeks</mark></h1>
      <p class="sub">Here’s what changes with the course.</p>
      <div class="compare">
        <div class="now"><h3>Today</h3>
          <div class="metric"><small>Memory</small><b>Forgets before the test</b><div class="meter"><i></i></div></div>
          <div class="metric"><small>AI use</small><b>Copies answers</b><div class="meter"><i></i></div></div>
          <div class="metric"><small>Motivation</small><b>Low, needs a push</b><div class="meter"><i></i></div></div>
        </div>
        <div class="then"><h3>In 2 weeks</h3>
          <div class="metric"><small>Memory</small><b>Remembers <span class="nowrap">long-term</span></b><div class="meter"><i></i></div></div>
          <div class="metric"><small>AI use</small><b>Uses AI to think</b><div class="meter"><i></i></div></div>
          <div class="metric"><small>Motivation</small><b>Enjoys learning</b><div class="meter"><i></i></div></div>
        </div>
      </div>`;

  const familyGets = `<h2>What your family gets</h2>
      <ul class="bullets">
        <li>33 short interactive units</li>
        <li>Practice built around your child’s real subjects</li>
        <li>Memory tools: active recall, spacing, focus sprints</li>
        <li>Smart AI habits: prompts that teach, checking AI’s answers</li>
        <li>A personal study plan and their own AI rules</li>
        <li>Parent Mode: the same units, written for you</li>
      </ul>`;

  const ageNote = () =>
    (A.ages || []).includes("under-11")
      ? `<p class="hint">This course is built for ages 11–18. We’ll still send the steps, so you have them when your child is ready.</p>`
      : "";

  function emailForm({ cta, onDone }) {
    const form = document.createElement("form");
    form.noValidate = true;
    form.innerHTML = `<div class="field">
        <input type="email" name="email" placeholder="you@example.com" autocomplete="email" inputmode="email" value="${esc(A.email || "")}" aria-label="Email">
        <span class="err"></span>
      </div>
      <button class="btn" type="submit">${cta}</button>`;
    const input = form.querySelector("input");
    const err = form.querySelector(".err");
    const btn = form.querySelector("button");
    input.addEventListener("input", () => { input.classList.remove("bad"); err.textContent = ""; });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.classList.add("bad");
        err.textContent = "Please enter a valid email.";
        input.focus();
        return;
      }
      A.email = email;
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span>`;
      await api.saveLead({ ...A });
      onDone();
    });
    return form;
  }

  function renderFinalYes() {
    $screen.innerHTML = `${compareBlock}
      ${familyGets}
      <div class="esa-card">
        <b>Available on ClassWallet</b>
        <p>Pay for the course with your Arizona ESA funds.</p>
      </div>
      <h2>Get the <span class="nowrap">step-by-step</span> instructions</h2>
      <p class="sub" style="margin-bottom:16px">We’ll email you the exact steps to get the course with your ESA.</p>
      ${ageNote()}
      <div id="form"></div>`;
    $screen.querySelector("#form").appendChild(emailForm({ cta: "Send me the steps", onDone: next }));
  }

  function openWhatsapp() {
    if (api.whatsappUrl) window.open(api.whatsappUrl, "_blank", "noopener");
    else toast("Prototype: the WhatsApp chat link will go here");
  }

  function renderWhatsapp() {
    $screen.innerHTML = `<div class="center">
        <div class="icon-circle"><svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#2f9e44" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h1>Talk it through <mark>with the team</mark></h1>
        <p class="body">Your instructions are on the way to <b>${esc(A.email || "your inbox")}</b>. You can also message us on WhatsApp — we’ll walk you through ClassWallet step by step.</p>
        <button class="btn wa" id="wa" type="button">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.2-.2-.2-.5-.4z"/></svg>
          Open WhatsApp chat
        </button>
        <button class="link-btn" id="restart" type="button">Start over</button>
      </div>`;
    $screen.querySelector("#wa").addEventListener("click", openWhatsapp);
    $screen.querySelector("#restart").addEventListener("click", restart);
  }

  function renderEmail() {
    $screen.innerHTML = `<img class="hero" src="/quiz/img/after.jpg" alt="A teenage girl studying on her own">
      <h1>Your family’s <mark>study plan</mark> is ready!</h1>
      <p class="sub">Enter your email to save your progress and see the course offer.</p>
      ${ageNote()}
      <div id="form"></div>
      <p class="legal">By continuing you agree to our <a href="/main/terms-of-use.html" target="_blank">Terms of Use</a> and <a href="/main/privacy-policy.html" target="_blank">Privacy Policy</a>.</p>`;
    $screen.querySelector("#form").appendChild(emailForm({ cta: "Continue", onDone: next }));
  }

  function deadline() {
    if (!saved.deadline) {
      saved.deadline = Date.now() + OFFER_SECONDS * 1000;
      persist();
    }
    return saved.deadline;
  }

  function renderPaywall() {
    const end = deadline();
    $screen.innerHTML = `${compareBlock}

      <div class="timer">Special offer ends in <b class="t">05:00</b></div>

      <div class="offer">
        <span class="offer-tag">FULL ACCESS · ONE-TIME PURCHASE</span>
        <div class="offer-top">
          <div>
            <h3>Learn How to Learn Smart (with AI)</h3>
            <p class="meta">33 units + Parent Mode included<br>Access stays after the 2 weeks</p>
          </div>
          <div class="price"><s>${OLD_PRICE}</s><b>${PRICE}</b></div>
        </div>
        <span class="save">Save 65% · No subscription</span>
        <button class="btn buy" type="button">Get instant access — ${PRICE}</button>
        <p class="pay-note">Pay safe &amp; secure · Apple Pay / Google Pay / Card</p>
        <p class="esa-note">Applying for Arizona ESA soon? You can also pay with ClassWallet once approved.</p>
      </div>

      ${familyGets}

      <h2>Why families choose this</h2>
      <div class="table">
        <div class="tr"><div>Learn Smart (with AI)</div><div>Private study coach</div></div>
        <div class="tr"><div>How to learn any subject</div><div>One homework task</div></div>
        <div class="tr"><div>AI as a safe daily tool</div><div>AI not covered</div></div>
        <div class="tr"><div>Parent Mode included</div><div>Parents left out</div></div>
        <div class="tr"><div>Any time, own pace</div><div>Fixed schedule</div></div>
        <div class="tr"><div>${PRICE} one-time</div><div>$60–$100 per hour</div></div>
      </div>

      <div class="guarantee">
        <h3>100% money-back guarantee</h3>
        <p>Try the course for 14 days. If you don’t see a change in how your child studies and uses AI, email us for a full refund.</p>
      </div>

      <h2>FAQ</h2>
      <div class="faq">
        <details><summary>Is this a subscription?</summary><p>No. It’s a one-time payment of ${PRICE}. You’re never charged again.</p></details>
        <details><summary>How long do we keep access?</summary><p>The course is built for 2 weeks, and your family keeps access afterwards.</p></details>
        <details><summary>Do we need to install anything?</summary><p>No. It works in the browser on a computer, tablet or phone.</p></details>
        <details><summary>Can I pay with Arizona ESA?</summary><p>Yes. Once your ESA is approved, you can pay with ClassWallet (${PRICE} per student).</p></details>
      </div>
      <p class="legal"><a href="/main/terms-of-use.html" target="_blank">Terms of Use</a> · <a href="/main/privacy-policy.html" target="_blank">Privacy Policy</a> · <a href="/main/refund-policy.html" target="_blank">Refund Policy</a></p>`;

    const bar = bottomBar(`<p class="timer-line">Offer ends in <b class="t">05:00</b></p>
      <button class="btn buy" type="button">Get the course for ${PRICE} <s>${OLD_PRICE}</s></button>`);

    const timers = [...$screen.querySelectorAll(".t"), ...bar.querySelectorAll(".t")];
    const tick = () => {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      const txt = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
      timers.forEach((t) => (t.textContent = txt));
    };
    tick();
    const iv = setInterval(tick, 1000);
    cleanup = () => clearInterval(iv);

    $screen.querySelectorAll(".buy").forEach((b) => b.addEventListener("click", openCheckout));
  }

  function openCheckout() {
    const veil = document.createElement("div");
    veil.className = "veil";
    veil.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="Checkout">
        <h3>Complete your purchase</h3>
        <p class="sub" style="margin:0">One-time payment · no subscription</p>
        <div class="sum"><span>Learn How to Learn Smart (with AI)</span><span>${PRICE}</span></div>
        <button class="btn dark pay" type="button">Pay with Apple Pay</button>
        <button class="btn pay" type="button">Pay with card</button>
        <button class="btn ghost close" type="button">Not now</button>
        <p class="stub">Prototype: no real payment is made.</p>
      </div>`;
    document.body.appendChild(veil);
    const close = () => veil.remove();
    veil.addEventListener("click", (e) => e.target === veil && close());
    veil.querySelector(".close").addEventListener("click", close);
    veil.querySelectorAll(".pay").forEach((b) =>
      b.addEventListener("click", async () => {
        veil.querySelectorAll("button").forEach((x) => (x.disabled = true));
        b.innerHTML = `<span class="spinner"></span>`;
        await api.checkout({ email: A.email, price: PRICE });
        close();
        next();
      })
    );
  }

  function renderSuccess() {
    $screen.innerHTML = `<div class="center">
        <div class="icon-circle"><svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#2f9e44" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h1>You’re in! <mark>Welcome aboard.</mark></h1>
        <p class="body">We sent access to <b>${esc(A.email || "your inbox")}</b>. Open the course and take the first unit together.</p>
        <button class="btn" id="open" type="button">Open the course</button>
        <button class="btn ghost" id="wa" type="button" style="margin-top:8px">Questions? Chat with us on WhatsApp</button>
        <button class="link-btn" id="restart" type="button">Start over</button>
      </div>`;
    $screen.querySelector("#open").addEventListener("click", () => toast("Prototype: the course link will go here"));
    $screen.querySelector("#wa").addEventListener("click", openWhatsapp);
    $screen.querySelector("#restart").addEventListener("click", restart);
  }

  let toastTimer;
  function toast(msg) {
    $toast.textContent = msg;
    $toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $toast.classList.remove("show"), 2600);
  }

  function restart() {
    sessionStorage.removeItem(STORE_KEY);
    Object.keys(A).forEach((k) => delete A[k]);
    delete saved.deadline;
    state.history = [];
    current = null;
    go("esa", { push: false });
  }

  const start = location.hash.slice(1);
  go(screens[start] && visible(start) ? start : "esa", { push: false });
})();
