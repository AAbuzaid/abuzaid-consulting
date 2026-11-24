// Fades page sections in as they scroll into view.
// Content already on screen when the page opens is left alone, and nothing is hidden when the
// browser lacks IntersectionObserver or the visitor has asked their device for reduced motion.
(function () {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var selector = [
    '.section-title', '.section-lead', '.pillar', '.card-col', '.founder .row', '.service-group',
    '.contact-us-component', '.contact-form-card', '.footer-col'
  ].join(',');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      var el = entry.target;
      observer.unobserve(el);
      el.classList.add('is-visible');
      // Remove the animation styles afterwards so hover effects work as before
      setTimeout(function () {
        el.classList.remove('reveal', 'is-visible');
        el.style.transitionDelay = '';
      }, 1000);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      return;
    }
    // Siblings appear one after another
    var index = Array.prototype.indexOf.call(el.parentNode.children, el) % 4;
    el.style.transitionDelay = (index * 90) + 'ms';
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
