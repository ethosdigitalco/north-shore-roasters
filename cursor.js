/* ============================================
   LOAM ROASTRY — CUSTOM CURSOR
   mix-blend-mode: difference blob.
   Snaps exactly to cursor — zero lag.
   ============================================ */

(function () {

  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  /* ---- INJECT ELEMENT ---- */
  const blob = document.createElement('div');
  blob.className = 'cursor-blob';
  document.body.appendChild(blob);

  /* ---- TRACK MOUSE — no lerp, direct position ---- */
  document.addEventListener('mousemove', e => {
    // Use transform for GPU-composited movement — fastest possible
    blob.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

    if (!blob.classList.contains('cursor-blob--visible')) {
      blob.classList.add('cursor-blob--visible');
    }
  });

  document.addEventListener('mouseleave', () => blob.classList.remove('cursor-blob--visible'));
  document.addEventListener('mouseenter', () => blob.classList.add('cursor-blob--visible'));

  /* ---- HOVER STATES ---- */
  // Small expand on links
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => blob.classList.add('cursor-blob--link'));
    el.addEventListener('mouseleave', () => blob.classList.remove('cursor-blob--link'));
  });

  // Big expand on cards / featured items
  document.querySelectorAll('.menu-featured, .bean-card, .menu-card, .approach-card').forEach(el => {
    el.addEventListener('mouseenter', () => blob.classList.add('cursor-blob--card'));
    el.addEventListener('mouseleave', () => blob.classList.remove('cursor-blob--card'));
  });

  /* ---- CLICK PULSE ---- */
  document.addEventListener('mousedown', () => blob.classList.add('cursor-blob--click'));
  document.addEventListener('mouseup',   () => blob.classList.remove('cursor-blob--click'));

})();
