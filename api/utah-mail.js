const { utahLetter } = require("../lib/utahEmail");

const MAIL_URL = "https://brights-mail.hi-sender.workers.dev/send";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PIXEL = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");

function cleanName(value) {
  return String(value || "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 40);
}

// The Utah onboarding loads this as an image (it may not call this site from script).
// Fields: to, parentFirst, kids (first names joined by "|").
module.exports = async function handler(req, res) {
  const q = new URL(req.url, "https://www.brights.study").searchParams;
  const asJson = q.get("format") === "json";
  const done = (status, payload) => {
    if (payload.error) console.error("utah-mail", payload.code, payload.error);
    if (asJson) {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(payload));
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/gif");
    res.setHeader("Cache-Control", "no-store");
    res.end(PIXEL);
  };
  try {
    if (req.method !== "GET") return done(405, { error: "Method not allowed", code: "method" });
    const key = process.env.BRIGHTS_MAIL_KEY;
    if (!key) return done(503, { error: "Email is not configured yet.", code: "mail_not_configured" });
    const to = String(q.get("to") || "").trim().toLowerCase();
    const parentFirst = cleanName(q.get("parentFirst"));
    const kids = String(q.get("kids") || "").split("|").map(cleanName).filter(Boolean).slice(0, 6);
    if (!EMAIL_RE.test(to) || to.length > 254) return done(400, { error: "Enter a valid email address.", code: "email" });
    if (!parentFirst || !kids.length) return done(400, { error: "A name is missing.", code: "names" });
    const letter = utahLetter(parentFirst, kids);
    const mail = await fetch(MAIL_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: { email: "hello@mail.brights.study", name: "Brights" },
        to: [to],
        subject: letter.subject,
        html: letter.html,
        text: letter.text,
        replyTo: "team@brights.study",
      }),
    });
    const data = await mail.json().catch(() => ({}));
    if (!mail.ok || !data.messageId) {
      return done(502, { error: data.error || "The email was not accepted.", code: data.code || "mail" });
    }
    return done(200, { messageId: data.messageId });
  } catch (error) {
    return done(400, { error: "Could not send the email.", code: "bad_request" });
  }
};
