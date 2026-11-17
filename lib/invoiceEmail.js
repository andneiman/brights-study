const COURSE_URL = "https://www.brights.study/main/courses/learn-smart.html";
const GUIDE_URL = "https://www.brights.study/main/arizona-esa-classwallet.html";
const PRICE = "$69.00";

// iOS Mail hides the rest of a letter behind "..." when a line is only a
// URL, including when a long address wraps onto a line of its own or a
// paragraph ends on that link. Link text stays short, a sentence continues
// after every link, and any address in the plain text shares a short line
// with a word.

function listAnd(items) {
  if (items.length <= 1) return items[0] || "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(paragraph) {
  const lines = [];
  let line = "";
  for (const word of paragraph.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > 68 && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function addressLine(label, url) {
  const line = `${label} ${url}`;
  if (line.length > 74 || /^\s*https?:\/\//.test(line)) {
    throw new Error("Invoice letter would be cut off by mail.");
  }
  return line;
}

function invoiceLetter(parentFirst, children) {
  const names = children.map((child) => child.first);
  const who = listAnd(names);
  const many = children.length > 1;
  const subject = many
    ? `Your A+ Brights course for ${who}: invoices and next steps`
    : `Your A+ Brights course for ${who}: invoice and next steps`;
  const thanks = `Thank you for your request! We've received it and are excited to have ${who} join Learn How to Learn Smart (with AI).`;
  const discover = many
    ? `${who} will discover how memory and focus really work, learn study methods that are proven to help, and find out how to use AI as a personal tutor (safely, and without letting it do the work). The result: less time cramming, better grades, and confidence with AI that will serve them for years.`
    : `${who} will discover how memory and focus really work, learn study methods that are proven to help, and find out how to use AI as a personal tutor (safely, and without letting it do the work). The result: less time cramming, better grades, and confidence with AI that will serve ${who} for years.`;
  const attached = many
    ? `Your invoices are attached, one for each child: ${listAnd(children.map((child) => `${child.number} for ${child.first} (${PRICE})`))}.`
    : `Your invoice is attached (${children[0].number}, ${PRICE}).`;
  const course = `<a href="${COURSE_URL}">this page</a>`;
  const guide = `<a href="${GUIDE_URL}">the ClassWallet guide</a>`;
  const html = [
    `<p>Hi ${escapeHtml(parentFirst)},</p>`,
    `<p>${escapeHtml(thanks)}</p>`,
    `<p>${escapeHtml(discover)}</p>`,
    `<p>About the course: the details are on ${course} when you want them.</p>`,
    `<p>${escapeHtml(attached)}</p>`,
    `<p>Next steps: everything about paying with ClassWallet and what happens after is described in ${guide} when you are ready.</p>`,
    `<p>${escapeHtml("If you have any questions, just reply to this email. And if you're not in Arizona, please let us know your state and we'll send you the right payment option.")}</p>`,
    `<p>Best regards,<br>Andrew<br>Brights Team</p>`,
  ].join("");
  const text = [
    ...wrap(`Hi ${parentFirst},`),
    "",
    ...wrap(thanks),
    "",
    ...wrap(discover),
    "",
    ...wrap("About the course: the details are on this page when you want them."),
    addressLine("Course:", COURSE_URL),
    "",
    ...wrap(attached),
    "",
    ...wrap("Next steps: everything about paying with ClassWallet and what happens after is described in the ClassWallet guide when you are ready."),
    addressLine("Guide:", GUIDE_URL),
    "",
    ...wrap("If you have any questions, just reply to this email. And if you're not in Arizona, please let us know your state and we'll send you the right payment option."),
    "",
    "Best regards,",
    "Andrew",
    "Brights Team",
  ].join("\n");
  if (/^https?:\/\/\S+$/m.test(text) || /<a href="[^"]+">https?:\/\//.test(html)) {
    throw new Error("Invoice letter would be cut off by mail.");
  }
  return { subject, text, html };
}

module.exports = { invoiceLetter, COURSE_URL, GUIDE_URL, PRICE };
