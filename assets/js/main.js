/* pharma_audit · 站点交互（无依赖）
   三件事：移动端菜单、滚动高亮当前章节、元素入场。 */

(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');

  function closeMenu() {
    if (!mobile || !toggle) return;
    mobile.classList.remove('is-open');
    mobile.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('is-open');
      mobile.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* 锚点跳转：补偿固定导航高度 */
  var nav = document.getElementById('nav');
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var offset = (nav ? nav.offsetHeight : 0) + 8;
      var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMenu();
      history.replaceState(null, '', id);
    });
  });

  /* 滚动时高亮导航 */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* 入场动画：不支持时直接显示 */
  var reveals = document.querySelectorAll('.card, .steps li, .layer, .mock, .note, .mini');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  reveals.forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(function (el) { io.observe(el); });
})();
