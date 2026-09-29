document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });

  // 2. PDF Print Trigger
  const btnPrintPdf = document.getElementById('btn-print-pdf');
  if (btnPrintPdf) {
    btnPrintPdf.addEventListener('click', () => {
      window.print();
    });
  }

  // 3. Prompt Copy to Clipboard
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const textToCopy = targetElement.textContent.trim();
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast('📋 프롬프트가 클립보드에 복사되었습니다!');
          const originText = btn.textContent;
          btn.textContent = '✓ 복사완료';
          btn.style.backgroundColor = '#00ff87';
          btn.style.color = '#000';

          setTimeout(() => {
            btn.textContent = originText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
});
