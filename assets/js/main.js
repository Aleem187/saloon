/* Hifsa Khan Salon — homepage interactions */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ sticky header */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------- mobile menu */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  // The drawer is fixed, so it must clear whatever the masthead occupies at the
  // top of the viewport right now — that shrinks once the topbar has scrolled away.
  function measureHeader() {
    var bottom = header.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty('--header-h', Math.max(0, Math.round(bottom)) + 'px');
  }

  function setMenu(open) {
    if (open) measureHeader();
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
  }

  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });

  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980 && drawer.classList.contains('is-open')) setMenu(false);
  });

  /* ------------------------------------------------------ scroll reveal */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------- FAQ accordion */
  var faqList = document.getElementById('faqList');

  function closeItem(item) {
    item.classList.remove('is-open');
    item.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
    item.querySelector('.faq__a').style.maxHeight = '';
  }

  function openItem(item) {
    var panel = item.querySelector('.faq__a');
    item.classList.add('is-open');
    item.querySelector('.faq__q').setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  faqList.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq__q');
    if (!btn) return;
    var item = btn.parentElement;
    var isOpen = item.classList.contains('is-open');

    faqList.querySelectorAll('.faq__item.is-open').forEach(closeItem);
    if (!isOpen) openItem(item);
  });

  // The first item ships open — give it a real height, and keep it correct on resize.
  var initiallyOpen = faqList.querySelector('.faq__item.is-open');
  if (initiallyOpen) openItem(initiallyOpen);

  window.addEventListener('resize', function () {
    var open = faqList.querySelector('.faq__item.is-open');
    if (open) open.querySelector('.faq__a').style.maxHeight =
      open.querySelector('.faq__a').scrollHeight + 'px';
  });

  /* ---------------------------------------------------- testimonial slider */
  var track = document.getElementById('tstTrack');
  var slides = track ? track.children : [];
  var dotsWrap = document.getElementById('tstDots');
  var index = 0;
  var timer = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    dotsWrap.querySelectorAll('.tst__dot').forEach(function (d, n) {
      d.classList.toggle('is-active', n === index);
      d.setAttribute('aria-selected', String(n === index));
    });
  }

  function autoplay() {
    if (reduceMotion || slides.length < 2) return;
    clearInterval(timer);
    timer = setInterval(function () { goTo(index + 1); }, 7000);
  }

  if (slides.length) {
    Array.prototype.forEach.call(slides, function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'tst__dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); autoplay(); });
      dotsWrap.appendChild(dot);
    });

    document.getElementById('tstPrev').addEventListener('click', function () { goTo(index - 1); autoplay(); });
    document.getElementById('tstNext').addEventListener('click', function () { goTo(index + 1); autoplay(); });

    // Swipe on touch devices.
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) { goTo(index + (dx < 0 ? 1 : -1)); autoplay(); }
      startX = null;
    }, { passive: true });

    goTo(0);
    autoplay();
  }

  /* ------------------------------------------------------------ newsletter */
  var form = document.getElementById('newsletterForm');
  var msg = document.getElementById('nlMsg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById('nlEmail');
    var value = input.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      msg.textContent = 'Please enter a valid email address.';
      input.focus();
      return;
    }

    msg.textContent = 'Thank you — you are on the list.';
    form.reset();
  });

  /* ------------------------------------------------------------- misc */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
