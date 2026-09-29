import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Pages to publish. Add a course name here to generate its page.
const ONLY = ["Grade 7 Math"];

const sites = [
  {
    dir: "study/main",
    hello: "hello@brights.study",
    esa: "esa@brights.study",
  },
  {
    dir: "aplus/main",
    hello: "hello@aplusbrights.com",
    esa: "esa@aplusbrights.com",
  },
];

function loadCatalog() {
  const src = fs.readFileSync(path.join(root, "study/main/js/catalog.js"), "utf8");
  const end = src.indexOf("\n(function");
  const sandbox = {};
  vm.runInNewContext(src.slice(0, end), sandbox);
  return sandbox.CATALOG;
}

function slug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unitList(items) {
  return `<ol class="units">${items.map((unit) => `<li>${esc(unit)}</li>`).join("")}</ol>`;
}

function unitsHtml(course) {
  if (course.s1 && course.s2) {
    return `<p class="units-label">Semester 1</p>${unitList(course.s1)}<p class="units-label units-label-next">Semester 2</p>${unitList(course.s2)}`;
  }
  return `<p class="units-label">Units</p>${unitList(course.u || [])}`;
}

function leadModal() {
  const html = fs.readFileSync(path.join(root, "study/main/courses.html"), "utf8");
  const start = html.indexOf('  <div class="lead-modal"');
  const end = html.indexOf('  <script src="/main/js/catalog.js">');
  if (start < 0 || end < 0) throw new Error("Lead modal block not found in courses.html");
  return html.slice(start, end).trimEnd();
}

function page(site, subject, course, modal) {
  const units = course.s1 && course.s2 ? course.s1.concat(course.s2) : course.u || [];
  const facts = [course.g, course.fmt, course.p, `${units.length} units`]
    .filter(Boolean)
    .map((fact) => `<span class="meta-pill${fact === course.p ? " is-price" : ""}">${esc(fact)}</span>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(course.n)} — Brights</title>
  <meta name="description" content="${esc(course.d)}">
  <link rel="icon" href="/main/img/logo.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hedvig+Letters+Serif:opsz@12..24&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/main/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="/main">
        <img src="/main/img/logo-full.svg" alt="brights" width="148" height="53">
      </a>
      <nav class="nav">
        <a href="/main/courses.html">Courses</a>
        <a href="/main#how">How it works</a>
        <a href="/main#esa">ESA families</a>
        <a href="/main#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="btn btn-light" href="#">Login</a>
      </div>
    </div>
  </header>

  <main class="course-page">
    <section class="page-hero">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">${esc(subject)}</span>
          <h1>${esc(course.n)}</h1>
          <p class="serif">${esc(course.d)}</p>
          <div class="course-facts">${facts}</div>
          <div class="btn-row" style="margin-top:28px;">
            <a class="btn btn-dark js-lead" href="#" data-intent="enroll" data-course="${esc(course.n)}">Choose this course <span class="arr" aria-hidden="true">→</span></a>
          </div>
          <p class="course-turnaround">Choose this course and we deliver the personalized version in <b>5 working days</b>.</p>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="card">
          ${unitsHtml(course)}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <a class="logo" href="/main">
          <img src="/main/img/logo-full.svg" alt="brights" width="148" height="53">
        </a>
        <div class="footer-mid">
          <nav class="footer-links">
            <a href="/main/courses.html">Courses</a>
            <a href="/main/courses.html#states">State availability</a>
            <a href="/main/terms-of-use.html">Terms of use</a>
            <a href="/main/privacy-policy.html">Privacy Policy</a>
            <a href="/main/refund-policy.html">Refund policy</a>
          </nav>
          <p>Questions about a course — <a href="mailto:${site.hello}">${site.hello}</a></p>
          <p>ESA support — <a href="mailto:${site.esa}">${site.esa}</a></p>
        </div>
        <div class="footer-right">
          <span class="lang-pill">🌐 English</span>
          <p>All rights reserved</p>
        </div>
      </div>
      <p class="disclosure">We provide personalized, self-paced curriculum and educational software. We are not a school and do not issue diplomas, transcripts, or state-recognized academic credit. ESA availability varies by state, program, provider status, and exact offering. Course titles, grade bands, and unit sequences describe our own curriculum packages.</p>
    </div>
  </footer>

${modal}

  <script src="/main/js/catalog.js"></script>
</body>
</html>
`;
}

const catalog = loadCatalog();
const wanted = new Set(ONLY);
const found = [];
const modal = leadModal();
const pages = [];

for (const group of catalog) {
  for (const course of group.courses) {
    if (!wanted.has(course.n)) continue;
    found.push(course.n);
    pages.push({ file: `${slug(course.n)}.html`, subject: group.subject, course });
  }
}

const keep = new Set(pages.map((item) => item.file));
for (const site of sites) {
  const dir = path.join(root, site.dir, "courses");
  fs.mkdirSync(dir, { recursive: true });
  for (const existing of fs.readdirSync(dir)) {
    if (existing.endsWith(".html") && !keep.has(existing)) fs.unlinkSync(path.join(dir, existing));
  }
  for (const item of pages) {
    fs.writeFileSync(path.join(dir, item.file), page(site, item.subject, item.course, modal));
  }
}

const missing = ONLY.filter((name) => !found.includes(name));
if (missing.length) {
  console.error("Missing courses:", missing.join(", "));
  process.exit(1);
}

console.log(found.map((name) => `/main/courses/${slug(name)}.html`).join("\n"));
