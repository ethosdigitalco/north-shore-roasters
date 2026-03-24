/* ============================================
   LOAM ROASTRY — CUSTOM CURSOR
   Auto-injects on all pages. Touch devices skipped.
   ============================================ */

(function () {

  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  /* ---- CREATE ELEMENTS ---- */
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  document.body.appendChild(ring);
  document.body.appendChild(dot);

  /* ---- TRACKING ---- */
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let visible = false;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!visible) {
      // Snap ring to position on first move to avoid swooping in from 0,0
      ringX = mouseX;
      ringY = mouseY;
      visible = true;
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    }

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity  = '0';
    visible = false;
  });

  document.addEventListener('mouseenter', () => {
    if (visible) {
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    }
  });

  /* ---- LERP ANIMATION ---- */
  function animate() {
    // Ease the ring toward the cursor at 10% per frame
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  /* ---- HOVER STATES ---- */
  function addHoverListeners() {
    document.querySelectorAll('a, button, .menu-item, .menu-featured, .bean-card, .menu-card, .approach-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-ring--hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-ring--hover'));
    });
  }

  // Run now and re-run if DOM updates
  addHoverListeners();

  /* ---- CLICK BURST ---- */
  document.addEventListener('mousedown', () => ring.classList.add('cursor-ring--click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('cursor-ring--click'));

})();
