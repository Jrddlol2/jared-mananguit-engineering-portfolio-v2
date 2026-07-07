/* nav.js — bookmark rail scroll-spy (index.html only; no-ops elsewhere).
   Purely additive: the rail and every section are already reachable via
   real anchor links without this script running. */
(function () {
  var rail = document.getElementById('bookmarkRail');
  if (!rail) return;

  var links = Array.prototype.slice.call(rail.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  var linkBySectionId = {};
  links.forEach(function (a) { linkBySectionId[a.getAttribute('href').slice(1)] = a; });

  var current = null;
  function setActive(id) {
    if (current === id) return;
    if (current && linkBySectionId[current]) linkBySectionId[current].removeAttribute('aria-current');
    if (id && linkBySectionId[id]) linkBySectionId[id].setAttribute('aria-current', 'location');
    current = id;
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] });

  sections.forEach(function (s) { observer.observe(s); });
})();
