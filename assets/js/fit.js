/* ==========================================================================
   KD투어 시안 — 고정 1920 캔버스 → 뷰포트 폭 맞춤 스케일
   어떤 화면 폭에서도 .page(1920px) 를 뷰포트에 꽉 맞춰 스케일합니다.
   - 넓은 모니터  : 확대되어 양옆 흰 여백 제거
   - 좁은 화면    : 축소되어 가로 스크롤 제거
   비율/간격/폰트 크기 관계는 그대로 유지됩니다.
   ========================================================================== */
(function () {
  'use strict';

  var BASE_W = 1920;
  var page = document.querySelector('.page');
  if (!page) return;

  document.documentElement.classList.add('js-fit');

  var hero = document.querySelector('.hero');
  var HERO_MIN = 806;

  function fit() {
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var vh = document.documentElement.clientHeight || window.innerHeight;
    var scale = vw / BASE_W;

    // 메인 히어로를 뷰포트 높이에 꽉 채움.
    // 화면에 보일 히어로 높이 = heroCanvas * scale = vh  →  heroCanvas = vh / scale
    if (hero) {
      var heroCanvas = Math.max(HERO_MIN, Math.round(vh / scale));
      hero.style.height = heroCanvas + 'px';
    }

    page.style.transform = 'scale(' + scale + ')';

    // transform 은 레이아웃 높이에 반영되지 않으므로,
    // 스케일된 실제 높이만큼 body 높이를 잡아 세로 스크롤을 맞춥니다.
    var h = page.offsetHeight; // 미스케일 기준 콘텐츠 전체 높이
    document.body.style.height = Math.round(h * scale) + 'px';
  }

  // 초기 실행 (스크립트가 body 끝에서 로드되므로 DOM 완성 상태)
  fit();

  // 폰트·이미지 로드 후 높이 재계산
  window.addEventListener('load', fit);

  // 리사이즈 / 방향 전환 대응 (rAF 스로틀)
  var ticking = false;
  function onResize() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      fit();
      ticking = false;
    });
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
})();
