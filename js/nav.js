/* nav.js — scroll-spy driving both the left bookmark rail and the right
   chapter indicator from one shared IntersectionObserver (index.html only;
   no-ops elsewhere). Purely additive: the rail and every section are already
   reachable via real anchor links without this script running, and the
   chapter indicator is aria-hidden decorative chrome. */
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

  var chapterText = document.querySelector('.chapter-indicator__text');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SWAP_DELAY = reduceMotion ? 0 : 420; /* matches --motion-base */
  var swapTimer = null;

  var current = null;
  function setActive(id) {
    if (current === id) return;
    if (current && linkBySectionId[current]) linkBySectionId[current].removeAttribute('aria-current');
    if (id && linkBySectionId[id]) linkBySectionId[id].setAttribute('aria-current', 'location');
    var isFirst = current === null;
    current = id;

    if (!chapterText || !id || !linkBySectionId[id]) return;
    var label = linkBySectionId[id].textContent.trim();
    if (swapTimer) window.clearTimeout(swapTimer);

    if (isFirst) {
      chapterText.textContent = label;
      window.requestAnimationFrame(function () { chapterText.classList.add('is-active'); });
      return;
    }
    /* Dip the outgoing title back to its resting size, swap the text once
       it has faded, then bring the new title up to emphasis — the same
       "settle, then arrive" beat as a chapter turning in print. */
    chapterText.classList.remove('is-active');
    swapTimer = window.setTimeout(function () {
      chapterText.textContent = label;
      window.requestAnimationFrame(function () { chapterText.classList.add('is-active'); });
    }, SWAP_DELAY);
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] });

  sections.forEach(function (s) { observer.observe(s); });
})();
