/* Opens and closes the phone menu with Bootstrap's own slide animation.
   It replaces jQuery, Popper and Bootstrap's script, which the site loaded only for this. */
(function () {
  var button = document.querySelector('.navbar-toggler');
  var menu = document.getElementById('navbarNav');
  if (!button || !menu) return;
  var busy = false;

  function afterTransition(done) {
    var finished = false;
    var wait = parseFloat(getComputedStyle(menu).transitionDuration) * 1000 || 0;
    function end() {
      if (finished) return;
      finished = true;
      menu.removeEventListener('transitionend', end);
      done();
      busy = false;
    }
    menu.addEventListener('transitionend', end);
    setTimeout(end, wait + 50);
  }

  button.addEventListener('click', function () {
    if (busy) return;
    busy = true;
    var opening = !menu.classList.contains('show');
    button.setAttribute('aria-expanded', opening ? 'true' : 'false');
    button.classList.toggle('collapsed', !opening);
    if (opening) {
      menu.classList.remove('collapse');
      menu.classList.add('collapsing');
      menu.style.height = '0px';
      menu.style.height = menu.scrollHeight + 'px';
      afterTransition(function () {
        menu.classList.remove('collapsing');
        menu.classList.add('collapse', 'show');
        menu.style.height = '';
      });
    } else {
      menu.style.height = menu.getBoundingClientRect().height + 'px';
      void menu.offsetHeight;
      menu.classList.add('collapsing');
      menu.classList.remove('collapse', 'show');
      menu.style.height = '';
      afterTransition(function () {
        menu.classList.remove('collapsing');
        menu.classList.add('collapse');
      });
    }
  });
})();
