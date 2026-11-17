// The buildPdf from main/js/invoice-generator.js, with the JPEG logo. The ESA
// onboarding draws the same invoice in the browser for Download; keep both in step.

const { jsPDF } = require("jspdf");
const LOGO = require("./invoiceLogo");

const VENDOR = {
  displayName: "A+ Brights",
  legalName: "Magent Tech Inc",
  address: ["251 Little Falls Dr", "Wilmington, DE 19808"],
  website: "www.aplusbrights.com",
};

function money(n) {
  return "$" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function longDate(d) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

const AZ = {
  name: "Arizona",
  program: "Arizona Empowerment Scholarship Account (ESA)",
  platform: "ClassWallet Direct Pay",
  payLines(inv) {
    return [
      "Sign in to ClassWallet through the Arizona ESA portal. In Direct Pay, click PAY.",
      'Search for "' + VENDOR.displayName + '" and click PAY.',
      "Enter the payment amount: " + money(inv.total) + ".",
      "Upload this invoice (PDF).",
      "Choose the Arizona ESA purse and the expense category that fits your order.",
      'Comments: "' + inv.description + '". Invoice number: ' + inv.number + ".",
      "Review and submit.",
    ];
  },
};

function buildPdf(inv, state) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const M = 54;
  const ink = [38, 38, 38], muted = [115, 115, 115], rule = [225, 225, 225];
  const color = (c) => doc.setTextColor(c[0], c[1], c[2]);
  let y = M;

  doc.addImage(LOGO, "JPEG", M, y - 10, 119, 36);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  color(ink);
  doc.text("INVOICE", W - M, y + 18, { align: "right" });

  y += 56;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const vendorLines = ["Vendor: " + VENDOR.displayName, VENDOR.legalName].concat(VENDOR.address, [VENDOR.website]);
  color(ink);
  vendorLines.forEach((l, i) => doc.text(l, M, y + i * 14));

  const meta = [
    ["Invoice number", inv.number],
    ["Invoice date", longDate(inv.date)],
    ["Amount due", money(inv.total)],
    ["Pay with", state.platform],
  ];
  meta.forEach((row, i) => {
    color(muted);
    doc.text(row[0], W - M - 250, y + i * 14);
    color(ink);
    doc.text(row[1], W - M, y + i * 14, { align: "right" });
  });

  y += Math.max(vendorLines.length, meta.length) * 14 + 12;
  doc.setDrawColor(rule[0], rule[1], rule[2]);
  doc.line(M, y, W - M, y);
  y += 26;

  function block(x, title, rows) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    color(muted);
    doc.text(title.toUpperCase(), x, y);
    doc.setFontSize(11);
    color(ink);
    rows.forEach((r, i) => {
      doc.setFont("helvetica", i === 0 ? "bold" : "normal");
      doc.text(r, x, y + 18 + i * 15);
    });
  }
  const billRows = [inv.parent];
  block(M, "Bill to (parent, ESA account holder)", billRows);
  block(W / 2 + 10, "Student", [inv.student, state.program]);
  y += 18 + Math.max(billRows.length, 2) * 15 + 24;

  doc.setFillColor(244, 244, 245);
  doc.rect(M, y, W - 2 * M, 26, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  color(muted);
  const cQty = W - M - 190, cPrice = W - M - 100, cAmt = W - M - 12;
  doc.text("DESCRIPTION", M + 12, y + 17);
  doc.text("QTY", cQty, y + 17, { align: "right" });
  doc.text("PRICE", cPrice, y + 17, { align: "right" });
  doc.text("AMOUNT", cAmt, y + 17, { align: "right" });
  y += 26;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  color(ink);
  const desc = doc.splitTextToSize(inv.description, cQty - M - 60);
  doc.text(desc, M + 12, y + 22);
  doc.text("1", cQty, y + 22, { align: "right" });
  doc.text(money(inv.total), cPrice, y + 22, { align: "right" });
  doc.text(money(inv.total), cAmt, y + 22, { align: "right" });
  y += 22 + desc.length * 14 + 6;
  doc.line(M, y, W - M, y);

  y += 24;
  doc.setFontSize(10.5);
  [["Subtotal", money(inv.total)], ["Tax", money(0)]].forEach((r) => {
    color(muted); doc.text(r[0], cPrice, y, { align: "right" });
    color(ink); doc.text(r[1], cAmt, y, { align: "right" });
    y += 16;
  });
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Total due", cPrice, y, { align: "right" });
  doc.text(money(inv.total), cAmt, y, { align: "right" });

  y += 40;
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  const wrapped = state.payLines(inv).map((t, i) => doc.splitTextToSize((i + 1) + ". " + t, W - 2 * M - 32));
  const n = wrapped.reduce((a, w) => a + w.length, 0);
  const boxH = 42 + n * 13 + wrapped.length * 2;
  doc.setFillColor(244, 244, 245);
  doc.roundedRect(M, y, W - 2 * M, boxH, 8, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  color(ink);
  doc.text("How to pay with your " + state.name + " ESA", M + 16, y + 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  let py = y + 42;
  wrapped.forEach((w) => { doc.text(w, M + 16, py); py += w.length * 13 + 2; });

  return doc;
}

// date is the parent's calendar day, YYYY-MM-DD, so it matches the number and the download.
function invoicePdf({ number, date, parent, student, course, amount }) {
  const [y, m, d] = String(date).split("-").map(Number);
  const doc = buildPdf({
    number,
    date: new Date(Date.UTC(y, m - 1, d)),
    parent,
    student,
    description: VENDOR.displayName + " " + course,
    total: amount,
  }, AZ);
  return Buffer.from(doc.output("arraybuffer"));
}

module.exports = { invoicePdf };
