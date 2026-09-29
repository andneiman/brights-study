const { createHmac, timingSafeEqual } = require("crypto");

const LEADS_AUTH_COOKIE = "u_auth";

function dashboardPassword() {
  return process.env.LEADS_DASHBOARD_PASSWORD || "Hello2014";
}

function leadsAuthToken() {
  return createHmac("sha256", dashboardPassword())
    .update("leads-dashboard")
    .digest("hex");
}

function isLeadsPassword(input) {
  const a = createHmac("sha256", "u").update(input).digest();
  const b = createHmac("sha256", "u").update(dashboardPassword()).digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

function isLeadsAuthCookie(value) {
  if (!value) return false;
  const expected = Buffer.from(leadsAuthToken());
  const got = Buffer.from(value);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    out[key] = decodeURIComponent(val);
  }
  return out;
}

function authCookieHeader() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${LEADS_AUTH_COOKIE}=${leadsAuthToken()}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${secure}`;
}

module.exports = {
  LEADS_AUTH_COOKIE,
  leadsAuthToken,
  isLeadsPassword,
  isLeadsAuthCookie,
  parseCookies,
  authCookieHeader,
};
