# KD투어 시안 — 셔틀 예약 랜딩

KD 운송그룹 셔틀버스 예약 랜딩 페이지 퍼블리싱 시안. Figma 원본(1920 × 3560)을 1:1 수치로 정적 HTML/CSS 구현했습니다.

## 페이지

| 파일 | 설명 |
|---|---|
| `index.html` | 시안1 (스키셔틀), 홈 |
| `resort.html` | 시안2 (리조트셔틀) |

## 구조

```
.
├─ index.html
├─ resort.html
├─ assets/
│  ├─ css/style.css        # 공용 스타일 (토큰·레이아웃·컴포넌트·스크롤 애니메이션)
│  ├─ js/scroll-anim.js    # IntersectionObserver 기반 등장 애니메이션
│  └─ img/                 # 이미지 14종 (아래 IMAGES.md 참고)
└─ IMAGES.md               # 이미지 파일명·크기 정리
```

## 특징

- **폰트** : Pretendard (CDN)
- **콘텐츠 폭** 1440 / 좌우 여백 240 — Figma 원본 수치 그대로
- **이미지 슬롯** : `assets/img/` 에 파일이 있으면 표시, 없으면 파일명이 적힌 회색 플레이스홀더 노출
- **스크롤 애니메이션** : `opacity`/`transform` 만 사용해 레이아웃 불변, `prefers-reduced-motion` 존중

## 로컬 실행

정적 파일이라 `index.html` 을 브라우저로 열면 됩니다. (경로 이슈 없이 보려면 간단한 서버 권장)

```bash
python -m http.server 8000
# → http://localhost:8000
```

## 배포

GitHub Pages 로 배포됩니다. (Settings → Pages → Branch: `main` / root)
