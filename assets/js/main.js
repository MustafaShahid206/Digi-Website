(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-main-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const portfolioCards = document.querySelectorAll('[data-portfolio-card]');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const selected = button.dataset.filter;
      filterButtons.forEach(function (btn) { btn.classList.remove('active'); });
      button.classList.add('active');

      portfolioCards.forEach(function (card) {
        const category = card.dataset.category;
        const show = selected === 'all' || category === selected;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      let valid = true;

      const requiredFields = [
        { id: 'name', test: (v) => v.trim().length >= 2, msg: 'Please enter your full name.' },
        { id: 'email', test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Enter a valid email address.' },
        { id: 'service', test: (v) => v.trim() !== '', msg: 'Please select a service type.' },
        { id: 'message', test: (v) => v.trim().length >= 10, msg: 'Message must be at least 10 characters.' }
      ];

      requiredFields.forEach(function (rule) {
        const field = form.querySelector('#' + rule.id);
        const error = form.querySelector('[data-error-for="' + rule.id + '"]');
        const value = field ? field.value : '';

        if (!rule.test(value)) {
          valid = false;
          if (error) error.textContent = rule.msg;
          if (field) field.setAttribute('aria-invalid', 'true');
        } else {
          if (error) error.textContent = '';
          if (field) field.setAttribute('aria-invalid', 'false');
        }
      });

      if (!valid) {
        status.textContent = 'Please fix the highlighted fields and try again.';
        status.className = 'form-status error';
        return;
      }

      form.reset();
      status.textContent = "Thanks, we'll reply soon.";
      status.className = 'form-status success';
    });
  }
})();
