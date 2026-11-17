const crypto = require("crypto");

const COURSE_URL = "https://www.brights.study/main/courses/learn-smart.html";
const GUIDE_URL = "https://www.brights.study/main/arizona-esa-classwallet.html";
const PRICE = "$69.00";

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
  const paragraphs = [
    `Hi ${parentFirst},`,
    thanks,
    discover,
    `About the course: ${COURSE_URL}`,
    attached,
    `Next steps: everything about paying with ClassWallet and what happens after is described here: ${GUIDE_URL}`,
    "If you have any questions, just reply to this email. And if you're not in Arizona, please let us know your state and we'll send you the right payment option.",
    "Best regards,\nAndrew\nBrights Team",
  ];
  const text = paragraphs.join("\n\n");
  // Gmail folds text that repeats an earlier letter in the same thread behind "...".
  // A hidden token unique to this letter in every paragraph keeps the whole letter visible.
  const token = crypto.randomBytes(6).toString("hex");
  const mark = (i) => `<span style="display:none;font-size:0;line-height:0;max-height:0;overflow:hidden;opacity:0;color:transparent">${token}${i}</span>`;
  const html = paragraphs.map((paragraph, i) => {
    const body = escapeHtml(paragraph).replace(/\n/g, "<br>");
    return `<p>${body
      .replace(escapeHtml(COURSE_URL), `<a href="${COURSE_URL}">${escapeHtml(COURSE_URL)}</a>`)
      .replace(escapeHtml(GUIDE_URL), `<a href="${GUIDE_URL}">${escapeHtml(GUIDE_URL)}</a>`)}${mark(i)}</p>`;
  }).join("");
  return { subject, text, html };
}

module.exports = { invoiceLetter, COURSE_URL, GUIDE_URL, PRICE };
