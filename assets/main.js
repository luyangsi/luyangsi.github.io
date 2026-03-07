(function () {
  // Mermaid diagrams (loaded from CDN in pages that need it).
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
  }

  // Theme toggle (light / dark)
  var saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  var toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = saved === 'dark' ? '☀' : '🌙';
    toggleBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      toggleBtn.textContent = next === 'dark' ? '☀' : '🌙';
    });
  }

  // Mobile nav hamburger
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.navlinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Scroll-triggered card entrance animation
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.card').forEach(function (card) {
      observer.observe(card);
    });
  } else {
    // Fallback: show all cards immediately if IntersectionObserver not available
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.add('visible');
    });
  }
})();
