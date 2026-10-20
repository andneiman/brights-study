(function () {
  var page = window.BRIGHTS_PAGE || document.title;

  document.addEventListener('click', function (event) {
    var el = event.target.closest('a.btn, button.btn, button.filter, a.js-lead');
    if (!el || typeof gtag !== 'function') return;
    var name = (el.textContent || el.getAttribute('aria-label') || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);
    var params = {
      button_name: name,
      page_name: page,
      page_path: location.pathname
    };
    if (el.id) params.button_id = el.id;
    var href = el.getAttribute('href');
    if (href) params.link_url = href;
    var course = el.getAttribute('data-course');
    if (course) params.course_name = course;
    gtag('event', 'button_click', params);
  }, true);
})();
