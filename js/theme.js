/* theme.js — dark/"negative" mode toggle. Initial theme is set synchronously
   by an inline script in <head> to prevent a flash of the wrong theme; this
   file only wires the toggle button and persists the user's explicit choice. */
(function () {
  var toggle = document.getElementById('themeToggle');
  var stateLabel = document.getElementById('themeState');
  if (!toggle) return;

  function syncButton() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    if (stateLabel) stateLabel.textContent = isDark ? 'On' : 'Off';
  }

  toggle.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    syncButton();
  });

  syncButton();
})();
