const { getPrisma } = require("../lib/prisma");
const { getRequestMeta } = require("../lib/requestMeta");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATES = new Set([
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
]);

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

function siteFrom(req) {
  const host = String(req.headers.host || "").toLowerCase().split(":")[0];
  if (host.includes("aplusbrights.com")) return "aplusbrights.com";
  if (host.includes("brights.study")) return "brights.study";
  return host.replace(/^www\./, "") || "brights.study";
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      json(res, 405, { error: "Method not allowed" });
      return;
    }

    const body = await readJson(req);
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const state = typeof body.state === "string" ? body.state.trim() : "";
    const course = typeof body.course === "string" ? body.course.trim() : "";
    const source = typeof body.source === "string" ? body.source.slice(0, 120) : "course";
    const digits = phone.replace(/\D/g, "");

    if (name.length < 1 || name.length > 120) {
      json(res, 400, { error: "Enter your name." });
      return;
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      json(res, 400, { error: "Enter a valid email address." });
      return;
    }
    if (digits.length < 7 || phone.length > 40) {
      json(res, 400, { error: "Enter a phone number." });
      return;
    }
    if (!STATES.has(state)) {
      json(res, 400, { error: "Choose a state." });
      return;
    }
    if (course.length < 1 || course.length > 200) {
      json(res, 400, { error: "Choose a course." });
      return;
    }

    const meta = getRequestMeta(req);
    const ua = meta.userAgent || "";
    const platform = /Win/i.test(ua)
      ? "windows"
      : /Mac/i.test(ua)
        ? "mac"
        : /Android/i.test(ua)
          ? "android"
          : /iPhone|iPad|iPod/i.test(ua)
            ? "ios"
            : null;

    const lead = await getPrisma().courseLead.create({
      data: {
        name,
        email,
        phone,
        state,
        course,
        site: siteFrom(req),
        ip: meta.ip,
        userAgent: meta.userAgent,
        language: meta.language,
        country: meta.country,
        region: meta.region,
        city: meta.city ? decodeURIComponent(meta.city) : null,
        referer: meta.referer,
        source,
        platform,
      },
    });

    json(res, 200, { success: true, id: lead.id });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: "Could not send. Try again." });
  }
};
