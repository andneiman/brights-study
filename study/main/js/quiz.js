/* Brights.ai — interactive "personalized course example" card.
   Renders into every <div id="quiz-mount"> on the page. */

(function () {
  var mounts = document.querySelectorAll('#quiz-mount, .quiz-mount');
  if (!mounts.length) return;

  var pucks = function (shaded) {
    var pos = [[18, 20], [46, 20], [74, 20], [102, 20], [18, 46], [46, 46], [74, 46], [102, 46]];
    var base = pos.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11"/>'; }).join('');
    var on = pos.slice(0, shaded).map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11"/>'; }).join('');
    return '<svg viewBox="0 0 120 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g fill="#d9d9dd">' + base + '</g><g fill="#5b9bd5">' + on + '</g></svg>';
  };

  var MARKUP =
    '<div class="card quiz-card">' +
      '<div class="quiz-top">' +
        '<div><span>Course</span><strong>Grade 6 Math</strong></div>' +
        '<div><span>Topic</span><strong>Percentages of a quantity</strong></div>' +
      '</div>' +

      '<div class="profile">' +
        '<div class="profile-head">' +
          '<div class="profile-avatar" aria-hidden="true">EK</div>' +
          '<div>' +
            '<div class="profile-name">Ethan K.</div>' +
            '<div class="profile-sub">Grade 6 · personalized course</div>' +
          '</div>' +
        '</div>' +
        '<div class="chips">' +
          '<span class="chip"><b>Interest:</b> ice hockey</span>' +
          '<span class="chip"><b>Learns best with:</b> charts and pictures</span>' +
          '<span class="chip"><b>Practice:</b> short sets, 6–8 items</span>' +
          '<span class="chip"><b>Schedule:</b> 3 × 20 min per week</span>' +
          '<span class="chip"><b>Diagnostic:</b> strong on fractions</span>' +
          '<span class="chip"><b>Needs review:</b> ratios</span>' +
          '<span class="chip"><b>Reading:</b> shorter prompts</span>' +
        '</div>' +
      '</div>' +

      '<p class="quiz-objective"><b>Learning objective</b>Find a percentage of a quantity and explain the reasoning</p>' +

      '<div class="quiz-progress">' +
        '<span class="qdot is-active">1</span><span class="qdot">2</span><span class="qdot">3</span>' +
        '<span class="quiz-count">Question <b class="q-now">1</b> of 3</span>' +
      '</div>' +

      '<div class="quiz-step is-visible" data-step="1">' +
        '<p class="quiz-q">During a hockey tournament, Ethan\'s team took 80 shots. Twenty-five percent were slap shots. How many slap shots did the team take?</p>' +
        '<p class="quiz-skill">Skill: find 25% of a quantity</p>' +
        '<ul class="quiz-options" data-answer="B" ' +
            'data-ok="Twenty-five percent is one quarter, and 80 divided by 4 equals 20." ' +
            'data-no="Twenty-five percent is one quarter. Divide 80 by 4 to get the answer.">' +
          '<li><button class="opt" type="button" data-key="A">A. 15</button></li>' +
          '<li><button class="opt" type="button" data-key="B">B. 20</button></li>' +
          '<li><button class="opt" type="button" data-key="C">C. 25</button></li>' +
          '<li><button class="opt" type="button" data-key="D">D. 40</button></li>' +
        '</ul>' +
        '<p class="quiz-feedback"></p>' +
      '</div>' +

      '<div class="quiz-step" data-step="2">' +
        '<p class="quiz-q">The chart shows how those 80 shots were spread across the three periods. What percent of the shots came in the first period?</p>' +
        '<p class="quiz-skill">Skill: read a bar chart and express a part as a percent</p>' +
        '<figure class="quiz-figure">' +
          '<svg viewBox="0 0 320 168" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart: period 1 had 20 shots, period 2 had 30 shots, period 3 had 30 shots">' +
            '<line x1="30" y1="132" x2="308" y2="132" stroke="rgba(38,38,38,.2)" stroke-width="1.5"/>' +
            '<g stroke="rgba(38,38,38,.08)" stroke-width="1">' +
              '<line x1="30" y1="102" x2="308" y2="102"/><line x1="30" y1="72" x2="308" y2="72"/><line x1="30" y1="42" x2="308" y2="42"/>' +
            '</g>' +
            '<g fill="rgba(38,38,38,.4)" font-family="Inter, sans-serif" font-size="10">' +
              '<text x="10" y="136">0</text><text x="10" y="106">10</text><text x="10" y="76">20</text><text x="10" y="46">30</text>' +
            '</g>' +
            '<rect x="52" y="72" width="60" height="60" rx="6" fill="#5b9bd5"/>' +
            '<rect x="140" y="42" width="60" height="90" rx="6" fill="#a9cdea"/>' +
            '<rect x="228" y="42" width="60" height="90" rx="6" fill="#a9cdea"/>' +
            '<g fill="#262626" font-family="Inter, sans-serif" font-size="12" font-weight="600" text-anchor="middle">' +
              '<text x="82" y="66">20</text><text x="170" y="36">30</text><text x="258" y="36">30</text>' +
            '</g>' +
            '<g fill="rgba(38,38,38,.6)" font-family="Inter, sans-serif" font-size="11" text-anchor="middle">' +
              '<text x="82" y="150">Period 1</text><text x="170" y="150">Period 2</text><text x="258" y="150">Period 3</text>' +
            '</g>' +
          '</svg>' +
          '<figcaption>Shots taken per period — 80 shots in total</figcaption>' +
        '</figure>' +
        '<ul class="quiz-options" data-answer="B" ' +
            'data-ok="20 out of 80 is the same as 1 out of 4, and one quarter is 25%." ' +
            'data-no="Compare the first bar to the total. 20 out of 80 simplifies to one quarter.">' +
          '<li><button class="opt" type="button" data-key="A">A. 20%</button></li>' +
          '<li><button class="opt" type="button" data-key="B">B. 25%</button></li>' +
          '<li><button class="opt" type="button" data-key="C">C. 30%</button></li>' +
          '<li><button class="opt" type="button" data-key="D">D. 40%</button></li>' +
        '</ul>' +
        '<p class="quiz-feedback"></p>' +
      '</div>' +

      '<div class="quiz-step" data-step="3">' +
        '<p class="quiz-q">Ethan\'s bag holds 8 pucks. Which picture shows 25% of the pucks shaded?</p>' +
        '<p class="quiz-skill">Skill: recognise 25% in a visual model</p>' +
        '<ul class="quiz-options opts-img" data-answer="A" ' +
            'data-ok="25% of 8 is 2, so exactly two pucks are shaded." ' +
            'data-no="25% means one quarter. Split 8 pucks into 4 equal groups of 2 and shade one group.">' +
          '<li><button class="opt" type="button" data-key="A">' + pucks(2) + '<span>A. 2 shaded</span></button></li>' +
          '<li><button class="opt" type="button" data-key="B">' + pucks(4) + '<span>B. 4 shaded</span></button></li>' +
          '<li><button class="opt" type="button" data-key="C">' + pucks(6) + '<span>C. 6 shaded</span></button></li>' +
        '</ul>' +
        '<p class="quiz-feedback"></p>' +
      '</div>' +

      '<div class="quiz-nav">' +
        '<button class="qbtn" type="button" data-nav="prev" disabled>Back</button>' +
        '<button class="qbtn qbtn-dark" type="button" data-nav="next">Next question →</button>' +
      '</div>' +
    '</div>';

  mounts.forEach(function (mount) {
    mount.innerHTML = MARKUP;

    var quiz = mount.querySelector('.quiz-card');
    var steps = quiz.querySelectorAll('.quiz-step');
    var dots = quiz.querySelectorAll('.qdot');
    var counter = quiz.querySelector('.q-now');
    var prev = quiz.querySelector('[data-nav="prev"]');
    var next = quiz.querySelector('[data-nav="next"]');
    var current = 0;

    function render() {
      steps.forEach(function (s, i) { s.classList.toggle('is-visible', i === current); });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
        d.classList.toggle('is-done', i !== current && steps[i].dataset.answered === 'yes');
      });
      counter.textContent = current + 1;
      prev.disabled = current === 0;
      next.textContent = current === steps.length - 1 ? 'Start over' : 'Next question →';
    }

    quiz.addEventListener('click', function (e) {
      var opt = e.target.closest('.opt');
      if (!opt) return;
      var list = opt.closest('.quiz-options');
      var step = opt.closest('.quiz-step');
      var feedback = step.querySelector('.quiz-feedback');
      var right = opt.dataset.key === list.dataset.answer;

      list.querySelectorAll('.opt').forEach(function (b) {
        b.disabled = true;
        if (b.dataset.key === list.dataset.answer) b.classList.add('is-correct');
      });
      if (!right) opt.classList.add('is-wrong');

      feedback.className = 'quiz-feedback is-visible ' + (right ? 'ok' : 'no');
      feedback.innerHTML = '<b>' + (right ? 'Correct.' : 'Not quite.') + '</b> ' +
        (right ? list.dataset.ok : list.dataset.no);
      step.dataset.answered = 'yes';
      render();
    });

    prev.addEventListener('click', function () {
      if (current > 0) { current--; render(); }
    });

    next.addEventListener('click', function () {
      if (current < steps.length - 1) { current++; }
      else {
        current = 0;
        steps.forEach(function (s) {
          delete s.dataset.answered;
          s.querySelector('.quiz-feedback').className = 'quiz-feedback';
          s.querySelectorAll('.opt').forEach(function (b) {
            b.disabled = false;
            b.classList.remove('is-correct', 'is-wrong');
          });
        });
      }
      render();
    });

    render();
  });
})();
