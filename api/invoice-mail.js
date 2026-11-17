const { invoiceLetter } = require("../lib/invoiceEmail");
const { sevenBitPdf } = require("../lib/pdfMail");

const MAIL_URL = "https://brights-mail.hi-sender.workers.dev/send";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PDF = 1500000;

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string" && req.body) return Promise.resolve(parseBody(req.body, req.headers["content-type"]));
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      resolve(raw ? parseBody(raw, req.headers["content-type"]) : {});
    });
    req.on("error", reject);
  });
}

function parseBody(raw, type) {
  if (String(type || "").includes("application/json")) return JSON.parse(raw);
  const params = new URLSearchParams(raw);
  return Object.fromEntries(params.entries());
}

function htmlPage(res, status, message) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const close = status < 400 ? "<script>setTimeout(function(){window.close()},400)</script>" : "";
  res.end(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Invoice</title><body style="font:16px/1.45 -apple-system,sans-serif;padding:24px">${message}${close}`);
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function fail(res, wantsHtml, status, error, code) {
  if (wantsHtml) htmlPage(res, status, error);
  else json(res, status, { error, code });
}

function cleanName(value) {
  return String(value || "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 40);
}

// A form post turns "+" in base64 into a space, which breaks the PDF. Base64 has no spaces.
function pdfBytes(value) {
  const raw = String(value || "").replace(/ /g, "+").replace(/\s/g, "");
  return Buffer.from(raw, "base64");
}

module.exports = async function handler(req, res) {
  const wantsHtml = !String(req.headers.accept || "").includes("application/json")
    && !String(req.headers["content-type"] || "").includes("application/json");
  try {
    if (req.method !== "POST") {
      fail(res, wantsHtml, 405, "Method not allowed", "method");
      return;
    }
    const key = process.env.BRIGHTS_MAIL_KEY;
    if (!key) {
      fail(res, wantsHtml, 503, "Invoice email is not configured yet.", "mail_not_configured");
      return;
    }

    const body = await readBody(req);
    const to = String(body.to || "").trim().toLowerCase();
    const parentFirst = cleanName(body.parentFirst);
    let children = body.children;
    if (typeof children === "string") children = JSON.parse(children);
    if (!EMAIL_RE.test(to) || to.length > 254) {
      fail(res, wantsHtml, 400, "Enter a valid email address.", "email");
      return;
    }
    if (!parentFirst || !Array.isArray(children) || children.length < 1 || children.length > 6) {
      fail(res, wantsHtml, 400, "The invoice is missing a name.", "children");
      return;
    }

    const ready = [];
    for (const child of children) {
      const first = cleanName(child.first);
      const number = String(child.number || "").replace(/[^A-Za-z0-9-]+/g, "").slice(0, 40);
      const filename = `${number}.pdf`;
      const pdf = sevenBitPdf(pdfBytes(child.pdf));
      if (!first || !number) {
        fail(res, wantsHtml, 400, "The invoice is missing a name.", "child");
        return;
      }
      if (pdf.length < 5 || pdf.subarray(0, 4).toString() !== "%PDF" || !pdf.includes(Buffer.from("%%EOF")) || pdf.length > MAX_PDF) {
        fail(res, wantsHtml, 400, "The invoice file is not a PDF.", "pdf");
        return;
      }
      ready.push({
        first,
        number,
        filename: filename.endsWith(".pdf") ? filename : `${filename}.pdf`,
        pdf,
      });
    }

    const letter = invoiceLetter(parentFirst, ready);
    const mail = await fetch(MAIL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: "hello@mail.brights.study", name: "Brights" },
        to: [to],
        subject: letter.subject,
        html: letter.html,
        text: letter.text,
        replyTo: "team@brights.study",
        attachments: ready.map((child) => ({
          filename: child.filename,
          type: "application/pdf",
          disposition: "attachment",
          content: child.pdf.toString("latin1"),
        })),
      }),
    });
    const data = await mail.json().catch(() => ({}));
    if (!mail.ok || !data.messageId) {
      fail(res, wantsHtml, 502, data.error || "The invoice email was not accepted.", data.code || "mail");
      return;
    }
    if (wantsHtml) htmlPage(res, 200, "Your invoice is on its way. You can close this tab.");
    else json(res, 200, { messageId: data.messageId });
  } catch (error) {
    fail(res, wantsHtml, 400, "Could not send the invoice email.", "bad_request");
  }
};
