document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Reading Progress Bar ────────────────────────────────
  const progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docHeight > 0 ? `${Math.min(100, (scrollTop / docHeight) * 100)}%` : '0%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ── 2. TOC Active Link (IntersectionObserver) ──────────────
  const sections = document.querySelectorAll('[id]');
  const tocLinks = document.querySelectorAll('.toc-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          // Scroll TOC link into view
          activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    });
  }, { rootMargin: '-20% 0% -70% 0%', threshold: 0 });

  sections.forEach(section => observer.observe(section));

  // ── 3. Dark / Light Mode Toggle ───────────────────────────
  const btnMode = document.getElementById('btn-mode');
  const savedTheme = localStorage.getItem('book-theme') || 'dark';
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  if (btnMode) {
    btnMode.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('book-theme', 'dark');
        btnMode.title = '라이트 모드로 전환';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('book-theme', 'light');
        btnMode.title = '다크 모드로 전환';
      }
    });
  }

  // ── 4. PDF Print ──────────────────────────────────────────
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      // Force light theme for cleaner PDF, then restore
      const prevTheme = localStorage.getItem('book-theme');
      document.documentElement.removeAttribute('data-theme'); // use print CSS
      window.print();
      // Restore theme after print dialog
      if (prevTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
  }

  // ── 5. Prompt Copy to Clipboard ───────────────────────────
  const toast = document.getElementById('toast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  document.querySelectorAll('.btn-copy, .btn-copy-prompt').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        const orig = btn.textContent;
        btn.textContent = '✓ 복사완료';
        btn.style.background = '#10b981';
        btn.style.color = '#ffffff';
        showToast('📋 프롬프트가 클립보드에 복사되었습니다!');
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        showToast('⚠️ 복사에 실패했습니다. 직접 선택 후 복사해 주세요.');
      }
    });
  });

  // ── 6. Restore Last Read Position ─────────────────────────
  const SCROLL_KEY = 'book-scroll-pos';
  const savedPos = sessionStorage.getItem(SCROLL_KEY);
  if (savedPos) window.scrollTo(0, parseInt(savedPos));

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
  });

  // ── 7. Estimated Reading Time per Chapter ─────────────────
  document.querySelectorAll('.chapter-section').forEach(section => {
    const meta = section.querySelector('.chapter-meta');
    if (!meta) return;
    const words = section.textContent.trim().length;
    const minutes = Math.max(1, Math.round(words / 500));
    // Update if meta shows placeholder — already set in HTML; this adds dynamic calc as fallback
  });

});
