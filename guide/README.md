# 📖 바이브코딩 1인 창업 MVP 바이블 (VibeCraft Guide)

> **비개발자 1인 창업가를 위한 완전 실전 가이드**  
> 외주 개발 종속에서 벗어나 7일 만에 결제와 배포까지 완성하는 바이브코딩 MVP 런칭 & 자립 운영 가이드북입니다.

---

## 📁 디렉토리 구조 및 역할

```text
guide/
├── chapters/          # 각 파트 및 챕터별 원본 HTML 조각 (00-cover.html ~ epilogue.html)
├── images/            # 가이드북 전용 이미지 에셋
├── template.html      # 웹북 전체 레이아웃 (상단 툴바, 좌측 목차, 테마 토글 등)
├── style.css          # 웹북 스타일링 (다크/라이트 모드, PDF 인쇄 스타일 포함)
├── script.js          # 목차 하이라이트, 복사 토스트, 테마 전환 스크립트
├── build.js           # 챕터들을 합쳐 최종 index.html을 생성하는 빌드 스크립트
├── index.html         # 빌드되어 배포되는 최종 웹북 파일
└── README.md          # 본 가이드 문서
```

---

## 📚 도서 목차 (Table of Contents)

- **Cover & Intro**: 표지, 저자 소개 및 이 책을 활용하는 법
- **PART 1 · 마인드셋**
  - Ch.01 외주 개발의 불편한 진실
  - Ch.02 기능이 많을수록 실패한다: 린(Lean) 본질
  - Ch.03 7일 스프린트 철학
- **PART 2 · 기획**
  - Ch.04 비개발자 관점 MVP 진단 기준 3원칙
  - Ch.05 AI로 킬러 기능 1개 추출하는 프롬프트
  - Ch.06 한 장으로 끝내는 유저 플로우 & DB 설계
- **PART 3 · 실행 (7일 스프린트)**
  - Ch.07 Day 1: Cursor 세팅 및 프로젝트 베이스라인
  - Ch.08 Day 2-4: 고속 프론트/백엔드 바이브코딩
  - Ch.09 Day 5: 토스페이먼츠/Stripe 결제 연동
  - Ch.10 Day 6-7: Vercel 배포 & 도메인 연결
- **PART 4 · 외주 졸업 키트**
  - Ch.11 나만의 맞춤형 `.cursorrules` 시스템 구축
  - Ch.12 에러 해결 및 유지보수 비개발자 운영 루틴
  - Ch.13 첫 고객 10명 유치 런칭 체크리스트
- **PART 5 · 성장과 스케일업**
  - Ch.14 피드백 루프와 데이터 기반 개선
  - Ch.15 1인 기업 연 1억 자동화 수익 구조 설계
- **부록 (Appendix)**
  - 부록 A: 실전 바이브코딩 프롬프트 치트시트 30선
  - 부록 B: 2026 추천 노코드/바이브 스택 레퍼런스
  - 에필로그 & 1:1 의뢰 및 컨설팅 안내

---

## 🚀 빌드 및 실행 방법

챕터 파일([guide/chapters/](file:///c:/workdir/space-cap/vercel-hello-world/guide/chapters))을 수정한 후 아래 명령어로 최종 [index.html](file:///c:/workdir/space-cap/vercel-hello-world/guide/index.html)을 생성합니다.

```bash
# 루트 디렉토리에서 실행
npm run build

# 또는 guide 디렉토리에서 직접 실행
node guide/build.js
```

---

## ✍️ 챕터 작성 및 수정 가이드

1. **새 챕터 추가 시**:
   - `guide/chapters/` 폴더에 `chXX.html` 파일 생성
   - `guide/build.js`의 `chapterFiles` 배열에 파일명 순서대로 추가
   - `guide/template.html`의 사이드바 목차(`<nav class="toc-nav">`)에 앵커 링크 추가
2. **코드 및 프롬프트 블록 스타일**:
   - 프롬프트 복사 버튼이 포함된 블록은 `<div class="prompt-box">` 클래스를 활용합니다.
3. **인쇄/PDF 저장 최적화**:
   - 우측 상단의 `📄 PDF 저장` 버튼을 누르면 인쇄용 CSS가 적용되어 깔끔한 전자책 문서로 저장됩니다.
