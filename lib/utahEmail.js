const COURSE = "Learn How to Learn Smart (with AI)";
// The Odyssey portal address for step 2. Empty until the right link is confirmed; the step then has no link.
const ODYSSEY_URL = "";
const WHATSAPP_URL = "https://wa.me/16284688786";

const P = 'style="margin:0 0 16px;line-height:1.5"';

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

function utahLetter(parentFirst, kids) {
  const who = listAnd(kids);
  const many = kids.length > 1;
  const subject = `Your A+ Brights course for ${who}: how to get it with Utah Fits All`;
  const discover = `${who} will discover how memory and focus really work, learn study methods that are proven to help, and find out how to use AI as a personal tutor (safely, and without letting it do the work). The result: less time cramming, better grades, and confidence with AI that will serve ${many ? "them" : who} for years.`;
  const login = ODYSSEY_URL ? `Log in to the Odyssey portal: ${ODYSSEY_URL}` : "Log in to the Odyssey portal.";

  const text = [
    `Hi ${parentFirst},`,
    `Thank you for your request! We've received it and are excited to have ${who} join ${COURSE}.`,
    discover,
    [
      "How to get the course with your Utah Fits All scholarship:",
      `1. Copy the course name: ${COURSE}`,
      `2. ${login}`,
      "3. Paste the course name into the search bar and choose the A+ Brights course.",
    ].join("\n"),
    `If you have any questions, just reply to this email or message us on WhatsApp: ${WHATSAPP_URL}`,
    "Best regards,\nAndrew\nBrights Team",
  ].join("\n\n");

  const course = `<b>${escapeHtml(COURSE)}</b>`;
  const loginHtml = ODYSSEY_URL
    ? `Log in to the <a href="${ODYSSEY_URL}">Odyssey portal</a>.`
    : "Log in to the Odyssey portal.";
  const html = [
    `<p ${P}>Hi ${escapeHtml(parentFirst)},</p>`,
    `<p ${P}>Thank you for your request! We've received it and are excited to have ${escapeHtml(who)} join ${course}.</p>`,
    `<p ${P}>${escapeHtml(discover)}</p>`,
    `<p style="margin:0 0 8px;line-height:1.5">How to get the course with your Utah Fits All scholarship:</p>`,
    `<ol style="margin:0 0 16px;padding-left:22px;line-height:1.5">`,
    `<li style="margin:0 0 6px">Copy the course name: ${course}</li>`,
    `<li style="margin:0 0 6px">${loginHtml}</li>`,
    `<li style="margin:0">Paste the course name into the search bar and choose the A+ Brights course.</li>`,
    `</ol>`,
    `<p ${P}>If you have any questions, just reply to this email or message us on <a href="${WHATSAPP_URL}">WhatsApp</a>.</p>`,
    `<p style="margin:0;line-height:1.5">Best regards,<br>Andrew<br>Brights Team</p>`,
  ].join("");
  return { subject, text, html };
}

module.exports = { utahLetter, COURSE, ODYSSEY_URL };
