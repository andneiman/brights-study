/* Brights ESA invoice generator — a self-contained mini app.
 *
 * Usage on any page:
 *   <link rel="stylesheet" href="/main/css/invoice-generator.css">
 *   <div data-invoice-app data-state="AZ"></div>
 *   <script src="/main/js/catalog.js"></script>        (course list + prices)
 *   <script src="/main/js/invoice-generator.js"></script>
 *
 * Optional attributes on the container:
 *   data-state="AZ"            state program (see STATES); data-state="" shows a state picker
 *   data-default-course="..."  course preselected for each student
 *
 * Every request is saved to the leads table through /api/invoice, which also
 * issues the invoice numbers (BR-<STATE>-<MMDDYY>-<n>). PDFs are built in the browser.
 */
(function () {
  'use strict';

  // ---- Vendor --------------------------------------------------------------
  var VENDOR = {
    displayName: 'A+ Brights',          // vendor name in ClassWallet / ESA marketplaces
    legalName: 'Magent Tech Inc',
    address: ['251 Little Falls Dr', 'Wilmington, DE 19808'],
    website: 'www.aplusbrights.com',
    email: 'team@aplusbrights.com',
    logo: '/main/img/invoice/logo.png'  // 475 x 144 px
  };

  // ---- State programs -------------------------------------------------------
  // To add a state: add an entry here and in api/invoice.js (STATES).
  var STATES = {
    AZ: {
      code: 'AZ',
      name: 'Arizona',
      program: 'Arizona Empowerment Scholarship Account (ESA)',
      platform: 'ClassWallet Direct Pay',
      category: 'Curriculum',
      guide: 'www.aplusbrights.com/main/arizona-esa-classwallet.html',
      payLines: function (inv) {
        return [
          'Sign in to ClassWallet through the Arizona ESA portal. In Direct Pay, click PAY.',
          'Search for "' + VENDOR.displayName + '" and click PAY.',
          'Enter the payment amount: ' + money(inv.total) + '.',
          'Upload this invoice (PDF).',
          'Choose the Arizona ESA purse and the expense category that fits your order.',
          'Comments: "' + inv.description + '". Invoice number: ' + inv.number + '.',
          'Review and submit.'
        ];
      }
    }
  };

  var DEFAULT_COURSE = 'Learn How to Learn Smart (with AI)';
  // Courses offered in the generator (others in the catalog are hidden here).
  var COURSES = [
    'Grade 1 Math', 'Grade 2 Math', 'Grade 3 Math', 'Grade 4 Math',
    'Grade 5 Math', 'Grade 6 Math', 'Grade 7 Math', 'Grade 8 Math',
    'Science Explorations', 'Science Discovery', 'Middle School Life Science',
    'Middle School Earth & Space Science', 'Middle School Physical Science',
    'AI Literacy and Safety for Families', 'Learn How to Learn Smart (with AI)',
    'Spanish 1', 'Spanish 2', 'Spanish 3'
  ];
  var CATALOG_URL = '/main/courses.html';
  var MAX_STUDENTS = 1;   // one student per invoice request; fill the form again for another child
  var JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

  // ---- Helpers --------------------------------------------------------------
  function money(n) {
    return '$' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function usDate(d) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }
  function longDate(d) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Packages from the catalog price line, e.g. "Full year $199 · Semester $129".
  var PKG = {
    'full year': { label: 'Full year', months: 12 },
    'semester': { label: 'One semester', months: 6 },
    '2 weeks': { label: 'Full course', days: 14 },
    'specialty': { label: 'Full course', months: 12 },
    'whole course': { label: 'Full course', months: 12 }
  };
  function packages(p) {
    var out = [];
    String(p || '').split('·').map(function (x) { return x.trim(); }).forEach(function (part) {
      var m = part.match(/\$(\d+(?:\.\d+)?)/);
      var key = part.replace(/\$\d+(?:\.\d+)?/, '').trim().toLowerCase();
      if (m) out.push({ key: key, price: Number(m[1]) });
      else if (out.length && !out[out.length - 1].key) out[out.length - 1].key = key;
    });
    return out.map(function (x) {
      var def = PKG[x.key] || { label: 'Full course', months: 12 };
      return { label: def.label, months: def.months, days: def.days, price: x.price };
    });
  }
  function servicePeriod(pkg, start) {
    var end = new Date(start.getTime());
    if (pkg.days) end.setDate(end.getDate() + pkg.days - 1);
    else { end.setMonth(end.getMonth() + (pkg.months || 12)); end.setDate(end.getDate() - 1); }
    return usDate(start) + ' – ' + usDate(end);
  }

  function courseIndex(stateName) {
    var groups = [];
    var byName = {};
    (window.CATALOG || []).forEach(function (group) {
      var items = group.courses;
      var bySubject = window.STATE_COURSES && STATE_COURSES[group.subject];
      if (bySubject && stateName && bySubject[stateName]) items = bySubject[stateName];
      var g = { subject: group.subject === 'ELA & Languages' ? 'Spanish' : group.subject, items: [] };
      items.forEach(function (c) {
        if (COURSES.indexOf(c.n) === -1) return;
        var pk = packages(c.p);
        if (!pk.length) return;
        g.items.push(c.n);
        byName[c.n] = { name: c.n, packages: pk };
      });
      if (g.items.length) groups.push(g);
    });
    return { groups: groups, byName: byName };
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
  var logoPromise = null;
  function loadLogo() {
    if (!logoPromise) {
      logoPromise = fetch(VENDOR.logo).then(function (r) {
        if (!r.ok) throw new Error('logo');
        return r.blob();
      }).then(function (b) {
        return new Promise(function (resolve) {
          var fr = new FileReader();
          fr.onload = function () { resolve(fr.result); };
          fr.onerror = function () { resolve(null); };
          fr.readAsDataURL(b);
        });
      }).catch(function () { return null; });
    }
    return logoPromise;
  }

  function buildPdf(jspdf, logo, inv, state) {
    var doc = new jspdf.jsPDF({ unit: 'pt', format: 'letter' });
    var W = doc.internal.pageSize.getWidth();
    var H = doc.internal.pageSize.getHeight();
    var M = 54;
    var ink = [38, 38, 38], muted = [115, 115, 115], rule = [225, 225, 225];
    function color(c) { doc.setTextColor(c[0], c[1], c[2]); }
    var y = M;

    // Header: logo + INVOICE
    if (logo) doc.addImage(logo, 'PNG', M, y - 10, 119, 36);
    else { doc.setFont('helvetica', 'bold'); doc.setFontSize(22); color(ink); doc.text(VENDOR.displayName, M, y + 16); }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    color(ink);
    doc.text('INVOICE', W - M, y + 18, { align: 'right' });

    // Vendor block (one font for all lines) + invoice meta
    y += 56;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    var vendorLines = ['Vendor: ' + VENDOR.displayName, VENDOR.legalName].concat(VENDOR.address, [VENDOR.website, VENDOR.email]);
    color(ink);
    vendorLines.forEach(function (l, i) { doc.text(l, M, y + i * 14); });

    var meta = [
      ['Invoice number', inv.number],
      ['Invoice date', longDate(inv.date)],
      ['Amount due', money(inv.total)],
      ['Pay with', state.platform]
    ];
    meta.forEach(function (row, i) {
      color(muted);
      doc.text(row[0], W - M - 250, y + i * 14);
      color(ink);
      doc.text(row[1], W - M, y + i * 14, { align: 'right' });
    });

    y += Math.max(vendorLines.length, meta.length) * 14 + 12;
    doc.setDrawColor(rule[0], rule[1], rule[2]);
    doc.line(M, y, W - M, y);
    y += 26;

    function block(x, title, rows) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      color(muted);
      doc.text(title.toUpperCase(), x, y);
      doc.setFontSize(11);
      color(ink);
      rows.forEach(function (r, i) {
        doc.setFont('helvetica', i === 0 ? 'bold' : 'normal');
        doc.text(r, x, y + 18 + i * 15);
      });
    }
    var billRows = [inv.parent, inv.email].concat(inv.phone ? [inv.phone] : []);
    block(M, 'Bill to (parent, ESA account holder)', billRows);
    block(W / 2 + 10, 'Student', [inv.student, state.program]);
    y += 18 + Math.max(billRows.length, 2) * 15 + 24;

    // Line item
    doc.setFillColor(244, 244, 245);
    doc.rect(M, y, W - 2 * M, 26, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    color(muted);
    var cQty = W - M - 190, cPrice = W - M - 100, cAmt = W - M - 12;
    doc.text('DESCRIPTION', M + 12, y + 17);
    doc.text('QTY', cQty, y + 17, { align: 'right' });
    doc.text('PRICE', cPrice, y + 17, { align: 'right' });
    doc.text('AMOUNT', cAmt, y + 17, { align: 'right' });
    y += 26;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    color(ink);
    var desc = doc.splitTextToSize(inv.description, cQty - M - 60);
    doc.text(desc, M + 12, y + 22);
    doc.text('1', cQty, y + 22, { align: 'right' });
    doc.text(money(inv.total), cPrice, y + 22, { align: 'right' });
    doc.text(money(inv.total), cAmt, y + 22, { align: 'right' });
    y += 22 + desc.length * 14 + 6;
    doc.line(M, y, W - M, y);

    // Totals
    y += 24;
    doc.setFontSize(10.5);
    [['Subtotal', money(inv.total)], ['Tax', money(0)]].forEach(function (r) {
      color(muted); doc.text(r[0], cPrice, y, { align: 'right' });
      color(ink); doc.text(r[1], cAmt, y, { align: 'right' });
      y += 16;
    });
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Total due', cPrice, y, { align: 'right' });
    doc.text(money(inv.total), cAmt, y, { align: 'right' });

    // How to pay
    y += 40;
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    var wrapped = state.payLines(inv).map(function (t, i) {
      return doc.splitTextToSize((i + 1) + '. ' + t, W - 2 * M - 32);
    });
    var n = wrapped.reduce(function (a, w) { return a + w.length; }, 0);
    var boxH = 42 + n * 13 + wrapped.length * 2;
    doc.setFillColor(244, 244, 245);
    doc.roundedRect(M, y, W - 2 * M, boxH, 8, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    color(ink);
    doc.text('How to pay with your ' + state.name + ' ESA', M + 16, y + 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    var py = y + 42;
    wrapped.forEach(function (w) { doc.text(w, M + 16, py); py += w.length * 13 + 2; });

    // Footer
    doc.setFontSize(9);
    color(muted);
    doc.text('Questions about this invoice: ' + VENDOR.email, M, H - 46);
    if (state.guide) doc.text('Step-by-step guide: ' + state.guide, M, H - 32);
    return doc;
  }

  function fileName(inv) {
    return ('A-Brights-invoice-' + inv.number + '-' + inv.student).replace(/[^A-Za-z0-9-]+/g, '-') + '.pdf';
  }

  // ---- UI ------------------------------------------------------------------
  function mount(root) {
    var stateCode = (root.getAttribute('data-state') || '').toUpperCase();
    var pickState = !STATES[stateCode];
    if (pickState) stateCode = Object.keys(STATES)[0];
    var defaultCourse = root.getAttribute('data-default-course') || DEFAULT_COURSE;
    var index = courseIndex(STATES[stateCode].name);
    var seq = 0;
    var sending = false;

    root.classList.add('ig');
    root.innerHTML = '';

    var form = el('form', 'ig-form');
    form.noValidate = true;

    function field(labelText, input, hint) {
      var wrap = el('div', 'ig-field');
      var label = el('label', 'ig-label');
      label.textContent = labelText;
      if (hint) label.appendChild(el('span', 'ig-opt', ' ' + hint));
      label.htmlFor = input.id;
      wrap.appendChild(label);
      wrap.appendChild(input);
      return wrap;
    }
    function input(id, type, placeholder, auto) {
      var i = el('input', 'ig-input');
      i.id = id; i.type = type; i.placeholder = placeholder; i.autocomplete = auto || 'off';
      return i;
    }
    var uid = 'ig' + Math.random().toString(36).slice(2, 7);

    var stateSel = null;
    if (pickState) {
      stateSel = el('select', 'ig-input');
      stateSel.id = uid + '-state';
      Object.keys(STATES).forEach(function (k) {
        var o = el('option', '', STATES[k].name + ' — ' + STATES[k].program.replace(STATES[k].name + ' ', ''));
        o.value = k;
        stateSel.appendChild(o);
      });
      stateSel.value = stateCode;
      stateSel.addEventListener('change', function () { stateCode = stateSel.value; });
      form.appendChild(field('ESA program', stateSel));
    }

    var two = el('div', 'ig-two');
    var first = input(uid + '-first', 'text', 'First name', 'given-name');
    var last = input(uid + '-last', 'text', 'Last name', 'family-name');
    two.appendChild(field('Parent first name', first));
    two.appendChild(field('Parent last name', last));
    form.appendChild(two);
    var email = input(uid + '-email', 'email', 'you@email.com', 'email');
    form.appendChild(field('Email', email));
    var phone = input(uid + '-phone', 'tel', '(555) 000-0000', 'tel');
    form.appendChild(field('Phone', phone, '(optional)'));

    var list = el('div', 'ig-students');
    form.appendChild(list);
    var errorEl = el('p', 'ig-error');
    errorEl.hidden = true;
    form.appendChild(errorEl);
    var submit = el('button', 'ig-submit', 'Create my invoice');
    submit.type = 'submit';
    form.appendChild(submit);
    form.appendChild(el('p', 'ig-note', 'Type each student’s name exactly as it appears on your ESA account. A different spelling can delay the payment.'));
    root.appendChild(form);

    var done = el('div', 'ig-done');
    done.hidden = true;
    done.appendChild(el('span', 'ig-eyebrow', 'Invoice ready'));
    done.appendChild(el('h3', '', 'Your invoice is ready'));
    done.appendChild(el('p', '', 'It’s downloading now. If the download didn’t start, use the button below. Have another child on ESA? Create a separate invoice for them.'));
    var files = el('div', 'ig-files');
    done.appendChild(files);
    var again = el('button', 'ig-add', 'Create a new invoice');
    again.type = 'button';
    done.appendChild(again);
    root.appendChild(done);

    function courseSelect(id) {
      var sel = el('select', 'ig-input');
      sel.id = id;
      var ph = el('option', '', 'Select a course');
      ph.value = ''; ph.disabled = true; ph.selected = true;
      sel.appendChild(ph);
      index.groups.forEach(function (g) {
        var og = document.createElement('optgroup');
        og.label = g.subject;
        g.items.forEach(function (n) { var o = el('option', '', n); o.value = n; og.appendChild(o); });
        sel.appendChild(og);
      });
      return sel;
    }

    function addStudent() {
      if (list.children.length >= MAX_STUDENTS) return;
      seq += 1;
      var id = uid + '-s' + seq;
      var card = el('div', 'ig-student');
      card.appendChild(el('div', 'ig-student-head', 'Student'));

      var names = el('div', 'ig-two');
      names.appendChild(field('First name', input(id + '-first', 'text', 'Student first name')));
      names.appendChild(field('Last name', input(id + '-last', 'text', 'Student last name')));
      card.appendChild(names);

      var course = courseSelect(id + '-course');
      var courseWrap = field('Course', course);
      var link = el('a', 'ig-catalog', 'See all courses in the catalog');
      link.href = CATALOG_URL; link.target = '_blank'; link.rel = 'noopener';
      courseWrap.appendChild(link);
      card.appendChild(courseWrap);

      var pkg = el('select', 'ig-input');
      pkg.id = id + '-pkg';
      var pkgWrap = field('Package', pkg);
      card.appendChild(pkgWrap);

      course.addEventListener('change', function () {
        var c = index.byName[course.value];
        pkg.innerHTML = '';
        c.packages.forEach(function (p, i) {
          var o = el('option', '', p.label + ' — ' + money(p.price));
          o.value = String(i);
          pkg.appendChild(o);
        });
        pkg.disabled = c.packages.length === 1;
      });
      pkg.disabled = true;

      list.appendChild(card);
      if (index.byName[defaultCourse]) {
        course.value = defaultCourse;
        course.dispatchEvent(new Event('change'));
      }
    }

    function fail(message, f) {
      errorEl.textContent = message;
      errorEl.hidden = false;
      form.querySelectorAll('[aria-invalid]').forEach(function (x) { x.removeAttribute('aria-invalid'); });
      if (f) { f.setAttribute('aria-invalid', 'true'); f.focus(); }
      return false;
    }

    form.addEventListener('input', function (e) {
      if (e.target && e.target.removeAttribute) e.target.removeAttribute('aria-invalid');
    });
    again.addEventListener('click', function () {
      done.hidden = true;
      form.hidden = false;
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Create my invoice';
      // keep the parent's details, clear the student
      list.innerHTML = '';
      addStudent();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var f = list.querySelector('input');
      if (f) f.focus({ preventScroll: true });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      var state = STATES[stateCode];
      if (!first.value.trim()) return fail('Enter your first name.', first);
      if (!last.value.trim()) return fail('Enter your last name.', last);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return fail('Enter a valid email address.', email);
      if (phone.value.trim() && phone.value.replace(/\D/g, '').length < 7) return fail('Check the phone number or leave it empty.', phone);

      var students = [];
      var cards = list.querySelectorAll('.ig-student');
      for (var i = 0; i < cards.length; i++) {
        var ins = cards[i].querySelectorAll('input');
        var sels = cards[i].querySelectorAll('select');
        if (!ins[0].value.trim()) return fail('Enter the student’s first name.', ins[0]);
        if (!ins[1].value.trim()) return fail('Enter the student’s last name.', ins[1]);
        if (!sels[0].value) return fail('Choose a course.', sels[0]);
        var c = index.byName[sels[0].value];
        var p = c.packages[Number(sels[1].value) || 0];
        students.push({
          firstName: ins[0].value.trim(),
          lastName: ins[1].value.trim(),
          course: c.name,
          multi: c.packages.length > 1,
          pkgObj: p,
          package: p.label,
          amount: p.price
        });
      }

      errorEl.hidden = true;
      sending = true;
      submit.disabled = true;
      submit.textContent = 'Creating invoice…';
      var ready = Promise.all([loadJsPDF(), loadLogo()]);

      fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: state.code,
          firstName: first.value.trim(),
          lastName: last.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          students: students.map(function (s) {
            return { firstName: s.firstName, lastName: s.lastName, course: s.course, package: s.package, amount: s.amount };
          })
        })
      }).then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error((data && data.error) || 'Could not create invoices');
          return ready.then(function (libs) {
            var now = new Date();
            files.innerHTML = '';
            students.forEach(function (s, idx) {
              var inv = {
                number: (data.invoices && data.invoices[idx] && data.invoices[idx].number) || ('BR-' + state.code + '-' + Date.now()),
                date: now,
                parent: first.value.trim() + ' ' + last.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                student: s.firstName + ' ' + s.lastName,
                description: VENDOR.displayName + ' ' + s.course + (s.multi ? ' — ' + s.package : ''),
                total: s.amount
              };
              var doc = buildPdf(libs[0], libs[1], inv, state);
              var a = el('a', 'ig-download', 'Download PDF');
              a.href = URL.createObjectURL(doc.output('blob'));
              a.download = fileName(inv);
              var row = el('div', 'ig-file');
              var info = el('span');
              info.appendChild(document.createTextNode(inv.student + ' · ' + s.course));
              info.appendChild(el('small', '', inv.number + ' · ' + money(inv.total)));
              row.appendChild(info);
              row.appendChild(a);
              files.appendChild(row);
              setTimeout(function () { a.click(); }, 300 * idx);
            });
            form.hidden = true;
            done.hidden = false;
            done.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (window.gtag) gtag('event', 'generate_lead', { form: 'invoice_' + state.code.toLowerCase(), students: students.length });
          });
        });
      }).catch(function (err) {
        sending = false;
        submit.disabled = false;
        submit.textContent = 'Create my invoice';
        fail(err.message || 'Could not create the invoice. Try again.');
      });
    });

    addStudent();
  }

  window.BrightsInvoice = { VENDOR: VENDOR, STATES: STATES, mount: mount, buildPdf: buildPdf };

  function init() {
    document.querySelectorAll('[data-invoice-app]').forEach(mount);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
