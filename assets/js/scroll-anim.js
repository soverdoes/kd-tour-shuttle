/* ==========================================================================
   KD투어 시안 — 스크롤 등장 애니메이션
   IntersectionObserver 로 뷰포트 진입 시 .is-in 을 부여합니다.
   그룹별로 순차 지연(stagger)을 주어 자연스럽게 이어지도록 했습니다.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  // <head> 인라인 스크립트가 .js-anim 을 붙이지 않았다면
  // (JS 비활성 / 모션 최소화 설정) 아무것도 하지 않습니다.
  if (root.className.indexOf('js-anim') === -1) return;

  // IntersectionObserver 미지원 브라우저 → 전부 즉시 노출
  if (!('IntersectionObserver' in window)) {
    root.className = root.className.replace(/\bjs-anim\b/, '');
    return;
  }

  window.__animReady = true;

  /* [ 선택자, 요소당 지연(ms) ] */
  var GROUPS = [
    ['.intro__title', 0],
    ['.intro__rule', 120],
    ['.intro__item', 90],
    ['.shuttle__title', 0],
    ['.shuttle__desc', 120],
    ['.rcard', 90],
    ['.steps__head', 0],
    ['.steps__illust', 120],
    ['.step', 110],
    ['.board__col', 130]
  ];

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io.unobserve(e.target); // 1회만 재생
    }
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px'
  });

  function bind() {
    for (var g = 0; g < GROUPS.length; g++) {
      var sel = GROUPS[g][0];
      var step = GROUPS[g][1];
      var els = document.querySelectorAll(sel);

      for (var i = 0; i < els.length; i++) {
        if (step) els[i].style.transitionDelay = (i * step) + 'ms';
        io.observe(els[i]);
      }
    }

    // 히어로는 첫 화면이므로 스크롤과 무관하게 로드 직후 재생
    var hero = [
      ['.hero__bg', 0],
      ['.hero__title', 120],
      ['.hero__desc', 260]
    ];

    requestAnimationFrame(function () {
      for (var h = 0; h < hero.length; h++) {
        (function (sel, delay) {
          var el = document.querySelector(sel);
          if (!el) return;
          setTimeout(function () { el.classList.add('is-in'); }, delay);
        })(hero[h][0], hero[h][1]);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
