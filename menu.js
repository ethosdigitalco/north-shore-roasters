/* ============================================
   LOAM ROASTRY — MENU PAGE JS
   Parallax · Scroll Reveal · Sticky Nav · Order Bar
   ============================================ */

(function () {

  /* ---- PARALLAX ---- */
  const heroImg = document.querySelector('.menu-hero__img');

  function updateParallax() {
    if (!heroImg) return;
    heroImg.style.transform = `translateY(${window.scrollY * 0.38}px)`;
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Stagger siblings of the same type inside .menu-items
      const parent = el.closest('.menu-items, .menu-items--seasonal, .about-approach__grid, .menu-section__header');
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('.reveal'));
        const index = siblings.indexOf(el);
        el.style.transitionDelay = `${index * 0.08}s`;
      }

      el.classList.add('visible');
      revealObserver.unobserve(el);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---- STICKY CATEGORY NAV — ACTIVE STATE ---- */
  const sections   = document.querySelectorAll('.menu-section');
  const navLinks   = document.querySelectorAll('.menu-nav__link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    });
  }, {
    threshold: 0,
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- SMOOTH SCROLL FOR CATEGORY NAV ---- */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      // Account for main nav + sticky menu nav height
      const offset = 72 + 48;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- STICKY ORDER BAR ---- */
  const orderBar = document.querySelector('.order-bar');
  const hero     = document.querySelector('.menu-hero');

  function updateOrderBar() {
    if (!orderBar || !hero) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    orderBar.classList.toggle('order-bar--visible', heroBottom < 0);
  }

  window.addEventListener('scroll', updateOrderBar, { passive: true });

})();
