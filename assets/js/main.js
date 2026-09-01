/* Hifsa Khan Salon — homepage interactions */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ sticky header */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('is-stuck', window.scrollY > 10);
  }, { passive: true });

  /* -------------------------------------------------------- mobile menu */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  // The drawer is fixed, so it must clear whatever the header occupies right now.
  function measureHeader() {
    document.documentElement.style.setProperty(
      '--header-h', Math.max(0, Math.round(header.getBoundingClientRect().bottom)) + 'px');
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
    if (window.innerWidth > 1180 && drawer.classList.contains('is-open')) setMenu(false);
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
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
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
    var wasOpen = item.classList.contains('is-open');
    faqList.querySelectorAll('.faq__item.is-open').forEach(closeItem);
    if (!wasOpen) openItem(item);
  });

  var firstOpen = faqList.querySelector('.faq__item.is-open');
  if (firstOpen) openItem(firstOpen);

  window.addEventListener('resize', function () {
    var open = faqList.querySelector('.faq__item.is-open');
    if (open) {
      var panel = open.querySelector('.faq__a');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });

  /* ---------------------------------------------------- testimonial slider */
  var track = document.getElementById('tstTrack');
  var slides = track ? track.children : [];
  var index = 0;
  var timer = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
  }
  function autoplay() {
    if (reduceMotion || slides.length < 2) return;
    clearInterval(timer);
    timer = setInterval(function () { goTo(index + 1); }, 7000);
  }

  if (slides.length) {
    document.getElementById('tstPrev').addEventListener('click', function () { goTo(index - 1); autoplay(); });
    document.getElementById('tstNext').addEventListener('click', function () { goTo(index + 1); autoplay(); });

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

  /* ------------------------------------------------------------- forms */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function wireForm(formId, emailId, msgId, success) {
    var form = document.getElementById(formId);
    if (!form) return;
    var msg = document.getElementById(msgId);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById(emailId);
      if (!EMAIL.test(input.value.trim())) {
        msg.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      msg.textContent = success;
      form.reset();
    });
  }

  wireForm('guideForm', 'gEmail', 'guideMsg', 'Thank you — your guide is on its way.');
  wireForm('nlForm', 'nlEmail', 'nlMsg', 'Thank you — you are on the list.');

  document.getElementById('year').textContent = new Date().getFullYear();
})();
