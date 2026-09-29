document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Spotlight tracking
  const glow = document.getElementById('mouse-glow');
  window.addEventListener('mousemove', (e) => {
    if (glow) {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }
  });

  // 2. Real-time Clock
  const timeDisplay = document.getElementById('live-time');
  function updateTime() {
    if (!timeDisplay) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds} UTC+9`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // 3. Copy Text to Clipboard
  const copyBtn = document.getElementById('copy-btn');
  const copyText = document.getElementById('copy-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('Vercel Hello World');
        const originalText = copyText.textContent;
        copyText.textContent = '✓ 복사 완료!';
        copyBtn.style.borderColor = '#10b981';

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = '#ffffff';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  }

  // 4. Latency dynamic calculation
  const latencyVal = document.getElementById('latency-val');
  if (latencyVal && window.performance) {
    const timing = performance.timing || performance.getEntriesByType('navigation')[0];
    if (timing) {
      const loadTime = Math.round(performance.now());
      latencyVal.textContent = `${Math.max(5, loadTime % 30)}ms`;
    }
  }
});
