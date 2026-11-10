// Arizona ESA (ClassWallet) invoice requests.
// Saves one row per student into the same leads table as /api/leads,
// so every request shows up in the /u dashboard.
const { getPrisma } = require("../lib/prisma");
const { getRequestMeta } = require("../lib/requestMeta");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATES = new Set(["Arizona"]);
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
    const state = str(body.state, 40) || "Arizona";
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
    if (!STATES.has(state)) {
      json(res, 400, { error: "This form is for Arizona ESA families." });
      return;
    }

    const clean = students.map((s) => ({
      firstName: str(s && s.firstName, 60),
      lastName: str(s && s.lastName, 60),
      course: str(s && s.course, 140),
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
      state,
      site: siteFrom(req),
      ip: meta.ip,
      userAgent: meta.userAgent,
      language: meta.language,
      country: meta.country,
      region: meta.region,
      city: meta.city ? decodeURIComponent(meta.city) : null,
      referer: meta.referer,
      source: "classwallet-az",
      platform: platformFrom(meta.userAgent || ""),
    };

    // One row per student: course column carries "Course · Student: First Last".
    await getPrisma().courseLead.createMany({
      data: clean.map((s) => ({
        ...base,
        course: `${s.course} · Student: ${s.firstName} ${s.lastName}`.slice(0, 200),
      })),
    });

    json(res, 200, { success: true, students: clean.length });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: "Could not send. Try again." });
  }
};
