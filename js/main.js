/* main.js — print trigger only. (The v1 boot-sequence loader was retired in
   the editorial redesign: it suited the strict "datasheet cosplay" concept
   but fights a premium, quiet-confidence reading experience.) */
(function printTrigger() {
  var btn = document.getElementById('printTrigger');
  if (!btn) return;
  btn.addEventListener('click', function () { window.print(); });
})();
