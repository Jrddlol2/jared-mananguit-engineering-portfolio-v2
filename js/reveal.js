/* reveal.js — tasteful scroll reveals. Purely additive: base.css keeps every
   .reveal element fully visible until this script adds .js-ready to <html>,
   so content is never hidden if JavaScript fails (progressive enhancement).
   Respects prefers-reduced-motion via CSS (see base.css). */
(function () {
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  document.documentElement.classList.add('js-ready');

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
