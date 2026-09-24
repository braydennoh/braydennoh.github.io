'use strict';
/* The Appearance panel: text size (Small / Standard / Large), on every page that loads
   style.css.  Load it from <head> WITHOUT defer:

     <script src="appearance.js"></script>

   The top half runs before the body paints, so a reader who chose Large does not see the page
   jump from the default size.  The panel itself is injected rather than written into each
   page's markup: a control that does nothing without JavaScript should not be on the page when
   the script fails.  It sets --ts, the scale that style.css writes its text sizes against. */

(function () {
  var root = document.documentElement;
  var SCALE = {small: 0.9, standard: 1, large: 17 / 15};      // 13.5, 15 and 17 px body text

  // Storage throws outright in some contexts, not just return null: a private window, a browser
  // set to block site data, a file:// page in Safari.  Every access has to be guarded.
  function read(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  var stored = read('text-size', 'standard');
  var text = SCALE[stored] ? stored : 'standard';

  function apply() {
    root.style.setProperty('--ts', String(SCALE[text]));
  }

  apply();                       // before first paint, so the stored choice is what gets painted

  function build() {
    var host = document.querySelector('.columns');
    if (!host || host.querySelector('.appearance')) return;

    var aside = document.createElement('aside');
    aside.className = 'appearance';
    aside.innerHTML =
      '<h2>Appearance</h2>' +
      '<div class="grp"><span>Text</span>' +
        '<label class="t1"><input type="radio" name="ap-text" value="small">Small</label>' +
        '<label class="t2"><input type="radio" name="ap-text" value="standard">Standard</label>' +
        '<label class="t3"><input type="radio" name="ap-text" value="large">Large</label>' +
      '</div>';
    host.appendChild(aside);

    var els = aside.querySelectorAll('input[name="ap-text"]');
    for (var i = 0; i < els.length; i++) {
      els[i].checked = (els[i].value === text);
      els[i].addEventListener('change', function () {
        if (!this.checked) return;
        text = this.value;
        write('text-size', text);
        apply();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
