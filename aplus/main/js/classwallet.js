/* Arizona ESA invoice generator: parent + students -> one PDF invoice per student.
   Each request is saved to the leads table (/api/esa-invoice), which returns invoice numbers. */
(function () {
  var form = document.getElementById('cw-form');
  if (!form || !window.CATALOG) return;

  // ---- Invoice settings -------------------------------------------------
  var DOMAIN = 'aplusbrights.com';
  var EMAIL = 'team@aplusbrights.com';
  var VENDOR = {
    name: 'A+ Brights',            // display name in ClassWallet
    lines: ['Magent Tech Inc', '251 Little Falls Dr', 'Wilmington, DE 19808', 'www.' + DOMAIN, EMAIL]
  };
  var DEFAULT_COURSE = 'Learn How to Learn Smart (with AI)';
  var CATALOG_URL = '/main/courses.html';
  var PROGRAM = 'Arizona Empowerment Scholarship Account (ESA)';
  var CATEGORY = 'Curriculum';
  var STATE = 'Arizona';
  var MAX = 8;
  var JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  // -----------------------------------------------------------------------

  var list = document.getElementById('cw-students');
  var addBtn = document.getElementById('cw-add');
  var errorEl = document.getElementById('cw-error');
  var submitBtn = document.getElementById('cw-submit');
  var done = document.getElementById('cw-done');
  var filesEl = document.getElementById('cw-files');
  var sending = false;

  // Packages from the catalog price line, e.g. "Full year $199 · Semester $129".
  var LABELS = {
    'full year': 'Full year',
    'semester': 'One semester (1st or 2nd)',
    '2 weeks': '2-week course',
    'specialty': 'Full course',
    'whole course': 'Full course'
  };
  function packages(p) {
    var parts = String(p || '').split('·').map(function (x) { return x.trim(); });
    var out = [];
    parts.forEach(function (part) {
      var m = part.match(/\$(\d+(?:\.\d+)?)/);
      var label = part.replace(/\$\d+(?:\.\d+)?/, '').trim().toLowerCase();
      if (m) {
        out.push({ key: label, price: Number(m[1]) });
      } else if (out.length && !out[out.length - 1].key) {
        out[out.length - 1].key = label;
      }
    });
    return out.map(function (x) {
      return { label: LABELS[x.key] || (x.key ? x.key.charAt(0).toUpperCase() + x.key.slice(1) : 'Full course'), price: x.price };
    });
  }

  var COURSES = [];
  var BY_NAME = {};
  CATALOG.forEach(function (group) {
    var items = group.courses;
    var bySubject = window.STATE_COURSES && STATE_COURSES[group.subject];
    if (bySubject && bySubject[STATE]) items = bySubject[STATE];
    var g = { subject: group.subject, items: [] };
    items.forEach(function (c) {
      var pk = packages(c.p);
      if (!pk.length) return;
      g.items.push(c.n);
      BY_NAME[c.n] = { name: c.n, grade: c.g || '', subject: group.subject, packages: pk };
    });
    if (g.items.length) COURSES.push(g);
  });

  function money(n) {
    return '$' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/, ',');
  }

  // ---- Form -------------------------------------------------------------
  var seq = 0;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function field(labelText, input) {
    var wrap = el('div');
    var label = el('label', 'lead-label', labelText);
    label.htmlFor = input.id;
    wrap.appendChild(label);
    wrap.appendChild(input);
    return wrap;
  }
  function textInput(id, placeholder) {
    var i = el('input', 'lead-input');
    i.type = 'text';
    i.id = id;
    i.placeholder = placeholder;
    i.autocomplete = 'off';
    return i;
  }
  function placeholder(sel, text) {
    var ph = el('option', '', text);
    ph.value = '';
    ph.disabled = true;
    ph.selected = true;
    sel.appendChild(ph);
  }
  function courseSelect(id) {
    var sel = el('select', 'lead-input');
    sel.id = id;
    placeholder(sel, 'Select a course');
    COURSES.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g.subject;
      g.items.forEach(function (n) {
        var o = el('option', '', n);
        o.value = n;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    return sel;
  }

  function addStudent() {
    if (list.children.length >= MAX) return;
    seq += 1;
    var card = el('div', 'cw-student');
    var head = el('div', 'cw-student-head');
    head.appendChild(el('b'));
    var rm = el('button', 'cw-remove', 'Remove');
    rm.type = 'button';
    rm.addEventListener('click', function () { card.remove(); renumber(); });
    head.appendChild(rm);
    card.appendChild(head);

    var two = el('div', 'cw-two');
    two.appendChild(field('First name', textInput('cw-s' + seq + '-first', 'Student first name')));
    two.appendChild(field('Last name', textInput('cw-s' + seq + '-last', 'Student last name')));
    card.appendChild(two);

    var course = courseSelect('cw-s' + seq + '-course');
    var courseWrap = field('Course', course);
    var link = el('a', 'cw-catalog-link', 'See all courses in the catalog');
    link.href = CATALOG_URL;
    link.target = '_blank';
    link.rel = 'noopener';
    courseWrap.appendChild(link);
    card.appendChild(courseWrap);

    var pkg = el('select', 'lead-input');
    pkg.id = 'cw-s' + seq + '-pkg';
    placeholder(pkg, 'Select a course first');
    pkg.disabled = true;
    var pkgWrap = field('Package', pkg);
    card.appendChild(pkgWrap);

    course.addEventListener('change', function () {
      var c = BY_NAME[course.value];
      pkg.innerHTML = '';
      c.packages.forEach(function (p, i) {
        var o = el('option', '', p.label + ' — ' + money(p.price));
        o.value = String(i);
        pkg.appendChild(o);
      });
      pkg.disabled = c.packages.length === 1;
      pkg.value = '0';
    });

    list.appendChild(card);
    if (BY_NAME[DEFAULT_COURSE]) {
      course.value = DEFAULT_COURSE;
      course.dispatchEvent(new Event('change'));
    }
    renumber();
  }

  function renumber() {
    var cards = list.querySelectorAll('.cw-student');
    cards.forEach(function (c, i) {
      c.querySelector('.cw-student-head b').textContent = 'Student ' + (i + 1);
      c.querySelector('.cw-remove').hidden = cards.length === 1;
    });
    addBtn.hidden = cards.length >= MAX;
  }

  function showError(message, field) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    form.querySelectorAll('[aria-invalid]').forEach(function (x) { x.removeAttribute('aria-invalid'); });
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    }
    return false;
  }

  // ---- PDF ---------------------------------------------------------------
  var jspdfPromise = null;
  function loadJsPDF() {
    if (window.jspdf) return Promise.resolve(window.jspdf);
    if (!jspdfPromise) {
      jspdfPromise = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = JSPDF_URL;
        s.onload = function () { resolve(window.jspdf); };
        s.onerror = function () { jspdfPromise = null; reject(new Error('Could not load the PDF tool. Check your connection and try again.')); };
        document.head.appendChild(s);
      });
    }
    return jspdfPromise;
  }

  function schoolYear(d) {
    var y = d.getFullYear();
    return d.getMonth() >= 6 ? y + '–' + (y + 1) : (y - 1) + '–' + y;
  }
  function servicePeriod(label, d) {
    if (label === 'Full year') return 'School year ' + schoolYear(d);
    if (label.indexOf('semester') !== -1) return 'One semester, school year ' + schoolYear(d);
    return 'Starts when the payment is approved';
  }
  function fmtDate(d) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function buildPdf(jspdf, inv) {
    var doc = new jspdf.jsPDF({ unit: 'pt', format: 'letter' });
    var W = doc.internal.pageSize.getWidth();
    var M = 54;
    var ink = [38, 38, 38];
    var muted = [115, 115, 115];
    var line = [225, 225, 225];
    var y = M;

    doc.setTextColor.apply(doc, ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(VENDOR.name, M, y + 6);
    doc.setFontSize(26);
    doc.text('INVOICE', W - M, y + 6, { align: 'right' });

    y += 30;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor.apply(doc, muted);
    VENDOR.lines.forEach(function (l, i) {
      if (i === 0) doc.setTextColor.apply(doc, ink);
      doc.text(l, M, y + i * 14);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor.apply(doc, muted);
    });

    var meta = [
      ['Invoice number', inv.number],
      ['Invoice date', fmtDate(inv.date)],
      ['Status', 'Due, pay with ClassWallet Direct Pay']
    ];
    meta.forEach(function (row, i) {
      doc.setTextColor.apply(doc, muted);
      doc.text(row[0], W - M - 260, y + i * 14);
      doc.setTextColor.apply(doc, ink);
      doc.text(row[1], W - M, y + i * 14, { align: 'right' });
    });

    y += 14 * VENDOR.lines.length + 8;
    doc.setDrawColor.apply(doc, line);
    doc.line(M, y, W - M, y);
    y += 26;

    function block(x, title, rows) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor.apply(doc, muted);
      doc.text(title.toUpperCase(), x, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor.apply(doc, ink);
      rows.forEach(function (r, i) {
        if (i === 0) doc.setFont('helvetica', 'bold');
        doc.text(r, x, y + 18 + i * 15);
        doc.setFont('helvetica', 'normal');
      });
    }
    block(M, 'Bill to (parent)', [inv.parent, inv.email].concat(inv.phone ? [inv.phone] : []));
    block(W / 2 + 10, 'Student', [inv.student, PROGRAM]);

    y += 82;
    // Table header
    doc.setFillColor(244, 244, 245);
    doc.rect(M, y, W - 2 * M, 26, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor.apply(doc, muted);
    var cQty = W - M - 190, cPrice = W - M - 100, cAmt = W - M - 12;
    doc.text('DESCRIPTION', M + 12, y + 17);
    doc.text('QTY', cQty, y + 17, { align: 'right' });
    doc.text('PRICE', cPrice, y + 17, { align: 'right' });
    doc.text('AMOUNT', cAmt, y + 17, { align: 'right' });
    y += 26;

    // Line item
    var descW = cQty - M - 60;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor.apply(doc, ink);
    var titleLines = doc.splitTextToSize(inv.course + ' (' + inv.pkg + ')', descW);
    doc.text(titleLines, M + 12, y + 22);
    doc.setFont('helvetica', 'normal');
    doc.text('1', cQty, y + 22, { align: 'right' });
    doc.text(money(inv.price), cPrice, y + 22, { align: 'right' });
    doc.text(money(inv.price), cAmt, y + 22, { align: 'right' });
    doc.setFontSize(9.5);
    doc.setTextColor.apply(doc, muted);
    var details = [
      'Personalized, self-paced online course for one student (individual license, not a family subscription).',
      'Includes course lessons, practice with instant feedback and progress reports for the parent.',
      'Student: ' + inv.student + (inv.grade ? '   ·   ' + inv.grade : ''),
      'Service period: ' + servicePeriod(inv.pkg, inv.date),
      'Expense category: ' + CATEGORY
    ];
    var dy = y + 26 + titleLines.length * 14;
    details.forEach(function (t) {
      var wrapped = doc.splitTextToSize(t, descW);
      doc.text(wrapped, M + 12, dy);
      dy += wrapped.length * 12 + 2;
    });
    y = dy + 10;
    doc.setDrawColor.apply(doc, line);
    doc.line(M, y, W - M, y);

    // Totals
    y += 24;
    doc.setFontSize(10.5);
    doc.setTextColor.apply(doc, muted);
    doc.text('Subtotal', cPrice, y, { align: 'right' });
    doc.setTextColor.apply(doc, ink);
    doc.text(money(inv.price), cAmt, y, { align: 'right' });
    y += 16;
    doc.setTextColor.apply(doc, muted);
    doc.text('Tax', cPrice, y, { align: 'right' });
    doc.setTextColor.apply(doc, ink);
    doc.text(money(0), cAmt, y, { align: 'right' });
    y += 24;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Total due', cPrice, y, { align: 'right' });
    doc.text(money(inv.price), cAmt, y, { align: 'right' });

    // How to pay
    y += 46;
    doc.setFillColor(244, 244, 245);
    var payLines = [
      '1. Sign in to ClassWallet through the Arizona ESA portal. In Direct Pay, click PAY.',
      '2. Search for "' + VENDOR.name + '" and click PAY.',
      '3. Enter the payment amount: ' + money(inv.price) + '.',
      '4. Upload this invoice (PDF).',
      '5. Choose the Arizona ESA purse and the expense category above.',
      '6. Comments: "' + VENDOR.name + ' ' + inv.course + ' for ' + inv.student + '". Invoice number: ' + inv.number + '.',
      '7. Review and submit.'
    ];
    doc.setFontSize(9.5);
    var wrappedPay = payLines.map(function (t) { return doc.splitTextToSize(t, W - 2 * M - 32); });
    var nLines = wrappedPay.reduce(function (n, w) { return n + w.length; }, 0);
    var boxH = 30 + nLines * 13 + payLines.length * 2 + 12;
    doc.roundedRect(M, y, W - 2 * M, boxH, 8, 8, 'F');
    doc.setFontSize(10.5);
    doc.text('How to pay with your Arizona ESA', M + 16, y + 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    var py = y + 42;
    wrappedPay.forEach(function (w) {
      doc.text(w, M + 16, py);
      py += w.length * 13 + 2;
    });

    // Footer
    var H = doc.internal.pageSize.getHeight();
    doc.setFontSize(9);
    doc.setTextColor.apply(doc, muted);
    doc.text('Questions about this invoice: ' + EMAIL, M, H - 46);
    doc.text('Full guide: www.' + DOMAIN + '/main/arizona-esa-classwallet.html', M, H - 32);

    return doc;
  }

  function fileName(inv) {
    return ('Brights-invoice-' + inv.number + '-' + inv.student).replace(/[^A-Za-z0-9-]+/g, '-') + '.pdf';
  }

  // ---- Submit -------------------------------------------------------------
  addBtn.addEventListener('click', addStudent);
  form.addEventListener('input', function (e) {
    if (e.target && e.target.removeAttribute) e.target.removeAttribute('aria-invalid');
  });
  document.getElementById('cw-again').addEventListener('click', function () {
    done.hidden = true;
    form.hidden = false;
    sending = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create my invoices';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    var first = document.getElementById('cw-first');
    var last = document.getElementById('cw-last');
    var email = document.getElementById('cw-email');
    var phone = document.getElementById('cw-phone');

    if (!first.value.trim()) return showError('Enter your first name.', first);
    if (!last.value.trim()) return showError('Enter your last name.', last);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return showError('Enter a valid email address.', email);
    if (phone.value.trim() && phone.value.replace(/\D/g, '').length < 7) return showError('Check the phone number or leave it empty.', phone);

    var students = [];
    var cards = list.querySelectorAll('.cw-student');
    for (var i = 0; i < cards.length; i++) {
      var inputs = cards[i].querySelectorAll('input');
      var sels = cards[i].querySelectorAll('select');
      if (!inputs[0].value.trim()) return showError('Enter the student’s first name.', inputs[0]);
      if (!inputs[1].value.trim()) return showError('Enter the student’s last name.', inputs[1]);
      if (!sels[0].value) return showError('Choose a course for each student.', sels[0]);
      var c = BY_NAME[sels[0].value];
      var p = c.packages[Number(sels[1].value) || 0];
      students.push({
        firstName: inputs[0].value.trim(),
        lastName: inputs[1].value.trim(),
        course: c.name,
        grade: c.grade,
        package: p.label,
        amount: p.price
      });
    }

    errorEl.hidden = true;
    sending = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating invoices…';

    var parent = first.value.trim() + ' ' + last.value.trim();
    var jspdfReady = loadJsPDF();

    fetch('/api/esa-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: first.value.trim(),
        lastName: last.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        state: STATE,
        students: students
      })
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error((data && data.error) || 'Could not create invoices');
        return jspdfReady.then(function (jspdf) {
          var now = new Date();
          filesEl.innerHTML = '';
          students.forEach(function (s, idx) {
            var inv = {
              number: (data.invoices && data.invoices[idx] && data.invoices[idx].number) || ('BR-AZ-' + Date.now()),
              date: now,
              parent: parent,
              email: email.value.trim(),
              phone: phone.value.trim(),
              student: s.firstName + ' ' + s.lastName,
              course: s.course,
              grade: s.grade,
              pkg: s.package,
              price: s.amount
            };
            var doc = buildPdf(jspdf, inv);
            var name = fileName(inv);
            var url = URL.createObjectURL(doc.output('blob'));

            var row = el('div', 'cw-file-row');
            var info = el('span');
            info.appendChild(document.createTextNode(inv.student + ' · ' + inv.course));
            info.appendChild(el('small', '', inv.number + ' · ' + inv.pkg + ' · ' + money(inv.price)));
            var a = el('a', 'btn btn-dark', 'Download PDF');
            a.href = url;
            a.download = name;
            row.appendChild(info);
            row.appendChild(a);
            filesEl.appendChild(row);
            setTimeout(function () { a.click(); }, 300 * idx);
          });
          form.hidden = true;
          done.hidden = false;
          done.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (window.gtag) gtag('event', 'generate_lead', { form: 'classwallet_az_invoice', students: students.length });
        });
      });
    }).catch(function (err) {
      sending = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create my invoices';
      showError(err.message || 'Could not create invoices. Try again.');
    });
  });

  addStudent();
})();
