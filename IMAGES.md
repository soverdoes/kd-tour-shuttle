# KD투어 시안1 — 이미지 에셋 목록

퍼블리싱 시 모든 사진은 **회색 플레이스홀더 박스**로 처리되어 있습니다.
각 박스 안에 아래 파일명이 표기되어 있으니, 실제 이미지를 `assets/img/` 에 동일한 파일명으로 넣으면 됩니다.

- 원본 Figma 파일 : `kd투어 시안`
- 대상 프레임 : `시안1(스키셔틀),홈` (1920×3560) / `시안2(리조트셔틀)` (1920×3560)
- 이미지 경로 규칙 : `assets/img/{파일명}`

---

## 1. 공통 에셋 (두 페이지 공용)

| # | 파일명 | 용도 / 위치 | 권장 크기 | 형식 |
|---|--------|------------|----------|------|
| 1 | `logo-kdtour.svg` | GNB 좌측 KD투어 로고 | 214 × 34 | SVG |
| 2 | `illust-booking-3steps.png` | `예약은 3단계면 끝납니다` 섹션 좌측 아이소메트릭 일러스트 | 985 × 597 | PNG (투명 배경) |

> `illust-booking-3steps.png` 는 섹션 기준 `left: -228px / top: 216px` 에 배치되며,
> 좌측·하단이 잘려 보이는 것이 원본과 동일한 상태입니다.

---

## 2. 시안1(스키셔틀), 홈 — `index.html`

| # | 파일명 | 용도 / 위치 | 권장 크기 | 형식 |
|---|--------|------------|----------|------|
| 3 | `hero-ski.jpg` | 메인 히어로 배경 (스키 탑승 장면) | 1920 × 700 | JPG |
| 4 | `section-shuttle-ski-bg.jpg` | `평창 스키장 셔틀버스` 섹션 배경 | 1920 × 952 | JPG |
| 5 | `card-phoenixpark-ski.jpg` | 카드 1 — 휘닉스파크 (Phoenix Park) | 353 × 359 | JPG |
| 6 | `card-monayongpyong-ski.jpg` | 카드 2 — 모나 용평 (MONA Yong Pyong) | 353 × 359 | JPG |
| 7 | `card-alpensia-ski.jpg` | 카드 3 — 알펜시아 (Alpensia) | 353 × 359 | JPG |
| 8 | `card-ramadapyeongchang-ski.jpg` | 카드 4 — 라마다 평창 (Ramada Pyeongchang) | 353 × 359 | JPG |

---

## 3. 시안2(리조트셔틀) — `resort.html`

| # | 파일명 | 용도 / 위치 | 권장 크기 | 형식 |
|---|--------|------------|----------|------|
| 9 | `hero-resort.jpg` | 메인 히어로 배경 (리조트 앞 단체 승차 장면) | 1920 × 700 | JPG |
| 10 | `section-shuttle-resort-bg.jpg` | `평창 리조트 셔틀버스` 섹션 배경 | 1920 × 952 | JPG |
| 11 | `card-phoenixpark-resort.jpg` | 카드 1 — 휘닉스파크 (Phoenix Park) | 353 × 359 | JPG |
| 12 | `card-monayongpyong-resort.jpg` | 카드 2 — 모나 용평 (MONA Yong Pyong) | 353 × 359 | JPG |
| 13 | `card-alpensia-resort.jpg` | 카드 3 — 알펜시아 (Alpensia) | 353 × 359 | JPG |
| 14 | `card-ramadapyeongchang-resort.jpg` | 카드 4 — 라마다 평창 (Ramada Pyeongchang) | 353 × 359 | JPG |

> 두 페이지의 카드는 **리조트명은 같지만 사진이 서로 다릅니다** (스키 시즌 / 리조트 시즌).
> 그래서 `-ski` / `-resort` 접미사로 분리했습니다.

---

## 4. 이미지 위 오버레이 (이미지 아님 · CSS 처리 완료)

교체 시 아래 딤 처리가 이미 적용되어 있으므로, **원본 사진 그대로** 넣으면 됩니다.

| 위치 | 오버레이 |
|------|---------|
| 히어로 배경 | `rgba(0, 0, 0, 0.6)` |
| 셔틀버스 섹션 배경 | `rgba(0, 0, 0, 0.7)` |

---

## 5. 교체 방법 — 파일만 넣으면 끝

**HTML 수정 불필요.** `assets/img/` 폴더에 위 표의 파일명 그대로 넣기만 하면 자동으로 표시됩니다.

```
d:\ai\claude\whitelable\assets\img\
  ├─ logo-kdtour.svg
  ├─ illust-booking-3steps.png
  ├─ hero-ski.jpg
  ├─ section-shuttle-ski-bg.jpg
  ├─ card-phoenixpark-ski.jpg
  └─ ... (총 14개)
```

동작 방식은 다음과 같습니다.

- 파일이 **있으면** → 사진이 슬롯을 꽉 채워 표시 (`object-fit: cover`)
- 파일이 **없으면** → 기존처럼 파일명이 적힌 **회색 플레이스홀더**가 그대로 표시

```html
<!-- 이미지 슬롯 구조 : 파일이 없으면 img 가 스스로 숨고 회색 박스만 남습니다 -->
<div class="hero__bg ph">
  hero-ski.jpg<br>1920 × 700
  <img src="assets/img/hero-ski.jpg" alt="" onerror="this.style.display='none'">
</div>
```

> 로고(`logo-kdtour.svg`)와 일러스트(`illust-booking-3steps.png`)는 잘림 없이 비율을 유지해야 하므로
> `ph--contain` 클래스가 적용되어 `object-fit: contain` 으로 표시됩니다.

파일명을 바꾸고 싶다면 HTML의 `src` 와 플레이스홀더 텍스트 두 곳만 함께 수정하면 됩니다.

---

## 6. 참고 — 폰트

전 구간 **Pretendard** 사용 (Bold 700 / SemiBold 600 / Medium 500 / Regular 400, FAQ `Q` 만 ExtraBold 800).
현재 jsDelivr CDN으로 로드 중이며, 로컬 서빙이 필요하면 `assets/css/style.css` 최상단 `@import` 를 교체하면 됩니다.
