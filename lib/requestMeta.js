function firstHeader(headers, name) {
  const value = headers[name] || headers[name.toLowerCase()];
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : value;
  return raw.split(",")[0] ? raw.split(",")[0].trim() : null;
}

function getRequestMeta(req) {
  const h = req.headers || {};
  const ip =
    firstHeader(h, "x-forwarded-for") ||
    firstHeader(h, "x-real-ip") ||
    firstHeader(h, "x-vercel-forwarded-for");

  return {
    ip,
    userAgent: firstHeader(h, "user-agent"),
    language: firstHeader(h, "accept-language"),
    country: firstHeader(h, "x-vercel-ip-country"),
    region: firstHeader(h, "x-vercel-ip-country-region"),
    city: firstHeader(h, "x-vercel-ip-city"),
    referer: firstHeader(h, "referer"),
  };
}

module.exports = { getRequestMeta };
