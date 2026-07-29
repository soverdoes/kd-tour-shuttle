/* ==========================================================================
   KD투어 시안 — 예약폼(검색바) 기능
   - From / To / 인원 : 리스트 드롭다운 선택
   - Departure         : 캘린더 날짜 선택 (지난 날짜 비활성)
   - 검색              : 입력값 검증 + 안내 토스트 (다음 화면 이동은 제외)
   순수 바닐라 JS, 외부 라이브러리 없음.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.querySelector('.bform');
  if (!form) return;

  /* ---- 드롭다운 옵션 ---- */
  var OPTIONS = {
    from: ['서울 · 잠실역', '서울 · 사당역', '서울 · 양재역', '성남 · 야탑역', '수원 · 수원역', '인천 · 인천공항'],
    to: ['휘닉스파크', '모나 용평', '알펜시아', '라마다 평창'],
    pax: ['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명', '10명 이상']
  };
  var WD = ['일', '월', '화', '수', '목', '금', '토'];

  var openField = null;

  function closeAll() {
    if (openField) {
      openField.classList.remove('is-open');
      openField = null;
    }
  }
  function openOnly(field) {
    if (openField && openField !== field) openField.classList.remove('is-open');
    field.classList.add('is-open');
    openField = field;
  }

  /* ====================== 리스트 드롭다운 ====================== */
  function initDropdown(field) {
    var key = field.getAttribute('data-field');
    var control = field.querySelector('.bfield__control');
    var valueEl = field.querySelector('.bfield__value');

    var pop = document.createElement('div');
    pop.className = 'bpop bdrop';

    OPTIONS[key].forEach(function (opt) {
      var item = document.createElement('div');
      item.className = 'bdrop__item';
      item.textContent = opt;
      item.addEventListener('click', function () {
        valueEl.textContent = opt;
        valueEl.classList.remove('is-placeholder');
        field.dataset.value = opt;
        pop.querySelectorAll('.bdrop__item').forEach(function (n) { n.classList.remove('is-selected'); });
        item.classList.add('is-selected');
        control.classList.remove('is-invalid');
        closeAll();
      });
      pop.appendChild(item);
    });

    field.appendChild(pop);
    pop.addEventListener('click', function (e) { e.stopPropagation(); });

    control.addEventListener('click', function (e) {
      e.stopPropagation();
      if (field.classList.contains('is-open')) closeAll();
      else openOnly(field);
    });
  }

  /* ====================== 캘린더 ====================== */
  function initCalendar(field) {
    var control = field.querySelector('.bfield__control');
    var valueEl = field.querySelector('.bfield__value');

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var view = new Date(today.getFullYear(), today.getMonth(), 1);
    var selected = null;

    var pop = document.createElement('div');
    pop.className = 'bpop bcal';
    field.appendChild(pop);
    pop.addEventListener('click', function (e) { e.stopPropagation(); });

    function sameDay(a, b) {
      return a && b && a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function render() {
      var y = view.getFullYear(), m = view.getMonth();
      var first = new Date(y, m, 1).getDay();
      var days = new Date(y, m + 1, 0).getDate();
      var atFloor = (y === today.getFullYear() && m === today.getMonth());

      var html = '';
      html += '<div class="bcal__head">';
      html += '<button type="button" class="bcal__nav" data-nav="-1"' + (atFloor ? ' disabled' : '') + '>‹</button>';
      html += '<span class="bcal__title">' + y + '년 ' + (m + 1) + '월</span>';
      html += '<button type="button" class="bcal__nav" data-nav="1">›</button>';
      html += '</div><div class="bcal__grid">';
      for (var w = 0; w < 7; w++) {
        html += '<div class="bcal__wd' + (w === 0 ? ' sun' : w === 6 ? ' sat' : '') + '">' + WD[w] + '</div>';
      }
      for (var i = 0; i < first; i++) html += '<span class="bcal__day is-empty"></span>';
      for (var d = 1; d <= days; d++) {
        var date = new Date(y, m, d);
        var dow = date.getDay();
        var cls = 'bcal__day' + (dow === 0 ? ' sun' : dow === 6 ? ' sat' : '');
        if (date < today) cls += ' is-disabled';
        if (sameDay(date, today)) cls += ' is-today';
        if (sameDay(date, selected)) cls += ' is-selected';
        html += '<button type="button" class="' + cls + '" data-day="' + d + '">' + d + '</button>';
      }
      html += '</div>';
      pop.innerHTML = html;

      pop.querySelectorAll('.bcal__nav').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (btn.disabled) return;
          view.setMonth(view.getMonth() + parseInt(btn.getAttribute('data-nav'), 10));
          render();
        });
      });
      pop.querySelectorAll('.bcal__day[data-day]').forEach(function (btn) {
        if (btn.classList.contains('is-disabled')) return;
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var d = parseInt(btn.getAttribute('data-day'), 10);
          selected = new Date(view.getFullYear(), view.getMonth(), d);
          var label = selected.getFullYear() + '.' + pad(selected.getMonth() + 1) + '.' + pad(d) +
            ' (' + WD[selected.getDay()] + ')';
          valueEl.textContent = label;
          valueEl.classList.remove('is-placeholder');
          field.dataset.value = label;
          control.classList.remove('is-invalid');
          closeAll();
        });
      });
    }

    control.addEventListener('click', function (e) {
      e.stopPropagation();
      if (field.classList.contains('is-open')) { closeAll(); return; }
      if (selected) view = new Date(selected.getFullYear(), selected.getMonth(), 1);
      render();
      openOnly(field);
    });
  }

  /* ====================== 초기화 ====================== */
  Array.prototype.forEach.call(form.querySelectorAll('.bform__field'), function (field) {
    if (field.getAttribute('data-field') === 'depart') initCalendar(field);
    else initDropdown(field);
  });

  /* 바깥 클릭 / ESC 로 닫기 */
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* ====================== 검색 (다음 화면 제외) ====================== */
  var toast;
  function showToast(html) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'btoast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = html;
    // 리플로우 후 표시
    void toast.offsetWidth;
    toast.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove('is-show'); }, 3200);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fields = form.querySelectorAll('.bform__field');
    var missing = [];
    Array.prototype.forEach.call(fields, function (field) {
      var control = field.querySelector('.bfield__control');
      if (!field.dataset.value) {
        control.classList.remove('is-invalid');
        void control.offsetWidth;
        control.classList.add('is-invalid');
        missing.push(field.querySelector('.bfield__label').textContent);
      }
    });

    if (missing.length) {
      showToast('모든 항목을 선택해주세요.');
      return;
    }

    var v = {};
    Array.prototype.forEach.call(fields, function (field) {
      v[field.getAttribute('data-field')] = field.dataset.value;
    });
    showToast(
      '<b>' + v.from + '</b> → <b>' + v.to + '</b> · ' +
      v.depart + ' · ' + v.pax + ' 조건으로 검색되었습니다.'
    );
    /* ※ 요청에 따라 검색 결과(다음 화면) 이동은 제외 */
  });
})();
