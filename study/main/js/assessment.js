(function () {
  var form = document.getElementById('assess-form');
  if (!form || !window.CATALOG) return;

  var STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  var stateSelect = document.getElementById('assess-state');
  var courseSelect = document.getElementById('assess-course');
  var nameInput = document.getElementById('assess-name');
  var emailInput = document.getElementById('assess-email');
  var phoneInput = document.getElementById('assess-phone');
  var errorEl = document.getElementById('assess-error');
  var submitBtn = document.getElementById('assess-submit');
  var done = document.getElementById('assess-done');
  var sending = false;

  STATES.forEach(function (name) {
    var option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    stateSelect.appendChild(option);
  });

  function coursesFor(state) {
    var list = [];
    CATALOG.forEach(function (group) {
      var courses = group.courses;
      if (group.subject === 'Math' && state && window.MATH_STANDARDS && MATH_STANDARDS[state]) {
        courses = MATH_STANDARDS[state];
      }
      courses.forEach(function (course) {
        list.push({ subject: group.subject, name: course.n });
      });
    });
    return list;
  }

  function fillCourses() {
    var state = stateSelect.value;
    var previous = courseSelect.value;
    courseSelect.innerHTML = '';
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = state ? 'Select a course' : 'Select a state first';
    courseSelect.appendChild(placeholder);
    if (!state) return;
    var current = '';
    var group = null;
    coursesFor(state).forEach(function (item) {
      if (item.subject !== current) {
        current = item.subject;
        group = document.createElement('optgroup');
        group.label = current;
        courseSelect.appendChild(group);
      }
      var option = document.createElement('option');
      option.value = item.name;
      option.textContent = item.name;
      group.appendChild(option);
    });
    if (previous && courseSelect.querySelector('option[value="' + CSS.escape(previous) + '"]')) {
      courseSelect.value = previous;
    }
  }

  function showError(message, field) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    [nameInput, emailInput, phoneInput, stateSelect, courseSelect].forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    }
  }

  stateSelect.addEventListener('change', function () {
    fillCourses();
    stateSelect.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();
    var state = stateSelect.value;
    var course = courseSelect.value;
    var digits = phone.replace(/\D/g, '');
    if (name.length < 1) {
      showError('Enter your name.', nameInput);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Enter a valid email address.', emailInput);
      return;
    }
    if (digits.length < 7) {
      showError('Enter a phone number.', phoneInput);
      return;
    }
    if (!state) {
      showError('Choose a state.', stateSelect);
      return;
    }
    if (!course) {
      showError('Choose a course.', courseSelect);
      return;
    }
    errorEl.hidden = true;
    sending = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        state: state,
        course: course,
        source: 'assessment'
      })
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error((data && data.error) || 'Could not send');
        form.hidden = true;
        done.hidden = false;
        sending = false;
      });
    }).catch(function (err) {
      sending = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a free assessment';
      showError(err.message || 'Could not send. Try again.');
    });
  });

  fillCourses();
})();
