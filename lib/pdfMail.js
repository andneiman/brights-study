// Mail relays that treat the file as text corrupt every byte above 127.
// The invoice logo is one compressed stream of those bytes. Keep the same
// picture, but store that stream as ASCII so the file survives the trip.

function ascii85(buf) {
  let out = "";
  for (let i = 0; i < buf.length; i += 4) {
    const remain = Math.min(4, buf.length - i);
    let value = 0;
    for (let j = 0; j < 4; j++) value = value * 256 + (j < remain ? buf[i + j] : 0);
    if (value === 0 && remain === 4) {
      out += "z";
      continue;
    }
    const chars = new Array(5);
    for (let j = 4; j >= 0; j--) {
      chars[j] = String.fromCharCode((value % 85) + 33);
      value = Math.floor(value / 85);
    }
    out += chars.slice(0, remain + 1).join("");
  }
  return `${out}~>`;
}

function rewriteXref(buf) {
  const trailerAt = buf.lastIndexOf(Buffer.from("trailer"));
  const body = buf.subarray(0, trailerAt);
  const trailer = buf.subarray(trailerAt, buf.lastIndexOf(Buffer.from("startxref")));
  const text = body.toString("latin1");
  const found = new Map();
  const re = /(\d+) 0 obj/g;
  let match;
  while ((match = re.exec(text))) found.set(Number(match[1]), match.index);
  const size = Math.max(...found.keys()) + 1;
  let xref = `xref\n0 ${size}\n0000000000 65535 f \n`;
  for (let i = 1; i < size; i++) {
    const off = found.get(i);
    xref += off == null ? "0000000000 00000 f \n" : `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  const start = body.length;
  return Buffer.concat([
    body,
    Buffer.from(`${xref}${trailer.toString("latin1")}startxref\n${start}\n%%EOF\n`, "latin1"),
  ]);
}

function sevenBitPdf(pdf) {
  const bytes = Buffer.from(pdf);
  const nl = bytes.indexOf(0x0a);
  const nl2 = bytes.indexOf(0x0a, nl + 1);
  if (nl > 0 && bytes[nl + 1] === 0x25) {
    for (let i = nl + 2; i < nl2; i++) if (bytes[i] >= 128) bytes[i] = 0x7e;
  }
  const marker = Buffer.from("/Filter /FlateDecode");
  const at = bytes.indexOf(marker);
  if (at < 0) return bytes;
  const streamAt = bytes.indexOf(Buffer.from("stream"), at);
  let dataStart = streamAt + 6;
  if (bytes[dataStart] === 0x0d && bytes[dataStart + 1] === 0x0a) dataStart += 2;
  else if (bytes[dataStart] === 0x0a) dataStart += 1;
  const end = bytes.indexOf(Buffer.from("endstream"), dataStart);
  let dataEnd = end;
  if (bytes[dataEnd - 1] === 0x0a) dataEnd -= 1;
  if (bytes[dataEnd - 1] === 0x0d) dataEnd -= 1;
  const encoded = Buffer.from(ascii85(bytes.subarray(dataStart, dataEnd)), "ascii");
  const lengthAt = bytes.lastIndexOf(Buffer.from("/Length "), streamAt);
  const lengthEnd = bytes.indexOf(0x0a, lengthAt);
  const rebuilt = Buffer.concat([
    bytes.subarray(0, lengthAt),
    Buffer.from(`/Length ${encoded.length}`),
    bytes.subarray(lengthEnd, at),
    Buffer.from("/Filter [/ASCII85Decode /FlateDecode]"),
    bytes.subarray(at + marker.length, dataStart),
    encoded,
    bytes.subarray(dataEnd),
  ]);
  return rewriteXref(rebuilt);
}

module.exports = { sevenBitPdf };
