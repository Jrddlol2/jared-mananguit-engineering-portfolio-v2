/* engineering-fx.js — small, self-contained, additive dynamic touches:
   scroll progress bar, live clock, and the console-footer message rotator.
   Every piece no-ops if its markup is absent, and every animated piece
   respects prefers-reduced-motion. Nothing here blocks or is required for
   reading, navigating, or printing the document. */

/* 1. Scroll progress bar (rAF-throttled) */
(function scrollProgress() {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  var ticking = false;

  function update() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();

/* 2. Live document clock */
(function liveClock() {
  var el = document.getElementById('liveClock');
  if (!el) return;

  function render() {
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    el.textContent = hh + ':' + mm + ':' + ss + ' local';
  }

  render();
  window.setInterval(render, 1000);
})();

/* 3. Console-footer self-test sweep — each status line is real content
   (already printed in the markup); this only "pings" them in sequence,
   one at a time, like equipment cycling through a self-test. It never
   changes what the lines say. */
(function consoleFooter() {
  var lines = document.querySelectorAll('.console-footer__status');
  if (!lines.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var i = 0;
  window.setInterval(function () {
    var el = lines[i];
    el.classList.add('is-swapping');
    window.setTimeout(function () { el.classList.remove('is-swapping'); }, 380);
    i = (i + 1) % lines.length;
  }, 2600);
})();

/* 4. Mouse Coordinates */
(function mouseCoords() {
  var el = document.querySelector('.blueprint-coords');
  if (!el) return;
  var ticking = false;
  var targetX = 0, targetY = 0;
  window.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        var x = (targetX / window.innerWidth * 100).toFixed(2);
        var y = (targetY / window.innerHeight * 100).toFixed(2);
        el.textContent = 'X: ' + x + ' Y: ' + y + ' // REF: ECE-2026-V1';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
