/* Arizona ESA invoice request form: parent + any number of students, one course each. */
(function () {
  var form = document.getElementById('cw-form');
  if (!form || !window.CATALOG) return;

  var STATE = 'Arizona';
  var MAX = 8;
  var list = document.getElementById('cw-students');
  var addBtn = document.getElementById('cw-add');
  var errorEl = document.getElementById('cw-error');
  var submitBtn = document.getElementById('cw-submit');
  var done = document.getElementById('cw-done');
  var sending = false;

  function courses() {
    var out = [];
    CATALOG.forEach(function (group) {
      var items = group.courses;
      var bySubject = window.STATE_COURSES && STATE_COURSES[group.subject];
      if (bySubject && bySubject[STATE]) items = bySubject[STATE];
      out.push({ subject: group.subject, items: items.map(function (c) { return c.n; }) });
    });
    return out;
  }
  var COURSES = courses();

  function courseSelect(id) {
    var sel = document.createElement('select');
    sel.className = 'lead-input';
    sel.id = id;
    sel.required = true;
    var ph = document.createElement('option');
    ph.value = '';
    ph.disabled = true;
    ph.selected = true;
    ph.textContent = 'Select a course';
    sel.appendChild(ph);
    COURSES.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g.subject;
      g.items.forEach(function (n) {
        var o = document.createElement('option');
        o.value = n;
        o.textContent = n;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    return sel;
  }

  var seq = 0;
  function field(labelText, input) {
    var wrap = document.createElement('div');
    var label = document.createElement('label');
    label.className = 'lead-label';
    label.htmlFor = input.id;
    label.textContent = labelText;
    wrap.appendChild(label);
    wrap.appendChild(input);
    return wrap;
  }
  function textInput(id, placeholder, auto) {
    var i = document.createElement('input');
    i.className = 'lead-input';
    i.type = 'text';
    i.id = id;
    i.placeholder = placeholder;
    i.required = true;
    i.autocomplete = auto || 'off';
    return i;
  }

  function addStudent() {
    if (list.children.length >= MAX) return;
    seq += 1;
    var card = document.createElement('div');
    card.className = 'cw-student';

    var head = document.createElement('div');
    head.className = 'cw-student-head';
    var title = document.createElement('b');
    head.appendChild(title);
    var rm = document.createElement('button');
    rm.type = 'button';
    rm.className = 'cw-remove';
    rm.textContent = 'Remove';
    rm.addEventListener('click', function () {
      card.remove();
      renumber();
    });
    head.appendChild(rm);
    card.appendChild(head);

    var two = document.createElement('div');
    two.className = 'cw-two';
    two.appendChild(field('First name', textInput('cw-s' + seq + '-first', 'Student first name')));
    two.appendChild(field('Last name', textInput('cw-s' + seq + '-last', 'Student last name')));
    card.appendChild(two);
    card.appendChild(field('Course', courseSelect('cw-s' + seq + '-course')));

    list.appendChild(card);
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

  function showError(message, el) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    form.querySelectorAll('[aria-invalid]').forEach(function (x) { x.removeAttribute('aria-invalid'); });
    if (el) {
      el.setAttribute('aria-invalid', 'true');
      el.focus();
    }
  }

  addBtn.addEventListener('click', addStudent);
  form.addEventListener('input', function (e) {
    if (e.target && e.target.removeAttribute) e.target.removeAttribute('aria-invalid');
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
    var digits = phone.value.replace(/\D/g, '');
    if (phone.value.trim() && digits.length < 7) return showError('Check the phone number or leave it empty.', phone);

    var students = [];
    var cards = list.querySelectorAll('.cw-student');
    for (var i = 0; i < cards.length; i++) {
      var inputs = cards[i].querySelectorAll('input');
      var sel = cards[i].querySelector('select');
      if (!inputs[0].value.trim()) return showError('Enter the student’s first name.', inputs[0]);
      if (!inputs[1].value.trim()) return showError('Enter the student’s last name.', inputs[1]);
      if (!sel.value) return showError('Choose a course for each student.', sel);
      students.push({ firstName: inputs[0].value.trim(), lastName: inputs[1].value.trim(), course: sel.value });
    }

    errorEl.hidden = true;
    sending = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

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
        if (!res.ok) throw new Error((data && data.error) || 'Could not send');
        form.hidden = true;
        done.hidden = false;
        done.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (window.gtag) gtag('event', 'generate_lead', { form: 'classwallet_az', students: students.length });
      });
    }).catch(function (err) {
      sending = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request my invoice';
      showError(err.message || 'Could not send. Try again.');
    });
  });

  addStudent();
})();
