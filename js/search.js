/* search.js — engineering-document search overlay (index.html only).
   Progressive enhancement: every result below is also a real, already-
   reachable link elsewhere in the document (bookmark rail / project index).
   This script only adds a faster, keyboard-driven way to jump to it. */
(function () {
  var trigger = document.getElementById('searchTrigger');
  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var resultsList = document.getElementById('searchResults');
  if (!trigger || !overlay || !input || !resultsList) return;

  /* Static index — ranked Section > Project > Technology per spec §42 */
  var INDEX = [
    { kind: 'Section', title: '1.0 Introduction', url: '#sec-introduction' },
    { kind: 'Section', title: '2.0 Features', url: '#sec-features' },
    { kind: 'Section', title: '3.0 Electrical Characteristics — Technical Competencies', url: '#sec-characteristics' },
    { kind: 'Section', title: '4.0 Typical Application Circuits — Engineering Projects', url: '#sec-projects' },
    { kind: 'Section', title: '5.0 Professional Experience', url: '#sec-experience' },
    { kind: 'Section', title: '6.0 Certifications', url: '#sec-certifications' },
    { kind: 'Project', title: 'AN-001 — Ball-and-Beam PID Control System', url: 'projects/an-001-ball-and-beam-pid.html' },
    { kind: 'Project', title: 'AN-002 — Class AB Audio Power Amplifier', url: 'projects/an-002-class-ab-amplifier.html' },
    { kind: 'Project', title: 'AN-003 — Communications System', url: 'projects/an-003-communications-system.html' },
    { kind: 'Project', title: 'AN-004 — SAP-2 Architecture', url: 'projects/an-004-sap-2-architecture.html' },
    { kind: 'Project', title: 'AN-005 — Self-Hosted Network Storage Platform', url: 'projects/an-005-network-storage.html' },
    { kind: 'Technology', title: 'Python', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'C++', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'Verilog / HDL', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'MATLAB / Simulink', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'LTspice', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'KiCad / PCB Design', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'Arduino / PlatformIO', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'CCNA / Networking', url: '#sec-certifications' },
    { kind: 'Technology', title: 'Linux / System Administration', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'Git / Version Control', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'Docker', url: '#sec-characteristics' },
    { kind: 'Technology', title: 'PID Control', url: 'projects/an-001-ball-and-beam-pid.html' },
    { kind: 'Technology', title: 'Class AB Amplifier', url: 'projects/an-002-class-ab-amplifier.html' },
    { kind: 'Technology', title: 'QAM / Modulation Theory', url: 'projects/an-003-communications-system.html' },
    { kind: 'Technology', title: 'Computer Architecture / SAP-2', url: 'projects/an-004-sap-2-architecture.html' },
    { kind: 'Technology', title: 'RAID / Network Storage', url: 'projects/an-005-network-storage.html' }
  ];

  var lastFocused = null;
  var activeIndex = -1;
  var currentResults = [];

  function render(results) {
    currentResults = results;
    activeIndex = results.length ? 0 : -1;
    resultsList.innerHTML = '';
    if (!results.length) {
      var empty = document.createElement('li');
      empty.className = 'search-panel__empty';
      empty.textContent = 'No matches. Try a section name, project code (AN-00x), or a technology.';
      resultsList.appendChild(empty);
      return;
    }
    results.forEach(function (r, i) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = r.url;
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', String(i === activeIndex));
      a.innerHTML = '<span class="search-panel__kind">' + r.kind + '</span> — ' + r.title;
      li.appendChild(a);
      resultsList.appendChild(li);
    });
  }

  function filter(query) {
    var q = query.trim().toLowerCase();
    if (!q) return INDEX.slice(0, 8);
    return INDEX.filter(function (r) { return r.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 8);
  }

  function updateActiveVisual() {
    var options = resultsList.querySelectorAll('a[role="option"]');
    options.forEach(function (a, i) { a.setAttribute('aria-selected', String(i === activeIndex)); });
    if (options[activeIndex]) options[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function open() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    input.value = '';
    render(filter(''));
    input.focus();
  }

  function close() {
    overlay.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  trigger.addEventListener('click', open);

  document.addEventListener('keydown', function (e) {
    var isMod = e.ctrlKey || e.metaKey;
    if (isMod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.hidden ? open() : close();
    } else if (e.key === '/' && overlay.hidden && document.activeElement !== input) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); open(); }
    }
  });

  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  input.addEventListener('input', function () { render(filter(input.value)); });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); if (currentResults.length) { activeIndex = (activeIndex + 1) % currentResults.length; updateActiveVisual(); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (currentResults.length) { activeIndex = (activeIndex - 1 + currentResults.length) % currentResults.length; updateActiveVisual(); } }
    else if (e.key === 'Enter') { e.preventDefault(); if (currentResults[activeIndex]) { window.location.href = currentResults[activeIndex].url; } }
  });
})();
