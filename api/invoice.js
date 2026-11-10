// ESA invoice generator backend (used by /main/js/invoice-generator.js).
// Saves one row per student into the same leads table as /api/leads (visible in /u)
// and issues invoice numbers: BR-<STATE>-<MMDDYY in the state's time zone>-<running number>.
const { getPrisma } = require("../lib/prisma");
const { getRequestMeta } = require("../lib/requestMeta");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// To add a state: add it here and in STATES of invoice-generator.js.
const STATES = {
  AZ: { name: "Arizona", tz: "America/Phoenix", source: "classwallet-az" },
};
const MAX_STUDENTS = 8;

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body) return JSON.parse(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function str(value, max) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function siteFrom(req) {
  const host = String(req.headers.host || "").toLowerCase().split(":")[0];
  if (host.includes("aplusbrights.com")) return "aplusbrights.com";
  if (host.includes("brights.study")) return "brights.study";
  return host.replace(/^www\./, "") || "brights.study";
}

function platformFrom(ua) {
  if (/Win/i.test(ua)) return "windows";
  if (/Mac/i.test(ua)) return "mac";
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return null;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const body = await readJson(req);
    const firstName = str(body.firstName, 60);
    const lastName = str(body.lastName, 60);
    const email = str(body.email, 254).toLowerCase();
    const phone = str(body.phone, 40);
    const code = str(body.state, 10).toUpperCase();
    const state = STATES[code];
    const students = Array.isArray(body.students) ? body.students.slice(0, MAX_STUDENTS) : [];

    if (!firstName || !lastName) {
      json(res, 400, { error: "Enter the parent's first and last name." });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      json(res, 400, { error: "Enter a valid email address." });
      return;
    }
    if (phone && phone.replace(/\D/g, "").length < 7) {
      json(res, 400, { error: "Check the phone number or leave it empty." });
      return;
    }
    if (!state) {
      json(res, 400, { error: "Choose an ESA program." });
      return;
    }

    const clean = students.map((s) => ({
      firstName: str(s && s.firstName, 60),
      lastName: str(s && s.lastName, 60),
      course: str(s && s.course, 140),
      pkg: str(s && s.package, 60),
      amount: Number(s && s.amount) > 0 && Number(s && s.amount) < 10000 ? Number(s.amount) : 0,
    }));
    if (!clean.length) {
      json(res, 400, { error: "Add at least one student." });
      return;
    }
    for (const s of clean) {
      if (!s.firstName || !s.lastName) {
        json(res, 400, { error: "Enter each student's first and last name." });
        return;
      }
      if (!s.course) {
        json(res, 400, { error: "Choose a course for each student." });
        return;
      }
    }

    const meta = getRequestMeta(req);
    const base = {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      state: state.name,
      site: siteFrom(req),
      ip: meta.ip,
      userAgent: meta.userAgent,
      language: meta.language,
      country: meta.country,
      region: meta.region,
      city: meta.city ? decodeURIComponent(meta.city) : null,
      referer: meta.referer,
      source: state.source,
      platform: platformFrom(meta.userAgent || ""),
    };

    // One row per student: course column carries course, package, price, student and invoice number.
    const prisma = getPrisma();
    // Invoice number: BR-AZ-<MMDDYY in Arizona time>-<running invoice count>.
    const az = new Intl.DateTimeFormat("en-US", { timeZone: state.tz, month: "2-digit", day: "2-digit", year: "2-digit" })
      .formatToParts(new Date())
      .reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {});
    const day = `${az.month}${az.day}${az.year}`;
    const invoices = [];
    for (const s of clean) {
      const row = await prisma.courseLead.create({
        data: { ...base, course: `${s.course} · Student: ${s.firstName} ${s.lastName}`.slice(0, 200) },
      });
      const seq = await prisma.courseLead.count({
        where: { source: state.source, createdAt: { lte: row.createdAt } },
      });
      const number = `BR-${code}-${day}-${seq}`;
      const parts = [s.course + (s.pkg ? ` (${s.pkg}${s.amount ? ` $${s.amount}` : ""})` : ""), `Student: ${s.firstName} ${s.lastName}`, `Invoice ${number}`];
      await prisma.courseLead.update({ where: { id: row.id }, data: { course: parts.join(" · ").slice(0, 200) } });
      invoices.push({ number, firstName: s.firstName, lastName: s.lastName });
    }

    json(res, 200, { success: true, invoices });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: "Could not send. Try again." });
  }
};
