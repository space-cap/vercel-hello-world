document.addEventListener('DOMContentLoaded', () => {
  // Elements for Simulator
  const ideaInput = document.getElementById('idea-input');
  const generateBtn = document.getElementById('generate-btn');
  const btnText = document.getElementById('btn-text');
  const terminalLoading = document.getElementById('terminal-loading');
  const specCard = document.getElementById('spec-card');
  const specProjectName = document.getElementById('spec-project-name');
  const specDays = document.getElementById('spec-days');
  const specFeatures = document.getElementById('spec-features');
  const specStack = document.getElementById('spec-stack');
  const presetChips = document.querySelectorAll('.preset-chip');

  // Elements for Lead Form & Modal
  const simLeadForm = document.getElementById('sim-lead-form');
  const simEmail = document.getElementById('sim-email');
  const leadModal = document.getElementById('lead-modal');
  const modalTargetEmail = document.getElementById('modal-target-email');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const btnModalClose = document.getElementById('btn-modal-close');

  // FAQ Elements
  const faqItems = document.querySelectorAll('.faq-item');

  // 1. AI Spec Generator Logic
  function generateSpec(ideaText) {
    if (!ideaText.trim()) return;

    // Show loading state
    specCard.style.display = 'none';
    terminalLoading.style.display = 'flex';
    if (btnText) btnText.textContent = '분석 중...';

    setTimeout(() => {
      terminalLoading.style.display = 'none';
      specCard.style.display = 'block';
      if (btnText) btnText.textContent = '🚀 즉석 기획서 생성';

      // Dynamic tailoring based on keywords
      const cleaned = ideaText.trim();
      let title = cleaned.length > 22 ? cleaned.substring(0, 22) + '...' : cleaned;
      let days = '⏱️ 예상 완성 기간: 단 5일';
      let features = [];
      let stack = [];

      if (cleaned.includes('뉴스레터') || cleaned.includes('콘텐츠') || cleaned.includes('멤버십')) {
        days = '⏱️ 예상 완성 기간: 단 4일';
        features = [
          '1. 고스트/노션 스타일 마크다운 뉴스레터 에디터 및 아카이빙',
          '2. 토스페이먼츠 정기 구독 / 일회성 유료 결제 모듈',
          '3. Resend 기반 대량 이메일 발송 & 오픈율 추적 대시보드'
        ];
        stack = [
          '· <strong>프레임워크</strong>: Next.js 15 App Router + Vercel Serverless',
          '· <strong>DB/인증</strong>: Supabase Auth & PostgreSQL',
          '· <strong>외주 졸업</strong>: <code>.cursorrules</code> (에디터 스타일 및 결제 웹훅 수정 프롬프트)'
        ];
      } else if (cleaned.includes('마켓') || cleaned.includes('판매') || cleaned.includes('커머스') || cleaned.includes('템플릿')) {
        days = '⏱️ 예상 완성 기간: 단 5일';
        features = [
          '1. 디지털 에셋 카탈로그 및 실시간 필터/검색 시스템',
          '2. 토스 간편결제 연동 및 결제 즉시 다운로드 링크 자동 발급',
          '3. 구매자 리뷰 및 별점 피드백 작성 모듈'
        ];
        stack = [
          '· <strong>프레임워크</strong>: Next.js 15 + Tailwind/Pure CSS + Vercel Edge',
          '· <strong>결제 연동</strong>: 토스페이먼츠 빌링 & 결제창 v2',
          '· <strong>외주 졸업</strong>: <code>.cursorrules</code> (상품 추가 및 가격 정책 변경용 AI 프롬프트)'
        ];
      } else if (cleaned.includes('리뷰') || cleaned.includes('매장') || cleaned.includes('대시보드') || cleaned.includes('SaaS')) {
        days = '⏱️ 예상 완성 기간: 단 6일';
        features = [
          '1. 네이버/구글 플레이스 리뷰 데이터 크롤링 및 AI 긍/부정 분석',
          '2. 점주 맞춤형 AI 자동 답글 추천 및 복사 엔진',
          '3. 주간 리뷰 트렌드 요약 리포트 자동 생성'
        ];
        stack = [
          '· <strong>프레임워크</strong>: Next.js 15 Fullstack + Vercel Cron Jobs',
          '· <strong>AI 모델</strong>: OpenAI GPT-4o-mini API 연동',
          '· <strong>외주 졸업</strong>: <code>.cursorrules</code> (답글 톤앤매너 프롬프트 커스텀 가이드)'
        ];
      } else {
        days = '⏱️ 예상 완성 기간: 단 5일';
        features = [
          `1. [${title}] 전용 핵심 인터랙션 엔진 및 실시간 데이터 입출력`,
          '2. 모바일/데스크톱 완벽 반응형 UI 및 카카오/구글 소셜 로그인',
          '3. 토스페이먼츠 유료 결제 모듈 및 관리자 운영 대시보드'
        ];
        stack = [
          '· <strong>프레임워크</strong>: Next.js 15 App Router + Vercel 무중단 배포',
          '· <strong>데이터베이스</strong>: Supabase Cloud Database & Storage',
          '· <strong>외주 졸업</strong>: <code>.cursorrules</code> (비개발자 대표 전용 AI 유지보수 키트)'
        ];
      }

      // Update DOM
      specProjectName.textContent = title;
      specDays.textContent = days;
      specFeatures.innerHTML = features.map(f => `<li>${f}</li>`).join('');
      specStack.innerHTML = stack.map(s => `<li>${s}</li>`).join('');

      // Auto update modal title preview
      if (modalProjectTitle) {
        modalProjectTitle.textContent = title;
      }
    }, 600);
  }

  // Generate Button Click
  if (generateBtn && ideaInput) {
    generateBtn.addEventListener('click', () => {
      generateSpec(ideaInput.value);
    });

    ideaInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        generateSpec(ideaInput.value);
      }
    });
  }

  // Preset chips click
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const idea = chip.getAttribute('data-idea');
      if (idea && ideaInput) {
        ideaInput.value = idea;
        generateSpec(idea);
      }
    });
  });

  // 2. Lead Form Submission inside Simulator
  if (simLeadForm && simEmail) {
    simLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = simEmail.value.trim();
      const currentIdea = ideaInput ? ideaInput.value.trim() : 'MVP 프로젝트';

      if (!email) return;

      // Save lead to LocalStorage
      try {
        const stored = JSON.parse(localStorage.getItem('vibecraft_leads') || '[]');
        stored.push({
          email: email,
          idea: currentIdea,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('vibecraft_leads', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage warning:', err);
      }

      // Open Modal
      if (modalTargetEmail) {
        modalTargetEmail.innerHTML = `<strong>${escapeHtml(email)}</strong>(으)로 <strong>[VibeCraft_MVP_기획리포트_및_프롬프트.pdf]</strong>가 발송 대기열에 등록되었습니다.`;
      }
      if (leadModal) {
        leadModal.classList.add('active');
        leadModal.setAttribute('aria-hidden', 'false');
      }

      simEmail.value = '';
    });
  }

  // 3. Modal Close handlers
  function closeModal() {
    if (leadModal) {
      leadModal.classList.remove('active');
      leadModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnModalClose) {
    btnModalClose.addEventListener('click', closeModal);
  }

  if (leadModal) {
    leadModal.addEventListener('click', (e) => {
      if (e.target === leadModal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && leadModal && leadModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. FAQ Accordion
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
